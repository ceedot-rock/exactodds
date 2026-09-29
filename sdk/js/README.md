# exactodds (npm)

## What ExactOdds is

ExactOdds makes dice that can't lie. It provides the core building blocks for games of chance — dice rolls, coin flips — with the math out in the open and every result verifiable. If a result can't be proven fair, it is refused.

Here is why that matters. An online game runs the same code on many platforms — a phone, a browser, a server — and players have to trust that the house didn't tilt the odds on any one of them. ExactOdds removes the need for trust: the reference games are run through five programming languages — Python, JavaScript, TypeScript, C, and C++ — and all five must print byte-identical results, checked mechanically, not claimed.

If five independent implementations agree down to the last byte, the game can't favor the house on one platform and rob it on another. A disagreement isn't smoothed over — it stops the line. The refusal is the guarantee.

This package is the JavaScript build of those rules: every function, integer math only, no floats anywhere.

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
