// Generated from games/casino-progressive-jackpot.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, _eo_mod, ExactOddsError } = require('../runtime.js');

function jackpot_pool_after(pool_cents, bet_cents, contrib_pct) {
    return (pool_cents + _eo_div((bet_cents * contrib_pct), 100));
}

function jackpot_reset(seed_cents) {
    return seed_cents;
}

module.exports = { jackpot_pool_after, jackpot_reset };
