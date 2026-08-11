# System Requirements of the Current Node.js LTS Release

**Answer:** As of 2026-08-11, the current Node.js LTS release line is **Node.js 24 ("Krypton")**, latest release **v24.19.0** (2026-08-03). Node.js 22 ("Jod") is still supported as a Maintenance LTS line until 2027-04-30. The authoritative system requirements below are for the Node.js 24 line and come from the official `BUILDING.md` shipped with the v24.19.0 tag — this is the only place the project publishes a formal platform/toolchain requirement matrix. Node.js does not publish an official page of "system requirements" on nodejs.org (see Limits).

## Supported platforms (run + build support, Node.js 24)

Node.js support depends on OS, CPU architecture, and libc version. Support tiers: **Tier 1** (majority of users, release-blocking test coverage), **Tier 2** (smaller segments, release-blocking coverage), **Experimental** (may not compile/test; no official releases). The project recommends Tier 1/2 only for production.

| OS | Architectures | Version requirement | Tier |
|---|---|---|---|
| GNU/Linux | x64 | kernel >= 4.18, glibc >= 2.28 (e.g., Ubuntu 20.04, Debian 10, RHEL 8) | 1 |
| GNU/Linux | arm64 | kernel >= 4.18, glibc >= 2.28 | 1 |
| GNU/Linux | x64 (musl) | kernel >= 3.10, musl >= 1.1.19 (e.g., Alpine 3.8) | Experimental |
| GNU/Linux | ppc64le >= Power8 | kernel >= 4.18, glibc >= 2.28 | 2 |
| GNU/Linux | s390x | kernel >= 4.18, glibc >= 2.28 | 2 |
| GNU/Linux | x86, armv7, armv6, loong64, riscv64 | various (see source) | Experimental |
| Windows | x64 | >= Windows 10 / Server 2016 | 1 |
| Windows | arm64 | >= Windows 10 | 2 |
| macOS | x64 | >= 13.5 | 1 |
| macOS | arm64 | >= 13.5 | 1 |
| SmartOS | x64 | >= 18 | 2 |
| AIX | ppc64be >= Power8 | >= 7.2 TL04 | 2 |
| FreeBSD | x64 | >= 13.2 | Experimental |
| OpenHarmony | arm64 | >= 5.0 | Experimental |

Additional official rules and notes:

- **EOL rule:** Node.js does not support any platform version whose vendor has already ended support, regardless of the table above.
- **Official binaries** are built on RHEL 8 (kernel 4.18) for Linux, and on macOS 13 with `-mmacosx-version-min=13.5` for macOS; `win-x64`/`win-arm64` binaries are built on Windows Server 2022 with Visual Studio 2022.
- **Binary compatibility:** official Linux binaries require **glibc >= 2.28 and libstdc++ >= 6.0.25** (available natively on distros shipping GCC 8.1+, e.g., Debian 10, RHEL 8, Ubuntu 20.04). WSL is not supported; `node.exe` does not work in WSL without workarounds.

## Toolchains / build prerequisites (Node.js 24)

- **Linux:** GCC >= 12.2; GNU Make >= 3.81.
- **Windows:** Visual Studio 2022 or 2026 with the Windows 10 or 11 SDK on a 64-bit host. **As of Node.js 24.0.0, MSVC support was removed and ClangCL is required** (C++ Clang Compiler for Windows + MSBuild support for LLVM/clang-cl toolset). NASM is needed for OpenSSL assembler modules; Git for Windows for test tooling.
- **macOS:** Xcode >= 16.1 (Apple LLVM >= 17) to compile; Xcode Command Line Tools >= 13; official binaries target macOS 13.5.
- **Python:** a currently supported Python version is required for building and testing.
- **Memory:** at least **8 GB RAM** typically required when compiling with 4 parallel jobs (`make -j4`).

## Where the information came from

All sources are official and were retrieved via free public endpoints (no paid search APIs) on **2026-08-11 ~02:30 UTC**:

1. **Node.js release index** — https://nodejs.org/dist/index.json — confirms `v24.19.0` LTS "Krypton", released 2026-08-03; no newer LTS line exists (v26 is Current, not LTS).
2. **Node.js Releases page** — https://nodejs.org/en/about/previous-releases — status table shows v24 (Krypton) "LTS" and v22 (Jod) "LTS".
3. **Node.js release schedule** — https://raw.githubusercontent.com/nodejs/Release/main/schedule.json — v24: LTS since 2025-10-28, maintenance from 2026-10-20, end 2028-04-30; v22: end 2027-04-30.
4. **BUILDING.md at tag v24.19.0** — https://raw.githubusercontent.com/nodejs/node/v24.19.0/BUILDING.md — "Supported platforms" table, "Supported toolchains", "Official binary platforms and toolchains", prerequisites sections (all OS/architecture/libc/toolchain facts above).
5. **v24.0.0 release announcement** — https://nodejs.org/en/blog/release/v24.0.0 — "(SEMVER-MAJOR) build: bump supported macOS version to 13.5" and "Starting with Node.js 24, support for MSVC has been removed, and ClangCL is now required to compile Node.js on Windows".

## Limits and gaps

- **No single official requirements page.** nodejs.org's download and About pages contain no requirement statements; the formal matrix lives only in `BUILDING.md`, which is per release line ("This document is only valid for the current version of Node.js") — so v22's numbers can differ and were not used here.
- **Runtime hardware specs are not officially defined.** No official CPU speed, RAM, or disk requirements for *running* Node.js binaries exist; the only hardware figure (8 GB RAM) is for compiling.
- **"Experimental" tiers are not release-backed**, so e.g. musl/Alpine, armv7, FreeBSD, and WSL users get community support only — binaries may still work but aren't officially produced.
- **Not verified:** whether future v24 patch releases change these tables (checked only v24.19.0); third-party distributor requirements (e.g., distro packages, nvm, Docker images) differ and were out of scope.
- **Method note:** primary-source-first per the research-public-web skill; no paid SERP used; no search-engine snippets were cited as if full pages were read.
