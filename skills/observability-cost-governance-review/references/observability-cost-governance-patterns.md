# Observability Cost Governance Patterns

## Observability Cost Governance state machine

```text
signal_created -> classified -> owner_assigned -> budget_set -> policy_applied -> cost_reviewed -> optimized
       |              |               |              |                |              |
       v              v               v              v                v              v
 unowned_signal high_cardinality owner_missing budget_exceeded redaction_block cost_regressed
```

## Rule IDs

- `observability-cost-1` — Classify telemetry by decision value: SLO, incident debug, audit/security, billing, product analytics, performance, or low-value noise.
- `observability-cost-2` — Every expensive signal needs owner, retention, cardinality budget, and incident/support use case.
- `observability-cost-3` — Use aggregation, sampling, tail sampling, dynamic logging, and retention tiers intentionally.
- `observability-cost-4` — Metrics labels need bounded cardinality and documented dimensions.
- `observability-cost-5` — Logs and replays must redact secrets and protected data before storage.
- `observability-cost-6` — Cost allocation should map telemetry spend to services, teams, and product risk.
- `observability-cost-7` — Do not remove audit/security/billing evidence without compliance and support review.
- `observability-cost-8` — Review dashboards and alerts for unused, duplicate, stale, and noisy signals.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| High-cardinality metric | Limit labels | Cardinality owner and query use | Exploding cost |
| Debug logs expensive | Retention/sampling tier | Incident usefulness | Losing root-cause data |
| Session replay | Privacy and sampling review | Consent/redaction proof | Sensitive capture |
| Trace cost high | Tail sampling | SLO and incident coverage | Lost correlation |
| Unused dashboard | Archive | Access/usage evidence | Stale decisions |

## Observability governance checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `observability_signal_classified`, `observability_cost_alerted`, `telemetry_policy_changed`, `high_cardinality_detected`, `debug_logging_enabled`, `debug_logging_expired`, `observability_signal_deleted`, `observability_review_completed`.

Recommended properties: `surface`, `owner_team`, `segment`, `risk_tier`, `status`, `evidence_type`, `review_due_days`, `exception_type`, `decision`, `customer_impact`, `support_case_id`, `outcome`.
