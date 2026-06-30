# Sylphx Skills

Public, curated, eval-backed Agent Skills for product, design, growth,
pricing, payments, operations, and skill-marketplace workflows.

## Lifecycle

- State: `production`
- Layer: `tooling`
- Machine manifest: [`.doctrine/project.json`](./.doctrine/project.json)

## Goals

- Publish high-signal public `SKILL.md` packages that improve agent behavior on recurring product and business workflows.
- Keep a public install surface compatible with the open skills CLI and skills-compatible agents.
- Maintain a generated registry, catalog metadata, validation scripts, and eval fixtures for every published skill.
- Grow public skill packs without leaking private Sylphx doctrine, customer data, credentials, or internal operations.

## Non-Goals

- Own private Sylphx engineering doctrine, delivery policy, ADR governance, CI rules, or internal operating standards.
- Publish customer-specific, proprietary, confidential, or credential-dependent instructions.
- Provide runtime tools, MCP servers, APIs, hosted marketplace infrastructure, or package publication from this repository.

## Boundary

This repository owns the public Agent Skills marketplace seed: skill folders,
references, lightweight evals, generated registry/catalog metadata, and public
contribution guidance. It does not own private Sylphx engineering doctrine or
internal repo governance. Internal Sylphx agents may install private Doctrine
skills alongside these public skills; when private Doctrine and public skills
conflict, private Doctrine governs internal work and public skills provide
advisory domain craft.

## Public Surfaces

- `skills/<skill-name>/SKILL.md` — installable public Agent Skills.
- `skills/<skill-name>/references/` — progressively disclosed public domain references.
- `skills/<skill-name>/scripts/` — deterministic helper scripts when present.
- `registry/skills.json` — generated machine-readable public skill registry.
- `skills.sh.json` — public marketplace grouping metadata.
- `evals/*.eval.yaml` — lightweight behavior eval fixtures.
- `README.md`, `CONTRIBUTING.md`, and `docs/` — public usage, contribution, quality, and roadmap guidance.

## Delivery

This repository is non-deployable today. Production delivery is merge to
`main` after validation, followed by default-branch readback that confirms the
public skill folders, generated registry, catalog, and eval/reference checks are
current. Future static marketplace or API work must declare a deployment path
before `deployable` becomes true.

Validation:

```bash
npm run check
npx skills add SylphxAI/skills --list
```

## Commercial Direction

Public skills are MIT-licensed and used for distribution, trust, and demand
generation. Commercial private registries, custom skill creation, scoring
services, or hosted marketplace products must be decided outside this public
repo before any billing or paid entitlement surface is introduced here.
