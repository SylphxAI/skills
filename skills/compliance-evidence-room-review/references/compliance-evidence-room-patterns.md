# Compliance Evidence Room Patterns

## Compliance Evidence Room state machine

```text
request_received -> identity_checked -> access_approved -> evidence_viewed -> followup_answered -> review_expired
      |                 |                  |                 |                  |
      v                 v                  v                 v                  v
 denied            terms_missing       access_expired   evidence_stale     document_revoked
```

## Rule IDs

- `evidence-room-1` — Classify every artifact by sensitivity, audience, scope, owner, effective date, and expiry.
- `evidence-room-2` — Separate public trust claims from gated reports, legal documents, audit artifacts, and customer-specific exceptions.
- `evidence-room-3` — Require identity, company, purpose, terms/NDA status, approval owner, and expiry for gated access.
- `evidence-room-4` — Use document versioning and revoke superseded reports instead of relying on manual memory.
- `evidence-room-5` — Audit downloads/views and route buyer follow-up to approved answer owners.
- `evidence-room-6` — Document gaps truthfully with mitigation and expected review date.
- `evidence-room-7` — Keep subprocessors, DPAs, policy URLs, and compliance reports synchronized with the trust center.
- `evidence-room-8` — Review access logs for unusual sharing, competitor access, or stale accounts.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| SOC report | Gate behind approved access | Current report and NDA/terms | Uncontrolled distribution |
| Pen test summary | Share redacted summary only | Security approval and expiry | Leaking exploit detail |
| Policy document | Public or gated by sensitivity | Owner and current version | Stale policy |
| Buyer follow-up | Approved answer library | Evidence reference | Ad hoc sales claim |
| Expired report | Revoke or mark expired | Replacement or status note | False assurance |

## Evidence room checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `evidence_access_requested`, `evidence_access_granted`, `evidence_document_viewed`, `evidence_document_expired`, `evidence_document_revoked`, `evidence_followup_answered`.

Recommended properties: `surface`, `owner_team`, `segment`, `risk_tier`, `status`, `evidence_type`, `review_due_days`, `exception_type`, `decision`, `customer_impact`, `support_case_id`, `outcome`.
