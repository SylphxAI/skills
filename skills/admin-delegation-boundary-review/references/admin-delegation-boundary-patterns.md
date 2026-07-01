# Admin Delegation Boundary Review Patterns

## Admin Delegation Boundary Review state machine

```text
scope_requested -> boundary_mapped -> approvals_bound -> sensitive_actions_gated -> access_reviewed -> drift_remediated
       |                 |                 |                  |                         |                 |
       v                 v                 v                  v                         v                 v
 scope_creep      hierarchy_conflict approval_gap       shadow_superuser          stale_delegate    audit_gap
```

## Rule IDs

- `admin-delegation-1` — Define delegation by tenant hierarchy, resource scope, data class, action sensitivity, environment, and customer responsibility before assigning roles.
- `admin-delegation-2` — Separate customer delegated admins, reseller/channel admins, marketplace seller admins, internal support access, impersonation, and break-glass paths.
- `admin-delegation-3` — Gate sensitive actions such as billing changes, user deletion, data export, security settings, integration keys, payout changes, and role grants.
- `admin-delegation-4` — Map approval chains for delegated grants, owner transfer, reseller assignment, temporary support access, and emergency override.
- `admin-delegation-5` — Expose customer-visible explanations for delegated scope, inherited access, risky grants, revocation, and recovery routes.
- `admin-delegation-6` — Log delegation changes, sensitive actions, impersonation, failed grants, approval outcomes, and break-glass usage with durable audit evidence.
- `admin-delegation-7` — Review privilege drift through inactivity, org changes, tenant split/merge, reseller exit, role template changes, and support overrides.
- `admin-delegation-8` — Require remediation owners for overbroad delegation, source-of-truth conflict, shadow superuser behavior, and missing audit evidence.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Reseller admin request | Scope by customer and action | Delegation agreement | Cross-tenant access |
| Sensitive billing change | Require approval gate | Approver and audit log | Unauthorized spend |
| Support impersonation | Time-box and notify | Ticket and consent | Shadow support access |
| Tenant owner leaves | Transfer ownership | Owner transfer proof | Orphaned admin |
| Role template changes | Run drift review | Before/after diff | Privilege creep |

## Delegated admin checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `admin_delegation_scope_requested`, `admin_delegation_boundary_mapped`, `admin_delegation_granted`, `admin_delegation_sensitive_action_attempted`, `admin_delegation_impersonation_started`, `admin_delegation_drift_detected`, `admin_delegation_review_completed`, `admin_delegation_revoked`.

Recommended properties: `tenant_id, delegated_admin_id, delegator_id, scope_type, resource_id, action_type, sensitivity_tier, approver_id, expiry_at, support_ticket_id, inherited_access, audit_status, drift_status, decision`.
