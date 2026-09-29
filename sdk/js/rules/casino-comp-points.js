// Generated from games/casino-comp-points.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');

function comp_earn(wagered_cents) {
    return _eo_div(wagered_cents, 100);
}

function comp_redeem(points) {
    return points;
}

module.exports = { comp_earn, comp_redeem };
