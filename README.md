# Sylphx Skills

[![CI](https://github.com/SylphxAI/skills/actions/workflows/check.yml/badge.svg)](https://github.com/SylphxAI/skills/actions/workflows/check.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](./package.json)

**Task-focused Agent Skills for Codex, Claude Code, and Grok Build.**

This repository follows the open [Agent Skills](https://agentskills.io) model:
small packages that teach agents specialized jobs, loaded on demand through
progressive disclosure.

## Install

Give this to your agent:

> Install this: https://github.com/SylphxAI/skills

The agent reads [`INSTALL.md`](./INSTALL.md), installs the skill catalog and
compact constitution, and enables managed AutoSync for the receiving runtime.

## What you get

| Layer | Content |
| --- | --- |
| Always-on | Thin `runtime/constitution.md` (authority + evidence honesty) |
| Skills | A small catalog of task skills plus one method-library skill under `skills/` |
| Live systems | CI, deploy, and tools remain real authority |

Skills here are **not** a company policy encyclopedia. Long standards, product
OS loops, and domain review matrices are out of catalog scope. See
[`docs/MODEL.md`](./docs/MODEL.md).

## Catalog

| Skill | Job |
| --- | --- |
| `author-skill` | Create or revise an Agent Skill package |
| `consult-sylphx-methods` | Org method library (migrated standards/reviews/methods) |
| `build-keel-title` | Implement a Keel external title/app |
| `craft-product-interface` | Product UI craft with verification |
| `execute-hard-cutover` | Hard-cut predecessor → destination |
| `produce-game-2d-map-assets` | 2D map/prop asset packs |
| `produce-game-2d-sprites` | 2D sprites/sheets |
| `produce-product-assets` | Product marketing/store assets |
| `remediate-frontend-performance` | Measured frontend performance fixes |
| `run-incident-response` | Production incident command |
| `select-dependency-versions` | Live registry version selection |
| `verify-local-web-preview` | Local web load/screenshot/console gate |
| `write-high-signal-update` | Short stakeholder updates |

## Develop

```bash
npm test
npm run build:catalog
node runtime/sylphx-skills.mjs install --agent all
```

## License

MIT. Public methods on purpose. Commercial value is maintenance, private packs,
integrations, and support—not pretending public Markdown is secret.
