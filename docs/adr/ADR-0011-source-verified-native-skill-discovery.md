---
status: accepted
date: 2026-07-21
owners:
  - SylphxAI
amends: ADR-0009
---

# ADR-0011: Source-verified native Skill discovery

## Context

ADR-0009 remains the authority for package boundaries, effective-root readback,
duplicate retirement, and fail-closed installation. Its runtime account was not
precise enough: it described Codex implicit selection as though the host made a
semantic verdict and said Grok's selection and progressive loading were not
publicly specified. This ADR amends those mechanism claims only.

Current documentation and public runtime source were audited on 2026-07-21 at
pinned revisions:

- [OpenAI Codex `c44c4de7`](https://github.com/openai/codex/tree/c44c4de7b410993dacb2e88c7084c9c968bc963a)
  injects a bounded catalog of Skill names, descriptions, and locators into
  model-visible context. Implicit use is model-mediated: the model matches the
  request to that metadata and reads the selected `SKILL.md`. A valid, enabled,
  unambiguous structured or `$skill-name` invocation is host-resolved and
  injects the body deterministically; ambiguous bare names do not. Its lexical,
  BM25, character n-gram, and multi-query
  selectors are shadow experiments and do not alter the visible catalog or
  choose the production route.
- [Claude Code Skills](https://code.claude.com/docs/en/skills) uses descriptions
  for model-driven selection, supports explicit invocation, progressively loads
  additional files, and documents a bounded listing budget.
- The [Agent Skills specification](https://agentskills.io/specification)
  requires `name` and `description`, says descriptions explain what the Skill
  does and when to use it, and recommends a focused entry point with deeper
  material in references.
- [Grok Build `a881e670`](https://github.com/xai-org/grok-build/tree/a881e6703f46b01d8c7d4a5437683546df30449d)
  exposes Skill identity through the locator plus description and optional
  `when-to-use` in the model-facing listing. The model chooses a route and reads
  the body by path.
  Its optional `paths:` field is a runtime-specific visibility gate after a
  matching file is touched, not a portable semantic router. A valid, enabled,
  unambiguous `/skill` invocation resolves and injects the body; ambiguous bare
  names require qualification.

Pinned implementation evidence:

- Codex [renders the catalog and trigger instructions](https://github.com/openai/codex/blob/c44c4de7b410993dacb2e88c7084c9c968bc963a/codex-rs/core-skills/src/render.rs#L28-L63),
  [resolves explicit mentions](https://github.com/openai/codex/blob/c44c4de7b410993dacb2e88c7084c9c968bc963a/codex-rs/core-skills/src/injection.rs#L146-L214),
  and [keeps alternative selectors in shadow mode](https://github.com/openai/codex/blob/c44c4de7b410993dacb2e88c7084c9c968bc963a/codex-rs/ext/skills/src/shadow_selection_experiment.rs#L33-L124).
- Grok [renders selection metadata](https://github.com/xai-org/grok-build/blob/a881e6703f46b01d8c7d4a5437683546df30449d/crates/codegen/xai-grok-tools/src/types/skill_discovery_tracker/listing.rs#L141-L160),
  [injects explicit slash invocation](https://github.com/xai-org/grok-build/blob/a881e6703f46b01d8c7d4a5437683546df30449d/crates/codegen/xai-grok-shell/src/session/slash_commands.rs#L893-L956),
  and [implements path-conditional visibility](https://github.com/xai-org/grok-build/blob/a881e6703f46b01d8c7d4a5437683546df30449d/crates/codegen/xai-grok-tools/src/types/skill_discovery_tracker/conditional.rs#L10-L75).

Provider budgets and fields are runtime details, not portable guarantees. No
current authority defines a universal Skill dependency graph, deterministic
implicit-selection order, or central router for this repository to emulate.

The same audit found a separate installation-boundary issue. Current Codex
calls `$CODEX_HOME/skills` deprecated user storage and also discovers the shared
`$HOME/.agents/skills` root, while Grok discovers that shared root too. A path
switch can therefore change more than Codex and is not part of this decision.

## Decision

1. Every ADR-0009 decision remains in force unless this section explicitly
   refines its runtime mechanism.
2. `name` and `description` remain the portable discovery contract.
   Descriptions front-load the concrete recurring job, independently accepted
   artifact, material request contexts, and nearest exclusions in natural
   language. Trigger phrases are model-facing evidence, not deterministic
   activation guarantees or a repository-owned keyword table.
3. Implicit selection on current Codex, Claude, and Grok is model-mediated. A
   body cannot rescue a false-negative description because it becomes useful
   only after the route is chosen. Explicit invocation is deterministic only
   where the host documents it and successfully resolves a valid, enabled,
   unambiguous or qualified identity.
4. Important routes are evaluated through realistic positive, near-neighbour,
   abstention, compound, multilingual, ambiguous, correction, and
   misleading-keyword requests against each supported native runtime.
   Installation, authored fixtures, and model self-report prove neither native
   visibility nor use.
5. Universal non-missable floors stay compact in the runtime constitution.
   Domain methods remain Skills. This repository adds no portable meta-router
   or Skill dependency graph; provider listing, visibility gates, explicit
   invocation, and non-authoritative shadow ranking remain runtime behavior.
6. One Skill continues to own one recurring, intentionally requestable job and
   one independently accepted primary artifact. Package thickness follows
   progressive disclosure. Split only when request, artifact, and acceptance
   authority are independently meaningful; do not split by noun, file type,
   implementation layer, or telemetry medium.
7. Provider-specific metadata cannot become a second trigger authority. Do not
   mass-copy trigger prose into Grok-only `when-to-use`; the portable
   `description` must remain sufficient for runtimes that do not consume it.
   Use provider fields only for a demonstrated need and verify parity.
8. Grok `paths:` is reserved for genuinely path-bound methods. It is forbidden
   for safety, evidence, disclosure, or other rules that must apply before the
   first file access.
9. The shared-root question is a separate public compatibility decision.
   Until that decision lands with migration proof, this ADR neither redefines
   `--agent` scope nor treats a one-line installer path change as safe.

## Consequences

- False negatives are fixed first in model-visible metadata or package
  boundaries, not by adding body text or a local keyword router.
- Package count and description length have real catalog cost even though full
  bodies load progressively. Useful packages remain first class, but splitting
  is not free under provider listing budgets.
- Multiple relevant Skills may compose. One semantic owner produces each
  requested artifact; Standards constrain that artifact without generating
  duplicate reports.
- Runtime-specific controls can improve or constrain discovery but are not
  portable repository authority.

## Verification

- Validate portable frontmatter, global name uniqueness, reference links, and
  deterministic catalog digests.
- Measure total and per-entry discovery metadata after catalog changes.
- Maintain authored natural-language boundary fixtures, clearly labelled as
  design contracts rather than runtime benchmarks.
- For promotable routing claims, run exact-candidate fresh native-runtime tests
  at realistic catalog size. Record runtime version, context/listing conditions,
  explicit versus implicit invocation, native load evidence where available,
  and all unsupported claims as unverified.
- When Grok-specific fields are used, test `when-to-use`, path-gated visibility,
  disabled model invocation, and catalog-pressure behavior separately.
- Assert one current package per name across every effective discovery root;
  target-folder presence alone is insufficient.
