---
status: accepted
date: 2026-07-22
owners:
  - SylphxAI
---

# ADR-0014: Unify software distribution around one artifact owner

## Context

The existing `app-store-distribution-readiness` package already owns exact
artifacts, signing, install/update/uninstall behavior, rollout, recovery, and
live channel readback. Its visible name and trigger describe only apps and
stores, however, so command-line, package-manager, registry, container, and
direct-download work can miss the owner.

Adding a CLI-specific Skill would duplicate the same distribution state
machine and Distribution Evidence Pack. CLI is a software product format;
npm, Homebrew, WinGet, Cargo, installers, containers, and stores are channels,
not separate semantic jobs.

## Decision

1. Rename and broaden `app-store-distribution-readiness` to
   `software-distribution-readiness`. Preserve one owner and one Software
   Distribution Contract and Distribution Evidence Pack across CLI, direct,
   package-manager, registry, container, app-store, desktop, PC, and console
   channels.
2. Treat a Rust or other native executable as the product artifact. npm/npx,
   Homebrew, WinGet, Cargo metadata, shell/PowerShell installers, OCI images,
   and other package-manager entries are selected adapters over one release
   identity, not separate implementations or release authorities.
3. Build one immutable artifact set per release and bind every selected adapter
   to exact target digests. Where repackaging is unavoidable, record and verify
   the relationship between source and package digests.
4. Select channels from intended user journeys and maintenance value. Do not
   require every package manager by checklist.
5. Keep generic shipped-state proof in `delivery-standard`, the wider developer
   journey in `developer-product-experience-review`, listing conversion in
   `store-listing-optimization`, and cross-domain launch admission in
   `launch-readiness-review`.
6. Keep all source, build, artifact, publication, rollout, credential, and
   rollback mutations in the active product repository and delivery profile.
   The distribution Skill defines and audits the contract and evidence pack; it
   is not a release control plane.

## Consequences

- A Rust CLI with an npm entry does not need a second implementation; npm is a
  thin launcher or verified distributor for the native artifact.
- Direct release assets, POSIX and PowerShell installers form a portable
  baseline; Homebrew, npm/npx, WinGet, Cargo, OCI, and other channels are added
  when their audience and lifecycle value justify them.
- Release tooling may generate adapters, but generated output does not replace
  artifact identity, clean-environment tests, consumer-side readback, or
  recovery behavior.
- No second CLI Skill or compatibility alias remains. Inbound owner references
  move to the broader package so native injection sees one owner.
- Explicit invocations migrate from `$app-store-distribution-readiness` to
  `$software-distribution-readiness`; the retired identifier is not retained as
  a second discoverable package.
- The broadened Skill composes with Delivery Standard and does not emit a
  redundant delivery report.

## Verification

- Validate the Skill package and all local references.
- Exercise natural positive, compound, and near-neighbour routing fixtures.
- Rebuild the derived catalog.
- Run the repository test and package-dry-run suite.
