---
status: accepted
date: 2026-07-18
owners:
  - SylphxAI
---

# ADR-0004: Name instruction packages after the work they perform

## Context

Repeated agent generation spread a small set of internal terms across unrelated
packages. Words such as “fleet,” “mission control,” “factory,” “roleless,” and
“SOTA” became route names or boilerplate even when the subject was simply
repositories, work coordination, technology selection, or decision quality.
The result sounded branded and militarized, obscured package triggers, and made
ordinary engineering choices look like proprietary concepts.

## Decision

1. Package names and descriptions lead with the user job or accepted artifact.
2. Requirements are stated directly in subject-matter language.
3. `fleet` is reserved for a literal managed population of devices, machines,
   deployed services, or agents.
4. The company name appears only for products, legal/provenance ownership,
   repository locators, and selectors that need it.
5. Exact technical terms such as source of truth, authority, canonical form,
   and convergence remain valid only where their precise meaning matters.
6. Repository-level ownership and requirement posture are not repeated in every
   package entrypoint.

## Consequences

- Existing internal route names are replaced rather than kept as discoverable
  aliases; Git history preserves lineage.
- Literal external API identifiers and established industry terms may remain
  when renaming them here would be inaccurate.
- This is a writing and routing rule, not a new terminology gate or review
  service.
