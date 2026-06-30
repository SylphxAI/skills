# promotion-campaign-review behavior example

skill: promotion-campaign-review

## Positive prompt

> Design a mobile app promotion for expired subscribers that increases win-back without coercive messaging.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps objective, audience, offer, eligibility, placement, fulfillment, metrics, and guardrails.
- Rejects fake urgency and unclear promotion terms.

It should also produce the artifact shape requested by `skills/promotion-campaign-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a macOS installer checklist.

The skill should not load for this prompt unless the user adds an explicit promotion-campaign-review context.

## Expected behavior

- Maps objective, audience, offer, eligibility, placement, fulfillment, metrics, and guardrails.
- Rejects fake urgency and unclear promotion terms.
