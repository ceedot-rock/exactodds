// Generated from games/casino-aml-structuring.exactodds — do not hand-edit.
const { say, range, abs, min, max, _eo_slice, _eo_div, _eo_mod, ExactOddsError } = require('../runtime.js');

function aml_report(deposit_cents, threshold_cents) {
    if ((deposit_cents >= threshold_cents)) {
        return 1;
    } else {
        return 0;
    }
}

function aml_structuring(dep1_cents, dep2_cents, dep3_cents, threshold_cents) {
    if ((dep1_cents < threshold_cents)) {
        if ((dep2_cents < threshold_cents)) {
            if ((dep3_cents < threshold_cents)) {
                if ((((dep1_cents + dep2_cents) + dep3_cents) >= threshold_cents)) {
                    return 1;
                }
            }
        }
    }
    return 0;
}

module.exports = { aml_report, aml_structuring };
