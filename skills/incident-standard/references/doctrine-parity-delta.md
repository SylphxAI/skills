# Doctrine → Skills cutover map: `incident-standard`

**Status:** cutover complete.  
**Binding authority:** `SylphxAI/skills` `skills/incident-standard/`.  
**Doctrine file:** alias only.

## Source pin

| Field | Value |
| --- | --- |
| sourceRepo | SylphxAI/doctrine |
| sourcePath | standards/incident-standard.md |
| sourceRef | `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7` |
| sourceDigest | `sha256:da889126bcf57ec5cf8cb42013b151178804c211dabf27a2f6dadfc0fef70330` |

## Sections

| Doctrine section | Skills surface | Status |
| --- | --- | --- |
| Purpose | full-standard.md | covered |
| Scope and Trigger | full-standard.md | covered |
| Severity Classification | full-standard.md | covered |
| The No-Human Incident Loop | full-standard.md | covered |
| Postmortem Is a Machine Artifact | full-standard.md | covered |
| Blameless by Construction | full-standard.md | covered |
| Validation | full-standard.md | covered |

## Authoring

Author only under `skills/incident-standard/`. No dual-publish with Doctrine.

## Conformance checklist

- [ ] Correct Standard Skill package loaded for this domain.
- [ ] Material obligations from full-standard applied or N/A with rationale.
- [ ] Evidence homes named (tests, schemas, ADRs, gates).
- [ ] No dual-authoring of this standard back into Doctrine prose.
- [ ] Live fleet/work effects deferred to Control Plane when applicable.
