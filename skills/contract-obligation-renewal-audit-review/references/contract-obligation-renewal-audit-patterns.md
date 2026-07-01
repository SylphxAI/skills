# Contract Obligation Renewal Audit Review Patterns

## Contract Obligation Renewal Audit Review state machine

```text
contracts_collected -> obligations_extracted -> evidence_mapped -> gaps_remediated -> renewal_positioned -> handoff_archived
       |                    |                      |                 |                  |                    |
       v                    v                      v                 v                  v                    v
 missing_source        hidden_obligation       weak_evidence     owner_gap        notice_missed        handoff_drift
```

## Rule IDs

- `renewal-obligation-1` — Collect authoritative contract sources: order form, MSA, DPA, SLA, security addendum, SOW, pricing exhibit, amendment, renewal notice, and support terms.
- `renewal-obligation-2` — Extract obligations into a register with clause source, owner, due date, evidence, customer visibility, risk tier, and renewal impact.
- `renewal-obligation-3` — Separate legal interpretation, commercial policy, billing configuration, product capability, support operations, security/privacy evidence, and customer communication.
- `renewal-obligation-4` — Track notice windows, auto-renewal terms, price-change requirements, usage minimums, termination rights, and service-credit exposure.
- `renewal-obligation-5` — Map every pricing exception or custom entitlement to billing, invoicing, provisioning, reporting, expiry, and cleanup path.
- `renewal-obligation-6` — Verify service, security, privacy, data residency, support, reporting, uptime, and product-deliverable commitments with durable evidence.
- `renewal-obligation-7` — Create remediation owners for unmet obligations before renewal, with customer-safe messaging and negotiation alternatives.
- `renewal-obligation-8` — Archive the renewal handoff so sales, success, legal, finance, support, and product work from the same obligation truth.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Auto-renewal soon | Audit notice window | Contract calendar | Missed leverage |
| Pricing exception | Map to billing | Invoice/provisioning proof | Revenue leakage |
| SLA exposure | Validate service proof | Incident and credit record | Unexpected credit |
| Product promise | Check deliverability | Commitment owner | Roadmap liability |
| Expansion negotiation | Surface obligations early | Evidence matrix | Late blocker |

## Renewal obligation checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `contract_sources_collected`, `contract_obligation_extracted`, `renewal_notice_window_reviewed`, `obligation_evidence_mapped`, `obligation_gap_found`, `obligation_remediated`, `renewal_handoff_completed`, `contract_exception_expired`.

Recommended properties: `account_id, contract_id, clause_type, obligation_id, source_document, renewal_date, notice_deadline, owner_team, evidence_url, risk_tier, billing_impact, support_impact, remediation_status, negotiation_status, decision`.
