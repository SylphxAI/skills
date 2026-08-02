# Harness Goal Binding for Product Betterment Loops

## Purpose

Many agent harnesses expose a **Goal System** that persists objectives across
turns and can auto-continue after an accidental stop. Continuous product
betterment must use that system when present so the **engagement** is not lost
when a session ends mid-cycle, and so `complete` cannot be claimed without
evidence.

This is **harness recovery + termination gate**, not product Work authority.
Enact (when available) still owns Work/claims/runs; Git owns source; delivery
systems own deploy/live proof. The Goal API status write is **not** an automatic
evidence verifier—the agent must attach a Stop-Audit package in durable
contract/output.

## Rule: uncapped betterment goals

When the runtime provides goal APIs:

| Step | Action |
| --- | --- |
| Start / resume | `get_goal`. If none or wrong objective, `create_goal` |
| Budget | **Omit budget caps** (for Codex: omit `token_budget`) unless the user explicitly sets a budget |
| Resume | Every cycle/tick begins with `get_goal` and continues the same engagement |
| Complete | Only when **Stop-Audit package** satisfies **idle predicate** for declared scope |
| Blocked | Only after the harness strict blocked audit (repeated hard impasse) |

**Do not** attach a token/time budget “for safety” by default. A budget cap
stops recovery precisely when long betterment needs continuation.

## Objective string contract

The goal `objective` must be self-contained for recovery. Include:

1. **Job:** high-leverage continuous product betterment (not one bug/polish pass)
2. **Product identity:** repo/product/release/surfaces in scope
3. **North-star outcomes (1–3)** and explicit non-goals
4. **Aspect set** / matrix families in scope
5. **EV policy:** MinOutcomeDelta; leverage ranking (not ease-first)
6. **Definition of Done / idle predicate:** floors fresh; committed backlog B
   cleared or legally rejected; residual R has no unblocked EV ≥ threshold;
   Stop-Audit passed; wake durable—**not** product perfection
7. **Validation gates:** original-oracle per Work; cycle outcome/frontier
   readback; Stop-Audit package before complete
8. **Contract pointer:** revision/id of Product Quality Loop Contract (B/R live
   there—not the full backlog stuffed as sole SSOT in the goal string)
9. **Authority floors:** no meta-router; no invented credentials/deploy;
   commercial/legal/irreversible need owner authority
10. **Current next safe action**
11. **Composition:** `continuous-product-quality`; `decision-quality-standard` +
    `evidence-and-claims-standard` for rank/stop/claims; `autonomous-execution`
    per Workstream; specialists via native discovery

### Template (adapt; keep compact but complete)

```text
Operate high-leverage continuous product betterment for <PRODUCT/REPO>.
North-star outcomes: <O1..O3>. Aspects: <ASPECTS>. Non-goals: <...>.
Maintain Product Quality Loop Contract <CONTRACT_ID/REV>: Candidate C,
committed backlog B (all above MinOutcomeDelta under capacity—may be many),
residual R with EV/blockers. Execute entire B with original-oracle readback;
re-admit R when capacity/evidence changes. Idle only after Stop-Audit proves
no unblocked residual EV ≥ MinOutcomeDelta; not perfection; not one PR.
No token budget cap. No continuous independent reviewers. Next safe action: <ACTION>.
```

## Lifecycle

```text
get_goal
  -> missing/mismatch -> create_goal(objective, NO budget)
  -> active -> run betterment cycle work
        -> B still open or R has unblocked high-EV -> leave goal active
        -> Stop-Audit package passes idle predicate -> update_goal(complete)
        -> true multi-turn impasse -> update_goal(blocked) only after audit
```

On a later wake (new signal, owner request, freshness miss):

- if previous goal completed at idle, `create_goal` a new uncapped goal for the
  new cycle with same product identity and updated outcomes/action;
- do not silently shrink the objective to the last patch;
- capacity splits keep the **same engagement/goal** until B/R policy is satisfied.

## Goal vs reviewer

| Layer | Role |
| --- | --- |
| Goal + Stop-Audit package | Primary termination authority for the engagement |
| Oracles / delivery evidence | Proof Work actually improved the product |
| Independent reviewer | **Exception only:** irreversible/public-contract, load-bearing SOTA claim, contested Stop-Audit |
| Continuous in-loop reviewer | **Forbidden** as default architecture |

## Mapping across harnesses

| Harness capability | Betterment binding |
| --- | --- |
| Explicit Goal API (e.g. Codex `create_goal`/`get_goal`/`update_goal`) | Required when operating this Skill |
| Goal API with optional budget field | Omit budget unless user explicitly requests one |
| No Goal API | Residual: durable contract + scheduler/wake only; state the gap |
| Enact Work Graph also present | Goal recovers the **loop engagement**; Enact owns individual Work items |

## Anti-patterns

- Creating a goal with a token budget “just in case”
- Completing the goal when one Work lands, CI is green, or “a few polishes shipped”
- Objective that only says “improve the product” with no outcomes/idle/EV policy
- Putting the entire frozen mega-list as sole SSOT in the goal with no contract pointer
- Replacing Enact/Git/delivery authority with the harness goal
- Using goal completion to claim the product is perfect or SOTA without claim-grade evidence
- Skipping `get_goal` on resume and starting a narrower ad-hoc task
- Treating Goal API success as proof without Stop-Audit package

## Minimum evidence in Skill output

When a Goal System exists, the operating output must state:

- goal created vs resumed;
- budget omitted (or user-explicit budget, if any);
- active objective digest/summary;
- whether B/R summary and Stop-Audit ran;
- whether the goal remains active, completed at idle frontier, blocked, or
  unavailable.
