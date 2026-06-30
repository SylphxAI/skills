# Trust Center Readiness Patterns

## Trust center state machine

```text
trust_need_identified -> claims_inventory_done -> evidence_mapped -> page_drafted -> review_approved -> published -> request_handled -> cadence_reviewed
        |                         |                 |              |                 |             |                 |
        v                         v                 v              v                 v             v                 v
 unsupported_claim          evidence_missing    sensitive_leak   legal_blocked   stale_claim   access_denied    update_required
```

## Rule IDs

- `trust-center-1` — Separate public claims, gated evidence, sales answers, legal commitments, and internal controls.
- `trust-center-2` — Every material claim needs owner, source evidence, date, scope, qualifier, and review cadence.
- `trust-center-3` — Public trust pages should cover security, privacy, subprocessors, compliance, data handling, uptime/status, support, and contact path.
- `trust-center-4` — Gated evidence needs access policy, NDA/terms path, watermarking where appropriate, expiry, and audit log.
- `trust-center-5` — Subprocessor changes need owner, customer notice policy, data category, region, and vendor-risk note.
- `trust-center-6` — Compliance status must distinguish certified, audited, planned, in progress, not applicable, and customer-specific.
- `trust-center-7` — Security questionnaires should derive from the same evidence library as public claims.
- `trust-center-8` — Incident/status links should state current health and historical availability without overpromising.
- `trust-center-9` — Sales and support handoffs need approved language for gaps, roadmap items, and unavailable evidence.
- `trust-center-10` — Review stale screenshots, policy URLs, subprocessors, product names, and audit dates on a calendar and change-trigger basis.

## Decision table

| Trust request | Surface | Evidence | Risk control |
| --- | --- | --- | --- |
| Startup buyer asks if data is encrypted | Public security overview | Architecture summary and key-management owner | Qualify scope and avoid implementation secrets |
| Enterprise asks for SOC report | Gated evidence room | Current report under NDA path | Access approval and expiry |
| Customer asks about AI data use | Privacy/AI data section | Data use policy and retention notes | No training claim without evidence |
| Vendor list changes | Subprocessor page | Vendor owner, data category, region | Notice and stale-list review |
| Sales asks about roadmap compliance | Questionnaire support | Approved gap language | No false certification claim |

## Trust center checklist

- Claim inventory, evidence owner, and review cadence are complete.
- Public/gated/internal boundaries are explicit.
- Security, privacy, compliance, subprocessors, uptime/status, support, and contacts are covered.
- Evidence requests have access controls and audit trail.
- Sales/support answers match the evidence library.
- Stale-claim triggers include product, vendor, audit, incident, and policy changes.

## Event schema

Track: `trust_claim_created`, `trust_claim_reviewed`, `trust_evidence_requested`, `trust_evidence_granted`, `trust_evidence_denied`, `subprocessor_updated`, `trust_page_published`, `trust_claim_stale_detected`, `trust_questionnaire_answered`.

Recommended properties: `claim_type`, `surface`, `evidence_type`, `owner_team`, `scope`, `review_due_days`, `access_level`, `requester_segment`, `approval_status`, `subprocessor`, `compliance_status`, `stale_reason`, `sales_cycle_id`.
