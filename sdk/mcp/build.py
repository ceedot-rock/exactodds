#!/usr/bin/env python3
"""Build the exactodds MCP server from the gated .cuni sources.

Parses every `def` in games/*.cuni and generates sdk/mcp/server.js:
one MCP tool per rule function (35 tools), integer params, calling
the exactodds npm package. Descriptions are plain-language, no agent-speak.
"""
import json, os, re

ROOT = os.path.expanduser("~/workspace/exactodds")
GAMES = os.path.join(ROOT, "games")
MCP = os.path.join(ROOT, "sdk", "mcp")

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

tools = []
for slug in SLUGS:
    src = open(os.path.join(GAMES, slug + ".cuni")).read()
    for name, params, ret in DEF_RE.findall(src):
        ps = [p.strip().split(":")[0].strip() for p in params.split(",") if p.strip()]
        tools.append({"tool": name, "fn": name, "params": ps,
                      "slug": slug, "blurb": BLURB[slug]})

names = [t["tool"] for t in tools]
assert len(names) == len(set(names)), "tool name collision"

js_tools = []
for t in tools:
    props = ",\n        ".join(
        f'"{p}": {{ "type": "integer", "description": "Integer input {p}." }}'
        for p in t["params"])
    req = ", ".join(f'"{p}"' for p in t["params"])
    desc = (f"ExactOdds rule `{t['fn']}({', '.join(t['params'])})`. "
            f"{t['blurb']} All money in integer cents.")
    schema = {
        "type": "object",
        "properties": {p: {"type": "integer", "description": f"Integer input {p}."}
                      for p in t["params"]},
        "required": t["params"],
        "additionalProperties": False,
    }
    js_tools.append(
        "  {\n"
        f'    name: "{t["tool"]}",\n'
        f'    description: {json.dumps(desc)},\n'
        f'    inputSchema: {json.dumps(schema, indent=6)},\n'
        f'    fn: "{t["fn"]}",\n'
        f'    params: {json.dumps(t["params"])},\n'
        "  }")

server = """#!/usr/bin/env node
// exactodds-mcp — every ExactOdds rule pack as MCP tools.
// Generated from games/*.cuni — do not hand-edit.
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { CallToolRequestSchema, ListToolsRequestSchema } = require("@modelcontextprotocol/sdk/types.js");
const rules = require("exactodds");

const TOOLS = [
""" + ",\n".join(js_tools) + """
];

const server = new Server({ name: "exactodds-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })),
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const t = TOOLS.find((x) => x.name === req.params.name);
  if (!t) throw new Error(`unknown tool: ${req.params.name}`);
  const args = req.params.arguments || {};
  for (const p of t.params) {
    if (!Number.isInteger(args[p])) throw new Error(`param '${p}' must be an integer`);
  }
  const result = rules[t.fn](...t.params.map((p) => args[p]));
  return { content: [{ type: "text", text: String(result) }] };
});

(async () => {
  await server.connect(new StdioServerTransport());
})();
"""

open(os.path.join(MCP, "server.js"), "w").write(server)
os.chmod(os.path.join(MCP, "server.js"), 0o755)
print(f"generated server.js with {len(tools)} tools")
