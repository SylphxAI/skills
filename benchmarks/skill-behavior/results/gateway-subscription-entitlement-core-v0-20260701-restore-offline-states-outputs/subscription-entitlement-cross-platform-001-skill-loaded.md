```text
Billing model: Per-user SaaS + mobile (iOS/Android) with team seats. Tiered plans (Free, Pro, Team, Enterprise). Trials (7/14-day), monthly/annual, pause, downgrade at period end, family-share eligible, offline mobile snapshot.

Provider/platform:
- Web: Stripe (subscription IDs sub_*, invoice/charge, customer_id).
- iOS: App Store (original_transaction_id, transaction_id, shared via Family Sharing).
- Android: Google Play (purchaseToken, subscriptionId).
- Team: Admin invoice/contract (entitlement assigned per seat).
- Source of truth: append-only ledger; entitlements are derived.

Entitlement surfaces: Web app, iOS app, Android app, desktop sync, API access, team workspaces, offline mobile cache.

State model:
- unknown -> trialing (trial_started)
- trialing -> active (trial_converted/renewal_succeeded) | canceled | expired
- active -> grace (renewal_failed) -> past_due -> expired | active (recovery)
- active -> canceled_at_period_end (user_canceled) -> expired
- active -> pending_plan_change (downgrade/upgrade scheduled) -> active | grace
- active -> paused (provider pause or admin pause) -> active | expired
- refunded | revoked (commerce change, separate from cancel)
- restore_pending -> restored_active | restore_not_found
- offline_active -> offline_expired | online_reconciled
- manual_review | commerce_limited | account_suspended (overlays, never collapsed)

Paused/restored/offline states:
- paused: Provider/admin pause. Keep paid access until pause_effective_at, then read-only + export until resume_at or expiry. Exit: resume, cancel, expire. Evidence: pause source, effective_at, resume_at.
- restore_pending: User taps restore or signs in new device. No new grant. Show neutral "checking purchases" state. Exit: restored_active or restore_not_found. Evidence: restore_request_id, account hint, lineage.
- restored_active: Provider validates active original_transaction_id/purchaseToken matching existing ledger lineage. Resume derived entitlement; never duplicate. Exit: normal active/renewal/refund paths.
- restore_not_found: Provider returns no active purchase. Keep current non-store access; show "no active purchase found" with re-link/support CTA.
- offline_active: Signed snapshot, scoped features only, ttl <= 72h, no purchases/upgrade/export-sensitive. Exit: online_reconciled or offline_expired. Evidence: snapshot_id, signed_at, last_verified_at, ttl, scope.
- offline_expired: TTL lapsed. Read-only/free fallback with reconnect prompt.

Channel precedence:
| Source | Grants | Conflicts | Resolution |
| --- | --- | --- | --- |
| Team invoice seat | Team-scoped plan while seat assigned | Personal billing ownership, family-share owner benefits | Highest workspace access for covered team; seat removal revokes only team-derived access; team downgrade never destroys active personal sub |
| Enterprise/support override | Time-bounded correction with reason+approver | Permanent hidden access | Scoped + expiring; cannot mask disputes/fraud indefinitely |
| Stripe web | Personal/account plan | App Store/Google billing mgmt | If coexisting with store purchase, grant highest tier + duplicate-subscription guidance |
| App Store | Apple-owned personal entitlement via original_transaction_id | Google/Stripe billing mgmt | Grant until Apple expiration/revoke; family-shared lower precedence than owner |
| Google Play | Google-owned personal via purchaseToken lineage | Apple/Stripe billing mgmt | Grant until Google expiry/revoke; replacements follow linked token lineage |
| Family sharing | Shared access per store+product policy | Billing mgmt, admin/owner-only benefits | Lowest eligible paid tier unless personal/team active; revocation removes only shared access |
| Free/default | Baseline | Paid features | Used only when no other active source |

Conflict rules: never cancel/refund one channel because another is active; show duplicate-subscription guidance. Refund/chargeback/revocation/seat removal affects only its source unless policy escalates to account-level fraud review. Restore that finds already-linked txn routes to manual_review, never auto-transfer.

Audit events (required fields: actor, source_channel, source_object_id, prev_state, next_state, provider_effective_at, received_at, idempotency_key, correlation_id, user_message_key, support_reason):
- provider_event_received, receipt_validation_succeeded/failed
- subscription_created, trial_started, renewal_succeeded, renewal_failed
- grace_started, grace_ended
- subscription_canceled, subscription_paused, subscription_resumed
- plan_changed, refund_detected, chargeback_opened, chargeback_resolved
- team_seat_assigned, team_seat_removed
- family_share_detected, family_share_revoked
- offline_entitlement_issued, offline_entitlement_expired
- entitlement_recomputed/granted/limited/revoked
- restore_purchase_started/completed/blocked/not_found
- support_adjustment_requested/applied/expired
- reconciliation_started, reconciliation_corrected_state

Paused/restored/offline extras: pause_effective_at, resume_effective_at, restore_request_id, original_transaction_id, purchase_token_lineage, offline_snapshot_id, offline_scope, last_verified_at, offline_ttl_expires_at, reconciliation_result.

Risks and fixes:
- entitlement-1 Risk: ID collision across stores -> Fix: separate product_id, subscription_id, entitlement_id, user/account/team IDs.
- entitlement-3 Risk: cancel treated as refund -> Fix: distinct commerce states; refund reverses money only.
- entitlement-4 Risk: grace applied to refunded users -> Fix: gate grace on renewal_failure/payment_recovery.
- entitlement-6/14 Risk: restore duplicates grant -> Fix: reconcile by original_transaction_id/purchaseToken lineage before granting.
- entitlement-11 Risk: team downgrade kills personal sub -> Fix: team changes only revoke team-derived access.
- entitlement-12 Risk: late/duplicate/out-of-order webhooks -> Fix: dedupe by (provider, provider_event_id), store provider_effective_at, recompute from ordered ledger.
- entitlement-13 Risk: pause collapsed with cancel -> Fix: explicit paused state with effective dates + access policy.
- entitlement-15 Risk: offline grant abused for new purchase -> Fix: signed snapshot, scoped features, ttl, mandatory online reconcile before extension.
- entitlement-9 Risk: trial abuse -> Fix: eligibility checks, abuse signals, clear cancellation disclosure.

Support/readiness checks:
- Support view shows provider event, ledger event, derived entitlement, effective time, user-facing message.
- Reproducible entitlement from ledger history (entitlement-10).
- Recompute job emits correction_event, never silent edits.
- Duplicate-subscription detector across Stripe/App Store/Google Play with explicit guidance copy.
- Family-share grant is read-only/lower-tier; revocation test removes only shared access.
- Pause/resume preserves paid window then degrades to read-only.
- Offline snapshot rejects purchase/upgrade/export-sensitive actions.
- Restore on already-linked transaction routes to manual_review, never auto-transfers account.
- Refund/revocation never cascades across channels without fraud escalation.
- Grace period copy + recovery path tested for failed renewal on each provider.
```
