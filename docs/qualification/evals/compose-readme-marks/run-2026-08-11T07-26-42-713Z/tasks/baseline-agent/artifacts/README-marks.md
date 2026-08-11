# README Marks

Paste-ready badges and hero banner for this library's README. All URLs below
were probed live on **2026-08-11** (`HTTP 200`, `image/svg+xml`).

## Replace these placeholders

| Placeholder | Replace with |
|---|---|
| `LIBRARY_NAME` | Library display name (e.g. `sylphx-lib`) |
| `OWNER` | GitHub owner/org (e.g. `SylphxAI`) |
| `REPO` | GitHub repo name |
| `PKG` | npm package name |

## Paste-ready block

```markdown
<!-- hero: mark.sylphx.com/api/v1/mark/hero (form=hero, art=wave, theme=tokyonight) -->
<p align="center">
  <img src="https://mark.sylphx.com/api/v1/mark/hero?art=wave&theme=tokyonight&text=LIBRARY_NAME&desc=A%20tiny%2C%20zero-dependency%20library%20for%20modern%20apps&height=200&animation=ambient&credit=0" alt="LIBRARY_NAME hero banner" width="100%">
</p>

<p align="center">
  <!-- static chips; swap for the dynamic variants below once OWNER/REPO and CI are live -->
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="build passing">
  <img src="https://img.shields.io/badge/coverage-92%25-brightgreen" alt="coverage 92%">
  <img src="https://img.shields.io/badge/version-1.2.3-blue" alt="version 1.2.3">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT license">
</p>

<p align="center">
  <strong>LIBRARY_NAME</strong> — a tiny, zero-dependency library for modern apps.
  Released under the <a href="LICENSE">MIT License</a>.
</p>
```

## Badges

### Static (no external data; safe to paste immediately)

| Badge | Markdown |
|---|---|
| build | `![build](https://img.shields.io/badge/build-passing-brightgreen)` |
| coverage | `![coverage](https://img.shields.io/badge/coverage-92%25-brightgreen)` |
| version | `![version](https://img.shields.io/badge/version-1.2.3-blue)` |
| license | `![license](https://img.shields.io/badge/license-MIT-blue)` |

### Dynamic (live data; renders an error badge until the repo/package exists)

| Badge | Markdown |
|---|---|
| build (GitHub Actions) | `![build](https://img.shields.io/github/actions/workflow/status/OWNER/REPO/ci.yml?branch=main&label=build)` |
| coverage (Codecov) | `![coverage](https://img.shields.io/codecov/c/github/OWNER/REPO?label=coverage)` |
| version (npm) | `![version](https://img.shields.io/npm/v/PKG?label=version)` |
| version (GitHub release) | `![version](https://img.shields.io/github/v/release/OWNER/REPO?label=version)` |
| license | `![license](https://img.shields.io/github/license/OWNER/REPO?label=license)` |

### Mark pills (same look as the hero; alternative to shields chips)

```markdown
<!-- mark.sylphx.com/api/v1/mark/pill — form=pill, style in {flat, plastic, for-the-badge, social, pill} -->
![build](https://mark.sylphx.com/api/v1/mark/pill?label=build&message=passing&color=brightgreen&style=flat)
![coverage](https://mark.sylphx.com/api/v1/mark/pill?label=coverage&message=92%25&color=brightgreen&style=flat)
![version](https://mark.sylphx.com/api/v1/mark/pill?label=version&message=1.2.3&color=blue&style=flat)
![license](https://mark.sylphx.com/api/v1/mark/pill?label=license&message=MIT&color=blue&style=flat)
```

## Verify before pasting

```bash
curl -sSI "https://mark.sylphx.com/api/v1/mark/hero?art=wave&theme=tokyonight&text=Test&height=120"
curl -sSI "https://img.shields.io/badge/build-passing-brightgreen"
# expect: HTTP/2 200, content-type: image/svg+xml
```

## Notes / residuals

- Mark routes changed since earlier recipes (probed 2026-08-08): `/api/v1/badge`,
  `/api/v1/banner`, `/api/v1/icons` now return `404`. Current routes
  (`mark.sylphx.com/api/v1`, revision `42349c8b8356b5b02da7da9e1b36c7f668e08093`,
  version `0.1.0`): `/api/v1/mark`, `/api/v1/mark/{form}`,
  `/badge/{label}-{message}-{color}`, `/api/v1/catalog`, `/health`.
- Dynamic shields badges return `200` even for nonexistent repos (rendered as an
  error badge); they are meaningful only once the repo/package/CI exist.
- Badges are presentation only — not release or delivery evidence.
- Images are hotlinked; if the mark host is down the README images break.
- Keep license text as real markdown (see paste block) — never rely on a badge
  alone for legal clarity.
