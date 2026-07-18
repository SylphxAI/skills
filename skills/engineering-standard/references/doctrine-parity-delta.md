# Doctrine → Skills engineering-standard parity / delta

**Status:** pre-cutover coverage map for a **successor-candidate** package.  
**Not** binding authority. Doctrine remains the sole binding semantic authority
until an atomic cutover transaction lands with consumer readback.

## Source pin

| Field | Value |
| --- | --- |
| sourceRepo | `SylphxAI/doctrine` |
| sourcePath | `standards/engineering-standard.md` |
| sourceRef | `70f1207a81c6faf30571da37f964809ae2375128` (doctrine main at map authoring) |
| sourceDigest | `sha256:99d8e8c9f795a0834a7dda06b506b1a2a7cd21cad889570323a79c9857f18f2c` |
| skills package | `skills/engineering-standard/` |
| skills authority | `successor-candidate` (not binding) |

Recompute digest before cutover; drift without map refresh blocks promotion.

## Coverage legend

| Code | Meaning |
| --- | --- |
| `covered` | Skills package states the same obligation with rule ID or explicit section |
| `partial` | Skills package summarizes; Doctrine retains full procedure/detail |
| `gap` | Doctrine obligation not yet represented in Skills package |
| `skills-only` | Skills local rule (must not contradict Doctrine) |

## Section map (Doctrine headings → Skills)

| Doctrine section | Lines (approx) | Skills surface | Status | Notes |
| --- | --- | --- | --- | --- |
| Modern Technical Bar | 3–40 | `binding-predicates.md` § Modern technical bar; rule IDs eng-* | partial | Bar properties compressed; not full prose |
| Language and tool selection | 41–59 | — | gap | Profile selection deferred to fleet profile skill later |
| Version currency and reproducibility | 60–122 | — | gap | Must land before cutover or stay Doctrine-only with explicit alias |
| Static verification floor | 123–149 | eng-proof-01 adjacent | gap | No dedicated rule ID yet |
| No runtime-first defect discovery | 150–174 | eng-proof-01 | partial | Probe ≠ capability only; broader floor missing |
| Architecture | 175–191 | eng-layer-01 | partial | Layer direction only |
| Implementation Shape | 192–210 | — | gap | |
| Sources Of Truth | 211–227 | SKILL.md boundaries | partial | Points to schema/ADR homes; no full SSOT table |
| Source-Controlled Artifact Identity | 228–258 | — | gap | |
| No-Human Engineering Patterns | 259–306 | — | gap | Delivery/roleless patterns live elsewhere in Doctrine |
| Active engineering profile | 307–314 | — | gap | Profile package later |
| Frontend | 315–340 | — | gap | |
| Boundaries / Boundary contract system | 341–400 | eng-layer-01, eng-sidefx-01 | partial | Contract system detail missing |
| AI and framework adapters | 401–445 | — | gap | |
| Observability And Recovery | 446–490 | eng-observe-01, eng-timeout-01 | partial | |
| Comments And Code Documentation | 491–513 | — | gap | |
| Testing | 514–551 | eng-proof-01, decision table | partial | |
| Naming | 552–561 | — | gap | |

## Rule ID inventory (Skills-local)

| Rule ID | Doctrine mapping | Status |
| --- | --- | --- |
| eng-safety-01 | Secure-by-default / secrets floor | partial |
| eng-concur-01 | Concurrency-safe bar | partial |
| eng-sidefx-01 | Idempotent external side-effects | partial |
| eng-timeout-01 | Timeout/retry/backpressure | partial |
| eng-migrate-01 | Migration-safe / expand-contract | partial |
| eng-layer-01 | Architecture layering | partial |
| eng-observe-01 | Observability | partial |
| eng-proof-01 | Verifiable / health≠capability | partial |

## Explicit non-claims

1. This map does **not** authorize `authority: binding` or `supersedes`.
2. Coverage is **not** semantic parity; many Doctrine sections are `gap`.
3. Atomic cutover requires: gaps closed or accepted as Doctrine residual with
   single-authority consumer resolution readback; Doctrine marks superseded or
   alias-only in the **same** transaction window; Skills alone authors thereafter.

## Cutover checklist (future transaction)

- [ ] Recompute `sourceDigest` at cutover head; map refreshed.
- [ ] All material sections `covered` or explicitly residual with owner.
- [ ] Skills admission: `authority: binding`; optional `supersedes: [doctrine-engineering]`.
- [ ] Doctrine: engineering standard marked superseded/alias → Skills package id.
- [ ] Consumer resolution readback: single binding authority only.
- [ ] Stop Doctrine authoring for this standard; dual-publish forbidden.
