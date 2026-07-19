# Work Coordination Standard

## Purpose

Use this standard when work must survive a session loss, runtime switch,
parallel execution, handoff, external-provider wait, review, delivery, or
recovery. It defines portable semantics. A product adapter owns concrete API,
transport, authentication, provider, and deployment mappings.

## Architecture

A durable coordination system has three distinct layers:

1. **Canonical work ledger** — objectives, attempts, claims, checkpoints,
   relations, blockers, and lifecycle events.
2. **Provider adapters** — observations and effects from source forges, CI,
   deployment, telemetry, support, or other native owners.
3. **Rebuildable projections** — boards, timelines, capability maps, search,
   analytics, and summaries derived from the ledger and refreshed observations.

Do not create a second internal queue in a forge, chat transcript, status file,
or dashboard. External objects may originate work and remain linked facts, but
the selected ledger owns internal execution state.

## Fact ownership

| Fact | Canonical owner |
| --- | --- |
| Source, tests, desired configuration, code-coupled decisions | Owning source repository |
| Internal work objective, attempt, claim, checkpoint, blocker, handoff | Selected work ledger |
| Commit, review, check, release, issue, or merge state | Owning forge/provider |
| Deployment, health, logs, metrics, traces, incident observations | Owning runtime/provider |
| Static operating method | Canonical instruction package |
| Board, timeline, map, aggregate status | Rebuildable projection |

A surface that displays a foreign fact stores a versioned observation and links
to its owner. It must not silently promote a copy into a competing truth.

## Domain model

Keep these concepts separate:

- **Work** — durable objective, scope, acceptance boundary, priority, and
  relations.
- **Attempt** — one bounded execution history toward the Work.
- **Claim** — leased responsibility and recovery authority for an attempt; not
  a source-file lock or proof of activity.
- **Run** — one executing agent/runtime instance bound to an attempt.
- **Checkpoint** — material progress delta, evidence links, blocker, and next
  safe action.
- **Observation** — versioned readback of a fact owned by another system.
- **Evidence** — artifact offered to support an acceptance or completion claim.
- **Effect lease** — short-lived fencing for a scarce external mutation, used
  only when the effect owner can enforce it.
- **Relation** — dependency, parent/child, duplicate, supersession, follow-up,
  rework, or revert link between Work items.

Workflow state and delivery state are different. A Work item may be ready,
active, blocked, completed, canceled, abandoned, or superseded while linked
provider observations describe source, review, release, deploy, or production
state. Do not flatten both into one ambiguous status field.

Completion is an evidenced lifecycle event, not an editable label. If completed
work was wrong, retain its history and create a linked rework, correction, or
revert Work item. Reopen only when the domain explicitly means the same
unfinished objective and preserves the earlier terminal event.

## Event and identity contract

Every material record carries:

- stable tenant/scope, Work, event, and actor/run identities;
- event type, event time, observation time where different, and schema version;
- idempotency key and causation/correlation identities;
- visibility, purpose, retention, residency, and deletion behavior;
- payload or content identity plus source locator; and
- correction, supersession, or tombstone relation where applicable.

Append-only means history is revised by new events rather than silent overwrite.
It does not require retaining unnecessary sensitive payload forever. Redact or
cryptographically erase protected content when policy requires while retaining
the minimum non-sensitive integrity record.

## Claims, recovery, and handoff

1. Claim atomically and bind the claim to a real attempt/run.
2. Use a lease and heartbeat when abandoned work must be recoverable. Do not
   use wall-clock expiry as a correctness lock for an external effect.
3. Checkpoint on a material plan change, blocker, external handoff, evidence
   arrival, delivery transition, or release of responsibility—not on every
   narration step.
4. A takeover preserves the prior attempt and checkpoint, records the stale or
   released claim, and starts or resumes through explicit recovery semantics.
5. A handoff transfers objective, current state, decisions, evidence, gaps,
   authority boundary, and next safe action. A transcript dump is not a handoff.

For allocation patterns such as shared blackboards, capability bidding, and
dependency-aware scheduling, use `coordination-protocols.md`.

## Observations, evidence, and effects

An external observation identifies the native owner, object, revision, observed
time, freshness, producer, and readback result. Missing or stale readback is
unknown; it is not success.

Evidence may support a terminal predicate but must not author its own verdict.
The applicable completion policy derives the verdict from exact evidence and
current observations.

Use effect fencing only for a scarce mutation such as landing, migration,
deployment, release, credentialed action, or provider update. Ordinary source
editing and passive waits do not need an effect lease. Release capacity and
effect leases while waiting for an external outcome.

## Privacy and tenancy

- Enforce tenant and scope boundaries in product authorization, not prompts.
- Collect only work-state data needed for coordination, recovery, billing where
  applicable, or declared proof.
- Keep credentials, raw hidden reasoning, private strategy, and unrelated model
  telemetry out of public provider artifacts.
- Bind projections to the source record's access and retention constraints.
- Test cross-tenant identifiers, guessed links, stale authorization, export,
  correction, and deletion.

## Operating rules

1. Create or find durable Work before non-trivial, collision-prone, or long
   execution. A tiny reversible task may use the repository's declared local
   path when no coordination state is needed.
2. Split by outcome and boundary. Represent dependencies as a partial order so
   independent positive-value work can execute concurrently.
3. Record only material checkpoints and link exact source/provider artifacts.
4. Block with a typed reason, owner, re-entry condition, and next eligible work.
5. Complete only at the declared terminal boundary with accepted evidence.
6. Reconcile duplicate or overlapping Work through objective and ownership,
   preserving unique evidence before supersession.

## Projection and adapter boundaries

Projections must be disposable and reproducible from canonical events plus
provider readbacks. Test snapshot, delete, replay, and semantic diff for any
persistent projection.

An adapter may map these concepts to product tools, REST, MCP, a forge, or
another provider. It may not redefine portable lifecycle semantics, create a
transport-only effect, or make provider observations the internal queue. Bind
the adapter to current versioned schemas and keep vendor vocabulary in its own
package.

## Conformance properties

Verify at least:

- idempotent create/propose and event ingestion;
- exclusive valid claim plus stale/released recovery;
- checkpoint and handoff replay after session loss;
- cycle and invalid dependency rejection;
- provider observation freshness and ownership;
- completion rejection with missing or stale required evidence;
- immutable terminal history plus linked rework/revert;
- cross-tenant isolation and privacy lifecycle; and
- projection delete/rebuild equivalence.

Apply only properties relevant to the selected product and risk. This standard
does not require a new service when an existing ledger or provider already
satisfies the contract.
