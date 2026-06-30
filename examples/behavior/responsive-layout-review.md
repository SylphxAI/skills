# responsive-layout-review behavior example

skill: responsive-layout-review

## Positive prompt

> Audit this SaaS dashboard so it works from phone to wide desktop.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Uses content stress points rather than arbitrary device-only breakpoints.
- Checks tables, navigation, forms, modals, hover, keyboard, and long content.

It should also produce the artifact shape requested by `skills/responsive-layout-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Write a Steam launch campaign.

The skill should not load for this prompt unless the user adds an explicit responsive-layout-review context.

## Expected behavior

- Uses content stress points rather than arbitrary device-only breakpoints.
- Checks tables, navigation, forms, modals, hover, keyboard, and long content.
