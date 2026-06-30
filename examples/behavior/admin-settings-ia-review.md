# admin-settings-ia-review behavior example

skill: admin-settings-ia-review

## Positive prompt

> Design admin settings IA for a B2B SaaS with members, billing, SSO, API keys, data export, and workspace deletion.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Organizes settings by actor, scope, risk, and user mental model rather than backend concepts.
- Defines role gates, defaults, confirmations, audit logs, disabled states, and recovery paths.
- Separates personal, workspace, billing, security, data, integration, and support controls.

It should also produce the artifact shape requested by `skills/admin-settings-ia-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a win-back email sequence.

The skill should not load for this prompt unless the user adds an explicit admin-settings-ia-review context.

## Expected behavior

- Organizes settings by actor, scope, risk, and user mental model rather than backend concepts.
- Defines role gates, defaults, confirmations, audit logs, disabled states, and recovery paths.
- Separates personal, workspace, billing, security, data, integration, and support controls.
