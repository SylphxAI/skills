# Parallel Change Integration Standard

Use this standard only when measured concurrent source activity creates
collisions, stale-base failures, CI backlog, or duplicated integration work.
Ordinary low-contention work should use the repository's normal Git and CI
features without an additional control plane.

## Principle

Scale proven repository primitives before inventing a source-integration
system:

- small atomic commits;
- short-lived branches where branches are used;
- non-force fast-forward or normal reviewed merges;
- native conflict detection;
- optional forge merge queue for busy PR-required branches;
- CI concurrency cancellation for obsolete runs;
- sound affected-test selection and sharding; and
- event-driven deployment with exact identity.

Do not create Platform Candidate, landing-controller, selected-snapshot, or
verification-watermark authorities to solve ordinary Git contention.

## Choose one repository operating mode

The repository declares its default. Agents do not classify each change into a
new global lane.

### Direct-trunk repository

- Internal authorized writers land small non-force commits frequently.
- On non-fast-forward rejection, fetch, reconcile current source contracts,
  re-run affected validation, and retry.
- External contributors still use PRs.
- Production uses `After Verification` when a red trunk revision must not
  deploy.
- No merge queue is present.

### PR-required repository

- Contributors use short-lived branches and small PRs.
- Required checks run on the exact pre-merge or merge-group SHA.
- Enable merge queue only when concurrent ready PRs and stale-base failures
  justify it.
- Keep the queue's required checks smaller than the full audit suite while
  preserving a sound merge decision.

Both modes are trunk-based when changes remain small and integrate frequently.

## Collision domains

Git conflicts are only one collision class. Before parallel mutation, identify:

- semantic ownership and overlapping behavior;
- working tree and generated-file ownership;
- shared branch/ref changes;
- caches and build outputs;
- databases, schemas, ports, services, and test fixtures;
- credentials and rate-limited provider effects; and
- deployment or migration targets.

Enact claims own Work, not files. Use a worktree/clone only when it is the
smallest safe isolation for mutable state; never treat worktrees as locks or as
isolation for external effects.

## Duplicate work

Resolve semantic duplicate Work through Enact when available. Git branches,
PRs, or commits do not define task ownership.

- Reuse an active matching Work instead of creating another.
- If independent attempts are deliberately useful, bound their count and
  selection deadline.
- Select a winner by the Work's acceptance evidence, not first-finish alone.
- Retire losing source safely without deleting unique evidence.

Do not create a Platform source Candidate schema merely to deduplicate Work.

## Integration

### Direct trunk

1. Refresh the default branch before landing.
2. Preserve unrelated local work.
3. Produce a coherent exact commit with local affected validation.
4. Push without force.
5. If rejected, reconcile against current trunk and retry.
6. Let main CI evaluate the resulting exact SHA.

### Pull request

1. Keep branch lifetime short and scope coherent.
2. Run fast PR checks.
3. Update or merge through repository policy.
4. If merge queue is enabled, let it test the merge-group SHA.
5. Treat the resulting default-branch SHA as source truth.

CI must not reject a contribution solely because it used either supported
path.

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

## Merge queue decision record

For every enabled queue, record:

- why the target branch requires PRs;
- ready-PR arrival rate and concurrency;
- stale-base/pairwise failure rate before and after;
- p50/p95 queue wait and merge-group duration;
- ejection/retry and compute cost;
- required `merge_group` workflow wiring; and
- disable/review threshold.

A merge queue is over-engineering when it mostly waits on one PR at a time or
repeats expensive checks without avoiding integration failures.

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

- Repository mode is documented and agents can follow it without central lane
  classification.
- External PRs remain first-class and contain no private Work requirement.
- Internal direct-trunk writes are non-force and recover cleanly from conflicts.
- Merge queue is enabled only with measured benefit.
- CI and deploy are exact-SHA bound and do not depend on Candidate/watermark
  services.
- Parallel agents retain Git throughput without file locks or permanent
  Advisor/Executor pairs.

## Primary references

- [DORA: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [Git workflows](https://git-scm.com/docs/gitworkflows)
- [GitHub: Managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [GitLab: Merge trains](https://docs.gitlab.com/ci/pipelines/merge_trains/)
- [Google Engineering Practices: Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html)
