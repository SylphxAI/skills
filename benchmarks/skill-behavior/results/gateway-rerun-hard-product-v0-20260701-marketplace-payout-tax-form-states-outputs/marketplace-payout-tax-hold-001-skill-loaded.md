Marketplace/payout context:  
Global AI-skill marketplace. Buyers pay platform; creators earn revenue share. Platform maintains ledger truth; payout provider handles transfers only. Parties: buyer, creator, platform, payment processor, payout provider, tax/compliance reviewers, support.

Fee and risk model:  
- Buyer payment captured per order/subscription/usage transaction.  
- Platform fee: configurable revenue share, e.g. `platform_fee_rate` by skill/category/contract.  
- Creator earning = gross less platform fee, refunds, chargebacks, withholding, provider/FX fees if creator-paid.  
- Risk windows: refund window, dispute/chargeback window, fraud review, delivery/usage validation.  
- Do not treat displayed balance or provider callback as ledger truth.

Payout policy:  
- Cadence / clearing delay / minimum threshold / currencies / provider fees:  
  - Cadence: weekly, cutoff Tuesday 00:00 UTC; payout Friday; holidays roll forward.  
  - Clearing delay: earnings pending for 14 days after successful buyer payment or usage finalization; longer for high-risk cohorts.  
  - Rolling reserve: default 0%; high-risk/new creators 10–20% for 45–90 days, reviewed monthly.  
  - Minimum threshold: USD 25 or local equivalent; below threshold carries forward.  
  - Currencies: ledger in transaction currency plus platform reporting currency; payout in supported provider currencies.  
  - FX: convert at payout submission using provider/approved rate source; show rate, timestamp, rounding.  
  - Fees: platform fee paid by creator via revenue share; payout/FX/failed-transfer fees assigned by published policy; chargeback fee assigned by policy/version.  

Payout flow:  
- `buyer_payment_captured` -> finance/payment system, processor auth/capture evidence, “Payment received.”  
- `platform_fee_calculated` -> ledger service, fee policy/version, “Marketplace fee applied.”  
- `seller_earning_pending` -> ledger, order/payment lineage, “Earnings pending until risk window clears.”  
- `seller_earning_available` -> payout scheduler, risk/tax/provider checks, “Available for next payout.”  
- `seller_earning_held` -> risk/compliance owner, reason/evidence/SLA, “Temporarily held for review.”  
- `payout_submitted` -> payout ops, provider trace ID, “Payout sent to bank/provider.”  
- `payout_paid` -> reconciliation job, provider confirmation + ledger match, “Payout completed.”  
- `payout_failed` -> creator/support, provider failure code, “Update payout method.”  

Formal state machine:  
- `buyer_payment_captured` -> fee calculation -> `seller_earning_pending`, credit pending, invariant: gross = fee + pending earning.  
- `seller_earning_pending` -> risk window elapsed + tax/provider clear -> `seller_earning_available`, move pending to available.  
- `seller_earning_pending` -> refund -> `seller_earning_reversed`, debit pending, preserve order lineage.  
- `seller_earning_available` -> refund/dispute lost -> `seller_earning_reversed_or_negative_balance`, debit available or create negative balance.  
- `seller_earning_pending|available` -> fraud/sanctions/tax hold -> `seller_earning_held`, move scoped amount to held with reason code.  
- `seller_earning_held` -> review released -> `pending|available`, release based on original risk window.  
- `seller_earning_available` -> payout batch -> `payout_submitted`, debit available and mark in-transit.  
- `payout_submitted` -> provider success + reconciliation -> `payout_paid`, mark paid.  
- `payout_submitted` -> provider failure -> `payout_failed`, return to available or held based on failure reason.  
- `payout_paid` -> chargeback -> `negative_balance_or_clawback`, create recoverable debit.  
- `manual_adjustment_requested` -> dual approval -> `ledger_adjustment_posted`, audited reason and seller-visible explanation.

Decision table:  
- Normal cleared earning -> pending to available; include next batch; show fee/risk release date.  
- Refund before payout -> reverse earning/fee per policy; exclude payout; explain refund.  
- Chargeback after payout -> negative balance/clawback; offset future payouts; open dispute evidence workflow.  
- Fraud suspicion -> held; pause affected payouts; show reason code and review SLA.  
- Missing/invalid tax form -> accrue but block or withhold per qualified policy; show required correction.  
- Sanctions/KYC potential match -> compliance-held; block payout; non-sensitive review message.  
- Below threshold -> remain available; no payout; show progress to threshold.  
- Failed bank transfer -> return to available or destination-held; require method update; show provider trace ID.  
- Negative balance -> offset future earnings; block payout until non-negative unless approved exception.

Seller dashboard and support workflow:  
- Pending -> amount, release date, source orders, fees.  
- Available -> next payout date, threshold progress, payout method status.  
- Held -> reason code, evidence needed, owner, SLA, appeal link.  
- Disputed -> buyer dispute/chargeback status, evidence deadline, possible reversal.  
- Paid -> payout ID, amount, FX rate, fees, provider trace.  
- Failed -> failure reason, remediation, retry eligibility.  
- Negative balance -> itemized refund/chargeback lineage, recovery plan.  
Support/admin controls: transaction lineage view, evidence checklist, safe templates, dual approval for manual adjustments, early payouts, hold releases, forgiveness, goodwill credits.

Reserve/hold governance:  
- Fraud hold -> abnormal sales/refund/spam signals; scoped transactions; release after risk review; SLA 3–7 business days; owner Risk; appeal via support.  
- Rolling reserve -> new/high-risk creators; percent/duration by cohort; release automatically after reserve term if no open disputes; owner Risk/Ops.  
- Compliance hold -> sanctions/KYC/tax blocker; scoped seller or funds; release only by qualified reviewer; SLA per case.  
- Dispute hold -> buyer dispute/chargeback; scoped order amount plus fees; release on dispute win or reverse on loss.  
- Destination hold -> invalid/changed bank account; block payout until verified; owner Payout Ops.

Compliance/provider readiness:  
- Tax forms: `not_started`, `submitted`, `invalid`, `expired`, `verified`, `correction_requested`; examples: W-9, W-8BEN, W-8BEN-E, VAT/GST tax ID/local equivalent. Payout effect: block, release, or apply approved withholding per qualified tax owner.  
- Withholding: `not_required`, `pending_policy`, `required`, `applied`, `adjusted`; itemized ledger debit.  
- Reporting: `threshold_monitoring`, `reportable`, `export_generated`, `filed_or_handed_off`, `correction_needed`; examples: 1099-K, 1042-S, VAT/GST/local reports.  
- Sanctions/KYC: `not_screened`, `clear`, `potential_match`, `confirmed_blocked`, `false_positive_released`; compliance owner required.  
- Provider eligibility: country/currency/method supported, destination valid, provider restrictions captured before payout.

Ledger/events:  
- `marketplace_payment_captured`, `marketplace_fee_calculated`, `seller_earning_posted`, `seller_balance_changed`, `payout_hold_created`, `payout_hold_released`, `tax_compliance_status_changed`, `sanctions_screening_result`, `payout_batch_created`, `payout_result`, `seller_negative_balance_changed`, `manual_adjustment_posted`.  
Required fields: idempotency key, source event, ledger entry, actor/job, policy version, before/after balance, provider trace ID, support case ID, creator-visible reason.

Audit invariants:  
- Pending + available + held + disputed + paid + reversed + negative balances reconcile to immutable ledger entries.  
- Gross buyer payments reconcile to fees, creator earnings, taxes/withholding, refunds, disputes, and payouts.  
- No payout if tax, sanctions, provider, destination, threshold, dispute, or hold blocker exists.  
- Provider “paid” is accepted only after ledger and reconciliation agree.  
- Every hold, reversal, adjustment, and clawback has reason, evidence, owner, SLA, and lineage.

Open risks:  
- Global tax/sanctions complexity -> qualified owner workflow and blocker states.  
- Chargebacks after payout -> reserves, negative-balance recovery, dispute evidence.  
- Provider failures -> retry policy, destination validation, fallback providers.

Trust metrics:  
Payout latency, held-balance age, failed-transfer rate, ticket rate, payout CSAT, dispute win rate, reversal loss, negative-balance recovery, tax-block rate, reconciliation mismatch rate.
