Architecture Convergence Packet

Source / target / boundary:
- Source: `monolith` — one repo, one process/deployable, one HTTP surface, one shared persistence surface (single schema; tables shared across capabilities), cron workers and queue consumers inside the same process, one artifact and one delivery path.
- Target: `identity-service`, `catalog-service`, `orders-service`, `payments-service`, `notifications-service` — separate deployables with per-capability persistence, one write authority per state class, events for cross-capability effects, and a shared executable contract schema.
- Boundary: the customer-visible HTTP surface and contracts stay unchanged behind one gateway; each service owns its capability behavior, state class, and failure domain; control plane (config, registry, deploy, CI) is separated from the data plane; no dual write authorities at any point.

Industry pattern mix:
- Strangler-fig decomposition; expand-contract only where a demonstrated live compatibility, data, or external-effect risk needs concurrent paths — otherwise one-step cutover and delete.
- Capability-first (bounded-context) decomposition into vertical slices, each with one observable job and a stable boundary.
- Database-per-service ownership: each state class has exactly one writer; event-carried read models only where a read model is actually needed.
- Contract-first: one executable schema as source of truth; language bindings and fixtures are generated, never hand-maintained mirrors.

Acceptance invariants:
- Complete normalized outputs, errors, ordering, state effects, events, retries, and operational behavior match between source and target on the same deterministic corpus at exact source and target revisions.
- No double execution of irreversible side effects (payments, notifications, destructive writes) during parity testing.
- Every state class has exactly one write authority before and after each cutover.
- Customer-visible API, invariants, and external effects are unchanged.
- Each slice carries parity proof, an authority switch, a verification probe at its declared lifecycle stage, and a rollback or forward-recovery path.

Applicable system dimensions:
- Module graph and dependency boundaries; state authorities; process ownership; availability/cell topology and placement; control-plane vs data-plane separation; deployment path and artifact identity; trust and inter-service authorization; interoperability contracts; extension boundaries.

Capability ledger:
| Repo | Capability | State/authority boundary | Source proof | Target proof | Drift status | Next gate |
| `monolith` → `identity-service` | Identity | `users`, `sessions` tables; authn/authz gate — sole writer today: `monolith` | suite green @ source SHA + artifact digest | none — no target implementation | none; source sole writer | S0 contract freeze + corpus baseline |
| `monolith` → `catalog-service` | Catalog | `products`, `inventory` tables; read and write paths | suite green @ source SHA + artifact digest | none | none; source sole writer | S0 contract freeze + corpus baseline |
| `monolith` → `orders-service` | Orders | `orders`, `order_items`; order state transitions | suite green @ source SHA + artifact digest | none | none; source sole writer | S0 contract freeze + corpus baseline |
| `monolith` → `payments-service` | Payments | `payments`, ledger entries; irreversible external effects | suite green @ source SHA + artifact digest | none | none; source sole writer | S0 contract freeze + replay corpus (no double-execute) |
| `monolith` → `notifications-service` | Notifications | outbound delivery queue and retry state | suite green @ source SHA + artifact digest | none | none; source sole writer | S0 contract freeze + dedup corpus |

Slice graph:
| Slice | Observable job | Contract | Write set | Depends on | Parallel lane | Owner |
| S0 Contract freeze | Land one executable schema + ledger schema as choke points | OpenAPI/AsyncAPI/proto + migration ledger schema | contract repo, CI workflow, topic registry | — | serialized | Architecture |
| S1 Identity | Route identity traffic to `identity-service` and switch session authority | authn/authz contract | `users`, `sessions` | S0 | lane A | Identity |
| S2 Catalog | Serve catalog reads and writes from `catalog-service` | catalog contract | `products`, `inventory` | S0 | lane B | Catalog |
| S3 Orders | Run the order lifecycle in `orders-service` | orders contract | `orders`, `order_items` | S0, S1 | lane C | Orders |
| S4 Payments | Execute payments in `payments-service` | payments contract | `payments`, ledger | S0, S3 | lane C (serial after S3) | Payments |
| S5 Notifications | Deliver outbound notifications from `notifications-service` | notifications contract | outbound queue | S0 | lane D | Notifications |
| S6 Rebind and retire | Gateway binds services only; delete monolith modules and rebind workflows | whole-system contract | gateway, build/runtime graph | S1–S5 | terminal | Architecture |

Parity and cutover:
| Slice | Differential corpus | State effects | Stage/probe | Guardrail | Rollback |
| S1 | Replay authn/authz scenarios; compare outputs, errors, ordering | session state transitions | dev differential @ exact SHAs; one-step cutover | single session writer; serialize the switch | source-control recovery; fail closed on sessions |
| S2 | Replay catalog reads and writes on same corpus | product/inventory state | dev differential; canary only if live compatibility risk is demonstrated | single write authority per table | forward-recovery: replay queue to target |
| S3 | Order lifecycle scenarios incl. transitions, failures, retries | order state machine effects | dev differential; then cutover | no double order creation | source-control recovery |
| S4 | Payment replay on ledger-only corpus (no real external effect) | payment and ledger entries | simulation + property tests; live shadow only after idempotency proof | never double-execute irreversible effects | ledger reconciliation + reversal procedure |
| S5 | Delivery corpus with retries and dedup | outbound queue state | dev differential; shadow only if external delivery risk remains | dedup key bound to source effect id | retry with same dedup id |
| S6 | Whole-system regression + smoke on staging | full system state | staging probe; deploy/live readback only at declared terminal | predecessor removed from build, export, and runtime graph; no legacy folder hidden in graph | rollback monolith deploy until retirement proven |

Control-plane decisions:
- Serialized choke points: executable contract schema with generated bindings and fixtures; migration ledger schema + validator; config schema; CI workflows; broker topic registry. S0 lands before any parallel fan-out; no two agents edit the same choke point concurrently.
- Unclassified changes: rejected. Every tracked migration change carries slice + capability classification; CI fails on unclassified changes; a dashboard, comment, or manually edited state is not a gate.
- Stale proofs: proof binds source SHA, target SHA, target artifact digest, contract digest, corpus digest, and verification readback at the declared stage; any change to a bound input expires the proof and blocks authority promotion until exact candidates are re-proven.
- Merge/deploy/readback state: implementation, merge, deployment, active implementation, and retirement are reported as separate states; live readback is required only for slices whose terminal includes deployed or live authority.

Verdict:
- safe to fan out: BLOCKED — S0 contract and ledger schema are not landed; no lane may start before the choke points serialize.
- safe to cut over: BLOCKED — no slice holds differential parity at exact source and target revisions; health-only or compile-only probes are not equivalence.
- safe to retire source: BLOCKED — no authority switch has happened; `monolith` remains the sole writer in the normal build and runtime graph.
