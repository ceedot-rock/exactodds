// Generated from games/casino-poker-rake.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function rake(pot_cents, rake_pct, cap_cents) {
    let r = _cuni_div((pot_cents * rake_pct), 100);
    if ((r > cap_cents)) {
        return cap_cents;
    } else {
        return r;
    }
}

module.exports = { rake };
