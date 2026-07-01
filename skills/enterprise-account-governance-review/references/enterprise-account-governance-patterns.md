# Enterprise Account Governance Patterns

## Enterprise Account Governance Review state machine

```text
account_requested -> ownership_verified -> roles_mapped -> access_granted -> audit_reviewed -> governance_renewed
       |                   |              |                |                |
       v                   v              v                v                v
 domain_conflict     owner_missing   role_sprawl     support_overreach  stale_exception
```

## Rule IDs

- `account-governance-1` — Define tenant hierarchy, account owner, billing owner, technical admins, domains, identity source, and support access model before granting control.
- `account-governance-2` — Separate customer admin authority, billing authority, legal authority, support authority, and internal break-glass authority.
- `account-governance-3` — Map every privileged role to allowed actions, approval path, audit event, expiry, and revocation trigger.
- `account-governance-4` — Use domain claim, SSO, SCIM, contract, and admin confirmation together when ownership is ambiguous.
- `account-governance-5` — Require explicit plans for tenant merge, tenant split, subsidiary changes, divestiture, and ownership transfer.
- `account-governance-6` — Expose customer-visible audit logs for admin, support, identity, billing, and data-boundary actions where appropriate.
- `account-governance-7` — Review privileged access, stale admins, unused domains, failed SCIM sync, and support access exceptions on a cadence.
- `account-governance-8` — Route governance gaps back into product roles, admin UX, support tooling, and enterprise onboarding.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Domain claim conflict | Escalate ownership proof | DNS, contract, admin evidence | Account takeover |
| Tenant merge | Require legal/admin signoff | Data map and owners | Cross-tenant data leak |
| Support impersonation | Use scoped audited access | Case and approval | Untracked access |
| Stale admin | Revoke or confirm | Access review | Privilege drift |
| SCIM mismatch | Pause automation | Identity source diff | Wrong deprovisioning |

## Enterprise account governance checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `enterprise_account_requested`, `enterprise_account_owner_verified`, `enterprise_role_mapped`, `enterprise_access_granted`, `enterprise_support_access_used`, `enterprise_audit_reviewed`, `enterprise_governance_exception_recorded`.

Recommended properties: `account_id, tenant_id, domain, owner_type, role_name, identity_source, access_level, approval_status, support_case_id, audit_event_type, exception_expiry, review_status, decision`.
