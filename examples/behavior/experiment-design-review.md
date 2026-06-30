# experiment-design-review behavior example

skill: experiment-design-review

## Positive prompt

> Design an A/B experiment for a SaaS onboarding change with activation, retention, support, and guardrail metrics.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts from the decision, hypothesis, metric mechanism, and guardrails before choosing a test type.
- Defines exposure, eligibility, instrumentation, analysis window, decision rule, and rollback path.
- Calls out underpowered tests, unsafe variants, novelty effects, peeking, and false-confidence risks.

It should also produce the artifact shape requested by `skills/experiment-design-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write an app store subtitle for a meditation app.

The skill should not load for this prompt unless the user adds an explicit experiment-design-review context.

## Expected behavior

- Starts from the decision, hypothesis, metric mechanism, and guardrails before choosing a test type.
- Defines exposure, eligibility, instrumentation, analysis window, decision rule, and rollback path.
- Calls out underpowered tests, unsafe variants, novelty effects, peeking, and false-confidence risks.
