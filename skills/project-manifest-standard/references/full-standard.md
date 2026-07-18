# Project Manifest Standard

**Authority:** binding Standard Skill package `project-manifest-standard` in
`SylphxAI/skills`. Historical predecessor text is lineage only.

## Purpose

An agent entering a repository must be able to resolve its purpose, lifecycle,
ownership, public surfaces, dependencies, delivery boundary, and known adoption
gaps without guessing. The repository owns these facts; Skills owns their
shared meaning; Control Plane may ingest and project them as live fleet state.

## Canonical local surfaces

```text
PROJECT.md                 concise orientation for agents and owners
.doctrine/project.json     machine-readable manifest (legacy-compatible path)
AGENTS.md / CLAUDE.md      compact runtime constitution plus local operations
```

The `.doctrine/` directory name is retained only as a compatibility filename in
the current fleet. It does not make the archived Doctrine repository an
authority. A future filename change must be a single-generation migration, not
a permanent second manifest path.

`PROJECT.md` is a readable projection. The JSON manifest is the repo-local fact
authority. Runtime constitutions link to both and do not copy detailed Skills
standards. Do not create competing identity files.

## Required manifest facts

The machine manifest records, using controlled vocabulary where available:

- **identity** — repository id, summary, lifecycle, product layer, and links;
- **intent** — goals and explicit non-goals;
- **boundaries** — owned and unowned capabilities/bounded contexts, public
  surfaces, allowed dependencies, and forbidden coupling;
- **architecture** — canonical generation/profile references and typed adoption
  gaps without copying standard prose;
- **documentation** — homes for ADRs, specs, catalogs, generated references,
  and runbooks;
- **delivery** — candidate model, verification command/status, terminal
  delivery boundary, recovery class, and deploy/release facts where applicable;
- **commercial facts** — only when pricing, packaging, entitlement, or public
  product commitments exist;
- **adoption truth** — machine-derived status or typed gaps. Never author
  `complete` to override missing evidence.

Profiles and fleet selectors are referenced by stable identity and digest; the
manifest does not copy their content. Current resolved fleet state belongs in
Control Plane, not in hand-maintained repository prose.

## Lifecycle contract

| State | Required behavior |
| --- | --- |
| `incubating` | Goals, non-goals, and boundaries exist; unavailable delivery facts say why. |
| `active` | Verification and delivery obligations apply; public surfaces are named. |
| `production` | Behavior changes carry release/deploy proof or a truthful non-deployable classification. |
| `commercial` | Product boundaries are tenant-neutral, supportable, and understandable without internal assumptions. |
| `maintenance` | New scope requires an explicit lifecycle or objective decision. |
| `deprecated` | Work is limited to migration, security, preservation, and sunset; replacement is linked. |
| `archived` | Normal product work stops. |

## Boundary rules

- A repository owns only the capabilities and bounded contexts it declares.
- Cross-repository use goes through published API, SDK, event, CLI, package,
  schema, or deployment/status contracts—not another repo's internals.
- Product-specific behavior stays in the owning product or adapter; shared
  engines remain neutral within their declared audience.
- Conflicting ownership is repaired in the relevant manifests and contracts
  before cross-boundary implementation proceeds.

## Authority split

Skills owns the manifest vocabulary and static predicates. Each repository owns
its local facts, code, ADRs, and delivery truth. Control Plane ingests those
facts, evaluates fleet selectors, and owns current work/adoption state; it must
not invent missing project intent. GitHub/GitLab metadata is an adapter
projection, not a second manifest authority.

## PROJECT.md content

Keep it short and link-heavy:

- purpose, lifecycle, goals, and non-goals;
- owned capabilities and boundary summary;
- public surfaces and dependencies;
- verification and delivery summary;
- links to the machine manifest, ADRs, specs, catalog, and runbooks.

Do not restate static standards already owned by Skills.

## Validation

Validate the manifest against the active schema, check projection freshness,
and run the repository's declared conformance entrypoint. Fleet adoption is
confirmed through Control Plane readback; a local manifest alone is not
fleet-wide proof.
