---
id: ADR-0017-capability-calibrated-agent-briefs
status: accepted
date: 2026-07-27
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - agent-briefs
---

# ADR-0017: Calibrate agent briefs to capability without prescribing the implementation

## Context

Current agent models can inspect repositories, form and test hypotheses, choose
tools, and replan. A parent-written step-by-step implementation recipe can
therefore anchor a receiving agent to an unverified diagnosis, hide the real
outcome, and make ordinary environmental change look like a blocker.

Removing detail indiscriminately creates the opposite failure: a vague request
without scope, authority, acceptance evidence, or safety boundaries does not
transfer usable ownership. Vendor or marketing labels such as `SOTA` also do
not establish the recipient's actual tools, access, context, or task
capability.

`autonomous-execution` already owns whether a subagent should be used
and the outcome-owned subagent contract. `prompt-architecture` needs the same
specificity boundary for every agent-to-agent brief, including executors,
reviewers, specialists, and subagents.

## Decision

1. `prompt-architecture` owns capability-calibrated specificity for every
   agent-to-agent task brief. `autonomous-execution` continues to own
   whether delegation is eligible.
2. Treat a recipient with task-appropriate tools, access, and discoverable
   context as a capable reasoning peer by default. Calibrate extra detail to an
   observed material limitation, not to historical human implementation cost
   or an unverified model-ranking label.
3. Start with the outcome, scope and non-goals, binding constraints, authority
   or discovery pointers, and acceptance evidence.
4. Omit ordinary implementation choices, fixed command sequences, exhaustive
   file lists, preselected diagnoses, and the author's private reasoning trace
   by default.
5. Bind method, order, or exact format only when it is itself part of
   correctness, safety, reproducibility, collision control, regulation, or a
   machine-consumed contract. State the exact mandatory segment and reason.
6. A prompt cannot grant a missing tool, permission, authority, source, or
   runtime capability. Expose or resolve the gap instead of replacing it with
   more prose.
7. Authored fixtures illustrate this policy boundary but are not a blocking
   oracle. Runtime behavior needs separate exact-candidate evaluation when such
   a claim is material.

## Consequences

- Agent briefs remain concise without becoming vague.
- Capable agents retain ownership of investigation, implementation, sequencing,
  and local replanning.
- Safety-critical and machine-consumed procedures retain exact constraints
  where they matter.
- No new Skill, router, model-specific policy fork, or blanket ban on
  step-by-step instructions is introduced.

## Verification

- `tests/fixtures/agent-brief-specificity-cases.json` and
  `tests/fixtures/delegation-policy-cases.json` remain non-blocking evaluation
  corpora.
- A promotable prompt or delegation behavior claim requires an exact Skills
  revision native-agent evaluation.
- Repository CI verifies package/catalog integrity and executable runtime
  behavior; it does not compare policy prose with a duplicated expected answer.
