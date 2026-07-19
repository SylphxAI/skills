# Registry resolution

Use the project's native package manager and the authoritative publisher or
registry. Query live data during the task; never copy the example commands'
eventual output into a standard.

## Resolution sequence

For every ecosystem:

1. identify the canonical package and release source;
2. inspect stable and prerelease channels, withdrawals, deprecations, engine or
   SDK constraints, peer requirements, and release time;
3. compare the live stable release with both the declared direct constraint and
   the exact locked resolution;
4. select the newest eligible stable release and update all coupled packages;
5. read official release and migration notes across skipped majors;
6. regenerate the lock graph from a clean state and verify frozen installation;
   where the ecosystem has no native lock, use fixed selectors, immutable
   repositories, a resolved-graph artifact, and repeated clean resolution.

Registry metadata is discovery evidence, not a mutable build input. Preserve
the selected exact graph in the ecosystem's integrity-bearing lock mechanism
where supported; otherwise use the fixed-selector and repeatable-resolution
contract above.

## JavaScript, TypeScript, Bun, and npm-compatible registries

```sh
npm view <package> dist-tags --json
npm view <package>@latest version engines peerDependencies deprecated --json
```

The publisher-owned `latest` dist-tag normally identifies the stable channel;
inspect all dist-tags so `next`, `canary`, `beta`, or `rc` cannot be mistaken for
production. Query the framework, official generator, runtime requirements,
plugins, type packages, and peers as one compatibility set. `npm update` alone
does not cross a manifest's incompatible major range.

Authoritative references:

- [npm view](https://docs.npmjs.com/cli/v11/commands/npm-view/)
- [npm dist-tag](https://docs.npmjs.com/cli/v11/commands/npm-dist-tag/)

## Rust and Cargo

```sh
curl -fsSL -H 'User-Agent: <tool-and-contact>' https://crates.io/api/v1/crates/<crate>
cargo info <crate>@<resolved-version> --registry crates-io
cargo add <crate>@<version-requirement>
cargo update -p <crate> --precise <resolved-version>
```

Confirm the exact crate identity and registry-wide non-yanked stable releases
on crates.io before inspecting the selected candidate. Unversioned `cargo info`
may select around a workspace package or the project's supported Rust version;
it does not alone prove registry currency. Check the selected release's
`rust-version`, features, and coupled ecosystem crates. `cargo update` respects
the existing manifest range and therefore cannot alone prove that a new major
was considered. Edit the direct requirement or add the resolved major
explicitly, then verify the workspace lockfile and minimum supported Rust
version if one is promised.

Authoritative references:

- [Cargo registry web API](https://doc.rust-lang.org/cargo/reference/registry-web-api.html)
- [cargo add](https://doc.rust-lang.org/cargo/commands/cargo-add.html)
- [cargo info](https://doc.rust-lang.org/cargo/commands/cargo-info.html)
- [cargo update](https://doc.rust-lang.org/cargo/commands/cargo-update.html)

## Python and PyPI

```sh
curl -fsSL https://pypi.org/pypi/<package>/json
python -m pip index versions <package>
```

Use the [PyPI JSON API](https://docs.pypi.org/api/json/) for registry-wide
release discovery, files, yanked state, `requires_python`, and upload metadata.
`pip index versions` is an eligibility view for its active interpreter,
platform, implementation, and ABI unless explicit target flags are supplied;
it cannot alone prove registry currency. Exclude prereleases unless the
selected channel explicitly requires one. Update the project's direct
declaration and regenerate its native lock artifact; a site-packages
installation or unconstrained requirements file is not a lock.

Authoritative reference: [pip index](https://pip.pypa.io/en/stable/cli/pip_index/).

## Dart and pub.dev

```sh
dart pub outdated --show-all --no-prereleases
dart pub upgrade --major-versions
dart pub add <package>
```

Inspect the current Dart/Flutter SDK constraint and discontinued packages.
`pub outdated` distinguishes current, upgradable, resolvable, and latest;
resolve SDK or coupled-package constraints instead of treating “resolvable” as
the latest target.

Authoritative references:

- [dart pub outdated](https://dart.dev/tools/pub/cmd/pub-outdated)
- [dart pub upgrade](https://dart.dev/tools/pub/cmd/pub-upgrade)

## Go modules

```sh
go list -m -versions <module>
go list -m -json <module>@latest
go get <module>@latest
go list -m -u -json all
```

Inspect the resolved `Version` before accepting `@latest`: when no release
version exists, Go may choose a prerelease or pseudo-version, which is not a
stable production release. Use update JSON and `-retracted` inspection when
withdrawal history matters so a currently locked retracted or deprecated module
is not hidden by the default version list. Respect module-path major suffixes
and `go` directive requirements. Commit the resulting `go.mod` and `go.sum`.

Authoritative references:

- [Go version queries](https://go.dev/ref/mod#version-queries)
- [go get](https://go.dev/ref/mod#go-get)

## JVM, Swift, .NET, and other ecosystems

- JVM: query the publisher and Maven Central release metadata, then update the
  POM or Gradle version catalog as the writable declaration. Pin build-plugin
  versions. Reject Maven/Gradle ranges, `+`, `latest.release`,
  `latest.integration`, `LATEST`, `RELEASE`, changing modules, and SNAPSHOTs in
  reproducible production graphs. A version catalog is not a lock. Enable and
  commit [Gradle dependency locking](https://docs.gradle.org/current/userguide/dependency_locking.html)
  where Gradle owns resolution. Maven has no universal native dependency lock;
  use fixed selectors, immutable repositories, a resolved dependency tree or
  SBOM, and repeatable clean resolution instead. See the
  [Maven Central API](https://central.sonatype.org/search/rest-api-guide/),
  [Maven version requirements](https://maven.apache.org/pom.html#dependency-version-requirement-specification),
  and [Gradle version catalogs](https://docs.gradle.org/current/userguide/version_catalogs.html).
- Swift: inspect the package's canonical release tags or registry, update the
  `Package.swift` requirement across the intended major, commit
  `Package.resolved`, and run SwiftPM update and tests. Verify the selected graph
  with automatic resolution disabled or resolved versions forced so build/test
  cannot silently rewrite it. See
  [PackageDescription](https://docs.swift.org/package-manager/PackageDescription/PackageDescription.html).
- .NET: query NuGet and run the installed SDK's package-list equivalents for
  `--outdated`, `--deprecated`, and `--vulnerable --include-transitive`.
  Update direct references, opt into and commit `packages.lock.json`, and verify
  with `dotnet restore --locked-mode`. See
  [dotnet package list](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-package-list)
  and [NuGet lock files](https://learn.microsoft.com/en-us/nuget/consume-packages/package-references-in-project-files#locking-dependencies).
- For another ecosystem, use its official registry or publisher API and native
  lock mechanism. A third-party “latest versions” webpage is only a lead.

## Genuine blockers

An older direct version is temporarily eligible only when current evidence
shows a hard incompatibility such as an unsupported target platform, a public
consumer contract that cannot yet move atomically, or an upstream package with
no compatible current release. Record:

- blocked package and desired stable version;
- exact failing constraint and reproducer;
- newest eligible temporary version;
- coupled migration or upstream change required;
- owner, expiry, recheck trigger, and replacement condition.

Cost, familiarity, missing migration effort, or the existing manifest range are
not compatibility evidence.
