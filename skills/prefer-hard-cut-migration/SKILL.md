---
name: prefer-hard-cut-migration
description: "Policy: default hard-cut migration; ban long dual-path compatibility debt unless large-scale user impact forces expand-contract with a dated retirement."
---

# Prefer Hard-Cut Migration

Policy constraints—apply while implementing migrations, API changes, skill
retirements, stack upgrades, or data cutovers. Not a product job cycle.

## Default

**Migrate cleanly. Do not keep backward-compatible dual paths “just in case.”**

1. **Hard-cut is the default.** One destination, verified cutover, predecessor
   retired in the same program of work.
2. **Compatibility is exceptional.** Keep a dual path only when **all** hold:
   - demonstrated **large-scale user or live production** impact if cut hard; and
   - a **measured** risk that expand-contract reduces; and
   - a **dated retirement** and owner for the old path.
3. **No residual dual-stack.** Permanent shims, forever aliases, silent dual
   writers, or “we’ll remove later” without a claimable retirement gate are
   forbidden tech debt.
4. **Migration over compatibility.** Prefer one-step rewrite, re-pin, reinstall,
   or regenerate over multi-version matrix support unless the exception bar is
   met.
5. **Evidence before exception.** “Might break someone” is not enough without
   scale, path, and cost of hard-cut vs dual-path.

## Method

1. Name the **destination** state and the **predecessor** to retire.
2. Choose cut strategy:
   - **Hard-cut** (default): change + migrate + verify + delete predecessor.
   - **Expand-contract** (exception): expand → migrate traffic/data → contract;
     contract is mandatory with date/owner.
3. Verify original oracles on the destination. Local green alone is not cutover.
4. Remove predecessor code, flags, packages, docs, and tests that only served the
   old path. Do not leave demoted dual paths as “optional.”
5. Record material exceptions in an ADR with expiry and replacement.

## When to use

- API, schema, skill, package, runtime, or host instruction changes
- Retiring dual packages, flags, shims, or DT/legacy lanes
- Temptation to keep “backward compatible” without a forced user scale argument

## When not to use

- Pure feature work with no predecessor surface
- Risk-matched expand-contract already required by proven live data/effect risk
  under `engineering-standard` / `parallel-change-integration-standard`—still
  apply this policy’s **no residual dual-stack** and **dated retirement** rules

## Composition

Open while migrating:

- `engineering-standard` — migrate predicates and verification
- `instruction-evolution-standard` — skill/constitution generations
- `parallel-change-integration-standard` — only under measured contention
- `author-skill` / `curate-skill-repository` — skill portfolio retirements

## Boundaries

- Does not grant deploy or credential capabilities.
- Does not authorize silent production breakage: hard-cut still needs
  verification and delivery-boundary honesty.
- Historical ADRs may document old dual paths; they are not permission to keep
  them running.
