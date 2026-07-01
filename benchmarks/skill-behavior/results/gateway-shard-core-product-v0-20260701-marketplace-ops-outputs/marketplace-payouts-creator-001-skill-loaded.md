Marketplace/payout context:
AI template marketplace where buyers purchase digital templates/prompts/workflows from creators. Platform collects buyer payment, deducts fees/revenue share, posts creator earnings, and pays creators after risk and compliance checks.

Parties:
- Buyer: pays platform, may request refund or dispute charge.
- Creator/seller: lists templates, receives net earnings.
- Platform: merchant/platform operator, owns policy, ledger, support, fraud review.
- Payment/payout provider: processes buyer payments and creator payouts.
- Compliance/tax provider/team: KYC, sanctions, tax forms, withholding handoff.

Fee and risk model:
- Revenue share: e.g. creator receives 70%, platform retains 30%, configurable by product/category/promotion.
- Provider fees: either absorbed by platform or deducted per documented policy.
- Taxes/VAT/GST: calculated separately from creator revenue share unless policy says otherwise.
- Withholding: applied only after tax/compliance determination.
- Refund window: e.g. 7–14 days for eligible template issues, duplicate purchase, misrepresentation, or non-delivery/access failure.
- Chargeback window: provider/card-network dependent; post-payout chargebacks create negative balance or clawback.
- Payout cadence: weekly or monthly, with minimum payout threshold.
- Risk release: earnings become available after refund/risk window, delivery/access confirmation, and no active fraud/compliance hold.
- Creator must complete onboarding, payout method verification, KYC/sanctions, and tax form collection before payout.

Payout flow:
- `creator_onboarded_pending_verification` -> owner: compliance/platform; evidence: identity, tax form, sanctions check, payout destination; user message: “Complete verification before payouts can be sent.”
- `buyer_payment_captured` -> owner: payments; evidence: order, buyer, gross, currency, provider charge ID; user message: “Payment received.”
- `platform_fee_calculated` -> owner: ledger/finance; evidence: fee schedule, revenue share, tax/provider fee policy; user message: “Fee breakdown available.”
- `seller_earning_pending` -> owner: ledger; evidence: order, creator, gross, fees, net earning, `risk_release_at`; user message: “Earnings pending until refund/risk window ends.”
- `seller_earning_held` -> owner: risk/compliance/support; evidence: reason code, affected orders, review SLA; user message: “Payout temporarily held. Reason and review timeline shown.”
- `seller_earning_available` -> owner: ledger; evidence: elapsed risk window, no open refund/dispute/fraud hold; user message: “Available for next payout.”
- `payout_batch_created` -> owner: finance/ops; evidence: eligible creators, available balances, minimum threshold, currency; user message: “Scheduled for payout.”
- `payout_submitted` -> owner: payout provider; evidence: payout ID, destination, amount; user message: “Payout submitted.”
- `payout_paid` -> owner: payout provider/ledger; evidence: provider confirmation, payout statement; user message: “Payout completed.”
- `payout_failed` -> owner: creator/support; evidence: failure reason, provider code; user message: “Update payout method to retry.”
- `refund_or_dispute_opened` -> owner: support/risk; evidence: buyer claim, access logs, template listing, chat/ticket history; user message: creator sees affected balance/dispute status.
- `chargeback_received_after_payout` -> owner: risk/finance; evidence: provider dispute, order lineage; user message: “Chargeback created a negative balance or offset.”
- `manual_adjustment_posted` -> owner: finance approver; evidence: role, reason, approval, audit log; user message: material explanation visible.

Decision table:
- Normal completed purchase -> move creator net earning from pending to available after risk window; include in next payout; show gross, fees, taxes, net, release date.
- Buyer refund before payout -> reverse pending earning and applicable platform fee per policy; exclude from payout; show refund reason and balance change.
- Buyer refund after payout -> create negative balance or offset future earnings; optionally claw back if contract allows; support explains policy and order lineage.
- Chargeback before payout -> move amount to disputed/held; pause affected payout; support collects evidence from listing, delivery/access logs, buyer messages.
- Chargeback after payout -> create negative balance/clawback entry; hold future payouts if needed; provide dispute evidence and appeal route.
- Fraud suspicion: fake purchases, stolen cards, self-dealing, review manipulation -> move affected earnings to held; pause payout for affected seller/orders; reason code, review owner, SLA, appeal path.
- Creator fails KYC/tax/sanctions -> earnings may remain ledgered but unavailable for payout; block payout; route to qualified compliance review.
- Creator changes payout method -> verify destination and apply cooling-off period if needed; delay next payout for changed destination; notify and audit log.
- Payout method failure -> keep amount available or mark payout failed, not paid; retry after fix; show failure reason.
- Cross-currency sale/payout -> record source currency, FX rate source/time, rounding, fees; pay destination currency; show statement line.
- Manual goodwill credit/debit -> ledger adjustment only after approval; affect available/held balance per reason; seller-visible explanation when material.
- Template removed for policy violation -> hold unpaid related earnings pending review; stop new sales; support shows affected orders and appeal path.

Ledger/events:
- `creator_onboarding_status_changed`: creator_id, status, kyc_status, tax_status, sanctions_status, payout_enabled.
- `marketplace_payment_captured`: order_id, buyer_id, seller_id, gross_amount, currency, provider_charge_id.
- `marketplace_fee_calculated`: order_id, fee_type, fee_amount, revenue_share_rate, provider_fee_policy, tax_amount, currency.
- `seller_earning_posted`: earning_id, seller_id, order_id, pending_amount, currency, risk_release_at.
- `seller_balance_changed`: seller_id, balance_type, delta_amount, reason, ledger_entry_id.
- `payout_hold_created`: seller_id, order_ids, amount, reason_code, review_owner, expected_review_at.
- `refund_posted`: order_id, refund_amount, policy_reason, earning_reversal_amount, fee_reversal_amount.
- `chargeback_received`: order_id, amount, provider_dispute_id, evidence_due_at, status.
- `payout_batch_created`: batch_id, seller_count, total_amount, currency, schedule.
- `payout_result`: payout_id, seller_id, amount, destination_type, result, failure_reason.
- `manual_adjustment_posted`: adjustment_id, seller_id, amount, reason, approver_id, audit_log_id.

Seller dashboard:
- Balances: pending, available, held, disputed, paid, negative balance.
- Per-order statement: gross sale, tax, platform fee, provider fee if applicable, net earning, release date, payout ID.
- Holds: reason code, amount, affected orders, review SLA, evidence requested, appeal/contact path.
- Refunds/disputes: status, buyer claim category, balance impact, evidence deadline.
- Tax/compliance: verification status, missing forms, withholding summary, payout eligibility.
- Payouts: schedule, threshold, method status, submitted/paid/failed history.

Support operations:
- One view linking buyer payment, listing, access logs, creator earning, fee entries, balance changes, holds, refunds, disputes, payout attempts, and provider IDs.
- Support actions are permissioned: view, request evidence, create case, escalate to risk/compliance, propose adjustment.
- Finance-only actions: approve adjustment, release hold, create clawback/negative balance, reconcile payout batch.
- All actions require reason codes and audit logs.

Open risks:
- Paying before refund/chargeback risk expires -> enforce pending period and risk release gates.
- Opaque creator holds -> require reason, evidence, owner, SLA, appeal path.
- Ledger/provider mismatch -> daily reconciliation of charges, refunds, disputes, balances, payout batches, provider confirmations.
- Compliance-sensitive payout decisions -> route KYC, sanctions, tax, and money-transmission questions to qualified review.
- Abuse via self-purchase or stolen cards -> fraud scoring, velocity checks, related-account detection, manual review.
