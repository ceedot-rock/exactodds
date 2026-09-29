# exactodds-mcp

## What ExactOdds is

ExactOdds makes dice that can't lie. It provides the core building blocks for games of chance — dice rolls, coin flips — with the math out in the open and every result verifiable. If a result can't be proven fair, it is refused.

Here is why that matters. An online game runs the same code on many platforms — a phone, a browser, a server — and players have to trust that the house didn't tilt the odds on any one of them. ExactOdds removes the need for trust: the reference games are run through five programming languages — Python, JavaScript, TypeScript, C, and C++ — and all five must print byte-identical results, checked mechanically, not claimed.

If five independent implementations agree down to the last byte, the game can't favor the house on one platform and rob it on another. A disagreement isn't smoothed over — it stops the line. The refusal is the guarantee.

This package exposes every rule as an MCP tool for agents: same integer math, same verifiable results, callable over stdio.

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
python3 build.py   # regenerates server.js from games/*.exactodds
```

## License

AGPL-3.0-only. Commercial licenses: Corey@slidphilabs.com — $2,500/yr per operator.
