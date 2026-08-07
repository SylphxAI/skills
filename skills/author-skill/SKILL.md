---
name: author-skill
description: "Create or revise an Agent Skill: atomic action, description, method, references."
---

# Author Skill

Create or revise skills so the catalog stays a **finite set of agent atomic actions**—not a standards bag, not a domain encyclopedia, not lifecycle fragment spam.

## When to use

- Creating a new skill package
- Rewriting a skill that is too broad, too vague, fragmented, or unused
- Deciding whether something is a **listing skill** vs **reference depth**
- Absorbing a repeated correction loop into one action package

## What a skill is (non-negotiable)

A **Skill** is one **task-level atomic action** an agent is asked to perform (or should proactively start):

Examples of the *kind* of thing that belongs in the listing:

- build / create a product capability
- design a product
- produce an image or asset pack
- deploy / drive work to delivered
- respond / operate support
- write an update or content piece
- fix live product harm
- run an incident

A Skill is **not**:

- a policy, standard, profile, or compliance essay
- a lifecycle phase of another action (`prototype`, `expand`, `finish` of *build*)
- a domain checklist that only differs by tables (`review-billing` vs `review-privacy` as separate listings)
- an analysis *technique* that only runs inside research/design/build
- an engine or brand name (`keel-title`)
- a bag whose job is "hold methods/standards"
- repository docs under `docs/` (not installed to agents)

### Listing vs reference

| Layer | What | Discovered how |
| --- | --- | --- |
| Listing skill | Finite atomic action | Host matches `name` + `description` |
| Skill body | Procedure for that action | After selection |
| `references/` | Standards, shapes, domains, phases, techniques | Body says **when** to open |
| `docs/` | Human git docs only | Not installed |

**Discovery is the hard problem.** Only listing metadata is always visible. Depth the agent never opens might as well not exist for routing—but depth must still **install** under a real action skill (not only under `docs/`).

## Gate: create a listing skill only if all hold

1. **Requestable** — a user/agent would say "do X" as the job.
2. **Independent outcome** — one acceptably complete artifact; not a half-phase of another action.
3. **Real gap** — without it the agent drifts or fails in a recurring way.
4. **Specific procedure** — commands, gotchas, formats; not textbook filler.
5. **Listing budget** — adding it improves routing; it does not dilute a finite action set.

If any fail:

- fold into an existing action's `references/<topic>/`, or
- put a short always-on floor in constitution/AGENTS only if universal miss-class-A, or
- do nothing.

**Prefer ~15–25 listing skills for a whole org catalog.** More is usually fragmentation. Do not optimize for coverage of nouns.

## Standards and constraint packs

- Org constraint packs are **never** listing skills.
- Place each pack under the **one** action that applies it, e.g. engineering under `build-product`, source-authoring under `drive-to-delivery`.
- Other actions **link** to that path; do not duplicate trees; do not create `adopt-named standard packagess` as a bag.
- Body text must say when to open the pack.

## Package layout

```text
skill-id/
  SKILL.md              # required
  agents/openai.yaml    # display metadata (this repo)
  references/           # optional depth (phases, standards, shapes, methods)
  scripts/              # optional deterministic helpers
  assets/               # optional templates
```

- `skill-id`: lowercase kebab, **verb-led action** when possible (`build-product`, not `product-excellence`)
- Frontmatter: only `name` (matches folder) and `description`

## Description (routing key)

1–3 sentences: **what** + **when**. Agent-facing. Concrete triggers and artifact.

Good: Ship a missing product capability end-to-end with original-oracle proof.

Bad: Helps with products and engineering.

Rules:

- No synonym dumps, no foreign skill ids, no standard names as the job
- Stay short under catalog pressure (hosts truncate)
- Near-miss exclusions when needed ("not for open-ended research")

## Body

Short procedure. Recommended: When to use → Method → Progressive disclosure → Validation → Output → Boundaries.

Rules:

- Imperative steps; defaults not menus
- Only what the model lacks
- Link `references/` with **when-to-open**
- Prefer scripts for fragile deterministic steps

## Progressive disclosure for absorbed depth

When a former listing is demoted:

1. `git mv` the package under the owner action's `references/<topic>/`
2. Replace listing `SKILL.md` with `METHOD.md` (not a second listing)
3. Point the owner body at it with a one-line when-to-open
4. Do **not** delete researched method text

Depth already under this skill:

- [references/distill-source/](references/distill-source/) — distill docs/repos into a skill package
- [references/design-evals/](references/design-evals/) — falsifiable skill evals
- [references/curate-repository/](references/curate-repository/) — portfolio merge/split/retire
- [references/instruction-evolution-standard/](references/instruction-evolution-standard/) — instruction evolution constraints
- [references/checklist.md](references/checklist.md) · [references/industry-sources.md](references/industry-sources.md)

## Anti-patterns (catalog rot)

- Mega-skill that mixes unrelated actions
- Lifecycle fragment listings (`finish-*`, `expand-*`, `pursue-*` next to `build-*` / `drive-*`)
- Technique farm (`analyze-*` × N) instead of one evidence/research action + refs
- Meta skill sprawl (author + distill + evals + curate all listed)
- Standards bag skill or docs-only binding depth
- Custom skill-routing engine or keyword dispatcher skill
- Keeping a skill for completeness with no agent gap

## Validate in this repo

1. Frontmatter `name` equals folder id
2. Local links resolve
3. `npm run build:catalog && npm test`
4. Smoke: name+description would load for the right ask and abstain on near-misses
5. Catalog stays a finite action set (see `docs/MODEL.md`)

## Output

- Path to the package
- One-line atomic action
- What was refused or demoted to references
- Catalog/test result
