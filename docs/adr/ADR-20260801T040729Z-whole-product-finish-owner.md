---
id: ADR-20260801T040729Z-whole-product-finish-owner
status: accepted
date: 2026-08-01
decision_owner: SylphxAI/skills
supersedes: []
amends:
  - ADR-20260731T191027Z-continuous-product-quality-loop
  - ADR-20260801T010819Z-simple-surface-deep-capability
scope:
  - product-finish
  - product-quality
  - experience-quality
---

# Add one whole-product finish owner

## Context

The portfolio already owns whole-product definition, one bounded interface,
promotional assets, recurring product-quality discovery, and launch admission.
It does not own the distinct recurring job of taking an already integrated but
rough product and resolving its complete customer- or player-facing experience
to a declared fidelity target.

Without that owner, an agent can truthfully finish a blueprint or functional
implementation while leaving generic copy, placeholders, inconsistent pages,
low-fidelity art, shallow gameplay feedback, arbitrary numbers, missing states,
or a polished demo surrounded by unfinished product. Asking agents merely to
“polish everything” gives neither a stable denominator nor evidence and risks
an endless aesthetic project.

The desired product model has two independent properties: a simple public
story and interaction model, and high resolution of every material exposed
detail. Detail depth means intentional semantic and experiential resolution;
it does not mean more features, decoration, prose, files, gates, or mechanisms.

## Decision

1. Add `product-finish` as the owner of one independently accepted **Product
   Finish Pass** over an exact integrated product or release candidate.
2. Distinguish `prototype`, `final-fidelity-reference`, `product-candidate`,
   and `release-finish`. Functional behavior or blueprint acceptance cannot
   silently satisfy a higher finish target.
3. Require every applicable material exposed detail to be intentional, derived
   from its authority, explicitly not applicable, or recorded as a defect.
   This covers copy, content, pages, assets, graphics, art, interaction and
   recovery states, motion and sensory feedback, gameplay, and meaningful
   numbers, plus accessibility, localization, performance, and resilience.
4. Define depth as positive-net product resolution. A detail must improve a
   selected product outcome or satisfy an applicable floor; hidden trivia,
   ornament, feature count, and documentation volume do not earn inclusion.
5. In Finish mode, inspect and change the real integrated product, establish a
   final-fidelity reference slice when needed, repeat coherent passes, and
   verify through renders, playthroughs, measurements, regressions, and the
   repository's declared delivery boundary. A report alone is not completion.
6. Keep authority boundaries: blueprints own product intent, `interface-craft`
   owns bounded interface work, domain systems own consequential facts and
   numbers, `continuous-product-quality` owns recurring discovery, and
   `launch-readiness-review` owns go/no-go admission.
7. Update the App, Game, SaaS, Interface, Continuous Quality, and Launch Skills
   only enough to make this handoff explicit. Use native Skill discovery and
   progressive disclosure; add no router, service, CI workflow, global score,
   prose scanner, or screenshot-count gate.

## Rejected directions

### Make Interface Craft own every product surface at once

Rejected because a bounded interface artifact and integrated whole-product
coherence have different acceptance denominators. Interface Craft remains a
valid implementation handoff inside a Product Finish Pass.

### Treat the blueprint or launch checklist as polish

Rejected because a design contract does not prove rendered implementation, and
launch admission integrates evidence rather than creating missing product
quality.

### Let the recurring quality loop finish the initial product later

Rejected because future discovery cannot make a known rough candidate complete.
The loop may find later regressions or opportunities after a bounded finish
pass reaches its declared target.

### Define finish as maximum detail or no imaginable improvement

Rejected because both are unfalsifiable and reward over-engineering. The
terminal is no remaining positive-net material exposed defect at the declared
target, with exact product evidence.

## Consequences

- Agents receive one simple product story and one deep but bounded resolution
  contract instead of interpreting “polish” as optional decoration.
- Whole-product denominators prevent a showcase screen, trailer scene, or
  working happy path from hiding unfinished adjacent surfaces.
- Words, art, mechanics, and numbers become first-class product decisions
  without moving their semantic authority into the finish procedure.
- Subjective quality stays reviewable through a declared direction, reference
  slice, direct evidence, and observable consequences rather than universal CI.

## Verification

- The new package owns one Product Finish Pass and uses progressive domain
  references for generic, game, and App/SaaS detail.
- Neighboring Skills state non-overlapping handoffs and completion claims.
- Native-routing fixtures distinguish whole-product finish from one bounded
  interface, greenfield design, continuous quality, and launch admission.
- Existing catalog, repository tests, package dry-run, and whitespace checks
  verify the exact candidate without a new workflow.
