// exactodds — provably-fair casino rule packs. Same rules, every seat.
// Generated — do not hand-edit.
const SOURCE_HASHES = {
  "provably-fair-dice": "795a43fa1864c30565d436e302ac0011662b01a45dc4c023c5af37f76ccdbb44",
  "provably-fair-coin-flip": "04783043adaf23b7880977bfaacc4324eb02d8d77bf41991f7dfd6037510c3d0",
  "provably-fair-roulette": "1eaac333fa3d25c23224a0d649a52471e3e38077c406d4913212271d79c9cc9c",
  "provably-fair-crash": "50e534572ffb9001af10c5badd7bca2690ad6c461861f597479e869c42861411",
  "casino-bonus-wagering": "48fdd87f2146172f458a58a18663cd299d07d5a5d555631358573c03dfdd93a3",
  "casino-poker-rake": "59d3f42751e98a0a42ffb1f0499a690eb863dbf6b804d8b8b67e51f6ffac0eb5",
  "casino-sportsbook-settlement": "c006d146447596921541e22c96855130a8cc1bde57bbcbbda8d2d4e3482bbc43",
  "casino-affiliate-revshare": "9c71a8b01ac01dfccd2bc04b21399c9b9cd326a85397a69739c48a0cb7c86c82",
  "casino-responsible-limits": "7e2c64a7b2824bacbd5ee598c5ab5792fabf6815caa0bde9d05afd47b78d7f50",
  "casino-slots-payline": "608ed7ac63e478fdfea2e2c835cf92f58c13de97af79685af3e762ab88a7361d",
  "casino-progressive-jackpot": "5177fabbd1f946997df878500207f8dc9e81fcd72ac13f12b19cde2c9bedf019",
  "casino-tourney-points": "be59fa0d6c1847b9e5ba0e7c3a9495fd14fded625516e4c6404201ef002ce66d",
  "casino-cashback": "c193f4cdfbe7da2438f7a788fceb7c5d4579b2e1521eeb6499eb9a019920ab47",
  "casino-aml-structuring": "384fcf00a5c8e0e130adc514edbc5f3c0991ac7ed6c5c366a5161ec6367caa20",
  "casino-referral-bonus": "c430a24cbc3237efeb2dd578eb9a083c4143afab7d079db633394cfd7432661d",
  "casino-comp-points": "c4f40db460e92402b4b87c0ebbaee5b4f351d5b5204df1f0ee8763c8bffe179f",
  "casino-rtp-audit": "5b25525b0ccd5960ff05b31d31477f9b8accf0b0d166f17fda9bc149e983cc57",
  "casino-raffle-draw": "ba9c92a34c279e76003d1eb5c65a8fbd9743b0a14134b6b9b8ba627e0330e031",
  "casino-baccarat-settle": "44bf488f09610fad0e535330dddc4dc066fee4e4ea5ff591c201c187c8f1d004"
};

const programs = {};
programs['provably-fair-dice'] = require('./rules/provably-fair-dice');
programs['provably-fair-coin-flip'] = require('./rules/provably-fair-coin-flip');
programs['provably-fair-roulette'] = require('./rules/provably-fair-roulette');
programs['provably-fair-crash'] = require('./rules/provably-fair-crash');
programs['casino-bonus-wagering'] = require('./rules/casino-bonus-wagering');
programs['casino-poker-rake'] = require('./rules/casino-poker-rake');
programs['casino-sportsbook-settlement'] = require('./rules/casino-sportsbook-settlement');
programs['casino-affiliate-revshare'] = require('./rules/casino-affiliate-revshare');
programs['casino-responsible-limits'] = require('./rules/casino-responsible-limits');
programs['casino-slots-payline'] = require('./rules/casino-slots-payline');
programs['casino-progressive-jackpot'] = require('./rules/casino-progressive-jackpot');
programs['casino-tourney-points'] = require('./rules/casino-tourney-points');
programs['casino-cashback'] = require('./rules/casino-cashback');
programs['casino-aml-structuring'] = require('./rules/casino-aml-structuring');
programs['casino-referral-bonus'] = require('./rules/casino-referral-bonus');
programs['casino-comp-points'] = require('./rules/casino-comp-points');
programs['casino-rtp-audit'] = require('./rules/casino-rtp-audit');
programs['casino-raffle-draw'] = require('./rules/casino-raffle-draw');
programs['casino-baccarat-settle'] = require('./rules/casino-baccarat-settle');

module.exports = {
  programs,
  SOURCE_HASHES,
  version: require('./package.json').version,
};
// Flat access: every rule function is also exported by name.
module.exports['roll_dice'] = programs['provably-fair-dice']['roll_dice'];
module.exports['roll_hundred'] = programs['provably-fair-dice']['roll_hundred'];
module.exports['flip'] = programs['provably-fair-coin-flip']['flip'];
module.exports['flip_bit'] = programs['provably-fair-coin-flip']['flip_bit'];
module.exports['spin'] = programs['provably-fair-roulette']['spin'];
module.exports['is_red'] = programs['provably-fair-roulette']['is_red'];
module.exports['color_of'] = programs['provably-fair-roulette']['color_of'];
module.exports['parity_of'] = programs['provably-fair-roulette']['parity_of'];
module.exports['range_of'] = programs['provably-fair-roulette']['range_of'];
module.exports['spin_line'] = programs['provably-fair-roulette']['spin_line'];
module.exports['crash_point'] = programs['provably-fair-crash']['crash_point'];
module.exports['settle_crash'] = programs['provably-fair-crash']['settle_crash'];
module.exports['wager_contrib'] = programs['casino-bonus-wagering']['wager_contrib'];
module.exports['wagering_remaining'] = programs['casino-bonus-wagering']['wagering_remaining'];
module.exports['bonus_cleared'] = programs['casino-bonus-wagering']['bonus_cleared'];
module.exports['rake'] = programs['casino-poker-rake']['rake'];
module.exports['settle_moneyline'] = programs['casino-sportsbook-settlement']['settle_moneyline'];
module.exports['revshare_tier'] = programs['casino-affiliate-revshare']['revshare_tier'];
module.exports['affiliate_pay'] = programs['casino-affiliate-revshare']['affiliate_pay'];
module.exports['deposit_allowed'] = programs['casino-responsible-limits']['deposit_allowed'];
module.exports['bet_allowed'] = programs['casino-responsible-limits']['bet_allowed'];
module.exports['paytable_mult'] = programs['casino-slots-payline']['paytable_mult'];
module.exports['slots_win'] = programs['casino-slots-payline']['slots_win'];
module.exports['jackpot_pool_after'] = programs['casino-progressive-jackpot']['jackpot_pool_after'];
module.exports['jackpot_reset'] = programs['casino-progressive-jackpot']['jackpot_reset'];
module.exports['tourney_points'] = programs['casino-tourney-points']['tourney_points'];
module.exports['cashback'] = programs['casino-cashback']['cashback'];
module.exports['aml_report'] = programs['casino-aml-structuring']['aml_report'];
module.exports['aml_structuring'] = programs['casino-aml-structuring']['aml_structuring'];
module.exports['referral_bonus'] = programs['casino-referral-bonus']['referral_bonus'];
module.exports['comp_earn'] = programs['casino-comp-points']['comp_earn'];
module.exports['comp_redeem'] = programs['casino-comp-points']['comp_redeem'];
module.exports['rtp_bps'] = programs['casino-rtp-audit']['rtp_bps'];
module.exports['raffle_winner'] = programs['casino-raffle-draw']['raffle_winner'];
module.exports['baccarat_settle'] = programs['casino-baccarat-settle']['baccarat_settle'];
