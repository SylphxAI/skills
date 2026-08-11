# Causal Inference Record — New vs Old Onboarding Flow and 7-Day Retention

**Verdict:** the dataset alone does **not identify** a causal effect of the new
onboarding flow on 7-day retention. It supports a strong, stable association
(+50 percentage points, new 70% vs old 20%) with perfectly balanced measured
covariates, but the assignment mechanism is unrecorded, the sample is tiny
(n = 10 per arm), exact two-sided inference is not significant at the 0.05
level (p = 0.070), and no negative controls or pre-period checks are available.
A causal claim is **plausible but unproven**; the claim boundary below states
exactly what would change that conclusion.

Data: `onboarding-data.csv` (20 rows, one row per signup as assumed; no user
IDs, no timestamps beyond signup week, no missingness). Analysis reproduced
from the same file by the scripts in this workspace; all numbers below are
directly recomputable from the CSV.

---

## 1. Causal question

| Element | Definition |
|---|---|
| Intervention | Assignment to the **new onboarding flow** (`cohort = new`) |
| Comparator | Assignment to the **old onboarding flow** (`cohort = old`) |
| Population | New signups in the study window (weeks 1–2), all devices/regions in the data |
| Outcome | 7-day retention, binary (`retention`, 0/1) |
| Time zero | Moment of signup (start of onboarding) |
| Follow-up | Day 7 after signup; `week` is the signup-week cohort label, not follow-up time |
| Target estimand | Average causal effect (ATE) on the risk-difference scale: `P(Y=1 | do(new)) − P(Y=1 | do(old))` over the study population, with risk ratio and odds ratio as secondary scales |

The causal contrast is explicit: every new signup in the study window would be
assigned the new flow in the treated world and the old flow in the control
world; the estimand is the difference in 7-day retention between those two
worlds. "Impact" is rejected as a question framing; the estimand is fixed above.

---

## 2. Causal model

Assumed directed acyclic graph (arrows are assumptions, not data facts):

```
device ──> cohort?          device ──> retention?
region ──> cohort?          region ──> retention?
week   ──> cohort?          week   ──> retention?
cohort (flow assignment) ──> retention
```

- **Measured common causes (potential confounders):** `device`, `region`,
  `week` — any of these could influence both flow assignment (e.g., staged
  rollout by device/region, or over time) and retention (e.g., EU users differ
  in engagement; week 2 traffic differs from week 1).
- **Mediators:** none recorded; onboarding completion/adoption would be a
  mediator between flow assignment and retention, but it is not in the data
  (treatment is "assigned to flow", not "completed flow").
- **Colliders:** none recorded; the data contain no post-assignment variables
  (e.g., usage in week 1) that would open collider bias if conditioned on.
- **Selection / missingness:** no missingness recorded, so we cannot verify
  that every signup is present through day 7. Differential attrition or
  eligibility filtering would bias the comparison in unknown directions.
- **Interference:** unassessed; signups in the same device/region/week could
  plausibly influence each other (e.g., referral effects), which would violate
  the no-interference assumption.
- **Measurement:** `retention` is binary with an undefined threshold (any
  activity? a session? a specific action?) and `cohort` records assigned flow,
  not adherence. Measurement error in either is not quantifiable from the data.
- **Time-varying treatment/confounding:** `week` is the only time axis; both
  cohorts appear in both weeks, so there is no monotone rollout to exploit or
  to worry about; treatment is a one-time assignment at time zero.

Alternative graphs that fit the data equally well include: (a) cohort
assignment was random or balanced by design (no arrows into `cohort` from
measured covariates), or (b) an unmeasured common cause (e.g., signup channel,
marketing campaign, user intent) drives both who gets the new flow and who
retains. The data cannot distinguish (a) from (b) without assignment
documentation.

---

## 3. Identification and design

**Target-trial emulation.** The target experiment is a two-arm randomized trial:
eligible new signups are assigned new or old flow at signup, followed for 7
days, with 7-day retention as the outcome, analyzing the risk difference. The
observational analogue uses the recorded `cohort` as the treatment indicator.

**Required identification assumptions (per the emulation):**

1. **Exchangeability (no unmeasured confounding):** conditional on (or
   without) the measured covariates, flow assignment is independent of
   potential outcomes.
2. **Positivity / overlap:** every signup had a nonzero chance of each flow.
3. **Consistency:** assigned flow is the flow actually received, and the
   recorded flows are well-defined treatment versions.
4. **No interference:** one signup's flow does not affect another's outcome.
5. **No selection bias / measurement validity:** all signups observed through
   day 7; `retention` measures what the estimand names.
6. **Correct outcome definition and follow-up:** day-7 retention, no
   immortal-time (time zero = signup for everyone).

**Why this design and not alternatives:**

- **Randomization evidence:** none exists in the data — there is no allocation
  mechanism, design record, or randomization indicator. Perfect covariate
  balance is *consistent with* randomization or stratified allocation but does
  not prove either, so randomized identification is **unavailable**.
- **Regression adjustment / MH stratification:** used as the secondary analysis
  because balance is perfect; it cannot address unmeasured confounding.
- **Difference-in-differences / interrupted time series:** rejected — no
  pre-intervention retention series for either flow exists.
- **Regression discontinuity / instrumental variables:** rejected — no
  assignment threshold or credible instrument is recorded.
- **Matching/weighting:** unnecessary at perfect balance and wasteful at n = 20.

**Consequence:** identification is not established by the data; the analysis
below estimates the associational contrast and reports it as *consistent with*
a causal effect **only under** the untestable exchangeability assumption.

---

## 4. Analysis and diagnostics

### 4.1 Primary descriptive contrast (reproducible from the CSV)

| Cohort | n | Retained | Rate |
|---|---|---|---|
| new (intervention) | 10 | 7 | 70.0% |
| old (comparator) | 10 | 2 | 20.0% |

- **Risk difference:** +0.50 (new − old)
- **Risk ratio:** 3.5
- **Odds ratio:** 9.33 (7/3 ÷ 2/8)

### 4.2 Uncertainty (exact and approximate)

| Quantity | Value | 95% interval | Method |
|---|---|---|---|
| Risk difference | +0.50 | (0.10, 0.80) | Bootstrap percentile (200k resamples) |
| Risk difference | +0.50 | (0.12, 0.88) | Normal approximation — **anti-conservative at n = 10/arm; do not prefer** |
| Risk ratio | 3.50 | (0.95, 12.90) | Log-normal approximation |
| Odds ratio (adjusted for device, region, week) | 14.3 | (1.21, 169.9) | Logistic MLE (IRLS) — **unstable: near-separation in EU** |
| Two-sided exact test | p = 0.0698 | — | Fisher's exact test |
| Two-sided exact test | p = 0.0698 | — | Exact permutation test (all C(20,10) labelings) |
| One-sided exact test (new ≥ observed) | p = 0.0349 | — | Exact permutation test |

### 4.3 Diagnostics

- **Balance:** perfect on all measured covariates — device (5 mobile / 5
  desktop in both arms), region (6 EU / 4 US in both arms), week (6 / 4 in
  both arms). Standardized differences = 0. Observed covariates cannot
  explain the contrast.
- **Overlap/positivity:** all covariate strata present in both arms; but EU
  has a **structural zero** — old-flow EU retention is 0/6 — which destabilizes
  model-based adjustment.
- **Stratified consistency:** the risk difference is +0.50 in week 1 and
  +0.50 in week 2; +0.40 (mobile) and +0.60 (desktop). The contrast is stable
  across weeks and devices.
- **Effect heterogeneity (or confounding signal):** by region the RD is
  +0.67 in EU (with the 0/6 structural zero) versus +0.25 in US. This
  heterogeneity is unexplained and could be effect modification or a marker
  of region-specific confounding.
- **Assignment integrity:** unverifiable — the data record no allocation
  procedure, no randomization evidence, and no exposure/adherence measure.
- **Missingness/selection:** none recorded; cannot verify complete follow-up
  of all signups to day 7.
- **Negative controls:** **none available.** The data contain no placebo
  outcome, no pre-period, no known-irrelevant exposure, and no
  never-treated-with-new-flow subgroup with a placebo measure. This is a
  material limitation: the strongest falsification checks for confounding
  cannot be run.
- **Pre-trends:** unavailable — there is no retention data before either
  flow was introduced.

### 4.4 Sensitivity to unmeasured confounding

- E-value for the point estimate (RR = 3.5): **6.46** — an unmeasured
  confounder associated with both flow and retention by a risk ratio of ~6.5
  would be needed to fully explain away the observed point estimate.
- E-value for the CI lower bound (RR lower bound ≈ 0.95): **1.00** — the
  interval already includes the null, so even trivial unmeasured confounding
  is compatible with zero effect. A narrow interval around a biased estimate
  is not the issue here; the interval is simply too wide to rule out null or
  small effects.
- No meaningful bias analysis for selection/attrition is possible with the
  recorded variables.

### 4.5 Unresolved threats (ranked)

1. **Unverified assignment mechanism** — the single largest threat: without
   randomization or an allocation rule, unmeasured confounding cannot be
   excluded (e.g., signup channel, campaign, user intent).
2. **Small sample / weak power** — n = 10 per arm; two-sided exact p ≈ 0.07;
   effect-size estimates have very wide intervals (OR CI spans 1.2–170).
3. **No negative controls or pre-period** — no falsification checks possible.
4. **Selection/attrition unknown** — complete follow-up is asserted, not shown.
5. **Structural zero in old-flow EU** — the comparison leans on a stratum
   where the comparator never retained anyone.
6. **Measurement definition** — retention threshold and flow adherence are
   undefined in the data.

---

## 5. Claim boundary

**Supported (descriptively, within this dataset):**
- Signups assigned the new flow retained at 70% vs 20% for the old flow
  (RD +0.50, RR 3.5), stable across device and week strata, with perfect
  balance on recorded covariates.
- The pattern is consistent with a causal effect *if* assignment was
  as-good-as-random with no unmeasured confounding, no interference, no
  differential attrition, and valid retention measurement — none of which this
  dataset can verify.
- One-sided exact evidence is significant (p = 0.035); two-sided exact
  evidence is not (p = 0.070). The correct summary is **suggestive, not
  confirmatory**.

**Not supported by this data:**
- "The new onboarding flow causes higher 7-day retention" as an identified
  causal claim. The dataset contains no assignment mechanism, so the causal
  estimand is **not identified** from it alone.
- Any effect size claim beyond "large in this sample, very uncertain":
  adjusted OR intervals span 1.2–170 and RR intervals span 0.95–12.9.
- Generalization to signups outside weeks 1–2, other devices/regions,
  other products, or future cohorts. Transportability to those populations
  is unestablished.

**Evidence that would change the conclusion:**
- Randomization or documented assignment design (e.g., pre-registration,
  allocation logs) for the flow rollout — this is the decisive missing piece.
- More users (ideally pre-specified sample size) with exact tests that clear
  the two-sided 0.05 threshold.
- Negative-control outcomes and a pre-period retention series to falsify
  confounding.
- Completion/adherence data for the onboarding flow, a defined retention
  metric, and verified complete follow-up through day 7.

**Reproducibility:** every number above is recomputable from
`onboarding-data.csv` alone: rates are 7/10 vs 2/10; Fisher and exact
permutation tests enumerate the 2×2 table and all C(20,10) labelings;
stratified and adjusted estimates use the `device`, `region`, `week`
columns; bootstrap and E-value calculations use the formulas stated in
section 4.
