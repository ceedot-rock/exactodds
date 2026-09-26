/* ExactOdds reference math — JavaScript port of the .cuni reference games.
 *
 * Sources of truth:
 *   games/provably-fair-dice.cuni
 *   games/provably-fair-coin-flip.cuni
 *   games/provably-fair-roulette.cuni
 *
 * The port MUST stay behavior-identical to those programs. Every audited
 * round in the sources is asserted against gate/fixtures/*.stdout by
 * verifier/validate.mjs — do not ship a change that breaks that gate.
 *
 * The reference games take INTEGER seeds (non-negative). There is no
 * string->integer hashing in the programs: the seeds ARE the integers.
 * The page hashes the server-seed TEXT with SHA-256 only for the
 * commitment check (commit-reveal), which is outside the game programs.
 */
(function (root, factory) {
  "use strict";
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(root);
  } else {
    root.ExactOdds = factory(root);
  }
})(typeof self !== "undefined" ? self : this, function (root) {
  "use strict";

  var MOD = 2147483647n; // 2^31 - 1, exactly as in the .cuni sources
  var PM_MULT = 48271n;  // Park-Miller multiplier, exactly as in the sources

  function parseSeed(v, name) {
    var t = String(v).trim();
    if (!/^\d+$/.test(t)) {
      throw new Error(name + " must be a non-negative integer");
    }
    return BigInt(t);
  }

  // mixed = (server_seed * 31 + client_seed * 17 + round * 13) % 2147483647
  // state = (48271 * mixed) % 2147483647
  // Returns { mixed: BigInt, state: BigInt }.
  function mix(serverSeed, clientSeed, round) {
    var ss = parseSeed(serverSeed, "server_seed");
    var cs = parseSeed(clientSeed, "client_seed");
    var r = parseSeed(round, "round");
    var mixed = (ss * 31n + cs * 17n + r * 13n) % MOD;
    var state = (PM_MULT * mixed) % MOD;
    return { mixed: mixed, state: state };
  }

  // --- dice ---
  function rollDice(ss, cs, r) { return Number(mix(ss, cs, r).state % 6n) + 1; }
  function rollHundred(ss, cs, r) { return Number(mix(ss, cs, r).state % 100n); }

  // --- coin flip ---
  function flip(ss, cs, r) {
    return mix(ss, cs, r).state % 2n === 0n ? "heads" : "tails";
  }
  function flipBit(ss, cs, r) { return Number(mix(ss, cs, r).state % 2n); }

  // --- european roulette ---
  // Standard European reds: 1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36
  var REDS = {
    1: 1, 3: 1, 5: 1, 7: 1, 9: 1, 12: 1, 14: 1, 16: 1, 18: 1,
    19: 1, 21: 1, 23: 1, 25: 1, 27: 1, 30: 1, 32: 1, 34: 1, 36: 1
  };
  function spin(ss, cs, r) { return Number(mix(ss, cs, r).state % 37n); }
  function colorOf(n) { return n === 0 ? "green" : (REDS[n] ? "red" : "black"); }
  function parityOf(n) { return n === 0 ? "neither" : (n % 2 === 1 ? "odd" : "even"); }
  function rangeOf(n) { return n === 0 ? "neither" : (n <= 18 ? "low" : "high"); }
  function spinLine(ss, cs, r) {
    var n = spin(ss, cs, r);
    return "spin " + String(r).trim() + ": " + n + " " +
      colorOf(n) + " " + parityOf(n) + " " + rangeOf(n);
  }

  // Dispatcher used by the verifier page.
  function compute(fn, ss, cs, r) {
    switch (fn) {
      case "roll_dice": return String(rollDice(ss, cs, r));
      case "roll_hundred": return String(rollHundred(ss, cs, r));
      case "flip": return flip(ss, cs, r);
      case "flip_bit": return String(flipBit(ss, cs, r));
      case "spin": return String(spin(ss, cs, r));
      case "spin_line": return spinLine(ss, cs, r);
      default: throw new Error("unknown function: " + fn);
    }
  }

  // Every audited round from the three .cuni sources, with the expected
  // output taken from gate/fixtures/*.stdout.
  var AUDITED = {
    dice: [
      { label: "roll_dice(987654321, 123456789, 1)", fn: "roll_dice", ss: "987654321", cs: "123456789", round: "1", expected: "3" },
      { label: "roll_dice(987654321, 123456789, 2)", fn: "roll_dice", ss: "987654321", cs: "123456789", round: "2", expected: "4" },
      { label: "roll_dice(111111111, 222222222, 1)", fn: "roll_dice", ss: "111111111", cs: "222222222", round: "1", expected: "1" },
      { label: "roll_hundred(987654321, 123456789, 1)", fn: "roll_hundred", ss: "987654321", cs: "123456789", round: "1", expected: "84" }
    ],
    coin: [
      { label: "flip(987654321, 123456789, 1)", fn: "flip", ss: "987654321", cs: "123456789", round: "1", expected: "heads" },
      { label: "flip(987654321, 123456789, 2)", fn: "flip", ss: "987654321", cs: "123456789", round: "2", expected: "tails" },
      { label: "flip(987654321, 123456789, 3)", fn: "flip", ss: "987654321", cs: "123456789", round: "3", expected: "heads" },
      { label: "flip(987654321, 123456789, 4)", fn: "flip", ss: "987654321", cs: "123456789", round: "4", expected: "tails" },
      { label: "flip(987654321, 123456789, 5)", fn: "flip", ss: "987654321", cs: "123456789", round: "5", expected: "heads" },
      { label: "flip(111111111, 222222222, 1)", fn: "flip", ss: "111111111", cs: "222222222", round: "1", expected: "heads" },
      { label: "flip(111111111, 222222222, 2)", fn: "flip", ss: "111111111", cs: "222222222", round: "2", expected: "tails" },
      { label: "flip(555555555, 999999999, 7)", fn: "flip", ss: "555555555", cs: "999999999", round: "7", expected: "tails" },
      { label: "flip_bit(987654321, 123456789, 1)", fn: "flip_bit", ss: "987654321", cs: "123456789", round: "1", expected: "0" },
      { label: "flip_bit(555555555, 999999999, 7)", fn: "flip_bit", ss: "555555555", cs: "999999999", round: "7", expected: "1" }
    ],
    roulette: [
      { label: "spin(987654321, 123456789, 1)", fn: "spin_line", ss: "987654321", cs: "123456789", round: "1", expected: "spin 1: 31 black odd high" },
      { label: "spin(987654321, 123456789, 2)", fn: "spin_line", ss: "987654321", cs: "123456789", round: "2", expected: "spin 2: 34 red even high" },
      { label: "spin(987654321, 123456789, 3)", fn: "spin_line", ss: "987654321", cs: "123456789", round: "3", expected: "spin 3: 0 green neither neither" },
      { label: "spin(111111111, 222222222, 1)", fn: "spin_line", ss: "111111111", cs: "222222222", round: "1", expected: "spin 1: 6 black even low" },
      { label: "spin(111111111, 222222222, 2)", fn: "spin_line", ss: "111111111", cs: "222222222", round: "2", expected: "spin 2: 9 red odd low" },
      { label: "spin(555555555, 999999999, 7)", fn: "spin_line", ss: "555555555", cs: "999999999", round: "7", expected: "spin 7: 23 red odd high" },
      { label: "spin(424242424, 242424242, 13)", fn: "spin_line", ss: "424242424", cs: "242424242", round: "13", expected: "spin 13: 2 black even low" }
    ]
  };

  // --- SHA-256 ---
  // Primary path is SubtleCrypto (async). The synchronous fallback below is
  // used only where SubtleCrypto is unavailable (e.g. non-secure contexts).
  // It is validated against NIST test vectors in validate.mjs.
  function sha256FallbackHex(text) {
    var bytes = new TextEncoder().encode(text);
    var K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];

    var l = bytes.length;
    var withOne = l + 1;
    var r = withOne % 64;
    var padLen = r <= 56 ? 56 - r : 120 - r;
    var total = withOne + padLen + 8;
    var msg = new Uint8Array(total);
    msg.set(bytes);
    msg[l] = 0x80;
    var dv = new DataView(msg.buffer);
    dv.setUint32(total - 8, Math.floor(l / 536870912)); // high 32 bits of bit length
    dv.setUint32(total - 4, (l * 8) % 4294967296);      // low 32 bits

    function rotr(x, n) { return (x >>> n) | (x << (32 - n)); }
    var w = new Array(64);
    for (var off = 0; off < total; off += 64) {
      for (var i = 0; i < 16; i++) w[i] = dv.getUint32(off + i * 4);
      for (i = 16; i < 64; i++) {
        var s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        var s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }
      var a = H[0], b = H[1], c = H[2], d = H[3],
          e = H[4], f = H[5], g = H[6], h = H[7];
      for (i = 0; i < 64; i++) {
        var S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
        var ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K[i] + w[i]) | 0;
        var S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
        var maj = (a & b) ^ (a & c) ^ (b & c);
        var t2 = (S0 + maj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0;
        d = c; c = b; b = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0;
      H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0;
      H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    var out = "";
    for (i = 0; i < 8; i++) out += (H[i] >>> 0).toString(16).padStart(8, "0");
    return out;
  }

  // Promise<string>: SHA-256 hex of the UTF-8 bytes of text.
  function sha256Hex(text) {
    var subtle = root.crypto && root.crypto.subtle;
    if (subtle && typeof subtle.digest === "function") {
      var bytes = new TextEncoder().encode(text);
      return subtle.digest("SHA-256", bytes).then(function (buf) {
        var arr = new Uint8Array(buf);
        var s = "";
        for (var i = 0; i < arr.length; i++) {
          s += arr[i].toString(16).padStart(2, "0");
        }
        return s;
      });
    }
    return Promise.resolve(sha256FallbackHex(text));
  }

  return {
    MOD: MOD,
    mix: mix,
    rollDice: rollDice,
    rollHundred: rollHundred,
    flip: flip,
    flipBit: flipBit,
    spin: spin,
    colorOf: colorOf,
    parityOf: parityOf,
    rangeOf: rangeOf,
    spinLine: spinLine,
    compute: compute,
    AUDITED: AUDITED,
    sha256Hex: sha256Hex,
    sha256FallbackHex: sha256FallbackHex
  };
});
