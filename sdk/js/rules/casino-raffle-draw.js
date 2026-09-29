// Generated from games/casino-raffle-draw.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');

function raffle_winner(seed, tickets) {
    let mixed = (((seed * 31) + 17) % 2147483647);
    let state = ((48271 * mixed) % 2147483647);
    return (1 + (state % tickets));
}

module.exports = { raffle_winner };
