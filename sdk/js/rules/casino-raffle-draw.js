// Generated from games/casino-raffle-draw.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');
const { seedInteger: _eo_seed_integer } = require('../seed-integers.js');

function raffle_winner(seed, tickets) {
    _eo_seed_integer(tickets, "tickets", 1);
    let mixed = ((_eo_seed_integer(seed, "seed") * 31n + 17n) % 2147483647n);
    let state = Number((48271n * mixed) % 2147483647n);
    return (1 + (state % tickets));
}

module.exports = { raffle_winner };
