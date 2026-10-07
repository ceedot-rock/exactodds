// Generated from games/provably-fair-dice.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');
const { seedInteger: _eo_seed_integer } = require('../seed-integers.js');

function roll_dice(server_seed, client_seed, round) {
    let mixed = ((_eo_seed_integer(server_seed, "server_seed") * 31n
        + _eo_seed_integer(client_seed, "client_seed") * 17n
        + _eo_seed_integer(round, "round") * 13n) % 2147483647n);
    let state = Number((48271n * mixed) % 2147483647n);
    return ((state % 6) + 1);
}

function roll_hundred(server_seed, client_seed, round) {
    let mixed = ((_eo_seed_integer(server_seed, "server_seed") * 31n
        + _eo_seed_integer(client_seed, "client_seed") * 17n
        + _eo_seed_integer(round, "round") * 13n) % 2147483647n);
    let state = Number((48271n * mixed) % 2147483647n);
    return (state % 100);
}

module.exports = { roll_dice, roll_hundred };
