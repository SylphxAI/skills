# Skills repository instructions

This repository is the **public source** for the organization's static agent
instructions (MIT). Keep public marketing (README, Discussions, issue
templates, repository About) aligned with install reality and honest posture.

- Author package semantics only under `skills/<id>/`.
- Keep each `SKILL.md` frontmatter to `name` and `description`.
- Put detailed reusable knowledge in `references/` and optional deterministic
  helpers in the package's `scripts/`.
- Supported install targets: Codex, Claude Code, and Grok Build. The public
  interface is repository plus `install this development environment`;
  `INSTALL.md` is the agent contract and `runtime/` is its deterministic
  implementation mechanism. The explicit environment intent prevents a
  client-native generic Skill installer from falsely completing after folder
  copies alone.
- Install both the complete managed Skill generation and the marker-owned
  compact constitution. Preserve all unrelated user instructions and Skills.
- Do not add benchmark runs, model outputs, admission systems, live work or
  organization-wide adoption
  state, credentials, customer data, generated skill bodies, or retired copies.
- `catalog.json` is derived; rebuild it with `npm run build:catalog`.
- Run `npm test` and `npm pack --dry-run` before landing an installation or
  distribution change. Keep external clean-runtime model evidence out of Git.
- Material repository decisions receive an ADR under `docs/adr/`; product-local
  decisions remain in their owning product repository.

The single CI job protects package/install integrity. It is not a semantic
judge, trust system, or Control Plane.

## Language

- Name a package after the job or artifact an agent needs, not an internal
  metaphor, slogan, organizational identity, or implementation codename.
- State concrete requirements directly. Prefer “backend services use Rust” to
  “binding fleet language authority.”
- Use `fleet` only for a literal managed population of devices, machines,
  deployed services, or agents. Say repositories, projects, services, agents,
  or organization-wide when that is what the text means.
- Use the company name only for a product, legal/provenance owner, repository
  locator, or selector that genuinely needs it.
- Reserve `canonical`, `authority`, `binding`, and `convergence` for cases where
  their exact technical meaning matters; do not repeat them as status theatre.
