# Runtime and toolchain channels

Package registries do not establish language-runtime or SDK currency. Resolve
the runtime from its official release metadata, then apply the selected
production channel from the active technology profile.

## Rules

1. Distinguish release recency from production eligibility. When a runtime
   publishes Current, Active LTS, Maintenance LTS, stable, beta, and nightly
   channels, select the newest release in the profile's production channel.
2. Query the official lifecycle and release source during the task. Installed
   version managers and local toolchains show current machine state, not the
   newest available release.
3. Pin the selected exact runtime/toolchain in the repository's native file,
   build image digest, and CI/deployment configuration. Verify the same version
   in clean build and delivery evidence.
4. Upgrade framework plugins, native extensions, type packages, and generated
   artifacts coupled to the runtime. Do not retain an old runtime merely because
   one coupled package has not been migrated.

## Authoritative discovery

- **Node.js:** use the official
  [release index](https://nodejs.org/dist/index.json) and
  [release lifecycle](https://nodejs.org/en/about/previous-releases). For
  production services, the current Active LTS line is normally preferable to a
  newer non-LTS Current line unless the active profile says otherwise.
- **Bun:** use the official
  [upgrade channel](https://bun.sh/docs/installation#upgrading) and Bun release
  source, then pin the exact version used by CI and delivery.
- **Rust:** inspect the official stable channel with `rustup check` and
  [rustup update](https://rust-lang.github.io/rustup/basics.html), then pin the
  exact toolchain in `rust-toolchain.toml`; the mutable `stable` channel is
  discovery, not a reproducible build reference.
- **Python:** use the official
  [downloads](https://www.python.org/downloads/) and
  [supported-version lifecycle](https://devguide.python.org/versions/), then pin
  the exact interpreter in the repository and build/deploy environment.
- **Dart:** use the official stable channel and
  [Dart SDK archive](https://dart.dev/get-dart/archive), verify the exact Dart
  runtime, and pin the build/delivery toolchain rather than a mutable channel.
- **Flutter:** use the official stable channel and
  [Flutter SDK archive](https://docs.flutter.dev/install/archive), verify with
  `flutter --version --machine`, and treat the bundled Dart version as Flutter
  evidence rather than standalone Dart currency.
- **Go:** query the official [release JSON](https://go.dev/dl/?mode=json), then
  align the `go`/`toolchain` directives with compatibility intent. Those
  directives do not exact-pin execution when toolchain auto-selection is
  enabled; exactness comes from a pinned toolchain/image or forced exact
  `GOTOOLCHAIN`, followed by `go version` readback. See
  [Go toolchain selection](https://go.dev/doc/toolchain).
- **JDK:** resolve the active profile's supported vendor and production channel
  from its official release source, such as [OpenJDK](https://jdk.java.net/),
  then pin the exact toolchain. “Latest JDK” is not a vendor/support decision.
- **.NET:** use Microsoft's official
  [release metadata](https://dotnetcli.blob.core.windows.net/dotnet/release-metadata/releases-index.json),
  select the profile's active production channel, and pin the exact SDK in
  `global.json` with `rollForward: disable`, plus the runtime/container
  configuration and exact-version readback. See
  [.NET SDK selection](https://learn.microsoft.com/en-us/dotnet/core/tools/global-json).
- **Swift:** use the official [Swift install releases](https://www.swift.org/install/)
  and pin the exact toolchain in the build environment.

For another runtime, the official publisher lifecycle and release feed are the
source. Third-party end-of-life aggregators and local version-manager catalogs
are useful discovery aids but cannot alone support a currentness claim.
