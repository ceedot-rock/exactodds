// Generated from games/casino-raffle-draw.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function raffle_winner(seed, tickets) {
    let mixed = (((seed * 31) + 17) % 2147483647);
    let state = ((48271 * mixed) % 2147483647);
    return (1 + (state % tickets));
}

module.exports = { raffle_winner };
