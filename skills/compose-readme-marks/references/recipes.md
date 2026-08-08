# Agent recipes — README marks (no search)

Probed 2026-08-08: Mark badge and shields.io return `200` + `image/svg+xml`.

## A. Sylphx Mark (L1)

**Base:** `https://mark.sylphx.com`

| Path | Use |
|---|---|
| `/api/v1/banner` | Header/footer SVG banners |
| `/api/v1/badge` | Shields-like badges |
| `/api/v1/icons?i=rust,ts,docker` | Tech icon row |
| `/api/v1/stats/{user}` | GitHub user card (rate-limited) |
| `/api/v1/repo/{owner}/{repo}` | Repo card |
| `/api/v1/brand/{name}` | Fleet brand kit |
| `/api/v1/deploy` | “deployed on …” pill |
| `/health` | Liveness |

### Copy-paste markdown

```markdown
![header](https://mark.sylphx.com/api/v1/banner?type=wave&theme=tokyonight&text=My%20Project&desc=One-line%20pitch&height=200&animation=ambient&credit=0)
![license](https://mark.sylphx.com/api/v1/badge?label=license&message=MIT&color=blue&style=for-the-badge)
![stack](https://mark.sylphx.com/api/v1/icons?i=rust,ts,docker,kubernetes&theme=dark)
```

### Banner knobs (common)

- `type`: wave, mesh, terminal, hud, product, oss, …  
- `theme`: dark, light, tokyonight, nord, github, sylphx, …  
- `text`, `desc` (URL-encoded; Mark may use `-nl-` for newlines)  
- `height`, `animation` (none|ambient|rise|…), `credit=0|1`

### Proof

```bash
curl -sSI "https://mark.sylphx.com/api/v1/badge?label=skill&message=ok&color=7C3AED" | head
# expect: HTTP/2 200, content-type: image/svg+xml
```

## B. shields.io (L1)

```markdown
![build](https://img.shields.io/badge/build-passing-brightgreen)
![license](https://img.shields.io/badge/license-MIT-blue)
![node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)
```

```bash
curl -sSI "https://img.shields.io/badge/license-MIT-blue" | head
```

## C. Choose

| Need | Provider |
|---|---|
| Rich animated banner / brand kit | Mark |
| Classic CI/license chips | shields.io |
| Both | banner Mark + chips shields |

Do **not** treat badge uptime as release proof.
