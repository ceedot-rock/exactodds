// Generated from games/casino-rtp-audit.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');

function rtp_bps(wagered_cents, paid_cents) {
    return _eo_div((paid_cents * 10000), wagered_cents);
}

module.exports = { rtp_bps };
