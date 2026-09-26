// Validates verifier/exactodds-core.js against the gated reference games.
// Run: node validate.mjs   (from ~/workspace/exactodds/verifier/)
// Exit 0 = every check passed. Any mismatch fails loudly.
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const core = require("./exactodds-core.js");
const repo = path.resolve(__dirname, "..");

let pass = 0, fail = 0;
function check(name, actual, expected) {
  if (actual === expected) { pass++; return; }
  fail++;
  console.log("MISMATCH  " + name);
  console.log("  got:     " + JSON.stringify(actual));
  console.log("  expected:" + JSON.stringify(expected));
}
function fixture(name) {
  return fs.readFileSync(path.join(repo, "gate/fixtures", name), "utf8");
}

// --- 1. Reconstruct each gate fixture byte-for-byte from the ported math ---
const diceLines = [
  String(core.rollDice("987654321", "123456789", "1")),
  String(core.rollDice("987654321", "123456789", "2")),
  String(core.rollDice("111111111", "222222222", "1")),
  String(core.rollHundred("987654321", "123456789", "1"))
];
check("dice.stdout byte-identical", diceLines.join("\n") + "\n", fixture("dice.stdout"));

const coinCalls = [
  ["flip", "987654321", "123456789", "1"], ["flip", "987654321", "123456789", "2"],
  ["flip", "987654321", "123456789", "3"], ["flip", "987654321", "123456789", "4"],
  ["flip", "987654321", "123456789", "5"], ["flip", "111111111", "222222222", "1"],
  ["flip", "111111111", "222222222", "2"], ["flip", "555555555", "999999999", "7"],
  ["flip_bit", "987654321", "123456789", "1"], ["flip_bit", "555555555", "999999999", "7"]
];
check("coin-flip.stdout byte-identical",
  coinCalls.map(c => core.compute(c[0], c[1], c[2], c[3])).join("\n") + "\n",
  fixture("coin-flip.stdout"));

const rouletteCalls = [
  ["987654321", "123456789", "1"], ["987654321", "123456789", "2"],
  ["987654321", "123456789", "3"], ["111111111", "222222222", "1"],
  ["111111111", "222222222", "2"], ["555555555", "999999999", "7"],
  ["424242424", "242424242", "13"]
];
check("roulette.stdout byte-identical",
  rouletteCalls.map(c => core.spinLine(c[0], c[1], c[2])).join("\n") + "\n",
  fixture("roulette.stdout"));

// --- 2. Every audited round in the core's table matches its expected output ---
let rounds = 0;
for (const game of Object.keys(core.AUDITED)) {
  for (const r of core.AUDITED[game]) {
    rounds++;
    check("audited " + game + "/" + r.label, core.compute(r.fn, r.ss, r.cs, r.round), r.expected);
  }
}

// --- 3. Mixing intermediates cross-checked against an independent Python computation ---
const intermediates = [
  // [ss, cs, round, mixed, state]  (python3: (ss*31+cs*17+r*13)%M, (48271*mixed)%M)
  ["987654321", "123456789", "1", "503794672", "567793484"],
  ["987654321", "123456789", "2", "503794685", "568421007"],
  ["111111111", "222222222", "1", "779771287", "1393913808"],
  ["555555555", "999999999", "7", "2009967574", "1981076741"],
  ["424242424", "242424242", "13", "92858251", "562262732"]
];
for (const [ss, cs, r, mixed, state] of intermediates) {
  const m = core.mix(ss, cs, r);
  check("mix intermediates " + ss + "/" + cs + "/" + r,
    m.mixed.toString() + "/" + m.state.toString(), mixed + "/" + state);
}

// --- 4. SHA-256 fallback: NIST vectors + agreement with Node's crypto on real seeds ---
check("sha256('') NIST", core.sha256FallbackHex(""),
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
check("sha256('abc') NIST", core.sha256FallbackHex("abc"),
  "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
for (const s of ["987654321", "123456789", "424242424", "hello world"]) {
  check("sha256 fallback == node crypto (" + JSON.stringify(s) + ")",
    core.sha256FallbackHex(s),
    crypto.createHash("sha256").update(s, "utf8").digest("hex"));
}
// async primary path (SubtleCrypto in Node) agrees too
for (const s of ["987654321", "555555555"]) {
  const viaSubtle = await core.sha256Hex(s);
  check("sha256 subtle == node crypto (" + JSON.stringify(s) + ")",
    viaSubtle, crypto.createHash("sha256").update(s, "utf8").digest("hex"));
}

// --- 5. Input validation: non-integer seeds must be refused, not silently coerced ---
let threw = 0;
for (const bad of ["abc", "12.5", "-3", "", "0x10"]) {
  try { core.mix(bad, "1", "1"); } catch (e) { threw++; }
}
check("non-integer seeds refused (5/5)", String(threw), "5");

console.log("----------------------------------------");
console.log("audited rounds checked: " + rounds);
console.log("PASS: " + pass + "  FAIL: " + fail);
process.exit(fail === 0 ? 0 : 1);
