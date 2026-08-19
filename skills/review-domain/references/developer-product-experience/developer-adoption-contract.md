# Developer Adoption Contract

Use this reference to make the developer journey a decision system rather than a
docs checklist.

## Contents

- [Current product sources](#current-product-sources)
- [Developer journey](#developer-journey)
- [First useful success contract](#first-useful-success-contract)
- [Job-to-surface decision table](#job-to-surface-decision-table)
- [Quickstart and sample contract](#quickstart-and-sample-contract)
- [Error and diagnostic contract](#error-and-diagnostic-contract)
- [Measurement contract](#measurement-contract)
- [Journey measurement](#journey-measurement)
- [Scale and verification](#scale-and-verification)

## Current product sources

Use the current product manifest, API or SDK schema, package
registries, supported-runtime policy, auth configuration, environment contracts,
pricing and quota authorities, status and incident surfaces, changelog and
deprecation policy, analytics schemas, support routes, and certification policy.
Record the owner, version or effective date, and access time. Distinguish facts
read from those sources, observed behavior, assumptions, and product decisions.
Route conflicting or unavailable facts to the owning source.

## Developer journey

Measure progress through the developer's job:

```text
discover fit -> start setup -> reach first useful success -> build integration
prepare production -> launch -> retain successful use -> expand or upgrade
```

Prerequisite gaps, setup failures, unconfirmed results, production degradation,
support assistance, and migration issues stay attached to the affected journey
step with an owner and recovery path.

For every transition specify:

| Field | Required meaning |
| --- | --- |
| Population | Who is eligible for this transition |
| Trigger | Developer or system event that starts it |
| Entry condition | Product state required before entry |
| Success result | Product or server result that confirms completion |
| Time window | Measurement window; use a parameter until authorized |
| Failure classes | Expected blocker taxonomy, including dependency outage |
| Recovery | Self-serve, automated, or support-assisted next path |
| Owner | Canonical product/content/engineering/support owner |
| Communication | Developer-visible state, next action, and lifecycle notice |

Keep distinct lanes when the job, runtime, auth mode, data sensitivity,
or production consequence changes the prerequisites or evidence. Reuse shared
components while preserving lane-specific contract tests.

## First useful success contract

A valid first useful success:

1. corresponds to the developer's stated job;
2. produces a user-visible or machine-queryable result;
3. is confirmed by the authoritative product or service, not only local stdout;
4. uses a safe declared environment;
5. records the exact SDK/API/CLI/example and contract version;
6. leads to a named production-shaped next step;
7. can be distinguished from partial, duplicate, cached, mocked, or failed work.

Examples depend on the product: a verified webhook received and acknowledged, an
approved sandbox transaction state, a deployed plugin executing in its test
tenant, or a query whose authoritative result is returned. “Installed package”
and “HTTP 200” are insufficient unless they are themselves the promised value.

## Job-to-surface decision table

| Developer question | Current source | Product surface | Confirmation |
| --- | --- | --- | --- |
| Is this for my job? | Product capability contract | Positioning plus real output | Fit decision by segment |
| Can I run it safely? | Runtime/auth/environment contract | Clean quickstart | Confirmed useful result |
| Can I integrate it? | API/SDK/event contract | Production-shaped guide/sample | Failure-path behavior |
| Why did it fail? | Error and trace contract | Inline diagnostic plus catalog | Reproducible correlation |
| Can I operate it? | Reliability/limits/status contract | Dashboard and run guide | Observable dependency state and owner |
| What changed? | Release/deprecation authority | Changelog and migration path | Versioned compatibility result |
| Can I launch? | Certification/capability policy | Readiness checklist | Authorized capability state |
| How do I get help? | Support routing contract | Contextual route | Secret-safe reproducible context |

Keep one canonical fact source. Generate reference pages, SDK snippets, examples,
dashboard labels, error links, and lifecycle notices from that source when their
semantics are identical. When a projection requires editorial context, record the
source version and validate its claims rather than copying the source manually.

## Quickstart and sample contract

Every supported quickstart must declare:

- target job, lane, runtime and supported version range;
- prerequisites and automated preflight where possible;
- exact package and integrity source;
- sandbox or safe environment and credential scope;
- runnable commands/code with no hidden local state;
- expected product-confirmed result and correlation evidence;
- expected timing as a parameter or measured distribution, with any promise
  backed by current measured or contractual authority;
- failure branches for auth, configuration, network/dependency, quota, version,
  idempotency, async completion, and permission;
- cleanup and resource/credential disposal;
- production-shaped next step and limitations of the example.

Use generated examples only when a conformance test executes the generated form.
Static compilation alone does not prove behavior; screenshots prove neither
freshness nor semantic correctness.

## Error and diagnostic contract

Define each developer-facing failure by:

```text
error_code / safe_summary / operation / environment / contract_version
correlation_key / retryability / idempotency_effect / likely_cause_category
safe_next_action / current_status_dependency / docs_target / support_packet_fields
```

Diagnostic bundles contain approved, support-safe fields and opaque correlation keys. Ensure support can correlate
the safe key to canonical telemetry without asking the developer to expose credentials. Secrets, tokens, raw
sensitive payloads, hidden risk thresholds, and internal-only evidence remain in their governed systems.

## Measurement contract

Use named populations and transitions. Examples:

- first-success rate = eligible journeys with verified first useful success in
  the window / eligible journeys started in the window;
- time to first success = distribution from declared journey start to verified
  success, reported with censored/abandoned journeys;
- production adoption = eligible integrations with authoritative production
  activity / integrations that reached first useful success;
- retained successful use = launched integrations with successful meaningful
  activity in defined later windows / launched integrations eligible for them;
- self-serve recovery = blocked transitions resolved without support / blocked
  transitions with an actionable recovery path;
- upgrade completion = eligible production integrations verified on the target
  version before deadline / eligible production integrations;
- guidance freshness = tested projections passing against current source version
  / tested projections expected to match that source.

Also track error and abandonment class, support effort, accessibility/language,
runtime and auth lane, environment, version, cohort, and data-quality status.
Publish a metric only with source authority, deduplication unit, window,
late-arrival policy, and known coverage limits.

## Journey measurement

Use the product's existing analytics contract to record occurrence and receipt
time, developer organization, app or integration, journey, lane, job,
environment, surface and version, outcome or failure class, correlation key,
support route, collection basis, and schema version.

Prefer server or authoritative-system transitions for success. Client events describe
intent and friction; the authoritative transition proves fulfillment.

## Scale and verification

- Keep journey, surface, error, example, and certification facts in their current
  product sources.
- Reuse canonical semantics across documentation and translations while
  preserving reviewed locale-specific text and code conventions.
- Run quickstarts in clean matrices for supported lanes and inject expected
  failure conditions.
- Reconcile docs/package/runtime version claims and alert on orphaned projections.
- Sample real support failures into privacy-safe replay fixtures.
- Record agent or authorized-operator intervention with reason, scope, expiry,
  and feedback into the product.
