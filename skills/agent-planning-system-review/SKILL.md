---
name: agent-planning-system-review
description: "Design or audit the planning and control mechanism of an autonomous agent or multi-step agent workflow, producing an Agent Planning and Control Contract. Use when choosing or evaluating BDI, HTN, partial-order or causal-link planning, Plan-and-Execute, ReAct, receding-horizon control, bounded search, replanning, execution monitoring, or stop conditions. Do not use merely to plan one ordinary task, schedule a current work queue, design agent memory, or review a finished code candidate."
---

# Agent Planning System Review

Produce an **Agent Planning and Control Contract** for a reusable autonomous
system. Read
[references/planning-and-control-methods.md](references/planning-and-control-methods.md)
before selecting a planning family.

## Method

1. Define the environment: objective, observable state, available actions,
   hard constraints, uncertainty, reversibility, effect authority, and cost of
   delay or failure.
2. Separate goal selection, plan construction, action selection, execution,
   observation, and replanning. Name the owner of each transition.
3. Choose the least complex planning family that satisfies the environment:
   reactive interleaving, plan-and-execute, hierarchical decomposition,
   partial-order planning, deliberative intention management, or a hybrid.
4. Define plan state explicitly: goals, preconditions, effects, dependencies,
   causal links, invariants, resource bounds, commitments, and uncertainty.
5. Bind every action to an observation and outcome check. Never infer success
   merely because an action or tool call returned.
6. Specify invalidation and replan triggers: changed world state, failed
   precondition, blocked dependency, contradictory observation, budget breach,
   new higher-value work, or irreversible-effect boundary.
7. Bound search and deliberation by value of information, time, compute,
   branching, and risk. Define when to act, replan, escalate, degrade, or stop.
8. Test with nominal traces, stale-plan races, partial failure, conflicting
   goals, unavailable tools, deceptive success signals, and non-terminating
   loops.

## Output

Create an **Agent Planning and Control Contract** with:

- objective, state model, action model, and operating assumptions;
- selected planning family and rejected alternatives;
- goal, intention, hierarchy, dependency, and resource semantics;
- observation-action-verification loop;
- plan validity, commitment, cancellation, and replanning rules;
- search, time, token, cost, and effect budgets;
- progress, deadlock, oscillation, and stop predicates;
- escalation and safe-effect boundaries; and
- executable scenarios, traces, simulations, or properties used as evidence.

## Design rules

- Prefer causal and dependency structure over a brittle total sequence when
  independent actions may run in parallel.
- Use hierarchy to encode meaningful reusable task structure, not to hide an
  unbounded chain of prompts.
- Commit only while the intention remains justified; neither replan on every
  observation nor follow a stale plan blindly.
- Use receding-horizon control when distant state is uncertain: execute a
  bounded prefix, observe, and solve again.
- Treat ReAct-style reasoning and action interleaving as an execution pattern,
  not proof that the resulting plan is valid or complete.
- Do not add an optimizer, planner, or coordinator when a deterministic state
  machine or direct procedure is sufficient.

## Boundaries

- Use `autonomous-execution-standard` to run and reschedule the current task
  portfolio; this skill designs the reusable planning mechanism itself.
- Use `work-coordination-standard` for portable claim, lease, handoff, and
  shared-ledger semantics; use the matching product adapter for live state.
- Use `agent-context-engineering` for context assembly and memory lifecycle.
- Use `decision-optimization-modeling` when the primary artifact is a
  constrained allocation, routing, scheduling, or capacity model rather than
  the agent's reusable planning and control mechanism.
- Use `convergent-review` for final review closure of an exact implementation.
