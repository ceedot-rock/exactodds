// Generated from games/casino-bonus-wagering.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function wager_contrib(bet_cents, weight_pct) {
    return _cuni_div((bet_cents * weight_pct), 100);
}

function wagering_remaining(required_cents, wagered_cents, bet_cents, weight_pct) {
    let total = (wagered_cents + wager_contrib(bet_cents, weight_pct));
    if ((total >= required_cents)) {
        return 0;
    } else {
        return (required_cents - total);
    }
}

function bonus_cleared(bonus_cents, wager_mult, total_wagered_cents) {
    if ((total_wagered_cents >= (bonus_cents * wager_mult))) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = { wager_contrib, wagering_remaining, bonus_cleared };
