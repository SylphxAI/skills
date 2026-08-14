# review-product-recovery-contract

# Review Product Recovery Contract Review

Shared rhythm: [review-playbook-skeleton.md](references/review-playbook-skeleton.md).

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
   evidence only. Load `engineering-standard`, `delivery-standard`, and
   `run-incident-response` for infrastructure DR, rollout, drills, and SLOs.
8. Produce the product contract, data-class matrix, restore state model,
   support boundary, telemetry contract, acceptance scenarios, and open risks.

## Path

- Recoverable means an exact restore path has produced retained verification against the same product contract.
- Restore keeps tenancy, authorization, deletion, retention, legal hold, and entitlement authority.
- Sync, backup, export, archive, replica, and disaster recovery stay named as distinct paths.
- Support is a case channel. Decryption and account takeover stay with their owning authority.
- User-created content uses preview, preserve-both, merge, or an explicit authorized choice for that data class.
- Unsupported combinations and unknown system facts stay blocked.

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
