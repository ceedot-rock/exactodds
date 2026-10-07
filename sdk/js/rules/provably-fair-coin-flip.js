// Generated from games/provably-fair-coin-flip.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, _eo_mod, ExactOddsError } = require('../runtime.js');
const { seedState } = require('../seed-math.js');

function flip(server_seed, client_seed, round) {
    let state = seedState(server_seed, client_seed, round);
    if ((_eo_mod(state, 2) === 0)) {
        return "heads";
    } else {
        return "tails";
    }
}

function flip_bit(server_seed, client_seed, round) {
    let state = seedState(server_seed, client_seed, round);
    return _eo_mod(state, 2);
}

module.exports = { flip, flip_bit };
