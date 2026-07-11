---
name: skill-marketplace-creator
description: Design, consolidate, and govern a private or internal Agent Skills portfolio with physical installable/incubator/retired states, authenticated or local distribution, owner-informed knowledge protection, admission and retirement ledgers, exact-current evidence, deletion-diff gates, and access/licensing provenance boundaries. Use when creating or resetting an internal skill repository, admitting or retiring multiple skills, resolving overlapping routes, migrating a formerly public portfolio to private access, or automating portfolio governance. Do not use for distilling one source, evaluating one skill, or building an MCP/runtime tool marketplace.
---

# Private Skill Portfolio Governance

Produce one **Private Skill Portfolio Governance Packet** that makes the active
skill surface, ownership, access, evidence, and lifecycle mechanically
truthful. Optimize reusable decision value per unit of routing, context, and
maintenance surface—not folder count.

## Atomic boundary

Own repository-level portfolio policy: physical lifecycle states, admission,
composition boundaries, authenticated/local distribution, exact evidence,
history-aware retirement, derived inventory, and autonomous reconciliation.

Do not author one domain skill, design one skill's benchmark, provide runtime
tools, decide legal ownership, or operate a public marketplace. Route one-source
distillation to `source-to-skill-distiller` and one-skill evaluation to
`skill-eval-designer`.

## When not to use

- Use `source-to-skill-distiller` when the artifact is one skill distilled from
  one bounded source rather than a repository-wide portfolio control plane.
- Use `skill-eval-designer` when the artifact is one skill's falsifiable routing
  or behavior experiment rather than admission and lifecycle governance.
- Use a typed runtime/tool architecture when the primary product executes MCP,
  API, credentialed, or permissioned side effects; this skill governs procedure
  packages only.

## Resource guide

- Read `references/marketplace-playbook.md` for lifecycle decisions,
  owner-informed protection, admission, deletion/tombstone rules, exact
  evidence, and the autonomous governance loop.
- Read `references/catalog-generation-patterns.md` when deriving an internal
  registry, catalog, or install inventory from canonical physical state.
- Run `scripts/check_skill_folder.py <skill-folder>` for a deterministic
  folder/frontmatter sanity check. Treat it as a local shape check, never as
  portfolio, behavior, or provenance proof.

## Invariants

1. Encode active state physically: `skills/<name>/SKILL.md` is installable;
   `incubator/<name>/PROPOSAL.md` is active, owner-backed, expiring research;
   `retired/skills.json` is the only retirement ledger. Do not keep retired
   folders or warehouse generated possibilities in the incubator.
2. Treat access and licensing as independent. Private visibility controls who
   can fetch current bytes; it does not revoke historical grants, recall
   copies, prove exclusivity, or replace source/license provenance.
3. Protect owner-informed mechanisms and their dependency closure. File age,
   word count, model confidence, and generic quality scores cannot authorize
   retirement. Require an owner decision reference and absorption evidence.
4. Keep publication, routing evidence, behavior evidence, source freshness,
   risk, sponsorship, and adoption as separate facts. Authored evals and local
   installs are development evidence, not proof of behavior or demand.
5. Make every deletion a base-to-candidate fact. A removed active entry must
   have a valid tombstone; a merge must point to an existing owner and prove
   where every unique mechanism moved.
6. Use agents to inventory, compare, draft, validate, reconcile, and deliver.
   Agent-first removes human production cost as a pruning criterion; it does
   not remove semantic boundaries, independent validation, authority, or
   evidence requirements.

## Workflow

### 1. Establish the boundary

Record repository owner, objective, private/public visibility, supported
distribution paths, baseline commit, delivery target, legal/license decision
home, and forbidden content. Verify live access behavior instead of trusting a
README label.

### 2. Inventory exact current state and history

Derive installable, incubating, and retired names from canonical files. Join
admission, evidence, source policy, dependency, and owner facts without turning
the generated view into a new authoring source. Compare the candidate tree with
the merge base so deletions and renames cannot disappear silently.

### 3. Decide each entry atomically

Test independent job, independently acceptable artifact, non-obvious knowledge
delta, routing boundary, owner/authority, and present maintenance reason. Choose
`keep`, `merge`, `retire-without-replacement`, or time-boxed `investigate`.
Similar topics or headings do not prove duplicate ownership.

### 4. Protect owner-informed knowledge

Identify protected skills, canonical mechanisms, typed dependencies, public
commit provenance, and retirement authority. Preserve the graph as separate
artifacts when triggers, outputs, or proof differ. Before merging, map every
unique rule, state machine, table, failure mode, and acceptance test to the
canonical replacement.

### 5. Define lifecycle and distribution

Require admission facts for every installable route. Give incubator proposals
an owner, expiry, falsifiable promotion plan, and no `SKILL.md`. Distribute only
through an authenticated clone, digest/commit-pinned private source, or local
checkout; verify list/install readback in an isolated environment. Do not emit
anonymous install commands or public-directory metadata for a private repo.

### 6. Bind claims to exact evidence

Bind routing proof to the complete candidate catalog and description digests;
bind behavior proof to the full skill/reference bundle, hidden task, runner,
models, raw outputs, receipts, thresholds, and attestation. Invalidate proof on
relevant byte changes. Keep `candidate`, `benchmark-proven`, and `SOTA`
language within the declared evidence policy.

### 7. Automate governance and delivery

Run `inventory -> propose -> independent_validate -> branch -> deterministic_gates
-> merge_queue -> default_branch_readback -> isolated_install -> reconcile`.
Separate proposer, validator, promoter, and watchdog authority. Generate
registries/catalogs from canonical state, fail on drift, and preserve exact
failure evidence.

## Guardrails

Reject a governance packet that:

- deletes an active or incubating entry without a tombstone and decision;
- merges routes without an identical job/artifact or without absorption proof;
- retires protected owner-informed knowledge from age, size, cost, or model score;
- treats private visibility as license revocation, secrecy proof, or permission
  to omit copyright, notices, or source provenance;
- advertises anonymous remote installation, public directory publication, or a
  floating source for a private portfolio;
- stores secrets, credentials, customer data, copied private doctrine, or live
  authority merely because repository access is restricted;
- calls authored fixtures, self-install, green CI, or historical results
  current routing, behavior, adoption, or SOTA proof;
- lets one agent author, validate, promote, and attest its own portfolio change;
- hand-edits a generated registry/catalog or leaves desired and observed
  install state unreconciled.

## Output contract

Produce one **Private Skill Portfolio Governance Packet** containing:

1. objective, owner, visibility, baseline, delivery target, and boundary map;
2. exact installable/incubator/retired inventory and evidence-state summary;
3. per-entry keep/merge/retire/investigate decision with job, artifact,
   knowledge delta, owner, dependency, risk, and evidence;
4. owner-informed protection and dependency-closure manifest;
5. admission, incubation, promotion, and expiry contract;
6. deletion diff plus tombstone/absorption ledger;
7. authenticated/local distribution and isolated install/readback plan;
8. access, historical licensing, third-party provenance, and notice map;
9. exact-current routing/behavior evidence and invalidation policy;
10. autonomous desired-state, role separation, CI, reconciliation, recovery,
    unresolved blockers, and next machine actions.
