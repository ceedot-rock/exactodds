// Generated from games/casino-slots-payline.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');

function paytable_mult(symbol, match_count) {
    if ((match_count < 3)) {
        return 0;
    }
    if ((symbol === 1)) {
        if ((match_count === 3)) {
            return 2;
        }
        if ((match_count === 4)) {
            return 5;
        }
        return 20;
    }
    if ((symbol === 2)) {
        if ((match_count === 3)) {
            return 3;
        }
        if ((match_count === 4)) {
            return 10;
        }
        return 40;
    }
    if ((symbol === 3)) {
        if ((match_count === 3)) {
            return 5;
        }
        if ((match_count === 4)) {
            return 20;
        }
        return 100;
    }
    if ((symbol === 4)) {
        if ((match_count === 3)) {
            return 10;
        }
        if ((match_count === 4)) {
            return 50;
        }
        return 250;
    }
    if ((match_count === 3)) {
        return 25;
    }
    if ((match_count === 4)) {
        return 100;
    }
    return 1000;
}

function slots_win(bet_cents, symbol, match_count) {
    return (bet_cents * paytable_mult(symbol, match_count));
}

module.exports = { paytable_mult, slots_win };
