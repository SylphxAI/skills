---
name: app-store-distribution-readiness
description: Prepare or audit exact-artifact release evidence and release communication for selected app, game, web, desktop, PC-store, or console distribution channels. Use when an already-designed product needs channel eligibility, package/signing, declarations, desktop or PC-store release proof, testing, submission or certification, changelog or release-note variants, rollout, withdrawal, and live readback. Do not use for whole-product design, listing conversion strategy, asset creation, or a cross-domain launch verdict.
---

# App Store Distribution Readiness

Turn an exact product artifact into a channel-specific, review/certification-ready, support-ready release evidence pack. Architecture readiness, upload, processing, external review, approval, release, and live readback are distinct states.

## Resource guide

- Read `references/distribution-channel-matrix.md` for the common channel state
  machine, mobile/alternative-store/console/web routes, commerce evidence, and
  live-readback floor.
- Read `references/desktop-and-pc-release-readiness.md` when macOS, Windows,
  Microsoft Store, Steam, or another PC storefront is selected.
- Read `references/release-communication.md` when the exact release requires a
  public changelog, store update note, developer migration notice, game patch
  note, support brief, or incident follow-up.

Load only the selected channel and communication modules. Current official
requirements remain execution-time authority.

## Workflow

1. Consume an immutable Product Program Manifest planning revision or an
   equivalent owner-approved release target, then identify product format,
   territories/audiences, target channels, exact source
   commit/build/artifact digest, signing/provenance, and partner/account
   authority.
2. Read the applicable references above and retrieve current official
   requirements only for the selected channels, territories, product type, and
   release action.
3. Build a channel capability/evidence matrix: API versus portal/partner-only states, first-submission gates, package/signing/certification, metadata/assets/locales, privacy/permissions, commerce/refunds, testing, review notes, staged rollout, halt/recovery, support, and live probes.
4. Use the exact release target and stable handoff IDs from that selected input
   with per-channel state machines; promote the exact tested artifact and
   preserve upload, processing, review/certification, release, and readback
   receipts.
5. Verify only OS/runtime integrations required by those channels and the
   declared product behavior; route unresolved product design back to its owner.
6. For paid products, map disclosures, purchase/restore/refund/revoke/chargeback states, server/ledger entitlement truth, test products, reviewer evidence, and support ownership.
7. Produce blockers by exact dependency, failed proof, external authority pending, or policy floor; assign the next machine action and required live readback.
8. When release communication is selected, bind every note variant to the exact
   shipped change, audience, compatibility/support action, locale, destination,
   approval, publication identity, and correction or supersession path.

External partner access, contracts, review, certification, protected signing,
law, safety, and physical hardware remain authority gates. Prepare and verify
what the selected release requires; never fabricate approval or require adapters
for channels outside the request.

## Composition contract

Use the shared product artifact envelope when composing with repository product
artifacts. Consume the exact owner-approved release target and product/build,
plus only the commerce, privacy, localization, listing, Product Asset, and other
upstream artifacts required by the selected product and channels. A free or
direct release must not fabricate commerce, listing, or media dependencies.
This skill verifies applicable selected-channel release use and does not
recreate upstream facts. A later observed-state manifest revision may index
this Distribution Evidence Pack. This pack must never consume that later
revision or a moving “latest manifest” alias.

## When not to use

- Use `product-lifecycle-architect` when the primary artifact is a cross-domain product-program dependency and delivery graph spanning at least three domains.
- Use `store-listing-optimization` when the artifact is listing positioning,
  metadata, creative order, keywords/tags, asset requirements, and conversion
  experiments.
- Use app/game design for platform experience semantics and `launch-readiness-review` for an independent whole-launch verdict.

## Guardrails

- Do not claim a channel ready without current authority, exact artifact, signing/provenance, required hardware/certification, submission state, and live evidence.
- Do not hardcode volatile API versions, quotas, fees, review SLAs, asset dimensions, locale/territory lists, regional billing exceptions, SDK disclosure lists, or certification rules.
- Do not expose raw signing keys to general agents, rebuild after validation, or call upload/review submission a live release.
- Do not submit paid products without exact price, duration, renewal, trial, cancellation, restore, refund/support, and entitlement semantics matched across product, store, assets, reviewer notes, and support.
- Do not treat client state as durable entitlement truth or collapse cancellation, refund, chargeback and revocation.
- Do not roll out broadly until crash/hang/startup, purchase/restore/refund, entitlement drift, privacy/SDK, support, accessibility/localization, and platform-specific quality signals are readable.
- Do not assume mobile requirements apply unchanged to HTML5, desktop, Steam, or consoles; do not call one responsive layout platform adaptation.
- Do not treat store approval as final proof; verify listing/build/version/territory/price availability and product runtime after release.
- Do not create marketing assets, choose positioning, or redesign the product to
  make a channel matrix appear complete; record the owning handoff.

## Output format

```text
Channels / territories / audience modes:
Product type and exact artifact / provenance:
Artifact envelope / planning manifest revision / stable handoff IDs:
Other exact input artifact IDs and digests:

Channel evidence matrix:
- <channel> -> authority, package/signing, metadata/assets, privacy/commerce,
  testing, review/certification, rollout/recovery, live readback

OS/runtime integration evidence:
- <integration> -> requirement, exact proof, blocker

Paid product/entitlement evidence:
- <item> -> canonical owner, proof artifact, live probe

Submission and certification packages:
- <channel> -> state, receipt, external gate, next machine action

Release communication pack when selected:
- <audience/channel> -> exact change, user impact, action/compatibility,
  support route, locale, publication/readback

Launch blockers:
- <blocker> -> exact dependency | failed proof | external pending | policy floor,
  owner, recovery, evidence
```
