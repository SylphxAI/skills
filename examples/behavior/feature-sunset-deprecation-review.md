# feature-sunset-deprecation-review behavior example

skill: feature-sunset-deprecation-review

## Positive prompt

> Plan the deprecation of a public API version with usage analysis, notice, migration docs, final warnings, and cleanup.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Measures impacted usage, revenue, contracts, support load, and dependencies before choosing a notice path.
- Includes migration alternatives, staged communication, exception policy, kill date, rollback/extension criteria, and cleanup.
- Warns against indefinite deprecated features and one-size-fits-all changelog notices.

It should also produce the artifact shape requested by `skills/feature-sunset-deprecation-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a customer feedback taxonomy.

The skill should not load for this prompt unless the user adds an explicit feature-sunset-deprecation-review context.

## Expected behavior

- Measures impacted usage, revenue, contracts, support load, and dependencies before choosing a notice path.
- Includes migration alternatives, staged communication, exception policy, kill date, rollback/extension criteria, and cleanup.
- Warns against indefinite deprecated features and one-size-fits-all changelog notices.
