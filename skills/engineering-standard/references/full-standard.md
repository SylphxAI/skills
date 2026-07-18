# Engineering Standard

## Modern Technical Bar

Every durable technical design should move toward these properties when they
are relevant to the domain and blast radius:

- high-throughput and low-latency on the critical path;
- horizontally scalable, elastic, resilient, and observable under production
  load;
- type-safe, memory-safe, concurrency-safe, deterministic where practical, and
  verifiable by automated checks;
- secure-by-default, privacy-conscious, least-privilege, and auditable at
  boundaries;
- cost-efficient and resource-efficient, including CPU, memory, IO, network,
  storage, build minutes, and operational toil;
- idempotent, retry-safe, timeout-bounded, cancellation-aware, and
  backpressure-aware on every external side-effect path;
- composable, interoperable, portable, upgradeable, testable, operable,
  migration-safe, and rollback-safe;
- capable of near-native or native-level performance when the domain genuinely
  requires it.

These properties are constraints to price and verify, not slogans to paste into
every design. Apply the strongest relevant subset. For example, a static docs
change does not need a canary analysis contract, while a queue, ledger,
permission system, parser, runtime, AI gateway, or deploy controller should
prove the relevant concurrency, retry, idempotency, observability, security,
and recovery properties explicitly.

When two properties trade off, record the tradeoff in the smallest durable
home: code comment for a local implementation choice, test/benchmark for a
measurable behavior, ADR for material architecture or operational policy, and
Commercial ADR for product/business impact.

## Decision First, Contract And Code Second

Before broad implementation, create or update the owning repository ADR when a
material durable decision changes architecture, ownership, public contracts,
persistence, security/privacy posture, delivery semantics, or an enterprise
default. Record the context, alternatives, selected boundary, consequences,
migration/recovery, and verification intent while the decision can still guide
the implementation rather than explain drift afterward.

An ADR records **why** and the durable boundary. Specs, schemas, tests, and
executable policies define **what must be true**; source candidates implement
it. Investigation, comparison, and bounded prototypes may precede the ADR when
they are needed to make the decision, but broad implementation must not become
the accidental authority before the decision is recorded.

Do not create an ADR for ordinary implementation detail already governed by an
accepted decision or testable contract. Keep local algorithm choices, refactors,
and measurable behavior in code, comments, schemas, tests, or benchmarks at the
smallest durable altitude. Raw chat and brainstorming are evidence inputs, not
decision authority.

The bar is language- and tool-independent. The active matching engineering
profile selects current languages and tool classes; every selected stack proves
the same obligations with its native compiler, static analysis, lint,
dependency, test, contract, security, and runtime evidence.

## Language and tool selection

Load the active profile before choosing a language, framework, protocol, SDK,
database tool, or migration engine. Selection follows the Decision Quality
decision kernel: capability fit, ecosystem maturity, safety, interoperability,
portability, delivery cost, operational proof, and migration surface precede a
default. A deviation uses the profile's exception contract and repo ADR; a
repeated or clearly dominated default is amended centrally.

All selected stacks prove:

- schema-derived boundary contracts with one semantic authority;
- exhaustive typed handling of expected failures and loud unexpected defects;
- a pure decision core separated from external effects where it improves
  reasoning and replay;
- automated type/static, lint, test, dependency, contract, and silent-failure
  gates appropriate to the language;
- an observability, recovery, and supply-chain contract for production paths.

### Version currency and reproducibility

New projects start on the newest eligible production releases available at
bootstrap time; a static template catalog must not make a newly created project
obsolete on day one. An admitted bootstrap or dependency resolver queries the
selected toolchain's canonical release source under a declared freshness
budget, records the observation time and source identity, and resolves every
direct toolchain, runtime, framework, SDK, generator, plugin, and application
package to the latest supported release in the centrally selected channel that
satisfies the active profile and the project's declared platform and contract
constraints. Once that resolver and its evidence contract are active,
admission rejects a new project or newly introduced dependency whose recorded
direct version was already behind that eligible release at resolution time.

"Use latest" is a selection rule, not a floating-build mechanism. Toolchains,
application builds, tests, generators, release resolution, and deployed
artifacts may not depend on mutable `latest` tags, unbounded ranges, an unpinned
toolchain channel, or registry state that can change the same source revision's
result. Exact resolved versions, content or integrity digests where the
ecosystem supports them, immutable lock graphs, frozen/install-locked mode,
hermetic generation, and clean-lock regeneration checks reproduce the selected
latest graph. A published library may expose schema-validated bounded
dependency or peer ranges as its consumer compatibility contract; its own
build and release graph remains locked, and CI proves the declared lower bound,
newest eligible versions, and other risk-selected compatibility points.

Transitive packages converge toward the newest versions admitted by the direct
constraints and solver. Every retained older transitive version carries a
machine-visible constraint; when a newer resolution becomes available it opens
an exact upgrade candidate rather than mutating or invalidating the current
locked build. A successful candidate removes the older resolution. A failed
candidate becomes a typed expiring version gap and the repository may not claim
full currency while it remains.

Stable production, long-term-support, and preview/nightly are distinct release
channels. Only an active profile default, or a separately admitted typed
channel authority explicitly incorporated by that active profile, defines
which channel is production-eligible; selection evidence may inform a profile
candidate but cannot bind a repository by itself. A repository cannot silently
choose a slower channel. Within the admitted channel, the newest supported
release is the currency target. A preview, beta, release candidate, nightly, or
experimental tool never becomes the production default merely because its
version or publication time is newer. It requires an explicit active-profile
selection or a bounded experiment with an exact pin, compatibility corpus,
correctness backstop, exposure cap, kill condition, expiry, recovery, and
stable replacement path.

Existing projects continuously re-resolve currency from canonical release and
security sources. A newly published eligible release creates a separate
automated exact-version requalification candidate immediately. That candidate
runs the affected compile, static, contract, test, migration, security,
performance, and recovery gates selected by changed risk, plus every applicable
never-skip global gate; a successful candidate promotes without a human wait.
The current locked graph remains reproducible while proof is pending. A failed
candidate does not silently redefine the old version as current: it creates a
typed, machine-readable version gap that binds the blocked version,
incompatibility evidence, owner, expiry, recheck trigger, and forward-fix or
replacement condition. Gap expiry blocks further promotion unless a renewed
exception is admitted. Unsupported, end-of-life, revoked, or known-exploitable
versions are ineligible and may be fenced immediately according to their
security or support policy regardless of lockfile history. Repository
familiarity and installed prevalence never justify version lag.

### Static verification floor

No-human engineering moves every decidable defect as far left as the selected
ecosystem can prove it. A production path must fail before canonical landing
or effect promotion at the active lane's admission boundary when its
compiler, static analyzer, schema compiler, query analyzer, contract generator,
or build-time semantic check can determine that the path is invalid. Strict
language modes and warnings-as-errors are the default; unchecked casts,
untyped boundary values, generated-code staleness, ignored diagnostics, and
dynamic escape hatches may not silently reduce the proof surface.

The required outcome is compile-time **or admission-time** proof, not identical
compiler mechanics across languages. Where a language cannot express a proof
natively, CI runs the strongest deterministic schema-aware generator or
analyzer against the exact candidate inputs and treats its result as blocking.
Generated types and metadata remain derived artifacts: they bind their source
digest and tool version and fail freshness checks. A stack that cannot provide
an equivalent pre-landing admission proof for a critical boundary does not own that new
boundary without a repo ADR, measured evidence, containment, and a replacement
trigger.

Static success is never promoted into a broader runtime claim. Authorization,
live drift, data-dependent invariants, scheduling and transaction
interleavings, external availability, and performance remain runtime or
integration obligations and keep their own constraints, tests, telemetry, and
recovery proof.

### No runtime-first defect discovery

Production runtime must not be the first oracle for any known defect class. A
defect that is statically decidable blocks through compilation or deterministic
admission. A defect that depends on state, time, concurrency, distribution, or
an external system blocks promotion through the strongest pre-production
contract test, ephemeral integration environment, property/model test,
deterministic simulation, fault injection, replay, security check, load test,
or eval capable of exercising that failure class.

Inherently live facts still require runtime validation; removing those checks
would weaken the system. Their failure behavior is designed and proved before
promotion: inputs decode before use, authorization and invariants fail closed,
effects are timeout/cancellation/backpressure aware, mutations are idempotent,
expected failures are typed and exhaustive, unexpected failures are loud, and
telemetry plus automated recovery prove containment. A novel runtime condition
opens a typed defect class and a regression oracle before the next promotion;
it may not remain an accepted runtime-only surprise.

Language or tool limitations do not lower this floor. Compose a stronger
analyzer, generator, verifier, simulator, or boundary adapter, or select a
different stack for the boundary. A critical boundary with no credible
pre-production oracle is inadmissible except as a bounded experiment with an
explicit exposure cap, kill condition, owner, expiry, and recovery.

## Architecture

All durable product code uses the canonical
[Capability-first architecture](capability-first-architecture.md) from its first
generation. The architecture combines Strategic DDD, Tactical DDD,
Clean/Hexagonal dependency boundaries, Feature-first vertical slices inside
capabilities, and Functional Core, Imperative Shell (FCIS). Functional-
programming principles shape the core; they do not require every language or
effectful orchestration path to pretend to be purely functional. Small project size,
file count, or historical human implementation cost is not an exemption.

Use cohesive capability modules with dependency direction toward stable domain
policy. Domain decisions do not depend on framework, transport, persistence,
provider SDKs, or UI implementation. Application code orchestrates use cases;
ports publish required effects; adapters implement those ports; interfaces
translate external inputs and outputs. Cross-capability access uses published
contracts, application ports, or domain events rather than internals.

Published contracts include schemas, application ports, domain events, API
clients, and documented package exports. Do not import another capability's
domain internals, adapter internals, private UI components, or database helpers.

Keep modules cohesive, explicit, and replaceable. No size-based exemption may
hide a god responsibility at file, module, package, crate, service, or bounded-
context level. Split on a new responsibility, invariant, contract, adapter,
claim, proof, or ownership boundary—not mechanically on every behavior or an
arbitrary line count. Module semantics outrank physical filename count.

Use [language mappings](capability-first-language-mappings.md) for idiomatic
Rust, TypeScript, Python, and Dart shapes and
[examples](capability-first-examples.md) for the shared reference model.

Keep authoritative state explicit and horizontally scalable when the boundary
requires it. Process-local caches or coordination state must never masquerade
as durable truth. Persistent state, queues, blobs, indexes, and replicated
views declare ownership, consistency, recovery, and freshness.

## Implementation Shape

Prefer the simplest design that expresses the domain cleanly. One clear
function, schema, query, module, or generated contract beats a framework of
helpers that does not protect a real boundary. Add an abstraction only when it
removes demonstrated duplication, protects a stable boundary, or names a domain
concept that future code will reuse.

Before adding code, check whether the right move is to delete, fold, derive, or
move existing code to its canonical owner. Remove dead code, stale comments,
duplicated constants, unnecessary dependencies, and hand-maintained mirrors in
the same slice when they are on the touched path and safe to retire.

Keep pure decisions separate from side effects. Use functional composition,
typed effect systems, serverless, workers, or other architecture styles only
when they reduce state, clarify ownership, improve recovery, or lower
operational cost for the repo boundary; do not force them into glue code where
native primitives are clearer.

## Sources Of Truth

One concept has one semantic authority. The project declares the authoritative
schema, decision log, manifest, persistent model, design-token source, memory
surface, and implementation history appropriate to its boundary.

Derive validators, types, clients, transport projections, fixtures,
documentation, indexes, and read models from the authority where possible.
When a derived copy is necessary, record lineage, source version, freshness,
reconciliation, and rebuild or retirement behavior. A copy becomes drift only
when it can be authored independently or loses its provenance.

Do not maintain parallel contract definitions, database shapes, constants, or
client models by hand when generation or a single adapter can express them. If
a repository already has a different explicit authority, use it consistently
unless the task includes a migration.

## Source-Controlled Artifact Identity

Parallel-authored artifacts must not use self-assigned sequential numbers as
primary identity. This applies to ADRs, migrations, instruction migration packets,
generated issue markers, catalogs, registries, package version edits, route or
tool registries, env/config keys, queue/event names, and any other artifact that
multiple branches or agents may create concurrently.

Use one of these identity sources instead:

- allocator-backed identity such as the active delivery profile's candidate or
  issue locator, a release allocator, or a database sequence allocated by the
  database at runtime;
- collision-resistant generated identity such as timestamp plus slug plus hash,
  ULID/UUIDv7, content hash, or tool-native migration version;
- generated post-merge display ordering for registries and reports.

Do not treat display order as identity. A generated registry may sort items as
`1, 2, 3`, but branches edit the canonical source and let the registry
regenerate after merge.

Database row auto-increment is not banned when the database is the allocator.
Avoid leaking those IDs into public, cross-environment, offline-sync,
multi-region merge, or long-lived integration contracts unless the domain
explicitly accepts allocator-local identity. Use globally stable IDs when data
must move between allocators or survive environment merges.

Use the repository's declared artifact-identity conformance entrypoint for
read-only local, target-repository, or portfolio readback before claiming a repo's
parallel-authored artifact identity surface is clean.

## No-Human Engineering Patterns

No-human development rewards designs that are easy for tools to understand,
split, verify, and recover. Prefer these patterns when they fit the repo:

- **Functional Core, Imperative Shell**: keep domain decisions as pure functions and
  move IO, clocks, randomness, secrets, network calls, and database access to
  infrastructure adapters or typed effect runtimes at the boundary.
- **Typed failure algebra**: model expected failures as tagged errors and make
  route/job/tool boundaries exhaustively translate them into user-facing,
  API-facing, or retryable outcomes.
- **Silent-swallow gates**: swallowed errors are the defect class CI is
  otherwise blind to — a fallback turns a loud failure into green tests over
  wrong behavior, and no human reviewer exists to ask why a catch returns a
  default. Lint/gate the patterns mechanically: empty catch blocks, catch or
  catch-all returning a default value without a typed decision, error-channel
  narrowing without exhaustive handling, and retries that discard the final
  failure. Treat test-assertion weakening as a policy-grade diff, not a fix —
  [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  "Reward-hacking and execution-trace integrity" owns that rule (gate-weakening
  diffs ride the highest-scrutiny lane).
- **Schema-derived surfaces**: derive validators, types, interface descriptions, clients,
  fixtures, forms, and docs from the same schema source.
- **Declarative policy**: express permissions, rollout rules, config, manifests,
  and deployment intent as data that can be linted, diffed, and reconciled.
- **Architecture fitness functions**: add checks for dependency direction,
  forbidden imports, public export shape, generated-client freshness, migration
  replay, API compatibility, bundle/performance budgets, and catalog freshness.
- **Property and model-based tests**: use them for state machines, concurrency,
  queues, billing/ledger invariants, permissions, and parsers where examples
  alone miss interleavings.
- **Deterministic simulation**: use a controlled clock, randomness, scheduler,
  network/storage model, and replayable seed corpus for distributed,
  concurrent, or irreversible workflows whose important bugs require fault
  ordering or long-running interleavings. Keep it targeted by blast radius; see
  [`frontier-verification-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/frontier-verification-standard/references/full-standard.md).
- **Idempotent, replayable jobs**: every queue worker, cron, migration helper,
  and external side-effect path should have idempotency keys, retry policy,
  timeout policy, and replay/debug evidence.
- **Build graph awareness**: use affected-task detection, dependency graphs,
  caching, and remote execution where practical so merge queues stay fast
  without weakening required checks. Affected selection is a presubmit *speed*
  optimization safe only with a postsubmit full-suite backstop and a complete
  dependency graph; it is never a correctness or security control. See
  [`ci-admission-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/ci-admission-standard/references/full-standard.md) for the two-tier model,
  the never-skip global gate
  classes, and merge-queue flake/quarantine signal integrity.

## Active engineering profile

Current technology, typed-effect, contract/transport, database-change, and
AI-runtime selections resolve from the binding profile packages in
`SylphxAI/skills` plus current Control Plane organization-wide adoption state. This standard owns the
bar and proof obligations; the selected profile owns replaceable choices.
Repositories record only their local selected stack and exceptions, not a copy
of the technology stack profile.

## Frontend

Build the actual product experience first unless explicitly asked for a
landing page. Preserve the existing design system when one exists. For new UI,
make it intentional, accessible, responsive, and domain-specific, using the
repo's documented stack and the Modern Technical Bar with stable component
dimensions and responsive layout constraints.

Respect accessibility, i18n, and motion requirements: no hardcoded user-facing
strings when the repo uses i18n; motion respects reduced-motion preferences;
layouts stay stable across mobile and desktop. Use stable dimensions for
boards, grids, toolbars, counters, controls, and repeated UI so hover states,
labels, icons, pieces, loading text, or dynamic content cannot resize or shift the
layout.

Operational SaaS and enterprise tools prioritize dense, scannable, repeatable
workflows over marketing-style layouts. Games and expressive consumer
experiences may be more visual and animated, but must still be usable and
responsive.

For meaningful frontend changes, validate the rendered UI when practical:
check desktop and mobile behavior, text overflow, overlapping UI, missing
assets, layout shift, and reduced-motion behavior — and reject generic
template aesthetics (nested cards, decorative gradient blobs, one-note
palettes, visible instructional copy explaining obvious interactions).

## Boundaries

### Boundary contract system

Every public, cross-repo, cross-runtime, persistent, or independently versioned
boundary has one canonical contract representation. Generate consumer-native
types, validators, fixtures, documentation, compatibility analysis, and
transport bindings from it. Choose transport by consumer and operational needs;
do not create a second API design per client.

When a boundary supports more than one implementation language, its canonical
representation is language-neutral. Rust structs, TypeScript or Effect schemas,
Python models, Ruby classes, Dart classes, framework decorators, and
transport-specific request objects are generated projections or local adapters;
none may independently re-author the shared field, method, validation, error,
or lifecycle semantics. The backend implementation language does not become
the cross-language contract authority.

The authority carries field presence, validation rules, stable error details,
method semantics, and lifecycle metadata. Method semantics include
idempotency, authorization and tenancy scope, pagination, deadlines,
retryability, streaming/backpressure, and deprecation or sunset behavior where
applicable. Expected failures map through typed error details and protocol
status, never error-string matching.

CI gates source compatibility, semantic validation changes, generated
freshness, and a compile matrix for every supported consumer language. Code
generators and plugins are exact-version pinned; generated artifacts bind the
source and generator identities. High-risk or published contracts also prove
old-client/new-server and new-client/old-server behavior with wire/JSON fixtures
or an equivalent compatibility matrix.

Generated SDKs separate three concerns. A generated wire core owns serialization,
service signatures, and protocol errors. A thin language-native facade owns
ergonomics such as authentication configuration, pagination iteration,
cancellation, retries, and the language's typed failure model without copying
payload definitions. A public HTTP SDK may instead derive from the canonical
HTTP projection. Do not publish two independently evolving model sets in one
language. Every supported SDK language is named in the generation manifest and
must compile, package, decode the shared fixture corpus, and pass the same
ephemeral-server contract suite before the contract can land.

Public HTTP and event descriptions remain lineage-bound projections unless the
profile explicitly assigns them a distinct semantic slice. Projection-specific
paths, operations, broker bindings, security, and presentation metadata may be
owned there, but payload fields are not re-authored. Their linters and semantic
breaking checks compose with—rather than substitute for—the canonical contract
gate. A single-language private boundary may use a repo-local authority until
publication or another runtime justifies extraction. The active engineering
profile owns the current technology contract and transport selections.

Validation coverage is recorded per generated language and constraint class.
A constraint annotation is not universal proof merely because one runtime can
execute it. Structurally decidable incompatibility blocks through schema and
generated-consumer admission. Constraints without an admitted implementation
in every SDK language remain server-authoritative, fail closed at the service
boundary, and carry cross-language positive/negative fixtures; the SDK surface
must not claim local validation it cannot perform. Runtime validation remains
necessary for data-dependent, authorization, state, and external facts.

### AI and framework adapters

Select AI and application SDKs by required capability, boundary fit, maturity,
interoperability, data policy, runtime cost, and eval evidence. Framework
schemas and async shapes stay in infrastructure adapters and do not become a
second domain contract. Model/provider/runtime/policy choices bind exact
versions and requalification triggers through the eval contract in the
Frontier Verification Standard.

For persistence work, declare one schema and migration authority. Migration
identity is collision-resistant and changes are replay-tested. In development
or without live compatibility/state risk, use an exact-candidate one-step
cutover with recovery evidence. When demonstrated live data, availability,
compatibility, or external-effect risk exists, use expand/contract and prove
the compatibility and recovery path. Every static relational query is
compile-time or admission-time checked against the exact migration-derived
schema, database dialect, and relevant server version. Inputs and outputs carry
exact native or generated types for nullability, domains/enums, and row shape;
untyped row maps, unchecked result assertions, and independently authored ORM
models do not cross the persistence boundary.

Query layers use parameterized operations, indexed access paths, bounded
pagination or streaming, and idempotent mutation where the failure model
requires it. Unchecked static SQL and dynamically assembled SQL are
default-deny; schema-checked static SQL is allowed. A necessary dynamic query
uses a typed builder or a bounded exception that allowlists
identifiers, validates parse/prepare and result decoding against the candidate
schema, and records owner, expiry, evidence, and replacement trigger.

Admission reconstructs an ephemeral database from the complete migration
history, rejects drift, rebuilds and compares schema-derived projections, checks
all eligible queries, and runs the database contract suite. Database
constraints and runtime proof still own data-dependent integrity, permissions,
transaction isolation, locks, live schema drift, and query-plan behavior. The
active profile owns current tool selections and escape-hatch inventory.

For performance-sensitive touched paths:

- State the expected time and space complexity when it is not obvious from the
  code shape.
- Prefer indexed, batched, streaming, or database-side work over avoidable
  O(n²), unbounded memory, N+1 IO, or client-side filtering on growing data.
- Add or preserve a benchmark, query plan, metric, load test, or documented
  performance budget when the path can affect latency, throughput, cost, build
  minutes, bundle size, or resource saturation.
- Optimize only against a real constraint or measured baseline; do not add
  clever code that makes the common path harder to verify.

## Observability And Recovery

Design for horizontal scale and operational diagnosis:

- Structured JSON logs
- Trace IDs at external boundaries
- Metrics for important counters and latency
- Explicit retry schedules and timeouts at effect/runtime boundaries
- Transactional boundaries around state changes
- Idempotency for high-risk operations
- Health checks and clear failure modes
- Validation at every external boundary
- Least-privilege access
- Secrets only in environment variables or secret managers
- Structured error mapping with no swallowed failures

For no-human operations, observability is a contract:

- Propagate W3C trace context or an equivalent trace/span correlation scheme
  across HTTP, jobs, queues, tools, and external provider calls.
- Required log fields: timestamp, level, service, environment, version or commit,
  trace/span/request ID, actor/tenant where safe, operation, outcome, duration,
  error tag/cause, retry/attempt, and correlation IDs for external systems.
- Redact secrets and protected personal data at the boundary; do not rely on log
  consumers to filter sensitive fields later.
- Define purpose, field allowlist, access scope, retention/TTL, residency, and
  deletion or cryptographic-erasure behavior before collecting production
  evidence. Legal hold is explicit and scoped; “append-only” is not an excuse
  to retain protected payloads forever.
- Metrics need stable names, units, labels with bounded cardinality, and owners.
- Production-bound changes should state which traces, metrics, logs, SLOs,
  synthetic checks, or smoke checks prove the change.
- Logs without trace correlation are acceptable only for local tooling or
  intentionally offline scripts.

Concurrency and worker correctness:

- Queue workers, crons, and durable jobs need idempotency keys, durable state
  transitions, retry/timeout policy, cancellation behavior, and replay evidence.
- Locks used for correctness need fencing tokens, database constraints,
  transactional enforcement, or another monotonic guard. A lease that relies
  only on elapsed time is a coordination hint, not a correctness mechanism.
- CRDTs are reference tools for offline or true multi-writer collaboration; they
  are not the default consistency model for server-side product state.

## Comments And Code Documentation

Comments are part of maintainability and agent handoff. Write comments when
they preserve information that is not obvious from names, types, schemas, or
tests.

Comment required:

- Public APIs, exported functions, tools, CLI commands, events, config keys,
  migrations, and operational runbooks when future callers/operators need
  contract semantics.
- Domain invariants, business rules, permission rules, privacy/security
  constraints, and cross-project boundary assumptions.
- Non-obvious algorithms, performance choices, concurrency behavior, retry or
  timeout policy, failure modes, recovery paths, and compatibility shims.
- Any surprising omission: explain why a tempting feature, validation branch,
  abstraction, or error case is intentionally not present.

Avoid comments that repeat the code, narrate trivial assignments, preserve old
history already visible in Git, or excuse unclear names. If code needs a
paragraph to explain a simple idea, first simplify the code or improve the
names; keep the comment only for the remaining non-obvious intent.

## Testing

Default ladder (apply with each language's native test/type tools):

1. Unit tests for pure logic.
2. Blocking type-level or static-analysis proof for every eligible contract and
   production boundary.
3. Integration tests with fakes or test doubles at infrastructure boundaries.
4. Property-based tests for edge-heavy logic.
5. Contract/schema validation at boundaries.
6. Mutation tests where assertion quality matters.
7. Browser E2E for user-facing workflows.
8. Load tests for scale-sensitive paths.
9. Fault-injection tests for recovery behavior.
10. Deterministic simulation tests for distributed, concurrent, or irreversible
    high-blast-radius behavior.
11. SAST/security checks for sensitive surfaces.

Select quality gates by changed risk, not by habit. Every behavior, contract,
data, auth, billing, security, concurrency, recovery, migration, or user-workflow
change needs at least one automated gate that would fail if the important
behavior regressed. Docs-only, generated-only, and tooling-only changes still
need freshness, generation, or conformance checks that prove the claimed source
of truth.

Target the expensive rungs by blast radius rather than applying them everywhere.
Mandate diff-scoped mutation testing (rung 6) on changed lines in high-blast
modules (billing, auth, permissions); property/model-based tests (rung 4) on
invariant-rich logic (billing arithmetic, permission monotonicity,
queues/locks/state machines, parsers); and a fuzz harness on every
untrusted-input boundary (parsers, deserializers, protocol/file handlers, crypto),
run continuously off the PR critical path. Add deterministic simulation harnesses
for high-blast-radius distributed/concurrent/stateful behavior where ordinary
property/model tests cannot explore enough interleavings. Keep them optional for
CRUD/UI glue.
Which rungs are blocking vs continuous follows the two-tier model in
[`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md).

## Naming

Use names that reveal domain intent and follow the selected language or
protocol's established casing conventions. Booleans are predicates, operations
are verbs, data/types are nouns, and expected failures are tagged facts. Avoid
ambiguous abbreviations, use symmetric lifecycle verbs, and give the same
concept the same name across contracts and projections.

When a name is vague, inconsistent, incorrectly scoped, or exposes implementation instead of domain intent, treat it as a bug.
