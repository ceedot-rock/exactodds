# Migrating to ExactOdds 1.1.0

## What changed and why

Version 1.0.0 of the JS SDK computed the Park-Miller seed mixer
(`(server_seed * 31 + client_seed * 17 + round * 13) % 2147483647`, then
`(48271 * mixed) % 2147483647`) in f64 floating point. For inputs whose
weighted products exceed 2^53, the results were silently wrong. Version 1.1.0
computes the mixer exactly (BigInt) and matches the py/c/cpp reference seats
on the full safe-integer domain.

Concrete example:

| Call | 1.0.0 (wrong) | 1.1.0 (correct) |
|---|---|---|
| `roll_dice(1234567890123456, 1, 1)` | 4 | 2 |
| `roll_dice(9007199254740991, 1, 1)` | 5 | 4 |

Small inputs (the audited fixtures) are unchanged: all 90 audited checks
produce byte-identical outputs.

## Do not silently re-settle historical outcomes

If your system recorded 1.0.0 outputs for large inputs, those recorded values
are the *wrong* values. 1.1.0 deliberately returns different (correct) values
for them. Decide explicitly how to handle already-settled rounds — the SDK
will not do it for you, and upgrading does not rewrite history.

## New input contract

Seed and round parameters must now be primitive Numbers that are integers in
`[0, Number.MAX_SAFE_INTEGER]`. Everything else — strings, BigInts, booleans,
objects, missing arguments, negatives, fractions, unsafe integers, NaN,
Infinity — throws:

```js
{
  name: 'RangeError',
  code: 'ERR_EXACTODDS_SEED_INPUT',   // stable, match on this
  parameter: 'server_seed' | 'client_seed' | 'round' | 'seed' | 'tickets'
}
```

The HTTP API maps this to status 400 (was: 500). The MCP server surfaces it
as a client-input tool error. The API also now rejects non-safe-integer JSON
numbers at the boundary with 400.

`raffle_winner` additionally enforces its long-documented bound: `seed` must
be below 290 trillion, `tickets` a positive integer.

## Verifier alignment

The verifier (`verifier/`) now accepts the same domain as the SDK:
non-negative safe integers (as decimal strings). Decimal strings above
`9007199254740991` are now refused rather than computed.

## Checklist

- [ ] Search stored outcomes for inputs above the f64 precision boundary
      (any seed/round where `value * 31 > 2^53`, i.e. value > ~2.9e14).
- [ ] Decide the re-settlement policy for affected historical rounds.
- [ ] Update input validation to send only non-negative safe integers.
- [ ] Handle `ERR_EXACTODDS_SEED_INPUT` (RangeError) as a client-input error.
- [ ] If you call `raffle_winner`, confirm seeds are below 290 trillion.
