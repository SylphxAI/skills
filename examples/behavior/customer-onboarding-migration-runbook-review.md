# customer-onboarding-migration-runbook-review behavior example

skill: customer-onboarding-migration-runbook-review

## Positive prompt

> Design a customer onboarding migration runbook for enterprise SaaS moving projects, users, permissions, comments, attachments, integrations, and historical data from a legacy tool.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines source assessment, data mapping, transformations, dry run, validation, signoff, cutover, rollback, communication, training, support readiness, and adoption handoff.
- Covers self-serve, assisted, enterprise, phased, integration, backfill, and regulated migrations with workflow validation.
- Flags migration without signoff, hidden data loss, unsupported fields, job-complete-only success, unowned scripts, and missing support/adoption plan.

It should also produce the artifact shape requested by `skills/customer-onboarding-migration-runbook-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review sales commission clawback policy.

The skill should not load for this prompt unless the user adds an explicit customer-onboarding-migration-runbook-review context.

## Expected behavior

- Defines source assessment, data mapping, transformations, dry run, validation, signoff, cutover, rollback, communication, training, support readiness, and adoption handoff.
- Covers self-serve, assisted, enterprise, phased, integration, backfill, and regulated migrations with workflow validation.
- Flags migration without signoff, hidden data loss, unsupported fields, job-complete-only success, unowned scripts, and missing support/adoption plan.
