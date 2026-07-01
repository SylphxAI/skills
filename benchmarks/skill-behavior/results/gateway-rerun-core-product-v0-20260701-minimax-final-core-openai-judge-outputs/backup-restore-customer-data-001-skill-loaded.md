```text
Data classes:
- Note bodies & metadata (titles, tags, folders, links) — user content, highest trust
- Attachments (images, PDFs, audio) — user content, larger blobs
- Local settings, UI state, last-opened — preferences
- Purchase/entitlement (Pro tier, AI credits) — immutable ledger
- Version history & tombstones for deletions — recovery data
- Sync state, device registry, conflict logs — operational
- Encryption keys (wrapped), key-checkpoint salts — secrets

Durability target:
- RPO: ≤ 60 seconds for note edits on at least one device; ≤ 24h for full snapshot guarantee
- RTO: ≤ 30 seconds to resume local read on new device after auth; ≤ 5 minutes full restore of 1y/100k notes incl. attachments
- Retention: 35 daily snapshots, 12 monthly, all deletions tombstoned 30 days, soft-delete 30 days, hard-delete after; user export never auto-deleted until user does
- Geo-pinned: EU, US, APAC; user chooses region at signup, change requires support with re-encryption
- Availability: 99.9% sync, 99.99% object storage

Backup design:
- Local-first: every write hits device WAL + IndexedDB/Core Data/SQLite; periodic snapshot every 6h or 500 edits
- Cloud sync: per-device append-only encrypted change-log, replicated to 3 AZs; attachments to region-pinned object store with erasure coding; snapshots every 6h plus continuous WAL
- E2EE: per-account DEK wraps content; KEK derived from user passphrase via Argon2id + HSM-stored recovery key wrapped to org pubkey; server stores only ciphertext + wrapped keys; quarterly key-rotation drill
- Versioning: every save is a new immutable version; attachments content-addressed
- Deletion: tombstones + 30-day soft-delete window; hard delete after 30 days only
- Ransomware: detect mass-edit anomaly (≥N edits/min from one device); auto-freeze sync, alert user, offer "restore from snapshot" wizard
- Encryption-at-rest (AES-256) and in-transit (TLS 1.3); backups encrypted with separate KEK class

Restore design:
- User-driven: signed-in new device downloads latest snapshot + WAL delta, verifies HMAC chain, decrypts locally
- Range restore: "restore version from <date>" or "before ransomware event"
- Attachments restored on-demand with prefetch heuristics
- Drill: nightly synthetic restore into isolated sandbox, sampled 1% of real accounts weekly, full drill quarterly; dashboard surfaces pass/fail

Conflict handling:
- Vector clock per note; ties resolved by content-merge for body, latest-write-wins for tags/folder, "keep both" when text diverges >30%
- Conflicts surfaced in a "Review" inbox; user picks or merges
- Cross-device deletes: tombstone wins; restoring user gets "this note was deleted on <device>"

Support/admin tooling:
- Support holds a wrapped-org-recovery-key only; never sees plaintext
- "Recover account" requires user-signed request + ID verification; org unwraps recovery key, issues wrapped data blob to user's new passphrase
- All restore attempts logged with actor, scope, ciphertext hash, timestamp
- Admin cannot read note content; can only verify integrity hash and trigger re-issue
- Read-only integrity view for support to confirm "this snapshot exists and verifies"

Failure modes:
- Lost device → sign in on new device, recover from cloud snapshot
- App reinstall → re-auth, restore from cloud
- Ransomware → freeze device, snapshot-restore wizard, key re-issuance if KEK suspected
- Region outage → cross-region read-only via replicated snapshot; writes queued
- Key loss (passphrase) → recovery key or support-assisted re-wrap
- Partial restore → "which folders to keep" prompt; support-assisted if metadata corrupt
- Backup tampering → HMAC chain break detected; refuse restore, escalate

Proof restores work:
- Nightly automated restore drill on staging
- Sampled weekly restore against real (anonymized) accounts
- Public status page with restore-drill pass rate
- Quarterly attested drill report signed by ops

Events:
backup_scheduled, backup_started, backup_completed, backup_failed, restore_requested, restore_started, restore_conflict_detected, restore_completed, restore_partial, restore_failed, export_requested, export_completed, restore_drill_passed, restore_drill_failed, sync_frozen_anomaly, support_recovery_initiated
```
