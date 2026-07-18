# Doctrine → Skills cutover map: `documentation-standard`

**Status:** cutover complete.  
**Binding authority:** `SylphxAI/skills` `skills/documentation-standard/`.  
**Doctrine file:** alias only.

## Source pin

| Field | Value |
| --- | --- |
| sourceRepo | SylphxAI/doctrine |
| sourcePath | standards/documentation-standard.md |
| sourceRef | `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7` |
| sourceDigest | `sha256:45ff48d2ec4e0dc777ae985324204d80ef379edb0d236e58cf65baf7662b9606` |

## Sections

| Doctrine section | Skills surface | Status |
| --- | --- | --- |
| One semantic authority per fact | full-standard.md | covered |
| Specification is code-first | full-standard.md | covered |
| Cross-cutting docs aggregate; they never become an authoring authority | full-standard.md | covered |
| Generate, don't hand-maintain | full-standard.md | covered |
| Freshness is a gate, not a discipline | full-standard.md | covered |
| Enforcement — this standard is mechanized, not trusted | full-standard.md | covered |
| Minimal Sufficient Documentation | full-standard.md | covered |
| Don't over-document | full-standard.md | covered |
| When to split a standard | full-standard.md | covered |

## Authoring

Author only under `skills/documentation-standard/`. No dual-publish with Doctrine.

## Conformance checklist

- [ ] Correct Standard Skill package loaded for this domain.
- [ ] Material obligations from full-standard applied or N/A with rationale.
- [ ] Evidence homes named (tests, schemas, ADRs, gates).
- [ ] No dual-authoring of this standard back into Doctrine prose.
- [ ] Live fleet/work effects deferred to Control Plane when applicable.
