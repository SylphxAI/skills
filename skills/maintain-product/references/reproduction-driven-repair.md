# Reproduction-driven repair

Use this method for an observed defect or regression whose durable repair depends on finding and correcting the owning cause. Active production harm can receive immediate reversible mitigation while diagnosis continues.

## Repair loop

1. **Bind the observation.** Record the user-visible symptom, expected contract, exact baseline revision or artifact, relevant input, environment, and lifecycle layer.
2. **Choose the closest capable reproducer.** Reuse an existing compiler, typecheck, unit test, contract test, integration test, property test, replay, simulation, security check, performance check, or end-to-end path.
3. **Run the baseline.** Confirm the unchanged baseline produces the expected failure for the observed reason.
4. **Discriminate causes when needed.** Use a known-good comparison, reduced input, counterfactual, ablation, trace, or fault injection to separate credible explanations.
5. **Repair the owner.** Change the narrowest semantic owner that restores the contract and keeps one implementation path.
6. **Run the candidate.** Apply the same reproducer to the exact candidate and confirm the expected behavior.
7. **Cover affected behavior.** Run relevant boundary, error, recovery, concurrency, security, and integration cases selected by the changed dependency graph.
8. **Clean the path.** Remove temporary instrumentation, exploratory edits, superseded containment, and obsolete compatibility code, then rerun the changed-path checks.
9. **State the result.** Distinguish local repair, landed source, deployed artifact, live recovery, and longer-term reliability.

## Select a reproducer

| Defect shape | Useful reproducer |
| --- | --- |
| Compiler, type, schema, link, or build failure | The owning compiler or validator output |
| Deterministic product behavior | Unit, component, contract, or integration test at the lowest public semantic boundary |
| Cross-system behavior | Representative integration or end-to-end path with controlled dependencies |
| Nondeterministic or concurrent behavior | Replayable seed, virtual clock, property test, model, simulation, or fault injection |
| Performance regression | Stable workload, environment, warm-up, sample protocol, and decision boundary |
| Security defect | Authorized isolated test of the violated security property using least privilege |
| Behavior-preserving refactor | Existing behavior tests plus characterization or differential comparison where contracts are incomplete |

## Reproducer quality

A useful reproducer:

- exercises the public contract or lowest semantic boundary containing the defect;
- carries the minimum state, identity, timing, and dependency conditions needed to trigger it;
- uses synthetic or sanitized fixtures for protected data;
- keeps external mocks outside the behavior under investigation;
- records seeds, clocks, schedules, run count, workload, and decision boundary when repeatability requires them;
- fails again when the material regression is reintroduced; and
- stays small enough to run during ordinary maintenance.

When baseline reproduction remains unavailable, improve observation fidelity, reduce the input, compare known-good and known-bad revisions, or add a bounded diagnostic at the owning boundary. Keep the durable-cause conclusion open while continuing safe incident mitigation where service is affected.

## Legitimate test changes

An accepted contract change can update expected output, fixtures, or thresholds. Run the revised test against the baseline and candidate so the result still distinguishes the intended behavior change. Keep contract decisions in their existing repository owner.

## Record

Use the repository's normal test output, change description, or incident record to retain the observed symptom, baseline, reproducer, owning-cause change, candidate result, affected checks, cleanup, and current delivery state.

For a small deterministic failure already localized by an existing compiler or exact test, that output and the candidate rerun provide the complete repair loop.

## Sources

- Kent Beck, *Test-Driven Development: By Example*
- Andreas Zeller, *Why Programs Fail*
- ISO/IEC/IEEE 29119-1, *Software and systems engineering — Software testing*
