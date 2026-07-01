# Enterprise Role Lifecycle Review Patterns

## Enterprise Role Lifecycle Review state machine

```text
role_cataloged -> source_mapped -> lifecycle_events_defined -> approvals_bound -> access_reviewed -> exceptions_closed
       |                |                |                         |                 |                 |
       v                v                v                         v                 v                 v
 role_sprawl     source_conflict    leaver_gap              approval_gap       stale_access     exception_drift
```

## Rule IDs

- `role-lifecycle-1` — Define role catalog from business responsibility, data sensitivity, environment, tenancy, and delegated admin needs before assigning permissions.
- `role-lifecycle-2` — Declare one entitlement source of truth for each role: IdP group, SCIM attribute, in-app assignment, support override, or break-glass record.
- `role-lifecycle-3` — Separate joiner, mover, leaver, suspension, reactivation, owner transfer, contractor, and service-account lifecycle paths.
- `role-lifecycle-4` — Gate privileged roles with justification, approver, expiry, notification, audit log, and periodic recertification.
- `role-lifecycle-5` — Design break-glass access with narrow scope, time box, dual control where possible, visible logging, and post-use review.
- `role-lifecycle-6` — Map support access, impersonation, and customer-requested overrides to evidence, consent, expiry, and rollback.
- `role-lifecycle-7` — Detect stale access through inactivity, org changes, IdP drift, failed deprovisioning, and orphaned resources.
- `role-lifecycle-8` — Expose customer-admin UX that explains role meaning, inherited access, risky grants, and recovery paths without leaking internal policy.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New enterprise tenant | Map IdP/SCIM before invites | Role catalog and group mapping | Role sprawl |
| User changes department | Run mover review | Old/new role diff | Privilege accumulation |
| Employee leaves | Revoke and transfer ownership | Deprovision proof | Orphaned access |
| Privileged admin request | Require expiry and approval | Justification and approver | Unbounded access |
| Support override | Time-box and log | Consent and ticket link | Shadow permission |

## Role lifecycle checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `role_lifecycle_catalog_declared`, `role_source_mapped`, `role_assignment_changed`, `privileged_access_requested`, `break_glass_used`, `stale_access_detected`, `role_review_completed`, `role_exception_closed`.

Recommended properties: `tenant_id, user_id, role_id, role_scope, source_system, lifecycle_event, approver_id, justification, expiry_at, access_risk_tier, support_ticket_id, review_status, exception_status, decision`.
