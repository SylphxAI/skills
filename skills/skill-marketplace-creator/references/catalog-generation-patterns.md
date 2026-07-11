# Internal Inventory And Catalog Derivation Patterns

## Contents

- Derived-state pipeline
- Rule IDs
- Projection contract
- Change decision table
- Access-aware install proof
- Provenance fields
- Reconciliation events
- Completion checklist

## Derived-state pipeline

```text
physical_portfolio -> metadata_normalized -> admission_joined
-> evidence_joined -> access_filtered_inventory -> isolated_install_readback
-> desired_observed_reconciled
```

The filesystem and canonical ledgers author truth. Registry, catalog, README
tables, counts, and evidence matrices are rebuildable projections.

## Rule IDs

- `inventory-1` — Derive installable names only from
  `skills/<name>/SKILL.md`; never from a status label or catalog row.
- `inventory-2` — Derive incubator names only from active proposal folders and
  reject `SKILL.md` anywhere below the incubator.
- `inventory-3` — Join admission, owner, risk, source, and evidence facts by
  exact skill name without copying them into a second editable authority.
- `inventory-4` — Compare base and candidate entry-point sets before
  generation; reject every missing name without a valid tombstone.
- `inventory-5` — Generate groups from recurring user jobs and artifact
  boundaries, not organizational taxonomy or topical similarity.
- `inventory-6` — Present evidence states exactly; never convert stale,
  authored, local, or historical output into current proof.
- `inventory-7` — Expose a private inventory only to authenticated/local
  consumers. Do not generate public-directory metadata or anonymous install
  commands for a private repository.
- `inventory-8` — Verify list and install behavior in an isolated environment
  against the generated expected set; fail on missing or extra skills.
- `inventory-9` — Regenerate after add, rename, promote, retire, description,
  admission, evidence, or grouping changes.
- `inventory-10` — Reconcile generated desired state with installed observed
  state and retain the exact failure rather than editing projections to pass.

## Projection contract

| Projection | Inputs | Required checks |
| --- | --- | --- |
| Internal registry | Physical skills, frontmatter, admission, evidence | Exact names, digests, evidence labels |
| Portfolio inventory | Skills, incubator, retirement ledger | No overlap, complete deletion accounting |
| Internal catalog | Registry and groups | Authenticated links, no unsupported claims |
| Evidence matrix | Registry and validated manifests | Exact-current selection and expiry |
| Install expectation | Physical skills | Isolated list/install equality |

## Change decision table

| Change | Required action | Blocking proof |
| --- | --- | --- |
| Add/promote | Add admission and eval boundary; regenerate | Folder/admission/eval match |
| Description edit | Regenerate catalog and invalidate routing proof | New catalog digest |
| Procedure/reference edit | Regenerate and invalidate behavior proof | New bundle digest |
| Rename | Treat old name as deletion plus new admission | Tombstone and migration decision |
| Merge | Absorb unique mechanisms into canonical owner | Existing evidence paths and replacement |
| Retire | Remove active folder and regenerate | Base-diff tombstone gate |
| Visibility change | Update distribution and access contract | Live authenticated/anonymous readback |

## Access-aware install proof

Use one of these source classes:

- local checkout for deterministic CI and branch validation;
- authenticated Git clone for authorized consumers;
- commit- or digest-pinned private source when the installer supports it.

Run the compatible skills CLI in a clean temporary home. Assert that list
count, installed directories, and installed `SKILL.md` names equal the derived
registry exactly. Incubator and retired names must remain absent.

## Provenance fields

Retain at minimum:

```text
skill_name, source_path, bundle_digest, source_commit, owner, decision_ref,
license_or_notice, evidence_state, generated_at, generator_identity
```

Do not place credentials or access tokens in inventory artifacts. The consumer
obtains repository access independently from the skill package.

## Reconciliation events

Track:

```text
portfolio_inventory_scanned
portfolio_entry_added
portfolio_entry_removed
tombstone_validated
owner_protection_checked
registry_generated
evidence_invalidated
private_install_verified
desired_observed_drift_detected
portfolio_reconciled
```

Minimum properties: candidate commit, base commit, skill name, lifecycle state,
decision/disposition, owner, artifact digest, evidence state, validation command,
observed install result, and failure reference.

## Completion checklist

- Every active name has exactly one physical state.
- Every installable route has admission and eval ownership.
- Every missing base entry has a tombstone.
- Every merge has existing absorption evidence.
- Every protected retirement has an owner decision.
- Every generated claim matches exact-current evidence.
- Local/authenticated list and install match the derived expected set.
- No public directory metadata or anonymous install command remains.
