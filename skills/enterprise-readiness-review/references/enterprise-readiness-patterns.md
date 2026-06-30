# Enterprise Readiness Patterns

## Enterprise sales-readiness state machine

```text
qualified_enterprise_need -> security_review -> legal_procurement -> pilot -> rollout -> renewal_or_expansion
          |                         |                  |          |
          v                         v                  v          v
        no_fit              evidence_missing     pilot_failed   support_escalation
```

## Rule IDs

- `enterprise-ready-1` — Start from enterprise buyer pain, deployment context, and data sensitivity.
- `enterprise-ready-2` — Split requirements into identity/admin, security/trust, legal/procurement, product capability, support, and implementation.
- `enterprise-ready-3` — Treat SSO, SCIM, RBAC, audit logs, data export, admin controls, and lifecycle management as an integrated admin system.
- `enterprise-ready-4` — Maintain a truth-based evidence pack: security overview, subprocessors, privacy, architecture, uptime, incident process, support terms.
- `enterprise-ready-5` — Do not imply certifications, regulatory compliance, or SLAs without authoritative proof.
- `enterprise-ready-6` — Enterprise pricing should map to admin/security/support value, not arbitrary logo size alone.
- `enterprise-ready-7` — Pilot success criteria must be measurable and tied to rollout decision.
- `enterprise-ready-8` — Procurement and legal timelines are product risks; include them in launch plans.
- `enterprise-ready-9` — Support escalation paths and account ownership must exist before broad rollout.
- `enterprise-ready-10` — Every enterprise gap needs buyer impact, workaround, owner, and proof target.

## Decision table

| Ask | Category | Blocker level | Response | Proof needed |
| --- | --- | --- | --- | --- |
| SSO required for all users | Identity/admin | Often blocker | Plan enterprise SSO | Tested SAML/OIDC setup guide |
| SCIM provisioning | Lifecycle admin | Segment-dependent | Roadmap or build if many seats | User/group lifecycle behavior |
| SOC 2 request | Trust evidence | Sales blocker if absent | State current evidence honestly | Audit/certification status or alternative evidence |
| Custom DPA | Legal/privacy | Contract blocker | Route to legal owner | Approved template and subprocessors |
| Audit logs | Security/admin | High for regulated buyers | Define event scope and retention | Exportable admin log |
| Dedicated SLA | Support/commercial | Paid-plan feature | Match to support capacity | Support process and uptime metric |

## Readiness checklist

- Buyer personas and enterprise use cases are documented.
- Admin/identity lifecycle is coherent: invite, join, role, group, suspend, leave, transfer ownership.
- Security evidence pack is accurate and reviewed.
- Contract, procurement, invoicing, support, and implementation owners are named.
- Pilot plan has success criteria, timeline, data boundary, and rollout decision.

## Event schema

Track: `enterprise_opportunity_qualified`, `security_questionnaire_received`, `trust_document_shared`, `sso_configured`, `admin_role_changed`, `audit_log_exported`, `pilot_started`, `pilot_success_criteria_met`, `procurement_blocker_logged`, `enterprise_rollout_started`, `enterprise_support_escalated`.

Minimum properties: account segment, buyer role, requirement category, data sensitivity, proof link, owner, blocker level, commitment status, and rollout gate.
