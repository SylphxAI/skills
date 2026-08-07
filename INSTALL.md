# Install Sylphx Skills

## Outcome

Install or update the Sylphx Agent Skills catalog and thin always-on constitution
for one or more of: **Codex**, **Claude Code**, **Grok Build**.

## Agent procedure

From this exact repository checkout, run the repository-owned adapter:

```bash
node runtime/sylphx-skills.mjs install --agent <codex|claude|grok|all>
```

Then verify:

```bash
node runtime/sylphx-skills.mjs status --agent <same>
```

Current means the installed package digests match this checkout's catalog and
the constitution projection is present.

## Rules

1. Use the adapter from the **supplied exact checkout**. Do not run a cached or
   PATH-discovered historical installer as a substitute.
2. Only touch runtimes the user explicitly included.
3. Preserve third-party skills and unrelated user files.
4. Managed AutoSync is part of a complete install when the adapter enables it.
5. Folder-copy of `skills/*` alone is incomplete (skips constitution, digests,
   reconciliation, and status).

## Clear

```bash
node runtime/sylphx-skills.mjs clear --agent <codex|claude|grok|all>
```

## Model

See [docs/MODEL.md](./docs/MODEL.md). Skills are specialized task packages, not
a policy encyclopedia.
