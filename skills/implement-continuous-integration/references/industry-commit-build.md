# Industry commit build

A commit build gives fast feedback on every integration to the shared mainline. Its required checks focus on executable product behavior and current public contracts.

## Sources

- DORA, [Continuous integration](https://dora.dev/capabilities/continuous-integration/)
- DORA, [Test automation](https://dora.dev/capabilities/test-automation/)
- Martin Fowler, [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)
- Kent C. Dodds, [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

## Core practice

1. Integrate frequently into one shared mainline.
2. Run an automated build with meaningful tests on every proposed integration.
3. Restore a red build promptly so mainline remains a reliable base.
4. Keep the commit build fast enough for the team to use continuously. DORA and Fowler describe about ten minutes as a useful upper bound.
5. Make each required check actionable: red identifies a real defect and green materially increases confidence in the product.

## Select checks by feedback need

| Feedback need | Suitable checks | Placement |
| --- | --- | --- |
| Buildability | Compile, typecheck, package, link | Commit build |
| Product behavior | Unit and component tests at public or semantic boundaries | Commit build |
| Representative use | Fastest stable user or caller journey | Commit build |
| Public compatibility | API, schema, protocol, and migration compatibility | Commit build |
| Security bytes | Secret detection, license policy, dependency checks with actionable findings | Commit build |
| Environment integration | Real databases, external services, broad platform matrices | Release or deployment path |
| Extended behavior | Load, endurance, exhaustive compatibility, exploratory security | Scheduled or explicitly selected path |

Test behavior visible to users and callers. Let implementation structure evolve behind those contracts.

## Classify an existing suite

For each workflow job, script, and test:

1. Name the product defect it detects.
2. Name the owner and direct repair path for a red result.
3. Measure typical runtime and flake rate.
4. Keep fast checks that protect current behavior or compatibility.
5. Move valuable long-running checks to the delivery point that consumes their result.
6. Retire checks whose result only confirms internal wording or structure.
7. Consolidate duplicated setup and duplicated test execution.

## Pipeline shape

```text
pull request or merge group
  -> fast commit build
  -> release and environment checks selected by the delivery
  -> deployment smoke on the released artifact
```

Use stable required-context names for repository rules. Share one local entrypoint between developer feedback and CI. Cache supported toolchain inputs and keep cache misses equivalent to a clean build.

Use the runner labels the repository already declares. If they point at self-hosted or organization-owned machines, do not hide a capacity incident by moving the commit build onto GitHub-hosted runners. Workflow source is not assignment proof; a quiet queue is a runner-owner gap.

The finished pipeline makes ordinary product changes inexpensive while keeping failures specific, reproducible, and connected to product behavior.
