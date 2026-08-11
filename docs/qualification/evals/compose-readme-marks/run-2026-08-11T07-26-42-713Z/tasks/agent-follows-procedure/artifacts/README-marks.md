# README marks — acme-lib

<!--
  Generated with the compose-readme-marks skill (2026-08-11).
  Regeneration: keep the query params below in source; probe each URL with
  `curl -sI <url>` and expect HTTP 200 + content-type image/svg+xml.
  Paste-ready blocks below contain only endpoints verified live on 2026-08-11.
  Anything not verified is listed under Residuals — do not claim it works.
-->

## Hero section (copy-paste)

<!--
  Hero uses a text banner (name + tagline) because the Mark banner endpoint
  could not be verified live (404 — see Residuals). Badges: alt text = what the
  image shows, title = purpose. Replace <owner> and confirm the workflow file
  name before publishing.
-->
<div align="center">

# acme-lib

> ACME (Let's Encrypt) certificate automation for Node.js — issue, renew, and
> revoke TLS certificates with a small, dependency-light API.

![npm version](https://img.shields.io/npm/v/acme-lib?style=flat-square&label=npm%20version "Purpose: latest published version on npm")
![npm downloads](https://img.shields.io/npm/dm/acme-lib?style=flat-square&label=npm%20downloads "Purpose: monthly downloads as an adoption signal")
![license](https://img.shields.io/npm/l/acme-lib?style=flat-square&label=license "Purpose: license field from the npm registry")
![node engine](https://img.shields.io/node/v/acme-lib?style=flat-square&label=node "Purpose: minimum supported Node.js version")
![TypeScript types](https://img.shields.io/npm/types/acme-lib?style=flat-square&label=types "Purpose: shipped TypeScript type declarations")
![CI status](https://github.com/<owner>/acme-lib/actions/workflows/ci.yml/badge.svg "Purpose: latest CI build status from GitHub Actions")

MIT licensed · zero runtime dependencies · works with Node.js 18+

</div>

## Badge row (standalone, copy-paste)

<!-- Same badges as the hero, for reuse in docs/CHANGELOG sections. -->
![npm version](https://img.shields.io/npm/v/acme-lib?style=flat-square&label=npm%20version "Purpose: latest published version on npm")
![npm downloads](https://img.shields.io/npm/dm/acme-lib?style=flat-square&label=npm%20downloads "Purpose: monthly downloads as an adoption signal")
![license](https://img.shields.io/npm/l/acme-lib?style=flat-square&label=license "Purpose: license field from the npm registry")
![node engine](https://img.shields.io/node/v/acme-lib?style=flat-square&label=node "Purpose: minimum supported Node.js version")
![TypeScript types](https://img.shields.io/npm/types/acme-lib?style=flat-square&label=types "Purpose: shipped TypeScript type declarations")
![CI status](https://github.com/<owner>/acme-lib/actions/workflows/ci.yml/badge.svg "Purpose: latest CI build status from GitHub Actions")

## Verification log (probed 2026-08-11)

| URL | Result | Content-type |
|---|---|---|
| `https://img.shields.io/npm/v/acme-lib` | 200 | `image/svg+xml` |
| `https://img.shields.io/npm/l/acme-lib` | 200 | `image/svg+xml` |
| `https://img.shields.io/npm/dm/acme-lib` | 200 | `image/svg+xml` |
| `https://img.shields.io/npm/types/acme-lib` | 200 | `image/svg+xml` |
| `https://img.shields.io/node/v/acme-lib` | 200 | `image/svg+xml` |
| `https://img.shields.io/github/license/algesten/acme-lib` (pattern check, real repo) | 200 | `image/svg+xml` |
| `https://img.shields.io/github/stars/algesten/acme-lib` (pattern check, real repo) | 200 | `image/svg+xml` |
| `https://github.com/publishlab/node-acme-client/actions/workflows/tests.yml/badge.svg` (pattern check, real repo) | 200 | `image/svg+xml` |
| `https://img.shields.io/github/actions/workflow/status/publishlab/node-acme-client/tests.yml` (alternative CI badge) | 200 | `image/svg+xml` |
| `https://mark.sylphx.com/health` | 200 | `application/json` |
| `https://mark.sylphx.com/api/v1/banner?type=wave&theme=tokyonight&text=acme-lib&desc=One-line%20pitch&height=200&animation=ambient&credit=0` | 404 | — |
| `https://mark.sylphx.com/api/v1/badge?label=license&message=MIT&color=blue&style=for-the-badge` | 404 | — |
| `https://mark.sylphx.com/api/v1/icons?i=rust` | 404 | — |

## Residuals (not verified live — do not claim they work)

- **acme-lib is not on npm.** `https://registry.npmjs.org/acme-lib` returns
  `{"error":"Not found"}`. The shields.io npm badge URLs above are live endpoint
  patterns (HTTP 200 SVG) but currently render "package not found" until a
  package named `acme-lib` is published. Publish, then re-probe and read the
  actual rendered value before claiming a version badge.
- **GitHub owner and workflow file are unverified.** No npm-published GitHub
  repo named `acme-lib` was found (closest: `algesten/acme-lib`, a Rust crate
  repo with zero GitHub Actions workflows). The CI badge uses `<owner>` and
  `ci.yml` placeholders; the pattern itself was verified on
  `publishlab/node-acme-client` (`tests.yml` → 200 SVG). Replace both and
  re-probe before publishing.
- **Mark banner endpoints 404 as of 2026-08-11.** `mark.sylphx.com/health` is
  up (200), but `/api/v1/banner`, `/api/v1/badge`, and `/api/v1/icons` return
  404 despite the recipe's "probed 2026-08-08" note. The hero therefore uses a
  text banner + shields badges instead of a Mark image. Intent for the future:
  `![hero](https://mark.sylphx.com/api/v1/banner?type=wave&theme=tokyonight&text=acme-lib&desc=One-line%20pitch&height=200&animation=ambient&credit=0)`.
- **GitHub stats badges inherit rate limits.** `img.shields.io/github/*`
  badges (stars, license, workflow status) call the unauthenticated GitHub API
  (≈60 req/hr/IP) via shields; they can blank out under load. Add a token or
  drop the badge if it goes blank.
- **`npm/l` badge quality depends on registry metadata.** It renders the
  `license` field from the npm registry, which can be missing or stale; the
  LICENSE file is the legal authority. The hero already states "MIT licensed"
  as real markdown per skill guidance.
- **Hotlink dependency.** All badges break if shields.io (or GitHub) is down;
  badges are presentation only, never release proof.

## Generator notes

- Style: `flat-square` chosen for a compact row (`for-the-badge` verified as an
  alternative for hero-scale chips). Colors are shields defaults; npm badges
  can take `color=cb3837` for brand red if desired.
- Conventions: alt text = what the image shows; `title` = purpose; spaces in
  query params are URL-encoded (`%20`).
- Re-probe command: `curl -sI "<url>"` → expect `200` + `image/svg+xml`.
