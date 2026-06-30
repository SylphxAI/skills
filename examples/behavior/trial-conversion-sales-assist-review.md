# trial-conversion-sales-assist-review behavior example

skill: trial-conversion-sales-assist-review

## Positive prompt

> Design sales-assisted trial conversion for a developer SaaS with activation milestones, PQL scoring, enterprise intent, in-product prompts, demo offers, trial extensions, consent, suppression, and retention guardrails.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines activation milestones, PQL scoring, firmographic fit, account identity, intent signals, routing rules, nudges, demo/CS handoff, trial extension policy, suppression, and experiment guardrails.
- Separates self-serve, sales-assist, enterprise routing, nurture, extension-needed, and bad-fit states.
- Flags sales-spam routing, misleading urgency, surprise billing, conversion-only optimization, consent/privacy gaps, and disconnected CRM/product signals.

It should also produce the artifact shape requested by `skills/trial-conversion-sales-assist-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review support-to-engineering escalation severity.

The skill should not load for this prompt unless the user adds an explicit trial-conversion-sales-assist-review context.

## Expected behavior

- Defines activation milestones, PQL scoring, firmographic fit, account identity, intent signals, routing rules, nudges, demo/CS handoff, trial extension policy, suppression, and experiment guardrails.
- Separates self-serve, sales-assist, enterprise routing, nurture, extension-needed, and bad-fit states.
- Flags sales-spam routing, misleading urgency, surprise billing, conversion-only optimization, consent/privacy gaps, and disconnected CRM/product signals.
