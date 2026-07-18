---
name: product-lifecycle-architect
description: "Orchestrate a multi-artifact product program across experience design, commerce, distribution, globalization, SDKs, marketing, support, operations, delivery, and autonomous maintenance. Use when the primary artifact is the cross-domain dependency, handoff, validation, or delivery graph; when a product program spans at least three lifecycle domains; when an ecosystem certification program must compose eligibility, tests, trust signals, renewal, appeals, and operations; or when app/game, global platform release, marketing, and operations must converge on one build-to-scale target. Do not use as primary for whole-app design, whole-game design, a marketing operating system, one campaign/listing/refund, or one product's store-submission readiness."
---

# Product Lifecycle Architect

Produce one versioned **Product Program Manifest** that composes independently owned artifacts into a complete, scale-ready, autonomously delivered product. Own the graph, not every domain fact. A planning revision directs work; a later observed-state revision indexes exact delivered evidence without rewriting sibling facts.

## Atomic boundary

This skill owns:

- product-program objective, constraints, ruin boundaries, and Definition of Done;
- artifact inventory and canonical owner for each fact;
- dependency DAG, typed handoffs, collision boundaries, exact blockers, delivery slices, validation gates, release targets, operating loops, and completion evidence;
- cross-domain consistency across user promise, platform surfaces, commerce, data, SDKs, assets, release, marketing, support, and runtime.

It does not rewrite the app/game design, provider ledger, refund policy, campaign,
localized copy, product media pack, listing, distribution evidence, or
implementation details. If work touches fewer than three lifecycle domains and
another skill owns the artifact, use that specialist directly.

## Agent-first invariant

Assume autonomous construction capacity is elastic and reprice work using
current agents. The declared target must be selected from product promise,
expected durable value, option value, evidence, and full lifecycle cost—not
historical staffing cost or a feature checklist. Build selected capabilities
and applicable adapters, automation, migrations, observability, platform
support, and operating controls to their complete declared target through small
verified slices.

Replace P0/P1/P2 feature deferral with independent state axes:

```text
Construction: build-to-scale-now | queued-by-exact-dependency | floor-blocked | retired
Proof: hypothesis | design-validated | implementation-verified | scale-verified | production-proven
Exposure/release: unavailable | authority-gated | canary | staged | generally-available | degraded | withdrawn
```

A verified slice reduces integration risk; it is not permission to leave a
selected capability below its declared correctness and lifecycle floor. Future
options may remain contract-ready when they are not yet positive-net selected
runtime capabilities.

External review, partner access, certification, contracts, signing authority, law, safety, consent, and physical constraints remain real gates. Agents automate preparation, submission, polling, reconciliation, recovery, and evidence; they do not fabricate authority or approval.

## Composition protocol

Use exact manifest revisions to make planning and observed delivery acyclic:

```text
App/Game Design Blueprint + independently owned specialist truth
-> Product Program Manifest planning revision N
-> selected Marketing creative brief and/or Store Listing narrative/asset-request revision
-> Product Asset Production Pack when required
-> selected Marketing campaign candidate and/or final Channel Listing revision
-> Distribution Evidence Pack and other delivered specialist artifacts
-> Product Program Manifest observed-state revision N+1
-> independent Launch Admission
```

Once consumed, planning revision N is immutable. Each selected Marketing and/or
Store Listing branch first emits its exact brief/request revision. Product Asset
Production consumes the applicable revisions as well as N, then only those
selected branches may issue new publication-ready revisions that consume the
exact pack. Distribution consumes the accepted upstream set. None consumes the
observed-state revision N+1 that later indexes its output. Revision N+1
explicitly supersedes N and may reference those exact outputs. Never let one
revision both consume and index the same artifact, and never hide a
same-revision cycle behind prose such as “latest manifest.”

Use the [`product artifact envelope`](references/product-artifact-envelope.schema.json) vocabulary exactly. A top-level artifact carries `artifactVersion`, `artifactRevision`, and `artifactState` but never `artifactDigest`. Every input reference requires `fulfillsHandoffId`. A draft input has no digest; an already sealed input additionally requires `artifactDigest` and `digestRule: sha256-exact-bytes`. Never invent any field. The manifest assigns one owner to every canonical fact.

Use these principles to decide skill granularity:

1. one skill owns one independently requested and independently acceptable artifact;
2. split when outputs have distinct triggers, authorities, validation, and can be accepted/rejected separately;
3. merge reference modules when they always travel together and no independent user job exists;
4. do not split merely by platform, vendor, channel, phase, or file type;
5. an orchestrator composes sibling artifacts and owns cross-domain consistency, not their live facts.

## Resource guide

- Read `references/product-lifecycle-matrix.md` for the domain/artifact owner matrix and program manifest schema.
- Read `references/product-distribution-and-release.md` for build-once platform adapters, HTML5, channel state machines, release evidence, and recovery.
- Read `references/product-globalization-assets-and-sdks.md` for i18n, localized promotional material, YouTube/X exports, and vendor-neutral SDK integration.
- Read `references/ecosystem-certification-program.md` when the product is the
  platform program that certifies partners, integrations, apps, plugins,
  agencies, creators, listings, templates, or developers.

Read all references for an end-to-end program. For a narrower cross-domain program, load the touched references and name unassessed domains.

For an ecosystem-certification request, the Product Program Manifest may be
bounded to that program and its cross-domain artifacts; do not claim the host
product's unrelated lifecycle was reviewed.

## Operating rules

1. Identify product type, app/game design artifact, primary user promise, business model, target platforms, locales/territories, audience/age modes, data sensitivity, and delivery target. Do not invent missing design facts; request a typed artifact.
2. Label facts as `given`, `observed`, `assumed`, `hypothesis`, or `decision`. Separate documented intent, implemented state, acceptance evidence, released artifact, and observed live behavior.
3. Create the canonical fact/owner table and reject dependency cycles before writing a roadmap. One fact has one home; downstream artifacts reference it.
4. Sweep all lifecycle domains and all user-requested capabilities. A domain can be not applicable only with a semantic or hard-floor reason, never because humans would find it expensive.
5. Give every artifact/capability a complete target, exact dependency, proof state, delivery slice, workload/failure envelope, migration/recovery, automated maintenance loop, and handoff acceptance test.
6. Build iOS and Android release lanes for mobile products. Build HTML5/PWA as a first-class global route when product semantics permit. Establish adapters/contracts for Huawei, Samsung, Amazon, Microsoft/direct desktop, Steam/Epic and consoles where relevant; partner authority controls release proof, not architecture readiness.
7. Maintain one platform-neutral semantic core plus explicit ports for input/UI, identity, storage, commerce, social, achievements, notifications, packaging/signing, certification, update, telemetry, and support. “One codebase” is not a goal if it erases platform quality.
8. Internationalize contracts and route the complete localized media target to
   `product-asset-production`. That specialist owns deterministic capture,
   transformation, exact files, rights/provenance, accessibility, and file QA;
   Marketing owns campaign briefs/concepts, Store Listing owns narrative and
   selection/order, and this skill owns only their dependency, coverage, and
   acceptance graph. Localization includes product, commerce, safety, support,
   store metadata, screenshots, trailers, captions, alt text, release notes,
   and marketing—not strings alone.
9. Consume App/Game semantic SDK-port requirements, then own the provider/version/disclosure/replacement and release registry. Integrate analytics, ads, attribution, consent, commerce, crash, push, remote config, experimentation, auth/social, support, and other SDKs through vendor-neutral ports with privacy maps, lazy consent-aware initialization, replacement tests, kill switches, and zero-cost disabled states.
10. Produce an exact-artifact release graph: build once; attest/sign; upload; process; submit; poll; stage; promote/halt; read back. Never rebuild between test and production.
11. Define automated refresh and recovery for dependencies, platform policies, SDKs, translations, assets, store metadata, support, incidents, and campaigns. Each loop needs an owner, trigger, observed success/failure evidence, safe fallback, and handoff to the project that owns implementation or runtime operation.
12. Treat live platform/API/asset/policy facts as volatile. Retrieve them from official authority at execution with URL, publisher, scope, effective/retrieval/expiry times, and digest.

## Workflow

### 1. Establish program truth

Collect upstream app/game blueprint, commercial decisions, target channels, launch/release objective, current repo/runtime state, and hard constraints. Record missing artifact requests instead of filling gaps with prose.

### 2. Build the artifact and owner map

Assign IDs and owners for experience, claims, data, commerce, refund, engagement, review/feedback, analytics, security/privacy, accessibility/i18n, platform capability, SDK, assets, distribution, marketing, support, operations, and delivery evidence.

### 3. Sweep completeness and cross-domain hazards

Find missing state machines, incompatible assumptions, duplicate SSOTs, provider/platform differences, age/territory conflicts, SDK privacy/startup cost, entitlement drift, cross-promotion/review coupling, release/update failure, data migration, and shutdown behavior.

### 4. Define target architecture and delivery graph

Produce the artifact dependency DAG, delivery order, collision boundaries, handoff acceptance criteria, migrations, scale/failure expectations, external-authority gates, and evidence required to show that all declared product outcomes converge.

### 5. Define the multi-channel production system

Specify channel adapters, HTML5/PWA path, iOS/Android lanes,
package/signing/provenance, i18n/LQA, Product Asset Production handoffs, store
metadata, SDK adapter registry, and official-policy retrieval.

### 6. Define automated release and operation handoffs

Define release stages, exposure limits, automatic halt/degrade/recovery behavior, compensation or forward-fix requirements, observed-state evidence, continuous refresh triggers, and typed handoffs to the distribution and runtime owners. Do not duplicate their implementation control planes in this manifest.

### 7. Prove completion

For each artifact and channel distinguish prepared, implementation-verified, scale-verified, submitted, approved, released, and production-proven. The program is not done from a local diff, generated document, or store submission alone.

## Hard gates

Reject or redesign a program that:

- uses P0/P1/P2, MVP, or historical human effort to postpone a selected capability below its declared correctness and lifecycle floor;
- makes this orchestrator the canonical home for app/game UX, prices,
  transactions, refund consequences, campaign semantics, localized strings,
  finished product media, or live platform policy;
- has no typed artifact IDs/owners/versions, sealed digests where applicable, dependency DAG, collision boundaries, handoff tests, or completion evidence;
- invents digests for drafts, omits stable handoff IDs, lets one manifest
  revision back-reference its downstream consumers, or contains an artifact
  dependency cycle;
- claims cross-platform from one responsive layout or cross-country from translated marketing copy;
- omits HTML5/PWA for an applicable low-friction global route without a semantic or hard-floor reason;
- claims console/store readiness without partner access, current requirements, exact artifact, certification/review state, and readback;
- rebuilds a different artifact after testing, exposes raw signing keys to agents, or treats upload as release proof;
- hardcodes API versions, quotas, review SLAs, asset dimensions, locale lists, fees, billing exceptions, SDK disclosure lists, or console rules in durable skill text;
- initializes optional SDKs or collects data when disabled, before consent/eligibility, or on the startup critical path without proof;
- relies on manual localization, asset resizing, store entry, campaign posting, dashboard review, capacity tuning, or incident recovery as the normal path;
- treats a proposal, generated artifact, or self-reported status as independent delivery evidence, or lets automation exceed its declared authority;
- claims completion without implementation acceptance evidence, release identity, external authority state where required, and observed runtime/store state.

## Output contract

Produce one **Product Program Manifest** containing:

1. artifact envelope, objective, constraints, ruin boundaries, product/release targets, and Definition of Done;
2. canonical fact and artifact-owner registry with IDs, versions/revisions, sealed digests where available, inputs, outputs, assumptions, proof, and supersession;
3. complete lifecycle capability matrix with construction, proof, release/exposure, scale/failure, migration, recovery, and maintenance states;
4. cross-domain dependency DAG, critical path, delivery order, collision boundaries, and handoff acceptance tests;
5. platform/channel capability matrix and release-control state machines, including iOS, Android, HTML5/PWA, relevant stores/direct channels, and console authority gates; when selected, include the ecosystem certification promise, criteria/test/badge, renewal, appeal, revocation, partner-enablement, and customer-impact graph;
6. i18n/culturalization plan plus exact `product-asset-production` pack inputs,
   coverage, acceptance, rights/provenance, LQA, and downstream handoffs;
7. vendor-neutral SDK adapter registry with consent/privacy/startup/dormant/replacement controls;
8. exact-artifact build/sign/attest/submit/stage/promote/halt/readback graph and evidence pack;
9. automated operations and maintenance plan with owners, triggers, observed-state evidence, safe fallback, incident recovery, and source-refresh handoffs;
10. blocker register that distinguishes exact dependency, authority floor, failed proof, and external pending state—never vague “later” work;
11. delivered-state evidence ledger and next machine action for every incomplete item.

## Routing boundaries

- `app-design-blueprint`, `game-design-blueprint`, and `saas-web-platform-blueprint` own their product promise, experience or public-to-service platform semantics; this skill only indexes their artifacts and cross-domain delivery dependencies.
- `marketing-automation-blueprint` owns the complete marketing operating
  blueprint and creative briefs; `product-asset-production` owns exact rendered
  product media; `promotion-campaign-review`, `referral-loop-review`, and
  `store-listing-optimization` own their narrow artifacts.
- `payment-platform-readiness` owns provider transaction/ledger integration; `refund-and-support-flow-review` owns refund customer/account consequences.
- `review-solicitation-policy` owns platform-specific authentic public review
  request policy; `product-feedback-learning-loop` owns universal private
  feedback, authorized review ingestion, evidence clustering, routing, product
  action, and close-loop behavior.
- `app-store-distribution-readiness` consumes a sealed planning revision and
  owns channel eligibility, submission, certification, rollout, and live
  evidence; a later observed-state manifest revision indexes that artifact.
- App/Game blueprints own localized product semantics; this lifecycle architect owns the cross-channel globalization, asset, market-adapter, evidence, and release dependency graph.
- `launch-readiness-review` independently evaluates evidence; it cannot self-certify a manifest it authored.

## Completion check

The planning revision is complete when every declared capability has one owner
and full target, the graph is acyclic, and all handoffs and gates are executable.
The observed-state revision is complete only when it supersedes that exact plan,
indexes exact accepted sibling evidence, and truthfully distinguishes design,
implementation, scale, release, and live proof. A manifest is not itself
delivery, and no revision may claim evidence produced after its own immutable
identity.
