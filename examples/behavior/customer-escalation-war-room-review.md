# customer-escalation-war-room-review behavior example

skill: customer-escalation-war-room-review

## Positive prompt

> Run a customer escalation war room for an enterprise SaaS account with a broken integration, executive visibility, renewal risk, support and engineering owners, customer updates, decision log, workaround, de-escalation criteria, and learning review.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies customer impact, product severity, commercial risk, issue class, stakeholders, owners, action log, communication cadence, and de-escalation criteria.
- Includes decision authority, customer update template, support/engineering/CS roles, workaround tracking, escalation gates, and post-escalation prevention.
- Flags ownerless war rooms, confused incident vs account severity, executive bypass of safety gates, action sprawl, missing customer communication, and premature closure.

It should also produce the artifact shape requested by `skills/customer-escalation-war-room-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review store subscription policy compliance.

The skill should not load for this prompt unless the user adds an explicit customer-escalation-war-room-review context.

## Expected behavior

- Classifies customer impact, product severity, commercial risk, issue class, stakeholders, owners, action log, communication cadence, and de-escalation criteria.
- Includes decision authority, customer update template, support/engineering/CS roles, workaround tracking, escalation gates, and post-escalation prevention.
- Flags ownerless war rooms, confused incident vs account severity, executive bypass of safety gates, action sprawl, missing customer communication, and premature closure.
