**Purchase/refund context:**
Three purchase channels (Apple App Store, Google Play, Stripe), subscription + consumable + non-consumable IAP mix. Authority split: store/processed refunds are provider-owned; entitlement revocation is server-owned; account restrictions require abuse-review approval.

**Authority:**
- Apple/Google: provider processes refund; we receive `App Store Server Notification` / Real-Time Developer Notification and adjust entitlement.
- Stripe: webhook-driven (`charge.refunded`, `dispute.*`); internal policy decides entitlement timing.
- Goodwill: support ticket + finance approval; default preserve until period end.

**Provider table:**

| Provider/channel | Signal | Dedupe key | Refund state | Entitlement action |
|---|---|---|---|---|
| Apple App Store | App Store Server Notification (REFUND, REVOKE) | `original_transaction_id` + `notificationId` | refund_confirmed → pending_revoke | revoke at period end for sub; immediate for non-consumable; reconcile spent consumable |
| Google Play | RTDN `voidedPurchase` + `subscription.revoked` | `purchaseToken` + `messageId` | refund_confirmed → pending_revoke | revoke at period end for sub; immediate for non-consumable; reconcile consumable ledger |
| Stripe (refund) | `charge.refunded` webhook | `charge_id` / `refund_id` | refund_confirmed → pending_revoke | revoke at period end for sub; immediate for one-time; never negative balance |
| Stripe (chargeback) | `dispute.opened/won/lost` | `dispute_id` | disputed_hold → resolved | pause entitlement; restore on win, revoke on lost |
| Internal goodwill | ticket + finance approval | `ticket_id` + `approval_id` | goodwill_applied | preserve entitlement until period end; ledger entry only |

**Entitlement state machine:**
```
active ──refund_confirmed──> pending_revoke ──grace_elapsed──> revoked
active ──chargeback_opened──> disputed_hold ──dispute_won──> active
disputed_hold ──dispute_lost──> revoked
revoked ──appeal_approved|repurchase──> active
grace_window: sub = current paid period end; non-consumable = immediate; consumable = ledger-reconcile, no debt.
```

**Decision table:**

| Scenario | Entitlement action | Account action | Support action |
|---|---|---|---|
| Accidental subscription | Revoke at period end after refund | None | Macro: explain platform route + restore path |
| Non-consumable refund | Immediate revoke | None | Macro: confirm access ended; show repurchase |
| Consumable spent before refund | Reconcile ledger; no negative balance | Risk score if repeated | Route repeated high-value to review |
| Chargeback | disputed_hold | Commerce-limited pending review | Macro: ask dispute resolution; offer support |
| One-time goodwill | Preserve until period end | Note in ledger | Macro: confirm credit, no access change |
| Repeat abuse (high tier) | Revoke where possible | Commerce limit + manual review | Evidence-based macro + appeal route |
| Severe abuse (severe tier) | Revoke | Suspend only with approval + reversible hold | Appeal required before permanent |

**Abuse and trust ladder:**
Score inputs: refund count/30d, refund-to-purchase ratio, refund latency post-purchase, usage-after-purchase, prior chargebacks, linked accounts/payment methods, prior appeal outcomes.

| Tier | Score | Evidence | Action | Approval | Appeal path | FP guard |
|---|---|---|---|---|---|---|
| Low | 0–2 | None | Inform in macro | Auto | N/A | N/A |
| Medium | 3–5 | ≥1 refund + 1 signal | Skip future grace; warn | Auto | 14-day appeal | Manual review on first hit |
| High | 6–9 | Pattern of ≥3 signals | Commerce limit; manual review | Trust lead | 14-day appeal w/ evidence | Second-look if single chargeback |
| Severe | 10+ | Coordinated/linked fraud | Suspend (reversible hold) | Trust + Legal | 30-day appeal | Requires ≥2 corroborating signals |

Never auto-ban on first refund. Never coerce repurchase with threats. All restrictions reversible via appeal within hold window.

**Support macros/events:**
- `refund_received`: "We received confirmation your purchase was refunded. [Access ends at period end / has ended]. Your account remains active. To appeal, reply with order ID."
- `chargeback_hold`: "A payment dispute is open. Premium access is paused. Resolve the dispute with your bank or reply here to start review."
- `goodwill_applied`: "We've credited your account as a one-time courtesy. No access changes."
- `commerce_limited`: "We've limited new purchases on this account pending review. To appeal, submit evidence within 14 days."
- `appeal_resolved`: outcome + restoration or rejection with reason.

**Metrics/dashboard:**
- Refund rate by provider; revocation lag (refund→revoke p50/p95)
- Chargeback open/win/loss ratio; goodwill count & value; abuse-tier transitions
- Appeal volume + overturn rate; churn after refund; top refund reason codes
- False-positive rate per tier; support contact rate post-refund
- Owner: Trust (abuse/chargeback), Finance (goodwill), Support (macro outcomes), Product (reason-code feed).
