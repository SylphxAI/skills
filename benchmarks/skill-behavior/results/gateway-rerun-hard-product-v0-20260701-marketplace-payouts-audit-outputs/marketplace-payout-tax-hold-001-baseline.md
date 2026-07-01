## 1) Core Principles

- **Ledger-first:** All money movements are immutable double-entry entries; balances are derived, not manually edited.
- **Separate available vs. pending funds:** Creator earnings do not become payable until refund/dispute/fraud windows and compliance checks pass.
- **Risk-based payout controls:** Payout eligibility depends on identity, tax, sanctions, fraud, payout method, balance, and account status.
- **Auditable operations:** Every hold, release, adjustment, refund, dispute action, and support override requires reason code, actor, timestamp, and evidence.

---

## 2) Balance Model

For each creator maintain:

| Balance Type | Meaning |
|---|---|
| Pending | Earned but not yet payable due to settlement, refund window, dispute window, fraud review, or compliance hold |
| Available | Cleared funds eligible for payout |
| Reserved | Funds held for disputes, expected refunds, chargebacks, tax withholding, or risk |
| Payable | Available amount above payout threshold after fees, withholding, and reserves |
| In Transit | Submitted to payout provider but not confirmed |
| Paid | Successfully paid out |
| Negative | Creator owes platform due to refunds, chargebacks, reversals, or corrections |

All balance movements must reference a source object: order, refund, dispute, payout, tax withholding, manual adjustment, or chargeback.

---

## 3) Payout Eligibility Checklist

A creator is eligible for payout only if:

1. Identity/KYC completed where required.
2. Sanctions screening passed.
3. Required tax form collected or withholding rule applied.
4. Valid payout method on file.
5. No active fraud, compliance, or legal hold.
6. Available balance exceeds country/currency minimum threshold.
7. Account is active and not suspended.
8. Negative balance is cleared or netted.
9. Payout velocity and amount are within risk limits.

---

## 4) Standard Payout Workflow

1. **Order completed**
   - Buyer payment captured.
   - Platform fee recorded.
   - Creator gross earning posted to `Pending`.

2. **Clearance period**
   - Funds remain pending during refund window, dispute risk period, payment settlement period, and fraud monitoring.

3. **Release to available**
   - If no blocking events, funds move from `Pending` to `Available`.

4. **Payout calculation**
   - Compute:  
     `Payable = Available - reserves - tax withholding - negative balance offsets`
   - Apply minimum threshold and payout schedule.

5. **Pre-payout screening**
   - Sanctions re-check.
   - Fraud/risk rules.
   - Payout method validation.
   - Tax status validation.

6. **Payout submission**
   - Move funds from `Available` to `In Transit`.
   - Submit to payout provider.

7. **Confirmation**
   - On success: move `In Transit` to `Paid`.
   - On failure: move `In Transit` back to `Available` or `Hold`, depending on failure reason.

---

## 5) Refunds

### Before Creator Payout
- Refund debits creator `Pending` or `Available`.
- Platform fee reversed according to policy.
- If refund exceeds available earnings, create negative balance.

### After Creator Payout
- Refund creates negative creator balance.
- Future earnings are automatically offset.
- If balance remains negative past defined period, restrict future payouts and optionally request repayment.

### Required Controls
- Refund reason codes.
- Buyer evidence.
- Creator notification.
- Approval thresholds for high-value or late refunds.

---

## 6) Buyer Disputes and Chargebacks

When a buyer dispute is opened:

1. Place reserve equal to disputed amount plus estimated fees.
2. Move relevant creator funds to `Reserved` if available.
3. If already paid out, create provisional negative balance.
4. Notify creator and collect evidence.
5. Submit evidence to payment processor if applicable.

Outcomes:

| Outcome | Action |
|---|---|
| Buyer wins | Finalize refund/chargeback, debit creator, apply chargeback fee if policy allows |
| Creator/platform wins | Release reserve back to `Available` |
| Partial win | Debit partial amount, release remainder |

Repeat disputes should trigger account risk review.

---

## 7) Fraud Review and Payout Holds

Trigger fraud review for:

- Unusual sales velocity.
- High refund or dispute rate.
- Buyer/creator collusion indicators.
- Self-purchases.
- Stolen payment method signals.
- Sudden payout method change before payout.
- Sanctions, geography, or device-risk alerts.
- High-value first payout.

Hold types:

| Hold Type | Scope | Release Condition |
|---|---|---|
| Transaction hold | Specific earnings | Order clears review |
| Account payout hold | All payouts | Risk/compliance approval |
| Reserve hold | Percentage or fixed amount | Rolling reserve period expires |
| Legal/compliance hold | Full account | Legal/compliance release |

Creators must see hold status, amount affected, and generic reason without exposing fraud logic.

---

## 8) Sanctions Screening

Screen creators:

- At onboarding.
- Before first payout.
- Before each payout batch.
- On material profile changes.
- When sanctions lists update.

If potential match:

1. Freeze payouts immediately.
2. Escalate to compliance.
3. Do not inform creator with prohibited details.
4. If false positive, document and release.
5. If confirmed match, block payout and follow legal reporting obligations.

---

## 9) Tax Forms and Withholding

Collect jurisdiction-specific tax information before payout where required, e.g.:

- US: W-9 for US persons, W-8BEN/W-8BEN-E for non-US persons.
- VAT/GST information where applicable.
- Local tax IDs where required.

Rules:

- No valid form: apply default backup withholding or block payout depending on jurisdiction.
- Store tax form status, not sensitive tax data unless compliant.
- Generate annual tax reports, e.g. 1099, DAC7, CRS, or local equivalents as applicable.
- Tax withholding entries must be ledgered separately from platform fees.

---

## 10) Minimum Thresholds and Payout Scheduling

Define thresholds by currency/country/payment rail, e.g.:

| Rail | Example Minimum |
|---|---|
| ACH/local bank | $25 equivalent |
| Wire/SWIFT | $100 equivalent |
| Digital wallet | $10 equivalent |

If below threshold:

- Keep funds in `Available`.
- Recheck next payout cycle.
- Allow manual payout only if compliant and economically justified.

Payout schedules:

- Standard: weekly or monthly.
- New/high-risk creators: delayed or rolling reserve.
- Enterprise/verified creators: accelerated payout, subject to risk approval.

---

## 11) Failed Bank Transfers

Failure categories:

| Failure Type | Action |
|---|---|
| Invalid account/routing | Return to `Available`, disable payout method, ask creator to update |
| Account closed | Return to `Available`, require new method |
| Name mismatch | Move to payout hold, request verification |
| Bank rejection/compliance | Escalate to compliance |
| Provider timeout/unknown | Keep `In Transit` until final status or reconciliation SLA |

Any provider fees may be charged to creator only if disclosed in policy.

---

## 12) Negative Balances

Sources:

- Refunds after payout.
- Chargebacks.
- Reversed fraudulent sales.
- Manual corrections.
- Provider reversals.

Handling:

1. Offset future earnings automatically.
2. Block payouts while negative unless approved exception.
3. Notify creator with transaction-level explanation.
4. If persistent or material, suspend selling or send to collections/legal according to policy.
5. Never erase negative balances without approved adjustment reason.

---

## 13) Creator Support Tickets

Ticket categories:

- Missing payout.
- Failed payout.
- Tax form issue.
- Payout hold.
- Negative balance.
- Refund/dispute explanation.
- Bank account update.
- Sanctions/compliance review.

Support tooling must show:

- Current balances.
- Payout status.
- Holds and reason codes.
- Failed transfer reason.
- Required creator action.
- Escalation owner.

Support cannot manually release payouts unless authorized workflow approval exists.

SLAs:

| Issue | Target |
|---|---|
| Failed payout due to invalid bank | 2 business days after update |
| Missing payout investigation | 5 business days |
| Tax form review | 3–7 business days |
| Fraud/compliance hold | No fixed promise; provide periodic updates |
| Dispute evidence intake | Before processor deadline |

---

## 14) Operational Controls

- Dual approval for manual adjustments, hold releases, sanctions overrides, and high-value payouts.
- Daily ledger-to-provider reconciliation.
- Payout batch approval log.
- Exception report for negative balances, aged holds, failed payouts, and large refunds.
- Immutable audit trail.
- Segregation of duties between support, risk, finance, and compliance.
- Maker-checker controls for bank detail changes.
- Periodic access review.
- Data retention aligned with financial, tax, and AML requirements.

---

## 15) Key Metrics

- Payout success rate.
- Average payout time.
- Aged payout holds.
- Refund rate by creator.
- Dispute/chargeback rate by creator.
- Negative balance exposure.
- Failed transfer rate.
- Tax-form completion rate.
- Sanctions false-positive rate.
- Support ticket resolution time.
