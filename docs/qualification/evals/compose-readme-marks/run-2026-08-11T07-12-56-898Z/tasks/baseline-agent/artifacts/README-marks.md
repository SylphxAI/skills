# README-marks.md

Badge + hero block for the README of our open-source library. Generated 2026-08-11
with the `compose-readme-marks` skill; every URL below was live-probed at
generation time (`200` + `image/svg+xml`). Probe details and residuals are at the
bottom.

**Before pasting:** replace `YOUR_ORG` with your GitHub org/user and `your-lib`
with your repo + npm package name. Two tokens, that's it.

## Paste this into the README

<!-- PASTE START -->
<div align="center">

<!-- hero: Mark /api/v1/mark/hero - type=oss, theme=tokyonight, ambient animation -->
![your-lib](https://mark.sylphx.com/api/v1/mark/hero?type=oss&theme=tokyonight&text=your-lib&desc=Do%20one%20thing%20very%20well&height=200&animation=ambient)

# your-lib

**Do one thing very well.** Small, typed, zero-dependency.

<!-- shields.io chips, style=for-the-badge; replace YOUR_ORG/your-lib to make them live -->
![build](https://img.shields.io/github/actions/workflow/status/YOUR_ORG/your-lib/ci.yml?style=for-the-badge)
![coverage](https://img.shields.io/codecov/c/github/YOUR_ORG/your-lib?style=for-the-badge)
![version](https://img.shields.io/npm/v/your-lib?style=for-the-badge)
![license](https://img.shields.io/github/license/YOUR_ORG/your-lib?style=for-the-badge)

MIT © YOUR_ORG

</div>
<!-- PASTE END -->

## Badge reference

| Badge | Source URL | Notes |
|---|---|---|
| build | `/github/actions/workflow/status/YOUR_ORG/your-lib/ci.yml` | Change `ci.yml` to your real workflow file; append `&branch=main` to pin a branch |
| coverage | `/codecov/c/github/YOUR_ORG/your-lib` | Requires Codecov uploads in CI; alternative Coveralls: `/coveralls/github/YOUR_ORG/your-lib` |
| version | `/npm/v/your-lib` | Uses the npm package name; alternative GitHub tag: `/github/v/tag/YOUR_ORG/your-lib` |
| license | `/github/license/YOUR_ORG/your-lib` | Reads `LICENSE` on the default branch |

All four chips use `?style=for-the-badge` to match the Mark hero. Prefix with
`https://img.shields.io` — the file uses the full URLs in the paste block.

## Static fallback (always renders, sample values)

If you want a badge row that renders immediately without any repo/package
lookup, use these instead. The values are samples - update them to match
reality (badges are presentation, not release proof).

```markdown
![build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![coverage](https://img.shields.io/badge/coverage-92%25-2ea44f?style=for-the-badge)
![version](https://img.shields.io/badge/version-1.0.0-7C3AED?style=for-the-badge)
![license](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
```

## Theme / style choices

- Hero: Mark `type=oss`, `theme=tokyonight`, `animation=ambient`, `height=200`
  (width defaults to 880).
- Chips: shields.io `style=for-the-badge`, sized to match Mark's pill aesthetic.
- Provider split follows the skill recipe: Mark for the banner, shields.io for
  classic CI/license/version chips.

## Probe results (2026-08-11)

- `mark.sylphx.com/api/v1/mark/hero` with the exact params above -> 200
  `image/svg+xml` (8.8 KB SVG).
- `mark.sylphx.com/api/v1/mark/pill`, `/strip`, `/deploy`, `/profile`,
  `/icons` -> 200 `image/svg+xml`; `/health` -> 200 `application/json`.
- shields.io static badges -> 200 `image/svg+xml`.
- shields.io dynamic patterns verified against a real repo (lodash: workflow,
  Codecov, npm version, license) -> 200 `image/svg+xml`.
- Unknown repo -> shields.io renders a graceful "repo not found" badge (200),
  so placeholders degrade cleanly until tokens are replaced.

## Residuals

- **Skill-doc drift found:** the skill recipes list `mark.sylphx.com/api/v1/badge`
  and `/api/v1/banner`, which now return 404. Live routes are
  `/api/v1/mark/pill` and `/api/v1/mark/hero` (+ `/strip`, `/deploy`,
  `/profile`, `/icons`). This file uses the live routes.
- **shields.io backend throttling:** after ~15 dynamic lookups, shields'
  GitHub/npm-backed badges timed out from this IP while static badges kept
  returning 200. Dynamic badges should render normally once the real
  repo/package exists.
- **Mark first-request flakiness:** occasional connection drops on first
  request from this sandbox; retries succeed. Keep `--retry` when probing.
- **Hotlink dependency:** badges/banner are remote images - if Mark or shields
  is down, README images break. Offline-only docs should vendor the SVGs
  instead.
