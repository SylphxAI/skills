# Decision method: rationale and sources

## 1. The Scientific Decision Method (Causal Inference, Bayesian Updating, Competing Hypotheses & Bottleneck Calculus)

Reason forward from the governing variables, base rates, and binding constraints to the conclusion ($f(\text{Inputs}) \to \text{Conclusion}$), never backward from a wished-for, flattering, or agreeable conclusion:

1. **Model the Objective Function & Causal Graph (`Structural Causal Models` — Pearl 2009; `Theory of Constraints` — Goldratt 1984; `Reinertsen 2009`)**:
   - State the objective function to maximize (such as expected cohort net contribution margin or verified throughput per unit cost) and the structural causal equation governing it (for example, $\text{Verified Throughput} = \min(\text{Demand}, \text{Capacity} \times \text{Active Duty Cycle}) \times \text{Completion Rate} \times \text{Verification Pass Rate}$, where the first two are tasks per hour and the last two are fractions). Keep units consistent; a serial-bottleneck model is one approximation, not every dispatch topology.
   - State the proposed causal mechanism, observations and assumptions. Run a safe disconfirming or intervention check when its result could change the action; otherwise label the explanation a hypothesis and state the uncertainty.
2. **Enumerate Competing Hypotheses & Priors (`Strong Inference` — Platt 1964; `ACH` — Heuer 1999; `Bayesian Decision Theory` — Jaynes 2003)**:
   - For a causal question, compare plausible hypotheses, including the baseline and an unknown alternative where useful. Allow interacting causes; use the hypothesis structure that fits the question.
   - Treat factual claims from a hunch, peer or requester as candidates to test. An explicit instruction can change the goal or constraints; distinguish that authority from evidence for a causal claim.
3. **Run High-EVOI Diagnostic Measurements (`Expected Value of Information` — Howard 1966; `Crucial Experiment` — Popper 1959; `Sequential Testing / Thompson Sampling` — Johari et al. 2017, Russo et al. 2018)**:
   - Choose the cheapest authoritative measurement that could change the action. Use the full population when authoritatively queryable; otherwise state the sample, time window and uncertainty. A likelihood ratio $P(E \mid H_1)/P(E \mid H_0)$ describes diagnosticity, while the value of information depends on whether the evidence changes a useful decision. Use sequential inference or adaptive allocation when their assumptions and objective fit.
   - **A conclusion moves on evidence, a broken model, or a changed goal**: new diagnostic evidence updates the model's parameters; a logical counterexample, wrong unit, omitted alternative or invalid causal link shows the model itself is wrong and replaces it; a changed objective changes the utility. A challenge that brings none of these leaves the conclusion unchanged; repeating a preference is not evidence. When the measured inputs confirm the original or a third hypothesis, keep the derived conclusion and show the numbers.
4. **Act on the Binding Constraint (`Goldratt 1984`; `Kingman 1961`)**:
   - Intervene on the variable that bounds the equation. In a steady serial flow, capacity added at a non-bottleneck step adds no throughput; bursty demand, routing skew or coupled resources are exceptions to check. Low output at low utilization means either a stall or synchronous wait to fix at its source, or simply too little demand: tell which before acting.

---

## 4. Applying the Challenge by Scenario

### Scenario 1 — Designing or Comparing Architectures / Technical Specs
- Check `references/architecture.md` and `references/stack.md`.
- Check vertical slices with a pure core and imperative shell, the supported event/reconciliation path, durable ownership of accepted incomplete work, and `Test B / C / D` above. Use the reference for provider polling and recovery details.

### Scenario 2 — Evaluating a Commercial Contract, Budget, Vendor, or Growth Plan
- Check `references/commercial.md`, `references/growth.md`, and `references/risk.md`.
- Estimate the relevant unit economics and use [risk.md](risk.md) to rank material downside. A 5×5 score is an ordinal priority aid; use expected-loss estimates when they can change the decision. Execution authorization belongs to [deliver-and-verify](../../deliver-and-verify/SKILL.md).

### Scenario 3: Analysis and root-cause claims

Use one evidence contract for an analysis:

- State the question, intended outcome and boundary.
- Identify the sources, their revision or version, and when they were read.
- Separate observations from hypotheses and recommendations.
- State what would disprove a causal hypothesis, run the useful available check,
  and report its result.
- Name material evidence gaps and how they affect the conclusion.
- Recommend an action within the existing authority, with its decisive trade-off.

Include the elements relevant to the decision and use the format the audience
needs. A short answer may carry the evidence in one paragraph; a larger review
may use sections or a table. Until the event and governing code or configuration
are read, keep a causal explanation a hypothesis. Correct affected decisions
when evidence disproves it.

For a blocked live task, use [unblock](../../unblock/SKILL.md); use
[swarm-fuse](../../swarm-fuse/SKILL.md) when independent views can supply new evidence.

---

## Method sources

| Method | Formula / Rule | Source | Replace when |
| --- | --- | --- | --- |
| Structural causal models and counterfactual intervention | State the causal mechanism, evidence and assumptions; test a useful safe intervention or falsifier where available. Keep an untested explanation a hypothesis. | Judea Pearl, *Causality* (2009); [author's causal-inference overview](https://ftp.cs.ucla.edu/pub/stat_ser/r350.pdf) | A counterexample, invalid assumption or better predictive model changes the mechanism. |
| Bayesian decision theory and expected value of information | Use Bayes' rule $P(H \mid E) \propto P(E \mid H)P(H)$ to update beliefs. Choose evidence by the decision value it can change relative to its cost. | E. T. Jaynes, *Probability Theory* (2003); Ronald A. Howard, *Information Value Theory* (1966) | A validated alternative improves decisions after measurement cost on the relevant tasks. |
| Strong inference & Analysis of Competing Hypotheses (ACH) | Formulate the plausible competing hypotheses $\{H_0, H_1, H_2\}$ (plus an unknown bucket where useful) and evaluate primary evidence across all hypotheses simultaneously to eliminate contradicted explanations before concluding. | John R. Platt, *Strong Inference*, Science 146(3642), 1964; Karl Popper (1959); Richards J. Heuer Jr., *Psychology of Intelligence Analysis* (1999), ch. 8 | A better-calibrated multi-hypothesis protocol reduces false-positive and flip-flop error rates. |
| Sequential inference and Thompson sampling | Use always-valid sequential inference for stopping-sensitive hypothesis tests; use Thompson sampling for adaptive allocation when its reward and exploration objective fit. State assumptions and judge the two methods separately. | [Johari et al., Always Valid Inference](https://arxiv.org/abs/1512.04922); [Russo et al., A Tutorial on Thompson Sampling](https://arxiv.org/abs/1707.02038) | Another method improves the relevant error, reward or sample-cost objective under the same workload. |
| Theory of Constraints (TOC) & queueing physics | In a steady serial flow, throughput equals the rate of its binding constraint ($\min(r_1, \dots, r_n)$) and non-bottleneck capacity adds none; burstiness, routing skew and coupled resources are the exceptions, and low utilization can also mean too little demand. | Eliyahu M. Goldratt, *The Goal* (1984); John D. C. Little (1961); J. F. C. Kingman (1961) | The flow topology changes or a more accurate queueing model governs our dispatch and build pipelines. |
| First-principles decomposition & sacrificial lifecycle cost | Separate a category leader's irreducible physical, protocol, or unit-economics mechanics from legacy incumbent compromises, and compare local patching vs. complete replacement by total cost to a verified outcome. | Martin Fowler, *Sacrificial Architecture* (2014); Donald G. Reinertsen, *The Principles of Product Development Flow* (2009) | Relative costs of agent code authoring, verification, or runtime state change materially. |
