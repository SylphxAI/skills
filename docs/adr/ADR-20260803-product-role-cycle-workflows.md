---
id: ADR-20260803-product-role-cycle-workflows
status: accepted
date: 2026-08-03
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - static-instruction-packages
  - prototype-product
  - build-product
  - maintain-product
  - expand-product
  - finish-product
  - pursue-product-objective
---

# Product job-cycle workflows

## Context

Product work is not one method. Learning, shipping capability, cutting harm,
scaling, and finishing need different admit rules and done criteria. Skills must
describe **how to do that job for one cycle**, not how many agents to run or
what “role” an agent plays.

## Decision

Provide separate **workflow** Skills for distinct **job kinds**:

| Skill | Job this cycle |
| --- | --- |
| `prototype-product` | Validate a hypothesis with a cheap real probe |
| `build-product` | Close a shippable capability gap |
| `maintain-product` | Reduce framed live/regression harm |
| `expand-product` | Scale a validated core (×N) |
| `finish-product` | Deburr/finish an integrated product |
| `pursue-product-objective` | Pursue a declared product objective to evidence-backed completion |

Each Skill: Frame → Research → Admit → Implement → Deliver/Verify → Cycle-done.

### Non-goals of these Skills

- Multi-agent orchestration, spawn counts, or role casting
- Multi-cycle “loop OS” / host goal tool names
- A meta-router over the catalog

Who runs the Skill (one agent or many) is a **host/runtime** choice. The Skill
only answers: **given this job, how do you run one cycle?**

### Relation to better-product

Use a job Skill when the work is clearly that job. Use
`pursue-product-objective` when a fixed outcome must be pursued until met. Use
`better-product` when betterment mixes jobs with no fixed objective.

## Consequences

- Progressive disclosure stays job-shaped and portable
- Agents load methods without being told staffing
- Catalog avoids role-noun packages that read like org charts

## Verification

- Five job Skills exist with one-cycle methods
- No spawn/role staffing instructions in those Skill bodies
- `finish-product` remains the sole finish entry
