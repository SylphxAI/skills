# Sylphx Skills

[![CI](https://github.com/SylphxAI/skills/actions/workflows/check.yml/badge.svg)](https://github.com/SylphxAI/skills/actions/workflows/check.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](./package.json)
[![Agent Skills](https://img.shields.io/badge/agent%20skills-83%20packages-111827.svg)](./catalog.json)

**Working methods for AI agents — published so they can install them.**

Sylphx Skills is the public, MIT-licensed library of how Sylphx agents design,
build, verify, deliver, operate, and grow software. One command installs the
full set into [Codex](https://openai.com/codex),
[Claude Code](https://docs.anthropic.com/en/docs/claude-code), and
[Grok Build](https://grok.x.ai/) skill roots — and keeps them current.

```bash
npx --yes github:SylphxAI/skills sync
```

That is the entire install. No global package. No account. No token.

---

## Why this exists

Agents already load skills. Most collections are either thin stubs or private
playbooks. This repository is different:

| | |
| --- | --- |
| **Public on purpose** | Our real operating methods, not marketing vapor |
| **Agent-native packages** | Each skill has a clear job, load trigger, and bounded method |
| **Multi-runtime** | Codex · Claude Code · Grok Build from one source |
| **Converging sync** | New skills appear; removed skills leave; third-party skills stay |
| **OS auto-update** | Optional launchd / systemd / Task Scheduler — no daemons we host |

Commercial Sylphx value is continuous maintenance, private customer packages,
Platform integrations, and support — **not** pretending public Markdown is
secret.

---

## Quick start

### Install or update once

```bash
npx --yes github:SylphxAI/skills sync
```

When published on npm:

```bash
npx --yes sylphx-skills sync
```

Target one runtime:

```bash
npx --yes github:SylphxAI/skills sync --agent codex
npx --yes github:SylphxAI/skills sync --agent claude
npx --yes github:SylphxAI/skills sync --agent grok
npx --yes github:SylphxAI/skills sync --agent all
```

### Stay current automatically

```bash
npx --yes github:SylphxAI/skills auto-sync enable          # default: every 10m
npx --yes github:SylphxAI/skills auto-sync enable --interval 30m
npx --yes github:SylphxAI/skills auto-sync status
npx --yes github:SylphxAI/skills auto-sync disable
```

Uses the OS user scheduler (launchd / systemd user timer / Task Scheduler).
Each tick checks the public repo head; only a new commit is fetched and applied.
Offline, last known-good packages remain. Unrelated hand-authored skills are
never deleted.

### Inspect

```bash
npx --yes github:SylphxAI/skills status
npx --yes github:SylphxAI/skills status --json
npx --yes github:SylphxAI/skills clear     # remove only Sylphx-managed skills
npx --yes github:SylphxAI/skills help
```

---

## What you get

**83 packages** in three families (see [`catalog.json`](./catalog.json) for the
machine index and [`skills/`](./skills/) for sources):

### Standards & profiles

How we run engineering at fleet scale — delivery, CI admission, incidents,
agent-first development, enterprise control planes, profiles, and more.

Examples: `engineering-standard` · `delivery-standard` · `agent-first-development-standard` · `mission-control-standard` · `fleet-engineering-profile`

### Product procedures

Bounded design/audit jobs with a concrete artifact: payments, privacy, growth
loops, marketplace trust, support ops, launch readiness, game economy, …

Examples: `payment-platform-readiness` · `privacy-data-lifecycle-review` · `saas-subscription-pricing` · `launch-readiness-review`

### Blueprints & craft

Whole-product and craft surfaces: app/game/SaaS blueprints, interface craft,
prompt architecture, fleet migration, skill authoring.

Examples: `app-design-blueprint` · `saas-web-platform-blueprint` · `interface-craft` · `prompt-architecture` · `sylphx-platform-first`

Open any package: `skills/<id>/SKILL.md` is the contract; deeper material lives
in `references/`.

---

## How a skill is structured

```text
skills/<id>/
  SKILL.md           # name + description (when to load) + procedure body
  references/        # durable depth (optional)
  scripts/           # deterministic helpers only (optional)
  agents/            # runtime display metadata (optional; not a second SSOT)
```

- **One semantic owner** per package — no dual authoring roots.
- **Description** states when to use and when not to.
- **Runtime tools** (browse, execute, MCP, credentials) stay with the agent;
  skills teach method and expected artifacts.

Authority notes: [docs/adr/ADR-0001-public-agent-instruction-source.md](./docs/adr/ADR-0001-public-agent-instruction-source.md) ·
[docs/adr/ADR-0002-consumption-boundary-skill-reconciliation.md](./docs/adr/ADR-0002-consumption-boundary-skill-reconciliation.md)

---

## Repository map

| Path | Role |
| --- | --- |
| `skills/<id>/` | **Only** writable semantic source for packages |
| `catalog.json` | Deterministic index from frontmatter |
| `runtime/` | Install / sync / auto-sync CLI for Codex · Claude · Grok |
| `scripts/` · `tests/` | Integrity gates only |
| `docs/adr/` | Repository-level decisions |

Not in this repo: live fleet state, customer data, benchmark laboratories,
admission services, or model-provider evidence runs.

---

## Community

- **Questions & ideas** → [GitHub Discussions](https://github.com/SylphxAI/skills/discussions)
- **Bugs in the installer or package shape** → [Issues](https://github.com/SylphxAI/skills/issues)
- **Contributing a skill** → [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Security** → [SECURITY.md](./SECURITY.md)

We care about packages that encode a real, recurring job with an independent
artifact — not skill-count inflation.

```bash
git clone https://github.com/SylphxAI/skills.git
cd skills
npm test
```

---

## License & commercial posture

[MIT](./LICENSE). Inspect, fork, embed, and reuse freely.

Sylphx may offer managed updates, enterprise/private packages, Platform
integrations, verification, and support. Public text is intentionally not
exclusive; quality and continuity are the product.

---

<p align="center">
  <a href="https://sylphx.com">sylphx.com</a> ·
  <a href="https://github.com/SylphxAI">SylphxAI</a> ·
  <a href="https://github.com/SylphxAI/skills/discussions">Discussions</a>
</p>
