# Support Escalation Engineering Patterns

## Support Escalation Engineering Review state machine

```text
ticket_received -> escalation_classified -> evidence_collected -> engineering_triaged -> fix_or_workaround -> customer_updated -> closed
       |                    |                  |                    |                 |                 |
       v                    v                  v                    v                 v                 v
 self_serve          incident_declared     evidence_gap        owner_missing      blocked          reopened
```

## Rule IDs

- `support-escalation-1` — Define escalation classes, severity, customer impact, affected accounts, business risk, data risk, and SLA/update expectations.
- `support-escalation-2` — Require reproduction steps, expected/actual behavior, environment, account IDs, timestamps, logs/traces, screenshots, and recent changes when relevant.
- `support-escalation-3` — Route incidents, security/privacy, billing/data correction, abuse, and VIP/enterprise issues to specialized paths.
- `support-escalation-4` — Set engineering ownership, triage cadence, queue hygiene, duplicate linking, known-issue status, and workaround publication.
- `support-escalation-5` — Keep customer updates synchronized with engineering status, uncertainty, workaround, ETA confidence, and next-update time.
- `support-escalation-6` — Close only with fix version, workaround, no-repro explanation, product decision, or known limitation plus support-facing communication.
- `support-escalation-7` — Feed repeated escalations into product quality, docs, help center, analytics, onboarding, and roadmap evidence.
- `support-escalation-8` — Measure escalation volume, time to first engineering response, time to workaround, reopen rate, customer impact, and recurring defect clusters.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Missing evidence | Request minimum reproduction data | Template and logs needed | Engineering churn |
| Data loss/security | Escalate specialized path | Impact and data class | Risk hidden in bug queue |
| Known issue | Link and publish workaround | Known issue record | Duplicate noisy tickets |
| No repro | Return with evidence gap or monitoring | Attempts and environment | Premature closure |
| Recurring defect | Route to product quality | Cluster and impact | Support treadmill |

## Escalation checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `support_escalation_opened`, `support_escalation_triaged`, `engineering_owner_assigned`, `workaround_published`, `customer_update_sent`, `support_escalation_closed`, `escalation_reopened`.

Recommended properties: `case_id, account_id, severity, escalation_type, product_area, owner_team, evidence_status, impact_count, data_class, sla_status, workaround_status, fix_version, reopen_reason, decision`.
