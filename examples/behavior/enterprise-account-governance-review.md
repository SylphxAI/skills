# enterprise-account-governance-review behavior example

skill: enterprise-account-governance-review

## Positive prompt

> Review enterprise account governance for a SaaS customer with multiple workspaces, domain claims, SSO and SCIM, delegated admins, billing owners, support impersonation, audit logs, tenant split risk, and break-glass access.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Maps tenant hierarchy, ownership, roles, identity source, billing owner, domains, support access, audit events, data boundaries, and exceptions.
- Includes source-of-truth ownership, approval gates, role mapping, revocation, customer communication, access review, and recovery paths.
- Flags account takeover risk, tenant data leaks, sales/support ownership drift, stale admins, and SSO/SCIM false confidence.

It should also produce the artifact shape requested by `skills/enterprise-account-governance-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Design a pricing experiment.

The skill should not load for this prompt unless the user adds an explicit enterprise-account-governance-review context.

## Expected behavior

- Maps tenant hierarchy, ownership, roles, identity source, billing owner, domains, support access, audit events, data boundaries, and exceptions.
- Includes source-of-truth ownership, approval gates, role mapping, revocation, customer communication, access review, and recovery paths.
- Flags account takeover risk, tenant data leaks, sales/support ownership drift, stale admins, and SSO/SCIM false confidence.
