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

## Decision table

| Scenario | Balance action | Payout action | Support action |
| --- | --- | --- | --- |
| Normal completed order | Move earnings from pending to available after risk window | Include in next payout batch | Show transaction and fee breakdown |
| Buyer refund before payout | Reverse pending earning and platform fee as policy dictates | Exclude from payout | Explain refund and balance change |
| Chargeback after payout | Create negative balance or clawback entry | Hold future payouts if needed | Show dispute evidence and appeal route |
| Fraud suspicion | Move amount to held | Pause payout for affected earnings | Provide reason code and review SLA |
| Creator changes payout method | Verify new destination | Delay or confirm next payout | Notify creator and log change |
| Currency conversion | Rate and round at policy-defined point | Pay destination currency | Show rate, fees, and source amount |

## State machine

```text
buyer_payment_captured -> platform_fee_calculated -> seller_earning_pending
seller_earning_pending -> risk_window_elapsed -> seller_earning_available
seller_earning_pending -> refund_or_dispute -> earning_reversed_or_held
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

## Review checklist

- Ledger entries, displayed balances, payout provider states, and support cases are not conflated.
- Fees, schedules, holds, refunds, chargebacks, and payout failures have user-facing explanations.
- Risk windows and manual adjustment approvals are explicit.
- Creator/seller dashboard shows pending, available, held, paid, and disputed amounts.
- Support and finance can reconcile orders, fees, earnings, refunds, and payouts end to end.
