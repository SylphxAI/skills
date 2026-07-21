---
status: accepted
date: 2026-07-21
owners:
  - SylphxAI
---

# ADR-0009: Native Skill discovery and package boundaries

## Context

This repository depends on Codex, Claude Code, Grok, and other Agent Skills
runtimes to discover relevant packages automatically. Treating discovery as a
literal keyword router, assuming every installed description is always visible,
or splitting one topic into many routes creates false negatives, collisions,
and unnecessary initial-context cost.

Current official documentation was re-read on 2026-07-21:

- [OpenAI Skills](https://learn.chatgpt.com/docs/build-skills) says Codex places
  each Skill's name, description, and path in initial context, selects implicitly
  by semantic match against the description, and loads the full body after
  selection. It also documents a bounded initial Skill-list budget and may
  shorten descriptions or omit entries when the catalog exceeds it.
- [Claude Code Skills](https://code.claude.com/docs/en/skills) likewise uses
  descriptions for model-driven selection, supports explicit invocation, loads
  additional files progressively, and documents a configurable listing budget
  with shortening or omission under pressure.
- The [Agent Skills specification](https://agentskills.io/specification)
  requires `name` and `description`, says descriptions explain what the Skill
  does and when to use it, and recommends keeping the entry point focused while
  moving detailed material to references.
- [Grok Skills and plugins](https://docs.x.ai/build/features/skills-plugins-marketplaces)
  documents native Skill locations, explicit slash invocation, plugins, and
  Claude/AGENTS compatibility. It does not currently specify a portable
  selection algorithm or progressive-loading guarantee, so this ADR does not
  infer either from that page.

Provider budgets and fields are runtime details, not a portable guarantee. No
current authority defines a universal Skill dependency graph, deterministic
ordering rule, or central router that this repository should emulate.

## Decision

1. `name` and `description` are the portable discovery contract. Descriptions
   front-load the concrete recurring job, independently accepted artifact,
   material request contexts, and nearest exclusions in natural language.
   Keywords are semantic anchors, not exact trigger rules.
2. On metadata-selecting runtimes such as current Codex and Claude, the body
   cannot rescue a false-negative description because it is loaded after
   selection. Important routes are evaluated through realistic positive,
   near-neighbour, abstention, compound, multilingual, ambiguous, correction,
   and misleading-keyword requests against each supported native runtime; no
   undocumented Grok selection behavior is inferred.
3. Installation and catalog presence prove availability, not visibility,
   selection, use, or behavioral improvement. When a runtime exposes no
   selection/load trace, evidence is labelled fresh-context behavior rather
   than exact injection proof; model self-report is insufficient.
4. Universal non-missable floors remain compact in the runtime constitution.
   Domain methods remain Skills and load only when the domain is touched.
   Repository instructions do not duplicate the catalog or invent a meta-router.
5. One Skill owns one recurring, intentionally requestable job with one
   independently accepted primary artifact. Same topic does not imply the same
   route. A subordinate technique belongs in the owning Skill's references.
6. Split when a sub-job is independently requested, has distinct acceptance
   authority and artifact, and needs a discriminable description. Merge when
   job, artifact, acceptance authority, and essential mechanism materially
   coincide. Preserve complete mechanisms before removing an old route.
7. Skill thickness is governed by progressive disclosure, not a raw line-count
   target. Keep metadata compact and the entry procedure focused; rich methods,
   matrices, examples, and volatile depth may live in references. Do not split
   merely by file type, implementation layer, telemetry medium, or noun.
8. Portable source frontmatter remains the strict common subset required by
   this repository. Provider-specific display metadata may live under
   `agents/`, but it is a projection and cannot become a second trigger authority.
9. Effective installation readback covers every native discovery root used by
   the selected runtime, not only the preferred target directory. A verified
   historical Sylphx projection is retired recoverably from duplicate discovery;
   unknown or modified shared content is preserved and fails closed. No status
   may claim current while duplicate or retired managed routes remain visible.

## Consequences

- The catalog can remain broad without pretending that every runtime always
  places every complete description in context.
- False negatives are fixed primarily in descriptions or package boundaries;
  adding more body text does not repair discovery.
- Multiple relevant Skills may compose. One semantic owner produces each
  requested artifact, while Standards contribute constraints without duplicate
  reports.
- A full-catalog authored fixture is useful as a design contract but is not a
  runtime benchmark or adoption claim.

## Verification

- Validate portable frontmatter and all reference links.
- Measure total and per-entry discovery metadata size after catalog changes.
- Maintain natural-language boundary fixtures with positive, neighbour,
  abstention, compound, multilingual, ambiguous, correction, and adversarial
  cases, while clearly labelling them authored contracts.
- For promotable routing claims, run exact-candidate fresh native-runtime tests
  at realistic catalog size, record runtime/version/listing conditions, capture
  native load evidence where available, and keep unsupported claims unverified.
- Assert the effective native listing has one current Sylphx package per name
  and no retired Sylphx routes; a target-folder manifest alone is insufficient.
