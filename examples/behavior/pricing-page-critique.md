# pricing-page-critique behavior example

skill: pricing-page-critique

## Positive prompt

> Critique this SaaS pricing page for conversion and trust.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Checks value metric, plan differentiation, risk reducers, cancellation, and measurement.
- Rejects dark patterns and hidden material terms.

It should also produce the artifact shape requested by `skills/pricing-page-critique/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a responsive table layout.

The skill should not load for this prompt unless the user adds an explicit pricing-page-critique context.

## Expected behavior

- Checks value metric, plan differentiation, risk reducers, cancellation, and measurement.
- Rejects dark patterns and hidden material terms.
