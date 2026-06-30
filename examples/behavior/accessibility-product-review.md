# accessibility-product-review behavior example

skill: accessibility-product-review

## Positive prompt

> Review this SaaS checkout and cancellation flow for accessibility blockers.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, accessibility, economics, or long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts from critical user tasks and affected users, not generic compliance slogans.
- Covers keyboard, screen reader semantics, focus, forms, motion, contrast, touch, dynamic content, and recovery.
- Separates P0 blockers, design-system fixes, and validation/regression checks.

It should also produce the artifact shape requested by `skills/accessibility-product-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design marketplace payout reconciliation.

The skill should not load for this prompt unless the user adds an explicit accessibility-product-review context.

## Expected behavior

- Starts from critical user tasks and affected users, not generic compliance slogans.
- Covers keyboard, screen reader semantics, focus, forms, motion, contrast, touch, dynamic content, and recovery.
- Separates P0 blockers, design-system fixes, and validation/regression checks.
