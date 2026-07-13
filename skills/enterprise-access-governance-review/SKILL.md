---
name: enterprise-access-governance-review
description: "Design or audit enterprise tenant and administrator governance across ownership, organization hierarchy, domains, roles, permissions, delegated administration, SSO/SCIM authority boundaries, joiner-mover-leaver lifecycle, temporary elevation, support access, break-glass, privileged-action gates, customer-visible audit evidence, access reviews, tenant split/merge, and access exceptions. Use when the primary artifact is an Enterprise Access Governance Contract. Do not use for authentication or SSO/SCIM implementation, end-user account recovery, a generic authorization library, security certification, or a customer security questionnaire alone."
---

# Enterprise Access Governance Review

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

## When not to use

- Do not use to implement authentication, sessions, tokens, SAML/OIDC/SCIM, an
  authorization library, or policy enforcement code; hand exact requirements to
  the current engineering and specification owners.
- Do not use for a legitimate user's lost credentials or channels; use
  `account-recovery-review` and supply tenant/admin authority as an input.
- Do not use for security questionnaires, compliance evidence, generic product
  abuse, or the whole support model; route those to their specialist owners.

## Resource routing

- Read `references/access-authority-lifecycle.md` for every task.
- Read `references/privileged-evidence-operations.md` when sensitive actions,
  support or break-glass access, audit logs, reviews, exceptions, customer
  evidence, or scaled reconciliation matter.

## Source verification

Retrieve current tenant and data models, permission registry, identity/SCIM/SSO
mapping contracts, domain and ownership policy, admin UI, audit event schema,
support access policy, enterprise terms, retention/privacy constraints, and
security requirements at execution. Record owner, version/effective date, and
conflicts. Never infer live access, protocol guarantees, or customer entitlement
from stale diagrams, role names, screenshots, or contract intent.

## Operating rules

1. Define tenant, workspace, organization, resource, environment, data boundary,
   owner type, and administrative action before defining roles. Make parent/child,
   inheritance, isolation, split, merge, and transfer semantics explicit.
2. Separate legal or organizational authority, tenant ownership, billing
   authority, technical administration, security administration, data
   administration, delegated/reseller authority, internal support authority, and
   emergency authority. One contact or role must not silently imply all of them.
3. Model permissions as action + resource + scope + constraints + environment,
   independent of display role names. Bind every grant to an authorized grantor,
   source assertion, justification where required, effective time, expiry or
   review trigger, audit event, and revocation path.
4. Declare one canonical authority for each grant. Map IdP groups, SCIM data,
   in-product assignments, domain ownership, API/service principals, support
   overrides, and break-glass records into typed grants; do not let them become
   competing implicit truths.
5. Model joiner, mover, leaver, suspension, reactivation, contractor/service
   account, tenant transfer, and source outage paths. A mover is not only a join
   plus a later cleanup; remove incompatible old authority in the same governed
   transition.
6. Separate standing access, delegated access, requested access, temporary
   elevation, support impersonation, and break-glass. Match approval,
   notification, duration, evidence, monitoring, and post-use review to blast
   radius; do not create a hidden universal support or emergency role.
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
    tickets may supply evidence but must not become hidden grant authorities.
12. Separate `claimed`, `observed`, `verified`, `inferred`, `decision`, and
    `authority-pending`. Never invent actual grants, customer approvals, audit
    coverage, access-review completion, or operating control evidence.

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
current authority requires it.

### 5. Verify effectiveness

Test entitlement paths, negative permissions, inheritance, cross-tenant
isolation, JML races, owner loss, IdP/SCIM outage, support access, break-glass,
split/merge, audit coverage, exception expiry, and restoration. Report evidence
and gaps without claiming runtime enforcement from design artifacts alone.

## Owner handoffs

- Hand authentication ceremony, session/token handling, SAML/OIDC/SCIM connector
  code, and authorization enforcement implementation to their engineering owners
  under current Doctrine engineering and specification procedures.
- Use `account-recovery-review` for a legitimate user who lost authenticators,
  channels, sessions, or personal account access; consume this skill's tenant and
  admin authority when enterprise recovery needs it.
- Use `product-abuse-risk-review` for adaptive cross-product fraud or abuse
  controls; this skill owns authorized enterprise access, not abuse adjudication.
- Use `security-assurance-operations-review` for customer security evidence,
  questionnaires, control claims, compliance readiness, and non-access security
  exceptions.
- Use `customer-support-operations` for the whole support operating model; this
  skill only defines support authority and privileged evidence.
- Use current Doctrine incident, security, privacy, delivery, and engineering
  procedures for incidents, internal controls, implementation, and shipped proof.

## Hard gates

Reject or redesign an output that:

- treats SSO authentication, SCIM membership, a verified domain, billing contact,
  sales contact, or support ticket as universal tenant ownership;
- uses vague role names without exact action/resource/scope semantics;
- permits multiple silent grant authorities or cannot explain why access exists;
- defines joiners but leaves mover, leaver, suspension, owner loss, source outage,
  or tenant transfer behavior unspecified;
- creates standing support, impersonation, break-glass, or temporary access with
  no narrow scope, expiry, audit, notification policy, or post-use review;
- bundles unrelated high-impact powers into one convenience admin role without a
  decision-specific evidence and separation analysis;
- stores secrets or raw sensitive content in audit evidence, or claims audit
  coverage without emitted/queryable events for critical actions;
- calls access review complete from a sent campaign, unchecked attestations, or
  a list of role names without remediation evidence;
- automates destructive or cross-tenant change without idempotency, conflict
  handling, rollback/recovery, audit, and a current authority check.

## Output contract

Produce one **Enterprise Access Governance Contract** containing:

1. artifact ID, decision, tenant/resource/data-boundary model, principal and
   authority types, current sources, evidence labels, and unresolved conflicts;
2. permission registry, role templates, source-to-grant rules, inheritance and
   delegation, separation constraints, and safe customer explanations;
3. ownership, grant, JML, elevation, support, break-glass, review, exception,
   split/merge/transfer, revocation, and recovery state machines;
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
