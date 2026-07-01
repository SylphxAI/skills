# support-automation-governance-review behavior example

skill: support-automation-governance-review

## Positive prompt

> Review support automation governance for an AI chatbot handling refunds, account access, incident questions, stale help-center sources, confidence thresholds, human escalation, QA sampling, privacy risk, and unresolved-contact metrics.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps contact drivers, automation type, source grounding, allowed actions, confidence thresholds, escalation triggers, QA, analytics, and rollback.
- Includes stricter controls for refunds, billing, account access, privacy, legal, abuse, incidents, and enterprise customers.
- Flags deflection theater, unsafe account actions, stale uncited answers, hidden human escalation, and aggregate-only QA.

It should also produce the artifact shape requested by `skills/support-automation-governance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review enterprise account governance.

The skill should not load for this prompt unless the user adds an explicit support-automation-governance-review context.

## Expected behavior

- Maps contact drivers, automation type, source grounding, allowed actions, confidence thresholds, escalation triggers, QA, analytics, and rollback.
- Includes stricter controls for refunds, billing, account access, privacy, legal, abuse, incidents, and enterprise customers.
- Flags deflection theater, unsafe account actions, stale uncited answers, hidden human escalation, and aggregate-only QA.
