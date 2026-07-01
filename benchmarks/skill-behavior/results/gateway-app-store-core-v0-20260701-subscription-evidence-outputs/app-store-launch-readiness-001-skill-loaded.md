```text
Channels:
- iOS App Store, Google Play (subscription product)

Product type:
- Cross-platform subscription app (mobile, recurring billing + entitlement-gated features)

Readiness matrix:
- Apple — Sandbox product IDs in subscription group, StoreKit 2 transaction queue + App Store Server Notifications (v2), paywall identical to review notes, restore path, refund/revoke via server ledger, soft rollout 1→2→5→10→25→50→100%, App Privacy labels match SDK list, in-context push ask post-value moment, support URL + subscription FAQ + reviewer steps attached.
- Google — Base plan + introductory offer created, Play Billing Library v8+, Real-time Developer Notifications (Pub/Sub) + Play Developer API acknowledgment within 3 days, alt billing disclosure if applicable, Restore/Resync on app entry, refund/revoke webhook reconciles server ledger, Data Safety answers truth-matched, internal→closed→production tracks staged, soft 1→5→10→20→50→100%.

OS/platform details:
- dist-os-1: push prompt only after first content view or unlock gate.
- dist-os-2: notification channels grouped per purpose; quiet hours in settings.
- dist-os-5: backup excludes purchase tokens; restore rehydrates from server ledger.
- dist-store-7: identical disclosure strings across paywall, store metadata, screenshots, onboarding, support page, reviewer notes.
- dist-store-8: server ledger is authoritative; client cache only UI hint.

Subscription and entitlement evidence:
- Paywall disclosure parity -> Owner: Growth. Proof: screenshots per locale + build # + l10n owner sheet.
- Store metadata parity (App Store Connect / Play Console) -> Owner: Store ops. Proof: ASC/Console screenshots + product IDs + base plan IDs.
- Sandbox product IDs (iOS Sandbox Tester; Play license tester) -> Owner: Commerce Eng. Proof: StoreKit config + license test account doc.
- Restore/Resync path -> Owner: Mobile Eng. Proof: test plan + transaction/purchase-token idempotency log.
- Refund/revoke event handler (App Store Server Notifications + RTDN) -> Owner: Backend. Proof: webhook receiver logs + ledger mutations + reason/source field.
- Server entitlement ledger (transaction/order ID, original transaction/token, product/base plan, state, source event, processed_at, idempotency key) -> Owner: Backend. Proof: schema + runbook + reconciliation report.
- Cancellation/expiration probe (user_canceled → active_until_period_end → expired) -> Owner: QA. Proof: synthetic-event test report.
- Server-truth drift alert + safe degradation copy -> Owner: SRE. Proof: alert config + incident draft.
- Subscription disclosure parity review (price, period, trial, renewal, cancel, restore, support/refund) -> Owner: Compliance. Proof: parity diff doc.

Review package:
- Apple: TestFlight build + external tester note; sandbox Apple ID; subscription group/product IDs; paywall/restore/refund/cancel steps with screenshots; App Privacy labels; ATT rationale; push-permission timing screenshots; support + privacy URLs; reviewer steps doc with named owners.
- Google: Internal+closed track build; license tester account; base plan/offer IDs; PBL version; acknowledge path; Restore/Resync steps; Data Safety form; permission declarations; pre-launch report triage; push runtime permission screenshots; support + privacy URLs.

Launch blockers:
- Disclosure mismatch between paywall and store metadata -> Owner: Compliance.
- Refund/revoke handler not idempotent or missing source/reason -> Owner: Backend.
- Restore creating duplicate entitlement -> Owner: Mobile Eng.
- App Privacy / Data Safety stale vs SDK list -> Owner: Privacy Lead.
- Push prompt before value moment -> Owner: Product.
- Support URL, refund macro, or reviewer test account unusable -> Owner: Support Ops.
- Missing staged-rollout dashboard (crash-free, purchase success, restore success, refund latency, push opt-in) -> Owner: SRE.

Staged rollout gates (block advance if red):
- crash-free sessions ≥ agreed threshold
- purchase success + acknowledge/validation within 3d ≤ spike threshold
- restore success ≥ target, zero duplicate entitlements
- refund/revoke reflected in ledger ≤ SLA
- App Privacy / Data Safety parity green
- push ask after demonstrated value moment, with opt-in/denial metrics
- support volume within threshold, refund macro published
- entitlement-drift alert resolved
```
