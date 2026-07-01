# Developer Sandbox Abuse Prevention Review Patterns

## Developer Sandbox Abuse Prevention Review state machine

```text
signup_started -> identity_scored -> sandbox_limited -> capability_requested -> risk_reviewed -> production_graduated
       |                |                 |                    |                     |                |
       v                v                 v                    v                     v                v
 bot_signup      weak_identity       quota_abuse        capability_misuse       false_positive  production_leak
```

## Rule IDs

- `sandbox-abuse-1` — Model abuse incentives by capability: API calls, email/SMS, webhooks, uploads, compute, storage, payouts, public listings, OAuth scopes, and data export.
- `sandbox-abuse-2` — Keep sandbox isolated from production credentials, customer data, payouts, deliverability reputation, search ranking, and external notifications unless explicitly gated.
- `sandbox-abuse-3` — Use synthetic and resettable test data by default, with clear labels so developers do not mistake fixtures for live customer truth.
- `sandbox-abuse-4` — Apply graduated trust: signup baseline, verified identity, domain/app verification, payment signal, usage history, manual review, and certification.
- `sandbox-abuse-5` — Define quotas by risk and developer value: burst limits, daily caps, concurrent jobs, webhook endpoints, token lifetime, and expensive operations.
- `sandbox-abuse-6` — Detect abuse through velocity, disposable identity, repeated failures, content signals, IP/device patterns, token churn, webhook bounce, and cross-account linkage.
- `sandbox-abuse-7` — Design reviewer queues with evidence packets, reversible actions, cooldowns, escalation paths, and developer-safe messaging.
- `sandbox-abuse-8` — Measure activation, abuse loss, false positives, appeal outcomes, support tickets, and graduation quality together.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Open trial signup | Start with low-risk limits | Quota and identity score | Bot farm |
| Email/SMS testing | Gate deliverability | Verified domain/app | Spam reputation |
| High-volume API | Require trust upgrade | Usage history and review | Compute abuse |
| Production promotion | Certify controls | Sandbox evidence pack | Customer exposure |
| Risk false positive | Offer appeal path | Reviewer evidence | Developer churn |

## Sandbox abuse checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `sandbox_signup_started`, `sandbox_identity_scored`, `sandbox_quota_applied`, `sandbox_capability_requested`, `sandbox_abuse_signal_detected`, `sandbox_review_decided`, `sandbox_appeal_resolved`, `sandbox_production_graduated`.

Recommended properties: `developer_id, app_id, sandbox_id, capability, quota_tier, trust_tier, risk_score_bucket, signal_type, action_type, reviewer_id, appeal_status, false_positive_status, graduation_status, decision`.
