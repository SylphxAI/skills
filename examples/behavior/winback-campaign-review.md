# winback-campaign-review behavior example

skill: winback-campaign-review

## Positive prompt

> Design a win-back campaign for cancelled SaaS subscribers with different churn reasons and discount guardrails.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Segments churned users by reason, value history, consent, and economics.
- Connects message, offer, landing path, support handling, and fatigue limits.
- Measures incremental retained activity or revenue instead of vanity engagement.

It should also produce the artifact shape requested by `skills/winback-campaign-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit Windows installer signing and auto-update behavior.

The skill should not load for this prompt unless the user adds an explicit winback-campaign-review context.

## Expected behavior

- Segments churned users by reason, value history, consent, and economics.
- Connects message, offer, landing path, support handling, and fatigue limits.
- Measures incremental retained activity or revenue instead of vanity engagement.
