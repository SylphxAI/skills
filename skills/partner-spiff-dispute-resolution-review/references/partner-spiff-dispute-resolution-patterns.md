# Partner SPIF Dispute Resolution Review Patterns

## Partner SPIF Dispute Resolution Review state machine

```text
dispute_submitted -> evidence_collected -> attribution_decided -> payout_reconciled -> appeal_window_closed -> program_updated
       |                  |                   |                      |                   |                     |
       v                  v                   v                      v                   v                     v
 vague_claim       evidence_gap        attribution_conflict     payout_error        appeal_gap          repeat_dispute
```

## Rule IDs

- `spiff-dispute-1` — Start from published program terms: eligible partner, eligible deal, action trigger, time window, exclusions, deal registration, payout formula, cap, and clawback rule.
- `spiff-dispute-2` — Build evidence packets from CRM, partner portal, contract/order, billing, implementation acceptance, customer consent, invoice, payment, and prior communications.
- `spiff-dispute-3` — Define source-of-truth order for attribution conflicts across partner claim, sales claim, marketing attribution, CRM owner, customer statement, and contract history.
- `spiff-dispute-4` — Audit payout calculation for amount, currency, cap, tier, margin, split, taxes, invoice status, payment status, refund/chargeback, and prior adjustments.
- `spiff-dispute-5` — Use independent approval for disputed payouts, exceptions, clawback reversals, fraud suspicion, or relationship-sensitive decisions.
- `spiff-dispute-6` — Communicate decision, evidence basis, timing, appeal route, next steps, and future eligibility requirements in partner-safe language.
- `spiff-dispute-7` — Escalate fraud indicators such as fake leads, duplicate claims, circular referrals, altered evidence, policy violations, or low-quality customers.
- `spiff-dispute-8` — Convert recurring disputes into program term updates, portal validation, attribution automation, partner education, and QA sampling.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Duplicate attribution | Apply source order | CRM/contract evidence | Double payout |
| Late registration | Check exception policy | Timestamp and terms | Unfair denial |
| Calculation dispute | Recompute payout | Formula audit | Payment error |
| Fraud signal | Escalate review | Evidence packet | Payout abuse |
| Appeal filed | Independent decision | Appeal record | Partner trust loss |

## SPIF dispute checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `partner_spiff_dispute_submitted`, `partner_spiff_evidence_collected`, `partner_spiff_attribution_decided`, `partner_spiff_payout_recomputed`, `partner_spiff_dispute_decided`, `partner_spiff_appeal_resolved`, `partner_spiff_clawback_applied`, `partner_spiff_program_updated`.

Recommended properties: `partner_id, program_id, dispute_id, incentive_type, account_id, opportunity_id, claim_type, attribution_source, payout_amount, currency, evidence_status, approver_id, appeal_status, clawback_status, fraud_status, program_update_status, decision`.
