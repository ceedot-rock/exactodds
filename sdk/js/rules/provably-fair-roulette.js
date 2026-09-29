// Generated from games/provably-fair-roulette.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');

function spin(server_seed, client_seed, round) {
    let mixed = ((((server_seed * 31) + (client_seed * 17)) + (round * 13)) % 2147483647);
    let state = ((48271 * mixed) % 2147483647);
    return (state % 37);
}

function is_red(n) {
    return ((((((((((((((((((n === 1) || (n === 3)) || (n === 5)) || (n === 7)) || (n === 9)) || (n === 12)) || (n === 14)) || (n === 16)) || (n === 18)) || (n === 19)) || (n === 21)) || (n === 23)) || (n === 25)) || (n === 27)) || (n === 30)) || (n === 32)) || (n === 34)) || (n === 36));
}

function color_of(n) {
    if ((n === 0)) {
        return "green";
    } else {
        if (is_red(n)) {
            return "red";
        } else {
            return "black";
        }
    }
}

function parity_of(n) {
    if ((n === 0)) {
        return "neither";
    } else {
        if (((n % 2) === 1)) {
            return "odd";
        } else {
            return "even";
        }
    }
}

function range_of(n) {
    if ((n === 0)) {
        return "neither";
    } else {
        if ((n <= 18)) {
            return "low";
        } else {
            return "high";
        }
    }
}

function spin_line(server_seed, client_seed, round) {
    let n = spin(server_seed, client_seed, round);
    return `spin ${round}: ${n} ${color_of(n)} ${parity_of(n)} ${range_of(n)}`;
}

module.exports = { spin, is_red, color_of, parity_of, range_of, spin_line };
