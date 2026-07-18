# Contributing

Sylphx Skills are **instruction packages for agents**, not blog posts.

Public contributions are welcome when they improve a real, recurring job.
Drive-by skill dumps and generic “be a better developer” prompts are not.

## Before you open a PR

1. Prefer **improving an existing** package over adding a near-duplicate.
2. Confirm the skill has an **independent job** and a **concrete artifact**
   (checklist, design, audit report, decision record — not “general advice”).
3. Read an adjacent skill under `skills/` so routing descriptions do not collide.

## Authoring rules

1. Add or update **exactly one** semantic owner under `skills/<id>/`.
2. `SKILL.md` frontmatter is only `name` and `description`.
3. The **description** must say when the skill **should** load and when it
   **must not** (hand off to another skill or base model).
4. Keep the procedure **actionable, bounded, and evidence-oriented**.
5. Put durable depth in `references/`; put deterministic helpers in package
   `scripts/` only.
6. Use **original synthesis**. Do not copy third-party prose, customer data,
   credentials, private incident detail, or inaccessible proprietary process.
7. Update related packages only when their **contract** truly changes.
8. Rebuild the catalog and run the full local check:

```bash
npm run build:catalog
npm test
```

## Repository boundaries

Do **not** introduce:

- a second authoring root (for example generated skill bodies from prose trees)
- a meta-router that competes with native agent skill loading
- benchmark laboratories, admission services, or live fleet/work state
- secrets or private customer material

Repository decisions that change public contract go in `docs/adr/`.

## PR expectations

- Small, reviewable diffs; one skill or one installer concern per change when
  possible.
- CI (`npm test`) must stay green.
- If you change `runtime/`, say which agents and commands you exercised.

## Discussions

Design questions, “which skill should I use?”, and roadmap ideas belong in
[Discussions](https://github.com/SylphxAI/skills/discussions) — not in issues
unless something is broken.
