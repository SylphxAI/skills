# saas-subscription-pricing behavior example

skill: saas-subscription-pricing

## Positive prompt

> Design pricing tiers for a B2B SaaS with usage-based costs and team collaboration.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Identifies buyer, value metric, cost driver, and expansion path.
- Covers trial/freemium/tiers/usage/enterprise tradeoffs.
- Defines exact limits, overage mechanics, caps, alert thresholds, margin targets, CAC payback, NRR, and cost controls.
- Includes support/sales enablement, objection handling, procurement path, and escalation rules.
- Includes cancellation, downgrade, renewal, metrics, and trust concerns.

It should also produce the artifact shape requested by `skills/saas-subscription-pricing/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Explain how binary search works.

The skill should not load for this prompt unless the user adds an explicit saas-subscription-pricing context.

## Expected behavior

- Identifies buyer, value metric, cost driver, and expansion path.
- Covers trial/freemium/tiers/usage/enterprise tradeoffs.
- Defines exact limits, overage mechanics, caps, alert thresholds, margin targets, CAC payback, NRR, and cost controls.
- Includes support/sales enablement, objection handling, procurement path, and escalation rules.
- Includes cancellation, downgrade, renewal, metrics, and trust concerns.
