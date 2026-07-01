# API Versioning Deprecation Patterns

## API Versioning Deprecation Review state machine

```text
change_proposed -> compatibility_classified -> migration_path_written -> customers_notified -> sunset_window -> version_retired
       |                         |                      |                   |              |
       v                         v                      v                   v              v
 additive_ok              breaking_review         docs_gap            exception_needed retirement_blocked
```

## Rule IDs

- `api-versioning-1` — Classify API changes by wire contract, behavior, auth/permission, rate limit, pagination, errors, webhooks, SDK surface, docs, and examples.
- `api-versioning-2` — Maintain compatibility tests, fixtures, OpenAPI/schema changes, SDK updates, changelog entries, and migration guides from one change record.
- `api-versioning-3` — Use usage analytics to identify affected customers, endpoints, fields, SDK versions, integrations, and revenue/support risk.
- `api-versioning-4` — Set deprecation, sunset, and retirement timelines by severity, customer impact, contractual commitments, and security urgency.
- `api-versioning-5` — Notify customers with who is affected, what changes, migration steps, deadlines, support path, and test environment.
- `api-versioning-6` — Track exceptions with owner, scope, expiry, migration status, and risk.
- `api-versioning-7` — Prepare support macros, status page notes if needed, dashboard monitoring, rollback, and SDK release coordination.
- `api-versioning-8` — Review post-sunset errors, support tickets, retained exceptions, and migration completion before final retirement.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Additive field | Ship with docs and fixtures | Schema and examples | Hidden semantic break |
| Breaking change | Version and migration plan | Compatibility tests | Integrator outage |
| Endpoint sunset | Notify affected users | Usage analytics | Surprise customer break |
| Security emergency | Compress timeline with support | Risk and mitigation | Unsafe legacy path |
| Exception request | Grant with expiry | Customer migration plan | Permanent legacy burden |

## API versioning checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `api_change_proposed`, `api_compatibility_classified`, `api_migration_guide_published`, `api_deprecation_notice_sent`, `api_exception_granted`, `api_version_sunset_started`, `api_version_retired`.

Recommended properties: `api_surface, endpoint, version, change_type, compatibility_class, affected_customer_count, sdk_language, docs_status, migration_deadline, exception_status, support_status, error_rate, decision`.
