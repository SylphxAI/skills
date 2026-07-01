# Marketplace Trust Safety Economics Patterns

## Marketplace Trust Safety Economics Review state machine

```text
listing_submitted -> quality_checked -> ranked -> transaction_completed -> dispute_window -> payout_released
       |                 |         |                    |                 |
       v                 v         v                    v                 v
 rejected         abuse_review ranking_suppressed  dispute_opened    payout_held
```

## Rule IDs

- `marketplace-economics-1` — Model incentives for buyers, sellers/creators, affiliates, moderators, reviewers, and the platform across acquisition, transaction, fulfillment, and retention.
- `marketplace-economics-2` — Track gross revenue, net revenue, refunds, chargebacks, dispute cost, moderation cost, support cost, payout timing, and retained trust.
- `marketplace-economics-3` — Set quality gates before ranking boosts, payouts, certification, featured placement, and high-risk category access.
- `marketplace-economics-4` — Use enforcement ladders with warning, demotion, hold, removal, suspension, appeal, and reinstatement criteria.
- `marketplace-economics-5` — Protect ranking and ratings from spam, collusion, review manipulation, refund gaming, and engagement bait.
- `marketplace-economics-6` — Balance false positives and false negatives with appeal metrics, creator impact, buyer harm, and repeat-offender signals.
- `marketplace-economics-7` — Run trust experiments with guardrails for liquidity, quality, dispute rate, refund rate, support load, and long-term retention.
- `marketplace-economics-8` — Feed abuse and quality patterns into policy, onboarding, search/ranking, payouts, support, and product design.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Payout hold | Hold for high-risk pattern | Risk score and transaction history | Paying out fraud |
| Ranking boost | Require quality and trust gates | Ratings/disputes/completion | Rewarding low quality |
| Refund abuse | Use evidence ladder and appeals | Refund history and item evidence | Punishing legitimate buyers |
| Creator suspension | Provide reason and appeal | Policy and evidence | Unfair enforcement |
| Take-rate change | Model trust costs too | Unit economics dashboard | False profitability |

## Marketplace trust economics checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `marketplace_listing_submitted`, `marketplace_quality_gate_failed`, `marketplace_ranking_adjusted`, `marketplace_dispute_opened`, `marketplace_payout_held`, `marketplace_enforcement_appealed`, `marketplace_trust_metric_changed`.

Recommended properties: `marketplace_side, listing_id, seller_id, buyer_id, category, risk_type, quality_score, ranking_signal, dispute_status, refund_amount, payout_status, enforcement_action, appeal_status, unit_margin, decision`.
