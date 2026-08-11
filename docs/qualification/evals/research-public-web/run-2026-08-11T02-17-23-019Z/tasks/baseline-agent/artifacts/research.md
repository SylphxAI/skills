# Node.js LTS — Current Release and System Requirements

Research date: 2026-08-11

## Answer

As of 11 August 2026, the current **Active LTS** release of Node.js is **Node.js 24 (codename "Krypton")**; the latest release in that line is **v24.19.0** (published 2026-08-03). Node.js 22 ("Jod") remains supported as Maintenance LTS, and Node.js 26 is the Current (non-LTS) line until it enters LTS on 2026-10-28.

The minimum system requirements to run official pre-built Node.js 24 LTS binaries:

- **Linux (x64, arm64):** kernel >= 4.18 with glibc >= 2.28 (e.g., Ubuntu 20.04, Debian 10, RHEL 8)
- **macOS (x64, arm64):** macOS 13.5 or newer
- **Windows (x64):** Windows 10 / Server 2016 or newer (arm64 is Tier 2)
- 32-bit OS binaries are no longer provided: 32-bit Windows (x86) was dropped in Node.js 23, and 32-bit Linux on armv7 was dropped (to experimental) in Node.js 24

## Release status (nodejs.org + Release WG)

| Line | Status | Codename | Initial release | Active LTS start | Maintenance start | End-of-life |
|---|---|---|---|---|---|---|
| 22.x | Maintenance LTS | Jod | 2024-04-24 | 2024-10-29 | 2025-10-21 | 2027-04-30 |
| **24.x** | **Active LTS** | **Krypton** | 2025-05-06 | 2025-10-28 | 2026-10-20 | **2028-04-30** |
| 26.x | Current | — | 2026-05-05 | 2026-10-28 (scheduled) | 2027-10-20 | 2029-04-30 |

Production applications should use only Active LTS or Maintenance LTS releases. Node.js 20 (Iron) reached end-of-life on 2026-04-30.

## Official platform support (Node.js 24.x, from nodejs/node BUILDING.md)

| Operating system | Architecture | Minimum version | Support tier |
|---|---|---|---|
| GNU/Linux | x64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| GNU/Linux | arm64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| macOS | x64 | macOS 13.5+ | Tier 1 |
| macOS | arm64 | macOS 13.5+ | Tier 1 |
| Windows | x64 | Windows 10 / Server 2016+ | Tier 1 |
| GNU/Linux | ppc64le (>= POWER8) | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| GNU/Linux | s390x | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| Windows | arm64 | Windows 10+ | Tier 2 |
| SmartOS | x64 | SmartOS 18+ | Tier 2 |
| AIX | ppc64be (>= POWER8) | AIX 7.2 TL04+ | Tier 2 |
| GNU/Linux | x64 (musl, e.g. Alpine) | kernel >= 3.10, musl >= 1.1.19 | Experimental |
| GNU/Linux | armv7 (32-bit ARM) | kernel >= 4.18, glibc >= 2.28 | Experimental (was Tier 2; downgraded in Node 24) |
| GNU/Linux | x86 (32-bit), armv6 | various | Experimental |
| GNU/Linux | loong64, riscv64 | kernel >= 5.19, glibc >= 2.36 | Experimental |
| FreeBSD | x64 | FreeBSD 13.2+ | Experimental |
| OpenHarmony | arm64 | OpenHarmony 5.0+ | Experimental |

Notes from the same source:

- **Pre-built binaries are only produced for:** darwin-x64/arm64 (+ `.pkg`), linux-x64/arm64/ppc64le/s390x, win-x64/arm64 (zip, 7z, msi), and aix-ppc64. There are no official pre-built binaries for 32-bit Windows (x86, dropped as of 23.0.0), 32-bit Linux armv7 (dropped as of 24.0.0), musl/Alpine, riscv64, loong64, or FreeBSD — those require community/unofficial builds or building from source.
- Linux pre-built binaries are built on RHEL 8 and are compatible with **glibc >= 2.28 and libstdc++ >= 6.0.25** (natively available on e.g. Debian 10, RHEL 8, Ubuntu 20.04).
- macOS pre-built binaries are compiled with `-mmacosx-version-min=13.5`, hence the macOS 13.5 minimum.
- Node.js does not support running on a platform version whose vendor has ended support (e.g., an OS that is itself end-of-life).
- For production, run only on Tier 1 or Tier 2 platforms.

## Building from source (Node.js 24.x)

Minimum toolchain per the same BUILDING.md document:

- **Linux:** GCC >= 12.2; GNU Make >= 3.81; a supported Python version
- **macOS:** Xcode >= 16.1 (Apple LLVM >= 17); Xcode Command Line Tools >= 13
- **Windows:** Visual Studio 2022 or 2026 with the Windows 10 or 11 SDK, on a 64-bit host
- ~8 GB RAM is typically required when compiling with 4 parallel jobs (`make -j4`)

## Other platform-related notes for Node.js 24 LTS

- Pre-built binaries bundle **OpenSSL 3.5**; with its default security level 2, RSA/DSA/DH keys shorter than 2048 bits, ECC keys shorter than 224 bits, and RC4 cipher suites are prohibited.
- C/C++ addons may need updates for V8 13.6; C++20 may be required where C++17 was previously sufficient. Prefer NODE-API where possible.

## Sources

1. Node.js download page (current LTS binaries) — https://nodejs.org/en/download (accessed 2026-08-11)
2. Node.js Releases / release status — https://nodejs.org/en/about/previous-releases (accessed 2026-08-11)
3. Node.js Release Working Group schedule — https://github.com/nodejs/Release (README "Release schedule", accessed 2026-08-11)
4. Supported platforms table, Node.js v24.x — https://github.com/nodejs/node/blob/v24.x/BUILDING.md (accessed 2026-08-11)
5. Node.js v22 to v24 migration notes (platform support changes) — https://nodejs.org/en/blog/migrations/v22-to-v24 (accessed 2026-08-11)
6. Official v24 release binaries listing (v24.19.0) — https://nodejs.org/dist/latest-v24.x/ (accessed 2026-08-11)
