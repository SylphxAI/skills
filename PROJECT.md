# Sylphx Verified Capabilities (open foundation)

Own the public **open foundation** of Sylphx Verified Capabilities: portable
capability packages with machine-readable contracts, honest version-scoped
qualification records, an outcome-receipt recording contract, and static
install/sync adapters for Codex, Claude Code, and Grok Build.

**Product North Star:** agents load one trusted method for a real job—and never
grant more trust than version-scoped evidence allows. Full text:
[docs/NORTH-STAR.md](docs/NORTH-STAR.md).

## Model

One capability = one requestable job with an externally observable outcome
contract. Host discovers via short descriptions. Depth in references. No
method-bag indirection. Every package carries `capability.json` and
`qualification.json` (`unqualified` is the honest default).

## Metrics (stage-honest)

| Stage | Active when | Metric |
| --- | --- | --- |
| **A** | Now (open foundation) | **Trustworthy Job Coverage (TJC)** — listed, discoverable, honestly qualified on current digest; zero false-qualified |
| **B** | Real outcome receipts exist | **Verified Capability Yield (VCY)** — external successes ÷ eligible attempts |

Structural CI proves consistency, not value. This repository never fabricates
outcome receipts.

## Delivery

Default branch passes `npm test`; catalog rebuilt with qualification
projection; install adapters current; no package claims qualification without
version-scoped, expiring evidence; AutoSync only from annotated release tags
with promotion manifests.
