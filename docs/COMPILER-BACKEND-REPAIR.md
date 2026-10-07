# Compiler-backend repair spec (cuni-langs follow-up)

## Status

The ExactOdds 1.1.0 release clears the arithmetic gate *otherwise*: the
SDK-side adapter (`sdk/js/exact_seed_codegen.py`) aligns the JS seat's
arithmetic with the reference, fail-closed. The reference compiler's JS
backend (`cuni-langs/src/codegen_js.rs`) still emits f64-unsafe integer
arithmetic. This document specifies exactly what a backend repair entails,
so the follow-up is a defined task, not a vague gate.

## The defect, precisely

`codegen_js.rs` emits integer `*`/`%`/`/` as raw JS operators on Numbers
(f64). Any intermediate product exceeding 2^53 loses precision silently.
Demonstrated 2026-10-07 via `gate/run-boundary-check.sh`:

| Vector | py/c/cpp seats | js/ts seats |
|---|---|---|
| `roll_dice(1234567890123456, 1, 1)` | 2 | 4 |
| `roll_dice(9007199254740991, 1, 1)` | 4 | 5 |
| `roll_hundred(1234567890123456, 1, 1)` | 25 | 67 |

The backend already emits `_cuni_mod` (Python-floored modulo) and `_cuni_div`
helpers for some shapes, but the *operands* are still f64 — the helpers fix
truncation semantics, not precision.

## Repair options

### Option A — BigInt integer domain (correct, large blast radius)

Emit all CuNi `int` arithmetic as BigInt: literals as `123n`, `+`/`-`/`*` as
BigInt ops, `div`/`mod` via BigInt helpers. This makes the JS seat exact for
the full int64 domain on every program, not just the seed mixer.

Consequences: every existing JS consumer sees BigInt values instead of
Numbers (JSON serialization, `%`/`/` semantics, interop with Number code all
change). This is a breaking change to the compiler's JS target and needs its
own spec, migration, and seat-matrix re-verification across all CuNi programs.

### Option B — targeted exactness for the seed-mixer pattern (narrow)

Teach the backend to recognize the exact seed-mixer shape it already
special-cases nowhere: emit the two-line mixer via a `_cuni_seed_state`
helper using BigInt internally, returning Number (the result is bounded by
2^31-1, so the conversion is exact). This is the compiler-side equivalent of
what the SDK adapter does today.

Consequences: narrow, but bakes a domain-specific pattern into a
general-purpose compiler — the same objection that motivated the SDK-side
adapter in the first place.

## Recommendation

Keep Option A as the long-term direction for the compiler (it is the only
repair that fixes the bug *class*), and keep the SDK adapter as the
ExactOdds-side mitigation until the compiler ships it. Do not do Option B:
a pattern-specific hack in the compiler is worse than the current explicit,
reviewed, fail-closed adapter.

## Acceptance criteria for closing this follow-up

- [ ] `gate/run-boundary-check.sh` shows js/ts seats agreeing with py/c/cpp
      on all vectors (the script already reports the divergence; it should
      go green, not just report).
- [ ] Full five-seat gate passes unchanged (no fixture drift).
- [ ] The SDK adapter's shape check still passes (or is retired with a
      recorded decision, since the backend no longer needs adapting).
- [ ] cuni-langs CHANGELOG records the semantic change and migration.
