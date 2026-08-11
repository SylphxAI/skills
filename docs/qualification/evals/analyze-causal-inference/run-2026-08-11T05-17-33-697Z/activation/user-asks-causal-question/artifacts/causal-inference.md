# Causal Inference Record: Does the new onboarding flow cause higher 7-day retention?

**Verdict: not identified from the reported summary alone.** The observed +14 pp
difference (62% vs 48%) is statistically significant and directionally consistent
with a real causal effect, but the data are an observational cohort comparison
whose cohorts differ in signup week, device, and region. A causal claim requires
an adjusted, unit-level analysis and design checks first. Until then, treat the
+14 pp as an associational (likely upper-bound) estimate.

## 1. Causal question and target estimand

| Element | Definition |
|---|---|
| Intervention | New onboarding flow (v2), *as shipped* — including any co-deployed changes, per the consistency assumption |
| Comparator | Old onboarding flow (v1), the flow the user would have received absent the change |
| Population | New signups during the study window; target population for the decision: all new signups |
| Time zero | Signup (first exposure to a flow) |
| Outcome | 7-day retention — exact definition to confirm: "active on day 7" vs "≥1 active day in days 1–7"; must be identical across cohorts |
| Horizon | 7 days after signup |
| Primary estimand | ATE on the risk-difference scale: `RD = E[Y(1) - Y(0)] = P(Y=1 | do(flow = new)) - P(Y=1 | do(flow = old))` |
| Secondary estimand | Risk ratio `RR = P(Y=1 | do(new)) / P(Y=1 | do(old))`; conditional version `RD(w, d, r)` within signup-week, device, region strata (the version the observational data can actually identify) |

Complete causal question: *"For a new signup in a given signup week, device class,
and region, would assigning the new onboarding flow instead of the old one change
the probability of being retained at day 7?"*

## 2. Causal model (DAG) and assumptions

```
  W (signup week) ────────► A (flow, new/old) ──────► Y (7-day retention)
  D (device)      ────────► A                         ▲
  R (region)      ────────► A                         │
  U (unmeasured)  ────────► A ────────────────────────┘
  W ────────────────────────────────────────────────► Y   (time trend)
  D ────────────────────────────────────────────────► Y
  R ────────────────────────────────────────────────► Y
  U ────────────────────────────────────────────────► Y   (intent, channel, motivation)
  S (selection) ────────────────────────────────────► inclusion in the 200-per-cohort sample
```

Structural notes:

- `W`, `D`, `R`, and `U` are common causes of flow and retention, i.e., open
  backdoor paths (`A ← W → Y`, `A ← U → Y`, ...). The adjustment set
  `{W, D, R}` blocks the *measured* backdoor paths; `U` paths remain.
- Mediators on the `A → Y` path (e.g., onboarding completion, first-session
  actions) must **not** be conditioned on: the target is the total effect of
  assigning the flow.
- Selection: cohort membership and the 200-per-cohort sample are not random. If
  inclusion (e.g., bot removal, tracking availability) depends on `Y` given `A`
  and covariates, the contrast is biased.
- Interference: if users in different flows interact (sharing, support routing),
  the unit-level contrast is not well defined.
- Time-zero alignment: retention must be measured from each user's own signup
  date. Comparing "activity in calendar week 7" instead of "days 0–7 after
  signup" introduces immortal-time bias.
- The DAG is an assumption; data alone cannot validate the absence of `U` arrows.

## 3. Identification and design

**Target trial being emulated:** eligible new signups are randomly assigned to
v1 or v2 within strata of (signup week, device, region) and followed for 7 days;
retention is compared. Randomization identifies the ATE without confounding
assumptions.

**Observational emulation:** conditional exchangeability
`A ⊥ Y(a) | W, D, R`, estimated with outcome regression, inverse-probability
weighting (IPW), or a doubly robust estimator on unit-level data. Whether this
works depends on the assignment mechanism:

1. **Overlap exists** (both flows observed within the same signup weeks): week
   fixed effects plus adjustment for device and region identify the effect
   under the assumptions below.
2. **No overlap** (flow is a deterministic function of signup week — pre-rollout
   vs post-rollout): `A` and `W` are collinear, and the comparison is a
   before-after contrast. It is identified only under an added assumption:
   parallel trends with a control group that did not receive the change
   (staggered rollout by platform/region → difference-in-differences), or no
   other shocks between periods (interrupted time series on weekly retention).
   Without such a control, the effect is **not identified** — the 14 pp
   conflates the flow with the passage of time.

**Assumptions required (overlap case):**

1. *Exchangeability* — no unmeasured confounding conditional on `W, D, R`
   (e.g., no residual differences in motivation, acquisition channel, campaign
   exposure, or prior product familiarity within cells).
2. *Positivity* — every `(W, D, R)` cell contains both flows.
3. *Consistency* — well-defined treatment versions; no bundled co-interventions;
   full adherence confirmed by exposure logs.
4. *No interference* between users.
5. *Measurement and selection* — identical retention definition, tracking, and
   denominators; missingness independent of outcome given `A, W, D, R`.

**Designs rejected:** randomized trial (not available in this data; recommended
going forward); regression discontinuity (no assignment threshold); instrumental
variables (no credible instrument); synthetic control (needs pre-period outcome
series — possible stretch if weekly aggregates exist).

## 4. Observed analysis (from the reported summary)

`n = 200` per cohort; `p_old = 0.48`, `p_new = 0.62`.

| Quantity | Value | 95% CI |
|---|---|---|
| Risk difference (RD) | +0.14 (14 pp) | (4.3, 23.7) pp |
| Risk ratio (RR) | 1.29 | (1.08, 1.55) |
| Odds ratio (OR) | 1.77 | — (not the primary scale; outcome is common) |
| z / p | 2.84 / ≈0.005 | |

These are *associational* contrasts between cohort averages. They equal the
causal RD only if the cohorts are exchangeable — which the "slightly different"
week/device/region composition contradicts, or at least does not establish.

**Required unit-level analysis:**

- Balance table: standardized mean differences (SMDs) for week, device, region,
  and any other measured covariates (age, acquisition channel, country,
  campaign, app version); target `|SMD| ≤ 0.1`.
- Overlap: propensity-score distributions by cohort.
- Adjusted estimates: outcome regression *and* IPW / doubly robust; report
  adjusted RD and RR with 95% CIs; cluster standard errors by signup week.
- If there is no week/flow overlap: weekly retention plot around the rollout,
  difference-in-differences against a control platform/region, or interrupted
  time series; document concurrent events.

## 5. Checks and diagnostics

1. **Balance** — SMDs before/after adjustment; `|SMD| > 0.1` flags residual
   confound risk even after adjustment.
2. **Positivity/overlap** — cells with near-zero propensity to receive one flow
   make estimates fragile and model-dependent.
3. **Pre-trends** — retention by signup week among pre-rollout users; an upward
   trend before the change is a direct threat.
4. **Discontinuity** — sharp jump in retention at the rollout date supports the
   flow; gradual drift suggests a time trend.
5. **Concurrent changes** — release/marketing/store calendar at rollout; any
   other product, campaign, or pricing change co-occurring is a confounder.
6. **Negative control outcomes** — outcomes onboarding should not affect (e.g.,
   password resets, support contacts); the same +14 pp pattern signals bias.
7. **Negative control population** — existing-user retention at the same dates;
   a synchronized jump indicates a global shock, not the flow.
8. **Placebo exposure/date** — comparison of cohorts that logically should not
   differ (e.g., a region that received the flow later).
9. **Measurement integrity** — same instrumentation, retention definition, data
   pipeline, and bot filtering for both cohorts.
10. **Treatment integrity** — exposure logs confirm the new cohort saw v2 and
    the old cohort did not; check for partial rollouts, app-version caching, or
    A/A contamination.
11. **Missingness** — rates and mechanisms by cohort; differential missingness
    biases the contrast.
12. **Model dependence** — estimates stable across specifications (outcome
    regression vs IPW vs doubly robust), week definitions (calendar vs
    rollout-relative), and outcome definitions.
13. **Interference** — checks for sharing or support-driven cross-exposure
    between cohorts.

## 6. Sensitivity to unmeasured confounding

- **E-values (RR scale).** Point RR 1.29 → E-value ≈ **1.9**; RR CI lower bound
  1.08 → E-value ≈ **1.4**. Interpretation: to fully explain the +14 pp,
  unmeasured confounders would need to be associated with both flow assignment
  and retention by ~1.9× each, above and beyond week/device/region; ~1.4× each
  suffices to shift the CI to include zero. (Use the RR scale — OR-based
  E-values would be inflated for a 48–62% outcome.)
- **Binary-confounder bound.** For an unmeasured binary `U`, bias ≈
  `δ × γ`, where `δ = P(U | new) − P(U | old)` and `γ` = U's retention effect
  within the old flow. Explaining all 14 pp requires `δ × γ ≈ 0.14`, e.g.,
  `δ = 0.20` with `γ = 0.70`, or `δ = 0.50` with `γ = 0.28`.
- **Known-covariate scenarios.** Device/region imbalances are described as
  slight (≈ ≤10 pp) and device/region retention gaps rarely exceed ≈20 pp, so
  those two directly contribute at most ≈1–2 pp. The dominant sensitivity is
  **signup week**: a pre-existing trend of ~2 pp/week across a 7-week cohort
  separation fully explains 14 pp, and a concurrent campaign or app-store
  feature can move retention by ≥10 pp overnight.
- **Reporting standard.** Show adjusted estimates under alternative week
  windows, common-support trimming, and inclusion of a measured intent proxy
  (acquisition channel, referral source).

## 7. Uncertainty

- **Sampling uncertainty: small.** The 95% CI of (4.3, 23.7) pp with p ≈ 0.005
  means random noise is unlikely to explain the difference.
- **Identification uncertainty: dominant.** The CI is valid only under no
  unmeasured confounding and correct design. A narrow interval around a biased
  estimate is not causal evidence; the true effect plausibly spans ≈0 to ≈+14
  pp depending on confounding strength and time trends.
- **Measurement uncertainty.** Retention definition, tracking changes, and
  cohort-membership rules ("who is in the new cohort") affect the contrast.
- **Transportability.** Effects may not generalize beyond the study weeks, to
  other markets/devices, or to later versions of the flow.

## 8. Claim boundary

**Supported now:**

> New-flow signups retained at ~62% vs ~48% for old-flow signups (crude RD
> +14 pp, 95% CI +4 to +24 pp). The difference is statistically significant and
> consistent with a causal effect, but does not by itself establish one.

**Not supported:**

- "The new flow causes a ~14 pp retention gain" — requires the adjusted analysis
  and diagnostics above; the adjusted effect is expected to be smaller.
- Any specific effect magnitude, or generalization to future signups, other
  regions, or later flow versions.

**Evidence that would change the conclusion:**

- *Toward causal:* recovered randomization (or a true RCT); or overlap with
  adjustment showing RD ≳ 5 pp, CI excluding 0, post-adjustment balance
  (`|SMD| < 0.1`), stable pre-trends, passing negative controls, and no
  concurrent changes. Even then, label it a moderate-confidence observational
  estimate, not a randomized result.
- *Toward no effect:* adjusted RD near 0 or CI including 0; a pre-existing
  retention trend of comparable magnitude; a concurrent product/marketing/
  measurement change at rollout; negative-control failures; differential
  missingness; or exposure-integrity failures (new-cohort users who never saw
  v2).
- *Toward not identified:* if flow assignment is a deterministic function of
  signup week and no control series exists, the 14 pp is a before-after
  contrast that cannot be separated from time without untestable assumptions.

## 9. Recommendations

- Do not report "the new flow increases retention by 14 pp" as causal. Report
  the associational contrast with the caveat above.
- Pull unit-level data and run the balance, adjustment, pre-trend, and
  negative-control battery in Sections 4–5.
- Plot weekly retention for new and existing users around the rollout; audit
  the release/marketing calendar for concurrent changes.
- Run a proper experiment: randomize flow at signup, or stagger the rollout
  with a holdout. For a 14 pp effect, ~200/arm reaches 80% power (consistent
  with this data); to detect 5 pp, ~1,600/arm is needed.
- Weigh the cost of being wrong: if rollout/rollback is cheap, the directionally
  positive signal may justify a limited rollout with instrumentation; if
  expensive, wait for experimental evidence.

## Appendix: arithmetic

- `SE(RD) = sqrt(0.62×0.38/200 + 0.48×0.52/200) = sqrt(0.002426) ≈ 0.049`
- `95% CI: 0.14 ± 1.96 × 0.049 → (0.043, 0.237)`
- `z = 0.14 / 0.049 ≈ 2.84`; two-sided `p ≈ 0.005`
- `RR = 0.62 / 0.48 ≈ 1.29`; `SE(log RR) = sqrt(0.38/(200×0.62) + 0.52/(200×0.48)) ≈ 0.092`; CI → `(1.08, 1.55)`
- `OR = (0.62×0.52) / (0.38×0.48) ≈ 1.77`
- `E-value(RR = 1.29) = 1.29 + sqrt(1.29 × 0.29) ≈ 1.9`; `E-value(RR lower = 1.08) ≈ 1.4`
