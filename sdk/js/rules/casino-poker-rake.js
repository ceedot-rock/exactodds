// Generated from games/casino-poker-rake.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, _eo_mod, ExactOddsError } = require('../runtime.js');

function rake(pot_cents, rake_pct, cap_cents) {
    let r = _eo_div((pot_cents * rake_pct), 100);
    if ((r > cap_cents)) {
        return cap_cents;
    } else {
        return r;
    }
}

module.exports = { rake };
