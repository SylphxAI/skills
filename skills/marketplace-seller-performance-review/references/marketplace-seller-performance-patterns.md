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
