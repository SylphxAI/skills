# SDK Onboarding Integration Patterns

## Integration state machine

```text
docs_discovered -> sdk_installed -> credentials_created -> quickstart_run -> first_success -> production_configured -> monitored -> upgraded
      |                |                  |                  |              |                     |             |
      v                v                  v                  v              v                     v             v
 wrong_docs       install_failed      auth_blocked       example_failed  no_next_step       misconfigured   migration_failed
```

## Rule IDs

- `sdk-onboarding-1` — Define first success: API call, webhook received, event sent, file uploaded, payment created, or sandbox transaction completed.
- `sdk-onboarding-2` — Quickstarts must include prerequisites, install, credentials, runnable code, expected output, and troubleshooting.
- `sdk-onboarding-3` — Sandbox and mock data should avoid production secrets, real charges, or customer data.
- `sdk-onboarding-4` — Error responses need code, message, request ID, retryability, docs link, and likely fix.
- `sdk-onboarding-5` — SDKs need version policy, changelog, migration guide, compatibility tests, and deprecation path.
- `sdk-onboarding-6` — Samples should cover the top jobs, not just hello-world calls.
- `sdk-onboarding-7` — Telemetry should track docs path, install success, auth creation, first success, retries, and support handoff.
- `sdk-onboarding-8` — Webhooks need local testing, signature verification, replay, ordering, and idempotency guidance.
- `sdk-onboarding-9` — Production readiness requires rate limits, quotas, security, observability, and rollback notes.
- `sdk-onboarding-10` — Developer support needs reproducible diagnostics without exposing secrets.

## Decision table

| Friction | Likely fix | Proof metric | Support artifact |
| --- | --- | --- | --- |
| Install fails | Package manager matrix and environment check | Install success rate | Troubleshooting snippet |
| Auth confusion | Key labels, scopes, sandbox/prod separation | Credential creation to first call | Key setup guide |
| Webhook unreliable | Local tunnel, replay, signature docs | Verified webhook event | Webhook debug checklist |
| Errors opaque | Structured errors and request IDs | Self-serve resolution rate | Error catalog |
| Version upgrade breaks | Migration guide and compat tests | Upgrade completion | Deprecation notice |

## Integration checklist

- First success is explicit and instrumented.
- Quickstart is runnable from a clean environment.
- Sandbox avoids real customer data and money.
- Errors are actionable and machine-readable.
- Webhooks and async flows include idempotency and replay.
- Versioning, migration, and support diagnostics are ready.

## Event schema

Track: `developer_docs_viewed`, `sdk_installed`, `api_key_created`, `quickstart_started`, `quickstart_succeeded`, `quickstart_failed`, `webhook_verified`, `integration_error_seen`, `sdk_version_upgraded`, `developer_support_contacted`.

Recommended properties: `language`, `sdk_version`, `docs_page`, `integration_job`, `environment`, `auth_mode`, `error_code`, `request_id_present`, `time_to_first_success_seconds`, `sandbox_used`, `webhook_event`, `support_case_id`.
