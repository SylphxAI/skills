# checkout-conversion-review behavior example

skill: checkout-conversion-review

## Positive prompt

> Audit this SaaS pricing-to-checkout funnel and find trustworthy conversion gains.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the reference state model, decision tables, and event schema;
- optimize one visible metric while ignoring trust, support, and long-term product health;
- fail to separate blockers, experiments, guardrails, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps checkout as a stateful funnel from offer to entitlement grant.
- Separates conversion lifts from trust, payment reliability, support, and refund risks.
- Defines events and guardrail metrics before proposing experiments.

It should also produce the artifact shape requested by `skills/checkout-conversion-review/SKILL.md`, such as a readiness matrix, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a refund support macro for an already refunded account.

The skill should not load for this prompt unless the user adds an explicit checkout-conversion-review context.

## Expected behavior

- Maps checkout as a stateful funnel from offer to entitlement grant.
- Separates conversion lifts from trust, payment reliability, support, and refund risks.
- Defines events and guardrail metrics before proposing experiments.
