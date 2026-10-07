// Generated from games/casino-sportsbook-settlement.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, _eo_mod, ExactOddsError } = require('../runtime.js');

function settle_moneyline(stake_cents, american_odds, result) {
    if ((result === 0)) {
        return 0;
    }
    if ((result === 2)) {
        return stake_cents;
    }
    if ((american_odds > 0)) {
        return (stake_cents + _eo_div((stake_cents * american_odds), 100));
    } else {
        return (stake_cents + _eo_div((stake_cents * 100), (0 - american_odds)));
    }
}

module.exports = { settle_moneyline };
