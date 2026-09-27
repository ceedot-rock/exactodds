# exactodds-mcp

Every ExactOdds rule pack as an MCP tool — 35 tools, stdio transport.
For agents that settle bets, check limits, or audit casino math.

```json
{
  "mcpServers": {
    "exactodds": {
      "command": "npx",
      "args": ["-y", "exactodds-mcp"]
    }
  }
}
```

Tools include `roll_dice`, `settle_moneyline`, `baccarat_settle`,
`affiliate_pay`, `aml_structuring`, `rtp_bps`, `raffle_winner`, and 28 more.
Every tool takes integer params and returns an integer — all money in cents.

## Regenerating

```
python3 build.py   # regenerates server.js from games/*.cuni
```

## License

AGPL-3.0-only. Commercial licenses: Corey@slidphilabs.com — $2,500/yr per operator.
