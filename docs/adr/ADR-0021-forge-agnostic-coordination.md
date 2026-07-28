---
status: accepted
date: 2026-07-28
owners: [SylphxAI]
---

# ADR-0021: Forge-agnostic coordination boundary

## Context

Agents briefly projected Enact Work lineage onto every product repository as
GitHub workflows, required status checks, and commit-status gates. That inverted
authority: projects must bind **to** the coordination platform; GitHub must not
carry coordination as product surface.

Platform product decision (sibling): Platform
`ADR-01KYE304DD0CD7DA4EA2BAE225` retires forge lineage projection while keeping
private Candidate `source_revision → work_item_id` admission inside Platform.

## Decision

1. **Skills teach forge-agnostic coordination.** Agents never require
   `enact-work-lineage/*` workflows, rulesets, or public `Work: wi_…` text.
2. **Enact is work SSOT.** Git is code identity. Platform is Candidate /
   verification watermark / promote / deploy SSOT.
3. **Forbidden:** installing coordination CI into product repos as if it were
   universal Git hygiene; project-slug special cases in commercial PM surfaces.
4. **Required agent path:** Enact MCP work loop → private Candidate publish →
   Platform land/promote. Forge PR is optional compatibility ingress only.

## Consequences

- Runtime constitution and `enact-work-coordination` / `delivery-standard`
  packages must match this boundary.
- AutoSync projections must not reintroduce lineage forge gates.
- Historical evidence mentioning old checks remains historical only.
