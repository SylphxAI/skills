# Integration Sandbox Certification Patterns

## Integration Sandbox Certification Review state machine

```text
sandbox_requested -> scope_reviewed -> tests_executed -> evidence_submitted -> certified -> production_enabled -> recertified
       |                  |                |                   |              |                    |
       v                  v                v                   v              v                    v
 unsafe_data        overbroad_scope   edge_case_failed    evidence_gap    support_gap          drift_detected
```

## Rule IDs

- `sandbox-certification-1` — Define integration type, API surfaces, OAuth scopes, webhook events, test tenant shape, data class, and production promotion gate.
- `sandbox-certification-2` — Separate sandbox access, certification testing, security review, privacy review, marketplace listing review, and production enablement.
- `sandbox-certification-3` — Test happy path, error path, retries, idempotency, pagination, rate limits, auth expiry, webhook verification, version compatibility, and data deletion/export behavior.
- `sandbox-certification-4` — Use synthetic or approved test data with tenant isolation, reset policy, abuse monitoring, and no hidden customer dependencies.
- `sandbox-certification-5` — Require least-privilege OAuth scopes, secret handling, redirect URI checks, and audit events before production credentials.
- `sandbox-certification-6` — Publish support docs, diagnostics, known limits, and escalation paths for certified integrations.
- `sandbox-certification-7` — Tie certification badges to evidence, expiry, recertification, API changes, policy changes, and incident history.
- `sandbox-certification-8` — Feed failed certification cases into SDK docs, API ergonomics, sandbox tooling, and partner enablement.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| OAuth scope request | Reduce to least privilege | Scope/use-case map | Overbroad data access |
| Webhook handling | Require retry/idempotency tests | Event logs | Duplicate or lost events |
| Sandbox data | Use synthetic tenant | Data policy | Customer data leak |
| API version drift | Recertify | Change log and test results | Broken production integration |
| Badge request | Require evidence package | Test suite output | Trust badge inflation |

## Sandbox certification checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `sandbox_certification_requested`, `sandbox_oauth_scope_reviewed`, `sandbox_test_case_executed`, `sandbox_certification_evidence_submitted`, `sandbox_certified`, `sandbox_production_enabled`, `sandbox_recertification_required`.

Recommended properties: `integration_id, partner_id, api_surface, oauth_scope, webhook_event, test_case, result_status, data_class, certification_status, production_gate, badge_status, recertification_due, decision`.
