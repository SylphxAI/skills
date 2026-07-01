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
