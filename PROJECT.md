# Sylphx Skills

## Purpose

Own a **small public Agent Skills catalog** and the install/sync adapters that
keep Codex, Claude Code, and Grok Build current with that catalog and a thin
always-on constitution.

## Boundary

Owns:

- task skills under `skills/<id>/`
- deterministic `catalog.json`
- install/update/status adapters and AutoSync enrollment
- thin `runtime/constitution.md`

Does not own:

- live work, org adoption state, customer data
- product-specific engineering standards (those live in product repos)
- policy encyclopedias packaged as hundreds of skills

## Delivery

Complete when the exact default-branch tree passes `npm test` and the public
package surfaces are consistent. Install-contract changes need fresh-context
proof on supported runtimes when available.

## Model

See `docs/MODEL.md` and `runtime/constitution.md`.
