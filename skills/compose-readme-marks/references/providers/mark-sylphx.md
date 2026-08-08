# Sylphx Mark

| Field | Value |
|---|---|
| Host | `https://mark.sylphx.com` |
| Auth | none for banners/badges/icons |
| Class | L1 |
| Stack | Rust/axum, CDN-friendly SVG |

## Endpoints

- `GET /api/v1/banner`
- `GET /api/v1/badge` (and `/badge/...` style aliases may exist)
- `GET /api/v1/icons?i=a,b,c`
- `GET /api/v1/stats/{user}` / `org/{org}` / `repo/{owner}/{repo}` — GitHub-backed; optional server `GITHUB_TOKEN` improves rate limits
- `GET /api/v1/brand/{name}`
- `GET /api/v1/deploy`
- `GET /api/v1/catalog` — types/themes/icons JSON
- `GET /health`

## Proof

```bash
curl -sSI "https://mark.sylphx.com/health"
curl -sSI "https://mark.sylphx.com/api/v1/badge?label=test&message=ok&color=blue"
```

## Prefer / avoid

- Prefer multi-repo visual consistency.  
- Avoid offline-hard docs without vendoring SVG; avoid stats spam (GitHub rate limits).
