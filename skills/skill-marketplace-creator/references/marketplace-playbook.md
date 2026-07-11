# Private Skill Portfolio Playbook

## Contents

- Physical lifecycle
- Portfolio decision test
- Admission and incubation
- Owner-informed protection
- Deletion diff and tombstones
- Exact evidence
- Agent-first governance
- Private/public boundary

## Physical lifecycle

| State | Canonical surface | Required truth | Discoverable |
| --- | --- | --- | --- |
| Installable candidate | `skills/<name>/SKILL.md` | Admission, owner, eval boundary, source policy | Authenticated/local users |
| Active investigation | `incubator/<name>/PROPOSAL.md` | Owner, expiry, independent job/artifact, promotion plan | No |
| Retired | `retired/skills.json` | Disposition, reason, decision, evidence, date | No |

Treat evidence as orthogonal to lifecycle. An installable route may still have
unverified or stale routing/behavior evidence. An incubator proposal may contain
valuable research without being installable.

## Portfolio decision test

Evaluate in order:

1. **Independent job:** Would an operator intentionally request this work?
2. **Independent artifact:** Can another agent accept its output without
   reopening a broader sibling?
3. **Knowledge delta:** Does it contain mechanisms the base agent will not
   reliably reconstruct from the request?
4. **Boundary:** Can realistic positive, negative, abstention, and compound
   cases distinguish it?
5. **Authority:** Are owner, sources, freshness, risk, and hard floors explicit?
6. **Maintenance:** Is there an active reason to maintain it now?

| Decision | Evidence required |
| --- | --- |
| Keep | All six tests pass |
| Merge | Same job/artifact, canonical replacement, mechanism-level absorption map |
| Retire without replacement | Base-model-generic, not a skill, or low-value shell; explicit reason and decision |
| Investigate | Owner, expiry, falsifiable question, and exact next proof |

Do not use folder age, line count, topic coverage, author effort, or authored
examples as the decision.

## Admission and incubation

Require every installable route to declare:

- recurring job and concrete artifact;
- owner-backed demand or sponsorship without mislabeling adoption;
- neighbouring routes and compound behavior;
- risk class and source-freshness policy;
- review/expiry date;
- falsifiable routing and behavior plan.

Use the incubator only for an active uncertainty. Expire or decide proposals;
do not use it as a permanent archive of generated possibilities. Keep current
law, prices, platform rules, credentials, and executable capabilities in typed
retrieval/tools rather than static skill prose.

## Owner-informed protection

Maintain a protection record with:

```text
skill, owner, decision_ref, recurring_job, artifact, protected_mechanisms,
dependency_closure, historical_public_commit, retirement_authority
```

Protect mechanisms, not merely filenames. Preserve separate artifacts when
their triggers, acceptance authority, or evidence differ. A replacement may be
broader only when its contract explicitly owns the old job and the absorption
map points to every retained rule, state machine, failure mode, and test.

## Deletion diff and tombstones

Compare the merge-base tree with the candidate tree for both
`skills/*/SKILL.md` and `incubator/*/PROPOSAL.md`. Every missing name must appear
in the retirement ledger.

A tombstone should carry:

```text
name, disposition, replacement_when_required, reason, decisionRef,
absorptionEvidence_when_required, retiredAt
```

- Use `absorbed`, `duplicate`, or `superseded` only with an active replacement
  and existing absorption evidence.
- Use `not-a-skill` or `archived-low-value` without a false replacement.
- Require an explicit owner decision before retiring protected knowledge.
- Validate evidence paths and replacement existence.
- Recompute derived inventory after the change; never hand-edit counts.

Git history is audit evidence, not an active migration route. A deleted entry
still needs a current tombstone so agents and operators can explain where it
went.

## Exact evidence

Keep these states separate:

- routing: complete-catalog prompt set, description/catalog digest, abstention,
  compound exact set, per-skill metrics;
- behavior: exact skill/reference bundle, hidden tasks, controls, raw outputs,
  model/provider identity, judge policy, receipts, recomputed metrics;
- authority: protected workflow, source commit, attestation, expiry;
- demand/adoption: owner sponsorship, internal repeated use, external request;
- source freshness and risk: current authority route, scope, review trigger.

Any relevant byte change invalidates its dependent proof. Local runs diagnose;
they do not self-attest current evidence.

## Agent-first governance

Use this state machine:

```text
observe -> inventory -> propose_disposition -> independent_validate
-> exact_branch -> deterministic_gates -> merge_queue
-> default_branch_readback -> isolated_install -> reconcile -> learn
```

Assign separate proposer, validator, promoter, and watchdog identities. Allow
agents to perform all routine inventory, comparison, migration, generation,
validation, and reconciliation. Keep owner decisions, legal authority, and
protected-knowledge retirement outside self-granted model authority.

Construction capacity is elastic; routing attention and semantic clarity are
not. Retire a route because it lacks an independent value contract, not because
humans would find it expensive to maintain.

## Private/public boundary

- Verify repository visibility and anonymous behavior from live readback.
- Support authenticated Git or a local path; pin commits/digests when
  reproducibility matters.
- Keep private repositories free of secrets and customer data; access control
  is not a secret manager.
- Preserve copyright notices and third-party attribution.
- Treat historical public license grants as durable for already distributed
  copies. Privacy controls future access, not past rights or copies.
- Record public caches, indexes, forks, or mirrors as external state; do not
  claim their removal without observed evidence.
