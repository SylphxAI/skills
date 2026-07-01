# Board Metrics Operating Review Patterns

## Board Metrics Operating Review state machine

```text
metrics_scoped -> sources_reconciled -> owners_signed_off -> narrative_reviewed -> board_decisions_recorded -> actions_closed
       |                |                    |                   |                    |                         |
       v                v                    v                   v                    v                         v
 metric_sprawl    reconciliation_gap    owner_gap          vanity_narrative     decision_gap              action_drift
```

## Rule IDs

- `board-metrics-1` — Define every board metric with formula, source system, owner, update cadence, segment cut, historical comparability, and known caveats.
- `board-metrics-2` — Separate accounting, billing, CRM, product analytics, support, incident, hiring, and forecast data so reconciliation gaps are visible.
- `board-metrics-3` — Require owner signoff for revenue, retention, margin, pipeline, product usage, customer health, incidents, burn, runway, and forecast metrics.
- `board-metrics-4` — Present cohort and segment views where aggregate metrics hide retention, margin, channel, geography, enterprise, or marketplace quality shifts.
- `board-metrics-5` — Explain variance from plan through price, volume, mix, churn, expansion, cost, timing, data quality, one-time events, and operating decisions.
- `board-metrics-6` — Tie narrative to decisions: resource allocation, pricing, GTM, product bets, risk acceptance, fundraising, hiring, or customer commitments.
- `board-metrics-7` — Track board questions, decisions, action owners, due dates, follow-up evidence, and unresolved assumptions.
- `board-metrics-8` — Audit metric drift after schema changes, billing migrations, CRM process changes, product event changes, or finance close updates.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Metric definition dispute | Freeze dictionary | Formula and owner | Board mistrust |
| Missed forecast | Bridge variance | Plan vs actual driver tree | Narrative spin |
| Fundraising prep | Audit comparability | Historical metric package | Diligence failure |
| Product usage drop | Segment cohort view | Usage/retention analysis | Aggregate blind spot |
| Board action open | Assign follow-up | Action register | Decision drift |

## Board metrics checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `board_metric_defined`, `board_metric_source_reconciled`, `board_metric_owner_signed_off`, `board_variance_explained`, `board_question_logged`, `board_decision_recorded`, `board_action_created`, `board_action_closed`.

Recommended properties: `board_cycle_id, metric_name, metric_owner, source_system, metric_version, reporting_period, segment, variance_type, plan_delta, confidence_status, board_question_id, action_owner, action_due_at, decision`.
