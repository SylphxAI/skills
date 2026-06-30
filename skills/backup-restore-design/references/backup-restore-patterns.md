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
