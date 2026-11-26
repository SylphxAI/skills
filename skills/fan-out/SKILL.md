---
name: fan-out
description: "Use when decomposing a multi-part goal, partitioning work across parallel agents or workers, processing independent shards, modules, repositories, channels, or time windows concurrently, deciding what to run in parallel versus serialize on causal dependencies or shared write locks, running independent blind tests alongside delivery, or writing disjoint slice contracts. Use swarm-fuse for independent viewpoints that can change one decision, deliver-and-verify for shipping and verifying a single slice, and direct single-agent work when a cohesive task needs no split."
---

# Fan out along causal boundaries

Shorten the critical path to a verified outcome without creating conflicting writes or handoff overhead.

## Run ready work together

- Start disjoint implementation, independent blind testing, UI/UX exploration, codebase slimming and deduplication together. Testers can derive checks from the contract while implementation proceeds; execution against a real surface waits only for that surface. See [independent evidence](../prove-it/SKILL.md#independent-blind-verification).
- Serialize only the work that consumes an unfinished dependency, shares a write lock, or awaits an external clock. Agree on the minimum shared interface, then run implementations, callers and tests concurrently. Use one writer per mutable scope; parallel probes can feed one integrating writer.
- Let independent work set width. Bound it by evidenced compute, memory, quota, spend or contention limits, not a worker-count rule. Add a coordinator only where a subsystem has its own dependency graph; execute cohesive work directly when a handoff adds no parallelism.

## Give workers the acceptance contract

Give each worker enough context to finish and verify its slice without guessing or colliding with peers:

1. **Outcome and acceptance check:** The exact finished behavior, artifact, or question this slice owns and the observable positive and negative checks that prove it ([author-item](../author-item/SKILL.md)).
2. **Disjoint write boundary:** Exact files, directories, branch/worktree, shard key range, or `read-only` constraint owned by this worker, plus adjacent targets it must not mutate.
3. **Authoritative inputs and locked contracts:** Primary sources, revisions, and shared schemas or interfaces to read directly rather than relying on unstated conversation history.
4. **Return format:** The exact merged revision, structured findings, or verification receipt expected back so integration requires zero rework.

**Bad:** Finish the backend before assigning UX, cleanup and tests. **Good:** Agree on the API, then start them together in disjoint write scopes. Only tests that need the new backend wait for it.

## Neighbouring methods

- When independent viewpoints, competing hypotheses, or adversarial falsifiers can change **one** architectural, root-cause, or commercial decision, use [swarm-fuse](../swarm-fuse/SKILL.md).
- When prioritizing competing outcomes by cost of delay or defining Stage 1 acceptance criteria, use [author-item](../author-item/SKILL.md) and [work decomposition](../author-item/references/work.md#planning-and-decomposition).
- When carrying each owned slice through implementation, merge, rollout and surface verification, use [deliver-and-verify](../deliver-and-verify/SKILL.md).
