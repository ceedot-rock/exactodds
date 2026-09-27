# ExactOdds — one page for casino operators

**Fair outcomes you can prove. Rules you can prove. Both, or neither.**

## The gap in today's "provably fair"

Your casino already proves outcomes: commit-reveal seeds, the player
re-runs the math, the roll wasn't rigged. That half works.

The half that doesn't: the *rules*. The program on your server that turns
seeds into results is a black box. Show one ruleset to an auditor, run
another in production — no seed math catches that. Players verify the dice.
Nobody verifies the table.

## What ExactOdds adds

One law: **the same game program, byte-identical output on every machine —
or the program is refused.** Your game is written once, compiled to Python,
JavaScript, TypeScript, C, and C++ seats, and every seat must produce the
exact same bytes for the same seeds. Any disagreement, any seat, and the
game doesn't ship.

What that buys you:

- **One ruleset, everywhere.** The program the auditor gates is the only
  program that can pass. Change a line and the source hash changes; change
  behavior and the gate fails. "Different code in production" becomes
  checkable by anyone.
- **Audits that fit in a receipt.** The gate writes a source-hash receipt:
  SHA-256 of the exact source, the pass verdict, per-seat results. That's
  your audit artifact — publish it next to the source hash.
- **Verification players can actually do.** Get the source, hash it, check
  the revealed seed against the pre-bet commitment, re-run the round in any
  language, compare. Five steps, free tools, tonight.

## The reference games

Three games ship gated and receipted (2026-09-26, all five seats PASS,
byte-identical):

- **Dice** — Park-Miller mix of server seed + client seed + round, roll is
  `(state % 6) + 1`. Source `795a43fa…ccdbb44`.
- **Coin flip** — same derivation, heads on even state, tails on odd.
  Source `04783043…7510c3d0`.
- **Roulette** — same derivation, winning number `(state % 37)` on a European
  wheel; color, odd/even, high/low derived from the number. Source
  `1eaac333…79c9cc9c`.

Each new game (blackjack, roulette, slots) follows the same pattern: one
source, one gate pass, one receipt.

## What it is not

Not a casino. Not a gaming license. No custody of funds — no wallets, no
escrow, no tokens. Your compliance and your money handling stay yours.

## Next step

Read `paper/PAPER.md` (the full protocol), then run `./gate/run-gate.sh`
to reproduce the PASS yourself. The gate either passes everywhere or the
game is refused — that's the whole pitch.

*Slid Phi Labs — AGPL-3.0, or commercial license at $2,500/yr per operator. Contact Corey@slidphilabs.com.*
