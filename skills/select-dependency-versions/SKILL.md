---
name: select-dependency-versions
description: Select package, runtime, framework, SDK, plugin, or tool versions from current authoritative sources. Use when adding, upgrading, or pinning a dependency.
---

# Select Dependency Versions

Choose an exact supported version that fits the active repository and current upstream state.

## Method

1. Identify the package, ecosystem, owning manifest, runtime constraints, compatibility range, and deployment target.
2. Query the official registry, release page, support policy, and security advisory source in the current session.
3. Choose the latest stable version compatible with the repository's supported runtimes and public contracts.
4. Review its release notes and migration guide across every version crossed by the upgrade.
5. Apply the exact version through the ecosystem's standard manifest and lockfile workflow.
6. Run the repository's install, compile, tests, and representative runtime path.
7. Update code or configuration for documented breaking changes and repeat the changed-path checks.

## Selection rules

- Use immutable production pins where the ecosystem supports them.
- Select prerelease channels when the product explicitly targets that channel.
- Let the native package manager own transitive resolution and lockfile format.
- Prefer upstream-supported combinations over locally invented compatibility layers.
- Recheck current official sources whenever the decision is revisited.

For Sylphx products, the company
[stack standard](https://github.com/SylphxAI/owner/blob/main/standards/stack.md)
selects roles and technology families. Resolve current supported versions live;
do not turn this skill into a competing or stale stack.

## Output

Return the selected version, official source links, compatibility reason, files changed, commands run, and any upstream constraint that remains.
