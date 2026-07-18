---
name: product-analytics-instrumentation-review
description: "Design or audit a product measurement contract: decision questions, event/property schemas, client/server authority, identity, consent, delivery, data quality, metric definitions, QA fixtures, dashboards, and drift. Use when trustworthy instrumentation is the independent artifact. Do not use for deciding product strategy, governing experiments, operating marketing attribution, or treating analytics as payment truth."
---

# Product Analytics Instrumentation Review

Produce an **Analytics Event, Identity, and Metric Contract** that makes product
decisions reproducible without turning surveillance, dashboard convenience, or
client events into false authority.

## Atomic boundary

Own decision-to-signal mapping, event/property/metric semantics, identity/session,
consent/privacy, SDK/server collection ports, delivery/quality, warehouse/join
contracts, QA, dashboards, exposure measurement, backfill, and drift. Do not own whole
product strategy, provider billing truth, marketing spend attribution control
plane, experiment decisions, or feedback prioritization.

Read `references/data-quality-and-metric-layer.md` when the request includes
warehouse or semantic metrics, conflicting dashboards, dataset trust states,
quality monitoring, backfill, certified metrics, access, or cross-source
reconciliation. Product measurement quality belongs here; generic data
platform access, pipeline engineering, AI dataset assurance, billing truth,
and incident implementation remain with their canonical engineering, payment,
and applicable binding Skills owners.

Use the shared artifact envelope only when composing with repository product
artifacts. For a narrow audit, include only the contract surfaces needed by the
declared decisions. A disabled SDK initializes nowhere, sends nothing, and
collects no identifier.

## Workflow

1. List decisions and machine actions first. For each, name the outcome,
   mechanism, segmentation, countermetrics, latency/freshness, confidence, and
   authority needed. Reject events with no declared decision consumer.
2. Read `references/product-analytics-instrumentation-patterns.md`. Map the
   canonical journey and state transitions, including pending, committed,
   failed, recovered, suppressed, reverted, and support-corrected outcomes.
   Load `references/data-quality-and-metric-layer.md` for warehouse, semantic
   metric, quality, trust-state, reconciliation, or backfill work.
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
7. Define any consumed experiment exposure, attribution, billing, and support
   joins without taking ownership of those domains; specify metric definition
   ownership, dashboard freshness, dimensions, and source lineage.
8. Build representative fixtures for material event/version/platform/state
   combinations; add contract validation, golden journeys, quality checks,
   correction/backfill policy, and release gates proportional to failure risk.

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
- Use the owning product or experiment workflow to choose hypotheses, variants,
  exposure, and promotion; analytics records the agreed assignment and outcome.
- Use `product-feedback-learning-loop` for qualitative feedback/review
  ingestion, evidence clusters, support routing, and product close-loop. Use
  `review-solicitation-policy` for public review request eligibility and state.
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
7. fixtures, golden journeys, data-quality checks, correction/backfill, release
   gate where warranted, and live-readback plan;
8. explicit sibling handoffs where the measurement contract consumes another
   domain's authority.

Complete only when every metric traces to versioned events and authority, every
event has a decision/owner/privacy lifecycle, and synthetic plus live journeys
prove exact-candidate data quality.
