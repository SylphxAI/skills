# Procurement Security Patterns

## Procurement state machine

```text
request_received -> scope_classified -> evidence_selected -> answer_reviewed -> package_sent -> buyer_followup -> exception_decided -> closed
       |                  |                  |                 |              |                |                  |
       v                  v                  v                 v              v                v                  v
 missing_owner       out_of_scope       evidence_missing   answer_blocked  access_denied   legal_redline      remediation_tracked
```

## Rule IDs

- `procurement-security-1` — Classify request type: questionnaire, evidence packet, DPA, subprocessor, insurance, compliance report, pen test, AI/data-use, or contract redline.
- `procurement-security-2` — Every answer needs evidence source, owner, date, scope, caveat, and approval status.
- `procurement-security-3` — Distinguish implemented, partially implemented, planned, not applicable, customer-configurable, and unsupported controls.
- `procurement-security-4` — Sensitive evidence needs access control, NDA/terms, expiry, watermarking where appropriate, and audit log.
- `procurement-security-5` — Gap wording should be truthful and include mitigation, roadmap status, compensating control, or rejection reason.
- `procurement-security-6` — DPAs and subprocessors need legal/privacy owner and region/data-category mapping.
- `procurement-security-7` — AI/data-use answers should state training, retention, vendor routing, human review, and opt-out/control boundaries.
- `procurement-security-8` — Redlines need decision owner and commercial/security risk, not ad hoc sales approval.
- `procurement-security-9` — Post-signature commitments need owner, due date, evidence, and renewal review.
- `procurement-security-10` — Reuse approved answer library but refresh stale evidence before sending.

## Decision table

| Buyer request | Response artifact | Required owner | Risk |
| --- | --- | --- | --- |
| Security questionnaire | Approved answer library plus caveats | Security/product owner | Overstated controls |
| SOC report | Gated evidence room | Security/legal | Uncontrolled distribution |
| AI data use question | AI/privacy policy answer | Product/privacy | False no-training claim |
| DPA redline | Legal review | Legal/privacy | Unsupported liability |
| Remediation promise | Exception record | Accountable owner | Forgotten post-signature obligation |

## Procurement checklist

- Request type, deadline, and buyer context are clear.
- Answers map to evidence, owner, date, and scope.
- Sensitive evidence is gated and audited.
- Gaps are truthful with mitigation or rejection reason.
- Redlines and exceptions have decision owners.
- Commitments are tracked after signature and renewal.

## Event schema

Track: `procurement_request_received`, `security_answer_reviewed`, `evidence_packet_sent`, `procurement_gap_logged`, `redline_reviewed`, `procurement_exception_approved`, `post_signature_commitment_created`, `procurement_review_closed`.

Recommended properties: `deal_stage`, `buyer_segment`, `request_type`, `evidence_type`, `owner_team`, `approval_status`, `control_status`, `gap_severity`, `access_level`, `redline_type`, `commitment_due_days`, `renewal_risk`, `outcome`.
