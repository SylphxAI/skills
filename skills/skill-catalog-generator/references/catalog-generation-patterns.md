# Catalog Generation Patterns

## Catalog state machine

```text
source_repo -> skill_inventory -> metadata_normalized -> quality_scored -> grouped_catalog -> install_verified -> published_catalog -> feedback_loop
       |              |                    |                 |                  |
       v              v                    v                 v                  v
blocked_source   missing_artifact     manual_review     ungrouped_skill     stale_listing
```

## Rule IDs

- `catalog-gen-1` — Treat the repository as the source of truth; generated catalogs must derive from skill folders and registry data.
- `catalog-gen-2` — Group by user job and product lifecycle first, then by internal taxonomy.
- `catalog-gen-3` — Score observable artifacts: SKILL.md trigger, reference depth, evals, examples, metadata, installability, and docs placement.
- `catalog-gen-4` — Distinguish current coverage, next-depth targets, and speculative roadmap.
- `catalog-gen-5` — Keep public catalogs free of private doctrine, credentials, customer data, and unsupported claims.
- `catalog-gen-6` — Prefer stable URLs and install commands; broken links are catalog blockers.
- `catalog-gen-7` — A high-value marketplace entry states the job, audience, proof, install command, and quality gate.
- `catalog-gen-8` — Gaps should become skill candidates only when they map to repeated work and concrete artifacts.
- `catalog-gen-9` — Rank skills by usefulness and evidence, not novelty or naming alone.
- `catalog-gen-10` — Refresh catalog artifacts after every skill add, rename, delete, or metadata change.

## Quality score table

| Signal | 0 | 1 | 2 |
| --- | --- | --- | --- |
| Trigger | Generic or missing | Clear domain | Clear domain plus negative boundary |
| Reference | None | One checklist | Rules plus table/state/events |
| Eval | Missing | Positive only | Positive, negative, expected behavior |
| Demo | Missing | Prompt only | Prompt plus weak baseline and skill-shaped behavior |
| Install | Not listed | Registry only | Registry, catalog, CLI verified |
| Freshness | Unknown | Dated review | Last validation proof recorded |

## Decision table

| Scenario | Catalog action | Review action | Publish action |
| --- | --- | --- | --- |
| New skill batch | Regenerate registry and catalog | Check group placement and docs count | Run install verifier |
| Skill has weak reference | Keep preview status | Add state machine/table/events | Do not promote quality claim |
| Public marketplace launch | Create short and long descriptions | Verify install and live links | Submit to directories |
| Private skill collection | Keep separate index | Redact internal data | Publish only private registry |
| Coverage gap found | Add roadmap item | Validate user demand and artifact shape | Create skill only if reusable |

## Event schema

Track: `skill_inventory_scanned`, `skill_quality_scored`, `skill_catalog_generated`, `skill_grouping_changed`, `skill_gap_identified`, `skill_install_verified`, `catalog_link_checked`, `directory_submission_prepared`, `catalog_feedback_received`.

Minimum properties: skill name, group, source path, artifact counts, score components, validation command, commit, reviewer, publish surface, and gap reason.

## Catalog checklist

- All listed skills resolve to `skills/<name>/SKILL.md`.
- Each skill has at least one reference, eval, behavior example, and `agents/openai.yaml`.
- Groups are job-oriented and mutually understandable to outside users.
- Marketplace copy avoids unverifiable superlatives.
- Install commands and default-branch URLs work.
- The roadmap states next gaps without implying they are already shipped.
