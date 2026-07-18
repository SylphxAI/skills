# project-manifest-standard (canonical body)

**Authority:** binding Standard Skill package `project-manifest-standard` in `SylphxAI/skills` (`skills/project-manifest-standard/`).

**Cutover:** migrated from Doctrine `standards/project-manifest-standard.md` at digest `sha256:e9b36cd326b0768c6db61214dcb1161ac8bcf5e14722cda2108dee7ffa0048b6` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Project Manifest Standard

## Purpose

Use this standard when creating, auditing, or changing a repository's project
identity, lifecycle, boundaries, public surfaces, delivery obligations, or
doctrine adoption state.

The goal is simple: an agent entering a repository must know what the project is
for, what it must not become, which surfaces are public, which dependencies are
allowed, and what evidence proves production-ready work. That information must
be machine-readable enough for central audits and rulesets.

This standard composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/agent-first-development-standard.md)
  for no-human gates, work packets, and cross-repo coordination;
- [`documentation-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/documentation-standard.md) for doc altitude
  and freshness gates;
- [`engineering-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/engineering-standard.md) for clean boundaries
  and published contracts;
- [`delivery-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/delivery-standard.md) for merge, release, and
  production proof;
- [`doctrine-evolution-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/doctrine-evolution-standard.md) for the
  reconcile loop, change classes, and migration packets that consume manifest
  facts.

## Canonical Files

Every active repository should expose exactly these local identity surfaces:

```text
<repo>/
  PROJECT.md                 # human entry point
  .doctrine/project.json     # machine-readable project manifest
  AGENTS.md / CLAUDE.md      # always-on constitution plus repo-local instructions
```

`PROJECT.md` is for orientation. `.doctrine/project.json` is the source of truth
for audits. Agent runtime files derive the compact constitution from Doctrine
and carry only repo/runtime-local commands beyond it; they do not copy detailed
standards.

Standing up a brand-new repository — creation, seeding these surfaces,
applying the repo-level merge-queue ruleset and required contexts (the
bootstrapping agent owns that step; the org ruleset covers only the
force-push/deletion baseline), selector projection, and readback — follows
one executable path:
[`../templates/bootstrap-repo.md`](https://github.com/SylphxAI/doctrine/blob/main/templates/bootstrap-repo.md). New-repo
throughput is fleet throughput — the shard unit is the repo, per
[ADR-147](https://github.com/SylphxAI/doctrine/blob/main/docs/adr/ADR-147-merge-throughput-model.md) — so bootstrap is
a governed runbook, not tribal knowledge.

Do not create competing files such as `PROJECT_BOUNDARY.md`,
`AGENT_GUIDE.md`, and `SERVICE.md` unless the repository already has them. If
they exist, they must link to `PROJECT.md` or be generated from the manifest.

## Doctrine Discovery Chain

A central doctrine repository is not self-discovering. Agents that enter a
target repository receive its pre-skill law and discover detailed Doctrine
through a compact root-level runtime constitution:

```text
<repo>/AGENTS.md or <repo>/CLAUDE.md
  -> https://github.com/SylphxAI/doctrine
  -> PROJECT.md
  -> .doctrine/project.json
  -> PRINCIPLES.md and ADR.md on demand
  -> matching profile from profiles/INDEX.md
  -> matching standard from standards/INDEX.md
```

That constitution must be small enough for tools to load automatically and must:

- carry the canonical compact Always-On invariants before skill activation;
- identify `SylphxAI/doctrine` as the upstream enterprise authority;
- identify `PROJECT.md` and
  `.doctrine/project.json`;
- expose on-demand discovery of `PRINCIPLES.md`, `ADR.md`, matching profiles,
  and matching standards;
- keep runtime-local commands, hazards, and validation local while detailed
  enterprise policy stays on demand in Doctrine.

If an agent starts in a repository and no runtime constitution exists, that is an
adoption gap, not a license to infer policy. The agent should use any
tool-level/global instruction that already points to doctrine, then add or
repair the repo-local projection through a normal PR. If no such source exists,
the safe default is to inspect the organization/repo README and existing
workflow conventions, but the durable fix is still a root constitution plus
project manifest.

For new repositories, derive the root constitution from
[`../templates/AGENTS.md`](https://github.com/SylphxAI/doctrine/blob/main/templates/AGENTS.md), preserve its compact kernel,
and append repo-local facts. For existing repositories, prefer linking or amending the
nearest existing `AGENTS.md` / `CLAUDE.md` over introducing a second competing
agent guide.

## Manifest Fields

The schema lives at [`../schemas/project-manifest.schema.json`](https://github.com/SylphxAI/doctrine/blob/main/schemas/project-manifest.schema.json).

Required sections:

- `project`: repo name, lifecycle, product layer, optional policy pool,
  optional multi-tenancy selector (`multi-tenant` / `single-tenant` /
  `not-applicable` — selects the ADR-136 "multi-tenant service" security
  floor row), summary, goals, non-goals, and optional `links` (typed product URLs:
  `production` / `staging` / `docs` / `repo` / `dashboard` / `store` / `package` /
  `status`). The `production` link is the live address the control plane renders
  in the portfolio catalog and uses to derive dogfooding (where the project is
  hosted); libraries use `package`, mobile apps use `store`.
- `profileResolution` (expand-window optional; fail-closed required from
  2026-10-11 by the active enterprise scope): owning source repository, exact
  digest-bound scope id and source, exact profile revisions and authority
  classes, and content-addressed exceptions. An exception first lands as
  non-effective `proposed`; only a registered attested status authority may
  publish its exact admission status, and only a later PR may make it `active`.
  Status-authority schema v1 is spec-only and empty, so current proposals remain
  non-effective. It binds a repo ADR, evidence,
  recovery, and expiry capped at 90 days and profile review. Migration packets
  have a digest-bound id over issuance, tracker, deadline, and sorted transition
  set; a semantic edit creates a new identity and invalidates stale completion
  evidence. They bind a tracker in this repository, exact digest-bound `from → to`
  transitions, a due date bounded by central migration/successor-review
  deadlines, status, and packet-bound completion readback. Duplicate/unrelated
  transitions and partial one-to-many successor sets fail. Retired artifacts
  never resolve; a deprecated scope/profile is accepted only while its full
  active successor set has exact unexpired tracked migrations. Issue closure or
  PR merge is coordination; completion is the default-branch status
  `doctrine/migration/<packetId>`.
  This records repo-local resolution state; the profile and enterprise-scope
  sources remain centrally owned and are never copied into the manifest.
- `boundaries`: owned contexts, explicitly unowned contexts, public surfaces,
  allowed dependencies, forbidden coupling.
- `documentation`: ADR/spec/catalog/runbook/generated-reference locations.
  Spec control-plane artifacts should be exposed through `documentation.specs`
  for prose/spec lifecycle homes and `documentation.generatedReferences` for
  schema-generated references.
- `delivery`: CI model, required status contexts, deploy path, production proof,
  recovery class, optional deployable flag, and package release facts when the
  repository publishes versioned packages.
- `commercial` (optional): current commercial posture, decision home, pricing
  source of truth, metrics source of truth, required commercial decision-record
  types, and guardrails for repositories with pricing, roadmap, paid
  entitlements, or commercial experiments.
- `adoption`: whether the repo is fully adopted, intentionally baseline, or
  still migrating, with tracked gaps.

Use controlled vocabulary where the schema provides one. If a repository needs
a new lifecycle, layer, surface type, CI model, or recovery class, update the
schema in doctrine first rather than inventing a repo-local spelling.

## Lifecycle

Lifecycle is an operating contract, not marketing.

| State | Required behavior |
| --- | --- |
| `incubating` | Goal, non-goals, and boundaries are still required. Production/deploy fields may be `not-applicable` but must say why. |
| `active` | CI and delivery obligations apply. Public surfaces must be named before consumers use them. |
| `production` | Every behavior change needs release/deploy proof or an explicit non-deployable reason. |
| `commercial` | The project must be independently understandable, supportable, and sellable; no hidden sibling/customer assumptions. |
| `maintenance` | New features require a manifest/ADR update explaining why the lifecycle changed or why the feature fits maintenance. |
| `deprecated` | New work is limited to migration, security, data preservation, or sunset. Replacement must be linked. |
| `archived` | Normal agent work stops. Only exceptional recovery or legal/security action proceeds. |

## Boundary Rules

Each repository is zero-knowledge by default.

- A repo owns only the bounded contexts listed in its manifest.
- A repo consumes another repo only through the producer's listed public
  surfaces: API, SDK, CLI, package export, manifest, event, generated client, or
  documented deployment/status contract.
- A repo must never reach into another repo's internals to make a local feature
  easier.
- Product-specific behavior belongs in the product repo, an adapter/integration
  repo, or tenant configuration. It does not belong in a shared engine's core.
- A shared capability remains neutral within its declared audience. Independent
  sellability is required only when the manifest marks the project commercial
  or an owning Commercial ADR selects that option.
- If two repos disagree on ownership, stop the cross-repo change and update the
  manifests or ownership catalog first.

## Central Versus Local Responsibility

Central doctrine owns the shape of the process:

- manifest schema and templates;
- reusable workflows/actions and required context names;
- org ruleset guidance and conformance scripts;
- portfolio-wide standards, ADRs, and audit interpretation.

Repositories own the facts:

- project goal and non-goals;
- lifecycle state;
- owned and unowned bounded contexts;
- public surfaces and forbidden coupling;
- deploy/release path and proof;
- package release control plane when the repository publishes packages;
- commercial decision records, pricing source of truth, metrics source of
  truth, and experiment guardrails when the repository has commercial surfaces;
- temporary adoption gaps;
- applying their own repo-level rulesets and required-check sets at bootstrap
  (see [`../templates/bootstrap-repo.md`](https://github.com/SylphxAI/doctrine/blob/main/templates/bootstrap-repo.md);
  the org ruleset covers only the baseline).

This split is what prevents both extremes: no copy-pasted process in every repo,
and no central system guessing local product intent.

## Rollout Model

Rollout is the reconcile loop defined in
[`doctrine-evolution-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/doctrine-evolution-standard.md): central
audit reads every repo's manifest, agent entry point, branch/ruleset state, and
required context producers; missing or invalid facts become claimable work
packets, durable generated issues, and — once a repo has been inspected —
repo-local PRs; postsubmit conformance keeps the fleet from drifting.
Manifest-specific mechanics:

- Org custom properties and rulesets target repo classes without changing each
  repository by hand.
- Thin repo workflows call central reusable workflows or allow a trusted status
  publisher to emit stable contexts.

Do not treat a dashboard that requires a human to read it as enforcement. If a
repo is missing manifest or boundary facts, the control plane must open work or
fail a conformance status.

GitHub custom properties are a projection layer for broad selectors, not a
second project manifest. The platform reconciler may project lifecycle, layer,
CI model, deployable/package/commercial flags, and `sylphx_policy_pool` from
`.doctrine/project.json` into GitHub so org rulesets and required workflows can
target classes such as `webpool`. It must not infer missing goals, boundaries,
or commercial posture centrally.
`project.policyPool` and `delivery.deployable` are optional during the expand
phase, but a repository cannot be fully projected into GitHub selector values
until both facts are present.

The reconciler must not guess project goals, lifecycle, boundaries, or public
surfaces. Its job is to make missing facts visible and claimable. A target
repository enters `PRESENT` only after an agent reads that repository, commits
its local manifest and `PROJECT.md`, and proves the branch or `main` with the
central audit.

## PROJECT.md Content

Keep `PROJECT.md` short and link-heavy:

- one paragraph purpose;
- lifecycle and product layer;
- goals and non-goals;
- boundary summary;
- public surfaces;
- delivery/production proof summary;
- commercial decision summary when the repository has pricing, roadmap,
  packaging, paid entitlement, or experiment surfaces;
- package release summary when the repository publishes versioned packages;
- links to `.doctrine/project.json`, ADRs, specs, catalog, runbooks.

`PROJECT.md` must not restate enterprise standards already owned by doctrine.

## Validation

Run the central audit locally before claiming adoption:

```bash
python3 scripts/project-control-plane-audit.py --local . --fail-on-drift --json
```

For org-wide status:

```bash
python3 scripts/project-control-plane-audit.py
python3 scripts/project-control-plane-audit.py --json
python3 scripts/project-control-plane-audit.py --repo SylphxAI/doctrine
```

Turn the audit into batched work packets:

```bash
python3 scripts/project-control-plane-audit.py --json \
  | python3 scripts/project-manifest-rollout-plan.py --input -
```

Sync planner output into claimable doctrine issues:

```bash
python3 scripts/project-control-plane-audit.py --json > /tmp/project-audit.json
python3 scripts/project-manifest-rollout-plan.py \
  --input /tmp/project-audit.json \
  --batch-size 25 \
  --json > /tmp/project-rollout-plan.json
python3 scripts/sync-project-manifest-rollout-issues.py \
  --plan-json /tmp/project-rollout-plan.json \
  --repo SylphxAI/doctrine
python3 scripts/sync-project-manifest-rollout-issues.py \
  --plan-json /tmp/project-rollout-plan.json \
  --repo SylphxAI/doctrine \
  --apply
```

The audit and planner are read-only. The issue reconciler is the first explicit
mutation boundary and mutates only doctrine work items. Target-repository
remediation still happens through repo-local PRs after local facts are
inspected.

For package-producing repositories, also run:

```bash
python3 scripts/package-release-conformance-audit.py --repo <owner/repo> --json
python3 scripts/package-release-conformance-audit.py --json
```

This audit does not replace the project manifest audit. It interprets
`delivery.packageRelease` plus package/workflow signals so package-release
adoption can be reconciled without guessing repo-by-repo.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `project-mani-01` | Strongest relevant subset applied |
| `project-mani-02` | Facts in schema/test/ADR homes |
| `project-mani-03` | Proof layers separated |
| `project-mani-04` | Unknown authority fails closed |
| `project-mani-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
