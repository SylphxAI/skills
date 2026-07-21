# Sylphx Skills

[![CI](https://github.com/SylphxAI/skills/actions/workflows/check.yml/badge.svg)](https://github.com/SylphxAI/skills/actions/workflows/check.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](./package.json)
[![Agent Skills](https://img.shields.io/badge/agent%20skills-107%20packages-111827.svg)](./catalog.json)

**Working methods for AI agents — installed by the agent that needs them.**

Sylphx Skills is the public, MIT-licensed library of how Sylphx agents design,
build, verify, deliver, operate, and grow software. It supports
[Codex](https://openai.com/codex),
[Claude Code](https://docs.anthropic.com/en/docs/claude-code), and
[Grok Build](https://grok.x.ai/).

Give this to your agent:

> Install this: https://github.com/SylphxAI/skills

That is the complete user procedure. The agent reads [`INSTALL.md`](./INSTALL.md),
detects its environment, installs the exact Skill catalog and compact runtime
constitution, enables managed AutoSync, enrolls the canonical Sylphx Enact
SaaS endpoint through native OAuth, preserves unrelated configuration,
and verifies the result in a fresh context. The repository never asks the user
to translate that outcome into shell commands.

The root [`SKILL.md`](./SKILL.md) is a discovery bootstrap for clients that
pre-route repository installation through a generic Skill installer. It sends
the agent to `INSTALL.md` before any leaf-package operation. Folder copying
alone omits the managed source manifest, compact constitution, idempotent
reconciliation, and fresh-context proof; changing other runtimes without an
explicit request exceeds the installation scope.

Updates also converge installations that still point at the retired Doctrine
runtime. Only the exact per-user Sylphx legacy projection is eligible: the
adapter preserves local notes, installs a regular digest-bound constitution,
and does not alter the retired target. It also validates POSIX ownership and
permissions where those metadata are authoritative. Unknown links and imports
remain fail-closed.

Codex also discovers the shared `~/.agents/skills` root. An earlier installer
placed a second Sylphx catalog there, including retired packages. The adapter
recognizes only its exact historical manifest, source commit, package set, and
package digests, then archives those packages outside native discovery while
preserving unrelated shared Skills. Status is not current, and clear is not
complete, while a recognized, interrupted, or invalid legacy projection
remains. Unknown, modified, or lookalike projections fail closed.

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
| **Agent-owned adoption** | Install, update, integration enrollment, and readback are outcomes owned by the receiving agent |
| **OS auto-update** | Standard launchd / systemd / Task Scheduler enrollment — no daemon we host |

Commercial Sylphx value is continuous maintenance, private customer packages,
Platform integrations, and support — **not** pretending public Markdown is
secret.

---

## Install, update, or inspect

Installation is intentionally prompt-native:

> Install this: https://github.com/SylphxAI/skills

For a later exact-source update:

> Update my Sylphx Skills from https://github.com/SylphxAI/skills and verify them in a fresh context.

To repair or re-enable managed updates explicitly:

> Keep my Sylphx Skills current from https://github.com/SylphxAI/skills.

For readback without mutation:

> Verify my Sylphx Skills installation and report any drift without changing it.

The agent uses the repository-owned adapter internally. Humans do not need to
select a runtime, locate a home directory, invoke a package manager, or repair
permissions. If the environment cannot safely persist a required surface, the
agent reports a typed partial or blocked result instead of delegating repair to
the user.

### Managed update behavior

The command uses the operating system's built-in per-user scheduler: launchd on
macOS, a systemd user timer on Linux, and Task Scheduler on Windows. Each tick
verifies the installed catalog, profile metadata, source commit, and package
bytes and checks the public remote head. Either a changed commit or local drift
triggers an exact-source resync. There are no agent hooks, runtime
approvals, resident daemons, webhook relays, tokens, or Enact
dependencies. When offline, a verified last-known-good generation remains
active and retries back off.

Each successful reconciliation converges the complete Sylphx-managed set as one
verified target generation: new packages, changed package bytes, removals, and
the ownership manifest commit together through an ownership-proven recoverable
journal under a fenced per-target writer lock. One managed-generation pointer
switches every package and the manifest together, so a crash recovers to one
complete old or new generation rather than mixed packages. The target root
stays stable: unrelated third-party or hand-authored Skills never enter the
managed journal and are never copied, moved, or deleted by the switch.

An already-running agent may not reload a changed Skill until that runtime's
next normal reload boundary. The files themselves converge within the selected
interval.

The deterministic adapter exposes install, status, clear, and scheduled-sync
operations to agents and automation. Those operations are implementation
mechanisms, not a user installation interface.

### Sylphx Enact integration

Static Skills and live coordination remain separate authorities. Every
installation validates and registers the stable Sylphx SaaS MCP resource
`https://enact.sylphx.com/api/mcp` through Codex, Claude Code, or Grok Build's
native MCP configuration. The hostname is public product identity, not a
credential or tenant grant. Codex and Claude use their native OAuth login
command; Grok starts its native browser flow when the server connects. OAuth
account, tenant, scopes, expiry, and revocation determine access. A runtime
without safe OAuth support is partial rather than receiving a copied bearer
token. See [`INSTALL.md`](./INSTALL.md) and
[`ADR-20260720`](./docs/adr/ADR-20260720-agent-owned-installation-and-constitution.md).

---

## What you get

**107 packages** in four families (see [`catalog.json`](./catalog.json) for the
machine index and [`skills/`](./skills/) for sources):

### Standards & profiles

How we run engineering across projects — delivery, CI admission, incidents,
agent-first development, enterprise control planes, profiles, and more.

Examples: `engineering-standard` · `delivery-standard` · `agent-first-development-standard` · `work-coordination-standard` · `technology-stack-profile`

### Analysis, decision & agent-system methods

Independent methods with precise native-injection triggers and concrete
artifacts: critical analysis, design-space exploration, structured
deliberation, evidence synthesis, requirements, user research, decision quality
and optimization, probabilistic forecasting, causal inference, system dynamics,
agent planning/context, semantic taxonomy, threat modeling, objective review,
provenance, and finite review closure.

Examples: `critical-analysis` · `structured-deliberation` · `evidence-synthesis` · `requirements-engineering` · `security-threat-modeling`

### Product procedures

Bounded design/audit jobs with a concrete artifact: payments, privacy, growth
loops, marketplace trust, support ops, launch readiness, game economy, …

Examples: `payment-platform-readiness` · `privacy-data-lifecycle-review` · `saas-subscription-pricing` · `launch-readiness-review`

### Blueprints & craft

Whole-product and craft surfaces: app/game/SaaS blueprints, interface craft,
prompt architecture, multi-repository migration, skill authoring.

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
- **Description** front-loads the concrete job, artifact, nearby contexts, and
  exclusions. Codex and Claude document semantic selection over metadata;
  trigger words are anchors, not a literal keyword router. Other runtimes keep
  their own documented invocation/discovery semantics.
- **Native injection** in metadata-selecting runtimes such as Codex and Claude
  starts from `name` and `description`, then loads the body and references after
  selection. Their context/listing budgets may shorten descriptions or omit
  entries, so installation proves available bytes—not that every package was
  visible or selected for a given task. Material routes need fresh evidence
  from each supported native runtime.
- There is no repository meta-router, dependency graph, or manual selection
  ceremony. Several relevant packages may compose, but each requested artifact
  still has one semantic owner.
- **Compound tasks** may load several useful Skills. One owner produces each
  requested artifact while standards constrain it without duplicate reports.
- **Runtime tools** (browse, execute, MCP, credentials) stay with the agent;
  skills teach method and expected artifacts.

Authority notes: [docs/adr/ADR-0001-public-agent-instruction-source.md](./docs/adr/ADR-0001-public-agent-instruction-source.md) ·
[docs/adr/ADR-0002-consumption-boundary-skill-reconciliation.md](./docs/adr/ADR-0002-consumption-boundary-skill-reconciliation.md) ·
[docs/adr/ADR-0009-native-skill-discovery-and-package-boundaries.md](./docs/adr/ADR-0009-native-skill-discovery-and-package-boundaries.md) ·
[docs/adr/ADR-0010-observability-audience-boundaries.md](./docs/adr/ADR-0010-observability-audience-boundaries.md)

---

## Repository map

| Path | Role |
| --- | --- |
| `skills/<id>/` | **Only** writable semantic source for packages |
| `catalog.json` | Deterministic index from frontmatter |
| `runtime/` | Agent-facing install / sync / auto-sync / verified MCP enrollment adapters and compact constitution |
| `INSTALL.md` | Environment-neutral installation contract for the receiving agent |
| `scripts/` · `tests/` | Integrity gates only |
| `docs/adr/` | Repository-level decisions |

Not in this repo: live work or organization-wide adoption state, customer data, benchmark laboratories,
admission services, or model-provider evidence runs.

---

## Community

- **Questions & ideas** → [GitHub Discussions](https://github.com/SylphxAI/skills/discussions)
- **Bugs in the installer or package shape** → [Issues](https://github.com/SylphxAI/skills/issues)
- **Contributing a skill** → [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Security** → [SECURITY.md](./SECURITY.md)

We care about packages that encode a real, recurring job with an independent
artifact — not skill-count inflation. Contributors can give the repository and
their intended change to an agent; the repository instructions require that
agent to run the complete integrity suite before delivery.

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
