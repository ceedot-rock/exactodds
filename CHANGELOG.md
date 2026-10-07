# ExactOdds Changelog

## 1.1.0 — 2026-10-07
- **Exact seed arithmetic (bug fix):** the JS SDK's Park-Miller seed mixer
  (`roll_dice`, `roll_hundred`, `flip`, `flip_bit`, `spin`, `spin_line`,
  `crash_point`) used f64 multiplication and silently returned wrong results
  for large inputs (e.g. `roll_dice(1234567890123456, 1, 1)` was 4, correct is
  2). The mixer now computes exactly via BigInt and matches the py/c/cpp
  reference seats on the full safe-integer domain. The fix is applied by a
  narrow, fail-closed build adapter (`sdk/js/exact_seed_codegen.py`) that
  refuses unreviewed emitter output instead of silently passing it.
- **New input contract:** seed/round params must be non-negative safe-integer
  Numbers. Anything else throws `RangeError` with `code:
  'ERR_EXACTODDS_SEED_INPUT'` and a `parameter` name. Large inputs that were
  previously (incorrectly) accepted now return corrected results — do not
  silently re-settle historical outcomes; see MIGRATION-1.1.0.md.
- **Raffle bound enforced:** `raffle_winner` now enforces its documented
  "seed below 290 trillion" bound (same f64 bug class) and requires positive
  integer `tickets` (was NaN for 0), with the same coded refusal.
- **Verifier:** `crash_point` added to the verifier core + audited vectors;
  verifier input domain aligned to the SDK's (non-negative safe integers).
- **API/MCP:** input validation tightened to safe integers; SDK input
  refusals now map to HTTP 400 / MCP client-input errors instead of 500s.
- **Build:** `sdk/js/build.py` now runs a fresh reference-compiler build and
  adapts its output; compiler prelude helpers rebranded `_cuni_*` → `_eo_*`.
- 90/90 SDK checks, 147/147 node tests, 14/14 adapter tests, 41/41 verifier
  checks pass. Five-seat gate passes on all 19 games; new
  `gate/run-boundary-check.sh` proves py/c/cpp/SDK agreement on large inputs.

## 1.0.0 — 2026-09-29
- First public release: provably-fair casino rule packs (dice, coin-flip, slots,
  progressive, tourney, cashback, AML, referral, comps, RTP, raffle, baccarat).
- `exactodds` npm SDK (sdk/js): same rules on every seat — integer cents, no floats.
- `exactodds-mcp` MCP server (sdk/mcp): rule packs as MCP tools over stdio.
- HTTP API with Dockerfile + fly.toml.
- Dual license: AGPL-3.0-or-later OR Slid Phi Labs Commercial License.
- 90/90 SDK checks pass; reference games pass the 5-seat gate
  (py/js/ts/c/cpp, byte-identical stdout).
