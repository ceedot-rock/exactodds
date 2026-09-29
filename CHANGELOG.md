# ExactOdds Changelog

## 1.0.0 — 2026-09-29
- First public release: provably-fair casino rule packs (dice, coin-flip, slots,
  progressive, tourney, cashback, AML, referral, comps, RTP, raffle, baccarat).
- `exactodds` npm SDK (sdk/js): same rules on every seat — integer cents, no floats.
- `exactodds-mcp` MCP server (sdk/mcp): rule packs as MCP tools over stdio.
- HTTP API with Dockerfile + fly.toml.
- Dual license: AGPL-3.0-or-later OR Slid Phi Labs Commercial License.
- 90/90 SDK checks pass; reference games pass the 5-seat gate
  (py/js/ts/c/cpp, byte-identical stdout).
