<think>
The user wants a public skill marketplace repository design for AI agents that avoids prompt spam. They want specific artifacts: skill quality bar, contribution review, install surface, catalog metadata, evals, examples, benchmark proof, and roadmap governance. Answer budget is 650 words max. Let me be concise and audit-friendly.
</think>

```text
Recommended shape: repository-only (stage 1) → static catalog (stage 2) → API registry (stage 3). Skip full marketplace until supply, moderation, and demand justify it.

Repository layout:
.
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── SECURITY.md
├── skills.sh.json
├── registry/
│   ├── skills.json          # catalog metadata index
│   ├── topics.json          # topic graph
│   └── packs.json           # curated bundles by job-to-be-done
├── skills/
│   └── <skill-name>/
│       ├── SKILL.md          # required
│       ├── references/       # optional, 1..n
│       ├── scripts/          # optional, deterministic helpers
│       ├── evals/
│       │   ├── triggers.json # 5+ trigger prompts
│       │   └── outcomes.json # pass/fail expectations
│       └── examples/
│           ├── input.md
│           └── output.md
├── scripts/
│   ├── check_skill_folder.py
│   ├── check_originality.py
│   └── benchmark_run.py
├── docs/
│   ├── skill-quality-bar.md
│   ├── review-process.md
│   └── governance.md
└── .github/workflows/
    ├── validate.yml
    ├── evals.yml
    └── benchmark.yml
```

Skill quality bar (machine-checkable):
- QG-1 Schema: name kebab-case ≤64, matches folder, description starts with "Use when", SKILL.md present.
- QG-2 Triggers: 5+ evals/triggers.json with negative triggers; description does not match >2 unrelated test prompts.
- QG-3 Originality: check_originality.py flags >40% n-gram overlap with prior catalog and refuses direct copy.
- QG-4 Safety: scripts scanned for shell-injection, secret exfil, network exfil, eval-time agent loops.
- QG-5 Resolution: every relative link resolves; no TODO, FIXME, "lorem", or placeholder output.
- QG-6 Examples: at least one realistic input.md + output.md pair, not a toy.
- QG-7 License: explicit LICENSE field; third-party snippets attributed and permitted.
- QG-8 Evals: outcomes.json entries are testable strings, regexes, or JSON schemas.
- QG-9 Provenance: contributor signs DCO and originality declaration.
- QG-10 Freshness: skill unchanged >12 months requires `last-reviewed` bump or archive.

Contribution review (two-gate, human-in-loop):
1. Automated gate: CI runs validate.yml (schema, links, safety, originality, evals format).
2. Curator gate: 2-of-3 maintainer approval on a checklist: usefulness, trigger tightness, originality, safety, eval realism. Auto-merge blocked for: skills copying training data, skills whose description triggers on >30% of a public eval set (prompt spam), skills without evals.

Install surface:
- GitHub raw: `curl -L https://raw.githubusercontent.com/<org>/<repo>/main/skills/<name>/SKILL.md`.
- skills.sh entry: declared in `skills.sh.json` with name, repo, path, version.
- Pack install: `npx skills add <org/repo>:<skill>` and `npx skills add <org/repo>:pack/<pack-name>`.
- Pinning: semver tag per skill; catalog entry `pinned_version` field.

Catalog metadata (registry/skills.json schema):
`{ id, name, version, description, triggers, topics, tags, pack, license, owner, verified, p95_quality, freshness, install_cmd, sha256 }`. `p95_quality` is computed from eval pass rate and reviewer score; `verified` requires human curator sign-off.

Evals + benchmark proof:
- `evals.yml` runs every PR against evals/triggers.json and outcomes.json; emits `eval_report.json` with recall, false-trigger rate, and outcome pass rate.
- `benchmark.yml` runs weekly `scripts/benchmark_run.py` across a held-out public trigger set; publishes results to `docs/benchmarks/<date>.md` and badges in README.
- Goal: <5% false-trigger rate, ≥85% outcome pass rate; failing skills move to `quarantine/` and re-promote on green.

Examples policy: every accepted skill ships one production-shaped example. No "hello world." Examples must show failure modes the skill prevents.

Roadmap governance:
- Stage gates: repo-only (week 0–4) → static catalog (week 4–12, ≥20 verified skills, ≥3 packs) → API registry (week 12+, demand signal ≥50 weekly installs).
- Maintainers: 3-person rotating curators + 1 security reviewer; decisions logged in `.governance/decisions.md`.
- Anti-spam: rate-limit submissions per contributor (5/week), block skills that re-skin an existing one without ≥2x eval improvement, deprecate anything failing the weekly benchmark twice consecutively.
- Public roadmap: `docs/roadmap.md` with proposed → accepted → shipped columns; quarterly review of the quality bar itself.

Top risks + mitigations:
- Prompt spam flood → originality + tight-trigger evals + curator approval.
- Auto-generated low-quality skills → agents may draft, never auto-publish (marketplace-5).
- Stale skills breaking users → freshness gate + pinned versions.
- Supply concentration on one maintainer → co-maintainer requirement before `verified`.
```
