# Work Coordination Standard

## Purpose

Use this standard when agent work needs to survive a runtime switch, session
loss, public/private boundary, cross-repo handoff, review gate, release gate, or
production proof readback.

Work coordination has two layers:

1. **Work Ledger layer** - the internal, typed, append-only work-state source of
   truth implemented by Control Plane.
2. **Delivery-forge adapter layer** - under the active `github-delivery`
   profile, conventions for public/repo-local Issues, PRs, labels,
   checkpoint comments, and recurring issue automation.

Under the active delivery profile, GitHub remains the fact owner for
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
  Control Plane repository ingestion for repo/project identity and portfolio read models.
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for the definition-of-done
  ladder and production readback proof.

## Fact ownership

This standard does not replace the rest of the engineering system. Route each
fact to its owner:

| Fact | Owner |
| --- | --- |
| Code, tests, workflows, package metadata, desired infrastructure | Git in the owning repo |
| Durable decision rationale | Owning repo `docs/adr/` |
| Public user issue or community discussion | GitHub Issue/Discussion |
| PR, checks, merge queue, release run, commit SHA | GitHub |
| Deploy, smoke, health, logs, metrics, traces | Deploy/telemetry system |
| Repo identity and boundary | `project.manifest.json` in the owning repository |
| Current adoption and portfolio scorecard | Control Plane ingestion and live projections |
| Internal agent task state, claim, checkpoint, handoff, next action, cost, ETA | Control Plane Work Ledger |
| Dashboard, OpenWiki-style summary, portfolio board | Projection/read model |

If a surface displays a fact it does not own, it links to the owner. If it
allows writing a fact, it writes through to the owner.

## Work Ledger Contract

Control Plane's versioned domain/API schemas are the executable contracts for
Work Items and append-only ledger events. This standard owns their portable
semantic obligations; it does not duplicate runtime schemas or create a
hand-edited PM board.

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
- fact-owner links;
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

Use the active forge adapter for repos or public interactions that need
GitHub-native coordination.

### Work-label taxonomy

The active forge adapter projects the following GitHub label vocabulary:

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
the owning adapter contract changes.

### Checkpoint-as-issue-comment

The active adapter defines the public/repo-local `AGENT-CHECKPOINT` comment.
Use it when the issue
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

The visual work-management product is a projection. It may
render timelines, agent activity, dependencies, ETA, cost, PR/CI/release/deploy
proof, decision-quality gaps, and smoke/readback state. It must not become a manual truth
store.

Projection stores are trusted only when they can be deleted and rebuilt from the
Work Ledger plus connector readbacks. The future implementation must include a
snapshot-delete-replay-diff gate for any persistent projection.

## Deployment Boundary

Skills defines the static policy; Control Plane owns the Work Ledger product,
its versioned schemas, APIs, storage, adapters, and delivery.

The product repo must link to the Sylphx platform capability catalog for
functions, storage, events/queues, secrets, auth, domains, observability,
deploy promotion, scheduled jobs, and smoke/readback surfaces. Do not duplicate
platform feature facts in this standard.

## Adoption

Selected-repository adoption resolves from the current Control Plane selector/profile. A
selected workflow uses the Work Ledger as its sole internal task queue and
links external forge artifacts as observations; it must not keep a second
internal queue. Adoption proof exercises start, claim, checkpoint, external
link, completion, and stale-claim recovery against the live selected API.

## Validation

- Validate Work Coordination schemas and templates in the product repository that
  owns those executable contracts.
- Run the owning product's schema, domain, API, and replay tests after changing
  its runtime contracts.
- Run this repository's admission and catalog freshness checks after changing
  the static standard.


## Package checklist

| Rule ID | Check |
| --- | --- |
| `work-coordination-01` | Strongest relevant subset applied |
| `work-coordination-02` | Facts in schema/test/ADR homes |
| `work-coordination-03` | Proof layers separated |
| `work-coordination-04` | Unknown fact owner fails closed |
| `work-coordination-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
