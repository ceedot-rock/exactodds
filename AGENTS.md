# AGENTS.md — exactodds

ExactOdds: provably-fair casino rule packs. Reference games (dice, coin-flip)
pass the 5-seat gate: py/js/ts/c/cpp, byte-identical stdout, cmp-verified.

## Layout

- `sdk/js/` — `exactodds` on npm
- `sdk/mcp/` — `exactodds-mcp` on npm
- `games/`, `gate/` — rules and the 5-seat verification gate

## Test

Run the gate before any release claim: all five seats must produce
byte-identical stdout, verified with `cmp`. A green test run is not a green
verdict — quote every warning first.

## Publish (Corey, Termux)

Bump version, `npm publish --access public` from `sdk/js/` and `sdk/mcp/`.

## Gotchas

- Both package.jsons MUST carry `repository` + `homepage`.
- Dual license: AGPL-3.0 + Slid Phi Labs Commercial. NOTICE to Corey Tasz.
- No CuNi branding user-facing (Corey's call).
