# Contributing to ExactOdds

Thanks for helping make games of chance provable.

## Ground rules

- All money math is integer cents. No floats, ever.
- Every rule must produce byte-identical stdout on all five seats
  (Python, JavaScript, TypeScript, C, C++), or it does not ship.
- A refusal from the gate is a result, not something to work around.

## Quick checks (no compiler needed)

```sh
cd sdk/js && node test/run.js        # replays every audited case
```

CI runs this, an API smoke test, and a receipt check
(`sha256(games/*.exactodds)` must equal each receipt's `source_hash`) on
every pull request.

## Full gate (compiler required)

```sh
PROVABLY_COMPILER=/path/to/cuni ./gate/run-gate.sh
```

## Adding or changing a rule pack

1. Add or edit `games/<name>.exactodds`.
2. Add golden outputs in `gate/fixtures/`.
3. Run the full gate. It must print `exactness: PASS` for every seat.
4. Commit the updated receipt in `receipts/`.
5. Open a pull request using the template.

## Licensing

ExactOdds is dual-licensed (AGPL-3.0-or-later or the Slid Phi Labs Commercial
License). By contributing you agree your contribution may be distributed under
both.
