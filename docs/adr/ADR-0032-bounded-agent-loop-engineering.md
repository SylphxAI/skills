---
id: ADR-0032-bounded-agent-loop-engineering
status: accepted
date: 2026-07-31
decision_owner: SylphxAI/skills
supersedes: []
amends:
  - ADR-0025-objective-continuity-and-delivery-terminal
scope:
  - autonomous-execution
  - agent-loop-engineering
---

# Absorb bounded loop engineering into autonomous execution

## Context

“Loop engineering” is an emerging label for designing the system around an
agent: objective and state, context construction, action, falsifiable
evaluation, feedback, memory, and a stop or continuation decision. Current
examples range from evaluator-optimizer workflows and bounded coding loops to
continuous Work intake systems. They do not define one stable universal
process, and several implementations bundle schedulers, worktrees, memory,
subagents, dashboards, and services that are useful only when their operating
requirements exist.

The requested full-scope loop is narrower. It closes one original objective
through framing, material research and decision, execution, audit, repair, and
an evidence-backed terminal. `autonomous-execution-standard` already owns that
job and its completion claim. `convergent-review` owns formal exact-candidate
review, while `self-feeding-agent-loop-standard` owns repeated discovery and
completion of new Work. A new generic `loop-engineering` package would duplicate
those owners and make native Skill selection ambiguous.

## Decision

1. Do not create a separate `loop-engineering` Skill. Add bounded loop
   engineering as an explicit objective-closure mode of
   `autonomous-execution-standard`.
2. The state machine is `FRAME -> DECIDE -> EXECUTE -> AUDIT`, with
   evidence-driven transitions back to Decide or Execute and terminal outcomes
   of complete or qualified blocked.
3. Frame against the original authoritative context and preserve a full-scope
   coverage map. Milestones and priorities order work but never reduce the
   completion denominator.
4. A Final Decision chooses the means; it cannot redefine completion. Research
   is proportional to decision-changing uncertainty and stops when reversible
   action plus verification has higher expected value.
5. Ordinary work uses bounded self-review. Independent formal review is used
   when explicitly required or when distinct-method value exceeds delegation
   and resource cost. A selected reviewer receives the original objective,
   coverage map, exact candidate, and evidence rather than only the latest
   executor summary.
6. Formal closure maps to `RESEARCH REQUIRED`, `ORIGINAL TASK INCOMPLETE`,
   `ORIGINAL TASK BLOCKED`, or `ORIGINAL TASK COMPLETE — WORK MAY STOP`.
   Blocked requires a qualified stop across the whole remaining frontier.
7. Every iteration must close a concrete gap or strengthen material
   decision-changing evidence. Completion uses frozen predicates and the
   repository delivery terminal, followed by one bounded positive-net scan; it
   does not mean theoretical perfection.
8. The method adds no mandatory task manifest, scheduler, memory service,
   subagent hierarchy, policy system, or CI workflow. Continuous discovery of
   new Work remains a separate operating-system job owned by
   `self-feeding-agent-loop-standard`.

## Rejected directions

### Publish a generic Loop Engineering wrapper

Rejected because it would own no independently accepted artifact beyond
Autonomous Execution and would collide with continuous Work loops and formal
review.

### Require research and independent agents at every transition

Rejected because simple or reversible tasks gain no decision value from that
ceremony, while duplicate agents can increase correlation, resource pressure,
and integration cost without adding an oracle.

### Repeat until “perfect”

Rejected because an unbounded adjective is not a falsifiable stop condition.
The loop targets the strongest positive-net durable result inside the accepted
boundary and stops when its observable predicates pass.

## Research basis

- Addy Osmani, [Loop Engineering](https://addyosmani.com/blog/loop-engineering/),
  describes the goal, work, checking, recording, and continuation system while
  warning about cost and comprehension debt.
- Anthropic, [Building effective agents](https://www.anthropic.com/research/building-effective-agents),
  distinguishes composable evaluator-optimizer workflows from autonomous
  agents and recommends matching complexity to the task.
- ReAct grounds repeated reasoning in tool observations:
  <https://arxiv.org/abs/2210.03629>.
- Self-Refine and Reflexion demonstrate iterative feedback and retained
  experience without establishing a universal software-delivery terminal:
  <https://arxiv.org/abs/2303.17651> and
  <https://arxiv.org/abs/2303.11366>.

## Consequences

- Explicit “loop engineering” requests can discover the existing bounded-task
  owner without adding another route.
- Original scope survives decisions, phases, replans, and reviews.
- Independent verification remains available where it changes assurance, but
  does not become mandatory fan-out.
- Continuous Work systems retain a clear separate boundary.

## Verification

- Routing fixtures distinguish bounded objective closure, explicit formal
  closure review, and continuous new-Work loops.
- Catalog generation reflects the two descriptions without introducing a new
  package.
- Existing repository checks, tests, package dry-run, and whitespace checks
  validate the exact candidate.
