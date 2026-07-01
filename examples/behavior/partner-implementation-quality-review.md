# partner-implementation-quality-review behavior example

skill: partner-implementation-quality-review

## Positive prompt

> Review partner implementation quality for a systems integrator delivering SaaS onboarding with data migration, integrations, permissions, training, QA evidence, customer acceptance, support handoff, defects, scorecards, and certification renewal.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines partner scope, deliverables, acceptance criteria, QA evidence, customer workflows, data/integration risks, support handoff, scorecards, and certification consequences.
- Includes migration, integration, training, permissions, security, customer validation, defect triage, remediation, and product/support feedback loops.
- Flags project-complete-only success, partner self-reporting, unvalidated customer workflows, hidden partner defects, and certification without revocation criteria.

It should also produce the artifact shape requested by `skills/partner-implementation-quality-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Monitor app store policy changes.

The skill should not load for this prompt unless the user adds an explicit partner-implementation-quality-review context.

## Expected behavior

- Defines partner scope, deliverables, acceptance criteria, QA evidence, customer workflows, data/integration risks, support handoff, scorecards, and certification consequences.
- Includes migration, integration, training, permissions, security, customer validation, defect triage, remediation, and product/support feedback loops.
- Flags project-complete-only success, partner self-reporting, unvalidated customer workflows, hidden partner defects, and certification without revocation criteria.
