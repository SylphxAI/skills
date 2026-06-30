# Privacy And Data Retention Patterns

## Data lifecycle

```text
collect -> validate -> use -> store -> access/share -> retain -> export/delete -> backup expiry
```

## Rule IDs

- `privacy-1` — Every data field needs a purpose, owner, retention period, and deletion behavior.
- `privacy-2` — Product telemetry should be proportionate, documented, and controllable where appropriate.
- `privacy-3` — Store privacy/data safety disclosures must match actual collection and sharing.
- `privacy-4` — Backups need retention and deletion semantics; deletion is not complete until backup expiry is understood.
- `privacy-5` — Account deletion should explain what is deleted, retained, anonymized, or required for legal/security reasons.
- `privacy-6` — Data export should include user-meaningful records and machine-readable formats where practical.
- `privacy-7` — Support/admin access should be least-privilege, audited, and purpose-limited.
- `privacy-8` — Children/minors, health, finance, precise location, contacts, and biometric data require heightened review.
- `privacy-9` — Third-party SDKs and analytics inherit product trust risk; document what they collect and why.
- `privacy-10` — Privacy copy should be specific enough for users and reviewers to verify.

## Retention schedule table

| Data type | Purpose | Retention | Delete/export behavior |
| --- | --- | --- | --- |
| Account profile | Identity and personalization | Until account deletion or inactivity policy | Export and delete/anonymize |
| Billing records | Receipts, tax, fraud, support | Policy/legal period | Retain limited records, remove product access data where possible |
| Product content | User-created value | User-controlled lifecycle | Export/delete with recovery window if offered |
| Telemetry | Reliability and product improvement | Short bounded window or aggregate | Delete/anonymize raw events |
| Support cases | Support history and disputes | Bounded support/legal period | Redact sensitive attachments where possible |
| Backups | Recovery | Fixed rolling window | Expire through backup lifecycle |

## Disclosure checklist

Check: purpose, data category, collection trigger, third parties, retention, deletion/export, consent/preference, security basics, support/admin access, store form consistency, and user-facing settings.
