// Generated from games/provably-fair-coin-flip.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');
const { seedInteger: _eo_seed_integer } = require('../seed-integers.js');

function flip(server_seed, client_seed, round) {
    let mixed = ((_eo_seed_integer(server_seed, "server_seed") * 31n
        + _eo_seed_integer(client_seed, "client_seed") * 17n
        + _eo_seed_integer(round, "round") * 13n) % 2147483647n);
    let state = Number((48271n * mixed) % 2147483647n);
    if (((state % 2) === 0)) {
        return "heads";
    } else {
        return "tails";
    }
}

function flip_bit(server_seed, client_seed, round) {
    let mixed = ((_eo_seed_integer(server_seed, "server_seed") * 31n
        + _eo_seed_integer(client_seed, "client_seed") * 17n
        + _eo_seed_integer(round, "round") * 13n) % 2147483647n);
    let state = Number((48271n * mixed) % 2147483647n);
    return (state % 2);
}

module.exports = { flip, flip_bit };
