# release-train-change-management-review behavior example

skill: release-train-change-management-review

## Positive prompt

> Plan a release train for SaaS billing, API, UI, and mobile changes with risk classes, readiness gates, rollout, rollback, and support comms.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies changes by risk and assigns special gates for billing, auth, migrations, APIs, infra, and store releases.
- Includes calendar, freeze rules, dependency map, staged rollout, release health guardrails, rollback, comms, and post-release review.
- Prevents calendar-driven rollout when guardrails fail.

It should also produce the artifact shape requested by `skills/release-train-change-management-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a feedback intake taxonomy.

The skill should not load for this prompt unless the user adds an explicit release-train-change-management-review context.

## Expected behavior

- Classifies changes by risk and assigns special gates for billing, auth, migrations, APIs, infra, and store releases.
- Includes calendar, freeze rules, dependency map, staged rollout, release health guardrails, rollback, comms, and post-release review.
- Prevents calendar-driven rollout when guardrails fail.
