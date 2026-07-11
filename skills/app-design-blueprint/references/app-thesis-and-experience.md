# App Thesis And Experience

## Contents

1. Success contract
2. User job and falsifiable promise
3. Mechanism research
4. First-value experience
5. Recurring-value loops
6. Durable investment and belonging
7. Feedback and interface state
8. Review checklist
9. Research routes

## 1. Success contract

An app succeeds when a defined user can repeatedly reach a valuable outcome with less friction, risk, or uncertainty than credible alternatives, trusts the product with continuity, and voluntarily returns, shares, or pays. Downloads, daily opens, notifications sent, time spent, followers, and gross revenue are incomplete proxies.

Write success across six dimensions:

| Dimension | Required question | Example evidence |
| --- | --- | --- |
| User outcome | Did the promised job become meaningfully better? | completion, quality, saved effort, goal progress, user explanation |
| Experience | Was the path fast, understandable, controllable, and recoverable? | first-value time, success, undo/recovery, confusion, accessibility |
| Retention | Did users return for recurring value rather than pressure? | reason-for-return, cohort depth, saved continuity, voluntary reactivation |
| Commercial | Did value support sustainable payment or advertising? | incremental net value after fees, fraud, refunds, support, infra, acquisition |
| Trust | Did the product preserve agency, privacy, fairness, and accurate expectations? | consent/opt-out, complaints, deletion/export, refund, appeal, trust research |
| Operability | Can agents maintain quality and recover at the declared scale? | exact-candidate proof, autonomous gates, incident recovery, live readback |

Do not optimize one dimension below the hard floor of another. A retention lift accompanied by coerced use, review manipulation, inaccessible workflows, or increased refund regret is not success.

## 2. User job and falsifiable promise

Capture:

```text
primary user and excluded/non-primary modes:
trigger and context:
job and desired outcome:
current alternative and switching friction:
frequency and natural return interval:
objects/data entrusted to the product:
economic buyer and business model:
lead platform, minimum device/browser, locale, and connectivity:
```

Promise formula:

```text
For <specific user in context>, the app helps them <observable outcome>
through <distinctive mechanism>, with first value evidenced by <event/result>.
```

`thesis-1` — A feature is not a promise. “AI, social, rewards, analytics, and cross-platform” describes means, not the changed user state.

`thesis-2` — Choose a primary user/context even when architecture supports global, cross-platform, and age-appropriate modes. Universal reach is a capability objective, not permission to avoid product decisions.

`thesis-3` — Treat willingness to return, share, and pay as hypotheses about delivered value. Do not infer causation from a leader's feature list.

## 3. Mechanism research

For each relevant comparator record:

```text
observed mechanism:
user job and context:
likely value mechanism:
tradeoff and harmed cohort:
implementation/state dependency:
transfer hypothesis:
smallest human and machine proof:
```

Sweep successful mechanism classes, not brand checklists:

| Mechanism class | Durable value hypothesis | Common failure |
| --- | --- | --- |
| Instant utility | result before commitment lowers activation cost | empty setup flow or account wall |
| Templates/defaults/import | users start from a useful state | generic template clutter |
| Saved continuity | work and preferences compound across sessions/devices | hostage data or sync corruption |
| Goal/progress visibility | clear next step supports competence | arbitrary progress meters |
| Creation/customization | authorship and identity increase ownership | long mandatory setup before value |
| Collaboration | shared state and reciprocity create network value | notification spam and permission confusion |
| Sharing artifacts | recipient gets useful, expressive, or status-bearing value | link spam or misleading previews |
| Personalization | relevance improves with explicit and observed preferences | opaque profiling or filter bubbles |
| Content/community | fresh supply and participation deepen value | low-quality feed, moderation debt |
| Recognition/reputation | mastery and contribution remain visible | status anxiety or permanent newcomer exclusion |
| Ritual/streak | continuity celebrates meaningful practice | loss aversion, chores, health pressure |
| Integrations/automation | the app becomes part of a real workflow | brittle lock-in and hidden failures |
| Commerce/entitlement | payment cleanly expands valuable capability | monetized frustration or confusing access |
| Cross-product graph | related products reduce discovery and setup cost | house-ad overload and cross-app tracking |

`research-1` — First-party case studies can reveal mechanisms and instrumented hypotheses, but cannot prove transfer. Preserve population, metric, design, and publication-bias limitations.

`research-2` — Build the reusable primitives now. Default presentation still follows the app promise, attention budget, and authority state.

## 4. First-value experience

Storyboard:

```text
cold launch
-> first stable interactive state
-> first meaningful action
-> immediately understood feedback
-> useful result
-> saved or shareable continuity
-> optional identity/personalization investment
-> self-chosen next action or clean exit
```

For every beat specify target time as a contextual hypothesis, dependency, input burden, data/permission/account/payment interruption, failure, recovery, offline behavior, accessibility alternative, and event.

### Friction ordering

Prefer, when semantically possible:

1. useful sample, local action, template, preview, import, or guest result;
2. explain what saving/sync/collaboration unlocks;
3. offer account or device link;
4. ask contextual permission only at the value moment;
5. introduce deeper customization and commerce after the user understands the exchange.

Do not force this sequence when identity, regulated consent, security, or data authority is intrinsically required. State the reason.

`ftux-1` — Rendering quickly and reaching value quickly are separate metrics.

`ftux-2` — A mandatory avatar, questionnaire, contact upload, notification prompt, or tutorial can create investment but also abandons users before proof. Use meaningful defaults, skip/resume, and staged personalization.

`ftux-3` — First use should demonstrate the product's recurring value loop, not a disposable reward loop.

## 5. Recurring-value loops

Map the natural loop rather than forcing daily cadence:

```text
real trigger or chosen goal
-> resume trusted state
-> meaningful action/decision
-> outcome and feedback
-> durable progress, creation, relationship, or learning
-> visible next opportunity
-> clean stop
```

Choose a cadence that matches the job: per event, daily, weekly, monthly, seasonal, or irregular. A tax app and a language app should not share a daily-login KPI.

### Retention portfolio

- **Utility continuity**: saved state, history, preferences, templates, automation, integrations.
- **Progress**: goals, mastery, milestones, insight over time, completion and recap.
- **Creation**: drafts, collections, profiles, designs, playlists, workspaces, configurations.
- **Relationships**: shared objects, comments, presence, reciprocity, group memory, mentorship.
- **Fresh value**: new content, recommendations, releases, community supply, timely state changes.
- **Recognition**: contribution, achievement, reputation, portfolio, history, status with newcomer paths.
- **Recovery**: recap, preserved context, catch-up, changed-value explanation, no punishment for absence.

Notifications, emails, widgets, rewards, and streaks can reconnect a user to these loops. They are not the reason the loop deserves to exist.

`retention-1` — Measure return reason and depth, not occurrence alone. Segment by acquisition, version, platform, locale, device/accessibility, payer, collaboration, and lifecycle state.

`retention-2` — A comeback offer must expose genuinely useful changed value. Do not train churn by making absence more rewarding than continued use.

`retention-3` — Give clean exits and healthy stopping points. Durable retention is compatible with short sessions and irregular use.

## 6. Durable investment and belonging

Translate “sunk cost” into earned ownership, identity, competence, and relationships. The goal is that continued use remains valuable—not that leaving destroys value.

### Durable Investment Contract

```text
user-owned or earned state:
why it represents utility, authorship, identity, mastery, history, or relationship:
canonical authority and sync/version rules:
recovery, export, portability, deletion, and account-merge behavior:
returning-user restoration and recap:
visibility and privacy controls:
commercial/entitlement interaction:
sunset, migration, and shutdown treatment:
```

Good investment surfaces include optional profile expression, reusable templates, saved preferences, creations, collections, documented mastery, contribution history, trusted collaborators, and portable reputation where appropriate.

Use two-stage personalization:

1. a fast, meaningful starter choice with a strong default and skip;
2. deeper identity/customization after the first competence or value moment.

Hard prohibitions:

- threaten deletion or public loss after inactivity;
- make export, recovery, or deletion intentionally difficult;
- force subscription solely to retain access to user-created work without a disclosed data-transition policy;
- erase earned history to sell restoration;
- use shame, social pressure, or permanent streak loss as the primary return mechanism;
- create permanent veteran/status dominance without newcomer contribution paths.

`investment-1` — Track creation reuse, restoration, collaboration depth, perceived ownership, export/recovery success, regret, and trust—not “time already spent” as a target KPI.

`investment-2` — More setup time is not automatically more attachment. Test whether each investment improves later value enough to justify its activation cost.

## 7. Feedback and interface state

Every material action needs a semantic response chain:

```text
intent acknowledged
-> local/pending state
-> authoritative commit or failure
-> user-understandable consequence
-> undo/retry/reconcile/support path
```

Specify for each action:

- source of truth and conflict behavior;
- response latency budget and degraded behavior;
- loading, empty, offline, stale, partial, error, permission-denied, and success states;
- visual, text, audio, haptic, and assistive-technology feedback as applicable;
- optimistic correction and duplicate-action prevention;
- undo window, history, version recovery, and support evidence.

`feedback-1` — Do not use celebratory effects to conceal an uncommitted transaction, unresolved sync, failed share, or destructive action.

`feedback-2` — Effects and audio create hierarchy and vibe. Constant maximum intensity lowers clarity, accessibility, battery life, and emotional contrast.

`feedback-3` — Private feedback and public review solicitation are separate state machines owned by `review-solicitation-and-feedback-loop`. Negative sentiment may trigger support, but may not suppress a platform review route offered to otherwise eligible users.

## 8. Review checklist

- The target user/job/context and promise are falsifiable.
- First value arrives before unnecessary account, permission, profile, notification, or payment friction.
- The recurring loop follows real value cadence rather than a forced daily metric.
- Durable investment is recoverable, portable, privacy-controlled, and non-hostage.
- Every state-changing action has pending, commit, failure, retry, correction, undo, and support semantics.
- Comparator mechanisms include tradeoffs and transfer proofs.
- Retention, commercial, sharing, and review tactics have trust and fatigue countermetrics.
- Presentation density remains coherent while legitimate capabilities stay discoverable and available.

## 9. Research routes

These sources informed this original synthesis and were reachable or source-verified on 2026-07-11. Retrieve living policies again for the exact product.

- [Apple Human Interface Guidelines: Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding) and [Launching](https://developer.apple.com/design/human-interface-guidelines/launching) — contextual onboarding and launch experience routes.
- [Android core app quality](https://developer.android.com/docs/quality-guidelines/core-app-quality) — current platform quality route.
- [Duolingo streak research](https://blog.duolingo.com/how-duolingo-streak-builds-habit/) — first-party evidence that specific streak/flexibility changes affected its metrics; use as a contextual hypothesis, not a universal law.
- [Spotify Wrapped](https://newsroom.spotify.com/2025-wrapped/) — first-party example of personalized identity artifacts designed for sharing.
- [Canva sharing guidance](https://www.canva.com/help/share-via-link-or-email/) — recipient-controlled collaboration/sharing mechanism reference.
- [Self-determination theory and video games](https://doi.org/10.1007/s11031-006-9051-8) — autonomy, competence, and relatedness as motivation hypotheses; not a complete retention formula.
- [The IKEA effect](https://doi.org/10.1016/j.jcps.2011.08.002) — evidence that effortful creation can affect valuation in context; never use it as justification for needless friction or hostage value.
- [Trustworthy Online Controlled Experiments](https://doi.org/10.1017/9781108653985) — causal experiment discipline and guardrails.
