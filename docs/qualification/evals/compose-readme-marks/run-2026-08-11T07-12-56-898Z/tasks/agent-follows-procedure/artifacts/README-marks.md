# README marks — acme-lib

Generated with the `compose-readme-marks` skill. Every image below is an absolute
HTTPS URL to a public no-key endpoint (shields.io, GitHub Actions, npm, Mark).
Endpoints were probed live on 2026-08-11; anything that did not return a real
image payload is listed under [Residuals](#residuals) and must be re-probed
before you claim it works.

## Badge row (copy-paste)

<!-- Badge row for acme-lib: version/downloads/license from npm, CI + release from GitHub. Owner/repo placeholder is acme-lib/acme-lib; swap in the real values before publishing. -->

![npm version for acme-lib](https://img.shields.io/npm/v/acme-lib?label=version)
![npm monthly downloads for acme-lib](https://img.shields.io/npm/dm/acme-lib?label=downloads)
![npm license for acme-lib](https://img.shields.io/npm/l/acme-lib?label=license)
![GitHub Actions CI status for acme-lib](https://img.shields.io/github/actions/workflow/status/acme-lib/acme-lib/ci.yml?label=ci)
![GitHub release for acme-lib](https://img.shields.io/github/v/release/acme-lib/acme-lib?label=release)

## Hero section (copy-paste)

<!-- Hero banner via mark.sylphx.com (no-key, theme=github for OSS READMEs). NOTE: probed 404 on 2026-08-11 -> residual, see below. The shields identity chip underneath IS verified live. -->

![acme-lib hero banner](https://mark.sylphx.com/api/v1/banner?type=oss&theme=github&text=acme-lib&desc=A%20tiny%20open-source%20library%20for%20ACME%20automation&height=200&animation=ambient&credit=0)

<p align="center">
  <img alt="acme-lib identity chip" src="https://img.shields.io/badge/acme--lib-open%20source-7C3AED?style=for-the-badge&logo=npm&logoColor=white" />
</p>

<h1 align="center">acme-lib</h1>

<p align="center">
  A tiny open-source library for ACME automation — install it, call one function, done.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/acme-lib">npm</a> ·
  <a href="https://github.com/acme-lib/acme-lib">GitHub</a> ·
  <a href="https://github.com/acme-lib/acme-lib#readme">Docs</a> ·
  <a href="https://github.com/acme-lib/acme-lib/blob/main/LICENSE">License (MIT)</a>
</p>

```bash
npm install acme-lib
```

## Theme / style choices (recorded for regeneration)

- Badges: shields.io default flat style, visible purpose labels (`version`, `downloads`, `license`, `ci`, `release`).
- Hero identity chip: shields.io `style=for-the-badge`, brand color `7C3AED`, npm logo, white logo text.
- Hero banner: Mark (`mark.sylphx.com`), `type=oss`, `theme=github`, `animation=ambient`, `credit=0`.
- Legal text (license name) also appears as real Markdown in the hero links — badges are not the license authority.

## Verification log (2026-08-11, UTC)

| URL | HTTP | Content-Type | Payload seen |
|---|---|---|---|
| `https://img.shields.io/badge/license-MIT-blue` | 200 | `image/svg+xml` | renders |
| `https://img.shields.io/badge/acme--lib-open%20source-7C3AED?style=for-the-badge&logo=npm&logoColor=white` | 200 | `image/svg+xml` | renders |
| `https://img.shields.io/npm/v/acme-lib` | 200 | `image/svg+xml` | `npm: package not found` |
| `https://img.shields.io/npm/dm/acme-lib` | 200 | `image/svg+xml` | `downloads: package not found or too new` |
| `https://img.shields.io/npm/l/acme-lib` | 200 | `image/svg+xml` | `license: package not found` |
| `https://img.shields.io/github/actions/workflow/status/acme-lib/acme-lib/ci.yml?label=ci` | 200 | `image/svg+xml` | `ci: repo or workflow not found` |
| `https://img.shields.io/github/v/release/acme-lib/acme-lib` | 200 | `image/svg+xml` | `release: no releases or repo not found` |
| `https://mark.sylphx.com/api/v1/banner?...` | 404 | — | not served (drift: recipes probed 200 on 2026-08-08) |
| `https://mark.sylphx.com/api/v1/badge?...` | 404 | — | not served (drift) |
| `https://mark.sylphx.com/health` | 200 | `application/json` | healthy |
| `https://registry.npmjs.org/acme-lib` | 404 | `application/json` | package not published |
| `https://github.com/acme-lib/acme-lib` | 404 | `text/html` | repo not found |
| `https://www.npmjs.com/package/acme-lib` | 403 | `text/html` | web UI blocks probe bot; registry is the authority |

## Residuals

- **npm badges are not live yet.** `acme-lib` is not on the npm registry
  (`registry.npmjs.org` returns 404), so version/downloads/license badges render
  “package not found”. They become real after the first publish; re-probe then.
- **GitHub badges are not live yet.** The `acme-lib/acme-lib` repo does not
  exist, so CI/release badges render “repo or workflow not found”. Replace
  `acme-lib/acme-lib` with the real owner/repo and `ci.yml` with the real
  workflow filename (e.g. `ci.yml` vs `main.yml`), then re-probe.
- **Mark hero banner is unverified today.** `mark.sylphx.com` is healthy but the
  `/api/v1/banner` and `/api/v1/badge` endpoints return 404 on 2026-08-11
  (the skill recipes recorded 200 on 2026-08-08 — provider drift). Keep the URL
  pattern, but do not claim it renders until re-probed; the shields identity
  chip in the hero is verified and is a safe fallback.
- **Hotlink dependency.** All marks hotlink third-party hosts; if shields.io or
  Mark is down, README images break. Badges are presentation, not release
  proof.
- **Rate limits.** Shields endpoints need no key, but dynamic GitHub-backed
  badges inherit GitHub API rate limits (no token configured).
