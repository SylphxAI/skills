# Optimization Objective Methods

## Objective model

Represent an optimization system as:

```text
real outcome
  -> observable proxies and evaluator
  -> score / reward / gate
  -> optimizer actions
  -> changed environment and affected parties
  -> measured feedback
```

The contract is incomplete unless it states what action the score controls and
how the optimizer can influence both the world and the measurement process.

## Goodhart and gaming patterns

| Pattern | Failure | Typical probe |
| --- | --- | --- |
| Regressional | Selecting extremes amplifies noise or confounding | Re-measure extreme cases independently |
| Extremal | The proxy relationship fails outside the observed regime | Stress distribution and scale boundaries |
| Causal | Intervening on the proxy bypasses the outcome's real causes | Draw the causal graph and test interventions |
| Adversarial | An optimizer exploits evaluator or reporting weaknesses | Red-team with access comparable to the optimizer |
| Leakage | Target or future information enters features or evaluation | Time-split and source-lineage audit |
| Burden shifting | Score improves by moving cost or harm elsewhere | Countermetrics by party, subgroup, and lifecycle |
| Selective visibility | Missing, delayed, or filtered cases inflate results | Define denominator and missing-data semantics |

## Contract design

Prefer a small vector of measures when one scalar would erase important
distinctions:

- outcome measure tied to the actual user or system result;
- process or leading indicators for diagnosis;
- hard constraints for correctness, safety, privacy, integrity, or legal floors;
- countermetrics for predictable externalities;
- distribution and subgroup views that averages can hide; and
- uncertainty, freshness, and minimum sample requirements.

Do not average away a veto. A high aggregate score cannot compensate for a
declared floor violation. Avoid weights that imply precision the owner never
actually chose.

## Adversarial evaluation

Before launch, ask agents to maximize the score under the written rules without
being told the intended behavior. Test:

- evaluator prompt injection or answer-key inference;
- memorization and train/test contamination;
- reward tampering or self-authored evidence;
- threshold edge behavior and retry-until-green;
- proxy improvement with unchanged or worse real outcome;
- changed populations, workloads, languages, model families, and time periods;
- collusion or correlated optimizers; and
- invisible work, deferred failures, and costs shifted beyond the window.

Use hidden or orthogonal checks only as part of a governed evaluation design,
not as unexplained secret policy. Bind their owner, access, expiry, and update
rules.

## Change and retirement

Revalidate when the optimizer, evaluator, target population, action space,
available tools, incentive strength, data-generating process, or protected floor
changes. Monitor divergence between proxy and outcome. Retire metrics that no
longer change a decision or that create more gaming cost than information value.

## Research basis

- Manheim and Garrabrant categorize regressional, extremal, causal, and
  adversarial variants of Goodhart's law:
  <https://arxiv.org/abs/1803.04585>
- Amodei et al. describe reward hacking, negative side effects, scalable
  oversight, and distributional shift as concrete AI-safety problems:
  <https://arxiv.org/abs/1606.06565>
- DeepMind's specification-gaming examples show capable agents satisfying a
  literal objective while violating its intended outcome:
  <https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/>
- NIST AI RMF requires measures to be valid, reliable, documented, monitored,
  and interpreted with their limits and affected contexts:
  <https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf>
- Kohavi et al. describe controlled online experiments, guardrail metrics, and
  trustworthy interpretation of measured effects:
  <https://doi.org/10.1145/1864708.1864741>
