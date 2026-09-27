// Generated from games/casino-referral-bonus.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function referral_bonus(first_deposit_cents) {
    if ((first_deposit_cents >= 2000)) {
        return 2500;
    }
    return 0;
}

module.exports = { referral_bonus };
