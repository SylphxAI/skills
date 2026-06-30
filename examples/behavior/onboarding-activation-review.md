# onboarding-activation-review behavior example

skill: onboarding-activation-review

## Positive prompt

> Review onboarding for a SaaS app that asks for signup, import, team invite, and payment before value.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines activation as first value, not screen completion.
- Maps friction, permission timing, first action, metrics, and experiment backlog.

It should also produce the artifact shape requested by `skills/onboarding-activation-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write support copy for a refund dispute.

The skill should not load for this prompt unless the user adds an explicit onboarding-activation-review context.

## Expected behavior

- Defines activation as first value, not screen completion.
- Maps friction, permission timing, first action, metrics, and experiment backlog.
