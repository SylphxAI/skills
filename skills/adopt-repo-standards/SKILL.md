---
name: adopt-repo-standards
description: "Adopt engineering baseline into a repo: constitution, manifest, fences."
---

# Adopt Repo Standards

When you need to **bring a concrete repository onto the engineering baseline**
(constitution, project facts, fences, conformance entrypoints), run **one
adoption** cycle—not a permanent dual instruction stack.

## When to use

- New or existing product repo needs Skills-aligned engineering baseline
- Predecessor instruction layouts / dual standards must be retired
- Manifest, fences, and conformance entrypoints are missing or stale

## Method

**Required surfaces → wire entrypoints → verify → hard-cut predecessor layouts.**

### 1. Frame
- Target repo and delivery terminal
- Required surfaces (constitution projection, project.manifest, fences, checks)
- Predecessor instruction sources to retire

### 2. Research
- What is already present vs missing (read repo; do not invent authority)
- Depth: [references/full-standard.md](references/full-standard.md)
- When wiring project facts: open [references/project-manifest-standard/](references/project-manifest-standard/)
- When choosing stack/profile fences: open [references/enterprise-profile-standard/](references/enterprise-profile-standard/) and [references/enterprise-control-plane-standard/](references/enterprise-control-plane-standard/) as needed
- For implementation shape constraints applied *while adopting*, open sibling depth under other workflows only if this adoption must implement product code:
  - `../build-product/references/engineering-standard/`
  - `../select-dependency-versions/references/technology-stack-profile/`
- Stop when more reading will not change the adoption set

### 3. Admit work
- **In:** missing required surfaces, broken entrypoints, predecessor retirement
- **Out:** unrelated product features; forever dual AGENTS layouts

### 4. Implement
- When landing source for this adoption: open `../drive-to-delivery/references/source-authoring-standard/` (**L1** batch, **L2** atomic commits, **L3** revert-safe PR outcome)
- Install/update required baseline surfaces on the owning paths
- Prefer hard-cut of predecessor instruction layouts (see `execute-hard-cutover`)
- Apply constraint depth as **constraints on the adoption artifact**—do not copy entire standards into the product repo

### 5. Deliver / verify
- Entrypoints resolve; conformance checks run as declared
- Predecessor dual layout **deleted** (or reduced to a one-way no-write adapter
  with exact retirement under eng-hard-cut-01 gates only)
- A residual is truthful incomplete **status**, not permission to keep dual
  instruction authority or a second system
- Local vs landed claims stay honest

## Cycle done

Adoption cycle is done when required surfaces exist, entrypoints work, and
predecessor dual instruction authority is **retired** for the framed scope.
Dated residual language does not complete dual-layout retirement.

## Progressive disclosure

1. [references/full-standard.md](references/full-standard.md) — adoption surfaces and retirement method
2. [references/project-manifest-standard/](references/project-manifest-standard/) — project facts schema and placement
3. Other packs only when the step above says so (owned by the workflow that applies them)

## Boundaries

- Does not grant deploy or credential capabilities.
- Does not own every org constraint pack; those live under the workflows that apply them.
- Does not replace product-local ADRs where those own decisions.
