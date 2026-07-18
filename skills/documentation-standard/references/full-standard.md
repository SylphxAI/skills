# documentation-standard (canonical body)

**Authority:** binding Standard Skill package `documentation-standard` in `SylphxAI/skills` (`skills/documentation-standard/`).

**Cutover:** migrated from Doctrine `standards/documentation-standard.md` at digest `sha256:45ff48d2ec4e0dc777ae985324204d80ef379edb0d236e58cf65baf7662b9606` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Documentation Standard

How we write documentation, specification, and decisions so they never drift.
This is the altitude map; it routes to the existing rules rather than
restating them (`P-SIMPLICITY`). The other standards own the detail:
specification content and the executable-over-prose rule live in
[`agent-native-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-native-standard/references/full-standard.md) (*Documentation And
Specification First*); the schema-is-SSOT and comment rules live in
[`engineering-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/engineering-standard/references/full-standard.md) (*Sources Of Truth*,
*Comments And Code Documentation*); work packets, spec lifecycle records, eval
manifests, telemetry contracts, and exception records live in
[`specification-control-plane-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/specification-control-plane-standard/references/full-standard.md);
decision numbering lives in [`../ADR.md`](https://github.com/SylphxAI/doctrine/blob/main/ADR.md).

## One semantic authority per fact

Every fact has one canonical authoring authority. Other surfaces link to it or
derive from it. A generated reference, cache, replica, projection, or read model
is valid when it records lineage and freshness and cannot become an independent
authoring source. Pick the authority by what kind of fact it is:

| Kind of fact | Canonical home | Form |
|---|---|---|
| **What the system accepts / returns / guarantees** (the contract) | code | Effect Schema, manifest/policy schema, typed tool contracts, executable tests |
| **Why a decision was made** | `docs/adr/` | ADR (immutable event log; [ADR.md](https://github.com/SylphxAI/doctrine/blob/main/ADR.md)) |
| **Which current enterprise mechanism is binding** | `profiles/*.profile.json` | selector, defaults, evidence, review triggers, exception/exit contract |
| **Why a commercial direction was chosen** (pricing, packaging, roadmap, market positioning, paid entitlement) | `docs/adr/` | Commercial ADR with evidence, objective function, constraints, metrics, kill criteria |
| **What this repository is for right now** | `.doctrine/project.json` | project goal, lifecycle, boundary, public surfaces, delivery proof |
| **What a service is right now** (current state) | the project's service catalog | one entry per service, citing `file:line` into the code above |
| **What a non-trivial implementation slice is trying to do before canonical homes exist** | prose spec or spec lifecycle record | temporary execution contract with status, owner, links, validation plan, and expiry |
| **Who owns parallel agent work and what they may touch** | GitHub issue/PR metadata or work packet | role, scope, write boundaries, gates, claim/lease, collision risks |
| **What AI/model/agent behavior must satisfy** | eval manifest and eval suite | dataset/scenario version, oracle/rubric, thresholds, replay, failure examples |
| **What production behavior proves success** | telemetry contract or deploy analysis contract | smoke/health/trace/log/metric/SLO/canary verdict |
| **Why a temporary bypass is tolerated** | exception policy record | owner, scope, reason, replacement control, expiry |
| **How to find the right standard** | [`standards/INDEX.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/INDEX.md) | routing table only — links, no rules |
| **How to use / understand it** | Diátaxis prose | tutorial / how-to / reference / explanation — derived, holds no state |
| **How the code works at a line** | the code | comments, only for non-obvious intent (engineering-standard) |

Two independently authored versions of one fact will diverge — that is not a
discipline failure to be scolded, it is a missing derivation, lineage, or
reconciliation mechanism (see *Freshness is a gate*).

## Specification is code-first

The specification of **what** the system does lives in code wherever code can
express it — schemas, types, executable tests (engineering-standard *Sources
Of Truth*; agent-native *Prefer executable and machine-readable documentation
over prose-only documents*). A standalone prose document that restates the
shipped contract is not a specification; it is independently authored state
with a decay clock (`P-AUTHORITY`, `P-SIMPLICITY`).

A **prose spec is still required** before non-trivial work — but understand
its lifecycle:

- It is a **pre-implementation execution contract** (goal, non-goals, domain
  invariants, contracts, failure modes, acceptance criteria — the
  agent-native list). Its job is to brief implementation and subagents before
  the code exists.
- Once the slice ships, its durable parts **migrate to their canonical homes**:
  the contract becomes the schema/tests, the decision becomes the ADR, the
  current-state summary becomes the catalog entry. The prose spec is then
  superseded — fold it into the ADR's design section or delete it. **Do not
  leave it standing as a third source of truth.**

Specs must be mechanically ageable. A repo with `docs/specs/` should require
frontmatter or an equivalent registry with:

- status: `draft`, `active`, `shipped`, `superseded`, or `archived`;
- owner or owning product;
- linked PR, ADR, tests/evals, catalog entry, and canonical contract source;
- expiry or review date for `draft` and `active` specs.

CI should fail forgotten `draft`/`active` specs past expiry, shipped specs that
still restate current-state contract facts, and specs with no link to their
canonical homes. If this cannot be enforced yet, the repo needs an explicit
adoption plan rather than trusting agents to remember cleanup.

Prose is the *right* home only for what code cannot express, what a work
packet/eval/telemetry/exception schema does not already own, and what the ADR
does not already own:

- wire protocols / formats you consume but do not define;
- cross-system invariants and acceptance/eval criteria;
- threat models, runbooks, and operational procedures — a runbook must cite
  the commands, dashboards, logs, or health checks that prove success;
- forward-looking design too large for one decision — and that **is an ADR**
  (draft), not a separate "spec" track.

Spec-driven tools are adapters, not policy. If a tool produces `design.md`,
`plan.md`, `tasks.md`, or change folders, those files may help local execution
only when they link to the ADR/schema/test/eval/catalog homes above. They must
not hold architectural decisions, current API contracts, delivery verdicts, or
long-lived state that belongs elsewhere.

Commercial direction follows the same altitude rule. Pricing, packaging,
roadmap, and market-positioning rationale live in ADRs; live prices live in the
billing SSOT; entitlements live in code/schema/tests; metrics live in the
declared analytics source. See
[`commercial-decision-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/commercial-decision-standard/references/full-standard.md).

## Cross-cutting docs aggregate; they never become an authoring authority

Reference and explanation docs (and any dashboard, index, or registry)
**read from** the catalog and code and link onward. They restate nothing. The
catalog wins every disagreement with an ADR's stale implementation claim — an
ADR records how we got somewhere and may age; it never overrides current
state. Registries and indexes are **generated after merge**, never hand-edited
in a PR ([ADR.md](https://github.com/SylphxAI/doctrine/blob/main/ADR.md)).

## Generate, don't hand-maintain

API references, SDK docs, client types, OpenAPI, fixtures, and registries are
**generated from the SSOT** (agent-native; engineering *Sources Of Truth*).
Hand-maintaining a duplicate of something derivable is forbidden. If a doc must
contain a machine-checkable fact (an endpoint path, a CLI flag, a tier name, an
enum), it is either generated from the source or it is a liability.

Agent-facing standards procedures follow the same rule. Doctrine's portable
Agent Skills are generated from `skills/registry.json` plus the owning
`PRINCIPLES.md`, `ADR.md`, `standards/*.md`, and
`profiles/*.profile.json` sources. Hand-edited skill copies are documentation
drift.

## Freshness is a gate, not a discipline

Anything that restates a machine-checkable fact must be **CI-guarded or
generated** — never trusted to reviewer attention, because there are no human
reviewers (delivery model). A doc that an agent reads as current operating
truth is held to the same bar as code: a guard that diffs the doc's claims
against the real schema/CLI/route surface, or generation that makes drift
impossible. When a doc convention keeps breaking, fix the mechanism, not the
people (the ADR-numbering precedent in [ADR.md](https://github.com/SylphxAI/doctrine/blob/main/ADR.md)).

Every governed non-ADR document under `docs/`, plus profile routing surfaces,
declares a typed `documentClass` in frontmatter. A
`generated-state` document also points to a schema-valid `generatedManifest`
that binds repository-contained sources, source digests, output digest,
executable generator digest, and deterministic `--check` invocation. CI runs
that invocation; marker prose or path existence alone is not freshness. Paths
or titles carrying governed state semantics such as status, registry,
scorecard, inventory, readiness, adoption, cutover, rollout, or current-state
must use `generated-state`; relabelling them as a specification or explanation
is drift. Generator `--check` is side-effect-free: the audit snapshots and
re-hashes the repository afterward and rejects any mutation. Stable routing
pages may link to resolution mechanisms but never hand-list active digests.

Generated catalogs or runtime install bundles are current only when their
declared package/catalog freshness check passes. Canonical Skill bodies are
authored directly and are never validated by comparing them with a second prose
source.

Human-facing documentation follows the human-first communication contract in
[`autonomous-execution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/autonomous-execution-standard/references/full-standard.md): lead
with the useful result, use progressive disclosure, and remove padding without
dropping material facts or proof. This standard still owns durable-document
altitude and freshness; it does not create a second prose-style authority.

## Enforcement — this standard is mechanized, not trusted

A standard nobody enforces is prose, and prose drifts. This standard's own
thesis applies to itself: it must be a gate. Two layers carry it:

- **Per-repo CI gates** own the repo-specific surface: ADR-convention validation
  (no `ADR-DRAFT-*`, stable slug uniqueness, active-profile locator and remote
  introducing-PR provenance, one new ADR per PR, registry generated not
  hand-edited — [ADR.md](https://github.com/SylphxAI/doctrine/blob/main/ADR.md)),
  catalog generation, spec lifecycle/exception expiry checks, and doc-claim
  freshness guards that diff endpoints / CLI flags / enums against the live
  schema. The reference implementation already exists in `platform` —
  `scripts/check-adr-doctrine.ts`,
  `scripts/generate-adr-registry.ts --validate-only`,
  `scripts/aggregate-catalog-status.ts`, and the `check:doc-*` guards. New repos
  consume these as generated or reusable mechanisms; they do not hand-copy
  them (`P-CANONICAL`).
- **`doctor` (the org standards tool) owns the cross-repo floor.** Every rule in
  this standard that is repo-agnostic must be a `doctor` check so it runs in
  every repo's CI, not just where one author remembered it: the doctrine-pointer
  line in `CLAUDE.md` / `AGENTS.md`, the presence and shape of `docs/adr/` under
  the ADR convention, the registry-is-generated rule, `.doctrine/project.json`
  plus `PROJECT.md`, and a current-state catalog where the repo ships a service.
  Until `doctor` or the central project-control audit enforces these, the
  doctrine is a map with no one checking the route — and the portfolio diverges
  at exactly the rate the audit permits.

## Minimal Sufficient Documentation

Write the smallest durable document that changes implementation or maintenance
behavior. Good docs state decisions, constraints, contracts, acceptance
criteria, tradeoffs, usage, and validation when those facts are not already
owned by code, schema, tests, ADRs, telemetry contracts, work packets, or
generated references.

Avoid fluff, boilerplate, motivational restatement, duplicate examples, and
long prose summaries of code. If a reader only needs the source file, link to
the source file. If a generated artifact can say it, generate it. If the fact is
temporary coordination, give it an owner, status, expiry, and canonical home it
will move to after shipping.

## Don't over-document

Documentation is the minimum that cannot be generated, plus the decisions and
the current-state map. Specifically avoid:

- **Restating code in prose** — the single largest source of drift.
- **Permanent prose specs** that outlive the slice they briefed (fold or
  delete).
- **Write-once docs kept as live docs** — audit snapshots, frozen plans, and
  superseded designs belong in an archive, not the searchable doc surface.
- **Directory ceremony** — one semantic authoring authority per fact beats one
  folder per artifact; derived surfaces must preserve lineage and freshness.

The ADR log is exempt: it is designed to grow forever and is never pruned.

## When to split a standard

Split a standard only when a **named defect** exists:

- **Wrong altitude** — an always-on constitution or principles restating
  how-detail;
- **Wrong owner** — a domain already has (or needs) its own canonical home;
- **Independent on-demand trigger** — agents routinely need one slice without
  the rest, and INDEX/skill routing cannot express that cleanly;
- **Restatement risk** — two files are drifting toward the same facts.

Do **not** split for line count, aesthetic balance, or “the next PR needs a
target.” After the thin-adapter / bounded-domain alignment in
[`ADR-170`](https://github.com/SylphxAI/doctrine/blob/main/docs/adr/ADR-170-thin-adapter-structural-alignment.md), further
decomposition is optional polish unless one of the defects above is evidenced.
A large but coherent domain standard (for example product engineering bar) is
often the correct shape — 化繁為簡 prefers fewer stronger homes over many thin
files that restate each other through INDEX rows.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `documentatio-01` | Strongest relevant subset applied |
| `documentatio-02` | Facts in schema/test/ADR homes |
| `documentatio-03` | Proof layers separated |
| `documentatio-04` | Unknown authority fails closed |
| `documentatio-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
