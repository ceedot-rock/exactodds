"""Narrow, fail-closed SDK adaptation of the reviewed emitted seed mixer.

This does not repair the compiler's JS backend. Both normal builds and the
explicit checked-in-artifact refresh use the same validated transformation.
"""
import argparse
import re
from pathlib import Path

TARGETS = {
    "provably-fair-dice": {"roll_dice", "roll_hundred"},
    "provably-fair-coin-flip": {"flip", "flip_bit"},
    "provably-fair-roulette": {"spin"},
    "provably-fair-crash": {"crash_point"},
}
# casino-raffle-draw documents "the seed must be a non-negative integer below
# 290 trillion". seed * 31 exceeds f64 precision above that, so the documented
# bound is enforced with the coded refusal instead of silently computing wrong
# winners. tickets must be a positive integer (tickets are numbered 1..N);
# tickets = 0 previously produced NaN.
RAFFLE_SLUG = "casino-raffle-draw"
RAFFLE_TARGETS = {"raffle_winner"}
RAFFLE_PARAMS = "seed, tickets"
RAFFLE_PREFIX = (
    "\n    let mixed = _eo_mod(((seed * 31) + 17), 2147483647);\n"
    "    let state = _eo_mod((48271 * mixed), 2147483647);\n"
)
RAFFLE_GUARD = (
    "\n    if (typeof seed !== 'number' || !Number.isSafeInteger(seed)"
    " || seed < 0 || seed >= 290000000000000) {\n"
    "        const error = new RangeError("
    "'seed must be a non-negative safe integer below 290 trillion');\n"
    "        error.code = 'ERR_EXACTODDS_SEED_INPUT';\n"
    "        error.parameter = 'seed';\n"
    "        throw error;\n"
    "    }\n"
    "    if (typeof tickets !== 'number' || !Number.isSafeInteger(tickets)"
    " || tickets < 1) {\n"
    "        const error = new RangeError('tickets must be a positive safe integer');\n"
    "        error.code = 'ERR_EXACTODDS_SEED_INPUT';\n"
    "        error.parameter = 'tickets';\n"
    "        throw error;\n"
    "    }\n"
)
PARAMS = "server_seed, client_seed, round"
# Matches the current reference compiler's JS backend output, which emits
# _eo_mod(...) (Python-floored modulo; rebranded from _cuni_mod) rather than
# the raw % operator the older compiler produced. For the non-negative
# seed-mixer operands the two are identical; the adapter replaces the whole
# prefix either way.
PREFIX = (
    "\n    let mixed = _eo_mod((((server_seed * 31) + (client_seed * 17)) + "
    "(round * 13)), 2147483647);\n"
    "    let state = _eo_mod((48271 * mixed), 2147483647);\n"
)
EXACT_PREFIX = "\n    let state = seedState(server_seed, client_seed, round);\n"
IMPORT = "const { seedState } = require('../seed-math.js');"


def adapt_functions(slug, functions):
    """Validate the complete target set before returning transformed tuples."""
    targets = TARGETS.get(slug, set())
    if not targets:
        return functions
    names = [name for name, _, _ in functions]
    if any(names.count(name) != 1 for name in targets):
        raise ValueError(f"{slug}: missing or duplicate reviewed seed function")
    result = []
    for name, params, body in functions:
        if name in targets:
            if params != PARAMS or not body.startswith(PREFIX):
                raise ValueError(f"{slug}/{name}: unreviewed seed mixer shape")
            remainder = body[len(PREFIX):]
            # The removed mixed variable must not have another consumer.
            if re.search(r"\bmixed\b", remainder):
                raise ValueError(f"{slug}/{name}: unexpected mixed-state consumer")
            body = EXACT_PREFIX + remainder
        result.append((name, params, body))
    return result


def adapt_raffle(slug, functions):
    """Enforce the raffle's documented seed bound; fail closed on shape drift."""
    if slug != RAFFLE_SLUG:
        return functions
    names = [name for name, _, _ in functions]
    if any(names.count(name) != 1 for name in RAFFLE_TARGETS):
        raise ValueError(f"{slug}: missing or duplicate raffle function")
    result = []
    for name, params, body in functions:
        if name in RAFFLE_TARGETS:
            if params != RAFFLE_PARAMS or not body.startswith(RAFFLE_PREFIX):
                raise ValueError(f"{slug}/{name}: unreviewed raffle mixer shape")
            # Guard first, then the original mixer unchanged: the bound keeps
            # seed * 31 exactly representable in f64, so the emitted
            # arithmetic below stays correct.
            body = RAFFLE_GUARD + body
        result.append((name, params, body))
    return result


def refresh_checked_in(sdk):
    """Refresh existing artifacts, without claiming fresh compiler execution."""
    function_pattern = re.compile(r"^function (\w+)\(([^)]*)\) \{(.*?)^\}$", re.M | re.S)
    pending = []
    for slug in list(TARGETS) + [RAFFLE_SLUG]:
        target = sdk / "rules" / (slug + ".js")
        text = target.read_text()
        matches = list(function_pattern.finditer(text))
        functions = [(m[1], m[2], m[3]) for m in matches]
        adapted = adapt_raffle(slug, adapt_functions(slug, functions))
        for match, (name, params, body) in reversed(list(zip(matches, adapted))):
            text = text[:match.start()] + f"function {name}({params}) {{{body}}}" + text[match.end():]
        if IMPORT in text:
            raise ValueError(f"{slug}: adapter import already present")
        anchor = "const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');"
        if text.count(anchor) != 1:
            raise ValueError(f"{slug}: unreviewed runtime import")
        pending.append((target, text.replace(anchor, anchor + "\n" + IMPORT)))
    # Shape/target validation above completes for all modules before any write.
    for target, text in pending:
        target.write_text(text)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--refresh-checked-in", action="store_true", required=True)
    parser.parse_args()
    refresh_checked_in(Path(__file__).resolve().parent)
    print("Adapted four checked-in SDK modules; no compiler was run.")
