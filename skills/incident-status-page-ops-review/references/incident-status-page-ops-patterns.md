# Incident Status Page Ops Patterns

## Incident Status Page Ops Review state machine

```text
signal_detected -> impact_assessed -> incident_declared -> update_published -> monitoring -> resolved -> followup_sent
      |                |                  |                 |             |           |
      v                v                  v                 v             v           v
 false_alarm     comms_blocked       security_review   update_overdue  relapse    postmortem_needed
```

## Rule IDs

- `status-page-1` — Define components by customer-understandable product areas, regions, dependencies, and service promises rather than internal team names only.
- `status-page-2` — Set declaration thresholds for outage, degradation, latency, data delay, support channel impact, maintenance, and security-sensitive events.
- `status-page-3` — Publish early acknowledgement with known impact, affected components, workaround, next update time, and support route.
- `status-page-4` — Keep updates consistent across status page, in-app messaging, support macros, account teams, social channels, and incident command.
- `status-page-5` — Use severity and audience rules for public status, private customer updates, enterprise notifications, and legal/security review.
- `status-page-6` — Track update cadence, subscriber notifications, component history, SLA/SLO impact, maintenance windows, and post-incident commitments.
- `status-page-7` — Avoid speculation; separate confirmed facts, current hypothesis, mitigation status, customer action, and next update time.
- `status-page-8` — Review incidents to improve detection, component taxonomy, templates, escalation, and customer trust.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Impact known, cause unknown | Publish investigating update | Affected component and symptom | Silence erodes trust |
| Security-sensitive event | Use approved limited wording | Security/legal approval | Leaks exploit detail |
| Regional partial outage | Show component/region impact | Telemetry and affected accounts | False all-green status |
| Maintenance | Schedule and notify in advance | Window and rollback plan | Surprise downtime |
| Update overdue | Publish progress or no-change note | Cadence rule | Support ticket spike |

## Status-page ops checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `incident_signal_detected`, `status_incident_declared`, `status_update_published`, `subscriber_notification_sent`, `maintenance_scheduled`, `status_incident_resolved`, `incident_followup_published`.

Recommended properties: `incident_id, component, region, severity, customer_segment, status_phase, update_cadence_minutes, subscriber_channel, slo_impact, security_sensitive, approval_status, support_macro_id, decision`.
