// Generated from games/casino-cashback.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function cashback(net_loss_cents, rebate_pct) {
    if ((net_loss_cents <= 0)) {
        return 0;
    }
    return _cuni_div((net_loss_cents * rebate_pct), 100);
}

module.exports = { cashback };
