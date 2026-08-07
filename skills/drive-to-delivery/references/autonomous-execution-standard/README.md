# autonomous-execution-standard

> Constraint depth owned by `drive-to-delivery` (not a listing skill). Other workflows open this path when their body says so.

# Autonomous Execution Standard

Policy constraints—compose onto matching host jobs.

Full progressive-disclosure body: [references/full-standard.md](references/full-standard.md).

## Method

1. Load this package when the task domain matches this standard.
2. Read [references/full-standard.md](references/full-standard.md) for binding method and predicates.
3. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
4. Prefer schema/test/ADR homes over copying this body into product repositories.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local ADRs where those own decisions.
- Not a listing skill; host discovery must not treat this folder as a top-level job.

## Guardrails

- Use Quality North Star (`q-*`) as the sole quality vocabulary when composing with engineering work.
- Do not reintroduce listing paths under `skills/autonomous-execution-standard/`.
