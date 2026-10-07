'use strict';

// Tests committed JS artifacts, not a fresh compiler build or native runtimes.
// Intentionally RED on the baseline: wrong outputs are never expected passes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const sdk = require('../index.js');
const verifier = require('../../../verifier/exactodds-core.js');

// The page ships an inline copy. Exercise that actual copy as well as the
// standalone module, without evaluating the DOM/UI script or using a network.
const htmlPath = path.resolve(__dirname, '../../../verifier/verifier.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)];
const coreScripts = scripts.filter((match) =>
  match[1].includes('root.ExactOdds = factory(root)'));
assert.equal(coreScripts.length, 1, 'expected exactly one inline verifier core');
const context = vm.createContext({});
new vm.Script(coreScripts[0][1], { filename: htmlPath })
  .runInContext(context, { timeout: 1000 });
const inlineVerifier = context.ExactOdds;
assert.equal(typeof inlineVerifier?.compute, 'function', 'inline core must load');

const MOD = 2147483647n;
const MAX = BigInt(Number.MAX_SAFE_INTEGER);
const weights = [31n, 17n, 13n];

// Independent exact-integer oracle: reduce each weighted term before summing.
// All inputs originate as exact decimal strings, never rounded Number values.
function reference(args) {
  const terms = args.map((value, i) => (BigInt(value) * weights[i]) % MOD);
  const mixed = terms.reduce((sum, term) => (sum + term) % MOD, 0n);
  const state = (48271n * mixed) % MOD;
  return {
    mixed: String(mixed),
    state: String(state),
    roll_dice: Number(state % 6n) + 1,
    roll_hundred: Number(state % 100n),
  };
}

// Pinned independently using Python integer arithmetic, not SDK/verifier output.
const anchors = [
  {
    name: 'small control',
    args: ['987654321', '1', '1'],
    expected: { mixed: '552512923', state: '751894040', roll_dice: 3, roll_hundred: 40 },
  },
  {
    name: 'reported large seed',
    args: ['1234567890123456', '1', '1'],
    expected: { mixed: '1440517378', state: '1841347225', roll_dice: 2, roll_hundred: 25 },
  },
  {
    name: 'maximum safe server seed',
    args: ['9007199254740991', '1', '1'],
    expected: { mixed: '130023423', state: '1413435099', roll_dice: 4, roll_hundred: 99 },
  },
];
for (const anchor of anchors) {
  test(`oracle / ${anchor.name}`, () => {
    assert.deepEqual(reference(anchor.args), anchor.expected);
  });
}

const vectors = [
  ...anchors.map(({ name, args }) => ({ name, args })),
  { name: 'zero inputs', args: ['0', '0', '0'] },
  { name: 'existing audited input', args: ['987654321', '123456789', '1'] },
];

// For each input independently, test immediately below, at, and above the
// largest value whose entire weighted sum stays <= Number.MAX_SAFE_INTEGER
// when the other two inputs are 1. Inputs themselves remain safe integers.
const names = ['server seed', 'client seed', 'round'];
for (let position = 0; position < weights.length; position++) {
  const otherTerms = weights.reduce((sum, weight, i) =>
    sum + (i === position ? 0n : weight), 0n);
  const boundary = (MAX - otherTerms) / weights[position];
  for (const offset of [-1n, 0n, 1n]) {
    const args = ['1', '1', '1'];
    args[position] = String(boundary + offset);
    vectors.push({ name: `${names[position]} sum boundary ${offset}`, args });
  }
}
vectors.push(
  { name: 'maximum safe client seed', args: ['1', String(MAX), '1'] },
  { name: 'maximum safe round', args: ['1', '1', String(MAX)] },
  { name: 'all inputs maximum safe', args: [String(MAX), String(MAX), String(MAX)] },
);

const surfaces = [
  { name: 'SDK', call: (fn, args) => sdk[fn](...args.map(Number)) },
  { name: 'verifier module', call: (fn, args) => Number(verifier.compute(fn, ...args)) },
  { name: 'verifier HTML core', call: (fn, args) => Number(inlineVerifier.compute(fn, ...args)) },
];

for (const vector of vectors) {
  for (const [i, value] of vector.args.entries()) {
    assert.match(value, /^\d+$/, `${vector.name}: non-negative decimal input`);
    assert.ok(Number.isSafeInteger(Number(value)), `${vector.name}: input ${i} is safe`);
    assert.equal(BigInt(Number(value)), BigInt(value), 'Number conversion must be lossless');
  }
  const expected = reference(vector.args);
  for (const surface of surfaces) {
    for (const fn of ['roll_dice', 'roll_hundred']) {
      test(`${surface.name} / ${fn} / ${vector.name}`, () => {
        // A thrown exception is also a failure. Changing the accepted domain
        // requires an explicit contract decision and refusal tests, not a
        // blanket "any exception counts as fixed" escape hatch here.
        const actual = surface.call(fn, vector.args);
        assert.equal(actual, expected[fn],
          `${surface.name}.${fn}(${vector.args.join(', ')}) must match exact arithmetic`);
      });
    }
  }
}
