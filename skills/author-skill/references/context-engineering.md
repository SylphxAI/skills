# Context engineering for capable models

Authority: Anthropic, [The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models) (2026-07-24). They cut more than 80% of Claude Code's system prompt for Opus 5 / Fable 5 with no eval loss.

## Layers

- **System prompt** — what product this agent is in. Host-owned unless you are building a harness.
- **CLAUDE.md / AGENTS.md** — what this repo is, then gotchas the filesystem does not show. Not a dump of every practice you might run into.
- **Skills** — lightweight guides for one job. Particular opinions for this team or product. Overconstrain only in highly important areas.
- **References** — load on demand. Prefer code, tests, and HTML mockups over a prose spec.

## Retired habits

| Then | Now |
| --- | --- |
| Absolute rules that are not always true ("never write comments") | One judgement heuristic ("match surrounding comment density") |
| Long examples that freeze exploration | Expressive interfaces: scripts, enums, templates |
| Put every practice upfront so it will be found | Progressive disclosure: a tree of files opened when a stated condition holds |
| Repeat the same instruction in several layers | Say it once, in the layer that owns it |

Do not add "verify your work", "double-check", or Complete-when to a capable model's instructions. They already verify; extra steps cause over-verification.

If instructions are too specific, the model follows them even when a pivot is better. If too vague, it picks industry defaults. Write the unknowns you actually have; leave the rest to judgement.
