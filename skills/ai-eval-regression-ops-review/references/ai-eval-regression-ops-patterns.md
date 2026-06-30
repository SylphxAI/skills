# AI Eval Regression Ops Patterns

## Eval regression state machine

```text
eval_need_defined -> dataset_curated -> rubric_versioned -> baseline_recorded -> candidate_run -> slice_reviewed -> gate_decided -> monitored_live
       |                  |                 |                  |               |                |              |
       v                  v                 v                  v               v                v              v
 unclear_task       data_policy_block   rubric_ambiguous   baseline_missing  regression_found  gate_blocked   rollback_needed
```

## Rule IDs

- `ai-eval-ops-1` — Classify eval type: golden task, adversarial/safety, rubric judge, human review, offline replay, live canary, cost/latency, or task success.
- `ai-eval-ops-2` — Datasets need source, consent/privacy status, coverage, slices, owner, refresh cadence, and leakage checks.
- `ai-eval-ops-3` — Rubrics need version, examples, non-examples, scoring scale, tie-breaker, and known blind spots.
- `ai-eval-ops-4` — Model-as-judge needs calibration, reference cases, drift monitoring, and human spot-checking.
- `ai-eval-ops-5` — Release gates should include aggregate score, critical slices, safety failures, latency, cost, fallback, and user-experience thresholds.
- `ai-eval-ops-6` — Regression triage needs owner, category, reproduction artifact, candidate diff, and decision reason.
- `ai-eval-ops-7` — Provider/model/prompt/tool changes require baseline comparison and rollback path.
- `ai-eval-ops-8` — Live monitoring should compare task completion, edits, escalations, reports, latency, cost, and support contacts.
- `ai-eval-ops-9` — High-autonomy features need human override, audit trail, and kill switch.
- `ai-eval-ops-10` — Eval improvements should become fixtures, not chat-only anecdotes.

## Decision table

| Regression | Gate action | Evidence | Follow-up |
| --- | --- | --- | --- |
| Aggregate up, safety slice down | Block release | Slice failure examples | Fix prompt/model or lower autonomy |
| Cost doubles, quality flat | Block or repackage | Cost per successful task | Model routing/caching review |
| Judge disagrees with humans | Recalibrate | Disagreement sample | Rubric examples and judge version |
| Tool-call failure increases | Block canary | Trace and replay | Tool contract fix |
| Minor style regression | Ship with note | Human review | Backlog improvement |

## Eval ops checklist

- Task, autonomy, harm, and release gate are explicit.
- Dataset coverage, privacy, owner, and refresh cadence are documented.
- Rubric and judge versions are calibrated.
- Critical slices can block even when aggregate improves.
- Live monitoring covers quality, safety, latency, cost, and fallback.
- Rollback and model/provider-change policy are ready.

## Event schema

Track: `ai_eval_dataset_created`, `ai_eval_run_started`, `ai_eval_run_completed`, `ai_eval_regression_detected`, `ai_eval_gate_decided`, `ai_judge_calibrated`, `ai_model_change_released`, `ai_live_quality_alerted`, `ai_feature_rolled_back`.

Recommended properties: `feature`, `job_type`, `autonomy_level`, `dataset_version`, `rubric_version`, `judge_model`, `candidate_model`, `slice`, `score_delta`, `safety_failure`, `latency_delta`, `cost_delta`, `gate_decision`, `rollback_available`.
