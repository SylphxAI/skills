---
name: author-skill
description: "Author/revise a Skill: job-shaped id, short description, method body, portable host rules."
---

# Author Skill

When you need to **add or revise a Skill** in this repository (or a compatible
Agent Skills layout), run this workflow. Produce a package an agent can load
to do a **specific job**, not an org chart, not always-on law, not a host
tool manual.

## When to use

- New reusable agent method (workflow / review / policy / adapter)
- Rewrite an existing Skill for clarity, boundaries, or portability
- User asks to “make a skill for …”
- One-off work with no reuse stays outside Skills (just do the task)
- Universal floors stay in `runtime/constitution.md` / host always-on, not a fat Skill


## Authoring principles (non-negotiable)

1. **Job method, not role title.** Name and voice = *what work to do*, not
   “Prototyper / Builder / who you are.” Prefer verb-led ids:
   `prototype-product`, `author-skill`, `pursue-product-objective`,
   `review-launch-readiness` (reviews), `design-app` (blueprints).
2. **Progressive disclosure.** Listing sees only `name` + `description`. Body
   loads after match. Keep description short and searchable; put depth in
   body/`references/`.
3. **Assume the model is strong.** Omit textbook filler (“backend is not
   frontend”). Write steps the agent would otherwise miss.
4. **One primary job.** Prefer one Skill per clear job. Do not fork two Skills
   for the same intent (e.g. finisher + finish).
5. **Portable.** No hard-coded host tool ids (`create_goal`, vendor-specific
   goal APIs, etc.). Say “use the host’s continuity/objective APIs if present.”
6. **No staffing OS.** Never specify how many agents to spawn or role casting.
7. **Class correctly.** Primary output decides class:
   - procedure / cycle / job artifact → `workflow`
   - assessment record → `review`
   - reusable predicates → `policy` (`*-standard` only for true policy)
   - live tool I/O → `adapter`
8. **Done criteria.** Every workflow Skill states when **this run/cycle** is
   complete. Do not equate “product forever perfect” with Skill done unless
   the job is explicitly pursue-to-objective.
9. **Hard-cut portfolio changes.** Prefer rename/delete/migrate over long
   backward-compatible dual packages. Keep a dual Skill only with demonstrated
   large-scale impact and a dated retirement—execute via `execute-hard-cutover`.
10. **Discoverable ids.** Workflow ids are verb-led **2–4 kebab tokens** that
   encode the job terminal (e.g. `select-dependency-versions`,
   `execute-hard-cutover`). Ban 1-token workflow ids. Policy packs use `Policy:`
   descriptions and `*-standard` / `*-policy` / `*-profile` ids—not job-verb masks
   on pure constraints.
11. **Positive writing only.** Write what this Skill *does* and when to use it.
   **Do not** add `## When not to use` lists, “not X → `other-skill`” bullets, or
   neighbour-id negation dumps. Those inject foreign keywords into the body and
   **worsen** retrieval (“此地無銀”). Discriminate with a sharp **name**, short
   **description**, and precise **When to use** / method scope—not by naming rivals.

12. **Source-mutating workflows** compose `source-authoring-standard` three layers
   (L1 batch implement → L2 atomic commits in the PR → L3 revert-safe PR outcome).
   Do not invent a second trunk doctrine inside job Skills.

Read for class/composition detail:
[skill-package-classes-and-composition.md](https://github.com/SylphxAI/skills/blob/main/docs/reference/skill-package-classes-and-composition.md)
and [ADR-20260801](https://github.com/SylphxAI/skills/blob/main/docs/adr/ADR-20260801-package-classes-and-standard-composition.md).

## Package layout (this repo)

```text
skills/<skill-id>/
  SKILL.md                 # required
  agents/openai.yaml       # UI display_name / short_description / default_prompt
  references/              # optional depth
  scripts/                 # optional helpers
  assets/                  # optional
```

- `skill-id`: `^[a-z0-9]+(?:-[a-z0-9]+)*$`
- Frontmatter: `name` (same as folder), `description` (trigger string)
- After change: `npm run build:catalog && npm test`, then install if needed:
  `node runtime/sylphx-skills.mjs install --agent all`

## One authoring cycle

### 1. Frame the job

- One sentence: **When you need to …, do …**
- Primary artifact / outcome of one run
- In scope / out of scope (positive: what this job owns)

If you cannot name a single job, split or refuse a mega-Skill.

### 2. Choose class and name

| Primary output | Class | Name hint |
| --- | --- | --- |
| Steps to produce a job result | workflow | verb-led job |
| Assessment / design record | review | `review-…` |
| Predicates reused by many jobs | policy | `…-standard` only if true policy |
| Live system operations | adapter | host/ops-shaped |

Description template (one or two short sentences, agent-facing):

> <verb job / Policy: / Review:> <discriminating substance for *this* job only.>

No textbook restatement of the title. Include only positive trigger terms for this
job; exclude host-private API names and foreign skill ids. Prefer shorter text
under catalog listing pressure.

### 3. Draft `SKILL.md` body

Recommended skeleton for **workflow**:

```markdown
# Title

When you need to …, run one … cycle.   # or pursue until terminal

## When to use
## Method
### 1. Frame
### 2. Research   # stop rule / VoI
### 3. Admit work # In / Out
### 4. Implement
### 5. Deliver / verify
## Cycle done   # or Objective terminal
## Output
```

Rules of thumb:

- **You / imperative** voice (“When you need…”, “Admit…”)
- Research with an explicit **stop** condition
- Admit **In/Out** so the wrong job does not smuggle in
- Verify with **original oracles** when claims matter
- Continuity: host-defined only; no tool ids
- Long matrices → `references/`; keep entry thin

### 4. Add `agents/openai.yaml`

```yaml
interface:
  display_name: "Human Title"
  short_description: "≤ ~140 chars, same job as description"
  default_prompt: "Run … on the active workspace."
```

`display_name` may be title case; `name` stays kebab-id.

### 5. Wire discovery (minimal)

- Optional one line in a relevant ADR/reference if portfolio-level
- Do **not** invent a meta-router Skill
- Do **not** edit neighbour Skills just to add “when not → this id” keyword lists

### 6. Validate and land

1. Frontmatter `name` == folder id  
2. Local links resolve  
3. `npm run build:catalog && npm test`  
4. Commit with a message that states the job the Skill teaches  
5. Install to agents when this environment expects sync  

### 7. Smoke the trigger

- Would an agent with only **name+description** load this for the right ask?
- Would it load for the wrong ask? Tighten **name** and **description** (positive), not a when-not list.
- Open body: can it execute without re-reading the whole catalog?

## Anti-patterns

- `## When not to use` sections or “not X → `other-skill`” neighbour dumps (keyword pollution)
- Role nouns as package ids (`product-prototyper`) when a verb job fits
- Forever compatibility dual packages or undated shims “for safety”
- Two packages for one intent
- Always-on essays inside Skills
- Host tool hardcoding; “create goal every message”
- Multi-agent spawn counts inside Skill bodies
- Prestige `*-standard` on pure workflows
- Description essays that restate the title with no new retrieval signal
- Loop-scheduler claims that fight the host turn model

## Output

- Path to new/updated package
- Class + one-line job
- Scope / positive discrimination notes (no when-not lists)
- Test/catalog result

## Portfolio routing (product jobs)

When authoring product methods, prefer these existing job Skills over new near-duplicates:

| Job | Skill |
| --- | --- |
| Learn / probe | `prototype-product` |
| Ship capability | `build-product` |
| Cut live harm | `maintain-product` |
| Scale validated core | `expand-product` |
| Finish / deburr | `finish-product` |
| Pursue fixed outcome to completion | `pursue-product-objective` |
| Mixed open betterment | `run-open-product-betterment` |
| Next Work from evidence/ledger | `select-next-work` |
| Multi-phase delivery terminal | `drive-to-delivery` |
| Author a Skill | `author-skill` |

Policy packages (`*-standard`, stack/profile pins) constrain other jobs; they are not product job cycles.

