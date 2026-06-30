# Security Questionnaire Patterns

## Questionnaire response state machine

```text
questionnaire_received -> scope_confirmed -> questions_classified -> evidence_attached -> owner_reviewed -> response_sent -> followup_tracked
          |                      |                    |                 |                |
          v                      v                    v                 v                v
   wrong_scope             owner_needed          evidence_missing   legal_review    commitment_blocked
```

## Rule IDs

- `sec-q-1` — Define product scope and data boundary before answering.
- `sec-q-2` — Classify each answer as current fact, partial, not applicable, compensating control, roadmap, unknown, or requires review.
- `sec-q-3` — Attach evidence for material claims: policy, diagram, audit report, control screenshot, runbook, log, or owner attestation.
- `sec-q-4` — Never claim certifications, compliance, encryption posture, retention, residency, SLAs, or subprocessors without authoritative proof.
- `sec-q-5` — Keep sales-friendly summaries separate from technical evidence and legal commitments.
- `sec-q-6` — Mark answer freshness and review expiry; stale security answers become risk.
- `sec-q-7` — Redact secrets, exploit detail, internal vulnerability backlog, and customer-specific confidential data.
- `sec-q-8` — Unknown is better than fabricated certainty; route to owner with due date.
- `sec-q-9` — Gaps need remediation owner, compensating control, and buyer-impact note.
- `sec-q-10` — Feed repeated questions into trust center docs, enterprise readiness, and product controls.

## Decision table

| Question type | Response strategy | Evidence | Escalation |
| --- | --- | --- | --- |
| SSO/RBAC/audit logs | State exact supported capabilities | Admin docs or screenshots | Product/security owner if partial |
| Encryption | State in transit/at rest boundaries | Architecture/control evidence | Security owner |
| Data retention/deletion | State policy and exceptions | Retention docs and workflow | Legal/privacy owner |
| Incident response | Describe process and notifications | Runbook/status process | Security/legal if contractual |
| Compliance certification | Provide current status only | Report or no-certification statement | Legal/security |
| Subprocessors | Link current list | Subprocessor register | Privacy/legal |
| Pen test/vulnerability | Share approved summary | Letter/report under NDA if allowed | Security owner |

## Evidence checklist

- Scope, product, environment, and date are visible.
- Every material claim has a source or owner attestation.
- Caveats are explicit and not hidden in footnotes only.
- Commitments are approved by accountable owners.
- Reusable answers are added to a maintained response library.

## Event schema

Track: `security_questionnaire_received`, `security_question_scoped`, `security_answer_classified`, `security_evidence_attached`, `security_gap_logged`, `security_owner_review_requested`, `security_response_approved`, `security_response_sent`, `security_followup_committed`, `security_answer_library_updated`.

Minimum properties: account, product scope, question category, data sensitivity, classification, evidence type, owner, expiry, caveat, commitment status, and follow-up date.
