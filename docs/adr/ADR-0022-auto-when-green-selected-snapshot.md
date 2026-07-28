---
status: accepted
date: 2026-07-28
owners: [SylphxAI]
---

# ADR-0022: Auto-when-green on selected verified snapshot

## Context

Agent fleets need both high throughput and high availability without human
merge gates. Industry continuous delivery converges on build-once digest
promotion, progressive delivery, and automatic promote/rollback on machine
evidence—not tip-follows-main.

Platform product decision (sibling): Platform
`ADR-01KYEDEPLOYMODEL01`.

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
