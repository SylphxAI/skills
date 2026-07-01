---
name: enterprise-role-lifecycle-review
description: Design and audit enterprise role lifecycle controls covering role taxonomy, RBAC/ABAC, joiner-mover-leaver events, SCIM/SSO sync, privileged access, approvals, break-glass accounts, separation of duties, audit logs, stale access review, customer admin UX, and support escalations. Use when enterprise products need role lifecycle governance instead of ad hoc permissions.
---

# Enterprise Role Lifecycle Review

Use this skill to convert enterprise role lifecycle, role taxonomy, joiner-mover-leaver controls, SCIM/SSO mapping, privileged access, break-glass access, stale access reviews, and customer admin permission questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify tenant model, role catalog, identity providers, source of truth, lifecycle events, privileged roles, approval owners, audit evidence, support override paths, and customer-facing admin states.
2. Read `references/enterprise-role-lifecycle-patterns.md`.
3. Classify the situation as new enterprise tenant, role migration, SSO/SCIM rollout, privileged admin expansion, merger/org change, audit prep, incident remediation, or support-driven access repair.
4. Define role taxonomy, entitlement source of truth, lifecycle state machine, joiner/mover/leaver checks, privileged access gates, break-glass controls, stale access review cadence, support workflow, and audit evidence.
5. Produce role lifecycle review, state machine, decision table, event schema, access checklist, exception policy, and remediation plan.

## Guardrails

- Do not treat roles as UI labels; connect every role to permissions, data classes, tenancy, and audit evidence.
- Do not let SCIM, IdP groups, in-app roles, and support overrides become competing sources of truth.
- Do not leave break-glass, owner transfer, suspended user, or contractor offboarding paths undefined.
- Do not approve privileged access without expiry, review cadence, and detectable usage.

## Output format

```text
Role lifecycle context:
Audience / source of truth / risk boundary:

Lifecycle control plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Roles, source of truth, lifecycle events, privileged access, audit evidence, and remediation:
- <trigger> -> <policy, metric, edge case, support note>
```
