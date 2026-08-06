---
id: ADR-20260731-thin-dual-layer-progressive-instruction-system
status: accepted
date: 2026-07-31
decision_owner: SylphxAI
supersedes: []
amends:
  - ADR-0009-native-skill-discovery-and-package-boundaries
  - ADR-0011-source-verified-native-skill-discovery
  - ADR-20260720-agent-owned-installation-and-constitution
scope:
  - static-instruction-packages
  - runtime-constitution
  - skill-utilization
---

# Thin dual-layer progressive instruction system

> **Amended by [ADR-20260805](ADR-20260805-retire-enact-from-active-instructions.md).**
> The thin-layer decision remains in force, but the former Enact-specific L0
> bind line and all integration-specific authority clauses are retired.

## Context

Agent hosts (Codex, Claude Code, Grok Build, Copilot, Cursor) converge on
**progressive disclosure** for Skills: name and description are listed first;
`SKILL.md` bodies and references load only when selected. The same hosts keep a
separate **always-on** channel (`AGENTS.md`, custom instructions, Rules).

Sylphx previously projected a dense operating-loop constitution into always-on
instruction files. That layer is the correct *class* (miss-class-A floors that
must not depend on skill routing), but the prior thickness was under-defended:

- Host skill-listing budgets (for example Codex at most ~2% of context, or
  8,000 characters when the window is unknown) can shorten or omit
  descriptions when catalogs are large. Installing many packages does not make
  every description fully effective.
- Skill selection is model-mediated. A body cannot rescue a false-negative
  description. Installation and catalog integrity do not prove utilization.
- Always-on context is prime real estate. Domain procedures (full Enact
  sequences, deploy models, CI cancel policy, design-method essays) belong in
  Skills, not every session.
- Public MIT install must not inject full Sylphx fleet doctrine by default.
  Fleet-specific bind-before-mutate guidance is conditional.

This decision freezes L0 membership, budgets, claim discipline, and residuals.
It does not invent a portable meta-router.

## Decision

1. **Architecture.** Sylphx adopts a thin dual-layer progressive instruction
   system plus live systems that markdown cannot replace:

   | Layer | Content | Load |
   | --- | --- | --- |
   | L0 | Miss-class-A floors only | Always-on host persistent instructions |
   | L0-fleet | One-line Enact bind-before-mutate | Only when authenticated Enact tools are present or fleet floors are explicitly opted in |
   | L1 | Skill `name` + `description` | Host listing, subject to listing budgets |
   | L2 | Skill bodies, references, scripts | On-demand via native discovery or explicit invoke |
   | L3 | Enact, CI, deploy, RBAC, tools | Live systems; not markdown authority |

2. **Default public L0.** Universal floors only. Authored source is
   `runtime/constitution.md`. It must encode the frozen inventory: authority
   map; fail-closed evidence and Done boundaries; non-fabrication of missing
   live authority; non-interference; irreversible/credential caution; runtime
   mutation non-authority; native skill discovery with no meta-router;
   progressive disclosure; always-on floors-only rule; checkpoint-versus-
   delivery-terminal progress. Full OAuth, `work.defer` sequences, forge and
   deploy policy detail, CI cancel policy, delegation calculus, and
   communication style guides are **not** default L0.

3. **Fleet-conditional L0.** At most one short reminder: when authenticated
   Enact tools are available, bind substantive multi-agent or long-running
   objectives to claimed Work before that objective's mutation, and follow
   `coordinate-enact-work` / work-coordination Skills for the procedure.

4. **Hard L0 budget.** Target ≤ ~900 tokens (approx. chars/4); ceiling 1,500
   tokens. Structural checks enforce a character ceiling derived from that
   budget. New L0 bullets require the admission test: decision-point,
   severity, non-duplication with hard enforcement agents already observe,
   size fit, and a retirement predicate.

5. **Catalog listing budget is a product constraint.** Package count and
   description length are designed under host listing budgets. Prefer shorter
   front-loaded descriptions, retire dead packages, and avoid mega-merges
   without routing eval. Catalog consolidation is a hypothesis, not a free
   optimization. See `history/docs-reference/catalog-listing-budget-policy.md`.

6. **Utilization is a product residual, not an install claim.** Installation,
   AutoSync green, and authored fixtures do not prove agents open or follow
   Skills. Behavior-oracle utilization eval (pinned Skills revision and
   runtimes; floor / critical-skill / abstention suites) is required before
   claiming acceptable automatic use. Load traces are optional when hosts
   expose them. See `history/docs-reference/skill-utilization-eval-residual.md`.

7. **No portable meta-router.** Native host discovery remains the selection
   mechanism. Do not add a Sylphx keyword engine, skill dependency graph, or
   central router as a portable contract.

8. **Claim discipline without ablation.** This architecture may be asserted
   without multi-runtime ablation. Without ablation and utilization smoke,
   do **not** claim L0 token-optimality, catalog correctness at a fixed
   package count, solved automatic utilization, or task-quality superiority
   of managed install over stock AGENTS.md + Skills.

9. **Managed install remains distribution authority.** Agent-owned install,
   digest-bound constitution projection, multi-runtime reconcile, and AutoSync
   remain the distribution mechanism (ADR-20260720). They prove distribution
   and reconcile outcomes, not cognition quality.

10. **Absorption rule for later ADRs.** When a later decision needs always-on
    force, it must pass the L0 admission test and the hard budget. Otherwise
    project into Skills (and ADRs), not `runtime/constitution.md`. Prior ADRs
    that said dense operating-loop text is "absorbed by the constitution" are
    amended: only their **miss-class-A compact floors** remain always-on; full
    methods stay in Skills.

## Consequences

- Always-on context shrinks; domain depth moves to progressive Skills.
- Public default install stays portable and thinner for non-fleet consumers.
- Fleet agents still get a conditional Enact bind reminder when tools exist.
- Catalog authors must treat listing budgets as real capacity, not infinite.
- Release claims about utilization require behavior-oracle evidence.
- Constitution growth requires explicit admission, not silent ADR absorption.

Research summary (non-authoritative): `history/docs-reference/industry-skill-injection-and-always-on-decision.md`.

## Verification

- Structural tests assert L0 size ceiling, required floor phrases, and
  absence of demoted dense markers from `runtime/constitution.md`.
- Repository integrity continues to require managed constitution install and
  catalog rebuilds.
- Utilization suites remain an explicit residual until implemented; their
  absence blocks utilization claims, not this architecture decision.
