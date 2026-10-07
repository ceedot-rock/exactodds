// ExactOdds JS runtime — shared by all rule modules. Do not hand-edit.
function say(x) {
    console.log(typeof x === "boolean" ? (x ? "True" : "False") : typeof x === "bigint" ? _cuni_dec_str(x) : String(x));
}

function range(n) {
    n = Math.trunc(Number(n));
    if (!(n > 0)) return [];
    const xs = [];
    for (let i = 0; i < n; i++) xs.push(i);
    return xs;
}

function abs(n) {
    n = Math.trunc(Number(n));
    return n < 0 ? -n : n;
}

function min(a, b) {
    a = Math.trunc(Number(a)); b = Math.trunc(Number(b));
    return a <= b ? a : b;
}

function max(a, b) {
    a = Math.trunc(Number(a)); b = Math.trunc(Number(b));
    return a >= b ? a : b;
}

function _eo_slice(xs, a, b) {
    a = Math.trunc(Number(a)); b = Math.trunc(Number(b));
    const n = xs.length;
    if (a < 0 || b < 0 || a > n || b > n || a > b) return typeof xs === "string" ? "" : [];
    return xs.slice(a, b);
}

function _eo_div(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b) && b !== 0) return Math.trunc(a / b);
    return a / b;
}
function _eo_mod(a, b) {
    // Python-floored modulo (CuNi spec); JS % truncates.
    let r = a % b;
    if (r !== 0 && ((r < 0) !== (b < 0))) return r + b;
    return r;
}

// CuNi `dec`: fixed-point decimal, scale 10^4, as BigInt (docs/DECIMAL.md).
// A plain JS number is NOT exact (f64) — dec never touches Number.
function _cuni_dec_str(v) {
    const neg = v < 0n;
    const mag = neg ? -v : v;
    const ip = mag / 10000n;
    let fp = (mag % 10000n).toString().padStart(4, "0").replace(/0+$/, "");
    if (fp === "") fp = "0";
    return (neg ? "-" : "") + ip.toString() + "." + fp;
}
function _cuni_dec_mul(a, b) {
    return (a * b) / 10000n;  // BigInt / truncates toward zero, exact
}
function _cuni_dec_div(a, b) {
    if (b === 0n) throw new Error("cuni: dec division by zero");
    return (a * 10000n) / b;  // BigInt / truncates toward zero, exact
}
function _cuni_dec_of_int(n) {
    return BigInt(n) * 10000n;
}
function _cuni_int_of_dec(d) {
    return Number(d / 10000n);  // truncates toward zero, like every seat
}

// CuNi `time`: unix epoch seconds as BigInt, UTC (docs/TIME.md).
// A plain JS number is NOT exact past 2^53 — time never touches Number,
// following dec's BigInt precedent (docs/DECIMAL.md §7).
function _cuni_time_str(v) {
    // Canonical ISO-8601 UTC rendering (docs/TIME.md §4), BigInt math.
    let days = v / 86400n, sod = v % 86400n;
    if (sod < 0n) { days -= 1n; sod += 86400n; }  // floor division
    const z = days + 719468n;
    const era = z >= 0n ? z / 146097n : -((-z + 146096n) / 146097n);
    const doe = z - era * 146097n;
    const yoe = (doe - doe / 1460n + doe / 36524n - doe / 146096n) / 365n;
    const y = yoe + era * 400n;
    const doy = doe - (365n * yoe + yoe / 4n - yoe / 100n);
    const mp = (5n * doy + 2n) / 153n;
    const d = doy - (153n * mp + 2n) / 5n + 1n;
    const m = mp < 10n ? mp + 3n : mp - 9n;
    const yy = m <= 2n ? y + 1n : y;
    const hh = sod / 3600n, mi = (sod % 3600n) / 60n, ss = sod % 60n;
    const ay = yy < 0n ? -yy : yy;
    let ys = ay.toString().padStart(4, "0");
    if (yy < 0n) ys = "-" + ys;
    const p2 = (n) => n.toString().padStart(2, "0");
    return ys + "-" + p2(m) + "-" + p2(d) + "T" + p2(hh) + ":" + p2(mi) + ":" + p2(ss) + "Z";
}
function _cuni_parse_time(s) {
    // Strict ISO-8601 UTC -> BigInt epoch (docs/TIME.md §2, §5).
    // Bad input throws loudly — never a silent value.
    const bad = () => { throw new Error("cuni: parse_time: bad ISO-8601 UTC timestamp — refused"); };
    if (typeof s !== "string" || s.length !== 20) bad();
    if (s[4] !== "-" || s[7] !== "-" || s[10] !== "T" || s[13] !== ":" || s[16] !== ":" || s[19] !== "Z") bad();
    const dig = (i) => { const c = s.charCodeAt(i); if (c < 48 || c > 57) bad(); return BigInt(c - 48); };
    const y = dig(0)*1000n + dig(1)*100n + dig(2)*10n + dig(3);
    const mo = dig(5)*10n + dig(6), d = dig(8)*10n + dig(9);
    const h = dig(11)*10n + dig(12), mi = dig(14)*10n + dig(15), sec = dig(17)*10n + dig(18);
    if (y < 1n || y > 9999n || mo < 1n || mo > 12n) bad();
    let dim = 31n;
    if (mo === 4n || mo === 6n || mo === 9n || mo === 11n) dim = 30n;
    else if (mo === 2n) dim = (y % 4n === 0n && (y % 100n !== 0n || y % 400n === 0n)) ? 29n : 28n;
    if (d < 1n || d > dim || h > 23n || mi > 59n || sec > 59n) bad();
    const y0 = mo <= 2n ? y - 1n : y;
    const era = y0 / 400n, yoe = y0 - era * 400n;
    const mp = (mo + 9n) % 12n;
    const doy = (153n * mp + 2n) / 5n + d - 1n;
    const doe = yoe * 365n + yoe / 4n - yoe / 100n + doy;
    const days = era * 146097n + doe - 719468n;
    return days * 86400n + h * 3600n + mi * 60n + sec;
}
function _cuni_add_seconds(t, s) {
    return t + BigInt(s);  // BigInt: no overflow possible on this seat
}
function _cuni_days_between(a, b) {
    return Number((a - b) / 86400n);  // BigInt / truncates toward zero
}


// JSON: value-based integer rule (docs/STDLIB.md §1.1). JS numbers
// are f64, so number tokens are validated lexically (exact string
// arithmetic) BEFORE JSON.parse sees them — JSON.parse would
// silently round 9007199254740993 to 9007199254740992.
function _cuni_json_int_value(tok) {
    const bad = () => { throw new ExactOddsError("json.parse: number is not an integer in ±(2^53−1)"); };
    let t = tok, neg = false;
    if (t[0] === "-") { neg = true; t = t.slice(1); }
    let mant = t, exp = 0;
    const ei = mant.search(/[eE]/);
    if (ei >= 0) {
        const es = mant.slice(ei + 1);
        if (!/^[+-]?\d+$/.test(es)) bad();
        exp = parseInt(es, 10); mant = mant.slice(0, ei);
    }
    let f = 0, digits = mant;
    const di = mant.indexOf(".");
    if (di >= 0) {
        const fp = mant.slice(di + 1);
        if (!/^\d+$/.test(fp) || fp === "") bad();
        f = fp.length; digits = mant.slice(0, di) + fp;
    }
    if (!/^\d+$/.test(digits) || digits === "") bad();
    digits = digits.replace(/^0+/, "");
    if (digits === "") return 0;
    const tz = digits.match(/0+$/);
    if (tz) { f -= tz[0].length; digits = digits.slice(0, -tz[0].length); }
    const k = f - exp;
    if (k > 0) bad(); // no trailing zeros left: can't divide evenly
    const total = digits + "0".repeat(-k);
    if (total.length > 16) bad();
    if (total.padStart(16, "0") > "9007199254740991") bad();
    let v = parseInt(total, 10); // <= 2^53-1: exact in f64
    if (neg) v = -v;
    return v;
}

function _cuni_json_parse(s) {
    if (typeof s !== "string") throw new ExactOddsError("json.parse needs a str");
    // Lexical pre-check: string-aware scan so numbers inside strings
    // are skipped; every number token outside strings must satisfy
    // the integer rule. JSON.parse remains the syntax authority.
    // NOTE: no regex literals containing quotes here — the ingest
    // extractor is quote-aware but not regex-aware.
    const _cuni_num_re = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
    let _cuni_pi = 0, _cuni_pm;
    while (_cuni_pi < s.length) {
        const _cuni_pc = s[_cuni_pi];
        if (_cuni_pc === "\"") {
            _cuni_pi++; while (_cuni_pi < s.length) { const _cuni_pd = s[_cuni_pi]; if (_cuni_pd === "\\") _cuni_pi += 2; else { _cuni_pi++; if (_cuni_pd === "\"") break; } }
        continue;
        }
        _cuni_num_re.lastIndex = _cuni_pi;
        _cuni_pm = _cuni_num_re.exec(s);
        if (_cuni_pm !== null && _cuni_pm.index === _cuni_pi) { _cuni_json_int_value(_cuni_pm[0]); _cuni_pi += _cuni_pm[0].length; } else { _cuni_pi++; }
    }
    let v;
    try { v = JSON.parse(s); } catch (e) { throw new ExactOddsError("json.parse: invalid JSON"); }
    const w = _cuni_json_walk(v);
    if (!(w instanceof Map)) throw new ExactOddsError("json.parse: top-level JSON value must be an object");
    return w;
}

function _cuni_json_walk(v) {
    if (typeof v === "number") {
        if (!Number.isInteger(v) || Math.abs(v) > 9007199254740991) throw new ExactOddsError("json.parse: number is not an integer in ±(2^53−1)");
        return v;
    }
    if (typeof v === "string" || typeof v === "boolean" || v === null) return v;
    if (Array.isArray(v)) return v.map(_cuni_json_walk);
    if (typeof v === "object") {
        const out = new Map();
        for (const k of Object.keys(v)) out.set(k, _cuni_json_walk(v[k]));
        return out;
    }
    throw new ExactOddsError("json.parse: unexpected value");
}

function _cuni_json_set(o, k, v) {
    // defineProperty: a plain assignment would route "__proto__" to the prototype.
    Object.defineProperty(o, k, { value: v, enumerable: true, writable: true, configurable: true });
}

function _cuni_json_norm(v) {
    if (v instanceof Map) {
        const o = {};
        for (const [k, x] of v) {
            if (typeof k !== "string") throw new ExactOddsError("json.emit: map keys must be strings");
            _cuni_json_set(o, k, _cuni_json_norm(x));
        }
        return o;
    }
    if (Array.isArray(v)) return v.map(_cuni_json_norm);
    if (typeof v === "number") {
        if (!Number.isInteger(v) || Math.abs(v) > 9007199254740991) throw new ExactOddsError("json.emit: floats have no JSON integer form");
        return v;
    }
    if (typeof v === "string" || typeof v === "boolean" || v === null) return v;
    throw new ExactOddsError("json.emit: value has no JSON form");
}

function _cuni_json_emit(v) {
    if (!(v instanceof Map)) throw new ExactOddsError("json.emit needs a map");
    return JSON.stringify(_cuni_json_sort(_cuni_json_norm(v)));
}

function _cuni_json_sort(v) {
    if (Array.isArray(v)) return v.map(_cuni_json_sort);
    if (v !== null && typeof v === "object") {
        const o = {};
        for (const k of Object.keys(v).sort()) _cuni_json_set(o, k, _cuni_json_sort(v[k]));
        return o;
    }
    return v;
}

// Time: proleptic Gregorian, no leap seconds, years 1..9999 (docs/STDLIB.md §2).
function _cuni_days_from_civil(y, m, d) {
    const y0 = m <= 2 ? y - 1 : y;
    const era = Math.floor(y0 / 400);
    const yoe = y0 - era * 400;
    const mp = (m + 9) % 12;
    const doy = Math.floor((153 * mp + 2) / 5) + d - 1;
    const doe = yoe * 365 + Math.floor(yoe / 4) - Math.floor(yoe / 100) + doy;
    return era * 146097 + doe - 719468;
}

function _cuni_civil_from_days(z) {
    z += 719468;
    const era = Math.floor(z / 146097);
    const doe = z - era * 146097;
    const yoe = Math.floor((doe - Math.floor(doe / 1460) + Math.floor(doe / 36524) - Math.floor(doe / 146096)) / 365);
    let y = yoe + era * 400;
    const doy = doe - (365 * yoe + Math.floor(yoe / 4) - Math.floor(yoe / 100));
    const mp = Math.floor((5 * doy + 2) / 153);
    const d = doy - Math.floor((153 * mp + 2) / 5) + 1;
    let m = mp < 10 ? mp + 3 : mp - 9;
    if (m <= 2) y++;
    return [y, m, d];
}

function _cuni_time_epoch(y, mo, d, h, mi, s) {
    const chk = (v, lo, hi, nm) => { if (!(v >= lo && v <= hi)) throw new ExactOddsError("time.epoch: " + nm + " out of range"); };
    chk(y, 1, 9999, "year"); chk(mo, 1, 12, "month"); chk(h, 0, 23, "hour"); chk(mi, 0, 59, "minute"); chk(s, 0, 59, "second");
    const leap = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
    const dim = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mo - 1];
    if (!(d >= 1 && d <= dim)) throw new ExactOddsError("time.epoch: day out of range for month");
    return _cuni_days_from_civil(y, mo, d) * 86400 + h * 3600 + mi * 60 + s;
}

function _cuni_time_parts(e) {
    const lo = _cuni_days_from_civil(1, 1, 1) * 86400;
    const hi = _cuni_days_from_civil(9999, 12, 31) * 86400 + 86399;
    if (!(e >= lo && e <= hi)) throw new ExactOddsError("time.parts: epoch out of range 1..9999");
    const days = Math.floor(e / 86400);
    const secs = e - days * 86400;
    const [y, mo, d] = _cuni_civil_from_days(days);
    return new Map([["year", y], ["month", mo], ["day", d], ["hour", Math.floor(secs / 3600)], ["min", Math.floor((secs % 3600) / 60)], ["sec", secs % 60]]);
}

// String ops: byte-oriented on UTF-8 (docs/STDLIB.md §3).
function _cuni_split(s, sep) {
    if (typeof s !== "string" || typeof sep !== "string") throw new ExactOddsError(".split needs strings");
    if (sep === "") throw new ExactOddsError(".split: empty separator; refusing");
    return s.split(sep);
}

function _cuni_join(sep, parts) {
    if (typeof sep !== "string") throw new ExactOddsError(".join needs a str separator");
    if (!Array.isArray(parts)) throw new ExactOddsError(".join needs a list<str>");
    for (const x of parts) if (typeof x !== "string") throw new ExactOddsError(".join: all parts must be str");
    return parts.join(sep);
}

function _cuni_trim(s) {
    if (typeof s !== "string") throw new ExactOddsError(".trim needs a str");
    return s.replace(/^[ \t\n\v\f\r]+|[ \t\n\v\f\r]+$/g, "");
}

function _cuni_contains(s, sub) {
    if (typeof s !== "string" || typeof sub !== "string") throw new ExactOddsError(".contains needs strings");
    return s.includes(sub);
}

function _cuni_sha256(s) {
    if (typeof s !== "string") throw new ExactOddsError("sha256 needs a str");
    return require("crypto").createHash("sha256").update(s, "utf8").digest("hex");
}

// Raised by `fail` — the explicit failure-signaling statement.
class ExactOddsError extends Error {}


module.exports = { say, range, abs, min, max, _eo_slice, _eo_div, _eo_mod, ExactOddsError };
