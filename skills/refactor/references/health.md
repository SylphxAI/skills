# Repository health

Trigger: adding, replacing or deleting code, tests, CI or documentation.

Keep the capability and remove concepts, copies and paths that no supported use needs. Line count is a signal: compressing expressions or joining unrelated logic to shrink it makes code harder to understand.

## Preserve supported uses

Before deleting a capability, check public contracts, known consumers, relevant logs and its declared capability record. Lack of observed traffic does not prove an API is unsupported. A cutover that accidentally disconnected a supported capability needs repair before cleanup.

Supported uses include production, SDK clients, development/build tools, tests and recovery. Static reachability tools produce candidates; confirm dynamic entry points and supported targets before deletion. Include current, paused and scheduled consumers, incoming symlinks and shared targets. A partial process scan does not establish that no reader exists.

Inspect tracked files and nested repositories before removing a directory. A name such as `build`, `bin` or `target`, its age, or an ignore rule does not prove all descendants are disposable. Preserve tracked source and unique or uncertain work; remove only the proven-unused subset.

## Storage cleanup evidence

Keep these quantities separate:

- Exact removed paths and their nominal allocated bytes, net of retained pointers.
- Deduplicated physical allocation, only when measured at that layer.
- Authoritative filesystem or shared-pool use before and after, with read times.

Hardlinks can make several paths refer to one inode, including a retained cache
consumer. Per-path allocation sums therefore do not establish physical bytes
freed. Shared concurrent writes also prevent attributing a pool change to one
cleanup. A requested release target does not establish that enough safe candidates
exist.

For an authorized cross-filesystem evidence move, copy first, verify the complete
file population, types, sizes and symlink targets, then remove the literal source and verify the
destination and any retained pointer. Hash unique evidence when transferring it between filesystems; do not repeat expensive hashes after the complete receipt is established.
An interrupted or unverified copy leaves the source intact and claims no release.

## Signals

- Verified unused paths and dependencies.
- Duplicate authorities for the same domain rule, schema or contract. Multiple language clients or independent concepts are not automatically duplicates.
- Whether the affected tests are selected and can fail on the behavior they claim to check.
- Runner cost, feedback time and queue delay against the repository's declared budget.
- Module cohesion, navigation and change cost; file size can flag a place to inspect rather than dictate a split.
- Links and capability statements that still match the code and delivered behavior.

Use the repository's available checks appropriate to those signals. State missing coverage instead of claiming an uninstalled check exists. Report size/duplication changes when they help assess the outcome, and record a repeated lesson beside its owning method or issue.

[Code conventions](../../deliver-and-verify/references/code.md), [developer experience](../../deliver-and-verify/references/dx.md) and [documentation](../../author-skill/references/docs.md) provide the detailed methods.
