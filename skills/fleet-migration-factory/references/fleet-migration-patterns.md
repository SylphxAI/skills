# Fleet Migration Factory Patterns

Use these patterns to design a high-throughput modernization without confusing parallel activity with verified cutover.

## Industry vocabulary

No single industry term covers the complete method. Use the combination that describes the actual mechanism.

| Pattern | What it contributes | Common misuse |
| --- | --- | --- |
| Strangler Fig migration | Replace a legacy system incrementally behind stable boundaries | Calling a greenfield rewrite a strangler while traffic still jumps in one big bang |
| Branch by Abstraction | Put source and target implementations behind one abstraction, switch authority, then remove the source | Keeping the abstraction and both implementations forever |
| Parallel Change / Expand-Migrate-Contract | Add a compatible contract, migrate consumers and data, then remove the old shape | Contracting before every consumer and rollback path has moved |
| Vertical Slice delivery | Move one observable capability end to end through contract, implementation, proof, deploy, and recovery | Shipping horizontal scaffolds that no caller can use |
| Characterization / Golden Master testing | Capture current observable behavior, including awkward legacy behavior | Treating one frozen fixture as proof against future source changes |
| Differential testing | Execute source and target on the same corpus and compare normalized observations | Comparing the target to another target-layer helper instead of the source implementation |
| Parallel run / shadowing | Observe both paths before authority changes | Duplicating irreversible writes or exposing shadow output to users |
| Canary / progressive delivery | Move a bounded cohort while guardrails decide promote, pause, or roll back | Increasing traffic without explicit metrics and decision thresholds |
| Migration factory | Standardize inventory, slicing, work packets, gates, evidence, and waves across a portfolio | Maximizing open work and PR count instead of completed verified throughput |
| Fan-out / fan-in orchestration | Run independent slices concurrently and reconcile their proof centrally | Parallelizing shared choke points or accepting narrative completion reports |
| One-step architecture cutover | Refactor a development-stage candidate, prove semantics, and remove predecessor structure in one landing | Treating Git reversibility as permission to skip tests or using a live dual-run where no live hypothesis exists |

Useful public orientation: Martin Fowler's descriptions of [Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html) and [Branch by Abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html), plus AWS Prescriptive Guidance on [migration-factory operating models](https://docs.aws.amazon.com/prescriptive-guidance/latest/application-portfolio-assessment-guide/migration-factory.html). This reference is an original synthesis, not a restatement of those sources.

## Rule IDs

- `fleet-migration-1` — Freeze a semantic denominator before reporting progress: capabilities plus important behaviors, invariants, contracts, scenarios, surfaces, and effects—not files, repositories, commits, or lines.
- `fleet-migration-2` — Make each slice vertically complete: boundary, target implementation, proof, delivery, authority switch, and recovery.
- `fleet-migration-3` — Establish one contract source of truth before parallel work. Generated projections are outputs, never coordination surfaces.
- `fleet-migration-4` — Separate source authority, target availability, target authority, and source retirement. None implies the next.
- `fleet-migration-5` — Bind parity proof to exact source and target revisions, target artifact digest, and contract, behavior, and corpus digests.
- `fleet-migration-6` — Invalidate proof whenever a mapped source, target, contract, or dependency surface changes. Stale proof cannot authorize cutover.
- `fleet-migration-7` — Fail on unclassified tracked migration changes. Classification gaps are control-plane defects.
- `fleet-migration-8` — Compare full observable semantics: success, absence, errors, ordering, defaults, state effects, retries, concurrency, and operational envelopes.
- `fleet-migration-9` — Keep one write authority. Shadow decisions or use isolated replay for irreversible effects.
- `fleet-migration-10` — Parallelize disjoint slices; serialize contracts, migrations, registries, configuration schemas, and delivery workflows.
- `fleet-migration-11` — Validate the exact integration candidate and deployed artifact, not an earlier branch head or local build.
- `fleet-migration-12` — Retire the source after the stage-appropriate target-authority and recovery criteria pass; live readback is required only for a live runtime claim.
- `fleet-migration-13` — Regress a slice to `stale` rather than preserving optimistic status after source drift.
- `fleet-migration-14` — Separate documented target, implemented code, merged state, deployed state, runtime authority, and retired source in every report.
- `fleet-migration-15` — Cap work in progress by verification and merge capacity. More open slices are not more throughput.

## Slice qualification table

| Candidate | Good slice? | Reason |
| --- | --- | --- |
| One API method group backed by one bounded context and data surface | Usually | Independently contractable, testable, switchable, and recoverable |
| One MCP tool family with stable tool schemas and transport boundary | Usually | Caller-visible contract and authority can move together |
| One worker job type with explicit input, idempotency, effects, and replay | Usually | State effects and recovery can be proven independently |
| Create a target-language workspace and health route | No | Foundation only; no product behavior moved |
| Rewrite 10,000 lines | No | Size is not an observable capability or cutover boundary |
| Replace the entire monolith | No | Too large to compare, deploy, or roll back independently |
| Introduce the shared contract used by many later slices | Foundation slice | Serialize and land first; do not claim product cutover |

For a canonical architecture migration, a qualified slice also maps the
capability definition to domain/application/ports/adapters/interfaces, names
god-responsibility and dependency-direction gaps, and includes real code
movement plus semantic tests. Adding FCCP metadata, empty folders, re-exports,
or a narrative audit is not a migrated slice.

A slice is ready for fan-out only when these answers are explicit:

```text
observable_job
source_surfaces
dependency_surfaces
contract_owner
target_surfaces
parity_oracle
side_effect_policy
authority_switch
runtime_probe
recovery_path
write_set
dependencies
```

## Proof-bound state machine

```text
source_only
  -> contracted
  -> target_implemented
  -> parity_proven
  -> cutover_ready
  -> authority_target
  -> source_retired

parity_proven | cutover_ready | authority_target
  -- mapped source/target/contract/dependency change --> stale

stale
  -- target refreshed + exact candidate differential proof --> parity_proven
```

State entry conditions:

| State | Minimum machine evidence |
| --- | --- |
| `source_only` | Capability ID plus source, target, contract, dependency, and tracked-scope mappings |
| `contracted` | Executable contract location and compatibility direction |
| `target_implemented` | Target surfaces compile and run through the contract |
| `parity_proven` | Differential artifact bound to revisions and digests |
| `cutover_ready` | Runtime probe, guardrails, authority switch, and recovery path |
| `authority_target` | Deployed artifact readback and target-authority observation |
| `source_retired` | Source absence proof, cleanup evidence, and reintroduction gate |
| `stale` | Previous advanced state, drift reason/ref/time, contract, target globs, and last valid proof retained for audit only |

## Portable capability ledger

Use an existing repository schema when one owns this state. Otherwise the bundled validator accepts this minimum shape:

```json
{
  "schemaVersion": 1,
  "migrationId": "runtime-modernization-2026",
  "repos": [
    {
      "repo": "example/service",
      "sourceRuntime": "typescript",
      "targetRuntime": "rust",
      "baselineSourceRef": "SOURCE_SHA_AT_INVENTORY",
      "currentSourceRef": "CURRENT_SOURCE_SHA",
      "currentTargetRef": "CURRENT_TARGET_SHA",
      "trackedScopeGlobs": [
        "src/backend/**",
        "crates/**",
        "config/runtime/**",
        "db/schema/**",
        "proto/**"
      ],
      "capabilities": [
        {
          "id": "orders.list",
          "state": "parity_proven",
          "sourceGlobs": ["src/backend/orders/**"],
          "targetGlobs": ["crates/orders-api/**"],
          "dependencyGlobs": ["config/runtime/orders.*", "db/schema/**"],
          "contract": "proto/orders/v1/orders.proto",
          "contractGlobs": ["proto/shared/**"],
          "proof": {
            "sourceRef": "EXACT_CANDIDATE_SHA",
            "targetRef": "EXACT_TARGET_SHA",
            "contractDigest": "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "behaviorSpecDigest": "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
            "corpusDigest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
            "targetArtifactDigest": "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
            "artifact": "ci://run/parity/orders.list"
          },
          "cutover": {
            "mechanism": "flag:orders-rust-authority",
            "rollback": "disable flag and verify source probe",
            "prodProbe": "probe://orders-list"
          }
        }
      ]
    }
  ]
}
```

Run structural validation:

```bash
python3 skills/fleet-migration-factory/scripts/validate_fleet_ledger.py migration-ledger.json
```

Run source-drift admission for one repository and exact candidate:

```bash
git diff --name-only BASE_SHA HEAD_SHA > changed-files.txt
python3 skills/fleet-migration-factory/scripts/validate_fleet_ledger.py migration-ledger.json \
  --repo example/service \
  --changed-files changed-files.txt \
  --candidate-source-ref SOURCE_HEAD_SHA \
  --candidate-target-ref TARGET_HEAD_SHA \
  --candidate-target-artifact-digest sha256:<64-lowercase-hex>
```

## Source-change routing algorithm

```text
changed files
  -> map every file to capability sourceGlobs + targetGlobs + contract + dependencyGlobs
  -> route every declared match even when trackedScopeGlobs is incomplete
  -> use trackedScopeGlobs to discover unmatched migration files
  -> fail if any tracked file remains unclassified
  -> for every affected capability:
       source_retired + sourceGlobs => fail source reintroduction
       source_retired + target/contract/dependency => allow normal target-era evolution
       parity_proven/cutover_ready/authority_target => require exact source ref,
         target ref, and target artifact digest for the affected dimensions
       stale => retain last proof, allow repair work, block promotion
       earlier state => record affected slice, no parity claim exists yet
```

Treat shared constants, default values, schemas, migrations, permissions, config, and generated inputs as dependencies. Keep `trackedScopeGlobs` broad enough to discover unmapped migration work, but never use it to suppress a path already declared by a capability. Mapping only implementation files is not sound.

## Differential proof matrix

| Boundary | Compare | Safe technique |
| --- | --- | --- |
| Pure calculation | Values, errors, precision, overflow, determinism | Generated and property-based corpus through both implementations |
| Read API | Full fields, presence/null, ordering, filtering, pagination, errors | Seeded database plus source/target invocation; safe shadow reads in runtime |
| Write API | Decision, validation, DB state, events, outbox, idempotency | Isolated transactions, snapshot/replay, or pure decision extraction |
| Worker/job | State transitions, retry schedule, dedupe, timeout, emitted effects | Deterministic clock, fake effect sinks, replayable input corpus |
| Stream/protocol | Framing, cancellation, backpressure, ordering, partial failure | Contract fixtures, fault injection, bounded load tests |
| Auth/permission | Allow/deny result, error classification, audit event | Policy corpus with positive and negative identities |
| Operational surface | Config defaults, health/readiness, traces, metrics, latency/SLO | Candidate deploy, synthetic probes, canary analysis, artifact readback |

Normalize only declared nondeterminism such as timestamps, generated IDs, trace IDs, or unordered sets. Never normalize a real semantic mismatch away.

## Parallel execution decision table

| Relationship | Execution policy | Why |
| --- | --- | --- |
| Different repos, no shared contract | Parallel | Independent failure and merge domains |
| Same repo, disjoint bounded contexts and write sets | Parallel | Local validation can isolate changes |
| Shared contract with many consumers | Contract first, then parallel consumers | Prevents incompatible shapes and duplicate truth |
| Shared migration, route registry, env schema, lockfile, or CI workflow | Serialize | These are merge and semantic choke points |
| Ordered data/API/UI change | Stacked vertical slices | Each candidate remains reviewable and independently gated |
| Verification capacity saturated | Stop fan-out and drain proof queue | Work in progress hides rather than increases throughput |

## Cutover decision table

| Evidence | Promote | Pause | Regress |
| --- | --- | --- | --- |
| Exact candidate parity and healthy canary | Advance one bounded cohort or authority state | — | — |
| Contract compatible but semantic mismatch | — | Keep source authority | `target_implemented` |
| Source/dependency changed after proof | — | Block promotion | `stale` |
| Runtime guardrail breached | — | Stop exposure | Roll back authority or forward-fix by policy |
| Probe skipped, missing, or exercises only health | — | Keep current authority | Do not count proof |
| Target authoritative and recovery window complete | Retire source | — | — |

### Lifecycle-stage selection

| Stage | Default migration strategy |
| --- | --- |
| Development | One exact-candidate code cutover; exhaustive tests/replay; delete old structure immediately |
| Internal dogfood without external users | One-step where state/effects are reversible; otherwise a short synthetic/shadow boundary check |
| Internal beta with real users | Expand-contract only for affected compatibility/data/effect paths; bounded exposure and automatic rollback |
| Public production | Risk-proportionate progressive authority switch and live readback after full pre-production proof |

No fixed-day soak is implied. Any calendar wait must name a time-dependent
hypothesis that active proof cannot credibly test.

## Fleet event schema

```text
migration_event:
  migration_id:
  repo:
  capability_id:
  previous_state:
  next_state:
  source_ref:
  target_ref:
  contract_digest:
  behavior_spec_digest:
  corpus_digest:
  artifact_digest:
  proof_artifact:
  runtime_probe:
  actor_or_work_item:
  observed_at:
  decision: promote | pause | regress | retire
  reason:
```

## Readiness checklist

- Capability denominator is frozen and generated or validated.
- Every slice has one owner, disjoint write set, dependencies, and recovery path.
- Shared choke points are explicitly serialized.
- Contracts and generated artifacts have freshness and compatibility gates.
- Differential tests invoke the real source and target paths.
- Writes use isolated replay or one-authority comparison.
- Proof is bound to exact revisions and digests.
- Source, target, contract, and dependency changes invalidate affected proof.
- Unclassified tracked migration changes fail admission.
- Merge, deploy, runtime authority, and retirement are reported separately.
- Production probes verify product behavior and artifact identity.
- Source deletion has passed and source reintroduction is blocked.
