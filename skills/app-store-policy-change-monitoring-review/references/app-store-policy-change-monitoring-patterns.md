# App Store Policy Change Monitoring Patterns

## App Store Policy Change Monitoring Review state machine

```text
policy_detected -> impact_triaged -> owner_routed -> remediation_started -> evidence_ready -> release_submitted -> monitoring_closed
       |                |                |                    |               |
       v                v                v                    v               v
 source_missed    impact_unknown   owner_gap           evidence_gap     rejected_again
```

## Rule IDs

- `store-policy-monitoring-1` — Track policy sources, dates, enforcement notes, store-specific differences, affected products, and deadlines in one source of truth.
- `store-policy-monitoring-2` — Separate privacy, payments, subscriptions, ads, UGC/content, age ratings, metadata, technical requirements, and review process changes.
- `store-policy-monitoring-3` — Route each impact to product, engineering, legal, privacy, monetization, design, support, marketing, or release owners.
- `store-policy-monitoring-4` — Map policy text to actual product behavior, metadata, screenshots, privacy labels, IAP setup, SDKs, and review notes.
- `store-policy-monitoring-5` — Plan remediation against release trains, app review lead time, phased rollout, experiments, and marketing commitments.
- `store-policy-monitoring-6` — Create evidence packages before submission with screenshots, videos, settings, test accounts, and reviewer instructions where allowed.
- `store-policy-monitoring-7` — Monitor enforcement trends and competitor rejections without copying unsupported claims.
- `store-policy-monitoring-8` — Review missed policy changes to improve source monitoring, ownership, and pre-submit QA.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Subscription policy | Audit purchase flow | IAP metadata and screenshots | Revenue rejection |
| Privacy label update | Validate data map | SDK and data evidence | Misleading disclosure |
| UGC policy | Add moderation controls | Policy and product behavior | Takedown risk |
| Effective deadline | Prioritize remediation | Date and release calendar | Launch block |
| Store-specific rule | Fork requirements | Store comparison | Wrong cross-store assumption |

## Store policy monitoring checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `store_policy_change_detected`, `store_policy_impact_triaged`, `store_policy_owner_routed`, `store_policy_remediation_started`, `store_policy_evidence_ready`, `store_policy_submission_made`, `store_policy_monitoring_closed`.

Recommended properties: `store, policy_id, policy_area, effective_date, product_id, feature_area, impact_tier, owner_team, remediation_status, evidence_status, submission_status, rejection_status, deadline_risk, decision`.
