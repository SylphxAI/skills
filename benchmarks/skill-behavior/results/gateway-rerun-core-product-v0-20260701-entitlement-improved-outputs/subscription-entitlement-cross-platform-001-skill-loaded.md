Billing model:  
Multi-channel SaaS subscription with personal plans, mobile store purchases, family sharing where allowed, and team invoice seats. Entitlement is derived from verified ledger facts, not client UI.

Provider/platform:  
Stripe web subscriptions, Apple App Store, Google Play, team/admin invoicing, support overrides, offline mobile entitlement cache.

Entitlement surfaces:  
- Personal account features and usage limits  
- Team/workspace features and seats  
- Mobile app premium access  
- Family-shared access where product/store policy allows  
- Offline mobile access token/cache  
- Support/admin views and user billing UI  

State model:
- `unknown` -> no verified entitlement facts yet.
- `trialing` -> verified trial active until trial end; may convert to `active`, `canceled`, or `expired`.
- `active` -> paid or team entitlement valid; renewals extend period.
- `active_until_period_end` -> user canceled renewal, but access continues until paid-through date.
- `grace` -> renewal failed but provider/product grace policy keeps access temporarily.
- `past_due` -> payment recovery failed or grace ended; access limited by policy.
- `expired` -> entitlement period ended; downgrade to free/read-only/export-safe access.
- `pending_downgrade` -> downgrade scheduled; current plan remains until effective date unless provider says immediate.
- `downgraded` -> lower plan applied; usage limits recomputed, over-limit resources preserved read-only where possible.
- `upgraded` -> higher plan applied immediately or per provider proration rules.
- `refunded` -> refunded purchase no longer grants access unless policy grants courtesy period.
- `chargeback_open` -> source access may be limited; account may receive `manual_review` overlay.
- `revoked` -> provider/store revoked purchase; source no longer grants access.
- overlays: `manual_review`, `commerce_limited`, `account_suspended`; do not merge with subscription state.

Channel precedence:

| Source | Grants | Conflicts | Resolution |
| --- | --- | --- | --- |
| Team admin invoice seat | Team/workspace plan while invoice active and seat assigned | Personal ownership, store billing, family benefits | Highest for covered workspace only. Seat removal revokes only team access. |
| Support override | Time-bounded correction by scope | Hidden permanent access, unresolved fraud | Requires reason, approver, expiry; does not erase provider dispute facts. |
| Stripe web | Personal/account web plan | Apple/Google billing management | Grant if active. If duplicate with store, grant highest active tier and show duplicate-subscription guidance. |
| App Store owner | Apple-owned personal entitlement by original transaction ID | Stripe/Google management | Grant until Apple expiry/refund/revocation. Do not auto-transfer if already linked to another user. |
| Google Play owner | Google-owned personal entitlement by purchase token lineage | Stripe/Apple management | Follow linked replacement tokens. Grant until Google expiry/refund/revocation. |
| Family sharing | Shared eligible paid tier | Billing/admin privileges, owner-only benefits | Lower than owner/team/personal subscriptions. Removal revokes only shared access. |
| Offline mobile cache | Temporary access snapshot | Durable entitlement truth | Valid only until signed expiry; refresh required online. |
| Free/default | Baseline access | Paid features | Applies only when no valid paid/team/shared/support source exists. |

Audit events:
- `provider_event_received`: provider, provider_event_id, provider_object_id, received_at, raw_payload_ref.
- `receipt_validation_succeeded`: provider, transaction/purchase token, original transaction ID/token lineage, user_id, product_id, effective_at.
- `receipt_validation_failed`: provider, reason, user_id/device_id, correlation_id.
- `subscription_created`: source channel, subscription_id, plan_id, user/account/team_id, period_start/end.
- `trial_started`: eligibility basis, renewal date, cancellation URL/message key.
- `renewal_succeeded`: old_period_end, new_period_end, amount/currency.
- `renewal_failed`: failure reason, grace eligibility, next retry time.
- `grace_started` / `grace_ended`: policy, access level, effective_at.
- `subscription_canceled`: cancel_at_period_end, effective_at, actor.
- `plan_changed`: old_plan, new_plan, proration/effective date, limits impact.
- `refund_detected`: source, amount, refunded period/object, entitlement action.
- `chargeback_opened` / `chargeback_resolved`: dispute_id, status, access policy.
- `team_seat_assigned` / `team_seat_removed`: team_id, seat_user_id, plan, effective_at.
- `family_share_detected` / `family_share_revoked`: owner transaction, beneficiary user, eligibility.
- `restore_purchase_started` / `completed` / `blocked`: provider, transaction/token, linked_user, result.
- `offline_entitlement_issued` / `expired`: signed token ID, scope, expiry, last verified ledger sequence.
- `entitlement_recomputed`: input ledger range, previous_state, next_state.
- `entitlement_granted` / `limited` / `revoked`: source, scope, reason, user-facing message key.
- `support_adjustment_requested` / `applied` / `expired`: requester, approver, reason, expiry.
- `reconciliation_corrected_state`: provider truth, prior local state, correction event.

Risks and fixes:
- `entitlement-1` ID confusion between plan, product, subscription, transaction, user -> store separate IDs and source lineage.
- `entitlement-2` client unlocks durable access after purchase screen -> grant only after verified receipt/provider event and ledger write.
- `entitlement-3` cancellation/refund/chargeback treated as same state -> separate renewal stop, money reversal, access revocation, and dispute.
- `entitlement-4` grace applied after refund -> grace only for failed renewal/payment recovery.
- `entitlement-5` downgrade destroys data immediately -> schedule effective date; preserve data read-only/export; enforce new creation limits.
- `entitlement-6` restore duplicates grants or steals purchases -> reconcile by original Apple transaction ID / Google token lineage; block if linked elsewhere.
- `entitlement-7` family removal revokes personal plan -> source-scoped revocation only.
- `entitlement-8` team seat removal cancels personal sub -> revoke only team/workspace entitlement.
- `entitlement-9` late/duplicate/out-of-order webhooks corrupt state -> dedupe by provider event ID, order by provider effective time, recompute from ledger.
- `entitlement-10` chargeback silently bans user -> apply explicit `chargeback_open` plus optional reviewed account overlay with support reason.
- `entitlement-11` offline mobile grants forever -> signed offline entitlement with short TTL, scope, ledger sequence, and refresh requirement.
- `entitlement-12` support cannot explain access -> support view must show provider fact, ledger fact, effective time, source, and user message.

Support/readiness checks:
- Can reproduce current entitlement from append-only ledger.
- Restore purchase tested for valid, expired, refunded, revoked, already-linked, and family-shared purchases.
- Stripe, Apple, and Google reconciliation jobs emit correction events, not silent edits.
- Duplicate subscription UI explains active sources without canceling any channel automatically.
- Downgrade messaging shows effective date, limit changes, over-limit behavior, and export/read-only path.
- Grace and past-due messages show payment update path and access deadline.
- Refund and chargeback flows revoke/limit only the affected source unless fraud overlay is approved.
- Offline access expires safely and never overrides newer revocation after reconnect.
