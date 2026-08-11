# Product Program Manifest — Mobile App (Planning Revision)

## 0. Manifest record

```text
program_id:          mobile-app-program
product_id:          mobile-app
manifest phase:      planning
superseded revision: none (first planning revision)
artifact envelope:   artifactVersion=0.1.0, artifactRevision=planning-2026-08-11-a1,
                     artifactState=draft, artifactKind=product-program-manifest,
                     ownerSkill=compose-product-program
```

**Objective.** Deliver the new mobile app to its declared release target with
every selected capability at its full correctness and lifecycle floor: the
user promise, platform surfaces, commerce, data, SDKs, assets, release,
marketing, support, and runtime evidence converge in one observed-state
revision, and an independent Launch Admission is issued before the program is
declared done.

**Constraints.**
- iOS and Android release lanes are mandatory for this mobile product.
- HTML5/PWA is a first-class global route unless a semantic or hard-floor
  reason is proven at the route gate (G3).
- Build once; the released artifact must be byte-identical to the tested and
  attested candidate. Never rebuild between test and production.
- Platform effects (store review, certification, rollout) are external and
  asynchronous; agents prepare, submit, poll, and reconcile but never
  fabricate approval or authority.
- Facts are labeled `given`, `observed`, `assumed`, `hypothesis`, or
  `decision`; documented intent, implemented state, acceptance evidence,
  released artifact, and observed live behavior are never collapsed.

**Ruin boundaries** (fail the program or force a halt, never paper over):
- Committed purchases, entitlements, grants, refunds, or user work destroyed
  by a failed migration, update, or rollback.
- Ledger, price, or refund semantics that disagree across UI, provider,
  entitlement, support, or campaign surfaces.
- User data collected, initialized, or transmitted without consent or before
  eligibility; SDK or tracker on the startup critical path with no proof.
- A released artifact that differs from the tested/attested candidate, or a
  release marketed before certification/availability.
- Child-safety, age-rating, or territory-legal violation on any channel.
- Any manifest revision that consumes and indexes the same artifact, resolves
  a moving alias such as "latest manifest", or invents a digest for a draft.

**Definition of Done (program terminal).**
1. The planning revision N is sealed and immutable, every declared capability
   has one owner and a full target, the dependency DAG is acyclic, and all
   handoffs carry stable producer-owned IDs with executable acceptance tests.
2. The observed-state revision N+1 supersedes N and indexes exact accepted
   sibling evidence (blueprint, briefs, asset pack, listing, campaign,
   distribution evidence pack) with sealed digests where those artifacts are
   sealed.
3. Each channel's release state machine has reached `live_readback` with
   observed evidence (build digest, signing/attestation, approval receipts,
   staged rollout, live probes for install/update/purchase/restore).
4. Independent Launch Admission is issued by `review-domain` (launch-readiness)
   referencing exact evidence IDs, not prose.
5. Every operating loop has an owner, trigger, observed success/failure
   evidence, safe fallback, and a source-refresh handoff.

**Upstream design input reference (required, currently missing):**
```text
artifactId=mobile-app/design-blueprint
artifactVersion=1.0
artifactRevision=requested-a0
artifactState=draft
fulfillsHandoffId=design-app.handoff.blueprint-v1
artifactDigest: none (draft input; a sealed input would require artifactDigest
                 and digestRule=sha256-exact-bytes, never invented for prose)
```

## 1. Fact labeling and delivery truth ladder

Facts in this manifest are labeled:

| Label | Meaning |
| --- | --- |
| `given` | Stated by the user or an authority in this run. |
| `observed` | Verified in the current workspace or live system. |
| `assumed` | Working assumption with an owner and a falsification test. |
| `hypothesis` | Claim that is not yet supported by evidence. |
| `decision` | This program's declared choice, with the reason and revisability. |

Completion is measured on the delivery truth ladder; a local file, PR, merge,
store upload, approval, staged release, and live behavior are distinct states
and are never collapsed:

```text
documented intent -> artifact authored -> implementation present
-> exact candidate validated -> signed/attested -> submitted (external review)
-> approved/certified -> released/deployed -> live readback verified
```

Phases in this manifest are delivery milestones with gates, not P0/P1/P2-style
feature deferral. Every capability keeps its full declared target; deferral
only exists as an explicit independent state on the construction axis
(`queued-by-exact-dependency | floor-blocked | retired`) or an explicit
`not-selected` channel decision with a semantic reason.

## 2. Artifact envelope (this artifact)

```text
schemaVersion: 2
artifactId: mobile-app/program-manifest
productId: mobile-app
artifactKind: product-program-manifest
ownerSkill: compose-product-program
artifactVersion: 0.1.0
artifactRevision: planning-2026-08-11-a1
artifactState: draft          (seals on first downstream consumption; never carries a top-level artifactDigest)
inputArtifacts:
  - mobile-app/design-blueprint    v1.0 requested-a0 draft fulfillsHandoffId=design-app.handoff.blueprint-v1
  - mobile-app/market-research     v1.0 requested-a0 draft fulfillsHandoffId=synthesize-market-research.handoff.evidence-v1
  - mobile-app/commercial-decisions v1.0 requested-a0 draft fulfillsHandoffId=product-owner.handoff.commercial-decisions-v1
canonicalFactsOwned:
  - program objective, constraints, ruin boundaries, Definition of Done
  - artifact inventory and canonical owner for each fact
  - dependency DAG, typed handoffs, collision boundaries, release targets
  - lifecycle capability states (construction/proof/exposure)
  - SDK provider/version/disclosure/replacement and release registry
  - delivered-state evidence index
proofState: hypothesis       (planning revision; no implementation exists yet)
proofEvidence: []            (empty is legal only at hypothesis)
```

## 3. Canonical fact and artifact-owner registry

| Artifact ID | Kind | Owner | Version/Revision/State | Canonical facts | Inputs | Outputs | Proof target | Release state |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `mobile-app/design-blueprint` | app-design-blueprint | `design-app` (or `design-game` if blueprint declares a game) | 1.0 / requested-a0 / draft | user promise, capability semantics, UX/objects/loops, data & identity authority, monetization value-exchange, SDK port requirements, ruin boundaries | none | planning N via `design-app.handoff.blueprint-v1` | design-validated, sealed | n/a (not a release artifact) |
| `mobile-app/market-research` | market-evidence | `synthesize-market-research` | 1.0 / requested-a0 / draft | category, audience, claims, price, platform choice evidence | none | planning N via `synthesize-market-research.handoff.evidence-v1` | implementation-verified | n/a |
| `mobile-app/commercial-decisions` | commercial-decision-record | declared product owner | 1.0 / requested-a0 / draft | pricing/packaging, target locales/territories, budget, channel selection, audience/age mode | none | planning N via `product-owner.handoff.commercial-decisions-v1` | implementation-verified | n/a |
| `mobile-app/program-manifest` (planning N) | product-program-manifest | `compose-product-program` | 0.1.0 / planning-2026-08-11-a1 / draft→sealed | items listed in section 2 | three draft inputs above | marketing brief, store-listing brief, distribution evidence pack, observed-state N+1, launch admission | design-validated at N; production-proven only at N+1 | n/a |
| `mobile-app/marketing-brief` | marketing-creative-brief | `design-marketing-automation` | per branch | campaign brief/concept, claims, audience/consent, channels, spend | planning N (`program-manifest.handoff.marketing-brief-v1`) | campaign candidate | implementation-verified | n/a |
| `mobile-app/store-listing-brief` | store-listing-request | `produce-product-assets` | per branch | listing narrative, asset selection/order, channel metadata intent | planning N (`program-manifest.handoff.store-listing-brief-v1`) | channel listing revision | implementation-verified | n/a |
| `mobile-app/product-asset-pack` | product-asset-production-pack | `produce-product-assets` | per pack | exact rendered media, localization, accessibility, rights/provenance, file digests | planning N + marketing brief + store-listing brief | campaign candidate, channel listing revision | implementation-verified, sealed with digests | n/a |
| `mobile-app/marketing-campaign-candidate` | campaign-candidate | `design-marketing-automation` (+ `review-promotion-campaign` for promotion/referral) | per campaign | campaign semantics, deep links, spend, measurement | planning N + asset pack | published campaign | scale-verified | per-channel |
| `mobile-app/channel-listing-revision` | channel-listing | `produce-product-assets` | per channel revision | finalized listing metadata/creative per channel | planning N + asset pack | distribution evidence pack | implementation-verified | submitted→approved |
| `mobile-app/distribution-evidence-pack` | distribution-evidence-pack | `build-distribution-readiness` | per release | channel eligibility, submission/certification, rollout, live readback | planning N + listing revision + asset pack | observed-state N+1 | scale-verified, then production-proven | per-channel (section 8) |
| `mobile-app/sdk-adapter-registry` | sdk-adapter-registry | `compose-product-program` | 0.1.0 / planning-2026-08-11-a1 / draft | provider/version/disclosure/replacement registry (section 9) | design blueprint SDK port requirements | release graph, store disclosures | implementation-verified | n/a |
| `mobile-app/observed-state-manifest` (N+1) | product-program-manifest | `compose-product-program` | 0.2.0 / observed-<date>-a1 / draft→sealed | observed delivery evidence index | exact accepted sibling artifacts (sealed refs with digests) | launch admission | production-proven | n/a |
| `mobile-app/launch-admission` | launch-admission | `review-domain` (launch-readiness) | per admission | independent evaluation; cannot self-certify | observed-state N+1 | program terminal decision | production-proven | n/a |

Assumptions currently held (each has an owner and falsification test):

| Assumption ID | Statement | Status |
| --- | --- | --- |
| A-01 | The product is a consumer mobile app, not a game; console adapters are not applicable (`decision` with semantic reason: no console-approved product format). Revisable if the blueprint declares a game. | unverified |
| A-02 | Monetization, target locales/territories, audience/age mode, and channel selection are owned by the commercial decisions artifact. | unverified |
| A-03 | HTML5/PWA is a first-class global route; exclusion requires a semantic/hard-floor proof at gate G3. | unverified |
| A-04 | Initial launch market set is en-US plus any locale the commercial decisions artifact declares; no locale list is frozen here (volatile store facts are retrieved at execution). | unverified |

## 4. Lifecycle capability matrix

State axes: Construction (`build-to-scale-now | queued-by-exact-dependency |
floor-blocked | retired`), Proof (`hypothesis | design-validated |
implementation-verified | scale-verified | production-proven`), Exposure
(`unavailable | authority-gated | canary | staged | generally-available |
degraded | withdrawn`).

| Capability | Owner artifact | Construction | Proof | Exposure | Scale envelope / failure | Migration / recovery |
| --- | --- | --- | --- | --- | --- | --- |
| User promise & capability semantics | design-blueprint | queued-by-exact-dependency (B-001) | hypothesis | n/a | n/a | Blueprint sealed before any implementation slice; supersession is a new blueprint revision. |
| Semantic core (platform-neutral) | product repo, blueprint semantics | queued-by-exact-dependency | hypothesis | n/a | Shared logic; N-1/N/N+1 compatibility | Source-controlled; forward fixes, never rebuild-for-release. |
| iOS surface (UI/input/identity/storage/social/notifications ports) | product repo | queued-by-exact-dependency | hypothesis | unavailable | TestFlight → staged cohorts with crash/startup/latency gates | Halt rollout, server kill switch, superseding build; no rollback of committed state. |
| Android surface | product repo | queued-by-exact-dependency | hypothesis | unavailable | Play tracks: internal → closed → open → production with health gates | Staged rollout halt; forward-fix; Play App Signing identity. |
| HTML5/PWA route | product repo | queued-by-exact-dependency (route decision `given`) | hypothesis | unavailable | Web/CDN burst; offline/PWA update flow | Instant supersede (no store authority); service-worker update channel. |
| Identity/accounts | design-blueprint + auth port | queued-by-exact-dependency | hypothesis | unavailable | Login/restore probes per platform | Export/delete and migration safe per design data authority. |
| Data & offline/sync/backup | design-blueprint + data port | queued-by-exact-dependency | hypothesis | unavailable | Sync conflict rates; offline retry/idempotency | Migration with pre/post digests; backup/restore drill. |
| Commerce & entitlements | `build-product` (payment-readiness) | queued-by-exact-dependency | hypothesis | unavailable | Purchase/restore/refund gates; provider ledger | Provider-agnostic port; refund consequence owned by `review-refund-and-support-flow`; rollback never erases ledger. |
| Push/engagement | notifications port | queued-by-exact-dependency | hypothesis | unavailable | Per-platform push limits; consent preconditions | Kill switch; consent withdrawal propagation. |
| Analytics/telemetry | `review-product-analytics-instrumentation` | queued-by-exact-dependency | hypothesis | unavailable | Event dedupe, rate limits | Vendor-neutral contract; consent-gated; zero-footprint when disabled. |
| Crash diagnostics | crash port | queued-by-exact-dependency | hypothesis | unavailable | Symbolication, privacy manifest | Lazy init; failure isolated from startup. |
| Consent/privacy | consent port | queued-by-exact-dependency | hypothesis | unavailable | Disabled = no init/permission/network/background/reservation | Withdrawal propagates to collection, storage, sharing, deletion, future init. |
| Remote config / experimentation | config/experimentation ports | queued-by-exact-dependency | hypothesis | unavailable | Canary-safe flags; kill switches | Server-side degrade; no startup path dependency. |
| i18n/LQA | i18n plan (section 7) | queued-by-exact-dependency | hypothesis | unavailable | Locale coverage per commercial decisions | Fallback graph; refresh loop for strings/assets. |
| Store listing metadata/creative | produce-product-assets | queued-by-exact-dependency | hypothesis | unavailable | Per-channel metadata/locale variants | Revisioned listing; re-submission path. |
| Marketing campaign | design-marketing-automation | queued-by-exact-dependency | hypothesis | unavailable | Spend/measurement gates; consent | Campaign halt loop; deep-link validation. |
| Distribution lanes | build-distribution-readiness | queued-by-exact-dependency | hypothesis | unavailable | Per-channel state machines (section 8) | Halt/degrade/supersede; typed external authority. |
| Support/feedback | operate-customer-support | queued-by-exact-dependency | hypothesis | unavailable | Public review policy per `review-solicitation-policy` | Feedback → product action loop. |
| Security/abuse/age gates | appsec/trust surfaces, store age ratings | queued-by-exact-dependency | hypothesis | unavailable | Abuse/rating per territory | Legal/age review is a typed external gate. |
| Observability/incident recovery | ops plan (section 11) | queued-by-exact-dependency | hypothesis | unavailable | SLOs and drill evidence | Owner, trigger, observed evidence, safe fallback per loop. |

## 5. Dependency DAG, critical path, delivery order, collision boundaries

### 5.1 Dependency DAG (acyclic)

```text
design-blueprint ─┬─> program-manifest planning N ──> store-listing-brief ─┐
market-research ──┤         │                       └> marketing-brief ────┤
commercial-decs ──┘         │                                             │
                            ├─> distribution-evidence-pack <── channel-listing-revision <── product-asset-pack <──┘
                            │         │                                (consumes N + briefs + pack)
                            └─> sdk-adapter-registry (owned by N; no cycle)

product-asset-pack ──> marketing-campaign-candidate
distribution-evidence-pack ──> observed-state manifest N+1 (supersedes N, never consumed by N)
observed-state manifest N+1 ──> launch-admission (independent reviewer)
```

No artifact consumes the observed-state revision N+1 that later indexes its
output. No revision both consumes and indexes the same artifact. All input
references carry `fulfillsHandoffId`; sealed inputs additionally carry
`artifactDigest` + `digestRule: sha256-exact-bytes`.

### 5.2 Critical path

```text
blueprint sealed -> planning N sealed -> store-listing brief -> asset pack
-> exact candidate validated (G3) -> sign/submit/certify (G4)
-> staged rollout + live readback -> observed-state N+1 -> launch admission
```

The marketing branch runs in parallel with the listing branch after N and
re-joins only via the asset pack and campaign candidate.

### 5.3 Delivery order (small verified slices)

1. Seal blueprint; register commercial decisions and market research.
2. Seal planning N; emit marketing brief + store-listing brief (parallel).
3. Produce and seal the asset pack; emit channel-listing revision + campaign candidate.
4. Implement semantic core slice → iOS slice → Android slice → PWA slice; each slice verified before the next platform slice consumes it.
5. Build once, attest, sign; submit iOS lane and Android lane; deploy PWA lane.
6. Stage with health gates; promote; live readback probes.
7. Emit observed-state N+1 indexing exact outputs; obtain independent launch admission.
8. Operate maintenance loops; refresh proof quarterly.

### 5.4 Collision boundaries (owner + detection)

| Collision | Detection |
| --- | --- |
| App claims disagree with marketing creative or store listing | Diff claim statements against blueprint; automated claim trace in brief acceptance tests. |
| Price/catalog differs across UI, provider, entitlement, support, campaign | Single commercial decisions SSOT; cross-surface contract tests. |
| Refund consequence destroys data promised by export/delete policy | Refund flow vs data authority test in `review-refund-and-support-flow`. |
| Locale/age/privacy/commerce differs across channel claims | Channel listing contract tests against blueprint and i18n plan. |
| SDK runtime behavior disagrees with consent/store disclosure | Runtime data manifest vs store disclosures freshness-gated at release. |
| Released artifact differs from tested/attested artifact | Digest equality at promote gate; build-once rule. |
| Minimum-version gate strands offline/old devices | N-1/N/N+1 matrix in rollout policy. |
| Platform capability marketed before certification | Exposure axis gates marketing brief publication. |
| Campaign deep link targets unavailable/unauthorized/region-blocked state | Deep-link validation test before campaign publication. |
| Rollback erases committed purchases/grants/user work | Recovery policy: forward-fix + server degrade; no destructive rollback. |
| Same-revision back-reference or handoff without stable producer ID | Graph lint in gate G1. |

### 5.5 Handoff acceptance fixtures

| Handoff ID | Consumer | Artifact kind | Contract | Acceptance tests |
| --- | --- | --- | --- | --- |
| `program-manifest.handoff.marketing-brief-v1` | `design-marketing-automation` | marketing-brief | Emit an exact brief revision consuming planning N; claims trace to blueprint; audience/consent per commercial decisions. | `T-MKT-1`: every claim in the brief traces to a blueprint claim ID. `T-MKT-2`: every campaign deep link target exists in the release graph with allowed region state. `T-MKT-3`: brief carries its own artifactVersion/Revision/State and no back-reference to N+1. |
| `program-manifest.handoff.store-listing-brief-v1` | `produce-product-assets` | store-listing-brief | Emit an exact listing narrative/asset-request revision consuming planning N; channel metadata set matches target channels. | `T-LST-1`: listing metadata covers every selected channel and locale. `T-LST-2`: no claim exceeds blueprint. `T-LST-3`: age/territory/privacy statements match blueprint and commercial decisions. |
| `program-manifest.handoff.distribution-pack-v1` | `build-distribution-readiness` | distribution-evidence-pack | Consume sealed planning N; produce per-channel submission/certification/rollout evidence; obey build-once and readback rules. | `T-DST-1`: released artifact digest equals tested/attested digest. `T-DST-2`: every state-machine transition has evidence; portal-only gates are typed, not invisible. `T-DST-3`: live readback covers install/update/purchase/restore. |
| `program-manifest.handoff.observed-state-v1` | `compose-product-program` (N+1) | product-program-manifest | N+1 supersedes N, indexes exact accepted sibling evidence, and truthfully separates design/implementation/scale/release/live proof. | `T-OBS-1`: N+1 references each sibling artifact by exact ID/version/revision and sealed digest where applicable. `T-OBS-2`: no evidence dated after N+1's own immutable identity is claimed. `T-OBS-3`: every incomplete item has a next machine action. |
| `program-manifest.handoff.admission-v1` | `review-domain` (launch-readiness) | launch-admission | Independently evaluate N+1 evidence; do not self-certify a manifest authored by `compose-product-program`. | `T-LAU-1`: admission cites exact evidence IDs, not prose. `T-LAU-2`: admission states which proof states are reached per capability. `T-LAU-3`: admission is signed by a different owner skill than the manifest. |

## 6. Delivery phases, gates, and completion evidence

Each phase lists its entry dependencies (by handoff ID), the work, the typed
gate with acceptance tests, and the exact evidence that proves the phase done.

### Phase 0 — Program truth
- **Entry:** none. **Work:** collect design blueprint, market research, commercial decisions; label facts; register missing inputs as typed blockers.
- **Gate G0:** every required input is either sealed (with `artifactDigest` + `digestRule: sha256-exact-bytes`) or in the blocker register with an exact owner and next action; no design fact is filled with prose.
- **Done when:** input registry populated; B-001..B-003 resolved or owned.

### Phase 1 — Planning manifest (this artifact)
- **Entry:** G0 (or blockers registered). **Work:** artifact/owner map, lifecycle sweep, DAG, handoffs, gates, DoD.
- **Gate G1 (completion check):** every declared capability has one owner and a full target; DAG acyclic; every handoff executable with contract + acceptance tests; no same-revision cycle; no invented digests; no P0/P1/P2 deferral language.
- **Done when:** planning revision sealed and immutable; stable handoff IDs published.

### Phase 2 — Briefs and asset production
- **Entry:** sealed planning N (`program-manifest.handoff.marketing-brief-v1`, `program-manifest.handoff.store-listing-brief-v1`).
- **Work:** marketing brief, store-listing brief, then the product asset pack.
- **Gate G2:** asset pack accepted by both selected branches; exact-file digests present; rights/provenance recorded; LQA and accessibility pass; no claim beyond blueprint.
- **Done when:** sealed asset pack digest; channel-listing revision and campaign candidate emitted.

### Phase 3 — Implementation and exact-candidate validation
- **Entry:** sealed blueprint + listing revision + asset pack.
- **Work:** semantic core; iOS/Android/PWA ports; SDK adapters; build once from a pinned source commit.
- **Gate G3:** exact candidate `implementation-verified` (contract tests, handoff tests, per-slice verification); reproducible build inputs recorded; SDK registry populated with ports and consent-zero-footprint proof; PWA route gate decides inclusion or a semantic/hard-floor exclusion reason.
- **Done when:** candidate digest, SBOM, provenance, and test receipts recorded.

### Phase 4 — Sign, submit, certify
- **Entry:** G3 + signing authority + store accounts.
- **Work:** attest/sign/notarize; upload; poll processing; submit review; poll review; stage.
- **Gate G4:** external authority states typed (`submitted`, `approved`) with receipts; staged rollout with health gates; no approval claimed without portal/API evidence.
- **Done when:** store approval receipts; staged cohort observed.

### Phase 5 — Launch, readback, observed-state revision
- **Entry:** G4. **Work:** promote; live readback probes (install/update/purchase/restore); emit observed-state N+1 indexing exact outputs; obtain independent launch admission.
- **Gate G5:** per-capability `production-proven` evidence (live readback); N+1 supersedes N and indexes sealed sibling digests; admission references exact evidence.
- **Done when:** N+1 sealed; launch admission issued; program terminal met (section 0).

### Phase 6 — Operating loops (ongoing)
- **Entry:** G5. **Work:** run every loop in section 11; refresh volatile facts; incident drills.
- **Gate G6:** each loop shows owner, trigger, observed success/failure evidence, safe fallback, and source-refresh handoff; drill receipts current.
- **Done when (per loop, not a terminal event):** loop health record updated; failed loops produce typed blockers.

## 7. Platform/channel capability matrix and release-control state machines

Channel facts (agreements, fees, API versions, review SLAs, asset dimensions,
locale lists) are volatile: retrieve from official authority at execution with
URL, publisher, scope, effective/retrieval/expiry times, and digest. Nothing in
this section freezes those values.

| Channel | Status | Authority gates | Testing/rollout | Halt/withdraw/supersede |
| --- | --- | --- | --- | --- |
| iOS App Store (mandatory, `given`) | selected | Apple Developer account/agreement; signing certificate; App Review approval | TestFlight → staged cohorts; crash/startup/latency gates | Halt promotion; forward supersede; no destructive rollback |
| Google Play (mandatory, `given`) | selected | Play Console agreement; Play App Signing | Internal → closed → open → production tracks with health gates | Staged rollout halt; forward-fix; Play handles signing |
| HTML5/PWA (first-class, `decision`) | selected pending G3 semantic/hard-floor proof | Domain, HTTPS, push keys; no store authority | Canary by URL/cohort; Web Vitals and commerce gates | Instant supersede; service-worker update channel; server kill switch |
| Huawei AppGallery / Samsung Galaxy / Amazon Appstore | `not-selected` at planning; contract-ready adapters | Partner accounts/agreements if later selected | Per-store tracks | Per-store policy retrieved at execution |
| Consoles (Xbox/PS/Nintendo) | `not-applicable` (`decision`, semantic reason: mobile consumer app with no console product format; revisable if blueprint declares a game) | n/a until product format changes | n/a | n/a |
| YouTube / X | asset consumers, not binary stores | Platform publishing/API rules; synthetic-media disclosure | n/a | Content withdrawal per platform policy |

### Release-control state machine (all binary channels)

```text
prepare -> validate -> build -> attest -> sign
-> notarize_or_certify_if_required -> upload -> poll_processing
-> submit_review -> poll_review -> stage -> promote | halt
-> live_readback -> supersede | withdraw
```

Each channel declares its supported transitions and portal-only gates. A
portal-only or manual external gate is represented as a typed state with
evidence, never an invisible checklist. Automation holds a per-product/per-
channel distributed lock, retries with backoff, dedupes at-least-once platform
events with durable receipts, and reconciles desired vs observed live state.

### Rollout and recovery

- Eligible cohort/territory/platform/version; canary/stage size with a maximum step.
- Observation window, hysteresis, cooldown.
- Health gates: crash/hang/startup/latency/error; purchase/restore/refund/entitlement; support/privacy/safety.
- Actions: auto-promote, hold, halt, degrade, withdraw.
- Compatibility: minimum-version policy with N-1/N/N+1 matrix; server kill switch and feature degradation.
- Recovery: superseding-build path with user communication; store rollback is not assumed — forward-fix is the primary path and must never erase committed ledger, grants, user data, or external state.

## 8. i18n/culturalization plan and asset-pack handoff

### 8.1 Globalization contract
- Stable message IDs with context; plural/select and grammatical variables.
- Explicit fallback graph by language/script/region (BCP 47, CLDR/LDML), never ad-hoc English fallback.
- Unicode/graphemes, fonts/glyphs, CJK, RTL/bidi, IME, sorting/search, text expansion.
- Locale-aware date/time/timezone/calendar/number/currency/unit/address/name.
- Localized product, payments/refunds, safety, support, privacy/legal, notification, store, and marketing surfaces — not strings alone.
- Pseudolocalization, missing-string/forbidden-literal checks, RTL/overflow visual tests, OCR and accessibility checks.
- Glossary/style/terminology memory, translation provenance, confidence, independent model judgement, market feedback.
- Cultural, legal, claim, age-rating, sensitive-topic review as explicit residual-risk states.
- Target locale set comes from `mobile-app/commercial-decisions` and current store territory policy at execution (A-04); model translation scale does not prove native nuance.

### 8.2 Asset production handoff

`produce-product-assets` owns the Product Asset Production Pack. This manifest
owns only the coverage, dependency, and acceptance record.

- **Pack inputs:** sealed planning N (release targets + stable handoff IDs), exact store-listing brief revision, exact marketing brief revision.
- **Coverage:** key/capsule art, screenshots per device class and locale, trailer, captions, alt text, accessibility variants, PWA icons, channel variants.
- **Acceptance:** exact-file digests; rights/provenance recorded; LQA sign-off; accessibility and OCR checks; no asset conflicts with listing narrative.
- **Downstream handoffs:** only selected branches consume the pack — channel-listing revision and marketing campaign candidate; distribution consumes the accepted upstream set. A changed request creates a new brief or pack revision.
- **Volatile rules:** current YouTube/X API, format, disclosure, moderation, and synthetic-media requirements are retrieved by the production/distribution owners at execution, not frozen here.

## 9. Vendor-neutral SDK adapter registry

Ports are declared before providers. No vendor SDK becomes the canonical
product event, consent, entitlement, experiment, or user-state model.

| Port | Semantic source | Provider (planned: none selected) | Consent/age/territory preconditions | Startup | Dormant proof | Replacement test | Kill switch |
| --- | --- | --- | --- | --- | --- | --- | --- |
| analytics | blueprint telemetry contract | TBD | consent-gated | lazy | zero footprint | port conformance fixture | per-port switch |
| crash-diagnostics | blueprint | TBD | privacy manifest | lazy, off critical path | zero footprint | port conformance fixture | per-port switch |
| consent | blueprint | TBD | n/a (first) | first init | n/a | withdrawal propagation test | n/a |
| attribution | marketing/commercial decisions | TBD | consent-gated | lazy | zero footprint | port conformance fixture | per-port switch |
| ads-mediation | commercial decisions | TBD | consent + age gating | lazy | zero footprint | port conformance fixture | per-port switch |
| commerce | payment readiness | TBD | entitlement + territory | lazy | zero footprint | port conformance fixture | per-port switch |
| auth-social | blueprint | TBD | per-provider policy | lazy | zero footprint | port conformance fixture | per-port switch |
| push | blueprint | TBD | consent + platform limits | lazy | zero footprint | port conformance fixture | per-port switch |
| deep-links | blueprint + campaign | TBD | territory/entitlement | lazy | zero footprint | link validation test | per-port switch |
| remote-config | ops plan | TBD | n/a | off startup path | zero footprint | schema conformance | server kill switch |
| experimentation | commercial decisions | TBD | consent-gated | lazy | zero footprint | port conformance fixture | per-port switch |
| AI-model | blueprint (only if selected) | TBD | consent + safety review | lazy | zero footprint | port conformance fixture | per-port switch |
| support | support plan | TBD | privacy map | lazy | zero footprint | port conformance fixture | per-port switch |
| platform-services | per-platform | platform native | per-platform policy | lazy | zero footprint | port conformance fixture | per-port switch |

Rules (enforced at G3 and refreshed per release):
- Disabled means no initialization, permission, data collection, network, background job, public surface, or startup/runtime reservation.
- Consent withdrawal propagates to collection, storage, sharing, deletion, and future initialization.
- SDK failure cannot block core startup unless it is a declared correctness/security dependency.
- Replacement tests run against the port contract; provider-specific features stay isolated.
- Store privacy/data-safety disclosures derive from the same runtime SDK/data manifest and are freshness-gated; Apple/Google requirements for the exact versions are retrieved at release.

## 10. Exact-artifact release graph and evidence pack

```text
build once from pinned source commit -> attest (SBOM/provenance)
-> sign (identity from secrets broker/HSM/protected CI identity, never agent context)
-> notarize/certify if required -> upload -> poll processing -> submit review
-> poll review -> stage -> promote | halt -> live readback -> supersede | withdraw
```

The distribution evidence pack must record:
- planning manifest revision and handoff IDs;
- product/channel/release IDs;
- source commit and reproducible build inputs;
- version/build and artifact digest (`sha256-exact-bytes`);
- SBOM, provenance, and attestation;
- signing identity reference and authority scope;
- platform capability/permission/SDK/privacy inventory;
- server/API/schema compatibility;
- localized metadata and asset manifest IDs;
- submission/reviewer/certification package;
- rollout policy and health gates;
- recovery, superseding build, and live probes.

## 11. Automated operations and maintenance plan

| Loop | Owner | Trigger | Observed success/failure evidence | Safe fallback | Handoff |
| --- | --- | --- | --- | --- | --- |
| Platform/store policy + API refresh | build-distribution-readiness | policy change detected or scheduled | official URL, version, retrieved_at, expiry, digest | adapter quarantine; halt release ops | distribution evidence pack |
| Dependency/SDK updates + disclosure sync | compose-product-program registry | new version/security advisory | conformance + replacement tests, dormant proof | pin previous version; kill switch | release graph |
| Translation/asset refresh | produce-product-assets | source change/locale add | pseudo/LQA/OCR/rights checks | previous pack remains valid | channel listing revision |
| Store metadata refresh | produce-product-assets | listing/creative change | per-channel readback | previous listing | distribution evidence pack |
| Support + feedback close-loop | operate-customer-support | ticket/review events | cluster → product action → close evidence; solicitation policy per platform | escalation path | program N+1 next revision |
| Incident recovery | ops owner | alert on health gates | rollout halt/kill-switch/degrade receipts; drill evidence | superseding build | release graph |
| Campaign refresh + measurement | design-marketing-automation | spend/ROI gates | campaign readback + deep-link validation | campaign halt | campaign candidate revision |
| Security/privacy scanning | appsec/trust | release candidate/periodic | scan receipts; disclosure parity | block release | release graph |

## 12. Blocker register

Blockers are typed: `exact-dependency` (missing upstream artifact),
`authority-floor` (external permission/agreement), `failed-proof` (evidence
contradicts claim), or `external-pending` (third-party state awaited with
receipts). "Later", "too expensive", "no users", and "uncertain ROI" are
invalid states.

| ID | Type | Blocker | Owner | Next machine action |
| --- | --- | --- | --- | --- |
| B-001 | exact-dependency | `mobile-app/design-blueprint` missing (draft `requested-a0`); no user promise/capability semantics | `design-app` | Issue typed artifact request with envelope + handoff `design-app.handoff.blueprint-v1`; poll; on receipt, verify envelope fields. |
| B-002 | exact-dependency | `mobile-app/commercial-decisions` missing: pricing, locales/territories, audience/age mode, channel selection | product owner | Issue typed request with required field list; on receipt, diff against assumption A-02. |
| B-003 | exact-dependency | `mobile-app/market-research` missing: category, audience, claims, price, platform evidence | `synthesize-market-research` | Issue research brief with claim list; on receipt, label hypotheses vs evidence. |
| B-004 | authority-floor | Apple Developer account/agreement + signing identity | external authority | Prepare submission package; poll agreement state; record receipt. |
| B-005 | authority-floor | Google Play developer account/agreement + Play App Signing | external authority | Prepare submission package; poll agreement state; record receipt. |
| B-006 | authority-floor | Signing/notarization credentials (HSM/broker-bound; never agent context) | credential owner | Provision via secrets broker; record identity reference + scope only. |
| B-007 | external-pending | Store review/certification states (App Review, Play review) | store authority | Poll with durable receipts; typed `submitted`/`approved`; never self-assert approval. |
| B-008 | external-pending | Age rating / territory-legal determinations per selected market | legal/rating authority | Prepare data; submit; record determinations and expiry. |
| B-009 | exact-dependency | SDK provider selection + conformance fixtures (registry is ports-only at planning) | compose-product-program | Select after blueprint + commercial decisions; run replacement tests and dormant proof. |

## 13. Delivered-state evidence ledger and next machine actions

| Item | Target proof | Current state | Required evidence | Next machine action |
| --- | --- | --- | --- | --- |
| design-blueprint | design-validated, sealed | hypothesis (`requested-a0`) | sealed artifact + digest (when sealed) | resolve B-001 |
| commercial decisions | implementation-verified | hypothesis | signed record | resolve B-002 |
| market research | implementation-verified | hypothesis | evidence-labeled record | resolve B-003 |
| planning N | sealed, design-validated | draft (this file) | seal on first consumption; stable handoff IDs | publish N; emit brief requests |
| marketing brief | implementation-verified | hypothesis | brief revision with claim trace (T-MKT-1..3) | trigger after N sealed |
| store-listing brief | implementation-verified | hypothesis | brief revision (T-LST-1..3) | trigger after N sealed |
| product asset pack | implementation-verified, sealed | hypothesis | exact-file digests, rights, LQA | trigger after both briefs |
| semantic core + iOS/Android/PWA slices | implementation-verified | hypothesis | contract tests + build digest | implement after blueprint |
| sdk-adapter-registry | implementation-verified | draft (ports only) | conformance fixtures + dormant proof | populate after provider selection (B-009) |
| iOS lane | production-proven | hypothesis | TestFlight + App Review receipt + live readback | resolve B-004/B-006/B-007 |
| Android lane | production-proven | hypothesis | Play track receipts + live readback | resolve B-005/B-007 |
| PWA route | production-proven | hypothesis | deployed URL + live probe, or G3 exclusion proof | gate decision at G3 |
| i18n/LQA | implementation-verified | hypothesis | pseudo/LQA evidence per declared locales | define locale set from B-002 |
| observed-state N+1 | production-proven, sealed | not started | supersedes N; indexes sealed sibling digests (T-OBS-1..3) | emit after G5 evidence |
| launch admission | production-proven | not started | independent evaluation (T-LAU-1..3) | request after N+1 sealed |

## 14. Completion check

This planning revision is complete when every declared capability has one
owner and a full target (section 4), the graph is acyclic (section 5), and all
handoffs and gates are executable (sections 5.5, 6). A manifest is not itself
delivery: this file is a checkpoint. The program terminal is the observed-
state revision N+1 plus independent Launch Admission plus live readback, and
no revision may claim evidence produced after its own immutable identity.
