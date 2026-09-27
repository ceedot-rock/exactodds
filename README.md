# ExactOdds

Fair outcomes you can prove. Rules you can prove. Both, or neither.

ExactOdds is a protocol for provably-fair gaming with two halves: **commit-reveal
seeds** (the outcome was fixed before your bet) and the **exactness law** (the
game program produces byte-identical output on every target seat — Python,
JavaScript, TypeScript, C, C++ — or the program is refused). Today's
"provably fair" proves only the outcome. ExactOdds proves the rules too: the
program an auditor gates is the only program that can pass, so a house can't
run different rules in production than the ones it showed the auditor.

## What's here

- `games/` — four reference games (`provably-fair-dice.cuni`,
  `provably-fair-coin-flip.cuni`, `provably-fair-roulette.cuni`,
  `provably-fair-crash.cuni`) and fifteen casino rule packs
  (`casino-bonus-wagering.cuni`, `casino-poker-rake.cuni`,
  `casino-sportsbook-settlement.cuni`, `casino-affiliate-revshare.cuni`,
  `casino-responsible-limits.cuni`, `casino-slots-payline.cuni`,
  `casino-progressive-jackpot.cuni`, `casino-tourney-points.cuni`,
  `casino-cashback.cuni`, `casino-aml-structuring.cuni`,
  `casino-referral-bonus.cuni`, `casino-comp-points.cuni`,
  `casino-rtp-audit.cuni`, `casino-raffle-draw.cuni`,
  `casino-baccarat-settle.cuni`). Short, readable,
  deterministic: seeds in, result out. All money math is integer cents —
  no floats anywhere.
- `gate/` — the exactness gate runner (`run-gate.sh`), golden fixtures
  (`fixtures/`), and the per-seat gate report (`GATE_REPORT.md`).
- `receipts/` — source-hash receipts from the verified 2026-09-26 runs.
- `paper/` — `PAPER.md` (the full protocol paper), `PAPER.pdf`, and
  `OPERATOR_ONEPAGER.md` (one page for casino operators).
- `sdk/js/` — the `exactodds` npm package: all 35 rule functions as a JS
  library, generated from the `.cuni` sources. `npm test` replays every
  audited case against the golden fixtures.
- `sdk/mcp/` — the `exactodds-mcp` package: all 35 rule functions as MCP
  tools over stdio. `npx -y exactodds-mcp` in your MCP client config.
- `api/` — `exactodds-api`: `POST /v1/<program>/<function>` with JSON
  integers; every answer carries the `source_hash` of the CuNi rules that
  ran. Dockerfile + `fly.toml` included.

All three consume the same emitted JS seat, so npm, MCP, and API can never
disagree with each other — or with the Python, C, and C++ seats.

## Verify a game in 5 steps (players)

You need the game's source, a SHA-256 tool, and any one of: Python 3, node,
or gcc.

1. **Get the source.** `games/provably-fair-coin-flip.cuni` in this repo, or
   the copy your house publishes.
2. **Hash it.** `sha256sum games/provably-fair-coin-flip.cuni` must equal the
   `source_hash` in `receipts/provably-fair-coin-flip.receipt.json`. If not,
   that's a different game — stop.
3. **Check the revealed seed.** After your round the house reveals its
   `server_seed`. `echo -n "$server_seed" | sha256sum` must match the
   commitment published *before* you bet.
4. **Re-run the round.** Plug the revealed server seed, your client seed,
   and the round number into the program's `flip` function — any seat works;
   the gate guarantees they all agree. The output must match the result the
   house reported for your round.
5. **Check the receipt.** `receipts/` holds the gated verdict. Auditors can
   re-run `./gate/run-gate.sh` to reproduce the PASS.

## Run the gate (auditors, operators)

```sh
./gate/run-gate.sh
```

This needs the ExactOdds reference compiler. Point it at your build:

```sh
PROVABLY_COMPILER=/path/to/cuni ./gate/run-gate.sh
```

It defaults to `../cuni-langs/target/debug/cuni` (the lab tree), then
`~/workspace/cuni-langs/target/debug/cuni`, then `cuni` on PATH. For each
game it emits all five native seats, runs them, demands byte-identical
stdout, writes a fresh source-hash receipt into `receipts/`, and checks the
output against the golden fixtures. Exit 0 means every game passed and no
fixture drifted.

## Reference

- Full protocol: `paper/PAPER.md` (also `paper/PAPER.pdf`)
- Operator summary: `paper/OPERATOR_ONEPAGER.md`
- Seat-by-seat evidence: `gate/GATE_REPORT.md`

## License

Dual-licensed: AGPL-3.0 (`LICENSE.AGPL-3.0`) or the Slid Phi Labs Commercial
License (`LICENSE.COMMERCIAL`) at $2,500/yr per operator. See `LICENSE` and `NOTICE`.

Copyright (c) 2026 Slid Phi Labs / Corey Tasz.

## What this is not

Not a casino, not a gaming license, no custody of funds, not a randomness
source. See §5 of the paper.
