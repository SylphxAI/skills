# agent-first-development-standard (canonical body)

**Authority:** binding Standard Skill package `agent-first-development-standard` in `SylphxAI/skills` (`skills/agent-first-development-standard/`).

**Cutover:** migrated from Doctrine `standards/agent-first-development-standard.md` at digest `sha256:89f35a81446153406a2d01a33fd95e0b336f688835402966fa64f47fa92caef3` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Agent-First Development Standard

## Purpose

Use this standard when a repo or product is built by many autonomous agents,
subagents, and tools working in parallel. Humans own direction, taste, funding,
and exceptional approvals; they are not part of the normal review, merge,
release, or coordination loop. Treat the ecosystem like a very large open-source
project with thousands of contributors and no manager in the middle: order comes
from contracts, ownership, profile-selected machine admission/serialization,
and durable written context.

This standard composes with:

- [`documentation-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/documentation-standard.md) for the doc/spec/ADR
  altitude map and freshness gates.
- [`specification-control-plane-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/specification-control-plane-standard.md)
  for work packets, spec lifecycle records, eval manifests, telemetry contracts,
  exception records, and SDD-tool adapter boundaries.
- [`agent-native-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/agent-native-standard.md) for executable specs,
  schemas, tools, delegation, and durable context.
- [`autonomous-execution-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/autonomous-execution-standard.md) for
  execution graphs, subagents, latency hiding, and cross-project boundaries.
- [`source-authoring-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/source-authoring-standard.md) for Work Item,
  attempt, exact candidate, semantic atomicity, commit/worktree projections, and
  workspace reconciliation.
- [`delivery-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/delivery-standard.md) for PR, merge, release, and
  production verification ownership.
- [`ci-admission-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/ci-admission-standard.md) for no-human CI
  admission tiers, preview policy, affected selection, and merge-queue integrity.
- [`repo-adoption-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/repo-adoption-standard.md) for minimum repo
  adoption surfaces and conformance entrypoints.
- [`ci-runner-capacity-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/ci-runner-capacity-standard.md) for CI
  compute ownership, runner profiles, and queue capacity diagnosis.
- [`roleless-speculative-development-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/roleless-speculative-development-standard.md)
  for the candidate successor architecture when universal-agent arrival exceeds
  PR, merge-queue, CI, preview, or deployment admission capacity.
- [`frontier-verification-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/frontier-verification-standard.md)
  for property/model tests, deterministic simulation, spec/eval gates, and
  canary analysis selection rules.
- [`doctrine-profile-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/doctrine-profile-standard.md) for the
  binding no-human and delivery-adapter selections.
- [`../ADR.md`](https://github.com/SylphxAI/doctrine/blob/main/ADR.md) for race-free ADR numbering and artifact identity.

## Ultimate Target: Mission Control With Profile-Selected Delivery

Resolve the active digest-bound delivery profile before applying adapter
mechanics. The compatibility adapter uses pull requests and configured
serialization; the roleless speculative adapter uses immutable bounded
attempts, deterministic selection, Git compare-and-swap landing, scoped green
watermarks, roleless recovery, and verified-only promotion. Do not infer the
active choice from aspirational prose or mix adapters as undocumented policy.

The SOTA target is a self-feeding autonomous engineering system:

```text
Production / CI / security / customer / delivery-adapter signals
  -> Mission Control Work Ledger as the internal work-state source
  -> typed work items classify scope, role, tenant, risk, proof, and next action
  -> agents claim scoped work through leases and checkpoint events
  -> source candidates execute the change through the active delivery profile
  -> profile-selected exact-candidate admission and adversarial review
  -> configured landing serializer integrates the selected candidate
  -> deploy / release verification observes reality
  -> new signals create or update work items
```

This target is intentionally larger than the first implementation slice. Keep it
visible so MVP delivery does not erase the north star, but implement it through
small, semantically atomic, verified source candidates.

Control-plane responsibilities:

- **Mission Control coordinates internal work-state**: Work Items, claims,
  checkpoints, blockers, proof-chain links, stale-session recovery, cost/ETA,
  and cross-runtime handoff live in the Work Ledger defined by
  [`mission-control-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/mission-control-standard.md). Hidden chat
  state is not ownership.
- **The active delivery profile delivers and proves repository work**: it owns
  the current forge, candidate, required-check, serialization, release, and
  public-status mechanisms. This standard owns the required outcomes.
- **Git/GitOps is the durable truth**: code, docs, specs, ADRs, policies,
  workflows, and desired infrastructure state live in Git. Manual runtime state
  is emergency-only and must become repo state afterward.
- **Forge issues are an adapter, not the only queue**: public user reports and
  repo-local issue workflows remain valid; internal agent progress, private
  handoff, model/runtime identity, and cost telemetry belong in the ledger.
- **Work packets are the coordination contract**: for risky or parallel work,
  issue/PR metadata or JSON work packets declare goal, scope, write boundaries,
  links, gates, validation, delivery proof, and collision risks.
- **ADRs/specs decide and constrain**: ADRs record why; executable specs,
  schemas, tests, catalogs, eval manifests, telemetry contracts, exception
  records, and generated artifacts define what must be true.
- **Source candidates execute**: every meaningful repo change is nominated as
  an exact semantically atomic candidate and integrated through the active
  delivery path. A pull request is one compatibility-lane envelope.
- **Admission evidence gates**: candidate metadata, risk classification, tests, contract
  checks, AI review, security/migration gates, and production proofs are checks
  or machine-actionable artifacts, not advisory comments.
- **The active serializer integrates**: compatibility queues must prove their
  merge-group candidate; roleless landing must use its selected-candidate CAS
  and scoped-proof contract.
- **Production feeds the loop**: CI failures, queue failures, deploy signals,
  logs, metrics, traces, regressions, and security findings become issues, PRs,
  ADRs, specs, or failing gates.

### Role Topology

Start with role-based agents that span repositories; do not assign agents by
project. Repos, labels, work packets, and PR metadata define scope.

Phase 1 roles:

1. Signal / Triage
2. ADR / Spec Research
3. ADR / Spec Implementation
4. Engineering Quality / Performance Polish
5. Product Surface / UX / Copy Polish
6. PR Review / Merge Gate

Phase 2 roles:

7. Production / CI / Release Intelligence
8. Security / Dependency / Supply Chain

Future specializations may split out migration/data safety, observability, repo
adoption, prompt/agent-definition maintenance, cost/performance intelligence, or
doc/spec freshness, but only after the base loop is stable.

### Structured Agent Audit

The current delivery profile maps the generic candidate, issue, status, and
serialized-integration concepts below onto its forge. Forge-specific names in
this section are adapter vocabulary, not constitutional requirements.

If multiple agents share one GitHub machine account, the GitHub username is not
sufficient audit. Every meaningful action must carry structured responsibility:

- Work Item id and claim/checkpoint events in Mission Control once the tool is
  available;
- branch prefix and PR title role;
- PR body metadata: `Agent-Author` (see below), role, linked Work Item or issue,
  linked ADR/spec, risk, affected area, verification, rollback/deploy notes;
- labels for `role:*`, `state:*`, `type:*`, `area:*`, `risk:*`, `priority:*`,
  drawn from the shared taxonomy in
  [`mission-control-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/mission-control-standard.md) rather than a
  per-repo dialect;
- `AGENT-CLAIM` and `AGENT-CHECKPOINT` comments only when the GitHub issue
  thread is the chosen public or repo-local coordination surface;
- `AGENT-WORK-COMPLETE` comments when handing off or finishing a work item;
- `AI-REVIEW` comments in the shape below;
- commit trailers when useful: `Agent-Role`, `Work-Item`, `ADR`, `Spec`, `Risk`,
  `Verification`;
- status checks derived from the structured metadata.

Comments are not gates unless a check parses them. A structured review that no
required status consumes is only a note.

#### `Agent-Author` (PR body)

Policy-surface PRs (and any PR whose admission check requires an adversarial
second-pass audit) MUST declare in the PR body:

```text
Agent-Author: <role-id>
```

`<role-id>` is a single token (`\S+`). Prefer **role-shaped, vendor-neutral**
ids such as `implementer`, `builder`, `coordinator`, or
`implementer-<short-session>` — not product, model, or company names. Public
repos expose PR bodies; neutral ids keep the audit trail without advertising
tooling. The gate accepts any token; neutrality is the writing rule.

#### `AI-REVIEW` (PR comment)

Adversarial second-pass review artifacts MUST be an unedited PR comment containing:

```text
AI-REVIEW
head_sha: <exact 40-character current head sha>
change_digest: <sha256 of canonical {base_sha,head_sha}>
verdict: PASS
agent_author: <exact Agent-Author token from PR body>
pr_author_id: <stable authenticated GitHub user id>
reviewer_id: <role-id different from Agent-Author>
reviewer_login_id: <stable authenticated comment-author GitHub user id>
findings:
- <file:line> — <non-empty evidence>, or exactly `- none`
artifact_digest: <sha256 of canonical head/change/verdict/reviewer/findings payload>
```

`reviewer_id` MUST differ from `Agent-Author`, but this declared difference is
not proof of independence. A distinct authenticated comment author proves
reviewer attribution within the comment layer; it does not make a candidate-
controlled workflow an independent admission authority. A shared login is
labelled declared separation only. `scripts/policy-review-gate.py` is the
canonical digest implementation.
Policy-repository scope, credential modes, and required-status wiring live in
[`doctrine-evolution-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/doctrine-evolution-standard.md) §Policy
Repository Admission; this section owns the field contract that
`scripts/policy-review-gate.py` parses.

Presence follows the active coordination surface — see
[`mission-control-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/mission-control-standard.md) for ledger vs
issue claim freshness. Do not create a third presence store.

### Minimal Complete Loop

The first implementation should prove the smallest complete closed loop:

```text
work item -> claim/durable checkpoint -> exact source candidate
  -> profile-selected proof and adversarial review
  -> configured serializer lands -> deploy/release signal -> next work item
```

Do not start by implementing every dashboard, role prompt, and repo template.
First make one pilot loop work end-to-end, then expand the gates, roles, and
repos.

### Stacked Diffs For Dependent Slices

ADR-58 owns the full stacked-diff contract: manifest schema, slice contract,
per-slice ADR-29 admission, root-first merge-queue semantics, restack
controller, depth/shape limits, and dependency-aware recovery — cited, not
restated.

Compatibility-adapter rule: when a change naturally decomposes into ordered
slices (data layer → API → UI; migration expand → writer compatibility →
reader rollout), open a stack of small PRs instead of one large PR or a
serial wait chain. Stacking is an authoring model, not a branch-protection
bypass — every slice still needs its own admission manifest and trunk
admission for the exact queue candidate. Do not use stacks to batch
unrelated cleanup or hide a large non-revertable feature across many PRs;
independent work belongs in separate PRs or stacks, where ADR-54 queue
sharding runs validation in parallel. Other active profiles use the generic
candidate DAG and valid-prefix rules in the source-authoring standard.

### Roadmap Items To Preserve

The full target includes these unimplemented capabilities:

- organization `.github`/governance repo with labels, issue forms, PR templates,
  reusable workflows, ruleset examples, validators, and structured-comment
  parsers;
- required checks such as `pr-metadata/pass`, `risk-classification/pass`,
  `trunk-admission/pass`, `ai-review/pass`, `adr-spec-check/pass`,
  `security-review/pass`, `migration-review/pass`, `postsubmit-proof/pass`,
  `recovery-decision/pass`, and deploy/rollback proof contexts;
- stacked-diff controller or approved native stack provider with stack manifests,
  restack automation, queue-prefix policy, and dependency-aware recovery;
- per-repo `PROJECT_BOUNDARY.md`, `AGENT_GUIDE.md`, local ADR/spec pointers,
  merge queue, `merge_group` workflow support, and branch rulesets;
- repo-local `PROJECT.md` and `.doctrine/project.json` manifests carrying
  project goal, lifecycle, zero-knowledge boundaries, public surfaces, delivery
  proof, and adoption gaps;
- signal ingestion from CI failures, merge queue failures, deployments, logs,
  metrics, traces, regressions, security findings, and customer-facing incidents
  into GitHub issues;
- serializer health, stale claims, candidate risk distribution, CI flake,
  production regression, security posture, and doctrine adoption dashboards;
- role prompts or agent definitions derived from doctrine instead of copied into
  independent prompt forks.

## No-Human Operating Assumption

No-human does not mean low-quality, unreviewed, or unaudited. It means every
normal human coordination or review function must have a mechanical replacement.

| Human function in a conventional team | No-human mechanism |
| --- | --- |
| Work assignment | Canonical Work Ledger or repo-declared tracker, typed claims/leases, and linked adapter observations |
| Design alignment | Boundary contracts, ADRs, generated clients, compatibility tests |
| Code review | Required CI, lint/type/test gates, contract checks, digest-bound adversarial agent review; authenticated attribution additionally requires a distinct authenticated identity, while independent authority requires a separately controlled integration |
| Architecture review | Architecture fitness functions, forbidden-dependency checks, catalog freshness |
| Security review | Policy-as-code, secret scanning, dependency alerts, SAST, supply-chain gates |
| Release judgment | Active-profile admission/serialization, GitOps reconciliation, smoke checks, SLO/error-budget gates |
| Operational diagnosis | OpenTelemetry traces/metrics/logs, structured errors, runbooks, replayable jobs |
| Compliance/audit | SBOM, provenance, signed artifacts, immutable logs, conformance audits |

Advisory-only comments, dashboards, and reports are not governance. If a finding
matters, encode it as a failing check, generated diff, policy decision, alert,
or issue that an agent is expected to act on.

Two additional invariants of the no-human operating model:

- **Zero standing privileges for agents.** Production credentials held by
  agents are short-lived, scoped to a declared task/plan, issued at action time
  by a policy decision point, and discarded after use. A long-lived broad
  credential in an agent's hands is a prompt-injection incident waiting to
  happen. Agent identity is workload identity (same trust domain and issuance
  mechanics as services), not a special account class.
- **Privileged actions are transparency-logged.** Admission overrides,
  break-glass access, and direct data/cluster mutations must be pre-authorized
  by policy and recorded in an append-only, tamper-evident transparency log
  with actor identity and justification reference. Break-glass requires an
  separately controlled second approver (another agent in a different credential
  and control domain),
  is time-boxed, and auto-files a post-hoc review task. "We have no backdoor"
  must be auditable and falsifiable, not asserted.

## Boundary Contract First

For parallel agent development, contracts are the coordination layer. Write the
boundary contract before parallel implementation whenever a change touches a
public, shared, persistent, generated, cross-repo, cross-runtime, or operational
boundary:

- public APIs, SDKs, CLIs, MCP/tools, package exports, or generated clients;
- database schema, migrations, queues, events, manifests, policies, or config;
- auth, permissions, billing, metering, privacy, security, or customer policy;
- platform/customer boundaries, cross-repo integration, or shared packages;
- AI tool schemas, prompt/skill interfaces, eval outputs, or durable memory
  records;
- deploy, release, infrastructure, or operational behavior.

The contract's canonical home should be executable or generatable where
possible: Effect Schema, typed tool contracts, database schema/migrations,
OpenAPI generated from schemas, manifest schemas, event schemas, contract tests,
eval fixtures, or CI guards. Prose may brief the implementation, but the shipped
contract must not live only in prose.

Inside a private boundary, code-first is acceptable for small helpers, pure
functions, local UI components, or internal refactors that do not affect a
consumer. Even then, tests, names, comments, and invariants must make the
behavior clear enough for the next agent.

## Agent Development Doc Tree

[`documentation-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/documentation-standard.md)'s "One fact, one
home" table owns the altitude map — which artifact is the canonical home
for which kind of fact — cited, not restated. A repo's `docs/adr/`,
`docs/specs/`, `docs/runbooks/`, and `.github/workflows/` layout should
mirror it; runtime-native agent files (`AGENTS.md`, `CLAUDE.md`) point to
this doctrine plus repo-local facts, never a competing policy fork.

## Ownership Catalog

For multi-repo or product-portfolio work, every repo should expose a generated
or CI-validated ownership catalog. The catalog is the machine-checkable answer
to "which project owns this gap?"

The repo-local project manifest (`.doctrine/project.json`) is the minimum input
to that catalog. It states the repository's local identity, lifecycle, owned
contexts, unowned contexts, public surfaces, forbidden coupling, delivery proof,
and adoption gaps. See
[`project-manifest-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/project-manifest-standard.md). Do not use
ADRs as the current-state project identity; ADRs explain decisions, while the
manifest states the current boundary contract.

Minimum fields:

- capability or bounded context name;
- owning repo/product/team;
- public API, SDK, CLI, package export, tool, event, or manifest surface;
- dependency direction and forbidden import/internal access rules;
- generated clients or consumers where known;
- required external status contexts and owning status producer;
- deploy/release path and production owner;
- customer-specific behavior location, if any, as configuration rather than
  platform hardcoding.

CI should verify imports and generated clients against the catalog where
practical. If a repo cannot generate the catalog yet, the repo-local agent file
must identify the temporary source of truth and the adoption plan.

## Runtime Instruction Projections

Different agent runtimes may need different native prompt files, commands,
skills, tools, permissions, memory, and delegation models. Those are transport
mappings, not policy forks. Agent-first products may consume this doctrine
for their own repo and internal agents, but that does not make the product
itself a runtime instruction projection or weaken its provider/customer boundary.

Each runtime instruction projection must:

- link back to this doctrine as the upstream source of truth;
- load the compact constitution through a real always-on surface before skill
  activation, then load only the principles, ADRs, profiles, and standards
  triggered by the task alongside repo-local facts and runtime-native commands;
- map doctrine rules into the runtime's supported mechanisms;
- keep runtime-specific command syntax, skills, and tool wiring local to that
  runtime;
- preserve shared vocabulary for boundaries, contracts, work packets, ADRs,
  validation, delivery, and collision handling.

Runtime projections must not rename doctrine concepts, copy standards into a private fork,
or weaken autonomy, boundary, active-profile admission/serialization, CI, or
validation rules because the runtime has a different prompt format. They must also respect higher-priority
host, system, platform, and tool instructions; doctrine is an upstream policy
source, not a mechanism for overriding the runtime's authority model.

## Specification As Code

[`documentation-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/documentation-standard.md)'s "Specification
is code-first" section owns this: prose specs are pre-implementation
contracts only, migrating to schema/tests/ADR/catalog once shipped — cited,
not restated.

## Industrial Mechanisms

Prefer mature industry mechanisms when they can become an SSOT, generated
artifact, CI gate, or telemetry signal. Do not cargo-cult a standard just
because it is famous.

Adopt by gate class:

| Gate class | Required when | Canonical home | Gate | Avoid |
| --- | --- | --- | --- | --- |
| Baseline repo | Any active repo | `AGENTS.md`/`CLAUDE.md` constitution, ADR convention, branch/ruleset policy, Renovate config | doctor/conformance status, required CI, actions pinned by full SHA, least `GITHUB_TOKEN` permissions | Advisory dashboards and unpinned workflows |
| Contract producer | Public or cross-repo API/tool/event/package | Canonical executable schema, generated interfaces/clients, compatibility tests | contract diff, generated-client freshness, consumer tests where independent consumers exist | Hand-written specs that duplicate schemas |
| Artifact producer | Published package, container, binary, SDK, or model artifact | SBOM, provenance/attestation, signature, release manifest; package producers also need release intent and a bot-owned version PR | `supply-chain:sbom`, `supply-chain:provenance`, `supply-chain:signature`, vuln/license policy, release-evidence gate | Unsigned releases, SBOMs generated after deploy, or manual package publishes |
| Production service | Deployed service, worker, cron, or platform capability | GitOps manifests, runbooks, telemetry contract, SLO/smoke checks | deploy admission, smoke/SLO gate, trace/log/metric proof, drift detection | Manual cluster state or logs without trace correlation |
| High-risk correctness | Queues, locks, ledgers, billing, permissions, irreversible workflows | State-machine spec, property/model tests, TLA+/Alloy when justified | invariant tests, replay/fault-injection checks, migration replay | Time-based locks or examples-only tests for correctness |

The Specification Control Plane schemas are the default machine-readable shapes
for these gates when a repository does not already have an equivalent:
`spec-lifecycle`, `work-packet`, `eval-manifest`, `telemetry-contract`, and
`exception-policy`.

- **Contract and artifact specification**:
  [`specification-control-plane-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/specification-control-plane-standard.md)'s
  "Spec-as-code" section owns contract and event proof; the active engineering
  profile owns current tool and protocol selections.
- **Policy as code**: encode merge, infrastructure, permission, dependency,
  and deployment rules in Git-backed checks — OPA/Rego, Conftest, Kyverno,
  GitHub rulesets, or repo-native scripts.
- **Supply chain**: generate SBOMs (CycloneDX/SPDX), vulnerability reports,
  provenance/attestations (SLSA/Sigstore), and OpenSSF-style health checks
  across trust boundaries.
- **Package release control plane**: [`delivery-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/delivery-standard.md)'s
  "Package Publication" section owns this in full — cited, not restated.
- **Observability**: OpenTelemetry-compatible traces/metrics/structured
  logs; logs without correlation IDs or machine-queryable fields are not
  enough for no-human operations.
- **GitOps and reconciliation**: PRINCIPLES.md's `P-DECLARATIVE` principle
  owns this — cited, not restated.
- **Delivery flow**: short-lived candidate streams and profile-selected
  serialization; compatibility uses short branches/merge queue, while roleless
  uses immutable attempts/CAS. Branch by abstraction and use feature flags for
  large changes; long-running mutable state is stale coordination state.
- **Feature flags**: an OpenFeature-compatible abstraction (or repo-local
  equivalent) with owner, expiry, telemetry, and cleanup gates when release
  must decouple from deploy.
- **Architecture fitness functions**: forbidden imports, dependency
  direction, generated-client freshness, bundle/SLO budgets, migration
  replay, API compatibility, and doc/catalog freshness as checks, not
  review judgment.
- **Build graph and affected checks**: dependency graphs, affected-task
  detection, caching, and remote execution so CI stays fast enough for
  merge queues and parallel agents.
- **Collision-resistant artifact identity**: [`../ADR.md`](https://github.com/SylphxAI/doctrine/blob/main/ADR.md)'s
  general rule owns this — no self-assigned sequential number as primary
  identity — cited, not restated.
- **Formal or model-based methods**:
  [`frontier-verification-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/frontier-verification-standard.md)'s
  Core Rule matrix owns when property/model tests and deterministic
  simulation are required — cited, not restated.

Reject these as no-human governance:

- advisory PR bots, dashboard-only findings, or comments that no required check
  consumes;
- aggregate scorecards as hard gates without checking the specific failing
  control;
- manually written OpenAPI, AsyncAPI, or SBOM files when they can be derived;
- long-lived mutable candidate streams instead of bounded attempts, the active
  serializer, branch by abstraction, or typed feature flags;
- feature flags without owner, expiry, telemetry, and cleanup checks;
- blocking every CVE forever instead of severity, reachability, exploitability,
  and expiry-bound exception policy.

## Policy And Exception Records

Every repo declares its active gate class(es) from the Industrial Mechanisms
table above — machine-readable in the repo-local agent file, a manifest, or
org config.
[`specification-control-plane-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/specification-control-plane-standard.md)'s
"Exception records" section owns the required-fields list and the
expiry-fails-CI rule for any exception to a required gate — cited, not
restated. Exceptions without expiry are permanent policy changes and require
an ADR.

## Work Packets

[`specification-control-plane-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/specification-control-plane-standard.md)'s
"Work packets" section owns the field list (id, role, goal/non-goals,
affected surfaces, linked ADR/spec/schema, risk class, collision risks,
claim/lease metadata) and the rule that hidden chat state is not ownership
when collision risk is real — cited, not restated. If a work packet reveals
the contract is missing, fix the contract first.

## Parallel Agent Coordination

Parallelism is safe only when ownership and contracts are explicit.

- Split work by bounded context, package, feature, service, or generated
  contract surface. Avoid assigning two agents to the same shared file unless
  one owns the contract and the other consumes it.
- Use disjoint write sets for subagents and branch workers. If write sets overlap,
  serialize the contract edit first, then parallelize consumers.
- Generated files are not coordination surfaces. Edit the source, regenerate,
  and let CI fail if the generated output is stale.
- Shared chokepoints require serialization: ADR files, migrations, package
  exports, route registries, env schemas, tool schemas, runtime instructions, and CI
  workflows.
- Never allocate a shared artifact identity by reading `main` and guessing the
  next number. A claim record may reserve work, but identity must still come
  from the approved allocator or generator for that artifact class.
- Claim work early through the canonical Work Ledger or repo-declared tracker
  when collision risk is real. Pull requests, issues, branches, and worktrees
  are adapter observations linked to that Work Item, never higher-precedence
  ownership. Hidden chat state is not ownership. Repo-local instructions must
  name the canonical tracker and observation mapping.
- Before claiming ownership of a new P0, re-check live Work Items, selected and
  competing source candidates, the default branch, active serializer, specs,
  generated registries, and release state.
- Duplicate work is resolved by the contract and main branch, not by whichever
  agent wrote more code. Rebase onto fresh `main`, compare against the canonical
  contract. Retire redundant work only after unique evidence, durable refs or
  snapshots, claims, and effects satisfy source-authoring reconciliation.

## Collision Classes

Collisions from self-assigned sequential numbers (ADRs, numbered source
artifacts) are the general case [`../ADR.md`](https://github.com/SylphxAI/doctrine/blob/main/ADR.md)'s identity rule
already prevents — cited there, not restated as rows below.

| Collision | Prevention | Resolution |
| --- | --- | --- |
| Two agents design different API/event/tool shapes | Boundary contract first | Merge or replace with one canonical schema, regenerate clients/tests |
| Two agents edit generated indexes/registries | Generate after merge | Revert hand edits; update generator or source |
| Two migrations race | Timestamp/hash-locked migrations plus replay tests | Rebase, regenerate/rename migration, replay from base |
| Two agents change shared package exports | Contract candidate first | Land contract, re-identify consumers, run compatibility tests |
| Candidate conflicts with current frontier | Active serializer validates integration | Recompute from the fresh frontier, fix semantic conflict, re-prove |
| Docs disagree with code | Docs link or generate from SSOT | Fix generator/guard; code/schema wins current-state claims |
| Agent/runtime instruction drifts | Doctrine constitution contract | Update Doctrine or its projection; never fork standards locally |

## Candidate Admission, Serialization, And Automatic Integration

Every substantive change lands through the active delivery profile's candidate
and serialized-integration path; there are no human reviewers in the normal
path. The current profile binds that path to ADR-2's pull-request, branch
protection, required-check, and merge-queue contract. Adapters may not weaken
the admission, exact-candidate, serialization, recovery, or provenance
outcomes.

## CI Pipeline Architecture — Reviewer + Serializer

See [`ci-admission-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/ci-admission-standard.md).

## Use Cases

| Case | Rule |
| --- | --- |
| Single-agent private change | Code-first inside the boundary; narrowest checks; diff traceable to the goal. |
| Parallel feature build | Contract + work packet first; split by producer/consumer/UI/tests/docs; contract lands first. |
| Cross-repo platform/customer work | Identify owner and public surface first; consume like an ordinary customer, never reach into internals. |
| Duplicate agents, same task | Publish immutable candidate generations; select deterministically against the canonical contract; land one winner and preserve only required losing evidence. |
| Shared contract migration | Expand/contract: add compatibly, migrate consumers, validate both paths, remove old contract later. |
| Documentation or spec drift | Failed mechanism, not a discipline lapse — generate/gate the fact, archive the stale spec. |
| Emergency fix | Move fast without changing the active mechanism: exact candidate, targeted proof, configured serializer/effect fences, and production verification. |

## Minimum Repo Adoption

See [`repo-adoption-standard.md`](https://github.com/SylphxAI/doctrine/blob/main/standards/repo-adoption-standard.md).
