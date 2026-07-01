<think>
The user wants a backup/restore design for a cross-platform notes app with very specific requirements. I need to follow the skill's output format and keep it under 650 words. Let me structure this carefully.

Key requirements:
- Cross-platform notes app
- Local-first data
- Cloud sync
- E2EE
- Attachments
- Deleted-item recovery
- Device loss recovery
- Ransomware-like corruption recovery
- User export
- Regional storage
- Support-assisted restore
- Proof restores work

I'll follow the skill formatexactly.
</think>

```text
Data classes:
- Note bodies + attachments (user-created, highest trust)
- Folder/label/note metadata, share links
- Per-device sync state (vector clocks, change log)
- Local app settings/preferences (theme, editor)
- Purchase/entitlement ledger (Pro plan, seats)
- Operational: audit log, support tickets, restore drill evidence
- Secrets: KEK/DEK envelope; key-version refs only
- Analytics: aggregate, never part of restore

Durability target:
99.999999% (multi-region, immutable cold + hot sync), backup-1.

RPO/RTO and retention:
- RPO: 5 min for hot sync snapshot; daily for immutable cold.
- RTO: 2 min last-edit recovery from device; 2 hr full account restore from cloud; 24 hr cold-region restore.
- Retention: 30 day hot sync history; 35 day immutable cold; 90 day tombstone (soft-delete); 7 yr cold audit.

Backup design:
- Client-side: device-local WAL + SQLite checkpoint, encrypted with per-note DEK under per-account KEK.
- Cloud hot sync: append-only note log (encrypted blobs + manifest) replicated >=3 regions, backup-11.
- Immutable cold: daily object-lock (compliance mode) snapshot of full vault + manifest to separate provider/region.
- Attachments: chunked, content-addressed, deduped, encrypted; stored same lifecycle.
- Tombstone log for soft-delete; hard-purge after 90 day.

Restore design:
- Device reinstall: reauth -> fetch latest manifest -> stream decrypt -> local rebuild.
- Device loss: same flow on new device; old device tokens revoked.
- Single-note restore: pick snapshot version, decrypt, write as new note revision, never silent overwrite.
- Account-level restore: support-assisted with client-signed nonce; ciphertext only, backup-10.
- State machine: requested -> preparing -> restoring -> verifying -> complete | conflict | partial_restore | support_required.

Conflict handling:
- Note metadata: CRDT (per-field LWW with vector clock).
- Note body: keep both copies as competing revisions; user picks.
- Folder moves: LWW; on conflict surface both paths.
- Tombstone vs restored edit: tombstone wins for 90 day grace, then editable.
- All conflicts logged as restore_conflict_detected, backup-8.

Security/privacy:
- E2EE: account KEK derived from user passphrase (Argon2id) + device-held recovery key; client-only plaintext, backup-7/10.
- Backups are ciphertext blobs; cloud sees metadata + key-version, not keys.
- Soft-delete + 90 day window allows user to undo ransomware-style overwrites by rolling back to a pre-incident snapshot.
- All restore/admin actions write to immutable audit log with actor, region, snapshot ID.

Support/admin tooling:
- View: snapshot exists, region, retention class, manifest hash, key-version, last restore attempt.
- Actions: trigger re-issue of wrapped DEK to user, schedule re-download, mark tamper-evident.
- Cannot: decrypt user notes, recover passphrase, force overwrite, backup-10.

Restore proof:
- Runbook: trigger -> identity verify -> manifest pick -> dry-run decrypt in sandbox -> checksum verify -> user confirm -> apply -> rollback path -> PIR review.
- Manifest per snapshot: schema ver, object count, byte count, per-object hash, attachment hashes, region, retention class, KEK version.
- Drill: nightly staging + weekly sampled prod-equivalent vault; PiT restore + tamper drill; evidence retained 1 yr; pass-rate SLO 99%.
- Alerts: backup lag >10 min, hash mismatch, restore drill failure, region replication lag >30 min, stale snapshot, retention purge fail, cost anomaly, backup-12.

User export:
- Export produces encrypted bundle + plaintext ZIP (user's choice); manifest with schema ver, checksums, attachment list, re-import guide; export_requested/export_completed events.

Failure modes:
- Lost passphrase + recovery key: unrecoverable; surface during onboarding, store recovery key offline.
- Ransomware overwrite: rollback to pre-incident cold snapshot via 90 day tombstones.
- Region outage: failover to replica; cold restore within 24 hr.
- Key rotation: dual-key window; old snapshots re-wrap in background.
- Partial restore: surface missing note IDs; offer re-fetch.
- Support social-engineering: cannot decrypt; client-signed nonce required.
- Stale tombstone: user can undelete within 90 day.
- Conflict storm: rate-limit, queue, notify.

Events: backup_scheduled/started/completed/failed; restore_requested/started/conflict_detected/completed/partial/failed; export_requested/completed; audit: admin_view, admin_reissue, tamper_drill.
```
