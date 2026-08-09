# Principles self-audit (2026-08-09)

Audit of this repository against the universal doctrine 深正簡 · 改觀快 · 穩安平
(Depth · Correctness · Simplicity · Evolvability · Observability ·
Performance & Velocity · Reliability · Security · Economy), dogfooding the
principles on the skills repository itself. Baseline: main `f13ef2e`, 58
listings, `check.mjs` integrity OK, 57/57 tests.

| Principle | Verdict | Top findings | Action |
| --- | --- | --- | --- |
| 深 Depth | Healthy | All 58 SKILL.md bodies carry method/workflow with depth in references (449 md, 2.67 MB); no empty shells. | — |
| 正 Correctness | 2 fixes | P1 `engineering-standard/README.md` stale "13 primary attributes" / "Memory set of 8" (missed in #123); P2 `ADR-0028` broken link to `research-basis.md`; P2 `ABSORPTION-GROK-SKILLS-2026-08-06.md` in docs/ root with retired paths (`build-keel-title`, `sylphx-methods`) and stale "method library" model. | Fixed in this PR |
| 簡 Simplicity | 2 recommendations | P2 `drive-to-delivery` and `pursue-product-objective` state the same objective loop twice (concept duplication; both L1/L2/L3, same terminal discipline); P2 "constraint packs are not listings" restated in 29 files; P3 "Composition and output" boilerplate in 19 packs. | Recommend consolidation |
| 改 Evolvability | Healthy | `legacy-agents-projection.mjs` live-used, not dead; 69 archived docs in `docs/history/`; ledger documents 120 → 57 → 58 churn. | — |
| 觀 Observability | Healthy | Installer status/verify + digest reconciliation + auto-sync scheduler, covered by 1800-line runtime tests; CI has PR-head / merge_group / main lanes. Host-install drift (installed constitution ≠ main) is caught by `status`. | Run install/status on doctrine changes |
| 快 Performance | Healthy | build:catalog ~1 s, check ~1 s, tests 32 s, CI 1m04s (budget 10m); descriptions 4659/8000 chars. | — |
| 穩 Reliability | Healthy | 57/57 tests ×3 consecutive runs; deterministic (20 ms polling loops only); pinned CI actions; reproducible `npm ci`. | — |
| 安 Security | Healthy | No secrets (check.mjs patterns + wider scan); CI least-privilege (`contents: read`), pinned SHAs, `--ignore-scripts`, owned runner; SECURITY.md present. | — |
| 平 Economy | Lean surface, 1 debt | Attention: constitution 2990 B floor, 4659 chars descriptions, 4.6 KB avg body — lean for 58 jobs. Entropy debt: 29× doctrine restatement + 19× boilerplate means future edits pay compound interest; dedupe to canonical homes. | Recommend consolidation |

## Actions in this PR

1. `skills/build-product/references/engineering-standard/README.md`: 14 primary
   attributes, memory set 9 (深正簡 · 改觀快 · 穩安平).
2. `docs/history/adr/ADR-0028-...md`: repair link to
   `skills/write-high-signal-update/references/research-basis.md`.
3. `docs/ABSORPTION-GROK-SKILLS-2026-08-06.md` → `docs/history/` with historical
   banner; retired/incorrect destination paths corrected.

## Open recommendations (not done here)

- **Consolidate the objective loop**: make `pursue-product-objective` (or
  `drive-to-delivery`) the sole owner of the research→execute→verify→terminal
  loop; keep the other as a thin mode/alias without restating the method.
- **Single canonical doctrine home**: MODEL.md owns "constraint packs are not
  listings"; other docs link instead of restating (29 → ~4 places).
- **Shared composition contract**: one referenced doc for the "Composition and
  output" contract instead of 19 near-identical copies.
- **Verification**: re-run this audit after each doctrine/catalog change;
  `node runtime/sylphx-skills.mjs status --agent <host>` must match main.
