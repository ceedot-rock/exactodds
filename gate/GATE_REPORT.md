# ExactOdds exactness gate report — 2026-09-26

Both reference games gated on the same day, same seat matrix
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

## Notes

- No seat failed on either game. No special-casing, no waivers.
- The two games share one derivation shape (seed mix + Park-Miller step);
  dice takes `(state % 6) + 1`, coin flip takes parity as heads/tails.
- Receipts from these runs live in `receipts/`; they name the source hash,
  the exactness verdict, and per-seat emit/run status.
