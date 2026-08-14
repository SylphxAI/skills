---
name: decide-architecture-shape
description: "Decide one architecture shape from options with tradeoffs."
---

# Decide Architecture Shape

Turn a substantial architecture change into independently verifiable
convergence slices. The same terminal applies whether the implementation spans
one repository or many. Optimize for verified throughput: disjoint slices may
advance in parallel when doing so has positive net value, but no slice advances
on narrative status or stale proof.


## When to use
- A substantial architecture change needs one chosen shape with verifiable convergence slices
- Implementation spans one or many repositories and needs parity gates and cutover policy
- Not for a single-screen interface (`craft-product-interface`) or a product blueprint (`design-product`)

## Resource guide

- Read `references/decide-architecture-shape-patterns.md` before choosing slice boundaries, states, parity gates, concurrency, or cutover policy.
- Use `scripts/validate_migration_ledger.py` when the convergence adopts the portable ledger shape in the reference. From this repository's root, run `python3 -m unittest -v skills/decide-architecture-shape/scripts/test_validate_migration_ledger.py` after changing the validator. A simple single-repository refactor uses the repo's existing verification entrypoint. Prefer an existing repo-native schema and validator when one already owns this fact.
- Load the target repositories' local architecture, delivery, and safety rules. This portfolio skill does not replace them.
- Apply Engineering Standard **Quality North Star** (Depth/Simplicity first;
  compose, do not cut capability; default quality precedence on tradeoffs) from
  `../build-product/references/engineering-standard/` when choosing shape or
  recording rejected alternatives.

## Workflow

1. Define the source and target boundaries. Name the repos, runtimes, customer-visible invariants, persistence surfaces, delivery paths, and evidence that would prove a completed cutover.
2. Freeze the denominator as capabilities plus their important sub-capabilities,
   behaviors, invariants, contracts, scenarios, surfaces, state transitions, and
   external effects. Include applicable module graph, state authorities,
   process ownership, availability/cell topology, control/data-plane,
   deployment, trust, interoperability, and extension boundaries. Files and
   lines are implementation mappings, not the semantic denominator.
3. Cut vertical slices. Each slice must have one observable job, a stable
   boundary, a target implementation, parity proof, an authority switch, a
   verification probe at the declared lifecycle stage, and a rollback or
   forward-recovery path. A system-boundary slice also names its state class,
   failure domain, deployment/placement effect, and recovery authority.
4. Establish the contract before parallel implementation. Use one executable schema or public interface as the source of truth; derive language bindings and fixtures instead of hand-maintaining mirrors.
5. Build the execution graph. Serialize shared contracts, migrations,
   registries, configuration schemas, and CI workflows. Parallelize only
   materially complex, bounded, independently useful slices with disjoint
   write sets when the expected speed or quality gain exceeds coordination,
   resource, and integration cost. Atomic inspection and tightly coupled work
   stay local.
6. Select cutover with a hard-cut terminal at every lifecycle stage: destination
   sole writer, predecessor retired. Stage changes proof intensity, not dual-
   system philosophy. Prefer one verified candidate cutover and delete the old
   structure. Temporary dual-write/shadow or expand steps only under
   `eng-hard-cut-01` risk-class and procedure gates (money/conserved value,
   multi-tenant shared blast, large online DDL/lock, external un-updatable
   clients, irreversible external effects—with named failure mode, dated owner
   contract, readiness oracles, and recovery drill). Schema multi-step stays
   inside the destination system and is not a second product path. Preserve one
   write authority at the terminal.
7. Prove observable equivalence. Run the source and target against the same deterministic corpus and compare complete normalized outputs, errors, ordering, state effects, events, retries, and operational behavior at exact source and target revisions.
8. Make proof expire. Route source, target, contract, shared-constant, config, schema, and migration changes to affected capabilities. Retain the last proof for audit, mark it stale, and block authority promotion until exact candidate revisions and artifact digest are compared again.
9. Cut over with evidence appropriate to the stage. Prefer boundary-complete,
   risk-matched semantic review, differential/property tests, replay,
   simulation, and exact-candidate integration proof. Add shadow/canary only
   under the same eng-hard-cut-01 gates when residual risk requires it—not as
   a default calendar delay.
10. Contract immediately after the selected proof establishes target authority.
   Remove source implementation, obsolete structure, compatibility switches,
   obsolete fixtures, source-parity/no-old-path gates, mutable migration ledgers,
   and rebind workflows that no longer protect a live compatibility boundary;
   do not create a permanent dual generation or permanent migration CI. A
   residual is incomplete status, not permission to keep dual systems. A
   retained compatibility adapter must serve named current consumers, delegate
   one way to the target, own no domain policy or authoritative writes, be
   unavailable to new consumers by default, expose protected usage or
   contract-support evidence, and have an exact retirement predicate under
   eng-hard-cut-01.
11. Reconcile the migration ledger from merged and deployed evidence. Report implementation, merge, deployment, active implementation, and retirement as separate states.

## Done look

- Equivalence is the same corpus on source and target: outputs, errors, order, state, events, retries. Compilation and health probes are characterization.
- Proof binds source revision, target revision, artifact digest, and the stage the terminal names. Live observation is part of that bind when the terminal is live.
- Progress is completed capabilities and weighted risk.
- A code-architecture slice changes responsibility in product code. A system-architecture terminal names state, process, cell, plane, deploy, trust, and extension boundaries.
- One writer at the terminal. Temporary dual paths use the hard-cut gates. Retirement removes the predecessor from the dependency, build, export, and runtime graph.
- Parity tests leave irreversible side effects on the destination only.
- Shared contracts land or serialize before two agents write them.
- A slice advances when its oracles pass. Cutover is destination sole writer and predecessor retired.


## Progressive disclosure

- [references/architecture-convergence-patterns.md](references/architecture-convergence-patterns.md) — open when needed for depth

## Output format

```text
Architecture Convergence Packet

Source / target / boundary:
Industry pattern mix:
Acceptance invariants:
Applicable system dimensions:

Capability ledger:
| Repo | Capability | State/authority boundary | Source proof | Target proof | Drift status | Next gate |

Slice graph:
| Slice | Observable job | Contract | Write set | Depends on | Parallel lane | Owner |

Parity and cutover:
| Slice | Differential corpus | State effects | Stage/probe | Guardrail | Rollback |

Control-plane decisions:
- Serialized choke points:
- Unclassified changes:
- Stale proofs:
- Merge/deploy/readback state:

Verdict:
- safe to fan out / blocked
- safe to cut over / blocked
- safe to retire source / blocked
```

