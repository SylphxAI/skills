## Backup and Restore Design

### 1. Principles and Scope
- **Local-first:** every device stores a complete encrypted replica of the user’s notes metadata and locally available content.
- **Cloud sync is not a backup by itself:** sync propagates valid changes, including deletes; backups retain historical recoverable states.
- **End-to-end encrypted:** server never sees plaintext notes, attachments, or user keys.
- **Recoverable from:** accidental deletion, device loss, cloud/account compromise, ransomware-like local corruption, bad client release, and user-driven export needs.

---

## 2. Data Model

### Objects
- **Notes, folders, tags, settings:** stored as immutable encrypted change records.
- **Attachments:** stored as encrypted content-addressed blobs.
- **Deletes:** represented as tombstones, not immediate physical removal.
- **Versions:** each note has append-only revisions.

### Encryption
- Per-user **Root Key**, generated client-side.
- Root Key encrypts:
  - note/content keys,
  - attachment keys,
  - backup manifest keys.
- Root Key protected by:
  - user password-derived key,
  - optional device hardware keystore,
  - optional recovery key / recovery contact mechanism.
- Cloud stores only ciphertext, encrypted manifests, blob hashes, timestamps, and account metadata.

---

## 3. Backup Layers

### A. Continuous Sync Journal
- Append-only encrypted operation log.
- Used for multi-device sync and short-term rollback.
- Server rejects malformed or non-monotonic records.

### B. Cloud Point-in-Time Backups
- Periodic encrypted snapshots of user state:
  - hourly for 24 hours,
  - daily for 30 days,
  - weekly for 12 months,
  - monthly for paid/business plans as configured.
- Snapshots contain:
  - encrypted manifest,
  - note revision references,
  - attachment blob references,
  - tombstones,
  - client schema version.
- Deduplicated by encrypted blob hash/reference.
- Backups are immutable for their retention period.

### C. Local Device Backups
- App maintains encrypted local database and rolling local snapshots.
- On desktop, supports optional backup folder chosen by user.
- On mobile, integrates with OS backup only using app-encrypted payloads.

### D. User Export
Supported formats:
- **Encrypted full export:** `.notesbackup` containing encrypted notes, attachments, manifests, and revision history.
- **Plaintext export:** Markdown/HTML/PDF plus attachments, user-confirmed and locally generated only.
- Export includes checksum manifest and restore instructions.
- Plaintext export warns that E2EE no longer applies.

---

## 4. Deleted-Item Recovery

- Deleted notes move to **Trash** for default 30 days.
- User may restore from Trash instantly.
- After Trash expiry:
  - tombstones remain in backup snapshots until backup retention expires.
  - restore possible via point-in-time restore.
- Permanent delete:
  - removes item from active state and future backups,
  - existing immutable backups retain data until configured retention/legal hold expires,
  - UI must disclose this clearly.

---

## 5. Restore Workflows

### A. New Device / Device Loss
1. User authenticates.
2. User provides password, recovery key, or approved recovery method.
3. Client downloads encrypted latest snapshot and journal tail.
4. Client verifies manifest signatures/checksums.
5. Client decrypts locally.
6. Attachments hydrate lazily or eagerly based on user preference.

### B. Accidental Delete
- Restore from Trash if available.
- Otherwise choose point-in-time snapshot.
- Restore options:
  - restore selected note/folder,
  - restore entire account to a previous point,
  - restore into separate “Recovered” folder to avoid overwriting current work.

### C. Ransomware-like Corruption
Examples: mass note encryption, mass deletion, malformed edits.
Controls:
- anomaly detection for bulk destructive operations,
- delayed propagation prompt on other devices,
- immutable cloud snapshots,
- ability to roll back to last known-good point.
Restore:
- user selects pre-incident snapshot,
- system previews affected object count,
- restore writes new valid records rather than mutating old backups.

### D. Bad Client Release / Schema Bug
- Backups record client and schema version.
- Server can pause sync for known-bad client versions.
- Restore uses migration-tested readers.
- If needed, restore to prior schema then migrate forward.

### E. Support-Assisted Restore
- Support cannot decrypt user data.
- Support can:
  - list available encrypted backup points,
  - help user select timestamp/device,
  - trigger server-side preparation of encrypted restore package,
  - observe restore job status and errors.
- User must decrypt locally.
- Any support action requires:
  - strong user authentication,
  - explicit consent,
  - scoped time-limited authorization,
  - audit log entry.

---

## 6. Regional Storage

- User selects or is assigned a storage region at account creation.
- Active sync data, backup snapshots, attachment blobs, and metadata remain in-region.
- Cross-region transfer only if:
  - user requests migration,
  - legally required,
  - or disaster recovery policy explicitly permits it.
- Regional restore uses backups from the same region.
- Region migration:
  - copy encrypted data,
  - verify checksums,
  - switch active region,
  - retain source for short rollback window,
  - then purge per policy.

---

## 7. Integrity, Authenticity, and Anti-Corruption

Each backup includes:
- encrypted manifest,
- object IDs and versions,
- attachment references,
- cryptographic hashes,
- manifest signature/MAC,
- creation time,
- schema version,
- source region,
- client version.

Restore client verifies:
- manifest integrity,
- blob integrity,
- revision graph consistency,
- tombstone consistency,
- attachment availability,
- key availability.

Backups are:
- immutable,
- append-only,
- access-controlled,
- retention-managed,
- separately permissioned from normal sync writes.

---

## 8. Key Recovery and Account Recovery

Supported recovery options:
- user-saved recovery key,
- recovery contact/social recovery,
- enterprise escrow for managed accounts,
- additional trusted device approval.

Not supported:
- provider decrypting personal user data without recovery material.

If user loses all devices, password, and recovery material:
- encrypted data is unrecoverable by design.
- account may be reset, but old encrypted content cannot be restored.

---

## 9. Restore Testing and Proof

### Automated Tests
- Nightly restore drills from production-like encrypted backups.
- Random account fixtures with:
  - notes,
  - revisions,
  - deletes,
  - large attachments,
  - corrupt records,
  - old schemas.
- Verify byte-level attachment recovery and semantic note equality.

### Production Restore Verification
For each backup:
- create manifest checksum,
- sample-verify referenced blobs,
- periodically perform full restore into isolated test environment using synthetic accounts.

### User-Visible Proof
- “Last backup verified at” timestamp.
- Backup health status:
  - complete,
  - degraded,
  - missing attachments,
  - key unavailable,
  - restore test failed.
- Before destructive restore:
  - show preview counts,
  - notes,
  - attachments,
  - deleted items,
  - estimated download size.

### Audit Evidence
Maintain immutable logs for:
- backup creation,
- verification result,
- restore initiation,
- support access,
- region migration,
- retention deletion.

Metrics:
- backup success rate,
- restore success rate,
- restore time objective,
- recovery point objective,
- missing blob rate,
- corrupt snapshot rate.

---

## 10. Target RPO/RTO

Default consumer targets:
- **RPO:** under 1 hour for cloud-backed users.
- **RTO:** minutes for metadata, longer for large attachments.

Enterprise targets configurable by plan and region.
