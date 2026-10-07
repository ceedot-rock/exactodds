import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import exact_seed_codegen as codegen


class ExactSeedCodegenTests(unittest.TestCase):
    def test_checked_in_output_is_idempotent(self):
        for slug in codegen.TARGETS:
            text = (Path(codegen.__file__).parent / "rules" / (slug + ".js")).read_text()
            with self.subTest(slug=slug):
                self.assertEqual(codegen.lower_module(slug, text), text)

    def test_legacy_output_is_lowered_and_rest_preserved(self):
        for slug, names in codegen.TARGETS.items():
            old, new = ((codegen.OLD_RAFFLE, codegen.NEW_RAFFLE)
                        if slug == "casino-raffle-draw"
                        else (codegen.OLD_GAME, codegen.NEW_GAME))
            for name in names:
                with self.subTest(slug=slug, name=name):
                    body = "\n" + old + "\n    return state;\n"
                    self.assertEqual(codegen.lower_body(slug, name, body),
                                     "\n" + new + "\n    return state;\n")

    def test_changed_formula_fails_closed(self):
        with self.assertRaises(ValueError):
            codegen.lower_body("provably-fair-dice", "roll_dice",
                               codegen.OLD_GAME.replace("* 31", "* 32"))

    def test_missing_function_fails_closed(self):
        with self.assertRaises(ValueError):
            codegen.validate_targets("provably-fair-dice", ["roll_dice"])

    def test_unrelated_function_is_untouched(self):
        self.assertEqual(codegen.lower_body("provably-fair-crash", "settle_crash", "body"), "body")


if __name__ == "__main__":
    unittest.main()
