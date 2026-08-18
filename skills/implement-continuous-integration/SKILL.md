---
name: implement-continuous-integration
description: Build or simplify a repository's continuous integration around fast product-behavior checks. Use when CI is slow, flaky, duplicated, or coupled to prose, naming, and file layout.
---

# Implement Continuous Integration

Create a fast commit build whose result answers whether the product still works after integration.

## Method

1. Name the product artifact or user behavior that each merge must preserve.
2. Inventory required jobs, workflow triggers, scripts, test suites, runtimes, caches, and branch or merge-queue rules.
3. Classify each check by the concrete defect a red result detects and the repair its owner can make.
4. Keep the fastest compiler, type, product-behavior, public-contract, security, and representative acceptance checks that protect the repository's real output.
5. Consolidate duplicate setup and duplicate test execution into one clear commit-build entrypoint.
6. Replace prose, wording, generated-copy, naming, and layout scans with tests at the behavior or public contract they intend to protect.
7. Place long performance, exhaustive compatibility, exploratory, and environment-heavy suites on the release, deployment, scheduled, or explicitly risk-triggered path that consumes their result.
8. Use standard hosted actions and supported toolchain caches. Pin third-party actions to immutable revisions when the repository requires supply-chain pinning.
9. Trigger the commit build on pull requests and merge groups when the repository uses a merge queue. Keep required context names stable in repository rules.
10. Run the workflow's local entrypoint and validate workflow syntax before landing.

## Commit-build test

A useful required check has all three properties:

- red identifies a real product, build, security, or public-compatibility defect;
- green materially raises confidence in the integrated product; and
- the owning engineer can repair the result directly in product code, contracts, dependencies, or tests.

See [Industry commit build](references/industry-commit-build.md) when classifying an existing suite or deciding where a slow check belongs.

For Sylphx repositories, the company
[proof standard](https://github.com/SylphxAI/owner/blob/main/standards/proof.md)
owns the artifact/check/live distinction and verification-economy floor. This
skill applies those constraints to the repository's commit build.

## Output

Return the protected product behavior, retained and retired checks, commit-build command, workflow triggers, measured runtime when available, and repository-rule changes.
