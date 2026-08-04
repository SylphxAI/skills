# Choice, Retention, Vendors, and Change

## Choice and preference state

```text
not_presented -> presented(version, locale, purpose) -> chosen -> propagated -> reconciled
                        |                          |          |
                        v                          v          v
                  inaccessible                revoked    mismatch
```

Separate transactional/security processing, product functionality, analytics, personalization, marketing, advertising, sale/share, precise location, sensitive processing, and model improvement where their purposes or authorities differ. “Accept all” cannot erase granular control.

A preference event should normally preserve actor, subject/account, purpose, state, policy/copy version, locale, region, age mode, surface, timestamp, authority context, downstream targets, propagation status, and supersession link. Minimize the proof record itself.

## Retention decision table

| State | Allowed behavior | Required evidence | Failure response |
| --- | --- | --- | --- |
| Active purpose | Use only for declared eligible purposes | purpose + enforcement state | quarantine unexpected use |
| Grace/recovery | No new unrelated use | expiry event + recovery rule | expire or authorized restore |
| Legal/security hold | Freeze scoped terminal action; restrict use | hold owner, basis, scope, expiry/review | escalate stale or overbroad hold |
| Delete | Idempotently remove where supported | job and destination receipts | retry, reconcile, disclose exception |
| Anonymize | Break reasonable re-identification paths | method, join restrictions, validation | treat as personal if reversible |
| Backup expiry | Prevent normal restoration/use until scheduled expiry | backup policy and restore filters | block unsafe restore, reapply tombstone |
| Proof retention | Keep minimum non-content audit proof | purpose, access, expiry | minimize or purge stale proof |

## Vendor and subprocessor protocol

Before enabling a destination, record purpose and field scope, role, regions, onward processors, access path, retention/deletion behavior, incident notice, rights support, export/exit path, contract authority, current assessment, runtime adapter, and kill switch. A signed contract without runtime enforcement is not acceptance evidence.

On vendor change or failure: stop ineligible flow, preserve idempotent queue semantics, reconcile missing/duplicate events, update subject controls and disclosures, execute migration/deletion obligations, and prove disabled-state silence.

## Material-change protocol

Diff these dimensions: purpose, field/precision/frequency, subject or age group, collection surface, decision consequence, recipient/vendor, region, retention, model/training use, published promise, choice, and user expectation.

For every material difference choose one:

- compatible under the validated current contract, with evidence;
- re-notice before continued use;
- renewed affirmative choice or other newly validated authority;
- migrate only an eligible subset;
- stop and suppress/delete incompatible historical data;
- floor-block the new behavior.

Define rollout ceiling, monitoring, revocation propagation, rollback semantics, vendor/model rollback, data already emitted, and user/support communication. Rollback code does not retract data already disclosed or learned from; treat those as separate recovery obligations.
