## 1) Core design principles

- **Ledger-first:** all creator earnings, refunds, disputes, fees, holds, reversals, and payouts are immutable ledger entries. No balance is edited in place.
- **Separate balances:**  
  - **Pending:** earned but not yet releasable.  
  - **Available:** eligible for payout.  
  - **Held:** blocked by policy, fraud, sanctions, tax, dispute, or support case.  
  - **Paid:** successfully disbursed.  
  - **Negative:** creator owes marketplace due to refunds, disputes, or failed recovery.
- **Payouts are not automatic cash movements:** every payout passes eligibility, compliance, risk, and balance checks.
- **Auditability:** every decision stores reason code, actor/system, timestamp, evidence, and appeal path.

---

## 2) Main entities

### Creator account
- Creator ID
- Country of residence
- Legal name / business name
- KYC/KYB status
- Tax form status
- Sanctions screening status
- Fraud risk tier
- Payout method status
- Minimum payout threshold
- Payout schedule
- Current payout hold reason, if any

### Ledger entry
- Entry ID
- Creator ID
- Type: sale, platform fee, refund, dispute, chargeback, tax withholding, payout, payout failure, adjustment
- Amount and currency
- Source transaction ID
- Balance bucket affected
- Created timestamp
- Settlement/release date
- Reason code

### Payout
- Payout ID
- Creator ID
- Amount
- Currency
- Destination account
- Status
- Failure reason, if any
- Compliance decision snapshot
- Ledger references

---

## 3) Balance lifecycle

1. **Buyer purchase completed**
   - Gross sale recorded.
   - Platform fee and taxes calculated.
   - Creator net earning placed in **Pending**.

2. **Refund/dispute window**
   - Pending period depends on product type, country, risk tier, and refund policy.
   - Example: standard creators: T+7; high-risk creators: T+30.

3. **Release to available**
   - If no active hold, dispute, fraud flag, or compliance issue, pending funds move to **Available**.

4. **Payout eligibility check**
   - Available balance ≥ minimum threshold.
   - Valid payout method.
   - Completed tax documentation where required.
   - Passed sanctions screening.
   - No active payout hold.
   - Negative balance resolved or netted.

5. **Payout execution**
   - Available balance moves to payout-in-progress.
   - Payment provider sends funds.
   - On success: mark **Paid**.
   - On failure: reverse to **Available** or **Held**, depending on reason.

---

## 4) Payout status model

| Status | Meaning |
|---|---|
| Scheduled | Creator is eligible for next cycle |
| Pre-check failed | Eligibility failed before submission |
| In review | Manual fraud/compliance/ops review |
| Submitted | Sent to payment provider |
| Processing | Provider accepted and processing |
| Paid | Confirmed successful |
| Failed | Provider rejected or funds returned |
| Canceled | Canceled before submission |
| Held | Blocked by policy or compliance |

---

## 5) Eligibility decision table

| Condition | Action |
|---|---|
| Available balance below threshold | Skip payout; carry forward |
| Missing tax form | Hold payout; notify creator |
| Sanctions screening pending | Hold payout until cleared |
| Sanctions potential match | Freeze payouts; escalate compliance |
| Invalid bank account | Block payout method; request update |
| Active fraud review | Hold payout |
| Active buyer dispute exceeding reserve | Hold disputed amount or full payout based on risk |
| Negative balance | Net future earnings before payout |
| Country unsupported by provider | Hold; offer alternate method if available |

---

## 6) Refunds and buyer disputes

### Refunds
- If refund occurs while funds are **Pending**, reduce pending balance.
- If refund occurs after release but before payout, reduce available balance.
- If refund occurs after payout, create negative ledger entry.

### Buyer disputes / chargebacks
- Immediately place disputed amount plus applicable fees in **Held** or create negative balance.
- High-risk creators may have additional rolling reserves.
- If creator wins dispute, release held funds.
- If creator loses, finalize debit and fees.

---

## 7) Fraud review and payout holds

### Hold triggers
- Sudden spike in sales
- High refund or dispute rate
- Linked accounts with prior abuse
- Suspicious buyer concentration
- Stolen payment indicators
- Repeated payout failures
- Identity mismatch
- Unusual geography or device signals

### Hold types
| Hold type | Scope |
|---|---|
| Transaction hold | Specific sale or dispute amount |
| Partial payout hold | Risk-based reserve percentage |
| Full payout hold | All available funds blocked |
| Account freeze | No sales, withdrawals, or profile changes |

Each hold requires:
- Reason code
- Start date
- Reviewer or automated rule
- Review-by date
- Creator-visible explanation where legally permitted

---

## 8) Tax forms and withholding

- Require applicable forms before payout, e.g. W-9, W-8BEN, W-8BEN-E, local equivalents.
- If tax form missing:
  - Either block payout or apply backup withholding where legally required.
- Store tax form status, not sensitive form details unless required.
- Generate annual statements, e.g. 1099, DAC7, platform reporting, or local equivalents.
- Tax withholding entries are separate ledger debits.

---

## 9) Sanctions screening

Screen creators, beneficial owners, and payout beneficiaries against:
- OFAC
- EU
- UK HMT
- UN
- Other applicable local lists

Outcomes:
- **Clear:** proceed.
- **Potential match:** freeze payout, escalate to compliance.
- **Confirmed match:** block account, retain records, file required reports, do not notify beyond permitted language.

Rescreen:
- At onboarding
- Before first payout
- Periodically
- On legal-name, country, or bank change
- When lists update

---

## 10) Failed bank transfers

| Failure reason | Action |
|---|---|
| Invalid account number | Return funds to Available; disable payout method |
| Closed account | Return funds; request new method |
| Name mismatch | Hold payout; request verification |
| Bank rejection | Retry only if provider marks retryable |
| Returned after success | Reverse Paid status with ledger correction |

Limit retries to avoid fees and fraud exposure.

---

## 11) Negative balances

Sources:
- Post-payout refunds
- Chargeback losses
- Fraud reversals
- Tax corrections
- Provider reversals

Policy:
- Future earnings automatically offset negative balance.
- No payout until net available balance exceeds zero and threshold.
- For material negative balances, send repayment notice and suspend selling if unpaid.
- Do not debit creator bank account unless explicit authorization exists.

---

## 12) Creator support operations

### Ticket categories
- Missing payout
- Failed payout
- Tax form issue
- Bank update
- Refund/dispute explanation
- Fraud hold appeal
- Sanctions/compliance escalation
- Negative balance inquiry

### Support tooling must show
- Current balance breakdown
- Payout status and provider reference
- Hold reasons and review owner
- Required creator actions
- Allowed support responses
- Escalation path

### SLAs
| Case type | Target |
|---|---|
| Standard payout inquiry | 2 business days |
| Failed payout | 3 business days |
| Tax documentation issue | 5 business days |
| Fraud appeal | 7–14 business days |
| Sanctions potential match | Compliance-priority queue |

---

## 13) Reconciliation and controls

Daily:
- Ledger balance = provider balance + in-flight payouts + reserves.
- Payout file totals match submitted provider totals.
- Failed and returned payouts reconciled.
- FX gains/losses recorded separately.
- Negative balances reviewed.

Controls:
- Dual approval for manual adjustments above threshold.
- Segregation of duties: support cannot release fraud/compliance holds.
- Immutable audit log.
- Maker-checker for bank-account overrides.
- Automated alerts for payout spikes, high dispute rates, and stale holds.

Key metrics:
- Payout success rate
- Average payout time
- Failed payout rate
- Refund/dispute loss rate
- Held balance by reason
- Negative balance exposure
- Support ticket aging
- Compliance review backlog
