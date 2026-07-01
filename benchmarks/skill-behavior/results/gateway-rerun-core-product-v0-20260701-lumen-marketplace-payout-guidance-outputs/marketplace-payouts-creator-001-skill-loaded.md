Marketplace/payout context: Two-sided AI template marketplace. Buyers purchase AI prompts/templates; platform takes a revenue share; creators (sellers) receive payouts via Stripe Connect. Digital goods imply instant delivery but carry risks of plagiarism, non-functionality, or chargebacks.

Fee and risk model: 80/20 revenue share (creator/platform). 14-day risk window post-purchase to account for refunds and digital fraud.

Payout policy:
- Cadence / clearing delay / minimum threshold / currencies / provider fees: Monthly cadence (1st of month); 14-day clearing delay; $50 USD minimum threshold; USD settlement with multi-currency payout capabilities; creators pay Stripe Connect payout fees.

Payout flow:
- seller_earning_pending -> Platform, transaction record, "Your template sale is processing."
- seller_earning_available -> Platform, risk window cleared, "Funds released to available balance."
- seller_earning_held -> Trust & Safety, flagged template/fraud, "Earnings held for review."
- payout_paid -> Provider, Stripe trace ID, "Payout sent to your bank."

Formal state machine:
- buyer_payment_captured -> payment_success -> seller_earning_pending, ledger +pending, invariant: pending == gross - platform_fee
- seller_earning_pending -> 14_days_elapsed -> seller_earning_available, ledger -pending +available, invariant: available >= 0
- seller_earning_available -> payout_batch_created -> payout_submitted, ledger -available +in_transit, invariant: in_transit == batch_amount
- payout_submitted -> provider_webhook -> payout_paid, ledger -in_transit +paid, invariant: provider_state == ledger_paid

Decision table:
- Normal completed order -> Move pending to available after 14 days -> Include in next payout batch -> Show transaction and fee breakdown
- Buyer refund before payout -> Reverse pending earning and platform fee -> Exclude from payout -> Explain refund and balance change
- Chargeback after payout -> Create negative balance entry -> Offset future earnings -> Show dispute evidence and appeal route
- Fraud suspicion (e.g., scraped AI template) -> Move amount to held -> Pause affected payouts -> Provide reason code and review SLA
- Missing tax/KYC info -> Keep accrued, non-payable -> Block payout -> Show required form/status

Seller dashboard and support workflow:
- Pending -> "Earnings in clearing period", transaction ID, Wait 14 days, SLA: 14d, Admin: monitor
- Held -> "Under platform review", reason code (e.g., IP infringement), Submit appeal, SLA: 5d, Admin: Trust & Safety
- Blocked (KYC/Tax) -> "Action required for payout", missing W-9/W-8BEN, Submit docs, SLA: 3d, Admin: Compliance

Reserve/hold governance:
- Fraud/Risk Hold -> Trigger: high dispute rate or flagged content; Scope: recent 14 days of earnings; Release criteria: manual review pass; SLA: 5 days; Owner: Trust & Safety; Appeal: support ticket with original creator proof.

Compliance/provider readiness:
- KYC/Tax status -> Product state: accrued but not payable; Evidence: Stripe Connect requirements; Support message: "Complete tax/KYC to unlock payouts"; Qualified-review owner: Compliance/Finance.
- Sanctions match -> Product state: compliance-held; Evidence: OFAC/AML screening flag; Support message: "Account under compliance review"; Qualified-review owner: Legal.

Ledger/events:
- `marketplace_payment_captured`: order_id, buyer_id, seller_id, gross_amount, currency
- `marketplace_fee_calculated`: order_id, fee_amount (20%), revenue_share_rate (0.8)
- `seller_earning_posted`: earning_id, seller_id, pending_amount, risk_release_at
- `payout_result`: payout_id, seller_id, amount, destination_type, result, provider_trace_id

Audit invariants:
- Sum(displayed pending + available + held + paid + negative) must equal total ledger state.
- Provider payout state cannot mark funds 'paid' unless ledger state and reconciliation agree.
- Every held amount must have an active support case ID and reason code.

Open risks:
- Stolen/plagiarized AI templates generating volume -> Mitigation: 14-day hold and automated IP similarity checks before clearing.
- Creator changes bank details last minute -> Mitigation: 7-day payout delay on new destination changes.

Trust metrics:
- Payout latency, Reconciliation mismatch rate, Held-balance age, Dispute win rate, Negative-balance recovery rate.
