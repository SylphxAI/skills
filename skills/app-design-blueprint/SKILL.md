---
name: app-design-blueprint
description: "Design or critically review a complete app as a coherent, agent-first App Design Blueprint: user job and promise, workflows and information architecture, first-use activation, capability portfolio, retention and durable ownership, commerce and social integration, feedback and review loops, responsive HTML5/mobile/desktop experience, desktop OS integration semantics, offline and sync, accessibility, localization, low-end performance, privacy, safety, autonomous construction, and validation. Use for a new consumer or productivity app, whole-app redesign, cross-platform app system, a bounded macOS/Windows integration design that must remain consistent with app state, or an audit of whether product capabilities form one scalable experience. Use specialist procedures for one payment, refund, notification, review, campaign, store submission, exact release artifact, or file-level interface artifact unless whole-app coherence is also being decided."
---

# App Design Blueprint

Create one coherent application experience and a complete scale-ready architecture for its selected capabilities. Start from the recurring user job and fastest credible path to value; use autonomous agents to construct every requested or promise-essential selected target in verified slices, then make legitimate selected capabilities available to authorized users without artificial progression gates.

## Objective

Maximize durable user value, voluntary retention, commercial value, reach, trust, and product optionality. Retention must come from recurring utility, saved progress, creation, collaboration, personalization, continuity, and earned ownership—not hostage data, anxiety, deception, punishment, or difficulty leaving.

“Modern” means immediate, legible, responsive, resilient, inclusive, globally adaptable, instrumented, and continuously improving. Visual novelty alone is not modernity.

## Atomic boundary

This skill owns one independently useful artifact: the **App Design Blueprint**, including app-level capability semantics and integration contracts. It does not own provider transaction correctness, detailed refund enforcement, one engagement mechanic, marketing spend, store submission evidence, localized copy QA, or implementation of a single screen.

Use a separate specialist when its artifact could be accepted or rejected without reopening whole-app coherence. Combine skills by exchanging typed artifacts; never copy a specialist rulebook into this blueprint.

## Agent-first invariant

Assume autonomous construction capacity is elastic. Human headcount, human-hours, calendar estimates, implementation cost, missing users, uncertain demand, or speculative pre-build ROI may not reject or postpone a requested or promise-essential reversible capability once selected.

Run an exhaustive capability sweep, but do not force every possible system into every app. Give each capability one disposition:

- `integrate-now` — requested or required by the user promise; build the complete production-shaped, scale-ready capability and its automation now;
- `reuse-scale-ready` — consume an already complete shared primitive and design the exact app-specific integration and proof now;
- `contract-ready` — preserve a tested extension boundary because future compatibility is valuable, while keeping the capability absent from the runtime and user experience;
- `not-applicable` — cite an exact product-promise, product-type, audience, business-model, attention, semantic, platform, or physical reason; human effort, implementation cost, missing users, uncertain demand, and speculative ROI are invalid reasons;
- `floor-blocked` — cite the exact legal, platform, trust, safety, rights, consent, authority, or physical floor, make the prohibited transition unrepresentable, and define the safe alternative where one exists.

Requested or promise-essential legitimate capabilities must be `integrate-now` or `reuse-scale-ready` unless an exact floor blocks them. For every `integrate-now` capability, default to `build-to-scale-now`: define the complete target, operating behavior, and automation now, using small end-to-end slices to verify risk without reducing final scope. Do not plan a later hardening, automation, i18n, accessibility, low-end, HTML5, migration, scale, observability, or replatform phase. Unknown demand limits certainty and exposure; it neither defers a selected capability nor selects an irrelevant one.

Product fit controls selection, manifestation, and placement. Cross-cutting quality and trust floors apply to every selected capability they govern; they are not optional feature rows.

An unavailable module is truly dormant: no startup work, SDK initialization, permission request, data collection, network call, asset download, background job, memory reservation, public endpoint, or undeclared service dependency.

Agent-first is not permission to expose incoherent features, ignore physical budgets, infer human satisfaction from simulations, bypass partner authority, or build abusive transitions. Make deception, review manipulation, involuntary sharing, hostage data, discriminatory access, unsafe child modes, and consent bypass unrepresentable.

## Composition contract

Treat the blueprint as an upstream design artifact. Start it with `schemaVersion`, `artifactId`, `productId`, `artifactKind`, `ownerSkill`, `artifactVersion`, `artifactRevision`, `artifactState`, `inputArtifacts`, `proofState`, assumptions, and handoff requests. A top-level artifact never carries `artifactDigest` because it cannot self-hash.

Use [`references/product-artifact-envelope.schema.json`](references/product-artifact-envelope.schema.json) for a structured artifact. Every input reference names the producer contract through `fulfillsHandoffId`. A draft input reference uses `artifactId`, `artifactVersion`, `artifactRevision`, and `artifactState: draft`; a sealed input reference additionally requires `artifactDigest` and `digestRule: sha256-exact-bytes`. Never invent any field.

The dependency direction is acyclic:

```text
App Design Blueprint
-> specialist artifacts
-> marketing artifacts when required
-> Product Program Manifest as the downstream composition index
```

Emit specialist **handoff requests** with the required contract and acceptance tests. Do not revise the upstream blueprint merely to add the digest of a specialist that consumed it. The Product Program Manifest references both artifacts later.

When orchestration supplies immutable planning Product Program Manifest revision N as context, treat N and observed-state revision N+1 as distinct graph nodes: `N -> specialist outputs -> N+1`. A specialist never mutates or back-references N and never consumes N+1 that it helps produce.

## Resource guide

- Read `references/app-thesis-and-experience.md` for success, user jobs, activation, workflows, durable investment, retention, and feedback.
- Read `references/app-system-portfolio.md` for the complete capability sweep, contracts, state ownership, and specialist handoffs.
- Read `references/app-quality-and-reach.md` for HTML5/PWA, mobile, desktop, startup, low-end, responsive inputs, offline/sync, accessibility, localization, privacy, and security.
- Read `references/desktop-os-experience.md` for macOS/Windows startup,
  tray/menu-bar, permissions, files/deep links, local data/credentials,
  notifications, updates, uninstall, support diagnostics, and regression states.
- Read `references/app-validation-and-automation.md` for evidence labels, metrics, experimentation, scale proof, autonomous maintenance, risk posture, and the complete template.

Read all references for a whole-app program. For a bounded redesign, load only the touched references and state what remains unassessed.

For a bounded desktop-integration request, return the Desktop OS Experience
Contract and specialist handoffs only; do not imply that the rest of the app
blueprint was reviewed.

Capability lists in every reference are sweep candidates, not inclusion mandates. Apply the disposition invariant before any instruction to build, port, integrate, or hand off a primitive: only selected capabilities receive app-specific runtime work, `contract-ready` remains a tested zero-runtime boundary, and `not-applicable` creates no implementation or provider handoff.

## App availability model

Do not copy game progression gates into an app. Choose disposition first, then track four orthogonal states for capabilities with design or runtime work:

```text
Disposition: integrate-now | reuse-scale-ready | contract-ready | not-applicable
| floor-blocked

Build: build-to-scale-now | queued-by-exact-dependency | floor-blocked | retired

Proof: hypothesis | design-validated | implementation-verified | scale-verified
| production-proven

Availability: available | permission-gated | role-gated | entitlement-gated
| semantic-prerequisite-gated | age-or-territory-policy-gated | degraded

Presentation: primary | contextual | advanced-or-settings | searchable | admin-only
```

Rules:

- Every `integrate-now` or `reuse-scale-ready` legitimate user-facing capability is discoverable and available to authorized and entitled users by default after validation.
- `contract-ready`, `not-applicable`, and `floor-blocked` are explicit product decisions, not hidden integrated features. They add no user-facing reachability or undeclared runtime work.
- `queued-by-exact-dependency` must name the blocking dependency and unblock proof. It is a build state for selected work, not a sixth disposition or permission to reduce the target.
- Never deny core utility by usage level, tenure, streak, churn risk, spend, arbitrary onboarding completion, or an engagement score.
- Progressive disclosure may manage cognitive load; it cannot secretly withhold functional entitlement.
- A semantic prerequisite means required state exists, such as data before export or a collaborator before co-editing; it is not a retention trick.
- Population gates apply only to intrinsically liquidity-dependent behavior. Invites, known-friend collaboration, asynchronous participation, and useful solo fallback should work at population zero where possible.
- Permission, role, entitlement, consent, age, territory, platform capability, safety, service health, and external authority remain valid gates.

## Operating rules

1. Label inputs as `given`, `observed`, `assumed`, `hypothesis`, or `decision`. Never present a competitor pattern or generic benchmark as proof for this app.
2. Define the primary user, job, trigger, context, frequency, current alternative, desired outcome, business model, lead platform, minimum device/browser, age/territory modes, and non-goals. Inclusive reach does not mean an undefined “everyone” audience.
3. Write one falsifiable promise: who reaches what outcome, through what distinctive mechanism, and what observable event proves first value.
4. Benchmark three to five relevant products by mechanism and tradeoff: direct category, adjacent workflow, retention, collaboration, commerce, and technical reach leaders as applicable. Synthesize; do not cargo-cult.
5. Map jobs to workflows, objects, state authorities, navigation, search, creation, decisions, errors, recovery, and feedback before styling screens.
6. Give every swept capability a proportionate record: disposition and exact reason; user value or inapplicability/floor; owner; state and dependency boundary; complete target and verified slices for selected capabilities; build/proof/availability/presentation; telemetry, migration, dormant state, degradation, recovery, and specialist handoff where applicable. Do not invent runtime architecture for `not-applicable` capabilities or use `contract-ready` to defer selected work.
7. Preserve a fast path from cold start to useful interaction. Prefer guest, local-first, sample data, import, template, or demo paths where the product permits; ask for accounts, permissions, payment, tracking, or profile investment only when their value is clear.
8. Build durable investment from the user-created data, settings, collections, history, mastery, identity, relationships, or reputation selected by the app promise, with recovery, export, deletion, portability, versioning, and returning-user restoration. Never use loss threats or forced payment to retain that value.
9. Treat selected notifications, rewards, reviews, ratings, cross-promotion, referrals, update benefits, personalization, and gamification as delivery or reinforcement systems. Each selected system needs an underlying user-value hypothesis, neutral controls, countermetrics, and a specialist contract.
10. Define immediate feedback for every state-changing action: pending, optimistic, committed, failed, retryable, reconciled, undone, and externally authoritative. Optimistic UI may not falsely confirm money, entitlement, sharing, deletion, or irreversible work.
11. Design every selected platform and reach capability—HTML5/PWA, mobile/tablet/desktop, keyboard, touch, pointer, controller where relevant, desktop OS integration, accessibility, i18n, offline/sync, and low-end tiers—in the initial semantic contracts, and disposition the rest. One stretched layout is not cross-platform design. For selected desktop targets, bind background, permission, file, credential, local-data, notification, update and uninstall behavior to the app state model, then hand exact package/release proof to Distribution Readiness.
12. Produce an implementation handoff with canonical owners, an acyclic dependency order, collision boundaries, acceptance evidence, migrations, exposure/recovery behavior, and maintenance automation. Leave repository, CI, deployment, and runtime mechanics to their owning projects.
13. Close continuous improvement as `observe -> diagnose -> hypothesize -> validate -> expose_boundedly -> observe -> keep_or_recover -> learn`. Preserve evidence lineage, declared authority, countermetrics, and safe recovery; do not let generated proposals certify themselves as observed results.
14. Retrieve current platform, store, payment, review, notification, child, privacy, accessibility, advertising, and regulated-category authority for every selected or risk-relevant surface at execution. Static skill text is a route, never a current compliance verdict.

## Workflow

### 1. Frame the app thesis

Capture user job, trigger/context, pain and alternative, promised outcome, wedge, business model, target platforms/locales/age modes, data sensitivity, differentiation, non-goals, and ruin boundaries.

### 2. Model objects, workflows, and information architecture

Define canonical objects and state owners; create the happy path, alternate paths, undo/history, errors, recovery, navigation, search, filters, saved views, settings, admin, and support diagnostics.

### 3. Storyboard first value

Map cold launch through first rendered state, meaningful action, understood feedback, useful result, saved continuity, optional identity investment, and self-chosen next goal. Budget every account, permission, download, import, tutorial, and payment interruption.

### 4. Sweep the complete capability portfolio

Evaluate identity, accounts, data lifecycle, creation/editing, offline/sync, collaboration, sharing, social/community, notifications/inbox, commerce, integrations, AI/automation, admin/support, feedback/reviews, analytics/experiments, cross-promotion, update adoption, safety, platform adapters, accessibility, localization, low-end tiers, and every requested addition. Assign every row a disposition and specialist handoff where applicable; fully specify every `integrate-now` item and exact `reuse-scale-ready` integration. A sweep prevents omission; it does not force an incoherent feature into a narrow utility.

### 5. Design retention and durable ownership

Map the recurring value loops, progress/continuity, saved work, customization, goals, collaboration, content, recognition, and comeback paths selected by the promise. Specify the Durable Investment, Release Benefit, Cross-Promotion Placement, Refund Consequence, and Review/Feedback handoff contracts where applicable; otherwise preserve the capability disposition.

### 6. Define quality and reach

Set contextual startup, interaction, frame, memory, storage, network, battery, thermal, sync, error, accessibility, and localization budgets for selected capabilities against representative devices/browsers. Design responsive/adaptive views and progressive enhancement for every selected platform.

### 7. Specify trust and operating behavior

Threat-model selected and risk-relevant authentication, account recovery, privacy, deletion/export, payments/refunds, collaboration, sharing, UGC, minors, AI, abuse, moderation, support, backups, incidents, migration, and shutdown surfaces; verify that unselected modules remain absent. Make every enforcement action auditable and appealable.

### 8. Define validation and implementation handoffs

Sequence verified slices that converge on the complete selected target. Give every stage an artifact identity, hypothesis, required automated and user evidence, pass/watch/fail predicates, next action, and recovery expectation. Synthetic agents expand coverage but cannot prove comprehension, cultural meaning, trust, usefulness, or delight.

## Hard gates

Reject or redesign an output that:

- defers a requested or promise-essential legitimate capability because of staffing, calendar, implementation cost, missing users, uncertain demand, or speculative ROI;
- forces product-incoherent social, community, collaboration, commerce, AI, or other capability into an app without user value, or treats the capability sweep as a feature checklist;
- uses `contract-ready` or `not-applicable` as a staging label for selected work;
- proposes a conventional MVP, later hardening, manual operations, or future port/replatform phase for a selected capability, or cuts selected scope for speculative ROI;
- copies game levels or streak gates into app utility, or hides a feature behind arbitrary tenure/spend/engagement;
- overwhelms the primary workflow merely because every primitive exists;
- makes profile creation, avatar customization, permissions, account signup, or notification consent a cold-start toll before value without a semantic need;
- uses creations, history, identity, relationships, data, or streaks as hostage value;
- sentiment-gates reviews, star-steers, rewards ratings, suppresses unhappy users, or assumes one platform's review flow applies everywhere;
- rewards update installation without verified activation/value, or couples an update reward to review, rating, permission, ad click, spend, or forced referral;
- auto-bans an ordinary refund, revokes unrelated data/access, or uses surprise debt instead of the refund and payment specialists' ledger/reconciliation contract;
- calls notification delivery a retention reason, raw shares virality, or gross engagement success without trust/fatigue countermetrics;
- claims all-platform or all-age reach without HTML5/browser behavior, input adaptation, age modes, child privacy/safety, platform authority, and measured minimum-device evidence;
- confirms writes, purchases, entitlements, deletion, or sharing before authoritative commitment without correction semantics;
- omits offline/conflict, undo/recovery, export/delete, support/admin diagnostics, accessibility, i18n, privacy, telemetry, migrations, rollback, or autonomous maintenance where applicable;
- claims `scale-verified` without measured evidence against the declared workload and failure envelope, or `production-proven` without released identity and observed live behavior;
- invents an artifact digest, makes an upstream blueprint depend on a downstream specialist, or creates a circular artifact graph;
- allows an autonomous model to rewrite its own constraints, consent, prices, entitlements, enforcement severity, spend, evaluation gates, or promotion authority.

## Output contract

Produce one **App Design Blueprint** containing:

1. draft artifact identity or sealed envelope, plus evidence labels;
2. user/job/context, promise, wedge, business model, platforms, audience modes, non-goals, and success contract;
3. object model, state-authority map, workflows, information architecture, error/undo/recovery model;
4. first-value beat map and friction budget;
5. complete capability portfolio with disposition and reason, complete selected target, build, availability, presentation, scale/failure, proof, dormant-state, migration, telemetry, and recovery states;
6. selected recurring-value, durable-investment, identity/personalization, collaboration/social, and comeback decisions, including exact non-applicable dispositions;
7. selected monetization value exchange plus app-side refund, rewards, update adoption, cross-promotion, review/feedback, and marketing integration contracts; otherwise the exact disposition and zero-cost boundary;
8. selected platform/input/HTML5/PWA, desktop OS experience/integration, offline/sync, accessibility, i18n, security/privacy, low-end quality, and experience-expression matrix, plus exact dispositions for unselected adapters;
9. implementation and maintenance handoff with owners, dependency order, acceptance evidence, exposure/recovery behavior, and observed-state requirements;
10. event/metric/experiment plan with selected value, quality, trust, fatigue, fairness, commercial, and support countermetrics;
11. specialist handoff-request manifest with contract and acceptance tests; include digests only for already sealed inputs;
12. validation roadmap, hard blockers, unresolved hypotheses, and next proofs.

## Routing boundaries

- `app-design-blueprint` owns whole-app coherence and app-side capability semantics.
- `game-design-blueprint` owns a product whose primary promise is play, mastery, fantasy, and game progression; gamification does not automatically make an app a game.
- `product-lifecycle-architect` owns a cross-domain product program dependency and delivery graph spanning at least three lifecycle domains.
- `refund-and-support-flow-review` owns refund consequences, repurchase, appeal, restrictions, and support; `payment-platform-readiness` owns provider/ledger correctness.
- `review-solicitation-policy` owns platform-specific authentic public review
  eligibility and request state; `product-feedback-learning-loop` owns universal
  private feedback, authorized review ingestion, support/product routing, and
  close-loop behavior.
- Use `notification-strategy-review`, `daily-reward-and-streak-review`, `referral-loop-review`, `promotion-campaign-review`, `product-analytics-instrumentation-review`, `offline-sync-conflict-review`, and `ad-monetization-review` for their detailed artifacts.
- `app-store-distribution-readiness` owns channel submission/release evidence; `marketing-automation-blueprint` owns the multi-channel marketing control plane.

## Completion check

The blueprint is ready for composition and implementation only when another agent can identify what value the app creates, how every workflow and state behaves, why every swept capability is `integrate-now`, `reuse-scale-ready`, `contract-ready`, `not-applicable`, or `floor-blocked`, which selected capabilities have complete scale-ready targets, which selected legitimate features are available without artificial gates, which conditional specialist artifacts are required, how selected HTML5/mobile/desktop and global/age modes differ, what evidence earns each proof state, and how the product degrades, recovers, and learns without leaving a future hardening or maintenance project. No selected capability may be deferred for conventional human scarcity, and no irrelevant feature may substitute for app coherence.
