// Generated from games/casino-comp-points.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function comp_earn(wagered_cents) {
    return _cuni_div(wagered_cents, 100);
}

function comp_redeem(points) {
    return points;
}

module.exports = { comp_earn, comp_redeem };
