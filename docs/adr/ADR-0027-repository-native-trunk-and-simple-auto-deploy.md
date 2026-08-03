---
id: ADR-0027-repository-native-trunk-and-simple-auto-deploy
status: superseded
date: 2026-07-30
decision_owner: SylphxAI
supersedes:
  - ADR-0022-auto-when-green-selected-snapshot
amends:
  - ADR-0019-decouple-worker-occupancy-from-delivery-terminal
  - ADR-0020-enact-authoritative-work-and-review-pools
  - ADR-0021-forge-agnostic-coordination
scope:
  - auto-deploy
  - delivery-terminal
  - work-coordination
---

# ADR-0027: Repository-native trunk integration and simple auto-deploy

> **Superseded by [ADR-20260803-agent-native-queued-trunk](ADR-20260803-agent-native-queued-trunk.md).** Ordinary agent-native integration is PR + Merge Queue with Work-terminal boundaries and always-green main. Three-authority separation, simple auto-deploy modes, and Candidate/watermark retirement remain in force via the superseding ADR.

## Context

Sylphx expanded two ordinary industry capabilities—

1. integrate a source revision into a repository; and
2. wait for CI before deploying it—

into a Platform Candidate plane, central landing adapter selection, scoped
green watermarks, selected snapshots, proof bundles, policy epochs, and several
happy-path reconcilers. The result duplicated forge and CI responsibilities,
made agents reason about internal delivery vocabulary, increased queueing and
recovery states, and did not create a stronger project-correctness oracle.

The industry baseline is simpler:

- DORA describes trunk-based development as small batches integrated at least
  daily, commonly through branches lasting hours rather than days. It does not
  require either direct pushes or pull requests.
- GitHub describes merge queue as a solution for busy protected branches: it
  rechecks a pull request against the latest target plus queued changes. It is
  not a universal requirement and it adds a merge-group CI execution.
- Render exposes `On Commit`, `After CI Checks Pass`, and `Off`.
- Railway exposes auto-deploy with an optional `Wait for CI`.
- Vercel creates immutable deployments and can hold production assignment on
  deployment checks.

The valuable safety properties are exact revision/artifact identity,
repository-owned CI, non-force integration, health checks, rollback, and
idempotent event handling. The additional product nouns are not independent
proofs.

## Decision

### 1. Keep the three authorities separate

| Authority | Owns |
| --- | --- |
| Enact | Optional work coordination: Work, claims, Runs, review findings, evidence, and effects |
| Git repository / forge | Source history, contribution path, branch rules, pull requests, and optional merge queue |
| Platform | Build, deploy policy, exact artifact identity, rollout health, rollback, and deployment audit |

Platform does not choose how source enters the default branch. Enact does not
need to exist for Git or deployment to work. Git does not become the work
ledger.

### 2. Use repository-native source integration

Both direct trunk and pull requests are valid source integration paths.

- **Internal Sylphx agents:** prefer a small, non-force direct-trunk update when
  the repository grants write access and its declared rules allow it. This is
  latency and cost guidance, not a correctness claim.
- **External contributors or principals without default-branch write access:**
  use a pull request.
- **Repository-specific collaboration:** a repository may require pull
  requests for all changes when that is its declared operating model.

CI must not fail solely because a valid change arrived through a pull request
or through direct trunk. An agent is not asked to classify the semantic safety
of PR versus direct trunk. It follows repository policy and available
authority. A pull request adds collaboration and pre-merge feedback; it does
not make the same code or test suite intrinsically safer.

### 3. Make merge queue opt-in and evidence-based

Merge queue is enabled only when all of these are true:

1. the repository requires pull requests for the target branch;
2. multiple ready pull requests regularly contend for that branch;
3. stale-base or pairwise interaction failures are material; and
4. the measured reduction in failed/retested merges exceeds queue and CI cost.

It is off for direct-trunk repositories and low-contention PR repositories.
When enabled, required workflows support the forge's merge-group event and the
queue runs only the minimum sound required checks. Track queue wait, ejection,
retest, and merge-group compute. Disable it when it ceases to pay for itself.

### 4. Use one ordinary CI model

The repository owns what must pass. CI is keyed by exact Git SHA and uses the
same jobs wherever practical:

```text
source revision
  -> fast deterministic checks and affected tests
  -> one aggregate success/failure verdict for deployment
```

- Pull requests use the verdict before merge when the repository requires it.
- Direct trunk uses the verdict after landing.
- A merge queue, when enabled, evaluates the merge-group SHA.
- Obsolete runs may be cancelled when a newer default-branch SHA includes the
  same history, except for non-cancellable audit, migration, provenance, or
  release evidence.
- Test selection must be sound. Dependency/build/lockfile uncertainty expands
  to the full affected set. Periodic full runs audit selector misses.
- Fail fast inside a run; start independent build and test work in parallel.

No separate Platform Candidate admission, verification watermark, or landing
controller is required to express this model.

PR checks and landed-main checks are not automatically interchangeable: a
forge may verify a synthetic merge SHA, while squash or rebase creates another
SHA. Internal direct-trunk work normally pays one default-branch CI run.
External or PR-required work pays the presubmit needed for safe collaboration
and still emits the configured verdict for the exact landed SHA. Reuse a
provider-native exact landing fact when available; otherwise keep that
compatibility path small and cached rather than inventing a Platform
tree-equivalence/evidence-transfer authority.

CI does not own the production artifact build. It may compile test-profile code
or fixtures where compilation is a semantic check. Platform builds the
production artifact once, and artifact/package smoke consumes that same digest.
A disposable CI release/container build followed by a Platform rebuild is
forbidden unless two genuinely different artifacts are named and required.

Superseded work uses forge-native concurrency keyed by PR identity or
branch/ref. A unique-SHA concurrency group cannot supersede an earlier SHA and
must not be presented as cancellation. Do not build a custom runner-cancellation
plane where native concurrency is sufficient.

### 5. Expose only three auto-deploy modes

```text
Auto Deploy:
- On Commit
- After Verification
- Off
```

`After Verification` means:

```text
tracked-branch SHA observed
  ├─ Platform builds exact production artifact once
  └─ await configured aggregate CI verdict for the same SHA
       -> both succeed
       -> deploy exact artifact
       -> health/readiness
       -> current, or retain/restore previous current
```

Build completion, artifact existence, and source/digest binding are internal
deployment-record invariants. They are not extra project-quality green lights.
The durable CI verdict may be stored in Platform for audit and recovery, but it
is not a cumulative watermark abstraction.

The normal path is event-driven. A bounded reconciler may recover missed
webhooks or interrupted transitions; polling and claim loops are not the happy
path. Newer revisions may supersede obsolete undeployed revisions.

The same immutable digest is promoted through environments and retained for
rollback. Environment configuration belongs to release/run time when possible.
If frontend public configuration is necessarily baked into the bytes, the
declared contract is build once per environment profile rather than a false
cross-environment build-once claim.

### 6. Keep review independent from the forge envelope

Use a pull request when public discussion, external contribution, or the
repository's collaboration rules require one. Enact may request an independent
review for a material risk, but the verdict binds the exact source revision and
does not require a Platform landing abstraction. Irreversible external effects
remain separately authorized and fenced.

### 7. Retire the over-engineered control surface

Retire from authoritative guidance and ordinary happy paths:

- Platform-selected PR/direct-trunk adapters;
- central source landing as a Platform responsibility;
- scoped or cumulative green watermarks;
- selected-snapshot terminology and policy;
- customer-visible proof bundles for build/artifact/SHA integrity;
- CI that rejects a change only because it used PR or direct trunk;
- mandatory merge queue without measured contention;
- Enact Work lineage requirements in public Git metadata; and
- periodic reconcilers as normal delivery orchestration.

Existing tables or fields may remain temporarily for compatible reads during a
bounded migration. They must not remain write authorities, customer concepts,
or reasons to block the simple path.

## Consequences

### Positive

- Agents follow the repository instead of learning a second source-control
  system.
- External contributors use normal pull requests without Sylphx-private
  coordination metadata.
- Internal agents recover direct-trunk latency without making PR ingress
  invalid.
- Merge queue compute is paid only where it prevents measured integration
  failures.
- Platform matches the product model used by modern PaaS providers.

### Trade-offs

- Direct trunk can temporarily make the default branch red. The response is a
  fast fix or revert; production remains protected by `After Verification`.
- A PR repository pays pre-merge latency. Keep branches small and checks fast;
  enable merge queue only when concurrency justifies it.
- Removing transitional Platform state requires a compatibility migration and
  explicit predecessor retirement.

## Verification

1. No authoritative Skill tells Platform to select PR versus direct trunk.
2. No CI gate rejects a valid contribution solely because it used PR or direct
   trunk.
3. External pull requests complete through normal repository CI without an
   Enact Work id.
4. An internal ordinary direct-trunk commit and an ordinary merged PR both
   produce the same exact-SHA aggregate verification shape.
5. Platform exposes `On Commit`, `After Verification`, and `Off`; one
   exact-SHA CI failure blocks `After Verification`.
6. Build and CI can run concurrently; verification success to deploy dispatch
   is event-driven and measured in seconds under a healthy control plane.
7. CI does not build and discard a production artifact that Platform rebuilds;
   the normal production-build amplification is one per source/environment
   profile.
8. Superseded CI uses provider-native PR/ref concurrency, not unique-SHA
   grouping or an ordinary custom runner-canceller.
9. Failed rollout health retains or restores the previous current deployment.
10. Merge queue is absent by default and justified by repository-level
   contention evidence wherever enabled.
11. Legacy Candidate/watermark/selected-snapshot write paths are retired, and
   no recovery controller recreates them.

## Primary references

- [DORA: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [GitHub: Managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [GitHub: About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions: Pull request events and merge commits](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request)
- [GitHub Actions: Concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency)
- [Render: Deploys](https://render.com/docs/deploys)
- [Railway: GitHub autodeploys and Wait for CI](https://docs.railway.com/deployments/github-autodeploys)
- [Vercel: Git deployments](https://vercel.com/docs/deployments/git)
- [Vercel: Deployment checks](https://vercel.com/docs/deployment-checks)
- [The Twelve-Factor App: Build, release, run](https://12factor.net/build-release-run)
- [AWS Prescriptive Guidance: Build once, deploy many](https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-git-branch-approach/build-once-deploy-many.html)

## Supersession

This ADR supersedes ADR-0022. It amends ADR-0019 decisions 4–7, ADR-0020
decisions 4, 7, 10, and 11, ADR-0021 decisions 2 and 4, and any Standard text
that makes Platform Candidate admission, scoped watermarks, selected snapshots,
or Platform-selected PR/direct-trunk adapters the ordinary workflow.
