#!/usr/bin/env bash
# Provably exactness gate runner.
#
# For each reference game in games/, this script:
#   1. Finds the Provably reference compiler (cuni).
#   2. Runs the exactness gate: emits each native seat (py, js, ts, c, cpp),
#      runs them, and requires byte-identical stdout. Refuses on mismatch.
#   3. Writes a source-hash receipt next to receipts/.
#   4. Compares the winning stdout against the golden fixtures in
#      gate/fixtures/. Any drift from the audited outputs fails the run.
#
# Usage:  ./gate/run-gate.sh
# Env:    PROVABLY_COMPILER=/path/to/cuni   (overrides auto-detect)
#
# Exit 0 = every game PASS and every fixture matches.
# Exit 1 = anything fails, with the failing game/seat printed.

set -u
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SEATS="py,js,ts,c,cpp"

find_compiler() {
    if [ -n "${PROVABLY_COMPILER:-}" ] && [ -x "$PROVABLY_COMPILER" ]; then
        echo "$PROVABLY_COMPILER"; return 0
    fi
    for cand in \
        "$REPO/../cuni-langs/target/debug/cuni" \
        "$HOME/workspace/cuni-langs/target/debug/cuni" \
        "$(command -v cuni 2>/dev/null || true)"; do
        if [ -n "$cand" ] && [ -x "$cand" ]; then
            echo "$cand"; return 0
        fi
    done
    return 1
}

CUNI="$(find_compiler)" || {
    echo "run-gate: no Provably reference compiler found." >&2
    echo "run-gate: set PROVABLY_COMPILER=/path/to/cuni and retry." >&2
    exit 1
}
echo "run-gate: compiler: $CUNI"

fail=0
for game in "$REPO"/games/*.cuni; do
    name="$(basename "$game" .cuni)"
    echo "--- $name"
    out="$("$CUNI" check "$game" --only "$SEATS" --receipt 2>&1)"
    echo "$out"
    echo "$out" | grep -q "exactness: PASS" || { echo "run-gate: GATE FAILED for $name"; fail=1; continue; }

    # Re-derive the winning stdout from the fixtures and demand a match.
    # (The gate itself already demanded byte-identical seats; this checks the
    # audited golden outputs haven't drifted.)
    rec="$REPO/games/$name.receipt.json"
    [ -f "$rec" ] && mv "$rec" "$REPO/receipts/$name.receipt.json"

    fixture="$REPO/gate/fixtures/$(echo "$name" | sed 's/provably-fair-//').stdout"
    if [ -f "$fixture" ]; then
        got="$("$CUNI" run "$game" --lang py 2>/dev/null)"
        want="$(cat "$fixture")"
        if [ "$got" = "$want" ]; then
            echo "run-gate: fixture match for $name"
        else
            echo "run-gate: FIXTURE DRIFT for $name"
            fail=1
        fi
    fi
done

if [ "$fail" -eq 0 ]; then
    echo "run-gate: ALL GAMES PASS"
else
    echo "run-gate: FAILURES PRESENT" >&2
fi
exit "$fail"
