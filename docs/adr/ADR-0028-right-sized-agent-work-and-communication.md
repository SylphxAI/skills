---
id: ADR-0028-right-sized-agent-work-and-communication
status: accepted
date: 2026-07-30
decision_owner: SylphxAI/skills
supersedes: []
amends: []
scope:
  - agent-communication
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

1. `bound-task-scope` remains the single owner of right-sized work. It gains an
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
5. `write-high-signal-update` remains the single owner of concise output. It
   gains matter-of-fact failure reporting, agent-owned action before
   instruction, no forced closer, and professional complete sentences.
   Correctness, autonomy, actionability, and safety outrank brevity.
6. Medicalized, caveman, absolute-mode, and anti-slop variants are not separate
   routes. Mechanical word/cadence bans and telegraphic grammar are optional
   editing techniques at most, never general writing or CI authority.
7. The always-on constitution carries only miss-class-A floors under the thin dual-layer budget (see ADR-20260731-thin-dual-layer-progressive-instruction-system). Right-sizing and communication methods remain Skills; do not re-expand L0 with design/comms procedure. Historically this decision projected two compact reminders; membership is now L0-admission-gated:
   smallest-complete design and shortest decision-complete communication.
   Detailed comparative research stays in on-demand references.
8. External packages are not vendored or copied. Useful mechanisms are
   synthesized into existing owners with exact source lineage and explicit
   limitations.


> **L0 membership:** always-on body membership and thickness are governed by [ADR-20260731-thin-dual-layer-progressive-instruction-system](ADR-20260731-thin-dual-layer-progressive-instruction-system.md) (miss-class-A floors only; hard budget). Domain procedures remain in Skills.

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

### Development runtime probe

A read-only probe exercised installed packages from source revision
`eb2b989dc709ca46fcaf6c08a7951d8dc344a1ce`:

- `bound-task-scope`
  `sha256:c59f0c92cee578d5ee279e63900c130b1617009f4f53cd2bb32c22ead749f473`;
- `write-high-signal-update`
  `sha256:3c722367993f2697917f14d2494a6ad94f5ed5b918eb9157c92e74e7d9f4e165`;
- Codex CLI `0.144.6`, model `gpt-5.6-sol`; and
- Grok Build `0.2.117`, model `grok-4.5`.

Both runtimes selected the native date input instead of a framework,
date-picker, wrapper service, feature-flag system, or unused telemetry, while
retaining authoritative server validation. Both rejected a ten-line
multi-tenant upload that removed containment, size, media, publication, and
error safeguards, and instead concentrated those invariants behind a narrow
owned primitive. The concise-status case preserved candidate, test, merge,
deploy, production, blocker, and next-observation facts; Grok explicitly loaded
`write-high-signal-update`, while Codex produced the compliant result without
an observable Skill read. A Codex detailed-teaching near-neighbour did not load
the concise-output Skill and returned the requested full explanation.

The four prompt contracts were:

1. choose the smallest complete design for a server-rendered date field with no
   custom calendar, timezone, analytics, or browser requirements;
2. simplify a multi-tenant upload without violating tenant confinement,
   traversal rejection, a 20 MiB streamed limit, media allowlisting, safe
   publication, or stable failures;
3. compress a release status while preserving exact candidate, test, merge,
   deploy, production, blocker, rollback, and next-observation facts; and
4. teach two-phase commit completely with roles, phases, an example, failure
   behavior, blocking risk, and trade-offs, explicitly without shortening.

Run the same contracts read-only against an installed exact package generation:

```sh
codex exec --ephemeral --sandbox read-only -C <checkout> '<prompt>'
grok --single '<prompt>' --cwd <checkout> --no-subagents --no-memory \
  --permission-mode plan --output-format plain
```

This is directional development evidence, not a promotion benchmark: it has no
protected holdout, repeated trials, randomized controls, or independent
multi-family judges. Codex also reported that Skill descriptions were shortened
to fit its two-percent Skill context budget. Therefore the probe supports the
mechanism and observed outcomes but does not prove portfolio-wide native
routing reliability or a general effect size.

## Sources

The complete source-by-source disposition and exact revisions are in:

- [`bound-task-scope/references/right-sized-agent-engineering.md`](../../skills/bound-task-scope/references/right-sized-agent-engineering.md)
- [`write-high-signal-update/references/research-basis.md`](../../skills/write-high-signal-update/references/research-basis.md)

Primary portable foundations:

- [Agent Skills specification](https://agentskills.io/specification)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic: The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
- [Martin Fowler: YAGNI](https://martinfowler.com/bliki/Yagni.html)
