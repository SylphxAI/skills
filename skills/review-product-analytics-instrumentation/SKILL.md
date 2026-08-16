---
name: review-product-analytics-instrumentation
description: "Review analytics events, identity, and metrics so product decisions stay reproducible without treating client events as false authority."
---

# Review Product Analytics Instrumentation

Produce an **Analytics Event, Identity, and Metric Contract** that makes product
decisions reproducible without turning surveillance, dashboard convenience, or
client events into false authority.

## Scope

Own decision-to-signal mapping, event/property/metric semantics, identity/session,
consent/privacy, SDK/server collection ports, delivery/quality, warehouse/join
contracts, QA, dashboards, exposure measurement, backfill, and drift. Whole
product strategy, provider billing truth, marketing spend attribution control
plane, experiment decisions, and feedback prioritization remain with their owners.
Service/runtime telemetry, health, SLOs, alerting, and operator diagnostics are
operational observability, even when the same pipeline also carries product
events. Keep their purposes, schemas, access, retention, and authorities
separate.

Read `references/data-quality-and-metric-layer.md` when the request includes
warehouse or semantic metrics, conflicting dashboards, dataset trust states,
quality monitoring, backfill, certified metrics, access, or cross-source
reconciliation. Product measurement quality belongs here; generic data
platform access, pipeline engineering, AI dataset assurance, billing truth,
and incident implementation remain with their canonical engineering, payment,
and applicable binding Skills owners.

Use the product repository's existing records when composing with other product
work. For a narrow audit, include only the contract surfaces needed by the
declared decisions. A disabled SDK has zero initialization, transmission, and
identifier collection.

## Workflow

1. List decisions and automated responses first. For each, name the outcome,
   mechanism, segmentation, countermetrics, latency/freshness, confidence, and
   authority needed. Record events with a declared decision consumer.
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
   correction and backfill policy, and release checks for the affected behavior.

## Current sources

Retrieve current analytics/ads SDK, platform privacy manifest, consent, child
and regional privacy, ATT/device identifier, cookie/storage, data-residency,
deletion/export, and provider quota/retention authority. The product owner sets
consent and retention policy explicitly; vendor defaults remain provider settings.

## Principles

- Collect the events a declared decision and retention need require.
- Entitlement, money settlement, policy enforcement, and operational truth stay with their owners. Client events, dashboards, and model inference are measurement.
- Identity merge uses explicit rules, consent/authority, reversibility, and deletion semantics.
- Event and metric meaning changes are versioned, dual-written or dual-read, backfilled or annotated, and consumed by a migration.
- Product success is retained value, quality, trust, fairness, privacy, and support. Dashboard freshness and model confidence are measurement health.

## Output

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
   release condition where warranted, and live-readback plan;
8. explicit sibling handoffs where the measurement contract consumes another
   domain's authority.

Complete only when every metric traces to versioned events and authority, every
event has a decision/owner/privacy lifecycle, and synthetic plus live journeys
prove exact-candidate data quality.
