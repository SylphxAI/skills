## Price-Increase Retention Plan for SaaS + Mobile Subscribers

### 1) Objectives and Guardrails
**Primary goal:** Increase net revenue without unacceptable churn or brand damage.

**Guardrails**
- Net revenue uplift must remain positive after churn, refunds, discounts, app-store fees, and support costs.
- Incremental monthly churn must not exceed pre-set cohort thresholds.
- Complaint rate, refund rate, and support backlog must stay within agreed limits.
- No subscriber should be charged a higher price without required notice and consent where applicable.
- Preserve audit trail for pricing, notices, consent, offers, refunds, and support actions.

---

## 2) Cohort Segmentation

Segment subscribers before rollout by:

| Segment | Examples | Strategy |
|---|---|---|
| Billing channel | Direct web, Apple App Store, Google Play | Channel-specific notice, consent, and billing rules |
| Tenure | <3 months, 3–12 months, 12+ months | Higher protection for recent and loyal users |
| Plan type | Monthly, annual, legacy, promo | Different migration paths |
| Usage/value | High, medium, low engagement | Save offers focused on high-risk/high-value cohorts |
| Geography | Region/currency/tax | Local compliance and price parity checks |
| Price gap | Small, medium, large increase | Larger gaps may need grandfathering or phased increases |
| Support history | Complaints, refunds, failed payments | More cautious treatment |
| Business value | ARR/MRR, LTV, margin | Protect high-LTV customers |

---

## 3) Grandfathering Policy

Use grandfathering selectively, not universally.

**Grandfather candidates**
- Legacy users facing a large increase.
- Annual subscribers mid-term.
- High-LTV customers with long tenure.
- Customers on contractual or promised pricing.
- Sensitive regions where consent risk is high.

**Grandfather options**
1. **Permanent grandfathering:** Only for contractual/legal obligations.
2. **Time-bound grandfathering:** Keep current price for 3–12 months.
3. **Step-up pricing:** Increase in phases over 2–3 cycles.
4. **Feature-based migration:** Keep old price on old plan, require upgrade for new features.

**Audit requirement:** Record original price, new price, grandfather reason, expiration date, and customer-facing notice.

---

## 4) Annual Migration Strategy

**Existing annual subscribers**
- Do not change price mid-term unless terms allow and consent is obtained.
- Notify before renewal per applicable channel rules.
- Offer early renewal at current price for one final term where financially viable.
- For high-risk cohorts, offer annual migration from monthly with discount to reduce churn.

**Monthly-to-annual migration**
- Present annual plan as value-preserving option before increase takes effect.
- Example offer: “Lock in today’s equivalent rate by switching to annual before [date].”
- Ensure offer economics outperform expected monthly churn.

---

## 5) Save Offers and Retention Treatments

Use targeted offers at cancellation, downgrade, or price-objection moments.

| Risk Cohort | Offer | Limit |
|---|---|---|
| Low usage, high price sensitivity | 20–30% off for 3 months | One-time |
| High-LTV loyal customer | 10–20% off for 6–12 months | Requires retention tag |
| Monthly subscriber | Annual plan discount | Must improve net revenue |
| Feature mismatch | Downgrade to lower tier | Avoid full churn |
| Temporary hardship | Pause subscription | 1–3 months |
| App-store subscribers | Redirect to platform-approved offer flow | Follow Apple/Google rules |

**Rules**
- Do not over-discount customers unlikely to churn.
- Limit stacking of promos.
- Track offer acceptance, retained revenue, and post-offer churn.
- Suppress save offers for fraud, abuse, or repeated refund behavior.

---

## 6) Cancellation Recovery

**Before cancellation**
- Show clear new price, value explanation, and alternatives.
- Offer annual lock-in, downgrade, pause, or limited discount.
- Ask cancellation reason.

**After cancellation**
- Email/app push win-back sequence:
  - Day 0: confirmation + benefits reminder.
  - Day 3–7: targeted offer based on reason.
  - Day 21–30: final reminder before access loss or data deletion.
- For app-store users, include instructions to manage subscription through Apple/Google.

**Do not create dark patterns:** Cancellation must remain simple and compliant.

---

## 7) Consent and Notice Requirements

### Direct Billing
- Send advance email and in-app notice with:
  - Current price.
  - New price.
  - Effective date.
  - Billing frequency.
  - How to cancel or change plan.
  - Support contact.
- Require affirmative consent where legally required or where material changes demand opt-in.
- Keep logs of notice delivery, opens where available, consent, and plan changes.

### Apple App Store
- Use Apple subscription price increase mechanisms.
- Determine whether Apple requires explicit user consent based on increase size/frequency and local rules.
- Monitor Apple consent status and renewal failures.
- Do not bypass App Store billing for app-based digital subscriptions.

### Google Play
- Use Google Play price change flows.
- Respect notice and consent timelines.
- Monitor opt-in/opt-out status and cancellation risk.

---

## 8) Customer Support Scripts

### Price Increase Explanation
“Your subscription price is changing from [old price] to [new price] on [date]. This helps us continue improving [product/value points]. You’ll keep access to [features]. You can review options, switch plans, or cancel before the change takes effect.”

### Save Offer
“I understand the increase may be a concern. Based on your account, I can offer [discount/downgrade/annual option] so you can continue using the service at a lower effective cost.”

### Grandfathering
“You are eligible to keep your current price until [date]. After that, your renewal price will be [new price] unless you change or cancel your plan.”

### Refund Request
“I can review your account for refund eligibility based on billing date, usage, channel, and applicable policy. If billed through Apple or Google, refunds may need to be requested through their platform.”

### Cancellation
“I can help you cancel. Before you go, would you like to review lower-cost options? If not, your cancellation will be processed immediately/effective [date].”

---

## 9) Refund Policy

**Direct billing**
- Full refund if customer was charged without required notice or consent.
- Prorated refund where legally required or approved by policy.
- Goodwill refund for recent renewal complaints within defined window.
- No repeated goodwill refunds without escalation.

**Apple / Google**
- Follow platform refund processes.
- Support team may guide users but should not promise platform approval.
- Track app-store refund reasons separately.

**Audit fields:** Request date, billing channel, amount, reason, approval basis, agent, refund ID.

---

## 10) Churn and Revenue Monitoring

Track daily during rollout and weekly after stabilization.

**Core metrics**
- Gross churn and net churn by cohort.
- MRR/ARR before and after increase.
- Net revenue uplift.
- Refund rate.
- Save-offer acceptance.
- Post-offer churn.
- Annual migration conversion.
- Consent opt-in rate.
- Failed renewals.
- Support contact rate.
- Complaint sentiment.
- App-store cancellation and refund rates.

**Early-warning thresholds**
- Churn exceeds forecast by cohort.
- Refund rate doubles baseline.
- Support volume exceeds staffing capacity.
- Consent opt-in materially below forecast.
- Net revenue uplift turns negative.
- High-LTV churn spike.

---

## 11) Rollout Plan

1. **Model impact:** Forecast price lift, churn, refunds, fees, discounts, and support cost.
2. **Pilot:** Test on low-risk cohort or region.
3. **Review:** Compare actual churn and revenue to guardrails.
4. **Expand:** Roll out by channel and cohort.
5. **Pause triggers:** Breach of churn, refund, consent, or support thresholds.
6. **Postmortem:** Document outcomes, complaints, regulatory issues, and pricing learnings.

---

## 12) Net Revenue Guardrail Formula

For each cohort:

**Net uplift = incremental price revenue − lost revenue from churn − discounts/save offers − refunds − payment/app-store fees − support costs**

Proceed only if:
- Net uplift is positive.
- Payback period is acceptable.
- Churn remains within approved threshold.
- Compliance requirements are satisfied.
