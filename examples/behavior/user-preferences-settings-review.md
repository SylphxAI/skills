# user-preferences-settings-review behavior example

skill: user-preferences-settings-review

## Positive prompt

> Design user preferences for a SaaS with notifications, language, theme, privacy personalization, AI memory, and accessibility settings.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Separates personal preferences from consent, security, billing/admin settings, workspace policy, and entitlements.
- Defines scope, default, persistence, sync, reset/export/delete, disabled states, and migration behavior.
- Covers sensitive preferences like notifications, privacy, accessibility, language, and AI personalization.

It should also produce the artifact shape requested by `skills/user-preferences-settings-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a tax invoice correction workflow.

The skill should not load for this prompt unless the user adds an explicit user-preferences-settings-review context.

## Expected behavior

- Separates personal preferences from consent, security, billing/admin settings, workspace policy, and entitlements.
- Defines scope, default, persistence, sync, reset/export/delete, disabled states, and migration behavior.
- Covers sensitive preferences like notifications, privacy, accessibility, language, and AI personalization.
