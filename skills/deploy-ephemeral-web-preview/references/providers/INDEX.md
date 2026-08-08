# Ephemeral / free web preview providers

Open the matching file when selecting a path. Prefer lowest auth that still meets the proof window.

| Provider class | Auth | Free class | Prefer when |
|---|---|---|---|
| Cloudflare Temporary Workers | no permanent login | L2 (~60 min) | Worker/edge demo; agent-owned deploy |
| Cloudflare Drop | no-login static path | L2 temporary | pure static zip/folder |
| Surge / free static CLIs | account or email token | L3 | longer static hosting, already have token |
| GitHub Pages / CF Pages free | account | L3 | durable docs/site from git |
| Vercel/Netlify hobby | account | L3 | framework preview pipelines |

Free class legend: L0 local · L1 public GET · L2 temporary no durable login · L3 free tier with account · L4 paid/key.
