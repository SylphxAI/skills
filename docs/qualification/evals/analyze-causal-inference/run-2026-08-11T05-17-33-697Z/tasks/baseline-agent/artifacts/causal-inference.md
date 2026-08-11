# Causal Inference Record: New vs Old Onboarding Flow and 7-Day Retention

**Data:** `onboarding-data.csv` — 20 rows, no missing values.
**Columns:** `cohort` (new/old), `week` (1/2), `device` (mobile/desktop), `region` (eu/us), `retention` (0/1).

---

## 1. Causal question

| Element | Definition |
|---|---|
| Intervention | New onboarding flow assigned to `new` cohort |
| Comparator | Old onboarding flow assigned to `old` cohort |
| Population | New signups represented by these 20 units |
| Outcome | 7-day retention (binary: retained or not) |
| Time zero / horizon | Enrollment (assumed); outcome measured at day 7 |
| Estimand | Average causal effect on retention: `E[Y(1)] - E[Y(0)]` (risk difference, RD); risk ratio (RR) as secondary |

The target experiment is: randomly assign eligible new signups to the new or old flow, follow them for 7 days, and compare retention. This record asks whether the observed data can emulate that experiment.

## 2. Data and descriptive results

Per-cohort retention:

| Cohort | n | Retained | Rate | Wilson 95% CI |
|---|---|---|---|---|
| new | 10 | 7 | 70% | 40%–89% |
| old | 10 | 2 | 20% | 6%–51% |

Crude contrast: **RD = +50 percentage points (pp)** (95% CI ≈ +12 to +88 pp), **RR = 3.5** (95% CI ≈ 0.95–12.9).

Covariate balance is **exact**: both cohorts are 60% week-1 / 40% week-2, 50/50 desktop/mobile, 60% eu / 40% us. There is full overlap — every covariate cell contains both cohorts. This is consistent with randomized assignment or a matched design, but the file itself does not document the assignment mechanism.

## 3. Causal model (assumptions)

```
        U (unobserved: acquisition channel, user quality, intent, ...)
       / \
      /   \
     v     v
  cohort -> retention
  (flow)     (7-day)
```

- **Observed confounders:** `week`, `device`, `region` — all perfectly balanced, so they do not confound the crude comparison, and adjustment does not change the marginal RD.
- **Unobserved confounders (U):** any factor that influenced which flow a user received and their retention (e.g., acquisition channel, device type beyond mobile/desktop, referral source, app-store cohort effects). Cannot be checked from this file.
- **Identification assumptions required:**
  1. **Exchangeability / no unmeasured confounding:** conditional on (or, given balance, unconditional on) observed covariates, retention under the assigned flow is independent of assignment.
  2. **Consistency:** the observed flow for each user is the flow whose counterfactual we intend; one well-defined "new flow" version (no multiple variants).
  3. **Positivity:** every unit could receive either flow — satisfied (full overlap).
  4. **No interference (SUTVA):** one user's flow does not affect another user's retention (no spillover via invites, shared accounts, or viral effects) — untestable here.
  5. **No selection / no measurement error:** retention is measured identically in both cohorts and rows are not differentially missing (none are).

**Unchecked structural ambiguity:** the semantics of `week` are undocumented. If `week` is a follow-up index (week since signup), it is part of outcome timing, not a confounder. If it is an enrollment week, its balance supports concurrent assignment but its trend (week 2: 50% vs week 1: 42%) shows retention varies over time, which would matter for a staggered rollout.

## 4. Identification and design

- The data contain **no documented randomization indicator, no timestamps, no user-level identifiers, and no pre-period measurements**.
- Therefore identification rests entirely on the assumption that flow assignment is exchangeable (e.g., a genuine randomized experiment or an unbiased rollout) — an assumption the file cannot verify.
- Alternatives considered and rejected because the data are insufficient: difference-in-differences (no pre-period for the new flow), regression discontinuity (no assignment threshold), instrumental variables (no instrument), matching (nothing to match on beyond 3 balanced binary covariates).

## 5. Analysis and diagnostics

| Method | Estimate | 95% CI | p-value |
|---|---|---|---|
| Crude RD (normal approx) | +50 pp | (+12 pp, +88 pp) | — |
| Fisher's exact test (RD=0) | — | — | **0.070** |
| Permutation test (200k draws) | — | — | **0.071** |
| Logistic regression, old vs new | OR = 0.070 | (0.006, 0.825) | Wald 0.035 |

**Checks performed**

- **Balance:** exact on `week`, `device`, `region` → observed covariates are not confounders.
- **Overlap / positivity:** complete; all cells have both cohorts.
- **Missingness / integrity:** none; no implausible values.
- **Adjustment:** adding `week`, `device`, `region` to the model does not reverse the direction; the conditional OR is more extreme (0.07) than the crude RR (0.29) because of small-sample logit nonlinearity, not because adjustment changes the population being compared.
- **Sensitivity to unmeasured confounding (E-value):** an unmeasured confounder would need an association of **~6.5-fold with both flow assignment and retention** to explain away the point estimate — strong confounding required. But the **95% CI lower bound (RR ≈ 0.95) is already at the null**, so the E-value for the CI bound is **1.0**: even a weak unmeasured confounder could explain away the result at the 95% confidence level. This is the honest summary of identification risk.
- **Power:** with 10 units per arm, a true 70% vs 20% effect is detected only ~43% of the time at α=0.05; detecting a 20 pp effect at 80% power would need ~95 units per arm. The study is severely underpowered.

## 6. Claim boundary

**Supported statement (from this file alone):**
- The data are **directionally consistent with the new flow having higher 7-day retention**: +50 pp crude (70% vs 20%), with conventional 95% uncertainty of roughly +12 to +88 pp.
- Observed covariates are perfectly balanced, so the naive comparison is not explainable by `week`, `device`, or `region`.

**Not supported / why:**
- **"The new flow *causes* higher retention" is not established.** The assignment mechanism is undocumented, the sample is tiny (10 per arm), the exact test is not significant at the conventional 5% level (Fisher p = 0.070), the confidence interval for the CI-bound E-value is 1.0, and unobserved confounding (e.g., acquisition channel, rollout timing effects) cannot be ruled out. This is at best **moderate-confidence directional evidence, not an identified causal effect**.

**Confidence rating:**
- Direction (new > old): moderate — large gap, exact balance, adjustment does not reverse.
- Magnitude (+50 pp): low — 95% CI spans +12 to +88 pp; n is far too small.
- Causality: low — hinges on an unverified exchangeability assumption; `Not identified` is the honest default without the assignment record.

**What would change the conclusion:**
1. Documentation that assignment was randomized (or a valid quasi-experimental design with a stated target trial), ideally with assignment logs, enrollment dates, and user IDs.
2. Larger samples (order of ~100/arm for a 20 pp effect; ~16/arm even for the observed 50 pp gap at 80% power).
3. Negative controls (placebo outcomes, no-flow cohorts) and pre-period retention for the old cohort.
4. More covariate granularity (acquisition channel, plan, app version) to reduce unmeasured-confounding risk, plus interference checks (e.g., invite/account-level clustering).

---

## Reproducibility

Numbers computed with Python (numpy) from `onboarding-data.csv`: Wilson CIs; normal-approximation RD CI; Fisher's exact test via hypergeometric enumeration; two-sided permutation test (200,000 draws, seed 42); IRLS logistic regression with Wald inference; Monte-Carlo power (20,000 draws, seed 1); E-values from the standard formula `RR + sqrt(RR(RR-1))`.
