---
name: product-analytics-instrumentation-review
description: Design or audit one production product-analytics contract across decision questions, event/property schemas, semantic versions, client/server authority, identity and account merge, sessions, funnels/cohorts, experiments, attribution, billing/support joins, consent/privacy, SDK ports, offline delivery, data quality, backfills, metrics, dashboards, release gates, and drift monitoring. Use when trustworthy behavioral measurement is the independent artifact; use App/Product/Game Design for what to build.
---

# Product Analytics Instrumentation Review

Produce an **Analytics Event, Identity, and Metric Contract** that makes product
decisions reproducible without turning surveillance, dashboard convenience, or
client events into false authority.

## Atomic boundary

Own decision-to-signal mapping, event/property/metric semantics, identity/session,
consent/privacy, SDK/server collection ports, delivery/quality, warehouse/join
contracts, QA, dashboards, experiments, backfill, and drift. Do not own whole
product strategy, provider billing truth, marketing spend attribution control
plane, or feedback prioritization.

Use the [shared artifact envelope](references/product-artifact-envelope.schema.json)
and consume product, experiment, payment, support, privacy, and marketing
contracts by ID/version/digest.

## Agent-first invariant

Build the complete versioned measurement plane, consent modes, provider-neutral
ports, server validation, offline queue, schema registry, quality monitors,
backfill/correction, lineage, replay, and automated release gates now. A dormant
SDK initializes nowhere, sends nothing, and collects no identifier. Missing
volume never justifies postponing correct semantics or quality automation.

## Workflow

1. List decisions and machine actions first. For each, name the outcome,
   mechanism, segmentation, countermetrics, latency/freshness, confidence, and
   authority needed. Reject events with no declared decision consumer.
2. Read `references/product-analytics-instrumentation-patterns.md`. Map the
   canonical journey and state transitions, including pending, committed,
   failed, recovered, suppressed, reverted, and support-corrected outcomes.
3. Define an event namespace and semantic version; required/optional properties,
   types/enums/units, timestamps, IDs, causality, idempotency, actor/source,
   privacy class, retention, owner, and deprecation/migration.
4. Separate client intent/UI, server/business authority, provider/payment,
   experiment exposure, marketing touch, support case, quality/error, and
   derived metric inputs. Critical truth is server/provider authoritative.
5. Define anonymous/device/user/account/organization identities, login/logout,
   guest upgrade, merge/split, deletion, shared devices, cross-platform,
   pseudonymization, and no-consent/child/territory modes.
6. Specify consent-aware SDK ports, lazy initialization, offline/batch/retry,
   sampling, late/out-of-order/duplicate handling, bot/internal traffic,
   clock/timezone, data residency, deletion/export, and zero-cost dormant state.
7. Define experiment assignment/exposure, attribution windows/dedupe, billing
   and support joins, metric SQL/semantic layer ownership, dashboard freshness,
   dimensional completeness, and source lineage.
8. Build fixtures for every event/version/platform/state; contract validation,
   golden journeys, synthetic monitoring, anomaly/freshness/volume/null/enum
   checks, backfill/correction, release blocking, and live readback.

## Source verification

Retrieve current analytics/ads SDK, platform privacy manifest, consent, child
and regional privacy, ATT/device identifier, cookie/storage, data-residency,
deletion/export, and provider quota/retention authority. A vendor default is
never the product's consent or retention policy.

## When not to use

- Use `app-design-blueprint`, `game-design-blueprint`, or
  `product-lifecycle-architect` when the primary artifact is product behavior or
  a cross-domain delivery program, not measurement implementation.
- Use `marketing-automation-blueprint` for spend, channel attribution decisions,
  creative automation, and budget/shutdown control.
- Use `review-solicitation-and-feedback-loop` for qualitative feedback/review
  ingestion, evidence clusters, support routing, and product close-loop.
- Use `payment-platform-readiness` for payment/entitlement/settlement authority;
  analytics only consumes its signed/authoritative projection.

## Guardrails

- Do not instrument everything or collect data “just in case.” Minimize by
  declared decision and retention need.
- No client event, dashboard, or model inference may grant entitlement, settle
  money, enforce policy, or overwrite operational truth.
- Do not merge identities without explicit rules, consent/authority, reversibility,
  and deletion semantics.
- Never silently change an event or metric meaning. Version, dual-write/read,
  backfill or annotate discontinuity, and migrate consumers.
- Dashboard freshness/coverage and model confidence are not product success;
  retain value, quality, trust, fairness, privacy, and support countermetrics.

## Output contract

Return one typed Analytics Event, Identity, and Metric Contract with:

1. decision-to-signal/countermetric map and authority classification;
2. event/property schema registry, semantic versions, lineage, owners, privacy,
   retention, and deprecation/migration;
3. identity/session/account merge/split/logout/delete model;
4. client/server/provider/experiment/marketing/support collection and join map;
5. consent/age/territory/platform modes, SDK ports, dormant/offline/retry,
   sampling, dedupe, and correction;
6. canonical metric definitions and dashboard/consumer contracts;
7. fixtures, golden journeys, data-quality SLOs, anomaly/backfill, release gate,
   canary, and live-readback plan;
8. digest-pinned sibling handoffs.

Complete only when every metric traces to versioned events and authority, every
event has a decision/owner/privacy lifecycle, and synthetic plus live journeys
prove exact-candidate data quality.
