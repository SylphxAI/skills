---
name: author-skill
description: "Create or revise an Agent Skill package: job, description, method, references."
---

# Author Skill

Build skills that match the open Agent Skills model: one specialized requestable job, progressive disclosure, real task value.

Hosts differ: some rank a small metadata listing; others (including RAG-style discovery) can surface a large catalog. Growth is expected as real skills accumulate. Organize for clarity and discoverability.

## When to use

- Creating a new skill package
- Rewriting a skill that is too broad, too vague, unused, or mis-classified
- Deciding listing skill vs reference depth (open [references/skill-grain.md](references/skill-grain.md))
- Absorbing a repeated correction loop into a reusable package

## What a skill is

A **Skill** is one **requestable job** (one PRD **feature/capability** unit)
with a specialized procedure and an acceptably complete outcome. Hosts
discover it from `SKILL.md` `name`+`description`. Depth lives in
`references/`. The package is `SKILL.md` only
([agentskills.io](https://agentskills.io/specification)). A qualification
record is optional and only exists after a filed eval. Repo doc altitude
(Vision · NSM · OKR · PRD · Spec · ADR): see
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
- implement a repository commit build (when CI itself is the job)

### What lives where

| Material | Home |
| --- | --- |
| One requestable job with its own artifact | Listing skill |
| Standard, profile, or domain table | `references/` under the applying job |
| Engine or brand name | Product recipe or repo, not the listing id |
| Human git docs | `docs/` (not installed) |

Write listings and bodies with `../craft-human-agent-language/`: the action, the home, and the done look.

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

A requestable job stays a listing. Extract from a real task or a recurring
miss ([skill-grain.md](references/skill-grain.md)). Merge when job, artifact,
and acceptance authority are the same. Split when a sub-job is independently
requested and independently accepted.

## Standards and constraint packs

Constraint packs share one canonical composition-and-output contract:
[references/composition-contract.md](references/composition-contract.md); pack
READMEs link it instead of restating it.


- Constraint packs live under the applying job.
- Place each pack under the **one** skill that most naturally applies it (e.g. engineering depth under `build-product`, source-authoring under `drive-to-delivery`).
- Other skills **link** to that path. One pack tree per standard.
- Body text says when to open the pack.
- Depth must live under `skills/` so install ships it; `docs/` is human-only.

## Package layout

```text
skill-id/
  SKILL.md              # required (industry Agent Skills)
  qualification.json    # optional; write only when filing a qualify run
  agents/openai.yaml    # display metadata (this repo)
  references/           # optional depth
  scripts/              # optional deterministic helpers
  assets/               # optional templates
```

Do **not** write `capability.json`. Do **not** write `project.manifest.json`.
Do not add a documentation JSON twin of Markdown.
Missing `qualification.json` means
`unqualified`. File a record only after a reproducible run per
`docs/QUALIFICATION.md` and `design-skill-evals`.

- `skill-id`: lowercase kebab; prefer verb-led action names
- Frontmatter: only `name` (matches folder) and `description`

## Description (routing / retrieval key)

1–3 sentences: **what** + **when**. Agent-facing. Concrete triggers and artifact.

Good: Ship a missing product capability end-to-end.

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
- [references/skill-grain.md](references/skill-grain.md) — list vs reference vs fat mega-skill
- [references/checklist.md](references/checklist.md) · [references/industry-sources.md](references/industry-sources.md)

## Listing quality

A listing names one job, produces one artifact, and holds the procedure the
model lacks. The package is `SKILL.md`. Do not add `capability.json`, a
`product-artifact-envelope`, or a documentation JSON twin. The
deliverable is the requested job, not a proof bundle, receipt, or extra CI.
Standards live under the applying job.
Host discovery plus when-to-open links do the routing. Product-law text uses
industry names and English quantities.

## Dual-host notes

- Listing-budget hosts: short discriminating descriptions; near-miss testing.
- RAG hosts: same job descriptions; bodies use when-to-open links; INDEX mega-ref owners.
- Installed reference paths must be reachable from the owner body with when-to-open language.

## Validate in this repo

1. Frontmatter `name` equals folder id
2. Local links resolve
3. `npm run build:catalog && npm test`
4. Smoke: description would select/retrieve for the right ask and abstain on near-misses
5. Do not add slogan, brand, heading-list, file-existence-as-architecture, or
   meta-check tests to make the change land. A red test must be a product defect.
   When this repository's CI is the job, use `../implement-continuous-integration/`.


## Progressive disclosure

- [references/skill-grain.md](references/skill-grain.md) — open when deciding list vs reference or skill size
- [references/checklist.md](references/checklist.md) — open when needed for depth
- [references/industry-sources.md](references/industry-sources.md) — open when needed for depth
- [references/instruction-evolution-standard/](references/instruction-evolution-standard/) — open when this topic applies
- [references/pre-v3-entry-method.md](references/pre-v3-entry-method.md) — open when needed for depth

## Output

- Path to the package
- One-line job
- What was folded to references (and why—not "to hit a cap")
- Catalog/test result
