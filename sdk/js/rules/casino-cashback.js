// Generated from games/casino-cashback.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, _eo_mod, ExactOddsError } = require('../runtime.js');

function cashback(net_loss_cents, rebate_pct) {
    if ((net_loss_cents <= 0)) {
        return 0;
    }
    return _eo_div((net_loss_cents * rebate_pct), 100);
}

module.exports = { cashback };
