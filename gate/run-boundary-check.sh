#!/usr/bin/env bash
# ExactOdds boundary-vector gate extension.
#
# The five-seat gate (run-gate.sh) proves byte-identical stdout on the small
# audited fixtures. This script extends it with boundary vectors across the
# full safe-integer domain, per the release-gate requirement that "existing
# small fixtures alone are not evidence of full-domain parity."
#
# What it checks:
#   1. py, c, cpp seats agree exactly on large inputs (they use big-int /
#      int64 arithmetic — the exact reference).
#   2. The published JS SDK (with the seed-math adapter) matches py/c/cpp
#      exactly on every vector.
#   3. The raw js/ts compiler seats are REPORTED (not gated): they diverge
#      above the f64 precision boundary. That is the known compiler-backend
#      limitation, mitigated SDK-side by the fail-closed adapter in
#      sdk/js/exact_seed_codegen.py. See ARITHMETIC-FIX-RELEASE-NOTES.md.
#
# Exit 0 = py/c/cpp/SDK agree on every vector. Exit 1 = any disagreement.
set -u
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

find_compiler() {
    if [ -n "${PROVABLY_COMPILER:-}" ] && [ -x "$PROVABLY_COMPILER" ]; then
        echo "$PROVABLY_COMPILER"; return 0
    fi
    for cand in "$REPO/../cuni-langs/target/debug/cuni" \
        "$HOME/workspace/cuni-langs/target/debug/cuni" \
        "$(command -v cuni 2>/dev/null || true)"; do
        if [ -n "$cand" ] && [ -x "$cand" ]; then echo "$cand"; return 0; fi
    done
    return 1
}
CUNI="$(find_compiler)" || { echo "no reference compiler found" >&2; exit 1; }

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
cp "$REPO/games/provably-fair-dice.exactodds" "$tmpdir/vectors.cuni"
cat >> "$tmpdir/vectors.cuni" <<'EOF'
say(roll_dice(1234567890123456, 1, 1))
say(roll_dice(9007199254740991, 1, 1))
say(roll_hundred(1234567890123456, 1, 1))
say(roll_hundred(9007199254740991, 1, 1))
say(roll_dice(9007199254740991, 9007199254740991, 9007199254740991))
EOF

declare -A out
for lang in py js ts c cpp; do
    out[$lang]="$("$CUNI" run "$tmpdir/vectors.cuni" --lang "$lang" 2>/dev/null | tail -5)"
done

# The fixed SDK, straight from the repo checkout.
sdk_out="$(node -e "
const sdk = require('$REPO/sdk/js/index.js');
const v = [
  [1234567890123456, 1, 1],
  [9007199254740991, 1, 1],
];
const lines = [];
lines.push(sdk.roll_dice(1234567890123456, 1, 1));
lines.push(sdk.roll_dice(9007199254740991, 1, 1));
lines.push(sdk.roll_hundred(1234567890123456, 1, 1));
lines.push(sdk.roll_hundred(9007199254740991, 1, 1));
lines.push(sdk.roll_dice(9007199254740991, 9007199254740991, 9007199254740991));
console.log(lines.join('\n'));
")"

fail=0
for lang in py c cpp; do
    if [ "${out[$lang]}" != "${out[py]}" ]; then
        echo "MISMATCH: $lang seat disagrees with py seat"; fail=1
    fi
done
if [ "$sdk_out" != "${out[py]}" ]; then
    echo "MISMATCH: SDK disagrees with py/c/cpp seats"; fail=1
fi

echo "--- boundary vectors (large safe-integer inputs) ---"
echo "py seat:  $(echo "${out[py]}" | tr '\n' ' ')"
echo "c seat:   $(echo "${out[c]}" | tr '\n' ' ')"
echo "cpp seat: $(echo "${out[cpp]}" | tr '\n' ' ')"
echo "SDK:      $(echo "$sdk_out" | tr '\n' ' ')"
echo "--- known compiler-backend divergence (mitigated SDK-side) ---"
echo "js seat:  $(echo "${out[js]}" | tr '\n' ' ')"
echo "ts seat:  $(echo "${out[ts]}" | tr '\n' ' ')"

if [ "$fail" -eq 0 ]; then
    echo "boundary-check: py/c/cpp/SDK agree on all vectors — PASS"
else
    echo "boundary-check: FAILURES PRESENT" >&2
fi
exit "$fail"
