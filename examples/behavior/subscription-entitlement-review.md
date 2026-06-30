# subscription-entitlement-review behavior example

skill: subscription-entitlement-review

## Positive prompt

> Audit a SaaS subscription system with trials, downgrade, failed renewal, refund, and support adjustment paths.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates commerce state, ledger events, and derived entitlement state.
- Includes state machine, event schema, support tooling, and user messaging.

It should also produce the artifact shape requested by `skills/subscription-entitlement-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a landing page hero section.

The skill should not load for this prompt unless the user adds an explicit subscription-entitlement-review context.

## Expected behavior

- Separates commerce state, ledger events, and derived entitlement state.
- Includes state machine, event schema, support tooling, and user messaging.
