# Active source authority and predecessor retirement

Use this contract whenever a change replaces, execute-hard-cutovers, deprecates, folds, or
substantially refactors an existing implementation. Its purpose is not to
delete history. Its purpose is to ensure that normal agent and tool discovery
exposes one current implementation path.

## The active source graph

The active graph includes every source surface that ordinary development or
runtime mechanisms can discover, depend on, generate from, register, or
execute:

- modules, packages, crates, public exports, and dependency edges;
- schemas, generators, configuration authorities, and build targets;
- routes, handlers, workers, jobs, plugins, commands, and runtime registries;
- writable persistence models and state-transition owners; and
- current tests, examples, and documentation that direct implementation work.

A file is not harmless merely because traffic currently misses it. If normal
search, imports, exports, build metadata, registration, or current docs make it
look editable, it remains an apparent authority.

## Allowed dispositions

| Disposition | May own new domain logic? | May own authoritative writes? | Normal discovery |
| --- | --- | --- | --- |
| Current authority | Yes | Yes, when declared | Yes |
| Compatibility adapter | No | No | Only through its named legacy interface |
| Historical artifact | No | No | Excluded from the implementation graph |

There is no steady-state disposition called "residual implementation." A
predecessor either delegates through a justified adapter or leaves the active
graph.

### Current authority

Before mutation, resolve the owner from the strongest available semantics:
contract/schema ownership, module and package exports, dependency direction,
route or job registration, state write authority, build targets, current ADRs,
and executable behavior. Directory names, age, comments, and whichever search
result appears first are weak evidence.

If two paths both appear current, treat that ambiguity as the defect. Do not
apply the same fix independently to both or guess which one production uses.
Establish one owner, redirect valid consumers, and retire the predecessor.
This rule does not authorize deleting unattributed or unresolved source: first
resolve ownership and consumer impact, and preserve unknown work while doing so.

### Compatibility adapter

A retained adapter must satisfy every applicable condition:

1. named, currently supported consumers require the old interface;
2. the adapter translates one way into the current contract and implementation;
3. it contains no independent business rules, policy decisions, storage model,
   authoritative writes, background loop, or fallback implementation;
4. new internal consumers cannot import it accidentally through default package
   exports or ordinary composition;
5. protected telemetry, published support policy, or equivalent consumer
   evidence proves the compatibility obligation and remaining use where
   measurable;
6. compatibility scope, owner, recovery, and an exact retirement predicate are
   recorded; and
7. no new feature work lands in the adapter.

"Someone may still use it" is not consumer evidence. A compatibility window
without a supported consumer, contract, or retirement predicate is an
unbounded second path.

### Historical artifact

Keep history only when replay, reconstruction, an active compatibility
contract, audit, or legal retention requires it. Examples include immutable
database migrations, supported event or wire-schema versions, and append-only
audit records. Make the historical role explicit and isolate it from normal
imports, exports, routing, mutable configuration, generation inputs, and domain
policy.

Git commits and tags are the default history for deleted source. Copying old
implementation into an `archive`, `legacy`, or `v1` folder inside the normal
build and search surface does not retire it.

## Change method

1. **Resolve.** Identify the current owner, predecessor, consumers, state and
   effects, compatibility risk, and behavioral contract before editing.
2. **Select.** Choose one-step replacement by default. Use expand-contract only
   for demonstrated live data, compatibility, availability, or external-effect
   risk, while preserving one write authority.
3. **Prove.** Verify the successor with the smallest semantic oracle capable of
   detecting material regression. Use differential, replay, property,
   integration, or live evidence only when its failure model applies.
4. **Switch.** Move registration, exports, composition, reads, writes, and
   documentation to the successor. Do not equate target presence with target
   authority.
5. **Contract.** Delete the predecessor or reduce it to the compatibility
   adapter contract above. Remove obsolete flags, routes, jobs, configs,
   dependencies, mirrors, fixtures, docs, parity checks, ledgers, and rebind
   machinery that no longer protect a live boundary.
6. **Read back.** Prove one current write owner and no active dependency,
   registration, export, or normal composition path to retired implementation.

Deletion is part of the original objective when the change creates the need
for it. It is not drive-by cleanup and must not be deferred merely to make the
current diff or phase look complete.

## Enforcement

Prefer mechanisms that make the wrong edit impossible or visible at the layer
that understands it:

1. compiler and module visibility;
2. package exports and dependency/build graph constraints;
3. schema/generator ownership and executable route/job inventories;
4. contract or behavior tests for the remaining public compatibility surface;
5. CI only as the executor and aggregator of those semantic proofs.

Do not use durable regex or source-token scanners to decide whether an
implementation is current. A temporary lexical migration fence is acceptable
only when source bytes are the governed surface or no semantic mechanism yet
exists; it must have an owner and exact retirement predicate and be deleted at
cutover.

## Completion test

A successor-bearing change is complete only when:

- one current semantic and write authority is identifiable;
- every predecessor has an allowed disposition;
- any adapter meets the one-way, no-policy, no-write, consumer and retirement
  conditions;
- retired implementation is absent from normal discovery, imports, exports,
  builds, registrations, generation, and runtime composition;
- durable product contracts and useful regression tests remain; and
- temporary migration and verification machinery has been removed when its
  predicate is satisfied.

For a substantial multi-slice or cross-repository cutover, use
`converge-architecture` to track exact source, target, proof, authority, and
retirement states. A small local replacement applies this contract directly
without creating a ledger or migration programme.
