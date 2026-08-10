# AutoSync promotion authority

## Why this exists

AutoSync runs the repository's own CLI under the user's privileges. It must
therefore execute **only immutable, verified candidates** — never the current
head of a mutable branch, where any landed commit (or compromised push) becomes
the next thing every subscribed machine executes.

The promotion channel is:

> source (`main`, CI-green) → **annotated release tag `skills-vX.Y.Z` with a
> promotion manifest** → AutoSync applies only that tag's commit.

## The chain

1. **Source.** A change lands on `main` only through the normal PR / Merge
   Queue admission (branch protection, `check.yml` on PR head and
   `merge_group`).
2. **Promotion.** An operator starts `release-promotion` (workflow_dispatch)
   with `X.Y.Z`. The workflow runs `npm test` on the exact main tip, then
   `scripts/promote-release.mjs`:
   - writes `promotion.json` with `sourceRevision` = the main tip being
     promoted, `catalogDigest` = sha256 of `catalog.json`, and the catalog's
     `qualifiedNames` projection;
   - commits exactly one manifest commit;
   - creates the **annotated** tag `skills-vX.Y.Z` at that commit and pushes
     the tag. The manifest commit exists only inside the tag, so `main` never
     carries promotion artifacts.
3. **Execution.** The installed reconciler (`runtime/reconcile.mjs`) lists
   `refs/tags/skills-v*` and applies the highest semantic version. It refuses:
   - lightweight tags (only annotated tags are candidates);
   - tags whose promotion manifest is missing, unrecognized, or whose
     `catalogDigest` / `qualifiedNames` do not match the candidate tree
     (verified against canonical git blobs, not EOL-normalized worktree bytes);
   - manifests whose `sourceRevision` is not the tag commit's first parent;
   - a tag older than the already applied one (promotion regression);
   - unverified tags when `requireVerifiedTag: true` is set (via
     `git verify-tag`, which requires a GPG/SSH signature on the tag).

## Signature hardening

Annotated tags plus the manifest checks make the candidate immutable and
tree-bound, but they do not by themselves prove publisher intent. Production
fleets that must not trust the promotion workflow's write access to the
repository should:

- sign release tags with a GPG key (or SSH key) held outside CI, and
- set `"requireVerifiedTag": true` in the AutoSync config
  (`~/.sylphx-skills/config.json`) and install the matching public key in the
  machine's git keyring.

Without `requireVerifiedTag`, the authority is repository governance + tag
immutability; with it, the authority is cryptographic.

## Legacy branch-following configs

AutoSync configs written before this channel (`schemaVersion: 1`) are retired.
The reconciler fails closed with a message pointing to `auto-sync enable`; it
never silently migrates or continues following `main`. Re-run
`sylphx-skills auto-sync enable --agent <runtime>` to adopt release-tag
promotion.
