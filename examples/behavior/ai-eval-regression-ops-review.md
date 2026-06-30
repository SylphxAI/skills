# ai-eval-regression-ops-review behavior example

skill: ai-eval-regression-ops-review

## Positive prompt

> Design AI eval regression ops for a support copilot with golden cases, safety slices, model-as-judge calibration, release gates, live monitoring, and rollback.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies eval types and defines dataset governance, rubric versioning, judge calibration, and release thresholds.
- Includes critical slices, safety, latency, cost, fallback, live monitoring, failure triage, provider/model-change policy, and rollback.
- Flags aggregate-only releases, uncalibrated judges, privacy leakage, and offline-only proof.

It should also produce the artifact shape requested by `skills/ai-eval-regression-ops-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Plan a customer advisory board agenda.

The skill should not load for this prompt unless the user adds an explicit ai-eval-regression-ops-review context.

## Expected behavior

- Classifies eval types and defines dataset governance, rubric versioning, judge calibration, and release thresholds.
- Includes critical slices, safety, latency, cost, fallback, live monitoring, failure triage, provider/model-change policy, and rollback.
- Flags aggregate-only releases, uncalibrated judges, privacy leakage, and offline-only proof.
