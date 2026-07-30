---
status: accepted
date: 2026-07-30
owners:
  - SylphxAI/skills
---

# ADR-0028: Absorb right-sized work and concise communication without a workflow stack

## Context

Public agent-method repositories offer useful responses to two recurring
failures: agents build more machinery than the outcome needs, and agents bury
the answer in generated prose. Installing every simplicity, planning, TDD,
review, compression, or anti-slop package would create overlapping routes,
conflicting absolutes, larger context, and a workflow more complex than the
failures it addresses.

The reviewed methods also have materially different evidence. Ponytail
published a corrected agentic benchmark whose gains concentrate in native
primitive substitution and whose safety tier warns against raw one-line
minimization. Caveman discloses that its injected input cost can outweigh its
output savings on terse work. Other methods provide useful heuristics without
published effect evidence, duplicate an earlier package, or have no canonical
source.

## Decision

1. `scope-discipline` remains the single owner of right-sized work. It gains an
   ordered smallest-complete solution ladder:
   avoid/delete, existing owner, standard-library or native capability, admitted
   dependency, direct local implementation, then justified new machinery.
2. The ladder stops only when the declared capability and material quality
   floor pass, unless a later rung has a demonstrated positive-net lifetime
   advantage. It minimizes total lifecycle complexity, not lines, files, or
   dependencies, and cannot remove trust-boundary validation, recovery,
   accessibility, data integrity, or accepted contracts.
3. Numeric file, line, dependency, question, or review limits bind only when an
   owned contract, measured resource budget, or known failure justifies them.
   Otherwise they are optional design pressure.
4. Clarification, TDD, planning, review, and agent fan-out remain risk- and
   task-matched under their existing owners. No universal interview, design
   approval, unit-test-first, independent-review, ticket, or subagent sequence
   is introduced.
5. `high-signal-communication` remains the single owner of concise output. It
   gains matter-of-fact failure reporting, agent-owned action before
   instruction, no forced closer, and professional complete sentences.
   Correctness, autonomy, actionability, and safety outrank brevity.
6. Medicalized, caveman, absolute-mode, and anti-slop variants are not separate
   routes. Mechanical word/cadence bans and telegraphic grammar are optional
   editing techniques at most, never general writing or CI authority.
7. The always-on constitution carries only two compact projections:
   smallest-complete design and shortest decision-complete communication.
   Detailed comparative research stays in on-demand references.
8. External packages are not vendored or copied. Useful mechanisms are
   synthesized into existing owners with exact source lineage and explicit
   limitations.

## Consequences

- A request for less code or process no longer implies a smaller safety or
  delivery contract.
- A request for a concise answer no longer implies fragments, missing evidence,
  arbitrary list limits, or a generic next step.
- Native Skill discovery sees two stable recurring jobs instead of a branded
  package for every narrow technique.
- Planning and verification remain available when their predicates hold without
  becoming mandatory ceremony for trivial reversible work.
- Source audits can evolve independently without increasing always-on context.

## Rejected alternatives

### Install the full external portfolios

Rejected because they overlap current semantic owners and include contradictory
defaults such as universal hard gates, serial user interviews, mandatory
human-scale task decomposition, and output-only compression.

### Enforce smallness with CI

Rejected because arbitrary LOC, file, token, regex, or wording gates are weak
proxies. CI may enforce an accepted executable budget or semantic contract, not
the appearance of simplicity.

### Add a new “minimal coding” or “ADHD output” Skill

Rejected because both jobs already have one accepted artifact and owner.
Splitting by brand or audience label would increase routing collisions without
adding a distinct contract.

## Verification

- Package links, frontmatter, catalog, installer, and publication contents pass
  repository checks.
- Authored routing fixtures cover explicit right-sizing and concise-output
  requests plus near-neighbour abstention.
- These fixtures document intended boundaries only. Native runtime selection or
  behavioral improvement is not claimed without exact-revision runtime
  evaluation.

## Sources

The complete source-by-source disposition and exact revisions are in:

- [`scope-discipline/references/right-sized-agent-engineering.md`](../../skills/scope-discipline/references/right-sized-agent-engineering.md)
- [`high-signal-communication/references/research-basis.md`](../../skills/high-signal-communication/references/research-basis.md)

Primary portable foundations:

- [Agent Skills specification](https://agentskills.io/specification)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic: The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
- [Martin Fowler: YAGNI](https://martinfowler.com/bliki/Yagni.html)
