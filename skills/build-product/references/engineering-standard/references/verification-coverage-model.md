# Verification coverage model

Use this method when designing, reviewing, or closing the automated proof for a
product change or maintained capability.

## Core rule

Test coverage is the set of material product claims and plausible failure
classes for which an automated semantic oracle can distinguish correct from
incorrect behavior. It is a vector, not a single percentage.

Every material behavior, invariant, contract, expected failure, and
risk-selected failure mode must have a decisive oracle or an explicit residual.
Prefer the smallest scope that can prove the claim. Do not add another test when
an existing lower-layer oracle already decides it.

## Coverage dimensions

| Dimension | Question | Typical evidence |
| --- | --- | --- |
| Contract and requirement | Which capability, acceptance rule, invariant, and expected failure is protected? | executable examples, specification tests, invariant checks |
| Structure | Which statements, decisions, conditions, and changed branches execute? | line, region, branch, condition, or risk-selected MC/DC reports |
| Oracle strength | Would the suite fail if the implementation produced a plausible wrong result? | mutation testing, negative controls, fault injection, differential oracles |
| Input space | Which values, boundaries, malformed inputs, and parameter interactions are explored? | example partitions, property tests, fuzzing, pairwise or higher-strength combinatorial tests |
| State and sequence | Which valid and invalid transitions, retries, duplicates, orderings, and histories are explored? | model-based and stateful property tests, deterministic schedules, replay |
| Boundary and topology | Which independently evolving components, protocols, stores, providers, and client versions interoperate? | schema and consumer/provider contract tests, real-dependency integration tests, compatibility matrices |
| User journey | Which critical assembled customer outcomes work through the public surface? | focused browser/API/CLI E2E and accessibility assertions |
| Failure and recovery | Which timeouts, crashes, partitions, partial effects, corruptions, and restores preserve the declared contract? | deterministic simulation, fault injection, recovery and restore proof |
| Non-functional | Which material security, privacy, latency, throughput, resource, availability, and observability properties hold? | security tests, load models, SLO checks, telemetry assertions, bounded live analysis |

The dimensions are not nine mandatory suites. Select the subset implied by the
capability and failure model. Record an omitted material dimension as a
residual; do not hide it behind an aggregate percentage.

## Derive cases from the contract

For each changed or maintained capability:

1. Bind the exact candidate, public or internal contract, authoritative state,
   and acceptance claim.
2. Enumerate material happy behavior, expected failures, invariants, and
   recovery obligations. Include only plausible failures capable of changing
   the delivery or risk treatment.
3. Partition the relevant space. Consider boundaries and malformed inputs;
   identity, authorization, tenant isolation, and privacy; invalid transitions;
   retry, duplicate, timeout, cancellation, and concurrency; compatibility and
   migration; partial effects and recovery; and material resource limits.
4. Choose the lowest semantic oracle that can falsify each claim. Reuse or
   strengthen an existing owner before adding a new harness.
5. Place fast deterministic proof on admission. Put broader mutation, fuzz,
   simulation, load, and long-running exploration in continuous or release
   lanes unless the failure risk justifies blocking every candidate.
6. Retain a minimized failure as a deterministic regression and link incidents
   to the oracle that would have caught them.

An implementation and a test generated from the same mistaken assumption are
not independent evidence. Derive expected behavior from the contract,
invariant, reference model, independent implementation, trusted fixture, or
metamorphic relation rather than restating production code.

## Select the method by failure model

| Failure model | Preferred starting point | Escalate when |
| --- | --- | --- |
| Pure deterministic logic | unit examples and properties | partitions are broad or assertions may be weak |
| Parser, decoder, protocol, file, or other untrusted input | boundary examples plus fuzzing | state or parameter interactions dominate |
| Arithmetic, permissions, ledger, queue, lock, or state machine invariants | property or reference-model tests | long histories and interleavings dominate |
| Broad configuration or parameter interaction | covering arrays / t-way combinatorial tests | ordering also changes behavior |
| Public schema or independently released consumer/provider | contract and compatibility tests | assembled deployment wiring remains material |
| Critical customer journey | focused E2E through public behavior | external dependencies or failure recovery need separate proof |
| Distributed, concurrent, time-dependent, or durable workflow | deterministic simulation and replay | a real substrate has material behavior the simulation cannot represent |
| Security or irreversible effect boundary | threat-derived negative tests and fault injection | authorized live controls or recovery must also be demonstrated |
| Scale-sensitive path | representative load and resource assertions | production uncertainty requires bounded canary analysis |

Contract tests do not prove provider deployment, E2E does not replace narrow
logic or contract tests, and a canary does not replace deterministic candidate
proof. Each method owns the failure class it can actually observe.

## Structural coverage and complexity

Structural coverage tells where execution has or has not travelled. It does not
show that the expected result was correct.

- Use line or region coverage to find code that automated tests never execute.
- Use branch coverage where a decision can select materially different
  behavior.
- Use condition coverage or MC/DC only where independent boolean-condition
  effects are material, especially safety- or mission-critical decisions.
- Inspect uncovered changed material decisions. Do not impose one repository-
  wide percentage as a substitute for that review.

Cyclomatic or cognitive complexity, change frequency, incident history,
external exposure, data sensitivity, statefulness, and recovery difficulty are
selection signals. High values justify stronger oracles and broader exploration;
low values do not excuse an untested material contract. Complexity alone never
passes or fails behavior.

## Oracle sensitivity

Coverage without sensitivity permits assertion-free execution theatre.

- Use negative controls to prove that a validator, alert, test, or recovery
  control can fail for the named defect.
- Use diff-scoped mutation testing where a surviving plausible code change
  would expose weak assertions, especially in authorization, billing,
  permissions, and other high-blast logic.
- Treat mutation score as diagnostic. Equivalent or irrelevant mutants are not
  product defects, and a universal score is not a completeness verdict.
- Use differential or metamorphic relations when an exact expected output is
  unavailable.

## Agent-native execution

- Bind tests and results to the exact candidate revision and dependency set.
- Prefer isolated, seeded, ephemeral test state. A shared UAT environment that
  changes under concurrent agents is observation, not deterministic admission
  authority.
- Use real dependencies in integration tests where an in-memory substitute can
  hide protocol, query, transaction, serialization, or lifecycle behavior.
- Parallelize independent case generation and execution when its gain exceeds
  coordination and host-resource cost; keep the contract and oracle shared.
- Shrink generated failures and retain the seed, schedule, event history,
  dependency versions, and replay command.
- Keep the critical path fast. Run large fuzz corpora, broad mutation,
  simulation, and load exploration continuously, then promote discovered
  counterexamples into the deterministic suite.
- Use live synthetic, canary, and bounded production evidence for deployment-
  or substrate-specific uncertainty only. Never turn calendar time into proof
  when replay, simulation, or a semantic oracle can decide sooner.

## Suite health

Measure the test system itself: deterministic replay, flake rate, duration,
failure-diagnosis quality, retained counterexamples, surviving material
mutants, and age of known coverage gaps. These are observations for improving
the suite, not universal numeric merge gates.

Quarantine only a proven flaky test with an owner and repair path. Do not delete,
retry-until-green, or weaken a material oracle to restore a green dashboard.

## Closure

Coverage is sufficient for the claimed delivery when:

- each selected material contract, invariant, expected failure, and failure
  class has a decisive automated oracle;
- the exact candidate passes the appropriate deterministic admission proof;
- expensive or live-only residuals have a declared lane, owner, and effect on
  the claim;
- failures can be reproduced from retained evidence where the method permits;
  and
- another test has lower expected decision value than acting, verifying, and
  recovering through the available reversible path.

Do not claim exhaustive absence of defects. Do not keep expanding the suite
merely because another logically imaginable case exists.

## Anti-patterns

- one global coverage percentage as correctness authority;
- maximizing lines, cases, snapshots, or E2E count without naming a claim;
- generating expected values by copying the implementation under test;
- mocking away the boundary or failure being claimed;
- treating a green shared UAT or health endpoint as exact-candidate proof;
- reproducing the same invariant in unit, integration, E2E, CI, and live checks
  without distinct failure ownership;
- applying mutation, MC/DC, fuzzing, simulation, or soak to every module as a
  maturity ritual;
- retaining flaky retries, arbitrary waits, or long calendar soaks instead of a
  deterministic clock, schedule, model, or replay;
- adding a new workflow only to display another green light.

## Primary references

- Google, *Software Engineering at Google — Testing Overview*:
  <https://abseil.io/resources/swe-book/html/ch11.html>
- Google Testing Blog, *Code Coverage Best Practices*:
  <https://testing.googleblog.com/2020/08/code-coverage-best-practices.html>
- Google Research, *The State of Mutation Testing at Google*:
  <https://research.google/pubs/state-of-mutation-testing-at-google/>
- LLVM, *Source-based Code Coverage*:
  <https://clang.llvm.org/docs/SourceBasedCodeCoverage.html>
- NASA, *A Practical Tutorial on Modified Condition/Decision Coverage*:
  <https://shemesh.larc.nasa.gov/fm/papers/Hayhurst-2001-tm210876-MCDC.pdf>
- NIST, *Automated Combinatorial Testing for Software*:
  <https://csrc.nist.gov/projects/automated-combinatorial-testing-for-software>
- Hypothesis, *Rule-based stateful testing*:
  <https://hypothesis.readthedocs.io/en/latest/stateful.html>
- Pact, *How Pact works*:
  <https://docs.pact.io/getting_started/how_pact_works>
- FoundationDB, *Testing and Simulation*:
  <https://apple.github.io/foundationdb/testing.html>
- Playwright, *Best Practices*:
  <https://playwright.dev/docs/best-practices>
- Rust Fuzz, *The cargo-fuzz book*:
  <https://rust-fuzz.github.io/book/cargo-fuzz.html>
- SQLite, *How SQLite Is Tested*:
  <https://sqlite.org/testing.html>
- OWASP, *Web Security Testing Guide*:
  <https://owasp.org/www-project-web-security-testing-guide/v42/>
- Jepsen, *Analyses*:
  <https://jepsen.io/analyses>
- *Principles of Chaos Engineering*:
  <https://principlesofchaos.org/>
- Testcontainers, *Introducing Testcontainers*:
  <https://testcontainers.com/guides/introducing-testcontainers/>
