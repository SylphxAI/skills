# Account / semi-free static hosts

## Surge.sh (class)

- **Auth**: free account / token (not no-login).
- **Use**: `surge ./dist your-subdomain.surge.sh` style publish.
- **Boundary**: free static; paid features (password, custom SSL options, etc.) vary—check current plan matrix.
- **Proof**: public HTTPS URL returns content; note account identity used.

## GitHub Pages / Cloudflare Pages free

- **Auth**: GitHub/CF account.
- **Use**: durable docs and marketing static sites from git.
- **Boundary**: build minutes, bandwidth, and fair-use limits.
- **Proof**: Pages URL + commit SHA identity of what was published.

## Tiiny / paste-style static hosts

- **Auth**: often none or email for longer life.
- **Boundary**: small size and short TTL common; hobby reliability.
- **Proof**: live URL within size limits; state TTL.

## Prefer / avoid

- Prefer when temporary CF window is too short and credentials already exist.
- Avoid for secret-bearing builds; treat free static as public.
