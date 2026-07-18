# doctrine-evolution-standard (canonical body)

**Authority:** binding Standard Skill package `doctrine-evolution-standard` in `SylphxAI/skills` (`skills/doctrine-evolution-standard/`).

**Cutover:** migrated from Doctrine `standards/doctrine-evolution-standard.md` at digest `sha256:d96b5eedf2e0b8b273a6e7b59d7cb3e381d096da5d326b3cad8c49c26ad23f54` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Doctrine Evolution Standard

## Purpose

Use this standard when changing the central doctrine in a way that may affect
other repositories, agent runtime constitutions, CI/rulesets, project manifests,
release flows, commercial decisions, or delivery policy.

The goal is to let doctrine evolve continuously without asking every project to
manually rediscover and copy each update. A central doctrine change must declare
how the fleet learns it, whether repos need migration, how drift is detected,
and how migration work is generated.

This standard composes with:

- [`project-manifest-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/project-manifest-standard/references/full-standard.md) for repo
  identity, boundaries, discovery adapters, and rollout packets;
- [`documentation-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/documentation-standard/references/full-standard.md) for ADR altitude
  and generated/freshness rules;
- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for no-human gates, work packets, merge queues, and recovery;
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for shipped-state proof.

## Core Rule

Downstream repositories do not copy shared standards. They carry only:

- a root runtime constitution (`AGENTS.md`, `CLAUDE.md`, or equivalent) derived
  from the canonical compact kernel and linked to its owning sources;
- installed canonical Skills when the runtime supports Agent Skills;
- `PROJECT.md` and `.doctrine/project.json` with repo-local facts;
- thin repo-local workflows or settings only where GitHub/runtime mechanics
  require a local caller.

Binding current enterprise choices live in versioned profiles, not in copied
repo prose. Repositories record only their selected local stack, explicit
exception, and migration state.

Everything else is latest-read, generated, centrally audited, or reconciled by
machine work. If a doctrine change requires a repo-local edit, the central
doctrine change must produce a migration path; it must not rely on agents
noticing by memory.

## Change Classes

Every non-trivial doctrine PR must classify its fleet impact:

| Class | Meaning | Repo migration |
| --- | --- | --- |
| `advisory` | New explanation, rationale, examples, or references. | None; agents get it by reading latest doctrine. |
| `new-default` | New template or standard for newly created repos. | None for existing repos unless audit later selects them. |
| `optional-adoption` | Existing repos may opt in when touched. | Generated issue or adoption gap if useful, not a blocking gate. |
| `required-future` | Existing repos must migrate by a deadline. | Migration packet, compat window, audit signal, generated PR path. |
| `required-immediate` | Safety/security/legal/delivery correctness requires prompt fleet action. | Blocking conformance status or high-priority migration packet. |
| `breaking` | Old and new repo states cannot both be valid indefinitely. | New ADR, expand/contract migration, deadline, and recovery plan. |

The PR body or ADR must state the class. If it cannot state the class, the
change is not ready.

## Migration Contract

Any `required-future`, `required-immediate`, or `breaking` doctrine change must
define:

- affected repo selector: org, lifecycle, layer, language, deployable service,
  package producer, commercial surface, required CI, or explicit repo list;
- source of truth changed: standard, schema, template, workflow, ruleset,
  status context, script, runtime constitution, or project manifest field;
- compatibility window: when old state remains accepted and when it starts
  failing;
- migration action: latest-read only, audit issue, generated PR, branch
  protection/ruleset update, reusable workflow update, status-publisher update,
  custom property update, or repo-local implementation;
- proof: local validation, remote branch audit, required CI, merge queue,
  default-branch readback, deploy/readback, or production smoke;
- owner: central doctrine issue, platform bot/reconciler, or owning repo issue;
- recovery: how to roll forward if a generated migration breaks a repo.

This is expand/contract for process:

1. **Expand**: add the new doctrine rule, schema field, template, workflow, or
   status while old repos still pass or report non-blocking drift.
2. **Reconcile**: central audit selects affected repos and opens issues or
   generated PRs.
3. **Ratchet**: after adoption reaches the threshold or deadline, make the new
   rule required.
4. **Contract**: remove old aliases, legacy contexts, or stale template paths
   only after default-branch readback proves all in-scope repos moved.

Do not skip straight to contract across the fleet.

## Discovery And Notification

There are three notification paths; none require a human to read chat:

- **Read-time discovery**: an agent entering a repo reads the always-on runtime
  constitution, then latest doctrine or any directly matching generated
  Doctrine Agent Skill discovered by description. Advisory and new-default
  changes are handled this way.
- **CI/conformance discovery**: `doctor`, project-control audit, admission
  audit, ruleset checks, or status publishers report drift on PR/default branch.
- **Issue/PR reconciliation**: a central reconciler opens or updates
  machine-actionable issues or generated PRs for selected repositories.

The correct default is: latest-read first, audit/reconcile when repo-local state
must change, required status only when the rule is mature enough to block.

## Versioning Model

Doctrine does not need every repo to pin every commit. Pinning every doctrine
version would recreate the manual update problem.

Use these versioning rules instead:

- The current admitted architecture generation and selected profiles are the
  default operating model; repository age is not an exemption.
- Repo manifests record local facts and adoption gaps, not copied doctrine
  content.
- Stable contracts use names and IDs that can be audited: ADR numbers, schema
  versions, status context names, migration packet IDs, and generated issue
  markers.
- Active profile revisions carry selectors, owning decisions, review dates,
  replacement triggers, exception contracts, and migration/exit criteria. A
  reached review date creates a reassessment obligation; it does not silently
  disable a binding profile.
- Stable IDs for parallel-authored artifacts must be collision-resistant. Do
  not use a branch-local auto-increment counter for doctrine migration packets,
  generated issues, rollout packets, registries, or schemas. Use a PR/issue
  allocator, timestamp plus slug plus hash, ULID/UUIDv7, content hash, or a
  generated post-merge display order.
- Breaking or required migrations get a migration packet ID and compatibility
  window. Repos may record a temporary adoption gap or signed exception with
  expiry, but not a permanent fork.
- Machine gates enforce the active contract; they should not require agents to
  parse prose to know whether a repo is stale.

Use `scripts/artifact-identity-conformance-audit.py` when a doctrine change or
fleet migration depends on ADR-71 collision-resistant identity. Its findings
select repo-local migration work; they do not authorize cosmetic renumbering of
grandfathered artifacts.
Use `scripts/artifact-identity-rollout-plan.py` plus
`scripts/sync-rollout-issues.py` when the findings need to become claimable
GitHub work packets.

Do not turn every `REVIEW` finding into a generated issue. `DRIFT` means the
active contract is broken and should become a migration packet or generated PR.
`REVIEW` means a legacy or ambiguous artifact needs assessment; it should update
an umbrella issue or audit summary unless an owning repo explicitly promotes it
to migration work. This keeps the no-human work queue high-signal while still
preserving evidence.

Schema version bumps are reserved for incompatible manifest shape changes. Add
optional fields first. Make them required only after the reconciler has moved
the fleet or generated explicit blockers.

## Central Reconciler Responsibilities

Central doctrine owns:

- the current schemas, templates, standards, ADRs, and rollout scripts;
- active and historical Doctrine profiles plus their validation and migration
  contracts;
- read-only fleet audits;
- desired-state rollout plans and generated issues;
- future generated PRs through a dedicated automation GitHub App/bot;
- org ruleset/custom-property guidance;
- stable context names and status-publisher contracts.

Target repositories own:

- local project facts and boundaries;
- repo-local implementation details;
- repo-local CI/deploy wrappers that GitHub/runtime requires;
- validation and production proof for their own behavior.

A reconciler must not guess product goals, boundaries, pricing, deploy paths, or
commercial posture. It may generate the shape and ask the owning repo to fill
facts, or it may open a PR only when the change is mechanical and facts are
already known.

## Migration Packet Template

Use this shape in ADRs, issue bodies, or generated plan JSON:

```json
{
  "id": "doctrine-migration-YYYYMMDDHHMMSSZ-short-slug-short-hash",
  "class": "required-future",
  "owner": "SylphxAI/doctrine#issue",
  "selector": {
    "orgs": ["SylphxAI", "EpiowAI"],
    "lifecycles": ["active", "production", "commercial"],
    "layers": ["application", "domain-service"]
  },
  "change": {
    "source": "standards/project-manifest-standard.md",
    "summary": "Root AGENTS.md must project the canonical constitution and link to SylphxAI/doctrine and PROJECT.md"
  },
  "compatibility": {
    "oldAcceptedUntil": "2026-07-15",
    "newRequiredAfter": "2026-07-16"
  },
  "migrationAction": "generated-pr",
  "validation": [
    "python3 <doctrine>/scripts/project-control-plane-audit.py --repo <repo> --ref <branch> --fail-on-drift --json",
    "repo-local required CI",
    "default-branch readback audit"
  ],
  "recovery": "Revert generated PR before deadline or open a blocking adoption gap with expiry."
}
```

## Policy Repository Admission

A policy repository is any repository whose content programs agents or the
fleet: this doctrine, runtime-instruction homes, agent prompt libraries, and
org-level policy/config repositories. Whatever merges to a policy default
branch becomes future agents' operating instructions, so policy repositories
must never be the least-gated repositories in the org.

Scope and trigger: every change touching a policy surface — principles,
standards, ADR conventions, templates, schemas, generated-skill sources, and
profiles, plus the repository's own CI workflows and gate/generator scripts — in a policy
repository. Gate wiring is not an exemption: a PR that edits the enforcement
mechanism is itself a policy-surface change, and rides the `L5` CI/governance
lane, not `L2`.

Requirements:

- The default branch requires pull requests and required deterministic status
  checks (tests, generated-artifact freshness, neutrality and conformance
  audits). A zero-gate policy branch is a fleet-wide supply-chain risk.
- Policy-surface changes never ride the `L0` docs lane, whatever their diff
  shape: prose here is runtime behavior for agents. Classify them `L2` minimum
  under the risk lanes in
  [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md).
- Each policy-surface PR carries an adversarial second-pass review artifact in the
  `AI-REVIEW` structured-comment shape defined by that standard's Structured
  Agent Audit (`Agent-Author` in the PR body; `head_sha`, `verdict`,
  `reviewer_id`, and `findings` in the comment — including vendor-neutral
  role-id naming). Bound to the current head SHA, with a verdict, findings
  with file:line evidence, and the reviewing context's recorded identity
  (`reviewer_id`: agent/session id and runtime), the exact 40-character head,
  the base/head `change_digest`, a structured findings payload containing exact
  file:line findings or exactly `- none`, and the canonical `artifact_digest`.
  The reviewing context must not be the authoring context.
  A separate subagent or session supplies a useful adversarial second pass. A
  self-declared role token proves only declared separation; a distinct
  authenticated comment author supplies authenticated reviewer attribution,
  not control-domain independence. The parsing
  check is `scripts/policy-review-gate.py`; edited comments are rejected.
- Comments are not gates: a required status check parses the artifact and
  fails when no `AI-REVIEW` comment matches the head SHA, the verdict is not
  `PASS`, exact/digest-bound structured findings are absent, or `reviewer_id` equals the PR's declared
  `Agent-Author` identity. Deterministic gates decide admission; the
  adversarial second pass exists to catch what deterministic gates cannot —
  semantic weakening, boundary erosion, wording that silently changes policy.
- Declared identity is not control-domain independence. A distinct authenticated
  comment author improves attribution, but a candidate-controlled workflow and
  parser still cannot be the policy repository's independent trust root. Under
  a single shared machine credential, declared identity is trust-on-record: the
  check records both authenticated and declared identities in its output and
  labels the run as `ADVERSARIAL-SECOND-PASS; DECLARED-SEPARATION-ONLY`, so the limitation is visible
  in the audit trail instead of manufacturing confidence. An authoritative
  policy-review context requires a separately controlled
  GitHub App/integration, canonical exact-head/base-change artifact production,
  pull-request and merge-group coverage, edit/delete/head/base reevaluation,
  and a ruleset requirement bound to that integration identity. Live ruleset
  readback is completion proof. Until that exists, the repository-local
  `policy-review` job remains required defense in depth but must not be called
  independent admission authority.
- Emergency policy changes follow the Emergency Fix use case in
  [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md):
  expedited adversarial review, with independent authority only when the
  separately controlled external authority exists, plus a timeboxed follow-up
  artifact — never gate removal.

Validation has two levels. The current defense-in-depth level proves that CI
exposes the exact parser context and that the default-branch ruleset requires
it. Independent admission authority additionally requires the separately
controlled integration, artifact production/reevaluation contract, merge-group
coverage, integration-bound ruleset, and live readback described above.

## Agent Legislation And Rule Lifecycle

Any agent may propose law, and most law should start as a proposal from the
agent that felt its absence. The lifecycle keeps the legislature fast without
letting it bloat:

- **Proposal duty.** When the same class of question reaches the principal a
  second time, or the same rule accumulates a second exception record, the
  resolving answer must be proposed as policy — an amendment PR here, or an
  ADR in the owning repo — not asked a third time. This retires a recurring
  judgment call, never a per-instance ask-gate: the Autonomy Boundary's
  destructive/credentialed/irreversible triggers still apply to every
  occurrence until the amendment merges. Exception-record mechanics live in
  [`specification-control-plane-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/specification-control-plane-standard/references/full-standard.md).
- **Case before statute.** A decision made once is an ADR in the repo that
  made it — case law. Promotion into a doctrine standard — statute — requires
  recurrence evidence: the same rule independently needed by two or more
  projects, or reasoned generalization from competitive research per the
  principles. Doctrine never absorbs a single project's rule as-is; that is
  pollution, not generalization. (Applies to future promotions; it does not
  retroactively indict standards adopted before this rule existed.)
- **Comply, then challenge.** Until an amendment merges, the current rule
  binds. Disagreement is expressed as an amendment PR or a machine-readable
  exception record with owner and expiry — never as silent deviation. An
  agent that considers a rule outdated and ignores it has broken two rules.
- **Amendment difficulty scales with altitude.** Principles change harder
  than standards, and standards harder than ADRs: the higher the altitude,
  the more adversarial review scrutiny the change carries (Policy Repository
  Admission above is the floor, not the ceiling).
- **Rules carry their own review triggers.** A rule whose validity depends on
  conditions — scale, tooling maturity, a mechanism not yet built — states
  those conditions in place, and where possible an expiry or a tracked
  removal issue.
- **Friction is the amendment signal.** Repeated exceptions, repeated
  escalations, and repeated confusion against the same rule are
  machine-visible evidence that the rule, not the fleet, is wrong —
  [`specification-control-plane-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/specification-control-plane-standard/references/full-standard.md)'s
  Exception records section owns the underlying rule (repeated exceptions
  mean the mechanism is wrong). The legislature's telemetry adds the counting
  mechanism: a periodic audit that tallies exception records per rule and
  flags review-due rules at threshold — a repo-local counting script now
  exists (`scripts/exception-friction-audit.py`); fleet-wide wiring into
  every repo's CI is still future work, so until it lands, the agent
  observing the second exception in an un-wired repo opens the review issue
  by hand (that issue is the trigger for Proposal duty above, not a
  substitute for it).

## Practical Defaults

- Advisory/standard wording changes: edit the owning Skills package only; no
  fleet PRs unless effective runtime projection must also change.
- New repo bootstrap improvements: update templates; no fleet PRs unless the
  absence creates actual risk.
- New manifest facts: add optional schema fields first; audit shape when
  present; migrate selected repos in batches; require later.
- New CI/status contexts: publish stable contexts alongside old ones; migrate
  branch protection only after producers exist; remove old contexts last.
- Runtime-instruction changes: preserve the canonical compact constitution and
  update only its governed projection or local mappings; do not copy detailed
  standards. Update the owning Skills package and rebuild only derived catalogs
  or runtime install bundles.
- Emergency security/delivery changes: create a migration ADR, high-priority
  packet, and blocking conformance status with a narrow selector.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `doctrine-evo-01` | Strongest relevant subset applied |
| `doctrine-evo-02` | Facts in schema/test/ADR homes |
| `doctrine-evo-03` | Proof layers separated |
| `doctrine-evo-04` | Unknown authority fails closed |
| `doctrine-evo-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
