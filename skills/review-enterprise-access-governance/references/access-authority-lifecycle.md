# Access Authority and Lifecycle

Use this reference to turn role labels and identity feeds into explainable,
reconcilable enterprise authority.

## Contents

- [Canonical entities](#canonical-entities)
- [Permission and grant contract](#permission-and-grant-contract)
- [State models](#state-models)
- [Source-to-grant decision table](#source-to-grant-decision-table)
- [Delegation and inheritance](#delegation-and-inheritance)
- [Tenant split, merge, and transfer](#tenant-split-merge-and-transfer)
- [Reconciliation invariant](#reconciliation-invariant)

## Canonical entities

Model at least the entities relevant to the product:

| Entity | Required semantics |
| --- | --- |
| Tenant/resource | Stable ID, hierarchy, data boundary, environment, lifecycle |
| Principal | Human, service, group, delegated party, support actor, emergency actor |
| Authority | Who may create or approve a specific type of grant |
| Permission | Action, resource type, scope, constraints, environment, risk class |
| Role template | Versioned set of permission references; never the permission truth itself |
| Source assertion | IdP/SCIM/in-product/domain/contract/support fact with source and freshness |
| Grant | Principal + permission/role + scope + authority + source + effective/expiry |
| Delegation | Granting relationship, subdelegation rule, boundary, expiry, revocation |
| Elevation | Requested temporary privilege with evidence, approver, duration, session |
| Ownership | Typed tenant, billing, legal, technical, or resource authority |
| Review | Population snapshot, reviewer authority, decision, remediation, evidence |
| Exception | Narrow deviation, risk owner, control, expiry, monitoring, remediation |
| Audit event | Append-only evidence of decision/action/result and authority path |

Use stable IDs and versions. Keep human-friendly names as projections. A renamed
role must not silently alter semantics; a changed role template must identify
which existing grants are pinned, migrated, re-reviewed, or revoked.

## Permission and grant contract

Represent a permission as:

```text
permission_id / version / action / resource_type / scope_dimension
constraints / environment / data_class / risk_class / owner
```

Represent a grant as:

```text
grant_id / tenant_id / principal_id / permission_or_role_version / scope
grant_authority_type / grantor_id / source_assertion_ids / justification
effective_at / expires_at_or_review_trigger / status / revoked_at / reason
```

The effective entitlement is a projection of valid grants after hierarchy,
inheritance, constraints, denials or separation rules, environment, and current
source status. Preserve the contributing grant paths so the product can explain
why access exists and revoke the correct cause.

Do not make a cache, identity token, UI checkbox, SCIM group, or audit export a
second entitlement authority. Define its projection/reconciliation relationship.

## State models

### Tenant ownership

```text
tenant_requested -> ownership_claimed -> authority_verified -> active
       |                    |                    |             |
       v                    v                    v             v
duplicate_or_conflict  evidence_pending     rejected     transfer_requested

transfer_requested -> impact_mapped -> old_and_new_authority_bound -> transferred
         |                    |                         |                 |
         v                    v                         v                 v
   dispute_opened       split_or_merge_needed       approval_gap     review_due
```

### Grant lifecycle

```text
requested -> source_resolved -> policy_evaluated -> approved -> effective
    |                |                  |               |           |
    v                v                  v               v           v
invalid_scope  source_conflict    separation_conflict  denied   review_or_expiry_due

review_or_expiry_due -> kept_or_changed -> revoked -> reconciled
          |                   |              |             |
          v                   v              v             v
    review_overdue       replacement_grant  usage_blocked  evidence_closed
```

### Joiner, mover, leaver, and suspension

- **Joiner:** establish principal and source, evaluate intended grants, avoid
  privilege before authoritative membership exists, and verify usable access.
- **Mover:** calculate desired old/new diff, remove incompatible authority, apply
  new authority, transfer owned resources, and verify no privilege accumulation.
- **Leaver:** stop new access, revoke sessions/grants through the implementation
  owner, transfer ownership, handle legal/retention needs, and prove closure.
- **Suspension:** distinguish temporary access block from deletion or leaver;
  define active sessions, service dependencies, notifications, review, and resume.
- **Reactivation:** re-evaluate current source and policy; do not blindly restore
  the historical entitlement snapshot.
- **Service/contractor:** bind owner, purpose, non-human lifecycle or end date,
  secret/credential owner, usage evidence, and orphan detection.

Handle out-of-order, duplicate, delayed, conflicting, and replayed lifecycle
events idempotently. Define the authoritative event time and reconciliation rule.

## Source-to-grant decision table

| Situation | Valid product interpretation | Required response | Failure to avoid |
| --- | --- | --- | --- |
| IdP group maps to role | Source assertion for a declared mapping | Apply versioned rule and record grant path | Group name becomes permission semantics |
| SCIM user disappears | Possible deprovision event, subject to source policy | Reconcile, block/queue safely, verify ownership transfer | Silent permanent deletion |
| IdP/SCIM unavailable | Authority freshness unknown | Apply declared fail/degrade window and alert | Universal allow or universal revoke |
| In-product admin differs from IdP | Explicit source conflict | Freeze risky new grants and route resolution | Last write silently wins |
| Domain claim overlaps tenant | Ownership conflict, not authentication proof | Require typed ownership evidence and safe dispute path | Tenant takeover |
| Support requests override | Temporary support authority request | Bind ticket/consent, scope, expiry, audit | Shadow superuser |
| Role template changes | Policy migration affecting grants | Diff blast radius and migrate/review by rule | Silent privilege expansion |
| Parent tenant restructures | Hierarchy and data-boundary change | Model split/merge/transfer and affected grants | Cross-tenant data exposure |

## Delegation and inheritance

Define delegation by resource subtree, allowed actions, data class, environment,
ability to subdelegate, maximum duration, approval requirement, and revocation
authority. Keep these actors separate:

- customer tenant owner and delegated customer admin;
- parent/subsidiary or workspace admin;
- reseller/channel or managed-service administrator;
- marketplace seller/organization administrator;
- internal support or implementation operator;
- emergency/break-glass actor.

Make inherited access visible to the customer admin and review system. Revoking a
direct grant must not appear to remove access that remains inherited; conversely,
moving a resource must recompute inherited paths before completion.

## Tenant split, merge, and transfer

Before changing hierarchy or ownership, enumerate:

1. resources and data boundaries;
2. tenant, legal, billing, security, technical, and domain authorities;
3. principals, groups, grants, delegations, service accounts, integrations, and
   support exceptions;
4. identity namespaces, SSO/SCIM mappings, domains, invitations, and sessions;
5. audit continuity, retention, export/deletion constraints, and customer notice;
6. rollback or pause boundary before irreversible data movement;
7. post-change reconciliation, orphan detection, and approval evidence.

Treat data movement and infrastructure implementation as owner handoffs. This
contract decides access semantics and proof, not storage migration mechanics.

## Reconciliation invariant

For every effective privileged capability, the system must be able to answer:

```text
who has it / on what / through which grant paths / from which current authority
why it was granted / what constraints apply / when it expires or is reviewed
which actions used it / who can revoke it / what happens if the source disappears
```

Reconciliation compares desired grants, actual enforcement projection, source
assertions, and auditable actions. A clean desired-state table without runtime
evidence is not proof that enforcement matches it.
