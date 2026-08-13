# Skill grain (industry)

How large a listing should be. Open this when deciding list vs reference,
whether to mint a skill for a new feature, or whether `build-product` should
absorb a verb.

## Industry bar (primary sources)

| Source | Rule |
| --- | --- |
| [Agent Skills spec](https://agentskills.io/specification) | Progressive disclosure: name+description always loaded; SKILL.md on activate; references on demand. Keep SKILL.md under 500 lines / ~5k tokens. |
| [agentskills.io best practices](https://agentskills.io/skill-creation/best-practices) | A skill is a **coherent unit of work**, like a function. Too narrow → many skills load and fight. Too broad → hard to activate precisely. Extract skills from **real tasks**, not from an architecture diagram. Defaults, not menus. Start from hands-on work; refine with real execution. |
| [Anthropic skill authoring](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | Description is the selection key among 100+ skills. Lean SKILL.md; fat references. One level of links from SKILL.md. **Start with evaluation:** find the gap, then write the minimum skill that closes it. Compose skills for multi-step work. |
| [Anthropic engineering, 2025-10](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) | Skills are composable onboarding guides. Build incrementally against observed failures. Split mutually exclusive depth into separate reference files. |
| [OpenAI / Codex build skills](https://developers.openai.com/codex/skills/) | **Keep each skill focused on one job.** Listing budget ~2% of context (or 8k chars); hosts shorten or omit descriptions. Front-load triggers. |
| [OpenAI Academy / Skills](https://openai.com/academy/skills/) | Skills work best as **small building blocks you mix and match**, not one massive end-to-end skill. Split complex workflows. |

Practitioner commentary (not the spec): prefer small focused skills that
chain over one monolithic skill. The spec itself rejects both extremes.

## The two wrong answers

**One listing per imagined feature** (authorization, Postgres, Redis, cron
noun, engine brand) fails the spec:

- descriptions collide and steal routes;
- Codex/Claude listing budgets truncate or omit entries;
- one user ask loads several overlapping bodies;
- you author against a diagram, not a recurring miss.

**One fat `build-product`** that is the universe of Platform + product
implementation also fails:

- hard to activate precisely (“add login” and “ship a slice” share one route);
- the body loads instructions that do not apply;
- the agent follows inapplicable steps (Anthropic: moderate detail; omit what
  the model already knows).

Thickness is solved by **progressive disclosure** (lean body, fat
`references/`), not by stuffing every how-to into one listing.

## Decision for this catalog

**Listing** = a verb people say + a result another agent can accept alone.

**Reference** = shared how-to (Platform recipes, engineering standard) under
one owner. Other listings open it. The pack is not a listing.

**Authoring order** matches industry “extract from a real task”:

1. Do the job once, or watch the agent fail on a representative task.
2. If the miss is recurring and independently requestable, add a listing.
3. Put the stable Platform procedure in the shared recipe, not copied into
   every body.
4. Do not pre-create a listing because a feature noun exists on a roadmap.

Do **not** mint one listing per Platform pack, engine, or noun. Do **not**
fold every verb into `build-product`.

`build-product` is the **implementation cycle** (frame → classify → ship one
slice). It is the fallback when no verb listing matches. Its description must
not steal “add login” / “add cron”.

## Coherence test (agentskills.io)

Treat the skill as a function. Keep it if one activation does one job.
Split if two activations would have different oracles. Merge if two listings
share job, artifact, and acceptance authority.
