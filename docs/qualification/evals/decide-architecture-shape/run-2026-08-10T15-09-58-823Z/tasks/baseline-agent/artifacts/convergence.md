# Convergence Plan: Monolith → Services

**Objective.** Migrate the monolith to a set of services such that every bounded
capability owns its contract, its data, and its runtime, and the monolith is
retired as a serving or writing authority.

**Terminal state.** For each capability in the inventory (§4), exactly one
service owns the surface, writes the data, and answers the calls. The monolith
is deleted or reduced to a non-serving shell with no write authority, no
routed traffic, and an expiry date. No dual-write paths, no routing flags,
no predecessor endpoints remain.

This document is the execution guide: slices (§5), proof (§7), and cutover
(§8) are the three mandatory artifacts of every migration unit.

---

## 1. Principles

1. **Capabilities, not files, are the denominator.** The inventory freezes
   behaviors, invariants, contracts, scenarios, state transitions, and external
   effects. Files and classes are only implementation mappings.
2. **One write authority per surface at all times.** Data, queues, caches, and
   external effects have exactly one writer; the writer may change exactly once
   per slice, at cutover.
3. **Contract-first.** One executable schema/IDL is the source of truth.
   Bindings, fixtures, and tests are generated or derived, never hand-maintained
   mirrors.
4. **Shortest safe cutover.** The default is a hard cut: switch, block old
   writes, retire the old path in the same delivery unit. Expand/contract is
   used only when a demonstrated live risk requires concurrent paths, is dated,
   has an owner, and keeps one write authority.
5. **Proof is layered and expires.** Source, CI, deploy, and live evidence are
   separate. Proof is bound to exact revisions and digests and is invalidated by
   any change to the bound inputs.
6. **No permanent dual generation.** Flags, shims, and compatibility paths are
   temporary by construction and deleted at retirement; they never become the
   new system of record.

## 2. Non-goals

- No rewrite of behavior that is not required by the target architecture.
- No service per class, table, or endpoint.
- No new runtime or framework choice without a stated lifecycle and ownership.
- No data movement without a sole-writer handoff and reconciliation.
- No migration of customer data by narrative status; only reconciled evidence.

## 3. Governance

- One accountable owner per slice. WIP limit of one owner per shared choke
  point (contract, schema, registry, CI pipeline).
- A slice ledger (§5.4) is the only status authority. Comments, dashboards, and
  chat are not gates.
- Review cadence: weekly ledger reconciliation against merged source, CI,
  deployment readback, and live probes. A slice advances only when its current
  evidence supports the next state.

## 4. Phase 0 — Inventory and seam map

Output of this phase is the frozen denominator. No slicing starts before it
is reviewed and merged.

### 4.1 Capability inventory

For every capability, record:

| Field | Meaning |
|---|---|
| Capability | One observable job (e.g., checkout, notification delivery, ledger) |
| In/out surfaces | Endpoints, consumers, callers, jobs, event subscriptions |
| Data owned | Tables, queues, cache keys, files |
| External effects | Emails, payments, third-party calls, webhooks |
| Current mapping | Modules/classes that implement it today |
| Seam class | `clean` · `acl` (anti-corruption layer needed) · `entangled` (refactor first) |

### 4.2 Dependency analysis

- Build the capability dependency graph; identify cycles and shared tables.
- Inventory the shared schema: tables written by more than one capability are
  candidates for split before extraction.
- Classify every seam:
  - `clean`: boundary exists, no cross-capability writes → extract directly.
  - `acl`: reads/writes cross a boundary → introduce an anti-corruption layer
    as part of the slice, owned by the destination service.
  - `entangled`: cyclic or table-level coupling → refactor inside the monolith
    first (a local refactor slice with its own parity proof) so the extraction
    seam exists.

### 4.3 Frozen denominator

Freeze, per capability: behaviors, invariants, public contracts, scenarios,
state transitions, external effects, and a deterministic test corpus. The
corpus is versioned and its digest is part of every parity proof.

---

## 5. Slicing

### 5.1 Slice anatomy

Every slice delivers exactly one capability cut and must contain:

1. **One observable job** — the capability being moved.
2. **A stable boundary** — contract, data ownership, and callers in scope.
3. **A target implementation** — the service (or refactored seam) that will own it.
4. **Parity proof** — §7 evidence bound to exact revisions.
5. **An authority switch** — the cutover event (§8).
6. **A production probe** — a live postcondition check after cutover.
7. **A rollback or forward-recovery path** — agreed before the cut (§8.3).

A slice that lacks any of these is not a slice; it is an unfinished task.

### 5.2 Slice types

- **Extract** — move a cleanly bounded capability into a new service. Default.
- **Split** — one monolith capability becomes two services (e.g., reads vs.
  writes) only when the seam analysis shows independent lifecycles.
- **Replace** — swap a capability for an existing or third-party service. Only
  with a written justification; parity proof still applies.

### 5.3 Sequencing

- Build an execution graph. Serialize: shared contracts, shared schema
  migrations, registries, configuration schemas, and CI workflows. Fan out
  slices with disjoint write sets.
- Extract leaves of the dependency graph first (capabilities nothing else
  depends on); extract "grapple" capabilities (depended on by many) either
  early behind a stable contract or last as a shared library, never mid-stream.
- Each slice's destination service must not depend on the monolith at terminal
  state; inbound calls from the monolith must be removable at cutover.
- Sequence by contract stability first, then risk: a slice with irreversible
  external effects ships only after the equivalent side-effect-free slice has
  proven the pattern.

### 5.4 Slice ledger

Per-slice states, tracked separately per layer:

| State | Requires |
|---|---|
| `planned` | Inventory entry + owner + slice anatomy |
| `contracted` | Executable contract merged; corpus frozen |
| `implemented` | Destination code merged; artifact built by CI |
| `parity_proven` | §7 evidence bound to exact candidate digests |
| `authority_switched` | Cutover executed; predecessor writes blocked |
| `retired` | Predecessor code deleted; residuals logged |

Source, CI, deploy, and live status are separate fields in the ledger; a
merged PR does not set `authority_switched`, and a healthy endpoint does not
set `retired`.

---

## 6. Contract and data plane

### 6.1 Contracts

- One executable schema/IDL per capability boundary; generated bindings and
  fixtures.
- Versioning policy: additive changes are compatible within a major; breaking
  changes require a new contract version and explicit routing. A compatibility
  matrix is maintained until the predecessor contract is retired.
- The contract, its digest, and the corpus digest are inputs to every parity
  proof.

### 6.2 Data ownership handoff

1. **Single writer, always.** If the predecessor must keep writing during
   transition, expand/contract is in force with a date, an owner, and the
   destination as the authoritative writer after cutover.
2. **Backfill before cut.** Move or rebuild required state at the destination
   before the switch; verify with original oracles, not memory.
3. **Watermark anti-rewind.** Data carries a monotonic watermark. After
   backfill, the destination rejects writes below its watermark and the
   predecessor rejects writes above it; the watermark never rewinds. This
   prevents stale-writer divergence during and after cutover.
4. **Reconcile then cut reads.** Reconciliation (counts, checksums, watermarks)
   must pass before readers move.
5. **Irreversible effects.** Never double-execute payments, notifications,
   destructive writes, or other irreversible effects for parity testing. Use
   captured/simulated effects or a shadow sink, and verify the real effect
   path only after cutover with real probes.

---

## 7. Proof

### 7.1 Proof layers

Evidence is separate per layer; claims name the layer:

- **Source** — merged commit SHA on main; exact revisions of source, target,
  contract, and corpus.
- **CI** — artifact digest and job identity for the exact candidate.
- **Deploy** — deployed revision/digest readback and environment identity.
- **Live** — real traffic and postcondition probes, not health checks.

### 7.2 Per-slice evidence set

| Evidence | Method | Gate |
|---|---|---|
| Behavioral parity | Run source and target against the same deterministic corpus; compare complete normalized outputs, errors, ordering, state effects, events, retries | All must match at exact revisions |
| Data parity | Reconciliation counts, checksums, watermark comparison | Must pass before read cut |
| Performance envelope | Latency percentiles, throughput, error rate, resource envelope vs. baseline | Pre-agreed thresholds |
| Resilience | Failure injection on each dependency (timeout, down); retry and idempotency; startup/shutdown behavior | No unhandled divergence |
| External effects | Captured-and-compared for safe effects; shadow sink for irreversible ones | Diff must match |

### 7.3 Binding and expiry

Every proof is bound to the tuple: source revision, target revision, target
artifact digest, contract digest, behavior-spec digest, corpus digest, and
deploy readback. Any change to any bound input invalidates the proof. The
ledger blocks `parity_proven → authority_switched` until proof is re-run
against the exact candidate.

### 7.4 What is not proof

Compilation success, passing unit tests alone, a 200 health check, a
one-time golden baseline, skipped tests, or a comment/dashboard entry. A
golden baseline is characterization evidence, not permanent parity proof.

---

## 8. Cutover

### 8.1 Patterns

- **Hard cut (default).** Switch traffic and writers to the destination, block
  new predecessor writes, and delete or quarantine the predecessor path in the
  same delivery unit.
- **Expand/contract (temporary).** Only when a demonstrated live
  compatibility, data, or external-effect risk requires concurrent paths.
  Requires: explicit end date, owner, one write authority, and kill criteria.
  Expires; expiry is enforced by the ledger.
- **Brownout/redirect.** For external public surfaces that cannot be cut
  atomically: staged routing with explicit percentages and an expiry, plus a
  live probe at each step. Never the terminal state.

### 8.2 Cut checklist (per slice)

- [ ] Parity proof bound to the exact candidate is current (§7.3).
- [ ] Backfill complete and reconciled; watermark rules active.
- [ ] Traffic cut step identified (routes, callers, DNS/LB, jobs, consumers).
- [ ] New predecessor writes blocked at cut; predecessor writer made read-only
      or offline.
- [ ] Live probe passes on a real request after the cut (postcondition, not
      health).
- [ ] Predecessor path deleted or quarantined in the same delivery unit.
- [ ] Docs, installers, ops runbooks, and dashboards point at the service.
- [ ] Residuals recorded in the residuals ledger; no "just in case" paths kept.

### 8.3 Rollback and forward recovery

- Rollback is valid only inside the pre-agreed window before the predecessor
  is retired, and only if the watermark has not replayed.
- After retirement, recovery is forward-only: compensate or replay through the
  service, never rewind events or watermarks.
- Every slice defines kill criteria before cut (e.g., error-rate or latency
  breach, data divergence above threshold) that trigger either rollback
  (in-window) or stop-and-repair (post-window).

---

## 9. Risks and kill criteria

| Risk | Control | Kill criterion |
|---|---|---|
| Shared-schema entanglement | `acl`/`entangled` seams refactored before extraction | Extraction attempted without seam class resolved |
| Cyclic capability dependencies | Execution graph; grapple handling | A slice whose service still depends on the monolith at terminal |
| Irreversible effect double-execution | Captured/shadow effects; real probes only post-cut | Any parity test that would issue a real irreversible effect |
| Data divergence at cut | Backfill + watermark + reconciliation | Reconciliation fails; watermark not monotonic |
| Performance regression | Envelope evidence before cut | Threshold breach beyond agreed tolerance |
| Stale proof after main moves | Proof expiry; re-run on bound-input change | Promotion on outdated digests |
| Permanent dual paths | Dated expand/contract; enforced retirement | Flag/shims surviving the slice's expiry |

---

## 10. Definition of done (terminal acceptance)

1. Every capability in the inventory is owned by exactly one service.
2. The monolith is deleted, or reduced to a non-serving shell with no write
   authority, no routed traffic, and an expiry date recorded in the ledger.
3. No dual writes, no predecessor endpoints, no routing flags or compatibility
   paths remain.
4. Live proof exists for every primary user journey routed through services.
5. The residuals ledger is empty or every entry is explicitly accepted with an
   owner and date.
6. Docs and runbooks reference only the service architecture.

---

## 11. Worked slice example — Checkout

Concrete template for every slice.

1. **Boundary.** Capability: checkout (cart validation, order creation, payment
   intent). Surfaces: `/checkout` API, internal `OrderCreated` event, legacy
   `orders` table. Seam: `acl` (shared `orders` table with fulfillment).
2. **Contract.** OpenAPI/Protobuf for checkout; `OrderCreated` event schema;
   generated bindings. Contract digest recorded.
3. **Refactor seam.** Split `orders` table into `orders` (checkout-owned) and
   `fulfillment_orders` (fulfillment-owned) with a mapping view; land as a
   local refactor slice with its own parity proof.
4. **Implement.** New checkout service owns `orders` writes and the event;
   fulfillment migrates to `fulfillment_orders` reads. Watermark column added
   to `orders`.
5. **Prove.** Replay corpus: same requests through monolith and service;
   compare responses, emitted events, and DB state. Reconciliation of
   `orders` counts/checksums. Envelope: p95 and error-rate thresholds.
6. **Cut.** Monolith `/checkout` routes to the service; monolith checkout
   writes blocked; watermark enforces single writer. Live probe: place a real
   order, assert order row, event, and payment callback.
7. **Retire.** Delete monolith checkout code and `OrderCreated` predecessor
   emitter in the same delivery unit; update runbooks; log residuals.
