---
id: ADR-20260803-betterment-outer-loop-vs-cycle-method
status: accepted
date: 2026-08-03
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-20260731T191027Z-continuous-product-quality-loop
  - ADR-20260802-outcome-leverage-betterment-cycle
scope:
  - static-instruction-packages
  - continuous-product-quality
  - agent-harness-boundary
---

# Betterment: outer harness loop vs cycle method skill

## Context

`continuous-product-quality` accumulated multi-cycle self-loop, soft-blocker
law, anti final-response rules, Goal binding, and product betterment method in
one Skill. Agents still end turns after cycle reports, soft-park high-EV work,
and confuse cycle checkpoints with outer product goals. Patch density rose while
behavior remained unstable.

Public harness research (2025–2026) separates layers that we had collapsed:

- **Agent harness** = model + tools + memory + sandbox + recovery + orchestration
  (everything except the weights). Skills are progressive method packages inside
  that system—not the scheduler.
- **Inner loop** = within a turn/session: gather context, tool, observe, repeat
  until the model emits a final text turn.
- **Outer loop** = across sessions/cycles: re-invoke, durable progress files,
  external done conditions, refusal to accept premature “done” (e.g. Anthropic
  long-running harness initializer + coding agent; Ralph-style re-kick loops;
  OpenAI harness engineering review/iterate until gates pass).

Encoding “while not engagement_idle: cycle++ without user final” primarily as
Skill prose fights the turn model: a final user-facing message ends the turn;
nothing restarts unless the **outer harness** does.

## Decision

### 1. Split ownership

| Concern | Owner | Not owner |
| --- | --- | --- |
| One betterment **cycle** method (coverage card, admit B, execute, verify, cycle log) | Skill (`continuous-product-quality` thinned to cycle method) | Runtime scheduler |
| Multi-cycle **engagement continuity** | Outer harness: Goal resume (insurance), automation/re-invoke, progress state file | Skill body “do not final-response” alone |
| Outer product acceptance / idle | Durable engagement brief + state (and Goal objective when present) | Cycle backlog list as goal text |
| Portable domain methods | Other Skills (compose) | One monotheistic OS skill |

### 2. Skill responsibility (method only)

`continuous-product-quality` (and any successor cycle skill) **owns**:

- What a high-leverage betterment **cycle** is
- Research coverage card, Candidate C, backlog B, residual R
- Leverage / MinOutcomeDelta / qualified blockers (truthful parking only)
- Verify cadence and cycle Stop-Audit fields
- Explicit **handoff artifact** for the next invoke (state delta)

It **does not own**:

- Guaranteeing another turn starts after a cycle report
- Replacing missing Goal API with prose self-loop as the sole motor
- Infinite in-turn cycling as a portable skill contract

### 3. Outer harness responsibility (continuity)

Engagement continuity **must** be provided by at least one of:

1. **Re-invoke runner** (script/automation/Ralph-style): while not
   `engagement_idle(state): run agent(cycle skill + state)`
2. **Harness Goal** as **insurance**: uncapped outer objective; resume after
   accidental stop—not the only motor
3. **Durable state** (`progress` / PQLC operating state): next action, B/R,
   last cycle id, outer acceptance

Preferred shape (industry-aligned):

```text
initializer (once): engagement brief + state skeleton + optional goal
loop:
  coding/betterment agent: one cycle → update state → commit/log
  outer check: engagement_idle? stop : re-invoke
```

### 4. Communication boundary

- Cycle complete → write state; **short or no user essay**; outer runner continues
- User-facing final → engagement idle, true hard external wait, or user stop
- “要開 Cycle N+1 嗎？” is **not** a control protocol when a runner exists

### 5. Migration

1. Publish this ADR (normative boundary).
2. Thin CPQ skill intro: cycle method + pointer to outer loop; stop claiming
   skill-alone eternal self-loop.
3. Add reference: engagement state schema + runner contract
   (`docs/reference/betterment-engagement-runner.md`).
4. Do **not** keep stacking soft-blocker epicycles as the primary reliability path.
5. Optional later: rename/split packages (`product-betterment-cycle`) without
   blocking the boundary decision.

### 6. Non-goals

- Replacing Codex/Claude host agent loops
- Requiring Enact for all betterment
- Abandoning the skills repository (methods remain portable Skills)

## Consequences

- Reliability of “keep going” becomes a **runner/goal/state** problem—testable
  without arguing with final-answer behavior.
- Skills stay short enough for progressive disclosure and listing budgets.
- Agent-facing jobs match reality: “run one cycle well and leave state,” not
  “violate turn boundaries forever.”
- Residual: products must adopt a runner (or accept human/goal re-kick) for
  true multi-cycle engagement.

## Verification

- ADR accepted and linked from CPQ skill.
- Runner reference exists with idle predicate and state fields.
- CPQ skill no longer claims skill-alone multi-cycle motor as portable contract.
- Future CPQ changes prefer method quality over anti-stop epicycles.

## Research basis (non-exhaustive)

- Anthropic: Effective harnesses for long-running agents; harness design for
  long-running application development; Managed Agents (session/harness/sandbox)
- OpenAI: Harness engineering (agent-first workflows, review loops, progressive
  disclosure of repo knowledge)
- Industry: outer loop ownership; Ralph-style re-kick; progress files + external
  done conditions; skills as progressive method packages
