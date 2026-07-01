# Customer Escalation War Room Patterns

## Customer Escalation War Room Review state machine

```text
escalation_opened -> severity_classified -> owner_assigned -> actions_tracked -> customer_updated -> deescalated -> learning_closed
       |                    |                |                 |                  |              |
       v                    v                v                 v                  v              v
 unclear_scope       wrong_severity    owner_gap        action_sprawl      comms_gap      repeat_issue
```

## Rule IDs

- `escalation-war-room-1` — Classify account impact, customer severity, product severity, commercial risk, privacy/security risk, and timeline before assigning the motion.
- `escalation-war-room-2` — Name accountable owner, customer communication owner, engineering/support owner, executive sponsor, and decision authority.
- `escalation-war-room-3` — Maintain a live action log with owner, deadline, dependency, customer impact, status, and evidence.
- `escalation-war-room-4` — Separate incident response, defect remediation, implementation unblock, billing correction, trust response, and commercial negotiation.
- `escalation-war-room-5` — Use customer updates with facts, next checkpoint, owner, impact, workaround, and caveats; avoid overpromising fixes.
- `escalation-war-room-6` — Define de-escalation criteria using customer-visible outcome, not internal activity.
- `escalation-war-room-7` — Capture post-escalation root causes, prevention work, support/docs/product gaps, and renewal/account follow-up.
- `escalation-war-room-8` — Escalate policy, legal, privacy, security, refund, or contract asks through normal authority even inside the war room.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Incident overlap | Link incident command | Incident record and customer impact | Duplicate command |
| Executive demand | Route through decision owner | Decision log | Unsafe promise |
| No workaround | Set transparent cadence | Known impact and ETA | Trust erosion |
| Commercial risk | Add account owner | Renewal/ARR context | Misprioritized recovery |
| De-escalation | Require customer outcome proof | Acceptance criteria | Premature closure |

## Escalation war-room checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `customer_escalation_opened`, `customer_escalation_severity_classified`, `customer_escalation_owner_assigned`, `customer_escalation_action_updated`, `customer_escalation_customer_update_sent`, `customer_escalation_deescalated`, `customer_escalation_learning_closed`.

Recommended properties: `account_id, escalation_id, severity, issue_type, owner_team, customer_contact, executive_sponsor, action_count, next_update_at, workaround_status, deescalation_status, renewal_risk, decision`.
