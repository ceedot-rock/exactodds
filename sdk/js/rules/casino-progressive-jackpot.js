// Generated from games/casino-progressive-jackpot.cuni — do not hand-edit.
const { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError } = require('../runtime.js');

function jackpot_pool_after(pool_cents, bet_cents, contrib_pct) {
    return (pool_cents + _cuni_div((bet_cents * contrib_pct), 100));
}

function jackpot_reset(seed_cents) {
    return seed_cents;
}

module.exports = { jackpot_pool_after, jackpot_reset };
