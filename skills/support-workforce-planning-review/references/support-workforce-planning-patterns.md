# Support Workforce Planning Patterns

## Support Workforce Planning Review state machine

```text
volume_forecasted -> schedule_planned -> shift_live -> queue_monitored -> case_resolved -> qa_reviewed
        |                  |              |              |                 |
        v                  v              v              v                 v
 launch_spike       coverage_gap     outage_surge   escalation_needed   coaching_required
```

## Rule IDs

- `support-workforce-1` — Forecast by channel, severity, language, segment, market, issue type, arrival pattern, handle time, and seasonality.
- `support-workforce-2` — Include shrinkage, training, meetings, QA, vacations, attrition, onboarding ramp, vendor ramp, and schedule adherence.
- `support-workforce-3` — Model backlog aging, SLA breach risk, occupancy, concurrency, first-response, resolution time, reopen rate, and escalation load.
- `support-workforce-4` — Reserve specialist lanes for billing, identity, privacy, abuse, enterprise, technical, incident, and refund-sensitive work.
- `support-workforce-5` — Link launch plans, migrations, price changes, incidents, and policy changes to temporary support staffing and macros.
- `support-workforce-6` — Pair deflection with quality checks so help center, bots, and macros solve issues rather than suppress tickets.
- `support-workforce-7` — Use QA and coaching to protect answer quality, empathy, policy adherence, and escalation correctness.
- `support-workforce-8` — Escalate product fixes when support load proves recurring product confusion or operational defects.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Launch spike | Pre-staff and prepare macros | Launch calendar and expected volume | Backlog and poor first impression |
| Incident surge | Route to incident queue and comms | Status page and affected users | Duplicated answers and SLA breach |
| Language gap | Add coverage or adjust promise | Market/language mix | Unsafe translated support |
| High occupancy | Add capacity or reduce demand safely | Queue metrics and shrinkage | Burnout and QA drop |
| BPO/vendor use | Limit by domain and QA gate | Security/training readiness | Policy inconsistency or data risk |

## Support workforce checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `support_volume_forecasted`, `support_schedule_published`, `support_queue_sla_risk`, `support_escalation_triggered`, `support_macro_updated`, `support_qa_completed`, `support_staffing_gap_detected`.

Recommended properties: `channel, severity, issue_type, language, market, segment, arrival_bucket, handle_time_minutes, backlog_age_hours, sla_status, occupancy, staffing_gap, escalation_type, owner_team, decision`.
