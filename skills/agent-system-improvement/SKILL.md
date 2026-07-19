---
name: agent-system-improvement
description: "Improve a recurring agent-system failure through a causal Learning Change Record, controlled intervention, replay or holdout evidence, promotion criteria, and recurrence monitoring. Use when prompts, Skills, context assembly, tools, evals, coordination, or agent workflows repeatedly produce the same error, cost, delay, or weak outcome. Do not use for a one-off product-code bug, live incident response, ordinary task planning, or evaluation of one already-defined Skill candidate alone."
---

# Agent System Improvement

Turn repeated agent behavior into a tested system change, not another reminder.
Read [references/learning-system-methods.md](references/learning-system-methods.md)
before choosing the intervention and evaluation design.

## Method

1. Define the recurring outcome, affected population, impact, baseline rate,
   observation window, and evidence quality. Separate one incident from a
   repeatable class.
2. Trace the behavior through the whole agent system: objective, instruction,
   injected Skills, context and memory, model, tools, permissions, state,
   evaluator, coordination, and feedback. Do not assume the prompt is the cause.
3. Form competing causal hypotheses and identify the observation that would
   distinguish each one. Check whether the system is optimizing the wrong
   objective before adding more instruction.
4. Choose the smallest intervention at the owning layer. Change policy,
   procedure, context, tool contract, evaluator, or feedback only where the
   causal mechanism lives.
5. Freeze the baseline, candidate, expected effect, countermetrics, rollback,
   and promotion threshold. Use replay, a held-out task set, shadow execution,
   a bounded experiment, or live comparison appropriate to the claim.
6. Compare outcome, critical failures, cost, latency, and transfer across task
   and model families. Reject improvements that merely move the failure or
   overfit the observed examples.
7. Promote, revise, or revert. Record the exact changed artifact and install or
   deployment boundary. Monitor the original recurrence signal and retire
   superseded instructions or compensating workarounds.

## Output

Produce one **Learning Change Record** containing:

- recurring behavior, impact, population, baseline, and evidence;
- system map and competing causal hypotheses;
- selected owning cause and disconfirming evidence;
- intervention, exact candidate, expected mechanism, and alternatives rejected;
- evaluation design, countermetrics, critical failures, and results;
- promote, revise, or revert verdict with rollback;
- recurrence signal, review trigger, owner, and retained uncertainty.

## Boundaries

- Use `critical-analysis` when the primary job is diagnosing an uncertain cause.
- Use `skill-eval-designer` for a complete exact-candidate Skill evaluation;
  this skill owns why the agent system should change and whether the broader
  intervention solved the recurring problem.
- Use `optimization-objective-review` when the objective, reward, KPI, or
  evaluator may be creating the behavior.
- Use `incident-standard` to contain and recover a live incident. A post-incident
  recurring system change may then use this skill.
- Do not keep a review or delivery task open merely to observe indefinite
  improvement. Promote against the frozen threshold and monitor afterward.
