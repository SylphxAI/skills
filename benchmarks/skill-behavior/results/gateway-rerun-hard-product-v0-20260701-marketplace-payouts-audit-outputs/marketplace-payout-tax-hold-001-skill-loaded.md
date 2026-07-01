Marketplace/payout context:  
Global AI-skill marketplace. Buyers purchase skill access/usage; creators earn revenue share. Platform is merchant/marketplace operator; payout provider handles creator transfers. Support, Risk, Finance, Tax/Compliance are separate owners.

Fee and risk model:
- Gross buyer payment minus taxes/processor fees if applicable, refunds, chargebacks, platform fee, withholding, reserves = creator payable.
- Creator earnings remain `pending` until payment settlement, delivery/usage confirmation, refund-risk window, and fraud checks pass.
- Minimum payout threshold per currency/country; below threshold remains `available` but unpaid.
- Displayed balances derive only from ledger: pending, available, held, disputed, paid, reversed, negative.

Payout flow:
- Payment captured -> Finance ledger owns; evidence: provider charge ID, order ID; message: “Payment received.”
- Fee calculated -> Finance owns; evidence: fee policy version; message: “Marketplace fee applied.”
- Creator earning pending -> Ledger owns; evidence: order, gross, fee, risk release date; message: “Earnings pending until eligible.”
- Risk/compliance review -> Risk/Compliance owns; evidence: reason code, case ID; message: “Payout temporarily under review.”
- Available balance -> Finance owns; evidence: elapsed risk window, no blocking holds; message: “Eligible for payout.”
- Payout batch created -> Payout Ops owns; evidence: batch ID, threshold, destination status; message: “Scheduled for payout.”
- Payout submitted/paid -> Provider + Finance owns; evidence: provider trace ID; message: “Payout sent/paid.”
- Failed payout -> Payout Ops owns; evidence: provider failure code; message: “Update payout method.”
- Refund/dispute/chargeback -> Support/Risk/Finance owns; evidence: refund/dispute ID; message: “Balance adjusted due to refund/dispute.”

Formal state machine:
- `buyer_payment_captured` -> fee calculation -> `platform_fee_calculated`, ledger effect: gross receivable and fee entries, invariant: fee policy version stored.
- `platform_fee_calculated` -> earning post -> `seller_earning_pending`, ledger effect: pending creator earning, invariant: gross = fee + creator earning + taxes/adjustments.
- `seller_earning_pending` -> risk window elapsed -> `seller_earning_available`, ledger effect: pending decrease, available increase, invariant: no active blocking hold/dispute.
- `seller_earning_pending` -> refund processed -> `seller_earning_reversed`, ledger effect: reverse pending earning and fee per policy, invariant: reversal links to original order.
- `seller_earning_available` -> refund/chargeback -> `negative_balance_or_reversal`, ledger effect: available decrease or negative balance, invariant: lineage to payout/refund/dispute.
- `seller_earning_pending/available` -> fraud/compliance trigger -> `seller_earning_held`, ledger effect: held balance increase, invariant: reason, owner, SLA visible.
- `seller_earning_held` -> release approved -> `pending_or_available`, ledger effect: held decrease, invariant: reviewer/case ID recorded.
- `seller_earning_pending` -> dispute opened -> `seller_earning_disputed`, ledger effect: disputed balance increase, invariant: dispute ID linked.
- `seller_earning_disputed` -> dispute won -> `available_or_held`, ledger effect: disputed decrease, invariant: outcome evidence stored.
- `seller_earning_disputed` -> dispute lost -> `reversed_or_negative_balance`, ledger effect: reversal/negative entry, invariant: no orphan dispute.
- `seller_earning_available` -> payout batch created -> `payout_submitted`, ledger effect: payable reserved, invariant: threshold, tax, sanctions, destination eligibility passed.
- `payout_submitted` -> provider paid -> `payout_paid`, ledger effect: paid balance increase, available/payable decrease, invariant: provider trace reconciled.
- `payout_submitted` -> provider failed -> `payout_failed`, ledger effect: return to available or held, invariant: failure reason visible.
- `manual_adjustment_requested` -> approval -> `ledger_adjustment_posted`, ledger effect: adjustment entry, invariant: role, reason, approval, support note stored.

Decision table:
- Normal completed order -> move pending to available after risk window; include in next eligible batch; show order/fee breakdown.
- Below minimum threshold -> keep available unpaid; skip payout; show threshold and current progress.
- Buyer refund before payout -> reverse pending/available earning; exclude from payout; explain refund lineage.
- Chargeback after payout -> create negative balance/clawback; offset future earnings or hold payouts; show dispute and appeal path.
- Fraud suspicion -> move scoped funds to held; pause affected payout; show reason code and review SLA.
- Missing tax form -> accrue but block or withhold per qualified policy; no full payout if blocked; show required form/status.
- Sanctions/KYC potential match -> compliance-held; block payout; show non-sensitive review message.
- Failed bank transfer -> return to available or held based on reason; stop retries to invalid destination; show provider reason and trace ID.
- Negative balance -> offset future earnings before payout; block payouts until cured unless approved exception; show itemized reversals.
- Creator support ticket -> no silent balance changes; support views lineage and escalates to owner.

Reserve/hold governance:
- Fraud hold -> trigger: anomaly, stolen payment signals, abuse reports; scope: affected orders/account; release: risk cleared; SLA: 3–10 business days; owner: Risk; appeal via support case.
- Compliance hold -> trigger: sanctions/KYC/tax eligibility issue; scope: all payable funds where required; release: qualified clearance; SLA: policy-defined; owner: Compliance/Tax; appeal/escalation via compliance ticket.
- Dispute hold -> trigger: buyer dispute/chargeback; scope: disputed order amount plus fees; release: dispute resolved; SLA: network/provider timeline; owner: Risk/Support.
- Reserve -> trigger: new creator, high refund rate, risky category/country; scope: percent or fixed rolling reserve; release: rolling period elapsed and metrics acceptable; owner: Risk/Finance.
- Payout-method hold -> trigger: invalid/changed bank account; scope: payout only, not earnings; release: verified destination; owner: Payout Ops.

Compliance/provider readiness:
- Tax form status -> product state: missing/valid/expired/withholding_applied; evidence: form/version/effective date; support message: “Tax information required or withholding applied”; owner: Tax.
- Sanctions/KYC -> state: clear/review/blocked; evidence: screening case ID; message: “Compliance review in progress”; owner: Compliance.
- Country/provider eligibility -> state: supported/unsupported/restricted; evidence: provider rules; message: “Payouts unavailable in this country”; owner: Payout Ops/Legal.
- Currency conversion -> state: source/destination currency, rate source/time, rounding; evidence: FX quote; message: rate and fees shown.
- Failed transfers -> state: failed_fix_required/resubmitted; evidence: provider trace; owner: Payout Ops.

Ledger/events:
- `marketplace_payment_captured`: order_id, buyer_id, creator_id, gross_amount, currency, provider_id.
- `marketplace_fee_calculated`: order_id, fee_type, fee_amount, rate, policy_version.
- `creator_earning_posted`: earning_id, creator_id, order_id, pending_amount, risk_release_at.
- `creator_balance_changed`: balance_type, delta, reason, ledger_entry_id.
- `payout_hold_created/released`: hold_id, reason_code, owner, SLA, case_id.
- `refund_processed`, `dispute_opened/resolved`, `chargeback_received`.
- `payout_batch_created`, `payout_result`.
- `tax_compliance_status_changed`, `sanctions_screening_result`.
- `creator_negative_balance_changed`.
- All include idempotency_key, source_event_id, actor/job, provider_trace_id where applicable.

Audit invariants:
- Displayed balances reconcile to ledger entries, never provider callbacks or cached UI.
- No payout if active refund-risk, fraud, dispute, tax, sanctions, country, threshold, or destination block exists.
- Every hold has reason, evidence, owner, SLA, and creator-visible status.
- Every reversal/negative balance links to original order, refund, dispute, chargeback, payout, or adjustment.
- Provider “paid” status requires ledger state plus reconciliation match.
- Support can explain and escalate, not bypass holds without approved ledger adjustment.

Open risks:
- Cross-border tax and money-transmission complexity -> qualified legal/tax review before launch by country.
- Abuse via rapid sales then cash-out -> rolling reserve, velocity limits, delayed first payout.
- Provider callback inconsistency -> daily reconciliation and idempotent event processing.
