# Binding engineering predicates

Progressive-disclosure rule IDs for `engineering-standard`. Full prose:
[full-standard.md](full-standard.md).

## Modern technical bar

Apply the relevant subset; verify rather than slogan.

- high-throughput and low-latency on the critical path when required;
- horizontally scalable, elastic, resilient, and observable under production load;
- type-safe, memory-safe, concurrency-safe, deterministic where practical;
- secure-by-default, privacy-conscious, least-privilege, auditable at boundaries;
- cost-efficient across CPU, memory, IO, network, storage, build minutes, and toil;
- idempotent, retry-safe, timeout-bounded, cancellation-aware, backpressure-aware on side effects;
- composable, interoperable, portable, upgradeable, testable, operable, migration-safe, rollback-safe;
- near-native performance only when the domain requires it.

## Rule IDs

| Rule ID | Predicate |
| --- | --- |
| `eng-safety-01` | Fail closed on secrets in source, logs, and manifests. |
| `eng-concur-01` | Shared mutable state is fenced (locks, CAS, leases) with explicit timeouts. |
| `eng-sidefx-01` | External side effects are idempotent or exactly-once with recovery. |
| `eng-timeout-01` | Every network/RPC path has timeout, cancellation, and retry budget. |
| `eng-migrate-01` | Development/no-live-risk migrations use verified one-step cutover; demonstrated live compatibility/state/effect risk uses expand-contract with recovery. |
| `eng-layer-01` | Dependency direction is domain → application → infrastructure. |
| `eng-capability-01` | Durable code is organized by capability/bounded context; features are vertical slices inside the owning capability. |
| `eng-ddd-01` | Strategic and Tactical DDD concepts carry domain language, invariants, aggregates, value objects, services, events, and repository ports. |
| `eng-hex-01` | Clean/Hexagonal boundaries isolate domain/application policy from interfaces, frameworks, persistence, and provider adapters. |
| `eng-functional-01` | Domain decisions form a deterministic functional core; external effects remain in an explicit imperative shell behind ports. |
| `eng-modularity-01` | No file/module/package/crate/service/context may accumulate god responsibility; split by semantic boundary, not line count or every behavior. |
| `eng-deploy-01` | Logical capability boundaries exist from the first durable commit; physical services split only for demonstrated independent scale, failure, security, data-authority, release, or technology boundaries. |
| `eng-detail-01` | Important detail is attached to a capability as a sub-capability, behavior, invariant, contract, scenario, or surface rather than disappearing into Work or code. |
| `eng-observe-01` | Critical paths emit privacy-preserving, correlatable telemetry. |
| `eng-observe-02` | Telemetry names semantic capability/use-case outcomes and effects; domain/application code does not depend on observability SDKs. |
| `eng-frp-01` | Time-varying/event-stream domains may use pure reactive reducers while subscriptions, clocks, frameworks, and backpressure remain in the imperative shell. |
| `eng-event-01` | Cross-capability events are versioned published contracts with ordering, causation, delivery, idempotency, replay, and failure semantics. |
| `eng-reconcile-01` | Convergent asynchronous systems treat events as wake-ups and recompute from authoritative desired/observed state through an idempotent reconciliation loop. |
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
| `eng-tool-01` | Language/tool selection follows the active engineering profile + SOTA kernel. |
| `eng-repro-01` | Builds are pinned/locked; no floating `latest` for production graphs. |
| `eng-static-01` | Defects preferred at compile/static/test time over production discovery. |
| `eng-ssot-01` | One semantic authority per fact; projections have lineage. |
| `eng-artifact-01` | Source-controlled artifacts have stable identity and integrity. |
| `eng-contract-01` | Boundary contracts are schema-derived with typed failure handling. |
| `eng-test-01` | Automated tests cover selected rule IDs for the change. |
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

## Conformance checklist

- [ ] Applicable rule IDs listed.
- [ ] Tests/schemas cover each selected rule ID.
- [ ] No secret material in source or logs.
- [ ] External calls declare timeout/retry/idempotency.
- [ ] Migration strategy matches lifecycle and demonstrated live risk; no
      calendar delay or dual path without a named compatibility/state/effect need.
- [ ] Layer direction respected.
- [ ] Delivery claims separate local / trunk / production proof.
