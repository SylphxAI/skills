# Model Router Cost Quality Patterns

## Model Router Cost Quality Review state machine

```text
request_received -> task_classified -> policy_checked -> route_selected -> response_evaluated -> delivered
       |                  |                 |                 |                    |
       v                  v                 v                 v                    v
 insufficient_context  privacy_blocked  budget_limited   provider_failed     human_review
```

## Rule IDs

- `model-router-1` — Define task taxonomy, quality bar, failure severity, latency target, cost ceiling, privacy boundary, and user tier before selecting models.
- `model-router-2` — Separate cheap default routes, premium routes, specialist routes, cascade retries, and human/escalation paths.
- `model-router-3` — Use evals, golden tasks, sampled production reviews, and guardrail metrics to prove a route is acceptable.
- `model-router-4` — Measure total cost including retries, tool calls, context expansion, embeddings, caching, evals, and support fallout.
- `model-router-5` — Preserve safety and privacy policy across fallback providers and smaller models.
- `model-router-6` — Expose route decisions, model/provider, reason, latency, cost, quality score, and fallback cause in telemetry.
- `model-router-7` — Use budget throttles, tier caps, and graceful degradation that do not surprise users or corrupt high-risk tasks.
- `model-router-8` — Run route changes as experiments with rollback criteria and regression checks for critical workflows.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Low-risk draft | Use cheaper route with sampling | Quality eval and edit distance | Wasted premium spend |
| High-risk decision | Use stronger model and review gate | Failure severity and policy | Cheap route causes wrong action |
| Provider outage | Fallback with capability parity check | Provider health and task needs | Silent quality/safety downgrade |
| Budget pressure | Throttle low-value work first | Cost by task/user/outcome | Breaking premium promises |
| Long context | Summarize, retrieve, or choose long-context route | Context need and source quality | Lost evidence or runaway cost |

## Router readiness checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `model_route_requested`, `model_route_selected`, `model_route_fallback`, `model_route_budget_limited`, `model_response_evaluated`, `model_route_rolled_back`, `human_review_required`.

Recommended properties: `task_class, user_tier, provider, model, route_reason, privacy_tier, latency_ms, token_cost, retry_count, cache_hit, eval_score, fallback_reason, failure_severity, decision`.
