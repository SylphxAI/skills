# feature-flag-rollout-review behavior example

skill: feature-flag-rollout-review

## Positive prompt

> Design a staged rollout plan for a risky AI feature using flags, guardrails, kill switch, support notes, and cleanup.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies flag type and defines exposure unit, targeting, owner, default state, metrics, and cleanup deadline.
- Includes staged rollout gates, guardrails, kill switch, rollback, support visibility, and event tracking.
- Calls out stale flag debt, entitlement bypass risk, and unsafe targeting.

It should also produce the artifact shape requested by `skills/feature-flag-rollout-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a creator marketplace ranking formula.

The skill should not load for this prompt unless the user adds an explicit feature-flag-rollout-review context.

## Expected behavior

- Classifies flag type and defines exposure unit, targeting, owner, default state, metrics, and cleanup deadline.
- Includes staged rollout gates, guardrails, kill switch, rollback, support visibility, and event tracking.
- Calls out stale flag debt, entitlement bypass risk, and unsafe targeting.
