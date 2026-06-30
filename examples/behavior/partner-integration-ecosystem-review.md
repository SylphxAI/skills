# partner-integration-ecosystem-review behavior example

skill: partner-integration-ecosystem-review

## Positive prompt

> Design a partner app ecosystem for a B2B SaaS with OAuth, webhooks, certification, directory ranking, and support boundaries.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Starts from user workflow value and defines partner tiers, access, certification, support, incentives, and health metrics.
- Covers OAuth scopes, webhooks, rate limits, data handling, revocation, directory ranking, and abuse controls.
- Separates strategic partners, app developers, affiliates, implementation partners, and data partners.

It should also produce the artifact shape requested by `skills/partner-integration-ecosystem-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design user notification preferences.

The skill should not load for this prompt unless the user adds an explicit partner-integration-ecosystem-review context.

## Expected behavior

- Starts from user workflow value and defines partner tiers, access, certification, support, incentives, and health metrics.
- Covers OAuth scopes, webhooks, rate limits, data handling, revocation, directory ranking, and abuse controls.
- Separates strategic partners, app developers, affiliates, implementation partners, and data partners.
