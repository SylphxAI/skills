# Causal Inference Record — New onboarding flow and 7-day retention

Data: `onboarding-data.csv` (n = 20 new signups; columns: cohort, week, device, region, retention).
Prepared per `SKILL.md` workflow after reading `references/causal-inference-methods.md`.

---

## 1. Causal question

| Element | Definition |
|---|---|
| Intervention | Assignment to the **new onboarding flow** (`cohort = new`) |
| Comparator | Assignment to the **old onboarding flow** (`cohort = old`) |
| Population | **New signups** during the study window (weeks 1–2, EU and US, mobile and desktop) |
| Outcome | **7-day retention**: active at day 7 after signup (`retention = 1`) |
| Time zero | Moment of signup, when the flow is first experienced |
| Follow-up | Fixed 7-day horizon, measured once at day 7 (no immortal-time window) |
| Target estimand | Population average treatment effect on the **risk-difference scale**: ATE = E[Y(1) − Y(0)], where Y(a) is the day-7 retention indicator under flow a. Risk ratio E[Y(1)]/E[Y(0)] and odds ratio reported as secondary scales. |

**Falsifiable causal question:** "For new signups in weeks 1–2, would assigning the new onboarding flow instead of the old flow change the probability of 7-day retention?" The counterfactual contrast is assignment to new vs old flow, not "impact" of the flow.

---

## 2. Causal model

```
  U (unmeasured: signup source/channel, motivation, marketing exposure, prior product use)
   |  \                              \_____________________________
   v   \                                             \               \
 cohort (A) ----------------------------------------->  retention (Y)
   ^     ^        ^                                   /
   |     |        |                                  /
 device --+--------+-------------------------------/
 region -----------+------------------------------/
 week ------------------------------------------/
```

Edges (all assumptions, not all testable from data):

- `device, region, week → A` — flow exposure may differ by device, region, or signup week (e.g., targeted rollout, device-specific eligibility, self-selection).
- `device, region, week → Y` — retention varies by device, region, and signup week (e.g., device usage patterns, market differences, temporal campaigns).
- `U → A` and `U → Y` — **unmeasured common causes** are the core identification threat (users who choose or are routed to the new flow may differ in motivation, signup channel, or exposure to other product changes).
- `A → Y` — the causal path of interest; onboarding content acts on retention within 7 days.
- No mediator is observed between A and Y (no post-assignment variables in the data), so there is no observed mediator to mis-handle.
- No collider is conditioned on in the primary analysis (adjustment set is only pre-treatment covariates: device, region, week).
- **Selection:** all rows are new signups with observed outcomes; no dropout or missingness is recorded. Representativeness of the 20 rows for the full signup population is **not verifiable**.
- **Interference (SUTVA):** assumed none (one user's flow does not affect another's retention). Not testable from these data.
- **Measurement:** `cohort` and `retention` are taken as recorded without error; no adherence data exist (we cannot tell whether a user assigned to the new flow actually completed it).

---

## 3. Identification and design

### Target experiment being emulated

A randomized controlled trial: all new signups in the window are randomly assigned to the new or old onboarding flow at signup (time zero), retention is observed at day 7, and the analysis compares day-7 retention by assigned arm. Eligibility: new signups; no exclusions.

### Design selected

**Target-trial emulation with covariate adjustment** for the measured pre-treatment covariates `device`, `region`, `week`. This is the design whose identifying assumptions can be stated against the data: the CSV records flow, time, device, region, and outcome, but **does not record how flow was assigned**. If assignment was actually randomized, the crude contrast is the ATE; if not, the contrast is identified only under conditional exchangeability.

Identification assumptions (stated before analysis):

1. **Conditional exchangeability (no unmeasured confounding):** A ⊥ Y(a) | (device, region, week) for a ∈ {0, 1} — within device × region × week strata, potential retention under each flow does not depend on which flow was assigned.
2. **Positivity:** P(A = a | device, region, week) > 0 for both a in every stratum — checkable in the data.
3. **Consistency:** Y = Y(A), and the flow received matches the flow assigned with no unmeasured treatment versions.
4. **No interference** (SUTVA).
5. **No measurement error** in A or Y; complete data (no missingness).

Under assumptions 1–5, the crude risk difference estimates ATE = E[Y(1)] − E[Y(0)] on the study population. Because device, region, and week are exactly balanced between cohorts, adjustment changes the risk-difference estimate negligibly (verified below); it is retained to absorb any residual time/device/region confounding.

### Alternatives considered and rejected

- **RCT analysis without assumptions:** impossible — the data contain no randomization indicator, assignment log, or protocol; randomization cannot be inferred from balance alone.
- **Difference-in-differences:** rejected — no pre-intervention outcome period exists for the new flow (retention is only measured at day 7 after signup, and both flows coexist in both weeks, so there is no untreated pre-period series to establish parallel trends).
- **Regression discontinuity / instrumental variables:** rejected — no assignment threshold or instrument is recorded in the data.
- **Adjustment for all observed variables mechanically:** rejected — device, region, week are the only measured pre-treatment variables; adjusting for post-treatment variables is unnecessary here since none are observed.

---

## 4. Analysis and diagnostics

### Primary estimate (crude risk difference; identical to population-weighted adjusted RD)

| Quantity | Estimate | 95% CI |
|---|---|---|
| Retention, new flow | 7/10 (70%) | — |
| Retention, old flow | 2/10 (20%) | — |
| **Risk difference** | **+0.500** | [0.123, 0.877] |
| Risk ratio | 3.50 | [0.950, 12.90] |
| Odds ratio | 9.33 | exact [0.882, 127.0] |
| Fisher exact two-sided p | 0.0698 | — |

The new-flow signups retained at 70% vs 20%: a **+50 percentage-point raw difference**, but with n = 20 the uncertainty is very large and the 95% interval includes zero (p = 0.070, not significant at the conventional 0.05 level).

### Balance and overlap

- **Balance:** device (5/5 vs 5/5), region (6/4 vs 6/4), and week (6/4 vs 6/4) distributions are identical across cohorts; Fisher p = 1.00 for each. This is consistent with randomization or deliberate balancing, but **balance on observed covariates does not establish exchangeability on unobserved ones**.
- **Positivity/overlap:** every device × region cell contains both cohorts in both weeks — positivity holds on the measured covariates.

### Diagnostics

- **Assignment integrity:** NOT verifiable. There is no record of the assignment mechanism (random assignment, self-selection, or operational rollout) and no adherence data (whether new-flow users completed the new flow).
- **Missingness:** none in the file; however, non-representative sampling or outcome recording problems at the population level cannot be ruled out from these 20 rows.
- **Negative controls:** none available — the data contain no placebo outcome (e.g., a behavior unaffected by onboarding) or pre-signup baseline outcome. **This is the largest unmet diagnostic.**
- **Placebo-time consistency (weak check only):** the raw difference is +0.50 in both weeks (week 1: 4/6 vs 1/6; week 2: 3/4 vs 1/4). Consistency across weeks is reassuring but is **not** a true negative control — week is not a placebo outcome.
- **Within-stratum consistency:** new ≥ old retention in every device × region stratum (RD +0.67, +0.67, +0.50, 0.00). The mobile/US stratum shows no difference (1/2 vs 1/2); the effect is driven by the EU and desktop/US strata.
- **Model dependence:** population-weighted standardized RD = +0.500 (equals crude, as expected under perfect balance); Mantel–Haenszel OR = 11.0 over device × region strata (unstable — zero old-flow events in both EU strata); logistic regression adjusting for device, region, and week gives cohort OR = 14.3 (95% CI 1.21–169.9). Direction is consistent across specifications; the OR magnitude is scale-sensitive and non-collapsible with sparse strata, so the risk difference is the preferred scale.
- **Sensitivity to unmeasured confounding (E-value):** the point-estimate RR of 3.50 has an E-value of **6.46** — an unmeasured confounder would need ≥ ~6.5-fold association with both flow assignment and retention to fully explain the observed difference. However, the 95% CI for the RR crosses the null (lower bound 0.95), so **no E-value exists for the interval**: far weaker unmeasured confounding would suffice to make the interval include no effect, and the data cannot exclude a null causal effect.

### Unresolved threats

1. Unmeasured confounding (signup channel/source, motivation, marketing campaigns, product changes coinciding with the new flow) — plausible given no assignment record.
2. Self-selection: if users chose which flow to take, the comparison is selection-biased regardless of covariate balance.
3. Small sample: n = 20 provides very low power; the interval [0.123, 0.877] admits both "large effect" and "no effect".
4. No negative control and no pre-period outcomes to falsify the causal reading.

---

## 5. Claim boundary

### Supported by these data (association)

- In this sample of 20 new signups, signups assigned to the new onboarding flow had 7-day retention of 70% vs 20% for the old flow: **+50 percentage points (95% CI +12 to +88), RR 3.5 (95% CI 0.95–12.9), Fisher exact p = 0.070**.
- The difference is directionally consistent in every device × region stratum and in both weeks, and cohort distributions are exactly balanced on device, region, and week.

### Supported under explicit assumptions (conditional causal estimate)

- **If** flow assignment is exchangeable given device, region, and week (no unmeasured confounding), positivity, consistency, no interference, and no measurement error **all hold**, then the identified ATE estimate is **+0.50** on the risk-difference scale (95% CI 0.123–0.877) — i.e., even under the identifying assumptions, the 95% interval includes zero, so the data are consistent with both a substantial effect and no effect.

### NOT supported (cannot be claimed from these data)

- The unconditional causal statement "the new onboarding flow **causes** higher 7-day retention" is **not identified** from this file: the assignment mechanism is unrecorded, no negative control or pre-period outcomes exist to test the causal reading, adherence is unobserved, and the sample is small.
- No effect-size guarantee: a point estimate of +50 pp on n = 20 is not a reliable effect magnitude.
- No transportability claims: the population is EU/US, mobile/desktop, weeks 1–2 only; results may not extend to other regions, devices, periods, or to signups who do not complete the flow they were assigned.

### Evidence that would change the conclusion

- A randomization record, assignment log, or instrument that verifies (or permits analysis of) the assignment mechanism.
- A **negative-control outcome** (e.g., a pre-signup behavior or an outcome the onboarding flow should not affect) showing no difference, or a pre-period/placebo-time series supporting parallel trends.
- A larger sample and adherence/completion data (intent-to-treat vs per-protocol contrast).
- Replication in other regions, devices, and weeks, ideally from a pre-registered randomized holdout.

**Bottom line:** the new flow is strongly associated with higher 7-day retention in this sample (+50 pp), but the causal claim is not established: identification rests entirely on an untestable no-unmeasured-confounding assumption, the uncertainty interval includes the null, and no negative control is available. `Not identified` is the honest verdict for the causal claim; the association and the conditional estimate are reproducible below.

---

## Reproducibility

Run with Python 3 (standard library only):

```python
import csv
from math import comb, sqrt, log, exp

rows = list(csv.DictReader(open("onboarding-data.csv")))
A = [r["cohort"] == "new" for r in rows]   # intervention: new flow
Y = [r["retention"] == "1" for r in rows]  # outcome: 7-day retention
W = [r["week"] for r in rows]; D = [r["device"] for r in rows]; R = [r["region"] for r in rows]
N = len(rows)

def fisher_p2(a, b, c, d):
    n1, n2, m1, m2 = a+b, c+d, a+c, b+d
    tot = comb(n1+n2, n1)
    pobs = comb(m1, a) * comb(m2, b) / tot
    p = 0.0
    for x in range(max(0, m1-n2), min(n1, m1)+1):
        pi = comb(m1, x) * comb(m2, n1-x) / tot
        if pi <= pobs + 1e-15: p += pi
    return p

def fisher_or_ci(a, b, c, d):
    n1, n2, m1 = a+b, c+d, a+c
    def tail(orr, ge):
        xs = range(max(0, m1-n2), min(n1, m1)+1)
        ws = [comb(m1, x)*comb(n1+n2-m1, n1-x)*orr**x for x in xs]
        s = sum(ws)
        return sum((w/s) for x, w in zip(xs, ws) if (x >= a if ge else x <= a))
    def inv(target, ge):
        lo, hi = exp(-12), exp(12)
        for _ in range(100):
            mid = (lo+hi)/2
            if (tail(mid, ge) > target) == ge: hi = mid
            else: lo = mid
        return mid
    return inv(0.025, True), inv(0.025, False)

def rd_ci(a, b, c, d):
    p1, p2 = a/(a+b), c/(c+d); rd = p1-p2
    se = sqrt(p1*(1-p1)/(a+b) + p2*(1-p2)/(c+d))
    return rd, rd-1.959963984540054*se, rd+1.959963984540054*se

def rr_ci(a, b, c, d):
    p1, p2 = a/(a+b), c/(c+d); rr = p1/p2
    se = sqrt(1/a - 1/(a+b) + 1/c - 1/(c+d))
    return rr, exp(log(rr)-1.959963984540054*se), exp(log(rr)+1.959963984540054*se)

def solve(mat, rhs):
    n = len(mat)
    M = [row[:] + [b] for row, b in zip(mat, rhs)]
    for col in range(n):
        piv = max(range(col, n), key=lambda r: abs(M[r][col]))
        M[col], M[piv] = M[piv], M[col]
        d = M[col][col]; M[col] = [v/d for v in M[col]]
        for r in range(n):
            if r != col:
                f = M[r][col]
                M[r] = [v - f*w for v, w in zip(M[r], M[col])]
    return [M[r][-1] for r in range(n)]

def irls_logit(X, y):
    n, k = len(X), len(X[0]); b = [0.0]*k
    for _ in range(60):
        p = [1/(1+exp(-sum(b[j]*X[i][j] for j in range(k)))) for i in range(n)]
        XtWX = [[sum(X[i][r]*p[i]*(1-p[i])*X[i][c] for i in range(n)) for c in range(k)] for r in range(k)]
        score = [sum(X[i][j]*(y[i]-p[i]) for i in range(n)) for j in range(k)]
        delta = solve([row[:] for row in XtWX], score)
        b = [bi+di for bi, di in zip(b, delta)]
        if max(abs(x) for x in delta) < 1e-9: break
    inv = [[0.0]*k for _ in range(k)]
    for col in range(k):
        e = [0.0]*k; e[col] = 1.0
        colv = solve([row[:] for row in XtWX], e)
        for r in range(k): inv[r][col] = colv[r]
    se = [sqrt(inv[j][j]) for j in range(k)]
    return b, se

a = sum(x and y for x, y in zip(A, Y)); b = sum(x and not y for x, y in zip(A, Y))
c = sum((not x) and y for x, y in zip(A, Y)); d = sum((not x) and (not y) for x, y in zip(A, Y))
rd, rdl, rdh = rd_ci(a, b, c, d); rr, rrl, rrh = rr_ci(a, b, c, d)
orl, orh = fisher_or_ci(a, b, c, d)
print(f"crude: new {a}/{a+b} vs old {c}/{c+d}")
print(f"  RD={rd:+.3f} [{rdl:.3f},{rdh:.3f}]  RR={rr:.3f} [{rrl:.3f},{rrh:.3f}]  OR={(a*d)/(b*c):.3f} exactCI[{orl:.3f},{orh:.3f}]")
print(f"  Fisher exact two-sided p={fisher_p2(a,b,c,d):.4f}")

for name, var in [("device", D), ("region", R), ("week", W)]:
    lv = sorted(set(var))[0]
    t1 = sum(x and v == lv for x, v in zip(A, var)); t2 = sum(x and v != lv for x, v in zip(A, var))
    t3 = sum((not x) and v == lv for x, v in zip(A, var)); t4 = sum((not x) and v != lv for x, v in zip(A, var))
    print(f"balance cohort x {name}: Fisher p={fisher_p2(t1,t2,t3,t4):.4f}")

strata = {}
for i in range(N):
    strata.setdefault((D[i], R[i]), []).append((A[i], Y[i]))
num = den = 0.0
for items in strata.values():
    aa = sum(x and y for x, y in items); bb = sum(x and not y for x, y in items)
    cc = sum((not x) and y for x, y in items); dd = sum((not x) and (not y) for x, y in items)
    t = aa+bb+cc+dd
    num += aa*dd/t; den += bb*cc/t
    print(f"  stratum: new {aa}/{aa+bb} old {cc}/{cc+dd} RD={aa/(aa+bb)-cc/(cc+dd):+.2f}")
print(f"MH OR pooled (device x region) = {num/den:.2f}")

for wk in ["1", "2"]:
    ix = [i for i in range(N) if W[i] == wk]
    aa = sum(A[i] and Y[i] for i in ix); bb = sum(A[i] and not Y[i] for i in ix)
    cc = sum((not A[i]) and Y[i] for i in ix); dd = sum((not A[i]) and (not Y[i]) for i in ix)
    print(f"week {wk}: RD={aa/(aa+bb)-cc/(cc+dd):+.2f} Fisher p={fisher_p2(aa,bb,cc,dd):.3f}")

levels = {k: sorted(set(v)) for k, v in [("device", D), ("region", R), ("week", W)]}
X = [[1.0, float(A[i]), float(D[i] == levels["device"][1]), float(R[i] == levels["region"][1]), float(W[i] == levels["week"][1])] for i in range(N)]
b, se = irls_logit(X, [float(y) for y in Y])
print(f"logistic cohort coefficient: OR={exp(b[1]):.3f} [{exp(b[1]-1.96*se[1]):.3f},{exp(b[1]+1.96*se[1]):.3f}] z={b[1]/se[1]:.2f}")
ev = rr + sqrt(rr*(rr-1))
print(f"E-value (point RR {rr:.2f}) = {ev:.2f}; RR lower CI {rrl:.2f} -> " +
      ("E-value %.2f" % (rrl+sqrt(rrl*(rrl-1))) if rrl > 1 else "CI crosses null, no E-value"))
```

Expected output (verified 2026-08-11):

```
crude: new 7/10 vs old 2/10
  RD=+0.500 [0.123,0.877]  RR=3.500 [0.950,12.898]  OR=9.333 exactCI[0.882,127.009]
  Fisher exact two-sided p=0.0698
balance cohort x device: Fisher p=1.0000
balance cohort x region: Fisher p=1.0000
balance cohort x week: Fisher p=1.0000
  stratum: new 2/3 old 0/3 RD=+0.67
  stratum: new 2/3 old 0/3 RD=+0.67
  stratum: new 1/2 old 1/2 RD=+0.00
  stratum: new 2/2 old 1/2 RD=+0.50
MH OR pooled (device x region) = 11.00
week 1: RD=+0.50 Fisher p=0.242
week 2: RD=+0.50 Fisher p=0.486
logistic cohort coefficient: OR=14.348 [1.212,169.927] z=2.11
E-value (point RR 3.50) = 6.46; RR lower CI 0.95 -> CI crosses null, no E-value
```
