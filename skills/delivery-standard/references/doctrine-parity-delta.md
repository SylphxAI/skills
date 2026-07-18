# Doctrine → Skills cutover map: `delivery-standard`

**Status:** cutover complete.  
**Binding authority:** `SylphxAI/skills` `skills/delivery-standard/`.  
**Doctrine file:** alias only.

## Source pin

| Field | Value |
| --- | --- |
| sourceRepo | SylphxAI/doctrine |
| sourcePath | standards/delivery-standard.md |
| sourceRef | `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7` |
| sourceDigest | `sha256:934c57e18a193516be2fdd321826ac9a45491232b89cf76e370a0ba0bf21d8e1` |

## Sections

| Doctrine section | Skills surface | Status |
| --- | --- | --- |
| Ownership | full-standard.md | covered |
| Package Publication | full-standard.md | covered |
| Release Notes | full-standard.md | covered |
| Production Verification | full-standard.md | covered |

## Authoring

Author only under `skills/delivery-standard/`. No dual-publish with Doctrine.

## Conformance checklist

- [ ] Correct Standard Skill package loaded for this domain.
- [ ] Material obligations from full-standard applied or N/A with rationale.
- [ ] Evidence homes named (tests, schemas, ADRs, gates).
- [ ] No dual-authoring of this standard back into Doctrine prose.
- [ ] Live fleet/work effects deferred to Control Plane when applicable.
