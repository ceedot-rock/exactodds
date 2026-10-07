## What changed

<!-- One or two sentences. -->

## Rule packs touched

<!-- e.g. games/provably-fair-dice.exactodds, or "none" -->

## Checks

- [ ] `cd sdk/js && node test/run.js` passes
- [ ] Full gate run (`./gate/run-gate.sh`) shows `exactness: PASS` on all five seats, if any rule changed
- [ ] Receipts in `receipts/` updated for any changed game source
- [ ] Money math stays in integer cents
