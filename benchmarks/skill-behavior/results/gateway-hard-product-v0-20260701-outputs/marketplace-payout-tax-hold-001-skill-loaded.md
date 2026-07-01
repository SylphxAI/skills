Marketplace/payout context:
Global AI-skill marketplace where buyers purchase skills/subscriptions/usage credits from creators. Platform collects buyer payment, calculates taxes/fees/revenue share, posts creator earnings to pending balance, releases to available after risk window, and pays creators on schedule if identity/tax/sanctions/payout method checks pass.

Fee and risk model:
- Gross buyer payment: item price + applicable buyer taxes/fees.
- Deductions before creator earning: platform commission, payment/provider fees if policy says creator bears them, refunds, chargebacks, tax withholding where applicable.
- Creator balances shown separately: pending, available, held, disputed, paid, negative.
- Risk window: configurable by product/type/creator risk, e.g. 7–30 days after delivery/usage confirmation; longer for new/high-risk creators.
- Minimum payout threshold: e.g. $25 or local equivalent; amounts below threshold remain available until threshold met or account closure policy applies.
- Payout cadence: weekly/monthly batch, subject to threshold, compliance status, no active blocking hold.
- Compliance: tax forms, identity, sanctions, and money-transmission questions route to qualified compliance/legal review.

Payout flow:
- `buyer_payment_captured` -> owner: payments; evidence: provider charge ID, buyer, order, amount; user message: “Payment received.”
- `platform_fee_calculated` -> owner: billing/finance; evidence: fee rule version, tax/FX inputs; user message: “Fee and earnings breakdown available.”
- `seller_earning_pending` -> owner: marketplace ledger; evidence: order, creator, gross, fees, pending amount, release date; user message: “Earnings pending until risk window ends.”
- `fraud_or_policy_review_hold` -> owner: risk/support; evidence: signals, reason code, affected orders, SLA; user message: “Some earnings are on hold for review. Reason and expected review date shown.”
- `seller_earning_available` -> owner: ledger; evidence: risk window elapsed, no blocking dispute/refund/hold; user message: “Earnings available for payout.”
- `payout_eligibility_check` -> owner: payouts/compliance; evidence: balance, threshold, tax form, sanctions status, payout method; user message: “Eligible/ineligible reason shown.”
- `payout_batch_created` -> owner: finance ops; evidence: batch ID, creator IDs, amounts, currency; user message: “Payout scheduled.”
- `payout_submitted` -> owner: payout provider integration; evidence: provider payout ID, destination, amount; user message: “Payout sent to bank/payment account.”
- `payout_paid` -> owner: provider/finance; evidence: settlement confirmation; user message: “Payout completed.”
- `payout_failed` -> owner: payouts/support; evidence: provider failure code, bank return reason; user message: “Payout failed. Update payout method or contact support.”
- `refund_or_dispute` -> owner: support/risk/payments; evidence: buyer claim, refund reason, dispute deadline, order lineage; user message: “Earnings adjusted due to refund/dispute.”
- `negative_balance_or_clawback` -> owner: finance/risk; evidence: chargeback/refund after payout, ledger lineage; user message: “Account balance is negative due to prior paid earnings being reversed.”

Decision table:
- Normal completed purchase -> move earning pending to available after risk window; include in next payout if threshold met; show gross, fees, net, release date.
- Refund before release -> reverse pending earning and applicable fees per policy; exclude from payout; show refund reason and reversed amount.
- Partial refund -> proportional earning/fee reversal; reduce pending/available balance; show calculation.
- Buyer dispute before payout -> move affected amount to disputed/held; block affected payout; show dispute status and evidence request.
- Chargeback after payout -> post negative balance/clawback ledger entry; offset future payouts or initiate recovery if policy allows; give appeal route.
- Fraud suspicion -> move affected earnings to held; pause related payouts; show reason code, review owner, expected review date.
- Sanctions screening hit -> block payouts, not necessarily sales unless policy requires; route to compliance; give generic compliance-review message.
- Missing/invalid tax form -> allow earning accrual but block payout or apply withholding per jurisdiction; show required form/status.
- Creator below threshold -> keep available balance unpaid; include once threshold met; show threshold progress.
- Failed bank transfer -> return amount to available or held depending on failure reason; require payout method fix; show failure code in plain language.
- Creator changes payout method -> verify destination; optionally delay next payout; notify and audit-log change.
- Negative balance -> apply future earnings to negative first; block payout until non-negative and threshold met; support sees original reversal lineage.
- Manual adjustment -> require approval, reason, audit log; post ledger adjustment; show seller-visible explanation if material.

Ledger/events:
- `marketplace_payment_captured`: order_id, buyer_id, creator_id, gross_amount, currency, provider_charge_id.
- `marketplace_fee_calculated`: order_id, fee_type, fee_amount, rate, tax_amount, provider_fee, currency, rule_version.
- `seller_earning_posted`: earning_id, creator_id, order_id, pending_amount, currency, risk_release_at.
- `seller_balance_changed`: creator_id, balance_type, delta_amount, reason_code, ledger_entry_id, source_event_id.
- `payout_hold_created`: creator_id, amount, reason_code, review_owner, expected_review_at, evidence_refs.
- `payout_hold_released`: hold_id, creator_id, amount, resolution_reason.
- `refund_processed`: order_id, amount, refund_type, earning_reversal_amount, fee_reversal_amount.
- `buyer_dispute_opened`: order_id, dispute_id, amount, deadline, status.
- `chargeback_posted`: order_id, dispute_id, amount, provider_fee, creator_liability_amount.
- `payout_batch_created`: batch_id, seller_count, total_amount, currency, schedule_date.
- `payout_result`: payout_id, creator_id, amount, currency, destination_type, result, failure_reason.
- `manual_adjustment_posted`: adjustment_id, creator_id, amount, approver_id, reason, visible_note.
- `tax_compliance_status_changed`: creator_id, jurisdiction, status, withholding_rate, effective_at.
- `sanctions_screening_result`: creator_id, status, match_confidence, compliance_case_id.

Open risks:
- Cross-currency confusion -> show source currency, FX rate source/time, rounding, payout currency, fees.
- Opaque holds causing creator distrust -> require reason codes, SLA, owner, evidence, appeal path.
- Paying before refund/dispute risk expires -> enforce release date and risk-based holds.
- Ledger/display mismatch -> derive dashboard balances only from immutable ledger entries.
- Support spreadsheet dependency -> build support view linking order, charge, earning, fee, refund, dispute, hold, payout, and ticket.
- Regulatory/tax errors -> route tax, sanctions, identity, and withholding decisions to qualified compliance review with auditable case IDs.
