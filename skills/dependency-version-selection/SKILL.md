---
name: dependency-version-selection
description: "Resolve and migrate runtimes, frameworks, SDKs, generators, plugins, and libraries from their authoritative current release sources. Use when creating or scaffolding a project, adding, replacing, or upgrading dependency declarations, regenerating a lock graph after dependency changes, modernizing an existing project, or reviewing dependency currency. Query live sources instead of model memory. Do not use for package metadata or script-only edits, lockfile recovery that must preserve the selected graph, choosing between fundamentally different technologies, floating mutable production versions, or selecting preview releases without an explicit experiment."
---

# Dependency Version Selection

Select current releases from live evidence, then make the resulting build
reproducible. A version remembered by the model, copied from a template, or
shown in an old example is never version-selection evidence.

Read [registry resolution](references/registry-resolution.md) for the relevant
package ecosystem. Read [runtime channels](references/runtime-channels.md) when
selecting a language runtime, compiler, SDK, or toolchain.

## Method

1. Inspect the active technology profile, manifests, lockfiles, runtime and
   platform constraints, package type, and current dependency graph. Separate
   genuine constraints from versions that are merely already installed.
2. Query the affected dependency set at its authoritative release source during
   this task: every direct dependency for project bootstrap or a currency
   review, and the changed package plus its coupled runtime, framework,
   generator, plugin, and peer set for a bounded addition. Record the source,
   observation time, stable channel, current stable release, deprecation or
   withdrawal state, and material engine or peer constraints.
3. Select the newest eligible stable production release. For a new project,
   shape the project around that release. For an existing project, cross the
   major-version boundary and perform the migration by default; do not stop at
   the newest version admitted by an obsolete manifest range.
4. Resolve a coherent set. Upgrade the runtime, framework, official plugins,
   peer dependencies, generators, type packages, linters, and adapters together
   when their contracts move together. Read official migration and release
   notes across every skipped major and apply codemods only as reviewed edits.
5. Treat a downgrade or retained older direct version as a temporary exception,
   never the easy path. It requires exact evidence that the newer stable release
   cannot satisfy a real platform, public-contract, or upstream compatibility
   constraint, plus the newest eligible fallback and a forward replacement
   condition, owner, expiry, and recheck trigger.
6. Materialize reproducibility after selection. Applications commit the exact
   resolved graph and native lockfile where the ecosystem provides one, then
   verify frozen/locked installation. Where no native lock exists, use fixed
   selectors, immutable repositories, a machine-readable resolved graph, and
   repeatable clean resolution. Published libraries declare intentional
   consumer and peer ranges, lock their own development graph where supported,
   and test the supported lower bound and newest eligible graph where
   compatibility is promised.
7. Remove superseded packages, compatibility shims, duplicate lockfiles, and
   stale configuration. Run a clean frozen/locked install where supported, or
   the declared repeatable clean-resolution check otherwise, followed by
   affected build, type/static, lint, test, contract, security, and migration
   checks.
8. If the repository already has dependency-update automation, make it target
   the same stable channel and allow major-version migration candidates. Do not
   add a new service or block the current upgrade merely to automate a future
   check.

## Selection rules

- `latest` means the newest eligible release in the selected production
  channel, not the greatest-looking version string, preview, beta, release
  candidate, nightly, canary, stale support line, or mutable production
  reference. A runtime's official active-LTS channel may be the selected
  production channel even when a newer non-LTS release exists.
- Use mutable tags such as `@latest` only to discover or invoke the current
  resolver. Commit the resolved version and integrity-bearing lock graph; never
  deploy from a mutable tag.
- Package-manager “update” commands that preserve the old major range do not
  prove currency. Compare against the live stable release explicitly.
- A security advisory, yanked/retracted release, end-of-life runtime, or
  publisher deprecation makes a version ineligible even when a lockfile still
  resolves it.
- Never claim “latest” when any retained direct dependency is older. Report the
  exact constraint and selected fallback instead.
- If the authoritative source is unavailable, preserve an already locked graph
  or report the selection as blocked. Never invent a version or call cached or
  remembered metadata current.

## Output contract

The primary artifact is the updated project: manifests, lock graph, required
code/config migration, removed predecessor paths, and passing verification.
Integrate a concise resolution record into the normal final status:

- authoritative queries and observation time;
- previous, current stable, and selected exact versions;
- stable-channel and compatibility decisions;
- migrations and removals performed;
- clean frozen/locked-install evidence where supported, or repeatable clean-
  resolution evidence otherwise, plus affected checks;
- any explicit unresolved version gap with owner, expiry, recheck trigger, and
  replacement condition.

Do not create a separate dependency report unless audit or inventory is the
requested artifact.

## Boundaries

- `technology-stack-profile` and decision methods choose the technology;
  this Skill chooses its current eligible release after that choice.
- `engineering-standard` supplies reproducibility, architecture, testing, and
  delivery constraints.
- Security response may accelerate or block a release, but it does not permit
  an unsupported silent downgrade.
