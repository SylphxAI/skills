# Does the new onboarding flow cause higher 7-day retention?

Causal inference record for the observational cohort comparison of the new vs. old onboarding flow (n = 200 per cohort).

## Bottom line

The observed association is large and statistically significant — 62% vs. 48% 7-day retention, +14 percentage points (pp) — but the study, as described, does **not** identify a causal effect. Flow assignment was not randomized, and the cohorts differ in signup week, device, and region, so calendar time, audience mix, and self-selection are entangled with the flow. The causal claim "the new flow caused the +14 pp" is **not established** by this comparison. A randomized A/B test (or a defensible quasi-experimental design with stable pre-trends, within-week overlap, passing negative controls, and a plausible sensitivity profile) is required to support it.

## 1. Causal question and target estimand

- **Intervention (A = 1):** the new onboarding flow, as served in the study window (a single defined version).
- **Comparator (A = 0):** the old onboarding flow.
- **Population:** all new signups eligible for onboarding during the study window (eligibility defined before analysis).
- **Outcome (Y):** 7-day retention — defined precisely (e.g., ≥1 active session on calendar day 7 after signup, or any session within days 1–7), with the identical definition and instrumentation for both cohorts.
- **Time zero:** signup (or first onboarding entry). **Horizon:** day 7 after time zero. Users without 7 days of follow-up (right-censored) are excluded from both cohorts.
- **Primary estimand (decision-relevant):** population average treatment effect

  `ATE = E[Y(1)] − E[Y(0)]`

  where `Y(a)` is the day-7 retention indicator under flow `a`, averaged over the eligible signup population. Report as risk difference and risk ratio.
- **Secondary estimands:** ATT = `E[Y(1) − Y(0) | A = 1]` (effect on those who received the new flow) and a per-protocol contrast if treatment versions are well defined.
- **Contrast is intention-to-treat:** assignment to a flow, not completion of it. Users who abandon onboarding stay in the denominator; conditioning on "completed onboarding" induces selection bias because the flows may filter users differently.

## 2. Observed data and comparison

| | Old flow | New flow |
|---|---:|---:|
| n | 200 | 200 |
| 7-day retention | 48% (96/200) | 62% (124/200) |

- Risk difference: **+14.0 pp** (95% CI +4.3 to +23.7 pp)
- Risk ratio: **1.29** (95% CI 1.08–1.55)
- z ≈ 2.84, p ≈ 0.0045 (χ²; Fisher exact similar)

The association is unlikely to be sampling noise, but note that n = 200 per arm only just achieves 80% power to detect a 14 pp difference. Smaller true effects (≤10 pp) would often be missed, and covariate balance tests at this sample size are correspondingly underpowered — a non-significant imbalance is not evidence of balance.

## 3. Causal model (assumptions)

```
SignupWeek ──────────► Flow ──► OnboardingExperience ──► Retention(day 7)
Device ─────────────► Flow, Retention                  (mediator: do NOT adjust)
Region ─────────────► Flow, Retention
AcquisitionChannel / UserIntent (U, often unmeasured) ─► Flow, Retention
Concurrent product/market changes (T) ─────────────────► Retention
```

- **Confounders to control:** signup week (calendar-time effects), device, region, and acquisition channel when measured.
- **Mediator:** the onboarding experience is on the causal path; adjusting for it (or for onboarding completion) opens selection bias and is forbidden.
- **Selection:** verify identical eligibility, retention definition, instrumentation, and follow-up in both cohorts; check differential missingness/attrition.
- **Interference:** low risk for onboarding; revisit if the product has invite loops that create cross-user effects.
- **Treatment versions:** if the "new flow" changed during the window, the estimate is a mixture of versions; restrict to the stable version or define versions explicitly.
- **Measurement:** confirm the day-7 retention event was logged identically before and after the rollout — an instrumentation change at rollout would create a pure measurement artifact.

## 4. Identification and design

The observed comparison is a cohort comparison, not a randomized target trial. Identification rests on **conditional exchangeability**: within strata of measured confounders (signup week, device, region, channel), the cohorts' counterfactual retention under the old flow is the same — `Y(0) ⊥ A | X` — plus **positivity** (overlap in covariate strata) and **consistency** (no interference, no hidden treatment versions).

The data structure determines how far identification can go; establish it first by plotting signup-week distributions per cohort:

1. **Strict before/after** (no overlap in signup weeks): flow is collinear with calendar time, so week effects cannot be adjusted. This is a one-point interrupted time series with no concurrent control — effectively unidentified unless old-flow retention was stable for 4–6+ weeks pre-rollout and nothing else changed at rollout (both must be checked, not assumed).
2. **Overlapping weeks** (both flows live in the same weeks): compare within week (week fixed effects or matching on week) to control calendar time. Stronger, but still observational — within-week assignment is non-random (self-selection, platform targeting).
3. **As-if-random rollout** (e.g., device/region cells randomized to rollout order): a device × region × week analysis approaches a cluster-randomized comparison; verify that rollout order is uncorrelated with pre-rollout retention and other covariates.

**Estimation (requires individual-level data):**
- Primary: logistic or linear-probability model of retention on flow assignment with signup week, device, region (and channel) as covariates; report the adjusted **risk difference as an average marginal effect** — not a raw adjusted odds ratio.
- Robustness: propensity-score weighting and doubly robust estimation; standardized differences after weighting; within-week analysis.
- Adjust only for confounders, never mechanically for every measured variable, and never for mediators or colliders.

**Alternatives rejected:** difference-in-differences (no untreated group with its own post-period trend unless old-flow users continued after rollout); regression discontinuity (no assignment threshold); instrumental variables (no credible instrument); synthetic control / interrupted time series (viable only in the strict before/after case with a long stable pre-period and no concurrent changes).

## 5. Checks and diagnostics

Items marked *(data)* require individual-level data; the rest follow from the summary statistics.

- **Balance table** *(data)*: standardized mean differences (SMD) for device, region, signup-week distribution, acquisition channel, app/OS version, and any pre-signup behavior. |SMD| < 0.1 is a heuristic, not proof; at n = 200, statistically non-significant imbalances can still matter if the covariate strongly predicts retention (e.g., a 10 pp platform gap in retention).
- **Overlap / positivity** *(data)*: common support across device × region × week cells; report empty cells.
- **Calendar-time structure:** determine whether the design is before/after, overlapping, or mixed (Section 4). This decides what is even identifiable.
- **Pre-trends** *(data)*: old-flow 7-day retention by signup week for 4–6 weeks before the change. An upward pre-rollout trend substantially weakens the causal reading.
- **Negative controls:**
  - *Placebo outcomes* *(data)* — metrics the flow cannot plausibly affect (support tickets, crash rate, password resets) should show no cohort difference; if they do, suspect measurement or selection artifacts.
  - *Placebo exposure* *(data)* — retention of users who never touched onboarding, by week; flat across the rollout date supports time stability.
  - *Placebo date* *(data)* — shift the assumed rollout boundary; the effect should track the boundary, not the calendar.
- **Assignment integrity** *(data)*: confirm no exposure leakage (old-cohort users receiving new-flow components or vice versa) via flow-version logs.
- **Missingness** *(data)*: identical eligibility, definition, and follow-up in both cohorts; check differential attrition.
- **Model dependence** *(data)*: compare crude, adjusted, weighted, and within-week estimates; report the range, not just the best-fitting model.

## 6. Sensitivity to unmeasured confounding

Even with perfect adjustment for observed covariates, unmeasured confounders — acquisition channel, user intent, concurrent product or marketing changes, app-store features — can explain the association.

- **E-value (VanderWeele–Ding):** an unmeasured confounder would need an association of RR ≥ **~1.9** with both flow assignment and retention (beyond measured covariates) to fully explain the observed RR of 1.29; **~1.4** to explain away the lower 95% bound (RR 1.08). Interpretation: moderate robustness — plausible for an audience-mix or marketing change, less plausible for a pure measurement artifact.
- **Explicit bias-factor example:** suppose an unmeasured binary confounder U ("arrived via a high-intent acquisition channel") with retention RR = 2.0, present in 30% of the new cohort vs. 10% of the old. Bias factor `B = [1 + (2−1)×0.30] / [1 + (2−1)×0.10] = 1.30/1.10 ≈ 1.18`, so the true RR ≈ 1.29/1.18 ≈ **1.09** (~+4 pp rather than +14 pp). A 20 pp prevalence gap of a 2× channel shrinks the effect to near-null; a 20 pp gap of a ~2.7× channel fully explains it away. Launch announcements and promos routinely move channel mix by that much.
- **Bounds:** report worst/best case under extreme confounding, and the range of estimates across specifications (Section 5).

Sensitivity thresholds do not establish causality; they quantify how much unmeasured confounding it would take to flip the conclusion so its plausibility can be judged against domain knowledge.

## 7. Uncertainty

Two distinct uncertainties, only one of which the CI quantifies:

- **Sampling uncertainty (quantified):** +14 pp (95% CI +4.3 to +23.7 pp); the association is unlikely to be noise (p ≈ 0.0045).
- **Identification uncertainty (not quantified, and it dominates):** the causal effect could be zero, negative, or larger than +14 pp depending on unmeasured confounding and time effects. A narrow interval around a biased estimate is not strong causal evidence; report the causal estimate only alongside the assumptions that carry it, otherwise the honest result is **not identified**.

## 8. Claim boundary

**Supported:**
- The new-flow cohort shows higher 7-day retention than the old-flow cohort: +14 pp (95% CI +4.3 to +23.7 pp), RR 1.29 (95% CI 1.08–1.55).
- If conditional exchangeability holds given signup week, device, region, and channel, the new flow causes roughly that increase for this signup population.

**Not supported by this comparison alone:**
- "The new flow caused the +14 pp" — calendar-time effects, audience mix, self-selection, and measurement changes are live alternative explanations this design cannot rule out.
- Generalization to other periods, platforms, or the full user base (transportability is limited: the cohorts differ in week/device/region by construction).
- Long-run effects: day-7 retention can be inflated by novelty; 14- and 30-day retention and re-retention should also be examined before concluding durable value.

## 9. What would change the conclusion

**Evidence that would support the causal claim:**
1. A randomized A/B test (or week-blocked switchback): randomize signups 50/50 to flow for ≥2–3 weeks, block on device/region, pre-register the analysis. ~1,600/arm detects a 5 pp effect at 80% power; the current ~200/arm only detects ~14 pp.
2. If randomization is infeasible: overlapping signup weeks with the old flow still live (within-week comparison), stable pre-trends, |SMD| < 0.1 after adjustment, passing negative controls, and an E-value threshold judged implausible given channel/audience data.
3. Channel and intent data: if acquisition-channel mix is measured, adjusted, and imbalanced only slightly, the largest confounder is controlled.
4. Flat placebo outcomes and clean flow-version logs.

**Evidence that would refute it (each alone materially changes the conclusion):**
- Adjusted analysis collapses the difference to ≈0 once week/device/region/channel are controlled.
- Old-flow retention was already trending upward pre-rollout and the +14 pp matches the pre-existing trend.
- The cohorts do not overlap in time (pure before/after) and any concurrent product or marketing change happened at rollout.
- Negative-control outcomes show cohort differences (measurement or selection artifact).
- Channel data show high-intent channels overrepresented in the new cohort at roughly the Section 6 thresholds.

## 10. Recommended next step

Treat this comparison as hypothesis-generating. Before locking in a shipping decision, run the randomized test: 2–3 weeks, ~1,500–1,600 signups per arm (5 pp detection at 80% power), blocked by week/device/region, intention-to-treat analysis on all randomized signups, day-7 retention as primary metric (14- and 30-day as secondary), pre-registered analysis and decision rule. If a randomized test is impossible, complete the observational checks in Sections 4–6 and only claim a causal effect if every check passes and the sensitivity thresholds are implausible.

## Appendix: numbers used

- `p_new = 0.62` (124/200), `p_old = 0.48` (96/200)
- `SE(Δ) = √(0.62×0.38/200 + 0.48×0.52/200) = 0.0493`; Δ = 0.140; 95% CI = 0.140 ± 1.96×0.0493 = (0.043, 0.237)
- `RR = 0.62/0.48 = 1.29`; `SE(log RR) = √(1/124 − 1/200 + 1/96 − 1/200) = 0.092`; 95% CI (1.08, 1.55)
- `z = 2.84`, p ≈ 0.0045
- Power: ~197/arm for 80% power at Δ = 0.14; ~1,543/arm at Δ = 0.05; ~4,287/arm at Δ = 0.03
- E-values: point RR 1.29 → 1.90; lower CI RR 1.08 → 1.37
