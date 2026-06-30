# experimentation-platform-governance-review behavior example

skill: experimentation-platform-governance-review

## Positive prompt

> Design experimentation platform governance for pricing, onboarding, ranking, lifecycle, and AI experiments with holdouts, guardrails, conflicts, ethics, and decisions.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies experiment risk and exposure unit before launch.
- Includes randomization, holdouts, metrics, guardrails, sample plan, conflict policy, elevated review, analysis, decision records, and cleanup.
- Flags pricing/ranking/safety tests without review, overlapping contamination, aggregate-only winners, and stale holdouts.

It should also produce the artifact shape requested by `skills/experimentation-platform-governance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Prepare a compliance evidence room.

The skill should not load for this prompt unless the user adds an explicit experimentation-platform-governance-review context.

## Expected behavior

- Classifies experiment risk and exposure unit before launch.
- Includes randomization, holdouts, metrics, guardrails, sample plan, conflict policy, elevated review, analysis, decision records, and cleanup.
- Flags pricing/ranking/safety tests without review, overlapping contamination, aggregate-only winners, and stale holdouts.
