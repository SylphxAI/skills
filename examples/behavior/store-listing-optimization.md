# store-listing-optimization behavior example

skill: store-listing-optimization

## Positive prompt

> Optimize an App Store listing for a subscription utility with weak install conversion.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates channel assets and policies while focusing on conversion and trust.
- Includes experiment plan and retained-user guardrails.

It should also produce the artifact shape requested by `skills/store-listing-optimization/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design an incident communication flow.

The skill should not load for this prompt unless the user adds an explicit store-listing-optimization context.

## Expected behavior

- Separates channel assets and policies while focusing on conversion and trust.
- Includes experiment plan and retained-user guardrails.
