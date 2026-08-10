# Synthesis: Do daily standups improve software delivery outcomes?

**Question.** Does holding a daily standup meeting (DSM) causally improve software
delivery outcomes (throughput, lead time, quality/stability, predictability) for a
software team, compared with not holding one or holding a lighter/async alternative?

**Decision use.** Whether to keep, modify, or drop daily standups; how much to weight
the ceremony versus other coordination mechanisms when designing team process.

**Scope.** Agile software teams, collocated and distributed. Outcomes of interest:
delivery performance, coordination/awareness, perceived value, and costs (time,
interruption). Method: rapid structured review (web search + primary report PDFs),
run 2026-08-10.

---

## Bottom line

**There is no good evidence that daily standups improve software delivery outcomes.**
What evidence exists shows they are near-universal, modestly valued on average but
strongly polarizing, effective at *coordination and awareness* (not at delivery
outcomes), and costly in time and meeting load. The rigorous large-sample delivery
research (DORA/Accelerate) does not include standups in its predictive models at all;
its verified delivery levers are technical practices, lean product management, and
cross-functional teams. The supportable claim is:

> Daily standups are a widely adopted coordination ritual with plausible but unproven
> effects on delivery; their measured value is contingent on format, team size, and
> seniority mix, and strong causal evidence for delivery benefit is absent.

---

## What the evidence says, by claim

### C1. Adoption is near-universal in agile settings — *High confidence*

- State of Agile / VersionOne surveys: daily standup is consistently the most widely
  used agile practice: 75% (2008), 78% (2011), ~83-87% (2013-2023 reports).
- Stray & Moe (2017) survey: 87% of agile users attend DSMs; 70.6% of all respondents
  (including non-agile) attend; 35% of non-agile teams use them too.
- Interpretation: near-universal *use* does not imply effectiveness; if anything it
  creates a strong prior that teams adopt it by convention.

### C2. Perceived value is mixed and polarizing — *High confidence for studied populations*

Stray & Moe (2017), n=221 professional developers (Reddit r/programming + r/webdev):

- Mean perceived value 3.0/5 (neutral); 44.7% positive vs 36.6% negative, only 18.7% neutral.
- Juniors most positive; seniors most negative; teams of 12+ most negative.
- Attendees vs non-attendees spent the same hours/day in meetings overall (DSM did not
  substitute for other meetings, contrary to Scrum's claim).
- Caveats: convenience sample, ~97% male, self-report; but consistent with the
  qualitative literature.

### C3. Process-level benefits are real but modest — *Moderate-High confidence*

Stray, Sjøberg & Dybå (2016), grounded theory study of 12 teams (60 interviews, 79
meetings observed, across Norway, Malaysia, Poland, UK):

- Consistent benefits: information sharing and team awareness; opportunity to discuss
  and solve problems.
- Consistent costs: perceived waste of time; interruption of workflow.
- DSMs last ~63% longer when sitting than standing (reported in Stray & Moe 2017).
- The value comes from *problem-solving discussion*, not status reporting; meetings
  that degrade into "report to the leader" lose attention and value.

### C4. Costs are measurable — *Moderate confidence*

- Typical DSM is 15 min/day; a 7-person team ≈ 9 person-hours/week of meeting time
  plus context-switching. Survey data: developers report median 1h/day, mean 1.4h/day
  in meetings overall.
- Meeting load is associated with lower well-being (cited in Stray & Moe 2017).
- Direction of cost evidence is solid; magnitude is context-dependent (team size,
  remote participation, time zone spread).

### C5. Causal evidence linking standups to delivery outcomes: absent — *High confidence in the absence of strong evidence; cannot claim "no effect"*

- The largest rigorous delivery-performance research program (DORA, 2016-2018 reports
  checked directly): standups are **not present** in the predictive capability models.
  Verified agile-adjacent predictors of delivery performance in the 2018 report:
  cross-functional teams (low performers 2x more likely to be siloed) and lean product
  management (small batches, fast feedback).
- Widely circulated secondary summaries attribute to *Accelerate* (Forsgren, Humble &
  Kim 2018) the finding that agile ceremonies such as standups do not predict delivery
  performance. This is **consistent** with the primary reports, but I could not verify
  an exact book passage in primary sources during this review — treat that specific
  wording as memory/secondary-derived, possibly imprecise.
- No randomized or quasi-experimental study isolating standups' effect on delivery
  outcomes was found in this review (searches on 2026-08-10). Existing standup studies
  measure attitudes and coordination, not delivery metrics.
- Absence of evidence ≠ evidence of no effect: DORA's null result (if any) applies to
  *prediction*, not to the causal question.

### C6. Effect is contingent, not automatic — *Moderate confidence*

Consistent across the Stray et al. studies:

- Problem-solving discussion adds value; pure status reporting does not.
- Larger teams (especially 12+) like it less; senior developers gain least.
- Frequency/meeting load interacts with perceived value; daily is not obviously optimal.

### C7. Remote/async alternatives: evidence is thin — *Low confidence*

- No strong outcome-level studies compare async standups (Slack/Teams updates, GitLab
  style) with synchronous DSMs.
- Practitioner reports favor async status + synchronous problem-solving, but this is
  largely opinion; flag as a gap, not a finding.

---

## Evidence table

| Source | Design & sample | Outcome measured | Finding | Quality / limits |
|---|---|---|---|---|
| Stray, Sjøberg & Dybå 2016 (JSS) | Grounded theory; 12 teams, 60 interviews, 79 meetings; 4 countries | Attitudes, conduct, coordination | Benefits: info sharing, problem solving. Costs: waste of time, interruption | Moderate (qualitative but first dedicated study; consistent findings) |
| Stray & Moe 2017 (XP/Springer, open access) | Survey, n=221 devs (Reddit) | Perceived value, adoption, meeting load | 87% agile adoption; mean value 3.0/5; polarized; juniors +, seniors -, 12+ teams - | Low-Moderate (convenience sample, self-report; transparent limitations) |
| State of Agile / VersionOne (2008-2023) | Annual practitioner surveys (self-selected) | Practice adoption | Standup most-used practice, 75-87% | Low (adoption only; not effectiveness) |
| DORA reports 2016-2018 (primary PDFs) | Cross-sectional surveys, n in thousands; SEM/regression | Delivery performance (deploy freq, lead time, CFR, MTTR) | No standup variable in models; agile levers = cross-functional teams + lean product management | Moderate-High for prediction; cannot answer causal question; standups untested |
| *Accelerate* (2018) secondary summaries | — | Delivery performance | "Agile ceremonies not predictive" (commonly attributed; exact wording unverified here) | Unverified at primary level in this review; do not quote precisely |

---

## Confidence summary

| Claim | Confidence | Why |
|---|---|---|
| Standups are near-universal in agile | High | Multiple independent surveys, consistent over 15 years |
| Perceived value is mixed/polarizing | High (context-limited) | Direct survey + consistent qualitative work |
| Standups aid awareness/coordination | Moderate-High | Qualitative consensus; no outcome metrics |
| Standups have real time/interruption costs | Moderate | Time data solid; value lost context-dependent |
| Standups causally improve delivery | **Very low (no evidence)** | No RCT/quasi-experiment; flagship research program does not model them |
| Effect depends on format/size/seniority | Moderate | Replicated patterns in Stray et al. work |
| Async standups are equivalent or better | Low | Practitioner consensus only |

---

## What I know vs. what I verified

- **Verified live (2026-08-10):** DORA 2016/2017/2018 primary report PDFs (standups
  absent from models; cross-functional teams + lean product management as agile levers);
  Stray & Moe 2017 full text (Springer Professional, open access); Stray et al. 2016
  details via SINTEF/Cristin record; State of Agile adoption numbers via InfoQ and
  secondary reports.
- **Memory/secondary-derived, flagged:** the exact *Accelerate* wording about agile
  ceremonies not predicting performance; Jørgensen's reviews concluding the agile
  evidence base is weak (not opened in this run); meeting-load/well-being literature.
- **Not found:** any causal study isolating standups; outcome-level comparisons of
  async vs sync standups.

## Evidence gaps & what would change the conclusion

1. A pre-registered field experiment (or strong quasi-experiment) measuring delivery
   metrics with/without DSMs — would be the decisive evidence.
2. Outcome-level studies of async vs sync standups in distributed teams.
3. DORA-style analysis that actually includes a standup/ceremony variable.
4. Cost-accounting studies (interruption cost, senior opportunity cost).

Until then, the rational default is: keep a *short, problem-solving-focused*
coordination touchpoint only if the team's awareness/blocker-surfacing needs are real,
watch team size and seniority mix, and treat the ceremony as a means to the
DORA-verified levers (small batches, fast feedback, cross-functional teams) — not as a
delivery improvement in itself.

---

*Method note: rapid structured web review; queries for DORA/Accelerate standup
findings, Stray et al. standup studies, State of Agile adoption, and systematic
reviews; primary PDFs downloaded and text-searched; one paywalled item (Accelerate
book) could not be verified in full. Search log available on request.*
