---
id: ADR-20260801T010819Z-simple-surface-deep-capability
status: accepted
date: 2026-08-01
decision_owner: SylphxAI/skills
supersedes: []
amends:
  - ADR-0028-right-sized-agent-work-and-communication
  - ADR-20260730T204546Z-adopt-before-invent
scope:
  - engineering-architecture
  - bound-task-scope
  - agent-communication
---

# Prefer simple surfaces with deep owned capability

## Context

Agents can generate layers, terms, diagrams, and mechanisms faster than their
value can be understood. A design may therefore look sophisticated while its
observable capability is unchanged, its primary path is harder to explain, and
every future agent or human must repeatedly pay the resulting comprehension
cost.

Pure minimization is not the answer. A system can be short yet brittle when it
hides domain invariants, state authority, failure handling, security, recovery,
or an accepted contract. The useful target is a small coherent model with the
full required capability and quality floor.

## Decision

1. Prefer the smallest coherent set of concepts that preserves the complete
   capability, correctness, security, reliability, maintainability, and
   delivery contract.
2. Keep public interfaces and primary workflows simple. Place necessary domain,
   distributed-systems, and operational complexity behind narrow owned
   boundaries with explicit contracts.
3. An added concept, layer, or named mechanism must own a distinct capability,
   contract, state authority, failure or lifecycle boundary, or material
   measurable quality improvement. Otherwise fold it into the existing owner
   or delete it.
4. A system should be explainable first through one accurate primary causal
   path: intent or input, owning capability, decision or state authority,
   effect, observable outcome, and recovery where material. Branches and deeper
   mechanisms remain available through progressive disclosure. The explanation
   is a navigation aid, not a second authority and not permission to falsify a
   genuinely branching or asynchronous system.
5. Simplicity is not measured by raw lines, files, services, dependencies, or
   pattern count. Necessary types, validation, observability, recovery, and
   semantic boundaries remain. The aim is to pay unavoidable complexity once
   inside its owner rather than expose it to every consumer.
6. `engineering-standard` owns the architecture invariant,
   `bound-task-scope` owns the selection test, and
   `write-high-signal-update` owns its explanatory projection. No new Skill,
   branded architecture, prose scanner, or CI gate is introduced.

## Consequences

- Agents and humans can understand the common path before drilling into edge
  cases and implementation detail.
- Deep capability and future-proof boundaries remain compatible with a simple
  product and programming surface.
- Decorative wrappers, renamed standard mechanisms, and layers without an
  observable delta become explicit deletion candidates.
- Review challenges both over-engineering and under-engineering against the
  same complete contract.

## Verification

- The three owning standards express architecture, selection, and communication
  obligations without duplicating one procedure.
- Existing repository integrity, catalog generation, package dry-run, and
  whitespace checks validate the source candidate.
- No package, runtime service, workflow, or prose-presence gate is added.

