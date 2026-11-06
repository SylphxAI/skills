# Preserve stranded work

Trigger: an execution environment disappears, loses access, or will be retired
while repositories may contain unpublished work.

Recovery starts from surviving bytes, not a remembered patch. Through supported
access, inventory every repository and worktree, including detached worktrees.
For each, record HEAD, upstream, commits absent from the remote, staged changes,
unstaged changes, untracked files and submodule state. Inspect ignored files for
unique source too; never sweep credentials, caches or personal files into a
snapshot. If storage is unavailable, record that gap and ask its owner to recover
it; do not reconstruct work from memory and call it recovered.

## Snapshot without changing the worktree

Coordinate with its writer so the snapshot is consistent. Do not checkout,
reset, stash, clean or change the real index. Use a temporary index:

1. Preserve HEAD as the snapshot parent; this retains its unpublished ancestry.
   Copy the real index to a temporary path and set `GIT_INDEX_FILE` to that path.
2. Run `git write-tree` against the copied index to preserve the staged version.
   Create a commit with `git commit-tree`, using HEAD as parent and the normal
   author identity. This keeps staged content even when the working file differs.
3. Against that same temporary index, stage the reviewed working files and
   deletions with `git add`, including reviewed untracked source explicitly.
   Write another tree and commit it with the staged snapshot as parent. This
   preserves both staged and working versions. Record intentional exclusions;
   unresolved index conflicts need separate preservation before proceeding.
4. Push the resulting commit to a unique `rescue/<recovery-name>` branch without
   force-push, using the normal repository author identity. Preserve additional
   unpublished branch tips under separate rescue refs if they are not ancestors
   of the snapshot. Recover submodule repositories independently.
5. Read the remote refs back and fetch into an isolated location. Compare commit
   IDs, trees and the inventory with the expected content. Confirm the original
   HEAD, real index and worktree stayed unchanged. Remove only the temporary
   index and send the owner the exact repository, rescue refs, commit IDs and any
   omissions. A local snapshot or a successful push alone is not remote recovery
   verification. Source rescue refs still use the normal PR/merge path to ship.

## Secret-scanner findings

Scan the snapshot and unpublished ancestry before publishing. Review findings
through the [scanner finding procedure](../../deliver-and-verify/references/security.md#secret-scanner-publication-refusals).
Keep real or uncertain secrets in authorized private recovery storage while the
owner follows credential recovery; never push private history to a public repository.
