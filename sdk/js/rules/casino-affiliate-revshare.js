// Generated from games/casino-affiliate-revshare.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function revshare_tier(ngr_cents) {
    if ((ngr_cents >= 5000000)) {
        return 35;
    }
    if ((ngr_cents >= 1000000)) {
        return 30;
    }
    return 25;
}

function affiliate_pay(ngr_cents) {
    if ((ngr_cents <= 0)) {
        return 0;
    }
    return _cuni_div((ngr_cents * revshare_tier(ngr_cents)), 100);
}

module.exports = { revshare_tier, affiliate_pay };
