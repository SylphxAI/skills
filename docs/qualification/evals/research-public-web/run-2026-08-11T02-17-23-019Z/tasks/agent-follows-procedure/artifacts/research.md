# Research: Current system requirements of the Node.js LTS release

- Research date: 2026-08-11 (retrievals 02:19–02:22 UTC)
- Skill: `research-public-web` (references/recipes.md opened first; host web tools + direct official endpoints used)

## 1. Framed question

- **Decision this research supports:** choosing OS/architectures/libraries for running the current Node.js LTS (installing official prebuilt binaries), and the toolchain floors for building from source.
- **Must-have sources (authoritative):** nodejs.org docs/blog (official), `nodejs/node` `BUILDING.md` on the LTS branch (official platform table), `nodejs/Release` WG schedule (LTS identity/dates), `nodejs.org/dist` (actual shipped binaries).
- **Nice-to-have:** install-guide wording, release notes with platform semver-major commits.

## 2. Method log (free paths only)

1. Host web tools (L0/L1): search for "Node.js LTS system requirements 2026", "Node.js 24 system requirements glibc macOS Windows", "nodejs current LTS release 2026 v24" — surfaced the official v22→v24 migration guide and Release WG schedule. DuckDuckGo HTML adapter (L1 brittle) was **not** needed; host tools succeeded.
2. Direct official URLs (L1): fetched and extracted:
   - `https://nodejs.org/en/blog/migrations/v22-to-v24` (open_page, 02:19 UTC)
   - `https://raw.githubusercontent.com/nodejs/node/v24.x-staging/BUILDING.md` (curl fallback, 02:20 UTC; open_page returned `BAD_CONTENT`)
   - `https://raw.githubusercontent.com/nodejs/node/main/BUILDING.md` (curl, 02:20 UTC)
   - `https://github.com/nodejs/Release` (open_page, 02:21 UTC)
   - `https://nodejs.org/en/about/previous-releases` (open_page, 02:21 UTC)
   - `https://nodejs.org/en/blog/release/v24.0.0` (open_page, 02:22 UTC)
   - `https://nodejs.org/dist/index.json` + `https://nodejs.org/dist/v24.19.0/` (curl, 02:21 UTC) — version truth + shipped binary inventory
3. Failed/blocked fetches recorded as gaps (see §6): install guide 404, announcement 404, dist README missing, download page client-side rendered, `raw.githubusercontent` blocked for the page tool (curl worked).

## 3. Answer first

As of 2026-08-11, the current LTS is **Node.js 24 "Krypton" — Active LTS since 2025-10-28, Maintenance LTS from 2026-10-20, EOL 2028-04-30** (latest patch: v24.19.0, released 2026-08-03). Node 22 "Jod" is the older Maintenance LTS (EOL 2027-04-30); Node 26 is still Current (LTS from 2026-10-28).

**Official prebuilt binary requirements (v24 LTS):**

| Platform | Requirement | Tier |
|---|---|---|
| Linux x64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| Linux arm64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| Linux ppc64le (>= Power9) | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| Linux s390x (>= z14) | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| Linux armv7 (32-bit ARM) | no prebuilt binaries as of Node 24.0.0; Experimental only | dropped |
| Linux Alpine/musl | musl >= 1.1.19 listed Experimental; **no musl binaries shipped for v24.19.0** | Experimental |
| Windows x64 | Windows 10 / Server 2016 or later | Tier 1 |
| Windows arm64 | Windows 10 or later | Tier 2 |
| Windows x86 (32-bit) | no prebuilt binaries as of Node 23.0.0 | dropped |
| macOS x64 / arm64 | macOS 13.5 or later (binaries built with `-mmacosx-version-min=13.5`) | Tier 1 (v24 branch) |

- Linux binaries are built on RHEL 8 (gcc-toolset-12); the glibc floor is 2.28 and they also need `libstdc++ >= 6.0.25` (`GLIBCXX_3.4.25`).
- Node.js does not support an OS version whose vendor has declared end-of-life, regardless of the table.
- **Building from source (v24):** Linux/AIX GCC >= 12.2; Windows Visual Studio 2022 or 2026 with Windows 10/11 SDK on a 64-bit host, **ClangCL required** (MSVC support removed in Node 24.0.0); macOS Xcode >= 16.1 (Apple LLVM >= 17).
- Verified shipped binary set for v24.19.0: `linux-x64`, `linux-arm64`, `linux-ppc64le`, `linux-s390x`, `darwin-x64`, `darwin-arm64`, `win-x64`, `win-arm64`, `aix-ppc64` (+ source/headers). No armv7, no musl, no riscv64/loong64 in the official dist.

## 4. Citations (URL, retrieved time, excerpt/locator)

1. **Node.js v22 to v24 migration guide** — https://nodejs.org/en/blog/migrations/v22-to-v24 (retrieved 2026-08-11T02:19Z)
   - "Platform support … Node.js no longer provides pre-built binaries for: 32-bit Windows (x86) as of Node.js 23.0.0; 32-bit Linux on armv7 as of Node.js 24.0.0."
   - "Pre-built binaries for macOS now require a minimum of macOS 13.5."
   - "Pre-built binaries for Linux on arm64, ppc64le, s390x and x64 continue to be compatible with glibc 2.28 and above (no change from Node.js 22)."
   - "For AIX and Linux platforms, the minimum supported version of gcc is 12.2. For macOS the minimum supported version of Xcode is 16.1."
   - "With the release of Node.js 24.11.0, the Node.js 24 release line has entered Long-Term Support (LTS) and will continue to receive updates through to the end of April 2028."
2. **nodejs/node BUILDING.md, v24.x-staging branch** — https://raw.githubusercontent.com/nodejs/node/v24.x-staging/BUILDING.md (curl, 2026-08-11T02:20Z)
   - Platform list table ("Platform list" section, rows ~108–121): Linux x64/arm64 "kernel >= 4.18, glibc >= 2.28" Tier 1; armv7 "Downgraded as of Node.js 24" Experimental; Windows x64 ">= Windows 10/Server 2016" Tier 1; Windows arm64 ">= Windows 10" Tier 2; macOS x64/arm64 ">= 13.5" Tier 1.
   - Toolchains: "Linux: GCC >= 12.2; Windows: Visual Studio 2022 or 2026 with the Windows 10 or 11 SDK on a 64-bit host; macOS: Xcode >= 16.1 (Apple LLVM >= 17)".
   - "Official binary platforms and toolchains": linux-* produced on "RHEL 8 with gcc-toolset-12 … compatible with glibc >= 2.28 and libstdc++ >= 6.0.25"; darwin produced on "macOS 13, Xcode 16 with -mmacosx-version-min=13.5"; win-* on "Windows Server 2022 (x64) with Visual Studio 2022".
   - "Node.js does not support a platform version if a vendor has expired support for it."
3. **nodejs/node BUILDING.md, main branch** — https://raw.githubusercontent.com/nodejs/node/main/BUILDING.md (curl, 2026-08-11T02:20Z)
   - Same Linux/Windows floors; macOS x64 downgraded to Tier 2 with note "Intel-based architecture … early 2028 at which time that platform will move to experimental status" (future lines, not v24).
   - Adds Experimental rows: loong64 (kernel >= 5.19, glibc >= 2.36), riscv64 (kernel >= 5.19, glibc >= 2.36, GCC >= 14/Clang >= 19).
4. **nodejs/Release Release WG** — https://github.com/nodejs/Release (open_page, 2026-08-11T02:21Z)
   - Schedule table: "24.x | Active LTS | Krypton | 2025-05-06 | 2025-10-28 | 2026-10-20 | 2028-04-30"; "22.x | Maintenance LTS | Jod | … | 2027-04-30"; "26.x | Current | … | Active LTS 2026-10-28".
5. **nodejs.org Releases page** — https://nodejs.org/en/about/previous-releases (open_page, 2026-08-11T02:21Z)
   - v24 "Krypton" = LTS; v22 "Jod" = LTS; v26 = Current. "Production applications should only use Active LTS or Maintenance LTS releases."
6. **Node.js 24.0.0 release notes** — https://nodejs.org/en/blog/release/v24.0.0 (open_page, 2026-08-11T02:22Z)
   - Semver-major platform commits: "build: bump supported macOS version to 13.5 (#57115)"; "build: increase minimum Xcode version to 16.1 (#56824)"; "build: downgrade armv7 support to experimental (#58071)"; "Starting with Node.js 24, support for MSVC has been removed, and ClangCL is now required to compile Node.js on Windows."
7. **nodejs.org dist index + directory** — https://nodejs.org/dist/index.json and https://nodejs.org/dist/v24.19.0/ (curl, 2026-08-11T02:21Z)
   - v24 latest = v24.19.0 (2026-08-03, lts="Krypton"); v22.23.2 (2026-07-28); v26.7.0 (2026-08-05, not LTS).
   - v24.19.0 shipped files = aix-ppc64, darwin-arm64/x64, linux-arm64/ppc64le/s390x/x64, win-arm64/x64, src, headers. No musl/armv7/riscv64/loong64 binaries.

## 5. Contradictions and unknowns

- **Stale third-party content (contradiction, resolved):** 2026 blog posts (e.g., landui.com, CSDN, bestwebteacher) still recommend "Node.js 20 LTS" as the production default. Official sources say Node 20 is EOL since 2026-04-30. Not authoritative; noted to avoid relying on search snippets.
- **Consistent across official sources:** glibc >= 2.28 / kernel >= 4.18 (unchanged since Node 18-era policy, reconfirmed for v24 by both BUILDING.md and the migration guide); macOS floor 13.5 is new for v24 (was 11.x-era for older lines, per migration wording "no change from Node.js 22" applying only to Linux).
- **Unknown (future drift):** whether Node 26 (LTS from 2026-10-28) or Node 27 will raise floors (e.g., Windows 10→11, further macOS bump, kernel bump). Not asserted.
- **Unknown (v22 vs v24):** v22 Maintenance LTS keeps older floors (e.g., 32-bit Windows binaries still shipped for v22 since the drop was "as of Node.js 23.0.0"). Not enumerated per-OS here; only the migration guide's statement was verified.
- **Unknown (musl):** Alpine/musl is marked Experimental and no musl tarball ships for v24.19.0, but community paths (package managers, unofficial builds) may still work; not verified in this run.
- **Documentation gap:** there is no single consolidated "system requirements" page on nodejs.org; floors are spread across BUILDING.md, the migration guide, and release notes.

## 6. Gaps (adapter failures / blocked / thin)

- `https://nodejs.org/en/learn/getting-started/how-to-install-nodejs` → **HTTP 404** (page moved); install-guide wording could not be cross-checked.
- `https://nodejs.org/en/blog/announcements/v24-release-announce` → **HTTP 404**; used v24.0.0 release notes instead.
- `https://nodejs.org/dist/latest-v24.x/README.md` → **"File not found"**; no README is shipped in the dist folder.
- `https://nodejs.org/en/download` → fetched but **client-side rendered**; extracted almost no structured content (thin evidence, not relied on).
- `raw.githubusercontent.com` via the page tool → **BAD_CONTENT** adapter failure; curl fallback succeeded (method note).
- DuckDuckGo HTML adapter: **not attempted** — not needed because host web tools worked; no paid SERP used.

## 7. Free-path vs paid-path usage

- **Free paths only (L0/L1):** host search/open_page tools + direct official endpoints (nodejs.org, raw.githubusercontent.com, github.com). Zero cost, no keys.
- **Paid paths (L4):** none used.
