# Project Manifest Standard

## Purpose

An agent entering a repository must be able to resolve its purpose, lifecycle,
ownership, public surfaces, dependencies, delivery boundary, and known adoption
gaps without guessing. The repository owns these facts; Skills owns their
shared meaning; Sylphx Enact may ingest and project them as live adoption state.

## Canonical local surfaces

```text
PROJECT.md                 concise orientation for agents and owners
project.manifest.json      machine-readable fact authority
AGENTS.md / CLAUDE.md      compact runtime constitution plus local operations
```

`PROJECT.md` is a readable projection. The JSON manifest is the repo-local fact
authority. Runtime constitutions link to both and do not copy detailed Skills
standards. Do not create competing identity files or maintain a legacy manifest
alongside it. The canonical schema is
[project-manifest.schema.json](project-manifest.schema.json).

## Required manifest facts

The machine manifest records, using controlled vocabulary where available:

- **identity** — repository id, summary, lifecycle, product layer, and links;
- **intent** — goals and explicit non-goals;
- **boundaries** — owned and unowned capabilities/bounded contexts, public
  surfaces, allowed dependencies, and forbidden coupling;
- **architecture** — canonical generation/profile references and typed adoption
  gaps without copying standard prose; when a profile needs component-level
  facts, a map of unique component ids to roles, implementations, backend-owner
  references, and owned effects;
- **documentation** — homes for ADRs, specs, catalogs, generated references,
  and runbooks;
- **delivery** — candidate/CI model, verification command/status, terminal
  delivery boundary, recovery class, deploy facts, and typed package-release
  strategy/artifact/registry facts when the repository publishes packages;
- **commercial facts** — only when pricing, packaging, entitlement, or public
  product commitments exist;
- **adoption truth** — machine-derived status or typed gaps. Never author
  `complete` to override missing evidence.

Profiles and portfolio selectors are referenced by stable identity and digest; the
manifest does not copy their content. Current resolved organization-wide adoption state belongs in
Sylphx Enact, not in hand-maintained repository prose.

`architecture.components` records intended repository topology, not deployment
claims. Its role, implementation, and effect values use generic ids so Profiles
can define their meaning without the manifest schema copying policy vocabulary.
`architecture.profileBindings` binds each applicable Profile id to its exact
revision and content digest; it does not copy Profile policy. Live presence,
revision, health, traffic, and production ownership remain Sylphx Enact
observations. A selected Profile fails missing, stale, or unknown component
facts closed rather than inferring them from filenames.

Committed `PROJECT.md` and manifest content is repo-audience-safe static intent
and configuration. Protected observed runtime topology, migration/cutover
detail, control knobs, raw diagnostics, customer data, and live process state
stay in Sylphx Enact or another authorized evidence store and are referenced by
an opaque locator when the static manifest needs a durable relationship.

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
its local facts, code, ADRs, and delivery truth. Sylphx Enact ingests those
facts, evaluates portfolio selectors, and owns current work/adoption state; it must
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
and run the repository's declared conformance entrypoint. Selected-repository adoption is
confirmed through Sylphx Enact readback; a local manifest alone is not
organization-wide proof.

### Manifest readiness checklist

- [ ] Purpose, goals, non-goals, lifecycle, and ownership are unambiguous.
- [ ] Every public surface and cross-repository dependency has a named owner.
- [ ] Architecture/profile references identify current authority without
      copying its prose.
- [ ] Profiles that depend on component roles or effects have an exact
      `architecture.profileBindings` entry and complete
      `architecture.components` facts; live deployment state is not authored
      into the manifest.
- [ ] Verification commands and terminal delivery boundary are executable.
- [ ] Adoption and architecture gaps are typed, owned, and falsifiable.
- [ ] `PROJECT.md` projects the manifest instead of becoming a second fact
      authority.
