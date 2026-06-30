# launch-readiness-review behavior example

skill: launch-readiness-review

## Positive prompt

> Run a launch readiness review for a paid mobile app with subscriptions, App Store review, support, and promotion.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Gives go/conditional/no-go based on blockers and blast radius.
- Checks product, monetization, distribution, support, analytics, trust, operations, promotion, and rollback.

It should also produce the artifact shape requested by `skills/launch-readiness-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create an SEO content brief.

The skill should not load for this prompt unless the user adds an explicit launch-readiness-review context.

## Expected behavior

- Gives go/conditional/no-go based on blockers and blast radius.
- Checks product, monetization, distribution, support, analytics, trust, operations, promotion, and rollback.
