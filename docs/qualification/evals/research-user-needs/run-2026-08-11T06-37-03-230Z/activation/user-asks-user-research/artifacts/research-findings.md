# Research Findings — Two-Week Churn (6-Session Interview Study)

**Status:** Draft v1. The session ledger (notes/recordings, consent records, participant segments) was not present in the workspace when this report was written. Per-theme evidence rows in §4 and §5 are therefore scaffolded with evidence locators to be completed from the ledger, and no participant quotes or counts have been fabricated. Everything marked *TBD-ledger* must be confirmed or replaced from session evidence before this report is treated as final.

---

## 1. Decision this report serves

- **Decision:** Which retention lever should we build next to reduce churn around the two-week mark?
- **Research question:** Why do users of our habit-tracking app stop using it after roughly two weeks, and what would plausibly keep them?
- **Evidence used:** Six qualitative interviews about churn after two weeks (method, channel, and recorder state: *TBD-ledger*).
- **Users studied:** Six users of the app who churned or were at risk of churning around the two-week point (exact recruitment criteria: *TBD-ledger*).

This is a **findings report only**. The study protocol, recruitment matrix, and consent/privacy details are out of scope here but must be retained with the study records so evidence stays traceable.

## 2. What the evidence base is (and is not)

Six sessions is a small, purposive, qualitative sample. It can generate themes, hypotheses, and design direction. It cannot produce prevalence estimates, population statements, or causal proof. Every conclusion below is rated against that standard.

**Evidence tiers used in this report** (from the research method used by this team):

| Tier | Meaning |
| --- | --- |
| **Observed** | Directly seen in the study context (e.g., a walkthrough, artifact, in-session behavior) |
| **Reported** | Stated by participants (e.g., retrospective accounts) but not directly observed |
| **Interpreted** | Analytical explanation consistent with the evidence |
| **Hypothesized** | Plausible account requiring more evidence |

## 3. What we can conclude from these sessions

### 3.1 Study-level conclusions (hold regardless of ledger details)

1. **The sessions are a valid source of directional themes** about what these six users experienced around the two-week mark, not a measurement of how common those experiences are.
2. **Convergence matters more than count.** A theme consistent across 5–6 of 6 sessions with no disconfirming case supports a confident *within-sample* directional claim. A theme in 1–2 sessions is a lead to test, not a finding.
3. **Disconfirming cases are findings too.** Any theme with an unexplained counter-case must be reported as segment-specific or unresolved, not averaged away.
4. **Retrospective accounts are recall, not behavior.** Anything said about past app use is *reported* until triangulated with usage telemetry or session artifacts.

### 3.2 Per-theme findings (to be completed from the session ledger)

Each row below must cite evidence locators (session ID, timestamp/clip, note reference) and the tier of the evidence. Do not fill a row from memory of "what users tend to say" — fill it from the sessions.

| # | Theme / churn driver | Tier | Sessions supporting | Sessions disconfirming | Affected groups | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| F1 | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* |
| F2 | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* |
| F3 | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* | *TBD-ledger* |

**Completion rule:** a row is only "done" when it has (a) ≥1 evidence locator, (b) a tier label, (c) supporting and disconfirming session counts, and (d) a confidence rating per §5.

## 4. What we cannot conclude from these sessions

1. **Prevalence:** "Most users churn because of X," "X is the #1 reason for churn," or any share of users implied by "5 of 6 said…" are **not supported**. Six qualitative sessions cannot estimate population rates. Prevalence questions belong in an appropriately sampled quantitative study (survey or cohort analytics).
2. **Causation:** "Building lever Y will reduce churn" is **not supported** by interviews alone. At most, sessions suggest *where to look*; the effect must be tested.
3. **Non-interviewed users:** Nothing here covers users who stayed, users who churned for different reasons, non-interviewed segments, or contexts the six didn't mention. Coverage limits (habit type, age, platform, access needs, week of churn) must be stated from the ledger before generalizing to any group.
4. **Accuracy of recalled timelines:** Retrospective accounts of "when I stopped" are subject to memory bias unless checked against telemetry (e.g., last active day, missed habit events).
5. **Long-term retention:** Sessions about the two-week mark say nothing about month-two or month-six retention.
6. **The lever's cost/benefit:** Interviews can't tell us implementation cost, feasibility, or whether a lever beats an alternative in a head-to-head test.

## 5. How confident we are

### 5.1 Confidence scale

| Rating | Criteria |
| --- | --- |
| **High** | Direct observations across ≥5 of 6 sessions, consistent, no unexplained counter-case, triangulated with another evidence class (telemetry, artifacts), low researcher dependence |
| **Medium** | Consistent across 3–4 of 6 sessions, or *reported* (self-report/retrospective) rather than observed; minor unexplained contradictions |
| **Low** | 1–2 sessions, or *interpreted/hypothesized* without direct support, or contradicted without explanation |

Confidence here rates **directional insight about these participants**, never population prevalence — no qualitative finding from 6 sessions can earn "High" as a claim about the wider user base.

### 5.2 Confidence statement for this study

- **Confidence in the limits above (what we cannot conclude): high** — they follow from the design, not from the session content.
- **Confidence in any individual theme: to be assigned per §5.1 once F1–F3 are completed from the ledger.** Until then, all thematic content is *hypothesized* by default.
- **Researcher-dependence risk:** unless two researchers independently coded the sessions, single-rater bias is unmeasured and should reduce each rating by one notch on material themes.

## 6. Which retention lever to build next

### 6.1 Decision rule (applied to the completed theme table)

Rank lever candidates by, in order:

1. **Evidence weight:** maps to the highest-confidence theme(s) from §3.2 (a lever nobody mentioned scores zero here).
2. **Earliest detectable failure:** targets the first observable drop-off in the two-week window (e.g., first missed day), not the terminal "I deleted the app" moment — earlier levers are cheaper and easier to instrument.
3. **Measurability:** has a clean proxy (e.g., day-14 retention, recovery after first miss) so the build can be validated.
4. **Build cost:** can ship as a focused change with a staged rollout, not a redesign.

### 6.2 Provisional recommendation

**Build next: first-miss recovery (streak grace / reframe after a missed day), conditional on ledger confirmation that missed-day discouragement is the most consistent theme.**

Why this is the provisional default:

- It targets the earliest observable failure in the two-week window (the first missed habit), which is instrumentable and testable.
- It is a focused change (no redesign), so it can be validated cheaply before committing to larger levers.
- If the ledger instead shows a different dominant theme (e.g., reminders being ignored, loss of perceived value, onboarding mismatch), the rule in §6.1 re-ranks and this default is dropped. **The sessions, not this prior, pick the lever.**

**Confidence in this recommendation: Low–Medium** — it is a hypothesis about what the sessions will show, not a conclusion from them. It becomes Medium only if the completed table shows a consistent, reported-or-observed first-miss theme across ≥4 of 6 sessions with no unexplained counter-case.

### 6.3 Validation plan for whatever lever is chosen

1. Instrument the failure point (e.g., first missed day) and the outcome (day-14 retention) for 2–4 weeks of baseline.
2. Ship the lever to a random subset (staged rollout or experiment); hold out a comparison group.
3. Compare day-14 retention and post-first-miss recovery rate between groups; require a pre-specified minimum effect before committing to build-out.
4. Pair the result with a short quantitative survey to size prevalence of the lever's target theme — the gap this qualitative study cannot fill.

## 7. Non-claims and next steps

- **Non-claims:** This report does not claim to know why the broader user base churns, that any lever will work, or that six users represent our users.
- **Blocking action:** Attach the session ledger (notes/recordings + consent state + participant segments) so F1–F3, §5.2 ratings, and §6.2 confirmation can be completed. Without it, the findings table is a scaffold, not findings.
- **Next evidence needed (in order):** (1) completed ledger rows; (2) behavioral telemetry for the two-week window to convert *reported* timelines into *observed* ones; (3) a prevalence survey or cohort analysis for any theme worth sizing; (4) a staged experiment for the chosen lever.
