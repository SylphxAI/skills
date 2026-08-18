# Documentation Standard

Place product facts in the locked industry homes. Company law is
[standards/docs.md](https://github.com/SylphxAI/owner/blob/main/standards/docs.md)
and [ADR-008-DOC-LOCK](https://github.com/SylphxAI/owner/blob/main/decisions/ADR-008-DOC-LOCK.md).
This method cites that law. It does not replace it and does not copy the owner
notebook.

## Method

1. Map the fact to one locked home. Do not create a second writable path
   for the same layer.
2. Write destination in `docs/vision.md`. Speech “北極星 / North Star”
   means that file.
3. Treat `docs/NORTH-STAR.md`, `docs/NORTH_STAR.md`, and Platform
   `docs/north-star/MAXIMUM-AMBITION.md` as accepted destination aliases
   only. New destination files are only `docs/vision.md`.
4. When the alias is the current destination, keep this five-line header
   at the top: this file is destination (北極星); it is not a North Star
   Metric; it is not this week's Goal.
5. Put a North Star Metric only as a short section inside the destination
   file, and only when one real customer-value quantity exists. Omit it
   otherwise. Do not invent a metric so the repo “has a North Star.”
6. Keep capability architecture, Goal, PRD, spec, and ADR in their own homes. README and
   `PROJECT.md` only link. Do not add file-existence CI.

## Locked homes

| Question | Home | Path |
| --- | --- | --- |
| What is this repo? How do I run it? | README | `README.md` |
| What finished product is this? For whom? Not doing what? | Destination | `docs/vision.md` |
| One customer-value quantity? | North Star Metric | Optional section in the destination file |
| What durable responsibilities and prerequisites exist? | Capability DAG | `docs/capabilities.md` (ID \| Capability \| Depends on \| Done when) |
| What problem, users, requirements, scope, success, and risks define a feature? | PRD | `docs/prd.md` when a real PRD is needed |
| What completable slice now? | Goal | this product's current claimed slice |
| Exact I/O and failures? | Spec / tests | Schema, protobuf, tests |
| Why did we choose A? | ADR | `docs/adr/` |
| How does a user learn / do / look up? | Diátaxis | User docs only |
| How do we operate or recover? | Runbook | `docs/runbooks/` when ops exist |

Vision is not a metric. A metric is not a Goal. A Goal is not a PRD.

## Repo class

| Class | Destination | NSM |
| --- | --- | --- |
| Tiny library | One paragraph in README | No |
| Active product | `docs/vision.md` or the accepted alias with the five-line header | Only if a real customer quantity exists |
| Remaster | 1:1 with the original | No |
| Owner notebook | Not a product | No |

## Adopt while already touching the repo

1. Add `docs/vision.md` if missing, or the five-line header on the alias.
2. Point README at the destination. Do not copy it.
3. Leave historical ADRs and research dumps historical.
4. Active products converge entry docs when a claimed node already touches the
   authority. Add or extend `docs/capabilities.md` with the capability graph
   when that product is touched. Migrate an existing capability-only
   `docs/prd.md` rather than creating an alias; keep a real PRD when its product
   problem and requirements are still active. Standby and retired products
   remain custody/history. Do not run a one-shot fleet rewrite of empty files.

## Catch-up

README → destination → capability DAG → real PRD if the feature has one → the
latest binding ADR → the code you will change. Do not reconstruct from chat or
the whole ADR tree.

## Boundaries

- This standard grants no tools, credentials, or permissions.
- Product repositories own product facts. `SylphxAI/owner` owns company
  documentation law. This package does not invent a second map.
- A missing heading is not a product defect. A second writable
  destination is.
