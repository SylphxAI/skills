---
name: product-recovery-contract-review
description: Design or audit a product-level user-data durability and recovery contract spanning backup, restore, same-product export/re-import, device replacement, version compatibility, entitlement recovery, deletion, and support-assisted recovery. Use when the independently accepted artifact is a user-facing recovery model plus requirements for downstream engineering. Do not use for infrastructure disaster recovery, database replication, deployment rollout, incident command, sync-conflict algorithms alone, account-authentication recovery, or customer data import and cutover from a different product.
---

# Product Recovery Contract Review

Design what the product promises users before prescribing how infrastructure
implements it.

## Workflow

1. Define the recovery jobs: device replacement, reinstall, accidental deletion,
   corruption, account recovery, migration, downgrade, export/import, entitlement
   replay, or regional/service loss.
2. Inventory data classes and authorities: user content, derived data, settings,
   collaboration state, purchases/entitlements, audit records, caches, secrets,
   tombstones, and deletion obligations.
3. Read `references/product-recovery-contract.md`.
4. Specify the product durability contract for each data class: user-visible
   recovery point/time, retention, version compatibility, deletion behavior,
   restore granularity, conflict policy, and evidence shown to the user.
5. Model restore states, preflight checks, identity/authorization, preview,
   conflict handling, commit, verification, undo, partial failure, and support
   escalation. Preserve provenance and idempotency across retries.
6. Define privacy and key-custody boundaries. For end-to-end encryption, keep
   plaintext and recovery authority consistent with the advertised trust model.
7. Emit a downstream engineering handoff containing requirements and acceptance
   evidence only. Load the applicable Doctrine engineering, delivery, incident,
   and reliability standards for infrastructure DR, rollout, drills, and SLOs.
8. Produce the product contract, data-class matrix, restore state model,
   support boundary, telemetry contract, acceptance scenarios, and open risks.

## When not to use

- This skill owns product semantics and an independently acceptable recovery
  artifact; it does not own storage topology, replication, backup jobs, cloud
  configuration, deployment rollout, or incident operations.
- For sync merge semantics without backup/restore, use
  `offline-sync-conflict-review`.
- For account authentication recovery, define only the dependency and hand off
  identity proofing to `account-recovery-review`.
- For onboarding, mapping, rehearsal, cutover, reconciliation, and acceptance of
  data arriving from a different product, use `customer-data-migration-review`.
- For engineering DR, provide the product RPO/RTO, data classes, invariants, and
  acceptance tests, then defer implementation and operational proof to Doctrine.

## Guardrails

- Never call data recoverable until an exact restore path has produced retained
  verification evidence against the same product contract.
- Never let restore bypass tenancy, authorization, deletion, retention, legal
  hold, or entitlement authority.
- Never treat sync, backup, export, archive, replica, and disaster recovery as
  interchangeable.
- Never make support a hidden decryption or unilateral account-takeover channel.
- Never silently overwrite user-created content; preview, preserve both, merge,
  or require an explicit authorized choice according to the data class.
- Mark unsupported combinations and unknown current system facts as blocked;
  do not invent infrastructure capabilities.

## Output

```text
Recovery jobs and promise:
- user scenario / product-visible RPO and RTO / exclusions

Data-class contract:
| Data class | Authority | Backup/export | Retention/deletion | Restore granularity | Conflict/version rule |
| --- | --- | --- | --- | --- | --- |

Restore journey:
- preflight -> preview -> authorize -> restore -> verify -> undo/escalate

Trust and support boundary:
- key custody / tenancy / support-visible metadata / prohibited actions

Engineering handoff:
- invariants / required capabilities / acceptance scenarios / evidence contract
- explicitly out of scope: topology, rollout, runbook, drill execution, SLO gate

Risks and unresolved facts:
- fact / source required / owner / blocked decision
```
