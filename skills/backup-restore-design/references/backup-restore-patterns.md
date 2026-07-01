# Backup and Restore Patterns

## Data classification

| Data | Examples | Backup need |
| --- | --- | --- |
| User-created content | files, notes, projects, saves | highest product trust |
| Purchase/entitlement | receipts, grants, subscriptions | immutable ledger |
| Settings/preferences | local config, UI state | convenience, migration |
| Operational data | jobs, logs, audit, support | debugging/compliance |
| Secrets | tokens, keys | encrypted, minimal exposure |
| Analytics | events, aggregates | business intelligence, not user restore |

## Rules

- `backup-1` — Define RPO and RTO in user terms, not only infrastructure terms.
- `backup-2` — Backup without restore drills is theater.
- `backup-3` — Keep purchase/entitlement ledgers immutable and replayable.
- `backup-4` — Provide user export for user-owned data where practical.
- `backup-5` — Make destructive actions reversible or clearly final.
- `backup-6` — Handle device replacement and app reinstall explicitly.
- `backup-7` — Encrypt backups containing private user data.
- `backup-8` — Log restore attempts, success, partial restore, and user-visible conflicts.
- `backup-9` — Restore proof needs a procedural runbook, manifest/checksum verification, sampled drills, retained evidence, owners, alerts, and review cadence.
- `backup-10` — For E2EE products, support can verify ciphertext existence/integrity and guide client-side recovery; do not give support plaintext, master keys, or unilateral key unwrap authority.
- `backup-11` — Separate sync, hot backup, immutable cold backup, export, and support-assisted restore; each has different trust and recovery semantics.
- `backup-12` — Define operational guardrails: backup lag, restore success rate, drill pass rate, storage growth, regional replication health, cost budget, and stale snapshot alerts.

## Restore state machine

```text
requested -> preparing -> restoring -> verifying -> complete
                         |             |
                         v             v
                      conflict      partial_restore
                         |             |
                         v             v
                      user_choice   support_required
```

## Conflict strategies

- Latest-write-wins only for low-risk preferences.
- Merge where content can be merged safely.
- Keep both copies for user-generated content.
- Require explicit user/support choice for destructive overwrites.

## Events

```text
backup_scheduled
backup_started
backup_completed
backup_failed
restore_requested
restore_started
restore_conflict_detected
restore_completed
restore_partial
restore_failed
export_requested
export_completed
```

## Restore proof checklist

- RPO/RTO stated in user terms, for example "recover notes changed in the last 15 minutes within 2 hours".
- Restore runbook lists trigger, owner, pre-checks, snapshot selection, key availability, dry-run restore, checksum verification, user confirmation, rollback, and post-incident review.
- Every snapshot has a manifest with schema version, object count, byte count, content hashes, attachment hashes, region, retention class, and encryption key ID or key-version reference.
- Automated restore drill runs at least nightly in staging and sampled production-equivalent accounts; keep evidence for audit review.
- Support tooling shows snapshot existence, integrity status, restore eligibility, region, and trace IDs without exposing plaintext.
- Export includes a manifest, checksums, attachments, schema version, and re-import instructions.
- Alerts cover backup lag, failed backup, missing cold snapshot, restore drill failure, hash mismatch, regional replication lag, retention purge failure, and storage-cost anomaly.
