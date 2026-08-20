# Game Soft Launch Patterns

## Soft-launch decision

Define the global-launch question, choose a market and acquisition cohort that
can answer it, observe a complete outcome window, and decide whether to scale,
iterate, hold, or stop. Technical failures, market mismatch, and invalid cohorts
return to the owning product or acquisition decision.

## Operating method

- Define the global-launch decision before choosing test markets.
- Segment metrics by install source, creative, country, platform, version, payer/non-payer, and player skill where relevant.
- Retention, session depth, economy health, crash-free rate, support load, and monetization must be read together.
- FTUE and D0/D1 learning should precede aggressive monetization tuning.
- Ads need fill, eCPM, placement fatigue, retention impact, and store policy review.
- IAP needs price ladder, offer fairness, refund handling, economy sinks/sources, and paywall friction review.
- Store listing tests should separate creative conversion from product retention quality.
- Live events during soft launch should test operational rhythm without distorting baseline too much.
- Player community/support feedback should feed bug, balance, and messaging decisions.
- Scale, iterate, hold, or stop decisions cite the observed cohort and material caveats.

## Decision table

| Signal | Interpretation | Action | Guardrail |
| --- | --- | --- | --- |
| D1 good, D7 weak | Early hook works, habit/core depth weak | Improve loop and progression | Hold UA scale until the later-retention predicate passes |
| Retention strong, ARPDAU weak | Monetization underdeveloped or audience mismatch | Tune offers/ads carefully | Watch retention/support |
| ARPDAU high, churn/refunds high | Over-monetization or trust issue | Reduce friction and review economy | Protect reviews and support |
| CPI low, retention low | Creative attracts wrong users | Fix targeting/listing | Reassess with retained usage from the corrected audience |
| Crash rate high | Technical blocker | Hold launch | Fix before more acquisition |
| Community sentiment strong | Qualitative signal | Build feedback loop | Validate with cohorts |

## Decision checks

- Test market and acquisition sources match the learning question.
- Instrumentation covers FTUE, core loop, economy, IAP, ads, crashes, support, and reviews.
- Decision signals are segmented and map to owner actions.
- Economy changes are versioned and reversible where possible.
- Scale decision includes market caveats and player trust risks.

## Measurement

Use the product's existing event system to measure FTUE completion, core-loop
completion, economy changes, IAP offers, ad rewards, crashes, support, and player
feedback. Each analysis records game version, market, platform, acquisition
source, cohort, player segment, economy version, observation window, observed
result, and decision.
