---
status: accepted
date: 2026-07-28
owners:
  - SylphxAI
---

# ADR-0020: Enact-authoritative work and review pools

## Context

Before Enact was usable, long-running programmes were commonly represented by a
Codex session and a permanent `Advisor` / `Executor` pair. The Advisor watched
one Executor, sent private steering messages, and treated that session's prompt
and transcript as the programme record.

That compatibility shape creates the wrong scaling boundary:

- hidden session state competes with the Work ledger as authority;
- proposing work implicitly assigns its author or paired Executor;
- one Advisor consumes capacity shadowing one Executor;
- review happens through private messages rather than a durable candidate
  verdict;
- delivery waits keep both sessions occupied; and
- session loss, replacement, or reassignment requires reconstructing intent
  from chat history.

It also confuses three provider-native facts. Enact owns work coordination, Git
owns source history and immutable candidates, and Platform owns verification,
promotion, deployment, and production observations.

## Decision

1. **Enact is the work and coordination authority.** Goals, Work Items,
   proposals, admission, priority, attempts, claims, Runs, checkpoints,
   subscriptions, review obligations, verdicts, evidence links, blockers, and
   terminal state are durable Enact state. A chat session is an execution
   surface and disposable context cache; it is never Work authority.
2. **Proposal, admission, and claim are distinct transitions.** A proposer
   describes an independently terminal outcome, evidence, priority, risk,
   duplicate identity, and acceptance contract. Admission decides whether it
   enters the ready graph. An eligible agent claims it separately. Policy may
   allow the same agent to propose and claim ordinary bounded work, but
   proposal never implies ownership.
3. **Agents are selected from capability pools, not permanent roles or
   pairs.** `Proposer`, `Executor`, `Reviewer`, and `Delivery/Re-entry` are
   perspectives on one Work graph. One general agent may perform several
   perspectives on different Work. No permanent Advisor shadows an Executor.
4. **The Executor submits a candidate, not an unverifiable completion claim.**
   The active attempt binds its exact source candidate, local evidence, residual
   risk, and next predicate to the Work. The Executor never chooses PR versus
   direct-trunk landing. Platform derives the exact
   verification, independent-review, collision, and effect obligations and
   selects the configured landing adapter. Once source is landed at the declared
   boundary, the Executor uses Enact `work.defer` to atomically checkpoint,
   subscribe to the external outcome, mark scheduling deferred, release
   effects, Claim, Run, and worker capacity, then claims other ready Work.
5. **Review is a candidate-bound, risk-selected obligation.** Deterministic
   contracts, tests, policy, security, and admission checks run first. A
   separate reviewer context is created only when the risk policy requires
   independent judgment and the expected information gain exceeds its
   coordination cost. It reads the Work contract, immutable candidate, and
   authorized evidence—not the Executor's private transcript—and publishes a
   typed verdict, finding, attestation, or correction Work in Enact.
6. **High-risk effects use dual control, not permanent supervision.**
   Credentials, security policy, migrations, public contracts, destructive
   operations, and irreversible effects remain fenced by the active delivery
   profile and typed EffectLeases. A short-lived reviewer or approver may gate
   that exact effect; it does not become a standing pair.
7. **Delivery and recovery are event-driven.** Platform verifies and promotes
   selected immutable snapshots. Its observations are linked into Enact. A
   success event may satisfy Work terminal evidence; a failure or regression
   creates or reactivates correction Work that any eligible agent can claim.
   Future provider observations use `next_state_change`, which atomically
   captures the current subject cursor so Claim release cannot satisfy its own
   wake condition. The original Executor is not required to remain alive.
8. **Provider-native truth remains federated.** Enact references and projects
   Git and Platform observations with provenance and freshness. It must not
   copy them into an untraceable replacement source of truth.
9. **Legacy paired sessions migrate without restarting work.** For each active
   pair, create or resolve one canonical Work per independently terminal
   outcome, attach exact source/evidence/current blocker, recover or establish
   the active claim, and subscribe to outstanding events. The Advisor stops
   private shadow supervision and records any finding as a review verdict or
   related Work. The Executor either continues the claimed executable action or
   checkpoints and releases during external wait. Terminal or stale sessions
   are checkpointed and stopped, not relaunched for ceremony.
10. **There is one agent-facing Candidate path.** An internal Candidate and an
    imported external pull request enter the same immutable Candidate contract.
    A pull request is only a provider projection for external collaboration or
    a typed, expiring compatibility obligation. It is never an alternative
    Work queue, review authority, completion state, or safety tier. Central
    admission—not agent interpretation—fails closed on unknown classification.
11. **System-generated source uses the same path.** Release versions, ADR
    registries, policy sync, dependency updates, and conformance remediations
    publish immutable Candidates. A generator or bot never chooses or waits on
    a pull request. If policy selects a provider envelope, the controller owns
    that exact Candidate-bound projection and retires it with the compatibility
    obligation.

## Consequences

- Owner and exploratory sessions propose work without becoming implicit
  executors.
- Review coverage follows risk and candidate identity instead of headcount.
- Session count can scale independently from programme count, and agent
  replacement does not lose the durable objective.
- Most ordinary agents can land a bounded candidate and immediately take the
  next ready Work while delivery remains fail-closed.
- Enact requires proposal/duplicate admission, eligible ready queues,
  candidate-linked review obligations and verdicts, atomic external-wait
  release via `work.defer`, subscription dispatch, and fleet flow analytics.
- Git and Platform remain independently auditable authorities rather than
  becoming opaque attachments inside Enact.
- Removing the agent's lane choice removes policy drift without weakening
  review: review strength is an explicit Candidate obligation and is therefore
  identical whether the provider input arrived as a branch, commit, or PR.

## Verification

- Always-on and detailed Skills state that sessions and permanent
  Advisor/Executor pairs are not Work authority.
- Contract tests prove proposal/claim separation, candidate-bound review,
  provider-native truth boundaries, atomic external-wait release, and
  `next_state_change` re-entry without a read/subscription race.
- Active legacy pairs publish Enact checkpoints and stop private supervision.
- Product acceptance requires multi-session evidence that ready Work is claimed
  from a shared pool, review is emitted as typed durable state, waiting agents
  release capacity, delivery events cause re-entry, and session loss does not
  lose the Work contract.
- Migration acceptance additionally requires an internal Candidate and an
  imported external PR with equivalent semantic change to receive the same
  obligation set; ordinary agents must not open or wait on PRs, while typed
  compatibility projections remain observable and bounded.
