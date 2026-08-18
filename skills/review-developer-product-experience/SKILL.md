---
name: review-developer-product-experience
description: "Review developer product experience and produce one actionable assessment."
---

# review-developer-product-experience

# Review Developer Product Experience Review

Produce one **Developer Adoption Contract** that makes a developer product fast
to evaluate, safe to integrate, observable in production, and maintainable across
versions. Treat docs, SDKs, errors, sandboxes, dashboards, certification, and
support as one product journey rather than separate content projects.

## Atomic boundary

Own the external developer jobs and personas, discovery-to-production journey,
success confirmation, developer-facing surfaces, sandbox experience,
integration certification, diagnostics, lifecycle communication, support route,
experience metrics, and automation contract. Consume API/SDK implementation,
identity, quota, billing, analytics, security, privacy, and delivery facts from
their canonical owners; those owners retain their system designs.

## Resource routing

- Read `references/developer-adoption-contract.md` when onboarding, first success, integration state, diagnostics, support, or adoption matter.
- Read `references/sandbox-certification-operations.md` when sandbox access,
  risky capabilities, partner/app approval, production promotion, badges, or
  recertification matter.

## Source verification

Retrieve current product surfaces, supported runtimes, package versions, API and
SDK contracts, authentication setup, sandbox capabilities, quotas, pricing,
status, deprecation policy, certification rules, support routes, and privacy or
security constraints at execution. Record unavailable facts with their owners;
current truth comes from live authority. Historical READMEs, examples,
benchmarks, and remembered provider behavior provide context.

## Operating rules

1. Define developer segments by job, environment, integration shape, production
   consequence, and starting knowledge. Design distinct journeys where language, platform, partner status,
   experience, or enterprise constraints change the job.
2. Define a server- or product-confirmed **first useful success**, not signup,
   package install, docs view, or key creation. Specify eligibility, evidence,
   time window, and what the developer can do next.
3. Model discovery, evaluation, setup, first success, production hardening,
   launch, stable operation, expansion, upgrade, and exit as explicit states.
   Include blocked, recovery, abandonment, re-entry, and support-assisted paths.
4. Map each developer job to one canonical source and the smallest useful
   surface: concept, quickstart, reference, runnable sample, SDK/CLI behavior,
   dashboard, diagnostic, changelog, migration guide, or support workflow.
   Keep one current source for each fact and verify every projection against it.
5. Make quickstarts executable from a declared clean environment. Include
   prerequisites, exact version scope, safe credentials, expected observable
   result, likely failure branches, cleanup, and the production-shaped next step.
6. Keep sandbox and production identities, credentials, data, money, messages,
   webhooks, listings, quotas, and side effects unmistakably separate. Provide
   synthetic or approved resettable data and state which claims require
   production-shaped evidence.
7. Treat errors and diagnostics as developer UX. Preserve machine-readable code,
   correlation key, retryability, safe cause, next action, relevant scope, and a
   versioned help target without exposing secrets or risk logic.
8. Design production readiness around the integration's actual failure modes:
   secret handling, least privilege, idempotency, retries, timeouts, pagination,
   webhook verification/replay, observability, data lifecycle, limits, and
   rollback. Hand implementation requirements to the owning engineering system.
9. Bind certification to a result record and production capability decision,
   not attendance or a badge. Define expiry and recertification triggers for
   material contract, SDK, webhook, scope, policy, security, or ownership change.
10. Measure the state transition and denominator, not vanity volume. Pair first
    success, production adoption, retained successful use, upgrade completion,
    and self-serve recovery with abandonment, time/effort, errors, support load,
    stale guidance, and affected cohorts.
11. Build for scale at first delivery: reusable content and examples,
    contract-tested quickstarts, isolated test
    tenants, policy-driven capability grants, evidence-based certification,
    automated freshness checks, lifecycle notifications, diagnostics, and
    recertification queues. Keep reversible operator escape hatches and audit.
12. Distinguish supplied facts, observed behavior, assumptions, and product
    decisions. Adoption numbers, certification results, supported versions,
    successful outcomes, performance claims, and production safety use their
    named current sources.

## Workflow

### 1. Frame the journey and authority

Identify developer jobs, personas, languages/runtimes, integration surfaces,
environments, current sources, first useful success, production consequence, and
the exact decision under review. Record unknown or conflicting authority.

### 2. Map the developer journey

Map states, entry criteria, observable success, blockers, recovery, exit, owner,
and evidence from discovery through retained production use and upgrade. Segment
the journey where prerequisites or risk genuinely differ.

### 3. Design the experience system

Create the job-to-surface map, quickstart and sample contracts, credential and
sandbox experience, error/diagnostic contract, production-readiness checklist,
support handoff, lifecycle communication, and accessibility/localization needs.

### 4. Define certification and operations

Define capability-specific tests, certification records, production decisions,
recertification triggers, failure and retry paths, freshness ownership,
documentation checks, audit events, and reversible automation.

### 5. Verify outcomes

Run clean-environment journey tests and failure injection across supported lanes.
Verify user-visible results against authoritative system evidence. Define metric
denominators, quality checks, cohort cuts, alerts, and feedback routes without
claiming production performance before measurement exists.

## Owner handoffs

- Hand API/SDK schema, compatibility, deprecation implementation, and reliability
  engineering to the owning product repository and public contract.
- Use `review-developer-quota-credit-abuse` for developer quota, free-credit,
  costly-operation, trust-graduation, and abuse-economics policy.
- Use `review-product-abuse-risk` for cross-product abuse controls and case
  evidence outside the developer journey.
- Use `review-product-analytics-instrumentation` to implement the measurement
  contract; this skill defines the developer outcome and required evidence.
- Use `price-saas-subscription` and `build-payment-readiness` for packaging,
  price, payment, ledger, or entitlement authority.
- Use `design-app-product` when the whole application experience, rather than
  the developer integration journey, is the independent artifact.
- Use the owning release path, `run-incident-response`, the owning product
  repository, and `design-privacy-lifecycle` for shipped proof, incidents,
  controls, and privacy.
- Use `build-distribution-readiness` for the executable artifact set, installers,
  package-manager adapters, upgrades, uninstall, and publication readback of a
  CLI named by this adoption journey.

## Acceptance conditions

Acceptance conditions:

- first success is a developer-observed useful product outcome;
- success, blocked, recovery, and abandonment paths include server/product evidence;
- routine quickstarts use synthetic or resettable data, test credentials, and
  controlled side effects;
- certification includes contract, failure, security, data, support, version,
  and observed-path evidence;
- one canonical API source drives docs, samples, SDKs, and dashboards with drift detection;
- limits, pricing, auth, data handling, compatibility, and breaking-change
  policy are visible before integration effort;
- production grants and irreversible denial require transparent evidence,
  review, expiry, recovery, audit, and safe developer explanation; and
- adoption and quality reports define population, transition, observation
  window, evidence authority, and uncertainty.

## Output contract

Produce one **Developer Adoption Contract** containing:

1. artifact name and revision, decision, developer segments/jobs, environments,
   current sources, first useful success, and unresolved facts;
2. discovery-to-retained-use journey with entry and exit conditions, blockers,
   recovery, abandonment, support, upgrade, and ownership;
3. job-to-surface and source map for docs, examples, SDK/CLI, dashboard,
   diagnostics, changelog, migration, certification, and support;
4. quickstart, credential, sandbox, error, production-readiness, and lifecycle
   communication contracts;
5. certification results, capability decisions, expiry, recertification,
   restoration, and audit behavior when applicable;
6. scale operations, documentation reuse, contract tests, freshness controls,
   failure behavior, reversible operations, and specialist handoffs;
7. decision-grade metrics with population, numerator, denominator, window,
   authority, cohort cuts, quality checks, and source-backed performance claims.

The artifact is complete when a new agent can trace each supported developer lane
from intent to verified production value, recover every expected failure, locate
one current source for every material promise, and identify the owner of every
out-of-bound implementation decision.
