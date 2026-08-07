# Bounded Objective-Closure Loop

Use this task-level loop-engineering method when one accepted objective must
continue autonomously through research, implementation, repair, and
verification:

```text
FRAME -> DECIDE -> EXECUTE -> AUDIT -> COMPLETE
             ^         ^         |
             |         +---------+ objective incomplete
             +-------------------+ research required
                                      |
                                      +-> BLOCKED only on a qualified stop
```

This method closes one objective. It is not the continuous discovery, intake,
and scheduling of new Work owned by `select-next-work`.

## Frame

- Recover the original observable objective, owning boundary, source
  authorities, full Definition of Done, delivery terminal, non-negotiable
  floors, current evidence, and known gaps. Do not reconstruct the task from
  the latest plan, phase label, summary, or preferred implementation alone.
- Build a compact full-scope coverage map that traces every required outcome to
  its current lifecycle state, dependency, acceptance predicate, and decisive
  evidence. Priority labels order execution; they never remove lower-priority
  required outcomes from the completion denominator.
- Resolve contradictions in the frame before mutation. A separate framing
  reviewer is required only when the user explicitly requests independent
  framing or when materially distinct evidence or failure analysis passes the
  delegation predicate. The reviewer receives the original context and
  authorities, not only the executor's summary.

## Decide

- Research and compare alternatives only when a material uncertainty can
  change architecture, product behavior, authority, risk treatment, or the
  critical path. Prefer current primary sources and established maintained
  methods; record one decision and rejected alternatives when the choice is
  durable. A direct task with no material option decision moves immediately to
  execution.
- A Final Decision selects the means of completing the framed objective. It
  cannot redefine, narrow, postpone, or relabel the original completion
  denominator. If research proves the frame contradictory, unsafe, or
  impossible, update it transparently from evidence rather than from
  convenience.
- Stop research when another observation has lower expected decision value
  than acting through a reversible path and verifying the result. Deep market,
  ecosystem, or frontier research is conditional on the decision, not a
  ceremony for every task.

## Execute

- Advance the highest-value eligible action or jointly useful feasible set
  until every framed outcome is either satisfied or has a qualified stop.
  Preserve already proven predicates and remove root causes instead of
  accumulating workarounds.
- Write an ADR, contract, or executable specification before implementation
  when a material durable decision or behavior boundary requires it. Do not
  impose documentation-first ceremony on a direct implementation whose
  acceptance contract is already clear.
- When implementation evidence invalidates the selected design, return to
  Decide. A failed command, preferred tool, or local approach normally triggers
  repair or replanning inside Execute; it does not reopen architecture by
  itself.

## Audit and transition

- Use the bounded self-review loop for ordinary work. When independent formal
  closure is explicitly required or risk-selected, apply `review-multi-review-synthesis`
  to the exact candidate against the original coverage map and current
  evidence. Audit the complete objective and interaction surface, then close
  repairs on the delta; do not review only the latest patch or restart all
  perspectives after every local correction.
- Independence means a materially different failure model, source, method,
  tool, or oracle. Another agent repeating the executor's reasoning is not
  independent proof, and reviewer count is not a quality metric.
- Map the audit result to exactly one transition:
  - `RESEARCH REQUIRED` — evidence invalidates a material decision; return to
    Decide.
  - `ORIGINAL TASK INCOMPLETE` — at least one feasible required predicate is
    unsatisfied; return to Execute.
  - `ORIGINAL TASK BLOCKED` — the entire remaining frontier has a qualified
    authority or external-state stop with evidence and a re-entry trigger.
  - `ORIGINAL TASK COMPLETE — WORK MAY STOP` — every required predicate is
    proven at the declared terminal and claims stay within that evidence.

## Convergence and stop

- Every iteration must close a concrete acceptance gap, falsify or improve a
  material decision, or produce stronger decision-changing evidence. Do not
  repeat an unchanged action-review cycle, create findings for optional taste,
  or add machinery merely to keep the loop visibly active.
- Do not hide unfinished accepted scope as another phase, optional follow-up,
  backlog, residual programme, or lower priority. Conversely, once the frozen
  terminal is satisfied, run the one bounded positive-net and same-cause scan
  owned by `references/bound-request-scope`, then stop when no eligible improvement changes
  the outcome enough to justify its lifecycle cost.
- “SOTA”, “perfect”, or “extreme” describes the strongest positive-net durable
  outcome inside the accepted boundary; it is not an infinite requirement to
  eliminate every imaginable defect or build every possible assurance system.
- Do not create a task manifest, scheduler, memory service, dashboard, policy
  service, CI workflow, or subagent hierarchy solely to instantiate this loop.
  Use the repository's existing goal, plan, source, evidence, and delivery
  mechanisms. Add durable loop infrastructure only for a demonstrated
  recurring operating requirement owned by the continuous-loop boundary.

## Research basis

- Addy Osmani, [Loop Engineering](https://addyosmani.com/blog/loop-engineering/),
  describes a system that finds work, executes, checks, records, and decides
  what happens next while warning about cost and comprehension debt.
- Anthropic, [Building effective agents](https://www.anthropic.com/research/building-effective-agents),
  distinguishes composable evaluator-optimizer workflows from autonomous
  agents and recommends matching complexity to the task.
- ReAct grounds repeated reasoning in actions and environment observations:
  <https://arxiv.org/abs/2210.03629>.
- Self-Refine and Reflexion demonstrate iterative feedback and retained
  experience without establishing a universal software-delivery terminal:
  <https://arxiv.org/abs/2303.17651> and
  <https://arxiv.org/abs/2303.11366>.
