# Bounded closure brief

Use this template when an executor or reviewer is drifting beyond the original
outcome.

```text
Objective: <one observable outcome>
Terminal: <the checks or delivered state that finish it>
Required now: <only direct blockers and same-cause defects>
Excluded: <independent hardening, new infrastructure, speculative threats>
Time-to-value: <shortest credible implementation and proof path>
Calendar compression: <agent shards, replay, simulation, differential or property tests>
Real-time need: <none, or exact hypothesis that cannot be accelerated>
Lifecycle stage: <development | internal dogfood | internal beta with users | public production>
Stop rule: when Terminal passes, report completion; do not expand the bar.
```

Example classification:

| Finding | Classification | Action |
| --- | --- | --- |
| The changed parser fails its declared input contract | Terminal blocker | Fix now |
| The same broken parser path exists in the touched module | Same-cause defect | Fix in the bounded slice |
| A separate authorization service could provide stronger isolation | Independent improvement | Do not block; create follow-up only if valuable |
| A trusted internal content edit might be made by a hypothetical hostile platform administrator | Speculative expansion | Reject unless the task explicitly changes the threat model |

For tests, choose the shortest test that can falsify the material claim. A
multi-day observation window is justified only when elapsed time is part of the
behavior or failure mechanism.

Before accepting a calendar delay, ask whether the same uncertainty can be
closed with more parallel agents, historical replay, virtual time, synthetic
load, shadow execution, model checking, or a short reversible cutover. If yes,
use the active proof instead of waiting.

## Closure checklist

- [ ] The objective and terminal still match the user's request.
- [ ] Every blocking finding cites an existing criterion or risk floor.
- [ ] Facts, inferences, and hypotheses are labelled honestly.
- [ ] The implementation fixes the owning cause rather than a symptom.
- [ ] Optional hardening and speculative threats do not block delivery.
- [ ] Tests exercise the material claim with the shortest decisive proof.
- [ ] Any wall-clock delay explains why agent parallelism or simulation cannot replace it.
- [ ] Active proof options were exhausted before accepting a workaround or passive wait.
- [ ] Evidence and rollout match the current lifecycle stage.
- [ ] Development work is not blocked on nonexistent production traffic.
- [ ] Passing the terminal ends the task.
