# ExactOdds exactness gate report — 2026-09-26

Three reference games gated on the same day, same seat matrix
(py, js, ts, c, cpp — native seats). Every seat emitted and ran; stdout had
to be byte-identical or the run fails. Nothing was faked: outputs below are
the real seat outputs, captured per seat.

## provably-fair-coin-flip

- Gate: `cuni check games/provably-fair-coin-flip.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `04783043adaf23b7880977bfaacc4324eb02d8d77bf41991f7dfd6037510c3d0`
- Seat matrix, every seat 52 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 52           | da48a6ba509f0840da7040eaa51961e9506334e043601253c534437a091202b7 |
| js   | ok   | ok  | 52           | da48a6ba509f0840da7040eaa51961e9506334e043601253c534437a091202b7 |
| ts   | ok   | ok  | 52           | da48a6ba509f0840da7040eaa51961e9506334e043601253c534437a091202b7 |
| c    | ok   | ok  | 52           | da48a6ba509f0840da7040eaa51961e9506334e043601253c534437a091202b7 |
| cpp  | ok   | ok  | 52           | da48a6ba509f0840da7040eaa51961e9506334e043601253c534437a091202b7 |

Golden stdout (also in `gate/fixtures/coin-flip.stdout`):

```
heads
tails
heads
tails
heads
heads
tails
tails
0
1
```

## provably-fair-dice

- Gate: `cuni check games/provably-fair-dice.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `795a43fa1864c30565d436e302ac0011662b01a45dc4c023c5af37f76ccdbb44`
  (comments adapted to the ExactOdds surface 2026-09-26; the program logic and
  outputs are unchanged from the original gated version — stdout still
  matches the 2026-09-26 golden fixture)
- Seat matrix, every seat 9 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 9            | a79a72f0b7987fab1a4e54c85f617a723f5d2b25aa1d3b2f2fc3a2a470ba5f8b |
| js   | ok   | ok  | 9            | a79a72f0b7987fab1a4e54c85f617a723f5d2b25aa1d3b2f2fc3a2a470ba5f8b |
| ts   | ok   | ok  | 9            | a79a72f0b7987fab1a4e54c85f617a723f5d2b25aa1d3b2f2fc3a2a470ba5f8b |
| c    | ok   | ok  | 9            | a79a72f0b7987fab1a4e54c85f617a723f5d2b25aa1d3b2f2fc3a2a470ba5f8b |
| cpp  | ok   | ok  | 9            | a79a72f0b7987fab1a4e54c85f617a723f5d2b25aa1d3b2f2fc3a2a470ba5f8b |

Golden stdout (also in `gate/fixtures/dice.stdout`):

```
3
4
1
84
```

## provably-fair-roulette

- Gate: `cuni check games/provably-fair-roulette.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `1eaac333fa3d25c23224a0d649a52471e3e38077c406d4913212271d79c9cc9c`
- Seat matrix, every seat 180 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 180          | f3cc95467f2d41d7f96cccb08ba84bd95f53adc0bcb6a5752a7f1e6cab71fe70 |
| js   | ok   | ok  | 180          | f3cc95467f2d41d7f96cccb08ba84bd95f53adc0bcb6a5752a7f1e6cab71fe70 |
| ts   | ok   | ok  | 180          | f3cc95467f2d41d7f96cccb08ba84bd95f53adc0bcb6a5752a7f1e6cab71fe70 |
| c    | ok   | ok  | 180          | f3cc95467f2d41d7f96cccb08ba84bd95f53adc0bcb6a5752a7f1e6cab71fe70 |
| cpp  | ok   | ok  | 180          | f3cc95467f2d41d7f96cccb08ba84bd95f53adc0bcb6a5752a7f1e6cab71fe70 |

Golden stdout (also in `gate/fixtures/roulette.stdout`):

```
spin 1: 31 black odd high
spin 2: 34 red even high
spin 3: 0 green neither neither
spin 1: 6 black even low
spin 2: 9 red odd low
spin 7: 23 red odd high
spin 13: 2 black even low
```

## Notes

- No seat failed on any game. No special-casing, no waivers.
- The three games share one derivation shape (seed mix + Park-Miller step);
  dice takes `(state % 6) + 1`, coin flip takes parity as heads/tails, roulette
  takes `(state % 37)` and derives the standard bets from the number.
- Receipts from these runs live in `receipts/`; they name the source hash,
  the exactness verdict, and per-seat emit/run status.
