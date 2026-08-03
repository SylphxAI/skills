# Skill package classes and composition (authoring guide)

This guide implements
[ADR-20260801-package-classes-and-standard-composition](../adr/ADR-20260801-package-classes-and-standard-composition.md).

It follows public Agent Skills loading semantics: on-demand `SKILL.md` packages
are specialized knowledge and workflows (progressive disclosure); always-on
floors belong in host instruction files. Sylphx public L0 is intentionally
thin (miss-class-A only); product repos may still keep short local norms in
their own `AGENTS.md` / project docs.

Companion inventory:
[skill-standard-package-reclass-inventory.md](skill-standard-package-reclass-inventory.md).

## Where to write what

| Content | Write it here | Not here |
| --- | --- | --- |
| Universal miss-class-A floors | `runtime/constitution.md` (L0) | Fat always-on essays; random `*-standard` skills as always-on law |
| Product/repo coding style, local stack pins, repo commands | Product repo `AGENTS.md` / project docs | Public Sylphx L0 unless truly universal miss-class-A |
| Reusable validity/excellence predicates used by many jobs | `policy` skill under `skills/*-standard` or profile packs | Copied into every workflow body |
| Multi-step reusable job or operating loop | `workflow` skill | L0; pure policy package pretending to be a loop |
| Assessment/design primary | `review` skill | Implementation-only procedure without assessment artifact |
| Live tool operations | `adapter` skill | Portable semantics-only packages |
| Long matrices/examples | `references/` inside the owning skill | Entry description |

## Primary class test

Ask what the **primary accepted output** is:

1. Job artifact / loop state → `workflow`
2. Assessment or design record → `review`
3. Predicates applied to another job's artifact (or standalone conformance) → `policy`
4. Live system readback/effect with tools/auth → `adapter`

If both a large procedure and a large pure-predicate set are independently
requested, split them. Do not keep a hybrid named `*-standard` for prestige.

## Workflow + standard composition pattern

When authoring a workflow:

1. State the job and primary artifact.
2. List composed policy packs (examples):
   - `delivery-standard` when claiming done/land/live;
   - `engineering-standard` / `technology-stack-profile` when implementing software;
   - `source-authoring-standard` when mutating git source;
   - `evidence-and-claims-standard` when grading claims;
   - `work-coordination-standard` when designing portable ledgers;
   - `enact-work-coordination` when live Enact tools are present;
   - `autonomous-execution` when one accepted objective must reach terminal without prompt churn;
   - `self-feeding-agent-loop` when continuous work selection OS behavior is in scope.
3. Do **not** restate those packs' full predicates; name and apply them.
4. Add **composition reliability** steps: first-step "open composed packages /
   references" for material obligations, and description co-triggers so hosts
   can select policy packs without a dependency graph.
5. Keep specialist domain methods as separate workflow/review skills loaded by
   native discovery.

### Example (product betterment)

`continuous-product-quality` (workflow) composes:

- workflows: autonomous-execution (per admitted Work), self-feeding only if
  continuous Work OS selection is required
- policy: delivery / evidence / engineering / stack when implementing
- adapters: harness goal binding (uncapped), Enact when present
- specialists: interface, performance, game, pricing, security, ...

## Tech stack standards: where?

| Scope | Home |
| --- | --- |
| Sylphx-wide default stack profile | `technology-stack-profile` policy skill |
| Engineering method floor | `engineering-standard` policy skill |
| One product overrides | that product repo always-on docs / manifest |
| One implementation task | workflow says "compose stack/engineering policy"; do not fork a new stack skill per app |

## Description templates

### Policy

```text
Binding rules for <domain>: <predicates>. Compose when doing <host jobs>.
Not a workflow for <procedure neighbour>.
```

### Workflow

```text
Do <job> producing <artifact>: <steps>. Use when <triggers>.
Not <neighbours>. Compose <policy packs> when relevant.
```

### Review

```text
Design or audit <subject> into <artifact>. Use when assessment is primary.
Not implementation/ops alone.
```

### Adapter

```text
Operate <system> with live tools/auth: <ops>. Not portable semantics-only design.
```

## Loop layer exclusions (must stay distinct)

| Package | Layer | Not |
| --- | --- | --- |
| `continuous-product-quality` | Product betterment across aspects | One bug; one finish pass; pure Work OS |
| `prototype-product` / `build-product` / `maintain-product` / `expand-product` / `product-finish` | One product-job cycle each | Other job kind; multi-agent staffing (not a Skill) |
| `pursue-product-objective` | Drive declared product objective to evidence-backed completion | One-cycle job Skills; open betterment without fixed objective |

| `autonomous-execution` | One accepted objective to delivery terminal | Continuous new-Work discovery; short Q&A |
| `self-feeding-agent-loop` | Continuous next-work selection OS | Driving one bounded objective alone |
| `work-coordination-standard` | Portable ledger semantics | Live Enact API ops |
| `enact-work-coordination` | Live Enact ops | Portable semantics-only design |

## Anti-patterns

- Naming a procedure `-standard` to make it sound always-on or higher rank
- Filing pure loops as pure policy solely to keep a suffix
- Putting multi-page excellence essays in public L0
- Copying tech stack / delivery predicates into every workflow
- Treating "automation" skill text as runtime auto-loop without Goal/scheduler/Enact
- Mega-merging unrelated reviews to reduce package count
- Inventing a meta-router because policy/workflow boundaries are unclear
- Non-portable frontmatter fields beyond `name`/`description` for class labels
- Claiming composition is host-enforced DI without description co-triggers
- Claiming industry SOTA is "always-on floors only" (that is Sylphx public L0 policy)

## PR checklist (class declaration)

When adding or materially changing a skill, state in the PR:

- primary class: `workflow` | `review` | `policy` | `adapter` (or hybrid with primary)
- primary artifact
- nearest neighbours / exclusions
- composed policy packs (if workflow/review)
- whether `-standard` is justified (policy primary only)

## Related residuals

Class labels and composition docs do **not** close host utilization. See
[skill-utilization-eval-residual.md](skill-utilization-eval-residual.md) —
install/reclass green is not behavior-oracle proof.
