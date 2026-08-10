# Sylphx Verified Capabilities (open foundation)

Own the public **open foundation** of Sylphx Verified Capabilities: portable
capability packages with machine-readable contracts, honest version-scoped
qualification records, an outcome-receipt recording contract, and static
install/sync adapters for Codex, Claude Code, and Grok Build.

## Model

One capability = one requestable job with an externally observable outcome
contract. Host discovers via short descriptions. Depth in references. No
method-bag indirection. Every package carries `capability.json` and
`qualification.json` (`unqualified` is the honest default).

## Delivery

Default branch passes `npm test`; catalog rebuilt with qualification
projection; install adapters current; no package claims qualification without
version-scoped, expiring evidence.
