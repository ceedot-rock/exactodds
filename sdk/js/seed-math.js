'use strict';

// Hand-maintained SDK adapter. The generator imports this only for the six
// reviewed seed-mixing functions; it is NOT a general integer-runtime fix.
function seedInteger(value, name) {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
    const error = new RangeError(`${name} must be a non-negative safe integer Number`);
    error.code = 'ERR_EXACTODDS_SEED_INPUT';
    error.parameter = name;
    throw error;
  }
  return BigInt(value);
}

function seedState(serverSeed, clientSeed, round) {
  const ss = seedInteger(serverSeed, 'server_seed');
  const cs = seedInteger(clientSeed, 'client_seed');
  const r = seedInteger(round, 'round');
  const mixed = (ss * 31n + cs * 17n + r * 13n) % 2147483647n;
  const state = (48271n * mixed) % 2147483647n;
  // 0 <= state < 2^31 - 1, so this conversion is exact. The reviewed
  // downstream dice/coin/roulette/crash calculations stay Number-based.
  return Number(state);
}

module.exports = { seedState };
