"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const sdk = require("..");
const core = require("../../../verifier/exactodds-core.js");

const pairs = [
  ["roll_dice", "rollDice"], ["roll_hundred", "rollHundred"],
  ["flip", "flip"], ["flip_bit", "flipBit"], ["spin", "spin"],
  ["spin_line", "spinLine"],
];
const MOD = 2147483647n;
const MAX = BigInt(Number.MAX_SAFE_INTEGER);
const vectors = [[987654321,1,1], [1234567890123456,1,1], [Number.MAX_SAFE_INTEGER,1,1]];
for (const [axis, coefficient] of [31n,17n,13n].entries()) {
  const threshold = (MAX - (61n - coefficient)) / coefficient;
  for (let offset = -16n; offset <= 16n; offset++) {
    const v = [1,1,1];
    v[axis] = Number(threshold + offset);
    vectors.push(v);
  }
}
for (const s of [0,1,2147483646,2147483647,2147483648,Number.MAX_SAFE_INTEGER]) {
  vectors.push([s,s,s]);
}
let rng = 0x8c41a7f3d9e2056bn;
function sample(bound) {
  const mask = (1n<<64n)-1n;
  rng ^= (rng<<13n)&mask; rng ^= rng>>7n; rng ^= (rng<<17n)&mask; rng &= mask;
  return Number(rng % bound);
}
for (let i=0;i<2000;i++) {
  const bound = i<1000 ? MOD : MAX+1n;
  vectors.push([sample(bound),sample(bound),sample(bound)]);
}
let comparisons = 0;
for (const values of vectors) {
  for (const [sdkName, coreName] of pairs) {
    const actual = sdk[sdkName](...values);
    assert.equal(actual, core[coreName](...values.map(String)), `${sdkName} ${values}`);
    assert.notEqual(typeof actual, "bigint", "Public return types must remain JSON-compatible");
    comparisons++;
  }
  const [s,c,r] = values.map(BigInt);
  const state = (48271n*((s*31n+c*17n+r*13n)%MOD))%MOD;
  const h = state%10000n;
  assert.equal(sdk.crash_point(...values), Number(h<100n?100n:990000n/(10000n-h)));
  const raffleState = (48271n*((s*31n+17n)%MOD))%MOD;
  for (const tickets of [1,100,Number.MAX_SAFE_INTEGER]) {
    assert.equal(sdk.raffle_winner(values[0],tickets), Number(1n+raffleState%BigInt(tickets)));
  }
}
assert.equal(sdk.roll_dice(1234567890123456,1,1),2);
assert.equal(sdk.roll_dice(Number.MAX_SAFE_INTEGER,1,1),4);
assert.equal(sdk.crash_point(1234567890123456,1,1),356);

let refusals = 0;
const invalid = [-1,1.5,NaN,Infinity,-Infinity,Number.MAX_SAFE_INTEGER+1,"1",null,undefined,true,{},[],1n];
for (const fn of ["roll_dice","roll_hundred","flip","flip_bit","spin","spin_line","crash_point"]) {
  for (const bad of invalid) for (let axis=0;axis<3;axis++) {
    const args=[1,1,1]; args[axis]=bad;
    assert.throws(()=>sdk[fn](...args), {code:"EXACTODDS_INVALID_SEED"});
    refusals++;
  }
}
for (const bad of invalid) {
  assert.throws(()=>sdk.raffle_winner(bad,100),{code:"EXACTODDS_INVALID_SEED"});
  assert.throws(()=>sdk.raffle_winner(1,bad),{code:"EXACTODDS_INVALID_SEED"});
  refusals+=2;
}
assert.throws(()=>sdk.raffle_winner(1,0),{code:"EXACTODDS_INVALID_SEED"});
refusals++;
for (const bad of ["9007199254740992","9007199254740993","999999999999999999999999","-1","1.5",Number.MAX_SAFE_INTEGER+1]) {
  for (let axis=0;axis<3;axis++) {
    const args=["1","1","1"]; args[axis]=bad;
    assert.throws(()=>core.mix(...args));
    refusals++;
  }
}
assert.equal(core.rollDice(" 0001234567890123456 ","1","1"),2);
assert.equal(JSON.parse(JSON.stringify({result:sdk.roll_dice(1234567890123456,1,1)})).result,2);

// The downloadable HTML embeds the core, so require byte-identical copies.
const root=path.resolve(__dirname,"../../..");
const html=fs.readFileSync(path.join(root,"verifier/verifier.html"),"utf8");
const embedded=html.match(/<script>\s*(\/\* ExactOdds reference math[\s\S]*?)<\/script>/);
assert.ok(embedded,"Embedded verifier core must be present");
assert.equal(embedded[1].trim(),fs.readFileSync(path.join(root,"verifier/exactodds-core.js"),"utf8").trim());
console.log(`Exact seed regression PASS: ${vectors.length} vectors, ${comparisons} SDK/verifier comparisons, crash + raffle oracles, ${refusals} refusals, embedded verifier parity.`);
