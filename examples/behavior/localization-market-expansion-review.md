# localization-market-expansion-review behavior example

skill: localization-market-expansion-review

## Positive prompt

> Plan localization and market expansion for a subscription mobile app entering Japan and Korea.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates translation from market demand, i18n infrastructure, pricing, payments, support, legal, and launch channels.
- Produces a readiness matrix with launch gates and market-specific risks.
- Defines post-launch metrics for conversion, retention, refunds, support load, and cohort quality.

It should also produce the artifact shape requested by `skills/localization-market-expansion-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a keyboard accessibility issue in a modal dialog.

The skill should not load for this prompt unless the user adds an explicit localization-market-expansion-review context.

## Expected behavior

- Separates translation from market demand, i18n infrastructure, pricing, payments, support, legal, and launch channels.
- Produces a readiness matrix with launch gates and market-specific risks.
- Defines post-launch metrics for conversion, retention, refunds, support load, and cohort quality.
