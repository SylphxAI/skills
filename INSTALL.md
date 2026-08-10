# Install Sylphx Verified Capabilities

## Outcome

Install or update the Sylphx Verified Capabilities catalog (capability packages
and thin always-on constitution) for one or more of: **Codex**, **Claude
Code**, **Grok Build**.

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
4. `install` is the **static reconciliation** operation: it syncs the exact
   checked-out catalog and does not create schedulers. AutoSync is an
   explicit, separate opt-in on durable hosts:
   `node runtime/sylphx-skills.mjs auto-sync enable --agent <codex|claude|grok|all>`.
   A machine without AutoSync is a partial installation, never a false green;
   `status` reports it.
5. Folder-copy of `skills/*` alone is incomplete (skips constitution, digests,
   reconciliation, and status).

## AutoSync promotion safety

AutoSync applies **only immutable annotated release tags** (`skills-vX.Y.Z`
with a promotion manifest) — never mutable branch heads — and verifies each
candidate's promotion manifest (catalog digest and qualification projection
against the exact candidate tree, sourceRevision against the tag commit's
first parent) **before** the candidate's repository-owned CLI runs. It also
refuses to apply a candidate that would downgrade an installed `qualified`
capability to `unqualified`, or a tag older than the already applied one.
See [docs/PROMOTION.md](docs/PROMOTION.md). AutoSync requires at least one
promoted release tag to exist; until then `auto-sync enable` fails closed with
a clear error. Qualification state is visible per package in `status --json`.

## Clear

```bash
node runtime/sylphx-skills.mjs clear --agent <codex|claude|grok|all>
```

## Model

See [docs/MODEL.md](./docs/MODEL.md) and [docs/NORTH-STAR.md](./docs/NORTH-STAR.md).
Capabilities are specialized task packages with contracts and honest
qualification records, not a policy encyclopedia.
