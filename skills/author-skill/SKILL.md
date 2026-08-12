---
name: author-skill
description: "Create or revise an Agent Skill package: job, description, method, references."
---

# Author Skill

Build skills that match the open Agent Skills model: one specialized requestable job, progressive disclosure, real task value.

Hosts differ: some rank a small metadata listing; others (including RAG-style discovery) can surface a large catalog. **Do not invent a hard global skill count cap.** Growth is expected as real skills accumulate. Organize for clarity and discoverability—not compression for its own sake.

## When to use

- Creating a new skill package
- Rewriting a skill that is too broad, too vague, unused, or mis-classified
- Deciding listing skill vs reference depth
- Absorbing a repeated correction loop into a reusable package

## What a skill is

A **Skill** is one **requestable job** (one product **capability** / method
unit) with a specialized procedure, an acceptably complete outcome, and a
machine-readable capability contract (`capability.json`) plus an honest
qualification record (`qualification.json`). Field-level tool details live in
that contract and `references/` — not in product North Star prose. Repo product
doc altitude (NS / end state / goals / design inventory): see
`../drive-to-delivery/references/source-authoring-standard/references/documentation-standard/`.

Examples of the *kind* of listing skill:

- build / create a product capability
- design a product
- produce sprites or store assets
- drive work to delivered
- operate support / respond to a user
- write an update
- run an incident
- analyze critically / forecast with calibration (when those jobs are requested on their own)

A Skill is **not**:

- a policy, standard, profile, or compliance encyclopedia entry
- a domain checklist that only differs by tables (prefer one review skill + domain references)
- an engine or brand product name as the listing (`keel-title`)
- a bag whose only job is to hold methods or standards
- repository docs under `docs/` (not installed to agents)

### Listing vs reference

| Layer | What | How discovered |
| --- | --- | --- |
| Listing skill | Requestable job package | Host discovery (`name`+`description`, RAG, etc.) |
| Skill body | Procedure | After the skill is selected/retrieved |
| `references/` | Standards, shapes, domain packs, long matrices | Body says **when** to open |
| `docs/` | Human git docs | Not installed |

**Discovery matters.** Write descriptions so the right job is found. Put agent-needed depth under installed skill packages—not only under `docs/`.

## Gate: create a listing skill when these hold

1. **Requestable** — users/agents say "do X" as the job (now or as a recurring gap).
2. **Independent outcome** — an acceptably complete artifact; not only a hidden sub-step with no standalone acceptance.
3. **Real gap** — without it the agent drifts or fails in a recurring way.
4. **Specific procedure** — commands, gotchas, formats; not textbook filler.
5. **Honest description** — listing metadata can select it without synonym dumps or false neighbours.

If the content fails those tests:

- fold into an existing skill's `references/<topic>/` when it is truly subordinate depth, or
- put a short always-on floor only for universal miss-class-A rules, or
- do nothing.

**Do not demote a real requestable job just to shrink the catalog.**  
**Do not merge unrelated jobs into one mega-skill to hit a number.**  
**Do not refuse a valid new skill because "we already have enough."**

Merge only when job, artifact, and acceptance authority are materially the same. Split when a sub-job is independently requested and independently accepted.

## Standards and constraint packs

Constraint packs share one canonical composition-and-output contract:
[references/composition-contract.md](references/composition-contract.md); pack
READMEs link it instead of restating it.


- Org constraint packs are **never** listing skills.
- Place each pack under the **one** skill that most naturally applies it (e.g. engineering depth under `build-product`, source-authoring under `drive-to-delivery`).
- Other skills **link** to that path; do not duplicate pack trees; do not create a "hold all standards" skill.
- Body text must say when to open the pack.
- Depth must live under `skills/` so install ships it; `docs/` is human-only.

## Package layout

```text
skill-id/
  SKILL.md              # required
  capability.json       # required capability contract (job, boundaries, inputs/outputs, required, failure semantics, outcome)
  qualification.json    # required qualification record (honest `unqualified` default)
  agents/openai.yaml    # display metadata (this repo)
  references/           # optional depth
  scripts/              # optional deterministic helpers
  assets/               # optional templates
```

Every listing is a **capability**: `capability.json` follows
`schemas/capability-contract.schema.json`; `qualification.json` follows
`schemas/qualification-record.schema.json`. `unqualified` is the honest
default — never claim qualification without version-scoped, expiring evidence
filed per `docs/QUALIFICATION.md` and `design-skill-evals`.

### Exact contract fields (do not invent shapes)

`capability.json` (schema `schemas/capability-contract.schema.json`,
`additionalProperties: false`):

- `schemaVersion: 1`, `name` (must equal folder), `job` (one requestable job,
  a **string**, max 160 chars)
- `boundaries.inScope` (1–8 strings) and optional `boundaries.outOfScope`
- optional `inputs[]`; required `outputs[]` (1–8 strings)
- optional `required.tools[]`, `required.data[]`, `required.permissions[]`
- `failureSemantics` (one sentence)
- `outcome.observable` + `outcome.oracleOwner` (`user-system` | `repository` |
  `host`) + `outcome.receiptSchema: "outcome-receipt.schema.json"`

`qualification.json` (schema `schemas/qualification-record.schema.json`):

- `schemaVersion: 1`, `name`, `status: "unqualified"` (honest default),
  `evaluator: null`, `qualifiedAt: null`, `expiresAt: null`, `evidence: []`,
  `compatibility: []`
- `qualified` status is **not** a field to set during authoring; it requires
  filed, expiring evidence per `design-skill-evals` and `docs/QUALIFICATION.md`

- `skill-id`: lowercase kebab; prefer verb-led action names
- Frontmatter: only `name` (matches folder) and `description`

## Description (routing / retrieval key)

1–3 sentences: **what** + **when**. Agent-facing. Concrete triggers and artifact.

Good: Ship a missing product capability end-to-end with original-oracle proof.

Bad: Helps with products and engineering.

Rules:

- No synonym dumps, no foreign skill ids as the job name, no standard package names as the skill id
- Prefer short, discriminating prose (hosts may truncate listings; RAG still benefits from clear job language)
- Near-miss exclusions when needed

## Body

Short procedure. Recommended: When to use → Method → Progressive disclosure → Validation → Output → Boundaries.

Rules:

- Imperative steps; defaults not menus
- Only what the model lacks
- Link `references/` with **when-to-open**
- Prefer scripts for fragile deterministic steps

## Related first-class skills

These stay **listings** when they are independently requested:

| Need | Skill |
| --- | --- |
| Distill docs/repo material into a skill package | `distill-source-to-skill` |
| Design falsifiable evals for a skill | `design-skill-evals` |
| Portfolio merge/split/retire across many skills | `curate-skill-repository` |

Also useful depth under this package:

- [references/instruction-evolution-standard/](references/instruction-evolution-standard/) — instruction evolution constraints
- [references/checklist.md](references/checklist.md) · [references/industry-sources.md](references/industry-sources.md)

## Anti-patterns

- Mega-skill that mixes unrelated jobs to reduce count
- Demoting a standalone requestable job only to hit a size target
- Domain checklist sprawl as separate listings when one review skill + refs is enough
- Standards bag skill or docs-only agent binding depth
- Custom skill-routing engine / keyword dispatcher skill
- Generic policy essays with no executable job
- Keeping a hollow shell with no agent gap

## Dual-host notes

- Listing-budget hosts: short discriminating descriptions; near-miss testing; do not grow descriptions into keyword soup.
- RAG hosts: same job descriptions; bodies must not rely on neighbour-skill keyword dumps for selection; INDEX mega-ref owners.
- Installed reference paths must be reachable from the owner body with when-to-open language.

## Validate in this repo

1. Frontmatter `name` equals folder id
2. Local links resolve
3. `npm run build:catalog && npm test`
4. Smoke: description would select/retrieve for the right ask and abstain on near-misses


## Progressive disclosure

- [references/checklist.md](references/checklist.md) — open when needed for depth
- [references/industry-sources.md](references/industry-sources.md) — open when needed for depth
- [references/instruction-evolution-standard/](references/instruction-evolution-standard/) — open when this topic applies
- [references/pre-v3-entry-method.md](references/pre-v3-entry-method.md) — open when needed for depth

## Output

- Path to the package
- One-line job
- What was folded to references (and why—not "to hit a cap")
- Catalog/test result
