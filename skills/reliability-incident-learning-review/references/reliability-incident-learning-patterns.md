# Reliability Incident Learning Patterns

## Reliability Incident Learning state machine

```text
incident_detected -> triaged -> mitigated -> customer_updated -> reviewed -> actions_tracked -> recurrence_checked
       |             |           |                  |             |                 |
       v             v           v                  v             v                 v
 missed_signal   severity_wrong partial_fix       comms_gap    shallow_review   action_overdue
```

## Rule IDs

- `incident-learning-1` — Classify incident by customer-visible journey, severity, duration, data correctness, and trust impact.
- `incident-learning-2` — Build timeline from detection, decision, mitigation, communication, and recovery events.
- `incident-learning-3` — Separate trigger, contributing factors, latent conditions, detection gaps, response gaps, and follow-up risks.
- `incident-learning-4` — Action items need owner, due date, evidence of completion, and recurrence hypothesis.
- `incident-learning-5` — Customer communication review should compare promised updates to actual clarity and timing.
- `incident-learning-6` — Tie reliability learning to SLO/error budget, release gates, dashboards, runbooks, and support macros.
- `incident-learning-7` — Review repeat incidents for system-level investment, not isolated fixes.
- `incident-learning-8` — Use blameless language while preserving accountability for action follow-through.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Monitoring missed issue | Improve detection | Signal gap and new alert proof | Silent recurrence |
| Bad deploy caused outage | Strengthen release gate | Rollback trace and test gap | Calendar-driven ship |
| Customer comms late | Update comms playbook | Timestamped status review | Trust erosion |
| Action overdue | Escalate owner | Due date and risk | Postmortem theater |
| Repeat incident | Invest systemically | Pattern evidence | Local patch only |

## Incident learning checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `incident_detected`, `incident_mitigated`, `incident_customer_updated`, `incident_review_completed`, `incident_action_created`, `incident_action_verified`, `incident_recurrence_detected`.

Recommended properties: `surface`, `owner_team`, `segment`, `risk_tier`, `status`, `evidence_type`, `review_due_days`, `exception_type`, `decision`, `customer_impact`, `support_case_id`, `outcome`.
