```text
Marketplace/payout context: Creator marketplace; weekly payout cadence; rolling reserve 10%/90d; clearing delay 7d post-delivery. Single seller; ~5 concurrent blockers; support SLA pressure vs. compliance gating.

Fee and risk model: Platform fee 12% + provider fee; 7-day clearing, 90-day reserve release; chargeback creates clawback; reserve collateralized before payout.

Payout policy:
- Cadence: Weekly (Mon). Clearing delay: 7d post-delivery. Minimum threshold: $50 USD-equiv. Currencies: USD, EUR, GBP, JPY. Provider fees: borne by seller on refund/chargeback/disputed destinations. Conversion: mid-market at payout batch creation; rounding to minor unit.

Payout flow:
- compliance_held -> Tax/Compliance, form + screening decision + remediation case, "Review in progress; funds safely unavailable until verified"
- payout_method_fix_required -> Seller, destination micro-deposit/verification proof, "New destination unverified; confirm to resume payouts"
- negative_balance -> Platform Finance, clawback + recovery ledger entries, "Outstanding balance offset against future earnings"
- reserve_held -> Platform Risk, cohort policy + risk window elapsed, "Reserve releasing per policy on YYYY-MM-DD"
- payout_blocked_tax -> Compliance owner + seller, W-8BEN renewal, "Form expired; renewed W-8BEN required to release"

Formal state machine:
- valid_tax_form -> form_expired -> tax_blocked_payout (block payout, accrue earnings, ledger: tax_blocked += earning) {INV: payable >= 0}
- sanctions_clear -> potential_match -> compliance_held (block payout, ledger: payable -> compliance_held) {INV: no payout while hold open}
- payout_paid -> bank_transfer_failed -> payout_method_fix_required (ledger: paid -> available, mark payout_failed) {INV: no double-pay}
- seller_earning_available -> chargeback_received -> negative_balance (ledger: available -=; negative_balance +=) {INV: lineage to order preserved}
- negative_balance -> earning_posted -> offset_before_new_payout {INV: payable <= new earning net}
- compliance_held -> hold_released -> available_or_payout_eligible (release only after qualified review) {INV: dual-sign + audit log}
- tax_blocked_payout -> form_renewed -> available (release withholding only per qualified policy)

Decision table:
- Expired W-8BEN -> accrues; payout BLOCKED; show renewal CTA + qualified-tax route
- Sanctions potential match -> accrues; payout COMPLIANCE-HELD; non-sensitive message; case ID given
- Failed bank transfer (new dest) -> accrues; payout METHOD-FIX-REQUIRED; show trace ID + verification steps
- Chargeback on paid earnings -> create negative_balance; freeze NEW payouts until non-negative; lineage preserved
- Negative balance -> offset future earnings; admin override needs dual approval + reason + audit log
- Support month-end pressure -> NO release; preserve hold; log requester; escalate to Compliance/Finance

Seller dashboard and support workflow:
- compliance_held -> "Verification required"; evidence: case ID; next: qualified review SLA 10d; SLA breach: Compliance owner; admin control: cannot unilaterally release
- tax_blocked_payout -> "Form expired; renew W-8BEN"; evidence: form status, prior 1042-S history; next action: submit new form; SLA 14d; admin control: revert only with verified submission + Compliance sign-off
- payout_method_fix_required -> "Destination failed; verify"; evidence: provider trace ID; next: re-verify micro-deposit; SLA 5d; admin control: re-trigger verification
- negative_balance -> "Outstanding balance from chargeback"; evidence: order, chargeback ID, ledger entries; next: accrue to clear; SLA: continuous; admin control: dual-approval forgiveness only with Finance + reason
- reserve_held -> "Reserve releasing YYYY-MM-DD per cohort policy"; admin control: cohort override requires Risk lead approval

Reserve/hold governance:
- reserve_held -> trigger: payout cohort; scope: 10% of paid earnings/90d; release: cohort schedule + dispute-clear; SLA: scheduled date; owner: Risk; appeal: Risk appeals queue
- compliance_held -> trigger: sanctions potential match; scope: matched earnings; release: qualified-screening clear or false_positive_released; SLA 10d; owner: Compliance; appeal: Compliance escalation only
- tax_blocked_payout -> trigger: expired/invalid form; release: verified submission or approved withholding policy; SLA 14d; owner: Compliance/Tax; appeal: qualified route

Compliance/provider readiness:
- W-8BEN expired -> product state: expired -> invalid -> correction_requested -> verified; payout: BLOCKED until verified; evidence: form submission, validation result, withholding policy version, owner sign-off; support message: "Form expired; renew to release funds"; owner: Qualified Tax
- Sanctions potential match -> state: potential_match; payout: BLOCKED; evidence: screening result, case ID, qualified-reviewer ID, decision timestamp; message: "Under review; we will update"; owner: Compliance
- Country/provider eligibility -> state: payout_method_fix_required after dest change; payout: BLOCKED until reverify; evidence: provider trace ID, failure code; message: "Destination failed; please reverify"; owner: Payments Ops
- Statutory reporting (e.g., 1042-S) -> state: reportable; payout: allowed if form verified; evidence: period, threshold, export ID; message: "Reporting prepared per policy"; owner: Qualified Tax
- Withholding -> state: applied per qualified policy; evidence: rate, jurisdiction, approval; payout: reduced by withholding; message: itemized line; owner: Qualified Tax

Ledger/events:
- tax_compliance_status_changed: seller_id, form_type=W-8BEN, jurisdiction, old_status=verified, new_status=expired, withholding_rate, effective_at, qualified_owner_id
- sanctions_screening_result: seller_id, status=potential_match, case_id, confidence, reviewer, timestamp
- payout_result: payout_id, seller_id, amount, result=failed, failure_reason, provider_trace_id
- chargeback_received: order_id, seller_id, amount, provider_case_id, posted_to_negative_balance=true
- seller_negative_balance_changed: seller_id, delta, source_event_id, recovery_status, before_balance, after_balance
- payout_hold_created / payout_hold_released: reason_code, owner, review SLA, evidence_ref
- Audit fields: idempotency_key, source_event_id, ledger_entry_id, actor_or_job_id, policy_version, before_balance, after_balance, provider_trace_id, support_case_id

Audit invariants:
- INV-1: payable_to_seller == available - tax_blocked - compliance_held - reserve_held - negative_balance_offset, reconciled to ledger.
- INV-2: No payout batch includes a row where tax_blocked != 0 OR compliance_hold = open OR negative_balance requires blocking.
- INV-3: Provider "paid" state cannot exist without matched ledger payout_paid entry; failed transfers reverse paid -> available.
- INV-4: Compliance/tax holds require qualified owner_id + policy_version before hold_released events post.
- INV-5: Negative balance is traceable to original chargeback/order event; recovery offsets future earnings before any new payout releases.
- INV-6: Idempotency: re-running a payout event MUST NOT double-pay or leave residue if already terminal.
- INV-7: Support cannot set any released state on compliance/tax holds; only request-and-log.

Open risks:
- Support month-end pressure bypassing compliance -> mitigation: hard release gate; require Compliance+Finance dual sign; log requester; month-end SLA cannot shorten compliance gates.
- False-positive sanctions lockout -> mitigation: 10d SLA with expedited qualified review path; documented false_positive_released state.
- Double-pay on failed transfer retry -> mitigation: idempotency_key + provider_trace_id requirement before ledger flips paid.
- Negative-balance churn on chargebacks -> mitigation: continuous offset; freeze NEW payouts until cured unless dual-approval forgiveness.

Trust metrics:
- payout_latency_p95, held_balance_age_p95, failed_transfer_rate, dispute_win_rate, reversal_loss_pct, negative_balance_recovery_rate, creator_payout_ticket_rate, creator_payout_CSAT, reconciliation_mismatch_rate, compliance_hold_breach_rate.

Release/rollback gates (final):
- GATE-1 Tax: W-8BEN state in {verified, correction_submitted_with_compliance_signoff} -> else BLOCK.
- GATE-2 Sanctions: screening_status in {clear, false_positive_released} -> else BLOCK.
- GATE-3 Payout method: destination_verified = true AND no unresolved failed transfer -> else BLOCK.
- GATE-4 Chargeback/negative: negative_balance == 0 OR offset_applied = true -> else BLOCK.
- GATE-5 Reserve: policy cohort release criteria met -> accrue, do not block.
- ROLLBACK: any gate fails post-release -> immediate payout reversal entry, seller+support notification, incident case opened; reversed payouts require same dual-sign release to resubmit.
```
