"use strict";

// Shared input contract for the generated seed-mixing functions.
// Keep Number inputs/outputs compatible; only intermediates use BigInt.
function seedInteger(value, name, minimum = 0) {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < minimum) {
    const error = new RangeError(
      `${name} must be a safe integer (${minimum}..${Number.MAX_SAFE_INTEGER})`
    );
    error.code = "EXACTODDS_INVALID_SEED";
    throw error;
  }
  return BigInt(value);
}

module.exports = { seedInteger };
