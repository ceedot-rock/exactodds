// Replays every audited say() from the .exactodds sources against the built
// modules and diffs the golden fixtures. Any drift fails loudly.
const fs = require('fs');
const path = require('path');
const { programs } = require('../index.js');

const cases = [
  {
    "slug": "provably-fair-dice",
    "says": [
      "roll_dice(987654321, 123456789, 1)",
      "roll_dice(987654321, 123456789, 2)",
      "roll_dice(111111111, 222222222, 1)",
      "roll_hundred(987654321, 123456789, 1)"
    ],
    "fixture": [
      "3",
      "4",
      "1",
      "84"
    ]
  },
  {
    "slug": "provably-fair-coin-flip",
    "says": [
      "flip(987654321, 123456789, 1)",
      "flip(987654321, 123456789, 2)",
      "flip(987654321, 123456789, 3)",
      "flip(987654321, 123456789, 4)",
      "flip(987654321, 123456789, 5)",
      "flip(111111111, 222222222, 1)",
      "flip(111111111, 222222222, 2)",
      "flip(555555555, 999999999, 7)",
      "flip_bit(987654321, 123456789, 1)",
      "flip_bit(555555555, 999999999, 7)"
    ],
    "fixture": [
      "heads",
      "tails",
      "heads",
      "tails",
      "heads",
      "heads",
      "tails",
      "tails",
      "0",
      "1"
    ]
  },
  {
    "slug": "provably-fair-roulette",
    "says": [
      "spin_line(987654321, 123456789, 1)",
      "spin_line(987654321, 123456789, 2)",
      "spin_line(987654321, 123456789, 3)",
      "spin_line(111111111, 222222222, 1)",
      "spin_line(111111111, 222222222, 2)",
      "spin_line(555555555, 999999999, 7)",
      "spin_line(424242424, 242424242, 13)"
    ],
    "fixture": [
      "spin 1: 31 black odd high",
      "spin 2: 34 red even high",
      "spin 3: 0 green neither neither",
      "spin 1: 6 black even low",
      "spin 2: 9 red odd low",
      "spin 7: 23 red odd high",
      "spin 13: 2 black even low"
    ]
  },
  {
    "slug": "provably-fair-crash",
    "says": [
      "crash_point(987654321, 123456789, 1)",
      "crash_point(987654321, 123456789, 2)",
      "crash_point(111111111, 222222222, 1)",
      "settle_crash(1000, 200, 350)",
      "settle_crash(1000, 400, 350)",
      "settle_crash(1000, 0, 350)"
    ],
    "fixture": [
      "151",
      "110",
      "159",
      "2000",
      "0",
      "0"
    ]
  },
  {
    "slug": "casino-bonus-wagering",
    "says": [
      "wager_contrib(1000, 100)",
      "wager_contrib(1000, 10)",
      "wagering_remaining(35000, 34000, 1000, 100)",
      "wagering_remaining(35000, 34000, 500, 10)",
      "bonus_cleared(1000, 35, 35000)",
      "bonus_cleared(1000, 35, 34999)"
    ],
    "fixture": [
      "1000",
      "100",
      "0",
      "950",
      "1",
      "0"
    ]
  },
  {
    "slug": "casino-poker-rake",
    "says": [
      "rake(10000, 5, 300)",
      "rake(2000, 5, 300)",
      "rake(100000, 5, 300)",
      "rake(0, 5, 300)"
    ],
    "fixture": [
      "300",
      "100",
      "300",
      "0"
    ]
  },
  {
    "slug": "casino-sportsbook-settlement",
    "says": [
      "settle_moneyline(1000, 150, 1)",
      "settle_moneyline(1000, -200, 1)",
      "settle_moneyline(1000, 150, 0)",
      "settle_moneyline(1000, -200, 2)",
      "settle_moneyline(500, -110, 1)"
    ],
    "fixture": [
      "2500",
      "1500",
      "0",
      "1000",
      "954"
    ]
  },
  {
    "slug": "casino-affiliate-revshare",
    "says": [
      "revshare_tier(500000)",
      "revshare_tier(2000000)",
      "revshare_tier(6000000)",
      "affiliate_pay(2000000)",
      "affiliate_pay(6000000)",
      "affiliate_pay(-50000)"
    ],
    "fixture": [
      "25",
      "30",
      "35",
      "600000",
      "2100000",
      "0"
    ]
  },
  {
    "slug": "casino-responsible-limits",
    "says": [
      "deposit_allowed(8000, 10000, 2000)",
      "deposit_allowed(9000, 10000, 2000)",
      "bet_allowed(4000, 5000, 1000)",
      "bet_allowed(4500, 5000, 1000)"
    ],
    "fixture": [
      "1",
      "0",
      "1",
      "0"
    ]
  },
  {
    "slug": "casino-slots-payline",
    "says": [
      "slots_win(100, 4, 3)",
      "slots_win(100, 5, 5)",
      "slots_win(100, 1, 2)",
      "slots_win(50, 3, 4)"
    ],
    "fixture": [
      "1000",
      "100000",
      "0",
      "1000"
    ]
  },
  {
    "slug": "casino-progressive-jackpot",
    "says": [
      "jackpot_pool_after(1000000, 1000, 2)",
      "jackpot_pool_after(1000020, 500, 2)",
      "jackpot_reset(500000)"
    ],
    "fixture": [
      "1000020",
      "1000030",
      "500000"
    ]
  },
  {
    "slug": "casino-tourney-points",
    "says": [
      "tourney_points(1, 100)",
      "tourney_points(10, 100)",
      "tourney_points(100, 100)",
      "tourney_points(3, 64)"
    ],
    "fixture": [
      "10000",
      "1000",
      "100",
      "2133"
    ]
  },
  {
    "slug": "casino-cashback",
    "says": [
      "cashback(10000, 10)",
      "cashback(-5000, 10)",
      "cashback(999, 15)",
      "cashback(0, 10)"
    ],
    "fixture": [
      "1000",
      "0",
      "149",
      "0"
    ]
  },
  {
    "slug": "casino-aml-structuring",
    "says": [
      "aml_report(1000000, 1000000)",
      "aml_report(999999, 1000000)",
      "aml_structuring(900000, 900000, 900000, 1000000)",
      "aml_structuring(500000, 200000, 100000, 1000000)",
      "aml_structuring(1500000, 100000, 100000, 1000000)"
    ],
    "fixture": [
      "1",
      "0",
      "1",
      "0",
      "0"
    ]
  },
  {
    "slug": "casino-referral-bonus",
    "says": [
      "referral_bonus(2000)",
      "referral_bonus(1999)",
      "referral_bonus(10000)"
    ],
    "fixture": [
      "2500",
      "0",
      "2500"
    ]
  },
  {
    "slug": "casino-comp-points",
    "says": [
      "comp_earn(2550)",
      "comp_earn(99)",
      "comp_redeem(2500)",
      "comp_redeem(0)"
    ],
    "fixture": [
      "25",
      "0",
      "2500",
      "0"
    ]
  },
  {
    "slug": "casino-rtp-audit",
    "says": [
      "rtp_bps(1000000, 962500)",
      "rtp_bps(500000, 485000)",
      "rtp_bps(100000, 100000)"
    ],
    "fixture": [
      "9625",
      "9700",
      "10000"
    ]
  },
  {
    "slug": "casino-raffle-draw",
    "says": [
      "raffle_winner(12345, 100)",
      "raffle_winner(999, 50)",
      "raffle_winner(1, 10)"
    ],
    "fixture": [
      "77",
      "7",
      "9"
    ]
  },
  {
    "slug": "casino-baccarat-settle",
    "says": [
      "baccarat_settle(1000, 0, 0)",
      "baccarat_settle(1000, 1, 1)",
      "baccarat_settle(1000, 2, 2)",
      "baccarat_settle(1000, 0, 2)",
      "baccarat_settle(1000, 1, 0)"
    ],
    "fixture": [
      "2000",
      "1950",
      "9000",
      "1000",
      "0"
    ]
  }
];

let failures = 0;
for (const c of cases) {
  const mod = programs[c.slug];
  const fns = {};
  for (const k of Object.keys(mod)) fns[k] = mod[k];
  // evaluate each say(...) with rule fns in scope
  const argNames = Object.keys(fns);
  c.says.forEach((expr, i) => {
    const fn = new Function(...argNames, 'return (' + expr + ');');
    let got;
    try { got = String(fn(...argNames.map(a => fns[a]))); }
    catch (e) { got = 'THREW: ' + e.message; }
    const want = c.fixture[i];
    if (got !== want) { failures++;
      console.error(`FAIL ${c.slug}#${i}: got ${got}, want ${want}`); }
  });
}
const total = cases.reduce((n, c) => n + c.says.length, 0);
if (failures) { console.error(`${failures}/${total} checks FAILED`); process.exit(1); }
console.log(`all ${total} audited checks PASS`);
