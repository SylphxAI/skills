# Node.js LTS — Current System Requirements

**Research date:** 2026-08-11

## Answer

As of 2026-08-11, the current **Active LTS** release of Node.js is **v24 ("Krypton")**,
with the latest patch release **v24.19.0**. Node.js v22 ("Jod") is the Maintenance LTS
line. Node.js no longer publishes a single "system requirements" page; the authoritative
requirements for the LTS line are the **"Supported platforms"** table in `BUILDING.md`
on the `v24.x` branch of `nodejs/node`.

The requirements are stated per operating system, architecture, and libc/kernel version,
with support tiers: **Tier 1** and **Tier 2** are fully supported; **Experimental**
platforms may not compile or pass tests and are not shipped as official release binaries.

> Official guidance: "For production applications, run Node.js on supported platforms
> only (Tier 1 or 2)." Node.js does not support running on platforms whose vendor has
> ended support (EoL OS versions are not supported regardless of the table).

### Supported platforms (Node.js v24.x LTS)

| Operating system | Architecture | Minimum version | Support type |
| --- | --- | --- | --- |
| GNU/Linux | x64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| GNU/Linux | arm64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| Windows | x64 | >= Windows 10 / Server 2016 | Tier 1 |
| macOS | x64 | >= 13.5 | Tier 1 |
| macOS | arm64 | >= 13.5 | Tier 1 |
| GNU/Linux | ppc64le (>= Power8) | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| GNU/Linux | s390x | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| Windows | arm64 | >= Windows 10 | Tier 2 |
| SmartOS | x64 | >= 18 | Tier 2 |
| AIX | ppc64be (>= Power8) | >= 7.2 TL04 | Tier 2 |
| GNU/Linux | x64 (musl) | kernel >= 3.10, musl >= 1.1.19 (e.g. Alpine >= 3.8) | Experimental |
| GNU/Linux | x86 | kernel >= 3.10, glibc >= 2.17 | Experimental |
| GNU/Linux | armv7 | kernel >= 4.18, glibc >= 2.28 | Experimental |
| GNU/Linux | armv6 | kernel >= 4.14, glibc >= 2.24 | Experimental |
| GNU/Linux | loong64 | kernel >= 5.19, glibc >= 2.36 | Experimental |
| GNU/Linux | riscv64 | kernel >= 5.19, glibc >= 2.36 | Experimental |
| FreeBSD | x64 | >= 13.2 | Experimental |
| OpenHarmony | arm64 | >= 5.0 | Experimental |

### Notable caveats

- Official Linux binaries are built on RHEL 8 (kernel 4.18) and require
  **glibc >= 2.28** and **libstdc++ >= 6.0.25** (`GLIBCXX_3.4.25`) at runtime
  (available natively on e.g. Debian 10, RHEL 8, Ubuntu 20.04).
- Windows Subsystem for Linux (WSL) is **not directly supported**; issues are only
  addressed when they reproduce on native GNU/Linux, and running `node.exe` in WSL
  requires workarounds.
- On Windows, running Node.js in terminal emulators like `mintty` requires `winpty`
  for TTY channels to work.
- **Building from source** has separate toolchain requirements (official minimums):
  Linux GCC >= 12.2; Windows Visual Studio 2022 or 2026 with the Windows 10/11 SDK on
  a 64-bit host; macOS Xcode >= 16.1 (Apple LLVM >= 17); plus a supported version of
  Python (with `pip` for test coverage).

## Sources

1. **Node.js release lines and LTS status** — "Node.js Releases" page,
   <https://nodejs.org/en/about/previous-releases>, retrieved 2026-08-11.
   Confirms v24 (Krypton) = LTS and v22 (Jod) = LTS, and that production applications
   should only use Active LTS or Maintenance LTS releases.
2. **Latest v24.x LTS version** — official distribution directory,
   <https://nodejs.org/dist/latest-v24.x/> (via `SHASUMS256.txt`), retrieved 2026-08-11.
   Confirms current latest LTS patch release is **v24.19.0**.
3. **System requirements (supported platforms)** — "Supported platforms" section of
   `BUILDING.md` on the `v24.x` branch,
   <https://raw.githubusercontent.com/nodejs/node/v24.x/BUILDING.md>, retrieved 2026-08-11.
   Source of the platform/tier table, caveats, and toolchain minimums.
4. **Where the README points for requirements** — `README.md` on the `v24.x` branch,
   <https://raw.githubusercontent.com/nodejs/node/v24.x/README.md>, retrieved 2026-08-11.
   Confirms the supported-platform list lives in `BUILDING.md`.

## Scope and accuracy notes

- The platform table is branch-specific; requirements may change between major release
  lines (e.g. armv7 was downgraded to Experimental as of Node.js 24).
- The v22 (Jod) Maintenance LTS line may have its own older platform requirements;
  this document answers for the current Active LTS (v24).
