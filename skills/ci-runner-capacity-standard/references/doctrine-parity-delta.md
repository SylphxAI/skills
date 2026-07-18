# Doctrine → Skills cutover map: `ci-runner-capacity-standard`

**Status:** cutover complete.  
**Binding authority:** `SylphxAI/skills` `skills/ci-runner-capacity-standard/`.  
**Doctrine file:** alias only.

## Source pin

| Field | Value |
| --- | --- |
| sourceRepo | SylphxAI/doctrine |
| sourcePath | standards/ci-runner-capacity-standard.md |
| sourceRef | `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7` |
| sourceDigest | `sha256:d750e428ab872fffe22052dc66c7d76b9152fcc575069b10e3d50bca13726592` |

## Sections

| Doctrine section | Skills surface | Status |
| --- | --- | --- |
| Purpose | full-standard.md | covered |
| Control-Plane Contract | full-standard.md | covered |
| Required Signals | full-standard.md | covered |
| Default Runner Profiles | full-standard.md | covered |
| Backpressure Rules | full-standard.md | covered |
| Critical-Path Isolation | full-standard.md | covered |
| Diagnosis | full-standard.md | covered |
| Validation | full-standard.md | covered |

## Authoring

Author only under `skills/ci-runner-capacity-standard/`. No dual-publish with Doctrine.

## Conformance checklist

- [ ] Correct Standard Skill package loaded for this domain.
- [ ] Material obligations from full-standard applied or N/A with rationale.
- [ ] Evidence homes named (tests, schemas, ADRs, gates).
- [ ] No dual-authoring of this standard back into Doctrine prose.
- [ ] Live fleet/work effects deferred to Control Plane when applicable.
