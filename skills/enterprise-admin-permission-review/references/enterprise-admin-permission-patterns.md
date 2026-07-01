# Enterprise Admin Permission Patterns

## Enterprise Admin Permission Review state machine

```text
permission_requested -> scope_classified -> owner_approved -> access_granted -> audit_reviewed -> access_renewed
       |                    |                |                |                |
       v                    v                v                v                v
 vague_scope        sod_conflict      approval_gap     overprivileged     stale_access
```

## Rule IDs

- `admin-permission-1` — Model each privileged action by resource, scope, actor, approval owner, risk tier, audit event, and revocation mechanism.
- `admin-permission-2` — Separate role naming from permission semantics; define exact capabilities for user, billing, security, data, integration, and support administration.
- `admin-permission-3` — Use least privilege, separation of duties, scoped delegation, and time-bounded elevation for high-risk actions.
- `admin-permission-4` — Map SSO/SCIM groups to roles with conflict detection, fallback ownership, and deprovisioning tests.
- `admin-permission-5` — Require explicit guardrails for export, delete, impersonation, API token, billing, domain, and security setting permissions.
- `admin-permission-6` — Expose customer-visible audit logs and internal security telemetry for privileged actions.
- `admin-permission-7` — Run periodic access reviews for admins, custom roles, support access, dormant accounts, and break-glass grants.
- `admin-permission-8` — Feed recurring permission confusion back into admin UX, docs, onboarding, support macros, and enterprise readiness.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Custom admin role | Define exact permissions | Role matrix and owner | Privilege ambiguity |
| Break-glass access | Time-bound and audit | Incident or approval record | Permanent hidden power |
| SCIM group drift | Pause or reconcile | Identity/app diff | Wrong access |
| Data export permission | Require high-risk gate | Data class and owner | Customer data leak |
| Separation conflict | Deny or add compensating control | Role conflict map | Fraud or compliance gap |

## Enterprise admin permission checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `admin_permission_requested`, `admin_permission_scope_classified`, `admin_permission_owner_approved`, `admin_permission_granted`, `admin_privileged_action_performed`, `admin_permission_reviewed`, `admin_permission_revoked`.

Recommended properties: `account_id, actor_id, role_id, permission_scope, resource_type, risk_tier, approval_status, identity_source, expiry_date, audit_event_id, review_status, revocation_reason, decision`.
