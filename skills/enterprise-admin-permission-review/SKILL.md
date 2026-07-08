---
name: enterprise-admin-permission-review
description: Design and audit enterprise admin permissions across RBAC, ABAC, custom roles, admin scopes, delegated administration, SSO/SCIM mappings, role requests, approval workflows, separation of duties, audit logs, break-glass access, support access, data export/delete powers, billing powers, and access reviews. Use when privileged controls can affect customer data, billing, security, or compliance.
---

# Enterprise Admin Permission Review

Use this skill to convert enterprise admin permission, RBAC, custom role, delegated administration, role request, access review, and break-glass permission questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify tenant model, role types, privileged actions, identity source, approval owner, data/billing/security impact, audit event, expiry, and revocation trigger.
2. Read `references/enterprise-admin-permission-patterns.md`.
3. Classify the situation as standard role, custom role, temporary elevation, delegated admin, support access, billing admin, security admin, data admin, break-glass access, or separation-of-duties exception.
4. Define permission taxonomy, role boundaries, approval gate, audit event, access review cadence, escalation path, UI copy, and rollback or revocation procedure.
5. Produce permission governance plan, state machine, decision table, event schema, privileged-action checklist, access-review plan, and exception register.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Do not grant permissions whose blast radius, audit event, owner, and revocation path are unclear.
- Do not bundle data export, deletion, billing, security, and user-management powers into one vague admin role.
- Do not treat SSO group membership as sufficient proof of application authorization semantics.
- Do not allow permanent break-glass, support, or temporary admin access without expiry and review.

## Output format

```text
Enterprise admin permission context:
Audience / source of truth / risk boundary:

Permission governance plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Roles, scopes, approvals, audit, expiry, review, and revocation:
- <trigger> -> <policy, metric, edge case, support note>
```
