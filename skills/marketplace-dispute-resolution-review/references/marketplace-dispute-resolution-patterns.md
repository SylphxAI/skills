# Marketplace Dispute Resolution Patterns

## Marketplace Dispute Resolution Review state machine

```text
dispute_opened -> evidence_requested -> temporary_action_set -> reviewer_decided -> appeal_window_open -> outcome_enforced -> pattern_reviewed
       |                  |                    |                    |                    |                  |
       v                  v                    v                    v                    v                  v
 invalid_claim      evidence_gap        overbroad_hold       biased_decision      appeal_needed     policy_gap
```

## Rule IDs

- `marketplace-dispute-1` — Classify dispute type, parties, transaction/listing, policy claim, evidence, timeline, financial exposure, fraud risk, and reviewer independence.
- `marketplace-dispute-2` — Separate buyer harm, seller/creator harm, platform policy risk, fraud, chargebacks, payout risk, quality mismatch, and moderation appeals.
- `marketplace-dispute-3` — Define evidence requirements, deadlines, temporary holds or restrictions, communication templates, and escalation thresholds.
- `marketplace-dispute-4` — Protect sensitive fraud, abuse, and reviewer signals while still giving parties enough explanation to understand and appeal.
- `marketplace-dispute-5` — Tie payout, refund, chargeback, rating, ranking, badge, and enforcement actions to policy and evidence standards.
- `marketplace-dispute-6` — Measure dispute fairness by party segment, category, geography, revenue tier, appeal overturn rate, repeat disputes, and resolution time.
- `marketplace-dispute-7` — Feed repeated dispute causes into listing quality, onboarding, certification, ranking, terms, and support content.
- `marketplace-dispute-8` — Review high-value, high-risk, or precedent-setting disputes with policy, legal, trust, finance, and marketplace owners.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Non-delivery claim | Hold payout and request evidence | Delivery logs and buyer proof | Unfair payout or refund |
| Quality mismatch | Compare listing promise to result | Listing and artifact evidence | Subjective bias |
| Chargeback | Coordinate finance and trust | Payment processor record | Double refund loss |
| Creator appeal | Independent review | Original evidence package | No credible recourse |
| Fraud suspicion | Limit disclosure | Risk signals and policy | Abuse signal leakage |

## Marketplace dispute checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `marketplace_dispute_opened`, `marketplace_dispute_evidence_requested`, `marketplace_dispute_temporary_action_set`, `marketplace_dispute_decision_made`, `marketplace_dispute_appeal_opened`, `marketplace_dispute_outcome_enforced`, `marketplace_dispute_pattern_reviewed`.

Recommended properties: `dispute_id, dispute_type, buyer_id, seller_id, listing_id, transaction_id, category, evidence_status, temporary_action, payout_status, refund_status, appeal_status, reviewer_role, fraud_risk, fairness_segment, decision`.
