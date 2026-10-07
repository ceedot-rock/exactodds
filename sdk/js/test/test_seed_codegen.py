"""Shape/refusal tests for the SDK adapter; no reference compiler is mocked."""
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from exact_seed_codegen import TARGETS, PARAMS, PREFIX, EXACT_PREFIX, IMPORT, adapt_functions, adapt_raffle, refresh_checked_in
from exact_seed_codegen import RAFFLE_SLUG, RAFFLE_PARAMS, RAFFLE_PREFIX, RAFFLE_GUARD


class SeedCodegenTests(unittest.TestCase):
    def functions(self, slug):
        return [(name, PARAMS, PREFIX + "    return (state % 6);\n")
                for name in sorted(TARGETS[slug])]

    def test_all_four_target_modules(self):
        for slug in TARGETS:
            with self.subTest(slug=slug):
                result = adapt_functions(slug, self.functions(slug))
                for _, _, body in result:
                    self.assertTrue(body.startswith(EXACT_PREFIX))
                    self.assertNotIn("let mixed", body)

    def test_changed_formula_refused(self):
        functions = self.functions("provably-fair-dice")
        name, params, body = functions[0]
        functions[0] = (name, params, body.replace("* 31", "* 32"))
        with self.assertRaisesRegex(ValueError, "unreviewed seed mixer"):
            adapt_functions("provably-fair-dice", functions)

    def test_changed_signature_refused(self):
        functions = self.functions("provably-fair-dice")
        name, _, body = functions[0]
        functions[0] = (name, "seed, client_seed, round", body)
        with self.assertRaisesRegex(ValueError, "unreviewed seed mixer"):
            adapt_functions("provably-fair-dice", functions)

    def test_missing_target_refused(self):
        with self.assertRaisesRegex(ValueError, "missing or duplicate"):
            adapt_functions("provably-fair-dice", self.functions("provably-fair-dice")[:1])

    def test_duplicate_target_refused(self):
        functions = self.functions("provably-fair-dice")
        with self.assertRaisesRegex(ValueError, "missing or duplicate"):
            adapt_functions("provably-fair-dice", functions + functions[:1])

    def test_unexpected_mixed_consumer_refused(self):
        functions = self.functions("provably-fair-dice")
        name, params, body = functions[0]
        functions[0] = (name, params, body + "    return mixed;\n")
        with self.assertRaisesRegex(ValueError, "unexpected mixed-state consumer"):
            adapt_functions("provably-fair-dice", functions)

    def test_other_function_unchanged(self):
        other = ("color_of", "n", "\n    return n;\n")
        result = adapt_functions("provably-fair-roulette", self.functions("provably-fair-roulette") + [other])
        self.assertEqual(result[-1], other)

    def test_unrelated_module_unchanged(self):
        functions = [("rake", "n", "\n    return n;\n")]
        self.assertEqual(adapt_functions("casino-poker-rake", functions), functions)

    def artifact_tree(self, root):
        (root / "rules").mkdir()
        for slug in TARGETS:
            header = "const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');\n"
            functions = "\n".join(f"function {name}({params}) {{{body}}}\n"
                                  for name, params, body in self.functions(slug))
            (root / "rules" / (slug + ".js")).write_text(header + functions)
        header = "const { say, range, abs, min, max, _eo_slice, _eo_div, ExactOddsError } = require('../runtime.js');\n"
        raffle_body = RAFFLE_PREFIX + "    return (1 + _eo_mod(state, tickets));\n"
        (root / "rules" / (RAFFLE_SLUG + ".js")).write_text(
            header + f"function raffle_winner({RAFFLE_PARAMS}) {{{raffle_body}}}\n")

    def test_checked_in_refresh_uses_same_transformation(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.artifact_tree(root)
            refresh_checked_in(root)
            for target in (root / "rules").glob("*.js"):
                if target.stem == RAFFLE_SLUG:
                    continue
                text = target.read_text()
                self.assertEqual(text.count(IMPORT), 1)
                self.assertNotIn(PREFIX, text)
                self.assertEqual(text.count(EXACT_PREFIX), len(TARGETS[target.stem]))

    def test_raffle_refresh_adds_guard_keeps_mixer(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.artifact_tree(root)
            refresh_checked_in(root)
            text = (root / "rules" / (RAFFLE_SLUG + ".js")).read_text()
            self.assertIn(RAFFLE_GUARD, text)
            # The original mixer is preserved after the guard (the bound keeps
            # seed * 31 exactly representable, so the emitted math stays right).
            self.assertIn(RAFFLE_PREFIX.strip(), text)
            self.assertLess(text.index(RAFFLE_GUARD.strip()), text.index("let mixed"))

    def test_raffle_changed_shape_refused(self):
        functions = [("raffle_winner", RAFFLE_PARAMS,
                      RAFFLE_PREFIX.replace("* 31", "* 32") + "    return 1;\n")]
        with self.assertRaisesRegex(ValueError, "unreviewed raffle mixer"):
            adapt_raffle(RAFFLE_SLUG, functions)

    def test_raffle_unrelated_slug_unchanged(self):
        functions = [("raffle_winner", RAFFLE_PARAMS, RAFFLE_PREFIX + "    return 1;\n")]
        self.assertEqual(adapt_raffle("provably-fair-dice", functions), functions)

    def test_invalid_module_does_not_partially_refresh_others(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.artifact_tree(root)
            target = root / "rules" / "provably-fair-crash.js"
            target.write_text(target.read_text().replace("* 31", "* 32"))
            before = {p: p.read_bytes() for p in (root / "rules").glob("*.js")}
            with self.assertRaises(ValueError):
                refresh_checked_in(root)
            self.assertEqual(before, {p: p.read_bytes() for p in before})

    def test_second_refresh_refuses_without_changes(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self.artifact_tree(root)
            refresh_checked_in(root)
            before = {p: p.read_bytes() for p in (root / "rules").glob("*.js")}
            with self.assertRaises(ValueError):
                refresh_checked_in(root)
            self.assertEqual(before, {p: p.read_bytes() for p in before})


if __name__ == "__main__":
    unittest.main()
