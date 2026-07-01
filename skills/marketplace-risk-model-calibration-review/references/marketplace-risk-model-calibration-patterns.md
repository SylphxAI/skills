# Marketplace Risk Model Calibration Review Patterns

## Marketplace Risk Model Calibration Review state machine

```text
risk_action_mapped -> labels_audited -> thresholds_calibrated -> queue_routed -> appeals_reviewed -> drift_monitored
       |                    |                |                       |              |                  |
       v                    v                v                       v              v                  v
 action_blur          label_noise       threshold_bias          queue_overload  appeal_gap        drift_blindspot
```

## Rule IDs

- `risk-calibration-1` — Start from marketplace actions affected by risk scores: allow, rank, warn, hold payout, limit feature, queue review, suspend, delist, refund, or escalate.
- `risk-calibration-2` — Audit labels and ground truth by source, freshness, reviewer agreement, appeal outcome, fraud loss, buyer harm, seller harm, and policy changes.
- `risk-calibration-3` — Calibrate thresholds by action severity, segment, confidence, queue capacity, false-positive cost, false-negative cost, and reversibility.
- `risk-calibration-4` — Separate ranking-quality signals, fraud signals, abuse signals, policy violations, payout risk, account takeover risk, and dispute risk.
- `risk-calibration-5` — Use human review for high-impact or low-confidence decisions with evidence packets, reviewer QA, escalation, and sampling.
- `risk-calibration-6` — Measure fairness and segment impact without exposing protected attributes or enabling evasion.
- `risk-calibration-7` — Close the loop from appeals, disputes, chargebacks, support tickets, reviewer overrides, and new abuse patterns into labels and policy.
- `risk-calibration-8` — Monitor calibration drift, model/data version, threshold changes, queue backlog, reviewer quality, appeal reversal rate, and marketplace health.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New threshold | Stage and sample | Calibration curve | Queue overload |
| False-positive spike | Lower severity or review | Appeal reversal data | Seller harm |
| False-negative loss | Tighten targeted action | Loss and harm analysis | Abuse growth |
| New abuse pattern | Add policy feedback | Reviewer labels | Model blind spot |
| High-impact action | Require human review | Evidence packet | Unfair suspension |

## Risk model calibration checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `marketplace_risk_action_mapped`, `marketplace_risk_label_audited`, `marketplace_risk_threshold_changed`, `marketplace_risk_review_queued`, `marketplace_risk_action_taken`, `marketplace_risk_appeal_resolved`, `marketplace_risk_drift_detected`, `marketplace_risk_policy_feedback_recorded`.

Recommended properties: `marketplace_id, model_name, model_version, risk_type, action_type, threshold_version, score_bucket, label_source, reviewer_id, appeal_status, reversal_status, segment, queue_backlog, drift_status, policy_version, decision`.
