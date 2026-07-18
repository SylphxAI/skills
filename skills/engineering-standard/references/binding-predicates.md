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
| `eng-migrate-01` | Shared schema/state uses expand-contract with rollback path. |
| `eng-layer-01` | Dependency direction is domain → application → infrastructure. |
| `eng-observe-01` | Critical paths emit privacy-preserving, correlatable telemetry. |
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
| Shared migration | migration packet + expand-contract | dual-path or rollback drill |

## Conformance checklist

- [ ] Applicable rule IDs listed.
- [ ] Tests/schemas cover each selected rule ID.
- [ ] No secret material in source or logs.
- [ ] External calls declare timeout/retry/idempotency.
- [ ] Migrations expand-contract or N/A with rationale.
- [ ] Layer direction respected.
- [ ] Delivery claims separate local / trunk / production proof.
