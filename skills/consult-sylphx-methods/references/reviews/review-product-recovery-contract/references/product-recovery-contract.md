# Product Recovery Contract Patterns

## Contents

- [Ownership split](#ownership-split)
- [Data-class contract](#data-class-contract)
- [Restore state model](#restore-state-model)
- [Rule IDs](#rule-ids)
- [Decision table](#decision-table)
- [Product evidence and events](#product-evidence-and-events)

## Ownership split

| This product artifact owns | Downstream engineering owns under binding Skills |
| --- | --- |
| recovery jobs and user promise | storage topology and replication |
| data-class authority and restore semantics | backup job implementation and capacity |
| restore UX, authorization, preview, conflicts, undo | deployment, migration, canary, rollback |
| key-custody and support boundary | incident command and operational runbooks |
| product RPO/RTO and acceptance scenarios | infrastructure SLOs, drills, alerts, live proof |
| telemetry/evidence required by the product | exact observability and evidence implementation |

Do not copy the engineering standard into this skill. Emit stable handoff
requirements, then load the current upstream standards in the owning project.

## Data-class contract

| Data class | Typical authority | Restore concern |
| --- | --- | --- |
| User-created content | user/account workspace | versions, attachments, sharing, provenance |
| Collaborative state | workspace plus object ACL | membership at snapshot vs restore time |
| Purchases/entitlements | signed store or billing ledger | replay, revocation, refund, duplicate grant |
| Preferences | user/device | low-risk merge or reset |
| Derived/index data | canonical source data | rebuild instead of restore when possible |
| Deletion tombstones | privacy/deletion ledger | prevent resurrection by an older snapshot |
| Audit/legal-hold records | policy authority | retention and access separation |
| Secrets/keys | key-management authority | avoid backup or use explicit protected recovery |

## Restore state model

```text
requested -> identity_verified -> snapshot_eligible -> preview_ready
preview_ready -> conflict_decided -> restore_committed -> integrity_verified
integrity_verified -> user_confirmed -> complete

identity_failed -> denied
snapshot_ineligible -> blocked_with_reason
restore_committed -> partial_failure -> resume_or_compensate
integrity_failed -> quarantined -> support_escalation
complete -> undo_requested -> compensating_restore
```

Treat each transition as idempotent. Store an operation ID, actor, tenant,
snapshot/version, policy version, before/after manifest, and decision reason.

## Rule IDs

- `backup-product-1` — Express RPO/RTO as a user scenario and visible outcome,
  not only an infrastructure number.
- `backup-product-2` — Assign one authority per data class; distinguish canonical
  data, derived data, entitlement ledgers, tombstones, and secrets.
- `backup-product-3` — Keep sync, backup, immutable recovery point, export,
  archive, replica, and DR as different contracts.
- `backup-product-4` — Restore through current identity, tenant, object ACL,
  entitlement, retention, deletion, and legal-hold decisions.
- `backup-product-5` — Preserve deletion tombstones so older snapshots cannot
  silently resurrect data that policy says is gone.
- `backup-product-6` — Preflight schema/app-version compatibility and define
  forward migration, downgrade, quarantine, or blocked outcomes.
- `backup-product-7` — Preview destructive scope and use merge, keep-both,
  selective restore, or explicit overwrite according to data-class risk.
- `backup-product-8` — Make retries idempotent and partial restores resumable or
  compensatable; do not duplicate entitlements or side effects.
- `backup-product-9` — Verify logical invariants, object counts, references,
  provenance, and user-visible outcomes—not checksums alone.
- `backup-product-10` — Expose support-safe metadata such as snapshot existence,
  eligibility, integrity state, and trace ID without expanding plaintext or key
  authority.
- `backup-product-11` — For E2EE, describe recovery-key, device, social, or
  enterprise-escrow semantics explicitly and preserve the advertised trust model.
- `backup-product-12` — Separate billing/store entitlement replay from content
  restore and honor refunds, revocations, consumables, and duplicate-event rules.
- `backup-product-13` — Define export portability with versioned manifest,
  stable identifiers, attachments, relationship semantics, and import limits.
- `backup-product-14` — Hand engineering exact invariants and acceptance
  scenarios; do not fabricate the implementation or claim a completed drill.

## Decision table

| Scenario | Product decision | Required acceptance evidence |
| --- | --- | --- |
| Device replacement | recover account-scoped durable state; identify device-only exclusions | representative user completes recovery on a clean device |
| Accidental deletion | undo or point-in-time/selective restore within stated window | deleted object, relationships, and audit outcome verified |
| Old snapshot after erasure | preserve deletion outcome | tombstoned data remains absent or is lawfully quarantined |
| Cross-version restore | migrate, read-only open, or block with reason | fixture across supported source/target versions |
| E2EE recovery | use advertised client/escrow authority only | support cannot access plaintext outside the declared model |
| Entitlement replay | reconcile against canonical ledger | refunded/revoked item stays revoked; duplicate grant impossible |
| Partial restore | resume or compensate under same operation ID | no duplicated side effects; unresolved items are enumerated |
| Tenant membership changed | re-evaluate current authorization | historical snapshot does not grant current unauthorized access |

## Product evidence and events

Required acceptance evidence includes operation identity, source snapshot,
product/schema versions, selected scope, authorization result, conflicts,
before/after logical manifest, invariant checks, user confirmation, and unresolved
items. Engineering determines how to produce and retain the exact evidence.

Track `recovery_requested`, `recovery_preflight_completed`, `recovery_blocked`,
`recovery_previewed`, `recovery_conflict_decided`, `recovery_committed`,
`recovery_integrity_verified`, `recovery_partial`, `recovery_undone`, and
`entitlement_reconciled` with no content payloads or secrets in analytics.
