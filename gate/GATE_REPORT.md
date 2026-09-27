# ExactOdds exactness gate report — 2026-09-26

Nine programs gated on the same day, same seat matrix
(py, js, ts, c, cpp — native seats): four provably-fair reference games
plus five casino rule packs. Every seat emitted and ran; stdout had
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

## provably-fair-crash

- Gate: `cuni check games/provably-fair-crash.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `50e534572ffb9001af10c5badd7bca2690ad6c461861f597479e869c42861411`
- Seat matrix, every seat 21 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 21           | 704bc8386c73575396774522dead54d54cd027037fe88a9ec15dfcb58bb64b4b |
| js   | ok   | ok  | 21           | 704bc8386c73575396774522dead54d54cd027037fe88a9ec15dfcb58bb64b4b |
| ts   | ok   | ok  | 21           | 704bc8386c73575396774522dead54d54cd027037fe88a9ec15dfcb58bb64b4b |
| c    | ok   | ok  | 21           | 704bc8386c73575396774522dead54d54cd027037fe88a9ec15dfcb58bb64b4b |
| cpp  | ok   | ok  | 21           | 704bc8386c73575396774522dead54d54cd027037fe88a9ec15dfcb58bb64b4b |

Golden stdout (also in `gate/fixtures/crash.stdout`):

```
151
110
159
2000
0
0
```

(Crash points in hundredths: 1.51x, 1.10x, 1.59x. Settlements: $10 cashed at
2.00x before a 3.50x crash pays $20.00; cashed after the crash or never cashed
pays 0.)

## casino-bonus-wagering

- Gate: `cuni check games/casino-bonus-wagering.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `48fdd87f2146172f458a58a18663cd299d07d5a5d555631358573c03dfdd93a3`
- Seat matrix, every seat 19 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 19           | e655c0605d8809ae2ca605ae88cbbd8668c2eeb45b5bef7dd84f21ffd273358f |
| js   | ok   | ok  | 19           | e655c0605d8809ae2ca605ae88cbbd8668c2eeb45b5bef7dd84f21ffd273358f |
| ts   | ok   | ok  | 19           | e655c0605d8809ae2ca605ae88cbbd8668c2eeb45b5bef7dd84f21ffd273358f |
| c    | ok   | ok  | 19           | e655c0605d8809ae2ca605ae88cbbd8668c2eeb45b5bef7dd84f21ffd273358f |
| cpp  | ok   | ok  | 19           | e655c0605d8809ae2ca605ae88cbbd8668c2eeb45b5bef7dd84f21ffd273358f |

Golden stdout (also in `gate/fixtures/casino-bonus-wagering.stdout`):

```
1000
100
0
950
1
0
```

($10 bet contributes 1000 cents at 100% weight, 100 at 10%. $10 bonus at 35x:
fully wagered leaves 0 remaining; a $5 side bet at 10% weight leaves 950;
35000 wagered clears, 34999 does not.)

## casino-poker-rake

- Gate: `cuni check games/casino-poker-rake.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `59d3f42751e98a0a42ffb1f0499a690eb863dbf6b804d8b8b67e51f6ffac0eb5`
- Seat matrix, every seat 14 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 14           | 86abfa2b74e9bcec576889335d5e2c2b19536f72a1a11f89dc22f060e320d421 |
| js   | ok   | ok  | 14           | 86abfa2b74e9bcec576889335d5e2c2b19536f72a1a11f89dc22f060e320d421 |
| ts   | ok   | ok  | 14           | 86abfa2b74e9bcec576889335d5e2c2b19536f72a1a11f89dc22f060e320d421 |
| c    | ok   | ok  | 14           | 86abfa2b74e9bcec576889335d5e2c2b19536f72a1a11f89dc22f060e320d421 |
| cpp  | ok   | ok  | 14           | 86abfa2b74e9bcec576889335d5e2c2b19536f72a1a11f89dc22f060e320d421 |

Golden stdout (also in `gate/fixtures/casino-poker-rake.stdout`):

```
300
100
300
0
```

(5% of $100 pot caps at $3.00; 5% of $20 is $1.00; 5% of $1000 caps at $3.00;
empty pot rakes 0.)

## casino-sportsbook-settlement

- Gate: `cuni check games/casino-sportsbook-settlement.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `c006d146447596921541e22c96855130a8cc1bde57bbcbbda8d2d4e3482bbc43`
- Seat matrix, every seat 21 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 21           | d3c3df5afe63badff5fc7dfd54c2b9c550f67ab3355b54b6d1818c2828065fce |
| js   | ok   | ok  | 21           | d3c3df5afe63badff5fc7dfd54c2b9c550f67ab3355b54b6d1818c2828065fce |
| ts   | ok   | ok  | 21           | d3c3df5afe63badff5fc7dfd54c2b9c550f67ab3355b54b6d1818c2828065fce |
| c    | ok   | ok  | 21           | d3c3df5afe63badff5fc7dfd54c2b9c550f67ab3355b54b6d1818c2828065fce |
| cpp  | ok   | ok  | 21           | d3c3df5afe63badff5fc7dfd54c2b9c550f67ab3355b54b6d1818c2828065fce |

Golden stdout (also in `gate/fixtures/casino-sportsbook-settlement.stdout`):

```
2500
1500
0
1000
954
```

($10 at +150 wins $25.00; $10 at -200 wins $15.00; a loss pays 0; a void
returns the $10 stake; $5 at -110 wins $9.54 — integer division floors.)

## casino-affiliate-revshare

- Gate: `cuni check games/casino-affiliate-revshare.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `9c71a8b01ac01dfccd2bc04b21399c9b9cd326a85397a69739c48a0cb7c86c82`
- Seat matrix, every seat 26 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 26           | ec9f04e804bf0ec9c1b56810c2fe3e92553551ffab954ee06c830629a56f95b7 |
| js   | ok   | ok  | 26           | ec9f04e804bf0ec9c1b56810c2fe3e92553551ffab954ee06c830629a56f95b7 |
| ts   | ok   | ok  | 26           | ec9f04e804bf0ec9c1b56810c2fe3e92553551ffab954ee06c830629a56f95b7 |
| c    | ok   | ok  | 26           | ec9f04e804bf0ec9c1b56810c2fe3e92553551ffab954ee06c830629a56f95b7 |
| cpp  | ok   | ok  | 26           | ec9f04e804bf0ec9c1b56810c2fe3e92553551ffab954ee06c830629a56f95b7 |

Golden stdout (also in `gate/fixtures/casino-affiliate-revshare.stdout`):

```
25
30
35
600000
2100000
0
```

($5k NGR tiers at 25%, $20k at 30%, $60k at 35%; payments $6,000 and $21,000;
a losing month pays 0 — no negative carryover.)

## casino-responsible-limits

- Gate: `cuni check games/casino-responsible-limits.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `7e2c64a7b2824bacbd5ee598c5ab5792fabf6815caa0bde9d05afd47b78d7f50`
- Seat matrix, every seat 8 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 8            | 41500605ef25d270f64bdabc5983441bb1f3182fcf5d1d01f59a74db036292f3 |
| js   | ok   | ok  | 8            | 41500605ef25d270f64bdabc5983441bb1f3182fcf5d1d01f59a74db036292f3 |
| ts   | ok   | ok  | 8            | 41500605ef25d270f64bdabc5983441bb1f3182fcf5d1d01f59a74db036292f3 |
| c    | ok   | ok  | 8            | 41500605ef25d270f64bdabc5983441bb1f3182fcf5d1d01f59a74db036292f3 |
| cpp  | ok   | ok  | 8            | 41500605ef25d270f64bdabc5983441bb1f3182fcf5d1d01f59a74db036292f3 |

Golden stdout (also in `gate/fixtures/casino-responsible-limits.stdout`):

```
1
0
1
0
```

($80 deposited + $20 under a $100 cap allowed; $90 + $20 denied. $40 net loss
+ $10 bet under a $50 loss limit allowed; $45 + $10 denied.)

## Notes

- No seat failed on any game. No special-casing, no waivers.
- The three games share one derivation shape (seed mix + Park-Miller step);
  dice takes `(state % 6) + 1`, coin flip takes parity as heads/tails, roulette
  takes `(state % 37)` and derives the standard bets from the number.
- Crash adds a second shape: the same seed mix maps to a crash multiplier via
  `(99 * 10000) / (10000 - h)` with a 1% instant-bust edge at 1.00x, plus a
  settlement rule. All money math across every program is integer cents —
  no floats anywhere, since floats can't be exact.
- Receipts from these runs live in `receipts/`; they name the source hash,
  the exactness verdict, and per-seat emit/run status.
