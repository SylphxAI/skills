# customer-support-operations behavior example

skill: customer-support-operations

## Positive prompt

> Design support operations for a subscription mobile app with refunds and restore-purchase issues.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines channels, issue taxonomy, triage, escalation, tooling, macros, and metrics.
- Connects support patterns back to product fixes.
- Handles refunds, backup/data loss, incidents, and abuse review with trust-preserving language.

It should also produce the artifact shape requested by `skills/customer-support-operations/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Create a database index migration.

The skill should not load for this prompt unless the user adds an explicit customer-support-operations context.

## Expected behavior

- Defines channels, issue taxonomy, triage, escalation, tooling, macros, and metrics.
- Connects support patterns back to product fixes.
- Handles refunds, backup/data loss, incidents, and abuse review with trust-preserving language.
