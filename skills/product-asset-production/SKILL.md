---
name: product-asset-production
description: "Create or audit one exact, localized, accessible, rights-safe Product Asset Production Pack for apps and games: deterministic product captures, screenshots, icons/key/capsule art, feature graphics, trailers, demos, short/long video, captions, audio description, alt text, and store, website, YouTube, X, social, PC, console, mobile, and HTML5 variants. Use when approved product truth and Marketing or Store Listing briefs must become finished media files with provenance and QA. Marketing owns message and campaign briefs; Store Listing owns narrative, selection, order, and metadata; Distribution owns upload, certification, release, and live evidence."
---

# Product Asset Production

Turn approved product truth and channel briefs into one reproducible **Product
Asset Production Pack**. Own the finished media and production evidence, not
the product claim, campaign strategy, listing narrative, or publication state.

## Atomic boundary

This skill owns capture direction, source scenes, asset creation, rendering,
localization, accessibility variants, technical adaptation, file identity,
rights/provenance, and exact-file QA for a declared asset set.

It consumes:

- exact App/Game product and build truth;
- a stable local request/artifact identity for every job; when another typed
  artifact requested the work, its exact producer handoff ID and, for an
  orchestrated product program, the immutable planning Manifest revision;
- for production, the approved Marketing creative brief, Store Listing asset
  request, or both, according to the selected destinations; for audit, the
  exact existing file/pack set and its available owning brief or request;
- brand, locale, accessibility, age, territory, rights, and disclosure rules.

It returns finished files plus one independently acceptable production pack.
Marketing owns audience, message, campaign concept, and variant hypothesis.
Store Listing owns listing narrative, asset selection/order, and metadata.
Distribution owns upload, processing, submission, certification, rollout, and
live readback. A later observed-state Product Program Manifest revision indexes
the exact sibling artifacts; this skill never consumes that later revision.

Use the [shared product artifact envelope](references/product-artifact-envelope.schema.json)
for top-level identity, inputs, handoffs, assumptions, and proof. Every typed
artifact input names the exact producer contract through `fulfillsHandoffId`;
a standalone request need not invent an upstream artifact edge. The pack never
self-hashes; only sealed inputs and exact child files carry reproducible digests.

```text
App/Game truth + stable local request [+ producer handoff and planning Manifest N]
+ selected Marketing and/or Listing brief/request
-> Product Asset Production Pack
-> selected Marketing campaign and/or final Listing revision
-> Distribution evidence when release is selected
-> observed-state Manifest revision N+1 when orchestrated
```

If a downstream review requests a change, issue a new brief or pack revision.
Never create a same-revision back-reference.

## Agent-first invariant

For every selected product, locale, audience mode, platform, channel, device,
input, aspect ratio, accessibility mode, and campaign/listing family, define and
produce the complete scale-ready asset target now. Human staffing, rendering
volume, localization volume, absent users, uncertain demand, or speculative ROI
cannot defer selected variants, automation, provenance, accessibility, or QA.

Selection still matters. Do not generate irrelevant channels or formats merely
because production is cheap. A dormant target creates no upload, public claim,
tracking, rights exposure, or publication state. External rights, talent,
partner access, platform approval, physical capture, and current policy remain
real authority gates; agents must not fabricate them.

## Resource guide

Read `references/product-asset-production-patterns.md` for the input record,
production state machine, asset-family matrix, deterministic capture method,
localization/accessibility/rights controls, QA matrix, automation loop, and
current-authority routes.

## Workflow

1. Freeze the production or audit request: stable local request/artifact ID,
   consumed producer handoff ID only when supplied by a typed upstream
   artifact, planning manifest when present, artifact revisions, exact build or product
   state, selected channels/locales/audience modes, intended placement, claims,
   asset families, variants, acceptance tests, deadlines, and non-goals.
2. Retrieve current official format, dimension, duration, codec, file-size,
   safe-zone, disclosure, synthetic-media, age, localization, and accessibility
   requirements for only the selected destinations. Record source and expiry.
3. Build the source plan: deterministic fixture account, seed/save, scene,
   device/input, camera, UI state, consent-safe data, product tier, performance
   mode, capture script, reshoot conditions, and prohibited/unreleased states.
4. Create master sources at sufficient quality for all declared derivatives.
   Keep product capture, generated illustration, key art, typography, music,
   voice, talent, UGC, and third-party material separately attributable.
5. For production, create each selected locale/channel/accessibility variant
   from the canonical source and applicable approved brief/request. Adapt
   composition and meaning; do not merely crop, stretch, translate pixels, or
   reuse one screenshot sequence everywhere. For audit, preserve input bytes
   and record corrections as a new candidate revision.
6. Validate claim truth, exact-build fidelity, rights, consent/PII/secrets,
   cultural and age fit, text/RTL/glyph rendering, captions/transcript/audio
   description/alt text, safe zones, color/audio/video quality, and file specs.
7. Bind every finished file to its source, transformation, tool/model/version,
   locale, channel, proof-backed claim, rights record, QA result, exact byte
   digest, supersession, and expiry. The top-level pack never self-hashes.
8. Hand exact files and evidence only to the selected downstream owners:
   Marketing, Store Listing, Distribution, and the Product Program Manifest
   index as applicable. They may select, publish, submit, index, or reject;
   they may not silently edit a derivative or create a competing capture source
   of truth. An audit-only request may end with the revised pack and findings.

## Evidence and state

Separate `planned`, `source-ready`, `captured-or-created`, `transformed`,
`validated`, `accepted`, `uploaded`, and `live-readback`. This skill can prove
only through `accepted`; upload and live state belong to downstream owners.

A concept board, generated mockup, interim stand-in, simulator frame, or asset plan
is not an exact product capture. Label it and keep it out of truth-claiming
screenshots or footage until the exact product state exists.

## Hard gates

Reject or redesign a pack that:

- invents or exaggerates product behavior, UI, gameplay, awards, reviews,
  rankings, prices, compatibility, accessibility, performance, or availability;
- starts production from a circular, missing, expired, or unowned brief;
- copies Marketing message ownership, Store Listing selection/metadata, Product
  Lifecycle orchestration, or Distribution publication evidence;
- defers selected localization, accessibility, channel adaptation, rights,
  provenance, technical QA, or automation because of conventional human cost;
- treats one crop, literal translation, aspect ratio, device frame, input mode,
  or visual hierarchy as universal;
- exposes personal data, secrets, internal tooling, debug state, third-party
  content without rights, undisclosed synthetic media, or unapproved talent;
- produces captions that omit meaningful audio, alt text that repeats marketing
  copy, illegible mobile text, unsafe flashes, clipped UI, or inaccessible
  contrast merely to preserve the master composition;
- lets a model or generator approve its own claim truth, rights, cultural fit,
  or final exact-file QA;
- hardcodes volatile platform specifications as timeless facts;
- claims uploaded, approved, released, live, or conversion-proven from local
  files, generated manifests, or self-reported status.

## Output contract

Return one **Product Asset Production Pack** containing:

1. artifact ID/version/revision/state, evidence labels, consumed input refs,
   scope, selected destinations, non-goals, and unresolved authority;
2. production brief reconciliation and claim/proof map;
3. canonical source/capture manifest with exact build/state/seed/device/input;
4. asset-family and locale/channel/accessibility coverage matrix;
5. finished-file inventory with purpose, source lineage, transform recipe,
   dimensions/duration/codec/color/audio, locale, rights, and byte digest;
6. captions, transcript, audio description, alt text, thumbnails, disclosures,
   and reduced-motion or other accessibility variants where applicable;
7. technical, visual, localization, accessibility, rights, privacy, claim, and
   cross-file consistency QA evidence with rejected candidates;
8. deterministic regeneration, cache, concurrency, failure, reshoot,
   supersession, retention, and rollback rules;
9. exact handoff manifests for only the selected Marketing, Store Listing,
   Distribution, and downstream Product Program Manifest consumers; omit
   inapplicable consumers rather than creating empty obligations.

Use `artifactDigest` only on exact child files or sealed input references with
`digestRule: sha256-exact-bytes`; never invent a top-level self-digest.

## Routing boundaries

- `marketing-automation-blueprint` owns channel strategy, message, campaign
  concepts, creative briefs, spend, publication policy, and performance loop.
- `store-listing-optimization` owns listing narrative, metadata, asset request,
  final selection/order, disclosures, and conversion experiment.
- `app-store-distribution-readiness` owns upload/submission, certification,
  rollout, withdrawal, and observed channel evidence.
- `product-lifecycle-architect` owns planning and observed-state revisions of
  the cross-domain dependency graph and composition index, not this pack.
- `interface-craft` owns product-interface implementation and polish, not
  promotional capture or media production.

Complete only when the selected pack can be reproduced from owned sources,
every exact file passes its destination and audience checks, unresolved facts
remain explicit, and the selected downstream or audit owner can accept or
reject it without reopening product, campaign, or listing strategy.
