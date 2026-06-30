# product-lifecycle-architect behavior example

skill: product-lifecycle-architect

## Positive prompt

> Plan the full product operating system for a mobile subscription app, from idea to support.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies product type and business model before planning.
- Covers planning, research, design, monetization, distribution, operations, growth, and support.
- Identifies state machines, edge cases, metrics, and trust risks.

It should also produce the artifact shape requested by `skills/product-lifecycle-architect/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Fix this CSS flexbox bug.

The skill should not load for this prompt unless the user adds an explicit product-lifecycle-architect context.

## Expected behavior

- Classifies product type and business model before planning.
- Covers planning, research, design, monetization, distribution, operations, growth, and support.
- Identifies state machines, edge cases, metrics, and trust risks.
