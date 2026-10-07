# ExactOdds Private Arithmetic-Fix Candidate

> **Review addendum — Odin, 2026-10-07.** Reviewed independently: the bug is
> real (reproduced the wrong outputs), the three pinned oracle anchors check
> out, the fix math matches the `.exactodds` sources exactly. Cleared for
> release as 1.1.0 with the gates below all resolved; see CHANGELOG.md,
> MIGRATION-1.1.0.md, `gate/run-boundary-check.sh`, and
> `docs/COMPILER-BACKEND-REPAIR.md`. Two findings beyond the candidate:
> (1) the adapter's expected emitter shape didn't match the current reference
> compiler (it emits `_cuni_mod`, not raw `%`) — fixed, and the fail-closed
> check correctly refused the mismatch; (2) `raffle_winner` had the same bug
> class with a documented-but-unenforced 290T bound — now enforced.

Prepared October 7, 2026. Base: `1ab7f0e16eeb9442e117d41149e690f611a3f68d`.
This candidate includes the earlier regression patch.

## Warnings first

This is a private SDK fix candidate, not a release or production-readiness
verdict. The five-runtime gate was attempted but could not run because the
reference compiler is absent. No fresh compiler build, native-runtime
verification, API/MCP integration test, or browser UI test has been completed.
Odin has not reviewed or approved this candidate.

The new SDK input contract and changed large-input results require compatibility
review. Existing API wrappers would turn the new SDK refusal into HTTP 500
instead of a client-input error; mapping that error is still release-blocking.
The verifier accepts a wider decimal-string domain than this SDK candidate.
This patch does not make all public input contracts consistent.

Nothing has been committed, pushed, published, deployed, or sent to Odin.
Source programs, receipts, licenses, versions, and CI workflows are unchanged.

## Candidate implementation

- **Exact intermediate arithmetic:** `seed-math.js` validates Number inputs,
  converts them to BigInt before multiplication, performs both modular steps
  exactly, and converts only the bounded state back to Number.
- **Shared scope:** Six mixer functions use the helper: `roll_dice`,
  `roll_hundred`, `flip`, `flip_bit`, `spin`, and `crash_point`. `spin_line`
  inherits it through `spin`. Outputs remain Numbers or existing strings,
  with no BigInt values returned to callers or JSON.
- **Generator integration:** `build.py` calls a narrow transformation in
  `exact_seed_codegen.py`. It checks target names, parameter signatures, and
  the exact emitted mixer prefix; unexpected shapes fail explicitly.
- **Checked-in artifacts:** The same transformation refreshed four existing
  generated SDK modules. This was not a fresh compiler invocation.
- **Test integration:** `npm test` rebuilds then runs the candidate checks.
  `npm run test:candidate` runs existing artifacts without a compiler.

For non-negative inputs, the computed state is less than `2147483647`, so the
conversion from BigInt to Number is exact. The reviewed downstream functions
operate on this bounded state. This is not a general exact-integer fix for
other settlement, raffle, or money calculations.

## Proposed input contract

Each seed and round must be a primitive JavaScript Number, an integer, and in
the inclusive range `0` to `Number.MAX_SAFE_INTEGER`. Negative zero is treated
as zero. Invalid values throw `RangeError` with:

```text
code: ERR_EXACTODDS_SEED_INPUT
parameter: server_seed | client_seed | round
```

Strings, BigInt arguments, booleans, objects, arrays, missing arguments, negative
numbers, fractions, unsafe Numbers, NaN, and infinity are refused rather than
coerced. The old SDK did not consistently refuse these values, so this is a
behavior change, not a backwards-compatibility guarantee.

Large accepted inputs intentionally produce corrected results. For example,
`roll_dice(1234567890123456, 1, 1)` changes from `4` to `2`, and
`roll_dice(9007199254740991, 1, 1)` changes from `5` to `4`.
Do not silently re-settle historical outcomes with this candidate.

## Verification

Run from a repository checkout:

```sh
npm --prefix sdk/js run test:candidate
git diff --check
```

Observed on Node v20.20.2:

| Check | Result |
|---|---|
| Existing SDK fixtures | 90 passed |
| Existing verifier validation | 38 passed, 0 failed |
| Original numeric regression suite | 105 passed; previously 14 failed |
| Additional seed-arithmetic suite | 42 passed |
| Combined Node test suites | 147 passed, 0 failed, 0 skipped |
| Python generator-adapter tests | 11 passed |
| Combined patch on a clean baseline worktree | Applies cleanly; same passing test results |
| Local npm packaging dry run | Required `seed-math.js` helper included; nothing published |

The additional suite checks 262 deterministic input vectors across seven
public functions, compares six functions with verifier math and crash with a
separate exact-integer formula, checks JSON-compatible output types, and
exercises 18 invalid input values at each parameter position. It also checks
missing arguments and flat/namespaced/direct export identity.

Generator tests cover changed formulas and signatures, missing/duplicate
functions, unexpected mixed-state consumers, unaffected functions, refresh
consistency, refusal before writes on a shape mismatch, and safe refusal of
a second refresh.

The earlier `NUMERIC-PARITY.md` records the red baseline, not the current
candidate's result. The original regression assertions remain unchanged.

## Reproduction and patch handling

The combined patch applies to the base commit and includes both test and fix
files. To apply on a clean private checkout:

```sh
git apply --check ExactOdds-Private-Arithmetic-Fix-Candidate.patch
git apply ExactOdds-Private-Arithmetic-Fix-Candidate.patch
npm --prefix sdk/js run test:candidate
```

If the earlier test-only patch is already applied, do not blindly stack the
combined patch over it. Start from the recorded base or reconcile the two
unchanged regression files first.

For a fresh build, install the approved reference compiler, set
`PROVABLY_COMPILER`, and run `npm --prefix sdk/js test`. The adapter will refuse
emitter output that differs from the reviewed shape; review the change rather
than relaxing that check just to make a build pass.

`python3 sdk/js/exact_seed_codegen.py --refresh-checked-in` is only a one-time
refresh for the unpatched baseline artifacts. It refuses already-adapted
files and must not be represented as compilation.

## Remaining release gates

- Coordinate implementation ownership and review with Odin.
- Approve the numeric contract and versioning/migration approach, including
  changed historical outputs and previously coerced inputs.
- Align API/MCP input validation, schemas, and error mapping; test using this
  local SDK instead of the currently published package dependency.
- Decide whether verifier strings above the SDK range should remain a
  separate supported domain or be restricted consistently.
- Run a fresh build with the approved compiler and verify generated artifacts.
  Repair the raw JS/TS compiler path or otherwise align its arithmetic; this
  SDK adaptation does not modify the compiler.
- Extend the native gate with boundary and refusal vectors. Existing small
  fixtures alone are not evidence of full-domain parity.
- Review other arithmetic independently, including raffle and settlement
  calculations, and commission appropriate security/randomness review before
  any real-money readiness claim.
- Verify deployment revision and obtain explicit approval before publishing
  or deploying.
