---
name: design-space-exploration
description: "Generate and structure materially diverse solution concepts before selection. Use when asked to brainstorm, explore alternatives, map a design space, avoid premature convergence, or find unconventional architecture, product, policy, research, or operating approaches. Produce a Design Space Portfolio. Do not use to select the final option, diagnose which factual hypothesis is true, facilitate a stakeholder debate, or implement an already chosen design."
---

# Design Space Exploration

Expand the solution space deliberately before choosing. Read
[references/design-space-methods.md](references/design-space-methods.md) when
decomposition, parallel generation, coverage, or source detail matters.

## Workflow

1. State the desired outcome, users, system boundary, invariants, material
   constraints, and forbidden outcomes. Separate requirements from inherited
   implementation assumptions.
2. Reframe the problem from at least two credible perspectives. Do not generate
   a large option list for the wrong question.
3. Decompose the space into independent or weakly coupled dimensions such as
   ownership, state, interaction, deployment, economics, reversibility, and
   operating model. Add domain-specific dimensions rather than forcing this
   example taxonomy.
4. Generate materially different option families. Include the status quo,
   smallest viable change, orthogonal designs, a high-upside frontier design,
   and hybrids only where their mechanisms are coherent.
5. When parallel agents are available, give them different lenses or regions
   of the space. Independent constraints, analogies, failure models, or design
   philosophies produce more diversity than repeating one open prompt.
6. Normalize and cluster the results by mechanism. Merge cosmetic variants,
   preserve genuinely different causal structures, and expose combinations
   that violate constraints.
7. Map explored and unvisited regions, key assumptions, option dependencies,
   irreversible commitments, and the cheapest probe that could retire each
   important uncertainty.
8. Stop when another generation pass is unlikely to reveal a materially new
   family relative to its cost. Hand the portfolio to the appropriate decision
   process without silently choosing a winner.

## Output

Produce a **Design Space Portfolio**:

- **Challenge and boundary** — outcome, users, invariants, constraints, and
  rejected framings.
- **Exploration dimensions** — the axes used to structure coverage.
- **Option families** — mechanism, distinctive value, assumptions, failure
  modes, reversibility, and dependencies.
- **Coverage map** — explored, combined, invalid, and intentionally unvisited
  regions.
- **Discriminating probes** — cheap experiments, prototypes, research, or
  evidence that would reduce uncertainty.
- **Decision handoff** — choices still alive and the criteria or authority
  needed for selection.

## Boundaries

- Use `critical-analysis` to compare explanations about what is true.
- Use `structured-deliberation` when independent participants must exchange
  positions, objections, and dissent.
- Use `decision-quality-standard` to select and record the final material
  option.
- A list of minor feature variations is not a design space. Preserve options
  only when they differ in a decision-relevant mechanism, tradeoff, or future.
- Do not score options during initial generation unless a hard invariant makes
  one invalid; early ranking collapses diversity.
- Do not claim complete coverage. Record the bounded search and remaining
  regions honestly.
