---
name: multi-repository-migration
description: "Plan, execute, and audit a software or architecture migration across multiple repositories. Use for organization-wide Capability-first DDD adoption, language/runtime rewrites, monolith restructuring, drop-in replacements, or required architecture cutovers. Inventory capabilities plus behaviors/contracts/surfaces, refactor real code, prove exact-candidate semantics, choose one-step versus expand-contract from lifecycle risk, retire legacy structure, and invalidate stale proof."
---

# Multi-Repository Migration

Turn a large rewrite into independently verifiable cutovers. Optimize for
verified throughput: many disjoint slices may advance in parallel, but no slice
advances on narrative status or stale proof.

## Resource guide

- Read `references/multi-repository-migration-patterns.md` before choosing slice boundaries, states, parity gates, concurrency, or cutover policy.
- Use `scripts/validate_migration_ledger.py` when the migration adopts the portable ledger shape in the reference. From this repository's root, run `python3 -m unittest -v skills/multi-repository-migration/scripts/test_validate_migration_ledger.py` after changing the validator; the same suite belongs in the repository check and CI gates. Prefer an existing repo-native schema and validator when one already owns this fact.
- Load the target repositories' local architecture, delivery, and safety rules. This portfolio skill does not replace them.

## Workflow

1. Define the source and target boundaries. Name the repos, runtimes, customer-visible invariants, persistence surfaces, delivery paths, and evidence that would prove a completed cutover.
2. Freeze the denominator as capabilities plus their important sub-capabilities,
   behaviors, invariants, contracts, scenarios, surfaces, state transitions, and
   external effects. Files and lines are implementation mappings, not the
   semantic denominator.
3. Cut vertical slices. Each slice must have one observable job, a stable boundary, a target implementation, parity proof, an authority switch, a production probe, and a rollback or forward-recovery path.
4. Establish the contract before parallel implementation. Use one executable schema or public interface as the source of truth; derive language bindings and fixtures instead of hand-maintaining mirrors.
5. Build the execution graph. Serialize shared contracts, migrations, registries, configuration schemas, and CI workflows. Fan out slices with disjoint write sets and one accountable owner per slice.
6. Select the shortest safe cutover from the real lifecycle stage. In
   development or internal dogfood without real-user state risk, migrate and
   delete the old structure in one verified candidate. Use expand-contract only
   when a demonstrated live compatibility, data, or external-effect risk needs
   concurrent paths; preserve one write authority.
7. Prove observable equivalence. Run the source and target against the same deterministic corpus and compare complete normalized outputs, errors, ordering, state effects, events, retries, and operational behavior at exact source and target revisions.
8. Make proof expire. Route source, target, contract, shared-constant, config, schema, and migration changes to affected capabilities. Retain the last proof for audit, mark it stale, and block authority promotion until exact candidate revisions and artifact digest are compared again.
9. Cut over with evidence appropriate to the stage. Prefer exhaustive semantic
   review, differential/property tests, replay, simulation, and exact-candidate
   integration proof. Add shadow/canary only when the residual claim genuinely
   requires live traffic or elapsed time.
10. Contract immediately after the selected proof establishes target authority.
   Remove source implementation, obsolete structure, compatibility switches,
   and obsolete fixtures; do not create a permanent dual generation.
11. Reconcile the migration ledger from merged and deployed evidence. Report implementation, merge, deployment, active implementation, and retirement as separate states.

## Validation integrity

- Treat a one-time golden baseline as characterization evidence, not permanent parity proof.
- Do not accept skipped tests, missing fixtures, health-only probes, or successful compilation as behavioral equivalence.
- Bind proof to source revision, target revision, target artifact digest, contract digest, behavior-spec digest, corpus digest, and deploy readback.
- Fail on unclassified tracked migration changes. A dashboard, comment, or manually edited state is not a gate.
- Measure progress by completed capabilities and weighted risk, never migrated line count or repo count alone.
- A metadata/docs/folder-only migration cannot complete a code-architecture
  slice. The candidate must change responsibility and dependency boundaries in
  real product code when the audit finds structural gaps.

## When not to use

- Use a data-migration runbook for customer records, CSV/schema mapping, backfills, or data reconciliation between systems.
- Use a feature-rollout plan when the job is only staged exposure of one already-implemented feature.
- Use a normal implementation plan for a small single-boundary task that does not need parallel source/target implementations or a capability ledger.
- Do not use this skill to justify a rewrite when deletion, a local refactor, or retaining the current runtime is the stronger option.

## Guardrails

- Do not maintain multiple implementations as competing steady-state truth.
  A one-step development cutover is valid when exact-candidate proof and source
  control recovery cover the material risk.
- Do not double-execute payments, notifications, destructive writes, or other irreversible side effects for parity testing.
- Do not let two agents edit the same shared choke point concurrently; land or serialize the contract first.
- Do not require production readback for a development-only structural claim.
  Require live readback only when runtime authority or live behavior is part of
  the declared terminal.
- Do not call a scaffold, plan, local diff, open pull request, merged change, or healthy process a completed cutover.
- Do not weaken tests, fixtures, thresholds, or changed-file classification to make a slice advance.

## Output format

```text
Multi-Repository Migration Packet

Source / target / boundary:
Industry pattern mix:
Acceptance invariants:

Capability ledger:
| Repo | Capability | State | Source proof | Target proof | Drift status | Next gate |

Slice graph:
| Slice | Observable job | Contract | Write set | Depends on | Parallel lane | Owner |

Parity and cutover:
| Slice | Differential corpus | State effects | Runtime probe | Guardrail | Rollback |

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
