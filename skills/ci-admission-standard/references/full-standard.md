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

### Pull-request and default-branch evidence

A pull-request check and a default-branch check are not automatically the same
observation. A forge may test a synthetic merge commit, while squash or rebase
landing creates a different commit SHA. Use the simplest repository-native
choice:

- internal direct-trunk work normally has one authoritative default-branch CI
  run and no duplicate presubmit;
- external or PR-required work runs the checks needed for safe pre-merge
  feedback, then produces the configured aggregate verdict for the exact
  landed SHA used by deployment;
- when a forge can preserve or natively attest the exact validated landing
  revision, reuse that provider fact; otherwise do not invent a tree-equivalence
  ledger or Platform evidence-transfer service merely to avoid one PR-path
  check; and
- keep the external/PR path economical by running the same affected jobs,
  caches, and reusable workflow rather than two divergent full suites.

If duplicate PR/default-branch computation is material, first prefer direct
trunk for authorized internal work, provider-native merge behavior, shared
remote caches, and a smaller sound presubmit. A custom evidence-reuse system
must name an integration failure it prevents and prove positive net value.

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

The aggregate verdict is a deterministic fan-in over the actual semantic
checks. It preserves their individual outcomes for diagnosis; it does not turn
stage progress, renamed statuses, or a dashboard sequence into additional
evidence.

### CI is not the production artifact builder

Repository CI proves source correctness. The declared release provider builds
the immutable production artifact once and deploys that same digest. Do not run
a disposable production/release build in CI and then rebuild equivalent bytes
in Platform.

CI may compile code, bundle test fixtures, or build a debug/test-profile binary
when that is the cheapest semantic oracle. Those outputs are test evidence, not
the production artifact. Release-profile, container, packaging, and
artifact-specific smoke evidence should consume the exact provider-built
artifact when the failure belongs to packaging or runtime assembly.

If the exact production build is the only meaningful compile/package proof,
let the release provider own that artifact-readiness result and omit the
duplicate CI build, or run a cheaper test-profile compiler check in CI.
`After Verification` still requires both CI success and artifact readiness;
artifact readiness does not become another project-quality verdict. Do not
build twice merely to make two dashboards green.

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

Use provider-native concurrency keyed by the change stream that can supersede
it—normally pull-request identity for PR updates and branch/ref for
default-branch pushes. Grouping by the unique commit SHA cannot cancel older
runs because every update creates a new group. Do not add a custom
runner-canceller when the forge's native concurrency semantics are sufficient.

For GitHub Actions, the ordinary shape is:

```yaml
concurrency:
  group: ci-${{ github.workflow }}-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true
```

Use a different key only when the repository has a named non-supersedable
evidence stream.

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

The admission question is not “can this be automated?” It is “must this
candidate be prevented from landing when this evidence is red?” A blocking
check belongs on the critical path only when:

1. it owns a plausible material failure that changes admission;
2. it reads the authoritative representation of that fact;
3. its oracle separates the failure from harmless implementation changes;
4. red has a clear repair, recovery, or rejection action; and
5. no cheaper compiler, schema, graph, build, or behavior proof already owns
   the same failure.

Common textual proxies do not meet that bar:

| Proxy | Why it is not authority | Prefer |
| --- | --- | --- |
| Repository-wide vocabulary ban | Matches comments, examples, and legitimate internal code while missing equivalent disclosure under another spelling | Test the published package, rendered UI, public response schema, or audience allowlist |
| PR title/body string classification | Author-written prose can neither grant nor waive product risk | Derive changed surfaces from the exact diff, ownership graph, contract/schema changes, and typed repository facts |
| Token presence in `Dockerfile`, `package.json`, or another manifest | Spelling does not prove dependency resolution, artifact content, provenance, or runtime use | Parse the manifest and lockfile; build once; inspect the resolved graph, artifact, SBOM, or behavior |
| Requiring a script or job name to appear in workflow YAML | Can pass when the named control never executes and couples implementation names | Use a reusable workflow where appropriate, parse provider configuration structurally, and exercise an actual candidate or merge-group run |
| Regex source scanner presented as architecture proof | Freezes spelling and layout without deciding visibility, ownership, dependency direction, or behavior | Compiler visibility, package exports, AST/dependency/build graphs, schema compatibility, and executable contracts |
| Test asserting that standards prose contains a sentence | Lets policy validate itself without proving a consuming behavior | Review the standard as source; test the parser, schema, native routing behavior, or controlled outcome that consumes it |

Lexical blocking is appropriate only when bytes are themselves the controlled
surface—for example a known credential signature in publishable content, an
exact legal/publication requirement, or an explicitly temporary migration
fence. A lexical check must not claim a non-lexical property. A temporary fence
has an owner, expiry, and retirement predicate.

Place valid evidence at its least-cost decisive lane:

| Lane | Evidence |
| --- | --- |
| Blocking presubmit | Compiler/type/build validity, schema and public-contract compatibility, deterministic affected behavior, migration safety, and narrow material security/integrity controls required before landing |
| Postsubmit, release, or scheduled | Broad cross-platform suites, deep security analysis, mutation/fuzz exploration, performance distributions, expensive E2E, and other backstops whose delay exceeds their per-candidate admission value |
| Local or advisory | Formatting, prose style, naming preference, documentation suggestions, and low-materiality consistency feedback |
| Delete | Duplicate controls, self-authored status, no-action reports, retired migration fences, and meta-checks that only prove another check or phrase exists |

Do not turn this classification into another registry, meta-lint, approval
service, or required context. A normal compiler/build/test needs no gate
dossier. Before adding a custom required gate, state the named failure,
authoritative input, oracle, expected critical-path cost, failure action, and
retirement condition when temporary.

To reduce an existing thick pipeline:

1. Read the provider's live required contexts, actual job graph, queue time,
   and p50/p95 critical path; workflow source alone is not runtime truth.
2. Group checks by the material invariant they claim. Keep the strongest
   semantic owner and mark the others `replace`, `move`, or `delete`.
3. Replace a textual proxy before removing it when a real uncovered failure
   remains; delete it directly when it owns no material failure.
4. Move valid expensive backstops off presubmit unless their failure must
   prevent this candidate from landing.
5. Update required contexts and their producers together, then exercise one
   clean candidate and one representative failure through the provider path.
6. Compare latency, compute, false positives, and detected failure coverage.
   Stop when every remaining blocker owns a distinct material claim, not when
   an arbitrary gate count is reached.

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

Track production-build amplification separately: the normal target is one
production artifact build per deployed source revision. Also track worker time
spent waiting on CI; an agent should checkpoint and release when only provider
state can advance the outcome.

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
- CI does not build and discard a production artifact that Platform rebuilds;
  production-build amplification is observable and normally equals one.
- Superseded PR/default-branch runs use provider-native change-stream
  concurrency rather than unique-SHA grouping or a custom cancellation plane.
- No ordinary CI path depends on Platform Candidate, selected-snapshot, or
  verification-watermark services.

## Primary references

- [DORA: Trunk-based development](https://dora.dev/capabilities/trunk-based-development/)
- [DORA: Working in small batches](https://dora.dev/capabilities/working-in-small-batches/)
- [GitHub: Managing a merge queue](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- [GitHub: Protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Actions: Pull request events and merge commits](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request)
- [GitHub Actions: Concurrency](https://docs.github.com/en/actions/using-jobs/using-concurrency)
