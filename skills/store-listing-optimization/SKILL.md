---
name: store-listing-optimization
description: "Design or audit one channel listing and creative-conversion artifact for App Store, Google Play, Steam, console/PC stores, Microsoft Store, browser extensions, or direct download: positioning, title/subtitle/description, screenshots, capsule/icon/key art, trailer, proof, pricing/disclosures, privacy/compatibility claims, localization, accessibility, experiments, review/reputation context, and exact asset QA. Use for listing conversion; use Distribution Readiness for submission/certification and Marketing Automation for the full channel portfolio."
---

# Store Listing Optimization

Produce a **Channel Listing and Creative Sequence** that communicates truthful
value before install, wishlist, trial, or purchase and can be generated,
localized, tested, and updated across exact channel variants.

## Atomic boundary

Own one channel listing's positioning-to-asset narrative, metadata, creative
sequence, proof/disclosures, localization, accessibility, asset QA, experiment,
and conversion/trust measurement. Do not own store submission/certification,
whole-product positioning, public review solicitation, paid acquisition, or the
multi-channel creative/spend control plane.

For every artifact, record `artifactVersion`, `artifactRevision`, and
`artifactState`; never put `artifactDigest` on the top-level artifact. Use the
[shared artifact envelope](references/product-artifact-envelope.schema.json)
for structured drafts and sealed artifacts. Consume product thesis, canonical
product/build truth, a planning Product Program Manifest revision when present,
and only the Marketing, pricing/payment, review/reputation, analytics, Product
Asset, or distribution facts applicable to that exact revision. The initial
request revision must not consume its future Product Asset pack; a later final
listing revision may. A sealed input additionally requires `artifactDigest` and
`digestRule: sha256-exact-bytes`; every typed input requires
`fulfillsHandoffId`, while a draft contains no digest fields.

## Agent-first invariant

Build the complete listing narrative, selection/order, metadata, channel
templates, asset requests, experiment variants, validation, versioning,
rollback, and readback now. Marketing owns campaign briefs/concepts;
`product-asset-production` owns deterministic capture, localized/accessibility
variants, exact rendered files, rights/provenance, and file QA. This skill emits
an asset request in an earlier revision and consumes the returned pack only in a
later exact revision; it must not create a second production source of truth.
Construction is separate from publication. A dormant channel generates no
public page and claims no compatibility until authority and the exact pack pass.

## Workflow

1. Define exact product/build/content identity, channel/territories/locales,
   primary audience and job, positioning promise, conversion event, price/model,
   device/input/age modes, current listing evidence, and non-goals.
2. Read `references/store-listing-optimization-patterns.md`. Retrieve the
   channel's current metadata, asset, content-rating, pricing/disclosure,
   experiment, and localization contract.
3. Map audience objections and proof to a narrative sequence: distinctive
   outcome/mechanism, first-value/core interaction, depth/progression or
   workflow, social/collaboration where real, content/utility, trust/quality,
   business model/compatibility, and call to action.
4. Specify title/subtitle/short/long text, keywords/tags/categories, icon/key/
   capsule art, selection/order and stable production requests for screenshots
   by device/input, video/trailer, captions/transcript,
   alt text, pricing/IAP/subscription/ad disclosures, privacy/compatibility, and
   support links. Every claim maps to exact shipped behavior.
5. Build localization briefs per locale: intent, search language, cultural
   meaning, reading direction, typography, image/text constraints, age modes,
   price/unit/date, and native QA. Do not reuse one translated screenshot set.
6. When exact media is selected, consume the Product Asset Production Pack in a
   new listing revision; validate dimensions, safe zones, compression/color/
   audio, device chrome, legibility, motion/captions, no unreleased UI, rights,
   claim evidence, channel rules, and exact package digests.
7. Define randomized/native experiment where supported, immutable variant and
   traffic identity, exposure/contamination, install/wishlist/purchase plus
   retention/refund/review/support countermetrics, confidence, and stop rules.
8. When publication is selected, hand the exact final listing revision and
   accepted asset pack when applicable to `software-distribution-readiness`;
   verify submitted/live metadata and assets, then archive/supersede the prior
   version.

## Source verification

Retrieve current channel metadata/asset/experiment, ratings/reviews, price/IAP/
subscription/ad disclosures, privacy/data-safety, age/content rating,
compatibility, accessibility, localization, IP/rights, and regional rules.
Unknown/stale channel authority blocks submission of that adapter.

## When not to use

- Use `software-distribution-readiness` for eligibility, signing, submission,
  reviewer/certification, staged rollout, withdrawal, and live channel evidence.
- Use `marketing-automation-blueprint` for the whole SEO/creator/community/
  lifecycle/paid creative portfolio, spend, attribution, and shutdown.
- Use `product-asset-production` to create deterministic captures, rendered
  screenshots/art/video, localized/accessibility variants, and the exact media
  pack requested by this listing.
- Use `market-research-synthesis` when product positioning and audience demand
  are not yet evidence-bounded across the market.
- Use `review-solicitation-policy` for public rating/review request eligibility
  and `product-feedback-learning-loop` for private feedback, authorized review
  ingestion/responses, support routing, and product close-loop.

## Guardrails

- Never show unreleased/nonexistent UI, fake rankings/reviews/awards, hidden
  prices/renewal/ads, misleading gameplay, unsupported devices, or privacy/
  accessibility claims without exact evidence.
- Search optimization cannot reduce human clarity or stuff irrelevant terms,
  competitor marks, or deceptive claims.
- Do not sentiment-gate, incentivize, fabricate, filter, or steer ratings; review
  context is observed evidence, not listing manipulation authority.
- Separate creative conversion from product quality. A higher install rate with
  worse activation, retention, refunds, support, or trust is not a win.
- Autonomous generators cannot publish, change price/claims/rights, or promote
  a variant without exact validation and authority.
- Do not capture, render, localize, or hand-edit product media; request a new
  canonical `product-asset-production` pack revision.

## Output contract

Return one typed Channel Listing and Creative Sequence with:

1. draft identity or sealed envelope, exact product/channel identities, audience/job, positioning, conversion,
   evidence labels, assumptions, and non-goals;
2. objection/proof/narrative sequence and metadata field contract;
3. icon/key/capsule, screenshot/device/input, trailer/video, caption/transcript/
   alt-text, disclosure, compatibility, support selection/order, and stable
   Product Asset Production request plus accepted pack references;
4. per-locale search/meaning/culture/RTL/typography/image/price/date/age brief;
5. channel-authority, rights, claim, dimensions/safe-zone, media, accessibility,
   and exact-package QA evidence;
6. experiment variants, assignment, metrics/countermetrics, confidence, stop,
   rollback, and live readback;
7. digest-pinned distribution/marketing/review/analytics handoffs.

Complete only when every live claim/asset is exact-build truthful, localized and
accessible, the package is reproducible by digest, and conversion gains survive
downstream quality/trust countermetrics.
