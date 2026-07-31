---
id: ADR-0025-objective-continuity-and-delivery-terminal
status: accepted
date: 2026-07-29
decision_owner: SylphxAI/skills
supersedes: []
amends: []
scope:
  - objective-continuity
---

# Preserve the real objective through the declared delivery terminal

## Context

Agents frequently complete one implementation phase, produce a local diff,
commit a change, open a pull request, or report one green validation layer and
then wait for another prompt. Those states are useful checkpoints, but they are
not interchangeable with the requested outcome. Repeated prompting shifts
ordinary execution continuity back to the principal and makes completion depend
on session behavior instead of the owning repository's delivery contract.

A universal instruction to “deploy everything” would be equally wrong.
Research, source changes, packages, production behavior, infrastructure, and
recovery work have different truthful terminals. Pull requests and direct-trunk
landing are also delivery adapters rather than competing definitions of done.

The repository previously contained `sota-execution-standard`. It was retired
because the name and package mixed motivational language, decision quality, and
execution mechanics. Its decision kernel now belongs to
`decision-quality-standard`; recreating a generic “work attitude” or “SOTA
execution” package would restore the same dual ownership and weaken native
Skill selection.

## Decision

Keep one semantic owner for each part of the problem:

1. `autonomous-execution-standard` owns **objective continuity**. A plan is
   disposable, but the original objective, owning boundary, acceptance
   predicates, and active delivery terminal persist across phases, replans,
   context changes, handoffs, reviews, and tool failures.
2. A phase, research result, local diff, commit, source revision, open pull request,
   partial review, green subset, residual register, or status report is a
   checkpoint unless it independently satisfies the declared terminal.
3. Before any done, wait, blocked, handoff, or final claim, the agent re-reads
   the goal and delivery declaration, names the strongest proven lifecycle
   state, compares it with the terminal, and—while it remains unsatisfied—
   advances the highest-ranked safe positive-net in-scope action or feasible
   set.
4. A residual reports truth but does not waive actionable work inside the
   accepted objective. Follow-up Work is valid only for an independently
   terminal outcome, explicit exclusion, or dependency that current authority
   cannot advance; splitting it out does not complete a parent that still owns
   the outcome.
5. `delivery-standard` owns the distinction between **shippable source** and a
   **delivery terminal**. Shippable means an exact source revision is complete,
   validated, free from hidden author state and capable of entering normal
   delivery. It does not mean landed, published, deployed, live, or recovered.
6. The active repository delivery declaration selects the required terminal
   and evidence from the lifecycle:

   `workspace → locally verified source → exact revision → landed → released or deployed → live-observed`

7. `runtime/constitution.md` carries only the compact always-on invariant.
   Detailed mechanics remain in the two owning standards.

The standard preserves aggressive progress without unbounded execution.
`scope-discipline` still closes a satisfied objective after one bounded
positive-net scan. Work-conserving scheduling does not authorize busywork,
unsafe mutation, new scope, polling, or unbounded delegation. Independent
review remains risk-selected; ordinary work uses bounded self-review instead of
creating a reviewer merely for ceremony.

## Rejected directions

### Add a generic work-attitude Skill

Rejected because attitude is not an independently requested job or artifact.
Its triggers overlap autonomy, decision quality, scope, delivery, evidence, and
review, creating inconsistent auto-injection and dual semantic authority.

### Make “SOTA completion” the universal terminal

Rejected because it has no bounded evidence contract and can turn every task
into endless optional hardening. The target is the strongest durable result
inside the declared objective and delivery terminal, followed by the existing
bounded positive-net scan.

### Treat shippable, committed, pushed, opened PR, merged, or deployed as one
universal state

Rejected because each describes a different lifecycle layer. The correct
terminal depends on the deliverable and repository declaration, not a single
Git or runtime ceremony.

### Require an independent subagent review for every completion

Rejected because independence has value only when risk and method diversity
justify its startup, resource, supervision, and integration cost. Universal
review fan-out recreates the resource failure that task-semantic delegation was
designed to prevent.

### Wait in-session whenever an external lane is pending

Rejected because worker occupancy is separate from Work terminal state.
Eligible independent work continues; external-only waits use durable defer and
re-entry semantics.

## Consequences

- Agents can continue ordinary multi-phase work without repeated user prompts.
- Completion claims bind to an observable repository-owned terminal rather than
  effort, phase labels, Git ceremony, or session duration.
- Source can be made shippable without falsely claiming it is shipped.
- Source-only tasks are not forced into unnecessary deployment, while release
  and production tasks cannot stop at source landing.
- Risk-selected review and delegation remain available without becoming
  mandatory fan-out.
- The retired `sota-execution-standard` stays retired.

## Verification

- Authored routing fixtures cover multi-phase continuation, a blocked lane,
  Cantonese phrasing, delivery composition, an explicitly bounded PR terminal,
  bounded near-neighbours, misleading keywords, and a trivial abstention. They
  verify the source contract, not live runtime injection behavior.
- Contract tests assert the always-on checkpoint invariant, objective
  continuity, the shippable/terminal distinction, and risk-selected review.
- Catalog generation, package validation, repository tests, package dry-run,
  and whitespace validation pass on the exact source revision.
