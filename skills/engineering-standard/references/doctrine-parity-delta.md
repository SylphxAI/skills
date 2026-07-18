# Doctrine → Skills engineering-standard cutover map

**Status:** cutover complete for this package.  
**Binding authority:** `SylphxAI/skills` `skills/engineering-standard/`.  
**Doctrine file:** alias only after cutover.

## Source pin (migration source)

| Field | Value |
| --- | --- |
| sourceRepo | `SylphxAI/doctrine` |
| sourcePath | `standards/engineering-standard.md` |
| sourceRef | `70f1207a81c6faf30571da37f964809ae2375128` |
| sourceDigest | `sha256:99d8e8c9f795a0834a7dda06b506b1a2a7cd21cad889570323a79c9857f18f2c` |
| skills package | `skills/engineering-standard/` |
| skills authority | **binding** |
| body | `references/full-standard.md` (full prose migrated) |

## Section coverage

All Doctrine sections from the pinned source are present in
`references/full-standard.md` (verbatim migration + authority header). Rule IDs
in `binding-predicates.md` index the same obligations for reviews.

| Doctrine section | Skills surface | Status |
| --- | --- | --- |
| Modern Technical Bar | full-standard + eng-* bar | covered |
| Language and tool selection | full-standard + eng-tool-01 | covered |
| Version currency and reproducibility | full-standard + eng-repro-01 | covered |
| Static verification floor | full-standard + eng-static-01 | covered |
| No runtime-first defect discovery | full-standard + eng-proof-01 | covered |
| Architecture | full-standard + eng-layer-01 | covered |
| Implementation Shape | full-standard | covered |
| Sources Of Truth | full-standard + eng-ssot-01 | covered |
| Source-Controlled Artifact Identity | full-standard + eng-artifact-01 | covered |
| No-Human Engineering Patterns | full-standard | covered |
| Active engineering profile | full-standard + eng-tool-01 | covered |
| Frontend | full-standard | covered |
| Boundaries / contracts | full-standard + eng-contract-01 | covered |
| AI and framework adapters | full-standard | covered |
| Observability And Recovery | full-standard + eng-observe-01 / eng-timeout-01 | covered |
| Comments And Code Documentation | full-standard | covered |
| Testing | full-standard + eng-test-01 | covered |
| Naming | full-standard + eng-name-01 | covered |

## Authoring rule after cutover

- **Author only** under `skills/engineering-standard/`.
- Doctrine `standards/engineering-standard.md` is pointer/alias; do not dual-publish independent prose.
