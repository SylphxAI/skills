# Offline Sync Conflict Patterns

## Sync state machine

```text
online_idle -> offline_detected -> local_mutation_queued -> reconnect_detected -> auth_refreshed -> sync_uploading -> server_validating -> merge_resolved -> synced
      |              |                    |                    |                |                 |                   |                |
      v              v                    v                    v                v                 v                   v                v
 read_only_mode  storage_full        queue_blocked       token_expired      upload_failed    conflict_detected   manual_review   data_loss_report
```

## Rule IDs

- `offline-sync-1` — Classify every entity by merge safety: append-only, user-owned editable, collaborative, derived cache, financial/legal, permission, or destructive.
- `offline-sync-2` — Store queued mutations with stable client IDs, causal metadata, idempotency keys, and user-visible pending state.
- `offline-sync-3` — Use tombstones for deletes so reconnect does not resurrect removed records.
- `offline-sync-4` — Define conflict policy per field or entity: server wins, client wins, field merge, manual merge, CRDT, or reject and retry.
- `offline-sync-5` — Sync UI must show pending, saving, offline, conflict, retrying, failed, and synced states without panic copy.
- `offline-sync-6` — Attachment sync needs chunk retry, checksum, placeholder state, and orphan cleanup.
- `offline-sync-7` — Auth expiry during reconnect needs safe pause, re-auth, and replay without duplicate writes.
- `offline-sync-8` — Offline storage needs limits, encryption where appropriate, clear cache policy, and privacy-aware logs.
- `offline-sync-9` — QA must simulate device clock skew, multi-device edits, deletes, app kill, reinstall, flaky network, and server validation failures.
- `offline-sync-10` — Analytics should distinguish perceived reliability from actual conflict or data-loss incidents.

## Decision table

| Data type | Conflict policy | UI requirement | Unsafe shortcut |
| --- | --- | --- | --- |
| Notes or drafts | Field merge or manual merge | Compare changes and keep both | Silent overwrite |
| Chat messages | Append-only ordered log | Pending and failed-send states | Reordering without timestamp/source |
| Settings preference | Last-writer only if reversible | Show device/source if surprising | Hidden cross-device change |
| Payment/inventory action | Server authority, reject duplicate | Clear failed/offline restriction | LWW or replay without idempotency |
| Media upload | Chunked retry with checksum | Placeholder and retry action | Losing caption/metadata when upload fails |

## Offline QA checklist

- Queued writes survive app restart and network flapping.
- Replayed writes are idempotent and preserve user intent.
- Deletes, attachments, and server validation failures have explicit behavior.
- Conflict UI gives safe choices and does not blame the user.
- Metrics show queue age, conflicts, retries, failures, and manual resolutions.
- Support can diagnose sync incidents without raw private data.

## Event schema

Track: `offline_mode_entered`, `offline_mutation_queued`, `sync_reconnect_started`, `sync_upload_failed`, `sync_conflict_detected`, `sync_conflict_resolved`, `sync_queue_drained`, `sync_data_loss_reported`.

Recommended properties: `entity_type`, `mutation_type`, `queue_age_seconds`, `queue_depth`, `device_count_bucket`, `conflict_policy`, `resolution_type`, `retry_count`, `auth_refresh_required`, `attachment_present`, `storage_pressure`, `outcome`.
