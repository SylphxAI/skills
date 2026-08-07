# Game Soft Launch Patterns

## Game soft-launch state machine

```text
internal_ready -> test_market_selected -> limited_acquisition -> cohort_observed -> gate_review -> iterate_or_scale -> global_launch_ready
       |                    |                   |                |              |
       v                    v                   v                v              v
 tech_blocker        market_mismatch       cohort_invalid    hold_or_kill   relaunch_needed
```

## Rule IDs

- `soft-launch-1` — Define the global-launch decision before choosing test markets.
- `soft-launch-2` — Segment metrics by install source, creative, country, platform, version, payer/non-payer, and player skill where relevant.
- `soft-launch-3` — Retention, session depth, economy health, crash-free rate, support load, and monetization must be read together.
- `soft-launch-4` — FTUE and D0/D1 learning should precede aggressive monetization tuning.
- `soft-launch-5` — Ads need fill, eCPM, placement fatigue, retention impact, and store policy review.
- `soft-launch-6` — IAP needs price ladder, offer fairness, refund handling, economy sinks/sources, and paywall friction review.
- `soft-launch-7` — Store listing tests should separate creative conversion from product retention quality.
- `soft-launch-8` — Live events during soft launch should test operational rhythm without distorting baseline too much.
- `soft-launch-9` — Player community/support feedback should feed bug, balance, and messaging decisions.
- `soft-launch-10` — Scale, iterate, hold, or kill decisions need written evidence and caveats.

## Decision table

| Signal | Interpretation | Action | Guardrail |
| --- | --- | --- | --- |
| D1 good, D7 weak | Early hook works, habit/core depth weak | Improve loop and progression | Do not scale UA yet |
| Retention strong, ARPDAU weak | Monetization underdeveloped or audience mismatch | Tune offers/ads carefully | Watch retention/support |
| ARPDAU high, churn/refunds high | Over-monetization or trust issue | Reduce friction and review economy | Protect reviews and support |
| CPI low, retention low | Creative attracts wrong users | Fix targeting/listing | Do not claim PMF |
| Crash rate high | Technical blocker | Hold launch | Fix before more acquisition |
| Community sentiment strong | Qualitative signal | Build feedback loop | Validate with cohorts |

## Gate checklist

- Test market and acquisition sources match the learning question.
- Instrumentation covers FTUE, core loop, economy, IAP, ads, crashes, support, and reviews.
- Gates are segmented and have action thresholds.
- Economy changes are versioned and reversible where possible.
- Scale decision includes market caveats and player trust risks.

## Event schema

Track: `soft_launch_market_selected`, `soft_launch_started`, `game_ftue_completed`, `game_core_loop_completed`, `game_economy_balance_changed`, `game_iap_offer_viewed`, `game_ad_reward_claimed`, `game_cohort_gate_reviewed`, `soft_launch_decision_recorded`, `global_launch_approved`.

Minimum properties: game version, market, platform, acquisition source, cohort, player segment, economy version, ad placement, IAP offer, metric window, gate result, and decision.
