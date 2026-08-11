# Research: Current system requirements of the Node.js LTS release

**Question:** What are the current system requirements of the Node.js LTS release?
**Retrieved:** 2026-08-11 ~02:46 UTC. All sources are primary (nodejs.org or the nodejs/node GitHub repository).

## Answer (TL;DR)

As of 2026-08-11, the current **Active LTS** release is **Node.js v24 "Krypton"** (latest: v24.19.0), supported until 2028-04-30. Node.js v22 "Jod" is the **Maintenance LTS** (until 2027-04-30). Node.js 26 is Current and becomes LTS on 2026-10-28.

To run the **official Node.js v24 binaries** you need:

- **Linux (x64, arm64):** kernel >= 4.18 with glibc >= 2.28 (Tier 1; e.g. Ubuntu 20.04, Debian 10, RHEL 8). ppc64le and s390x are Tier 2 with the same kernel/glibc floor. Official Linux binaries are built on RHEL 8 and are compatible with glibc >= 2.28 and libstdc++ >= 6.0.25.
- **Windows x64:** Windows 10 or Server 2016 or newer (Tier 1). **Windows arm64:** Windows 10 or newer (Tier 2). 32-bit Windows (x86) binaries are no longer provided (dropped in Node.js 23).
- **macOS (x64, arm64):** macOS 13.5 or newer (Tier 1). Official binaries are compiled with a minimum deployment target of macOS 13.5.
- **Node.js does not support running on end-of-life (EOL) platform versions**, regardless of the table below.
- Building from source adds toolchain requirements: GCC >= 12.2 (Linux/AIX), Xcode >= 16.1 / Apple LLVM >= 17 (macOS), Visual Studio 2022 or 2026 with the Windows 10/11 SDK and ClangCL (Windows; MSVC support was removed in Node 24), plus a supported Python version and GNU Make >= 3.81.

Note: the Node.js project does **not** publish a single "system requirements" page. The authoritative statement is the supported-platforms table in `BUILDING.md` for the v24.x release line, supplemented by the official v22→v24 migration guide and release notes (see Sources).

## Current LTS status (verified against official schedule)

| Release line | Codename | Status (2026-08-11) | Support window |
| --- | --- | --- | --- |
| v24 | Krypton | **Active LTS** (since 2025-10-28) | maintenance starts 2026-10-20, ends 2028-04-30 |
| v22 | Jod | **Maintenance LTS** (since 2025-10-21) | ends 2027-04-30 |
| v26 | — | Current (non-LTS) | becomes LTS 2026-10-28, ends 2029-04-30 |

Latest published binaries verified from the official distribution index and dist listing: `v24.19.0` (LTS, Krypton) and `v22.20.0` (LTS, Jod). The official releases page states production applications should only use Active LTS or Maintenance LTS releases.

## System requirements for the current LTS (Node.js v24)

From `BUILDING.md` on the `v24.x` branch (platform support table; "current as of the branch/release to which it belongs"):

### Supported platforms (running official binaries)

| Operating System | Architectures | Minimum version | Support tier |
| --- | --- | --- | --- |
| GNU/Linux | x64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| GNU/Linux | arm64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| GNU/Linux | ppc64le (>= power8) | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| GNU/Linux | s390x | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| GNU/Linux | armv7 | kernel >= 4.18, glibc >= 2.28 | Experimental (no official binaries; downgraded in Node 24) |
| GNU/Linux | x86, armv6, loong64, riscv64, musl (Alpine) | varies | Experimental |
| Windows | x64 | Windows 10 / Server 2016+ | Tier 1 |
| Windows | arm64 | Windows 10+ | Tier 2 |
| macOS | x64, arm64 | macOS 13.5+ | Tier 1 |
| SmartOS | x64 | >= 18 | Tier 2 |
| AIX | ppc64be (>= power8) | >= 7.2 TL04 | Tier 2 |
| FreeBSD | x64 | >= 13.2 | Experimental |
| OpenHarmony | arm64 | >= 5.0 | Experimental |

Notes from the same document:

- Official Linux binaries are built on RHEL 8 and are compatible with glibc >= 2.28 and libstdc++ >= 6.0.25 (`GLIBCXX_3.4.25`); these are available on distros with GCC 8.1+ such as Debian 10, RHEL 8, Ubuntu 20.04.
- macOS binaries are compiled with a 13.5 deployment target; Xcode 16 is required to compile.
- WSL is not officially supported (Linux binaries may work, but issues are only fixed on native Linux).
- Tier 1 = majority of users, full CI, failures block releases; Tier 2 = full CI but release delays possible; Experimental = may not compile/pass tests, no releases.

### Official binaries shipped for v24.19.0 (verified from dist listing)

`linux-x64`, `linux-arm64`, `linux-ppc64le`, `linux-s390x`, `darwin-x64`, `darwin-arm64` (tar.gz/tar.xz + `.pkg`), `win-x64` (zip/7z + `.msi`), `win-arm64` (zip/7z + `.msi`), `aix-ppc64`, plus source tarballs. No 32-bit Windows or armv7 Linux binaries.

### Requirements to build from source (same release line)

| Operating System | Toolchain |
| --- | --- |
| Linux / AIX | GCC >= 12.2 |
| Windows | Visual Studio 2022 or 2026 with Windows 10/11 SDK on a 64-bit host; ClangCL required (MSVC support removed in Node.js 24) |
| macOS | Xcode >= 16.1 (Apple LLVM >= 17) |

Also: a supported version of Python, GNU Make >= 3.81, and ~8 GB RAM is "typically required when compiling with 4 parallel jobs" (`make -j4`). The `configure` script warns (but does not block) on older toolchains.

### Bundled software

Node.js 24 ships npm 11 (per the v24.0.0 release notes).

## Changes vs. the previous LTS (relevant if upgrading from Node 22)

Per the official v22→v24 migration guide: no pre-built binaries for 32-bit Windows (x86) since Node 23; no pre-built binaries for 32-bit Linux armv7 since Node 24; macOS binaries now require macOS 13.5 minimum (Node 22 required macOS 11); Linux arm64/ppc64le/s390x/x64 binaries remain glibc 2.28+ compatible. For building from source, minimum GCC on Linux/AIX rose from 10.1 to 12.2 and minimum Xcode from 13 to 16.1; Windows builds now require ClangCL instead of MSVC.

## Sources (all primary; free access, no paid APIs)

1. Node.js official release schedule (GitHub `nodejs/Release`): https://raw.githubusercontent.com/nodejs/Release/main/schedule.json — used for LTS/maintenance dates and codenames (v24 Krypton LTS 2025-10-28; v22 Jod maintenance 2025-10-21).
2. Node.js release index (official binaries): https://nodejs.org/dist/index.json — used to confirm current LTS versions (v24.19.0 Krypton, v22.20.0 Jod) and that v26/v25 are non-LTS.
3. `BUILDING.md` on the v24.x branch: https://github.com/nodejs/node/blob/v24.x/BUILDING.md (raw: https://raw.githubusercontent.com/nodejs/node/v24.x/BUILDING.md) — the supported-platforms table, toolchain table, official binary build platform notes, and 8 GB build-RAM note. This is the authoritative requirements source.
4. Official "Node.js v22 to v24" migration guide: https://nodejs.org/en/blog/migrations/v22-to-v24 — platform support changes (macOS 13.5 minimum, dropped x86 Windows/armv7 Linux binaries, glibc 2.28 compatibility, GCC 12.2/Xcode 16.1 minima).
5. Node.js 24.0.0 release announcement: https://nodejs.org/en/blog/release/v24.0.0 — npm 11, ClangCL requirement, macOS 13.5 and Xcode 16.1 bumps, armv7 downgrade to experimental.
6. Node.js Releases page: https://nodejs.org/en/about/previous-releases — LTS status table (v24/v22 LTS, v26 Current) and the "production should use Active/Maintenance LTS" guidance.
7. Official v24.19.0 dist listing: https://nodejs.org/dist/v24.19.0/ — verified the exact set of shipped binary packages.
8. `BUILDING.md` on the v22.x branch (raw.githubusercontent.com/nodejs/node/v22.x/BUILDING.md) — for the Node 22 vs 24 comparison (macOS 11, armv7 Tier 1, GCC 10.1).

## Limits and gaps

- **No single official "system requirements" page.** Requirements are split across `BUILDING.md`, the migration guide, and release notes; there is an open issue asking the project to document minimum OS versions per release (https://github.com/nodejs/nodejs.org/issues/8124). The `BUILDING.md` platform table is the closest thing to a canonical answer.
- **No official runtime resource minimums.** Node.js publishes no minimum RAM, disk, or CPU figures for running applications (only ~8 GB RAM guidance for compiling from source). Requirements depend on the workload.
- **`BUILDING.md` is release-line-scoped** and updated by patches; the table I used is from the `v24.x` branch at retrieval time, not frozen to v24.19.0.
- **One small doc inconsistency:** `BUILDING.md` says "Xcode 16 is required to compile" in a footnote while the toolchain table says "Xcode >= 16.1"; I reported both as stated.
- **nodejs.org pages are mostly client-rendered**: the download page HTML (https://nodejs.org/en/download) contains almost no platform text, and the old learn URL `/en/learn/getting-started/how-to-install-nodejs` returned 404 (redirect target also 404). I verified the shipped binary set from the dist listing instead.
- **Vendor EOL rule is a moving target**: Node.js refuses support for platform versions whose vendors have ended support, so "minimum version" can effectively rise even within a release line (e.g. older Ubuntu/macOS versions becoming vendor-EOL). The table reflects the documented floor, not every distro combination.
- This research used only free, official sources (nodejs.org, GitHub raw files); no paid search or SERP APIs were used.
