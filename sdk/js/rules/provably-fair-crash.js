// Generated from games/provably-fair-crash.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');

function crash_point(server_seed, client_seed, round) {
    let mixed = ((((server_seed * 31) + (client_seed * 17)) + (round * 13)) % 2147483647);
    let state = ((48271 * mixed) % 2147483647);
    let h = (state % 10000);
    if ((h < 100)) {
        return 100;
    }
    return _eo_div((99 * 10000), (10000 - h));
}

function settle_crash(bet_cents, cashout_hundredths, crash_hundredths) {
    if ((cashout_hundredths === 0)) {
        return 0;
    }
    if ((cashout_hundredths >= crash_hundredths)) {
        return 0;
    }
    return _eo_div((bet_cents * cashout_hundredths), 100);
}

module.exports = { crash_point, settle_crash };
