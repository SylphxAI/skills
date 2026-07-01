# enterprise-role-lifecycle-review behavior example

skill: enterprise-role-lifecycle-review

## Positive prompt

> Audit enterprise role lifecycle controls for a SaaS product with SSO, SCIM groups, custom admin roles, contractors, privileged support access, break-glass accounts, stale access reviews, audit logs, owner transfer, and customer admin UX.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines role taxonomy, entitlement source of truth, lifecycle events, privileged access gates, break-glass controls, support overrides, stale access review cadence, and audit evidence.
- Separates joiner, mover, leaver, suspension, reactivation, owner transfer, contractor, service account, SCIM, IdP, in-app role, and support access states.
- Flags competing entitlement sources, unbounded privileged access, undefined break-glass/offboarding paths, stale access, shadow support permissions, and missing customer-admin explanations.

It should also produce the artifact shape requested by `skills/enterprise-role-lifecycle-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review store price change communication.

The skill should not load for this prompt unless the user adds an explicit enterprise-role-lifecycle-review context.

## Expected behavior

- Defines role taxonomy, entitlement source of truth, lifecycle events, privileged access gates, break-glass controls, support overrides, stale access review cadence, and audit evidence.
- Separates joiner, mover, leaver, suspension, reactivation, owner transfer, contractor, service account, SCIM, IdP, in-app role, and support access states.
- Flags competing entitlement sources, unbounded privileged access, undefined break-glass/offboarding paths, stale access, shadow support permissions, and missing customer-admin explanations.
