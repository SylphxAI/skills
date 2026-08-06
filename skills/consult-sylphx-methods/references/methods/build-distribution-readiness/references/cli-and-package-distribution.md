# CLI And Package Distribution

Use this module when the selected software product includes a command-line
executable, direct binary download, registry launcher, package-manager entry,
container invocation, or one-command installer.

## Product and adapter model

The executable is the product artifact. npm/npx, Homebrew, WinGet, Cargo
metadata, shell or PowerShell installers, OCI images, and direct-download pages
are distribution adapters.

Use one release identity:

```text
source revision + version + controlled and pinned build inputs
-> immutable artifact per supported target
-> digest + provenance + SBOM + signature/attestation
-> selected thin channel adapters
-> clean install/upgrade/uninstall verification
-> registry and installed-binary readback
```

Claim reproducibility only when an independent rebuild comparison proves it.

“Build once” means one immutable, tested target-artifact set for a release. Each
supported target may have a distinct artifact; downstream adapters must not
silently rebuild, substitute, or select a separate “latest” executable. A
declared source-install channel is a different installation contract: bind the
same source revision and version plus controlled toolchain inputs, emit its own
artifact/provenance identity, and never call its output byte-identical to a
prebuilt release.

Record:

```text
command, release owner, audiences and invocation journeys:
version, source revision and controlled build inputs:
supported OS / architecture / libc or runtime matrix:
artifact names, media types and digests:
provenance, SBOM, signature/attestation and signing identity reference:
selected channels and selection reason:
adapter -> exact target-artifact mapping:
install location, path ownership and first useful command:
upgrade, downgrade, uninstall, deprecation and recovery:
clean-environment tests and negative integrity tests:
published registry/release identities and observed readback:
unsupported targets, blockers and support policy:
```

## Channel selection

Select a channel when it removes material adoption friction for an intended
audience and can remain consistent with the same release identity.

| Channel | Select when | Required contract |
| --- | --- | --- |
| Signed direct release assets | Default public baseline for a downloadable CLI | Immutable archives for supported targets, versioned URLs, hashes, provenance, SBOM, notes, and consumer verification. GitHub Releases or an owned artifact service may host them. |
| POSIX shell installer | Unix users need a one-command path independent of a package manager | Detect OS, architecture and libc; fetch a selected version; verify before atomic install; avoid root by default; expose install directory and non-interactive behavior. Never make `curl \| sh` the only inspectable route. |
| PowerShell installer | Windows users need the equivalent direct path | Apply native target detection, integrity, install scope, atomicity, proxy and error semantics. POSIX coverage is not Windows coverage. |
| Homebrew formula, cask or tap | macOS or Linux developers normally use `brew install` | For exact prebuilt bytes, use a suitable tap formula or cask that pins release URLs/hashes. A source formula binds exact source/dependencies and accepts a distinct bottle/build identity. Install completions where appropriate and run a meaningful test. |
| npm / npx adapter | Node users or JavaScript automation are intended journeys | Keep a thin launcher/distributor for the exact native binary. Do not reimplement the product in JavaScript or compile Rust during an ordinary install. |
| WinGet | General Windows developer/operator installation is selected | Bind package identity, architecture, hashes, install, upgrade and uninstall; verify catalog availability after publication. |
| Cargo install | Rust developers need a supported source-install route | Treat it as an additional source-build journey, not proof of prebuilt cross-platform distribution. Declare Rust/toolchain and native dependency floors. |
| OCI image | CI, server, sandbox or hermetic automation is a real journey | Pin executable and image digests, use a minimal non-root runtime, and publish only supported architecture indexes. Do not force interactive local users through a container. |
| deb, rpm, Nix, AUR, Scoop, Chocolatey or another ecosystem | Audience demand, enterprise policy, offline use, or platform convention justifies lifecycle cost | Require an owner, automated update, exact artifact mapping, clean install and external readback. |

For a public cross-platform developer CLI, signed release assets plus POSIX and
PowerShell installers form a strong portable baseline. Add Homebrew, npm/npx,
WinGet, Cargo, OCI, or other channels where their users actually benefit. A
commercial product may use an owned release service; the immutable identity and
verification rules remain the same.

Select targets from audience evidence and dependency support. A common starting
candidate is macOS arm64/x86-64, Linux x86-64/arm64 on the selected libc, and
Windows x86-64; it is not a universal requirement. Rust target-tier status
shows compiler support, not product testing, dependency compatibility, signing,
installer quality, or a support commitment.

Do not prescribe Homebrew Formula versus Cask from the word “CLI” alone.
Retrieve current Homebrew policy and choose by distribution promise: a core
Formula normally builds versioned source and may receive Homebrew-built bottles;
a Cask `binary` or suitable tap can distribute an upstream prebuilt executable.
Name the resulting identity honestly rather than asserting both routes install
the same bytes.

## Rust executable with npm and package managers

For a Rust CLI, the compiled Rust executable is the product; there is no need
for a separate “Rust adapter.” Choose one explicit npm model:

1. **Platform packages:** a small launcher plus platform-specific packages
   constrained by npm `os`, `cpu`, and, where needed, `libc`, usually through
   optional dependencies.
2. **Verified fetcher:** a small launcher that detects the platform and fetches
   the matching immutable release asset, binding package version, URL and
   digest and failing on unsupported or unverifiable states.

Do not let npm installation resolve an unrelated latest binary, download a
mutable URL, compile an uncontrolled native tree, or fall back to a behaviorally
different JavaScript implementation. Prebuilt Homebrew, WinGet and other
metadata also reference the same release set. If an ecosystem requires
repackaging, record both source-artifact and package digests and verify their
relationship. If it builds from source, record the source revision,
dependency/toolchain inputs, produced package identity and provenance instead
of asserting executable-byte equality.

Release tools such as `dist` can generate target archives, shell and PowerShell
installers, npm packages, Homebrew formulae, checksums, and workflows. They are
implementation options, not proof; retain the explicit artifact map, tests,
publication state, and recovery semantics.

## Integrity and lifecycle

- Build in a controlled release environment from the declared revision.
- Emit cryptographic digests, build provenance, and a machine-readable SBOM.
- Sign or attest artifacts and platform packages using protected workload
  identity or a signing service; do not expose raw keys to general agents.
- Prefer registry trusted publishing or short-lived workload identity over
  long-lived publication tokens.
- Verify whether the selected registry trusts the actual release runner. If a
  self-hosted builder is not eligible for registry OIDC, a minimal supported
  publish-only job may consume and verify the already-built artifact; it must
  not rebuild the release.
- Apply macOS code-signing/notarization and the selected Windows signing path
  where direct-distribution trust expectations require them.
- Verify a download before execution or atomic replacement. Fail closed on an
  unknown platform, missing digest, signature failure, truncation, wrong
  version, unsafe target path, or interrupted replacement.
- Define command name, aliases, help, version, exit codes, first useful command,
  supported targets, install scope, PATH ownership, completions, man pages,
  notices, proxy/offline behavior, and user-data locations.
- Define conflicts when another channel owns the command, N-1 to N migration,
  downgrade boundaries, uninstall, retained user data, deprecation, support,
  and rollback, repair, or forward-fix.
- Select one update authority for an installation. Do not let a package manager
  and self-updater race. Do not silently self-update by default merely because
  it is possible.

Checksums protect only when obtained through a trusted release path. Convenience
must not turn `curl | sh`, `irm | iex`, an npm lifecycle script, or a self-updater
into execution of unauthenticated mutable content.

Reject a Homebrew plan that says only “use Formula” or “use Cask” without
resolving source-build versus upstream-prebuilt identity and current channel
eligibility.

## Verification

Apply only the cases selected by the declared channel behavior and failure
model; do not manufacture proxy, downgrade, self-update, or conflict tests for
a channel that has no such behavior.

1. Have the delivery owner build every selected target, then verify release
   manifest, digest, provenance, SBOM, and signing/attestation.
2. Install every claimed channel-by-target row in a clean supported environment
   without a source checkout or compiler unless source installation is the
   promise. Untested rows remain unknown.
3. Assert installed executable digest or attestation against the declared
   adapter mapping, exact `--version`, help, and one useful non-destructive
   command.
4. Exercise unsupported target, wrong architecture, corrupt/truncated download,
   digest/signature mismatch, unavailable registry, proxy/offline mode, unsafe
   path, and interrupted replacement.
5. Exercise N-1 to N upgrade and, where supported, downgrade, repair,
   forward-fix, channel conflict, and uninstall while preserving user-owned
   state.
6. Read back release, formula/package/manifest version, hashes and availability
   from each external channel; record `observed_at`, the freshness boundary and
   re-query triggers, then install again from the published route. Retract an
   installability claim when its mutable observation becomes stale.

Local tests prove a candidate. Workflow success proves only reported automation
success. Name the observed state: prepared, published, indexed, installable,
installed, or production-proven.

## Official research routes

Refresh volatile requirements at execution. These sources were reachable on
2026-07-22:

- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [GitHub immutable releases](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases)
- [GitHub artifact and SBOM attestations](https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations)
- [`gh release verify`](https://cli.github.com/manual/gh_release_verify)
- [npm optional dependencies, OS, CPU and libc metadata](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [npm provenance statements](https://docs.npmjs.com/generating-provenance-statements/)
- [npm trusted publishing with OIDC](https://docs.npmjs.com/trusted-publishers/)
- [Homebrew Formula Cookbook](https://docs.brew.sh/Formula-Cookbook)
- [Homebrew Cask Cookbook](https://docs.brew.sh/Cask-Cookbook)
- [Homebrew acceptable formulae](https://docs.brew.sh/Acceptable-Formulae)
- [Cargo install](https://doc.rust-lang.org/cargo/commands/cargo-install.html)
- [Rust platform support](https://doc.rust-lang.org/rustc/platform-support.html)
- [`dist` installer documentation](https://axodotdev.github.io/cargo-dist/book/installers/index.html)
- [Windows Package Manager manifests](https://learn.microsoft.com/en-us/windows/package-manager/package/manifest)
- [Windows Package Manager repository validation](https://learn.microsoft.com/en-us/windows/package-manager/package/repository)
- [Windows SignTool](https://learn.microsoft.com/en-us/windows/win32/seccrypto/signtool)
- [Apple software notarization](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)

Do not freeze current action versions, registry limits, target lists, signing
requirements, formula acceptance rules, or review timing in this module.
