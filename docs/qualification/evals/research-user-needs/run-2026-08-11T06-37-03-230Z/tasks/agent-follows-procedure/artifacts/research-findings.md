# User Research Protocol and Findings — Habit-Tracking App: Why Users Stop After Two Weeks

> **EVIDENCE STATUS — READ FIRST**
>
> No live participant sessions were conducted in the environment where this document
> was produced. This file contains (a) a complete, pilot-ready study protocol and
> (b) a worked example of the findings artifact so the format, analysis discipline,
> and decision handoff are inspectable before field work starts.
>
> Every participant record, quote, and finding below is marked **EXAMPLE** and is an
> illustrative placeholder, not real customer evidence. It must not be quoted,
> summarized, or used for a product decision until replaced by real session records.
> The protocol itself is written to be executed as-is after the pilot gate in
> Section 8 passes.

---

## 1. Decision binding

### 1.1 The decision and its owner

| Item | Detail |
| --- | --- |
| Decision | **Which retention lever to build next** for the habit-tracking app, targeting the two-week stop pattern. |
| Decision owner | Head of Product (retention track); this document is the evidence handoff to that owner. |
| Decision window | Next planning cycle; the owner needs a ranked, evidence-traceable shortlist, not a menu. |
| Evidence that would change the decision | Any of: (1) the stop is not a single event but gradual decay; (2) a lever's mechanism is contradicted by observed behavior; (3) a covered segment shows a materially different stop reason; (4) analytics contradict the two-week framing itself. |

### 1.2 Research questions

- **RQ1 (behavior):** What does the path to stopping look like across the first two
  weeks — a single missed day, a weekend gap, gradual disengagement, or an active
  quit decision?
- **RQ2 (experience):** What do users experience, do, and say around the moments
  immediately before they stop using the app (not what they would want in a feature
  wishlist)?
- **RQ3 (variation):** Which segments stop for materially different reasons — by
  habit domain, habit size, prior app experience, context (time pressure, travel,
  shift work), access need, and notification setting?
- **RQ4 (decision):** Which retention lever has the strongest evidence-backed
  mechanism for the largest covered set of two-week stoppers?

### 1.3 Assumptions and unknowns

**Assumptions (to be re-verified, not taken as fact):**

- The owner's "users stop after two weeks" framing matches a real, analytics-visible
  pattern. Exact retention numbers are **not** verified in this document and must be
  pulled from analytics before the owner uses them.
- Stopping is behavior the user can partly recall and partly observe; a mixed
  longitudinal + retrospective design is therefore warranted.
- The app's core loop (log a habit, view streaks/progress) is the object of study;
  the specific app identity is out of scope for this protocol.

**Unknowns the study is designed to resolve:**

- Whether the stop is one event or a decay curve (drives lever design).
- Whether the dominant mechanism is motivational (habit too hard, value forgotten),
  environmental (context change, time pressure), or product-interactional
  (notification fatigue, streak pressure, logging friction).
- Which segments are exceptions to the dominant mechanism.

### 1.4 Explicit non-questions

- **Prevalence:** how many users stop, or which reason is most *common* — needs an
  appropriately sampled quantitative study, not this purposive sample.
- **Feature voting:** what new feature users would "like to have" — stated
  preference is not the behavioral evidence this decision needs.
- **Willingness to pay** and monetization.
- **Market/category demand** — out of scope for this skill.
- **Causal proof** that a lever will lift retention — that is a later randomized
  experiment (see Section 12), not a qualitative finding.

### 1.5 Prior evidence considered (not re-verified here)

- Decision owner's analytics framing of a two-week dropoff (source: owner; status:
  **unverified in this environment**).
- Published habit-formation research suggesting habit automaticity develops over
  weeks-to-months and that missed days correlate with habit strength — used only to
  shape prompts and segments, not as a population claim about this app's users.

---

## 2. Target users and context

- **Primary population:** people who started using a habit-tracking app (this app or
  equivalent) in the last 30 days and have stopped or significantly reduced use
  around day 10–16.
- **Secondary population (for real-time observation):** people currently in their
  first two weeks of use, followed prospectively.
- **Contexts of interest:** daily-life contexts that change across the two weeks —
  work/school cycles, weekends, travel, illness, stress events, notification
  permission behavior.
- **Material variation to cover (recruitment cells):** habit domain, habit size
  (small maintenance habit vs. large aspirational habit), prior habit-app
  experience, access needs, notification opt-in state, and the *shape* of the stop
  (early drop days 5–8, late drop days 9–13, borderline day 14+, and return-after-gap
  as a disconfirming cell).

---

## 3. Method and session-count rationale

### 3.1 Method mix (chosen for different error structures, not triangulation theater)

| Research question | Method | Why this method |
| --- | --- | --- |
| RQ1 stop path | 14-day diary + app-history artifact walkthrough | Observes the actual trajectory; recalled behavior alone cannot show a decay curve. |
| RQ2 experience | Diary prompts + semi-structured exit interview | Captures in-moment experience and post-hoc meaning; interview uses recent concrete events first. |
| RQ3 variation | Recruitment matrix analysis across cells | Purposive coverage of material behaviors, contexts, and access needs. |
| RQ4 lever ranking | Cross-participant thematic analysis tied to RQ1–RQ3 | Findings trace to observations, not to quotation count. |

Two evidence classes are combined deliberately: prospective diary (observes
behavior in time) and retrospective interview (elicits experience at scale of
recall, labeled **Reported**). Each has a different error structure; agreement
across them is stronger than either alone, and disagreement is treated as a signal,
not noise.

### 3.2 Session count rationale (coverage decision, not a ritual number)

- **8 prospective diary participants** (cells: all habit domains x spread of
  contexts; at least 2 with access needs; at least 2 with notifications off).
- **6–8 retrospective interview participants** who stopped in the last 30 days
  (cells: early drop, late drop, border, return-after-gap).
- Total **14–16 participants**, adjustable: add sessions when a material behavior,
  context, access need, or unresolved contradiction appears; stop when new sessions
  have low expected information value for the decision.
- **This is a purposive sample. It is not representative and supports no prevalence
  claims.**

---

## 4. Recruitment matrix, inclusion, and exclusion

### 4.1 Purposive recruitment matrix

| Cell dimension | Values (target >=1 participant per filled cell) |
| --- | --- |
| Habit domain | Health/fitness; productivity/work; learning; mindfulness/mental; financial; creative |
| Habit size | Small maintenance (e.g., drink water); moderate (e.g., 10-min exercise); large/aspirational (e.g., marathon prep block) |
| Prior app experience | First-time habit app user; switcher from another app; experienced multi-app user |
| Stop shape | Early drop (days 5–8); late drop (days 9–13); border (day 14+); **return-after-gap (disconfirming cell)** |
| Notification state | Opted in at day 1; opted out before day 14; never opted in |
| Access needs | Screen-reader user; low vision; motor impairment; neurodivergent (e.g., ADHD) |
| Context | Shift work; frequent travel; new parent; student in exam season; retired |
| Age band | 18–25; 26–40; 41–60; 60+ |

### 4.2 Inclusion criteria

- Age 18+.
- Started using the app within the last 30 days (retrospective arm) or currently
  within their first 14 days (diary arm).
- Can complete the diary/interview in a language and channel the study supports
  (English default; interpretation on request for the interview).

### 4.3 Excluded groups (and why)

| Excluded | Reason |
| --- | --- |
| Minors (under 18) | Elevated-risk population; this study has no child-research governance in place. |
| Users whose habit tracking is medically mandated (treatment compliance, doctor-directed) | Different context and risk profile; would confound the voluntary-use question. |
| Users in acute crisis or active disordered-eating/self-harm tracking | Safeguarding risk; refer to clinical support rather than recruit. |
| Current employees/contractors of the app company | Researcher effect and prior-knowledge bias. |
| Employees of direct competitors | Intellectual-property and bias risk. |
| Proxy users (e.g., "my partner uses it") | Proxies are excluded unless the affected person cannot safely participate; any proxy evidence would be explicitly labeled as proxy. |
| Users who never reached day 5, or who are still fully active at day 30 without any dip | Cannot observe the target behavior; the return-after-gap cell covers the near-stopper instead. |

### 4.4 Coverage limits (stated up front)

- Qualitative sample; no cell counts claim to mirror the user base.
- Some cells (e.g., screen-reader users) may yield 1–2 participants; findings from
  those cells are **cell-level, not population-level**.
- The two-week horizon means no claims about month-3+ retention.

---

## 5. Consent, privacy, recording, compensation, safeguarding, retention

### 5.1 Consent

- Written informed consent before any data collection, in plain language (reading
  level <= age 12), covering: purpose, what data is collected, how it is used, who
  sees it, recording, retention and deletion, withdrawal, compensation terms, and
  the statement that the study is unrelated to the user's product account.
- Separate opt-in checkboxes for: (a) audio recording, (b) video recording,
  (c) diary entry retention, (d) screenshot/artifact collection (with personal data
  redacted).
- Consent is re-confirmed verbally at the start of each session; the participant may
  withdraw consent at any time with no consequence to their account or compensation
  (see 5.6).

### 5.2 Privacy and data minimization

- Contact data (email, phone) is stored **separately** from research data; each
  participant gets a pseudonym ID (e.g., `D-01`) with no link table shared with the
  product team.
- Only data required by the study is collected: habit-related entries, app history
  screenshots (redacted), interview audio, and the minimal demographic/context fields
  in the matrix.
- No product-account data is pulled unless the participant opts in to an analytics
  linkage, which is then pseudonymized.
- Access to raw recordings: researcher + transcription service (signed NDA) only.
  The decision owner receives **pseudonymized findings**, never raw audio.

### 5.3 Recording

- Audio recording default; video optional and camera-off always acceptable.
- Diary entries are text/voice-note via a secure form; voice notes recorded with
  explicit opt-in.
- Recording state is logged per session (Section 9 ledger column) and participants
  can pause/stop recording at any point in a session.

### 5.4 Accessibility

- Diary available via web form, email, or voice-note channel; screen-reader
  compatible by default.
- Interview materials in large print and screen-reader-friendly formats; BSL or
  other interpretation on request; extra time granted without comment.

### 5.5 Safeguarding and sensitive topics

- Habit tracking can touch body image, weight, alcohol, gambling, or mental health.
  The interview script contains neutral escape routes ("you don't have to explain"),
  and a safeguarding escalation path: if distress or disclosure of self-harm/risk
  appears, the researcher follows the pre-agreed incident protocol (stop the
  sensitive line, offer support resources, escalate to the safeguarding lead) — never
  continue to probe.
- Health-related habit tracking (e.g., medically sensitive) triggers the elevated-risk
  review in the method reference; participants may skip any question.

### 5.6 Compensation

- Fixed honorarium per completed session (diary arm: per-week rate; interview arm:
  per session), paid regardless of what participants say or whether they stopped
  using the app. Compensation never depends on favorable feedback or full diary
  completion; partial completion is pro-rated and withdrawal does not forfeit
  compensation for sessions already done.

### 5.7 Retention and deletion

- Raw audio/video: deleted after transcription (<=14 days post-session) unless the
  participant opted into longer retention for verification.
- Pseudonymized transcripts and diary data: retained **24 months** for longitudinal
  analysis, then deleted; consent form states this.
- Contact data: deleted at study end (or immediately on withdrawal).
- Withdrawal: all data from that participant is deleted on request, including
  derived notes.

---

## 6. Protocol — guide and materials

> Protocol version **v1.0** (pilot-ready). The pilot gate in Section 8 must pass
> before recruitment. No pilot has been run in the environment where this document
> was produced.

### 6.1 Study flow

1. **Recruit + screen** (screener in Appendix B) -> consent -> assign pseudonym ID.
2. **Day 0 intro call** (15 min): set expectations, confirm channels, demo diary
   form, re-confirm consent. Neutral framing: "We want to understand what your
   first two weeks are actually like — including if you stop."
3. **Days 1–14 diary**: nightly 3-question prompt (below). Event-triggered prompt
   after **2 consecutive missed days** (below). Short check-in call at **day 7**
   (15 min).
4. **Day 14–16 exit interview** (60–75 min): timeline walkthrough using the
   participant's own diary and app history as artifacts.
5. **Analysis** across participants (Section 7), then decision handoff (Section 12).

### 6.2 Diary prompts (neutral; identical wording each day)

- "Did you open or use the app today? Tell us what happened in your own words."
- "What did you do instead of the app today, if anything?"
- "How would you describe today's experience with the app in one sentence?"

**Event-triggered prompt (after 2 consecutive missed days):**

- "You haven't logged for a couple of days. That's completely fine — what got in the
  way, or what changed?"

### 6.3 Exit interview guide (open prompts first, then neutral probes)

1. **Recent concrete experience first:** "Walk me through the last week you used the
   app, starting with the last time you opened it."
2. **Timeline/artifact walkthrough:** "Let's look at your entries/streaks together.
   What was happening on [specific day]?"
3. **Stop moment:** "Tell me about the day you stopped — what was that day like?"
4. **Context probes (neutral, only if not covered):** "What changed in your routine
   that week? What was different about weekdays versus weekends?"
5. **Experience probes:** "What did the app make you feel when you missed a day?
   What made you keep going at first?"
6. **Not a feature wishlist:** if participants propose features, record it as
   **Reported preference**, and return to behavior: "What were you actually doing
   when you decided not to open the app?"

### 6.4 Prohibited researcher behaviors

- No leading questions ("Did the streak pressure bother you?"), no bundled
  questions, no praise cues ("great point"), no defending the design, no teaching
  the participant how the app "should" be used, no coaching toward any intended
  retention lever.

### 6.5 Stopping and escalation rules

- **Session stop:** participant asks to stop; visible distress; safeguarding
  trigger (5.5); researcher notes the stop as data (a stop is an observation, not a
  failure).
- **Study stop:** all covered cells reach adequate coverage AND new sessions show
  low expected information value for the decision; never stopped by repetition in a
  narrow subset of cells.
- **Escalation:** safeguarding incident -> safeguarding lead within 24h; technical
  data incident (e.g., unredacted screenshot) -> privacy lead immediately.

---

## 7. Analysis plan

1. Normalize evidence units (diary entry, interview segment, artifact) without
   erasing context; each unit keeps its participant ID, day, and channel.
2. Code with definitions that may be revised during analysis; codes are checked
   against both supporting and contradictory units.
3. Build themes only after checking negative cases and contradictory segments.
4. Compare cells (habit domain, stop shape, notification state, access need);
   surface empty cells as coverage gaps, not absence of the behavior.
5. Every finding traces to evidence locators (Section 9 ledger); every
   recommendation traces to one or more findings.
6. Rate confidence from **evidence directness, coverage, consistency,
   triangulation, researcher dependence, and consequence** — never quotation count.

**Language ladder used throughout (per method reference):**

- **Observed** — directly seen in the study (e.g., diary trajectory, artifact).
- **Reported** — stated by participants, not directly observed (e.g., recalled
  reason for stopping).
- **Interpreted** — analytical explanation consistent with the evidence.
- **Hypothesized** — plausible account requiring more evidence.

---

## 8. Pilot plan and gate

### 8.1 Pilot design

- **2 pilot participants** recruited outside the research/product team (not the
  researcher, not the decision owner), matching the inclusion criteria; their data
  is **excluded** from study findings.
- Pilot runs a **compressed 3-day diary** (to test the diary tool and prompts) plus
  a **full-length mock exit interview** (to test the guide, timing, and probes).
- Pilot checks: prompt comprehension, diary tool accessibility (incl. screen
  reader), interview timing (60–75 min), whether any probe reads as leading, and
  whether the safeguarding paths are reachable.

### 8.2 Gate

- Protocol moves to v1.1 (recruitment version) only when both pilots complete
  without a critical defect. Critical defects: a prompt found to be leading;
  diary tool unusable by an access-need participant; interview exceeding 90 min.
- Pilot findings are recorded in a pilot log (Appendix C) and reported to the
  decision owner as pilot notes, not as user evidence.

---

## 9. Session ledger

> **EXAMPLE MODE:** the rows below are illustrative placeholders that demonstrate
> the ledger format, including how supporting and disconfirming observations are
> recorded and how interpretation is kept separate from participant language.
> No real sessions have been run. Replace every EXAMPLE row before use.

| Session | Segment cell | Date | Channel | Protocol | Consent | Recording | Deviation | Evidence locator | Participant language (verbatim) | Researcher interpretation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D-01 | Health/fitness, moderate habit, first-time user, notifications on | EXAMPLE | Diary + video call | v1.1 | Yes | Audio yes, video yes | None | `D-01/diary/d7`, `D-01/interview/12:40` | "I missed Tuesday, and then it felt like the streak was already broken, so Wednesday I just didn't bother." (EXAMPLE) | Reported; single missed day preceded an active decision to stop logging; consistent with streak-pressure mechanism. (EXAMPLE) |
| D-02 | Productivity, small habit, experienced user, notifications off | EXAMPLE | Diary + audio call | v1.1 | Yes | Audio yes, video no | Missed day 6 entry, recovered day 7 | `D-02/diary/d5`, `D-02/interview/31:05` | "The reminder was the only reason I opened it, and I'd turned reminders off in week one." (EXAMPLE) | Reported; interaction-level mechanism (notification dependency) rather than motivation. (EXAMPLE) |
| D-03 | Learning, large aspirational habit, switcher, notifications on | EXAMPLE | Diary + audio call | v1.1 | Yes | Audio yes | None | `D-03/diary/d3`, `D-03/interview/18:20` | "I set it up for a 30-day course and by day 9 I was a week behind, and the backlog felt stupid." (EXAMPLE) | Reported + artifact (backlog visible in app history); habit-size mismatch, not logging friction. (EXAMPLE) |
| D-04 | Mindfulness, moderate habit, first-time, notifications on | EXAMPLE | Diary + video call | v1.1 | Yes | Audio yes | None | `D-04/diary/d10` | "Weekend was the gap. Monday I came back, but the gap already felt like a failure." (EXAMPLE) | Reported; weekend gap as a distinct stop shape; supports first-weekend intervention hypothesis. (EXAMPLE) |
| D-05 | **Return-after-gap (disconfirming cell)**, fitness, experienced | EXAMPLE | Diary + audio call | v1.1 | Yes | Audio yes | None | `D-05/diary/d12` | "I skipped a week for a work trip, but I came back because the trip was over." (EXAMPLE) | Reported; context-driven pause with automatic return — **disconfirms** the universal "one miss ends it" account. (EXAMPLE) |
| D-06 | **Screen-reader user**, mindfulness, first-time, notifications on | EXAMPLE | Diary (accessible form) + audio call | v1.1 | Yes | Audio yes | Diary form needed alt-text fix on day 2 (accessibility issue, see Appendix C) | `D-06/diary/d4` | "Logging took me three times longer than my phone usually takes, so I stopped doing it daily." (EXAMPLE) | Reported; access-need-specific friction — a **segment-specific** mechanism, not generalizable to all users. (EXAMPLE) |
| R-07 | Late drop (days 9–13), health, experienced, notifications on | EXAMPLE | Audio call | v1.1 | Yes | Audio yes | None | `R-07/interview/09:15` | "The first week I was excited. The second week there was no reason to open it — the habit was either done or not." (EXAMPLE) | Reported; value-recall mechanism: motivation decays as novelty fades; no single failure event. (EXAMPLE) |
| R-08 | Early drop (days 5–8), productivity, first-time, notifications on | EXAMPLE | Audio call | v1.1 | Yes | Audio yes | Interrupted by participant childcare 10 min; resumed | `R-08/interview/44:00` | "I had to install the app and then the week exploded — deadlines. The app just wasn't in the picture." (EXAMPLE) | Reported; environmental/context mechanism (time pressure) — contradicts motivational-only accounts. (EXAMPLE) |
| R-09 | Border (day 14+), financial, switcher, notifications off | EXAMPLE | Audio call | v1.1 | Yes | Audio yes | None | `R-09/interview/22:30` | "I still check it twice a month. I didn't stop, I just stopped needing it daily." (EXAMPLE) | Reported; "stop" is not binary — daily use became occasional use; challenges the owner's two-week framing for this segment. (EXAMPLE) |

**Ledger rules (apply to real sessions):** every material session gets a row;
recording/consent state is confirmed per row; deviations are recorded with their
impact; interpretation is never merged into the verbatim column.

---

## 10. Findings

> All findings below are **EXAMPLE** and rated at the tier they would receive if
> the illustrative evidence were real. They demonstrate the required structure:
> supporting **and** disconfirming observations, affected segments, coverage,
> confidence, and consequence. Real analysis must reproduce or revise every row
> from real ledger evidence.

| # | Finding | Tier (as illustrated) | Supporting locators | Disconfirming/contradictory locators | Affected segments | Coverage | Confidence | Decision consequence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F1 | A single missed day often precedes the stop: the miss triggers a perceived "streak already broken" state rather than the stop being planned. | Reported (mechanism: Interpreted) | D-01 diary d7; D-04 diary d10 | D-05 returned after a gap; R-08 stopped with no missed-day trigger (environmental) | Streak-oriented users; early and late drops | 2 cells, 4 participants (EXAMPLE) | Low–Medium (illustrative) | Directly favors testing a **missed-day forgiveness / streak-repair** lever; also shows it is not universal. |
| F2 | Motivation decays around week two absent a felt reason to return; users describe "no reason to open it" more than "I hated it". | Reported | R-07 interview 09:15; D-03 diary d3 | D-02 (interaction-level: notifications) | Late drops, larger habits | 1–2 cells (EXAMPLE) | Low (illustrative) | Supports a **value-recall / "why I started"** nudge at day 7–10; validation must check it is not a feature-wishlist artifact. |
| F3 | The first weekend (days 6–7) is a distinct gap point, but users who return after context-driven gaps exist. | Reported | D-04 diary d10 | D-05 (returned after work trip) | Weekday-routine users | 2 cells (EXAMPLE) | Low (illustrative) | A **weekend-specific intervention** is plausible but the disconfirming cell warns against treating any gap as terminal. |
| F4 | Notification dependency: some users open the app only when reminded and stop when notifications are off or tuned out. | Reported | D-02 diary d5; D-02 interview 31:05 | D-01, D-03 (kept notifications on, still stopped) | Notifications-off segment | 1–2 cells (EXAMPLE) | Low (illustrative) | **Notification recalibration** is segment-specific; evidence does not support it as the top lever. |
| F5 | Access-need friction: for a screen-reader user, logging cost itself caused abandonment — a mechanism distinct from motivation or context. | Reported | D-06 diary d4 | None in sample (cell singleton) | Screen-reader users | 1 participant (EXAMPLE) | Very Low (illustrative, single case) | **Logging-friction/accessibility work** is a coverage-limited finding; requires its own mini-study or co-design before committing. |
| F6 | "Stop" is not binary: at least one segment shifts to occasional use rather than quitting; the two-week framing does not hold for them. | Reported | R-09 interview 22:30 | R-07, R-08 (binary stops) | Lightweight/financial habits, switchers | 1–2 cells (EXAMPLE) | Low (illustrative) | Owner should re-check analytics for "stop" vs "rare-use" definitions before building a lever aimed at "stopped" users. |

**Negative-case summary (EXAMPLE):** the ledger deliberately includes
disconfirming rows (D-05 return-after-gap; R-08 environmental stop; R-09
rare-use) so that no single mechanism is overgeneralized. In real analysis, these
cases must be searched for actively, not as an afterthought.

---

## 11. Coverage limits, confidence, and explicit non-claims

### 11.1 Coverage limits

- Purposive qualitative sample of 14–16 target; **no cell counts are
  representative** of the user base.
- Access-need cells may hold 1–2 participants; their findings are cell-level only.
- The study observes the first two weeks; no claims about month-3+ behavior.
- The diary arm can miss participants who stop silently without completing the
  event-triggered prompt; non-response is tracked as data (see 11.3).
- EXAMPLE rows cover only a subset of matrix cells; real recruitment must fill the
  matrix in Section 4.

### 11.2 Confidence

- Confidence is rated per finding from evidence directness, coverage, consistency,
  triangulation, researcher dependence, and consequence — **not** quotation count.
- As illustrated, every finding above is Low or below because coverage is thin;
  real analysis may raise a finding to Medium/High only with multi-cell, multi-
  participant consistency and at least one disconfirming case examined.
- Findings from a single participant (F5) never exceed "Very Low / single case".

### 11.3 Explicit non-claims

This study **does not** claim:

- That any reason for stopping is the most *common* one (prevalence needs a
  quantitative study).
- That any lever *causes* higher retention (that is a later randomized
  experiment).
- That findings apply to all users, all habit apps, or users beyond the two-week
  window.
- That the two-week framing itself is confirmed (R-09-style rare-use cases may
  contradict it; analytics must verify).
- That absence of a behavior in the sample is absence of that behavior in the
  population (empty cells are coverage gaps).
- That any EXAMPLE row in this document is real customer evidence.

---

## 12. Ranked opportunities for the decision owner

> Ranking method: **consequence for the decision x evidence coverage x confidence**,
> with an explicit next validation for each. All evidence references are EXAMPLE
> locators and must be re-derived from real sessions.

| Rank | Opportunity (lever) | Rationale | Affected users/contexts | Supporting / contradicting evidence | Confidence (illustrative) | Expected decision consequence | Next validation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | **Missed-day forgiveness / streak-repair** (first miss does not "break" the run; easy re-entry) | F1: the miss itself appears to trigger the stop for streak-oriented users; highest consequence because it targets the stop event directly. | Streak-oriented users, early and late drops | Support: D-01, D-04. Contradict: D-05, R-08 | Low–Medium (EXAMPLE) | Could reduce stops whose trigger is the first miss; will not affect environmental stops. | Real sessions to confirm mechanism; then analytics cohort check on "stop after first miss" prevalence; then randomized experiment. |
| 2 | **Value-recall / "why I started" nudge at day 7–10** | F2: motivation decay is the second consistent mechanism; cheap to build. | Late drops, larger/aspirational habits | Support: R-07, D-03. Contradict: D-02 (interaction-level) | Low (EXAMPLE) | Addresses the "no reason to open it" segment; needs guard against feature-wishlist bias. | Interview probe redesign; quantitative check on day-7–10 engagement dip; experiment. |
| 3 | **Weekend-gap intervention (first weekend)** | F3: weekend is a distinct gap point; but must not treat gaps as terminal (D-05). | Weekday-routine users | Support: D-04. Contradict: D-05 (return-after-gap) | Low (EXAMPLE) | Narrower effect; risks over-intervention for context-pause users. | Real sessions; verify weekend dip in analytics; then experiment. |
| 4 | **Notification recalibration** | F4: real but segment-specific; evidence does not make it top-ranked. | Notifications-off / tuned-out segment | Support: D-02. Contradict: D-01, D-03 | Low (EXAMPLE) | Segment-level gain only. | Segment-focused sessions; quantitative notification-permission cohort analysis. |
| 5 | **Accessibility/logging-friction repair** | F5: single-case but severe and ethically material; separately justified regardless of retention ROI. | Screen-reader and other access-need users | Support: D-06 (single case) | Very Low / single case (EXAMPLE) | Equity fix; retention effect unproven. | Mini co-design study with access-need users; usability test. |
| 6 | **Re-define "stop" before building** | F6: the owner's binary framing may mis-target the lever. | Rare-use/occasional segment | Support: R-09. Contradict: R-07, R-08 | Low (EXAMPLE) | Reframes the decision; may change which lever is worth building at all. | Analytics: cohort definition of "stopped" vs "rare-use" before lever selection. |

**Recommended immediate path for the owner:** run the real study (pilot gate ->
recruit 14–16 per matrix -> ledger -> analysis) to replace EXAMPLE evidence; in
parallel, have analytics answer the prevalence question for "stop" vs "rare-use"
and "stop after first miss" so the top-ranked lever is chosen on both behavioral
mechanism and prevalence — then a randomized experiment for the causal claim.

---

## 13. Decision handoff

- **Owner:** Head of Product (retention track).
- **Immediate usability defects vs strategic opportunity:** any accessibility or
  logging-friction defect found (F5) is fixed independently of the retention
  decision; the strategic choice is between lever ranks 1–3 after real evidence.
- **Policy/operational constraints:** safeguarding protocol (5.5) governs
  health-related habit topics; no data leaves the pseudonymized pipeline.
- **Unresolved questions:** whether the stop is event- or decay-shaped (RQ1 —
  pending real diary data); prevalence of each mechanism (needs analytics);
  whether rare-use users should be a target segment at all.
- **Next evidence needed:** (1) completed pilot; (2) 14–16 real sessions per the
  matrix; (3) analytics cohort definitions; (4) a randomized experiment on the
  chosen lever.
- **Open research question for later work:** whether a returned-after-gap path
  (D-05) should be designed as a first-class flow rather than an anomaly.

---

## Appendix A — Consent form outline

1. What this study is and why it is happening
2. What will happen (diary/interview, channels, duration)
3. What data is collected and how it is used
4. Recording (separate checkboxes for audio/video/diary/screenshots)
5. Who can see the data; pseudonymization; no link to product account
6. Retention (14 days raw; 24 months pseudonymized; contact data deleted at end)
7. Withdrawal rights and compensation terms (fixed, feedback-independent)
8. Safeguarding and sensitive-topic handling; skip-any-question right
9. Contact for questions and the privacy/incident contact

## Appendix B — Recruitment screener (items)

- Age 18+; current or recent (<=30 days) habit-tracking app use
- Current day-of-use for diary arm (must be <= day 14)
- Stop shape for retrospective arm (day of last use; gap history)
- Habit domain and size; prior habit-app experience; notification state
- Access needs (screen reader, low vision, motor, neurodivergence)
- Context (shift work, travel, parenting, exams, retired)
- Exclusions per Section 4.3 (minors, medically mandated tracking, crisis, company
  or competitor employment, proxy status)

## Appendix C — Pilot log

| Item | Status in this environment |
| --- | --- |
| Pilot participants recruited (2, outside team) | **Not run — pending** |
| Prompt comprehension check | Pending pilot |
| Diary tool accessibility check (incl. screen reader) | Pending pilot |
| Interview timing (target 60–75 min) | Pending pilot |
| Leading-probe review | Pending pilot |
| Safeguarding path dry-run | Pending pilot |
| Gate result -> protocol v1.1 | Pending pilot |

## Appendix D — Method references used

- `references/research-method.md` of the `research-user-needs` skill (opened before
  participant selection and interpretation; the workspace copy of the skill did not
  include the `references/` folder, so the installed copy at
  `/home/codex/.codex/skills/research-user-needs/references/research-method.md` was
  used).
- ISO 9241-210:2019 and UK Government Service Manual (user research) — as cited in
  the method reference.
