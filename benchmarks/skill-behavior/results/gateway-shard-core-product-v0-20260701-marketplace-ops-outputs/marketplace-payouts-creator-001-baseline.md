## 1) Scope and roles

**Marketplace:** sells AI templates (digital goods).  
**Actors:** Buyer, Creator/Seller, Marketplace Operator, Payment Service Provider (PSP), KYC/tax provider, Support/Ops.

**Core principle:** Marketplace is merchant/platform of record unless otherwise decided; creators receive net revenue share after fees, refunds, chargebacks, taxes, reserves, and adjustments.

---

## 2) Creator onboarding

### Required onboarding steps
1. **Account creation**
   - Email/phone verification.
   - MFA required before first payout.
2. **Creator profile**
   - Legal name or business name.
   - Country, address, DOB for individuals.
   - Entity type: individual, sole proprietor, company.
3. **Payout method**
   - Bank account, PayPal, or supported PSP payout rail.
   - Ownership verification where available.
4. **KYC/KYB**
   - Identity verification for individuals.
   - Business verification for companies.
   - Sanctions, PEP, watchlist screening.
5. **Tax collection**
   - US: W-9 or W-8BEN/W-8BEN-E as applicable.
   - Non-US: local tax residency and treaty forms where required.
   - VAT/GST info if seller is tax-registered.
6. **Marketplace agreement**
   - Creator terms, IP warranties, acceptable-use policy, AI safety policy, refund rules, payout reserve policy.

### Account states
- `draft`
- `pending_kyc`
- `kyc_failed`
- `active_no_payout`
- `active_payout_enabled`
- `restricted`
- `suspended`
- `closed`

---

## 3) Revenue share and ledger model

### Default commercial model
- Buyer pays gross order amount.
- Marketplace deducts:
  - Payment processing fees.
  - Platform commission.
  - Sales tax/VAT/GST collected where applicable.
  - Refunds, credits, chargebacks, disputes, penalties.
  - Reserve or payout hold.
- Creator receives **net creator earnings**.

Example formula:

```text
creator_earnings =
eligible_item_revenue
- platform_commission
- creator_share_of_processing_fees, if applicable
- refunds
- chargebacks
- dispute fees
- tax withholding
- reserve_hold
+ reserve_releases
+ manual_adjustments
```

### Recommended revenue share
- Standard: **70% creator / 30% marketplace** of net item revenue excluding taxes.
- Promotional templates or enterprise bundles may use contract-specific rates.
- Revenue-share version should be stored per order line for auditability.

### Ledger requirements
Use double-entry or immutable event ledger.

Minimum ledger entries:
- `order_authorized`
- `payment_captured`
- `tax_collected`
- `platform_fee_accrued`
- `creator_earning_accrued`
- `refund_debited`
- `chargeback_debited`
- `reserve_held`
- `reserve_released`
- `payout_created`
- `payout_paid`
- `payout_failed`
- `adjustment_posted`

Never overwrite financial records; reverse with compensating entries.

---

## 4) Refunds and chargebacks

### Refund policy
- Digital templates are refundable only if:
  - Duplicate purchase.
  - Material misrepresentation.
  - File/template unusable.
  - Unauthorized transaction.
  - Policy-required consumer right.
- Optional goodwill refunds require support approval.

### Refund impact
- If before payout: reduce creator payable balance.
- If after payout: create negative balance offset against future payouts.
- If no future earnings: marketplace may invoice creator or absorb loss based on policy.

### Chargebacks
- Automatically place creator account under review if thresholds exceeded.
- Debit chargeback amount and PSP dispute fees according to policy.
- Evidence package:
  - Purchase timestamp.
  - IP/device.
  - Account history.
  - Download/use logs.
  - Template listing snapshot.
  - Refund/support history.

---

## 5) Payout holds, reserves, and fraud review

### Standard holding period
- Hold creator earnings for **T+14 days** after successful payment capture.
- Rationale: refunds, fraud signals, chargeback early warning.

### New creator reserve
- First 60 days: hold additional **20% rolling reserve** for 30 days.
- Remove after good standing review.

### Risk-based holds
Trigger manual review or extended hold for:
- Sudden revenue spike.
- High refund or chargeback rate.
- Multiple buyer complaints.
- IP/plagiarism claims.
- Suspicious self-purchases.
- Account takeover signals.
- Sanctions/KYC mismatch.
- Prohibited AI content.

### Fraud-review outcomes
- Release payout.
- Partial reserve.
- Extended hold.
- Remove listing.
- Suspend account.
- Refund buyers.
- File PSP dispute evidence.
- Escalate to legal/compliance.

---

## 6) Payout schedule

### Default schedule
- Weekly payouts every Friday.
- Only balances older than T+14 and above minimum threshold are payable.
- Minimum payout:
  - USD 25 or local equivalent.
- Failed payout:
  - Mark `payout_failed`.
  - Return funds to creator payable balance.
  - Require payout-method update.
  - Retry next cycle.

### Payout calculation
```text
available_for_payout =
cleared_creator_earnings
- active_holds
- rolling_reserve
- negative_balance
- tax_withholding
```

### Tax reporting
- Generate annual forms where applicable, e.g. 1099-K/1099-NEC depending on structure and jurisdiction.
- Provide downloadable earnings, withholding, and payout reports.

---

## 7) Seller dashboard

Required dashboard modules:
1. **Balance summary**
   - Pending balance.
   - Available balance.
   - Held/reserved balance.
   - Paid lifetime total.
   - Negative balance.
2. **Transactions**
   - Order ID, buyer country, item, gross, tax, fees, commission, creator net.
3. **Payouts**
   - Status, date, amount, destination, failure reason.
4. **Refunds/chargebacks**
   - Case status, reason, evidence deadline, amount debited.
5. **Tax/KYC**
   - Verification status, missing actions, submitted forms.
6. **Risk notices**
   - Holds, reserves, policy violations, required remediation.
7. **Reports**
   - CSV export by date range.
   - Monthly statements.
   - Annual tax documents.

---

## 8) Disputes and creator appeals

### Buyer disputes
- Support triages within 2 business days.
- Creator response window: 5 business days.
- Marketplace decision based on policy, evidence, and consumer-law requirements.

### Creator appeals
Creators may appeal:
- Refund debit.
- Chargeback allocation.
- Account hold.
- Listing takedown.
- Suspension.

Appeal SLA:
- Acknowledge: 1 business day.
- Decision: 5 business days.
- Complex/IP/legal: 15 business days.

All actions must be logged with agent, timestamp, reason code, and evidence.

---

## 9) Support operations

### Queues
- Onboarding/KYC.
- Tax forms.
- Payout failures.
- Refund requests.
- Chargebacks.
- Fraud/risk review.
- IP/copyright claims.
- Creator appeals.

### Internal tooling
- Unified creator profile.
- Ledger viewer.
- Order and payout timeline.
- Risk score and rule hits.
- Evidence upload.
- Manual adjustment workflow with approval.
- Audit log.
- PSP/KYC/tax provider links.

### Approval controls
- Refund above threshold: supervisor approval.
- Manual payout or adjustment: finance approval.
- Account suspension: trust & safety approval.
- Reserve release override: risk + finance approval.
- Ledger correction: dual approval.

---

## 10) Compliance and controls

- Sanctions screening at onboarding and periodically.
- KYC refresh on risk events or regulatory cadence.
- Secure storage of PII/tax data with role-based access.
- PCI scope minimized through PSP-hosted payments.
- GDPR/CCPA data rights process.
- Financial reconciliation daily:
  - Orders vs PSP captures.
  - Ledger vs PSP balance.
  - Payout files vs bank/PSP confirmation.
- Monthly close with exception report.
- Retain financial records for at least 7 years or local requirement.
- Maintain SOC-style audit logs for all money movement decisions.
