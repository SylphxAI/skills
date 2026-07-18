# mission-control-standard (canonical body)

**Authority:** binding Standard Skill package `mission-control-standard` in `SylphxAI/skills` (`skills/mission-control-standard/`).

**Cutover:** migrated from Doctrine `standards/mission-control-standard.md` at digest `sha256:91daa6b4dec63d56fd39c0ea56888c2aea24499c4fc89d0ec1501e55fc4efcef` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Mission Control Standard

## Purpose

Use this standard when agent work needs to survive a runtime switch, session
loss, public/private boundary, cross-repo handoff, review gate, release gate, or
production proof readback.

Mission Control now has two layers:

1. **Work Ledger layer** - the internal, typed, append-only work-state source of
   truth defined by the Agent-First Mission Control Work Ledger ADR.
2. **Delivery-forge adapter layer** - under the active `github-delivery`
   profile, the ADR-154 conventions for public/repo-local Issues, PRs, labels,
   checkpoint comments, and recurring issue automation.

Under the active delivery profile, GitHub remains the semantic authority for
public issues, PRs, checks, merge queue, releases, and commit SHAs. The Work
Ledger owns internal agent work-state:
claims, checkpoints, handoff, next action, cost, ETA, proof chain aggregation,
and stale-session recovery.

This standard composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for PR, CI, merge-queue, separate-context adversarial review, and no-human gates.
- [`specification-control-plane-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/specification-control-plane-standard/references/full-standard.md)
  for work packets and schema-backed execution contracts.
- [`documentation-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/documentation-standard/references/full-standard.md) for one fact, one
  home.
- [`project-manifest-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/project-manifest-standard/references/full-standard.md) and
  GroundAtlas for repo/project identity and fleet adoption read models.
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for the definition-of-done
  ladder and production readback proof.

## Canonical Homes

Mission Control does not replace the rest of the engineering system. Route each
fact to its owner:

| Fact | Owner |
| --- | --- |
| Code, tests, workflows, package metadata, desired infrastructure | Git in the owning repo |
| Durable decision rationale | Owning repo `docs/adr/` |
| Public user issue or community discussion | GitHub Issue/Discussion |
| PR, checks, merge queue, release run, commit SHA | GitHub |
| Deploy, smoke, health, logs, metrics, traces | Deploy/telemetry system |
| Repo identity, boundary, adoption, fleet scorecard | Project manifests and GroundAtlas |
| Internal agent task state, claim, checkpoint, handoff, next action, cost, ETA | Mission Control Work Ledger |
| Dashboard, OpenWiki-style summary, portfolio board | Projection/read model |

If a surface displays a fact it does not own, it links to the owner. If it
allows writing a fact, it writes through to the owner.

## Work Ledger Contract

`schemas/mission-control-work-item.schema.json` and
`templates/mission-control-work-item.json` define the portable current-state
projection of one work item. `schemas/mission-control-event.schema.json` and
`templates/mission-control-event.json` define one append-only ledger event.

These schemas are the doctrine-level contract for agents, MCP tools, CLIs,
dashboards, and the future implementation repo. They are not a hand-edited PM
board.

Every Work Item must carry:

- stable id;
- tenant/company/org/repo or project scope;
- visibility (`private-internal`, `public-linked`, or `restricted`);
- source (`user-session`, `github-issue`, `ci-signal`, `production-signal`,
  `scheduled-reconciler`, `agent-discovered`, or `other`);
- goal and non-goals;
- status (`ready`, `claimed`, `blocked`, `in-review`, `merged`, `deployed`,
  `verified`, `done`, `abandoned`, or `superseded`);
- current claim, if any;
- checkpoint summary and next safe action;
- canonical-home links;
- external artifact links;
- proof chain;
- cost/ETA/performance fields when available.

Every event must carry:

- stable event id and Work Item id;
- event type;
- actor identity (`agentId`, runtime, and optional model);
- occurred-at timestamp;
- idempotency key;
- payload object;
- privacy/visibility classification plus purpose, retention, deletion mode,
  and residency under the current schema revision.

Every external proof/readback stored in a Work Item is an observation, not a
copy of the external truth. It must identify `factOwner`, `externalRef`,
`observedAt`, `sourceVersion`, `staleness`, and `readbackStatus`. A stale or
unknown readback cannot be used as completion proof.

The privacy policy is allowlist-first and purpose-limited. Collect only fields
needed to coordinate, recover, bill where applicable, or prove the declared
work. Public sync may include public status and linked delivery proof, but it
must forbid private strategy, raw session notes, model/cost telemetry, and
tenant-private blockers.

Every Work Item and event declares a concrete retention period or legal hold,
residency, access/correction/erasure procedure, and deletion mode. Append-only
means transitions are tamper-evident; it does not make unnecessary personal or
tenant data immortal. When erasure applies, append a tombstone/redaction event,
remove or cryptographically erase the protected payload, and retain only the
minimum non-sensitive integrity metadata needed to prove that the transition
occurred. Projection stores inherit the source record's tighter retention and
must be rebuildable after deletion.

## Operating Rules

1. **Start work in the ledger.** For non-trivial work, an agent creates or
   finds a Work Item before editing code, opening a PR, or starting a long
   validation. If the service is unavailable, the agent records the minimum
   local continuation state and backfills once health returns.
2. **Checkpoint material changes.** An agent writes `work.checkpoint` when it
   claims work, changes plan materially, becomes blocked, links a PR, receives
   review/audit results, hands off, or finishes.
3. **Use stale-claim recovery.** Claims have leases and heartbeats. A new agent
   may take over stale work by recording the takeover event and preserving the
   prior checkpoint.
4. **Link external artifacts.** PRs, issues, check runs, release runs, deploys,
   smoke checks, logs, and production readbacks are linked into the proof chain;
   the ledger does not pretend to be their source of truth.
5. **Keep public repos clean.** Public issue threads receive concise public
   status only. Internal reasoning, tokens, model identity, agent chatter,
   private strategy, and crash recovery live in the ledger.
6. **No public identity leakage requirement.** Git commits may stay under the
   configured human or bot identity. Internal provenance lives in the ledger.
7. **No cross-tenant shortcut.** API/MCP connectors enforce tenant/company/org
   scoping. Prompt instructions are not access control.

## MCP And Tool Surface

The first implementation must expose a typed API and SDK, then consume that SDK
from CLI, web console, and MCP. Required tool names:

- `work.start`
- `work.get`
- `work.claim`
- `work.checkpoint`
- `work.block`
- `work.link_external`
- `work.complete`
- `work.ready`
- `proof.readback`
- `fleet.activity`
- `dependency.map`
- `analytics.summary`

Tool results must be compact enough for agent context, but complete enough to
replace a hand-written session handoff: current status, latest checkpoint, next
safe action, linked proof, blocker, claim freshness, and continuation commands.

## GitHub Adapter Conventions

ADR-154 remains valid for repos or public interactions that need GitHub-native
coordination.

### Work-label taxonomy

`schemas/work-label-taxonomy.schema.json` and
`templates/work-label-taxonomy.json` are the canonical GitHub label vocabulary:

| Category | Values | Purpose |
| --- | --- | --- |
| `role:*` | signal-triage, adr-spec-research, adr-spec-implementation, engineering-quality, product-surface, pr-review-merge-gate, production-ci-release, security-supply-chain, other | Agent lane. |
| `state:*` | ready, claimed, blocked, in-review, done | Issue pull-queue state. |
| `type:*` | bug, feature, chore, docs, security, incident | Work type. |
| `area:*` | repo-specific | Owning subsystem. |
| `risk:*` | L0-L3 | Blast radius. |
| `priority:*` | p0-p3 | Urgency. |
| `signal:founder-input-needed` | flag | Direction or priority decision required. |
| `signal:escalation` | flag | Approval or security escalation required. |

Only `area:*` may take repo-local values. Other categories are closed unless
Doctrine changes the schema/template.

### Checkpoint-as-issue-comment

`schemas/work-checkpoint.schema.json` and `templates/work-checkpoint.json`
define the public/repo-local `AGENT-CHECKPOINT` comment. Use it when the issue
thread is the chosen coordination surface. Prefer the Work Ledger for internal
agent handoff once the service exists.

### Claim staleness

For issue-native work, presence is computed from the issue's `state:*` label and
latest `AGENT-CLAIM` / `AGENT-CHECKPOINT`. For ledger-native work, presence is
computed from Work Ledger claim events. Do not create a third presence store.

### Recurring work

Scheduled GitHub workflows that file issues must be idempotent by stable id.
They update an existing issue or linked Work Item instead of opening duplicates.

## Dashboard And Projection Rules

The visual Mission Control product is required, but it is a projection. It may
render timelines, agent activity, dependencies, ETA, cost, PR/CI/release/deploy
proof, SOTA gaps, and smoke/readback state. It must not become a manual truth
store.

Projection stores are trusted only when they can be deleted and rebuilt from the
Work Ledger plus connector readbacks. The future implementation must include a
snapshot-delete-replay-diff gate for any persistent projection.

## Deployment Boundary

Doctrine defines the policy and contract. The Mission Control product must live
in its owning repo and deploy through the Sylphx serverless platform after the
contract slice is validated.

The product repo must link to the Sylphx platform capability catalog for
functions, storage, events/queues, secrets, auth, domains, observability,
deploy promotion, scheduled jobs, and smoke/readback surfaces. Do not duplicate
platform feature facts in this standard.

## Adoption

Fleet impact is `required-future`.

Existing GitHub issue/PR workflows remain accepted during expansion. Ratchet to
required Work Item links only after the Mission Control API/MCP implementation
has shipped, been dogfooded on at least one private repo and one public repo,
and has default-branch proof that agents can start, claim, checkpoint, link PRs,
complete, and recover stale work.

New agent-first products and new long-running multi-agent workflows should
design against the Work Ledger contract immediately.

## Validation

- Validate Mission Control schemas and templates in the product repository that
  owns those executable contracts.
- Run the owning product's schema, domain, API, and replay tests after changing
  its runtime contracts.
- Run this repository's admission and catalog freshness checks after changing
  the static standard.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `mission-cont-01` | Strongest relevant subset applied |
| `mission-cont-02` | Facts in schema/test/ADR homes |
| `mission-cont-03` | Proof layers separated |
| `mission-cont-04` | Unknown authority fails closed |
| `mission-cont-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
