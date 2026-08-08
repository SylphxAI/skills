# Safety

## Never upload

- API keys, session cookies, private keys, `.env`, wallet seeds
- Customer personal data, auth logs with tokens
- Internal network diagrams with live credentials

## Scrub checklist

- `rg -n "AKIA|sk-|ghp_|xox|Bearer |BEGIN .*PRIVATE KEY" artifact`
- Strip `Authorization` headers from captured HTTP logs
- Prefer aggregated error text over full request bodies

## If secret was uploaded

1. Rotate the secret immediately.
2. Treat URL as public forever even if host says “deleted.”
3. Document incident residual; do not rely on host delete alone.
