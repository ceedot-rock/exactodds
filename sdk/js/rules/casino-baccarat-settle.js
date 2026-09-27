// Generated from games/casino-baccarat-settle.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function baccarat_settle(stake_cents, bet_on, winner) {
    if ((winner === 2)) {
        if ((bet_on === 2)) {
            return (stake_cents + (stake_cents * 8));
        }
        return stake_cents;
    }
    if ((bet_on === winner)) {
        if ((bet_on === 1)) {
            return (stake_cents + _cuni_div((stake_cents * 19), 20));
        }
        return (stake_cents * 2);
    }
    return 0;
}

module.exports = { baccarat_settle };
