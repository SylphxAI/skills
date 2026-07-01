# Refund Handling Design — Mobile Subscription App

## 1. Source of Truth & Architecture
- **Billing system**: `purchase_service` owns IAP receipts (App Store / Play) and Stripe subs.
- **Entitlement store**: `entitlement_service` holds `{user_id, tier, granted_at, expires_at, source_refund: bool, abuse_score}`.
- **Idempotency**: every refund webhook keyed by `(platform, original_txn_id, event_id)`; deduped in `refund_events` table with 24h TTL.

## 2. Webhook → Refund Event Flow
| Step | Action |
|---|---|
| 1 | Receive `APPLE_NOTIFICATION`, `RTDN`, or `charge.refunded` / `charge.dispute.created` (Stripe) |
| 2 | Verify signature (Apple JWKS, Google Pub/Sub JWT, Stripe `whsec_`) |
| 3 | Persist raw event; enqueue `RefundEvent` |
| 4 | Look up original txn → user_id → current entitlement |
| 5 | Apply policy (below); emit outcome to `entitlement_service` + analytics |

## 3. Entitlement Revocation & Grace Period
- **Refund within trial or ≤72h of purchase**: revoke immediately, full access removed. No grace.
- **Refund >72h post-purchase**: enter **7-day grace period**.
  - User keeps entitlement; UI shows "Subscription ending in N days — refund processed".
  - Server sets `expires_at = now + 7d`; auto-revoke cron at expiry.
  - IAP: also call `App Store Server Notifications` revocation + Google `subscriptions.revoke` for future billing suppression.
- **Partial refund (Stripe)**: keep tier, reduce `expires_at` proportionally; never silently downgrade mid-cycle without notice.
- **Family-shared / multi-seat**: revoke only the original purchaser; cascading handled by `entitlement_service` rule table.

## 4. Chargebacks
- Treated as **worst-case refund**: immediate revocation, no grace, full evidence pack auto-submitted via Stripe/Apple/Google dispute APIs (IP logs, TOS timestamp, usage telemetry, refund history).
- Chargeback counts **3×** toward abuse score (vs. 1× voluntary refund).

## 5. Refund Abuse Scoring
`abuse_score` (rolling 180-day window, decays at 1 pt / 30 days idle):

| Signal | Points |
|---|---|
| Voluntary refund | +1 |
| Chargeback | +3 |
| Refund then re-subscribe within 7d | +2 |
| Multiple accounts on same device/payment fingerprint | +4 |
| Goodwill refund already issued | +2 |
| Refund denied (bank-side) | +1 |

Score buckets: **0–2 clean · 3–5 watch · 6–9 warn · 10+ restrict · 15+ ban**.

## 6. One-Time Goodwill Refunds
- Eligibility: account age ≥30d, no prior goodwill, score <6, verified bug/CTA mismatch documented.
- Cap: 1 per user ever; max 1 month of charges.
- Flow: support agent clicks "Goodwill" → reason code (required) → `refund_service.issue(credit_note)` → score +=2, sets `goodwill_used=true`.
- Apple/Google: directed to user to self-refund via store (we don't issue IAP credits off-platform).

## 7. Support Macros
| Macro ID | Trigger | Reply core |
|---|---|---|
| `REF-STD` | Verified refund via store | "Refund processed. Access continues until {date}. Re-subscribe anytime." |
| `REF-DENY` | Out-of-policy request | "We don't refund outside {policy_window}, but I can offer {alt: pause / downgrade}." |
| `REF-GOODWILL` | Approved goodwill | "As a one-time courtesy we've credited {amount}. Thanks for being with us." |
| `REF-CHARGEBACK` | Active dispute | "We see a chargeback. Access paused; submitting evidence. Reply here to resolve directly and avoid fees." |
| `REF-ABUSE-WARN` | Score 6–9 | "We've noticed unusual refund activity. Continued misuse may restrict your account." |
| `REF-BAN` | Score ≥15 | "Account restricted due to repeated refund abuse. Contact appeals@." |

## 8. Analytics Events
`refund.received`, `refund.grace_started`, `refund.revoked`, `refund.chargeback`, `refund.goodwill_issued`, `refund.denied`, `abuse.score_changed`, `enforcement.warn_sent`, `enforcement.downgrade`, `enforcement.ban`, `entitlement.renewal_suppressed`. Emit to warehouse with `user_id, platform, score, refund_reason, days_since_purchase, prior_refund_count`.

## 9. Enforcement Tiers
| Tier | Trigger | Action |
|---|---|---|
| **Warn** | score 6–9 | Email + in-app banner; no entitlement change |
| **Downgrade** | score 10–14 OR 2nd chargeback | Force to free tier at period end; block new IAP for 30d |
| **Ban** | score ≥15 OR 3rd chargeback | Hard account block; device fingerprint blacklist; reserve right to clawback goodwill |

All enforcement actions are reversible via appeals queue; logs retained 24 months for audit.
