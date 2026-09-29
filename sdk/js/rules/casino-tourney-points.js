// Generated from games/casino-tourney-points.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');

function tourney_points(place, entrants) {
    return _eo_div((entrants * 100), place);
}

module.exports = { tourney_points };
