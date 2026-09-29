# ExactOdds

## What ExactOdds is

ExactOdds makes dice that can't lie. It provides the core building blocks for games of chance — dice rolls, coin flips — with the math out in the open and every result verifiable. If a result can't be proven fair, it is refused.

Here is why that matters. An online game runs the same code on many platforms — a phone, a browser, a server — and players have to trust that the house didn't tilt the odds on any one of them. ExactOdds removes the need for trust: the reference games are run through five programming languages — Python, JavaScript, TypeScript, C, and C++ — and all five must print byte-identical results, checked mechanically, not claimed.

If five independent implementations agree down to the last byte, the game can't favor the house on one platform and rob it on another. A disagreement isn't smoothed over — it stops the line. The refusal is the guarantee.

The code is open source on GitHub, with a paper in the repository describing the method and an operator one-pager for anyone running games. It is dual-licensed: free under AGPL-3.0, or a commercial license from the lab.

Fair outcomes you can prove. Rules you can prove. Both, or neither.

ExactOdds is a protocol for provably-fair gaming with two halves: **commit-reveal
seeds** (the outcome was fixed before your bet) and the **exactness law** (the
game program produces byte-identical output on every target seat — Python,
JavaScript, TypeScript, C, C++ — or the program is refused). Today's
"provably fair" proves only the outcome. ExactOdds proves the rules too: the
program an auditor gates is the only program that can pass, so a house can't
run different rules in production than the ones it showed the auditor.

## What's here

- `games/` — four reference games (`provably-fair-dice.exactodds`,
  `provably-fair-coin-flip.exactodds`, `provably-fair-roulette.exactodds`,
  `provably-fair-crash.exactodds`) and fifteen casino rule packs
  (`casino-bonus-wagering.exactodds`, `casino-poker-rake.exactodds`,
  `casino-sportsbook-settlement.exactodds`, `casino-affiliate-revshare.exactodds`,
  `casino-responsible-limits.exactodds`, `casino-slots-payline.exactodds`,
  `casino-progressive-jackpot.exactodds`, `casino-tourney-points.exactodds`,
  `casino-cashback.exactodds`, `casino-aml-structuring.exactodds`,
  `casino-referral-bonus.exactodds`, `casino-comp-points.exactodds`,
  `casino-rtp-audit.exactodds`, `casino-raffle-draw.exactodds`,
  `casino-baccarat-settle.exactodds`). Short, readable,
  deterministic: seeds in, result out. All money math is integer cents —
  no floats anywhere.
- `gate/` — the exactness gate runner (`run-gate.sh`), golden fixtures
  (`fixtures/`), and the per-seat gate report (`GATE_REPORT.md`).
- `receipts/` — source-hash receipts from the verified 2026-09-26 runs.
- `paper/` — `PAPER.md` (the full protocol paper), `PAPER.pdf`, and
  `OPERATOR_ONEPAGER.md` (one page for casino operators).
- `sdk/js/` — the `exactodds` npm package: all 35 rule functions as a JS
  library, generated from the `.exactodds` sources. `npm test` replays every
  audited case against the golden fixtures.
- `sdk/mcp/` — the `exactodds-mcp` package: all 35 rule functions as MCP
  tools over stdio. `npx -y exactodds-mcp` in your MCP client config.
- `api/` — `exactodds-api`: `POST /v1/<program>/<function>` with JSON
  integers; every answer carries the `source_hash` of the ExactOdds rules that
  ran. Dockerfile + `fly.toml` included.

All three consume the same emitted JS seat, so npm, MCP, and API can never
disagree with each other — or with the Python, C, and C++ seats.

## Verify a game in 5 steps (players)

You need the game's source, a SHA-256 tool, and any one of: Python 3, node,
or gcc.

1. **Get the source.** `games/provably-fair-coin-flip.exactodds` in this repo, or
   the copy your house publishes.
2. **Hash it.** `sha256sum games/provably-fair-coin-flip.exactodds` must equal the
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
