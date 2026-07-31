# Self-Feeding Agent Loop Standard

## Purpose

Use this standard when agents discover, propose, claim, execute, review, and
recover work continuously. The loop is a bounded operating system, not an
infinite prompt or a permanent Advisor/Executor hierarchy.

This is the continuous-work form of loop engineering: after one bounded
objective reaches its terminal, the operating loop may qualify and select the
next Work Item. The bounded research-execute-audit loop that closes one already
accepted objective belongs to `autonomous-execution-standard`; do not create a
second queue, scheduler, or continuation authority inside that task.

## Authority

- Enact owns Work, claims, Runs, checkpoints, review findings, subscriptions,
  and effects when available.
- Git owns source.
- The repository owns PR/direct-trunk and merge-queue policy.
- CI owns the exact-SHA correctness verdict.
- Platform owns artifact build and deployment.
- Sessions are disposable workers.

## Loop

```text
owner / production / CI / security / customer signals
  -> propose and deduplicate Work
  -> policy admits and prioritizes
  -> eligible agent claims one bounded outcome
  -> exact Git revision through repository-native integration
  -> exact-SHA CI and risk-selected review
  -> defer/release on external-only wait
  -> delivery event completes or creates/re-enters correction Work
```

An external contribution enters as a normal PR and needs no Enact account or
Work id. A connector may link its provider facts after intake.

## Perspectives

Proposer, Executor, Reviewer, and Coordinator are temporary perspectives from
shared capability pools.

- Proposal never assigns the proposer.
- One Coordinator does not privately supervise one Executor.
- Review is exact-revision-bound and risk-selected.
- A reviewer publishes a durable verdict/finding and releases.
- An Executor may be replaced by any eligible agent from a checkpoint.

There is no minimum child quota and no permanent pair.

## Bounded coordinator tick

Default execution is one bounded tick:

1. resolve Organization/Project and live Work authority;
2. inspect queue, claims, capacity, and material provider changes;
3. deduplicate and qualify independently useful bounded outcomes;
4. launch only lanes whose expected gain exceeds startup, compute,
   coordination, collision, and integration cost;
5. checkpoint material state; and
6. emit a compact tick report and stop.

Continuous mode requires an external scheduler, bounded WIP, a readout channel,
and one summary per tick. A coordinator that cannot complete qualification
reports the missing fact; it does not spawn performatively.

## Work and backpressure

One Work Item owns one independently terminal outcome. Use a parent Work plus
child DAG for programmes.

- Reuse a semantic duplicate instead of adding another item.
- Cap active attempts by repository integration and CI capacity.
- Group one root cause; split unrelated outcomes.
- Do not create vague improvement Work.
- When CI, review, or deployment is saturated, stop increasing source WIP and
  fix the bottleneck.
- Claims own Work, not files or branches.

## Executor

An Executor:

1. verifies the problem and current contract;
2. checks competing Work/attempts;
3. implements one coherent change;
4. runs risk-appropriate local validation;
5. integrates through repository-native DT or PR;
6. links the exact landed revision privately where Work exists; and
7. defers/releases when only an external event can advance the Work.

The source release boundary is:

```text
root cause -> fix -> local validation -> exact revision -> source landed
          -> checkpoint/subscription -> claim/Run released
```

The Work terminal may remain:

```text
aggregate CI -> build/deploy -> live readback -> complete or correction Work
```

Do not keep the Executor session alive to poll.

## Reviewer

A Reviewer starts only when independent judgment is part of the Work contract
or the Work is explicitly an audit.

- Read exact Work, source revision, and authorized evidence.
- Do not depend on sibling private transcripts.
- Publish a typed verdict, finding, attestation, or correction Work.
- Name the failed contract and evidence.
- Release immediately after the verdict; do not wait for repair/deploy.

## Coordinator

The Coordinator may inspect queue summaries, Work identities, claim age,
capacity, integration backlog, and provider state needed for qualification. It
does not:

- become a private message broker;
- copy one agent's hidden output into another;
- rewrite child prompts ad hoc;
- implement deep child work merely to avoid admitting a new Work;
- create a PR/DT lane;
- wait on CI/deploy; or
- consume unrelated Work to look busy.

Prompt/process defects become a Skills finding with exact evidence.

## Source and delivery

Agents follow repository policy:

- internal authorized work prefers direct trunk where allowed;
- external work uses PR;
- CI accepts both supported ingress paths; and
- merge queue is opt-in only for measured PR contention.

Platform does not select the source adapter. Delivery uses `On Commit`, `After
Verification`, or `Off` and one exact-SHA aggregate verdict.

## Durable waits

At the first external-only boundary, use Enact `work.defer` when available. The
atomic operation checkpoints, subscribes to the next provider state change,
marks Work deferred, releases effects and claim/Run capacity, and finishes the
Run.

Do not approximate this with separate handoff/subscription calls or a
fixed-minute polling window. Provider events may re-enter any eligible agent.

## Decision and effect boundaries

Discovery may reveal product, architecture, security, pricing, legal,
infrastructure, credential, migration, or public-contract decisions. The loop
records the narrow decision and evidence; it does not assume authority.

Irreversible and scarce external effects require the owning approval and
EffectLease where applicable. Source landing never implies effect authority.

## Tick report

Include:

- project and tick identity;
- ready/claimed/deferred/blocked counts;
- active attempts and stale claims;
- new proposals/reused duplicates;
- launched and intentionally unlaunched lanes;
- current source/CI/deploy bottleneck;
- provider state changes;
- prompt/process findings; and
- exact next safe action.

Do not include secrets, raw internal diagnostics, private reasoning, or
customer data.

## Improvement policy

Change this loop only from observed failure or measured opportunity. Record:

- evidence and expected value;
- owning standard/contract changed;
- rejected simpler alternatives;
- validation and rollback; and
- retirement of predecessor behavior.

Do not add roles, dashboards, gates, queues, or services merely because they
make the architecture look complete.

## Acceptance

- Work survives session loss.
- Proposal and claim are distinct.
- No permanent Advisor/Executor or Reviewer/Builder pair exists.
- External-only waits release workers and re-enter by event.
- External PR and internal DT both work without public Work ids.
- Duplicate Work and WIP remain bounded.
- Throughput is limited by useful execution/CI capacity, not session polling or
  invented source-control layers.
