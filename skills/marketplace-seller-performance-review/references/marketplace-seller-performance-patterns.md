# Marketplace Seller Performance Patterns

## Marketplace Seller Performance Review state machine

```text
seller_onboarded -> signals_collected -> score_computed -> intervention_sent -> appeal_reviewed -> performance_recovered
       |                  |                  |                   |                 |
       v                  v                  v                   v                 v
 cold_start_gap     weak_signal      biased_score       unclear_action    churn_or_abuse
```

## Rule IDs

- `seller-performance-1` — Define seller category, lifecycle stage, buyer promise, performance dimensions, signal freshness, confidence, and evidence quality.
- `seller-performance-2` — Separate fulfillment quality, response time, refunds, disputes, cancellations, policy violations, support burden, buyer satisfaction, and fraud risk.
- `seller-performance-3` — Use cold-start, category-normalized, and fairness-aware thresholds before ranking, badge, payout, or suspension actions.
- `seller-performance-4` — Explain performance actions with enough evidence for improvement and appeal while protecting fraud and abuse signals.
- `seller-performance-5` — Use intervention ladders from coaching to warning, demotion, payout hold, suspension, and reinstatement with owner and SLA.
- `seller-performance-6` — Measure seller outcomes, buyer harm, appeal overturns, false positives, category effects, and marketplace liquidity.
- `seller-performance-7` — Feed repeated performance issues into onboarding, listing requirements, certification, quality scoring, policy, and support content.
- `seller-performance-8` — Review high-revenue or strategic sellers with the same evidence bar as smaller sellers.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New seller | Use cold-start path | Category and metadata | No discovery chance |
| High disputes | Demote or coach | Dispute/refund evidence | Buyer harm |
| Payout hold | Require risk evidence | Transaction history | Unfair cash impact |
| Appeal | Independent review | Action evidence | No recourse |
| Top seller issue | Apply same bar | Policy evidence | Revenue bias |

## Seller performance checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `seller_performance_signal_collected`, `seller_performance_score_computed`, `seller_performance_intervention_sent`, `seller_performance_ranking_changed`, `seller_performance_appeal_opened`, `seller_performance_reinstated`, `seller_performance_policy_updated`.

Recommended properties: `seller_id, category, lifecycle_stage, signal_type, score, confidence, action_type, ranking_impact, payout_status, dispute_rate, refund_rate, appeal_status, fairness_segment, decision`.


## Merged from marketplace-quality-scoring-review

# Marketplace Quality Scoring Patterns

## Marketplace Quality Scoring Review state machine

```text
supply_submitted -> signals_collected -> score_computed -> action_applied -> appeal_window -> score_reviewed
      |                 |                  |                |               |
      v                 v                  v                v               v
 insufficient_data  abuse_signal      low_confidence   manual_review  score_adjusted
```

## Rule IDs

- `marketplace-quality-1` — Define quality dimensions such as correctness, completeness, reliability, safety, support, freshness, user satisfaction, policy compliance, and business outcome.
- `marketplace-quality-2` — Separate eligibility gates, ranking boosts, trust badges, certification, demotion, warnings, and manual review triggers.
- `marketplace-quality-3` — Use multiple evidence sources: structured review, usage success, refunds/disputes, support burden, moderation, freshness, repeat buyers, and expert audit.
- `marketplace-quality-4` — Normalize for supply age, category, region/language, traffic exposure, and cold-start conditions where appropriate.
- `marketplace-quality-5` — Protect scores from spam reviews, collusion, engagement bait, paid manipulation, complaint brigading, and popularity bias.
- `marketplace-quality-6` — Expose actionable explanations to creators/sellers and provide appeal or re-review workflows.
- `marketplace-quality-7` — Monitor score impact on conversion, retention, refunds, disputes, supply diversity, new creator success, and buyer trust.
- `marketplace-quality-8` — Review score changes with policy, ranking, moderation, and marketplace economics owners.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New listing | Use cold-start path | Category and metadata quality | No exposure forever |
| High revenue, high disputes | Demote or review | Refund/dispute data | Rewarding harm |
| Quality badge | Require audit evidence | Checklist and history | Trust badge inflation |
| Appeal | Provide evidence and path | Score factors and policy | Unfair punishment |
| Signal change | Run ranking guardrails | Experiment metrics | Discovery regression |

## Marketplace quality checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `marketplace_quality_signal_collected`, `marketplace_quality_score_computed`, `marketplace_quality_action_applied`, `marketplace_quality_appeal_opened`, `marketplace_quality_review_completed`, `marketplace_quality_score_changed`, `marketplace_quality_experiment_guardrail_failed`.

Recommended properties: `supply_id, creator_id, category, quality_dimension, signal_source, score, confidence, action_type, ranking_impact, appeal_status, freshness_days, dispute_rate, fairness_segment, decision`.
