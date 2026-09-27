// Generated from games/casino-rtp-audit.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function rtp_bps(wagered_cents, paid_cents) {
    return _cuni_div((paid_cents * 10000), wagered_cents);
}

module.exports = { rtp_bps };
