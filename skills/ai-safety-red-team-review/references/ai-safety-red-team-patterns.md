# AI Safety Red Team Patterns

## AI Safety Red Team Review state machine

```text
scope_defined -> scenario_designed -> test_executed -> finding_triaged -> mitigation_added -> regression_passed -> release_approved
      |                |                |                |                  |                   |
      v                v                v                v                  v                   v
 policy_gap       unsafe_fixture    severe_finding   owner_missing     mitigation_failed    release_blocked
```

## Rule IDs

- `ai-red-team-1` — Define assets at risk: customer data, credentials, payments, admin actions, code execution, private docs, user trust, brand safety, and regulated decisions.
- `ai-red-team-2` — Test the full system: prompt, retrieval, tools, memory, file uploads, model routing, fallback, permissions, UI affordances, and human handoff.
- `ai-red-team-3` — Use severity based on exploitability, impact, autonomy, data sensitivity, scale, detectability, and recovery difficulty.
- `ai-red-team-4` — Pair each finding with mitigation owner, release gate, telemetry, regression fixture, and incident-response path.
- `ai-red-team-5` — Verify that safety policy, privacy boundaries, and tool permissions survive fallback models and degraded modes.
- `ai-red-team-6` — Require user confirmation, scoped permissions, dry-run previews, undo/recovery, and audit logs for consequential actions.
- `ai-red-team-7` — Track false refusal, over-blocking, accessibility, localization, and legitimate-user impact while reducing abuse risk.
- `ai-red-team-8` — Convert repeated red-team findings into eval suites, product constraints, tool contracts, and monitoring rules.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Tool-using agent | Test action misuse and confirmation | Tool permissions and audit logs | Unauthorized action |
| RAG over private data | Test injection and exfiltration | Retrieval scope and data class | Data leakage |
| Fallback model | Re-run safety evals | Route policy and eval results | Safety regression |
| Severe finding | Block release until mitigated | Severity and exploit path | Known harm ships |
| Over-blocking | Balance safety and utility | False refusal samples | Legitimate workflow failure |

## AI red-team checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `ai_red_team_scope_defined`, `ai_red_team_test_executed`, `ai_safety_finding_logged`, `ai_safety_mitigation_added`, `ai_safety_regression_passed`, `ai_safety_release_blocked`, `ai_safety_incident_triggered`.

Recommended properties: `feature, autonomy_level, data_class, tool_scope, model_route, attack_class, severity, exploitability, mitigation_status, regression_id, release_gate, owner_team, customer_impact, decision`.
