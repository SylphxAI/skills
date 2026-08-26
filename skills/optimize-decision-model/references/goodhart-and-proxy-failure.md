# Goodhart and Proxy Failure

```text
real outcome -> observable proxy -> score -> optimizer actions
  -> changed environment -> measured feedback
```

The contract is incomplete unless it states how the optimizer can influence
both the world and the measurement.

| Pattern | Failure |
| --- | --- |
| Regressional | Selecting extremes amplifies noise |
| Extremal | The proxy relationship fails outside the observed regime |
| Causal | Intervening on the proxy bypasses the outcome's causes |
| Adversarial | The optimizer exploits the evaluator |
| Leakage | Target or future information enters the score |
| Burden shifting | The score improves by moving harm elsewhere |
| Selective visibility | Missing cases inflate results |

Prefer a small vector: outcome, diagnostic, hard floors, countermetrics, and
subgroup views. Preserve every veto as a floor. Before launch, try to maximize
the written score without being told the intended behavior.

## Sources

- Manheim and Garrabrant, Categorizing Variants of Goodhart's Law:
  <https://arxiv.org/abs/1803.04585>
- Amodei et al., Concrete Problems in AI Safety:
  <https://arxiv.org/abs/1606.06565>
