# Backup & Restore Design — Cross-Platform Notes App

## 1. Data Model (Local-First Foundation)
- **CRDT note record** (Yjs/Automerge) per note: `id, ciphertext_blob, key_id, version_vector, parent_id, deleted_flag, tombstone_until`.
- **Attachments**: stored as content-addressed blobs (`sha256`) in a separate object store; note references `blob_hash`.
- **Metadata DB**: SQLite (per platform) with note index, sync state, device list, key envelope.
- **Append-only event log** (per device, 30 days) enables delta sync and point-in-time rebuild.

## 2. Encryption (E2EE)
- **Account key**: 32-byte master key derived via Argon2id from user passphrase + account salt; never leaves device.
- **Per-note data key (PNDK)**: random AES-256-GCM key wrapping note ciphertext. PNDK wrapped by account key → stored in key envelope.
- **Attachment keys**: per-blob random key, wrapped by a folder key, which is wrapped by account key.
- **Backup envelope**: `account_key_wrapped_blob_keys || IV || tag || version`. Server stores ciphertext only; cannot read content.

## 3. Backup Strategy
- **Continuous local snapshot** every 15 min → append-only WAL + checkpoint snapshot to local disk (encrypted).
- **Cloud backup tiers** (user-selectable, regional):
  - *Hot*: incremental, every sync, 90 days retention.
  - *Cold*: nightly full snapshot, 1-year retention, region-pinned (EU/US/APAC).
- **Object layout**: `{user_id}/{backup_type}/{date}/{shard_id}.bin` in S3-class storage with versioning + object lock (WORM) for cold tier → defeats ransomware deletes.
- **3-2-1 rule**: 2 encrypted copies in primary region (hot + cold), 1 cross-region encrypted copy, customer-managed KMS region isolation.

## 4. Restore Flows
| Scenario | Mechanism |
|---|---|
| **Device loss** | New device logs in → downloads account-key-wrapped PNDKs, unwraps locally with passphrase/biometric, replays event log, reconstructs CRDT state via version vectors. |
| **Ransomware corruption** | Detect via hash mismatch or anomalous mass deletes → restore from immutable cold snapshot (object-lock prevents tampering). |
| **Deleted-item recovery** | Tombstones retain blob for 30 days (configurable); UI "Trash" exposes them; after 30d, blobs purged (GDPR-compliant). |
| **User export** | ZIP with decrypted `notes.json`, attachments in folder, and `restore-manifest.json` (schema, version, checksums). Optional encrypted export with user passphrase. |
| **Support-assisted restore** | Support ships a one-time **recovery token**: a wrapped copy of master key derived from a pre-registered recovery code (Shamir 2-of-3 user/Support/device). Token decrypts on client; never reaches server in plaintext. Time-limited audit log entry. |
| **Regional restore** | Cross-region replicas allow region failover; client picks region at signup, can migrate with re-encryption under new region key. |

## 5. Sync vs. Backup
- Sync = CRDT convergence for live devices; **backup = authoritative cold copy** at last-known-good snapshot, independent of sync state. Backups survive compromised sync.

## 6. Proof That Restores Work
- **Synthetic canary restore** (weekly, server-side): restore last backup into isolated VM, verify SHA-256 of every blob, CRDT hash of corpus, count parity vs. manifest. Failure pages on-call.
- **User-side restore drill** (opt-in): restore to sandbox folder, diff counts/checksums against live DB, discard.
- **Integrity manifest** in every snapshot: `merkle_root, note_count, blob_count, last_event_id`. Restore refuses mismatched manifest unless `--force` + warning.
- **Signed attestations**: snapshots signed with device key; restore verifies signature chain back to enrollment.
- **Quarterly DR test**: full region restore, RTO ≤ 4 h, RPO ≤ 15 min; results published to status page.

## 7. Cross-Platform Notes
- Unified snapshot format (CBOR) read by iOS/Android/macOS/Windows/Linux/web.
- Native FUSE/extensions rehydrate SQLite on each platform.
- Attachments streamed via resumable range GETs.

## 8. Audit & Compliance
- Server logs: only ciphertext metadata (counts, timestamps, region). No plaintext.
- Recovery token use requires step-up auth + recorded reason.
- Regional pinning respected for GDPR/SOC2; cross-region copies encrypted with region-specific KEK.

**Result**: Users can restore after any failure mode, verify the restore's fidelity, and never expose plaintext to the server — while support can assist only with cryptographic co-operation from the user.
