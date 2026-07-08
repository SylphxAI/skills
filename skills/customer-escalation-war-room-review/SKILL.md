---
name: customer-escalation-war-room-review
description: Design and audit customer escalation war rooms across severity, account impact, executive stakeholders, incident or non-incident classification, owner roles, decision log, action tracker, customer communications, status cadence, engineering/support/customer-success handoffs, commercial risk, de-escalation criteria, and post-escalation learning. Use when an important customer issue needs coordinated response without chaos.
---

# Customer Escalation War Room Review

Use this skill to convert customer escalation, war room, executive escalation, high-severity support, account risk, and cross-functional recovery questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify customer impact, severity, account value, issue class, timeline, owners, executive stakeholders, communication channel, decision authority, and de-escalation target.
2. Read `references/customer-escalation-war-room-patterns.md`.
3. Classify the situation as incident escalation, implementation blocker, support defect, billing dispute, security/privacy concern, executive complaint, renewal-risk escalation, or partner/customer handoff gap.
4. Define war-room roles, communication cadence, action log, decision log, evidence, customer update, internal escalation path, de-escalation criteria, and learning review.
5. Produce escalation war-room plan, state machine, decision table, event schema, action checklist, customer update template, and post-escalation review.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Do not run a war room without a single accountable owner, decision log, and customer communication owner.
- Do not confuse customer escalation severity with production incident severity; classify both explicitly.
- Do not let executive pressure bypass privacy, security, billing, or release safety gates.
- Do not close an escalation until customer-visible success criteria and follow-up owners are explicit.

## Output format

```text
Customer escalation context:
Audience / source of truth / risk boundary:

War-room operating plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Severity, roles, cadence, action log, customer updates, de-escalation, and learning:
- <trigger> -> <policy, metric, edge case, support note>
```
