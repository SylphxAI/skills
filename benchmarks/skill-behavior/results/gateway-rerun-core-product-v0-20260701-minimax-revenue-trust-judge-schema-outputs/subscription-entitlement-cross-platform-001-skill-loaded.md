<think>
The user wants me to design subscription entitlement behavior using the subscription-entitlement-review skill. I need to follow the output format and stay within 650 words. Let me build the artifactsbased on the skill context.

Let me structure this carefully:

1. Billing model
2. Provider/platform
3. Entitlement surfaces
4. State model
5. Channel precedence table
6. Audit events
7. Risks and fixes
8. Support/readiness checks

I'll keep it tight and audit-friendly.
</think>

```text
Billing model: Per-user SaaS with mobile companion apps; tiered plans (Free, Pro, Team) billed monthly/annually; team plans via admin invoice; trials 14 days; family sharing eligible on Pro only.

Provider/platform:
- Web: Stripe (Checkout + Customer Portal + webhooks)
- iOS: App Store (StoreKit 2, original transaction ID)
- Android: Google Play (Real-Time Developer Notifications + purchase token)
- Team: Admin invoice billing, seat assignment
- Support: Manual override (time-bounded, audited)

Entitlement surfaces:
- account_id (durable user key)
- product_id (Free, Pro, Team)
- plan_id (monthly/annual + tier)
- subscription_id (provider handle)
- entitlement_id (derived, per account)
- team_seat_id (workspace linkage)
- source_label (stripe | appstore | googleplay | team_invoice | family | support | default)

State model:
- unknown -> trialing (trial_started received, eligibility verified)
- trialing -> active (trial_converted / first paid renewal)
- trialing -> expired (trial_not_converted at term end)
- active -> grace (renewal_failed, keep access per policy window)
- grace -> active (renewal_succeeded)
- grace -> past_due (recovery window exceeded)
- past_due -> expired (final retry failed)
- active -> canceled (user canceled; access until period_end)
- active -> upgraded | downgraded (plan_changed at effective_at)
- active -> refunded (refund_detected; revoke refunded scope)
- active -> revoked (chargeback won, fraud, or store refund with revocation)
- any -> manual_review | commerce_limited | account_suspended (support/fraud overlay; never collapse into main state)

Channel precedence:
| Source | Grants | Conflicts | Resolution |
| --- | --- | --- | --- |
| Stripe web sub | Personal Pro/Team on web+account-scoped mobile | App Store/Google billing mgmt | Highest active tier; show duplicate-subscription guidance if coexisting |
| App Store | Personal Pro validated by originalTransactionId | Google/Stripe billing mgmt | Grant until Apple expiry/revocation; family share below owner |
| Google Play | Personal Pro validated by purchase token lineage | Apple/Stripe billing mgmt | Follow token lineage on replacement; grant until Google expiry |
| Team invoice seat | Workspace features while seat assigned and contract active | Personal billing ownership of workspace features | Highest access for workspace scope; seat removal revokes only team-derived access |
| Family share | Shared Pro where store + product policy allow | Billing mgmt, admin features | Lowest precedence; grant lowest eligible paid tier; revoke only shared access |
| Support override | Time-bounded fix with reason + approver | Permanent hidden access | Named scope + expiry; never masks disputes/fraud |
| Default | Baseline free | Paid features | Only when no paid/team/shared/support source is active |

Audit events (required fields: actor, source, source_object_id, prev_state, next_state, provider_effective_at, received_at, idempotency_key, correlation_id, user_message_key, support_reason):
- subscription_created, trial_started, renewal_succeeded, renewal_failed
- grace_started, grace_ended, subscription_canceled, plan_changed
- refund_detected, chargeback_opened, chargeback_resolved
- team_seat_assigned, team_seat_removed
- family_share_detected, family_share_revoked
- offline_entitlement_issued, offline_entitlement_expired
- entitlement_recomputed, entitlement_granted, entitlement_limited, entitlement_revoked
- restore_purchase_started, restore_purchase_completed, restore_purchase_blocked
- support_adjustment_requested, support_adjustment_applied, support_adjustment_expired
- reconciliation_started, reconciliation_corrected_state
- receipt_validation_succeeded, receipt_validation_failed

Risks and fixes:
- entitlement-1 Catalog/ID collision -> separate product_id, plan_id, subscription_id, entitlement_id, account_id
- entitlement-2 Client-UI trust -> server recomputes entitlement from ledger; client reads only
- entitlement-3 Cancel/refund/revoke collapse -> distinct states with distinct user messaging
- entitlement-4 Grace misuse -> apply grace only to renewal_failed, not refunded access
- entitlement-5 Plan change ambiguity -> store effective_at and proration_type; apply at effective_at
- entitlement-6 Restore duplicates -> dedupe by (provider, provider_event_id); block re-grant on linked txn
- entitlement-7 Downgrade data loss -> downgrade is scheduled; keep paid limits until effective_at; preserve export/read-only window post-expiry
- entitlement-8 Opaque support tools -> show provider event, ledger event, state, effective_at, user message
- entitlement-9 Trial abuse -> store eligibility fingerprint; gate trial_started by account/device history
- entitlement-10 Non-reproducible state -> rebuild entitlement from ordered ledger (effective_at, ledger_seq)
- entitlement-11 Cross-channel over-revoke -> enforce precedence table; per-source revocation only
- entitlement-12 Out-of-order/late webhooks -> store both provider_effective_at and received_at; dedupe by idempotency_key; reconciliation job corrects drift

Support/readiness checks:
- Channel matrix present and tested for: web-only, app-only, team-only, multi-channel duplicate, family-shared
- Restore purchase on iOS/Android reconciles without duplicate grant (verify idempotency_key)
- Receipt validation server-to-server for App Store (App Store Server Notifications v2 + StoreKit 2) and Google RTDN
- Failed renewal → grace entry with user-visible message and recovery CTA
- Cancel → access retained until period_end; downgrades scheduled, not immediate
- Refund → revoke refunded scope only; do not touch unrelated channels
- Chargeback opened → manual_review overlay; won chargeback → revoked with audit trail
- Team seat removal → revoke only team-derived features; personal sub unaffected
- Family share revocation → revoke shared entitlement only; owner purchase preserved
- Offline mobile: issue offline_entitlement_issued with short TTL; reconcile on next online event
- Reconciliation job runs daily against Stripe, Apple, Google; emits correction events, never silent edits
- Audit log immutable; entitlement state reproducible by replaying ordered ledger
```
