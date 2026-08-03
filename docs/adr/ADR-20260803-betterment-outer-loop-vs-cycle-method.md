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

# Betterment: Goal continuity vs cycle method skill

## Context

`continuous-product-quality` mixed cycle method with multi-turn continuity. A
later draft over-corrected by demoting the **Goal System** to “insurance only”
and pushing **automation re-kick** as the default outer loop. That is a
**UX regression** on Codex: operators already get multi-hour runs from one press
when an uncapped Goal is active.

Codex Goals (public docs, 2026): thread-scoped persistent objective; after a turn
finishes, if the thread is idle, the Goal is active, and budget allows, the host
can continue; complete only with evidence; budget stop ≠ complete; no-tool
continuation can suppress the next auto-continue.

## Decision

### 1. Split ownership (corrected)

| Concern | Owner |
| --- | --- |
| One betterment **cycle** method | Skill (`continuous-product-quality`) |
| **Multi-turn continuity on Codex** | **Uncapped Goal** (primary motor) |
| Optional durable B/R notes | Product state/contract file |
| Continuity when Goal API absent | In-process tool loop; then manual re-kick; automation last |

### 2. Skill responsibility

Owns: coverage card, C/B/R, leverage, verify, when Goal may complete/block, cycle quality.

Does **not** own: inventing heartbeat automation as the happy path on Goal hosts.

### 3. Goal responsibility

- **Agent** creates/resumes Goal on Skill invoke (user does not author it)
- Goal text is a **fixed continuity template** (“keep high-leverage betterment
  until engagement idle”), not a user product brief or per-cycle backlog
- **No default token budget**
- Host continuation across idle turns while active
- Product/repo discovery happens in cycle research, not Goal authorship
- `complete` only at engagement idle with evidence (idle ≠ perfection)

### 4. Communication

- Prefer tools + next cycle over long “Cycle N 報告”
- Never “要開 Cycle N+1 嗎？” while Goal active
- User-facing final at idle, true hard wait, or user stop

### 5. Non-goals

- Replacing host Goal implementation
- Requiring Enact for all betterment
- Abandoning portable Skills

## Consequences

- One-press multi-hour runs return on Codex via Goal
- Skills stay method-focused
- Automation remains available as degraded fallback only

## Verification

- CPQ requires uncapped Goal bind when API present
- Docs do not prescribe automation as default on Codex
- Idle/complete rules remain evidence-based

## Research basis

- OpenAI Cookbook: Using Goals in Codex (continuation from idle thread; budget; evidence complete)
- OpenAI: Harness engineering / long-running agent patterns
- Industry Ralph-style keep-goal-alive loops
