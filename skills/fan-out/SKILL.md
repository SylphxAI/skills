---
name: fan-out
description: "Use when decomposing a multi-part goal, partitioning work across parallel agents or workers, processing independent shards, modules, repositories, channels, or time windows concurrently, deciding what to run in parallel versus serialize on causal dependencies or shared write locks, or writing disjoint slice contracts. Use swarm-fuse for independent viewpoints that can change one decision, deliver-and-verify for shipping and verifying a single slice, and direct single-agent work when a cohesive task needs no split."
---

# Fan out along causal boundaries

Minimize wall-clock critical-path span (`T_infinity` in the work-span DAG model; Amdahl 1967, Blumofe & Leiserson 1999) to a verified outcome by dispatching causally independent work concurrently, while keeping zero conflicting writes to any shared mutable target and zero relay overhead on cohesive single-owner tasks.

## 1. Maximize causal parallelism without arbitrary count caps

Let the problem's causal dependency graph set the fan-out width, never a fixed worker-count quota. Whenever ready work splits cleanly across independent data shards, time windows, external channels or endpoints, database tables or tenants, packages, modules, or repositories, dispatch all independent slices concurrently:

- **Match width to independent partitions:** Twelve independent shards, packages, or channel checks run twelve ways in parallel rather than queuing behind a single worker or an arbitrary fixed cap.
- **Throttle only on a measured real constraint:** Bound concurrency only when primary evidence shows shared compute or memory saturation, external API rate or spend quotas, or lock contention—and state the limiting constraint explicitly.
- **Group hierarchy by sub-domain coordination, not headcount:** Introduce an intermediate coordinator only when a distinct sub-domain requires its own multi-step internal dependency loop across sub-slices, never to satisfy an arbitrary child-count limit.

## 2. Serialize only on true dependencies or shared write locks

Order two units sequentially only when downstream work genuinely consumes an artifact, state transition, or interface contract produced upstream, or when both mutate the same file range, branch, database lock scope, or live configuration:

- **Lock minimal shared interfaces first, then fan out:** When parallel modules share a schema, API signature, or wire contract, establish that minimal interface once upstream and immediately fan out all independent implementations, callers, and tests concurrently.
- **Parallel read/probe + disjoint or single-writer mutation:** Fan out read-only discovery, audits, benchmarks, and post-deploy checks concurrently across every target surface ([prove-it](../prove-it/SKILL.md)). Route state changes either to strictly disjoint write scopes (one named writer per worktree, pull request, table range, or live resource) or through one integrating writer ([deliver-and-verify](../deliver-and-verify/SKILL.md)).

## 3. Execute atomic work directly with zero relay ceremony

Parallelism saves wall-clock time only when `max(slice_duration) + coordination_overhead < single_worker_duration`:

- **Cohesive single-target tasks stay with one worker:** When a change fits one cohesive write scope and direct execution finishes faster than slicing, briefing, waiting, and integrating, execute it directly end-to-end.
- **Never spawn a 1-to-1 relay:** Never place a pass-through coordinator or single child wrapper in front of one cohesive task; a 1-to-1 relay adds latency and drops context while contributing zero parallelism.

## 4. Write crisp, self-contained slice contracts

Parallel slices integrate on the first pass only when each worker can finish and verify its slice without guessing hidden context or colliding with peers. Every dispatched slice contract states four fields:

1. **Outcome and acceptance check:** The exact finished behavior, artifact, or question this slice owns and the observable positive and negative checks that prove it ([author-item](../author-item/SKILL.md)).
2. **Disjoint write boundary:** Exact files, directories, branch/worktree, shard key range, or `read-only` constraint owned by this worker, plus adjacent targets it must not mutate.
3. **Authoritative inputs and locked contracts:** Primary sources, revisions, and shared schemas or interfaces to read directly rather than relying on unstated conversation history.
4. **Return format:** The exact merged revision, structured findings, or verification receipt expected back so integration requires zero rework.

## Contrastive decisions

| Scenario | ❌ Bad (artificial cap, false serialization, or collision) | ✅ Good (causal parallelism + disjoint ownership) |
| --- | --- | --- |
| Migrating or auditing 10 independent packages or data shards | Process all 10 sequentially in one session, or cap dispatch at an arbitrary 3 workers while 7 ready slices sit idle | Fan out all 10 independent slices concurrently, bounded only by measured runner, API, or spend capacity |
| Updating 6 services that share a new event schema | Spawn 6 parallel writers before the schema exists so each invents incompatible fields and collides | Lock the minimal shared event schema once, then fan out all 6 service implementations concurrently in isolated worktrees |
| Auditing 8 live endpoints and updating one summary report | Run 8 checks serially with one writer, or let 8 workers edit the same report file concurrently | Fan out 8 concurrent read-only probes returning structured receipts, and have 1 writer integrate the report |
| Fixing a self-contained bug in one module | Spawn a sub-coordinator or a 1-to-1 worker relay to repeat the same single-module fix | Execute and verify the cohesive fix directly end-to-end with zero relay hops |
| Multi-stream initiative with 9 independent leaf tasks vs. 2 coupled subsystems | Force an extra coordinator layer solely because `9 > 5`, or flatten coupled multi-step subsystems without their own dependency loop | Keep flat fan-out across independent leaves; add a sub-coordinator only where a subsystem has its own internal multi-step dependency graph |

## Neighbouring methods

- When independent viewpoints, competing hypotheses, or adversarial falsifiers can change **one** architectural, root-cause, or commercial decision, use [swarm-fuse](../swarm-fuse/SKILL.md).
- When prioritizing competing outcomes by cost of delay or defining Stage 1 acceptance criteria, use [author-item](../author-item/SKILL.md) and [work decomposition](../author-item/references/work.md#planning-and-decomposition).
- When carrying each owned slice through implementation, review, merge, rollout, and surface verification, use [deliver-and-verify](../deliver-and-verify/SKILL.md).
