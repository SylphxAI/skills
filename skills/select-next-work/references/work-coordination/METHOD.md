# Work Coordination

Labor law is `SylphxAI/owner` `decisions/ADR-009-IMPLEMENT-TO-PR.md`
revision `2026-08-17.2`. This method cites that law. It does not restore
a work-coordination ledger and does not invent a second stack.

Use this depth when selecting, claiming, or dispatching labor that would
otherwise wait on CI or own an outcome end-to-end.

## Labor shape

```text
Chairman
  -> COO
       -> workers
```

The COO classifies work, names write sets, and dispatches. A worker
labors on one write set. There is no PM rank and no fourth executive.

## Two classes

| Class | Stay |
| --- | --- |
| Causal chain | Until the next hand you cannot advance |
| Independent slice | On that write set while it stays free and local work remains |

A destination with many capabilities is a PRD, not a launch order.

## Keep going

If the write set is still free and local work remains, continue.
Publish or update a pull request when there is a reviewable quantum so
the owner can see the slice. Do not wait for that pull request to merge
before the next commit on the same branch.

Return only when you would sit:

- the next step is a wait you cannot advance (review you must not do
  yourself, official CI, deploy, human credential); or
- the write set is exhausted for now.

A pull request is visibility for landable source. It is not landed and
not live. It is not the halt.

## COO integrates

Review, merge, conflict, CI-red, and deploy-fail are other slices if they
need labor. Official CI and deploy remain Delivery truth layers. They
are not a start condition for the next independent slice.

## One writer per write set

| Parallel | Serial |
| --- | --- |
| Different repositories or disjoint modules | Same module, same branch, same contract |
| Implement on A while review or merge runs on B | Two implementers on one core write set |
| Independent remaster and engine write sets | 100 PRs into one write set |

Hide the wait. Do not fan out onto one lock.

## Dispatch

- Classify, then name the write set, before launching.
- One writer per write set. Launch ready, non-overlapping write sets.
- Publish a pull request for visibility. Return only if you would sit.
- Hand review or repair to a different worker on the exact SHA.
- Do not keep a session warm to poll CI.
