# System requirements of the current Node.js LTS release

**Answer (as of 2026-08-11):** The current Node.js LTS is **Node.js 24.x "Krypton"** (latest: v24.19.0, released 2026-08-03). The official system requirements for its pre-built binaries are:

- **Windows**: 64-bit only — x64 on Windows 10 / Server 2016 or newer (Tier 1), arm64 on Windows 10 or newer (Tier 2). No 32-bit (x86) binaries are provided as of Node.js 23.
- **macOS**: x64 and arm64, **macOS 13.5 (Ventura) or newer** (Tier 1). Binaries are compiled with `-mmacosx-version-min=13.5`.
- **Linux (glibc)**: x64 and arm64 (Tier 1); ppc64le and s390x (Tier 2) — kernel ≥ 4.18 with **glibc ≥ 2.28** (e.g., Ubuntu 20.04, Debian 10/11, RHEL 8). Official binaries are built on RHEL 8 and are compatible with glibc ≥ 2.28 / libstdc++ ≥ 6.0.25.
- **AIX**: ppc64be ≥ Power8, AIX ≥ 7.2 TL04 (Tier 2, official binaries).
- **SmartOS**: x64, version ≥ 18 (Tier 2).
- **Experimental (no official binaries / not supported for production)**: Linux on musl/Alpine, 32-bit x86 Linux, armv7 (32-bit Linux — binaries dropped as of Node.js 24.0.0), armv6, loong64, riscv64, FreeBSD ≥ 13.2, OpenHarmony ≥ 5.0.
- End-of-life OS versions are not supported even if listed, per Node.js policy ("Node.js does not support running on End-of-Life platforms").

**Build-from-source toolchain minimums (not runtime requirements):** GCC ≥ 12.2 (Linux/AIX), Xcode ≥ 16.1 / Apple LLVM ≥ 17 (macOS), Visual Studio 2022 or 2026 with Windows 10/11 SDK (Windows).

## Context: which release is "current LTS"

Per the official Node.js release schedule (Retrieved 2026-08-11 02:22 UTC):

| Line | Status (2026-08-11) | Codename | EOL |
|---|---|---|---|
| 24.x | **Active LTS** (since 2025-10-28; Maintenance from 2026-10-20) | Krypton | 2028-04-30 |
| 22.x | Maintenance LTS (since 2025-10-21) | Jod | 2027-04-30 |
| 26.x | Current (becomes Active LTS 2026-10-28) | — | 2029-04-30 |

So Node.js 24 is the current LTS; Node.js 22 is the other supported LTS line (maintenance-only); Node.js 26 is still "Current" and not yet LTS. `nodejs.org/dist/index.json` confirms v24.19.0 is the newest LTS-tagged release (2026-08-03).

## Sources

All retrieved 2026-08-11 02:22 UTC via free public access (no paid SERP used):

1. **Node.js BUILDING.md, v24.x branch** (primary — official platform support table, toolchains, official binary platforms): https://raw.githubusercontent.com/nodejs/node/v24.x/BUILDING.md
   - Supported-platform table with per-OS minimum versions (glibc ≥ 2.28, macOS ≥ 13.5, Windows ≥ 10/Server 2016, AIX ≥ 7.2 TL04, SmartOS ≥ 18, kernel ≥ 4.18).
   - Toolchains: GCC ≥ 12.2, Xcode ≥ 16.1, Visual Studio 2022/2026; binaries built on RHEL 8 / macOS 13 / Windows Server 2022.
   - Policy quote: "Node.js does not support a platform version if a vendor has expired support for it."
2. **Node.js official migration guide, v22 to v24** (primary — LTS status + platform-support changes): https://nodejs.org/en/blog/migrations/v22-to-v24
   - "With the release of Node.js 24.11.0, the Node.js 24 release line has entered Long-Term Support (LTS) and will continue to receive updates through to the end of April 2028."
   - "Pre-built binaries for macOS now require a minimum of macOS 13.5."
   - No pre-built binaries for 32-bit Windows (x86, as of v23) and 32-bit Linux armv7 (as of v24.0.0).
   - "Pre-built binaries for Linux on arm64, ppc64le, s390x and x64 continue to be compatible with glibc 2.28 and above (no change from Node.js 22)."
3. **Node.js Release Working Group schedule** (primary): https://raw.githubusercontent.com/nodejs/Release/main/README.md — confirms 24.x = Active LTS (Krypton), 22.x = Maintenance LTS (Jod), 26.x = Current.
4. **nodejs.org release index** (primary, machine data): https://nodejs.org/dist/index.json — v24.19.0 is the latest LTS release (2026-08-03); v26.7.0 latest non-LTS.

## Limits and gaps hit

- **No official RAM, CPU, or disk requirements exist.** Node.js publishes only OS/architecture/libc minimums. No authoritative minimum-memory or cores spec was found; anything claiming "512 MB RAM" etc. comes from third-party guides, not nodejs.org.
- **Alpine Linux (musl) is experimental only** — no official binaries from nodejs.org; official docs direct users to community/third-party builds (e.g., Alpine's own packages).
- **WSL is not officially supported** for the Windows binary, and Windows binaries don't run in WSL without workarounds (per BUILDING.md footnote); Linux binaries should work under WSL but issues are only addressed on native Linux.
- The install docs page `https://nodejs.org/en/learn/getting-started/how-to-install-nodejs` returned 404 (moved/restructured); the download page (https://nodejs.org/en/download) lists no explicit minimum system requirements, so BUILDING.md + migration guide were used as the authoritative source.
- Requirements above describe running **official pre-built binaries**; third-party distro packages (apt, nvm, Homebrew, Docker images) may have their own, typically stricter, platform ranges.
- No search-engine/paid SERP (L4) was used; all facts come from primary nodejs.org / nodejs GitHub sources (free L0/L1 paths). Third-party blog claims (e.g., macOS 13 minimum) matched official sources but were not relied on.
