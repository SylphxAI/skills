# Retention Cohort Systems

## Contents

- [Metric contract](#metric-contract)
- [Current telemetry authority](#current-telemetry-authority)
- [Metric families](#metric-families)
- [Rule IDs](#rule-ids)
- [Mix decomposition](#mix-decomposition)
- [Diagnosis tree](#diagnosis-tree)
- [Product-loop examples](#product-loop-examples)
- [Causal and experiment ladder](#causal-and-experiment-ladder)
- [Events](#events)

## Metric contract

Write the contract before reading the curve:

| Field | Required decision |
| --- | --- |
| Analysis unit | person, account, workspace, device, buyer, seller, character, developer app |
| Cohort entry | acquisition, signup, activation, first purchase, first production use, payer conversion |
| Eligibility | who had a real opportunity to perform the retained action |
| Retained value | observable action proving recurring product value |
| Interval | calendar or elapsed-time window, boundary, time zone, late-event policy |
| Metric family | exact-period, rolling, bracket, survival, hazard, renewal, repeat, frequency |
| Identity | anonymous/authenticated merge, devices, reinstall, bots, test users, deleted users |
| Comparison | prior cohort, holdout, target, counterfactual, or no comparison |

## Current telemetry authority

At task time, record event/dataset/query versions, release interval, identity
rules, time zone, ingestion latency, bot/test filtering, deletion/consent policy,
and known breaks. A chart image without these inputs can support questions, not a
causal or release-ready conclusion.

Use `observed`, `derived`, `assumed`, `not_provided`, and `comparability_blocked`
labels. Ask the analytics owner for the exact query or governed dataset when
recomputation matters; do not invent cohort values from prose.

## Metric families

For an eligible cohort `C` and interval `t`:

```text
exact-period retention(t)
= eligible and observable cohort members completing the retained value event in t
  / eligible cohort members observable through the end of t

rolling retention(t)
= eligible members returning on or after t
  / eligible members observable for the chosen rolling window

hazard(t)
= members churning during t
  / members still at risk at the start of t
```

Exact-period and rolling retention answer different questions. Subscription
renewal, repeat purchase, and seasonal return need explicit opportunity windows;
an always-on D7 template is often wrong.

Right-censored members have not yet completed the observation opportunity. Do
not count them as retained or churned; use a mature-cohort denominator or an
appropriate survival estimator. Show eligible and observable counts.

## Rule IDs

- `retention-1` — Define unit, entry, eligibility, retained value, cadence,
  interval, identity, and comparison before interpreting a curve.
- `retention-2` — Match the value event to the recurring product job; app open,
  login, billing-active, and page view are not default value events.
- `retention-3` — Label exact-period, rolling, bracket, survival, hazard,
  renewal, repeat, and frequency metrics; never blend them implicitly.
- `retention-4` — Show cohort maturity and right censoring. Use only users with
  an observation opportunity in the denominator.
- `retention-5` — Version event, query, identity, time-zone, bot, late-event,
  consent, and deletion rules; mark comparability breaks.
- `retention-6` — Decompose population-mix change from within-segment movement
  before assigning a product cause.
- `retention-7` — Separate acquisition, activation, retained usage, payer
  retention, subscription renewal, churn, and resurrection.
- `retention-8` — Show sample size and uncertainty; do not rank tiny segments by
  noisy point estimates.
- `retention-9` — Treat release, seasonality, marketing source, geography,
  platform, version, plan, persona, and feature exposure as candidate confounders.
- `retention-10` — State whether a mechanism is descriptive, correlational,
  quasi-experimental, or randomized evidence.
- `retention-11` — Every intervention names target cohort, mechanism, expected
  metric movement, observation window, and user/economic harm guardrails.
- `retention-12` — Measure resurrection separately and test whether resurrected
  users reach value again rather than merely reopen.
- `retention-13` — Pair retention with depth/success, satisfaction, support,
  refunds, opt-outs, safety, performance, margin, and accessibility as relevant.
- `retention-14` — Hand event/instrumentation implementation to the analytics
  specialist; this artifact owns the measurement requirement and diagnosis.

## Mix decomposition

Blended retention can change when segment weights change even if every segment
is stable. For segment `s`, retention `r_s`, and population weight `w_s`:

```text
blended retention = sum_s(w_s * r_s)
```

Use common reference weights to estimate within-segment movement, then common
reference rates to estimate mix movement. State the chosen reference; do not
claim a unique causal decomposition. Inspect both acquisition/source mix and
post-activation behavior. This catches Simpson's-paradox-like reversals.

## Diagnosis tree

| Layer | Questions | Evidence |
| --- | --- | --- |
| Measurement | event/query/identity/window changed? | version diff, recomputation, QA |
| Opportunity | cohort mature and eligible to return? | observable denominator, calendar |
| Acquisition | source/persona/region mix changed? | standardized segment readout |
| Activation | users reached first value? latency changed? | activation funnel and time-to-value |
| Core loop | recurring value weakened or became costly? | depth, success, sequence, qualitative evidence |
| Reliability | latency, crash, error, offline, device issue? | release/version and performance cuts |
| Lifecycle | notification/content/event/collaboration exposure changed? | exposure and opt-out/readout |
| Commercial | trial, price, paywall, refund, ad load, offer changed? | payer/value and cohort economics |
| Trust/support | complaint, safety, support, accessibility issue? | support themes and quality guardrails |

## Product-loop examples

| Product | Better retained value | Useful cadence/cuts | Misleading default |
| --- | --- | --- | --- |
| SaaS | team completes recurring job/collaboration | weekly/monthly; role, team, activation | login |
| Consumer app | meaningful outcome completed | product cadence; onboarding, platform, consent | app open |
| Game | core loop/progression/social value completed | daily/event/season; level, economy, payer | launch |
| Developer tool | successful production workflow | weekly/monthly; SDK, error, app maturity | docs visit |
| Marketplace | repeat successful buy/sell outcome | opportunity-based; side, category, trust | browse |
| Subscription | renewal plus value use | billing period; trial, plan, tenure | billing active |
| Community/content | meaningful contribution/consumption | content cadence; creator, topic, social graph | notification tap |

## Causal and experiment ladder

1. Validate measurement and comparability.
2. Localize the change by mature cohort and segment.
3. Align timing with releases, campaigns, incidents, price/content/event changes.
4. Seek within-user, exposure, dose, or mechanism evidence while naming bias.
5. Prefer randomized evidence where ethical and feasible; otherwise predefine a
   credible comparison, pretrend, exclusion, sensitivity, and falsification test.
6. Specify interference risks for collaboration, marketplace, social, and game
   systems where one user's treatment affects another.
7. Read through the full retention window and long-term guardrails; do not ship
   from an early proxy alone.

## Events

Specify rather than fabricate implementation: `cohort_entered`,
`activation_achieved`, `retained_value_completed`, `return_opportunity_opened`,
`churn_observed`, `resurrection_value_completed`, and
`retention_experiment_exposed`. Required properties include cohort contract
version, unit ID class, interval, source, platform/version, plan/payer state,
feature/lifecycle exposure, and experiment assignment. Keep raw sensitive data
out of generic analytics events.
