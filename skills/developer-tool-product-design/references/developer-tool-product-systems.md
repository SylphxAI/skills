# Developer Tool Product Systems

Developer tools win when they reduce uncertainty: what it does, how to try it, whether it works, what it costs, how it fails, and whether it can be trusted in production.

## Rule IDs

- `devtool-1` — The homepage and README should state the developer job, who it is for, why it is better, and the first useful command or request.
- `devtool-2` — Time-to-first-success should be measured from landing to a real working output, not account creation.
- `devtool-3` — Quickstarts need copy-pasteable commands, expected output, failure recovery, and cleanup.
- `devtool-4` — SDK/API concepts must map to stable domain nouns; avoid names that leak internal implementation.
- `devtool-5` — Errors should include cause, next action, request ID or trace key, and linkable docs when possible.
- `devtool-6` — Pricing, rate limits, quotas, data retention, auth scopes, and production limits must be visible before serious integration.
- `devtool-7` — Examples should cover the smallest useful path plus one production-shaped path with retries, pagination, idempotency, or webhooks when relevant.
- `devtool-8` — Changelogs and migration guides are part of trust, not afterthought documentation.
- `devtool-9` — Dashboards should answer: is it working, what failed, what changed, what did it cost, and what should I do next?
- `devtool-10` — Community and support should route bug reports, feature requests, security issues, and usage questions differently.

## Activation decision table

| Stage | User question | Product proof | Failure mode |
| --- | --- | --- | --- |
| Discovery | Is this for my job? | Clear positioning and example output | Generic copy or unclear category |
| Quickstart | Can I make it work now? | Working command/API call in minutes | Missing auth, hidden prerequisites |
| Integration | Can I fit it into my system? | SDK/API patterns, webhooks, retries, limits | Toy examples only |
| Production | Can I trust it? | status, changelog, SLAs/limits, observability | surprise breaking changes |
| Expansion | What else can I do? | guides by use case and migration path | feature sprawl without map |

## State machine

```text
docs_landed -> quickstart_started -> first_success
quickstart_started -> blocked_by_auth -> recovery_docs_opened -> first_success
first_success -> production_integration_started -> production_traffic_seen
production_traffic_seen -> error_debugged -> stable_usage
stable_usage -> plan_limit_reached -> upgrade_or_optimize
production_integration_started -> abandoned -> feedback_captured
```

## Event schema

Recommended events:

- `docs_landed`: page_type, source, persona_hint, example_seen.
- `quickstart_started`: language, platform, auth_state, package_manager.
- `first_success`: example_id, time_to_success_ms, output_type.
- `api_error_seen`: endpoint/tool, error_code, docs_link_shown, request_id_present.
- `production_signal_seen`: webhook_configured, api_key_type, traffic_volume, environment.
- `limit_reached`: limit_type, plan, suggested_action, upgrade_clicked.
- `support_request_created`: category, doc_page, trace_id_present, severity.

## Review checklist

- The first useful action is visible without reading the whole docs site.
- Quickstarts include expected output and common failure recovery.
- API/SDK shape has stable nouns, typed examples, and production edge cases.
- Errors are actionable and correlate with logs/support traces.
- Pricing, rate limits, data handling, and breaking-change policy are easy to find.
- Metrics distinguish signup, first success, production adoption, retained usage, and support burden.
