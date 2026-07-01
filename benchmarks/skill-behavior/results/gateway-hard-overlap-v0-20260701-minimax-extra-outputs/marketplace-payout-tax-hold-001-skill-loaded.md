```text
Marketplace/payout context:
Two-sided AI-skill marketplace. Buyer pays in fiat; seller/creator receives 70% of net (after platform fee + provider fee). Funds flow buyer → payment provider (Stripe/Adyen) → platform account → payout provider (Wise/Payoneer) → creator bank. Risk window is 7-day buyer dispute + 14-day delivery risk. Supports USD, EUR, GBP, INR, JPY. Creator must clear KYC, sanctions, and tax form before payable.

Fee and risk model:
- Platform fee: 25% of gross (tiered 20–30% by skill category/creator tier).
- Provider fee: ~2.9% + $0.30 (payment) + $1.50 (payout) + 0.5% FX, charged to platform, recouped per policy.
- Rolling reserve: 10% of net seller earnings, held 90 days post-payout (new sellers 30% / 180 days).
- Chargeback fee: $15 passed to creator on lost disputes.

Payout policy:
- Cadence: weekly (Tuesday 14:00 UTC); cutoff prior Saturday 23:59 UTC.
- Clearing delay: 7 days after buyer payment captured + delivery/usage confirmation.
- Minimum threshold: $25 (USD-equivalent); balances roll forward.
- Reserve release: post-hold period, batched monthly.
- Currency: settlement USD; creator choice for payout currency at policy FX rate (timestamped).
- Destination change: 48-h verification hold before next batch.

Payout flow:
- payment_captured → risk_window_running, "Earnings pending review"
- risk_window_elapsed → available, "Eligible for next payout"
- hold_created → held, owner=Trust/Safety or Tax, "Review in progress, expected by <date>"
- payout_submitted → in_flight, trace_id shown, "Sent to provider, ETA 1–3 days"
- payout_failed → fix_required, "Destination rejected; update method"
- payout_paid → completed, settlement_lineage shown

Formal state machine:
- buyer_payment_captured → platform_fee_calculated → seller_earning_pending
- seller_earning_pending → risk_window_elapsed → seller_earning_available
- seller_earning_pending|available → refund_processed → seller_earning_reversed
- seller_earning_available → payout_batch_created → payout_submitted → payout_paid
- seller_earning_pending|available → hold_created → seller_earning_held
- seller_earning_held → hold_released → seller_earning_pending|available
- payout_submitted → payout_failed → payout_method_fix_required → payout_resubmitted
- payout_paid → chargeback_received → negative_balance (clawback_ledger_entry)
- tax/sanctions blocker → compliance_held (separate bucket)

Decision table:
- Normal order: pending→available after risk window; include in next batch; show fee breakdown.
- Refund pre-payout: reverse pending + fee per policy; exclude from batch; explain reversal.
- Chargeback post-payout: negative_balance entry; freeze future payouts; show evidence + appeal.
- Fraud signal: move to held; pause payouts; reason code + SLA.
- Tax form expired: compliance_hold; block payout; show remediation path.
- Sanctions match: compliance_held; qualified review; non-sensitive message.
- Failed transfer: revert to available after retry cap; show trace_id + fix steps.
- Negative balance: auto-offset future earnings; show lineage + cure path.

Seller dashboard and support workflow:
- pending / available / held / paid / disputed / negative totals + per-order breakdown.
- Next payout date, threshold progress, reserve release date, destination status.
- Itemized fees, FX rate, provider trace ID, refund/chargeback lineage.
- Hold cards: reason, expected review date, evidence needed, appeal link, SLA.
- Support tooling: dual-approval for manual adjustments, early payout, hold release, forgiveness.
- SLA: standard hold 5 business days; compliance hold routed to qualified owner.

Reserve/hold governance:
- Buyer-dispute hold: trigger=dispute_opened; scope=disputed order; release on resolve/timeout; SLA=10 days; owner=Trust.
- Fraud hold: trigger=velocity/abuse signal; release after review; SLA=5 days; owner=Trust/Safety.
- Tax compliance hold: trigger=missing/expired form; release on verified form; SLA=15 days; owner=Tax (qualified).
- Sanctions hold: trigger=match; release only after qualified resolution; owner=Compliance.
- Rolling reserve: 10% × 90d (new: 30% × 180d); auto-release on cohort schedule.

Compliance/provider readiness:
- Tax form: not_started|submitted|invalid|expired|verified|correction_requested; blocks payable; examples W-9, W-8BEN, W-8BEN-E, VAT/GST ID, 1042-S, 1099-K; route to tax owner.
- Withholding: not_required|required|applied; ledger line item; rate/source evidence.
- Reporting: threshold_monitoring|reportable|exported|filed; lineage preserved.
- Country/provider: eligible|unsupported|provider_restricted; supported alternatives surfaced.
- Sanctions/KYC: not_screened|clear|potential_match|confirmed_blocked; non-sensitive messaging.

Ledger/events:
- marketplace_payment_captured {order_id, buyer_id, seller_id, gross, currency, provider_id}
- seller_earning_posted {earning_id, pending_amount, risk_release_at, fee_split}
- seller_balance_changed {balance_type, delta, reason, ledger_entry_id}
- payout_batch_created / payout_result {batch_id, payout_id, result, trace_id}
- payout_hold_created / _released {reason_code, owner, sla}
- tax_compliance_status_changed {form_status, withholding_rate}
- sanctions_screening_result {status, case_id}
- seller_negative_balance_changed {source_event_id}
Common audit fields: idempotency_key, source_event_id, ledger_entry_id, actor_or_job_id, policy_version, before_balance, after_balance, provider_trace_id, creator_visible_reason.

Audit invariants:
- Displayed balances == sum of ledger entries by balance_type; never from provider callbacks.
- Payout payable_amount <= available − active holds − negative_balance.
- Reversals and clawbacks preserve lineage to source order/payout/event.
- Every payout event idempotent with policy_version + actor/job_id.
- Tax/sanctions holds block payout even if balance positive.

Open risks:
- FX volatility between earn and payout → mitigate with locked rate at risk_window_elapsed.
- Provider outage mid-batch → mitigate with second provider + replay capability.
- Creator gaming via refund-after-payout → mitigate rolling reserve + negative balance recovery.
- Sanctions false positives → mitigate qualified review SLA + appeal path.

Trust metrics:
- payout_latency_p50/p95; held_balance_age; failed_transfer_rate;
- chargeback_loss_rate; negative_balance_recovery_rate;
- payout_ticket_rate; creator_payout_CSAT; reconciliation_mismatch_rate.
```
