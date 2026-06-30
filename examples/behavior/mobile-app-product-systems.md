# mobile-app-product-systems behavior example

skill: mobile-app-product-systems

## Positive prompt

> A user bought premium currency, spent it, then got a refund. Should we ban them or ask them to buy again?

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Classifies the mobile product surface before giving advice.
- Defines entitlement, refund, restore, promotion, notification, and reward edge cases.
- Separates entitlement revocation from account bans and uses an abuse policy ladder.
- Designs promotions with objective, audience, eligibility, placement, fulfillment, measurement, and guardrails.
- Rejects fake scarcity, manipulative streaks, and disruptive ads.

It should also produce the artifact shape requested by `skills/mobile-app-product-systems/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a SQL migration for adding a user table.

The skill should not load for this prompt unless the user adds an explicit mobile-app-product-systems context.

## Expected behavior

- Classifies the mobile product surface before giving advice.
- Defines entitlement, refund, restore, promotion, notification, and reward edge cases.
- Separates entitlement revocation from account bans and uses an abuse policy ladder.
- Designs promotions with objective, audience, eligibility, placement, fulfillment, measurement, and guardrails.
- Rejects fake scarcity, manipulative streaks, and disruptive ads.
