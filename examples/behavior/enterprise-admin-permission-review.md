# enterprise-admin-permission-review behavior example

skill: enterprise-admin-permission-review

## Positive prompt

> Review enterprise admin permissions for a SaaS customer with custom roles, delegated admins, SSO/SCIM group mappings, data export/delete powers, billing powers, support impersonation, break-glass access, audit logs, and quarterly access reviews.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines privileged actions, resources, scopes, roles, identity mappings, approval owners, risk tiers, audit events, expiry, and revocation triggers.
- Separates user, billing, security, data, integration, support, export/delete, and break-glass powers with least privilege and separation of duties.
- Flags vague admin roles, SSO/SCIM false confidence, permanent temporary access, missing audit logs, overbroad export/delete permissions, and stale access reviews.

It should also produce the artifact shape requested by `skills/enterprise-admin-permission-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Review marketplace fraud queue design.

The skill should not load for this prompt unless the user adds an explicit enterprise-admin-permission-review context.

## Expected behavior

- Defines privileged actions, resources, scopes, roles, identity mappings, approval owners, risk tiers, audit events, expiry, and revocation triggers.
- Separates user, billing, security, data, integration, support, export/delete, and break-glass powers with least privilege and separation of duties.
- Flags vague admin roles, SSO/SCIM false confidence, permanent temporary access, missing audit logs, overbroad export/delete permissions, and stale access reviews.
