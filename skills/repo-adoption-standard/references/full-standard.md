# repo-adoption-standard (canonical body)

**Authority:** binding Standard Skill package `repo-adoption-standard` in `SylphxAI/skills` (`skills/repo-adoption-standard/`).

**Cutover:** migrated from Doctrine `standards/repo-adoption-standard.md` at digest `sha256:303e531daeb327f3d547a8e23318ff992d3d1cd5df4f88764f6672dcc61843bd` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Repo Adoption Standard

Minimum surfaces a repository must expose to consume Sylphx Doctrine as a paying
customer would — not a product-specific runtime checklist.

Composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for parallel coordination and work packets.
- [`source-authoring-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/source-authoring-standard/references/full-standard.md) for source
  candidates, workspace admission, checkpoints, and reconciliation.
- [`ci-admission-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/ci-admission-standard/references/full-standard.md) for admission tiers and
  required-check wiring.
- [`ci-runner-capacity-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/ci-runner-capacity-standard/references/full-standard.md) for runner
  profiles and queue diagnosis.
- [`project-manifest-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/project-manifest-standard/references/full-standard.md) for
  `PROJECT.md` and `.doctrine/project.json`.
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for production verification.

## Required surfaces

A doctrine-consuming repo should have:

- a repo-local `AGENTS.md`, `CLAUDE.md`, or runtime-equivalent always-on
  constitution derived from the canonical template, not a pointer-only file or
  standards fork (must be **lane-aware**: ordinary direct-trunk vs fenced
  ADR/policy compatibility when live fleet policy selects roleless direct-trunk);
- `PROJECT.md` plus `.doctrine/project.json` per project-manifest standard;
- default-branch integrity (deletion + non-fast-forward) under direct-trunk, or
  protected `main` with required CI, auto-merge, and merge queue when the
  compatibility lane / CI still exists for that repository class;
- a machine-checkable gate-class declaration and exception mechanism;
- an active-profile candidate admission mechanism: stable fan-in contexts such
  as `trunk-admission/pass` for compatibility PR/merge-group candidates, or the
  selected roleless exact-candidate/CAS proof contract;
- preview-required/preview-skipped classification wired into the admission
  manifest and status producer, with docs/control-plane-only candidates
  resolving preview contexts without allocating runtime capacity;
- Sylphx CI compute runner profiles for CI jobs, or a machine-readable,
  owner/expiry-bound exception where Sylphx does not yet support the required
  runner class;
- risk-control enforcement for expand/contract migrations, feature flags,
  idempotent side effects, kill switches, and progressive/canary rollout where
  the lane requires them;
- exhaustive affected postsubmit proof plus scheduled/full selector-audit proof;
- automated recovery classification covering runtime rollback, selective source
  revert, and forward-only recovery;
- `doctor` or equivalent conformance status for repo-agnostic doctrine rules;
- ADR convention checks or a plan to adopt them;
- contract checks for APIs, tools, env/config, DB migrations, and generated
  clients where applicable;
- doc/catalog freshness checks for any current-state documentation;
- a validation ladder in the repo-local agent file;
- a clear release/deploy verification path.

## Validation

Run `scripts/project-control-plane-audit.py --local <repo> --fail-on-drift` for
manifest and instruction surfaces. Run admission and merge-queue conformance audits
when org `gh` access is available — those are fleet/platform scope, not doctrine
self-gates.
