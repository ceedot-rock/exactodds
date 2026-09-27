// Generated from games/casino-responsible-limits.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function deposit_allowed(deposited_cents, limit_cents, deposit_cents) {
    if (((deposited_cents + deposit_cents) <= limit_cents)) {
        return 1;
    } else {
        return 0;
    }
}

function bet_allowed(net_loss_cents, loss_limit_cents, bet_cents) {
    if (((net_loss_cents + bet_cents) <= loss_limit_cents)) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = { deposit_allowed, bet_allowed };
