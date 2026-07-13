---
name: developer-product-experience-review
description: "Design or audit the end-user developer journey for an API, SDK, CLI, plugin, app integration, or developer platform across discovery, docs, installation, credentials, sandbox, first success, production readiness, diagnostics, support, certification, recertification, and retained use. Use when the primary artifact is a Developer Adoption Contract joining those surfaces into one measurable experience. Do not use for API or SDK implementation, API versioning policy alone, infrastructure capacity, developer quota or credit abuse policy, generic product abuse, or product analytics instrumentation alone."
---

# Developer Product Experience Review

Produce one **Developer Adoption Contract** that makes a developer product fast
to evaluate, safe to integrate, observable in production, and maintainable across
versions. Treat docs, SDKs, errors, sandboxes, dashboards, certification, and
support as one product journey rather than separate content projects.

## Atomic boundary

Own the external developer jobs and personas, discovery-to-production state
model, success evidence, developer-facing surfaces, sandbox experience,
integration certification, diagnostics, lifecycle communication, support route,
experience metrics, and automation contract. Consume API/SDK implementation,
identity, quota, billing, analytics, security, privacy, and delivery facts from
their canonical owners; do not redesign those systems here.

## When not to use

- Do not use for API/SDK implementation, compatibility architecture, low-level
  rate limiting, infrastructure capacity, or release engineering; hand the
  experience requirement to current Doctrine engineering/delivery owners.
- Do not use for developer quota/free-credit abuse policy or generic product
  abuse; use `developer-quota-credit-abuse-review` or
  `product-abuse-risk-review` respectively.
- Do not use for a whole app, analytics implementation, pricing/package design,
  or payment authority when the developer adoption journey is not being decided.

## Resource routing

- Read `references/developer-adoption-contract.md` for every task.
- Read `references/sandbox-certification-operations.md` when sandbox access,
  risky capabilities, partner/app approval, production promotion, badges, or
  recertification matter.

## Source verification

Retrieve current product surfaces, supported runtimes, package versions, API and
SDK contracts, authentication setup, sandbox capabilities, quotas, pricing,
status, deprecation policy, certification rules, support routes, and privacy or
security constraints at execution. Label unavailable facts; never turn a stale
README, example, benchmark, or remembered provider behavior into current truth.

## Operating rules

1. Define developer segments by job, environment, integration shape, production
   consequence, and starting knowledge. Do not design one journey for every
   language, platform, partner, hobbyist, and enterprise integrator.
2. Define a server- or product-confirmed **first useful success**, not signup,
   package install, docs view, or key creation. Specify eligibility, evidence,
   time window, and what the developer can do next.
3. Model discovery, evaluation, setup, first success, production hardening,
   launch, stable operation, expansion, upgrade, and exit as explicit states.
   Include blocked, recovery, abandonment, re-entry, and support-assisted paths.
4. Map each developer job to one canonical source and the smallest useful
   surface: concept, quickstart, reference, runnable sample, SDK/CLI behavior,
   dashboard, diagnostic, changelog, migration guide, or support workflow.
   Generate projections from structured sources where practical; do not maintain
   conflicting copies.
5. Make quickstarts executable from a declared clean environment. Include
   prerequisites, exact version scope, safe credentials, expected observable
   result, likely failure branches, cleanup, and the production-shaped next step.
6. Keep sandbox and production identities, credentials, data, money, messages,
   webhooks, listings, quotas, and side effects unmistakably separate. Provide
   synthetic or approved resettable data and state what the sandbox cannot prove.
7. Treat errors and diagnostics as developer UX. Preserve machine-readable code,
   correlation key, retryability, safe cause, next action, relevant scope, and a
   versioned help target without exposing secrets or risk logic.
8. Design production readiness around the integration's actual failure modes:
   secret handling, least privilege, idempotency, retries, timeouts, pagination,
   webhook verification/replay, observability, data lifecycle, limits, and
   rollback. Hand implementation requirements to the owning engineering system.
9. Bind certification to an evidence package and production capability decision,
   not attendance or a badge. Define expiry and recertification triggers for
   material contract, SDK, webhook, scope, policy, security, or ownership change.
10. Measure the state transition and denominator, not vanity volume. Pair first
    success, production adoption, retained successful use, upgrade completion,
    and self-serve recovery with abandonment, time/effort, errors, support load,
    stale guidance, and affected cohorts.
11. Build for scale at first delivery: structured content and examples, generated
    language/runtime projections, contract-tested quickstarts, isolated test
    tenants, policy-driven capability grants, evidence-based certification,
    automated freshness checks, lifecycle notifications, diagnostics, and
    recertification queues. Keep reversible operator escape hatches and audit.
12. Separate `given`, `observed`, `verified`, `inferred`, `decision`, and
    `authority-pending`. Never invent adoption numbers, certification evidence,
    supported versions, success proof, performance claims, or production safety.

## Workflow

### 1. Frame the journey and authority

Identify developer jobs, personas, languages/runtimes, integration surfaces,
environments, current sources, first useful success, production consequence, and
the exact decision under review. Record unknown or conflicting authority.

### 2. Build the adoption state model

Map states, entry criteria, observable success, blockers, recovery, exit, owner,
and evidence from discovery through retained production use and upgrade. Segment
the journey where prerequisites or risk genuinely differ.

### 3. Design the experience system

Create the job-to-surface map, quickstart and sample contracts, credential and
sandbox experience, error/diagnostic contract, production-readiness checklist,
support handoff, lifecycle communication, and accessibility/localization needs.

### 4. Bind certification and automation

Define capability-specific tests, evidence packages, production gates,
recertification triggers, failure/retry paths, freshness ownership, generated
projections, conformance tests, audit events, and reversible automation.

### 5. Verify outcomes

Run clean-environment journey tests and failure injection across supported lanes.
Verify user-visible results against authoritative system evidence. Define metric
denominators, quality checks, cohort cuts, alerts, and feedback routes without
claiming production performance before measurement exists.

## Owner handoffs

- Hand API/SDK schema, compatibility, deprecation implementation, and reliability
  engineering to the current Doctrine engineering and specification owners.
- Use `developer-quota-credit-abuse-review` for developer quota, free-credit,
  costly-operation, trust-graduation, and abuse-economics policy.
- Use `product-abuse-risk-review` for cross-product abuse controls and case
  evidence outside the developer journey.
- Use `product-analytics-instrumentation-review` to implement the measurement
  contract; this skill defines the developer outcome and required evidence.
- Use `saas-subscription-pricing` and `payment-platform-readiness` for packaging,
  price, payment, ledger, or entitlement authority.
- Use `app-design-blueprint` when the whole application experience, rather than
  the developer integration journey, is the independent artifact.
- Use current Doctrine delivery, incident, security, and privacy procedures for
  shipped-state proof, live incidents, engineering controls, or internal policy.

## Hard gates

Reject or redesign an output that:

- calls signup, install, key creation, or a docs visit first success;
- has no blocked/recovery/abandonment path or no server/product success evidence;
- uses production secrets, customer data, real charges, or uncontrolled side
  effects for a routine quickstart;
- claims certification from happy-path screenshots without contract, failure,
  security, data, support, and version evidence;
- duplicates API truth across hand-written docs, samples, SDKs, and dashboards
  without a canonical source and drift detection;
- hides limits, pricing, auth, data handling, compatibility, or breaking-change
  policy until after serious integration effort;
- automates production grants or irreversible denial from opaque evidence with no
  review, expiry, recovery, audit, or safe developer explanation;
- reports adoption or quality without a defined population, transition,
  observation window, evidence authority, and uncertainty.

## Output contract

Produce one **Developer Adoption Contract** containing:

1. artifact ID, decision, developer segments/jobs, environments, current
   authorities, evidence labels, first useful success, and unresolved facts;
2. discovery-to-retained-use state graph with entry/exit evidence, blockers,
   recovery, abandonment, support, upgrade, and ownership;
3. job-to-surface and source map for docs, examples, SDK/CLI, dashboard,
   diagnostics, changelog, migration, certification, and support;
4. quickstart, credential, sandbox, error, production-readiness, and lifecycle
   communication contracts;
5. certification evidence matrix, capability decisions, expiry, recertification,
   restoration, and audit behavior when applicable;
6. scale automation, generated projections, contract tests, freshness controls,
   failure behavior, reversible operations, and specialist handoffs;
7. decision-grade metrics with population, numerator, denominator, window,
   authority, cohort cuts, quality checks, and no unsupported performance claim.

The artifact is complete when a new agent can trace each supported developer lane
from intent to verified production value, recover every expected failure, locate
one current source for every material promise, and identify the owner of every
out-of-bound implementation decision.
