// CuNi JS seat runtime — shared by all rule modules. Do not hand-edit.
function say(x) {
    console.log(typeof x === "boolean" ? (x ? "True" : "False") : String(x));
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

function _cuni_slice(xs, a, b) {
    a = Math.trunc(Number(a)); b = Math.trunc(Number(b));
    const n = xs.length;
    if (a < 0 || b < 0 || a > n || b > n || a > b) return typeof xs === "string" ? "" : [];
    return xs.slice(a, b);
}

function _cuni_div(a, b) {
    if (Number.isInteger(a) && Number.isInteger(b) && b !== 0) return Math.trunc(a / b);
    return a / b;
}

// Raised by `fail` — CuNi's explicit failure-signaling statement.
class CuNiError extends Error {}


module.exports = { say, range, abs, min, max, _cuni_slice, _cuni_div, CuNiError };
