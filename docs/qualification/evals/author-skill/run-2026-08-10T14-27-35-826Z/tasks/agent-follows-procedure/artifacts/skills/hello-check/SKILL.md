---
name: hello-check
description: "Validate that a checklist JSON file passes its declared gates: parse the file, run each gate it declares, and report per-gate pass/fail with evidence. Use when asked to verify a checklist JSON file against its declared gates."
---

# Hello Check

Validate one checklist JSON file against the gates it declares. The outcome is a
report: per-gate id, result, evidence, and an overall PASS/FAIL verdict. Fail
closed — never guess a gate result.

## When to use

- Asked to validate, check, or certify that a checklist JSON file passes its declared gates
- Asked to report which gates in a checklist JSON file pass or fail

## Gate contract

The checklist JSON file declares its own gates in a top-level `gates` array.
Each gate is an object with:

- `id` — unique string
- `description` — string
- `check` — object with:
  - `path` — dot path into the file's data (for example `build.status`)
  - `op` — one of `equals` | `exists` | `contains` | `matches`
  - `expected` — the value to compare against; omitted for `exists`

```json
{
  "gates": [
    { "id": "build-pass", "description": "Build status is pass", "check": { "path": "build.status", "op": "equals", "expected": "pass" } }
  ]
}
```

## Method

1. Read the checklist file; if it cannot be read, report FAIL with the reason.
2. Parse it as JSON; on a parse error, report FAIL with the parse error and stop.
3. Load the top-level `gates`. If `gates` is missing, is not an array, or any gate violates the contract, report FAIL with the exact gate error and stop.
4. Run every gate in declaration order. Resolve `path` by walking the parsed data; a missing path FAILs the gate for every op except `exists`.
   - `equals` — resolved value strictly equals `expected`
   - `exists` — path resolves to a present value
   - `contains` — resolved array contains `expected`, or resolved string includes it
   - `matches` — resolved string matches the `expected` regular expression
5. Verdict: overall PASS if and only if every gate passed; otherwise FAIL.
6. Emit the report: one line per gate (`id`, `PASS`/`FAIL`, evidence — the resolved value or the failure reason), then the overall verdict.

## Validation

- Frontmatter `name` equals the folder id
- `capability.json` and `qualification.json` parse and satisfy their schemas
- Self-check: run the method against one checklist with all gates passing and one with a failing gate; the verdicts must be PASS and FAIL

## Output

- Path to the checklist file
- The report: per-gate result and evidence, then the overall verdict
- A failing gate is never hidden in the overall verdict

## Boundaries

- Does not edit or fix the checklist file
- Runs only gates the file declares — never invents gates
- `op` is limited to the four deterministic operators; arbitrary code in the file is never executed
