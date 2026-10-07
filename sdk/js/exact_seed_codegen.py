"""Fail-closed exact lowering for the known generated seed-mixing expressions.

This is a narrowly scoped SDK code-generation pass, not a general compiler fix.
Unknown emitted expressions require review instead of silently retaining Number
arithmetic. It can also normalize the existing checked-in generated modules,
without a compiler, for a source-preserving arithmetic repair.
"""
import argparse
import re
from pathlib import Path

TARGETS = {
    "provably-fair-dice": {"roll_dice", "roll_hundred"},
    "provably-fair-coin-flip": {"flip", "flip_bit"},
    "provably-fair-roulette": {"spin"},
    "provably-fair-crash": {"crash_point"},
    "casino-raffle-draw": {"raffle_winner"},
}
IMPORT = "const { seedInteger: _eo_seed_integer } = require('../seed-integers.js');"
FUNCTION = re.compile(r"^function (\w+)\(([^)]*)\) \{(.*?)^\}", re.M | re.S)

OLD_GAME = (
    "    let mixed = ((((server_seed * 31) + (client_seed * 17)) + (round * 13)) % 2147483647);\n"
    "    let state = ((48271 * mixed) % 2147483647);"
)
NEW_GAME = (
    '    let mixed = ((_eo_seed_integer(server_seed, "server_seed") * 31n\n'
    '        + _eo_seed_integer(client_seed, "client_seed") * 17n\n'
    '        + _eo_seed_integer(round, "round") * 13n) % 2147483647n);\n'
    "    let state = Number((48271n * mixed) % 2147483647n);"
)
OLD_RAFFLE = (
    "    let mixed = (((seed * 31) + 17) % 2147483647);\n"
    "    let state = ((48271 * mixed) % 2147483647);"
)
NEW_RAFFLE = (
    '    _eo_seed_integer(tickets, "tickets", 1);\n'
    '    let mixed = ((_eo_seed_integer(seed, "seed") * 31n + 17n) % 2147483647n);\n'
    "    let state = Number((48271n * mixed) % 2147483647n);"
)


def lower_body(slug, name, body):
    if name not in TARGETS.get(slug, set()):
        return body
    old, new = (OLD_RAFFLE, NEW_RAFFLE) if slug == "casino-raffle-draw" else (OLD_GAME, NEW_GAME)
    if body.count(old) == 1 and new not in body:
        return body.replace(old, new, 1)
    if body.count(new) == 1 and old not in body:
        return body
    raise ValueError(f"{slug}/{name}: unrecognized seed arithmetic; exact lowering refused")


def validate_targets(slug, names):
    missing = TARGETS.get(slug, set()) - set(names)
    if missing:
        raise ValueError(f"{slug}: expected seed functions missing: {sorted(missing)}")


def lower_module(slug, text):
    seen = []

    def replace(match):
        name, params, body = match.groups()
        seen.append(name)
        return f"function {name}({params}) {{{lower_body(slug, name, body)}}}"

    lowered = FUNCTION.sub(replace, text)
    validate_targets(slug, seen)
    if slug in TARGETS and IMPORT not in lowered:
        anchor = "const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');"
        if lowered.count(anchor) != 1:
            raise ValueError(f"{slug}: cannot locate runtime import")
        lowered = lowered.replace(anchor, anchor + "\n" + IMPORT, 1)
    return lowered


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Refuse stale generated seed arithmetic without writing")
    args = parser.parse_args()
    root = Path(__file__).resolve().parent
    pending = {}
    for slug in TARGETS:
        file = root / "rules" / f"{slug}.js"
        text = file.read_text()
        lowered = lower_module(slug, text)
        if text != lowered:
            pending[file] = lowered
    if args.check and pending:
        raise SystemExit("Stale exact lowering: " + ", ".join(f.name for f in pending))
    for file, text in pending.items():
        file.write_text(text)
    print(f"Exact seed lowering: {len(TARGETS)} modules checked, {len(pending)} updated")
