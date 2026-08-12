# Database cutover and migration

Universal fleet method. Do not invent a smaller method for a small repository.
Agent wall-clock is short; dual-system entropy is the expensive budget.

Compose with:

- `select-dependency-versions` → `technology-stack-profile` (Atlas pin)
- `engineering-standard` (`eng-hard-cut-*`, `eng-schema-multistep-01`,
  `eng-product-dual-ban-01`, `eng-max-scale-01`, `eng-entropy-cutover-01`)
- `source-authoring-standard` L3: schemas/migrations land with the outcome

## Taxonomy (do not conflate)

| Pattern | Meaning | Default |
| --- | --- | --- |
| **Product dual systems** | Long-lived A and B both own writers/readers/authority | **Forbidden** steady state |
| **Temporary dual-write / shadow** | Fenced cutover technique with dated retirement | Only under risk-class gates |
| **Schema multi-step inside B** | nullable → backfill → constrain; create-new → swap | **Required** when live DDL/lock risk |
| **Hard-cut terminal** | Destination sole writer; predecessor deleted | **Always** the end state |

## Default sequence (A → B)

1. Build B to sole-writer readiness (schema, code, oracles).
2. Apply **schema multi-step inside B** when live DDL/lock/data-depend risk
   exists (not a second product system).
3. Migrate/backfill all required data A→B with declared oracles (counts,
   checksums, conservation, tenant samples). Idempotent re-run must be safe.
4. If a **risk class** hits, open a **temporary** dual-write or shadow fence
   (prefer same-transaction dual-write; never log-and-continue divergence)
   with owner + expiry + contract proof.
5. Flip writers, then readers; block new predecessor writes.
6. Verify live oracles on B.
7. **Delete A** (code, routes, jobs, docs, flags, installers) in the same
   delivery unit when readiness gates pass.
8. Revert surface remains: PITR/snapshot, append-only business log, forward
   repair migration, previous healthy deployment — **not** system A.

## Risk classes (any one → special procedure)

- Conserved value / money / ledger integrity
- Multi-tenant shared mutable tables with cross-tenant blast radius
- Large-table online rewrite / exclusive lock risk
- External un-updatable clients
- Irreversible external effects

## Procedure gates (all required when a risk class hits)

1. Named live failure mode if hard-cut now without the temporary path
2. Temporary dual/expand EV lower than expected hard-cut incident EV
3. Owner + dated contract/retirement predicate
4. Sole-writer readiness oracles green
5. Recovery drill recorded (forward repair and/or PITR restore point)

**Do not** use “agents are fast” or calendar scarcity to skip these gates.
**Do not** leave undated dual-write, forever flags, or “support both.”

## Atlas apply contract

- Sole production applicator: **Atlas versioned migrations**
- Ban: ORM push to live DB; second migration runner; unpinned CLI; macOS hash
  for Linux apply; migrate-down as ordinary recovery
- CI: ephemeral full-history replay + destructive/data-depend gate + directory
  integrity; `atlas migrate lint` when the admitted edition can evaluate the
  schema source
- Pin OS/arch-matching CLI; regenerate integrity hashes only with that binary

## Sole-writer readiness checklist

- [ ] Dependency inventory complete (API, jobs, webhooks, workers, docs)
- [ ] Backfill oracles green and re-runnable
- [ ] Zero intended predecessor writers in telemetry (or fenced residual with
      dated kill criteria under risk-class gates only)
- [ ] Forward repair migration path known for partial apply failures
- [ ] PITR or snapshot restore point named before destructive contract
- [ ] Predecessor paths deleted or reduced to one-way no-write adapters with
      exact retirement predicates

## Forbidden residuals

- Permanent dual-write or dual-read product authority
- Forever feature flags for old behavior
- Undated compatibility shims
- “Support both” without a terminal
- Silent dual writers after destination is ready
- Residuals used as permission to keep A alive

A residual is **truthful incomplete status**, not a scope waiver and not a
second system.
