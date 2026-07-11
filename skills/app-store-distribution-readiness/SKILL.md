---
name: app-store-distribution-readiness
description: Prepare and audit apps and games for exact-artifact distribution evidence across Apple App Store, Google Play, HTML5/PWA/web, Huawei AppGallery, Samsung Galaxy Store, Amazon Appstore, Microsoft/direct desktop, Steam/PC stores, Xbox, PlayStation, Nintendo Switch, and other current channels. Use when an already-designed product needs channel eligibility, package/signing/provenance, metadata/assets, privacy/commerce declarations, testing, submission/reviewer/certification evidence, staged rollout, halt/recovery, or live store readback. Do not use for whole-product design, marketing strategy, listing conversion alone, or a cross-domain product program.
---

# App Store Distribution Readiness

Turn an exact product artifact into a channel-specific, review/certification-ready, support-ready release evidence pack. Architecture readiness, upload, processing, external review, approval, release, and live readback are distinct states.

## Workflow

1. Identify product format, territories/audiences, target channels, exact source commit/build/artifact digest, signing/provenance, partner/account authority, and release target.
2. Read `references/distribution-channel-matrix.md` and live-retrieve current official requirements for every target.
3. Build a channel capability/evidence matrix: API versus portal/partner-only states, first-submission gates, package/signing/certification, metadata/assets/locales, privacy/permissions, commerce/refunds, testing, review notes, staged rollout, halt/recovery, support, and live probes.
4. Use one immutable release intent with per-channel state machines; promote the exact tested artifact and preserve upload, processing, review/certification, release, and readback receipts.
5. Verify OS/runtime integration: notifications, startup, input, file/deep links, PWA/service worker, update/minimum version, background/offline, storage/migration, uninstall/delete, platform services, accessibility, localization and low-end quality.
6. For paid products, map disclosures, purchase/restore/refund/revoke/chargeback states, server/ledger entitlement truth, test products, reviewer evidence, and support ownership.
7. Produce blockers by exact dependency, failed proof, external authority pending, or policy floor; assign the next machine action and required live readback.

## Agent-first release rule

Build and automate every applicable channel adapter, evidence generator, policy-refresh path, localized asset transform, submission step, poller, rollout gate, halt/recovery action, and live probe now. Human effort, unknown demand, or speculative ROI may not defer the release capability.

External partner access, contracts, review, certification, protected signing, law, safety and physical hardware are real authority gates. Agents may prepare, submit, poll, reconcile, respond with verified evidence, halt and recover; they cannot fabricate approval or bypass a platform owner.

## Composition contract

Begin the evidence pack with an envelope conforming to [`references/product-artifact-envelope.schema.json`](references/product-artifact-envelope.schema.json). Consume the exact product/release, commerce, privacy, localization and asset artifacts by ID/version/digest; emit channel evidence and observed-state artifacts the Product Program Manifest can reference without copying live store facts.

## When not to use

- Use `product-lifecycle-architect` when the primary artifact is a cross-domain product-program dependency and delivery graph spanning at least three domains.
- Use `store-listing-optimization` when the artifact is listing positioning, metadata, creative order, keywords/tags, and conversion experiments.
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

## Output format

```text
Channels / territories / audience modes:
Product type and exact artifact / provenance:
Artifact envelope / input artifact IDs and digests:

Channel evidence matrix:
- <channel> -> authority, package/signing, metadata/assets, privacy/commerce,
  testing, review/certification, rollout/recovery, live readback

OS/runtime integration evidence:
- <integration> -> requirement, exact proof, blocker

Paid product/entitlement evidence:
- <item> -> canonical owner, proof artifact, live probe

Submission and certification packages:
- <channel> -> state, receipt, external gate, next machine action

Launch blockers:
- <blocker> -> exact dependency | failed proof | external pending | policy floor,
  owner, recovery, evidence
```
