---
name: implement-continuous-integration
description: "Make this repository's CI a fast commit build of product behavior. Use when writing or cutting GitHub Actions, when CI is slow, or when tests fail after a rename, heading change, or file move."
---

# Implement Continuous Integration

Turn this repository's pipeline into a **commit build**: every integration
proves the product still works. Prefer industry CI, and go **lighter** than
industry when a check does not buy a real defect signal.

## When to use

- Write, cut, or replace GitHub Actions / required checks for a repo
- CI or pre-commit is slow, flaky, or blocks landing after a rename or rewrite
- Agents keep adding tests that police slogans, file layout, or other checks

## Method

1. **Name the product.** What must keep working after a merge (CLI, package,
   API, install, user journey)? That is the suite's job.
2. **Inventory.** List every required job, script, and test file. Separate
   commit build from later stages. Open
   [references/industry-commit-build.md](references/industry-commit-build.md)
   for the keep / move / delete table.
3. **Classify each check.** Keep only if a red result is a real product
   defect and a green result raises confidence the product works. Delete
   slogan, brand, heading-list, file-existence-as-architecture, coverage-
   threshold, and meta-checks. Move slow acceptance, security, and perf
   off the commit build unless this change's risk requires them.
4. **Implement the slimmest commit build** that still fails closed on
   compile/typecheck, product-behavior tests, one fast acceptance path when
   one exists, secrets/license bytes, and public contracts. Do not add a
   test that the standard was followed.
5. **Wire two layers.** PR head = attributable feedback. Merge-group =
   admission. Main does **not** re-run the admitted suite; pack/identity
   smoke only. Open
   `../drive-to-delivery/references/ci-admission-standard/` for required
   contexts, flake policy, and gate wiring. Open
   `../drive-to-delivery/references/ci-runner-capacity-standard/` only when
   queue or runner capacity is the bottleneck.
6. **Stop** when `green` means the product works, `red` has a clear repair,
   and ordinary product edits do not require rewriting the suite.

## Progressive disclosure

- [references/industry-commit-build.md](references/industry-commit-build.md) —
  Humble/Fowler/DORA/Kent table and classification
- `../drive-to-delivery/references/ci-admission-standard/` — admission wiring
- `../drive-to-delivery/references/ci-runner-capacity-standard/` — compute
- `../build-product/references/engineering-standard/references/control-effectiveness.md`
  — when a required check claims to detect a failure class

## Output

Product under test · keep/move/delete list · commit-build entrypoint ·
pipeline layers · residuals

## Boundaries

- Does not own skill evals (`design-skill-evals`) or a single product-bug
  fix (`maintain-product`).
- Does not grant deploy or credential capabilities.
- Does not replace product-local ADRs for this repo's stack.
