# decide-architecture-shape

> **Sylphx company method** (folder inside `sylphx-methods`; open from INDEX).
> Former package class in old catalog → now progressive documentation under this skill's `references/` tree.
>
> **Job summary:** Decide one architecture shape from options with tradeoffs and residuals (not open design-space mapping alone).

Open deeper files in this folder only when needed.

---

# Decide Architecture Shape

Turn a substantial architecture change into independently verifiable
convergence slices. The same terminal applies whether the implementation spans
one repository or many. Optimize for verified throughput: disjoint slices may
advance in parallel when doing so has positive net value, but no slice advances
on narrative status or stale proof.

## Resource guide

- Read `references/decide-architecture-shape-patterns.md` before choosing slice boundaries, states, parity gates, concurrency, or cutover policy.
- Use `scripts/validate_migration_ledger.py` only when the convergence adopts the portable ledger shape in the reference. From this repository's root, run `python3 -m unittest -v skills/decide-architecture-shape/scripts/test_validate_migration_ledger.py` after changing the validator. A simple single-repository refactor does not need a ledger merely to use this Skill. Reuse the repository's existing proportional verification entrypoint when ledger validity is material; do not add a dedicated CI workflow merely because the portable validator exists. Prefer an existing repo-native schema and validator when one already owns this fact.
- Load the target repositories' local architecture, delivery, and safety rules. This portfolio skill does not replace them.

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
6. Select the shortest safe cutover from the real lifecycle stage. In
   development or internal dogfood without real-user state risk, cut over and
   delete the old structure in one verified candidate. Use expand-contract only
   when a demonstrated live compatibility, data, or external-effect risk needs
   concurrent paths; preserve one write authority.
7. Prove observable equivalence. Run the source and target against the same deterministic corpus and compare complete normalized outputs, errors, ordering, state effects, events, retries, and operational behavior at exact source and target revisions.
8. Make proof expire. Route source, target, contract, shared-constant, config, schema, and migration changes to affected capabilities. Retain the last proof for audit, mark it stale, and block authority promotion until exact candidate revisions and artifact digest are compared again.
9. Cut over with evidence appropriate to the stage. Prefer boundary-complete,
   risk-matched semantic review, differential/property tests, replay,
   simulation, and exact-candidate integration proof. Add shadow/canary only
   when the residual claim genuinely requires live traffic or elapsed time.
10. Contract immediately after the selected proof establishes target authority.
   Remove source implementation, obsolete structure, compatibility switches,
   obsolete fixtures, source-parity/no-old-path gates, mutable migration ledgers,
   and rebind workflows that no longer protect a live compatibility boundary;
   do not create a permanent dual generation or permanent migration CI. A
   retained compatibility adapter must serve named current consumers, delegate
   one way to the target, own no domain policy or authoritative writes, be
   unavailable to new consumers by default, expose protected usage or
   contract-support evidence, and have an exact retirement predicate.
11. Reconcile the migration ledger from merged and deployed evidence. Report implementation, merge, deployment, active implementation, and retirement as separate states.

## Validation integrity

- Treat a one-time golden baseline as characterization evidence, not permanent parity proof.
- Do not accept skipped tests, missing fixtures, health-only probes, or successful compilation as behavioral equivalence.
- Bind proof to source revision, target revision, target artifact digest,
  contract digest, behavior-spec digest, corpus digest, and verification
  readback at the declared stage. Require deploy/live readback only when the
  terminal includes deployed or live authority.
- Fail on unclassified tracked migration changes. A dashboard, comment, or manually edited state is not a gate.
- Measure progress by completed capabilities and weighted risk, never migrated line count or repo count alone.
- A metadata/docs/folder-only migration cannot complete a code-architecture
  slice. The candidate must change responsibility and dependency boundaries in
  real product code when the audit finds structural gaps.
- A code-only module move cannot complete a full system-architecture terminal
  when an applicable state, process, cell, control/data-plane, deployment,
  trust, event/telemetry, or extension boundary remains implicit or violated.

## Guardrails

- Do not maintain multiple implementations as competing steady-state truth.
  A one-step development cutover is valid when exact-candidate proof and source
  control recovery cover the material risk.
- Do not treat a deprecated comment, `legacy` folder, disabled route, or
  currently unused registration as retirement while the predecessor remains in
  the normal dependency, build, export, generation, or runtime graph.
- Do not double-execute payments, notifications, destructive writes, or other irreversible side effects for parity testing.
- Do not let two agents edit the same shared choke point concurrently; land or serialize the contract first.
- Do not require production readback for a development-only structural claim.
  Require live readback only when runtime authority or live behavior is part of
  the declared terminal.
- Do not call a scaffold, plan, local diff, open pull request, merged change, or healthy process a completed cutover.
- Do not weaken tests, fixtures, thresholds, or changed-file classification to make a slice advance.

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

## Soft composition

- When landing source: compose `source-authoring-standard` — **L1** batch, **L2** atomic commits, **L3** revert-safe PR outcome(s).
