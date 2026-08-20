# Multiplayer trust boundary (design)

Use when the game design considers realtime multiplayer.

## Authority

- **Authoritative server / host simulation** for competitive ranking,
  cheat-sensitive outcomes, ranked matchmaking, economy, and stranger lobbies.
- **Peer trust (P2P / lockstep without authority)** only for co-op/casual among
  consenting peers who accept that peers can lie and learn IPs via ICE-like
  paths.

## Design checklist

1. What can a malicious peer gain by lying? (score, position, inventory)
2. Who is the matchmaking population? (friends vs strangers)
3. Mesh cost O(N²)—cap intended room size; define failed-connect UX.
4. Persistence and anti-cheat needs → push to product-owned networking, not a
   sandbox P2P template.
5. State whether multiplayer is included with its authority model, represented
   by a zero-runtime extension point, or omitted for a product-fit reason.

Use an authoritative server or verifiable arbiter for competitive and monetized competitive systems.
Runtime networking is product/platform-owned—not a Grok/P2P kit default.
