# Marketplace Payout Systems

Payouts are a trust system. Creators/sellers need predictable earnings, buyers need refunds and dispute protection, and the platform needs ledger truth.

## Rule IDs

- `payout-1` — Model payments, fees, seller earnings, pending balance, available balance, payout, refund, chargeback, and adjustment as separate ledger movements.
- `payout-2` — Displayed seller balances should derive from ledger entries and clearly separate pending, available, held, paid, and disputed amounts.
- `payout-3` — Payout schedules must account for refund windows, dispute windows, settlement delay, fraud risk, and delivery confirmation.
- `payout-4` — Fees and revenue shares should be visible before listing or transaction, including minimum fees, currency conversion, taxes/withholding handoff, and provider fees when relevant.
- `payout-5` — Holds need reason codes, expected review time, owner, evidence, and appeal/support path.
- `payout-6` — Refunds and chargebacks should reverse or offset seller earnings according to documented policy and ledger lineage.
- `payout-7` — Cross-currency payouts need exchange rate source, timing, rounding, and statement visibility.
- `payout-8` — Manual adjustments require role, reason, approval, audit log, and seller-visible explanation when material.
- `payout-9` — Support should see transaction, buyer payment, seller earning, fee, hold, payout, refund, and dispute lineage without spreadsheet archaeology.
- `payout-10` — Compliance-sensitive identity, tax, sanctions, or money-transmission questions require qualified review outside the skill; the product should still route the state and evidence.
- `payout-11` — Reserves and holds need explicit trigger, affected scope, release criteria, SLA, owner, creator-visible status, and appeal/escalation path.
- `payout-12` — Global payouts need country eligibility, payout-provider constraints, tax form status, withholding state, sanctions/KYC screening state, failed-transfer recovery, and reporting handoff before funds become payable.

## Decision table

| Scenario | Balance action | Payout action | Support action |
| --- | --- | --- | --- |
| Normal completed order | Move earnings from pending to available after risk window | Include in next payout batch | Show transaction and fee breakdown |
| Buyer refund before payout | Reverse pending earning and platform fee as policy dictates | Exclude from payout | Explain refund and balance change |
| Chargeback after payout | Create negative balance or clawback entry | Hold future payouts if needed | Show dispute evidence and appeal route |
| Fraud suspicion | Move amount to held | Pause payout for affected earnings | Provide reason code and review SLA |
| Creator changes payout method | Verify new destination | Delay or confirm next payout | Notify creator and log change |
| Currency conversion | Rate and round at policy-defined point | Pay destination currency | Show rate, fees, and source amount |
| Missing tax form | Keep earnings accrued but not payable, or apply withholding where required | Block or reduce payout per qualified policy | Show required form, status, and support route |
| Sanctions/KYC potential match | Move affected funds to compliance-held state | Block payout until qualified review resolves | Provide non-sensitive compliance-review message |
| Failed bank transfer | Return funds to available or held based on failure reason | Do not retry invalid destinations indefinitely | Show provider reason, remediation, and trace ID |
| Negative balance | Offset future earnings before new payouts | Block payout until non-negative unless exception approved | Show itemized reversal lineage and cure path |

## State machine

```text
buyer_payment_captured -> platform_fee_calculated -> seller_earning_pending
seller_earning_pending -> risk_window_elapsed -> seller_earning_available
seller_earning_pending -> refund_processed -> seller_earning_reversed
seller_earning_available -> refund_processed -> seller_earning_reversed_or_negative_balance
seller_earning_pending -> dispute_opened -> seller_earning_disputed
seller_earning_disputed -> dispute_won -> seller_earning_available_or_hold_released
seller_earning_disputed -> dispute_lost -> seller_earning_reversed_or_negative_balance
seller_earning_pending -> risk_or_compliance_hold -> seller_earning_held
seller_earning_held -> hold_released -> seller_earning_pending_or_available
seller_earning_available -> payout_batch_created -> payout_submitted -> payout_paid
payout_submitted -> payout_failed -> payout_method_fix_required -> payout_resubmitted
payout_paid -> chargeback_received -> negative_balance_or_clawback
manual_adjustment_requested -> approved -> ledger_adjustment_posted
```

## Event schema

Recommended events:

- `marketplace_payment_captured`: order_id, buyer_id, seller_id, gross_amount, currency, provider_id.
- `marketplace_fee_calculated`: order_id, fee_type, fee_amount, revenue_share_rate, currency.
- `seller_earning_posted`: earning_id, seller_id, order_id, pending_amount, risk_release_at.
- `seller_balance_changed`: seller_id, balance_type, delta_amount, reason, ledger_entry_id.
- `payout_batch_created`: batch_id, seller_count, total_amount, currency, schedule.
- `payout_result`: payout_id, seller_id, amount, destination_type, result, failure_reason.
- `payout_hold_created`: seller_id, amount, reason_code, review_owner, expected_review_at.
- `payout_hold_released`: hold_id, seller_id, amount, release_reason, reviewer_or_job_id.
- `tax_compliance_status_changed`: seller_id, jurisdiction, form_status, withholding_rate, effective_at.
- `sanctions_screening_result`: seller_id, screening_status, match_confidence, compliance_case_id.
- `seller_negative_balance_changed`: seller_id, amount, source_event_id, recovery_status.

Audit fields to include where applicable: idempotency_key, source_event_id, ledger_entry_id, actor_or_job_id, policy_version, before_balance, after_balance, provider_trace_id, support_case_id, and creator_visible_reason.

## Audit invariants

- Displayed pending, available, held, disputed, paid, reversed, and negative balances must reconcile to ledger entries, not provider callbacks or cached UI values.
- Every payout-affecting event must be idempotent and traceable to a source event, policy version, actor/job, and support-visible reason.
- Reversed earnings and negative balances must preserve lineage to original order, payout, refund, dispute, or manual adjustment.
- Provider payout state cannot mark funds paid unless ledger state and reconciliation agree.
- Support can explain status and collect evidence but cannot silently override fraud, tax, sanctions, or compliance holds without an approved ledger adjustment.

## Review checklist

- Ledger entries, displayed balances, payout provider states, and support cases are not conflated.
- Fees, schedules, holds, refunds, chargebacks, and payout failures have user-facing explanations.
- Risk windows and manual adjustment approvals are explicit.
- Creator/seller dashboard shows pending, available, held, paid, and disputed amounts.
- Support and finance can reconcile orders, fees, earnings, refunds, and payouts end to end.
- Global payout readiness includes tax forms, withholding, country eligibility, sanctions/KYC review, provider constraints, minimum thresholds, failed payout recovery, and negative-balance handling.
- Reserve policies state percent/amount, duration, scope, review cadence, release criteria, and creator-visible status.
- Formal states include reversed earnings and negative balances, not only pending/available/paid.
- Audit invariants prove ledger, displayed balance, provider state, and support evidence agree before payout release.
