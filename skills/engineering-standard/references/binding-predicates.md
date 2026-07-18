# Candidate engineering predicates (not binding)

Progressive-disclosure body for `engineering-standard` while authority is
**successor-candidate**. These rule IDs are migration aids. Binding text remains
Doctrine `standards/engineering-standard.md` until atomic cutover.

Coverage vs Doctrine: [doctrine-parity-delta.md](doctrine-parity-delta.md).

## Modern technical bar (compressed)

Apply the relevant subset; verify rather than slogan. Prefer measurable proof
over narrative status.

- high-throughput and low-latency on the critical path when the domain requires it;
- horizontally scalable, elastic, resilient, and observable under production load;
- type-safe, memory-safe, concurrency-safe, and deterministic where practical;
- secure-by-default, privacy-conscious, least-privilege, and auditable at boundaries;
- cost-efficient across CPU, memory, IO, network, storage, build minutes, and toil;
- idempotent, retry-safe, timeout-bounded, cancellation-aware, and backpressure-aware
  on every external side-effect path;
- composable, interoperable, portable, upgradeable, testable, operable,
  migration-safe, and rollback-safe;
- near-native performance only when the domain genuinely requires it.

## Rule IDs (candidate)

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

## Decision table

| Tradeoff class | Durable home | Required evidence |
| --- | --- | --- |
| Local implementation choice | code comment + unit test | test green on exact head |
| Measurable behavior | benchmark or load test | recorded threshold + head SHA |
| Material architecture or ops policy | ADR | accepted ADR link + conformance gate |
| Product or commercial impact | Commercial ADR | owner + metrics definition |
| Shared migration | migration packet + expand-contract plan | dual-path proof or rollback drill |

## Conformance checklist (candidate aid)

- [ ] Applicable rule IDs listed for the change.
- [ ] Doctrine binding sections still consulted for gaps in parity map.
- [ ] Tests or schemas cover each selected rule ID.
- [ ] No secret material introduced in source or log lines.
- [ ] External calls declare timeout/retry/idempotency.
- [ ] Migrations are expand-contract or explicitly non-applicable with rationale.
- [ ] Module boundaries respect layer direction.
- [ ] Delivery claims separate local proof from trunk landing and production proof.

## State machine (change risk)

```text
proposed -> designed -> verified -> landed -> production_proven
                 |          |          |
                 +-> blocked (gap) <---+
```

`verified` requires automated evidence for every selected rule ID. `landed` is
default-branch readback. `production_proven` requires connector-attested
product-path proof for the exact SHA when deploy is in scope.
