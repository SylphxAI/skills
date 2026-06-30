# legal-terms-policy-review behavior example

skill: legal-terms-policy-review

## Positive prompt

> Review legal terms surfaces for a SaaS checkout adding trials, auto-renewal, cancellation, refunds, AI feature disclaimers, acceptable use, and regional privacy notices.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps product promises, restrictions, billing terms, renewals, cancellation, refunds, AI/data use, and marketplace rules to approved policy sources.
- Includes disclosure placement, acknowledgement, versioning, change notice, evidence retention, support/legal escalation, and cross-surface consistency checks.
- Flags invented legal language, buried obligations, contradictory copy, unversioned changes, dark-pattern terms, and unsupported legal claims.

It should also produce the artifact shape requested by `skills/legal-terms-policy-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Audit usage metering accuracy for invoices.

The skill should not load for this prompt unless the user adds an explicit legal-terms-policy-review context.

## Expected behavior

- Maps product promises, restrictions, billing terms, renewals, cancellation, refunds, AI/data use, and marketplace rules to approved policy sources.
- Includes disclosure placement, acknowledgement, versioning, change notice, evidence retention, support/legal escalation, and cross-surface consistency checks.
- Flags invented legal language, buried obligations, contradictory copy, unversioned changes, dark-pattern terms, and unsupported legal claims.
