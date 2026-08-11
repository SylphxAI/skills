# Research: Current system requirements of the Node.js LTS release

**Retrieved:** 2026-08-11 ~02:41 UTC (all fetches this run; UTC timestamps per source below)
**Method:** research-public-web skill — free-path only (L0/L1). No paid SERP used.

---

## Answer first

**The current Node.js LTS is v24.19.0 ("Krypton"), and its officially supported runtime platforms are: Linux x64/arm64 on kernel >= 4.18 with glibc >= 2.28 (Tier 1), Windows x64 >= Windows 10/Server 2016 (Tier 1), and macOS >= 13.5 on both arm64 and x64 (Tier 1).** Secondary (Tier 2) support: Linux ppc64le >= POWER8, s390x, Windows arm64 >= Windows 10, SmartOS x64 >= 18, AIX 7.2 TL04 (ppc64be >= POWER8). Everything else — Alpine/musl, x86, armv7, armv6, loong64, riscv64, FreeBSD, OpenHarmony — is Experimental (not supported for production). **Node.js publishes no official minimum RAM, disk, or CPU-speed requirement.**

Version scope matters: Node.js 26 (v26.7.0, "Current") and the `main` branch raise some requirements (POWER9/z14 for ppc64le/s390x, macOS x64 downgraded to Tier 2 until early 2028, `libatomic` needed at runtime from Node 25+). Those do **not** apply to the v24 LTS.

---

## 1. Frame

- **Decision to support:** choosing an install/CI base image or deployment target for the current LTS — which OS/architecture/libc versions are officially supported (Tier 1/2) vs experimental, and what hardware minimums (if any) are documented.
- **Must-have sources:** `nodejs.org/dist/index.json` (version truth), `nodejs.org/en/download` + `/en/about/releases` (LTS statement), `nodejs/node` `BUILDING.md` per branch (official platform matrix).
- **Nice-to-have:** official install docs, Wikipedia cross-check, general web search adapter.

## 2. Search path (free-path ladder, all L0/L1)

1. Direct official URLs first (known endpoints): nodejs.org + nodejs/node BUILDING.md. ✅ used
2. DuckDuckGo HTML adapter (`html.duckduckgo.com/html`) as general free search. ✅ used, worked (HTTP 200, 9 result links) but returned no authoritative "system requirements" page — only generic/download links and third-party SEO pages (versionlog.com, openclaw docs) which were **not** used as sources.
3. Wikipedia API cross-check (L1). ✅ used, low value (generic summary only).
4. Archive.org: not needed — all live pages were retrievable.
5. Paid SERP (L4): **not used**.

## 3. Sources, retrieved times, excerpts

### 3.1 Current LTS version — `https://nodejs.org/en/download` (retrieved 2026-08-11T02:41:05Z, HTTP 200)

> "Get Node.js® v24.19.0 LTS" … "v24.19.0 Latest LTS" … "v26.7.0 Current" … "v22.23.2 LTS" … "v20.20.2 EOL"

Page note (gap): static HTML says "This page requires JavaScript … You can download Node.js without JavaScript by visiting the downloads archive page directly." The OS/arch picker section is JS-rendered; no "System requirements" text exists in the static HTML.

### 3.2 LTS schedule/status — `https://nodejs.org/en/about/releases` (retrieved 2026-08-11T02:41:05Z, HTTP 200)

> "v 24 Krypton — May 06, 2025 — Aug 03, 2026 — LTS" … "v 22 Jod — Apr 24, 2024 — Jul 28, 2026 — LTS" … "v 26 — May 05, 2026 — Aug 05, 2026 — Current" … "v 20 Iron — … Mar 24, 2026 — EOL"

> "Production applications should only use Active LTS or Maintenance LTS releases." … "Starting with Node.js 27, the release cycle will be annual and every major version will move to LTS status after its six-month Current phase (and six additional months of Alpha phase)."

### 3.3 Exact LTS lines — `https://nodejs.org/dist/index.json` (retrieved 2026-08-11T02:41:05Z)

- Newest LTS line: `v24.19.0` `"Krypton"` `2026-08-03` (also `v22.23.2` `"Jod"` `2026-07-28` still tagged LTS).
- v24.19.0 file set (SHASUMS256.txt): aix-ppc64, arm64.msi, darwin-arm64, darwin-x64, linux-arm64, linux-armv7l, linux-armv6l, linux-ppc64le, linux-s390x, linux-x64, linux-x86, win-arm64, win-x64 … (Linux x64 binary: `node-v24.19.0-linux-x64.tar.xz`).

### 3.4 Official platform matrix (v24 LTS) — `https://raw.githubusercontent.com/nodejs/node/v24.x/BUILDING.md` (retrieved 2026-08-11T02:41Z, HTTP 200; section "Supported platforms" → "Platform list")

| OS | Arch | Version | Tier |
|---|---|---|---|
| GNU/Linux | x64 | kernel >= 4.18, glibc >= 2.28 (e.g. Ubuntu 20.04, Debian 10, RHEL 8) | **Tier 1** |
| GNU/Linux | arm64 | kernel >= 4.18, glibc >= 2.28 | **Tier 1** |
| GNU/Linux | x64 | kernel >= 3.10, musl >= 1.1.19 (e.g. Alpine 3.8) | Experimental |
| GNU/Linux | x86 | kernel >= 3.10, glibc >= 2.17 | Experimental |
| GNU/Linux | armv7 / armv6 | kernel >= 4.18/4.14, glibc >= 2.28/2.24 | Experimental (downgraded as of Node 24 / Node 12) |
| GNU/Linux | ppc64le >= POWER8 | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| GNU/Linux | s390x | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| GNU/Linux | loong64 | kernel >= 5.19, glibc >= 2.36 | Experimental |
| GNU/Linux | riscv64 | kernel >= 5.19, glibc >= 2.36 | Experimental |
| Windows | x64 | >= Windows 10 / Server 2016 | **Tier 1** |
| Windows | arm64 | >= Windows 10 | Tier 2 |
| macOS | x64 | >= 13.5 | **Tier 1** |
| macOS | arm64 | >= 13.5 | **Tier 1** |
| SmartOS | x64 | >= 18 | Tier 2 |
| AIX | ppc64be >= POWER8 | >= 7.2 TL04 | Tier 2 |
| FreeBSD | x64 | >= 13.2 | Experimental |
| OpenHarmony | arm64 | >= 5.0 | Experimental |

Quotes (same source):
- "For production applications, run Node.js on supported platforms only (Tier 1 or 2)."
- "Node.js does not support a platform version if a vendor has expired support for it."
- "[^3] The Windows Subsystem for Linux (WSL) is not supported… Running the Windows binary (node.exe) in WSL will not work without workarounds such as stdio redirection."
- Official Linux binaries are "built on RHEL 8 systems with kernel 4.18" and "compatible with glibc >= 2.28 and libstdc++ >= 6.0.25 (GLIBCXX_3.4.25) — available on distributions natively supporting GCC 8.1 or higher, such as Debian 10, RHEL 8 and Ubuntu 20.04."

Build toolchains (v24, for building from source): Linux GCC >= 12.2; Windows Visual Studio 2022 or 2026 with Windows 10/11 SDK; macOS Xcode >= 16.1 (Apple LLVM >= 17).

### 3.5 What changes after v24 — `https://raw.githubusercontent.com/nodejs/node/main/BUILDING.md` (retrieved 2026-08-11T02:41Z, HTTP 200; "Supported platforms")

- Linux ppc64le >= **POWER9**, s390x >= **z14** (vs POWER8/any in v24).
- macOS x64 >= 13.5 downgraded to **Tier 2**, "Until early 2028" when Intel macOS testing ends (universal binaries will continue, untested).
- riscv64 native builds need GCC >= 14 or Clang >= 19; armv6 row removed.
- Toolchains: Linux GCC >= 13.2 or Clang >= 19.1; macOS Xcode >= 16.4.
- "Starting with Node.js 25, official Linux binaries are linked with libatomic… must have the libatomic runtime installed" (does **not** apply to v24).

### 3.6 Cross-checks (L1)

- Wikipedia summary — `https://en.wikipedia.org/api/rest_v1/page/summary/Node.js` (2026-08-11T02:41Z): "cross-platform, open-source JavaScript runtime… runs on Windows, Linux, Unix, macOS" — consistent, no version detail.
- DuckDuckGo HTML — `https://html.duckduckgo.com/html/?q=node.js+LTS+system+requirements+official` (2026-08-11T02:41:21Z, HTTP 200): no canonical requirements page surfaced; top hits were nodejs.org/download, nodejs release blog, GitHub nodejs/Release, plus third-party SEO pages (not used).

## 4. Contradictions

- **`index.json` `lts` tag vs status pages:** index.json still tags v20/v18/v16… as `lts` (historical flags), while `nodejs.org/en/about/releases` marks v20 Iron **EOL** (2026-03-24). The releases page is the authoritative status; index.json's `lts` field is not a live-status signal.
- **`main` vs v24.x requirements:** platform tiers and minimums differ between the current dev branch (Node 26/27) and the v24 LTS branch (see 3.5). Answers must be version-scoped; "Node.js system requirements" without a branch is ambiguous.

## 5. Unknowns

- **No official minimum RAM, disk, or CPU-speed requirement** exists on nodejs.org or in nodejs/node docs — the official requirements are OS/arch/kernel/libc/toolchain only. (Thin evidence: absence of documentation, not a documented "no minimum".)
- Whether "current LTS" means v24 (Krypton, Active LTS) or includes v22 (Jod, Maintenance LTS) — both are LTS status; production guidance covers both. v26 becomes LTS in Oct 2026 (per the annual-cycle note; exact date on the GitHub release schedule, not fetched).

## 6. Gaps

- **Local skill copy incomplete:** the workspace `./SKILL.md` points to `references/recipes.md`, which does not exist in the workspace; I opened the canonical skill at `/home/codex/.codex/skills/research-public-web/references/recipes.md` instead.
- **Stale/removed page:** `https://nodejs.org/en/learn/getting-started/how-to-install-nodejs` returns HTTP 404 (docs restructure) — the old install/requirements guide is gone.
- **JS-rendered download page:** `/en/download` warns "This page requires JavaScript"; the OS/arch-specific download section could not be fully extracted from static HTML (SHASUMS256.txt used instead for file-set truth).
- **No dedicated "System requirements" page:** requirements live only in `BUILDING.md` per branch; no single nodejs.org URL states them for end users.
- **Third-party SEO pages** (versionlog.com, openclaw docs) appeared in search results but were excluded as non-authoritative.
- **Not verified:** actual behavior on each listed platform (e.g., Alpine), git SHA of the BUILDING.md files fetched (raw.githubusercontent HEAD fetch; branch pins `v24.x`/`main`), and the v24.19.0 binary digests beyond SHASUMS listing.

## 7. Free vs paid path usage

- **Free paths used (L0/L1):** official nodejs.org pages (`/en/download`, `/en/about/releases`, `/dist/index.json`, `/dist/v24.19.0/SHASUMS256.txt`), `raw.githubusercontent.com/nodejs/node` (`v24.x` and `main` BUILDING.md), DuckDuckGo HTML (brittle L1, worked), Wikipedia REST API.
- **Paid path (L4):** none — no SerpAPI or other paid SERP used.
