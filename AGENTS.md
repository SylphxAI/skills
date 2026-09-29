# Skills repository

Goal: an open catalog of Agent Skills where each recurring job has one
requestable method, installed through each host's native plugin path. The
destination and boundaries are in [docs/vision.md](docs/vision.md); the
capability table is in [docs/capabilities.md](docs/capabilities.md).

## Hard lines

- `skills/<name>/SKILL.md` is the only package contract: a second manifest
  would be a second fact to keep true.
- Packages stay passive (no always-on prompt, hook, or background process), so
  installing one never changes a host's behavior until the job is requested.
- Public packages stay organization-neutral and self-contained: they cite
  public or supplied authority, not company documents, so any user can rely on
  them.
- CI runs on Sylphx-owned runners only (`sylphx-linux-standard`); a
  GitHub-hosted label fails the build.

## Working style

- Search `skills/` for the semantic owner before adding a package; improving an
  existing skill is usually better than a new one.
- Encode opinions and gotchas a capable model would miss, not recipes of
  ordinary work. Prefer judgement heuristics that stay true; constrain only
  money, deletion, credentials, safety, or a public contract.
- Put optional depth in `references/` and say in `SKILL.md` when to open each
  file. Keep `scripts/` only where they implement real behavior, with tests.
- Details for authors are in [CONTRIBUTING.md](CONTRIBUTING.md).

## How a change is judged

The `check` workflow (`.github/workflows/check.yml`) decides done:
`tests/test_package_contract.py` (package contract and the DSH mount check),
`skills-ref validate` on every skill, an offline link check over
`skills/**/*.md`, and `compileall` plus every `test_*.py` under `skills/`.
Report local, landed, and released state as separate facts.
