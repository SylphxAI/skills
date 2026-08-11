# Critical Analysis Brief — Should the migration be re-planned?

Prepared with the `analyze-critically` method (evidence ledger, bounded competing
hypotheses, discriminating-evidence matrix, Team A/Team B, premortem, calibrated
conclusion). Scope and search boundary are recorded in Section 2 so inference
does not silently migrate into the facts column.

---

## 1. Question and stakes

**Question.** The team keeps delivering half-finished migrations. Is the
correct action to **re-plan the migration**, or does re-planning risk becoming
another episode of the same pattern?

**Decision relevance.** The choice selects between two materially different
actions:

- **Re-plan**: stop the current sequencing, redefine scope/terminal, reassign
  ownership, and restart execution.
- **Don't re-plan (finish)**: keep the current plan, close the remaining gaps,
  and treat "half-finished" as an execution problem the current plan can absorb.

**Stakes.** A wrong re-plan burns schedule and trust and can produce the very
churn it was meant to fix (new planning artifacts become new "closes").
A wrong *non*-re-plan extends a cycle in which items are closed, re-opened, and
re-closed, with the residual risk that a "closed" migration gap causes a
customer-visible production failure. Both failure modes are visible in the
record, so the verdict must be conditional on what the re-plan actually changes.

---

## 2. Observed facts, evidence quality, and search boundary

### Evidence ledger

| Item | Type | Quality | Effect on analysis |
| --- | --- | --- | --- |
| The program has a normative migration spec and inventory: `docs/specs/2026-08-07-gateway-clean-break-architecture.md`, `docs/reference/residual-delete-inventory.json`, `docs/reference/authority-matrix.json` | observation | local repo snapshot, dated 2026-08-07/08 | constrains: "the migration" is a defined, tracked program |
| `authority-matrix.json` declares `implementation_status: "non_conformant"` (2026-08-07) | observation | same snapshot | migration officially not finished |
| Inventory: 21 residual items, terminal rule *"Conformance requires zero open item. Moving, fencing, disabling, documenting, or renaming a predecessor does not close deletion"*; 20 closed, 1 open (`observability_and_slo_gap`) as of 2026-08-08 | observation | same snapshot | scale of remaining work is small; but the rule keeps being re-applied |
| Main-branch history (2026-08-08) shows ≥19 consecutive commits that close, re-close, or restore residuals: `#1809` "close proven residuals", `#1816` "re-close proven residuals", `#1817` "close proven edge residuals", `#1822` "restore residual closes after console rename thrash", `#1823` "never passthrough residual dialect on response.failed" | observation | git log, one repo, one day | repeated closes of already-"proven" items — core evidence of the half-finished pattern |
| Multiple parallel worktrees in this environment contain overlapping commits for the same migrations (console rename `1e303a033` vs merged `#1819`; `commercial_handlers` split `d649b297a` vs merged `#1821`; packaging-topology close `61acd57c1` vs merged `c5cf6bf19`) | observation | local worktree snapshots (Aug 8–10) | duplicated parallel delivery; custody ambiguity |
| `scripts/check-migration-safety.ts` documents that the CI gate exists because "a human reviewer would catch these; per the doctrine's no-human-reviewer delivery model, this encodes that catch as a CI gate" | observation | committed source | verification is rule-based and post-hoc, added after misses |
| Clean-break status doc (2026-08-07): "Clean-break **not complete**. request-contracts dual-oracle tree + web proxy bootstrap remain"; lists passing tests and gates for scoped splits | observation | committed doc | capability is demonstrated on bounded, contract-defined work |
| `MEMORY.md` tracks effect-migration bookkeeping (~175 `runPromise` bridges, asserted to be "deliberate boundary, not a migration shortcut") | observation | committed memory file | in-flight seams are normalised in the record |
| This task's workspace contains no migration repo; the artifacts above are the nearest authoritative material | observation | environment state | scoping assumption, see below |
| Re-opened "proven" residuals mean verification failed to discriminate durable completion | inference | from the git log | drives the leading hypothesis |
| Duplicated parallel work means no single end-to-end owner | inference | from worktree comparison | drives the custody hypothesis |
| "Done" is defined at repo-state layer (zero open inventory items) rather than customer-visible behavior | inference | from inventory rule + thrash | drives the definitional hypothesis |
| The team is capable: scoped migrations land complete with passing tests | inference | from god-file status doc | kills the capability hypothesis |
| The `/tmp/sai-*` artifacts belong to the migration program the user means | assumption | untested | if false, verdict may not transfer |
| No live production incident caused by a "closed" residual has occurred recently | assumption | unknown | if false, stakes rise sharply |
| The observed pattern is representative, not a survivorship artifact of failed attempts | assumption | untested | if false, base rates change |
| Live production/customer-visible state of the migration | unknown | would require deploy evidence | high value, not acquired this run |
| PR descriptions and review notes behind the Aug 8 commits | unknown | cheap to acquire | would sharpen H3/H4 |
| Whether a prior re-plan was attempted and failed | unknown | cheap to acquire | directly informs the verdict |

### Bounded search performed

Loaded the matching skill (`analyze-critically`) and its method references;
inspected `/tmp/sai-*` migration worktrees; read `git log` on
`/tmp/sai-obs` (main), the residual inventory, the authority matrix, the
clean-break status doc, `MEMORY.md`, and the migration-safety gate. Not
verified in this run: live production state, the fleet's other repos, PR
review content, or the specific repo the user may have meant. These are the
honest limits of the evidence below.

---

## 3. Competing hypotheses

Bounded set of materially distinct explanations (H1–H4 can coexist as
contributing causes; H5 is the mutually exclusive opposing explanation):

- **H1 — Wrong terminal layer (definitional).** "Done" is defined as zero
  open items in a repo-state inventory. The customer-visible end state is not
  the terminal. Every close of a repo-state item therefore reveals a deeper
  layer, producing an unbounded close→re-open→re-close cycle.
- **H2 — Verification gap.** The delivery model's gates are post-hoc rule
  checks (migration-safety, SSOT, packaging checks). They certify
  form, not behavior, so half-finished migrations pass as green and are only
  caught by later "restore"/"re-close" commits.
- **H3 — Fragmented custody.** No single owner is accountable for the
  end-to-end, customer-visible end state. Parallel agents/teams deliver
  overlapping slices (duplicate renames, duplicate splits), so completion is
  nobody's job and thrash is everyone's.
- **H4 — Throughput incentives.** The pipeline rewards landed closes (commit
  and PR velocity), so a "close" is the unit of delivery and durable
  completion is not priced in; half-finished is the equilibrium, not the bug.
- **H5 — Capability deficit (status quo).** The team cannot finish the
  migration; re-planning is therefore futile. Weakest hypothesis on the
  evidence: the same team/context completes tightly scoped migrations with
  passing tests and gates.

---

## 4. Discriminating evidence

Evidence that separates the hypotheses; rows are from the same repo/artifacts
and are **correlated, not independent** observations — treat the updates
accordingly.

| Evidence | H1 wrong terminal | H2 verification gap | H3 fragmented custody | H4 incentives | H5 capability deficit |
| --- | --- | --- | --- | --- | --- |
| "Proven" residuals re-opened and re-closed after a rename (`#1816`, `#1817`, `#1822`) | strongly favors | strongly favors | neutral | favors | contradicts (re-closing requires capability) |
| Duplicate commits for the same migration across parallel worktrees | neutral | neutral | strongly favors | favors | neutral |
| Tightly scoped splits land complete with passing tests and gates | neutral | favors (scope saved them) | neutral | neutral | contradicts |
| CI gate text admits it encodes the human-reviewer catch post-hoc | neutral | strongly favors | neutral | favors | neutral |
| Inventory rule forbids rename/fence/move from closing an item, yet closes later require re-closing | strongly favors | favors | neutral | neutral | neutral |

### Semi-quantitative update

- **Prior basis** (reference class: migration programs tracked by
  conformance inventories; planning-fallacy base rates): H1 ≈ 0.25, H2 ≈ 0.25,
  H3 ≈ 0.15, H4 ≈ 0.15, H5 ≈ 0.20.
- **Posterior ranking** (single source, correlated rows, so wide ranges):
  H1 ≈ 0.30 (0.25–0.40), H2 ≈ 0.30 (0.20–0.40), H3 ≈ 0.20 (0.10–0.30),
  H4 ≈ 0.15 (0.10–0.25), H5 ≈ 0.05 (0.02–0.15).
- **Sensitivity**: if the worktrees turn out to be unrelated experiments
  rather than one program, H3 drops toward 0.10 and H1/H2 absorb the mass. If
  a production incident tied to a "closed" residual surfaces, H5 becomes
  irrelevant and H1/H2 approach 0.8 combined. The verdict below is robust to
  either shift because it is conditional on the re-plan's content, not on a
  single winning cause.

---

## 5. Strongest case for and against re-planning

### Team A — re-plan (leading case)

- The observed cycle is definitional/verification, not execution: items that
  were "proven" closed needed re-closing (`#1816`, `#1817`, `#1822`). Under a
  wrong terminal contract, every finishing sprint will keep producing
  half-finished migrations — that is not a runout problem, it is a plan
  problem.
- No single end-to-end owner is visible, and duplicated parallel work proves
  it. Re-planning is the only step that can assign custody of the
  customer-visible end state.
- The cost of a correctly scoped re-plan (redefine done + name owner + add
  live verification) is small relative to the visible cost of the existing
  thrash (≥19 closure commits in one day, one of which was literally a
  "thrash" repair).
- Residual risk is live: `#1823` ("never passthrough residual dialect on
  response.failed") is a request-path defect caught late — evidence that
  half-finished state leaks into behavior.

### Team B — don't re-plan (strongest opposing case)

- The inventory is 20/21 closed within a week; one concrete item
  (`observability_and_slo_gap`) remains. The marginal work is small and
  defined — the cheapest path is to finish it.
- Re-planning mid-flight is itself the failure mode that produced the thrash:
  a re-plan that only re-sequences work, adds planning artifacts, or spins up
  more parallel delivery would reproduce the pattern exactly, with a new
  label.
- The dense Aug 8 history may be one unusually active wave of many distinct
  migrations (rename, splits, deletions), not evidence that any single
  migration is half-finished; the base rate of "last mile is the hardest" is
  high.
- Momentum and verification tooling exist; stopping to re-plan spends the
  goodwill needed to close the last mile.

---

## 6. Assumptions and failure paths

### Key-assumptions check (most fragile first)

1. **Artifacts represent the user's migration.** If the user means a specific
   repo/migration not present here, the diagnosis may not transfer. Testable:
   name the repo; the framework still applies.
2. **The pattern is representative, not survivorship.** If failed attempts
   were simply deleted and only near-misses remain visible, H1/H2 are
   over-ranked. Testable: sample other fleet repos for similar
   close→re-open→re-close commits.
3. **No hidden external blocker** (prod incidents, dependency chain,
   platform freeze). If present, re-planning is misdirected. Testable: check
   incident log — cheap.
4. **A re-plan can change the terminal contract.** If the terminal is owned
   outside the team's authority, re-planning locally is theater. Testable:
   confirm who owns the inventory's terminal rule.

### Premortem

- **Assume re-plan happens and the migration still ships half-finished.**
  Credible causes: the re-plan re-sequences without redefining "done"; the
  named owner gets responsibility without authority over gates and terminal;
  verification remains rule-based; the re-plan itself becomes another
  "close" item. Leading indicators: first planning doc that leaves the
  terminal rule unchanged; owner role with no decision rights; no new
  live-verification step in the plan.
- **Assume no re-plan and the migration ships half-finished.**
  Credible causes: the last open item drags without a dated owner; the next
  close re-opens (recurrence); a residual-dialect defect reaches production.
  Leading indicator: any new "restore/re-close" commit after `#1827`.

---

## 7. Verdict and reasons

**Verdict: Re-plan — but only conditionally, and only if the re-plan changes
the terminal contract and names a single end-to-end owner. If it does not do
both, do not re-plan; finish the last open item under a dated, named owner
with behavior-verified done.** This is a conditional yes, not a blanket one.

**Reasons.**

1. **The pattern is definitional, not a runout problem.** Items marked
   "proven" closed were re-opened and re-closed (`#1816`, `#1817`, `#1822`);
   the inventory's own terminal rule ("moving, fencing, disabling,
   documenting, or renaming … does not close deletion") is being applied
   retroactively to closes. That is the signature of a terminal defined at the
   repo-state layer (zero open items) instead of customer-visible behavior.
   Re-sequencing under the same terminal reproduces the pattern; only a
   re-plan that redefines "done" breaks it.
2. **Verification is too shallow to certify completion.** The safety gate
   explicitly encodes what a human reviewer would have caught, post-hoc. A
   re-plan must make the terminal verification behavioral and live (closed
   items stay closed in production for a defined soak, verified by deploy
   evidence), or half-finished deliveries will keep passing as green.
3. **Custody is fragmented.** Duplicate parallel commits for the same
   migrations (rename, split, residual close) show no single owner of the
   end state. Re-planning must assign one accountable owner for the
   customer-visible end state, with authority over the terminal definition
   and gates — otherwise the re-plan is a label change.
4. **Capability is not the cause.** The same team/context completes tightly
   scoped migrations with passing tests and gates. The fix is therefore in
   the plan (terminal, ownership, verification), not in more effort or a
   different sequencing of the same plan.
5. **Why not "just finish"?** Finishing is correct only if the remaining
   item closes durably. The record gives no reason to expect that: the last
   several closes each needed follow-up closes. A conditional re-plan is the
   cheapest way to test that — if the re-plan cannot change the terminal
   contract, the evidence says finishing without an owner is likely to
   produce another half-finished delivery.

**Calibrated confidence (decomposed).**

- Confidence in the factual premises (artifact snapshots, not re-verified
  live): ~0.80.
- Confidence that the hypotheses cover the material space: ~0.70 (bounded
  search; external blockers and other repos unchecked).
- Confidence in the verdict conditional on those premises: ~0.70.
- **Overall confidence: ~0.55–0.65** — a genuine conditional verdict, not a
  close call that a cheap observation would flip.

---

## 8. What would change the conclusion

- **A re-plan already drafted that changes the terminal contract and names an
  end-to-end owner** → verdict strengthens to "yes, proceed with re-plan".
- **The remaining item (`observability_and_slo_gap`) closes once and stays
  closed, with a named owner and live/deploy verification** → verdict
  flips to "no re-plan; the plan was finishable; monitor for recurrence".
- **Any new "restore/re-close" commit after `#1827`** → strongly confirms
  H1/H2 and makes re-planning near-certain.
- **A live production incident traced to a "closed" residual** → stakes
  escalate; re-plan becomes urgent and near-unconditional.
- **Evidence that a previous re-plan already changed the terminal contract
  and still failed** → challenges H1; the cause would shift toward execution
  or ownership, and the verdict would be revised toward finishing under
  tighter ownership.

**Next discriminating observation to seek (cheapest, highest value):** the
disposition of `observability_and_slo_gap` over the next days, plus whether
any "restore" commit follows — this single observation separates H1/H2
(recurrence) from the finishable-plan hypothesis (clean close) and would move
the verdict more than any additional review of the history.
