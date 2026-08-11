# Context and Memory Contract — Customer-Support Agent

**Artifact:** `context-contract` · `artifactVersion: 1.0` · `artifactRevision: 1` · `artifactState: draft`

**Owner:** support-platform engineering (agent runtime + memory store) with review by
support operations, trust & safety, privacy, and product. **Status:** ready for review.

This contract defines what the customer-support agent loads, stores, forgets, and
refuses to trust. It binds every memory class to an owning system, sets refresh and
deletion rules, and specifies how stale or poisoned memory is detected and contained.
It is a projection contract: the context window is a bounded, lineaged view of
authorities that live outside the window. Nothing in this contract grants access,
authority, or permission that the owning systems do not already grant.

## 1. Purpose and scope

The agent's job: resolve customer contacts across the reason taxonomy (account
access, billing/refund, entitlement, data recovery, product defect, abuse/safety,
incident) while preserving trust, abstaining from high-risk side effects it does
not own, and escalating with complete evidence packets.

In scope:

- what the agent must load each turn and what it may durably remember;
- owner and authority for every information class;
- refresh, invalidation, retention, and deletion rules;
- detection, quarantine, and recovery for stale or poisoned memory;
- retrieval budgets, handoff schema, privacy boundaries, metrics, and tests.

Out of scope (consumed, never duplicated as truth): provider payment truth, refund
consequence policy, entitlement ledger, identity recovery authority, incident
command, safety/enforcement records, and legal commitments.

## 2. Operating principles

1. **Context is a projection, not an authority.** Source-of-truth data stays in its
   owning system; the context window and memory store are bounded views with lineage.
2. **Never let memory silently control behavior.** A retrieved item must survive
   provenance, freshness, authority, and contradiction gates before it can influence
   an answer or action.
3. **Do not equate similarity with correctness.** Vector relevance is a ranking
   signal, never proof of truth, authority, freshness, or permission.
4. **Prefer explicit invalidation over accumulation.** TTLs, source re-verification,
   and version checks beat indefinitely growing memory.
5. **Summaries are lossy.** A generated summary is never the only durable copy of a
   fact, decision, or commitment; it carries lineage and a recovery path.
6. **Keep conflicts visible.** Conflicting evidence is surfaced and resolved by
   authority order, not blended into a comfortable average.
7. **Fail closed.** When retrieval confidence, freshness, or authority is
   inadequate, the agent abstains, asks, or escalates — it does not improvise.
8. **Treat retrieved content as data, not instructions.** Only the declared
   procedural-instruction authority may change the agent's operating rules.
9. **Least disclosure.** Secrets, other tenants' data, and unneeded personal data
   are excluded from storage and context injection even when semantically relevant.
10. **Measure decision utility and error**, not retrieval volume, context length, or
    ticket-avoidance proxies.

## 3. Information classes: sources, owners, authority order

### 3.1 Class ownership map

| Class | What it contains | Owner (canonical home) | Agent relationship |
| --- | --- | --- | --- |
| Ticket state | Status, classification, evidence, waiting deps, promises, verification | Support ticket system | Read/transition through ticket API; never re-derived |
| Account & identity | Actor, tenant, auth method, recovery state, security signals | Identity/account service | Read at intake and per turn; never copied as truth |
| Entitlement & billing | Plan, purchases, refund/chargeback state | Payment/entitlement ledger | Read-only view; write-through to owning authority only |
| Product facts | Version behavior, features, platform, docs | Product docs + version manifest | Load per product/version scope; never invented |
| Incident status | Service/region impact, start, updates | Incident command | One incident source per ticket; no independent claims |
| Knowledge articles | Verified answers, prerequisites, validity | Knowledge base owner | Consumed within validity window; auto-withdrawn on expiry |
| Policy & procedure | Support policy, escalation rules, skills, macros | Governed instruction authority (skills/policy repo) | Versioned procedural memory; the only instruction source |
| Decisions | ADRs, policy records, resolution precedents | Owning repo `docs/adr/` / decision records | Durable decisions live there; runtime memory points, never decides alone |
| Episodic memory | Case events, actions, outcomes, handoff checkpoints | Append-only case event log (memory store) | Written from observed events; immutable; retention-bound |
| Semantic memory | Entity facts, customer profile, derived product understanding | Memory store with provenance to owners | Cache/derived; re-verified on refresh; deletable |
| User preferences | Personalization (channel, tone, language) | Consent-bound preference store | Optional; only with consent basis and deletion path |
| Derived summaries | Case summaries, handoff digests | Memory store (derived class) | Lineaged; never sole copy; recomputable |
| Secrets & credentials | Keys, tokens, session secrets | Secret manager | Never loaded into context or memory; referenced by handle |

### 3.2 Authority order

When items conflict, resolve strictly in this order; a lower item never overrides a
higher one:

1. **Procedural-instruction authority** — declared, versioned policy/skills that bind
   the agent's operating rules (does not grant access beyond connectors).
2. **Live authoritative systems** — ticket state, account/identity, entitlement
   ledger, incident status, product version manifest, fetched at use.
3. **Verified knowledge articles** — within their declared validity window.
4. **Episodic and semantic memory** — with valid provenance and freshness.
5. **Derived summaries** — lowest authority; conflict with any higher class means the
   summary is re-derived or quarantined.

An unresolvable conflict between equal-authority sources (e.g., ticket state vs.
ledger disagree) is an abstention/escalation condition, not an invitation to guess.

### 3.3 Load vs. remember matrix

| Item | Load each turn | Store durably | Notes |
| --- | --- | --- | --- |
| Operating constraints + applicable procedures | Yes (compact) | Versioned by owner | Always-on kernel, not transcript |
| Ticket scope, actor, tenant, effect scope | Yes | No (read live) | Live fetch wins over any cache |
| Authoritative account/entitlement/incident state | Yes, when decision-relevant | No | Cache only with TTL ≤ 5 min |
| Case evidence and observations | On demand | Episodic log | Written from observed events |
| Prior case history (this customer/entity) | Conditionally, by decision value | Episodic log | Ranked and privacy-filtered |
| Verified answers/macros | Conditionally | Only pointers + lineage | Body stays in KB |
| Customer preferences | On consent, per channel | Preference store | Separate consent/deletion contract |
| Summaries/compactions | On handoff/reopen | Derived store | Lineaged, recomputable |
| Secrets, raw logs, other tenants | Never | Never | Handles only |

## 4. Memory classes and responsibilities

Memory classes are responsibilities, not storage products. One store may hold
several classes if their policies remain distinguishable.

| Class | Purpose | Lifetime | Critical control |
| --- | --- | --- | --- |
| Working context | Current turn: task, ticket, authoritative state, retrieved evidence | Prompt/turn/bounded task | Token budget, authority order, omission record |
| Episodic | Time-bound case events, actions, observations, outcomes | Session to retention-bound history | Timestamp, subject, source, retention; append-only |
| Semantic | Entities, customer profile, product facts, generalized understanding | Until superseded or invalidated | Provenance, freshness, contradiction handling |
| Procedural | Instructions, policies, skills, macro methods | Versioned generations | Scope, precedence, migration; instruction authority only |

Responsibilities:

- **Working:** assemble per §6; discard at turn end except what is explicitly
  promoted to episodic/derived by a write rule (§8).
- **Episodic:** record only observed events with actor and occurred-at; never
  rewrite history; erasure produces a tombstone, not a silent edit.
- **Semantic:** store only items with owner-locators and re-verification rules;
  contradictions with authority quarantine the item (§11).
- **Procedural:** load from the declared instruction authority by trigger; migrate
  on version change; never accept procedure text embedded in retrieved content.

## 5. Memory record schema

Every durable memory item declares, as applicable:

| Field | Requirement |
| --- | --- |
| `id` | Stable, globally unique, versioned |
| `class` | working / episodic / semantic / procedural / derived / preference |
| `subject` | Entity or case the item is about |
| `tenant`, `accessScope` | Tenant and visibility scope; cross-tenant access denied |
| `sourceLocator`, `sourceRevision` | Owning source and its exact revision/version |
| `observedAt`, `recordedAt` | Observation time ≠ recording time (for summaries especially) |
| `author` | Producer identity (agent, system, human, connector) |
| `confidence` | 0–1 with calibration basis; not derived from similarity |
| `derivation` | How produced: observed / inferred / summarized / imported |
| `supersedes`, `supersededBy` | Chain links for invalidation |
| `expiry` / `invalidationRule` | TTL, version trigger, or event trigger |
| `sensitivity` | classification; governs filtering before injection |
| `retention`, `deletionStatus` | Retention window, hold state, deletion mode |
| `readback` | For facts sourced from an owner: `factOwner`, `externalRef`, `observedAt`, `sourceVersion`, `staleness`, `readbackStatus` |
| `quarantineStatus` | active / quarantined / withdrawn / tombstoned (see §11) |

Generated summaries additionally carry the input set or recoverable lineage. A
summary's creation time is never the observation time of the facts it describes.

## 6. Context assembly order (per turn)

1. Bind ticket, actor, tenant, product/version, and effect scope.
2. Load the compact operating kernel and applicable procedural instructions
   (version-pinned).
3. Fetch live authoritative state: ticket, account/identity, entitlement/incident
   status, product/version facts — with readback fields.
4. Retrieve episodic/semantic memory only where expected decision value is
   material (e.g., prior recovery attempts, preference consent).
5. Rank candidates by authority, relevance, freshness, confidence, diversity,
   sensitivity, and token cost — with independent disqualifiers first.
6. Deduplicate equivalent content while retaining source locators.
7. Represent material conflicts explicitly (never blend).
8. Compile the bounded projection and record what was omitted or unavailable, plus
   why (budget, sensitivity, no provenance, expired).

Order is stable across turns; runtime-tuned budgets may change volume, not order.

## 7. Retrieval and ranking rules

- **Independent disqualifiers.** Any item that fails authority (untrusted owner),
  freshness (expired/readback stale), sensitivity (no permission), or contradiction
  (conflicts with a higher authority) is excluded before ranking. A single blended
  relevance score is prohibited.
- **Ranking factors** (after disqualification): authority, task relevance, expected
  decision value, freshness, confidence, diversity, sensitivity, token cost. Similarity
  alone is never sufficient for inclusion.
- **Abstention.** If no item clears the gates for a decision-relevant fact, the agent
  states what is unknown, asks the customer, or escalates — it does not fill the gap
  from memory.
- **Retrieval budget.** Defaults (owner-calibrated): ≤ 20 memory items per turn,
  ≤ 3 episodic items per subject, ≤ 2 summaries per case, retrieval timeout ≤ 300 ms
  per store with degrade-to-live fallback.
- **Provenance check.** Items lacking `sourceLocator` + `sourceRevision` or a valid
  `readback` for owner-sourced facts are quarantined, not used.

## 8. Write rules

- Write to a store only under the owning class's policy; the memory store is
  append-only for episodic events and write-through for everything else.
- Facts the agent does not own (money, entitlement, identity, incident, enforcement)
  are never written as new truth; the agent writes through to the owning system or
  records an observation with a pointer.
- Only observations, verified outcomes, and decisions with locators are promoted to
  durable memory. Draft reasoning and raw transcripts are not.
- A generated summary is written as `derivation: summarized` with input lineage and
  never as the sole copy of a fact, decision, or commitment.
- Every write declares `author`, `observedAt`, `recordedAt`, `sensitivity`, and
  `expiry`/`invalidationRule`. Unexpiring bulk writes require review.
- Personalization writes require a recorded consent basis or other valid legal basis.

## 9. Refresh rules

| Class/item | Refresh policy | Invalidation trigger |
| --- | --- | --- |
| Ticket state | Re-fetch live every turn; no cache as truth | State transition, reopen |
| Account/identity | Re-fetch per turn when decision-relevant; cache TTL ≤ 5 min | Auth change, takeover signal |
| Entitlement/billing | Re-fetch per turn when decision-relevant; TTL ≤ 5 min | Ledger event, refund/restore |
| Product/version facts | Load per session against version manifest | Version change, doc update |
| Incident status | Re-fetch every turn while ticket is incident-linked | Incident declared/ended, status change |
| Knowledge articles | Use within `lastVerified + validityWindow`; no window = not trusted | Expiry, article version, KB revocation |
| Policy/procedure | Version-pinned; re-load on version change; recheck TTL ≤ 24 h | Policy release, supersession |
| Semantic memory | Re-verify against owner before use if age > 24 h or source revision moved | Source change, supersession |
| Episodic memory | Recorded once; immutable; never edited, only superseded or tombstoned | Erasure request (tombstone) |
| Derived summaries | Recompute from lineage when any input is invalidated | Input invalidation, conflict |

Refresh mechanisms:

- **Readback revalidation** — every authority-sourced item carries `observedAt`,
  `sourceVersion`, `staleness`, `readbackStatus`; a stale or unknown readback cannot
  support an answer (readback gate, §11.2).
- **Event triggers** — version change, policy release, incident declaration,
  entitlement event, article revocation, erasure request.
- **Scheduled reconciliation** — a daily staleness sweep flags and auto-withdraws
  expired items, re-verifies semantic memory near TTL, and reports drift.
- **Automatic withdrawal** — expired or revoked items are removed from retrieval
  results immediately; withdrawal is logged.

## 10. Deletion and retention rules

Default retention windows (owner-calibrated, policy-bound):

| Class | Default retention | Deletion mode |
| --- | --- | --- |
| Working context | Turn end (nothing durable) | n/a |
| Episodic case log | Per privacy policy (e.g., 24 months) or ticket lifecycle | Erasure → tombstone + payload erasure |
| Semantic memory | While verifiable; TTL ≤ 90 days without re-verification | Delete + propagate |
| Derived summaries | While inputs valid + 30 days | Recompute-or-delete |
| Preferences | Until consent withdrawn or purpose ends | Hard delete + propagation |
| Secrets | n/a — never stored | n/a |

Rules:

- **Propagation.** Deletion and correction flow through indexes, caches, summaries,
  and derived memories — no ghost copies in projections.
- **Append-only erasure.** For the episodic log, erasure appends a
  tombstone/redaction event, removes or cryptographically erases the protected
  payload, and keeps only minimum non-sensitive integrity metadata.
- **Holds.** Legal hold, incident, or dispute freezes retention without blocking
  access-scope filtering.
- **Rebuildability.** Projection stores must be deletable and rebuildable from
  owning systems plus the event log; a snapshot-delete-replay-diff gate validates
  this.
- **Tenant isolation.** Deletion and scope enforcement happen in connectors/storage,
  never by prompt instruction.
- **Data minimization** applies before storage and again before context injection.

## 11. Stale and poisoned memory detection

### 11.1 Definitions

- **Stale:** correct (or plausible) when recorded, no longer true at retrieval —
  expired TTL, superseded source, moved source revision, or revoked article.
- **Poisoned:** wrong, injected, or corrupted — untrusted origin, prompt-injection
  content, tampered record, broken provenance chain, cross-tenant leakage, or
  mass-write corruption.

### 11.2 Detection layers

| Layer | Signal | Action |
| --- | --- | --- |
| Provenance gate | Missing `sourceLocator`/`sourceRevision`; unknown producer; broken `supersedes` chain | Quarantine; exclude from retrieval |
| Freshness gate | `expiry` passed; `readback.staleness` stale; source version moved | Auto-withdraw; log drift event |
| Authority gate | Item claims a fact owned by a system that did not produce it | Quarantine; route to owner |
| Contradiction detector | Retrieved item conflicts with live authoritative state or a higher-authority item | Higher authority wins; flag + quarantine item; drift report |
| Poisoning indicators | Instruction-like text in retrieved content; unexpected write patterns (bulk writes, new producer IDs, cross-tenant subjects); abrupt entity-fact changes; provenance chain break | Quarantine; incident-style review |
| Canary backstops | Planted decoy facts/tripwires that should never be retrieved as truth; retrieval or use of a canary = alarm | Alarm + quarantine + eval replay |
| Replay oracles | Replay past cases with known outcomes; compare answers against recorded correct answers and source state | Drift budget breach → gate/rollback of retrieval path |
| Eval gates | Adversarial fixtures: stale memory, poisoned retrieval, conflicting sources, missing context, privacy deletion, compaction loss, cross-tenant leakage, interruption recovery | Block release; quarantine offender |
| Runtime monitors | Abstention rate, contradiction flags, quarantine rate, source re-fetch rate, canary trips, drift incidents | Threshold breach → alert + auto-restrict retrieval |

Rules:

- **Fail closed.** Any item failing a gate is excluded from context and cannot
  influence answers or actions, regardless of relevance or recency of retrieval.
- **Similarity is not safety.** A poisoned item that is highly relevant to the query
  still fails the gates; ranking never overrides disqualification.
- **Staleness is expected, poisoning is an incident.** A stale item is withdrawn and
  refreshed; a poisoned item triggers quarantine, root-cause, and correction.

### 11.3 Response protocol

1. **Quarantine** — mark `quarantineStatus: quarantined`; keep the record for
   forensics; exclude from all retrieval.
2. **Isolate** — scope to the affected tenant/subject; check for propagation to
   summaries and derived items; quarantine dependents.
3. **Abstain/escalate** — during review, the affected fact is treated as unknown;
   answers abstain or escalate with a complete packet.
4. **Root-cause** — classify: source drift, expired TTL, injection attack, corrupt
   write, cross-tenant leak, or compaction loss. Record in the drift/incident log.
5. **Correct** — re-verify against the owning authority; for true facts, write
   through to the owner; for derived items, recompute from lineage; for injected
   items, remove and add detection coverage.
6. **Restore** — reactivate only after provenance + freshness + authority gates pass
   on the corrected record.
7. **Learn** — feed the fixture into the eval corpus; adjust gates or canaries;
   notify the owning team.

## 12. Confidence and conflict representation

- Every item carries `confidence` with a documented calibration basis (observed,
  inferred, summarized). Confidence never replaces authority or freshness gates.
- Conflicts are represented explicitly: both items visible with their authorities,
  not a merged middle value. The conflict record links the winning source and the
  reason.
- When two equal-authority sources disagree (e.g., ticket vs. ledger), the agent
  abstains on the disputed fact and escalates with both observations.
- Retrieval abstention is a first-class outcome with its own metric, not a failure
  to be papered over.

## 13. Handoff and recovery schema

Handoff is a typed state transfer, not a transcript dump. The recipient is bound
to objective, current state, decisions, evidence, gaps, authority, and next safe
action:

```text
handoff {
  ticketId, tenant, productVersion, locale, severity,
  objective, nonGoals,
  state: ticketStatus + waitingDeps {owner, nextCheckAt, customerUpdateAt},
  decisions: [{decision, sourceLocator, decisionDate}],
  evidence: [{factOwner, externalRef, observedAt, sourceVersion, staleness, readbackStatus}],
  gaps: [unknown facts the recipient must not infer],
  authorityBoundary: [owned actions, protected actions, abstention triggers],
  nextSafeAction, continuationCommand,
  claim: {agentId, leasedUntil, heartbeatAt},
  summaryRef: {derivedFrom: [recordIds], recomputeOn: [invalidationTriggers]}
}
```

Recovery rules:

- On session loss or takeover, the recipient rebuilds working context from this
  schema plus live authorities; it does not replay the prior transcript.
- Stale claims are recovered by lease/heartbeat: a new agent records a takeover
  event and preserves the prior checkpoint.
- If the memory store is unavailable, the agent operates from live authorities
  only and abstains where memory was required; it backfills the event log on
  recovery.

## 14. Privacy, tenant, credential, and least-disclosure boundaries

- Allowlist-first, purpose-limited collection: only fields needed to resolve the
  ticket, recover state, or prove completion.
- Tenant/org/user scope is enforced by connectors and storage; prompt instructions
  are not access control.
- Secrets are referenced by handle, never loaded into context or written to memory.
- Personalization memory requires a recorded consent basis, separate from
  task-correctness memory, with its own deletion contract.
- Data minimization before storage and again before injection; filter by
  `sensitivity` and `accessScope` at injection time.
- Cross-tenant leakage is a poisoning class (§11) with incident handling.

## 15. Budgets

Defaults; owned and calibrated by support-platform engineering:

| Budget | Default | Enforcement |
| --- | --- | --- |
| Always-on kernel | ≤ 2k tokens | Compact projections only; details on demand |
| Working context per turn | ≤ 6k tokens instructions+state, ≤ 10k total | Assembly truncation log |
| Retrieval items per turn | ≤ 20 (≤ 3 episodic/subject, ≤ 2 summaries/case) | Ranking + disqualifier gates |
| Retrieval latency | ≤ 300 ms/store, degrade-to-live fallback | Timeout → live sources only |
| Memory write latency | Non-blocking; event log ≤ 1 s | Async promotion |
| Storage per tenant | Per policy class (§10) | Sweep + quotas |
| Re-verification | Semantic ≥ 24 h TTL, KB per article window | Staleness sweep daily |

## 16. Quality and safety metrics

Track per category, channel, locale, product/version, and automation path:

- authoritative fact recall and source attribution;
- decision utility and error: correct decisions per ticket relative to token and
  latency cost, with error classified by cause (stale, poisoned, missing, conflict);
  ticket-avoidance proxies are never quality targets;
- contradiction detection and stale-memory rejection rates;
- poisoned-influence rate (canary trips, quarantine events, drift incidents);
- task success relative to token and latency cost;
- abstention and escalation quality (complete packets, no invented facts);
- privacy deletion and tenant-isolation success;
- handoff recovery accuracy (reopen after takeover, evidence survival);
- resolution verification rate, reopen rate, and feedback closure.

Report drift budgets: e.g., canary trips > 0 in a window, contradiction rate above
baseline, or replay-oracle drift beyond threshold trigger retrieval-path
restriction and gate.

## 17. Adversarial and degradation tests

Run before release and continuously:

| Fixture | Expectation |
| --- | --- |
| Stale memory | Expired item excluded; agent re-fetches or abstains |
| Poisoned retrieval | Injected/instructional content quarantined; no behavior change |
| Conflicting sources | Higher authority wins; equal authority → abstain/escalate |
| Missing context | Agent states unknown; no inference from memory |
| Privacy deletion | Erasure propagates through indexes, caches, summaries; no ghost copies |
| Compaction loss | Recovery from lineage; important detail not lost |
| Cross-tenant leakage | Connector scope blocks; no other-tenant data in context |
| Interruption recovery | Handoff schema rebuilds working context without transcript |
| Memory store down | Live-authority-only operation; abstention where memory required |
| Retrieval timeout | Degrade to live sources; no stale fallback |
| Injection via article/case content | Content treated as data; canary trip; quarantine |

## 18. Owners, versioning, and change control

- **Owner:** support-platform engineering owns this contract and the memory store;
  support operations owns ticket-state transitions; KB owner owns articles; trust &
  safety owns poisoning incidents; privacy owns retention/erasure policy.
- Version via `artifactVersion`/`artifactRevision`; `artifactState: draft` until
  reviewed. Material changes go through the owning ADR; tradeoffs recorded there.
- Review cadence: quarterly, plus on any policy release, memory-store schema change,
  or poisoning incident.
- Implementation lands as schemas/tests/ADRs in owning repos, not by copying this
  body into runtime prompts.

## 19. Implementation checklist

- [ ] Memory store schema with §5 fields and class-isolated policies.
- [ ] Connector readbacks with `factOwner`/`externalRef`/`observedAt`/`sourceVersion`/
      `staleness`/`readbackStatus` for every authority fetch.
- [ ] Assembly pipeline implementing §6 order with omission log.
- [ ] Retrieval ranking with independent disqualifiers and abstention output.
- [ ] TTL/supersession engine with daily staleness sweep and auto-withdrawal.
- [ ] Erasure propagation and rebuildability gate (snapshot-delete-replay-diff).
- [ ] Canaries, replay oracles, and adversarial eval fixtures (§17) wired to gates.
- [ ] Drift/incident log with quarantine workflow and owner notifications.
- [ ] Handoff schema adopted by all escalation and takeover paths.
- [ ] Metrics dashboard per §16 with thresholds and auto-restrict actions.
