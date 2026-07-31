---
id: ADR-0019-decouple-worker-occupancy-from-delivery-terminal
status: accepted
date: 2026-07-27
decision_owner: SylphxAI
contributors: []
decision_mode: complementary
typed_scope:
  repository:
    - SylphxAI/skills
  capability_id:
    - delivery-terminal
  surface:
    - agent
    - ops
amends: []
supersedes: []
relates: []
---

# ADR-0019: Decouple worker occupancy from delivery terminal state

> **Amended by ADR-0027.** Worker release and event-driven re-entry remain
> binding. Platform Candidate selection, scoped watermarks, and selected
> snapshots do not.

## Context

Direct-trunk removes pull-request and merge-queue serialization for admitted
ordinary work, but it does not by itself create a high-throughput agent system.
Throughput still collapses when:

- one programme-sized Work Item spans many independently terminal outcomes;
- the source agent keeps its claim and session occupied while remote CI,
  artifact builds, promotion, deployment, soak, owner approval, or another
  external event is the only thing that can advance;
- every raw commit starts complete remote verification and an artifact build;
- CI eligibility or lineage checks consume the same scarce runner pool they
  protect; or
- parked Work remains apparently ready but has neither an active owner nor a
  durable wake-up subscription.

These shapes confuse two independent state machines:

1. whether the durable Work has reached its declared terminal evidence; and
2. whether one agent currently has useful executable work and should consume
   worker capacity.

They also make direct-trunk an arrival-rate amplifier: source lands faster, but
verification still serializes or duplicates every intermediate snapshot.

## Decision

1. **Work terminal and worker occupancy are independent.** A Work Item may
   remain active while no agent session or claim is occupied. When only an
   external event can advance it, the current agent checkpoints durable state,
   registers an idempotent subscription, releases EffectLeases and scarce
   capacity, hands off or releases the claim, finishes the current Run, and
   claims another ready Work.
2. **Re-entry is event-driven and agent-independent.** The subscribed event may
   reactivate the original agent or any other eligible agent from the durable
   checkpoint. Polling a parked session is not a scheduler. Long soak or
   observation is a separate bounded Work or controller-owned monitor, not a
   source-builder occupancy requirement.
3. **Work is bounded by independently terminal outcome.** Programmes use a
   parent Work and child outcome DAG. Unrelated capabilities, fixes, or delivery
   decisions do not share one umbrella attempt or one source lineage solely to
   avoid coordination. Every exact candidate binds the child Work that owns its
   outcome.
4. **Ordinary source capacity releases at the source delivery boundary.** An
   agent lands one semantically atomic exact source revision with required local
   proof through repository-native direct trunk or PR. After source has landed
   at the declared boundary, the agent may release capacity.
   The Work can remain open for verified promotion or production evidence, and
   the delivery controller or a later correction Run owns those phases.
   Incidents, irreversible effects, and explicitly deployment-terminal Works
   retain their stronger evidence bar, but they still use event-driven handoff
   during passive waits.
5. **Remote verification cancels safely superseded work.** CI may keep the
   running/latest useful default-branch SHA when a newer revision includes its
   predecessors, subject to non-cancelable audit, migration, provenance,
   security, and release obligations.
6. **Build and CI may run in parallel.** Build the exact tracked-branch
   revision, deduplicate by content, and cancel obsolete undeployed work. This
   does not require a selected-snapshot control plane.
7. **CI must not bootstrap through its own scarce lane.** Repository eligibility
   and required-check wiring must not depend on the same unavailable runner pool
   they are intended to admit.
8. **Measure flow, not ceremony.** Required operating measures include eligible
   source-to-land latency, worker active-action ratio, external-wait handoff
   latency, superseded-run cancellation rate, verification queue age, build
   count, correction rate, and landed-to-verified/deploy latency. Commit
   count alone is diagnostic, not an optimization target.

## Consequences

- Direct-trunk increases source throughput without requiring every source agent
  to become a deployment watcher.
- Production verification remains fail-closed and exact-snapshot bound; this
  decision removes idle occupancy and duplicate work, not evidence.
- A delivery failure creates or reactivates correction Work from durable
  lineage. It does not require the original author session to remain alive.
- Enact requires durable subscription and dispatch semantics; Platform requires
  simple supersede/cancellation and content-addressed build/promotion.
- A provider PR may remain as a bounded external-contribution or migration
  adapter. Agents do not choose or supervise that envelope; the central
  admission policy creates it only while an exact typed obligation still needs
  the predecessor serializer.
- A parked Work with no claim and no subscription is an operational defect, not
  a normal waiting state.

## Verification

- Instruction-package tests assert the worker-release, bounded-Work,
  event-driven re-entry, runner-independent required-check wiring, and safe
  supersede/cancellation contracts.
- Product acceptance requires live evidence that waiting Runs release worker
  capacity, subscriptions cause re-entry, and no more than the admitted
  running/latest-pending snapshots consume complete verification and build
  capacity per scope.
- Delivery acceptance remains exact source/tree, complete proof bundle,
  immutable artifact digest, promotion, runtime digest readback, and
  behavior/recovery evidence as declared by the Work.
