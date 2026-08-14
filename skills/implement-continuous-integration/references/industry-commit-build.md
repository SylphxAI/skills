# Industry commit build

This is engineering consensus, not a house flavor. Read the cited pages when
a classification is disputed. Prefer **lighter** than this table when a check
does not buy a real defect signal.

Sources (retrieved 2026-08-13):

- DORA, [Continuous integration](https://dora.dev/capabilities/continuous-integration/)
- DORA, [Test automation](https://dora.dev/capabilities/test-automation/) (updated 2025-07-17)
- Martin Fowler, [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) (2024)
- Kent C. Dodds, [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

## Humble's three rules (Fowler)

1. Everyone integrates to the **same mainline** at least daily.
2. Every integration is verified by an **automated build including meaningful tests**.
3. A red build is **fixed before new feature work**.

Self-testing: if the tests are green, be confident the product has no
serious bug. **99.9% green is still red.** The reverse is also disqualifying:
green while the product does not work is not CI.

DORA measures test value by whether a failure is a **real defect**. If most
reds are "you renamed a heading / brand / helper", the suite is not CI.

DORA's commit-build upper bound is about **ten minutes**. Longer suites move
to a later pipeline stage.

## What the commit build runs

Every commit / PR / merge-group admission:

| Run | Do not run (or put later) |
| --- | --- |
| Compile / typecheck | Whole-repo slogan / brand scans |
| Unit / pure-logic tests of **product behavior** | "This ADR / North Star must contain this sentence" |
| The fastest acceptance layer (one real user journey when one exists) | "File exists, therefore architecture is correct" |
| Secret / license bytes (the bytes are the risk) | Tests that another check is spelled in a workflow |
| Schema / proto / migration compatibility (the contract is the product) | Coverage thresholds as a quality score |

## Deployment pipeline (Humble / Farley; DORA uses the same picture)

```text
commit build (<10 min, every integration)
  → slower acceptance / real DB / contracts
    → security, performance, exploratory (scheduled or by risk)
      → then deploy
```

Main post-land is identity / pack / deploy smoke. It is **not** a third copy
of the admitted suite ([ADR-20260803](../../../docs/history/adr/ADR-20260803-agent-native-queued-trunk.md)).

## Classify each existing check

For every required job, script, and test file, pick one:

| Class | When | Action |
| --- | --- | --- |
| Keep in commit build | Red = product defect; green raises release confidence | One owner; delete duplicates |
| Move later | Valid, but too slow or rare for every commit | Post-merge, scheduled, or risk-triggered |
| Delete | Slogan, layout, coverage floor, meta-check, retired fence | Remove from required contexts and from `npm test` / equivalent |

Kent's test: users of the code (end user + caller) must be able to see the
failure. State names, file trees, and heading lists are implementation
details. They create false negatives on refactors and false positives when
the product is broken but the spelling still matches.

## Agent-native extra failure (same industry rule)

Generating tests is cheap. A test that exists only so the agent can land
creates work: change product → change the theater test → then commit. That
is DORA's "poorly coded failure", not a defect. Do not add it.

Do **not** add a merge-blocking test that this document or
`ci-admission-standard` still contains a sentence. Review the standard;
test the product.
