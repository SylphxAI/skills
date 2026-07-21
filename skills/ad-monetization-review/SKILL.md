---
name: ad-monetization-review
description: "Design or audit one complete in-product advertising system for apps, games, web, and content products: rewarded ads, interstitials, banners/native placements, offerwalls, mediation, payer suppression, reward authority, consent, age/territory modes, frequency and fatigue budgets, IAP/IAA cannibalization, fraud, experiments, and shutdown. Use when deciding ad formats, placements, rewards, provider portfolio, or ad economics; combine with an App or Game Blueprint only when whole-product coherence is also unresolved."
---

# Ad Monetization Review

Produce an **Ad Monetization Contract** that maximizes incremental retained
contribution without turning attention, privacy, gameplay, or core utility into
an interruption tax.

## Atomic boundary

Own ad-side placement semantics, eligible audiences, reward authority,
frequency/fatigue, provider/mediation portfolio, economics, experiments, and
shutdown. Own the ad domain's required measurement meanings, but let
`product-analytics-instrumentation-review` own the shared event identity,
schema/versioning, collection, and product-metric contract. Do not own
whole-app/game design, buyer payment ledgers, the broader game economy, one
marketing campaign, or provider SDK implementation details.

Use a draft artifact ID and consume sibling decisions by owner and explicit
contract. Let deterministic delivery tooling seal serialized versions and
digests later; never fabricate them in a design response.

## Agent-first invariant

Construct the complete production-shaped system now: provider adapters,
consent/age/territory modes, reward ledger, caps, payer states, mediation,
fraud, observability, experiments, kill switches, and reconciliation. Separate
construction from exposure. A disabled placement or provider performs zero SDK
initialization, request, tracking, asset download, background work, or public
call until its exact authority and exposure gate pass.

## Workflow

1. Label inputs `given`, `observed`, `assumed`, `hypothesis`, or `decision`.
2. Define product promise, audience/age modes, session loop, business model,
   IAP/subscription mix, platforms, minimum devices, consent regimes, and ruin
   boundaries.
3. Read `references/ad-monetization-systems.md`. Inventory every potential
   placement by user intent, natural break, frustration/safety state, format,
   expected latency, reward, cap, and degradation.
4. Segment new users, engaged non-payers, payers, subscribers/ad-free owners,
   lapsed users, child/unknown-age modes, high-frustration states, and
   accessibility/data-saver/low-end tiers. Define explainable eligibility and
   suppression reason codes.
5. Model reward flow as
   `eligible -> requested -> loaded -> started -> completed -> verified -> granted`
   with no-fill, timeout, abandonment, duplicate callback, provider dispute,
   rollback, and support correction branches.
6. Define global, format, placement, session, lifecycle-event, and user+campaign
   caps; cross-provider dedupe; cooldown; quiet/sensitive states; and an
   emergency kill switch independent of the client release.
7. Design mediation and provider adapters with consent-aware initialization,
   data maps, latency/no-fill budgets, revenue/impression reconciliation,
   provider leases, fraud controls, brand safety, and zero-cost dormant state.
8. Evaluate incremental retained contribution after provider/platform fees,
   IAP/subscription cannibalization, reward cost/inflation, churn, support,
   fraud, privacy risk, latency, battery, and low-end performance.
9. Specify candidate-specific tests, capped canaries, scale/hold/pause/withdraw
   predicates, automatic shutdown, and live readback.

## Source verification

Retrieve current platform/store advertising, consent, child-directed treatment,
rewarded-ad, offerwall, attribution, privacy, and provider SDK authority for the
exact platform, territory, audience mode, and release. Static reference text is
never a current compliance verdict. Unknown/stale authority disables exposure.

## When not to use

- Use `game-economy-review` when the primary artifact is currency/reward
  inflation, sources/sinks, progression, gacha, or payer fairness.
- Use `marketing-automation-blueprint` for external paid acquisition, creative
  spend, attribution, and lifecycle channel automation.
- Use `app-design-blueprint` or `game-design-blueprint` when ads are only one
  component of a whole-product design.
- Use `payment-platform-readiness` for purchases, receipts, entitlements,
  settlement, refunds, and finance-close authority.

## Guardrails

- Never place interstitials inside input/mastery, onboarding trust, payment,
  safety, accessibility, error recovery, or irreversible work.
- State the reward, duration/format expectation, qualification, cap, and failure
  behavior before start. Never falsely confirm an unverified reward.
- No targeted/personalized ads in child or unknown-age modes unless exact
  current authority permits; default to the safer mode.
- Do not punish consent refusal, create fake close buttons, force clicks, hide
  ad identity, or make ads the only practical path through core utility.
- Optimize neither impressions nor eCPM alone. Retention, IAP conversion,
  complaints, opt-out, latency, crashes, battery, fairness, support, and
  long-term value are mandatory countermetrics.
- An autonomous optimizer cannot change consent, child mode, reward value,
  placement class, payer suppression, spend/provider caps, or promotion gates.

## Output contract

Return one typed Ad Monetization Contract containing:

1. objective, audience/platform/age modes, monetization mix, assumptions, and
   ruin boundaries;
2. placement × format × state matrix with value, interruption, latency,
   eligibility, cap, degradation, and owner;
3. reward/verification/reversal state machine and ledger/idempotency contract;
4. consent, privacy, age/territory, provider, payer/ad-free, and support matrix;
5. mediation/provider adapter, dormant-state, no-fill, timeout, and shutdown
   design;
6. economics model with IAP/IAA cannibalization and long-term countermetrics;
7. ad measurement requirements and the product-analytics handoff for event
   schema, plus reconciliation, fraud/brand-safety, and support evidence;
8. experiment/canary plan with scale, hold, pause, withdraw, and live-readback
   predicates;
9. specialist handoffs by draft ID, owner, required input/output, and acceptance
   questions, without fabricated proof.

Complete only when another agent can implement every state, prove reward
authority and low-end behavior, explain every impression/suppression/grant, and
shut the system down without a client release.
