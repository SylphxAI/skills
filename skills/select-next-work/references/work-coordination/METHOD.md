# Work Coordination

Labor law is `SylphxAI/owner` `decisions/ADR-012-CONCISE-OWNER.md`.
This method cites that law. It does not restore
a work-coordination ledger and does not invent a second stack.

Use this depth when selecting, claiming, or dispatching labor that would
otherwise wait on CI or own an outcome end-to-end.

## Labor shape

```text
Chairman
  -> Owner
       -> Workers
```

The Owner maintains product lifecycle, locks contracts, computes the feasible
ready set, names write/effect sets, and dispatches. A Worker executes one
claimed node. There is no PM rank and no fourth executive.

## Outcome, node, attempt

- Every Active product has a standing continuous-betterment Outcome.
- A node is one independently terminal slice with one contract or diagnostic
  question, one write/effect set, one oracle, and one asked terminal.
- A Worker attempt is disposable and ends at that terminal.

Active does not mean a resident Worker. Each product frontier is `ready`,
`claimed`, or `deferred(exact predicate + event source)`. Unknown or stale
truth creates a bounded scout node; a fresh empty frontier remains Active with
an exact wake or re-scout predicate. Only explicit lifecycle authority moves a
product to Standby.

## Return at the asked terminal

The default product implementation terminal is a pull request submitted with
the named local oracle. At that terminal the Worker returns and releases its
lease. A different explicit terminal may require a local candidate, diagnostic
finding, review, merge, release, deploy, or live readback; execute only that
claimed node and do not silently expand its authority.

When further progress depends on official CI, review, merge, deploy, a human
credential, or another event, record the exact predicate and event source and
return. Do not keep a session warm to preserve context or poll.

Pull request means candidate source. It is not landed, released, deployed, or
live, and it does not complete the standing product Outcome.

## Owner integrates

Review, merge, conflict, CI-red, and deploy-fail become later nodes when their
events make work executable. Official CI and deploy remain distinct truth
layers. An external wait on one frontier does not block unrelated feasible
nodes.

## One writer per write set

| Parallel | Serial |
| --- | --- |
| Different repositories or disjoint modules | Same module, same branch, same contract |
| Implement on A while review or merge runs on B | Two implementers on one core write set |
| Independent remaster and engine write sets | 100 PRs into one write set |

Hide the wait. Do not fan out onto one lock.

## Dispatch

- Build real precedence separately from symmetric write/effect conflicts and
  finite model, compute, review, CI, merge, and integration capacity.
- Select the highest-value feasible ready set across all Active products; do
  not target a worker count or use one-product-one-Worker.
- Claim the complete selected set through the existing atomic lease mechanism
  before launching.
- One Worker per node and one active writer per mutation surface.
- Hand later review or repair to a newly claimed Worker on the exact SHA.
- Apply downstream backpressure and use age/staleness to avoid starvation
  without round-robin quotas.
