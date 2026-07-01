# release-freeze-change-control-review behavior example

skill: release-freeze-change-control-review

## Positive prompt

> Run release freeze change control for a holiday freeze with a security hotfix, customer-specific blackout, app-store deadline, infrastructure change request, rollback plan, monitoring dashboard, support comms, approval authority, and post-freeze exception review.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines freeze scope, protected systems, allowed change classes, severity ladder, evidence requirements, approval matrix, rollout/rollback guardrails, monitoring, communication, exception register, and post-freeze review.
- Separates planned freeze, emergency hotfix, security patch, store deadline, customer blackout, infrastructure freeze, incident recovery, compliance override, and rejected change paths.
- Flags shadow changes, vague freeze scope, severity blur, authority gaps, missing rollback/support/monitoring, zombie exceptions, and repeated freeze debt.

It should also produce the artifact shape requested by `skills/release-freeze-change-control-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review subscription price increase retention.

The skill should not load for this prompt unless the user adds an explicit release-freeze-change-control-review context.

## Expected behavior

- Defines freeze scope, protected systems, allowed change classes, severity ladder, evidence requirements, approval matrix, rollout/rollback guardrails, monitoring, communication, exception register, and post-freeze review.
- Separates planned freeze, emergency hotfix, security patch, store deadline, customer blackout, infrastructure freeze, incident recovery, compliance override, and rejected change paths.
- Flags shadow changes, vague freeze scope, severity blur, authority gaps, missing rollback/support/monitoring, zombie exceptions, and repeated freeze debt.
