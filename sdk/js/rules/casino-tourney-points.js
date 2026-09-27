// Generated from games/casino-tourney-points.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function tourney_points(place, entrants) {
    return _cuni_div((entrants * 100), place);
}

module.exports = { tourney_points };
