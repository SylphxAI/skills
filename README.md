# Sylphx Skills

Public, agent-first operating standards and reusable procedures from SylphxAI.
This repository is the canonical static instruction source for how Sylphx
agents design, build, verify, deliver, operate, and grow software.

The packages are public on purpose. They document our working methods and make
Sylphx products—especially Sylphx Platform—easy for agents to discover and use.

## Install or update

No global package installation is required. The command detects Codex, Claude
Code, and Grok Build and synchronizes every canonical package into their native
skill roots:

```bash
npx --yes github:SylphxAI/skills sync
```

When the npm alias is published, the shorter equivalent is:

```bash
npx --yes sylphx-skills sync
```

Optional overrides remain available for automation and testing:

```bash
npx --yes github:SylphxAI/skills sync --agent codex
npx --yes github:SylphxAI/skills sync --agent claude
npx --yes github:SylphxAI/skills sync --agent grok
npx --yes github:SylphxAI/skills sync --agent all
```

## Automatic updates

Enable automatic synchronization once:

```bash
npx --yes github:SylphxAI/skills auto-sync enable
```

The default interval is 10 minutes. Set another whole-minute interval when
needed:

```bash
npx --yes github:SylphxAI/skills auto-sync enable --interval 5m
npx --yes github:SylphxAI/skills auto-sync enable --interval 30m
npx --yes github:SylphxAI/skills auto-sync enable --interval 1h
```

The command uses the operating system's built-in per-user scheduler: launchd on
macOS, a systemd user timer on Linux, and Task Scheduler on Windows. Each tick
performs one public remote-head check. Only a changed commit is fetched and
applied. There are no agent hooks, runtime approvals, resident daemons, webhook
relays, tokens, or Control Plane dependencies. When offline, the last known-good
packages remain active and retries back off.

Each successful reconciliation converges the complete Sylphx-managed set:
new packages appear, packages removed upstream are removed locally, and an
updated package directory is replaced whole so deleted files cannot linger.
The ownership manifest limits deletion to packages previously installed by
this tool; unrelated third-party or hand-authored Skills remain untouched.

An already-running agent may not reload a changed Skill until that runtime's
next normal reload boundary. The files themselves converge within the selected
interval.

```bash
npx --yes github:SylphxAI/skills status
npx --yes github:SylphxAI/skills auto-sync status
npx --yes github:SylphxAI/skills auto-sync disable
npx --yes github:SylphxAI/skills clear
```

## Repository boundary

- `skills/<id>/` is the only writable semantic source for a package.
- `catalog.json` is a deterministic index built from package frontmatter.
- `runtime/` contains the small Codex/Claude/Grok sync adapter.
- `scripts/` and `tests/` protect package and installer integrity only.
- Live fleet state, work, effects, customer data, benchmark runs, and model
  evaluation results do not belong here.

Every package is self-contained. Detailed material belongs in its
`references/` directory; package-specific deterministic helpers belong in its
`scripts/` directory. Runtime-specific display metadata may live under
`agents/` without becoming a second instruction authority.

## Use and commercial posture

The repository is MIT licensed. Anyone may inspect and reuse the methods.
Sylphx commercial value comes from continuously maintained instructions,
managed synchronization, verified releases, enterprise profiles, private
customer packages, product integrations, and support—not from pretending that
public Markdown is exclusive.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). The complete local check is intentionally
small:

```bash
npm test
```
