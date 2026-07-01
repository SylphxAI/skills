# refund-and-support-flow-review behavior example

skill: refund-and-support-flow-review

## Positive prompt

> Design refund and support handling for a mobile game where users refund consumables after spending them.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates refund, entitlement, account action, support, and abuse review.
- Rejects automatic bans and coercive repurchase threats.
- Separates Apple, Google, Stripe, chargeback, and goodwill authority with provider signals, dedupe keys, and entitlement actions.
- Defines server-side entitlement states, abuse score bands, false-positive controls, approval thresholds, support dashboards, and metrics.

It should also produce the artifact shape requested by `skills/refund-and-support-flow-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a responsive dashboard layout.

The skill should not load for this prompt unless the user adds an explicit refund-and-support-flow-review context.

## Expected behavior

- Separates refund, entitlement, account action, support, and abuse review.
- Rejects automatic bans and coercive repurchase threats.
- Separates Apple, Google, Stripe, chargeback, and goodwill authority with provider signals, dedupe keys, and entitlement actions.
- Defines server-side entitlement states, abuse score bands, false-positive controls, approval thresholds, support dashboards, and metrics.
