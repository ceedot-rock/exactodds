// Generated from games/casino-raffle-draw.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, _eo_mod, ExactOddsError } = require('../runtime.js');

function raffle_winner(seed, tickets) {
    if (typeof seed !== 'number' || !Number.isSafeInteger(seed) || seed < 0 || seed >= 290000000000000) {
        const error = new RangeError('seed must be a non-negative safe integer below 290 trillion');
        error.code = 'ERR_EXACTODDS_SEED_INPUT';
        error.parameter = 'seed';
        throw error;
    }
    if (typeof tickets !== 'number' || !Number.isSafeInteger(tickets) || tickets < 1) {
        const error = new RangeError('tickets must be a positive safe integer');
        error.code = 'ERR_EXACTODDS_SEED_INPUT';
        error.parameter = 'tickets';
        throw error;
    }

    let mixed = _eo_mod(((seed * 31) + 17), 2147483647);
    let state = _eo_mod((48271 * mixed), 2147483647);
    return (1 + _eo_mod(state, tickets));
}

module.exports = { raffle_winner };
