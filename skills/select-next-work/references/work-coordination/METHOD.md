# Work Coordination

Labor law is `SylphxAI/owner` `decisions/ADR-009-IMPLEMENT-TO-PR.md`.
This method cites that law. It does not restore a work-coordination
ledger and does not invent a second stack.

Use this depth when selecting, claiming, or dispatching labor that would
otherwise wait on CI or own an outcome end-to-end.

## Labor shape

```text
Chairman
  -> COO
       -> workers
```

The COO holds destination and cuts independently mergeable slices. A
worker is disposable labor against one slice. There is no PM rank and no
fourth executive.

## Implement-to-PR

An implement worker:

1. Takes one named slice and the write-set boundary.
2. Implements and runs the local proof the slice needs.
3. Opens or updates the pull request.
4. Returns. Typed claim: source + PR. Not landed, not live.

It does not wait for review, merge, official CI, deploy, or smoke. It
does not pick the next slice. It does not review itself.

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

Hide the wait. Do not fan out onto one lock. A destination may name many
capabilities; that is PRD inventory, not a launch order for N agents.

## Dispatch

- One slice = one worker = one pull request = one local proof.
- Hand an implement slice to the implementation skill and stop at PR.
- Hand review or repair to a different worker on the exact SHA.
- Do not keep a session warm to poll CI.
