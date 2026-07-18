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

Install the per-user runtime hooks once:

```bash
npx --yes github:SylphxAI/skills auto-sync enable
```

Hook installation and runtime permission are separate. Activation follows each
runtime's native security model:

| Runtime | Activation after installation |
| --- | --- |
| Codex | Open `/hooks`, review the Sylphx command, and trust its exact definition once. Codex skips untrusted or changed definitions. Routine Skill-content updates do not change that hook definition. |
| Claude Code | User hooks run from `~/.claude/settings.json` without a separate hook-approval step, unless hooks are disabled by safe/bare mode or managed policy. |
| Grok Build | The installer uses Grok's native global user hook, which is trusted by the runtime. |

The installer never bypasses runtime trust or permission controls. The
`auto-sync status` command therefore reports **configured** separately from
**effective**; only the runtime can prove that a hook was permitted and
executed.

Updates then reconcile at the points where an agent can actually consume new
instructions: session start/resume, prompt submission, sub-agent start, and the
active tool loop. Codex checks before a tool call; Claude Code checks after a
tool batch; Grok Build checks after a tool call and hot-reloads changed Skills.
This also covers a turn that runs for hours without another user prompt.

The common path is local and cheap. Lifecycle checks share a one-second cache;
active-turn checks share a ten-second cache and a per-user single-flight lock.
Only an expired check performs one public `git ls-remote`, and only a changed
commit performs an incremental fetch and atomic Skill sync. There is no hourly
wait, background daemon, webhook relay, token, or Control Plane dependency.
When offline, the last known-good packages remain active and retries back off.
Grok uses its documented native global hook and Skill directories; its Claude
hook compatibility is guarded so it cannot perform a duplicate network check.

Each successful reconciliation converges the complete Sylphx-managed set:
new packages appear, packages removed upstream are removed locally, and an
updated package directory is replaced whole so deleted files cannot linger.
The ownership manifest limits deletion to packages previously installed by
this tool; unrelated third-party or hand-authored Skills remain untouched.

No tool can replace context while a model is continuously generating with no
lifecycle boundary. The next prompt, sub-agent, or tool boundary is therefore
the earliest safe and useful refresh point.

```bash
npx --yes github:SylphxAI/skills status
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
