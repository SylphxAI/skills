# Sylphx Verified Capabilities

**Product North Star:** agents load one trusted method for a real job—and never
grant more trust than version-scoped evidence allows.

This repository is the **open foundation**: Agent Skill packages
(`SKILL.md`), optional version-scoped qualification records, and
install/sync for Codex, Claude Code, and Grok Build. It is not a marketplace,
agent runtime, or Control Plane.

A capability is a **requestable job** with a specialized procedure. Standards,
domain packs, and long matrices live in `references/` under the capability
that uses them. There is **no hard skill-count cap**. Catalogs grow with real
jobs; organize by semantics.

Do not add `capability.json`. `qualification.json` is optional (missing =
unqualified). A value claim uses same-prompt paired evaluation; qualification
is not a use gate.

See [docs/NORTH-STAR.md](docs/NORTH-STAR.md) (full product North Star),
[docs/MODEL.md](docs/MODEL.md), [docs/QUALIFICATION.md](docs/QUALIFICATION.md).

## Install

> Install this: https://github.com/SylphxAI/skills

`install` is the static reconciliation operation; AutoSync is an explicit,
separate opt-in (`sylphx-skills auto-sync enable`). See
[INSTALL.md](INSTALL.md). AutoSync applies only annotated `skills-v*` release
tags ([docs/PROMOTION.md](docs/PROMOTION.md)).

## Develop

```bash
npm test
npm run build:catalog
```

## Principles and quality vocabulary

- Universal principles (any design): [docs/policies/PRINCIPLES.md](docs/policies/PRINCIPLES.md)
- Engineering Quality North Star (`q-*`): under
  `skills/build-product/references/engineering-standard/` — authoring quality,
  **not** product metrics or qualification evidence

## License

MIT.
