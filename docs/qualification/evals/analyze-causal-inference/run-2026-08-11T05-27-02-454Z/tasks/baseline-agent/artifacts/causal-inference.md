# Causal Inference Record: New onboarding flow vs 7-day retention

## Causal question

- **Intervention:** Assigning a new signup to the *new* onboarding flow.
- **Comparator:** Assigning a new signup to the *old* onboarding flow.
- **Population:** New signups represented in `onboarding-data.csv` (20 rows; 10 per
  cohort), spanning two weeks, two devices (mobile, desktop), and two regions (eu, us).
- **Outcome:** 7-day retention, recorded as binary `retention` (1 = retained).
- **Horizon / time zero:** Signup; outcome observed 7 days later. Not directly verified
  from the data.
- **Estimand:** Average causal effect on the risk of 7-day retention,
  `P(retention = 1 | do(new flow)) - P(retention = 1 | do(old flow))`, on this
  population. Equivalently, the risk difference (RD); risk ratio (RR) and odds ratio
  (OR) are reported as secondary scales.

## Data overview

| Check | Result |
|---|---|
| Rows | 20 (10 new, 10 old); no missing values |
| Outcome | Binary 0/1 in all rows |
| Covariate balance | Perfect: each cohort has 6 week-1/4 week-2, 5 mobile/5 desktop, 6 eu/4 us |
| Duplicates | Four cells have 2 rows each, all in `(week=1, region=eu)`; outcomes differ within each duplicate pair, consistent with distinct users, but no user IDs exist to confirm |
| Columns available | `cohort`, `week`, `device`, `region`, `retention` only |

Raw retention:

| Cohort | Retained | n | Rate | 95% Wilson CI |
|---|---|---|---|---|
| new | 7 | 10 | 70% | 40%–89% |
| old | 2 | 10 | 20% | 6%–51% |

## Causal model and assumptions

Assumed structure: `cohort` → `retention`, with `week`, `device`, and `region` as
potential common causes of both cohort and retention; `retention` is measured without
error; one observation per user; no interference between users in different cohorts.

Assumptions required for the estimate to be causal:

1. **Exchangeability (no unmeasured confounding):** cohort assignment is independent
   of potential outcomes given the measured covariates. This holds automatically only
   if users were randomly assigned to flows; the CSV contains no randomization
   evidence, so this is an assumption, not a verified fact.
2. **Positivity:** every combination of covariates has non-zero probability of
   receiving each flow. Satisfied in the data.
3. **Consistency / no hidden treatment versions:** "new flow" means the same
   intervention for everyone in that cohort. Not verifiable from the file.
4. **No interference (SUTVA):** a user's retention is unaffected by which flow other
   users received. Plausible for onboarding but not testable here.
5. **Correct measurement:** `retention` is the intended 7-day definition and rows are
   distinct users. The definition is not documented in the file.

## Identification and design

The design that best matches these data is a **stratified (A/B) randomized trial
emulation**: users are assigned new vs old flow, and the comparison is the marginal
difference in retention, with week/device/region as pre-specified strata.

- Because covariates are perfectly balanced by construction, the **crude difference of
  proportions is the primary estimate**; covariate adjustment is neither needed nor
  stable at this sample size (logistic regression shows quasi-separation in the eu
  stratum).
- Alternatives were rejected: difference-in-differences and interrupted time series
  require pre-period data and are unnecessary here; instrumental variables and
  regression discontinuity have no candidate instrument or threshold in the data.
- The presence of both cohorts in both weeks is helpful: cohort is not determined by
  week, so a simple time trend between week 1 and week 2 cannot explain the difference.

## Analysis and diagnostics

**Primary estimate (risk difference):** `0.70 - 0.20 = +0.50` in favor of the new flow.

| Quantity | Value | 95% CI |
|---|---|---|
| Risk difference | +0.50 | Wald 0.12–0.88; bootstrap percentile 0.10–0.80 |
| Risk ratio | 3.5 | Wald approx. 0.95–12.9 |
| Odds ratio (unadjusted) | 9.3 | — |
| Fisher exact test (two-sided) | p = 0.070 | — |
| Permutation test (one-sided) | p = 0.035 (two-sided ≈ 0.07) | — |

**Consistency across strata** — the difference is positive in every subgroup:

| Subgroup | new | old | Diff |
|---|---|---|---|
| week 1 | 67% (4/6) | 17% (1/6) | +0.50 |
| week 2 | 75% (3/4) | 25% (1/4) | +0.50 |
| mobile | 60% (3/5) | 20% (1/5) | +0.40 |
| desktop | 80% (4/5) | 20% (1/5) | +0.60 |
| eu | 67% (4/6) | 0% (0/6) | +0.67 |
| us | 75% (3/4) | 50% (2/4) | +0.25 |

**Robustness and sensitivity:**

- The effect is not driven by a single stratum; every subgroup is positive. The
  strongest pattern (eu: new 67% vs old 0%) is also the most fragile — 1-2 outcome
  flips in a 6-observation cell change it materially.
- Inference is very sensitive to small outcome changes: e.g., one fewer retained new
  user (6/10 vs 2/10) gives Fisher p ≈ 0.17; the bootstrap lower bound is 0.10.
- Unmeasured confounding: at RR = 3.5, an unmeasured confounder would need to be very
  strong (RR ≈ 6.5 scale) to explain the point estimate away; however, the confidence
  bound reaches RR ≈ 0.95–1.0, so even modest confounding plus sampling noise is
  consistent with no effect. The CI-bound sensitivity is therefore poor.
- No negative-control outcome or placebo date exists in the file to probe assignment
  integrity; randomization status is unverifiable.
- Missingness is absent, but selection into the file (e.g., users who never opened the
  app being excluded from both cohorts) cannot be ruled out.

## Claim boundary

**Supported statement (conditional on the assumptions above):**

> In these 20 signups, the new onboarding flow is associated with a 50-percentage-point
> higher 7-day retention rate (70% vs 20%, Fisher two-sided p = 0.07). If cohort
> assignment was truly randomized (or otherwise independent of potential outcomes given
> measured covariates), this is an estimate of the causal effect of the new flow.

**What is NOT supported:**

- A definitive causal claim at conventional significance: p = 0.07 and the confidence
  interval (0.10–0.80) are consistent with anything from a small effect to a very large
  one, and with zero effect.
- Any magnitude claim beyond "directionally positive and large in this sample."
- Generalization beyond this population: 20 rows over 2 weeks, 2 devices, 2 regions is
  far too small to support population-level or long-horizon claims.
- Claims about the *mechanism* (why retention differs) — the file contains no funnel,
  engagement, or feature-usage data.

**Confidence assessment:**

- Direction: moderate-to-high confidence in a positive difference **within this
  dataset** (consistent across all strata).
- Causality: low-to-moderate — it rests entirely on unverifiable exchangeability;
  there is no randomization evidence in the data.
- Magnitude: low confidence — n = 10 per arm yields extremely wide intervals.

**Evidence that would change the conclusion:**

- Randomization logs (or a documented assignment mechanism) for the cohort flag.
- User-level IDs to confirm one row per user and rule out duplicate/aggregate rows.
- A documented definition of 7-day retention and signup time zero.
- Larger n; even n ≈ 50 per arm would sharply narrow the interval and stabilize the
  adjusted analysis.
- A negative-control outcome (e.g., an outcome the flow should not affect) or a
  placebo rollout date.
- Pre-registration of the analysis would protect against the subgroup/outcome
  exploration visible in a 20-row file.

**Bottom line:** the data are consistent with the new flow causing substantially higher
7-day retention, but this is a small, assignment-mechanism-unknown observational
comparison. Treat the +50pp difference as a promising directional signal that needs a
properly randomized or otherwise identified study (and more data) before causal
promotion decisions.
