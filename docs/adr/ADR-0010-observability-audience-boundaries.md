---
status: accepted
date: 2026-07-21
owners:
  - SylphxAI
---

# ADR-0010: Separate operational observability from public disclosure

## Context

Agents need enough observability to understand behavior, diagnose failure,
act, and verify recovery. Previous guidance said that health, configuration,
migrations, queues, traces, metrics, and domain events should be inspectable,
but did not consistently name the audience. Agents could therefore optimize
for scrapeable evidence by copying raw internal process truth into public API,
OAuth, health, or customer error bodies.

That is a category error. Observability is an authorized operating capability;
publication is a product, status, support, incident, audit, legal, or protocol
decision. At the same time, forbidding every external operational fact would
break legitimate protocols and customer experiences.

## Decision

1. Raw logs, traces, profiles, topology, deployment/migration/cutover state,
   implementation identifiers, stack details, control knobs, provider
   internals, unrestricted payloads, cross-tenant evidence, and diagnostic
   hypotheses are protected evidence by default.
2. Protected does not mean unobservable. Authorized operators and narrowly
   privileged support/security roles receive correlated, queryable evidence
   with purpose, least privilege, tenancy, retention, redaction, and audit.
3. Public or customer-visible operational facts are separate intentional
   projections. Each requires a legitimate purpose, named audience,
   subject/tenant authorization where applicable, an allowlisted versioned
   minimum schema, stable compatibility semantics, and negative leakage tests.
4. Legitimate projections include protocol-defined errors, retry guidance,
   documented rate limits, opaque occurrence identifiers, a tenant's own
   operation or audit state, approved public incident/status updates, legal
   notices, and customer-owned telemetry in an observability product. Their
   existence does not authorize catch-all `debug`, `metadata`, `internal`, or
   `honesty` objects.
5. Public correlation identifiers are opaque and resolve to protected evidence
   inside the operator boundary. Public health or status cannot become a dump
   of infrastructure inventory merely because tests can scrape it easily.
6. The always-on constitution and binding engineering predicates carry the
   minimum non-disclosure floor. `operational-observability-review` owns the
   independently requested end-to-end observability artifact. Specialist
   Skills retain product analytics, agent traces, data reliability, security,
   privacy, and active incident ownership.
7. `data-quality-observability-review` separately owns a Data Reliability
   Contract for dataset and pipeline freshness, completeness, semantic drift,
   reconciliation, trust state, backfill, and consumer impact. Generic data
   quality must not be hidden inside product analytics or service telemetry.

## Consequences

- Observability remains mandatory on material paths without widening public
  contracts.
- Customer-visible operational UX remains possible, but it is intentionally
  modeled and tested rather than inherited from raw diagnostic schemas.
- Documentation, delivery readback, agent traces, incident communication, and
  runner-capacity views use the same audience boundary.
- Adding the two focused review Skills is justified by independently requested
  artifacts: an Operational Observability Contract and a Data Reliability
  Contract. Signal media and individual data checks remain references, not
  separate Skills.

## Verification

- Structural checks verify the compact constitution and binding engineering
  predicates carry the protected/operator versus external/projection rule.
- Routing fixtures distinguish operational observability from product
  analytics, data reliability, agent traces, active incidents, security threat
  modeling, and ordinary implementation work.
- Product implementations prove allowlisted public schemas and negative tests
  that reject secrets, internal topology/process state, control knobs,
  cross-tenant fields, and exploit-enabling details.
- Live verification uses intended authorized operator and customer/public
  channels separately; no public response is enlarged merely to act as an
  internal evidence transport.
