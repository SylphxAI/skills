```text
Marketplace/payout context:
- Two-sided creator marketplace. Buyer pays platform; platform takes fee + reserves, seller receives net earning.
- Parties: buyer, seller/creator, platform, payout provider (e.g. Stripe Connect / PayPal MassPay / local rails), tax/sanctions owner.
- Risk window: clearing delay 7d post-delivery or post-fulfillment; rolling reserve TBD by cohort; abuse review window up to 21d.

Fee and risk model:
- Platform fee visible pre-listing. Rolling reserve scoped to flagged earnings, not full history. FX/conversion at provider rate at payout submission; round-half-even. Tax/sanctions owned outside this skill.

Payout policy:
- Cadence: weekly (Tue 12:00 UTC). Clearing delay: 7d after delivery/fulfillment. Reserve: up to 25% of flagged earnings, max 90d, cohort-specific. Min threshold: $50 (or equivalent). Currencies: USD, EUR, GBP, JPY, INR; unsupported currencies blocked. Provider fees: paid by recipient, deducted pre-payout. Conversion policy: locked at batch creation. Negative balance allowed only with dual approval.

Payout flow (owner, evidence, user message):
- earning_pending -> risk_window_elapsed -> earning_available (owner: ledger job; evidence: fulfillment_event; message: "Earning clears in N days")
- earning_available -> payout_batch_created -> payout_submitted -> payout_paid (owner: payout scheduler; evidence: batch_id, idempotency_key; message: "Scheduled/Submitted/Paid")
- payout_submitted -> payout_failed -> payout_method_fix_required -> payout_resubmitted (owner: payout ops; evidence: provider trace; message: "Transfer failed; fix destination")
- payout_paid -> chargeback_received -> negative_balance_or_clawback (owner: finance; evidence: dispute_event; message: "Dispute posted; balance reflects reversal")

Formal state machine (outage branch condensed):
- earning_pending -> refund_processed -> earning_reversed
- earning_pending/available -> risk_or_compliance_hold -> earning_held
- earning_held -> hold_released -> earning_available
- earning_available -> dispute_opened -> earning_disputed -> dispute_won|lost -> available_or_reversed
- payout_paid -> chargeback_received -> negative_balance
- manual_adjustment_requested -> approved -> ledger_adjustment_posted
- Outage: payout_queued -> payout_paused -> payout_provider_pending -> payout_partially_submitted -> payout_failed|retry_blocked -> payout_manual_review -> payout_reconciled -> payout_released|reversed. Owner, evidence, exit gate per skill reference table.

Decision table:
- Normal order -> pending->available after window -> include in batch -> show fee breakdown
- Pre-payout refund -> reverse earning + fee per policy -> exclude -> explain refund
- Post-payout chargeback -> negative balance / clawback -> hold future payouts -> show evidence + appeal
- Fraud signal -> move to held -> pause affected earnings -> reason code + SLA
- Method change -> verify destination -> delay next payout -> notify + log
- FX -> rate lock at batch -> pay destination ccy -> show rate/fees
- Missing/invalid tax form -> tax-blocked -> withhold or block -> "form required"
- Sanctions match -> compliance-held -> block -> non-sensitive review message
- Failed transfer -> return to available/held -> no infinite retry -> provider reason + trace
- Negative balance -> offset future earnings -> block payout -> itemize lineage
- Outage -> queue/pause -> do not mark paid -> "safe, delayed"

Seller dashboard and support workflow:
- Status: pending, available, held, disputed, paid, reversed, failed, negative. Show: next payout, threshold progress, reserve release date, destination state, itemized fees/refunds/withholding/FX, provider trace, reason code, review SLA, appeal link.
- Support tools: full lineage order->payout; evidence checklist; dual approval for adjustments/early payout/hold release/negative-balance forgiveness; safe message templates; no leak of thresholds, model weights, or sanctions/tax conclusions.

Reserve/hold governance (abuse holds):
| Signal | Trigger | Initial action | Scope | Reserve %/duration | Release | Clawback | False-positive guard |
| --- | --- | ------ | --- | --- | --- | --- | --- |
| Refund spike | refund_ratio > 3x cohort, 14d | partial reserve | flagged earnings only | up to 25% / 60d | cohort-normal window clears | only tied reversed earnings | compare to legitimate launch cohort |
| Self-purchase | buyer/seller link, payment fingerprint, device/IP | hold + block payout | linked orders | 100% hold / up to 90d | independent buyer proof | reverse affected earnings | reviewer confirmation before account action |
| Review manipulation | review graph + purchase proof + moderation case | hold tied listings | orders tied to manipulation | 100% / case-resolved | release clean orders | reverse confirmed only | separate organic surge from coordinated |
| Cross-account methods | destination/KYC mismatch | verification hold | affected payouts | 100% until verified | destination verified | negative balance only for paid-out reversed | safe verify path, no threshold leak |
| Threshold farming | velocity + destination change + refund lag | delay/threshold-adjacent reserve | flagged payouts | up to 50% / 30d | order quality + window clear | none by default | do not punish small legit creators |
- Owner: trust & safety ops. Reviewer QA: dual review on account-level; sample 10% of releases; track false-hold rate, appeal overturn, held-balance age.

Appeal workflow:
- Seller opens appeal via dashboard; submits evidence (delivery, KYC, buyer comms, marketing proof).
- SLA: acknowledge 2 business days; resolve 10 business days; escalation to trust lead; external escalation path documented.
- Evidence packet: order IDs, timeline, refund cohort comparison, link graph excerpt, payment fingerprint, moderation case ID, reviewer notes, policy_version.

Compliance/provider readiness (product state only; qualified owner decides):
- Tax form lifecycle: not_started, submitted, invalid, expired, verified, correction_requested -> block payout or apply approved withholding. Examples: W-9, W-8BEN, W-88BEN-E, VAT/GST ID, local equivalents, 1099-K/1042-S reportable thresholds tracked.
- Withholding: not_required, pending_policy, required, applied, refunded_or_adjusted.
- Statutory reporting: not_reportable, threshold_monitoring, reportable, export_generated, filed_or_handed_off, correction_needed.
- Country/provider: eligible, unsupported_country, unsupported_currency, provider_restricted, destination_invalid.
- Sanctions/KYC: not_screened, clear, potential_match, confirmed_blocked, false_positive_released.

Ledger/events (key):
- marketplace_payment_captured, marketplace_fee_calculated, seller_earning_posted, seller_balance_changed, payout_batch_created, payout_result, payout_incident_state_changed, payout_webhook_quarantined, payout_reconciliation_completed, payout_hold_created, payout_hold_released, tax_compliance_status_changed, sanctions_screening_result, seller_negative_balance_changed. Include idempotency_key, source_event_id, ledger_entry_id, actor_or_job_id, policy_version, before/after_balance, provider_trace_id, support_case_id, creator_visible_reason.

Audit invariants:
- Displayed balances reconcile to ledger; provider "paid" is never asserted without ledger + reconciliation agreement.
- Every payout-affecting event idempotent and traceable to source event, policy version, actor.
- Reversed/negative balances preserve lineage to original order/payout/refund/dispute/adjustment.
- Support cannot silently override fraud/tax/sanctions/compliance holds without approved ledger adjustment.
- Abuse holds scoped to flagged earnings; historical balance unaffected without reviewer + dual approval.

Open risks:
- False positives hurting legitimate launch winners -> reserve release SLA + appeal overturn tracked; cohort comparison mandatory.
- Threshold farming policy could penalize small creators -> cap duration at 30d; require velocity+change+lag combo.
- Reserve fund liquidity -> forecast reserve exposure weekly; finance sign-off.
- Provider outage masking duplicates -> quarantine + 3-way match before release.
- Sanctions/tax misclassification -> qualified owner reviews form status before any block; safe messaging only.

Trust metrics:
- creator_payout_csat, creator_payout_ticket_rate, payout_latency_p50/p95, held_balance_age_p90, false_hold_rate, appeal_overturn_rate, reversal_loss_usd, negative_balance_recovery_rate, failed_transfer_rate, reconciliation_mismatch_rate, legitimate_launch_release_time_p95, dispute_win_rate.
```
