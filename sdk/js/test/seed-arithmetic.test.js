'use strict';
const assert = require('node:assert/strict');
const { test } = require('node:test');
const sdk = require('../index.js');
const core = require('../../../verifier/exactodds-core.js');

const functions = ['roll_dice', 'roll_hundred', 'flip', 'flip_bit', 'spin', 'spin_line', 'crash_point'];
const programs = {
  roll_dice: 'provably-fair-dice', roll_hundred: 'provably-fair-dice',
  flip: 'provably-fair-coin-flip', flip_bit: 'provably-fair-coin-flip',
  spin: 'provably-fair-roulette', spin_line: 'provably-fair-roulette',
  crash_point: 'provably-fair-crash',
};
const badInputs = [
  -1, -Number.MAX_SAFE_INTEGER, 0.5, NaN, Infinity, -Infinity,
  Number.MAX_SAFE_INTEGER + 1, '1', 'bad', '', '0x10', 1n,
  null, undefined, true, false, {}, [],
];
for (const fn of functions) {
  const direct = require(`../rules/${programs[fn]}.js`)[fn];
  test(`${fn}: flat, namespaced and direct exports are the same function`, () => {
    assert.equal(sdk[fn], direct);
    assert.equal(sdk.programs[programs[fn]][fn], direct);
  });
  for (let position = 0; position < 3; position++) {
    test(`${fn}: refuses 18 invalid inputs in parameter ${position}`, () => {
      for (const value of badInputs) {
        const args = [1, 1, 1];
        args[position] = value;
        assert.throws(() => sdk[fn](...args), {
          name: 'RangeError',
          code: 'ERR_EXACTODDS_SEED_INPUT',
          parameter: ['server_seed', 'client_seed', 'round'][position],
        });
      }
    });
  }
  test(`${fn}: missing arguments are refused`, () => {
    for (const args of [[], [1], [1, 1]]) {
      assert.throws(() => sdk[fn](...args), { code: 'ERR_EXACTODDS_SEED_INPUT' });
    }
  });
}

// Repeatable spread over the whole safe-integer domain, not a random fuzz
// claim. These vectors include combinations much larger than the old fixtures.
const MAX = BigInt(Number.MAX_SAFE_INTEGER);
let cursor = 20261007n;
function next() {
  cursor = (cursor * 6364136223846793005n + 1442695040888963407n) & MAX;
  return Number(cursor);
}
const vectors = [
  [0, 0, 0], [-0, -0, -0], [1, 1, 1],
  [1234567890123456, 1, 1], [Number.MAX_SAFE_INTEGER, 1, 1],
  [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
];
for (let i = 0; i < 256; i++) vectors.push([next(), next(), next()]);

for (const fn of functions) {
  test(`${fn}: 262 exact-integer differential vectors and JSON-compatible outputs`, () => {
    for (const args of vectors) {
      let expected;
      if (fn === 'crash_point') {
        // Separate modular-term formulation, then exact integer division.
        const [ss, cs, r] = args.map(BigInt);
        const mod = 2147483647n;
        const mixed = ((ss % mod) * 31n + (cs % mod) * 17n + (r % mod) * 13n) % mod;
        const h = ((48271n * mixed) % mod) % 10000n;
        expected = Number(h < 100n ? 100n : 990000n / (10000n - h));
      } else {
        const text = core.compute(fn, ...args.map(String));
        expected = ['flip', 'spin_line'].includes(fn) ? text : Number(text);
      }
      const actual = sdk[fn](...args);
      assert.equal(actual, expected, `${fn}(${args.join(',')})`);
      assert.equal(JSON.parse(JSON.stringify(actual)), actual);
      if (typeof actual === 'number') assert.ok(Number.isSafeInteger(actual));
    }
  });
}
