// Generated from games/casino-sportsbook-settlement.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function settle_moneyline(stake_cents, american_odds, result) {
    if ((result === 0)) {
        return 0;
    }
    if ((result === 2)) {
        return stake_cents;
    }
    if ((american_odds > 0)) {
        return (stake_cents + _cuni_div((stake_cents * american_odds), 100));
    } else {
        return (stake_cents + _cuni_div((stake_cents * 100), (0 - american_odds)));
    }
}

module.exports = { settle_moneyline };
