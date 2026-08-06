# Product Analytics Instrumentation Patterns

## Product Analytics Instrumentation Review state machine

```text
tracking_need_defined -> event_contract_created -> implemented -> qa_verified -> dashboard_published -> monitored
        |                    |                |              |                    |
        v                    v                v              v                    v
 no_decision          schema_conflict    consent_blocked  qa_failed        drift_detected
```

## Rule IDs

- `analytics-instrumentation-1` — Start from decision questions, funnel/cohort needs, experiment plans, and product owners before naming events.
- `analytics-instrumentation-2` — Define event name, trigger, actor, object, timestamp, source, properties, allowed values, identity behavior, and owner.
- `analytics-instrumentation-3` — Separate client, server, warehouse, billing, support, attribution, and experiment exposure events by reliability needs.
- `analytics-instrumentation-4` — Handle anonymous-to-known identity, account/team membership, device/session, workspace/project, and cross-platform duplication.
- `analytics-instrumentation-5` — Gate collection on consent, data minimization, sensitive-property review, retention, and user deletion requirements.
- `analytics-instrumentation-6` — QA events with fixtures, debug views, test users, release checks, cardinality limits, and warehouse validation.
- `analytics-instrumentation-7` — Document metric/dashboard dependencies and deprecate stale or duplicate events with migration plans.
- `analytics-instrumentation-8` — Monitor event volume, null rates, schema drift, late arrivals, duplicate rates, and dashboard breakage after release.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New funnel | Define event sequence and owners | Journey and decision question | Unusable conversion data |
| Server truth needed | Track server-side source | Operational source and schema | Client drop/adblock loss |
| Identity merge | Define anonymous-known rules | Login/signup behavior | Double-counted users |
| Sensitive property | Remove or gate collection | Privacy review and purpose | PII leakage |
| Dashboard launch | Validate source contract | QA and owner signoff | Metric mistrust |

## Instrumentation checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `analytics_event_contract_created`, `analytics_event_implemented`, `analytics_event_qa_failed`, `analytics_schema_drift_detected`, `analytics_dashboard_published`, `analytics_event_deprecated`, `analytics_metric_owner_assigned`.

Recommended properties: `event_name, platform, source, owner_team, actor_type, object_type, identity_state, consent_state, property_count, qa_status, null_rate, duplicate_rate, dashboard_id, decision`.
