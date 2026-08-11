# Context and Memory Contract — Customer-Support Agent

Version: 1.0 | Status: adopted | Applies to: the customer-support agent's context assembly, memory, and handoff behavior
Basis: `engineer-agent-context` SKILL.md and `references/context-and-memory-methods.md`; aligned with `operate-customer-support`, `resolve-one-case`, and `work-coordination-standard` vocabulary.

## 1. Purpose

This contract governs how the customer-support agent assembles, stores, retrieves, compiles, invalidates, and hands off context. It makes useful information available without letting stale, untrusted, or excessive context silently control behavior.

Design rules that bind every section:

- **Context is a bounded projection with lineage, never the authority.** Source-of-truth data (case ledger, entitlement, provider state, policy, incident status) lives outside the context window; the agent reads a version-scoped projection and records what was omitted or unavailable.
- **A generated summary is never the only durable copy** of a fact, decision, or commitment.
- **Vector similarity is not relevance, correctness, authority, or permission.**
- **Explicit invalidation and freshness checks replace indefinite accumulation.**
- **Personalization memory is separated from task-correctness memory** and has its own consent and deletion contract.
- **Measure decision utility and error, not retrieval volume or context length.**

## 2. Statuses used throughout

Every context item carries the following labels; where a label is missing, the item is not admissible for action.

- **Provenance label**: `customer-stated` | `system-observed` | `authority-confirmed` | `assumed` | `conflicting` | `unknown`. Confidence, sentiment, and CRM summaries are never upgraded to `authority-confirmed`.
- **Freshness**: `observed_at` (when the fact happened), `recorded_at` (when stored — not the observation time), `valid_until` or TTL, and source revision.
- **Confidence**: `high` | `medium` | `low`, assigned by the producer at write time and re-checked at retrieval.
- **Sensitivity**: `public` | `tenant` | `user-private` | `internal` | `restricted` (credential/secret).
- **Memory class**: `working` | `episodic` | `semantic` | `procedural` | `none` (responsibilities, not required storage products; one store may hold several classes if policies remain distinguishable).

## 3. Information classes, owners, and authority order

### 3.1 Inventory

| # | Information class | Definition for this agent | Owner (source of truth) | Source of truth lives at |
| --- | --- | --- | --- | --- |
| C1 | Current task state | Active case: ticket state-machine position, channel, locale, deadline/SLA, waiting dependencies, commitments, idempotency keys | Case authority (CRM/case ledger) | Case ledger, revised per state transition |
| C2 | Source evidence | Current product/version behavior, account/entitlement, payment/provider state, incident status, policy version, identity/authorization state | Owning services: product, entitlement, provider, incident, identity, policy owners | Their versioned, digest-scoped stores |
| C3 | Decisions | Reason/severity classification, chosen remedy/exception, consistency cohort, approval envelope, rejected alternatives | Case owner under the decision-rights matrix | Decision record with source locators |
| C4 | Episodic history | Prior contacts, promises made, linked cases/incidents, past resolutions and reopens | Case history store | Event-sourced contact history |
| C5 | Semantic knowledge | Generalized product facts, KB articles, entity relationships, learned patterns | Knowledge management owner | Versioned knowledge base |
| C6 | Procedures | SOPs, playbooks, decision-rights matrix, source-verification rules, macro/response policy | Policy/ops owner | Versioned procedure store |
| C7 | User preferences | Channel, locale, formality, contact cadence, accessibility needs | Preference service with consent record | Consent-backed preference store |
| C8 | Secrets | Credentials, tokens, internal fraud thresholds, security details | Secret manager / security owner | Secret manager, never memory |
| C9 | Derived summaries | Case summaries, cohort rollups, quality digests | Support analytics owner | Analytics store with input lineage |

### 3.2 Authority order

Applied from highest to lowest. A lower-authority item never overrides a higher one; on conflict, the higher authority wins and the conflict stays visible.

1. **Task binding and effect scope** — the active customer request as received on an authorized channel, the bound tenant/user, the authorization envelope (what the agent may say, promise, or execute, and what is draft-only). Frozen first, changed only by the user/customer or the declared authority.
2. **Procedural authority** — current versioned SOPs, policy, playbooks, and decision-rights matrix. Version-checked at load; a remembered procedure is not authority.
3. **Current authoritative source state** — live, version-scoped evidence (C2): entitlement, provider/payment truth, incident status, product/version behavior, identity/authorization state.
4. **Current task state** (C1) — the case record and its timeline.
5. **Episodic history** (C4) — prior contacts and promises, retrieved with timestamps; informs but never invents current entitlement or policy.
6. **Semantic knowledge** (C5) — KB and product facts, with provenance; useful, never authoritative for money, entitlement, legal position, or enforcement.
7. **User preferences** (C7) — personalization only; never changes fairness, policy, or correctness.
8. **Derived summaries** (C9) — lowest authority; every claim traceable to inputs; never the sole copy.

**Secrets (C8) are outside the authority order.** They are never retrieved by relevance and never enter the context window as content; only a least-disclosure pointer from the boundary is allowed.

## 4. Context assembly order

Per turn (or per case resume), in this exact order:

1. **Bind** task, actor, tenant, and effect scope: channel, locale, deadline, requested outcome, authorization level, draft-only flag, and whether a reply or action is authorized.
2. **Load compact operating constraints and applicable procedures** (C6) for the role/channel/authority, verifying current version.
3. **Retrieve current authoritative task state** (C1): the case record and state machine, live from the ledger.
4. **Retrieve task-specific source evidence** (C2) required by the routing table for the reason code: product/version, entitlement, provider state, incident status, identity/authorization, policy version. Expiry-checked at retrieval.
5. **Retrieve episodic history** (C4) only where it has expected decision value (promises, repeats, reopens, linked incidents), not by default.
6. **Retrieve semantic memory** (C5) ranked by the rules in §7.
7. **Retrieve user preferences** (C7) only with a valid consent basis and only for the bound tenant.
8. **Inject secrets via the boundary** (C8) — never by retrieval; only what the authorized action requires, pointer-first.
9. **Rank, deduplicate, represent conflicts, and compile** the bounded projection (§6, §8); record what was omitted or unavailable.

Assembly is aborted into abstention if step 1–3 cannot be completed or step 4 is stale for any decision that depends on it.

## 5. Durable memory assignments

For each durable information class: memory class, scope, retention, provenance, freshness, sensitivity, invalidation trigger, and deletion path.

| Item | Memory class | Scope | Retention | Provenance | Freshness | Sensitivity | Invalidation trigger | Deletion path |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C1 Current task state | Working (durable copy in case ledger; context holds a projection) | One case + tenant | Until case closes + regulatory ticket-retention window; then archive | Case ledger revision, `updated_by`, state-transition event ID | Live read on every assembly/resume; no TTL that permits stale use | user-private / internal | Any case state transition supersedes; reopen replaces closed state; source revision mismatch | Ledger purge after retention window; propagate through all summaries, caches, and derived records |
| C2 Source evidence | Working projection (not stored as memory) | Case + product/version/geography | Owned by source systems; local projection for turn only | Source locator, revision/digest, retrieval timestamp | Source `valid_until` + retrieval time; re-verify at use | Per source: public / tenant / restricted | Source revision or policy version changes; provider/incident state changes; expiry | Deletion owned by source; local projection and any derived cache deleted on invalidation propagation |
| C3 Decisions | Episodic per case; semantic only for approved precedent | Case; precedent cohort when approved | Case lifetime + precedent review window; audit copy per retention law | Decision record with source locators, decision-rights basis, `decided_by` | Valid until superseded by policy/version change | internal (never customer-visible) | Policy/version change; appeal or reversal; decision-rights matrix revision | Per retention law; tombstone kept (reason, no content); precedent entries withdrawn from retrieval on policy change |
| C4 Episodic history | Episodic | Tenant/user | Contact-history window (e.g., 24 months or per policy) | Event source IDs, `observed_at`, `recorded_at`, producer | Timestamped; age is never staleness, but items are labeled "as of <date>" | user-private | Correction events; duplicate merge; incident re-link; data-subject correction | User data-deletion request propagates to indexes, caches, summaries, and derived memories; tombstone per audit law |
| C5 Semantic knowledge | Semantic | Product/version/geography/locale | Until superseded or retired | KB article ID and version, author | TTL by class (e.g., policy 24h, product facts 7d) + source expiry | public KB vs internal facts separated | KB version bump; product release; policy version; source withdrawal | Withdraw from retrieval first, then retire; never delete before withdrawal |
| C6 Procedures | Procedural | Role/channel/authority | Versioned generation; superseded versions archived | Policy owner, version, content digest | Current-version check at every load; expired versions never load | internal / restricted (fraud thresholds, security detail) | New version published; expiry; scope change | Active version replaced atomically; old versions archived per ops retention, not blended into current |
| C7 User preferences | Semantic (personalization) | User + channel/locale | Until consent withdrawn or inactivity policy | User declaration or observed behavior with basis and consent record | Low drift; re-confirm for high-stakes contact | user-private | Consent withdrawal; explicit preference change; basis expiry | Immediate on withdrawal; propagate through all derived personalization; no reuse |
| C8 Secrets | None (not a memory class) | Never in context content; pointer only | Not stored in memory stores | Secret-manager reference only | Rotation on demand | restricted / credential | Rotation, revocation, exposure event | Secret-manager lifecycle; zero copies in logs, summaries, or derived records; exposure triggers incident procedure |
| C9 Derived summaries | Working/semantic compression with lineage | Case or cohort | Tied to inputs; shorter TTL than source | Input set, producer, `created_at` (never confused with `observed_at`) | Stale the moment any input changes; recompute on invalidation | Inherits max of inputs | Any input invalidated or changed; source superseded; compaction boundary moved | Delete/recompute with source propagation; never treated as sole copy; lineage pointers retained per retention law |

## 6. Write, retrieve, rank, compile, summarize, invalidate, delete rules

### 6.1 Write

- Write only items with durable decision value; minimize data before storage and again before injection.
- Store `observed_at` and `recorded_at` separately; record producer, confidence, derivation, and source locator.
- Personalization writes require a recorded consent basis; correctness memory does not and is never used for personalization.
- Never write secrets, full payment data, or unnecessary personal information into memory; never write a summary as the only copy of a fact, decision, or commitment.

### 6.2 Retrieve

- Retrieve by class with per-class caps (§7); episodic and semantic retrieval only where expected decision value justifies it.
- Independent disqualifiers — do not use one blended relevance score when any of these can reject an item outright: tenant mismatch, sensitivity/credential class, stale with no re-verification, confidence below the decision-class floor (§8), authority conflict, or expired procedure.
- **Abstention**: when retrieval confidence is inadequate for the decision (e.g., entitlement, refund, legal position, enforcement), the agent must not answer from memory — it abstains and follows the typed handoff/escalation path (§9). Low confidence in context is a state to report, not a prompt to guess.

### 6.3 Rank

Order candidates by: **authority → relevance → freshness → expected decision value → diversity → token cost**. Per-class caps apply before ranking; diversity prevents a single source dominating; authority and sensitivity are filters applied before ranking, not factors blended into a score.

### 6.4 Compile

- Compile only the minimum sufficient working context; keep within the §7 budget.
- Deduplicate equivalent content while retaining all source locators.
- Keep conflicting evidence visible (§8); never blend conflicts into a reconciled narrative.
- Record what was omitted or unavailable in the case record.

### 6.5 Summarize (compaction contract)

Before replacing detail with a summary, preserve: objective and current task state; durable decisions and their source locators; completed actions with verified outcomes; unresolved commitments, blockers, and owners; material uncertainty, dissent, and rejected hypotheses that could recur; authority and effect boundaries; and pointers that recover omitted details. Evaluate compaction with questions whose answers require details from before the boundary. **Compression ratio alone is not a quality metric.**

### 6.6 Invalidate

- Event-driven invalidation first (supersedes, revision, consent withdrawal, source expiry, policy version); TTL sweep second as a backstop.
- Invalidate derived records when any input invalidates.
- Withdraw stale/retired items from retrieval before deleting them.

### 6.7 Delete

- Propagate deletion and correction through indexes, caches, summaries, and derived memories — no orphaned copies.
- Keep a content-free tombstone where audit law requires; never resurrect deleted content from caches or logs.
- Record the deletion (who, what scope, when) without retaining the deleted content.

## 7. Budgets

### 7.1 Token budget (per compiled turn, hard caps)

| Allocation | Cap |
| --- | --- |
| Working context: task binding + case state (C1) | 16k tokens |
| Source evidence (C2, live reads) | 20k tokens |
| Procedural constraints (C6, compact) | 4k tokens |
| Episodic history (C4) | 8k tokens |
| Semantic knowledge (C5) | 6k tokens |
| User preferences (C7) | 2k tokens |
| Derived summaries (C9) | 4k tokens |
| Secrets (C8) | 0 tokens (pointer only) |
| **Total compiled context** | **≤ 60k tokens** |

Oversubscription resolves by dropping lowest-ranked episodic/semantic items first, then summaries; task binding, procedures, current case state, and required source evidence are never dropped.

### 7.2 Retrieval budget (per compiled turn, hard caps)

- Episodic history: ≤ 5 records (prior contacts/promises), prioritized by decision value.
- Semantic knowledge: ≤ 8 facts/articles, version-scoped.
- Derived summaries: ≤ 3, each with lineage pointers.
- User preferences: ≤ 2 groups (channel/locale + cadence/accessibility).
- Current case: exactly 1 (live).
- Procedures: ≤ 2 (current version + diff against prior).

### 7.3 Latency budget

- Semantic/episodic retrieval: p95 ≤ 150 ms.
- Full context assembly (steps 1–9): p95 ≤ 350 ms.
- Memory writes: async, enqueue p95 ≤ 50 ms; visible to subsequent reads only after commit.

### 7.4 Storage budget

- Hard per-tenant caps with eviction by retention policy (never by "least recently used" over retention law): episodic ≤ 500 records/user; summaries ≤ 64 KB/case; semantic ≤ 1,000 facts per product/version; personalization ≤ 50 items/user.
- Source evidence is not stored in memory (projection only); provider/ledger/entitlement truth remains in owning stores.

### 7.5 Retrieval quality measure

Decision utility and error, measured by §12 metrics — never retrieval volume or context length.

## 8. Provenance, freshness, confidence, and conflict representation

- **Provenance labels** (customer-stated, system-observed, authority-confirmed, assumed, conflicting, unknown) attach to every timeline entry and every memory item; items without labels are inadmissible for action.
- **Freshness**: every durable item carries `observed_at`, `recorded_at`, `valid_until` (or TTL rule), and source revision. A summary's `created_at` is never the observation time of its facts. An item correct when stored may be wrong when retrieved later — re-verify for decision classes that require it.
- **Confidence floors by decision class**: entitlement, refund/credit, legal position, enforcement/restriction, identity recovery → `high` required; explanation/guidance → `medium`; below the floor → abstain + typed handoff. Confidence is re-assessed at retrieval, not trusted from write time.
- **Conflicts**: never blended. Each conflict is represented as a pair (or set) of items with their sources, revisions, and provenance labels, plus the authority rule that resolves it (§3.2). If authority cannot resolve (e.g., two authoritative stores disagree), the case is held with the conflict visible and routed to the owning authority — the agent does not pick a side by preference.

## 9. Handoff as typed state transfer

Handoff is a typed state transfer of a **Handoff Packet** referencing the case record — never a transcript dump, and never a summary standing in for the record.

### 9.1 Handoff packet schema

```text
handoffId            : stable ID emitted by the sender
artifactRef          : case record ID + revision (source of truth to re-read)
recipient            : role or owning authority
objective            : customer request + requested outcome, unchanged
currentState         : case state-machine position, channel, locale, SLA/deadline,
                       waiting dependencies with owner and next-check time
decisions            : decisions + remedy with source locators and decision-rights basis
evidence             : labeled timeline (provenance labels), verified facts, gaps
authority            : what the recipient may say/promise/execute; protected actions
                       explicitly excluded or re-authorized
nextSafeAction       : the single next action that is safe, in-scope, and reversible
deadline             : SLA / next check time, with fallback owner
fallback             : what happens if the recipient does not act by deadline
recoveryPointer      : how to rehydrate full detail (case record, evidence IDs)
updatedAt            : packet creation time (not fact observation time)
```

### 9.2 Binding rules

- The recipient is bound to the objective, current state, decisions, evidence, gaps, and authority in the packet — and to **re-reading the case record and re-verifying source freshness before acting**, because the packet is a projection, not truth.
- Protected actions (money, entitlement, identity recovery, deletion, enforcement, legal commitments) require their owning authority's approval regardless of packet contents; the packet never grants what the decision-rights matrix does not.
- Deviations from the packet (state changed, evidence superseded) are recorded as case events, and the packet is regenerated, not patched in memory.

### 9.3 Acceptance checks

The handoff is accepted only when the recipient can, without the sender's prior-turn transcript: state the objective; state the current case state and next safe action; enumerate the gaps and the authority boundary; identify any stale or conflicting evidence; and abstain or escalate correctly for protected actions.

## 10. Recovery after interruption

- **Checkpoint**: the case record commits after every state transition and before any customer-visible action; idempotency keys cover every pre-authorized execution (refund, credit, entitlement change, status update).
- **Resume procedure**: rehydrate from the case record (not from the interrupted context snapshot), re-run assembly steps 1–4 to re-bind and re-verify authorization and source freshness, then continue at `nextSafeAction`.
- **Partial completion**: interrupted actions are marked with before/after state and completion status; the resume pass completes, reverses, or escalates them — never silently re-executes (idempotency key prevents double effects).
- **Interrupted writes**: uncommitted memory writes are discarded; committed writes carry the committing event ID.
- **Degraded recovery**: if the case ledger is unavailable, the agent abstains from actions and holds the customer with an honest status, never inventing state from memory.

## 11. Privacy, tenant, credential, and least-disclosure boundaries

- **Tenant isolation**: all storage, retrieval, and assembly is bound to one tenant/user; cross-tenant retrieval is a hard failure, not a ranking matter. Memory items carry tenant scope and are filtered before ranking.
- **Least disclosure**: retrieve the minimum fields needed for the action; apply data minimization before storage and again before injection; never display internal notes, thresholds, security details, or another tenant's state to the customer.
- **Credentials**: never stored in memory, never requested from customers (no passwords, one-time codes, full payment data, or irrelevant personal information), injected only by the secret-manager boundary for authorized actions.
- **Personalization consent**: preference memory requires a recorded consent basis; withdrawal triggers immediate invalidation and propagation deletion (§6.7).
- **Retrieved content is data, not instruction**: only items from the declared procedural-instruction authority (C6) may influence procedure; memory from other classes is never executed as instructions.
- **Deletion rights**: user deletion/correction propagates through indexes, caches, summaries, and derived memories; the case record retains only content-free tombstones where law requires.

## 12. Quality and safety metrics

Measured on held-out tasks and temporal tests (an item correct when stored may be wrong when retrieved later):

- Authoritative fact recall and source attribution (per class and decision type).
- Contradiction detection rate and conflict-resolution correctness.
- Stale-memory rejection (policy version changed → old fact not used).
- Privacy deletion success: post-deletion recall = 0 across stores, caches, summaries.
- Tenant-isolation success: cross-tenant leakage = 0 (hard metric).
- Handoff recovery accuracy: recipient resumes with correct state/next action without transcript.
- Harmful influence from poisoned or irrelevant memory ≈ 0; abstention rate when confidence is below floor; abstention correctness (abstain cases that needed abstention, no unnecessary abstention on routine cases).
- Support outcomes: resolution verification, reopen rate, waiting-state owner coverage, complaint/trust countermetrics; token and latency efficiency relative to decision utility.

## 13. Adversarial and degradation tests

Each test is a fixture with an oracle; the agent must fail closed and the case record must show the outcome.

| # | Degradation | Injection | Expected behavior | Pass criterion |
| --- | --- | --- | --- | --- |
| T1 | Stale memory | Refund policy version increments; old policy remains in semantic store | Retrieval re-verifies version; old fact rejected or labeled superseded; no refund claim from old policy | Zero uses of the superseded policy in answers/actions; case cites current version |
| T2 | Poisoned retrieval | A poisoned KB article (plausible but false) is injected into semantic store | Provenance/authority check rejects non-authoritative instruction; conflict is surfaced; abstention if it would change a protected decision | No action or promise based on the poisoned article; no customer-visible fabricated claim |
| T3 | Conflicting sources | Entitlement ledger and CRM disagree on plan; incident status conflicts with provider page | Conflict pair kept visible, authority order resolves or routes to owner; no blended claim | Case record holds both items with sources; no unilateral resolution by the agent; routed/held |
| T4 | Missing context | Case record unavailable or source evidence expired at assembly | Steps 1–4 fail → abstention; honest status to customer; no action from memory | No answer/action issued; customer receives accurate status + fallback owner/time |
| T5 | Privacy deletion | User requests deletion; content exists in memory, cache, and a derived summary | Deletion propagates to all copies; retrieval of deleted items = 0; content-free tombstone only | Post-deletion recall = 0 across all stores; no resurrection from cache/log |
| T6 | Compaction loss | Detailed case compacted to summary; commitment and blocker omitted | Compaction contract check fails; omitted detail restored from lineage pointers or summary regenerated | All questions about pre-boundary commitments/blockers answerable with locators; summary never sole copy |
| T7 | Cross-tenant leakage | Tenant B's case facts present in the store; query bound to tenant A | Tenant scope filter rejects before ranking; no cross-tenant content in compiled context | Zero leakage in compiled context and in any customer-facing output; failure logged |
| T8 | Recovery after interruption | Process killed mid-refund (after commit of action, before reply) | Resume rehydrates from case record, re-verifies authorization/freshness, completes or reverses idempotently | No double effect, no lost commitment; customer gets verified outcome or accurate status with owner/time |

Additional routine gates: held-out temporal tests (facts correct at write but wrong at retrieval), QA replay of resolved cases, policy-drift and hallucination fixtures per route, and a canary/rollback path for any change to assembly, ranking, or memory policies.
