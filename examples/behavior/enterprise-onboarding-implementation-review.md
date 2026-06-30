# enterprise-onboarding-implementation-review behavior example

skill: enterprise-onboarding-implementation-review

## Positive prompt

> Plan enterprise onboarding for a SaaS customer that needs SSO, SCIM, data import, Salesforce integration, admin training, go-live validation, and customer-success handoff.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps stakeholders, success criteria, dependencies, milestones, escalation rules, and customer/internal actions.
- Separates SSO/SCIM, data migration, integrations, environments, permissions, training, support readiness, and adoption handoff.
- Flags configuration-only go-live, unclear ownership, hidden blockers, scope creep, and sales promises without implementation proof.

It should also produce the artifact shape requested by `skills/enterprise-onboarding-implementation-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review a refund abuse policy for a mobile game.

The skill should not load for this prompt unless the user adds an explicit enterprise-onboarding-implementation-review context.

## Expected behavior

- Maps stakeholders, success criteria, dependencies, milestones, escalation rules, and customer/internal actions.
- Separates SSO/SCIM, data migration, integrations, environments, permissions, training, support readiness, and adoption handoff.
- Flags configuration-only go-live, unclear ownership, hidden blockers, scope creep, and sales promises without implementation proof.
