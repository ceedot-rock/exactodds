// Generated from games/provably-fair-dice.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, _eo_mod, ExactOddsError } = require('../runtime.js');
const { seedState } = require('../seed-math.js');

function roll_dice(server_seed, client_seed, round) {
    let state = seedState(server_seed, client_seed, round);
    return (_eo_mod(state, 6) + 1);
}

function roll_hundred(server_seed, client_seed, round) {
    let state = seedState(server_seed, client_seed, round);
    return _eo_mod(state, 100);
}

module.exports = { roll_dice, roll_hundred };
