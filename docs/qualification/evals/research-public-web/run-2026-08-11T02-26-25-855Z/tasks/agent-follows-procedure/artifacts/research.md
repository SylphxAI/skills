# Research: What are the current system requirements of the Node.js LTS release?

- Method: `research-public-web` skill (`SKILL.md` + `references/recipes.md`, opened first; workspace has no `references/` dir, so installed skill copy at `/home/codex/.codex/skills/research-public-web/references/recipes.md` was used)
- Research window: 2026-08-11, ~02:26:55Z–02:29:40Z UTC
- Path usage: **free-path only (L0/L1)** — host web search tool + direct official URLs + Wikipedia API + endoflife.date API + DuckDuckGo HTML probe. **No paid/L4 SERP used.**

## 1. Framing

Decision this research supports: choose whether a given OS/arch/libc environment can run the current Node.js LTS (for fleet/CI/docker base-image planning) and know which OS versions, kernels, glibc versions, and toolchains are officially required or unsupported.

Must-have sources (primary): `nodejs.org` release schedule and dist index, `nodejs/node` v24.x `BUILDING.md` supported-platforms table, official v24 migration guide. Nice-to-have (cross-check): Wikipedia, endoflife.date.

Scope note: "current LTS" is time-dependent. As of the research window, the most recent LTS line is v24 "Krypton" (Active LTS); v22 "Jod" is Maintenance LTS; v26 is still Current (non-LTS). Requirements below are for **v24.x**.

## 2. Search (free paths, in ladder order)

1. **Host web search tool (L0)** — used to locate official pages, not as evidence. Surfaced the official v22→v24 migration guide; also surfaced stale/incorrect third-party blog posts (used only as contradiction examples below).
2. **Direct official URLs (L1)** — primary evidence: `nodejs.org/dist/index.json`, `nodejs.org/en/about/previous-releases`, `raw.githubusercontent.com/nodejs/node/v24.x/BUILDING.md`, `raw.githubusercontent.com/nodejs/Release/main/README.md`, `nodejs.org/en/blog/release/v24.0.0`, `nodejs.org/en/blog/migrations/v22-to-v24`.
3. **Wikipedia REST API (L1)** — cross-check of supported OS list (thin: no version minimums).
4. **endoflife.date JSON (L1, community-maintained — secondary only)** — LTS dates and Windows 10 EOL cross-check.
5. **DuckDuckGo HTML probe (L1 brittle)** — returned HTTP 200 HTML, but was not needed; official URLs were sufficient. Not used as evidence.

## 3. Fetch and extract

All HTTP fetches succeeded (200) unless noted; retrieval times are UTC.

### 3.1 Which release is "the current LTS"

- **`https://nodejs.org/dist/index.json`** — retrieved 2026-08-11T02:27Z. Excerpt (latest LTS entry): `{"version":"v24.19.0","lts":"Krypton","date":"2026-08-03",...}`. The index also shows `v26.7.0` (2026-08-05) as latest overall (Current, not LTS) and `v22.23.2` (2026-07-28) as the latest of the Jod line.
- **`https://raw.githubusercontent.com/nodejs/Release/main/README.md`** — retrieved ≈02:28Z. Schedule table row (columns: Version | Status | Codename | Initial release | LTS start | Maintenance start | End-of-life):
  `| 24.x | Active LTS | Krypton | 2025-05-06 | 2025-10-28 | 2026-10-20 | 2028-04-30 |`
  and `| 22.x | Maintenance LTS | Jod | ... | 2027-04-30 |`, `| 26.x | Current | ... | 2026-10-28 | 2029-04-30 |`.
- **`https://nodejs.org/en/about/previous-releases`** — retrieved 2026-08-11T02:26:55Z. Table row: `v 24 | Krypton | May 06, 2025 | Aug 03, 2026 | LTS` (status column is coarse: "LTS" for both v24 and v22; page prose: "Production applications should only use Active LTS or Maintenance LTS releases.").
- **`https://endoflife.date/api/nodejs.json`** — retrieved ≈02:29Z. `{"cycle":"24","releaseDate":"2025-05-06","lts":"2025-10-28","eol":"2028-04-30","latest":"24.19.0","latestReleaseDate":"2026-08-03","support":"2026-10-20"}` — matches the official schedule.

### 3.2 System requirements for v24.x (the current LTS)

- **`https://raw.githubusercontent.com/nodejs/node/v24.x/BUILDING.md`** — retrieved 2026-08-11T02:27Z, section "Supported platforms" → "Platform list". This is the authoritative tier table. Key rows:
  - `GNU/Linux | x64 | kernel >= 4.18[^1], glibc >= 2.28 | Tier 1 | e.g. Ubuntu 20.04, Debian 10, RHEL 8`
  - `GNU/Linux | arm64 | kernel >= 4.18[^1], glibc >= 2.28 | Tier 1`
  - `GNU/Linux | x64 | kernel >= 3.10, musl >= 1.1.19 | Experimental | e.g. Alpine 3.8`
  - `GNU/Linux | armv7 | kernel >= 4.18[^1], glibc >= 2.28 | Experimental | Downgraded as of Node.js 24`
  - `Windows | x64 | >= Windows 10/Server 2016 | Tier 1`
  - `Windows | arm64 | >= Windows 10 | Tier 2`
  - `macOS | x64 | >= 13.5 | Tier 1`
  - `macOS | arm64 | >= 13.5 | Tier 1`
  - Tier 2: `GNU/Linux ppc64le >= power8` and `s390x` (kernel >= 4.18, glibc >= 2.28), `SmartOS x64 >= 18`, `AIX ppc64be >= 7.2 TL04`. Experimental: `FreeBSD x64 >= 13.2`, `OpenHarmony arm64 >= 5.0`, `loong64`/`riscv64` (kernel >= 5.19, glibc >= 2.36).
  - Prose: "For production applications, run Node.js on supported platforms only (Tier 1 or 2)." and "Node.js does not support a platform version if a vendor has expired support for it... regardless of entries in the table below."
  - Footnotes: `[^1]` older kernels may work but official binaries are built on RHEL 8 with kernel 4.18; `[^3]` WSL is not supported — the Windows binary in WSL "will not work without workarounds"; `[^2]` mintty terminals need winpty; `[^4]` macOS binaries compiled targeting 13.5, Xcode 16 required to compile.
  - Toolchain table: `Windows: Visual Studio 2022 or 2026 with Windows 10 or 11 SDK`, `macOS: Xcode >= 16.1 (Apple LLVM >= 17)`; binaries built with RHEL 8 + gcc-toolset-12 are "compatible with glibc >= 2.28 and libstdc++ >= 6.0.25 (GLIBCXX_3.4.25)".
- **`https://nodejs.org/en/blog/migrations/v22-to-v24`** — retrieved ≈02:29Z. Official user-facing migration guide, section "Platform support":
  - "Node.js no longer provides pre-built binaries for: 32-bit Windows (x86) as of Node.js 23.0.0. 32-bit Linux on armv7 as of Node.js 24.0.0."
  - "Pre-built binaries for macOS now require a minimum of macOS 13.5."
  - "Pre-built binaries for Linux on arm64, ppc64le, s390x and x64 continue to be compatible with glibc 2.28 and above (no change from Node.js 22)."
  - "Building Node.js from source... For AIX and Linux platforms, the minimum supported version of gcc is 12.2. For macOS the minimum supported version of Xcode is 16.1."
- **`https://nodejs.org/en/blog/release/v24.0.0`** — retrieved ≈02:28Z (first-guess slug `/en/blog/announcements/v24-release-announce` returned 404 — see gaps). Release notes confirm two SEMVER-MAJOR build changes: "bump supported macOS version to 13.5" (PR #57115) and "downgrade armv7 support to experimental" (Michaël Zasso).
- **`https://en.wikipedia.org/w/api.php?action=parse&page=Node.js&prop=wikitext&format=json&section=0`** — retrieved ≈02:29Z. Only confirms the supported-OS list (z/OS, Linux, macOS, Windows, SmartOS, FreeBSD, OpenBSD, AIX); no version minimums (thin).

## 4. Synthesis — answer first

**As of 2026-08-11, the current Node.js LTS is v24 "Krypton" (Active LTS; latest v24.19.0, released 2026-08-03; Active LTS until 2026-10-20, EOL 2028-04-30).** If you mean the newest LTS line, use v24; v22 "Jod" (Maintenance LTS, EOL 2027-04-30) and v26 "Current" (becomes LTS 2026-10-28) are different tiers.

Official v24.x system requirements (Tier 1 = fully tested, release-blocking):

| Platform | Requirement | Tier |
|---|---|---|
| Linux x64 / arm64 | kernel >= 4.18, glibc >= 2.28 (baseline e.g. Ubuntu 20.04, Debian 10, RHEL 8) | Tier 1 |
| Linux x64 (Alpine/musl) | kernel >= 3.10, musl >= 1.1.19 | Experimental |
| Linux armv7 / armv6 / x86 | glibc >= 2.28 / 2.24 / 2.17 (no pre-built armv7 binaries as of v24) | Experimental |
| Linux ppc64le, s390x | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| Windows x64 | Windows 10 / Server 2016 or later | Tier 1 |
| Windows arm64 | Windows 10 or later | Tier 2 |
| macOS x64 / arm64 | macOS 13.5 (Ventura) or later | Tier 1 |
| SmartOS x64 | >= 18 | Tier 2 |
| AIX ppc64be | >= 7.2 TL04 | Tier 2 |
| FreeBSD x64 / OpenHarmony arm64 | >= 13.2 / >= 5.0 | Experimental |
| Source build (Linux/AIX) | gcc >= 12.2 | — |
| Source build (macOS) | Xcode >= 16.1 | — |

Practical consequences: the glibc >= 2.28 floor means v24 pre-built Linux binaries do **not** run on RHEL 7, CentOS 7, Ubuntu 18.04, or Debian 9 (glibc 2.17/2.27 era) without rebuilds; Alpine is experimental, not Tier 1; 32-bit Windows binaries are gone since v23; WSL is not an officially supported runtime for `node.exe`.

**Citations (all free-path):**
- Current LTS identity + version: `https://nodejs.org/dist/index.json` (retrieved 2026-08-11T02:27Z; `v24.19.0` / `Krypton` / 2026-08-03)
- LTS status/dates: `https://raw.githubusercontent.com/nodejs/Release/main/README.md` (≈02:28Z; `24.x | Active LTS | Krypton | ... | 2026-10-20 | 2028-04-30`); corroborated by `https://nodejs.org/en/about/previous-releases` (02:26:55Z) and `https://endoflife.date/api/nodejs.json` (≈02:29Z)
- Platform/toolchain requirements: `https://raw.githubusercontent.com/nodejs/node/v24.x/BUILDING.md` (≈02:27Z, "Supported platforms" table + footnotes)
- User-facing requirements: `https://nodejs.org/en/blog/migrations/v22-to-v24` (≈02:29Z, "Platform support" section)
- macOS bump + armv7 downgrade: `https://nodejs.org/en/blog/release/v24.0.0` (≈02:28Z, changelog build entries)

### Contradictions / tensions found

1. **armv7**: the migration guide says v24 ships "no pre-built binaries" for 32-bit Linux armv7, while `BUILDING.md` still lists armv7 as "Experimental". Resolution: experimental tier = may compile, no official binaries; both statements are consistent once you read the tier definition, but they look contradictory at first glance.
2. **Windows 10 vs Node's own EoL-platform policy**: `BUILDING.md` (current v24.x branch) still lists `>= Windows 10/Server 2016` as Tier 1, but the same doc says Node "does not support running on End-of-Life (EoL) platforms", and Windows 10 consumer (22H2) reached vendor EOL 2025-10-14 (per `https://endoflife.date/api/windows.json`, retrieved ≈02:29Z). Unresolved: the table has not been updated for Windows 10 EOL; treat "Windows 10" as an unmaintained-edge case (Windows 10 Enterprise LTSC 2021 and Server 2016 remain within vendor support windows).
3. **Third-party SEO blogs contradict official sources**: a CSDN tutorial (retrieved via host search, 2026-01/2026-05) still recommends v20 as the "current LTS" — stale and wrong (v20 is EOL per the official schedule; last release 2026-03-24). A goyou.it guide claims "RAM memory: at least 2 GB" and "GCC 13.2 or higher" — the RAM figure appears in no official source, and GCC 13.2 contradicts the official gcc >= 12.2 minimum. Not used as evidence.

### Unknowns / unverified

- **No official minimum RAM, disk, or CPU-speed requirements** are published anywhere in the sources above; "system requirements" officially means OS/arch/libc/toolchain only.
- Whether/when Node will formally drop Windows 10 (and Server 2016) from the supported table given vendor EOL (see contradiction 2).
- Future of the armv7 experimental tier (will binaries ever ship again?).
- The v24.x `BUILDING.md` says Windows x64 requires ">= Windows 10/Server 2016" without specifying minimum builds (e.g., 21H2+), so older Windows 10 builds remain ambiguous.

## 5. Free-path vs paid-path usage

- **Free paths used (L0/L1):** host web search tool (page discovery only); direct official URLs (nodejs.org, GitHub raw, release notes, migration guide); Wikipedia REST API; endoflife.date JSON; DuckDuckGo HTML probe (200, unused as evidence).
- **Paid paths (L4):** none used.

## 6. Gaps

- **Blocked/missing hosts or files:** `https://nodejs.org/dist/latest-v24.x/README.md` → **404** (README not shipped in the v24 dist directory; fetched via GitHub raw instead). `https://nodejs.org/en/blog/announcements/v24-release-announce` and `.../v24-release-announcement` → **404** (wrong slugs; real page is `/en/blog/release/v24.0.0`).
- **Stale/thin pages:** `https://nodejs.org/en/download` (canonical download page) returned 200 but its static HTML contains **no system-requirements text** (client-rendered; only package-manager copy extracted) — a fetch-level gap, not evidence of absence. Wikipedia's Node.js page only lists OSes, no version minimums (thin). endoflife.date is community-maintained, so its dates are corroboration only, not authority.
- **Residual unknowns:** RAM/disk requirements not published; Windows 10 EOL vs supported-table tension unresolved (would need a `nodejs/node` issue/PR or Build WG statement to close).

## Done for this run

- Decision-ready answer: yes — current LTS = v24 "Krypton" (24.19.0); requirements table above answers "can this OS/arch run it" for Tier 1/2 and experimental platforms.
- Source list with URLs, retrieval times, and excerpts: section 3.
- Free vs paid labeled: section 5.
- Gaps explicit: section 6.
