# Agent Skills model (industry-aligned)

This repository follows the open [Agent Skills](https://agentskills.io) model used by Claude, Codex, and peers.

## What a skill is

A skill is a folder with `SKILL.md` (required) plus optional `scripts/`, `references/`, and `assets/`.

It teaches an agent how to complete **one specialized job** it would otherwise do poorly or inconsistently:

- project- or product-specific procedures
- fragile multi-step workflows
- domain gotchas the base model lacks

It is **not**:

- a company policy encyclopedia
- an always-on constitution
- a dependency graph or meta-router
- a substitute for CI, RBAC, or live systems

## Progressive disclosure

1. **Metadata** — `name` + `description` listed at session start (budgeted).
2. **Instructions** — full `SKILL.md` body when the task matches.
3. **Resources** — references/scripts loaded only when needed.

Keep `SKILL.md` under ~500 lines. Move depth to `references/`. Prefer scripts when determinism matters.

## Always-on vs skills

| Layer | Home | Content |
| --- | --- | --- |
| Always-on | `runtime/constitution.md` | Miss-class-A floors only (authority, evidence honesty, fail-closed) |
| Skills | `skills/*` | On-demand specialized procedures |
| Product norms | Product repo `AGENTS.md` / docs | Stack pins, local commands, product decisions |
| Live authority | CI, deploy, RBAC, tools | Real effects and proofs |

## Catalog discipline

- Install a **small** set of high-value task skills.
- Descriptions must stay within host listing budgets (Codex ~8k characters class).
- Prefer fewer, deeper skills over many overlapping ones.
- Delete skills the agent does not need; do not invent routers to compensate.
- Prove value with real tasks: trigger correctly and improve outcomes.

## Authoring loop (industry)

1. Complete a real task with the agent; capture corrections and gotchas.
2. Extract one coherent job into a skill.
3. Write a specific description (what + when).
4. Keep the body concise and procedural.
5. Run real prompts; fix false triggers and weak steps.
6. Add scripts only when they beat fragile free-form generation.

## This repository

Sylphx ships:

- a thin always-on constitution
- a small public catalog of task skills with real procedures and helpers
- install adapters for Codex, Claude Code, and Grok Build

Long policy manuals and domain review matrices are out of scope for the skill catalog.
