---
name: build-distribution-readiness
description: "Prepare and verify a signed product package for its distribution channels: install, update, uninstall, and live readback. Use for the binary or package, not for writing the store listing."
---

# Build Distribution Readiness

Prepare the exact product artifact for the channels its audience uses. Keep
local build, upload, review, publication, indexing, installation, and live
behavior as distinct facts.

## Resource selection

- Read [distribution channel matrix](./references/distribution-channel-matrix.md)
  for app stores, web/PWA, Microsoft Store, Steam, PC storefronts, and consoles.
- Read [CLI and package distribution](./references/cli-and-package-distribution.md)
  for direct downloads, shell and PowerShell installers, npm, Homebrew, WinGet,
  Cargo, OCI, and command-line update ownership.
- Read [desktop and PC release readiness](./references/desktop-and-pc-release-readiness.md)
  for macOS, Windows, signing, installers, launchers, and storefront behavior.
- Read [release communication](references/release-communication.md) when the
  release needs a changelog, update note, migration notice, patch note, support
  brief, or incident follow-up.
Store listing copy and creatives belong to `optimize-store-listing`.

Current official channel requirements own execution-time details.

## Method

1. Identify the audience, invocation journey, territories, selected channels,
   exact source revision, version, product artifacts, build inputs, target
   systems, signing owner, support path, and release owner.
2. Retrieve current official package, metadata, privacy, commerce, review,
   certification, and publication requirements for those channels.
3. Build or adapt each selected package from the owner-approved artifact. A
   source-build channel binds the exact source revision and controlled build
   inputs. Keep the artifact relationship visible through repackaging.
4. Verify compatibility, signing and integrity, install, first launch, update,
   downgrade or migration where supported, uninstall, configuration, platform
   integration, and recovery on clean representative systems.
5. Submit or publish through the owning channel and read back its actual state.
   Record external review or certification decisions from the partner surface.
6. Bind release communication to the exact shipped identity, audience, user
   impact, compatibility action, locale, destination, and correction path.
7. Report each channel at its strongest observed layer and assign every material
   defect or pending external decision to its owner and next action.

## Acceptance

- Every selected channel maps to the owner-approved artifact or declared source
  build and passes integrity verification before execution.
- Clean installation, update ownership, recovery, and support behavior work for
  the selected operating systems, architectures, runtimes, and channels.
- Paid channels align price, renewal, cancellation, restoration, refund,
  ledger, entitlement, reviewer materials, and support semantics.
- Mutable rules, fees, quotas, review state, and publication state come from
  the current official source at execution.
- Local, uploaded, approved, published, indexed, installed, released, and live
  claims match the layer actually observed.

## Output

Return the selected channels and reasons; exact artifact or source-build
identity; per-channel package, signing, compatibility, install, update,
uninstall, metadata, privacy, commerce, review, publication, recovery, and
support results; release communication where needed; and material defects or
pending external decisions with owners and next actions.
