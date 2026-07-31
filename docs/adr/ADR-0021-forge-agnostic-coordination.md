---
id: ADR-0021-forge-agnostic-coordination
status: accepted
date: 2026-07-28
decision_owner: SylphxAI
contributors: []
decision_mode: complementary
typed_scope:
  repository:
    - SylphxAI/skills
  capability_id:
    - forge-coordination
  surface:
    - agent
    - ops
amends: []
supersedes: []
relates: []
---

# ADR-0021: Forge-agnostic coordination boundary

> **Amended by ADR-0027.** Forge-agnostic Work coordination remains binding.
> Platform Candidate admission and verification watermarks are retired from the
> ordinary source/deploy model.

## Context

Agents briefly projected Enact Work lineage onto every product repository as
GitHub workflows, required status checks, and commit-status gates. That inverted
authority: projects must bind **to** the coordination platform; GitHub must not
carry coordination as product surface.

Platform product decision (sibling): Platform
`ADR-01KYE304DD0CD7DA4EA2BAE225` retires forge lineage projection. Enact may
privately link `source_revision → work_item_id` without making that link a Git
or Platform source-admission requirement.

## Decision

1. **Skills teach forge-agnostic coordination.** Agents never require
   `enact-work-lineage/*` workflows, rulesets, or public `Work: wi_…` text.
2. **Enact is work SSOT.** Git is code identity and source-integration
   authority. Platform owns build, promote, deploy, and deployment readback.
3. **Forbidden:** installing coordination CI into product repos as if it were
   universal Git hygiene; project-slug special cases in commercial PM surfaces.
4. **Required agent path:** Enact MCP work loop when available →
   repository-native direct-trunk or PR source integration → Platform
   build/deploy. External PR contribution does not require Enact.

## Consequences

- Runtime constitution and `enact-work-coordination` / `delivery-standard`
  packages must match this boundary.
- AutoSync projections must not reintroduce lineage forge gates.
- Historical evidence mentioning old checks remains historical only.
