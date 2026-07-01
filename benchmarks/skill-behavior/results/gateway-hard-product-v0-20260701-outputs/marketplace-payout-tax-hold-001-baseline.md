## 1) Core payout principles

- **Ledger-first:** every sale, fee, refund, dispute, hold, payout, FX, and adjustment posts to an immutable double-entry ledger.
- **Available balance ≠ earned balance:** creators may see gross earnings, pending balance, held balance, available balance, and negative balance separately.
- **Risk-based payouts:** payout eligibility depends on KYC/KYB, tax status, sanctions screening, fraud review, dispute exposure, and minimum payout threshold.
- **No payout without recoverability:** funds under refund windows, active disputes, chargeback risk, sanctions review, or fraud review remain held.
- **Auditable decisions:** every hold, release, reversal, and manual override requires reason code, actor/system ID, timestamp, evidence link, and approval level.

---

## 2) Balance model

Creator wallet views:

1. **Pending balance**
   - New sales not yet cleared.
   - Subject to refund period, fraud checks, payment settlement, and dispute latency.

2. **Available balance**
   - Eligible for payout after all holds and thresholds.

3. **Held balance**
   - Funds restricted by risk, sanctions, tax, dispute, refund reserve, or support escalation.

4. **In-transit payout**
   - Payout submitted to banking partner but not confirmed.

5. **Negative balance**
   - Creator owes the platform due to refunds, disputes, chargebacks, reversals, or failed clawbacks.

Ledger event examples:

| Event | Debit | Credit |
|---|---|---|
| Buyer payment captured | Cash / PSP receivable | Creator payable + platform revenue/tax payable |
| Marketplace fee | Creator payable | Platform revenue |
| Refund | Creator payable / reserve | Buyer refund payable |
| Dispute loss | Creator payable | PSP/chargeback payable |
| Payout initiated | Creator payable | Payouts in transit |
| Payout failed | Payouts in transit | Creator payable |
| Negative balance recovery | Future creator earnings | Negative balance receivable |

---

## 3) Payout eligibility checklist

A payout can be initiated only if:

- Creator completed required **KYC/KYB**.
- Required **tax forms** collected or withholding rules applied.
- Creator and bank destination pass **sanctions/PEP/adverse media screening**.
- No unresolved fraud review blocking payout.
- No legal, compliance, or support hold.
- Available balance exceeds **minimum payout threshold**.
- Bank account/payment method is verified.
- Currency and destination country are supported.
- Creator accepted current marketplace terms.

---

## 4) Standard payout lifecycle

1. **Sale occurs**
   - Funds enter pending balance.
   - Apply platform fee, taxes, and any required reserve logic.

2. **Clearing period**
   - Hold for payment settlement, refund window, fraud signals, and chargeback risk.
   - Example: T+7 standard; longer for high-risk categories/countries/new creators.

3. **Eligibility evaluation**
   - Automated job checks thresholds, compliance, tax, holds, and negative balances.

4. **Payout creation**
   - Batch or instant payout file/API call to payout provider.
   - Move amount to in-transit.

5. **Provider response**
   - Success: mark paid, store trace ID.
   - Failure: return funds to available/held balance depending on reason.

6. **Creator notification**
   - Email/in-app payout statement with gross, fees, holds, taxes, FX, and net paid.

---

## 5) Refunds and buyer disputes

### Refunds
- Refunds first reduce creator pending/available balance.
- If already paid out, create or increase creator negative balance.
- Refund reason codes:
  - Buyer remorse
  - Duplicate purchase
  - Product not delivered
  - Quality claim
  - Fraudulent transaction
  - Platform goodwill

### Disputes/chargebacks
- On dispute open:
  - Place hold equal to disputed amount plus expected fees.
  - If insufficient balance, increase risk hold or negative exposure.
- On dispute won:
  - Release hold.
- On dispute lost:
  - Debit creator balance for principal, chargeback fee if contractually allowed, and taxes/fee reversals as applicable.
- High dispute rate triggers:
  - Rolling reserve
  - Longer payout delay
  - Manual review
  - Account suspension

---

## 6) Fraud review and payout holds

Hold types:

| Hold type | Trigger | Default action |
|---|---|---|
| New creator reserve | No history | Delay payout / rolling reserve |
| Velocity risk | Sudden sales spike | Hold excess over baseline |
| Buyer fraud | Stolen card/payment anomaly | Hold related transactions |
| Content/service fraud | Fake skill, non-delivery | Hold full balance pending review |
| Account takeover | Login/bank change anomaly | Freeze payout destination |
| Collusion | Linked buyers/creators | Hold related balances |
| Compliance | KYC/tax/sanctions issue | Block payout |

Hold controls:
- Holds expire or require review by SLA.
- Manual holds require reason and evidence.
- Creators receive clear but non-sensitive explanation.
- Compliance/fraud-sensitive cases avoid tipping off bad actors.

---

## 7) Tax forms and withholding

- Collect tax documentation before payout threshold where legally required:
  - US persons: W-9.
  - Non-US persons receiving US-source income: W-8BEN/W-8BEN-E.
  - Local equivalents for other jurisdictions.
- If missing/invalid:
  - Block payout or apply backup withholding depending on jurisdiction.
- Generate annual statements where required, e.g., 1099, DAC7, platform reporting, VAT/GST summaries.
- Store tax form version, validation status, withholding rate, and effective dates.
- Tax data access limited by role.

---

## 8) Sanctions screening

Screen at onboarding and continuously:

- Creator legal name, aliases, business name.
- Beneficial owners for entities.
- Address/country.
- Bank destination and payout country.
- IP/device geolocation where relevant.

Actions:
- Potential match: place compliance hold.
- Confirmed match: freeze funds, block payouts, escalate to legal/compliance, file reports where required.
- False positive: document rationale and release.

---

## 9) Minimum thresholds and payout schedules

- Per-currency minimum thresholds to avoid uneconomic payouts.
  - Example: USD 25, EUR 25, GBP 20, JPY 3,000.
- If below threshold, carry balance forward.
- Scheduled payout options:
  - Weekly standard.
  - Monthly for low-volume creators.
  - Instant payout only for low-risk eligible creators with added fee.
- Dormant small balances handled under unclaimed property/escheatment rules where applicable.

---

## 10) Failed bank transfers

Failure handling:

| Failure reason | Action |
|---|---|
| Invalid account | Return to available, require bank update |
| Closed account | Hold payout until new verified account |
| Name mismatch | Compliance/KYC review |
| Sanctions/bank rejection | Compliance hold |
| Unsupported destination | Require alternate method |
| Provider outage | Retry under incident process |

Rules:
- Do not repeatedly retry invalid accounts.
- After repeated failures, disable auto-payout.
- Notify creator with remediation steps.
- Maintain provider trace IDs and return codes.

---

## 11) Negative balances

Sources:
- Post-payout refunds.
- Chargebacks/dispute losses.
- Fraud reversals.
- Fee corrections.
- FX or banking reversals.

Recovery order:
1. Offset against future earnings.
2. Suspend future payouts until cured.
3. Request repayment if material.
4. Collections/legal only above approved threshold.
5. Write-off with finance approval.

Controls:
- Show creator itemized cause.
- Block withdrawal while negative.
- Prevent creators from evading debt via duplicate accounts.

---

## 12) Creator support ticket operations

Ticket categories:
- Missing payout
- Failed bank transfer
- Tax form issue
- Refund/dispute explanation
- Payout hold
- Negative balance
- Sanctions/compliance review
- Account/bank change

Support rules:
- Support can explain status and collect documents.
- Support cannot override fraud/compliance holds.
- Payment detail changes require step-up authentication.
- Escalation queues:
  - Payments ops
  - Tax ops
  - Fraud risk
  - Compliance/legal
  - Engineering/provider incident

SLA examples:
- General payout ticket: 2 business days.
- Failed payout: 3 business days after provider response.
- Tax review: 5 business days.
- Compliance/sanctions: no fixed SLA; periodic status updates.

---

## 13) Governance and audit controls

- Segregation of duties for payout configuration, manual adjustments, and approvals.
- Dual approval for manual payout, hold release, write-off, or balance adjustment above threshold.
- Daily reconciliation:
  - Ledger vs PSP.
  - Ledger vs bank.
  - Payout provider vs creator statements.
- Exception reports:
  - Negative balances.
  - Aging holds.
  - Failed payouts.
  - Manual overrides.
  - Sanctions pending.
  - High refund/dispute creators.
- Immutable audit logs retained per regulatory and financial policy.
- Incident playbooks for provider outage, mass payout failure, fraud spike, and sanctions list update.
