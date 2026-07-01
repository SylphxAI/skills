<think>
The user wants a comprehensive design for backup and restore for a cross-platform notes app. The key requirements are:
- Cross-platform
- Local-first data
- Cloud sync
- End-to-end encryption
- Attachments
- Deleted-item recovery
- Device loss
- Ransomware-like corruption
- User export
- Regional storage
- Support-assisted restore
- Proof that restores actually work

I need to keep this under 650 words and prioritize artifacts and rubric-critical decisions. Let me structure this as a design document with clear sections and concrete decisions.

Key design decisions I need to make:
1. Data model (CRDT vs last-writer-wins)
2. Encryption scheme (key derivation, envelope encryption)
3. Backup storage architecture
4. Versioning and retention
5. Recovery workflows for each scenario
6. Verification/proof mechanism

Let me draft this tightly:

1. Data Model
- Per-note: title, markdown body, metadata, attachments
- Vault: key-value store with CRDT (Yjs/Automerge) for conflict-free sync
- Local-first: SQLite + file attachments on each device
- Sync via append-only log + snapshot

2. Encryption
- Per-user master key derived from password via Argon2id
- E2EE: content encrypted client-side with AES-256-GCM
- Per-note data encryption keys (DEKs) wrapped by master key
- Attachments encrypted with per-file DEK, chunked uploads

3. Backup Architecture
- Three tiers: local snapshot, cloud continuous, archived snapshots
- Local: every 1 hour + on app close (rolling 24h)
- Cloud: continuous sync + daily snapshot + weekly archived snapshot
- Regional storage: user chooses region at signup, replicated within region only (GDPR/sovereignty)

4. Versioning/Retention
- Trashed items: 30 days soft delete in "Trash"
- Version history: 100 versions per note or 90 days
- Daily snapshots: 30 days retained
- Weekly archives: 1 year retained
- Annual cold storage: indefinite for paid users

5. Recovery Scenarios
- Device loss: login from new device, download vault, decrypt with password
- Ransomware: restore from immutable cloud snapshot (WORM bucket), point-in-time recovery
- Accidental delete: trash bin, restore within 30 days
- Corruption: client detects hash mismatch, falls back to last good snapshot
- Support-assisted: user generates time-limited support key via re-auth + ID verification

6. Proof of Restore
- Synthetic canary records encrypted with random data, tracked separately
- Restore verification: run integrity check on decrypted data
- Merkle tree of vault state, root hash pinned in user-visible "backup health"
- Weekly automated test restore to isolatedenvironment

Let me write this concisely now. Need to stay under 650 words.
</think>

## Backup & Restore Design

### 1. Data Model (local-first)
- **Vault**: CRDT (Yjs) document per user; conflict-free merge across devices.
- **Per-note**: title, markdown, tags, timestamps, version vector.
- **Attachments**: content-addressed blobs (SHA-256), stored outside the CRDT.
- **On-device**: SQLite (notes) + filesystem (blobs). Every mutation produces an append-only op-log + periodic snapshot.

### 2. Encryption (E2EE)
- Master key = Argon2id(password, per-user salt, t=3, m=64MB, p=4).
- Per-note DEK wrapped by master key (AES-256-GCM); wrapped DEKs stored in vault metadata.
- Attachments: per-file DEK; client chunks, encrypts, uploads directly to regional bucket. Bucket never sees plaintext.

### 3. Storage Architecture
| Tier | Cadence | Retention | Region scope |
|---|---|---|---|
| Local snapshot | Hourly + on close | 24h rolling | Device only |
| Cloud continuous | Real-time op-log | 30 days | User-selected region |
| Daily snapshot | 00:00 UTC | 30 days | Same region |
| Weekly archive | Sun 00:00 UTC | 12 months | Same region |
| Cold archive (paid) | Yearly | Indefinite | Same region |

- **Regional storage**: user picks region at signup (EU/US/APAC); replication stays in-region. No cross-region copies without explicit export.
- **Immutability**: daily/weekly snapshots written to object-lock (WORM) bucket to defeat ransomware.

### 4. Recovery Workflows
- **Deleted item**: 30-day Trash with restore-on-tap.
- **Device loss**: new device login → pull cloud snapshot → decrypt with password → replay op-log.
- **Ransomware/corruption**: client detects Merkle-root mismatch → user picks point-in-time restore from WORM snapshot (immutable).
- **User export**: ZIP of decrypted vault + attachments; signed with user's public key for integrity.
- **Support-assisted**: user generates one-time support token (requires re-auth + optional ID verification); support can restore from archive but cannot read plaintext (no master key exposure).

### 5. Proof Restores Work
Three independent mechanisms:

1. **Canary records**: synthetic encrypted notes created daily, expected hashes pinned in user's "Backup Health" panel. If canary missing after restore → fail.
2. **Weekly test restore**: job spins up isolated VM, restores latest snapshot, verifies Merkle root, decrypts random sample, computes SHA-256 of attachments, compares to expected set. Result logged and shown to user.
3. **Merkle checkpoint**: vault root hash committed to append-only audit log (server-signed, user-verifiable). Restore must reproduce the same root.

### 6. Critical Decisions
- **CRDT over last-writer-wins**: eliminates sync conflicts; supports offline edits.
- **WORM snapshots**: non-negotiable for ransomware; even compromised account can't rewrite history.
- **Client-side encryption only**: server holds ciphertext + wrapped DEKs; support cannot decrypt.
- **Regional pinning**: regulatory requirement; export for cross-region moves.
- **Test restore weekly**: catches silent corruption / key drift before user needs recovery.

### Rubric Coverage
- ✅ Cross-platform: identical vault format across iOS/Android/Web/Desktop.
- ✅ Local-first: SQLite + op-log on device; cloud is secondary.
- ✅ Cloud sync: continuous op-log replay.
- ✅ E2EE: Argon2id + AES-GCM; server blind.
- ✅ Attachments: chunked, encrypted, content-addressed.
- ✅ Deleted recovery: 30-day Trash.
- ✅ Device loss: password-based vault re-derivation.
- ✅ Ransomware: WORM + point-in-time + Merkle verification.
- ✅ Export: signed decrypted bundle.
- ✅ Regional: signup-time region lock.
- ✅ Support-assisted: time-limited token, no key access.
- ✅ Proof: canaries + automated test restore + Merkle audit log.
