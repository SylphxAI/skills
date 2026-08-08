# Sylphx Mark

## Surface

- Product host: `https://mark.sylphx.com`
- Common paths: `/api/v1/banner`, `/api/v1/badge`, `/api/v1/icons`, `/api/v1/stats/{user}`, `/api/v1/repo/{owner}/{repo}`, `/api/v1/brand/{name}`, `/api/v1/deploy`, `/health`

## Auth

- No key for basic embeds.
- Optional `GITHUB_TOKEN` on the **server** side improves GitHub stats rate limits—not required for static banners/badges.

## Examples

```markdown
![header](https://mark.sylphx.com/api/v1/banner?type=wave&theme=tokyonight&text=Ship&desc=Docs%20header&height=200)
![license](https://mark.sylphx.com/api/v1/badge?label=license&message=MIT&color=blue)
![stack](https://mark.sylphx.com/api/v1/icons?i=rust,ts,docker&theme=dark)
```

## Proof

```bash
curl -sI "https://mark.sylphx.com/api/v1/badge?label=test&message=ok&color=blue"
# expect 200 image/svg+xml
```

## Prefer / avoid

- Prefer for multi-repo brand consistency and animated SVG banners.
- Avoid treating Mark uptime as a release gate; cache or vendor SVG if docs must be offline-hard.
