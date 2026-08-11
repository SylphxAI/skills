# Sylphx Verified Capabilities

The open, cross-runtime qualification layer: capability packages with
machine-readable contracts, honest version-scoped qualification records, and an
outcome-receipt contract — for Codex, Claude Code, and Grok Build.

A capability is a **requestable job** with a specialized procedure and an
externally observable outcome contract. Standards, domain packs, and long
matrices live in `references/` under the capability that uses them. There is
**no hard skill-count cap**. Catalogs grow with real jobs; organize by
semantics.

Every package carries `capability.json` (contract) and `qualification.json`
(record; `unqualified` is the honest default). The catalog projects
qualification state: currently **40/57 qualified** with version-scoped,
expiring evidence (0 outcome receipts; receipts are recorded by user systems
and the Control Plane, never fabricated here) — no package claims with-skill
value without evidence. See
[docs/NORTH-STAR.md](docs/NORTH-STAR.md),
[docs/MODEL.md](docs/MODEL.md), [docs/QUALIFICATION.md](docs/QUALIFICATION.md).

## Install

> Install this: https://github.com/SylphxAI/skills

`install` is the static reconciliation operation; AutoSync is an explicit,
separate opt-in (`sylphx-skills auto-sync enable`). See
[INSTALL.md](INSTALL.md).

## Develop

```bash
npm test
npm run build:catalog
```

## Principles

Universal principles (any design: code, product, ops, business):
[docs/policies/PRINCIPLES.md](docs/policies/PRINCIPLES.md) — nine principles
(ambition-preserving Simplicity; agent-native Economy).

## License

MIT.
