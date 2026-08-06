# Agent-System Learning Methods

## Improvement unit

A useful intervention binds four different objects:

| Object | Meaning |
| --- | --- |
| Recurrence | A measured class of agent-system behavior, not one anecdote |
| Causal hypothesis | The system mechanism expected to produce the behavior |
| Intervention | An exact change to an owning prompt, Skill, context rule, tool, evaluator, workflow, or feedback path |
| Learning evidence | A comparison capable of promoting, revising, or reverting the intervention |

Keep product outcome, agent behavior, and evaluator score separate. A score can
improve while user outcome or transfer degrades.

## Single-loop and double-loop change

Use single-loop correction when the objective and governing assumptions remain
valid: fix an instruction ambiguity, tool error, missing context field, or weak
test. Use double-loop correction when repeated failure indicates that the goal,
assumption, boundary, incentive, or evaluation system itself is wrong.

Do not keep adding reminders around a bad objective. Conversely, do not redesign
the whole operating model when a local contract defect explains the recurrence.

## Causal system map

Trace the observed behavior across:

```text
objective / incentive
  -> instruction and injected Skills
  -> retrieved context and memory
  -> model and decoding/runtime
  -> tools, permissions, and environment
  -> coordination and external state
  -> evaluator and feedback
  -> retained learning
```

For every plausible cause, record expected evidence, disconfirming evidence,
and whether causes may interact. Prefer a discriminating intervention over a
large bundle whose successful component cannot be identified.

## Evaluation choices

- **Historical replay:** deterministic or captured prior tasks; fast, but may
  preserve historical selection bias.
- **Held-out task set:** useful for instruction, context, tool-use, and evaluator
  changes; keep it separate from examples used to author the intervention.
- **Shadow execution:** compare behavior without granting candidate effects.
- **Randomized or stepped comparison:** use when environments and populations
  permit causal comparison.
- **Bounded live rollout:** use only when offline evidence cannot represent the
  material external interaction; bind exposure and rollback first.

Report critical failures and per-cluster effects, not only a mean. Test transfer
across materially different tasks, runtimes, and model families when the change
claims broad improvement. Retain a control that distinguishes the intervention
from extra tokens, tools, or compute.

## Promotion and recurrence

A promotion rule should state:

- minimum outcome improvement and protected floors;
- critical failures that veto promotion;
- maximum cost and latency regression;
- transfer populations required;
- rollback mechanism;
- observation that marks the proof stale; and
- recurrence metric checked after promotion.

Monitoring is not permission to postpone a decision indefinitely. Promote or
revert against the frozen contract, then continue learning from later evidence.

## Research basis

- Chris Argyris distinguishes error correction within existing governing values
  from double-loop examination of the values themselves:
  <https://hbr.org/1977/09/double-loop-learning-in-organizations>
- The Deming Institute describes PDSA as theory-and-prediction-driven iterative
  learning rather than a generic checklist:
  <https://deming.org/explore/pdsa/>
- Google SRE's postmortem method links evidence, contributing causes, and owned
  corrective action without making blame the learning mechanism:
  <https://sre.google/sre-book/postmortem-culture/>
- Process mining reconstructs and compares real process behavior from event data
  rather than relying only on the intended workflow:
  <https://doi.org/10.1007/978-3-662-49851-4>
- NIST AI RMF's Measure function covers test, evaluation, verification,
  validation, monitoring, and documented uncertainty across the lifecycle:
  <https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Measure>
