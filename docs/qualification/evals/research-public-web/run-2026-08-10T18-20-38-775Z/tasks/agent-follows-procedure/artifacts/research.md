# Node.js LTS — Current System Requirements

**Research method:** `research-public-web` skill (free paths first). All providers below are L1 no-key/free paths; **no paid SERP was used**. Retrieval time per source is UTC.

---

## Answer (decision-first)

The current Node.js LTS release is **v24 "Krypton" (Active LTS, v24.19.0)** with **v22 "Jod" (Maintenance LTS, v22.23.2)** still supported. The authoritative "system requirements" are published in the official `nodejs/node` source as the **platform support matrix in `BUILDING.md`** — there is **no consolidated "System Requirements" page on nodejs.org** (the `/en/docs/system-requirements` path returns 404).

**Tier 1 (production-supported) minimums to *run* the current LTS v24.x:**

- **GNU/Linux x64 / arm64** — kernel **>= 4.18** and glibc **>= 2.28** (official binaries built on RHEL 8 / kernel 4.18). Tier 1.
- **Windows x64** — **>= Windows 10 / Server 2016**. Tier 1.
- **macOS x64 and arm64** — **>= 13.5** (macOS binaries compiled with `-mmacosx-version-min=13.5`). Tier 1.

Overriding rule: **Node.js does not support running on any vendor End-of-Life (EoL) OS**, "regardless of entries in the table." So even listed versions that the vendor has EoL'd are unsupported.

If the question means **build** requirements, the current LTS v24.x needs: GNU/Linux **GCC >= 12.2**, Windows **VS 2022 or 2026 with Windows 10/11 SDK on a 64-bit host**, macOS **Xcode >= 16.1 (Apple LLVM >= 17)**; plus "a supported version of Python" (per python devguide) and **>= 8GB RAM for `make -j4`**.

---

## Current LTS identity (verified)

| Branch | Codename | Latest | LTS status | Source |
|---|---|---|---|---|
| v24 | Krypton | v24.19.0 (2026-08-03) | **LTS (Active)** | nodejs releases + dist index |
| v22 | Jod | v22.23.2 (2026-07-28) | LTS (Maintenance) | nodejs releases + dist index |

From `https://nodejs.org/en/about/previous-releases` (retrieved 2026-08-10T18:20Z): table lists `v24 — Krypton — LTS`, `v22 — Jod — LTS`, with `v26 — Current` and `v25/v23/v21/v20 — EOL`. "Production applications should only use Active LTS or Maintenance LTS releases."

From `https://nodejs.org/dist/index.json` (retrieved 2026-08-10T18:21Z): `v24.19.0` LTS=Krypton, date 2026-08-03; `v22.23.2` LTS=Jod, date 2026-07-28.

---

## System requirements — primary source

Primary source: `nodejs/node` **`BUILDING.md`**, branch `v24.x`
- URL: `https://github.com/nodejs/node/blob/v24.x/BUILDING.md`
- Raw: `https://raw.githubusercontent.com/nodejs/node/v24.x/BUILDING.md`
- Commit: `bed84b6df2c4` (last BUILDING.md commit on v24.x, 2026-06-17T22:15:52Z)
- Retrieved 2026-08-10T18:21Z and 2026-08-10T18:22Z

### Supported platforms table (excerpt)

> "Node.js compilation/execution support depends on operating system, architecture, and libc version. … **For production applications, run Node.js on supported platforms only (Tier 1 or 2).**"

| Operating System | Architectures | Versions | Support Type |
|---|---|---|---|
| GNU/Linux | x64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| GNU/Linux | arm64 | kernel >= 4.18, glibc >= 2.28 | Tier 1 |
| Windows | x64 | >= Windows 10/Server 2016 | Tier 1 |
| macOS | x64 | >= 13.5 | Tier 1 |
| macOS | arm64 | >= 13.5 | Tier 1 |
| GNU/Linux | x86 | kernel >= 3.10, glibc >= 2.17 | Experimental |
| GNU/Linux | armv7 | kernel >= 4.18, glibc >= 2.28 | Experimental (downgraded as of Node.js 24) |
| GNU/Linux | ppc64le >=power8 | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| GNU/Linux | s390x | kernel >= 4.18, glibc >= 2.28 | Tier 2 |
| GNU/Linux | loong64 / riscv64 | kernel >= 5.19, glibc >= 2.36 | Experimental |
| Windows | arm64 | >= Windows 10 | Tier 2 |
| SmartOS | x64 | >= 18 | Tier 2 |
| AIX | ppc64be >=power8 | >= 7.2 TL04 | Tier 2 |
| FreeBSD / OpenHarmony | x64 / arm64 | >= 13.2 / >= 5.0 | Experimental |

**EoL override (verbatim):**
> "Node.js does not support a platform version if a vendor has expired support for it. In other words, Node.js does not support running on End-of-Life (EoL) platforms. This is true regardless of entries in the table below."

Support-toolchain note: official v24 Linux binaries are built on RHEL 8 with gcc-toolset-12 and are "compatible with glibc >= 2.28 and libstdc++ >= 6.0.25 (GLIBCXX_3.4.25)", "available on distributions natively supporting GCC 8.1 or higher, such as Debian 10, RHEL 8 and Ubuntu 20.04."

### Build prerequisites (if 'system requirements' = build environment)

- Linux compiler: **GCC >= 12.2**
- Windows: **Visual Studio 2022 or 2026** with Windows 10 or 11 SDK on a 64-bit host
- macOS: **Xcode >= 16.1 (Apple LLVM >= 17)** — macOS binaries compiled with 13.5 target
- "A supported version of Python" (link: `https://devguide.python.org/versions/`) for building/testing
- Memory: "at least 8GB of RAM is typically required when compiling with 4 parallel jobs (e.g. `make -j4`)"

---

## Cross-check: Maintenance LTS v22.x differs

Primary source: `nodejs/node` **`BUILDING.md`**, branch `v22.x`
- URL: `https://github.com/nodejs/node/blob/v22.x/BUILDING.md`
- Commit: `005508d509e5` (last BUILDING.md commit on v22.x, 2026-05-11T12:37:17Z)
- Retrieved 2026-08-10T18:22Z

Differences vs v24: **macOS minimum is >= 11.0** (not 13.5); **armv7 is Tier 1** (not Experimental); Windows retains **32-bit x86 (WoW64/native) Tier 1 running** and **Windows 8.1/Server 2012 as Experimental** rows. So the "system requirements" a user needs depend on *which* LTS branch they run.

---

## Contradictions & unknowns

- **macOS minimum differs by LTS branch**: v24 says >= 13.5 (binaries compiled with 13.5 target); v22 says >= 11.0. Not a contradiction in-source, but a branch-dependent requirement users must disambiguate.
- **glibc floor is not an OS-version floor alone**: `kernel >= 4.18` + `glibc >= 2.28` is expressed in kernel/glibc terms, not as an explicit distro version list beyond "e.g. Ubuntu 20.04, Debian 10, RHEL 8." Distro versions not named in the "e.g." need manual mapping.
- **Unknown/pending**: There is an open GitHub issue asking the project to "document minimum required Operating System versions for each release" (`nodejs/nodejs.org#8124`, opened ~2025-08-30) — implying the one-page user-facing OS minimum list is not yet published and BUILDING.md is the only canonical home for these figures.
- **EoL policy implication is left to the reader**: the table lists Windows 10 as Tier 1 while Windows 10 mainstream support ended — the doc resolves this only via the "no EoL platforms" override sentence, which is a soft/honest ambiguity a user must apply themselves.

---

## Source list

| Source | URL | Retrieved (UTC) | Role |
|---|---|---|---|
| nodejs releases/LTS status | https://nodejs.org/en/about/previous-releases | 2026-08-10T18:20Z | LTS identity |
| Node dist JSON index | https://nodejs.org/dist/index.json | 2026-08-10T18:21Z | exact LTS patch versions |
| v24.x BUILDING.md (primary) | https://github.com/nodejs/node/blob/v24.x/BUILDING.md | 2026-08-10T18:21Z | platform matrix + toolchains |
| v22.x BUILDING.md | https://github.com/nodejs/node/blob/v22.x/BUILDING.md | 2026-08-10T18:22Z | branch difference note |
| nodejs.org docs 404 probe | https://nodejs.org/en/docs/system-requirements | 2026-08-10T18:21Z | gap: no consolidated page |
| open issue: min OS versions | https://github.com/nodejs/nodejs.org/issues/8124 | search result 2026-08-10 | context: not-yet-documented |
| python supported versions | https://devguide.python.org/versions/ | referenced link in BUILDING.md | build prerequisite |

---

## Free-path vs paid-path usage

- **Free paths (all L1, no key):** curl to official `nodejs.org` endpoints, `raw.githubusercontent.com` BUILDING.md, GitHub commit API, and host web-open of nodejs.org. **No paid SERP used (L4: none).**

---

## Gaps

- **No consolidated official page:** `/en/docs/system-requirements` returns 404; per-version OS minimums are only in repo `BUILDING.md`, plus the open issue `nodejsjsorg#8124` requesting better docs (**thin evidence for a user-facing figure**).
- **Stale/fork risk in search results:** several initial search hits were stale forks (e.g. `georgemandis/node#main`, old Chromium `v8/node` mirror with Python 3.10) — discarded; only `nodejs/node@v24.x`/`v22.x` treated as authority.
- **Distro-mapping not exhaustive:** table's "e.g. Ubuntu 20.04, Debian 10, RHEL 8" is illustrative; exact support for other distros/versions is not spelled out in the fetched excerpt.
- **EoL interplay:** whether a specific (currently EoL) OS version is still "supported" requires manual application of the EoL override rule to the table; not enumerated.
- **`reference-apis.md` noted REST Countries v3.1 deprecation** — not relevant to this topic, listed for completeness as a known adapter warning.
- **DDG HTML adapter** not needed; official URLs were known/direct, so general-search fallback was skipped.

---

*Prepared 2026-08-10T18:22Z. If a fresher figure is needed, re-fetch the v24.x/v22.x `BUILDING.md` matrix and `dist/index.json` at retrieval time — these are the version-scoped authority.*
