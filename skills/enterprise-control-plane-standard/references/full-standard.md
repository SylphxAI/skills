# enterprise-control-plane-standard (canonical body)

**Authority:** binding Standard Skill package `enterprise-control-plane-standard` in `SylphxAI/skills` (`skills/enterprise-control-plane-standard/`).

**Cutover:** migrated from Doctrine `standards/enterprise-control-plane-standard.md` at digest `sha256:c52bd17242aa5ef28c288a6f071e447f1239cd4fbcb31a31eb0cecfe83ace35a` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Enterprise Control Plane Standard

## Purpose

Use this standard when deciding how development process, CI, previews, release,
scorecards, migrations, or doctrine adoption should apply across many
repositories.

This standard owns fleet control-plane boundaries and outcomes. The active
engineering and delivery profiles own current platforms, forge, runner, and
tool selections. Named systems below are the binding current profile projection
and must be replaced through a successor profile rather than promoted into a
constitutional invariant.

The goal is to avoid bespoke per-repo development pipelines. Central doctrine
owns the process shape and enforcement contracts. Repositories own only their
local facts, compact constitution projections, and unavoidable transport callers.

This standard composes with:

- [`project-manifest-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/project-manifest-standard/references/full-standard.md) for repo
  identity, lifecycle, boundaries, and rollout packets;
- [`doctrine-evolution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/doctrine-evolution-standard/references/full-standard.md) for
  doctrine updates and fleet migration contracts;
- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for no-human gates, CI admission, merge queue, preview policy, runners, and
  package-release controls;
- [`ci-runner-capacity-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/ci-runner-capacity-standard/references/full-standard.md) for
  runner pickup SLOs, queue classification, and capacity/backpressure signals;
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for shipped-state proof;
- [`commercial-decision-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/commercial-decision-standard/references/full-standard.md) for
  pricing, roadmap, and business-direction decisions.

## Control Plane Layers

Use the layer that owns the fact or mechanism:

| Layer | Owns | Must not own |
| --- | --- | --- |
| Active delivery-forge enforcement (currently GitHub) | issues, change candidates, merge serialization, rulesets, branch protection, checks/statuses, workload identities, selector properties | product intent, hidden workflow state, dashboard-only governance |
| Doctrine | standards, ADRs, schemas, templates, migration packets, stable context names, conformance scripts | repo-local project facts, product runtime behavior |
| Repo-local facts | `PROJECT.md`, `.doctrine/project.json`, root runtime constitution, thin caller workflows | copied enterprise process, sibling-repo internals |
| Active execution platform (currently Sylphx Platform) | CI compute, preview/deploy orchestration, status publication, reconciliation, fleet dashboards, portal projection | merge authority outside the selected delivery forge, project facts guessed centrally |
| Portal/catalog projection | searchable catalog, scorecards, scaffolding UI, ownership views, maturity summaries | source-of-truth state not backed by GitHub/doctrine/manifests/telemetry |

If two layers can express a fact, choose the one that can enforce or generate it
without drift. Prose dashboards are never enforcement.

## Defaults

### New repositories

New repositories start from doctrine defaults:

- root runtime constitution from `templates/AGENTS.md` or runtime equivalent;
- `PROJECT.md` and `.doctrine/project.json`;
- organization Renovate preset or relay;
- baseline ruleset and branch protection from the owning organization;
- thin workflow caller only when GitHub Actions, a status publisher, or a
  runtime requires a local file;
- manifest-declared lifecycle, layer, public surfaces, delivery proof, and
  adoption state before substantive cross-repo consumption.

### Existing repositories

Do not manually redesign every repository. Use the reconcile loop from
[`doctrine-evolution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/doctrine-evolution-standard/references/full-standard.md):

```text
central audit
  -> rollout plan
  -> generated Work Item and exact source candidate
  -> repo-local validation
  -> active-profile admission and serialization
  -> default-branch readback
```

Reconciler limits are defined there too: mechanical changes only where local
facts are already known, never invented.

### GitHub rulesets and custom properties

Use organization rulesets for shared branch/tag/check policy. Use repository
custom properties to select broad repo classes: lifecycle, layer, artifact
producer, deployable service, commercial surface, package producer, or CI model.

Custom properties are selectors, not the canonical project manifest. The
manifest remains the local source of truth for nuanced goals and boundaries.
The platform reconciler may project manifest facts into GitHub custom
properties, but it must not make GitHub custom properties the only home for
project purpose, lifecycle, boundary, deploy path, or commercial posture.

The doctrine-owned selector baseline is:

| GitHub custom property | Type | Purpose |
| --- | --- | --- |
| `sylphx_lifecycle` | single select | Coarse lifecycle selector copied from `project.lifecycle`. |
| `sylphx_layer` | single select | Portfolio-layer selector copied from `project.layer`. |
| `sylphx_ci_model` | single select | CI enforcement selector copied from `delivery.ciModel`. |
| `sylphx_policy_pool` | single select | Broad policy pool for rulesets, required workflows, preview defaults, and migration packets. |
| `sylphx_deployable` | true/false | Selector for deploy/preview/recovery policy. |
| `sylphx_package_producer` | true/false | Selector for package release control-plane policy. |
| `sylphx_commercial_surface` | true/false | Selector for commercial ADR/pricing/entitlement policy. |

`webpool` is a `sylphx_policy_pool` value, not a special case in any target
repository. It selects web application repositories for web preview/build
defaults, front-end checks, route/rendering admission, and Sylphx Platform
deploy policies. A repository enters or leaves `webpool` by updating its
manifest facts and then letting the reconciler update GitHub custom properties.
Do not hardcode WebPool membership in workflow YAML, runner labels, or sibling
projects.

Use `scripts/repo-selector-conformance-audit.py` to read the live GitHub custom
property schema and per-repo selector values. Missing selector schema is
control-plane drift. Missing selector values are migration work, not a reason
for the central platform to guess a repository's purpose.

Use `scripts/repo-selector-schema-provision.py` to provision or repair the
selector schema. Schema provisioning is an expand-phase operation: the
properties are created with `required=false` and
`require_explicit_values=false`. A later ratchet may make values required only
after the Sylphx Platform/GitHub App projection job has populated in-scope
repositories and default-branch readback proves coverage.
Use `scripts/repo-selector-value-projection.py` to project repo-local manifest
facts into GitHub custom-property values. It applies only complete selector facts
and reports missing `project.policyPool` or `delivery.deployable` as repo-local
manifest work rather than guessing centrally.
Use `scripts/repo-selector-manifest-rollout-plan.py` to batch incomplete
selector facts into claimable repo-local migration packets. Packet batching is
the default; do not create one issue per repository for selector fact adoption.

### CI and status checks

Branch protection should require stable fan-in contexts:

- `risk-classification/pass`;
- `trunk-admission/pass`;
- `postsubmit-proof/pass` where release/deploy promotion depends on it;
- `recovery-decision/pass` for recovery workflows.

The implementation may be a central reusable workflow, a thin repo wrapper, or
a trusted Sylphx status publisher. The context name is the contract. Raw job
names are implementation details.

For repositories whose active profile requires PR/merge-queue admission, every
required context must have an active producer on PR and `merge_group` events.
Path-skipped required checks, inactive producers, and missing merge-group
triggers are control-plane drift. Roleless candidates instead publish their
profile-selected exact-snapshot proof and scoped watermark; do not manufacture
PR contexts where no PR admission exists.

### CI compute

For Sylphx-owned repositories, Sylphx Platform runner profiles are the default
CI compute plane. GitHub-hosted or third-party runners require a machine-readable
exception with unsupported capability, owner, reason, expiry, and replacement
path.

Runner profile names are contracts; raw GitHub runner labels are implementation
details. The default Linux profiles are `sylphx-linux-standard`,
`sylphx-linux-large`, `sylphx-linux-xlarge`, and `sylphx-linux-2xlarge`.
The default macOS profile family is `sylphx-macos-*` as exposed by Sylphx
Platform. Workflows may use the scalar profile ID directly, or an array
containing `self-hosted` plus the scalar profile ID where the caller needs to be
explicit about GitHub's self-hosted runner class. The legacy tuples
`[self-hosted, sylphx, linux, standard]` and `[self-hosted, sylphx, macos,
standard]` are migration aliases, not second policy spellings, and must not be
introduced into new workflows. Any additional profile needs a doctrine-owned
name, capability description, selector, capacity owner, pickup SLO, queue
diagnostic signal, and conformance signal before repositories depend on it. A
required context queued on a profile with no online matching runner is
control-plane drift, not a repo-local CI failure.

Default lane-to-profile selection:

| Lane | Default profile | Notes |
| --- | --- | --- |
| docs/control-plane/no-op status | existing status publisher or `sylphx-linux-standard` | Prefer no compute when a trusted status publisher can prove no-op. |
| risk classification, affected lint/type/test, package preflight | `sylphx-linux-standard` | Keep blocking admission cheap and high-throughput. |
| heavy build, parallel suites, browser E2E required before merge | `sylphx-linux-large` | Use when standard runners create queue pressure or underutilize parallelism. |
| large monorepo builds, high-memory integration, container build bursts | `sylphx-linux-xlarge` | Requires capacity SLO and cost signal before becoming a required context. |
| reserved-memory SDK/mobile/game/release builds | `sylphx-linux-2xlarge` or matching macOS profile | Use only when the domain requires it and artifact/release proof is present. |

The classifier selects a lane; the lane policy selects a profile; the platform
scheduler places the job. Target repositories should not encode ChatLink,
HeavyLink, or other informal pool names as runner labels. If such names exist
as product UI terms, they must map to doctrine-owned lanes/profiles through
Sylphx Platform configuration.

Runner choice does not change branch protection. The same stable contexts must
be published regardless of compute backend.

Queue/capacity visibility is part of the control plane. The execution plane must
publish or expose enough data to distinguish `within-slo`, `capacity-saturated`,
`no-online-runner`, `unknown-profile`, `blocked-or-waiting`, and
`inventory-unknown` states for queued/running jobs. The read-only doctrine audit
is `scripts/runner-queue-capacity-audit.py`; continuous enforcement belongs in
Sylphx Platform or the status publisher, not in target repositories.

### Queue governor

Sylphx Platform is the fleet execution controller, not just a pool of runners.
It must consume queue depth, pickup SLO, runner profile inventory, lane
classification, merge-queue state, and postsubmit/release load, then choose the
least disruptive control action:

- burst or pre-warm the saturated profile;
- protect merge-group admission capacity from lower-priority PR feedback,
  postsubmit, preview, and release work;
- move eligible heavy proof to postsubmit or a larger profile;
- publish no-op preview/build contexts for non-runtime slices;
- reuse artifacts by provenance key instead of rebuilding after merge;
- recommend or apply a lower merge-queue build concurrency when the runner pool
  cannot keep up;
- open machine-actionable capacity or workflow-drift work when the controller
  cannot decide automatically.

The target repository must not carry this scheduling logic. It declares its
local facts, calls the central workflow/status surface, and requests stable
runner profiles. Platform owns the queue governor and status publication that
turn those facts into fast, safe delivery.

### Preview and deploy

Preview is admission evidence, not a universal tax.

- Require preview for runtime, user-visible, API/event/tool/SDK, auth, billing,
  security, migration, deploy, infra, feature-flag, or cross-repo contract
  changes.
- Skip preview for docs/control-plane-only candidates and publish successful
  no-op preview/build contexts without allocating build or runtime capacity.
- Allow optional preview only when the classifier can prove the change cannot
  affect route behavior, rendering, onboarding/checkout, contracts, or runtime
  config.

Production deploy proof remains separate from PR preview proof.

### Package release

Package producers follow ADR-59. JavaScript/TypeScript packages use Changesets
unless a repo-local ADR proves an equivalent. Release/version PRs must be opened
by a dedicated least-privilege GitHub App or bot identity so CI triggers
normally and release commits have stable audit identity. Each org designates
one release App identity in org-level configuration; the control-plane task is
to certify its permissions, installation scope, and status context behavior,
not to create a duplicate bot.

Package release adoption is centrally audited by
`scripts/package-release-conformance-audit.py`. Repositories that publish or
appear to publish packages must expose `delivery.packageRelease` facts; the
audit then checks release intent, bot-owned version PR evidence, release gates,
publish identity, OIDC/token fallback posture, provenance, and registry
readback. Findings become migration issues or generated PRs, not manual
dashboard review.

Collision-resistant artifact identity is centrally audited by
`scripts/artifact-identity-conformance-audit.py`. Repositories should not create
branch-local sequential ADR drafts, migration filenames, doctrine/rollout
packet IDs, generated issue markers, or generated registry rows. The audit is a
read-only selector for ADR-71 migration work and future ratchets; legacy
sequence-like artifacts are reviewed, not renumbered blindly.
`scripts/artifact-identity-rollout-plan.py` turns audit output into claimable
work packets, and `scripts/sync-rollout-issues.py` reconciles those packets into
doctrine issues without editing target repositories.

Only hard `DRIFT` artifact-identity findings should become generated packet
issues by default; `REVIEW` findings (grandfathered ADR numbers,
already-applied sequential migration filenames) follow the DRIFT/REVIEW
handling in
[`doctrine-evolution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/doctrine-evolution-standard/references/full-standard.md).

### Commercial decisions

Pricing, packaging, roadmap, paid entitlements, commercial experiments, and
market positioning follow ADR-62. They are research-backed Commercial ADRs, not
repo-local preferences or hidden chat decisions.

## Portal And Scorecard Rules

A portal or scorecard is useful when it accelerates discovery or generates work.
It is not governance by itself.

Allowed:

- read-only catalog projections from `.doctrine/project.json`, GitHub, CI,
  release systems, billing SSOT, metrics SSOT, and telemetry;
- scaffolding flows that create typed Work Items and source candidates through
  the active adapter;
- scorecards that map each check to candidate evidence, required status, Work
  Item, exception record, or measured telemetry gate;
- dashboards that help agents prioritize work already backed by machine state.

Forbidden:

- project goals, lifecycle, boundaries, or commercial posture stored only in a
  portal database;
- maturity scores that require a human to read and decide;
- comments or dashboard warnings that no candidate gate or Work Item reconciler
  consumes;
- portal workflows that bypass the active profile's integrity, admission,
  serialization, release controls, or repo-local manifests.

## Migration Classes

Every control-plane change must use the doctrine-evolution classes:

- `advisory`: references, examples, wording, no migration.
- `new-default`: templates/defaults for new repos.
- `optional-adoption`: repos may opt in when touched.
- `required-future`: generated packet, compatibility window, ratchet date.
- `required-immediate`: narrow safety/security/delivery selector and blocking
  conformance.
- `breaking`: new ADR plus expand/contract and recovery plan.

Do not make a new rule blocking across the fleet until its producer exists,
its selector is explicit, and recovery is documented.

## Validation

For a doctrine change:

```bash
python3 scripts/project-control-plane-audit.py --local . --fail-on-drift --json
python3 scripts/runner-profile-conformance-audit.py --local . --fail-on-drift --json
python3 scripts/runner-queue-capacity-audit.py --repo SylphxAI/doctrine --json
python3 scripts/artifact-identity-conformance-audit.py --local . --local-repo SylphxAI/doctrine --fail-on-drift --json
python3 scripts/package-release-conformance-audit.py --local . --local-repo SylphxAI/doctrine --json
python3 scripts/repo-selector-conformance-audit.py --org SylphxAI --json
git diff --check
```

For a target repository:

```bash
python3 <doctrine>/scripts/project-control-plane-audit.py \
  --repo <owner/repo> \
  --ref <branch> \
  --fail-on-drift \
  --json

python3 <doctrine>/scripts/runner-profile-conformance-audit.py \
  --repo <owner/repo> \
  --ref <branch> \
  --check-live-runners \
  --fail-on-drift \
  --json
```

A control-plane claim is not complete until the default branch or required
status readback proves the repo is actually in the desired state.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `enterprise-c-01` | Strongest relevant subset applied |
| `enterprise-c-02` | Facts in schema/test/ADR homes |
| `enterprise-c-03` | Proof layers separated |
| `enterprise-c-04` | Unknown authority fails closed |
| `enterprise-c-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
