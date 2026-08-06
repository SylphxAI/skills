# Parallel Change Integration Standard

Use this standard only when measured concurrent source activity creates
collisions, stale-base failures, CI backlog, or duplicated integration work.
Ordinary low-contention work should use the repository's normal Git and CI
features without an additional control plane.

## Principle

Scale proven repository primitives before inventing a source-integration
system:

- one complete Work/outcome per short-lived branch + PR;
- arbitrary checkpoint commits inside the PR, not on main;
- forge Merge Queue as the ordinary integration serializer;
- native conflict detection at queue time;
- CI concurrency cancellation scoped to the same PR (latest-wins);
- sound affected-test selection and sharding; and
- event-driven deployment with exact landed identity.

Do not create Platform Candidate, landing-controller, selected-snapshot, or
verification-watermark authorities to solve ordinary Git contention.

## Ordinary repository operating mode

Agent-native owned repositories use **Agent-Native Queued Trunk**
([ADR-20260803](../../../history/adr/ADR-20260803-agent-native-queued-trunk.md)).
Agents do not classify each change into DT vs PR.

### PR + Merge Queue (ordinary)

- One Work = one complete outcome = one branch = one PR.
- Draft the PR immediately; commit at any frequency inside it.
- Phases/checkpoints are not separate PRs and do not land incomplete outcomes.
- PR head CI is attributable feedback with same-PR latest-wins cancellation.
- Ready PRs enter Merge Queue; required checks run on the merge-group SHA.
- Squash-merge to main; main stays always production-ready and green.
- Production uses `After Verification` on the admitted/landed identity.

### Break-glass direct trunk

- Only with explicit incident/hotfix authority and org/repo bypass.
- Not an ordinary agent lane and not a per-change classification.

## Collision domains

Git conflicts are only one collision class. Before parallel mutation, identify:

- semantic ownership and overlapping behavior;
- working tree and generated-file ownership;
- shared branch/ref changes;
- caches and build outputs;
- databases, schemas, ports, services, and test fixtures;
- credentials and rate-limited provider effects; and
- deployment or migration targets.

the work ledger claims own Work, not files. Use a worktree/clone only when it is the
smallest safe isolation for mutable state; never treat worktrees as locks or as
isolation for external effects.

### Shared external effects

Parallel work must not turn a local process into a second controller for shared
delivery, migration, protection, promotion, or environment policy.

- Observation and evidence collection are non-mutating by default.
- Isolate or pin the exact subject that needs stability instead of locking a
  shared lane.
- A client-side script may perform a bounded authorized mutation; it may not
  continuously reconcile shared policy from a workstation, temporary directory,
  CI job, or agent session.
- Persistent reconciliation belongs to the owning product's versioned
  controller and public or operator contract, with scoped authority, fencing,
  expiry, audit, and recovery.
- A task may not externalize its verification cost by blocking unrelated agents,
  deployments, or customers. An unavoidable exclusive effect follows the
  owning incident or migration policy and uses the smallest scope and duration.

Do not enforce this boundary with repository-wide word bans or CI scans for
`lock`, `hold`, or daemon names. Enforce it at the shared effect API, identity,
lease, and storage-permission boundary, then verify those semantics with focused
authorization, expiry, fencing, and concurrency tests.

## Duplicate work

Resolve semantic duplicate Work through the work ledger when available. Git branches,
PRs, or commits do not define task ownership.

- Reuse an active matching Work instead of creating another.
- If independent attempts are deliberately useful, bound their count and
  selection deadline.
- Select a winner by the Work's acceptance evidence, not first-finish alone.
- Retire losing source safely without deleting unique evidence.

Do not create a Platform source Candidate schema merely to deduplicate Work.

## Integration

### Ordinary path

1. Search open PRs for overlap; reuse the active candidate when present.
2. Create/reuse branch + draft PR for the Work.
3. Preserve unrelated local work; commit only this Work on the branch.
4. Run fast PR checks with same-PR latest-wins cancellation.
5. Complete the full outcome terminal inside the same PR.
6. Enter Merge Queue; let it test the merge-group SHA.
7. Treat the resulting default-branch SHA as source truth.

### Break-glass direct trunk

1. Obtain explicit authority.
2. Refresh default branch, validate, push without force (or admin bypass).
3. Restore ordinary PR+queue discipline for any follow-up.

CI must not reject a contribution solely for using the ordinary PR+queue path.

## CI backpressure

When source arrival outpaces verification:

1. measure pickup, execution, cache, fan-in, and retry separately;
2. fix runner capacity, caching, test selection, and sharding first;
3. cancel an obsolete default-branch run only when the newer SHA contains it
   and no non-cancellable evidence is lost;
4. keep the latest useful run rather than serially verifying every revision;
5. run periodic full suites to detect selector misses; and
6. create a new control service only if measured residual failure cannot be
   solved with repository/CI primitives.

This is provider concurrency management, not a cumulative watermark.

## Merge queue operations record

For each org/repo queue, track:

- ready-PR arrival rate and concurrency;
- stale-base/pairwise failure rate;
- p50/p95 queue wait and merge-group duration;
- ejection/retry and compute cost;
- required `merge_group` workflow wiring; and
- capacity actions when the queue is saturated.

Do not disable the ordinary agent-native queue merely because it is idle on a
quiet day; disable only if the repository is deliberately non-agent and
low-contention under an explicit exception.

## Deployment

Parallel source integration does not change deployment semantics:

```text
exact default-branch SHA
  + exact artifact
  + configured aggregate CI success when After Verification
  -> deploy
```

Newer undeployed revisions may supersede older ones. Preserve the previous
healthy deployment for rollback. Do not use raw branch movement, a PR merge,
or a queue exit as production proof.

## Metrics

Track:

- source-to-trunk latency;
- non-fast-forward/conflict retry rate;
- PR age and queue wait where applicable;
- CI pickup and execution latency;
- superseded-run cancellation rate;
- escaped regression and revert/forward-fix rate;
- verification-success-to-deploy latency; and
- compute per landed revision.

Commit or PR count is a flow signal, not a quality target.

## Acceptance

- Agents follow one ordinary path without DT/PR classification.
- External PRs remain first-class and contain no private Work requirement.
- Ordinary main writes go through Merge Queue; break-glass is exceptional.
- PR CI supersession is per-candidate; global feedback isolation is preserved.
- CI and deploy are exact-SHA bound and do not depend on Candidate/watermark
  services.
- Parallel agents retain Git throughput without file locks, claim leases as
  source gates, or permanent Advisor/Executor pairs.

## Primary references

- [DORA: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [Git workflows](https://git-scm.com/docs/gitworkflows)
- [GitHub: Managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [GitLab: Merge trains](https://docs.gitlab.com/ci/pipelines/merge_trains/)
- [Google Engineering Practices: Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html)
