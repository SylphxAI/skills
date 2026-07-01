```text
Marketplace/payout context:
- Two-sided marketplace: buyers purchase AI prompt/template packs; creators earn revenue share. Parties: buyer, platform, creator, payment provider, payout provider, tax/compliance service.
- Transaction model: buyer pays gross; platform calculates fee; creator earning accrues as pending; payout scheduled after risk window. Dual-leg ledger (order/earning/payout) with provider trace IDs.

Fee and risk model:
- Platform fee 30% (default), 15% (verified partner tier), 0% (promo). Payment processor fee 2.9% + $0.30 borne by platform. FX fee 1.5% on non-USD destinations. Rolling reserve 10% for 90 days on creators <$1k lifetime earnings.

Payout policy:
- Cadence: weekly (Mon cutoff Fri payout) / monthly (1st) once threshold met. Clearing delay: 7 days post-purchase or 48h post-delivery confirmation, whichever later. Minimum threshold: $25 USD equivalent. Currencies: USD, EUR, GBP, JPY. Reserve: 10% / 90d, first $5k. Provider fees: platform absorbs processor; FX and transfer fees deducted from payout.

Payout flow:
- captured -> platform owns, buyer paid
- earning_pending -> creator owes, awaiting risk window
- earning_available -> eligible for next batch
- earning_held (fraud/KYC/tax/sanction) -> review owner + SLA
- earning_disputed -> chargeback/dispute open
- payout_submitted -> in flight to provider
- payout_paid -> reconciled to bank/wallet
- payout_failed -> destination fix required
- negative_balance -> recoverable from future earnings

Formal state machine:
- payment_captured -> fee_calculated -> earning_pending
- earning_pending -> risk_window_elapsed -> earning_available
- earning_pending -> refund_processed -> earning_reversed (refund issued before payout)
- earning_available -> refund_processed -> earning_reversed (debited from available; if insufficient -> negative_balance)
- earning_available -> payout_batch_created -> payout_submitted -> payout_paid
- earning_pending|available -> hold_triggered -> earning_held (reason_code required)
- earning_held -> hold_released -> earning_pending|available (reviewer_id logged)
- payout_submitted -> payout_failed -> payout_method_fix_required -> payout_resubmitted
- payout_paid -> chargeback_received -> negative_balance_or_clawback (lineage preserved)

Decision table:
- Normal sale: pending->available after 7d; include next batch; show fee breakdown
- Pre-payout refund: reverse pending earning + fee per policy; exclude from batch; notify creator
- Post-payout refund/chargeback: debit available or create negative_balance; pause payout if negative; show dispute evidence
- Fraud signal: move to held; pause payout; reason code + SLA shown
- Missing tax form: earnings accrue, not payable; withhold per qualified policy; show form status
- Sanctions/KYC match: compliance_held; block payout; non-sensitive status only
- Failed payout: route to method_fix_required; do not retry invalid destination >3 times; show trace ID
- Currency conversion: rate locked at batch creation; show rate, fees, source amount

Seller dashboard and support workflow:
- Dashboard states: pending, available, held, disputed, paid, reversed, negative_balance; next payout date, threshold progress, reserve release date, destination status.
- Itemized fees, refunds, chargebacks, withholding, FX rate, provider trace IDs visible.
- Reason-coded holds with expected review time, evidence checklist, appeal button, support case link.
- Support tooling: full lineage (order/payment/fee/earning/hold/refund/dispute/adjustment/payout), dual approval for manual adjustments/early payout/hold release/goodwill >$100, safe templates (no legal/tax/fraud conclusions).
- SLA: hold review 5 business days; payout ticket first response 24h; dispute appeal 7 days.

Reserve/hold governance:
- Fraud_hold: trigger=velocity/abuse signal; scope=matching earnings; release=manual review; SLA=5bd; owner=trust ops; appeal=support case.
- KYC_hold: trigger=incomplete/expired docs; release=KYC pass; SLA=10bd; owner=compliance ops; appeal=re-submit docs.
- Tax_hold: trigger=missing W-9/W-8/equivalent; release=form accepted; SLA=15bd; owner=tax ops; appeal=form upload.
- Sanctions_hold: trigger=screening match; release=qualified review only; SLA=per case; owner=compliance; appeal=legal route.
- Rolling reserve: 10%/90d, first $5k; release=automatic on schedule; owner=finance ops.

Compliance/provider readiness:
- Tax: W-9/W-8BEN required before payable; withholding per jurisdiction; status visible.
- Sanctions: screening on onboarding + payout; periodic rescreen; failed=compliance_held.
- Country eligibility: tiered list; blocked countries=earnings accrued, never payable, status shown.
- Provider: Stripe Connect (cards), PayPal/Wise (payouts); failed transfer recovery; negative balance cap; payout limits per KYC tier.

Ledger/events:
- marketplace_payment_captured, marketplace_fee_calculated, seller_earning_posted, seller_balance_changed, payout_batch_created, payout_result, payout_hold_created, payout_hold_released, tax_compliance_status_changed, sanctions_screening_result, seller_negative_balance_changed. Audit fields: idempotency_key, source_event_id, ledger_entry_id, actor_or_job_id, policy_version, before_balance, after_balance, provider_trace_id, support_case_id, creator_visible_reason.

Audit invariants:
- Displayed balances == sum of ledger entries by type; provider payout_paid requires ledger agreement before UI flips.
- All payout events idempotent and traceable to source event + policy version + actor.
- Reversed/negative entries preserve lineage to original order/payout/dispute/adjustment.
- Support cannot silently release fraud/tax/sanctions holds; only approved ledger adjustments count.
- Reconciliation job: daily ledger vs provider vs bank; mismatch >$1 raises alert.

Open risks:
- AI-content fraud (stolen prompts) -> automated similarity scan + buyer dispute window extension to 14d for flagged items.
- Currency volatility -> lock rate at batch; show delta on payout statement.
- Creator bankruptcy/chargeback surge -> rolling reserve + cohort-based payout cap.
- Provider outage -> queue payouts, never mark paid without confirmation.

Trust metrics:
- payout_latency_p50/p95; held_balance_age_days; failed_transfer_rate; dispute_win_rate; reversal_loss_pct; negative_balance_recovery_pct; creator_payout_ticket_rate; creator_payout_CSAT; reconciliation_mismatch_count.
```
