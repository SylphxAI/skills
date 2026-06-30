# Sylphx Skills

[![Validate skills](https://github.com/SylphxAI/skills/actions/workflows/validate.yml/badge.svg)](https://github.com/SylphxAI/skills/actions/workflows/validate.yml)

Curated, eval-backed skills for AI agents.

Sylphx Skills is a public repository of high-signal `SKILL.md` packages for agents such as Codex, Claude Code, Cursor, GitHub Copilot, Windsurf, and other tools that understand the open skill folder pattern.

We optimize for **quality over volume**:

- concise `SKILL.md` instructions with progressive disclosure;
- practical references and scripts instead of long prompt dumps;
- trigger descriptions that tell agents exactly when to use each skill;
- validation, security review, attribution, and lightweight evals before publish.

## Install

Install the whole collection with the open skills CLI:

```bash
npx skills add SylphxAI/skills
```

Install a specific skill when your client supports skill selection:

```bash
npx skills add https://github.com/SylphxAI/skills --skill interface-craft
```

## Skills

| Skill | Use when | Status |
| --- | --- | --- |
| [`interface-craft`](./skills/interface-craft/SKILL.md) | Building, polishing, or reviewing UI for product craft and tasteful micro-details. | Preview |
| [`startup-growth-review`](./skills/startup-growth-review/SKILL.md) | Reviewing a startup product, landing page, funnel, or go-to-market plan for growth leverage. | Preview |
| [`skill-marketplace-creator`](./skills/skill-marketplace-creator/SKILL.md) | Creating, curating, validating, or operating a marketplace of reusable agent skills. | Preview |
| [`mobile-app-product-systems`](./skills/mobile-app-product-systems/SKILL.md) | Designing or reviewing mobile app/game monetization, retention, notification, refund, and reward systems. | Preview |

The generated registry lives at [`registry/skills.json`](./registry/skills.json).

## Quality bar

A Sylphx skill must be:

1. **Useful** — it changes agent behavior on a real task.
2. **Concise** — `SKILL.md` contains routing and method, not a knowledge dump.
3. **Progressively disclosed** — detailed knowledge lives in `references/`; deterministic work lives in `scripts/`.
4. **Evaluable** — examples show when the skill should trigger and what better output looks like.
5. **Safe** — no secrets, unsafe shell snippets, malicious instructions, dark patterns, or license laundering.
6. **Original synthesis** — learn from the world, then publish Sylphx-owned structure, examples, and wording; attribution is only needed for direct quotes, third-party code/assets, or license-required excerpts.

See [`docs/skill-quality-bar.md`](./docs/skill-quality-bar.md) and [`docs/skill-packs.md`](./docs/skill-packs.md).

## Validate locally

```bash
node scripts/validate-skills.mjs
node scripts/generate-registry.mjs
```

## Contribute

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`docs/submit-a-skill.md`](./docs/submit-a-skill.md).

## Roadmap

This repository is the source of truth. The marketplace surface can later become:

- a static website generated from `registry/skills.json`;
- a public search API;
- install analytics and badges;
- verified creator pages;
- private enterprise registries;
- skill eval and scoring services.

See [`docs/marketplace-roadmap.md`](./docs/marketplace-roadmap.md).

## License

MIT. See [`LICENSE`](./LICENSE).
