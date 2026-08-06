---
id: ADR-20260731-commodity-library-build-vs-adopt
status: accepted
date: 2026-07-31
decision_owner: SylphxAI/skills
supersedes: []
amends:
  - ADR-20260730T204546Z-adopt-before-invent
scope:
  - engineering-methods
---

# Compare mature libraries with direct code by lifecycle cost

## Context

The existing adopt-before-invent rule prefers established mechanisms, but the
smallest-solution ladder placed a direct local implementation before every new
dependency. Agents could therefore interpret dependency count as the cost
function and reimplement commodity parsers, protocol clients, serialization,
or security-sensitive behavior even when a mature maintained library removed
substantial correctness and maintenance ownership.

The inverse rule, "always add a library", is also wrong. A large or abandoned
dependency can create more supply-chain, compatibility, runtime, licensing, and
maintenance surface than a small stable local function.

## Decision

1. No new Skill is created. Scope Discipline owns right-sizing, Decision
   Quality owns build-versus-adopt comparison, Engineering owns implementation
   quality, and Dependency Version Selection starts after adoption is chosen.
2. For uncovered commodity functionality, agents compare an established,
   actively maintained ecosystem library or reference implementation with the
   smallest direct local implementation that satisfies the same contract.
3. Selection uses total lifecycle cost and the declared quality floor, including
   correctness, security response, API stability, interoperability, licensing,
   transitive supply chain, runtime cost, edge-case ownership, maintenance, and
   replacement.
4. Mature libraries are preferred when they remove non-trivial standards,
   protocol, parser, serialization, security, or compatibility ownership.
   Direct local code is preferred when the behavior is genuinely small and
   stable and the dependency would create the larger lifecycle surface.
5. Custom frameworks, wrappers, services, or controls still require a named
   unmet requirement and an observable advantage over the closest established
   option. "We can build it" and "one fewer dependency" are not sufficient
   evidence.
6. This is a semantic decision rule, not a dependency-count gate, package
   allowlist, source scanner, or new CI workflow.

## Consequences

- Agents search existing and established implementations before taking
  permanent ownership of commodity machinery.
- Dependency avoidance can no longer masquerade as simplicity, while trivial
  behavior is not forced into an unnecessary package.
- Existing repository tests and catalog generation remain the only delivery
  checks; no new governance mechanism is introduced.
