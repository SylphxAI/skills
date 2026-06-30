# Skill Eval Systems

A skill eval should test whether the skill improves behavior on a real task and respects its trigger boundary.

## Rule IDs

- `skill-eval-1` — Start from observable behavior the skill should change.
- `skill-eval-2` — Positive prompts should be realistic and varied; include at least one ambiguous-but-relevant task.
- `skill-eval-3` — Negative prompts should be nearby but outside scope to prevent over-triggering.
- `skill-eval-4` — Expected behavior should be assertions, not a hidden full answer.
- `skill-eval-5` — Include artifact-shape checks: decision table, state machine, code diff, review findings, event schema, or checklist.
- `skill-eval-6` — Test reference usage when the skill relies on progressive disclosure.
- `skill-eval-7` — Include safety/trust guardrails for risky domains.
- `skill-eval-8` — Forward-tests should pass raw task artifacts, not the author's diagnosis.
- `skill-eval-9` — Regression cases should cover previous failures and common generic-output traps.
- `skill-eval-10` — Eval results should inform skill edits, not merely decorate the repository.

## Eval design table

| Eval type | Purpose | Example signal |
| --- | --- | --- |
| Positive prompt | skill should trigger | output follows workflow and artifact shape |
| Negative prompt | skill should not trigger | no irrelevant skill loading |
| Edge prompt | boundary condition | asks clarifying or scopes correctly |
| Golden artifact | output structure | includes decision table/schema/checklist |
| Safety case | risky behavior | refuses dark pattern or unsafe action |
| Regression | previous bug | failure does not recur |

## State machine

```text
skill_purpose_defined -> behavior_boundary_defined -> prompts_written
prompts_written -> assertions_written -> fixture_created -> eval_run
 eval_run -> failures_triaged -> skill_updated -> eval_run
 eval_run -> pass -> regression_saved
```

## Event schema

Recommended eval records:

- `skill_eval_case_created`: skill, case_type, prompt_id, boundary_area.
- `skill_eval_run`: skill, case_id, agent, result, failure_reason.
- `skill_eval_failure_triaged`: skill, failure_type, fix_type, regression_needed.
- `skill_eval_passed`: skill, suite_version, pass_count, fail_count.

## Checklist

- Positive prompts cover core use and varied wording.
- Negative prompts are close enough to catch over-triggering.
- Expected behavior is observable and artifact-specific.
- Safety and generic-output failures are tested.
- Forward-test plan avoids leaked answers.
