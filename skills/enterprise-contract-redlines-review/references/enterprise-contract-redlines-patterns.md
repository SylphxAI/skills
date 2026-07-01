# Enterprise Contract Redlines Patterns

## Enterprise Contract Redlines Review state machine

```text
redline_received -> clause_classified -> owner_reviewed -> fallback_sent -> accepted -> obligation_tracked
       |                  |                |                 |           |
       v                  v                v                 v           v
 standard_ok       evidence_gap      reject_required   negotiation_stalled renewal_review
```

## Rule IDs

- `contract-redline-1` — Map each redline to clause type, customer ask, standard position, fallback language, impacted team, obligation system, and deal/renewal context.
- `contract-redline-2` — Separate legal risk, commercial risk, finance impact, privacy/security commitment, support/SLA promise, product gap, and operational exception.
- `contract-redline-3` — Require owner approval for liability caps, indemnity, payment terms, termination rights, SLAs, security controls, subprocessors, residency, AI/data use, and audit rights.
- `contract-redline-4` — Track accepted non-standard obligations in a searchable source of truth with account, clause, owner, evidence, review date, and renewal trigger.
- `contract-redline-5` — Prefer documented standard fallback positions before bespoke commitments.
- `contract-redline-6` — Reject or escalate clauses that conflict with law, security posture, shared infrastructure, public terms, or unbuilt roadmap.
- `contract-redline-7` — Update security questionnaires, trust center, support playbooks, billing, provisioning, and renewal notes when accepted terms affect operations.
- `contract-redline-8` — Review redline patterns to improve packaging, public terms, enterprise readiness, and sales qualification.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| SLA credit expansion | Finance/support approval and evidence | SLO history and credit policy | Unfunded service liability |
| Data residency clause | Security/privacy architecture review | Data map and subprocessor path | False residency promise |
| Unlimited liability | Legal/commercial escalation | Risk memo and deal value | Unbounded downside |
| Custom support term | Support capacity approval | Coverage and SLA evidence | Unstaffed obligation |
| Roadmap commitment | Reject or narrow to current fact | Product owner review | Contracting future fiction |

## Contract redline checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `contract_redline_received`, `contract_clause_classified`, `contract_owner_review_requested`, `contract_fallback_sent`, `contract_exception_approved`, `contract_obligation_recorded`, `contract_redline_rejected`.

Recommended properties: `account_id, deal_value_band, clause_type, risk_tier, owner_team, standard_position, fallback_status, approval_status, obligation_type, review_date, renewal_trigger, decision`.
