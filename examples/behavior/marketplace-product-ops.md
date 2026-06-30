# marketplace-product-ops behavior example

skill: marketplace-product-ops

## Positive prompt

> Design the operating model for our AI skill marketplace repository and external submissions.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, and long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Models marketplace supply, demand, review, ranking, transaction, dispute, payout, and removal states.
- Balances growth with quality, trust, creator incentives, and support operations.
- Defines policies, queue states, metrics, and appeal paths.

It should also produce the artifact shape requested by `skills/marketplace-product-ops/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a macOS installer notarization plan.

The skill should not load for this prompt unless the user adds an explicit marketplace-product-ops context.

## Expected behavior

- Models marketplace supply, demand, review, ranking, transaction, dispute, payout, and removal states.
- Balances growth with quality, trust, creator incentives, and support operations.
- Defines policies, queue states, metrics, and appeal paths.
