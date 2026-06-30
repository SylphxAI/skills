# data-import-migration-review behavior example

skill: data-import-migration-review

## Positive prompt

> Design a self-serve CSV import for moving customers from a competitor with mapping, dry run, rollback, and support evidence.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies migration mode and source-of-truth write policy before suggesting implementation.
- Includes schema mapping, dry run, idempotency, dedupe, progress, retry, rollback, and reconciliation.
- Protects sensitive data and creates customer/support-visible acceptance evidence.

It should also produce the artifact shape requested by `skills/data-import-migration-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a pricing-page hero section.

The skill should not load for this prompt unless the user adds an explicit data-import-migration-review context.

## Expected behavior

- Classifies migration mode and source-of-truth write policy before suggesting implementation.
- Includes schema mapping, dry run, idempotency, dedupe, progress, retry, rollback, and reconciliation.
- Protects sensitive data and creates customer/support-visible acceptance evidence.
