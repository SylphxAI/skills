Marketplace/payout context:
AI template marketplace (digital goods). Parties: Buyer, Creator, Platform. Model: Buyer pays platform, platform remits creator revenue share minus fees.

Fee and risk model:
80% creator revenue share; 20% platform fee. 14-day risk window post-purchase for refunds, fraud, and delivery confirmation.

Payout flow:
- `seller_earning_pending` -> Platform Ledger, `marketplace_payment_captured` event, "Your sale is processing."
- `seller_earning_available` -> Platform Ledger, `risk_window_elapsed` event, "Funds cleared and available."
- `seller_earning_held` -> Trust & Safety Team, `payout_hold_created` event + case ID, "Earnings under review. See support ticket."
- `payout_paid` -> Payment Provider, `payout_result` event + provider trace ID, "Payout sent to your bank."

Formal state machine:
- `buyer_payment_captured` -> `platform_fee_calculated` -> `seller_earning_pending`, net credit to pending, entry ties to order/fee IDs.
- `seller_earning_pending` -> `risk_window_elapsed` -> `seller_earning_available`, debit pending/credit available, balances reconcile to ledger.
- `seller_earning_pending` -> `refund_processed` -> `seller_earning_reversed`, credit pending reverses, lineage ties to original order ID.
- `seller_earning_available` -> `payout_batch_created` -> `payout_submitted`, debit available, invariant matches batch total to ledger sum.
- `payout_submitted` -> `payout_paid` -> `payout_paid`, no ledger change (state only), provider state agrees with ledger.
- `payout_paid` -> `chargeback_received` -> `seller_negative_balance_changed`, debit available (creates negative), clawback strictly tracked.

Decision table:
- Normal completed order -> Move 80% earning pending->available after 14 days -> Include in next monthly payout batch -> Show transaction, 20% fee, net earning.
- Buyer refund before payout -> Reverse pending earning and 20% platform fee -> Exclude from payout -> Explain standard 14-day refund window.
- Chargeback after payout -> Create negative balance entry -> Offset future earnings before new payouts -> Show chargeback evidence and dispute route.
- Fraud suspicion -> Move amount to held -> Pause payout for affected earnings -> Provide reason code and review SLA.

Reserve/hold governance:
- Fraud Review Hold -> High-risk buyer profile/velocity -> Affected transaction amount -> Manual review completes -> 48 hours -> Trust/Safety Team -> Support Ticket.
- Compliance Hold -> KYC/Tax threshold reached -> All future earnings -> Valid tax form provided -> 24 hours -> Compliance Team -> Support Ticket.

Compliance/provider readiness:
- KYC/Identity Missing -> Payout blocked, earnings stay accrued -> KYC verification state -> "Complete identity verification to enable payouts" -> Compliance Team.
- Tax Form Missing -> Payout blocked, funds accrued -> W-9/W-8BEN status -> "Complete tax details in settings" -> Finance Team.
- Sanctions Potential Match -> Payout blocked, funds moved to compliance-held -> Sanctions screening result -> "Account under compliance review" -> Legal/Compliance.

Ledger/events:
- `marketplace_payment_captured` with `order_id, buyer_id, seller_id, gross_amount, currency`
- `marketplace_fee_calculated` with `order_id, fee_type, fee_amount, revenue_share_rate`
- `seller_earning_posted` with `seller_id, order_id, pending_amount, risk_release_at`
- `payout_result` with `payout_id, seller_id, amount, destination_type, result, provider_trace_id`
- `seller_negative_balance_changed` with `seller_id, amount, source_event_id (chargeback), recovery_status`

Audit invariants:
- Every reversal and negative balance entry must trace back to the original `order_id` and `source_event_id`.
- The seller dashboard's total available balance must identically match the sum of `seller_earning_available` ledger entries, not cached provider states.
- No payout can transition to `payout_paid` without the provider `payout_result` matching the debit in the ledger.

Open risks:
- Disputing friendly fraud -> Mitigate by logging API key generation and template download IP/timestamps to win chargeback representment.
- Creator abandonment with negative balance -> Mitigate platform loss by blocking new sales for accounts with unrecovered negative balances past 30 days.
