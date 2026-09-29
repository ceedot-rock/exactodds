// Generated from games/provably-fair-coin-flip.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');

function flip(server_seed, client_seed, round) {
    let mixed = ((((server_seed * 31) + (client_seed * 17)) + (round * 13)) % 2147483647);
    let state = ((48271 * mixed) % 2147483647);
    if (((state % 2) === 0)) {
        return "heads";
    } else {
        return "tails";
    }
}

function flip_bit(server_seed, client_seed, round) {
    let mixed = ((((server_seed * 31) + (client_seed * 17)) + (round * 13)) % 2147483647);
    let state = ((48271 * mixed) % 2147483647);
    return (state % 2);
}

module.exports = { flip, flip_bit };
