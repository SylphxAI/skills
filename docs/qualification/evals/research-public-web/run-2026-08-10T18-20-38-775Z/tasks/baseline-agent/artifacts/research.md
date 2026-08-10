# Node.js LTS — Current System Requirements

As of August 2026, Node.js has two LTS (long-term support) release lines:

| Version | Codename | Status | Latest release |
|---------|----------|--------|----------------|
| **v24** | Krypton | **LTS** | 24.19.0 (Aug 3, 2026) |
| **v22** | Jod | **LTS** | 22.23.2 (Jul 29, 2026) |
| v26 | — | Current (not LTS) | 26.7.0 (Aug 5, 2026) |

Production applications should use **Active LTS or Maintenance LTS releases** (v24 or v22). The remainder of this document describes the current system requirements for these LTS releases.

---

## Node.js v24 (Krypton) — LTS

### Supported operating systems

| Operating System | Architectures | Versions | Support Type |
|---|---|---|---|
| GNU/Linux | x64 | kernel ≥ 4.18, glibc ≥ 2.28 | **Tier 1** |
| GNU/Linux | arm64 | kernel ≥ 4.18, glibc ≥ 2.28 | **Tier 1** |
| GNU/Linux | ppc64le (≥ POWER8) | kernel ≥ 4.18, glibc ≥ 2.28 | **Tier 2** |
| GNU/Linux | s390x | kernel ≥ 4.18, glibc ≥ 2.28 | **Tier 2** |
| GNU/Linux | x86 | kernel ≥ 3.10, glibc ≥ 2.17 | Experimental |
| GNU/Linux | armv7 | kernel ≥ 4.18, glibc ≥ 2.28 | Experimental (downgraded in v24) |
| GNU/Linux | armv6 | kernel ≥ 4.14, glibc ≥ 2.24 | Experimental |
| GNU/Linux | x64 (musl) | kernel ≥ 3.10, musl ≥ 1.1.19 | Experimental (e.g. Alpine) |
| GNU/Linux | loong64 | kernel ≥ 5.19, glibc ≥ 2.36 | Experimental |
| GNU/Linux | riscv64 | kernel ≥ 5.19, glibc ≥ 2.36 | Experimental |
| Windows | x64 | Windows 10 / Server 2016 or newer | **Tier 1** |
| Windows | arm64 | Windows 10 or newer | **Tier 2** |
| macOS | x64 | macOS 13.5 or newer | **Tier 1** |
| macOS | arm64 | macOS 13.5 or newer | **Tier 1** |
| SmartOS | x64 | ≥ 18 | Tier 2 |
| AIX | ppc64be (≥ POWER8) | ≥ 7.2 TL04 | Tier 2 |
| FreeBSD | x64 | ≥ 13.2 | Experimental |
| OpenHarmony | arm64 | ≥ 5.0 | Experimental |

**Notable changes vs. v22:** v24 raised macOS minimum from 11.0 to 13.5, downgraded Linux armv7 from Tier 1 to Experimental, removed Windows x86 (native) Tier 1 support, and raised the minimum compiler requirements.

### Compiler toolchains (for building from source)

| Operating System | Compiler Versions |
|---|---|
| Linux | GCC ≥ 12.2 |
| Windows | Visual Studio 2022 or 2026 with Windows 10/11 SDK on a 64-bit host |
| macOS | Xcode ≥ 16.1 (Apple LLVM ≥ 17) |

### Build prerequisites

- A supported version of Python (for building and testing)
- Memory: at least 8 GB of RAM typically required when compiling with 4 parallel jobs (e.g., `make -j4`)
- Unix: `gcc`/`g++` ≥ 12.2, GNU Make ≥ 3.81
- macOS: Xcode Command Line Tools ≥ 13

### Official binary build platforms

Official binaries are produced on:
- **Linux:** RHEL 8 with gcc-toolset-12 (compatible with glibc ≥ 2.28, available on Debian 10, RHEL 8, Ubuntu 20.04+)
- **Windows:** Server 2022 (x64) with Visual Studio 2022
- **macOS:** macOS 13 with Xcode 16, `-mmacosx-version-min=13.5`
- **AIX:** 7.2 TL04 with GCC 12

---

## Node.js v22 (Jod) — LTS

### Supported operating systems

| Operating System | Architectures | Versions | Support Type |
|---|---|---|---|
| GNU/Linux | x64 | kernel ≥ 4.18, glibc ≥ 2.28 | **Tier 1** |
| GNU/Linux | arm64 | kernel ≥ 4.18, glibc ≥ 2.28 | **Tier 1** |
| GNU/Linux | armv7 | kernel ≥ 4.18, glibc ≥ 2.28 | **Tier 1** |
| GNU/Linux | ppc64le (≥ POWER8) | kernel ≥ 4.18, glibc ≥ 2.28 | **Tier 2** |
| GNU/Linux | s390x | kernel ≥ 4.18, glibc ≥ 2.28 | **Tier 2** |
| GNU/Linux | x86 | kernel ≥ 3.10, glibc ≥ 2.17 | Experimental |
| GNU/Linux | armv6 | kernel ≥ 4.14, glibc ≥ 2.24 | Experimental |
| GNU/Linux | x64 (musl) | kernel ≥ 3.10, musl ≥ 1.1.19 | Experimental (e.g. Alpine) |
| GNU/Linux | loong64 | kernel ≥ 5.19, glibc ≥ 2.36 | Experimental |
| Windows | x64, x86 (WoW64) | Windows 10 / Server 2016 or newer | **Tier 1** |
| Windows | x86 (native) | Windows 10 / Server 2016 or newer | Tier 1 (running) / Experimental (compiling) |
| Windows | x86 | Windows 8.1 / Server 2012 | Experimental |
| Windows | arm64 | Windows 10 or newer | Tier 2 |
| macOS | x64 | macOS 11.0 or newer | **Tier 1** |
| macOS | arm64 | macOS 11.0 or newer | **Tier 1** |
| SmartOS | x64 | ≥ 18 | Tier 2 |
| AIX | ppc64be (≥ POWER8) | ≥ 7.2 TL04 | Tier 2 |
| FreeBSD | x64 | ≥ 13.2 | Experimental |
| OpenHarmony | arm64 | ≥ 5.0 | Experimental |

### Compiler toolchains (for building from source)

| Operating System | Compiler Versions |
|---|---|
| Linux | GCC ≥ 10.1 |
| Windows | Visual Studio 2022 with Windows 10 SDK on a 64-bit host |
| macOS | Xcode ≥ 13 (Apple LLVM ≥ 12) |

### Official binary build platforms

- **Linux:** RHEL 8 with gcc-toolset-10 (compatible with glibc ≥ 2.28)
- **Windows:** Server 2022 (x64) with Visual Studio 2022
- **macOS:** macOS 13 with Xcode 16, `-mmacosx-version-min=11.0`

---

## Key constraints and notes

- **Do not run on EoL vendor platforms.** Node.js does not support a platform version once its vendor has expired support, regardless of the tables above.
- **For production, run on Tier 1 or Tier 2 platforms only.**
- **Windows Subsystem for Linux (WSL) is not directly supported.** GNU/Linux binaries should work, but issues reproducing only on WSL are not addressed by the Node.js community (escalate to the WSL tracker instead).
- **Windows terminal emulators** (e.g., `mintty`) require `winpty` for tty channels.
- **Official Linux binaries** require glibc ≥ 2.28 and libstdc++ ≥ 6.0.25 (available on distributions natively supporting GCC 8.1+, e.g., Debian 10, RHEL 8, Ubuntu 20.04).
- **Binary compatibility:** v22 and v24 both produce binaries compatible with the same glibc baseline (≥ 2.28).

### Which LTS should you use?

- **v24 (Krypton)** is the newest LTS and recommended for new deployments. It has stricter minimum OS requirements (macOS 13.5+, no Windows x86 native).
- **v22 (Jod)** is the prior LTS with broader platform compatibility (macOS 11+, Windows x86 native, Linux armv7 Tier 1). Choose v22 if you have legacy systems at or near these older minimums.

---

## Sources

Information on this page is sourced from:

1. **Node.js official release schedule page** — https://nodejs.org/en/about/releases/ — confirms LTS status of v24 and v22, Current status of v26, and that production should use Active LTS or Maintenance LTS.
2. **Node.js v24 BUILDING.md** — https://github.com/nodejs/node/blob/v24.x/BUILDING.md — platform support tiers, kernel/glibc/musl versions, compiler toolchains, and official binary build platforms for v24 (Krypton).
3. **Node.js v22 BUILDING.md** — https://github.com/nodejs/node/blob/v22.x/BUILDING.md — platform support tiers, kernel/glibc/musl versions, compiler toolchains, and official binary build platforms for v22 (Jod).
4. **Node.js release downloads index** — https://nodejs.org/download/release/ — confirms latest release versions and dates (v24.19.0 on Aug 3, 2026; v22.23.2 on Jul 29, 2026).
5. **Node.js official blog releases** — https://nodejs.org/en/blog/release/ — confirms latest release numbers for each current/LTS line.
