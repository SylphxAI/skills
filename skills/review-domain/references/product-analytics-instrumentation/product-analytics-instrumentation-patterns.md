# Product Analytics Instrumentation Patterns

## Instrumentation flow

Start from a product decision, define the event and identity semantics,
implement the source, verify representative behavior, publish its metric or
dashboard consumer, and monitor data quality. Route schema conflicts, consent
constraints, verification failures, and drift to their owning layer.

## Operating method

- Start from decision questions, funnel/cohort needs, experiment plans, and product owners before naming events.
- Define event name, trigger, actor, object, timestamp, source, properties, allowed values, identity behavior, and owner.
- Separate client, server, warehouse, billing, support, attribution, and experiment exposure events by reliability needs.
- Handle anonymous-to-known identity, account/team membership, device/session, workspace/project, and cross-platform duplication.
- Authorize collection through consent, data minimization, sensitive-property review, retention, and user deletion requirements.
- QA events with fixtures, debug views, test users, release checks, cardinality limits, and warehouse validation.
- Document metric/dashboard dependencies and deprecate stale or duplicate events with migration plans.
- Monitor event volume, null rates, schema drift, late arrivals, duplicate rates, and dashboard breakage after release.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New funnel | Define event sequence and owners | Journey and decision question | Unusable conversion data |
| Server truth needed | Track server-side source | Operational source and schema | Client drop/adblock loss |
| Identity merge | Define anonymous-known rules | Login/signup behavior | Double-counted users |
| Sensitive property | Remove or authorize collection | Privacy review and purpose | PII leakage |
| Dashboard launch | Validate source contract | QA and owner signoff | Metric mistrust |

## Review result

Return the exact product decision, event contract, implementation owner,
representative verification cases, downstream metric or dashboard consumers,
privacy handling, data-quality signals, migration path, and open owner actions.
