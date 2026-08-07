---
id: ADR-0022-auto-when-green-selected-snapshot
status: superseded
date: 2026-07-28
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - auto-deploy
---

# ADR-0022: Auto-when-green on selected verified snapshot

> **Superseded by ADR-0027.** The selected-snapshot, scoped-watermark, and
> Platform-selected landing model below is retained as historical rationale,
> not current instruction.

## Context

Agent fleets need both high throughput and high availability without human
merge gates. Industry continuous delivery converges on build-once digest
promotion, progressive delivery, and automatic promote/rollback on machine
evidence—not tip-follows-main.

Platform product decision (sibling): Platform
`ADR-01KYEDEP0YAT0WHENGRN000001`.

## Decision

1. Canonical deploy teaching phrase: **auto-deploy on verified selected
   snapshot** (`auto_deploy` + `auto_when_green` + green watermark +
   selected-snapshot coalesce + exact digest).
2. Under enforce, **main tip is never deployment authority**.
3. Agents release capacity after Candidate accept/land; use `work.defer` for
   external CI/promote/soak waits.
4. Optimistic **build/concurrency** is allowed; optimistic **unwatermarked
   promote** is forbidden.
5. Skills remain general — no Customer Zero / project-slug deploy privileges.

## Consequences

- `delivery-standard` owns the agent-facing ladder.
- Progressive canary analysis remains risk-matched evidence, not a human
  dashboard ritual.
