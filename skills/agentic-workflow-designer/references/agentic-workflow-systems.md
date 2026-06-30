# Agentic Workflow Systems

Agentic workflows need explicit state, tool boundaries, evidence, and recovery. Otherwise agents either ask too much or act too dangerously.

## Rule IDs

- `agent-workflow-1` — Define the workflow objective, non-goals, output artifact, and acceptance evidence before steps.
- `agent-workflow-2` — Classify actions by autonomy: read-only, reversible local edit, external write, destructive, financial/legal, production-impacting.
- `agent-workflow-3` — Split deterministic automation from judgment; put deterministic checks into scripts where practical.
- `agent-workflow-4` — Declare tool contracts: inputs, outputs, permissions, rate limits, secrets, and failure modes.
- `agent-workflow-5` — Use durable handoff artifacts: plan, state file, issue comment, PR body, eval result, or generated manifest.
- `agent-workflow-6` — Keep context bounded with references, manifests, and retrieval rules instead of loading everything.
- `agent-workflow-7` — Add review gates for public contracts, payments, privacy, production, security, and user-facing policy.
- `agent-workflow-8` — Add observability: run ID, step status, evidence links, errors, retries, and final proof.
- `agent-workflow-9` — Define recovery for tool failure, stale data, conflicting changes, failed validation, and missing permissions.
- `agent-workflow-10` — Evaluate the workflow on realistic tasks before trusting it.

## Autonomy decision table

| Action | Default autonomy | Required gate |
| --- | --- | --- |
| Read public docs | autonomous | none |
| Local reversible edit | autonomous | validation |
| GitHub issue comment | autonomous when scoped | evidence and relevance |
| Merge PR | autonomous only when repo policy allows | green checks / policy |
| Production deploy | gated | documented deploy path |
| Payment/legal action | gated | explicit human approval |
| Secret rotation | gated | authorized credential process |

## State machine

```text
workflow_requested -> scope_classified -> plan_created -> work_started
work_started -> tool_step -> evidence_captured -> next_step
tool_step -> failure -> recovery_or_gate
work_started -> review_gate -> approved_or_rework
all_checks_passed -> final_artifact_published -> readback_verified
```

## Event schema

Recommended run record:

- `workflow_started`: workflow_id, objective, autonomy_level, risk_class.
- `workflow_step_completed`: workflow_id, step_id, artifact, evidence_url, status.
- `workflow_gate_requested`: workflow_id, gate_type, reason, artifact.
- `workflow_validation_result`: workflow_id, check_name, result, log_url.
- `workflow_completed`: workflow_id, final_artifact, proof, residual_risk.

## Checklist

- Objective, non-goals, output, acceptance evidence, and autonomy level are explicit.
- Tool contracts and permission boundaries are documented.
- Human approval gates match risk.
- Failures have recovery paths and evidence.
- Evals prove the workflow works on realistic examples.
