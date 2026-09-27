# ExactOdds exactness gate report — 2026-09-26

Nineteen programs gated on the same day, same seat matrix
(py, js, ts, c, cpp — native seats): four provably-fair reference games
plus fifteen casino rule packs. Every seat emitted and ran; stdout had
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

## casino-slots-payline

- Gate: `cuni check games/casino-slots-payline.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `608ed7ac63e478fdfea2e2c835cf92f58c13de97af79685af3e762ab88a7361d`
- Seat matrix, every seat 19 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 19           | 3e754e46bdadb1a815ecc856b9453cb4c9d8c64341d114bc1d89a2d577c0aa11 |
| js   | ok   | ok  | 19           | 3e754e46bdadb1a815ecc856b9453cb4c9d8c64341d114bc1d89a2d577c0aa11 |
| ts   | ok   | ok  | 19           | 3e754e46bdadb1a815ecc856b9453cb4c9d8c64341d114bc1d89a2d577c0aa11 |
| c    | ok   | ok  | 19           | 3e754e46bdadb1a815ecc856b9453cb4c9d8c64341d114bc1d89a2d577c0aa11 |
| cpp  | ok   | ok  | 19           | 3e754e46bdadb1a815ecc856b9453cb4c9d8c64341d114bc1d89a2d577c0aa11 |

Golden stdout (also in `gate/fixtures/casino-slots-payline.stdout`):

```
1000
100000
0
1000
```

($1 bet, three sevens = $10.00; five diamonds = $1,000.00; a two-cherry
near-miss pays 0; 50c bet, four bells = $10.00.)

## casino-progressive-jackpot

- Gate: `cuni check games/casino-progressive-jackpot.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `5177fabbd1f946997df878500207f8dc9e81fcd72ac13f12b19cde2c9bedf019`
- Seat matrix, every seat 23 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 23           | 20caf588a7a98191ce6b9dc0ed9f3ccc6828b88335c06a2aeead1a4f08744a20 |
| js   | ok   | ok  | 23           | 20caf588a7a98191ce6b9dc0ed9f3ccc6828b88335c06a2aeead1a4f08744a20 |
| ts   | ok   | ok  | 23           | 20caf588a7a98191ce6b9dc0ed9f3ccc6828b88335c06a2aeead1a4f08744a20 |
| c    | ok   | ok  | 23           | 20caf588a7a98191ce6b9dc0ed9f3ccc6828b88335c06a2aeead1a4f08744a20 |
| cpp  | ok   | ok  | 23           | 20caf588a7a98191ce6b9dc0ed9f3ccc6828b88335c06a2aeead1a4f08744a20 |

Golden stdout (also in `gate/fixtures/casino-progressive-jackpot.stdout`):

```
1000020
1000030
500000
```

($10,000 pool + $10 bet at 2% = $10,000.20; + $5 bet = $10,000.30;
post-win reset to the $5,000 seed.)

## casino-tourney-points

- Gate: `cuni check games/casino-tourney-points.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `be59fa0d6c1847b9e5ba0e7c3a9495fd14fded625516e4c6404201ef002ce66d`
- Seat matrix, every seat 20 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 20           | 1bd45647ff031dd0bacee8ff81a402e169fa9f62bb45f06bfc285ee450416aa8 |
| js   | ok   | ok  | 20           | 1bd45647ff031dd0bacee8ff81a402e169fa9f62bb45f06bfc285ee450416aa8 |
| ts   | ok   | ok  | 20           | 1bd45647ff031dd0bacee8ff81a402e169fa9f62bb45f06bfc285ee450416aa8 |
| c    | ok   | ok  | 20           | 1bd45647ff031dd0bacee8ff81a402e169fa9f62bb45f06bfc285ee450416aa8 |
| cpp  | ok   | ok  | 20           | 1bd45647ff031dd0bacee8ff81a402e169fa9f62bb45f06bfc285ee450416aa8 |

Golden stdout (also in `gate/fixtures/casino-tourney-points.stdout`):

```
10000
1000
100
2133
```

(1st of 100 = 10,000 pts; 10th = 1,000; 100th = 100; 3rd of 64 = 2,133.)

## casino-cashback

- Gate: `cuni check games/casino-cashback.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `c193f4cdfbe7da2438f7a788fceb7c5d4579b2e1521eeb6499eb9a019920ab47`
- Seat matrix, every seat 13 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 13           | 329b10016cde275167b7eeff7c0b2b2eb64948ec5b2359a0bb279a835bd1c45d |
| js   | ok   | ok  | 13           | 329b10016cde275167b7eeff7c0b2b2eb64948ec5b2359a0bb279a835bd1c45d |
| ts   | ok   | ok  | 13           | 329b10016cde275167b7eeff7c0b2b2eb64948ec5b2359a0bb279a835bd1c45d |
| c    | ok   | ok  | 13           | 329b10016cde275167b7eeff7c0b2b2eb64948ec5b2359a0bb279a835bd1c45d |
| cpp  | ok   | ok  | 13           | 329b10016cde275167b7eeff7c0b2b2eb64948ec5b2359a0bb279a835bd1c45d |

Golden stdout (also in `gate/fixtures/casino-cashback.stdout`):

```
1000
0
149
0
```

($100 net loss at 10% = $10.00; a winning period and break-even rebate 0;
$9.99 loss at 15% = $1.49 — integer division floors.)

## casino-aml-structuring

- Gate: `cuni check games/casino-aml-structuring.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `384fcf00a5c8e0e130adc514edbc5f3c0991ac7ed6c5c366a5161ec6367caa20`
- Seat matrix, every seat 10 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 10           | dc5cd560900fa1e825fe219b99689a600a24c97cd8beb31d322733f0825f3e5d |
| js   | ok   | ok  | 10           | dc5cd560900fa1e825fe219b99689a600a24c97cd8beb31d322733f0825f3e5d |
| ts   | ok   | ok  | 10           | dc5cd560900fa1e825fe219b99689a600a24c97cd8beb31d322733f0825f3e5d |
| c    | ok   | ok  | 10           | dc5cd560900fa1e825fe219b99689a600a24c97cd8beb31d322733f0825f3e5d |
| cpp  | ok   | ok  | 10           | dc5cd560900fa1e825fe219b99689a600a24c97cd8beb31d322733f0825f3e5d |

Golden stdout (also in `gate/fixtures/casino-aml-structuring.stdout`):

```
1
0
1
0
0
```

($10,000 deposit at a $10,000 threshold reports; $9,999.99 does not. Three
$9,000 deposits = structuring flag; $8,000 window total = clean; one $15,000
deposit already trips the single-deposit rule, not structuring.)

## casino-referral-bonus

- Gate: `cuni check games/casino-referral-bonus.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `c430a24cbc3237efeb2dd578eb9a083c4143afab7d079db633394cfd7432661d`
- Seat matrix, every seat 12 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 12           | 1447964e922fa5e5e664ed9cba8ff2ed27c2f9db9084209b287a0daa5e7c44e9 |
| js   | ok   | ok  | 12           | 1447964e922fa5e5e664ed9cba8ff2ed27c2f9db9084209b287a0daa5e7c44e9 |
| ts   | ok   | ok  | 12           | 1447964e922fa5e5e664ed9cba8ff2ed27c2f9db9084209b287a0daa5e7c44e9 |
| c    | ok   | ok  | 12           | 1447964e922fa5e5e664ed9cba8ff2ed27c2f9db9084209b287a0daa5e7c44e9 |
| cpp  | ok   | ok  | 12           | 1447964e922fa5e5e664ed9cba8ff2ed27c2f9db9084209b287a0daa5e7c44e9 |

Golden stdout (also in `gate/fixtures/casino-referral-bonus.stdout`):

```
2500
0
2500
```

($20 first deposit = $25.00 bonus; $19.99 = 0; $100 = $25.00.)

## casino-comp-points

- Gate: `cuni check games/casino-comp-points.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `c4f40db460e92402b4b87c0ebbaee5b4f351d5b5204df1f0ee8763c8bffe179f`
- Seat matrix, every seat 12 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 12           | f137f9b8a29c8ce4f0ee48faea483bbc6e256bc57d28dc3ec6541db949da6531 |
| js   | ok   | ok  | 12           | f137f9b8a29c8ce4f0ee48faea483bbc6e256bc57d28dc3ec6541db949da6531 |
| ts   | ok   | ok  | 12           | f137f9b8a29c8ce4f0ee48faea483bbc6e256bc57d28dc3ec6541db949da6531 |
| c    | ok   | ok  | 12           | f137f9b8a29c8ce4f0ee48faea483bbc6e256bc57d28dc3ec6541db949da6531 |
| cpp  | ok   | ok  | 12           | f137f9b8a29c8ce4f0ee48faea483bbc6e256bc57d28dc3ec6541db949da6531 |

Golden stdout (also in `gate/fixtures/casino-comp-points.stdout`):

```
25
0
2500
0
```

($25.50 wagered = 25 points; 99c wagered = 0; 2,500 points = $25.00.)

## casino-rtp-audit

- Gate: `cuni check games/casino-rtp-audit.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `5b25525b0ccd5960ff05b31d31477f9b8accf0b0d166f17fda9bc149e983cc57`
- Seat matrix, every seat 16 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 16           | 0098015f4ec26db6ea504e56c8289abee4bf859db3e6c1c14df130feea7b7ed4 |
| js   | ok   | ok  | 16           | 0098015f4ec26db6ea504e56c8289abee4bf859db3e6c1c14df130feea7b7ed4 |
| ts   | ok   | ok  | 16           | 0098015f4ec26db6ea504e56c8289abee4bf859db3e6c1c14df130feea7b7ed4 |
| c    | ok   | ok  | 16           | 0098015f4ec26db6ea504e56c8289abee4bf859db3e6c1c14df130feea7b7ed4 |
| cpp  | ok   | ok  | 16           | 0098015f4ec26db6ea504e56c8289abee4bf859db3e6c1c14df130feea7b7ed4 |

Golden stdout (also in `gate/fixtures/casino-rtp-audit.stdout`):

```
9625
9700
10000
```

($9,625 paid on $10,000 wagered = 96.25%; $4,850 on $5,000 = 97.00%;
even money = 100.00%. Basis points, no decimals, no floats.)

## casino-raffle-draw

- Gate: `cuni check games/casino-raffle-draw.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `ba9c92a34c279e76003d1eb5c65a8fbd9743b0a14134b6b9b8ba627e0330e031`
- Seat matrix, every seat 7 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 7            | fbd129ab4ee3e7183963ce80892140445174921783bb017d969928e74a473138 |
| js   | ok   | ok  | 7            | fbd129ab4ee3e7183963ce80892140445174921783bb017d969928e74a473138 |
| ts   | ok   | ok  | 7            | fbd129ab4ee3e7183963ce80892140445174921783bb017d969928e74a473138 |
| c    | ok   | ok  | 7            | fbd129ab4ee3e7183963ce80892140445174921783bb017d969928e74a473138 |
| cpp  | ok   | ok  | 7            | fbd129ab4ee3e7183963ce80892140445174921783bb017d969928e74a473138 |

Golden stdout (also in `gate/fixtures/casino-raffle-draw.stdout`):

```
77
7
9
```

(seed 12345, 100 tickets -> ticket 77; seed 999, 50 tickets -> ticket 7;
seed 1, 10 tickets -> ticket 9.)

Exactness note: the first draft mixed the seed with full 64-bit LCG
constants and the gate refused it — Python big-ints, C int64 wrap, and JS
doubles computed three different winners (33 / 21 / 89). The published
program keeps all mixing under 2^31 (Park-Miller, same arithmetic as the
dice game), and all five seats agree. The refusal is the product.

## casino-baccarat-settle

- Gate: `cuni check games/casino-baccarat-settle.cuni --only py,js,ts,c,cpp --receipt`
- Front-end: ok. Emit/run: 5/5 ok. `exactness: PASS (5 langs)`
- Source SHA-256: `44bf488f09610fad0e535330dddc4dc066fee4e4ea5ff591c201c187c8f1d004`
- Seat matrix, every seat 22 bytes, byte-identical (verified with `cmp`):

| seat | emit | run | stdout bytes | stdout SHA-256 |
|------|------|-----|--------------|----------------|
| py   | ok   | ok  | 22           | da399e889e8ea4145f647eda780a0f6a933b498e07f2799f704a571809dfbfc6 |
| js   | ok   | ok  | 22           | da399e889e8ea4145f647eda780a0f6a933b498e07f2799f704a571809dfbfc6 |
| ts   | ok   | ok  | 22           | da399e889e8ea4145f647eda780a0f6a933b498e07f2799f704a571809dfbfc6 |
| c    | ok   | ok  | 22           | da399e889e8ea4145f647eda780a0f6a933b498e07f2799f704a571809dfbfc6 |
| cpp  | ok   | ok  | 22           | da399e889e8ea4145f647eda780a0f6a933b498e07f2799f704a571809dfbfc6 |

Golden stdout (also in `gate/fixtures/casino-baccarat-settle.stdout`):

```
2000
1950
9000
1000
0
```

($10 on player, player wins = $20.00; $10 on banker, banker wins = $19.50
after the 5% commission; $10 on tie, tie = $90.00; $10 on player on a tie
hand pushes — $10.00 back; $10 on banker, player wins = 0.)

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
