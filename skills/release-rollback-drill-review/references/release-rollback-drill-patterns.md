# Release Rollback Drill Patterns

## Release Rollback Drill Review state machine

```text
scenario_selected -> environment_prepared -> rollback_executed -> health_verified -> communication_tested -> lesson_closed
       |                   |                    |                |                    |
       v                   v                    v                v                    v
 bad_scenario        unsafe_environment   rollback_failed  weak_signal        stale_runbook
```

## Rule IDs

- `rollback-drill-1` — Define rollback surface, failure trigger, owner roles, environment, customer impact, and evidence required before the drill.
- `rollback-drill-2` — Separate code rollback, config rollback, feature flag kill switch, migration rollback, store/client rollback, dependency rollback, and communication drill.
- `rollback-drill-3` — Identify irreversible steps, data compatibility constraints, schema/version skew, queues, caches, mobile approvals, desktop auto-update, and third-party state.
- `rollback-drill-4` — Use safe rehearsal environments by default and document any production drill constraints.
- `rollback-drill-5` — Measure time to decision, time to rollback, time to detection, time to customer communication, and time to stable recovery.
- `rollback-drill-6` — Verify recovery from customer-visible behavior, health checks, logs, metrics, support signals, and data consistency.
- `rollback-drill-7` — Update runbooks, release gates, alerts, dashboards, feature flags, and ownership after each drill.
- `rollback-drill-8` — Escalate rollback paths that cannot meet customer impact, contract, or safety requirements.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| DB migration | Require forward/backward compatibility | Migration test proof | Data loss |
| Mobile release | Plan phased rollout pause | Store rollout controls | Cannot recall build |
| Feature flag | Test kill switch | Flag audit | Bad feature stays live |
| Dependency issue | Pin or failover | Version proof | External outage |
| Comms drill | Test status/support path | Message templates | Silent incident |

## Rollback drill checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `rollback_drill_scenario_selected`, `rollback_drill_started`, `rollback_action_executed`, `rollback_health_verified`, `rollback_communication_tested`, `rollback_lesson_recorded`, `rollback_gate_updated`.

Recommended properties: `release_id, surface, drill_type, environment, trigger_metric, owner_team, rollback_action, duration_seconds, health_status, data_consistency_status, customer_impact, lesson_status, decision`.
