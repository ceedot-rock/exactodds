// ExactOdds API — every rule pack over HTTP. Generated — do not hand-edit.
const express = require("express");
const rules = require("exactodds");

const REGISTRY = {
  "provably-fair-dice": {
    "blurb": "Provably-fair dice rolls from revealed seeds.",
    "source_hash": "795a43fa1864c30565d436e302ac0011662b01a45dc4c023c5af37f76ccdbb44",
    "functions": [
      {
        "name": "roll_dice",
        "params": [
          "server_seed",
          "client_seed",
          "round"
        ]
      },
      {
        "name": "roll_hundred",
        "params": [
          "server_seed",
          "client_seed",
          "round"
        ]
      }
    ]
  },
  "provably-fair-coin-flip": {
    "blurb": "Provably-fair coin flip from revealed seeds.",
    "source_hash": "04783043adaf23b7880977bfaacc4324eb02d8d77bf41991f7dfd6037510c3d0",
    "functions": [
      {
        "name": "flip",
        "params": [
          "server_seed",
          "client_seed",
          "round"
        ]
      },
      {
        "name": "flip_bit",
        "params": [
          "server_seed",
          "client_seed",
          "round"
        ]
      }
    ]
  },
  "provably-fair-roulette": {
    "blurb": "Provably-fair European roulette spin from revealed seeds.",
    "source_hash": "1eaac333fa3d25c23224a0d649a52471e3e38077c406d4913212271d79c9cc9c",
    "functions": [
      {
        "name": "spin",
        "params": [
          "server_seed",
          "client_seed",
          "round"
        ]
      },
      {
        "name": "is_red",
        "params": [
          "n"
        ]
      },
      {
        "name": "color_of",
        "params": [
          "n"
        ]
      },
      {
        "name": "parity_of",
        "params": [
          "n"
        ]
      },
      {
        "name": "range_of",
        "params": [
          "n"
        ]
      },
      {
        "name": "spin_line",
        "params": [
          "server_seed",
          "client_seed",
          "round"
        ]
      }
    ]
  },
  "provably-fair-crash": {
    "blurb": "Provably-fair crash multiplier from the round hash.",
    "source_hash": "50e534572ffb9001af10c5badd7bca2690ad6c461861f597479e869c42861411",
    "functions": [
      {
        "name": "crash_point",
        "params": [
          "server_seed",
          "client_seed",
          "round"
        ]
      },
      {
        "name": "settle_crash",
        "params": [
          "bet_cents",
          "cashout_hundredths",
          "crash_hundredths"
        ]
      }
    ]
  },
  "casino-bonus-wagering": {
    "blurb": "Bonus wagering contribution, remaining requirement, cleared/not-cleared.",
    "source_hash": "48fdd87f2146172f458a58a18663cd299d07d5a5d555631358573c03dfdd93a3",
    "functions": [
      {
        "name": "wager_contrib",
        "params": [
          "bet_cents",
          "weight_pct"
        ]
      },
      {
        "name": "wagering_remaining",
        "params": [
          "required_cents",
          "wagered_cents",
          "bet_cents",
          "weight_pct"
        ]
      },
      {
        "name": "bonus_cleared",
        "params": [
          "bonus_cents",
          "wager_mult",
          "total_wagered_cents"
        ]
      }
    ]
  },
  "casino-poker-rake": {
    "blurb": "Poker rake as a percentage of the pot with a hard cap.",
    "source_hash": "59d3f42751e98a0a42ffb1f0499a690eb863dbf6b804d8b8b67e51f6ffac0eb5",
    "functions": [
      {
        "name": "rake",
        "params": [
          "pot_cents",
          "rake_pct",
          "cap_cents"
        ]
      }
    ]
  },
  "casino-sportsbook-settlement": {
    "blurb": "Sportsbook moneyline settlement with American odds (win/loss/void).",
    "source_hash": "c006d146447596921541e22c96855130a8cc1bde57bbcbbda8d2d4e3482bbc43",
    "functions": [
      {
        "name": "settle_moneyline",
        "params": [
          "stake_cents",
          "american_odds",
          "result"
        ]
      }
    ]
  },
  "casino-affiliate-revshare": {
    "blurb": "Tiered affiliate revenue share on monthly NGR, no negative carryover.",
    "source_hash": "9c71a8b01ac01dfccd2bc04b21399c9b9cd326a85397a69739c48a0cb7c86c82",
    "functions": [
      {
        "name": "revshare_tier",
        "params": [
          "ngr_cents"
        ]
      },
      {
        "name": "affiliate_pay",
        "params": [
          "ngr_cents"
        ]
      }
    ]
  },
  "casino-responsible-limits": {
    "blurb": "Deposit cap and loss limit allow/deny checks.",
    "source_hash": "7e2c64a7b2824bacbd5ee598c5ab5792fabf6815caa0bde9d05afd47b78d7f50",
    "functions": [
      {
        "name": "deposit_allowed",
        "params": [
          "deposited_cents",
          "limit_cents",
          "deposit_cents"
        ]
      },
      {
        "name": "bet_allowed",
        "params": [
          "net_loss_cents",
          "loss_limit_cents",
          "bet_cents"
        ]
      }
    ]
  },
  "casino-slots-payline": {
    "blurb": "Slots payline win from a 5-symbol paytable.",
    "source_hash": "608ed7ac63e478fdfea2e2c835cf92f58c13de97af79685af3e762ab88a7361d",
    "functions": [
      {
        "name": "paytable_mult",
        "params": [
          "symbol",
          "match_count"
        ]
      },
      {
        "name": "slots_win",
        "params": [
          "bet_cents",
          "symbol",
          "match_count"
        ]
      }
    ]
  },
  "casino-progressive-jackpot": {
    "blurb": "Progressive pool contribution per bet and reset-to-seed.",
    "source_hash": "5177fabbd1f946997df878500207f8dc9e81fcd72ac13f12b19cde2c9bedf019",
    "functions": [
      {
        "name": "jackpot_pool_after",
        "params": [
          "pool_cents",
          "bet_cents",
          "contrib_pct"
        ]
      },
      {
        "name": "jackpot_reset",
        "params": [
          "seed_cents"
        ]
      }
    ]
  },
  "casino-tourney-points": {
    "blurb": "Tournament leaderboard points by finishing place.",
    "source_hash": "be59fa0d6c1847b9e5ba0e7c3a9495fd14fded625516e4c6404201ef002ce66d",
    "functions": [
      {
        "name": "tourney_points",
        "params": [
          "place",
          "entrants"
        ]
      }
    ]
  },
  "casino-cashback": {
    "blurb": "VIP cashback rebate on net losses.",
    "source_hash": "c193f4cdfbe7da2438f7a788fceb7c5d4579b2e1521eeb6499eb9a019920ab47",
    "functions": [
      {
        "name": "cashback",
        "params": [
          "net_loss_cents",
          "rebate_pct"
        ]
      }
    ]
  },
  "casino-aml-structuring": {
    "blurb": "AML single-deposit and structuring flags.",
    "source_hash": "384fcf00a5c8e0e130adc514edbc5f3c0991ac7ed6c5c366a5161ec6367caa20",
    "functions": [
      {
        "name": "aml_report",
        "params": [
          "deposit_cents",
          "threshold_cents"
        ]
      },
      {
        "name": "aml_structuring",
        "params": [
          "dep1_cents",
          "dep2_cents",
          "dep3_cents",
          "threshold_cents"
        ]
      }
    ]
  },
  "casino-referral-bonus": {
    "blurb": "Flat referral bonus on qualifying first deposits.",
    "source_hash": "c430a24cbc3237efeb2dd578eb9a083c4143afab7d079db633394cfd7432661d",
    "functions": [
      {
        "name": "referral_bonus",
        "params": [
          "first_deposit_cents"
        ]
      }
    ]
  },
  "casino-comp-points": {
    "blurb": "Loyalty comp point earn and redeem.",
    "source_hash": "c4f40db460e92402b4b87c0ebbaee5b4f351d5b5204df1f0ee8763c8bffe179f",
    "functions": [
      {
        "name": "comp_earn",
        "params": [
          "wagered_cents"
        ]
      },
      {
        "name": "comp_redeem",
        "params": [
          "points"
        ]
      }
    ]
  },
  "casino-rtp-audit": {
    "blurb": "Return-to-player in basis points from ledger totals.",
    "source_hash": "5b25525b0ccd5960ff05b31d31477f9b8accf0b0d166f17fda9bc149e983cc57",
    "functions": [
      {
        "name": "rtp_bps",
        "params": [
          "wagered_cents",
          "paid_cents"
        ]
      }
    ]
  },
  "casino-raffle-draw": {
    "blurb": "Provably-fair raffle winner from a committed seed.",
    "source_hash": "ba9c92a34c279e76003d1eb5c65a8fbd9743b0a14134b6b9b8ba627e0330e031",
    "functions": [
      {
        "name": "raffle_winner",
        "params": [
          "seed",
          "tickets"
        ]
      }
    ]
  },
  "casino-baccarat-settle": {
    "blurb": "Baccarat settlement with the 19:20 banker commission.",
    "source_hash": "44bf488f09610fad0e535330dddc4dc066fee4e4ea5ff591c201c187c8f1d004",
    "functions": [
      {
        "name": "baccarat_settle",
        "params": [
          "stake_cents",
          "bet_on",
          "winner"
        ]
      }
    ]
  }
};

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
