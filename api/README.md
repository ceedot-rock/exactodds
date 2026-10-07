# exactodds-api

Every ExactOdds rule pack over HTTP.

```
POST /v1/casino-sportsbook-settlement/settle_moneyline
{"stake_cents": 1000, "american_odds": 150, "result": 1}
-> {"ok": true, "result": 2500, "program": "...", "seat": "js", "source_hash": "..."}
```

- `GET /`, `GET /health`, `GET /v1/programs`
- All params must be integers; all money is integer cents.
- Every answer carries the `source_hash` of the CuNi rules that ran —
  compare it against the receipts in the repo to prove which rules ran.

Regenerate: `python3 build.py`. Deploy (needs Corey's go-ahead): `fly launch`.

License: AGPL-3.0-or-later OR Slid Phi Labs Commercial. Commercial: Corey@slidphilabs.com — $2,500/yr per operator.
