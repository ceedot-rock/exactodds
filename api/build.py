#!/usr/bin/env python3
"""Build the ExactOdds HTTP API from the gated .cuni sources.

Generates api/server.js: Express, one POST route per rule function
(POST /v1/<slug>/<fn>), integer-validated inputs, JSON answers that
carry the CuNi source hash of the rules that ran.
"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GAMES = os.path.join(ROOT, "games")
API = os.path.join(ROOT, "api")
os.makedirs(API, exist_ok=True)

BLURB = {
    "provably-fair-dice": "Provably-fair dice rolls from revealed seeds.",
    "provably-fair-coin-flip": "Provably-fair coin flip from revealed seeds.",
    "provably-fair-roulette": "Provably-fair European roulette spin from revealed seeds.",
    "provably-fair-crash": "Provably-fair crash multiplier from the round hash.",
    "casino-bonus-wagering": "Bonus wagering contribution, remaining requirement, cleared/not-cleared.",
    "casino-poker-rake": "Poker rake as a percentage of the pot with a hard cap.",
    "casino-sportsbook-settlement": "Sportsbook moneyline settlement with American odds (win/loss/void).",
    "casino-affiliate-revshare": "Tiered affiliate revenue share on monthly NGR, no negative carryover.",
    "casino-responsible-limits": "Deposit cap and loss limit allow/deny checks.",
    "casino-slots-payline": "Slots payline win from a 5-symbol paytable.",
    "casino-progressive-jackpot": "Progressive pool contribution per bet and reset-to-seed.",
    "casino-tourney-points": "Tournament leaderboard points by finishing place.",
    "casino-cashback": "VIP cashback rebate on net losses.",
    "casino-aml-structuring": "AML single-deposit and structuring flags.",
    "casino-referral-bonus": "Flat referral bonus on qualifying first deposits.",
    "casino-comp-points": "Loyalty comp point earn and redeem.",
    "casino-rtp-audit": "Return-to-player in basis points from ledger totals.",
    "casino-raffle-draw": "Provably-fair raffle winner from a committed seed.",
    "casino-baccarat-settle": "Baccarat settlement with the 19:20 banker commission.",
}
SLUGS = list(BLURB)
DEF_RE = re.compile(r"^def (\w+)\(([^)]*)\) -> (\w+) do", re.M)

registry = {}
for slug in SLUGS:
    src_path = os.path.join(GAMES, slug + ".exactodds")
    if not os.path.exists(src_path):
        src_path = os.path.join(GAMES, slug + ".cuni")
    src = open(src_path).read()
    fns = []
    for name, params, ret in DEF_RE.findall(src):
        ps = [p.strip().split(":")[0].strip() for p in params.split(",") if p.strip()]
        fns.append({"name": name, "params": ps})
    receipt = json.load(open(os.path.join(ROOT, "receipts", slug + ".receipt.json")))
    registry[slug] = {"blurb": BLURB[slug], "source_hash": receipt["source_hash"],
                      "functions": fns}

server = """// ExactOdds API — every rule pack over HTTP. Generated — do not hand-edit.
const express = require("express");
const rules = require("exactodds");

const REGISTRY = %s;

const app = express();
app.use(express.json({ limit: "64kb" }));

app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "exactodds-api",
    about: "ExactOdds provably-fair rule packs over HTTP. Every answer carries the source_hash of the rules that ran.",
    docs: "https://github.com/ceedot-rock/exactodds/tree/main/api",
    endpoints: {
      health: "GET /health",
      programs: "GET /v1/programs",
      call: "POST /v1/<program>/<function>  (JSON body, integer params)",
    },
    example: {
      request: "POST /v1/provably-fair-coin-flip/flip",
      body: { server_seed: 12345, client_seed: 678, round: 1 },
    },
    programs: Object.keys(REGISTRY).length,
  });
});

app.get("/health", (req, res) => res.json({ ok: true, service: "exactodds-api" }));

app.get("/v1/programs", (req, res) => {
  res.json({ ok: true, programs: REGISTRY });
});

app.post("/v1/:slug/:fn", (req, res) => {
  const prog = REGISTRY[req.params.slug];
  if (!prog) return res.status(404).json({ ok: false, error: "unknown program" });
  const spec = prog.functions.find((f) => f.name === req.params.fn);
  if (!spec) return res.status(404).json({ ok: false, error: "unknown function" });
  const body = req.body || {};
  const args = [];
  for (const p of spec.params) {
    const v = body[p];
    if (!Number.isSafeInteger(v)) {
      return res.status(400).json({ ok: false, error: `param '${p}' must be a safe integer` });
    }
    args.push(v);
  }
  let result;
  try {
    result = rules[spec.name](...args);
  } catch (e) {
    if (e && e.code === "EXACTODDS_INVALID_SEED") {
      return res.status(400).json({ ok: false, error: e.message });
    }
    return res.status(500).json({ ok: false, error: "rule evaluation failed" });
  }
  res.json({
    ok: true,
    result,
    program: req.params.slug,
    function: spec.name,
    seat: "js",
    source_hash: prog.source_hash,
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`exactodds-api on :${port}`));
""" % json.dumps(registry, indent=2)

open(os.path.join(API, "server.js"), "w").write(server)

open(os.path.join(API, "package.json"), "w").write(json.dumps({
    "name": "exactodds-api",
    "version": "1.0.0",
    "private": True,
    "description": "ExactOdds rule packs over HTTP.",
    "main": "server.js",
    "scripts": {"start": "node server.js", "build": "python3 build.py"},
    "dependencies": {"exactodds": "^1.0.0", "express": "^4.21.2"},
    "license": "(AGPL-3.0-or-later OR LicenseRef-SlidPhiLabs-Commercial)",
}, indent=2) + "\n")

open(os.path.join(API, "Dockerfile"), "w").write(
    "FROM node:24-slim\n"
    "WORKDIR /app\n"
    "COPY package.json package-lock.json* ./\n"
    "RUN npm install --omit=dev\n"
    "COPY server.js ./\n"
    "ENV PORT=8080\n"
    "EXPOSE 8080\n"
    'CMD ["node", "server.js"]\n')

open(os.path.join(API, "fly.toml"), "w").write(
    'app = "exactodds-api"\n'
    'primary_region = "ewr"\n\n'
    '[build]\n  dockerfile = "Dockerfile"\n\n'
    '[http_service]\n'
    '  internal_port = 8080\n'
    '  force_https = true\n'
    '  auto_stop_machines = "suspend"\n'
    '  auto_start_machines = true\n'
    '  min_machines_running = 0\n\n'
    '[[http_service.checks]]\n'
    '  grace_period = "10s"\n'
    '  path = "/health"\n')

open(os.path.join(API, "README.md"), "w").write(
    "# exactodds-api\n\n"
    "Every ExactOdds rule pack over HTTP.\n\n"
    "```\n"
    "POST /v1/casino-sportsbook-settlement/settle_moneyline\n"
    '{"stake_cents": 1000, "american_odds": 150, "result": 1}\n'
    "-> {\"ok\": true, \"result\": 2500, \"program\": \"...\", \"seat\": \"js\", \"source_hash\": \"...\"}\n"
    "```\n\n"
    "- `GET /`, `GET /health`, `GET /v1/programs`\n"
    "- All params must be integers; all money is integer cents.\n"
    "- Every answer carries the `source_hash` of the CuNi rules that ran —\n"
    "  compare it against the receipts in the repo to prove which rules ran.\n\n"
    "Regenerate: `python3 build.py`. Deploy (needs Corey's go-ahead): `fly launch`.\n\n"
    "License: AGPL-3.0-or-later OR Slid Phi Labs Commercial. Commercial: Corey@slidphilabs.com — $2,500/yr per operator.\n")

print(f"generated api/server.js: {sum(len(v['functions']) for v in registry.values())} routes")
