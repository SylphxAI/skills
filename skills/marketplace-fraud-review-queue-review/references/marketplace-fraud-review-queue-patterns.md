# Marketplace Fraud Review Queue Patterns

## Marketplace Fraud Review Queue Review state machine

```text
signal_detected -> queue_prioritized -> evidence_reviewed -> action_decided -> appeal_available -> qa_sampled -> policy_updated
       |                |                   |                  |                 |              |
       v                v                   v                  v                 v              v
 noisy_signal     priority_inversion    evidence_gap      over_action       no_recource   biased_pattern
```

## Rule IDs

- `fraud-queue-1` — Define fraud surface, signal source, entity, transaction/listing, risk tier, financial exposure, customer harm, and reviewer authority.
- `fraud-queue-2` — Separate payout holds, refund abuse, fake reviews, chargebacks, account takeover, collusion, listing scams, buyer abuse, and seller abuse.
- `fraud-queue-3` — Prioritize queues by harm, exposure, time sensitivity, confidence, affected parties, and regulatory or platform deadlines.
- `fraud-queue-4` — Create evidence packages with allowed signals, transaction history, user-visible facts, policy mapping, and reviewer notes.
- `fraud-queue-5` — Use temporary actions proportionate to risk: hold payout, limit listing, request verification, suppress review, pause account, or escalate.
- `fraud-queue-6` — Protect fraud signals while giving users enough explanation for correction and appeal.
- `fraud-queue-7` — QA decisions by risk type, reviewer, category, segment, appeal overturn, false positive, loss prevented, and time to decision.
- `fraud-queue-8` — Feed queue outcomes into risk models, policy, onboarding, seller performance, dispute resolution, and support content.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Payout hold | Require evidence and SLA | Risk and transaction proof | Unfair cash freeze |
| Fake review ring | Suppress and investigate | Graph/pattern evidence | Review manipulation |
| ATO suspicion | Secure account first | Login/risk proof | Account harm |
| High-value seller | Same evidence standard | Policy record | Revenue bias |
| Appeal overturn spike | Recalibrate queue | QA and appeal data | Systemic false positives |

## Marketplace fraud queue checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `marketplace_fraud_signal_detected`, `marketplace_fraud_queue_prioritized`, `marketplace_fraud_evidence_reviewed`, `marketplace_fraud_action_decided`, `marketplace_fraud_appeal_opened`, `marketplace_fraud_decision_qa_sampled`, `marketplace_fraud_policy_updated`.

Recommended properties: `case_id, entity_type, entity_id, signal_type, risk_score, priority, exposure_amount, evidence_status, action_type, reviewer_id, appeal_status, qa_result, fairness_segment, decision`.
