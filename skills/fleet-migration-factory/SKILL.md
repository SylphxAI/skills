---
name: fleet-migration-factory
description: "Plan, execute, and audit high-throughput software modernization as a migration factory: inventory capabilities across repositories, cut contract-first vertical slices, run legacy and target implementations in parallel, prove differential parity, coordinate disjoint agents and pull requests, switch runtime authority, retire legacy paths, and invalidate stale proof when source, target, contract, or dependency behavior changes. Use for multi-repo rewrites, Rust/Go/Java migrations, monolith extraction, drop-in replacements, fleet cutovers, or Cantonese requests such as 全fleet平行重寫, 逐個slice cutover, and 確保唔漏舊版本更新. Do not use for customer data imports, a single feature-flag rollout, or a small local refactor."
---

# Fleet Migration Factory

Turn a large rewrite into a repeatable assembly line of independently verifiable cutovers. Optimize for verified throughput: many disjoint slices may advance in parallel, but no slice advances on narrative status or stale proof.

## Resource guide

- Read `references/fleet-migration-patterns.md` before choosing slice boundaries, states, parity gates, concurrency, or cutover policy.
- Use `scripts/validate_fleet_ledger.py` when the migration adopts the portable ledger shape in the reference. From this repository's root, run `python3 -m unittest -v skills/fleet-migration-factory/scripts/test_validate_fleet_ledger.py` after changing the validator; the same suite belongs in the repository check and CI gates. Prefer an existing repo-native schema and validator when one already owns this fact.
- Load the target repositories' local architecture, delivery, and safety rules. This portfolio skill does not replace them.

## Workflow

1. Define the source and target boundaries. Name the repos, runtimes, customer-visible invariants, persistence surfaces, delivery paths, and evidence that would prove a completed cutover.
2. Freeze the denominator as capabilities, not files or lines of code. Inventory routes, RPCs, tools, jobs, commands, events, and state transitions; map each to source, target, contract, and dependency globs inside one tracked migration scope.
3. Cut vertical slices. Each slice must have one observable job, a stable boundary, a target implementation, parity proof, an authority switch, a production probe, and a rollback or forward-recovery path.
4. Establish the contract before parallel implementation. Use one executable schema or public interface as the source of truth; derive language bindings and fixtures instead of hand-maintaining mirrors.
5. Build the execution graph. Serialize shared contracts, migrations, registries, configuration schemas, and CI workflows. Fan out slices with disjoint write sets and one accountable owner per slice.
6. Expand before contracting. Add the target path beside the source path, preserve one write authority, and make the switching mechanism observable and reversible.
7. Prove observable equivalence. Run the source and target against the same deterministic corpus and compare complete normalized outputs, errors, ordering, state effects, events, retries, and operational behavior at exact source and target revisions.
8. Make proof expire. Route source, target, contract, shared-constant, config, schema, and migration changes to affected capabilities. Retain the last proof for audit, mark it stale, and block authority promotion until exact candidate revisions and artifact digest are compared again.
9. Cut over progressively. Shadow safe reads, replay or compare write decisions without duplicating irreversible side effects, canary the target, evaluate explicit guardrails, and switch authority only when the runtime readback matches the candidate artifact.
10. Contract only after live proof. Remove the source implementation, compatibility switch, and obsolete fixtures only after the target is authoritative, rollback policy is satisfied, and source reintroduction is mechanically blocked.
11. Reconcile the fleet ledger from merged and deployed evidence. Report implementation, merge, deployment, authority, and retirement as separate states.

## Validation integrity

- Treat a one-time golden baseline as characterization evidence, not permanent parity proof.
- Do not accept skipped tests, missing fixtures, health-only probes, or successful compilation as behavioral equivalence.
- Bind proof to source revision, target revision, target artifact digest, contract digest, behavior-spec digest, corpus digest, and deploy readback.
- Fail on unclassified tracked migration changes. A dashboard, comment, or manually edited state is not a gate.
- Measure progress by completed capabilities and weighted risk, never migrated line count or repo count alone.

## When not to use

- Use a data-migration runbook for customer records, CSV/schema mapping, backfills, or data reconciliation between systems.
- Use a feature-rollout plan when the job is only staged exposure of one already-implemented feature.
- Use a normal implementation plan for a small single-boundary task that does not need parallel source/target implementations or a capability ledger.
- Do not use this skill to justify a rewrite when deletion, a local refactor, or retaining the current runtime is the stronger option.

## Guardrails

- Do not big-bang a reversible boundary or allow multiple implementations to become competing sources of truth.
- Do not double-execute payments, notifications, destructive writes, or other irreversible side effects for parity testing.
- Do not let two agents edit the same shared choke point concurrently; land or serialize the contract first.
- Do not delete the source path before candidate-bound parity, production readback, and recovery evidence exist.
- Do not call a scaffold, plan, local diff, open pull request, merged change, or healthy process a completed cutover.
- Do not weaken tests, fixtures, thresholds, or changed-file classification to make a slice advance.

## Output format

```text
Fleet Migration Packet

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
