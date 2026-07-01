## Subscription Entitlement Design

### 1. Core model

Maintain **one entitlement ledger per user**, derived from normalized purchase events.

**Tables / objects**
- `User`
- `Team`
- `TeamMembership`
  - `role`
  - `seat_status`: active, removed, pending
- `SubscriptionSource`
  - `source`: stripe, app_store, google_play, team_invoice
  - `source_account_id`
  - `product_id`
  - `plan_tier`
  - `billing_period`
  - `status`
  - `current_period_start`
  - `current_period_end`
  - `grace_period_end`
  - `cancel_at_period_end`
  - `refunded_at`
  - `chargeback_at`
  - `family_shared`
  - `original_transaction_id` / `purchase_token` / `stripe_subscription_id`
- `Entitlement`
  - `user_id`
  - `tier`
  - `scope`: individual or team
  - `source`
  - `effective_start`
  - `effective_end`
  - `state`
  - `reason`

Entitlements are **computed**, not manually edited.

---

## 2. Entitlement precedence

If a user has multiple valid sources, grant the **highest active entitlement**.

Priority:
1. Active team seat
2. Active paid individual subscription
3. Grace-period individual subscription
4. Family-shared subscription, if allowed
5. Free plan

If two active paid subscriptions exist, do **not** merge billing. Grant the better entitlement and surface “duplicate subscription detected” with cancellation guidance.

---

## 3. Subscription states

Canonical states:

- `active`: paid and within period
- `grace`: billing issue but provider allows access
- `past_due`: provider says unpaid and no grace access
- `canceled_active`: canceled but current period still valid
- `expired`: period ended
- `refunded`: refunded by store/provider
- `chargeback`: payment disputed
- `revoked`: provider revoked entitlement
- `paused`: subscription paused by provider
- `pending_downgrade`: downgrade scheduled
- `team_active`: active via team seat
- `team_removed`: seat removed

Access is allowed only for:
- `active`
- `canceled_active`
- `grace`
- `team_active`
- valid offline cached access, subject to limits

---

## 4. Source-specific behavior

### Stripe web
Use Stripe webhooks as source of truth:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`
- `charge.refunded`
- `charge.dispute.created`
- `charge.dispute.closed`

Rules:
- Grant after successful payment or trial activation.
- On payment failure, enter `grace` if configured, otherwise `past_due`.
- On cancellation, keep access until `current_period_end`.
- On refund or chargeback, revoke according to refund policy.

### App Store
Use App Store Server API / Server Notifications V2.

Validate:
- signed transaction
- original transaction ID
- bundle ID
- product ID
- environment
- expiration date
- revocation date
- ownership type

Rules:
- Grant until `expiresDate`.
- Respect billing retry and grace-period fields.
- If `revocationDate` exists, revoke from that date.
- Use `originalTransactionId` to prevent duplicate accounts claiming same subscription.

### Google Play
Use Google Play Developer API and Real-time Developer Notifications.

Validate:
- package name
- product ID
- purchase token
- expiry time
- payment state
- acknowledgement state
- cancel reason
- linked purchase token

Rules:
- Grant until `expiryTimeMillis`.
- Acknowledge purchases promptly.
- Respect account hold, grace period, pause, cancellation, refund, and revoke events.
- Follow `linkedPurchaseToken` for upgrades/downgrades.

### Team admin invoice
Team subscription is owned by `Team`, not individual user.

Rules:
- Admin invoice paid => allocate purchased seats.
- User gets entitlement only while an active seat is assigned.
- Removing a user removes team entitlement immediately unless policy says end of billing period.
- Team nonpayment:
  - `grace` for configured period
  - then suspend all seats
- Team cancellation:
  - access continues until paid-through date unless immediate termination is contractual.

---

## 5. Restore purchases

### iOS
- User taps restore.
- App fetches App Store transactions.
- Backend validates signed transactions.
- If valid and not already linked to another user, attach to current user.
- If already linked, show: “This purchase is associated with another account.”

### Android
- Query active purchases via Billing Client.
- Send purchase token to backend.
- Backend validates with Google.
- If valid and unclaimed, attach to user.
- If token was replaced via upgrade/downgrade, follow linked token chain.

### Web Stripe
No native restore. User signs in with the same app account. Optionally support “Find purchase” by verified email and Stripe customer lookup.

---

## 6. Receipt validation policy

- Validate all purchases server-side.
- Mobile clients never directly grant durable entitlement.
- Store raw receipt/token metadata for audit.
- Use provider webhooks as authoritative updates.
- Make validation idempotent.
- Reject mismatched product, bundle/package, environment, currency abuse, reused token, or already-linked ownership.

---

## 7. Family sharing edge cases

App Store may indicate family-shared ownership.

Policy options:
- If family sharing is supported: grant individual entitlement to family member while Apple reports valid shared access.
- If not supported for the product: deny shared entitlement and explain.
- Family-shared users cannot manage billing inside the app.
- If family organizer cancels/refunds, all derived family entitlements expire/revoke.
- Do not allow the same family-shared transaction to unlock team seats.

Google Play family library generally does not apply to subscriptions in the same way; do not assume transferable subscription entitlement unless provider explicitly supports it.

---

## 8. Team seat changes

- Seat assignment creates `team_active` entitlement immediately.
- Seat removal removes entitlement immediately.
- If the user also has a personal subscription, fall back to personal entitlement.
- If team downgrades seat count below assigned users:
  - mark excess users `pending_removal`
  - admin must resolve, or remove least-recently-added seats by policy.
- Seat changes are audit logged with actor, timestamp, team, and affected user.

---

## 9. Plan changes and downgrades

### Upgrade
- Apply upgraded entitlement immediately once provider confirms.
- Billing proration handled by source provider.

### Downgrade
- Schedule downgrade at `current_period_end`.
- Keep higher-tier features until paid-through end.
- If provider applies downgrade immediately, mirror provider state.
- Features above the downgraded tier become unavailable after effective downgrade date.
- Preserve data but gate premium actions.

---

## 10. Grace periods

- Grace period is source-specific and time-boxed.
- During grace, user retains paid access.
- Show billing warning.
- If payment recovers, return to `active`.
- If grace expires, downgrade to free or fallback entitlement.
- Offline grace should not exceed server-confirmed `grace_period_end`.

---

## 11. Refunds and chargebacks

### Refund
- Full refund: revoke entitlement from refund effective date unless policy grants paid-through access.
- Partial refund: adjust entitlement only if provider indicates cancellation/revocation.
- Store refund reason and provider event ID.

### Chargeback
- Immediately mark `chargeback`.
- Revoke paid entitlement.
- Optionally block new purchases until dispute resolved.
- If dispute is won and provider restores payment, recompute entitlement.

---

## 12. Offline mobile access

- Client caches signed entitlement token from backend:
  - `user_id`
  - `tier`
  - `features`
  - `effective_until`
  - `issued_at`
  - `source`
- Token is signed by backend and verified locally.
- Maximum offline access: e.g. 7 days, never beyond subscription/grace expiry.
- High-risk actions require online check.
- On reconnect, force entitlement refresh.
- If refund/chargeback occurs while offline, access ends when cached token expires.

---

## 13. Audit and reconciliation

- All provider events are stored immutable and processed idempotently.
- Nightly reconciliation checks Stripe, Apple, Google, and team invoices against computed entitlements.
- Conflicts produce audit alerts.
- Entitlement decisions should be explainable as:  
  “User has tier X until date Y because source Z is state S.”
