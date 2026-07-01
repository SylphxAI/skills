# Partner Incentive Payout Governance Review Patterns

## Partner Incentive Payout Governance Review state machine

```text
program_defined -> eligibility_checked -> attribution_verified -> payout_approved -> dispute_window_closed -> roi_reviewed
       |                 |                    |                       |                 |                       |
       v                 v                    v                       v                 v                       v
 vague_incentive   eligibility_gap       attribution_conflict       payout_error      dispute_gap            roi_blindspot
```

## Rule IDs

- `partner-payout-1` — Tie incentive design to one business objective: sourced pipeline, qualified opportunity, closed revenue, activation, implementation quality, retention, expansion, marketplace supply, or co-marketing output.
- `partner-payout-2` — Define eligible partners, eligible accounts, excluded accounts, time windows, deal-registration rules, customer consent needs, and channel-conflict resolution.
- `partner-payout-3` — Use a payout source of truth for attribution, booked revenue, activation, retention, implementation completion, invoice status, and refund/chargeback state.
- `partner-payout-4` — Calculate payouts with visible formula, cap, floor, currency, tax/invoice requirement, approval path, payout date, and exception policy.
- `partner-payout-5` — Gate payout on quality where appropriate: customer activation, no fraud, no policy breach, implementation completion, retention window, or margin threshold.
- `partner-payout-6` — Document clawbacks for refunds, cancellations, duplicate claims, non-payment, policy violations, fraudulent leads, or failed implementation.
- `partner-payout-7` — Run disputes with evidence packets, independent approver, partner communication, SLA, appeal route, and final decision record.
- `partner-payout-8` — Review program ROI through CAC, margin, retention, partner concentration, support burden, dispute rate, fraud rate, and customer outcome quality.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Referral claim | Verify attribution | Deal registration | Duplicate payout |
| Implementation bonus | Gate on quality | Acceptance evidence | Poor customer outcome |
| Affiliate spike | Check fraud signals | Traffic and conversion proof | Payout abuse |
| Partner dispute | Run evidence review | Independent approver | Relationship damage |
| Low ROI program | Retune or sunset | Margin/retention report | Growth theater |

## Partner payout checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `partner_incentive_program_defined`, `partner_incentive_claim_submitted`, `partner_incentive_attribution_verified`, `partner_incentive_payout_approved`, `partner_incentive_payout_paid`, `partner_incentive_clawback_triggered`, `partner_incentive_dispute_resolved`, `partner_incentive_roi_reviewed`.

Recommended properties: `partner_id, program_id, incentive_type, account_id, opportunity_id, attribution_source, payout_amount, currency, eligibility_status, quality_gate_status, approver_id, invoice_status, clawback_status, dispute_status, roi_status, decision`.
