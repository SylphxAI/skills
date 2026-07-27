---
status: accepted
date: 2026-07-27
owners:
  - SylphxAI
work: wi_01KYGS75KP8D954HGFDJYKXT94
source: https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
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

`autonomous-execution-standard` already owns whether a subagent should be used
and the outcome-owned subagent contract. `prompt-architecture` needs the same
specificity boundary for every agent-to-agent brief, including executors,
reviewers, specialists, and subagents.

## Decision

1. `prompt-architecture` owns capability-calibrated specificity for every
   agent-to-agent task brief. `autonomous-execution-standard` continues to own
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
7. Deterministic fixtures protect this policy boundary but do not claim that
   every runtime or model follows it. Runtime behavior needs separate
   exact-candidate evaluation when such a claim is material.

## Consequences

- Agent briefs remain concise without becoming vague.
- Capable agents retain ownership of investigation, implementation, sequencing,
  and local replanning.
- Safety-critical and machine-consumed procedures retain exact constraints
  where they matter.
- No new Skill, router, model-specific policy fork, or blanket ban on
  step-by-step instructions is introduced.

## Verification

- `tests/prompt-architecture.test.mjs`
- `tests/fixtures/agent-brief-specificity-cases.json`
- `tests/delegation-policy.test.mjs`
- `npm test`
