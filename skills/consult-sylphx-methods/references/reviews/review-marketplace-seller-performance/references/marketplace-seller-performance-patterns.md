# Marketplace Seller Performance Patterns

## Contents

- [Current-authority-at-use protocol](#current-authority-at-use-protocol)
- [Decision separation](#decision-separation)
- [Signal contract](#signal-contract)
- [State model](#state-model)
- [Rule IDs](#rule-ids)
- [Sparse-data and normalization patterns](#sparse-data-and-normalization-patterns)
- [Intervention ladder](#intervention-ladder)
- [Appeal contract](#appeal-contract)
- [Fairness and marketplace-health readout](#fairness-and-marketplace-health-readout)
- [Events](#events)

## Current-authority-at-use protocol

Before recommending a live threshold or action, retrieve and record the current
marketplace policy, seller terms, category promise, signal dictionary, ranking
contract, enforcement/appeal policy, payout boundary, and region-specific rules.
Capture version, effective date, scope, owner, and canonical location.

If authority is unavailable, use named parameters such as
`minimum_opportunity_count`, `warning_band`, and `review_confidence_floor` with
no invented value. Mark the affected decision `policy_blocked`. Do not expose
evasion-sensitive values in an external artifact even when internally verified.

## Decision separation

| Surface | Purpose | Required separation |
| --- | --- | --- |
| Eligibility | minimum policy/safety requirements | binary rule and explicit exception |
| Performance insight | help seller improve | descriptive evidence and safe explanation |
| Badge/certification | communicate verified promise | higher evidence and expiry/review |
| Ranking input | improve buyer matching/outcomes | calibrated feature plus ranking guardrails |
| Coaching/warning | correct behavior | opportunity, evidence, notice, recovery path |
| Enforcement referral | assess policy breach | independent policy/reviewer authority |
| Payout-risk referral | protect transaction funds | marketplace-payout owner decides hold/release |

One composite score must not silently authorize all seven surfaces.

## Signal contract

Each signal records:

- assessment unit and eligible opportunity denominator;
- definition, direction, source/version, collection delay, and lookback window;
- category/region/lifecycle comparability and seasonality;
- sample count, uncertainty, missingness, and outcome maturity;
- manipulation, collusion, review-bombing, exposure, and popularity risk;
- relationship to buyer harm and seller-controllable action;
- safe seller explanation and hidden abuse-sensitive detail;
- owner, refresh cadence, policy version, and permitted decision surfaces.

Examples include fulfillment success, on-time delivery, response quality,
cancellation, refund/dispute outcome, content/listing correctness, policy/safety
violation, support burden, repeat buyer outcome, freshness, and verified audit.
Raw ratings and revenue are weak without exposure and manipulation controls.

## State model

```text
seller_entered -> opportunity_observed -> evidence_matured -> decision_evaluated
decision_evaluated -> insight_or_coaching -> recovered
decision_evaluated -> warning -> review -> restriction_or_clear
restriction_or_clear -> appeal -> upheld_or_reversed -> recovery_monitored

sparse_data -> cold_start_exploration
policy_changed -> prior_score_expired_or_recomputed
low_confidence -> no_high_impact_automation
```

## Rule IDs

- `seller-performance-1` — Define assessment unit, opportunity denominator,
  category, region, lifecycle, policy version, and decision surface.
- `seller-performance-2` — Keep eligibility, performance insight, badge,
  ranking input, coaching, enforcement, and payout referral as separate decisions.
- `seller-performance-3` — Normalize rate signals by eligible opportunity and
  mature outcome window; do not punish sellers for traffic they never received.
- `seller-performance-4` — Represent sparse data as uncertainty, not poor
  quality; use cold-start exploration and bounded manual evidence.
- `seller-performance-5` — Use category/region/lifecycle comparisons only after
  checking legitimate structural differences and source parity.
- `seller-performance-6` — Give every high-impact decision its own evidence bar,
  confidence floor, notice, owner, review, appeal, expiry, and recovery test.
- `seller-performance-7` — Explain actionable reason categories and evidence
  windows while withholding evasion-sensitive trust/fraud details.
- `seller-performance-8` — Freeze the action evidence/version for appeal and use
  an independent review path able to reverse and repair downstream effects.
- `seller-performance-9` — Monitor appeal reversals, false positives/negatives,
  time to recovery, seller churn, and repeat buyer harm by relevant segments.
- `seller-performance-10` — Test spam, collusion, review bombing, popularity,
  strategic-seller override, metric substitution, and feedback-loop gaming.
- `seller-performance-11` — Audit effects on buyer trust, conversion, refunds,
  support, seller success, new-seller discovery, supply diversity, and liquidity.
- `seller-performance-12` — Apply the same policy evidence bar to strategic and
  high-revenue sellers; record any authorized exception explicitly.
- `seller-performance-13` — Recompute or visibly break comparability after a
  material policy, signal, category, or source-version change.
- `seller-performance-14` — Keep payout holds/releases and policy enforcement in
  their authorized systems; emit evidence-bearing referrals only.

## Sparse-data and normalization patterns

| Problem | Safer treatment | Unsafe treatment |
| --- | --- | --- |
| New seller | exploration floor, metadata/audit evidence, confidence label | zero exposure forever |
| Few orders | uncertainty interval or shrinkage for low-impact use | raw rate triggers suspension |
| Delayed disputes/refunds | wait for mature outcome window or label provisional | compare immature recent cohort |
| Category logistics differ | normalize only after causal/operational review | global threshold without context |
| Missing source data | block affected action and repair source | impute poor performance |
| Traffic exposure differs | opportunity-based denominator | outcomes divided by seller age |

Shrinkage or category priors may stabilize low-volume estimates for low-impact
ranking/insight use, but must remain explainable, monitored, and prohibited from
becoming sole high-impact enforcement evidence.

## Intervention ladder

| Stage | Evidence and action | Recovery requirement |
| --- | --- | --- |
| Insight | descriptive pattern with confidence | seller can inspect and act |
| Coaching | controllable repeated issue | guidance and observation window |
| Warning | mature material harm or policy risk | notice, deadline, evidence snapshot |
| Visibility change | calibrated buyer-outcome risk | bounded duration, ranking guardrails |
| Review/referral | high impact or low explainability | authorized reviewer and full record |
| Suspension | current policy breach with required evidence | appeal, expiry or reinstatement criteria |
| Reinstatement | issue remediated or decision reversed | downstream ranking/badge/referral repair |

## Appeal contract

Preserve the original policy version, action evidence, window, confidence,
explanation, and downstream effects. Let the seller submit scoped counterevidence.
Use an independent reviewer for high-impact actions, record decision reasons, and
reverse ranking/badge/referral effects when overturned. Monitor repeated reversal
causes as system defects, not isolated support tickets.

## Fairness and marketplace-health readout

Check decision and error rates by legitimate category, region, lifecycle, seller
size, language, accessibility needs, and other legally/ethically appropriate
segments. Investigate data coverage and structural opportunity before comparing
rates. Do not infer protected attributes or create sensitive segmentation without
authority and purpose.

Measure buyer harm, fulfilled value, refunds/disputes, seller improvement,
appeal reversal, new-seller discovery, supply diversity, concentration,
liquidity, support load, and gaming displacement together.

## Events

Track `seller_opportunity_observed`, `seller_signal_matured`,
`seller_decision_evaluated`, `seller_intervention_sent`, `seller_referral_created`,
`seller_appeal_opened`, `seller_decision_reversed`, `seller_reinstated`, and
`seller_policy_version_changed`. Include assessment unit, category/lifecycle,
opportunity count band, confidence band, source/policy version, decision surface,
reason category, appeal state, and owner; omit evasion-sensitive raw signals.
