# Developer Adoption Contract

Use this reference to make the developer journey a decision system rather than a
docs checklist.

## Contents

- [Evidence discipline](#evidence-discipline)
- [Canonical state model](#canonical-state-model)
- [First useful success contract](#first-useful-success-contract)
- [Job-to-surface decision table](#job-to-surface-decision-table)
- [Quickstart and sample contract](#quickstart-and-sample-contract)
- [Error and diagnostic contract](#error-and-diagnostic-contract)
- [Measurement contract](#measurement-contract)
- [Minimum event envelope](#minimum-event-envelope)
- [Scale and verification](#scale-and-verification)

## Evidence discipline

Tag every material input:

- `given`: supplied by the task but not independently checked;
- `observed`: seen in an artifact or runtime, with source and access time;
- `verified`: reconciled against the current canonical owner or a repeatable test;
- `inferred`: conclusion from named evidence and assumptions;
- `decision`: an approved product choice, not an observed fact;
- `authority-pending`: required current truth that is absent or conflicting.

Current-authority inputs can include product manifests, API/SDK schemas, package
registries, supported-runtime policy, auth configuration, environment contracts,
pricing and quota authorities, status and incident surfaces, changelog and
deprecation policy, analytics schemas, support routes, and certification policy.
Record owner, version or effective date, access time, and conflict resolution.

## Canonical state model

Use states that represent developer progress, not page views:

```text
discovered -> fit_confirmed -> setup_started -> first_useful_success
     |              |               |                    |
     v              v               v                    v
not_a_fit      prerequisite_gap  setup_blocked     success_unverified

first_useful_success -> integration_built -> production_ready -> launched
          |                    |                  |              |
          v                    v                  v              v
    next_step_unknown    failure_unhandled   evidence_gap   production_degraded

launched -> retained_success -> expanded
   |              |               |
   v              v               v
support_assisted  upgrade_due  capability_requested

upgrade_due -> upgrade_started -> upgrade_verified
      |                 |                 |
      v                 v                 v
deprecation_risk  migration_blocked  stable_on_new_version
```

For every transition specify:

| Field | Required meaning |
| --- | --- |
| Population | Who is eligible for this transition |
| Trigger | Developer or system event that starts it |
| Entry evidence | Authoritative state required before entry |
| Success evidence | Product/server result that proves completion |
| Time window | Measurement window; use a parameter until authorized |
| Failure classes | Expected blocker taxonomy, including dependency outage |
| Recovery | Self-serve, automated, or support-assisted next path |
| Owner | Canonical product/content/engineering/support owner |
| Communication | Developer-visible state, next action, and lifecycle notice |

Do not flatten distinct lanes when the job, runtime, auth mode, data sensitivity,
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

| Developer question | Canonical source | Best projection | Required proof | Common failure |
| --- | --- | --- | --- | --- |
| Is this for my job? | Product capability contract | Positioning plus real output | Fit decision by segment | Generic feature list |
| Can I run it safely? | Runtime/auth/environment contract | Clean quickstart | Confirmed useful result | Hidden prerequisite |
| Can I integrate it? | API/SDK/event contract | Production-shaped guide/sample | Failure-path conformance | Toy happy path only |
| Why did it fail? | Error and trace contract | Inline diagnostic plus catalog | Reproducible correlation | Opaque message |
| Can I operate it? | Reliability/limits/status contract | Dashboard and run guide | Observable dependency state | No owner or next action |
| What changed? | Release/deprecation authority | Changelog and migration path | Versioned compatibility proof | Surprise breakage |
| Can I launch? | Certification/capability policy | Evidence checklist | Authorized capability state | Badge without evidence |
| How do I get help? | Support routing contract | Contextual route | Secret-safe reproducible packet | Generic ticket dead end |

Keep one canonical fact source. Generate reference pages, SDK snippets, examples,
dashboard labels, error links, and lifecycle notices from that source when their
semantics are identical. When a projection requires editorial context, record the
source version and validate its claims rather than copying the source manually.

## Quickstart and sample contract

Every supported quickstart must declare:

- target job, lane, runtime and supported version range;
- prerequisites and automated preflight where possible;
- package/artifact identity and integrity source;
- sandbox or safe environment and credential scope;
- runnable commands/code with no hidden local state;
- expected product-confirmed result and correlation evidence;
- expected timing as a parameter or measured distribution, never a promise by
  guess;
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

Do not include secrets, tokens, raw sensitive payloads, hidden risk thresholds,
or internal-only evidence. Ensure support can correlate the safe key to canonical
telemetry without asking the developer to expose credentials.

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
Never publish a metric without source authority, deduplication unit, window,
late-arrival policy, and known coverage limits.

## Minimum event envelope

```text
event_id / occurred_at / received_at / developer_org_id / app_or_integration_id
journey_id / lane / job / state_from / state_to / environment
surface / artifact_id / artifact_version / contract_version
outcome / failure_class / correlation_present / support_route
evidence_authority / consent_or_collection_basis / schema_version
```

Prefer server or authoritative-system transitions for success. Client events can
describe intent and friction, but must not silently become proof of fulfillment.

## Scale and verification

- Store journey, surface, error, example, and certification contracts as typed,
  versioned data where the product permits.
- Generate repeated projections and translations from canonical semantics while
  preserving reviewed locale-specific text and code conventions.
- Run quickstarts in clean matrices for supported lanes and inject expected
  failure conditions.
- Reconcile docs/package/runtime version claims and alert on orphaned projections.
- Sample real support failures into privacy-safe replay fixtures.
- Preserve agent or authorized-operator intervention as an audited exception with
  reason, scope, expiry, and feedback into the product—not an undocumented
  parallel system.
