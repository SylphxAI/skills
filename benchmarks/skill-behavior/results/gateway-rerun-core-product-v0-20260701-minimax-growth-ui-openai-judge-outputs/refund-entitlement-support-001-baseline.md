# Refund Handling Policy — Mobile Subscription App

## 1. Provider Routing (single source of truth)

| Provider | Trigger | Refund authority | Webhook source |
|---|---|---|---|
| Apple App Store | `APPLE_REFUND_NOTIFICATION` (App Store Server Notifications v2) | Apple-issued only; we **acknowledge, never initiate** | App Store Server |
| Google Play | `voidedPurchase` / `subscriptionRevoked` from RTDN | Google-issued only; honor via `Purchases.subscriptions.revoke` | Google Pub/Sub |
| Stripe (web) | `charge.refunded`, `charge.dispute.created` | **We initiate** via dashboard or support tool | Stripe webhook |

All events land in `billing_events` (immutable log: `user_id`, `provider`, `event_type`, `amount`, `currency`, `purchase_token`, `raw_payload`).

## 2. Entitlement Revocation

| Action | App Store | Google Play | Stripe |
|---|---|---|---|
| Immediate revocation on refund | ✅ | ✅ | ✅ |
| Preserve user data | 30-day soft delete | 30-day soft delete | 30-day soft delete |
| Re-subscribe allowed | ✅ | ✅ | ✅ |

Single function `revokeEntitlement(userId, reason)`:
1. Mark `entitlement.status = 'revoked'`, `revoked_at = now`.
2. Cancel provider-side (Google `revoke`; Stripe `cancel`; Apple: token sent to Apple, no action).
3. Issue app receipt refresh signal.
4. Enqueue `downgrade_or_ban_decision` event.

## 3. Grace Period

- **First-ever refund**: 7-day grace — keep premium features, show in-app banner "We noticed a refund, talk to us?"
- **Repeat refund (2nd)**: 0-day — revoke immediately.
- **Goodwill refund**: 30-day grace, no downgrade.
- **Chargeback**: 0-day — funds not received, treat as fraud signal.

## 4. Chargebacks

```
charge.dispute.created → flag account, freeze payouts internally
charge.dispute.closed (won) → unfreeze, log
charge.dispute.closed (lost) → revoke + add to abuse_score (+40)
Evidence packet auto-built: receipt PDF, server access logs, entitlement timestamps.
```

Target win rate: ≥ 65% via pre-built evidence.

## 5. Refund Abuse Scoring

`abuse_score` (0–100), recomputed per event:

| Signal | Delta |
|---|---|
| Refund within 24h of renewal | +15 |
| Refund after consuming content (e.g., >80% used) | +20 |
| Chargeback lost | +40 |
| Multiple provider refunds (Apple *and* Stripe) | +25 |
| New device + new card + refund | +30 |
| Goodwill refund issued | −10 |
| Account age > 1 year, no prior refunds | −20 |

## 6. Enforcement Tiers

| Score | Action |
|---|---|
| 0–29 | Log only |
| 30–49 | **Warn** — in-app + email: "Future refunds may revoke access immediately" |
| 50–74 | **Downgrade** to free tier; block new paid plans 90 days |
| 75–100 | **Ban** device fingerprint + account; 30-day appeal window via support |

Tier transitions written to `enforcement_log`; reversible by support with reason code.

## 7. One-Time Goodwill Refund

Conditions (all must hold):
- Account > 90 days old
- `abuse_score < 30`
- No goodwill refund in past 12 months
- Refund reason is service-quality (outage, bug)

Limit: **1 per account per 12 months**, max amount = 1 month of subscription. Auto-decrements `abuse_score` by 10. Logged separately in `goodwill_refunds` table.

## 8. Support Macros

```
/refund-acknowledged   → email template, 24h response SLA
/refund-pending        → status check template
/refund-disputed       → chargeback evidence request
/goodwill-offered      → requires manager approval token
/abuse-warning         → tier 30–49 warning template
/abuse-downgrade       → tier 50–74 explanation + appeal link
/abuse-ban             → tier 75–100, includes appeal rights per ToS
/chargeback-evidence   → auto-attaches server logs + receipt
```

## 9. Analytics Dashboard (daily)

- `refund_rate_30d` per provider (target: < 5%)
- `chargeback_rate` (target: < 0.5%)
- `abuse_score_distribution`
- `enforcement_actions_per_week` (warn / downgrade / ban)
- `goodwill_refund_spend` (cap: 0.3% of MRR)
- `chargeback_win_rate`
- Cohort: 90-day retention of refunded users

## 10. Key Audit Decisions

1. **Never self-refund Apple** — violates App Store guidelines; risk of app removal.
2. **Revoke immediately for chargebacks** — funds already lost; treat as fraud.
3. **Grace period is one-time per account** — prevents abuse of grace mechanic.
4. **Bans are device + account, not user-id alone** — defeats multi-account abuse.
5. **Goodwill refunds require structured reason code** — required for finance reconciliation.
6. **All decisions logged immutably** — supports platform audit (Apple §5.1.1, Google Play billing policy).

## 11. Edge Cases

- **Refund during free trial**: revoke trial, no charge, no abuse score.
- **Partial refund (Stripe only)**: prorate entitlement days; no revocation.
- **Family Sharing refund (Apple)**: revoke only the initiating subscriber.
- **Subscription paused then refunded**: revoke immediately, ignore pause state.
