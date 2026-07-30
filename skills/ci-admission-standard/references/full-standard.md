# CI Admission Standard

Design CI as a fast, repository-owned correctness signal. Do not turn it into a
second source-control system or a product-specific coordination plane.

Composes with:

- [`source-authoring-standard`](../../source-authoring-standard/references/full-standard.md)
  for coherent commits and workspace safety;
- [`ci-runner-capacity-standard`](../../ci-runner-capacity-standard/references/full-standard.md)
  for compute and queue health;
- [`risk-matched-verification-standard`](../../risk-matched-verification-standard/references/full-standard.md)
  for evidence depth; and
- [`delivery-standard`](../../delivery-standard/references/full-standard.md)
  for the exact-SHA handoff to deployment.

## Boundary

| Owner | Responsibility |
| --- | --- |
| Repository / forge | PR or direct-trunk policy, branch protection, optional merge queue |
| Project CI | What must pass for a Git SHA |
| Platform | Observe configured aggregate verdict; build and deploy exact artifact |
| Enact | Optional Work coordination and durable findings |

CI must not reject a valid change solely because it arrived through a pull
request or direct trunk. Platform and Enact do not select the landing path.

## Source integration

Use the repository's declared policy:

- Internal agents prefer small non-force direct-trunk updates when write access
  and repository rules allow.
- External contributors use pull requests.
- A repository may require pull requests for everyone.

These are contribution paths, not safety levels. A PR is useful for public
discussion, external contribution, and pre-merge feedback. Correctness still
comes from the code, review, exact-SHA checks, and effect policy.

### Merge queue

Do not enable merge queue by default. Enable it only for a PR-required branch
with measured concurrent ready PRs and material stale-base or pairwise
integration failures.

When enabled:

- trigger every required workflow on the forge's merge-group event;
- evaluate the synthetic merge-group SHA, not the stale PR head;
- keep the required set minimal and sound;
- bound queue/check timeouts and eject failures;
- measure queue wait, ejection, retest, and compute cost; and
- disable the queue if its avoided failures no longer exceed its cost.

Direct-trunk repositories do not use a merge queue.

## Pipeline shape

Use one ordinary pipeline model keyed by exact Git SHA:

```text
exact revision
  -> classify changed surface
  -> fast deterministic checks
  -> affected tests and required global checks
  -> one stable aggregate verdict
```

The same underlying jobs should run for PR heads, default-branch commits, and
merge-group SHAs wherever the evidence requirement is the same. Avoid separate
implementations that drift.

### Fast feedback and complete confidence

1. Run formatting, static analysis, compilation/typechecking, schema/contract
   checks, and the fastest affected tests first.
2. Start independent jobs in parallel; fail the aggregate result as soon as a
   decisive required failure is known.
3. Use a sound dependency graph for affected-test selection. A root build
   file, lockfile, toolchain, shared schema, CI definition, or uncertain
   dependency edge expands to the full affected set.
4. Run periodic or policy-triggered full suites to audit selector misses.
5. Heavy platform, performance, mutation, broad security, and long E2E checks
   may run post-merge unless the changed risk makes them pre-merge requirements.
6. A deploy-relevant aggregate verdict must cover every required check for the
   deployed SHA. Path filtering may reduce work only when the selector itself
   is sound and observable.

### Superseding obsolete work

A newer default-branch SHA includes its ancestors. CI may cancel obsolete runs
and keep the running/latest useful SHA when that preserves the required
evidence. Never cancel away non-reproducible migration, release, provenance,
security, or audit evidence.

Cancellation is a CI concurrency optimization, not a selected-snapshot product
or watermark system.

## Gate portfolio discipline

One material invariant has one proof owner and, when blocking, one stable
aggregate result. A custom gate is justified only when it:

- detects a named material failure not already covered;
- consumes authoritative semantic input;
- is deterministic, bounded, reproducible on the exact SHA, and low-noise;
- has an explicit owner and retirement condition; and
- reduces more expected risk than its latency, compute, and maintenance cost.

Prefer compiler visibility, types, schemas, dependency graphs, AST-aware rules,
package exports, and executable behavior tests over string scans of source
files. Retire migration-only gates after the predecessor is removed and the new
contract is proven.

Do not build CI whose primary purpose is to police whether an agent used PR or
direct trunk, prove Enact lineage, or reproduce Platform deployment state.

## Required-check wiring

- Prefer one or a few stable fan-in contexts over many branch-protection names.
- A required context must have an active producer for every event on which it
  is required.
- Avoid workflow-level path filters on required checks; a missing producer can
  remain pending forever. Filter inside an always-created job or aggregator.
- Required checks use least privilege and pin third-party actions by immutable
  revision.
- Untrusted contribution code never receives write tokens or production
  secrets.
- Status alone is not evidence: logs, artifacts, and exact SHA must permit
  reproduction and diagnosis.

## Preview policy

Preview environments are optional runtime evidence, not a universal CI tax.

- Require preview only when user-visible, runtime, integration, auth, billing,
  migration, or public-contract behavior needs evidence unavailable from
  cheaper tests.
- Skip preview for changes that provably cannot affect runtime.
- Preview must not receive production credentials.
- Preview success never replaces production health and readback.

## Flake policy

A flaky required test is a reliability defect.

- Retry only to classify, not to manufacture green.
- Record the failing test, exact SHA, environment, attempts, and outcomes.
- Quarantine only with owner, expiry, replacement signal, and repair
  predicate.
- Never silently ignore, endlessly retry, or weaken assertions.
- Track flake rate and quarantine age.

## Performance and capacity

Measure separately:

- queue/pickup latency;
- setup and dependency restore;
- cache hit rate;
- execution duration by job;
- fan-in delay;
- cancellation/supersede rate; and
- failure/retry/flake rate.

Optimize the dominant term with dependency caching, remote build cache,
prebuilt images, test sharding, incremental compilation, and runner capacity.
Do not add another admission service when the bottleneck is ordinary compute,
cache misses, or oversized suites.

## Security and supply chain

Apply least privilege, untrusted-input isolation, immutable action/tool pins,
dependency and secret scanning, provenance for release artifacts, and explicit
credential/effect authority. Security evidence is risk-matched; it does not
justify running every expensive scanner on every low-risk edit.

## Deployment handoff

CI emits one durable aggregate verdict for an exact SHA:

```text
source_sha
status = pending | success | failure | skipped
provider
check_name_or_policy
observed_at
```

Platform may store this observation for audit and replay. It must not reinterpret
build success, artifact existence, or source/digest integrity as extra project
quality checks.

## Acceptance

- Both ordinary merged PR and direct-trunk SHA can reach the same aggregate
  verdict without ingress-only failure.
- External PRs require no Enact Work id.
- A newer green SHA cannot hide a required failure if the required check set is
  incomplete for that SHA.
- Merge queue exists only where repository metrics justify it.
- Required check p50/p95 latency, queue delay, cancellation, and flake rate are
  observable.
- No ordinary CI path depends on Platform Candidate, selected-snapshot, or
  verification-watermark services.

## Primary references

- [DORA: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [DORA: Working in small batches](https://dora.dev/capabilities/working-in-small-batches/)
- [GitHub: Managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [GitHub: Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions: Concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency)
