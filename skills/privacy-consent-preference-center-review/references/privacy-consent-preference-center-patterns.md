# Privacy Consent Preference Center Patterns

## Privacy Consent Preference Center Review state machine

```text
choice_presented -> preference_recorded -> proof_stored -> downstream_synced -> user_confirmed -> audit_reviewed
       |                  |                  |                 |                  |
       v                  v                  v                 v                  v
 dark_pattern       ambiguous_choice    proof_gap        sync_failed       support_confusion
```

## Rule IDs

- `consent-center-1` — Define each choice by purpose, legal basis, default, region, user segment, downstream systems, and user-facing copy.
- `consent-center-2` — Separate transactional, security, marketing, product, analytics, cookie, sale/share, and AI data-use preferences.
- `consent-center-3` — Record consent and revocation events with actor, timestamp, version, source, region, policy text, and downstream sync status.
- `consent-center-4` — Use accessible, localized, plain-language controls without dark patterns or bundled unrelated choices.
- `consent-center-5` — Enforce preferences across email, push, SMS, ads, analytics, data warehouse, CRM, support, AI training, and partner/subprocessor systems.
- `consent-center-6` — Define sync SLAs, retries, conflict handling, and user-visible confirmation for preference changes.
- `consent-center-7` — Handle minors, enterprise admin policies, opt-out signals, and regional requirements explicitly.
- `consent-center-8` — Audit preference mismatches, support complaints, campaign suppression failures, and stale policy copy.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Marketing opt-out | Sync all channels | Preference event and ESP state | Unwanted messages |
| AI data-use choice | Separate from analytics | Policy and model pipeline map | Invalid consent |
| Cookie category | Use region defaults | Consent framework proof | Regulatory risk |
| Sync failure | Retry and suppress | Queue status | Preference ignored |
| Enterprise policy | Respect admin scope | Org settings | User/admin conflict |

## Consent preference checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `preference_choice_presented`, `preference_recorded`, `preference_revoked`, `preference_downstream_sync_started`, `preference_downstream_sync_failed`, `preference_user_confirmed`, `preference_audit_completed`.

Recommended properties: `user_id, account_id, preference_type, region, legal_basis, policy_version, choice_state, source_surface, downstream_system, sync_status, revocation_status, accessibility_check, decision`.
