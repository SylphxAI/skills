# Binding engineering predicates

Progressive-disclosure rule IDs for `engineering-standard`. Full prose:
[full-standard.md](full-standard.md). Usage modes and anti-examples:
[quality-north-star-usage.md](quality-north-star-usage.md).

## Quality North Star

Sole quality vocabulary (`q-*`). Apply the relevant subset; verify rather than
slogan. Meta: *Simple concepts, powerful usage.* Retired phrase: Modern
Technical Bar.

**Operating set:** 14 primary attributes. **Memory set (9): 深正簡 · 改觀快 ·
穩安平** — Depth · Correctness · Simplicity · Evolvability · Observability ·
Performance & Velocity · Reliability · Security · Economy.

| ID | Attribute |
| --- | --- |
| `q-depth` | Depth — mechanism, boundary, invariant, failure mode; one powerful concept fully resolved |
| `q-simplicity` | Simplicity — fewest primitives via unify/compose covering maximum capability; never cut ambition to look clean |
| `q-correctness` | Correctness — contract-true under the failure model; explicit failure |
| `q-security` | Security — secure-by-default, least-privilege, auditable boundaries |
| `q-reliability` | Reliability — promised correct outcomes under expected adverse conditions |
| `q-availability` | Availability — continuity to declared SLO; probes ≠ capability |
| `q-resilience` | Resilience — absorb, degrade, recover without silent corruption or cascade |
| `q-performance` | Performance — latency, throughput, cost, resource budgets (incl. tails) |
| `q-scalability` | Scalability — structure holds ~10× load/data/coordination; cost curve acceptable |
| `q-economy` | Economy — agent-native cost (entropy/verification/attention/runtime/coordination/reversal); not person-days; runtime resource budgets stay under Performance |
| `q-observability` | Observability — minimum correlated, privacy-preserving, actionable evidence |
| `q-maintainability` | Maintainability — local change, clear ownership; **includes Readability** |
| `q-evolvability` | Evolvability — affordable change; migrate/backfill then hard-cut |
| `q-testability` | Testability — falsifiable automated semantic oracles |
| `q-readability` | **Alias** of Maintainability (legibility facet)—not a 15th peer attribute |

Full obligations: [full-standard.md](full-standard.md) § Quality North Star.

**Default quality precedence** (absent business counter-instruction):  
Depth/Simplicity → Correctness → Security → Reliability/Availability/Resilience
→ Observability → Performance/Scalability/Economy →
Maintainability/Evolvability/Testability. Intentional inversion requires
tradeoff + rollback/review (`eng-quality-precedence-01`). Does not override
legal/safety/ruin or Decision Quality / SOTA ends.

## Rule IDs

| Rule ID | Predicate |
| --- | --- |
| `eng-adr-01` | Before broad implementation, material durable architecture, ownership, public-contract, persistence, security/privacy, delivery-semantics, or enterprise-default decisions are recorded in the owning repository ADR; ordinary implementation details do not require an ADR. |
| `eng-safety-01` | Fail closed on secrets in source, logs, and manifests. |
| `eng-quality-01` | Material durable work names the in-scope Quality North Star attribute IDs (`q-*`) and closes each with evidence or an explicit residual (owner + expiry/review + retirement). Naming without proof is non-conformance. |
| `eng-quality-02` | Do not maintain a parallel quality slogan list. The fourteen primary `q-*` attributes (plus the `q-readability` alias of Maintainability) are the sole vocabulary; mechanism phrases (idempotent, elastic, etc.) map into them and do not form a second bar. |
| `eng-quality-precedence-01` | When quality attributes conflict without an explicit business counter-instruction, apply default quality precedence; intentional inversion records tradeoff, owner, and rollback or review condition. |
| `eng-economy-01` | Cost claims state which agent-native budget (entropy, verification, attention, runtime, coordination, or reversal), how it is measured, and which principle is traded; cost is not human person-days / development effort by default. |
| `eng-economy-02` | Every added concept is priced as lifecycle interest charged to every future agent and human; prefer integration that holds or expands capability over deletion that shrinks ambition. |
| `eng-readability-01` | Names, module structure, and required comments make non-obvious intent legible; prefer simplification and domain language over cleverness or archaeology-required structure. (Facet of Maintainability.) |
| `eng-maintain-01` | Touched paths leave change local and ownership explicit: no new god modules, no unowned dual paths, and temporary fences carry retirement predicates. Includes readability obligations. |
| `eng-avail-01` | Availability-sensitive paths declare continuity intent (SLO or equivalent) and do not treat health/readiness probes as product capability proof. |
| `eng-depth-01` | Framed product/design work deepens one core concept or capability end-to-end; reject shallow multi-concept residue and permanent dual concepts on the framed path; name why shallower options were rejected when material. |
| `eng-concur-01` | Shared mutable state is fenced (locks, CAS, leases) with explicit timeouts. |
| `eng-sidefx-01` | External side effects are idempotent or exactly-once with recovery. |
| `eng-timeout-01` | Every network/RPC path has timeout, cancellation, and retry budget. |
| `eng-hard-cut-01` | Default is verified hard-cut / one-step cutover with predecessor retirement. Expand-contract only for demonstrated large-scale user or live compatibility/state/effect risk, and only with a dated contract step—no permanent dual-path residual. |
| `eng-hard-cut-02` | Backward-compatible dual paths, shims, and aliases are exceptional tech debt; keep them only under eng-hard-cut-01 exception bar and delete them at the retirement gate. |
| `eng-simplicity-01` | Prefer fewer concepts and special cases by **unify/compose** while preserving or expanding framed capability coverage (ambition-preserving simplicity); deletion of difficulty is last resort after coverage is held. Abstraction, configuration, or indirection only for measured need (boundary protection, real reuse, or named domain concept)—never simplistic cut, fewer-features cosplay, hidden convention, or false unification of incompatible concerns. |
| `eng-growth-01` | Grow by thin vertical slices on a product path that already works end to end; do not trade a working path for unfinished layered complexity. |
| `eng-deps-01` | Prefer in-tree and established dependencies after checking docs/types; reimplement commodity behavior only with a clear reason that owning it is smaller lifecycle cost than adopting. |
| `eng-layer-01` | Dependency direction is domain → application → infrastructure. |
| `eng-capability-01` | Durable code is organized by capability/bounded context; features are vertical slices inside the owning capability. |
| `eng-ddd-01` | Strategic and Tactical DDD concepts carry domain language, invariants, aggregates, value objects, services, events, and repository ports. |
| `eng-hex-01` | Clean/Hexagonal boundaries isolate domain/application policy from interfaces, frameworks, persistence, and provider adapters. |
| `eng-functional-01` | Domain decisions form a deterministic functional core; external effects remain in an explicit imperative shell behind ports. |
| `eng-modularity-01` | No file/module/package/crate/service/context may accumulate god responsibility; split by semantic boundary, not line count or every behavior. |
| `eng-boundary-01` | Capability/context, module/package/crate, contract, state authority, process, cell, service/deployment, and trust boundaries are declared as orthogonal dimensions; one never silently implies another. |
| `eng-modulegraph-01` | The compiler, package visibility, build/dependency graph, or AST-aware architecture proof rejects cycles, internal cross-module imports, undeclared edges, and accidental public surface without relying on source-text spelling. |
| `eng-deploy-01` | Logical capability boundaries exist from the first durable commit; physical services split only for demonstrated independent scale, failure, security, data-authority, release, or technology boundaries. |
| `eng-detail-01` | Important detail is attached to a capability as a sub-capability, behavior, invariant, contract, scenario, or surface rather than disappearing into Work or code. |
| `eng-stateclass-01` | Every non-trivial state set is classified as authoritative durable, durable workflow, derived projection, ephemeral process/cache, coordination/lease, client/session, or configuration/secret and declares owner, write authority, consistency, partition, recovery, retention, freshness, privacy, and failure behavior where applicable. |
| `eng-stateless-01` | Request/worker compute is interchangeable and stateless where possible; authoritative state, idempotency, durable progress, leases, and resumable cursors remain in explicit owned authorities rather than process memory. |
| `eng-observe-01` | Critical paths emit privacy-preserving, correlatable telemetry. |
| `eng-observe-02` | Telemetry names semantic capability/use-case outcomes and effects; domain/application code does not depend on observability SDKs. |
| `eng-observe-03` | Raw internal/operator telemetry, topology, migration/process state, implementation details, and unrestricted diagnostics remain protected evidence. Tenant-authorized customer-owned telemetry intentionally exposed by an observability product is customer product data, not operator leakage. |
| `eng-observe-04` | Public or customer-visible operational facts have an intentional purpose, audience and authorization scope, allowlisted minimum schema, stable semantics, opaque correlation where needed, and negative leakage tests. |
| `eng-frp-01` | Time-varying/event-stream domains may use pure reactive reducers while subscriptions, clocks, frameworks, and backpressure remain in the imperative shell. |
| `eng-event-01` | Cross-capability events are versioned published contracts with ordering, causation, delivery, idempotency, replay, and failure semantics. |
| `eng-reconcile-01` | Convergent asynchronous systems treat events as wake-ups and recompute from authoritative desired/observed state through an idempotent reconciliation loop. |
| `eng-staticstability-01` | Where a real control/data-plane split and availability requirement exist, established data-plane behavior continues from admitted state through bounded control-plane impairment and safely reconciles afterward without a synchronous per-request control-plane dependency. |
| `eng-cell-01` | Cell topology is used only for a demonstrated critical multi-tenant or ultra-scale fault-isolation predicate and declares partition/routing, no shared critical-path mutable state, capacity, migration, deployment, recovery, and blast-radius proof. |
| `eng-interop-01` | Cross-boundary integration events use a CloudEvents envelope around the schema-owned payload, while operational telemetry uses OpenTelemetry in the adapter shell and remains protected from unintended public/customer disclosure. |
| `eng-extension-01` | Static composition is the default; deployment selection, out-of-process isolation, WebAssembly Component Model, or remote extensions activate only from proven language, trust, failure, scale, or ownership predicates with typed contracts and bounded capabilities/resources. |
| `eng-ledger-01` | Conserved value uses an immutable append-only double-entry journal with balanced atomic postings, idempotency, reversal correction, rebuildable projections, and external reconciliation. |
| `eng-di-01` | Composition roots bind stable ports to adapters with explicit scopes; domain code never locates dependencies through a container. |
| `eng-provider-01` | Reactive providers are limited to time-varying projections/lifecycles and never become domain semantics or durable state authority. |
| `eng-slice-01` | Consumer use cases are vertical slices inside the owning capability and preserve published boundaries. |
| `eng-resilience-01` | External/distributed effects declare failure domains, timeout/cancellation, idempotency, retry budget, backpressure, overload, recovery, and proof proportionate to risk. |
| `eng-security-01` | Trust, tenant, identity, data, and effect boundaries are secure by design with deny-by-default, least privilege, safe handling, and adversarial proof. |
| `eng-cqrs-01` | Commands and queries with different responsibilities have separate contracts; physical read/write infrastructure splits only for demonstrated needs. |
| `eng-eventsourcing-01` | Event Sourcing is used only when ordered events are domain state authority and replay, evolution, concurrency, privacy, and recovery contracts exist. |
| `eng-saga-01` | Cross-authority long-running business outcomes use an explicit Saga/Process Manager state machine with correlation, idempotency, timeout, compensation or forward recovery, and terminal states. |
| `eng-state-01` | Non-trivial lifecycles define explicit states, events, guards, actions, illegal transitions, and terminal outcomes independent of workflow frameworks. |
| `eng-actor-01` | Actor use declares mailbox, ordering/delivery, backpressure, supervision, persistence/recovery, placement, and public-boundary semantics. |
| `eng-dod-01` | Data-oriented layouts are activated by profiling and remain benchmarked, correctness-tested implementation details within capability boundaries. |
| `eng-proof-01` | Health/readiness probes are never product capability proof. |
| `eng-tool-01` | Language/tool selection follows the active engineering profile + Decision Quality method. |
| `eng-currency-01` | Project bootstrap, dependency addition, and dependency migration query authoritative live release sources and target the newest eligible stable production release; model memory, templates, existing ranges, and installed prevalence are not version-selection evidence. |
| `eng-repro-01` | Builds are pinned/locked; no floating `latest` for production graphs. |
| `eng-static-01` | Defects preferred at compile/static/test time over production discovery. |
| `eng-debug-01` | Before a permanent repair is claimed, a confirmed defect binds authoritative expected behavior, its observed symptom or violated invariant, and the exact unmodified baseline to the lowest capable faithful semantic oracle or linked symptom-and-causal oracle set; material competing causes and candidate-change confounders are evidence-discriminated, and the unchanged oracle bundle fails for the expected reason on the baseline and passes on the exact candidate after an owning-boundary correction. Immediate harm containment may precede this proof and remains containment. |
| `eng-regress-01` | The exact candidate passes risk-selected affected regression proof without weakening or mocking away the contract. Stochastic, distributed, or live proof uses the same predeclared failure model, harness, corpus or observation budget, and decision rule; reports uncertainty and the verified lifecycle layer; and removes superseded temporary diagnostics, workarounds, and containment. |
| `eng-ssot-01` | One semantic authority per fact; projections have lineage. |
| `eng-retire-01` | A successor-bearing change leaves one normal implementation and write authority: each predecessor is deleted, reduced to a one-way no-policy/no-write compatibility adapter for demonstrated consumers with an exact retirement predicate, or isolated as immutable history outside ordinary discovery, imports, exports, builds, registration, generation, and runtime composition. |
| `eng-artifact-01` | Source-controlled artifacts have stable identity and integrity. |
| `eng-contract-01` | Boundary contracts are schema-derived with typed failure handling. |
| `eng-test-01` | Automated tests cover selected rule IDs for the change. |
| `eng-enforce-01` | Each material invariant has one proof owner at the lowest capable semantic layer: compiler/type/schema/visibility, AST or dependency/build graph, behavioral proof, then CI aggregation. Durable source-text implementation-token tests are forbidden. |
| `eng-fence-01` | A temporary migration fence names its active condition and retirement predicate; completed cutover removes obsolete parity, no-old-path, ledger, rebind, and duplicate proof machinery. |
| `eng-name-01` | Names match domain language; no misleading aliases at boundaries. |

## Decision table

| Tradeoff class | Durable home | Required evidence |
| --- | --- | --- |
| Local implementation | code comment + unit test | test green on exact head |
| Measurable behavior | benchmark or load test | threshold + head SHA |
| Material architecture/ops | ADR | accepted ADR + conformance |
| Product/commercial impact | Commercial ADR | owner + metrics |
| Development/no-live-risk migration | focused change record or migration packet | exact-candidate equivalence + one-step replacement/readback |
| Live shared-state/compatibility migration | migration packet + expand-contract | dual-path, recovery, or rollback drill |
| Intentional quality-precedence inversion | ADR or change record naming attributes | tradeoff + owner + rollback/review |

## Conformance checklist

- [ ] In-scope Quality North Star attribute IDs (`q-*`) listed with evidence or residual.
- [ ] Applicable rule IDs listed.
- [ ] Material durable decisions have an owning-repository ADR before broad implementation; ordinary details are not inflated into ADR ceremony.
- [ ] Tests/schemas cover each selected rule ID.
- [ ] No secret material in source or logs.
- [ ] External calls declare timeout/retry/idempotency.
- [ ] Migration strategy matches lifecycle and demonstrated live risk; no
      calendar delay or dual path without a named compatibility/state/effect need.
- [ ] Layer direction respected.
- [ ] Applicable semantic, module, contract, state, process, cell, deployment,
      and trust boundaries are explicit rather than inferred one-to-one.
- [ ] Non-trivial state is classified and owned; process replacement cannot
      lose authoritative outcomes.
- [ ] Cell, control/data-plane, or runtime plugin mechanisms exist only when
      their activation predicate and failure proof are present.
- [ ] New or retained gates protect distinct material invariants at the lowest
      capable semantic layer; no durable source-string change-detector test or
      duplicate proof remains.
- [ ] Defect fixes show a faithful pre-fix failure on the exact baseline, an
      unchanged-oracle post-fix pass on the exact candidate, causal
      discrimination, relevant regression proof, and cleanup of superseded
      workarounds or containment.
- [ ] A change that establishes a successor resolves every predecessor as
      deleted source, a justified expiring compatibility adapter, or isolated
      immutable history; no active-looking duplicate implementation remains.
- [ ] Temporary migration fences have an exact retirement predicate, and
      completed migrations have retired their proof machinery.
- [ ] Delivery claims separate local / trunk / production proof.
- [ ] Simplicity claims preserve capability coverage (compose, not cut).
- [ ] Quality-precedence inversions have tradeoff + rollback/review recorded.
