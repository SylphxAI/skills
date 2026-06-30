# analytics-event-taxonomy behavior example

skill: analytics-event-taxonomy

## Positive prompt

> Design an analytics taxonomy for a SaaS onboarding, checkout, subscription, refund, and support funnel.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts from decision questions and defines event names, properties, owners, identity, funnels, and QA.
- Includes failure/guardrail metrics and privacy/cardinality constraints.

It should also produce the artifact shape requested by `skills/analytics-event-taxonomy/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a status page incident update.

The skill should not load for this prompt unless the user adds an explicit analytics-event-taxonomy context.

## Expected behavior

- Starts from decision questions and defines event names, properties, owners, identity, funnels, and QA.
- Includes failure/guardrail metrics and privacy/cardinality constraints.
