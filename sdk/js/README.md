# exactodds (npm)

Provably-fair casino rule packs as a JavaScript library. Every function is
emitted from a CuNi source program that passed the ExactOdds exactness gate:
byte-identical output on the Python, JS, TS, C, and C++ seats, or the
program refuses to compile.

```js
const { settle_moneyline, baccarat_settle } = require('exactodds');

settle_moneyline(1000, 150, 1);  // 2500 — $10 at +150 wins $25.00
baccarat_settle(1000, 1, 1);     // 1950 — banker win pays 19:20
```

All money is integer cents. No floats anywhere.

## Layout

- `programs['<slug>']` — rule functions namespaced by program, e.g.
  `programs['casino-sportsbook-settlement'].settle_moneyline(...)`
- Flat exports — every rule function also exported by name.
- `SOURCE_HASHES` — SHA-256 of the CuNi source each module was built from.
  Compare against the receipts in the repo to prove which rules you're running.

## Programs

19 programs, 35 functions: provably-fair dice, coin flip, roulette, crash;
casino rule packs for bonus wagering, poker rake, sportsbook settlement,
affiliate revshare, responsible limits, slots paylines, progressive
jackpots, tournament points, cashback, AML structuring, referral bonuses,
comp points, RTP audit, raffle draws, and baccarat settlement.

## Regenerating

The modules are generated, not hand-written:

```
npm run build   # re-emits from games/*.cuni
npm test        # rebuilds, then replays every audited case against the golden fixtures
```

## License

AGPL-3.0-only. Commercial licenses: Corey@slidphilabs.com — $2,500/yr per operator.
