# ci-runner-capacity-standard (canonical body)

**Authority:** binding Standard Skill package `ci-runner-capacity-standard` in `SylphxAI/skills` (`skills/ci-runner-capacity-standard/`).

**Cutover:** migrated from Doctrine `standards/ci-runner-capacity-standard.md` at digest `sha256:d750e428ab872fffe22052dc66c7d76b9152fcc575069b10e3d50bca13726592` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# CI Runner Capacity Standard

## Purpose

Use this standard when CI latency, merge-queue pickup time, runner profiles,
admission lanes, or queue capacity affects repository delivery.

The goal is to make runner backlog a central control-plane signal, not a
repo-local mystery. A queued required check must be classifiable as code
failure, policy wait, runner-profile drift, or capacity backlog without a human
opening many workflow pages.

This standard owns queue and capacity semantics. The active delivery and
engineering profiles own the selected forge, execution platform, and runner
adapters; named systems below are the current profile projection.

This standard composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for autonomous admission, risk lanes, preview policy, and merge queue;
- [`enterprise-control-plane-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/enterprise-control-plane-standard/references/full-standard.md)
  for GitHub checks, Sylphx Platform runners, status publishers, and fleet
  reconciliation;
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for truthful done states;
- [`doctrine-evolution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/doctrine-evolution-standard/references/full-standard.md) for
  fleet migrations and ratchets.

## Control-Plane Contract

Runner capacity is owned centrally by the Sylphx execution plane. Target
repositories own only:

- which stable status contexts they publish;
- the minimal workflow caller files GitHub requires;
- the runner profile selected for unavoidable local jobs;
- a machine-readable exception when an equivalent Sylphx runner profile does
  not exist.

Repositories must not solve capacity backlog by inventing new labels, moving to
GitHub-hosted compute, weakening branch protection, duplicating admission
logic, or adding repo-specific workarounds. A required job waiting for a runner
on an approved profile is central execution-plane backlog.

## Required Signals

The central control plane must be able to list queued and running jobs by:

- organization, repository, workflow, run ID, job ID, event, ref, and head SHA;
- job status and conclusion;
- requested runner labels and canonical Sylphx runner profile;
- runner name and runner ID when assigned;
- queue age, pickup latency, and running duration;
- admission lane or best available lane inference;
- runnable versus blocked classification;
- profile-level online, busy, idle, queued, and running counts;
- runner-inventory completeness, pagination consistency, and unknown fields;
- workflow-run and workflow-job observation completeness, including bounded
  run enumeration and every `total_count`-bound job page;
- provider observation capabilities, including whether runnable time exists;
- SLO breach state and breach reason.

Exact L0-L5 risk lane comes from the ADR-29 admission manifest. Until every
required producer exposes the manifest to the status publisher, queue audits may
emit a conservative lane inference from workflow and job names, but that
inference is diagnostic only and must not lower admission risk.

## Default Runner Profiles

| Profile | Purpose | Default pickup SLO | Capacity owner |
| --- | --- | --- | --- |
| `sylphx-linux-standard` | Linux CI, tests, builds, admission fan-in, docs/control-plane jobs | p95 <= 120s for blocking admission and affected CI; p95 <= 300s for heavy E2E/build lanes | Sylphx Platform execution plane |
| `sylphx-linux-large` | Heavy builds, parallel suites, browser E2E required before merge | p95 <= 180s for blocking admission; p95 <= 300s for heavy E2E/build lanes | Sylphx Platform execution plane |
| `sylphx-linux-xlarge` | Large monorepo builds, high-memory integration, container build bursts | p95 <= 300s for blocking lanes that explicitly select the profile | Sylphx Platform execution plane |
| `sylphx-linux-2xlarge` | Reserved-memory SDK/mobile/game/release builds where smaller profiles are not equivalent | p95 <= 300s unless the owning release ADR sets a stricter SLO | Sylphx Platform execution plane |
| `sylphx-macos-*` | macOS-specific CI, signing, package validation, and Apple-platform builds where Linux is not equivalent | p95 <= 300s for blocking macOS lanes | Sylphx Platform execution plane |
| `github-hosted-hermetic-policy` | **Hermetic policy / instruction-admission only**: deterministic schema, SSOT-model, catalog integrity, and policy-review gates that must not wait on Platform runner inventory. Backing label today: GitHub-hosted `ubuntu-latest` (or pinned `ubuntu-24.04`). **Not** product build/test/deploy. | Pickup is GitHub-hosted scheduler latency (not Sylphx profile SLO); capacity owner is GitHub Actions for the label, doctrine owns profile eligibility | Doctrine (profile eligibility) + GitHub (compute) |

### Hermetic policy profile (canonical, not a repo-local escape)

Profile ID: **`github-hosted-hermetic-policy`**.

**Why it exists:** Some admission jobs are pure policy machines (JSON Schema,
deterministic validators, instruction-SSOT path gates). They must stay
available when Platform runners are saturated or restarting. That is an
**owned profile**, not permission for product CI to flee backlog onto
GitHub-hosted compute.

**Selectors (all required):**

1. Workflow is named for policy/admission (`policy-admission`,
   `instruction-ssot-model`, or an equivalent documented admission producer).
2. Job publishes a **required** admission context (branch protection / ruleset).
3. Job is hermetic: no product build matrix, no deploy, no secret-dependent
   integration against live customer systems.
4. Workflow or job declares the profile via comment or env
   `SYLPHX_RUNNER_PROFILE: github-hosted-hermetic-policy`.

**Forbidden:** using this profile for ordinary product `validate`/`test`/`build`
lanes, or inventing `ubuntu-latest` in a product workflow without the profile
declaration and selectors above. Capacity backlog on `sylphx-linux-*` is still
fixed centrally — not by converting product CI to GitHub-hosted.

**Evidence lineage:** Doctrine ADR admitting this profile; ADR-213 dogfood on
`SylphxAI/doctrine` policy-admission; Skills policy-admission after profile
admission.

Closed pickup latency is measured from GitHub job `created_at` until
`started_at`, or from a stronger provider-backed `runnable_at` signal until
runner assignment/start when that signal exists. For an unstarted job,
`created_at` to observation time is queue-age exposure only: it is not proof
that dependencies have cleared, the job is runner-runnable, or busy runners
caused the wait. The audit preserves queue age separately from closed pickup
latency and attributes an open pickup breach only when the provider supplies a
runnable timestamp or stronger equivalent.

A single long queue can happen during bursty operation, but profile breach must
become machine-visible before merge queues pile up. The read-only audit reports
per-job threshold breaches as incident input; the continuous platform control
plane should compute the rolling p95. An unstarted queue-age breach without
runnable evidence is reported as unattributed and must not be promoted to
`capacity-saturated`.

Profile choice is selected by doctrine-owned lane policy. Target repositories
request a stable profile; they do not invent raw runner labels to escape queue
pressure. New profiles require a doctrine-owned name, capability description,
selector, expected workload, capacity owner, pickup SLO, conformance signal, and
recovery path before branch protection or merge queues depend on them.

Profile IDs are the stable contract. Workflows may reference a profile as a
scalar label (`sylphx-linux-standard`) or as `[self-hosted, <profile-id>]`
when a caller must be explicit about GitHub's self-hosted runner class.
Legacy tuple labels such as `[self-hosted, sylphx, linux, standard]` are
migration aliases only; new workflows use the scalar profile ID so the
execution plane can remap backing runners without repo churn.

## Backpressure Rules

Backpressure is applied at the source:

- keep stable fan-in contexts small and publish them from an existing required
  job or trusted status publisher when possible;
- route jobs to the smallest profile that satisfies the lane's CPU, memory,
  platform, and parallelism needs, then scale capacity centrally when that lane
  breaches pickup SLO;
- do not run heavyweight E2E, preview, deploy, or package publish lanes twice
  for the same exact candidate unless the admission manifest proves the first
  result is not transferable;
- shard independent queues by conflict surface and runner profile, but keep
  each repository's merge queue as the integration serializer;
- cap concurrent heavy lanes per repo/stack when they starve shared profiles;
- prefer postsubmit or continuous deep backstops for exhaustive suites that do
  not need to block the PR critical path;
- publish successful no-op preview/build contexts for docs/control-plane-only
  candidates without allocating runtime preview capacity.

Backpressure must not hide failures. It changes when and where work runs, not
whether the required proof exists.

## Critical-Path Isolation

Runner capacity must preserve the delivery critical path. A repository can have
correct workflow labels and still be slow if admission, postsubmit, release,
preview, and main-push jobs all compete for the same saturated profile.

The execution plane must enforce lane priority and quota before a merge queue
falls behind:

1. recovery admission and rollback/forward-fix gates restore production first;
2. `merge_group` and `trunk-admission/pass` for queued candidates get protected
   admission capacity;
3. PR branch feedback remains fast, but may yield to merge-group admission when
   the queue breaches pickup SLO;
4. postsubmit, exhaustive affected suites, heavy E2E, mutation, and deep
   security backstops run on lower-priority or separate capacity unless they are
   actively gating release promotion;
5. release, deploy, and artifact-promotion lanes use release-specific capacity
   or quota so they do not starve admission, and admission does not starve
   already-merged production rollout.

When lanes must share a profile, the scheduler must expose per-lane concurrency,
pickup SLOs, and queued/running counts. A `main` push job must reuse successful
merge-group artifacts or publish a no-op/postsubmit-only context when the
provenance key proves the candidate is content-identical; it must not blindly
rerun the same expensive proof on the same saturated runner profile.

GitHub merge queue build concurrency is an input to this controller. If
multiple merge-group builds saturate the runner profile, the normal actions are
to burst capacity, reduce heavy-lane concurrency, or lower merge-queue build
concurrency until pickup SLO recovers. Do not solve this by weakening branch
protection or by moving target repositories to bespoke labels.

## Diagnosis

Classify every delayed job into one of these buckets:

| Classification | Meaning | Normal action |
| --- | --- | --- |
| `within-slo` | The observed open queue age or closed pickup interval is still inside the profile/lane budget. | Keep polling; do not mutate repos. |
| `capacity-saturated` | Provider-backed evidence says the open job is runnable, and complete inventory proves every online runner satisfying the job's exact required-label subset busy with zero idle at the same observation. | Add capacity, reduce heavy-lane concurrency, or move eligible work to postsubmit. |
| `unknown-profile` | Job requested labels not mapped to an approved profile. | Run runner-profile conformance and open a repo-local migration PR if the workflow is wrong. |
| `inventory-unknown` | Runner inventory is unreadable, incompletely paginated, internally inconsistent, malformed, or has unknown busy state. | Retry or fix token/scope/provider data; do not treat partial counts as empty or idle. |
| `blocked-or-waiting` | Job is waiting for environment, policy, concurrency, or GitHub scheduling rather than runner pickup. | Inspect policy/environment/concurrency gate. |
| `unmeasured` | Required timing such as job `created_at` is missing, malformed, or chronologically invalid. | Repair provider telemetry; do not claim `within-slo`. |
| `slo-breach` | Queue-age exposure or closed/provider-backed pickup time exceeds the profile/lane budget; the reason records whether attribution is proven. | Treat as control-plane incident input and preserve evidence. |

`no-online-runner` is a `runner_availability_state`, not a timing
classification. It may accompany `within-slo`, an unattributed queue-age
`slo-breach`, or provider-backed pickup evidence, but it never creates causal
pickup evidence by itself.

Classification is fail closed on causality:

- `queue_seconds` remains a compatibility alias for queue-age exposure;
  `queue_age_seconds` is the exact field for that exposure, while
  `pickup_seconds` is populated only after `started_at` closes the interval;
- `runnable_state=runnable` requires provider-backed `runnable_at` or a stronger
  equivalent; GitHub `queued` plus a busy inventory snapshot is insufficient;
- raw GitHub workflow-job observations publish
  `raw_github_workflow_job_runnable_at=false`; without provider enrichment,
  `capacity-saturated` and `critical_path_pressure` are unobservable rather
  than guessed;
- organization runner inventory, runner groups, group membership, and selected
  repositories are fetched through every `total_count`-bound page. Eligibility
  is admitted only when initial organization inventory, the complete group
  union, and final organization inventory contain the same runner identities
  and labels, followed by a stable membership re-read for every used group.
  Omitted or added runners, group movement, page loss, count drift, malformed
  runner/group/label fields, duplicate IDs, non-boolean `busy`, unreadable
  repository selectors, or unresolved workflow restrictions invalidates the
  whole organization observation; partial profile counts and empty maxima are
  `null`, never fabricated as zero;
- matching uses GitHub's case-insensitive label semantics: every normalized
  label requested by the job must be advertised by the runner. A shared
  profile label alone cannot satisfy an additional constraint such as `gpu`.
  Only documented legacy profile tuples are normalized as migration aliases
  for profile reporting, and ordinary provider labels such as architecture may
  coexist with those tuples. A matching runner must additionally belong to a
  provider runner group proven eligible for the target repository visibility
  or selected repository ID and, when restricted, the exact workflow path and
  ref/SHA. Labels without this eligibility proof are not capacity;
- workflow-job observations are fetched through every stable
  `total_count`-bound page. Missing pages, count drift, duplicate job IDs,
  malformed job labels, or partial pages discard the run observation and
  surface an error. Each run is bound to its requested repository, commit,
  attempt, number, URL, timestamps, and queried status; each job is bound back
  to that run and commit, strictly positive-integer parent run ID and attempt,
  canonical job and `run_url`,
  status/conclusion state, and assigned runner plus runner-group identity when
  started. Foreign or internally incoherent candidates are not
  eligible evidence. Malformed bounded workflow-run responses likewise surface
  an error instead of becoming an empty queue. A run observed under multiple
  sequential status queries invalidates the non-atomic observation rather than
  selecting one version. `--fail-on-breach` also fails on these observation
  errors;
- repository enumeration is all-or-nothing. A non-array response, malformed
  entry, invalid archive/fork state, duplicate name, or malformed default
  branch invalidates discovery instead of silently becoming an empty or partial
  target set. In a multi-organization sweep, one organization error discards
  the complete inferred target set; no surviving organization may be audited
  as though the fleet sweep were complete;
- explicit `--repo` targets derive their organization runner-inventory scope.
  When `--org` is also supplied, its set must exactly match the explicit repo
  owners; default or unrelated organization inventory cannot be substituted;
- jobs in `waiting`, `pending`, or `requested` remain
  `blocked-or-waiting` even when their raw age exceeds a pickup budget;
- missing or invalid required timestamps produce `unmeasured`, never
  `within-slo`; this includes a completed job without `started_at`, which must
  never fabricate a pickup interval or breach. A completed job without a
  provider runner assignment is also unmeasured: GitHub may give skipped jobs
  a synthetic `started_at` even though no runner performed a pickup;
- `--workers` must be within `1..32` and `--max-runs-per-repo` within `1..100`.
  Zero, negative, or excessive values exit `2` before provider access; the
  audit never silently clamps caller intent;
- an unstarted queued job without runnable evidence may be `within-slo` or an
  unattributed `slo-breach`, but never `capacity-saturated`; and
- `critical_path_pressure` requires a causally `capacity-saturated` admission
  job and complete exact-label matching inventory with zero idle. The report
  retains matching runner and runner-group IDs, and a competing job counts only
  after its provider assignment is cross-bound to the same eligible group-aware
  inventory. The provider-assigned runner ID belongs both to that admission
  pool and to the
  competing job's own exact-label matching busy pool in the same organization.
  Sharing only a profile or organization is insufficient;
- GitHub's runner and workflow APIs do not provide one transactional snapshot.
  Reports therefore publish a bounded `observation_window` with `atomic=false`.
  Exact identity cross-binding makes pressure a conservative same-window
  attribution, not a claim that the provider supplied an atomic snapshot. A
  merely queued admission plus currently running lower-priority work remains
  correlation, not causal pressure proof.

## Validation

Use the live queue audit for org or repo status:

```bash
python3 scripts/runner-queue-capacity-audit.py --repo SylphxAI/doctrine --json
python3 scripts/runner-queue-capacity-audit.py --org SylphxAI --json
python3 scripts/runner-queue-capacity-audit.py --json --fail-on-breach
```

Use runner-profile conformance for workflow label drift:

```bash
python3 scripts/runner-profile-conformance-audit.py \
  --repo <owner/repo> \
  --ref <branch> \
  --check-live-runners \
  --json
```

A queue audit proves current runner/control-plane state. It does not prove a
repository's code correctness. Code correctness remains the job of the selected
CI lane and stable admission contexts.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `ci-runner-ca-01` | Strongest relevant subset applied |
| `ci-runner-ca-02` | Facts in schema/test/ADR homes |
| `ci-runner-ca-03` | Proof layers separated |
| `ci-runner-ca-04` | Unknown authority fails closed |
| `ci-runner-ca-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
