---
name: hello-check
description: "Validate that a checklist JSON file passes its declared gates: parse the file, resolve each gate to its checker, run every checker, and report a fail-closed pass/fail verdict."
---

# Hello Check

## When to use

Use when asked to validate a checklist JSON file against the gates it declares — for example "check this checklist", "does this checklist pass its gates", or "run the gates on checklist.json". Use it for verifying a checklist artifact; do not use it for editing or authoring checklists.

## Checklist contract

A checklist JSON file is one object with a `gates` array. Each gate is an object:

- `id` (string, required) — unique gate identifier
- `checker` (string, required) — name of the checker that implements the gate
- `args` (object, optional) — checker-specific inputs

## Method

1. Read the checklist JSON file and parse it. If parsing fails or the top-level shape is not an object with a `gates` array of objects, the verdict is FAIL and the structural error is named.
2. For each gate, resolve `checker` to its implementation. A gate with a missing or duplicated `id`, or with an unknown `checker`, is a gate error.
3. Run every checker against the checklist file. Collect one result per gate: `passed`, `failed`, or `error`, each with a one-line reason.
4. Emit the verdict: PASS only when the file is structurally valid and every gate passed; otherwise FAIL (fail-closed). Never downgrade an unresolved or errored gate to pass.
5. Report the per-gate results, the overall verdict, and the validated file path.

## Progressive disclosure

No `references/` depth is required for this package; the method above is the complete procedure. Open `design-skill-evals` when designing falsifiable cases for this skill's qualification.

## Validation

- Frontmatter `name` equals the folder id (`hello-check`); the description states what and when.
- Every emitted result distinguishes `passed`, `failed`, and `error`; the overall verdict is fail-closed.
- Smoke: the description selects for "validate this checklist file" and abstains on "fix this checklist" and "lint arbitrary JSON".

## Output

- The validated checklist path
- Per-gate results and the overall PASS/FAIL verdict
- A verdict receipt per `outcome-receipt.schema.json` when a receipt is requested

## Boundaries

- Validates only; never edits or fixes the checklist file.
- A gate without a resolvable checker is never reported as passing.
- Not a general JSON linter and not a checker-authoring procedure.
