# support-escalation-engineering-review behavior example

skill: support-escalation-engineering-review

## Positive prompt

> Design support-to-engineering escalation for a SaaS product with severity tiers, reproduction requirements, logs, known issues, incidents, enterprise customer updates, workarounds, and closure proof.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines escalation classes, severity, evidence requirements, specialized paths, owners, triage cadence, workaround policy, customer update cadence, closure proof, and feedback loops.
- Includes reproduction, logs/traces, impact, affected accounts, data/security/billing paths, known issues, duplicate linking, and support/engineering RACI.
- Flags vague escalations, incidents hidden in bug queues, premature closure, invisible engineering status, duplicate noise, and recurring defects without product action.

It should also produce the artifact shape requested by `skills/support-escalation-engineering-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a partner co-marketing launch plan.

The skill should not load for this prompt unless the user adds an explicit support-escalation-engineering-review context.

## Expected behavior

- Defines escalation classes, severity, evidence requirements, specialized paths, owners, triage cadence, workaround policy, customer update cadence, closure proof, and feedback loops.
- Includes reproduction, logs/traces, impact, affected accounts, data/security/billing paths, known issues, duplicate linking, and support/engineering RACI.
- Flags vague escalations, incidents hidden in bug queues, premature closure, invisible engineering status, duplicate noise, and recurring defects without product action.
