---
name: engineering-standard
description: "Successor-candidate engineering standard package (not binding). Use when reviewing a Skills migration candidate for product-code predicates while Doctrine remains binding; use for parity-map gap checks only. Do not use as sole engineering authority or to supersede Doctrine before atomic cutover."
---
# Engineering Standard (successor-candidate)

This is a **Standard Skill** (`packageKind: standard`) with
**`authority: successor-candidate`**.

It is **not** binding law. It does **not** supersede Doctrine. It is a
migration candidate toward a future atomic cutover.

## Current authority (single binding)

Until cutover evidence exists:

| Layer | Authority |
| --- | --- |
| Binding engineering standard | **Doctrine** `standards/engineering-standard.md` |
| This package | Successor candidate + progressive disclosure draft |
| Catalog routing | `candidate` / `autoRouteEligible=false` / unverified |

See [references/doctrine-parity-delta.md](references/doctrine-parity-delta.md)
for source digest pin and coverage gaps.

## Method

1. For binding decisions, load **Doctrine** engineering standard first.
2. Optionally load this package as a short checklist / rule-ID aid.
3. Read [references/binding-predicates.md](references/binding-predicates.md) as
   candidate predicates only.
4. Never claim Skills-only authority or `supersedes doctrine-engineering` until
   an atomic cutover PR pair lands with consumer readback.
5. Do not mass-author further Standard Skills until dual-SSOT is closed for this pilot.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local technical ADRs.
- Does not auto-route as a stable proven procedure.
- Does not override Doctrine while PROJECT.md / fleet policy name Doctrine as
  instruction upstream.

## When not to use

- Any need for **binding** engineering law → Doctrine standard (current).
- Commercial packaging alone → commercial-decision class packages.
- Live Work Graph operations → Control Plane MCP tools.

## Output format

When using this candidate package, produce:

1. **Authority note** — Doctrine remains binding; this is candidate aid.
2. **Predicates considered** — rule IDs from binding-predicates (candidate).
3. **Parity gaps** — any Doctrine section still required (from parity map).
4. **Evidence** — tests/schemas/ADRs; never Skills-only claims of cutover.

## Guardrails

- Fail closed on secret material in source and logs.
- Never treat health/readiness probes as product capability proof.
- Prefer expand-contract migrations for shared state.
- Refuse to present this package as sole SSOT.
