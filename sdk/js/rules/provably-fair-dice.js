// Generated from games/provably-fair-dice.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function roll_dice(server_seed, client_seed, round) {
    let mixed = ((((server_seed * 31) + (client_seed * 17)) + (round * 13)) % 2147483647);
    let state = ((48271 * mixed) % 2147483647);
    return ((state % 6) + 1);
}

function roll_hundred(server_seed, client_seed, round) {
    let mixed = ((((server_seed * 31) + (client_seed * 17)) + (round * 13)) % 2147483647);
    let state = ((48271 * mixed) % 2147483647);
    return (state % 100);
}

module.exports = { roll_dice, roll_hundred };
