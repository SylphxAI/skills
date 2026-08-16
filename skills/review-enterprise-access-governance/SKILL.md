---
name: review-enterprise-access-governance
description: "Review enterprise access governance and produce one actionable assessment."
---

# review-enterprise-access-governance

# Review Enterprise Access Governance Review

Produce one **Enterprise Access Governance Contract** that answers who may grant,
inherit, exercise, review, recover, and revoke administrative authority inside and
across customer tenants. Treat identity assertions as inputs to product authority,
not as a substitute for explicit tenant and permission semantics.

## Atomic boundary

Own tenant hierarchy and data boundary, ownership authorities, role/permission
semantics, source mapping, delegation, privileged lifecycle, support and
break-glass access, privileged-action gates, customer admin UX, access-specific
exceptions, audit coverage, access review, split/merge/transfer behavior, and
governance metrics. Consume authentication protocols, identity-provider
connectors, authorization enforcement code, security controls, account recovery,
privacy, contract, and incident facts from their canonical owners.

## Resource routing

- Read `references/access-authority-lifecycle.md` when identity, authorization, provisioning, review, delegation, or revocation matter.
- Read `references/privileged-evidence-operations.md` when sensitive actions,
  support or break-glass access, audit logs, reviews, exceptions, customer
  evidence, or scaled reconciliation matter.

## Source verification

Retrieve current tenant and data models, permission registry, identity/SCIM/SSO
mapping contracts, domain and ownership policy, admin UI, audit event schema,
support access policy, enterprise terms, retention/privacy constraints, and
security requirements at execution. Record owner, version/effective date, and
conflicts. Live access, protocol guarantees, and customer entitlement come from current runtime and
contract authority; stale diagrams, role names, screenshots, and intent remain context.

## Operating rules

1. Define tenant, workspace, organization, resource, environment, data boundary,
   owner type, and administrative action before defining roles. Make parent/child,
   inheritance, isolation, split, merge, and transfer semantics explicit.
2. Separate legal or organizational authority, tenant ownership, billing
   authority, technical administration, security administration, data
   administration, delegated/reseller authority, internal support authority, and
   emergency authority. Each contact and role carries only its explicit authority.
3. Model permissions as action + resource + scope + constraints + environment,
   independent of display role names. Bind every grant to an authorized grantor,
   source assertion, justification where required, effective time, expiry or
   review trigger, audit event, and revocation path.
4. Declare one canonical authority for each grant. Map IdP groups, SCIM data,
   in-product assignments, domain ownership, API/service principals, support
   overrides, and break-glass records into typed grants; the reconciled grant ledger is the explicit entitlement truth.
5. Model joiner, mover, leaver, suspension, reactivation, contractor/service
   account, tenant transfer, and source outage paths. A mover is not only a join
   plus a later cleanup; remove incompatible old authority in the same governed
   transition.
6. Separate standing access, delegated access, requested access, temporary
   elevation, support impersonation, and break-glass. Match approval,
   notification, duration, evidence, monitoring, and post-use review to blast
   radius; support and emergency roles carry explicit, bounded grants.
7. Gate high-impact actions independently: ownership and role grants, SSO/domain
   changes, bulk export/delete, tokens/integrations, billing/payout changes,
   tenant split/merge, support impersonation, and security settings. Define
   preconditions, separation conflicts, safe retry/idempotency, and recovery.
8. Emit durable customer-queryable audit evidence for consequential access
   changes and privileged actions while redacting secrets and unnecessary PII.
   Preserve actor, authority path, target, result, time, reason category,
   correlation, and before/after semantics where safe.
9. Make access review decision-bearing. Provide current grants and inherited
   paths, actual use where authorized, source drift, risk, owner, keep/change/
   revoke decision, remediation evidence, expiry, and escalation for nonresponse.
10. Treat access exceptions as typed, narrow, expiring deviations with risk owner,
    compensating control, evidence, monitoring, renewal trigger, and remediation.
    Route customer security/control exceptions outside access semantics to the
    security-assurance owner.
11. Build for scale immediately: versioned permission and role registries,
    policy-as-data, event-driven provisioning/deprovisioning, reconciliation,
    drift detection, owner transfer, expiry, access campaigns, audit exports,
    exception reminders, and reversible enforcement. Spreadsheets and support
    tickets supply evidence; typed grants issued by the grant authority control access.
12. Separate customer claims, observed access, current source facts,
    inferences, decisions, and unresolved owner questions. Actual grants,
    customer approvals, audit coverage, access-review completion, and operating
    control results use their named authoritative records.

## Workflow

### 1. Frame authority and blast radius

Identify tenant/resource hierarchy, data boundaries, principal types, owner and
admin authorities, identity sources, privileged actions, affected customers,
current evidence, and the exact governance decision. Record ruin conditions such
as cross-tenant access, orphaned ownership, or untraceable privilege.

### 2. Build the entitlement model

Create permission semantics, role templates, source-to-grant mappings,
delegation/inheritance rules, separation constraints, grant and revocation
authority, lifecycle states, and customer-visible explanations. Resolve or block
competing-source cases explicitly.

### 3. Design privileged operations

Define sensitive-action preconditions, approval/elevation flow, support and
break-glass boundaries, notifications, audit contract, retry/failure behavior,
review campaigns, exceptions, and tenant split/merge/transfer procedures.

### 4. Automate and reconcile

Specify typed events, idempotent changes, source-loss behavior, reconciliation,
drift remediation, expiry, orphan recovery, customer/admin self-service,
operator controls, monitoring, and immutable decision evidence. Preserve scoped
agent review for ambiguity and use an authorized specialist override only where
the applicable policy requires it.

### 5. Verify effectiveness

Test entitlement paths, negative permissions, inheritance, cross-tenant
isolation, JML races, owner loss, IdP/SCIM outage, support access, break-glass,
split/merge, audit coverage, exception expiry, and restoration. Report evidence
and gaps without claiming runtime enforcement from design artifacts alone.

## Owner handoffs

- Hand authentication ceremony, session/token handling, SAML/OIDC/SCIM connector
  code, and authorization enforcement implementation to the owning product
  repository and public contract.
- Use `review-account-recovery` for a legitimate user who lost authenticators,
  channels, sessions, or personal account access; consume this skill's tenant and
  admin authority when enterprise recovery needs it.
- Use `review-product-abuse-risk` for adaptive cross-product fraud or abuse
  controls; this skill owns authorized enterprise access, not abuse adjudication.
- Use `review-security-assurance-operations` for customer security evidence,
  questionnaires, control claims, compliance readiness, and non-access security
  exceptions.
- Use `operate-customer-support` for the whole support operating model; this
  skill only defines support authority and privileged evidence.
- Use `run-incident-response`, the owning product repository,
  `design-privacy-lifecycle`, and the owning release path for incidents,
  controls, implementation, privacy, and shipped proof.

## Acceptance conditions

Acceptance conditions:

- tenant ownership comes from the designated ownership authority, with SSO,
  SCIM, verified domains, billing, sales, and support signals treated by scope;
- every role names exact action, resource, and scope semantics;
- one visible grant authority explains why each access grant exists;
- joiner, mover, leaver, suspension, owner loss, source outage, and tenant
  transfer behavior are defined;
- support, impersonation, break-glass, and temporary access have narrow scope,
  expiry, audit, notification policy, and post-use review;
- high-impact powers are separated according to decision-specific evidence and analysis;
- audit evidence uses redacted references and emitted, queryable events for critical actions;
- access review closes with checked attestations and remediation evidence; and
- destructive or cross-tenant automation has idempotency, conflict handling,
  rollback/recovery, audit, and a current-source check.

## Output contract

Produce one **Enterprise Access Governance Contract** containing:

1. artifact name and revision, decision, tenant/resource/data-boundary model, principal and
   authority types, current sources, and unresolved conflicts;
2. permission registry, role templates, source-to-grant rules, inheritance and
   delegation, separation constraints, and safe customer explanations;
3. ownership, grant, JML, elevation, support, break-glass, review, exception,
   split, merge, transfer, revocation, and recovery flows;
4. high-impact action matrix with blast radius, preconditions, approval,
   authority, audit, notification, failure behavior, and restoration;
5. audit event contract, customer query/export semantics, retention/redaction
   ownership, coverage evidence, and alert/review hooks;
6. reconciliation, drift, expiry, orphan detection, access campaigns,
   exception-remediation, scale automation, and reversible operator controls;
7. validation evidence, decision-grade metrics, blocked facts, and typed owner
   handoffs for authentication, enforcement code, recovery, security, and abuse.

The artifact is complete when every privileged outcome can be traced from current
authority through grant and use to review or revocation, and no tenant, identity
provider, support path, or emergency mechanism can silently create unowned power.
