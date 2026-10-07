#!/usr/bin/env node
// exactodds-mcp — every ExactOdds rule pack as MCP tools.
// Generated from games/*.exactodds — do not hand-edit.
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { CallToolRequestSchema, ListToolsRequestSchema } = require("@modelcontextprotocol/sdk/types.js");
const rules = require("exactodds");

const TOOLS = [
  {
    name: "roll_dice",
    description: "ExactOdds rule `roll_dice(server_seed, client_seed, round)`. Provably-fair dice rolls from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "server_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input server_seed."
            },
            "client_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input client_seed."
            },
            "round": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input round."
            }
      },
      "required": [
            "server_seed",
            "client_seed",
            "round"
      ],
      "additionalProperties": false
},
    fn: "roll_dice",
    params: ["server_seed", "client_seed", "round"],
  },
  {
    name: "roll_hundred",
    description: "ExactOdds rule `roll_hundred(server_seed, client_seed, round)`. Provably-fair dice rolls from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "server_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input server_seed."
            },
            "client_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input client_seed."
            },
            "round": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input round."
            }
      },
      "required": [
            "server_seed",
            "client_seed",
            "round"
      ],
      "additionalProperties": false
},
    fn: "roll_hundred",
    params: ["server_seed", "client_seed", "round"],
  },
  {
    name: "flip",
    description: "ExactOdds rule `flip(server_seed, client_seed, round)`. Provably-fair coin flip from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "server_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input server_seed."
            },
            "client_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input client_seed."
            },
            "round": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input round."
            }
      },
      "required": [
            "server_seed",
            "client_seed",
            "round"
      ],
      "additionalProperties": false
},
    fn: "flip",
    params: ["server_seed", "client_seed", "round"],
  },
  {
    name: "flip_bit",
    description: "ExactOdds rule `flip_bit(server_seed, client_seed, round)`. Provably-fair coin flip from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "server_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input server_seed."
            },
            "client_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input client_seed."
            },
            "round": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input round."
            }
      },
      "required": [
            "server_seed",
            "client_seed",
            "round"
      ],
      "additionalProperties": false
},
    fn: "flip_bit",
    params: ["server_seed", "client_seed", "round"],
  },
  {
    name: "spin",
    description: "ExactOdds rule `spin(server_seed, client_seed, round)`. Provably-fair European roulette spin from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "server_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input server_seed."
            },
            "client_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input client_seed."
            },
            "round": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input round."
            }
      },
      "required": [
            "server_seed",
            "client_seed",
            "round"
      ],
      "additionalProperties": false
},
    fn: "spin",
    params: ["server_seed", "client_seed", "round"],
  },
  {
    name: "is_red",
    description: "ExactOdds rule `is_red(n)`. Provably-fair European roulette spin from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "n": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input n."
            }
      },
      "required": [
            "n"
      ],
      "additionalProperties": false
},
    fn: "is_red",
    params: ["n"],
  },
  {
    name: "color_of",
    description: "ExactOdds rule `color_of(n)`. Provably-fair European roulette spin from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "n": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input n."
            }
      },
      "required": [
            "n"
      ],
      "additionalProperties": false
},
    fn: "color_of",
    params: ["n"],
  },
  {
    name: "parity_of",
    description: "ExactOdds rule `parity_of(n)`. Provably-fair European roulette spin from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "n": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input n."
            }
      },
      "required": [
            "n"
      ],
      "additionalProperties": false
},
    fn: "parity_of",
    params: ["n"],
  },
  {
    name: "range_of",
    description: "ExactOdds rule `range_of(n)`. Provably-fair European roulette spin from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "n": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input n."
            }
      },
      "required": [
            "n"
      ],
      "additionalProperties": false
},
    fn: "range_of",
    params: ["n"],
  },
  {
    name: "spin_line",
    description: "ExactOdds rule `spin_line(server_seed, client_seed, round)`. Provably-fair European roulette spin from revealed seeds. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "server_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input server_seed."
            },
            "client_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input client_seed."
            },
            "round": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input round."
            }
      },
      "required": [
            "server_seed",
            "client_seed",
            "round"
      ],
      "additionalProperties": false
},
    fn: "spin_line",
    params: ["server_seed", "client_seed", "round"],
  },
  {
    name: "crash_point",
    description: "ExactOdds rule `crash_point(server_seed, client_seed, round)`. Provably-fair crash multiplier from the round hash. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "server_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input server_seed."
            },
            "client_seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input client_seed."
            },
            "round": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input round."
            }
      },
      "required": [
            "server_seed",
            "client_seed",
            "round"
      ],
      "additionalProperties": false
},
    fn: "crash_point",
    params: ["server_seed", "client_seed", "round"],
  },
  {
    name: "settle_crash",
    description: "ExactOdds rule `settle_crash(bet_cents, cashout_hundredths, crash_hundredths)`. Provably-fair crash multiplier from the round hash. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "bet_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input bet_cents."
            },
            "cashout_hundredths": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input cashout_hundredths."
            },
            "crash_hundredths": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input crash_hundredths."
            }
      },
      "required": [
            "bet_cents",
            "cashout_hundredths",
            "crash_hundredths"
      ],
      "additionalProperties": false
},
    fn: "settle_crash",
    params: ["bet_cents", "cashout_hundredths", "crash_hundredths"],
  },
  {
    name: "wager_contrib",
    description: "ExactOdds rule `wager_contrib(bet_cents, weight_pct)`. Bonus wagering contribution, remaining requirement, cleared/not-cleared. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "bet_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input bet_cents."
            },
            "weight_pct": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input weight_pct."
            }
      },
      "required": [
            "bet_cents",
            "weight_pct"
      ],
      "additionalProperties": false
},
    fn: "wager_contrib",
    params: ["bet_cents", "weight_pct"],
  },
  {
    name: "wagering_remaining",
    description: "ExactOdds rule `wagering_remaining(required_cents, wagered_cents, bet_cents, weight_pct)`. Bonus wagering contribution, remaining requirement, cleared/not-cleared. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "required_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input required_cents."
            },
            "wagered_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input wagered_cents."
            },
            "bet_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input bet_cents."
            },
            "weight_pct": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input weight_pct."
            }
      },
      "required": [
            "required_cents",
            "wagered_cents",
            "bet_cents",
            "weight_pct"
      ],
      "additionalProperties": false
},
    fn: "wagering_remaining",
    params: ["required_cents", "wagered_cents", "bet_cents", "weight_pct"],
  },
  {
    name: "bonus_cleared",
    description: "ExactOdds rule `bonus_cleared(bonus_cents, wager_mult, total_wagered_cents)`. Bonus wagering contribution, remaining requirement, cleared/not-cleared. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "bonus_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input bonus_cents."
            },
            "wager_mult": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input wager_mult."
            },
            "total_wagered_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input total_wagered_cents."
            }
      },
      "required": [
            "bonus_cents",
            "wager_mult",
            "total_wagered_cents"
      ],
      "additionalProperties": false
},
    fn: "bonus_cleared",
    params: ["bonus_cents", "wager_mult", "total_wagered_cents"],
  },
  {
    name: "rake",
    description: "ExactOdds rule `rake(pot_cents, rake_pct, cap_cents)`. Poker rake as a percentage of the pot with a hard cap. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "pot_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input pot_cents."
            },
            "rake_pct": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input rake_pct."
            },
            "cap_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input cap_cents."
            }
      },
      "required": [
            "pot_cents",
            "rake_pct",
            "cap_cents"
      ],
      "additionalProperties": false
},
    fn: "rake",
    params: ["pot_cents", "rake_pct", "cap_cents"],
  },
  {
    name: "settle_moneyline",
    description: "ExactOdds rule `settle_moneyline(stake_cents, american_odds, result)`. Sportsbook moneyline settlement with American odds (win/loss/void). All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "stake_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input stake_cents."
            },
            "american_odds": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input american_odds."
            },
            "result": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input result."
            }
      },
      "required": [
            "stake_cents",
            "american_odds",
            "result"
      ],
      "additionalProperties": false
},
    fn: "settle_moneyline",
    params: ["stake_cents", "american_odds", "result"],
  },
  {
    name: "revshare_tier",
    description: "ExactOdds rule `revshare_tier(ngr_cents)`. Tiered affiliate revenue share on monthly NGR, no negative carryover. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "ngr_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input ngr_cents."
            }
      },
      "required": [
            "ngr_cents"
      ],
      "additionalProperties": false
},
    fn: "revshare_tier",
    params: ["ngr_cents"],
  },
  {
    name: "affiliate_pay",
    description: "ExactOdds rule `affiliate_pay(ngr_cents)`. Tiered affiliate revenue share on monthly NGR, no negative carryover. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "ngr_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input ngr_cents."
            }
      },
      "required": [
            "ngr_cents"
      ],
      "additionalProperties": false
},
    fn: "affiliate_pay",
    params: ["ngr_cents"],
  },
  {
    name: "deposit_allowed",
    description: "ExactOdds rule `deposit_allowed(deposited_cents, limit_cents, deposit_cents)`. Deposit cap and loss limit allow/deny checks. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "deposited_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input deposited_cents."
            },
            "limit_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input limit_cents."
            },
            "deposit_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input deposit_cents."
            }
      },
      "required": [
            "deposited_cents",
            "limit_cents",
            "deposit_cents"
      ],
      "additionalProperties": false
},
    fn: "deposit_allowed",
    params: ["deposited_cents", "limit_cents", "deposit_cents"],
  },
  {
    name: "bet_allowed",
    description: "ExactOdds rule `bet_allowed(net_loss_cents, loss_limit_cents, bet_cents)`. Deposit cap and loss limit allow/deny checks. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "net_loss_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input net_loss_cents."
            },
            "loss_limit_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input loss_limit_cents."
            },
            "bet_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input bet_cents."
            }
      },
      "required": [
            "net_loss_cents",
            "loss_limit_cents",
            "bet_cents"
      ],
      "additionalProperties": false
},
    fn: "bet_allowed",
    params: ["net_loss_cents", "loss_limit_cents", "bet_cents"],
  },
  {
    name: "paytable_mult",
    description: "ExactOdds rule `paytable_mult(symbol, match_count)`. Slots payline win from a 5-symbol paytable. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "symbol": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input symbol."
            },
            "match_count": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input match_count."
            }
      },
      "required": [
            "symbol",
            "match_count"
      ],
      "additionalProperties": false
},
    fn: "paytable_mult",
    params: ["symbol", "match_count"],
  },
  {
    name: "slots_win",
    description: "ExactOdds rule `slots_win(bet_cents, symbol, match_count)`. Slots payline win from a 5-symbol paytable. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "bet_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input bet_cents."
            },
            "symbol": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input symbol."
            },
            "match_count": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input match_count."
            }
      },
      "required": [
            "bet_cents",
            "symbol",
            "match_count"
      ],
      "additionalProperties": false
},
    fn: "slots_win",
    params: ["bet_cents", "symbol", "match_count"],
  },
  {
    name: "jackpot_pool_after",
    description: "ExactOdds rule `jackpot_pool_after(pool_cents, bet_cents, contrib_pct)`. Progressive pool contribution per bet and reset-to-seed. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "pool_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input pool_cents."
            },
            "bet_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input bet_cents."
            },
            "contrib_pct": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input contrib_pct."
            }
      },
      "required": [
            "pool_cents",
            "bet_cents",
            "contrib_pct"
      ],
      "additionalProperties": false
},
    fn: "jackpot_pool_after",
    params: ["pool_cents", "bet_cents", "contrib_pct"],
  },
  {
    name: "jackpot_reset",
    description: "ExactOdds rule `jackpot_reset(seed_cents)`. Progressive pool contribution per bet and reset-to-seed. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "seed_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input seed_cents."
            }
      },
      "required": [
            "seed_cents"
      ],
      "additionalProperties": false
},
    fn: "jackpot_reset",
    params: ["seed_cents"],
  },
  {
    name: "tourney_points",
    description: "ExactOdds rule `tourney_points(place, entrants)`. Tournament leaderboard points by finishing place. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "place": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input place."
            },
            "entrants": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input entrants."
            }
      },
      "required": [
            "place",
            "entrants"
      ],
      "additionalProperties": false
},
    fn: "tourney_points",
    params: ["place", "entrants"],
  },
  {
    name: "cashback",
    description: "ExactOdds rule `cashback(net_loss_cents, rebate_pct)`. VIP cashback rebate on net losses. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "net_loss_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input net_loss_cents."
            },
            "rebate_pct": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input rebate_pct."
            }
      },
      "required": [
            "net_loss_cents",
            "rebate_pct"
      ],
      "additionalProperties": false
},
    fn: "cashback",
    params: ["net_loss_cents", "rebate_pct"],
  },
  {
    name: "aml_report",
    description: "ExactOdds rule `aml_report(deposit_cents, threshold_cents)`. AML single-deposit and structuring flags. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "deposit_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input deposit_cents."
            },
            "threshold_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input threshold_cents."
            }
      },
      "required": [
            "deposit_cents",
            "threshold_cents"
      ],
      "additionalProperties": false
},
    fn: "aml_report",
    params: ["deposit_cents", "threshold_cents"],
  },
  {
    name: "aml_structuring",
    description: "ExactOdds rule `aml_structuring(dep1_cents, dep2_cents, dep3_cents, threshold_cents)`. AML single-deposit and structuring flags. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "dep1_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input dep1_cents."
            },
            "dep2_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input dep2_cents."
            },
            "dep3_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input dep3_cents."
            },
            "threshold_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input threshold_cents."
            }
      },
      "required": [
            "dep1_cents",
            "dep2_cents",
            "dep3_cents",
            "threshold_cents"
      ],
      "additionalProperties": false
},
    fn: "aml_structuring",
    params: ["dep1_cents", "dep2_cents", "dep3_cents", "threshold_cents"],
  },
  {
    name: "referral_bonus",
    description: "ExactOdds rule `referral_bonus(first_deposit_cents)`. Flat referral bonus on qualifying first deposits. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "first_deposit_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input first_deposit_cents."
            }
      },
      "required": [
            "first_deposit_cents"
      ],
      "additionalProperties": false
},
    fn: "referral_bonus",
    params: ["first_deposit_cents"],
  },
  {
    name: "comp_earn",
    description: "ExactOdds rule `comp_earn(wagered_cents)`. Loyalty comp point earn and redeem. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "wagered_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input wagered_cents."
            }
      },
      "required": [
            "wagered_cents"
      ],
      "additionalProperties": false
},
    fn: "comp_earn",
    params: ["wagered_cents"],
  },
  {
    name: "comp_redeem",
    description: "ExactOdds rule `comp_redeem(points)`. Loyalty comp point earn and redeem. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "points": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input points."
            }
      },
      "required": [
            "points"
      ],
      "additionalProperties": false
},
    fn: "comp_redeem",
    params: ["points"],
  },
  {
    name: "rtp_bps",
    description: "ExactOdds rule `rtp_bps(wagered_cents, paid_cents)`. Return-to-player in basis points from ledger totals. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "wagered_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input wagered_cents."
            },
            "paid_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input paid_cents."
            }
      },
      "required": [
            "wagered_cents",
            "paid_cents"
      ],
      "additionalProperties": false
},
    fn: "rtp_bps",
    params: ["wagered_cents", "paid_cents"],
  },
  {
    name: "raffle_winner",
    description: "ExactOdds rule `raffle_winner(seed, tickets)`. Provably-fair raffle winner from a committed seed. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "seed": {
                  "type": "integer",
                  "minimum": 0,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input seed."
            },
            "tickets": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input tickets."
            }
      },
      "required": [
            "seed",
            "tickets"
      ],
      "additionalProperties": false
},
    fn: "raffle_winner",
    params: ["seed", "tickets"],
  },
  {
    name: "baccarat_settle",
    description: "ExactOdds rule `baccarat_settle(stake_cents, bet_on, winner)`. Baccarat settlement with the 19:20 banker commission. All money in integer cents.",
    inputSchema: {
      "type": "object",
      "properties": {
            "stake_cents": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input stake_cents."
            },
            "bet_on": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input bet_on."
            },
            "winner": {
                  "type": "integer",
                  "minimum": -9007199254740991,
                  "maximum": 9007199254740991,
                  "description": "Safe integer input winner."
            }
      },
      "required": [
            "stake_cents",
            "bet_on",
            "winner"
      ],
      "additionalProperties": false
},
    fn: "baccarat_settle",
    params: ["stake_cents", "bet_on", "winner"],
  }
];

const server = new Server({ name: "exactodds-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })),
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const t = TOOLS.find((x) => x.name === req.params.name);
  if (!t) throw new Error(`unknown tool: ${req.params.name}`);
  const args = req.params.arguments || {};
  for (const p of t.params) {
    if (!Number.isSafeInteger(args[p])) throw new Error(`param '${p}' must be a safe integer`);
  }
  const result = rules[t.fn](...t.params.map((p) => args[p]));
  return { content: [{ type: "text", text: String(result) }] };
});

(async () => {
  await server.connect(new StdioServerTransport());
})();
