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
supported target may have a distinct artifact. Downstream adapters bind to the
declared target artifact. A source-install channel has its own installation
contract: bind the same source revision and version plus controlled toolchain
inputs, then emit its own artifact and provenance identity.

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
| POSIX shell installer | Unix users need a one-command path independent of a package manager | Detect OS, architecture and libc; fetch a selected version; verify before atomic install; use user scope by default; expose install directory and unattended behavior; publish an inspectable script and direct artifact route. |
| PowerShell installer | Windows users need the equivalent direct path | Apply native target detection, integrity, install scope, atomicity, proxy and error semantics. Verify Windows as its own target. |
| Homebrew formula, cask or tap | macOS or Linux developers normally use `brew install` | For exact prebuilt bytes, use a suitable tap formula or cask that pins release URLs/hashes. A source formula binds exact source/dependencies and accepts a distinct bottle/build identity. Install completions where appropriate and run a meaningful test. |
| npm / npx adapter | Node users or JavaScript automation are intended journeys | Keep a thin launcher/distributor for the exact native binary. Ordinary installs select a prebuilt target artifact. |
| WinGet | General Windows developer/operator installation is selected | Bind package identity, architecture, hashes, install, upgrade and uninstall; verify catalog availability after publication. |
| Cargo install | Rust developers need a supported source-install route | Treat it as a source-build journey with declared Rust/toolchain and native dependency floors. Prebuilt channels retain their own target verification. |
| OCI image | CI, server, sandbox or hermetic automation is a real journey | Pin executable and image digests, use a minimal unprivileged runtime, and publish supported architecture indexes. Interactive local users keep a native installation route. |
| deb, rpm, Nix, AUR, Scoop, Chocolatey or another ecosystem | Audience demand, enterprise policy, offline use, or platform convention justifies lifecycle cost | Require an owner, automated update, exact artifact mapping, clean install and external readback. |

For a public cross-platform developer CLI, signed release assets plus POSIX and
PowerShell installers form a strong portable baseline. Add Homebrew, npm/npx,
WinGet, Cargo, OCI, or other channels where their users actually benefit. A
commercial product may use an owned release service; the immutable identity and
verification rules remain the same.

Select targets from audience evidence and dependency support. A common starting
candidate is macOS arm64/x86-64, Linux x86-64/arm64 on the selected libc, and
Windows x86-64. The product's audience and dependencies determine the final
matrix. Rust target-tier status supplies compiler-support input; product tests,
dependency compatibility, signing, installer quality, and support determine
the product commitment.

Retrieve current Homebrew policy and choose Formula versus Cask by the
distribution promise: a core
Formula normally builds versioned source and may receive Homebrew-built bottles;
a Cask `binary` or suitable tap can distribute an upstream prebuilt executable.
Name the source-built or upstream-prebuilt identity explicitly.

## Rust executable with npm and package managers

For a Rust CLI, the compiled Rust executable is the product; there is no need
for a separate “Rust adapter.” Choose one explicit npm model:

1. **Platform packages:** a small launcher plus platform-specific packages
   constrained by npm `os`, `cpu`, and, where needed, `libc`, usually through
   optional dependencies.
2. **Verified fetcher:** a small launcher that detects the platform and fetches
   the matching immutable release asset, binding package version, URL and
   digest and failing on unsupported or unverifiable states.

The npm installation binds package version, target selection, immutable URL,
digest, and native behavior. Prebuilt Homebrew, WinGet and other metadata also
reference the same release set. If an ecosystem requires
repackaging, record both source-artifact and package digests and verify their
relationship. If it builds from source, record the source revision,
dependency/toolchain inputs, produced package identity, and provenance.

Release tools such as `dist` can generate target archives, shell and PowerShell
installers, npm packages, Homebrew formulae, checksums, and workflows. The
explicit artifact map, behavior tests, publication state, and recovery
semantics define the release contract.

## Integrity and lifecycle

- Build in a controlled release environment from the declared revision.
- Emit cryptographic digests, build provenance, and a machine-readable SBOM.
- Sign or attest artifacts and platform packages using protected workload
  identity or a signing service. The signing owner retains raw keys.
- Prefer registry trusted publishing or short-lived workload identity over
  long-lived publication tokens.
- Verify whether the selected registry trusts the actual release runner. When a
  self-hosted builder lacks registry OIDC eligibility, a minimal supported
  publication job consumes and verifies the already-built artifact.
- Apply macOS code-signing/notarization and the selected Windows signing path
  where direct-distribution trust expectations require them.
- Verify a download before execution or atomic replacement. Accept execution
  when platform, digest, signature, completeness, version, target path, and
  replacement state pass their checks; otherwise preserve the previous
  installation and return an actionable error.
- Define command name, aliases, help, version, exit codes, first useful command,
  supported targets, install scope, PATH ownership, completions, man pages,
  notices, proxy/offline behavior, and user-data locations.
- Define conflicts when another channel owns the command, N-1 to N migration,
  downgrade boundaries, uninstall, retained user data, deprecation, support,
  and rollback, repair, or forward-fix.
- Select one update authority for an installation. Package-managed installs use
  the package manager; self-managed installs use an explicitly selected update
  path and user-visible policy.

Obtain checksums through a trusted release path. `curl | sh`, `irm | iex`, npm
lifecycle scripts, and self-updaters execute authenticated immutable content
after verification.

A complete Homebrew plan resolves Formula versus Cask, source-build versus
upstream-prebuilt identity, and current channel eligibility.

## Verification

Apply the cases selected by the declared channel behavior and failure model.
Proxy, downgrade, self-update, and conflict tests follow the capabilities the
channel actually provides.

1. Have the delivery owner build every selected target, then verify release
   manifest, digest, provenance, SBOM, and signing/attestation.
2. Install every claimed channel-by-target row in a clean supported environment.
   Prebuilt channels run from their packaged artifacts; source-install channels
   use their declared checkout and compiler requirements.
3. Assert installed executable digest or attestation against the declared
   adapter mapping, exact `--version`, help, and one useful read-only command.
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
installed, or observed live.

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

Retrieve current action versions, registry limits, target lists, signing
requirements, formula acceptance rules, and review timing from the official
source when executing the release.
