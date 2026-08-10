---
name: hello-check
description: Validate that a checklist JSON file passes its declared gates. Use when a checklist file (checklist.json or similar) must be checked against its declared gates, when a pass/fail verdict over declared gates is required, or when a checklist should be produced in the gate format this skill defines.
---

# Hello Check

## What this does

Reads a checklist JSON file, verifies it conforms to the declared schema, and
returns a `PASS` or `FAIL` verdict: `PASS` only when every declared gate has
status `pass`. Never guess gate statuses — validate only what the file declares.

## Quick start

```bash
python3 scripts/validate_checklist.py <checklist.json>
```

- Exit `0` = PASS, `1` = FAIL, `2` = usage/unreadable file.
- Add `--quiet` to print only the verdict line.

## Workflow

1. Locate the checklist JSON file (ask the user if the path is unclear).
2. Run `scripts/validate_checklist.py <checklist.json>`.
3. Report the verdict plainly: PASS, or FAIL with the non-passing gate ids and
   structural errors.
4. If structural errors appear, consult `references/checklist-schema.md` to
   explain the required shape and how to fix the file.

## Checklist format

The required shape, status vocabulary, and exit codes are defined in
`references/checklist-schema.md`. Key rules:

- Top-level object with a required non-empty `gates` array.
- Each gate needs a unique non-empty `id` and a `status` from
  `pass | fail | blocked | pending | skipped`.
- Only `pass` satisfies a gate; `fail`, `blocked`, `pending`, and `skipped`
  all produce a FAIL verdict.

## Examples

- `examples/checklist.pass.json` — all gates pass; expect exit `0`.
- `examples/checklist.fail.json` — one gate pending; expect exit `1`.
