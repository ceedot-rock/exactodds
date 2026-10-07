# Numeric parity regression patch

Private test-only draft prepared October 7, 2026 against commit
`1ab7f0e16eeb9442e117d41149e690f611a3f68d`.

## Warning and scope

The new regression suite is deliberately expected to fail against the current
SDK. It asserts correct exact-integer results, not the currently incorrect
outputs. This patch does not fix production arithmetic, change the supported
input contract, or establish release readiness.

The tests run against the checked-in SDK, standalone verifier module, and the
actual inline math core extracted from `verifier/verifier.html`. The HTML core
runs in a Node VM without the DOM; this is not a browser UI test. No network,
dependencies, compiler installation, or credentials are needed.

## Run from the repository root

```sh
node sdk/js/test/run.js
node verifier/validate.mjs
node --test sdk/js/test/numeric-parity.test.js
```

The first two commands are the existing baseline checks. The third must return
a nonzero exit status until the SDK mismatch is resolved. Run all three
separately to see both the passing baseline and the new failures.

The new test file is separate from generated `test/run.js`, so SDK regeneration
does not overwrite it. It is deliberately not added to CI or the existing npm
test command in this private draft. Running only the old commands does not
execute these regressions.

## Observed results

On Node v20.20.2, against the baseline commit:

| Check | Result |
|---|---|
| Existing SDK suite | 90 checks passed |
| Existing verifier validation | 38 checks passed, 0 failed |
| New regression suite | 105 tests: 91 passed, 14 failed, 0 skipped; exit code 1 |
| New suite: SDK only | 20 passed, 14 failed |
| New suite: standalone verifier | 34 passed, 0 failed |
| New suite: inline HTML verifier core | 34 passed, 0 failed |
| New suite: pinned oracle checks | 3 passed, 0 failed |

The 14 SDK failures cover both dice functions on seven vectors: the two
reported server seeds, the first sampled value above the server-seed and round
weighted-sum boundaries, maximum-safe client seed, maximum-safe round, and all
three inputs at the maximum safe integer. Not every value above the precision
boundary disagrees; a passing sampled vector does not establish a safe domain.

No production files, generated rule files, workflows, or package metadata were
changed. No commits, pushes, PRs, publications, or deployments were performed.

## Coverage

- Three independent oracle anchors pin mixed state, PRNG state, dice result,
  and hundred-roll result using Python integer arithmetic.
- Seventeen input vectors exercise both `roll_dice` and `roll_hundred` on three
  surfaces, plus three oracle checks, for 105 tests.
- Inputs include the two reported mismatches, a small control, zero, an existing
  audited example, weighted-sum precision boundaries for each parameter, and
  maximum-safe values in each parameter and all parameters together.
- Every input is a non-negative safe integer with a lossless conversion to
  Number. Precision loss occurs during arithmetic, not input conversion.
- The independent BigInt oracle reduces each weighted term before summing.
  Neither SDK output nor verifier output is used to generate expectations.
- Missing files, a missing/ambiguous inline core, import errors, exceptions,
  and output mismatches fail rather than silently skipping checks.

The three pinned anchors were calculated independently with:

```python
for ss, cs, r in [
    (987654321, 1, 1),
    (1234567890123456, 1, 1),
    (9007199254740991, 1, 1),
]:
    mixed = (ss * 31 + cs * 17 + r * 13) % 2147483647
    state = (48271 * mixed) % 2147483647
    print(mixed, state, state % 6 + 1, state % 100)
```

## Contract decisions and follow-up

This draft assumes the tested non-negative safe integers should produce exact
results. If the approved fix instead narrows the input domain, explicitly
classify accepted and rejected vectors and assert the agreed error type or
code. Do not convert arbitrary thrown errors into passing tests.

Negative values, fractional numbers, malformed strings, NaN, infinity, unsafe
Number inputs, and public string/BigInt support still need a consistent contract
and separate refusal tests across SDK, API, MCP, and verifier. They are not
silently treated as supported by this draft.

The API, MCP service, fresh compiler output, and native runtimes are not tested
here. Other games and randomness/security properties are outside this patch.
The full five-runtime gate has not been run. Before publishing any fix, align
the generator and input contracts, add transport/refusal tests, run the full
gate, and coordinate with Odin to avoid overlapping implementation work.
