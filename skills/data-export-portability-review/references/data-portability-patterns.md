# Data Portability Patterns

## Export and deletion state machine

```text
request_received -> requester_verified -> scope_confirmed -> export_generated -> delivered_securely -> download_expired -> case_closed
        |                  |                    |                 |                  |
        v                  v                    v                 v                  v
 needs_clarification  unauthorized       too_large_async     delivery_failed   deletion_requested
```

Deletion has a parallel path: `deletion_requested -> retention_review -> data_removed_or_retained_with_reason -> user_notified -> audit_recorded`.

## Rule IDs

- `data-port-1` — Identify requester authority: individual user, workspace admin, parent/guardian, legal owner, or support agent.
- `data-port-2` — Define data classes and ownership before export: profile, content, billing records, analytics, messages, files, logs, backups, derived data.
- `data-port-3` — Use stable, documented, machine-readable formats such as CSV, JSON, ZIP, ICS, or media originals where appropriate.
- `data-port-4` — Separate export, backup restore, migration, account deletion, and legal privacy request flows.
- `data-port-5` — Secure delivery with expiry, rate limits, audit logs, and re-authentication for sensitive data.
- `data-port-6` — Exclude secrets, credentials, internal risk scores, and other users’ private data unless authority is proven.
- `data-port-7` — Explain retention limits honestly: tax records, fraud evidence, disputes, legal holds, backups, and anonymized aggregate data.
- `data-port-8` — Large exports need async jobs, progress, retry, checksum, and support fallback.
- `data-port-9` — Portability should preserve user meaning: timestamps, IDs, relationships, attachments, and metadata.
- `data-port-10` — Track export/deletion failures as trust incidents, not ordinary UX bugs only.

## Decision table

| Request | Authorization | Export/delete action | Risk control | User message |
| --- | --- | --- | --- | --- |
| Individual account export | Re-authenticated user | Personal data package | Exclude workspace-only/admin data | Explain contents and expiry |
| Workspace admin export | Admin role verified | Workspace-level package | Protect private member data by policy | List included data classes |
| Account deletion | Owner verified | Delete/anonymize eligible data | Retention exception review | State what remains and why |
| Migration to competitor | User/admin verified | Portable formats and media | Rate-limit and audit | Avoid hostile friction |
| Backup restore request | Ownership/support verified | Restore snapshot or subset | Prevent overwrite surprise | Preview impact before restore |
| Fraud/dispute account | Support/legal review | Limited export/deletion | Preserve evidence where required | Use careful neutral copy |

## Data package checklist

- Include manifest with schema version, generated time, account/workspace ID, and package contents.
- Preserve relationships through stable IDs and references.
- Include help text for importing or reading the data.
- Provide checksums for large file packages.
- Expire download links and log access.
- Document excluded classes and retention/deletion exceptions.

## Event schema

Track: `data_export_requested`, `export_requester_verified`, `export_scope_confirmed`, `data_export_started`, `data_export_completed`, `data_export_downloaded`, `data_export_expired`, `data_deletion_requested`, `retention_exception_applied`, `data_deleted_or_anonymized`, `portability_support_case_opened`.

Minimum properties: requester type, authority proof, account/workspace, data classes, format, sensitivity, job size, delivery method, expiration, retention reason, and support case ID.
