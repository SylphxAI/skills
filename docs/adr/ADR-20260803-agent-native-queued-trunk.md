---
id: ADR-20260803-agent-native-queued-trunk
status: accepted
date: 2026-08-03
decision_owner: SylphxAI
supersedes:
  - ADR-0027-repository-native-trunk-and-simple-auto-deploy
amends:
  - ADR-0019-decouple-worker-occupancy-from-delivery-terminal
  - ADR-0020-enact-authoritative-work-and-review-pools
  - ADR-0021-forge-agnostic-coordination
scope:
  - source-integration
  - ci-admission
  - delivery-terminal
  - work-coordination
  - auto-deploy
---

# ADR-20260803: Agent-Native Queued Trunk

> **Amended by [ADR-20260805](ADR-20260805-retire-enact-from-active-instructions.md).**
> Enact is retired; all Enact-specific optional-work-ledger clauses below are
> historical and do not authorize an integration or a second control plane.

## Context

### What ADR-0027 optimized for

[ADR-0027](ADR-0027-repository-native-trunk-and-simple-auto-deploy.md)
correctly dismantled Platform Candidate planes, selected snapshots, scoped
watermarks, and Platform-selected landing adapters. It restored three
authorities:

| Authority | Owns |
| --- | --- |
| Enact (optional) | Work coordination, claims, runs, evidence, effects |
| Git / forge | Source history, contribution path, branch rules, PRs, merge queue |
| Platform | Build, deploy policy, exact artifact identity, health, rollback |

It also preferred **internal direct trunk (DT)** for latency/cost and treated
**merge queue as opt-in only when measured contention justified it**.

### What changed in practice

At current agent-native scale the ordinary path is no longer low-contention
internal human collaboration. Observed operating conditions include:

- hundreds of commits per hour and 10,000+ development commits per day;
- many autonomous writers, no human reviewer in the ordinary path;
- main CI starvation and continuous cancellation of shared default-branch runs;
- high non-fast-forward rejection / conflict-recovery thrash on one trunk;
- agents unable to trust cancelled or foreign CI as feedback for their own
  change;
- incomplete intermediate states landing on main because every checkpoint was a
  global integration event.

### Failure mode of DT under high-frequency agent commits

Direct trunk implicitly assumes:

```text
every push to main is a coherent global integration candidate
```

Agent reality is:

```text
one Work may produce 5, 20, or 100 commits
= checkpoints, repairs, refactors, retries
≠ independently integration-worthy trunk events
```

When those commits write main directly:

```text
agent-local checkpoint frequency
  becomes
global integration frequency
  + shared CI frequency
  + conflict frequency
  + cancellation frequency
```

That is a structural mismatch. Teaching agents "when a commit is worth
integrating" is subjective, inconsistent across task grains, and distorts
natural recovery behavior into over- or under-commit.

### CI isolation failure (primary operational pain)

Under shared main concurrency, team/agent A needs private feedback:

```text
A pushes → CI starts → later main activity cancels or supersedes that run
→ A cannot see whether A failed
→ A inspects B/C/D runs and cannot attribute failures
→ chaos, duplicate fixes, thrash
```

Running full CI and production build on **every** commit without isolation
multiplies compute beyond prior PR-era cost and still fails attribution when
cancellation keys are global.

The required property is not "never cancel CI". It is:

```text
cancellation and supersession stay inside one candidate
so each Work retains attributable feedback
```

### Why hybrid DT/PR lanes also fail

Rules such as "simple → DT, complex → PR, docs → DT" force agents to classify
risk. Under uncertainty agents converge to the conservative path. The
organization therefore pays dual-path complexity and still ends at universal
PR. Prefer one ordinary path.

### What is retained from ADR-0027

This ADR **keeps**:

- three-authority separation (Git / optional Enact / Platform);
- retirement of Platform Candidate, scoped watermark, and selected-snapshot
  ordinary paths;
- repository-owned CI keyed by exact Git SHA;
- Platform deploy modes `On Commit`, `After Verification`, and `Off`;
- build-once / deploy-many identity discipline;
- worker occupancy decoupled from delivery terminal (event-driven re-entry);
- no requirement for Enact Work ids in public commits or PR bodies.

This ADR **reverses** ADR-0027 on ordinary internal direct trunk preference and
on merge queue remaining off by default for high-throughput agent repos.

## Decision

Adopt **Agent-Native Queued Trunk** as the ordinary Sylphx source path for
agent-native repositories:

```text
One Work
  = one complete outcome
  = one short-lived branch
  = one PR (draft immediately)
  = arbitrary commits / phases inside that PR
  = one Merge Queue candidate when ready
  = normally one squash-merged main integration unit
```

```text
Start Work
  → short-lived branch
  → draft PR immediately
  → commit/push at any frequency
  → same-PR CI with latest-wins supersession
  → complete the full outcome (all necessary phases)
  → mark ready only at Work terminal
  → Merge Queue integration CI on merge-group SHA
  → automatic squash merge
  → main remains always production-ready and green
  → Platform builds the landed revision once per profile
  → deploy / health / rollback
```

### 1. Work terminal (hard boundary)

**Work** means one complete outcome with one acceptance terminal that can be
validated, merged, deployed, observed, and if needed reverted or
forward-recovered as a unit.

Work is **not**:

- a phase, step, checklist item, or implementation layer;
- one coding session, agent run, or runtime handoff;
- one commit, file, package, or “same type of change”;
- “we finished scaffold / types / tests / cleanup”.

**Phase, checkpoint, subtask, and layer completion are never reasons to open a
new PR or merge.** They are progress inside the current PR only.

#### Must stay in the same PR

Everything required for the same outcome terminal stays in the same PR,
including when types differ:

- design corrections discovered during implementation;
- schema / contract / migration;
- runtime implementation;
- tests;
- generated artifacts;
- docs / observability / security fixes required by the outcome;
- predecessor removal or authority cutover required by the outcome;
- review/CI findings for that Work;
- refactors required to land the outcome correctly.

Example: “port payment webhook fully from TypeScript to Rust” is **one Work /
one PR**, even if agents internally progress through DTO, handler, idempotency,
tests, TS retirement, and docs.

#### When a second Work/PR is allowed

Only when the extracted unit itself is independently terminal:

1. own complete outcome;
2. own acceptance terminal;
3. independently mergeable without leaving main half-finished;
4. independently verifiable;
5. independently revertible or forward-recoverable;
6. does **not** require another unmerged sibling PR to be correct;
7. is valuable on its own, not merely a runway for the next phase.

If uncertain: **do not split. Keep working in the original PR.**

“Same type” is **not** a split rule (50 unrelated bugfixes are not one Work
because they are all “bugs”). “Different type” is **not** a split rule either
(schema + runtime + tests for one feature are one Work).

#### Mega-PR anti-pattern

“Do not phase-split” does **not** mean infinite expansion. After the original
outcome terminal is satisfied, merge. Independent extra improvements become new
Works. Residuals still owned by the current incomplete outcome stay in the
current PR; they are not “follow-up PRs” used to escape terminal honesty.

### 2. PR is the machine-owned candidate envelope

For ordinary work:

1. create a short-lived branch for the Work;
2. open a **draft PR immediately** as candidate identity;
3. keep all commits for that attempt on that branch/PR;
4. if another agent or runtime resumes the Work, **reuse the same branch/PR**;
5. do not close and reopen a PR merely because a session ended, CI failed, or
   the merge queue ejected the candidate.

PR provides:

- supersession isolation (latest-wins cancellation is **per PR**, not global);
- WIP isolation (development conflict surface stays off main);
- commit coalescing (checkpoints remain private until Work terminal);
- visible active-candidate discovery (search open PRs before starting).

PR does **not** imply human approval, human review, or manual merge as the
ordinary gate. Human review may exist as an exceptional repository policy, not
as the default agent path.

### 3. Commit frequency is unconstrained

Agents may commit and push at any density. There is **no** policy that asks
agents to batch commits for the sake of CI economics.

Control this instead:

> Unverified intermediate states must not leave their PR.

### 4. Merge Queue is the only ordinary writer of main

For agent-native repositories:

- branch protection requires PR + merge queue for the default branch;
- ordinary agents have **no direct push to main**;
- direct trunk is **break-glass only** (incident/hotfix with explicit authority
  and immediate follow-through), not a second ordinary lane;
- when ready, the PR enters the merge queue automatically;
- the queue builds a temporary group from latest main + earlier queued PRs +
  this PR and runs required checks on the **merge-group SHA**;
- failures or conflicts eject that PR back to the same branch for repair;
- successful candidates squash-merge by default so main history is Work-level,
  not checkpoint-level.

Merge queue is not optional “maybe later” for these repos: measured contention,
stale-base pressure, and CI isolation needs are already present. Low-traffic
human repos may still choose simpler PR-required or break-glass policies, but
they are not the agent-native default this ADR defines.

### 5. Main is always production-ready and green

Main is not a development workspace. At every tip it should be:

```text
integrated
verified
production-buildable
deployable
currently releasable
```

Therefore main must not contain:

- knowingly incomplete features;
- phase-only landings;
- knowingly failing required tests;
- temporary architectures that need a sibling unmerged PR;
- “next commit will fix it” intermediate states.

### 6. Two-layer CI, not three full suites

| Layer | Trigger | Purpose | Supersession |
| --- | --- | --- | --- |
| **PR head CI** | pushes to the PR branch | fast attributable feedback for that Work | latest-wins **within the same PR only** |
| **Merge Queue CI** | `merge_group` | authoritative admission against latest main + queue predecessors | queue membership / group rebuild |
| **Main post-land** | default-branch land | identity readback, production artifact build, deploy, health | landed SHA / deploy policy |

Rules:

1. **PR CI may be narrow/affected** and must remain attributable to that PR.
   Cancelling obsolete runs of the **same PR** is correct and required under
   high push frequency.
2. **Merge Queue CI is the source-admission authority** for main.
3. **Main must not unconditionally re-run the same full source suite** already
   proven on the admitted merge-group candidate. Doing so recreates triple
   compute (`PR + queue + main`) without adding proportional attribution value.
4. Main may run narrow post-merge smoke, artifact build, deploy verification,
   and scheduled full-suite backstops.
5. If squash/rebase produces a landed SHA different from the merge-group SHA,
   verify the **landed tree relationship** to the admitted candidate (or choose
   a queue merge method that preserves the needed identity). Do not blindly
   re-run all expensive jobs only because the SHA string changed.
6. Production builds follow **landed / batch-landed integration units**, not
   every development commit and not every draft PR push. Queue batching may
   further collapse deploy frequency when landing rate exceeds deploy value.

This is how the system answers the cost/isolation dilemma:

```text
Do not run infinite global CI on every private checkpoint.
Do not cancel Agent A's only feedback because Agent B pushed main.
Give each PR private latest-wins feedback.
Serialize and fully verify only completed Works at the queue.
```

### 7. Remove immature claim/worker source gates (for now)

Until a coordination system is mature enough not to thrash, ordinary source
integration **must not** depend on:

- worker claim / lease admission for git writes;
- file locks as source serialization;
- Work-id checks in commits or PR bodies;
- Enact GitHub status gates as merge admission;
- external landing serializers / source Candidate databases;
- wait-for-worker mechanisms that hold capacity while queue/CI runs.

Authority model for the ordinary path:

| Fact | Authority |
| --- | --- |
| Source bytes and history | Git |
| In-progress candidate | Git branch + forge PR |
| Admission | Branch protection + CI + Merge Queue |
| Integration order | Merge Queue |
| Production artifact / deploy / rollback | Platform |
| Optional backlog narrative | Forge issue or other product tracker |
| Agent runtime session | Non-durable; not source authority |

`Work` remains a **semantic** unit expressed by the PR outcome terminal. It does
not need a separate lease database to integrate source.

Duplicate-work mitigation is git-native and best-effort:

```text
before starting → search open PRs / branches for overlapping candidates
if found → continue or hand off that PR
if not → create draft PR immediately as public candidate identity
```

This does not perfectly eliminate duplicate attempts. It is preferred to a
claim system that creates false locks, dead leases, and waiting. Correctness
still bottoms out at Git conflict resolution and Merge Queue admission.

Optional Enact Work ledgers may still track objectives and evidence, but they
are not git admission authorities and must not block repository-native merge.

### 8. Worker behavior around the queue

When a PR is queued or waiting on external verification:

```text
checkpoint on the PR
→ release the worker
→ do other work
```

On queue eject, CI failure, or conflict: event-driven re-entry repairs **the
same PR**. Occupancy is not the delivery terminal
([ADR-0019](ADR-0019-decouple-worker-occupancy-from-delivery-terminal.md)).

### 9. Auto-deploy remains simple and identity-bound

Retained from ADR-0027 and still binding:

- Platform modes: `On Commit`, `After Verification`, `Off`;
- deploy exact SHA / exact artifact, not branch name motion;
- `After Verification` waits for the repository's aggregate success on the
  relevant admitted/landed identity;
- failed rollout health retains or restores previous current deployment;
- CI should not build-and-discard a production artifact that Platform rebuilds
  as the ordinary amplification path.

### 10. Standards and agent guidance

Binding portfolio standards and agent guidance that still say:

- internal agents prefer ordinary direct trunk; or
- merge queue is off unless measured later; or
- main may be temporarily red as an ordinary DT consequence;

are **outdated for agent-native repositories** and must be amended to this ADR.
Until those text updates land, **this ADR controls** the ordinary path.

## Consequences

### Positive

- Agent checkpoint frequency decouples from global integration frequency.
- Each Work retains attributable CI feedback (PR-local supersession).
- Main stays a verified production stream instead of a shared scratch trunk.
- Merge queue makes serialization explicit, measurable, and failure-isolated.
- Agents stop classifying DT vs PR vs phase boundaries.
- Immature claim/worker machinery stops injecting false waits into git.

### Costs / risks

- Merge queue is an explicit bottleneck (preferred to hidden conflict storms).
- Poor Work sizing can create either PR storms (phase-splitting) or mega-PRs
  (scope hoarding). The terminal tests above are mandatory mitigation.
- Queue and merge-group CI need capacity planning and `merge_group` workflow
  wiring.
- Break-glass direct trunk must stay rare or main's green invariant erodes.
- Best-effort open-PR search will not eliminate all duplicate attempts.

### Explicit non-goals

- Human-review ceremony as the ordinary gate.
- Teaching agents commit-frequency aesthetics.
- Reintroducing Platform Candidate / watermark control planes.
- Replacing Git history with a work ledger.
- Perfect global mutual exclusion of overlapping product ideas.

## Verification

1. Agent-native repositories declare PR-required default branch + merge queue;
   ordinary agent credentials cannot direct-push main.
2. Required workflows run on `pull_request` (feedback) and `merge_group`
   (admission); main does not duplicate the full admitted suite by default.
3. Same-PR concurrency cancels obsolete runs without cancelling other PRs'
   feedback.
4. A multi-phase outcome lands as one PR/Work; phase-only PRs are rejected by
   policy/guidance as incomplete terminals.
5. Squash merge is the ordinary main history unit.
6. No ordinary merge path requires Work id, claim lease, or worker occupancy.
7. Platform still deploys exact landed identity with health/rollback.
8. ADR-0027 is marked superseded; dependent standards cite this ADR for the
   ordinary agent-native path.

## Primary references

- [DORA: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [GitHub: Managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [GitHub: About merge methods](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github)
- [GitHub Actions: Concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency)
- [GitHub Actions: Running a workflow from a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [The Twelve-Factor App: Build, release, run](https://12factor.net/build-release-run)

## Supersession

This ADR supersedes
[ADR-0027](ADR-0027-repository-native-trunk-and-simple-auto-deploy.md).

It amends:

- [ADR-0019](ADR-0019-decouple-worker-occupancy-from-delivery-terminal.md)
  by reaffirming release-while-waiting and forbidding claim/occupancy as git
  admission;
- [ADR-0020](ADR-0020-enact-authoritative-work-and-review-pools.md)
  by keeping Enact off the ordinary git merge path and removing Work-id public
  ingress requirements;
- [ADR-0021](ADR-0021-forge-agnostic-coordination.md)
  by making forge-native PR + merge queue the ordinary integration mechanism
  while coordination ledgers remain optional and non-blocking for source
  admission.
