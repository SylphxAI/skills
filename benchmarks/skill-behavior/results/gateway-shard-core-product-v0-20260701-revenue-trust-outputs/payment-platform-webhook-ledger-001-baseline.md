Below are the highest-risk launch gates to complete before accepting real customer money for a SaaS product using Stripe, Apple Pay, Google Pay, invoices, tax, coupons, async webhooks, delayed settlement, failed payments, disputes, refunds, entitlement updates, and finance reconciliation.

---

# Payment Platform Launch Gates

## 1. Payment Method Readiness Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| Stripe Checkout / PaymentIntents | Card payments work end-to-end | Successful payment creates customer, subscription or invoice, entitlement, ledger entry | Test run logs, Stripe dashboard links |
| Apple Pay | Domain verification and payment flow complete | Apple Pay works on supported browsers/devices and fails gracefully otherwise | Apple Pay test screenshots, domain verification |
| Google Pay | Wallet flow complete | Google Pay works on supported browsers/devices and fails gracefully otherwise | Google Pay test screenshots |
| SCA / 3DS | Strong Customer Authentication handled | 3DS challenge, success, failure, and abandoned auth tested | Stripe test cards, webhook traces |
| Idempotency | Duplicate requests do not double-charge | Repeated client/server requests create one payment only | Idempotency test logs |

**Go / No-Go:** No real payments until all active payment methods are verified in production mode with limited internal transactions.

---

## 2. Subscription, Invoice, and Entitlement Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| New subscription | Paid customer receives correct access | Subscription active only after confirmed payment or valid trial state | Test account records |
| Plan changes | Upgrade/downgrade behavior defined | Proration, billing dates, and access level match product policy | Scenario matrix |
| Cancellation | Cancellation behavior implemented | Immediate vs period-end cancellation matches policy | Stripe/customer records |
| Invoice creation | Invoices are accurate | Line items, quantities, discounts, tax, and totals match expected values | Invoice samples |
| Entitlement source of truth | Access is webhook-driven, not client-trust-based | Entitlements update from Stripe events and internal billing state | Architecture review |

**Go / No-Go:** No launch if users can gain paid access without a confirmed billing state.

---

## 3. Tax and Compliance Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| Stripe Tax / tax engine | Tax calculated for supported jurisdictions | Correct tax shown before purchase and on invoice | Test invoices by country/state |
| Customer address collection | Required tax fields captured | Billing/shipping address rules satisfy tax setup | Checkout config review |
| Tax registration scope | Supported selling regions approved | Product does not sell into unapproved regions or has a blocking rule | Region policy |
| Exemptions | Tax-exempt customers handled | Valid exemption flow and invoice output tested | Test customer records |
| Invoice legal fields | Required company/tax details present | Invoice contains legal entity, VAT/GST IDs where applicable | Invoice samples |

**Go / No-Go:** No launch in jurisdictions where tax collection, invoicing, or registration obligations are unresolved.

---

## 4. Coupons, Discounts, and Pricing Integrity Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| Coupons | Coupon rules enforced | Duration, percent/amount off, product scope, expiration, redemption limits work | Coupon test matrix |
| Abuse prevention | Discounts cannot be stacked incorrectly | Unauthorized combinations rejected | Negative test results |
| Invoice accuracy | Discount math correct | Discounted subtotal, tax, and total match expected results | Invoice samples |
| Internal controls | Coupon creation restricted | Only authorized roles can create or distribute coupons | Access control review |

**Go / No-Go:** No launch if coupons can create unintended free or negative-value subscriptions.

---

## 5. Webhook Reliability and Ordering Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| Signature validation | Webhook authenticity verified | Invalid signatures rejected | Security test logs |
| Idempotency | Duplicate events safe | Replayed events do not duplicate entitlements, refunds, credits, or ledger entries | Replay tests |
| Out-of-order events | Event ordering handled | System derives current state from Stripe API where needed | Event ordering tests |
| Retry handling | Failed processing recoverable | Webhook retries or dead-letter queue exist with alerting | DLQ / retry evidence |
| Critical events | Required event coverage complete | Payment success/failure, subscription changes, invoice paid/failed, refunds, disputes tested | Event matrix |

**Go / No-Go:** No launch if webhook failure can silently grant, revoke, or misstate access or revenue.

---

## 6. Failed Payments and Dunning Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| Initial payment failure | User is not incorrectly activated | Failed first payment leaves user unpaid or incomplete | Test records |
| Renewal failure | Dunning policy implemented | Retry schedule, grace period, user notifications, and access changes defined | Policy and tests |
| Payment method updates | Recovery flow works | Customer can update card and restore subscription | Test run |
| Notifications | Customer messaging accurate | Emails/in-app messages match billing state | Message samples |

**Go / No-Go:** No launch if failed payments result in indefinite paid access or unclear customer status.

---

## 7. Refunds, Disputes, and Chargebacks Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| Refunds | Full and partial refunds tested | Refund updates invoice, customer balance, entitlement, and finance records correctly | Refund test logs |
| Disputes | Chargeback workflow exists | Dispute events received, access policy applied, evidence owner assigned | Dispute runbook |
| Refund authorization | Internal controls defined | Only approved roles can issue refunds | Admin permission review |
| Customer communication | Refund/dispute messaging ready | Support templates approved | Templates |

**Go / No-Go:** No launch if refunds or disputes can desynchronize Stripe, product access, and accounting records.

---

## 8. Delayed Settlement and Payout Reconciliation Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| Balance states | Payment vs available funds distinguished | System does not treat pending settlement as banked cash | Finance review |
| Payout tracking | Stripe payouts reconciled | Charges, fees, refunds, disputes, and adjustments tie to payout reports | Reconciliation sample |
| Fees | Processing fees accounted for | Gross, fees, tax, discounts, net revenue separated | Ledger report |
| Timing | Settlement delays understood | Finance has documented payout timing by method/country | Finance signoff |

**Go / No-Go:** No launch if finance cannot reconcile Stripe activity to bank deposits.

---

## 9. Finance, Accounting, and Audit Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| Revenue recognition | Revenue policy defined | Subscription revenue, refunds, discounts, tax, and credits handled consistently | Accounting memo |
| Tax liability | Tax separated from revenue | Reports distinguish collected tax from earned revenue | Report sample |
| Daily reconciliation | Operating process ready | Daily Stripe-to-internal reconciliation has owner and exception workflow | SOP |
| Month-end close | Close process tested | Finance can produce gross sales, refunds, fees, disputes, net payouts, deferred revenue | Mock close package |
| Audit trail | Traceability complete | Customer → invoice → payment → webhook → entitlement → ledger → payout traceable | Sample audit trail |

**Go / No-Go:** No launch without finance signoff on reconciliation and reporting.

---

## 10. Production Operations and Incident Gate

| Area | Launch Gate | Pass Criteria | Evidence |
|---|---|---|---|
| Monitoring | Billing health monitored | Alerts for webhook failures, payment failure spikes, refund/dispute spikes, reconciliation gaps | Alert config |
| Runbooks | Incident response ready | Playbooks for Stripe outage, webhook backlog, duplicate charges, tax issue, bad coupon | Runbook links |
| Access controls | Least privilege enforced | Stripe dashboard and admin billing tools restricted | Access review |
| Secrets | Keys protected | Live API keys stored in secret manager, not logs or client code | Security review |
| Support readiness | Customer-facing support prepared | Support can identify payment status, invoice, refund, failed renewal, entitlement state | Support guide |

**Go / No-Go:** No launch if billing incidents cannot be detected, triaged, and corrected quickly.

---

# Final Launch Approval Checklist

Minimum approvals required before real customer money:

1. **Engineering:** Payment, webhook, entitlement, and refund flows tested.
2. **Product:** Pricing, plans, coupons, trials, cancellations, and access policies approved.
3. **Finance:** Reconciliation, payout, fee, tax, and revenue reporting approved.
4. **Legal/Tax:** Selling regions, tax collection, invoice requirements, and terms approved.
5. **Support/Ops:** Runbooks, customer messaging, and escalation paths ready.
6. **Security:** Stripe permissions, webhook signatures, secrets, and admin controls reviewed.

**Hard No-Go Conditions:**

- Duplicate charges possible.
- Paid access possible without confirmed billing state.
- Webhook failures are silent or unrecoverable.
- Tax configuration unresolved for launch regions.
- Refunds/disputes do not update entitlements and finance records.
- Finance cannot reconcile Stripe to bank payouts.
- Live API keys, webhook secrets, or payment data are insecure.
- No owner for billing incidents after launch.
