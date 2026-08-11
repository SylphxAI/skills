# System Requirements of the Current Node.js LTS Release

**Answer:** As of 2026-08-11, the current Active LTS release is **Node.js 24.x ("Krypton")**, with the latest patch release **v24.19.0** (published 2026-08-03). The Node.js 24 line entered LTS on 2025-10-28, stays Active LTS until 2026-10-20, then enters Maintenance until end-of-life on 2028-04-30.

The supported operating-system and architecture requirements for Node.js 24 are listed below. Only **Tier 1** and **Tier 2** platforms are supported for production applications. Node.js also does not support running on platforms whose vendor support has expired.

## Supported platforms (Tier 1 / Tier 2, production-supported)

| Operating System | Architecture | Minimum version | Support tier | Notes |
|---|---|---|---|---|
| GNU/Linux | x64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 | e.g. Ubuntu 20.04, Debian 10, RHEL 8 |
| GNU/Linux | arm64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 | e.g. Ubuntu 20.04, Debian 10, RHEL 8 |
| GNU/Linux | ppc64le (>= Power8) | kernel >= 4.18, glibc >= 2.28 | Tier 2 | e.g. Ubuntu 20.04, RHEL 8 |
| GNU/Linux | s390x | kernel >= 4.18, glibc >= 2.28 | Tier 2 | e.g. RHEL 8 |
| Windows | x64 | >= Windows 10 / Server 2016 | Tier 1 | WSL not supported; use winpty in mintty-style terminals |
| Windows | arm64 | >= Windows 10 | Tier 2 | |
| macOS | x64 | >= macOS 13.5 | Tier 1 | Pre-built binaries target macOS 13.5; Xcode 16.1+ needed to compile |
| macOS | arm64 | >= macOS 13.5 | Tier 1 | |
| SmartOS | x64 | >= 18 | Tier 2 | |
| AIX | ppc64be (>= Power8) | >= 7.2 TL04 | Tier 2 | Requires libstdc++12 |

Notes:
- Official Linux release binaries are built on RHEL 8 (kernel 4.18) and are compatible with glibc >= 2.28 and libstdc++ >= 6.0.25, i.e. distributions shipping GCC 8.1+ such as Debian 10, RHEL 8, Ubuntu 20.04. Older kernels may work but are not what official binaries are built/tested against.
- WSL is not officially supported; the GNU/Linux build process and binaries should work, but issues are only addressed on native GNU/Linux.

## Experimental platforms (not for production)

- GNU/Linux x64 with musl (e.g. Alpine 3.8+): kernel >= 3.10, musl >= 1.1.19 — Experimental
- GNU/Linux x86: kernel >= 3.10, glibc >= 2.17 — Experimental
- GNU/Linux armv7: kernel >= 4.18, glibc >= 2.28 — Experimental (downgraded from Tier 1 as of Node.js 24; no pre-built binaries)
- GNU/Linux armv6: kernel >= 4.14, glibc >= 2.24 — Experimental
- GNU/Linux loong64: kernel >= 5.19, glibc >= 2.36 — Experimental
- GNU/Linux riscv64: kernel >= 5.19, glibc >= 2.36 — Experimental
- FreeBSD x64: >= 13.2 — Experimental
- OpenHarmony arm64: >= 5.0 — Experimental

## No longer supported (dropped in the 23/24 line)

Per the official "Node.js v22 to v24" migration post:
- 32-bit Windows (x86): no pre-built binaries as of Node.js 23.0.0
- 32-bit Linux on armv7: no pre-built binaries as of Node.js 24.0.0
- macOS pre-built binaries require a minimum of macOS 13.5
- Linux pre-built binaries for arm64, ppc64le, s390x, x64 remain compatible with glibc 2.28+ (unchanged from Node.js 22)

## Building from source (toolchain requirements, v24.x)

- Linux (and AIX): GCC >= 12.2
- macOS: Xcode >= 16.1 (Apple LLVM >= 17); Xcode Command Line Tools >= 13 for macOS
- Windows: Visual Studio 2022 or 2026 with the Windows 10 or 11 SDK, on a 64-bit host
- Other prerequisites: a supported version of Python, GNU Make 3.81+, and typically >= 8 GB RAM when compiling with 4 parallel jobs (`make -j4`)

These are compile-time requirements; most users install pre-built binaries and only need the runtime OS/architecture requirements above.

## Release schedule context

- **24.x "Krypton" — Active LTS** (current): released 2025-05-06, Active LTS from 2025-10-28 until 2026-10-20, Maintenance until 2028-04-30
- **22.x "Jod" — Maintenance LTS**: until 2027-04-30
- **26.x — Current** (upcoming LTS): becomes Active LTS 2026-10-28

## Sources

- Node.js official supported-platforms table for the v24.x line: `https://raw.githubusercontent.com/nodejs/node/v24.x/BUILDING.md` (retrieved 2026-08-11)
- Node.js official migration post "Node.js v22 to v24" (dropped platforms, macOS 13.5, toolchain minimums, LTS start of 24.11.0): `https://nodejs.org/en/blog/migrations/v22-to-v24` (retrieved 2026-08-11)
- Node.js Release Working Group release schedule (LTS status and dates for 22.x/24.x/26.x): `https://github.com/nodejs/Release/blob/main/README.md` (retrieved 2026-08-11)
- Official download index confirming latest v24.x patch (v24.19.0, 2026-08-03): `https://nodejs.org/dist/latest-v24.x/` (retrieved 2026-08-11)
- Cross-check for release status/latest versions: `https://endoflife.date/nodejs` (retrieved 2026-08-11)
