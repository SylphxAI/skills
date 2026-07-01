Billing model:  
Hybrid B2C + B2B subscription. One person may hold or use entitlements from: individual web subscription, App Store subscription/IAP, Google Play subscription/IAP, Apple family sharing, Google family library if applicable, and team/admin invoice seat assignment.

Provider/platform:  
Stripe Billing, Apple App Store Server API + App Store Server Notifications, Google Play Developer API + RTDN, invoicing/AR system for team admin contracts, internal entitlement ledger.

Entitlement surfaces:  
- API/backend feature gates  
- Web app plan limits  
- iOS/Android premium unlocks  
- Offline mobile cache  
- Team workspace access and seat limits  
- Support/admin tools  
- Exports/read-only access after downgrade or expiry  

State model:
- `unknown` -> no verified purchase or assigned seat; free/default access only.
- `trialing` -> verified trial from Stripe/store/team promo; grant trial benefits until `trial_end`.
- `active` -> verified paid period, valid store subscription, active Stripe sub, or assigned active team seat.
- `active_until_period_end` -> user canceled renewal but paid access continues until provider period end.
- `grace` -> renewal/payment failed but provider or policy allows temporary continued access.
- `past_due` -> renewal failed beyond grace or invoice unpaid; access limited by policy.
- `expired` -> paid period ended with no successful renewal; revoke premium, retain account/data.
- `pending_downgrade` -> downgrade scheduled; old benefits remain until effective date unless immediate downgrade explicitly purchased.
- `downgraded` -> lower plan active; limits recalculated at effective time.
- `upgraded` -> higher plan active immediately or per provider proration rules.
- `refunded` -> refund confirmed; remove entitlement associated with refunded transaction unless policy grants exception.
- `chargeback` -> dispute/chargeback detected; revoke or limit access and mark commerce risk.
- `revoked` -> provider revoked transaction, fraud confirmed, admin removed seat, or support manually revoked.
- Overlays: `manual_review`, `commerce_limited`, `account_suspended`; do not replace subscription state.

Precedence / entitlement derivation:
- Entitlements are derived from verified provider events plus internal ledger events, not client UI.
- A user may have multiple entitlement sources. Effective access = highest valid entitlement from active personal purchase, active family share, or assigned team seat.
- Keep source attribution: `stripe_subscription_id`, `apple_original_transaction_id`, `google_purchase_token`, `invoice_contract_id`, `team_id`, `seat_id`.
- Do not merge provider identities; link all to internal `user_id`/`account_id`.
- Personal subscription and team seat can coexist. Canceling one source must not revoke access from another active source.

Risks and fixes:
- `entitlement-1` Confusing product, subscription, team, and user identifiers -> maintain separate catalog SKU, provider subscription, entitlement, user, team, and seat records.
- `entitlement-2` Spoofed client receipts or stale UI unlocks -> validate Apple receipts/server transactions and Google purchase tokens server-side; record idempotent ledger events before granting.
- `entitlement-3` Treating cancel/refund/chargeback as same -> cancellation stops renewal, refund reverses purchase, chargeback opens dispute risk, revocation removes access.
- `entitlement-4` Applying grace to refunded purchases -> grace only for failed renewal/payment recovery, not confirmed refund or chargeback unless support override.
- `entitlement-5` Ambiguous plan switches -> define effective date: upgrades immediate with proration; downgrades at period end unless provider reports immediate replacement.
- `entitlement-6` Duplicate grants on restore -> restore replays provider truth, matches Apple `original_transaction_id` or Google purchase token/order lineage, and reconciles existing entitlement.
- `entitlement-7` Downgrade data loss -> enforce lower limits predictably; preserve existing data read-only/export where practical; block new over-limit usage.
- `entitlement-8` Support blind spots -> support view must show source, provider event, ledger event, entitlement state, effective dates, payment/refund/chargeback status, and user-facing message.
- `entitlement-9` Trial abuse across platforms -> track trial eligibility by user, device risk, payment method, provider account where available, and team domain policy.
- `entitlement-10` Non-auditable access -> entitlement state must be reproducible from append-only ledger history.

Provider-specific behavior:
- Stripe web: trust signed webhooks, not return URLs. Handle `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated/deleted`, `charge.refunded`, `charge.dispute.created`.
- App Store: validate via App Store Server API. Handle renewal, expiration, billing retry, grace, refund, revoke, upgrade/downgrade, family-sharing revocation.
- Google Play: validate purchase token via Developer API. Acknowledge purchases. Handle renewals, cancellation, pause, account hold, grace, refund, revoke, replacement purchases.
- Team invoice: admin contract creates team entitlement. Seat assignment grants user access. Removing seat revokes team-derived access only.

Restore purchases:
- Mobile restore starts `restore_purchase_started`.
- Server validates current Apple/Google account purchases.
- If active purchase belongs to same or linkable user, reconcile and emit `restore_purchase_completed`.
- If purchase is already linked to another user, block automatic transfer and send to support/manual review.
- If no active purchase found, show “No active purchase found.”

Family sharing edge cases:
- Family-shared entitlement is source-scoped and revocable independently.
- Do not allow a family-shared entitlement to manage billing, cancel, upgrade, or claim owner-only benefits.
- If Apple/Google reports family access removed, revoke only that shared entitlement.
- If both personal and family entitlements exist, personal paid source wins for billing ownership.

Team seat changes:
- Admin invoice active + seat assigned = team entitlement active.
- Seat removed, team invoice unpaid beyond grace, contract ended, or admin suspends member = revoke/limit team access.
- Seat count downgrade: existing assigned seats above limit enter admin remediation; block new seats and optionally limit overflow users after notice.
- Team plan downgrade applies at contract effective date; workspace limits recalculated with read-only/export safety.

Offline mobile access:
- Mobile app may cache signed entitlement token with `expires_at`, `source`, `plan`, and `issued_at`.
- Offline premium access allowed only until short cache TTL, e.g. 24–72 hours, or paid period end if sooner.
- On reconnect, refresh from backend. If refund/revocation/chargeback detected, invalidate cached entitlement.
- Never treat offline token as durable source of truth.

Support/readiness checks:
- Can reproduce a user’s current entitlement from ledger events only.
- Can show why access is active: Stripe, Apple, Google, family share, or team seat.
- Can refund without accidentally canceling unrelated active entitlements.
- Can cancel renewal while preserving paid-through access.
- Can process chargeback and revoke/limit affected source only.
- Can restore purchases without duplicate grants.
- Can downgrade plans with clear effective date and data/limit impact.
- Can recover from out-of-order or duplicated webhooks/notifications idempotently.
- User messaging clearly states access end date, grace deadline, downgrade impact, and support path.
