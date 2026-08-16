# Marketplace Seller Performance Patterns

## Contents

- [Current source check](#current-source-check)
- [Decision separation](#decision-separation)
- [Signal contract](#signal-contract)
- [Seller performance flow](#seller-performance-flow)
- [Sparse-data and normalization patterns](#sparse-data-and-normalization-patterns)
- [Intervention ladder](#intervention-ladder)
- [Appeal contract](#appeal-contract)
- [Fairness and marketplace-health readout](#fairness-and-marketplace-health-readout)
- [Events](#events)

## Current source check

Before recommending a live threshold or action, retrieve and record the current
marketplace policy, seller terms, category promise, signal dictionary, ranking
contract, enforcement/appeal policy, payout boundary, and region-specific rules.
Capture version, effective date, scope, owner, and canonical location.

When policy values are unavailable, name the missing parameters and route the
decision to the policy owner. External artifacts publish the approved,
seller-actionable summary; evasion-sensitive values remain internal.

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

Each of the seven surfaces retains an explicit decision authority; a composite score supplies evidence to them.

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

## Seller performance flow

```text
seller enters -> opportunity is observed -> outcome matures -> decision is evaluated
decision -> insight, coaching, warning, authorized review, or scoped restriction
appeal -> uphold or reverse -> restore affected surfaces -> monitor recovery
```

Sparse data uses cold-start exploration and visible uncertainty. A policy or
signal change triggers recomputation or a visible comparability break. High-impact
actions use mature evidence and the current policy owner.

## Operating method

- Define assessment unit, opportunity denominator,
  category, region, lifecycle, policy version, and decision surface.
- Keep eligibility, performance insight, badge,
  ranking input, coaching, enforcement, and payout referral as separate decisions.
- Normalize rate signals by eligible opportunity and
  mature outcome window; seller assessment includes only traffic they received.
- Represent sparse data as uncertainty, not poor
  quality; use cold-start exploration and bounded manual evidence.
- Use category/region/lifecycle comparisons only after
  checking legitimate structural differences and source parity.
- Give every high-impact decision its own evidence bar,
  confidence floor, notice, owner, review, appeal, expiry, and recovery test.
- Explain actionable reason categories and evidence
  windows while withholding evasion-sensitive trust/fraud details.
- Freeze the action evidence/version for appeal and use
  an independent review path able to reverse and repair downstream effects.
- Monitor appeal reversals, false positives/negatives,
  time to recovery, seller churn, and repeat buyer harm by relevant segments.
- Test spam, collusion, review bombing, popularity,
  strategic-seller override, metric substitution, and feedback-loop gaming.
- Audit effects on buyer trust, conversion, refunds,
  support, seller success, new-seller discovery, supply diversity, and liquidity.
- Apply the same policy evidence bar to strategic and
  high-revenue sellers; record any authorized exception explicitly.
- Recompute or visibly break comparability after a
  material policy, signal, category, or source-version change.
- Keep payout holds/releases and policy enforcement in
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
ranking and insight use when the method stays explainable and monitored. The
current enforcement policy defines the evidence required for high-impact action.

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
rates. Protected-attribute inference and sensitive segmentation require explicit authority and purpose.

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
