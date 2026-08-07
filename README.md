# Sylphx Skills

Agent **workflow** skills for Codex, Claude Code, and Grok Build.

## What a skill is

A skill is a **job procedure** users request (design product, build product, review domain, …).  
Depth and engine-specific tooling live in `references/`.

Org **policy packs** are not listing skills. They install under:

`skills/adopt-repo-standards/references/policies/`

so agents can open them after skill install. Repository `docs/` is for humans browsing git; it is not the agent install path.

## Install

> Install this: https://github.com/SylphxAI/skills

## Docs

- [docs/MODEL.md](docs/MODEL.md)
- [docs/CURATION-LEDGER.md](docs/CURATION-LEDGER.md)
- [docs/policies/](docs/policies/) (pointer to installable packs)

## Develop

```bash
npm test
npm run build:catalog
```

## License

MIT.
