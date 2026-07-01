Recommended shape: **repository-only first**, with a generated **static catalog** once the first curated set reaches ~25 high-quality skills.

## Repository layout

```text
ai-agent-skills/
├─ README.md
├─ LICENSE
├─ CODE_OF_CONDUCT.md
├─ CONTRIBUTING.md
├─ SECURITY.md
├─ GOVERNANCE.md
├─ ROADMAP.md
├─ skills.sh.json
├─ registry/
│  ├─ skills.json
│  ├─ packs.json
│  ├─ creators.json
│  └─ benchmark-results.json
├─ skills/
│  └─ skill-marketplace-creator/
│     ├─ SKILL.md
│     ├─ skill.json
│     ├─ examples/
│     │  ├─ basic.prompt.md
│     │  └─ advanced.prompt.md
│     ├─ evals/
│     │  ├─ trigger.yaml
│     │  ├─ outcome.yaml
│     │  └─ safety.yaml
│     ├─ references/
│     │  └─ playbook.md
│     └─ scripts/
│        └─ validate_inputs.py
├─ docs/
│  ├─ skill-quality-bar.md
│  ├─ anti-prompt-spam-policy.md
│  ├─ review-process.md
│  ├─ install.md
│  ├─ metadata-schema.md
│  ├─ evals.md
│  ├─ benchmark-proof.md
│  └─ ranking-policy.md
├─ scripts/
│  ├─ check_skill_folder.py
│  ├─ validate_registry.py
│  ├─ run_evals.py
│  ├─ detect_prompt_spam.py
│  ├─ check_links.py
│  └─ build_catalog.py
├─ catalog/
│  ├─ index.json
│  └─ static-site/
├─ .github/
│  ├─ PULL_REQUEST_TEMPLATE.md
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ skill_submission.yml
│  │  └─ quality_report.yml
│  └─ workflows/
│     ├─ validate.yml
│     ├─ evals.yml
│     ├─ benchmark.yml
│     └─ publish-catalog.yml
└─ tests/
   ├─ fixtures/
   └─ registry.test.py
```

## Quality gates

- **Schema valid:** every skill has `skill.json`, `SKILL.md`, examples, evals, license metadata, and matching folder/name.
- **Trigger specificity:** description must include clear “Use when…” routing and must not be generic agent bait.
- **Anti-prompt-spam:** reject skills that are only prompt collections, vague “be better at X” instructions, SEO-stuffed descriptions, repeated boilerplate, or broad all-purpose personas.
- **Originality and rights:** every submission includes a rights declaration; copied or lightly paraphrased third-party material is rejected unless explicitly licensed and attributed.
- **Installable:** each skill exposes a stable install path through `skills.sh.json` and `registry/skills.json`.
- **Runnable evals:** each non-trivial skill includes trigger, outcome, and safety evals.
- **Examples:** each skill includes at least one realistic user prompt and expected behavior notes.
- **Safety:** no secrets, private data, unsafe commands, hidden exfiltration, or uncontrolled network/file operations.
- **References resolve:** all local links and scripts must pass validation.
- **Benchmark proof:** accepted skills must publish eval scores or benchmark artifacts in `registry/benchmark-results.json`.

## Skill quality bar

Create `docs/skill-quality-bar.md` with this rubric:

```text
A publishable skill must be:
1. Useful: solves a repeated real task for an agent.
2. Specific: has narrow routing triggers and clear non-use cases.
3. Original: contains synthesized workflow guidance, not copied prose.
4. Testable: includes trigger and outcome evals.
5. Safe: avoids harmful automation and risky hidden behavior.
6. Installable: has registry metadata and stable file paths.
7. Maintainable: has owner, version, changelog, and review status.
```

Minimum review score: **4/5 usefulness, 4/5 trigger specificity, pass safety, pass originality, pass evals.**

## Contribution review

```text
Submission flow:
1. Contributor opens PR using .github/PULL_REQUEST_TEMPLATE.md.
2. CI validates schema, links, anti-spam checks, examples, eval files, and metadata.
3. Maintainer performs usefulness, originality, and safety review.
4. Domain reviewer checks correctness for specialized skills.
5. Curator approves catalog inclusion.
6. Release bot updates registry/skills.json and catalog/index.json.
```

PR template must require:

- Skill name and category.
- Intended users.
- “Use when…” trigger.
- Non-use cases.
- Rights/originality declaration.
- Eval description.
- Safety notes.
- Example prompt.
- Maintenance owner.

## Install surface

Expose three install paths:

```text
# Install from repository
agent skill install github:org/ai-agent-skills/skills/<skill-name>

# Install from registry
agent skill install registry:<skill-name>

# Install from raw manifest
agent skill install https://raw.githubusercontent.com/org/ai-agent-skills/main/skills.sh.json
```

`skills.sh.json`:

```json
{
  "name": "ai-agent-skills",
  "version": "0.1.0",
  "registry": "registry/skills.json",
  "skills_path": "skills",
  "catalog": "catalog/index.json"
}
```

## Catalog metadata

`registry/skills.json` entry:

```json
{
  "name": "skill-marketplace-creator",
  "version": "0.1.0",
  "description": "Use when designing or operating a curated AI agent skill marketplace.",
  "category": "agent-operations",
  "tags": ["marketplace", "skills", "governance", "validation"],
  "path": "skills/skill-marketplace-creator",
  "license": "Apache-2.0",
  "owner": "core-maintainers",
  "status": "reviewed",
  "quality_score": 92,
  "evals": {
    "trigger": "pass",
    "outcome": "pass",
    "safety": "pass"
  },
  "benchmarks": {
    "latest_run": "2026-07-01",
    "result_path": "registry/benchmark-results.json"
  }
}
```

## Evals and benchmark proof

Required eval files:

```text
evals/trigger.yaml   # checks correct invocation and non-invocation
evals/outcome.yaml   # checks task success against expected outputs
evals/safety.yaml    # checks refusal, containment, and risky behavior
```

`registry/benchmark-results.json`:

```json
{
  "skill-marketplace-creator": {
    "version": "0.1.0",
    "trigger_precision": 0.94,
    "trigger_recall": 0.91,
    "outcome_pass_rate": 0.88,
    "safety_pass_rate": 1.0,
    "reviewed_by": ["maintainer", "domain-reviewer"],
    "artifact": "skills/skill-marketplace-creator/evals/"
  }
}
```

Badges in README:

```text
Validated Skills: passing
Catalog Build: passing
Safety Evals: passing
Benchmark Proof: published
Reviewed Submissions Only: yes
```

## Launch plan

1. Publish repository with 8–12 flagship skills, all fully reviewed with examples, evals, and benchmark results.
2. Enable CI validation and require maintainer approval before merge.
3. Generate static catalog from `registry/skills.json`.
4. Publish install instructions, quality bar, and anti-prompt-spam policy.
5. Invite a small set of expert maintainers for curated categories.

## Roadmap governance

```text
Phase 1: Repository-first curated launch.
Phase 2: Static catalog with search, badges, categories, and packs.
Phase 3: API registry for programmatic discovery and install metadata.
Phase 4: Verified creators, richer benchmarks, and enterprise mirrors.
Phase 5: Full marketplace only after moderation, abuse handling, and quality signals mature.
```

Governance rules:

- No automatic publishing from agent-generated drafts.
- Ranking uses quality, freshness, eval coverage, safety, and maintainer review — not popularity alone.
- Paid placement is prohibited until transparent ranking and review controls exist.
- Deprecated skills remain installable by version but hidden from default catalog.

## Risks

- **Prompt spam flooding submissions:** mitigate with CI spam checks, strict trigger rubric, and curator approval.
- **Low-quality generated skills:** require examples, evals, originality declaration, and human review.
- **Unsafe scripts:** sandbox review, explicit permissions, and script-specific safety checks.
- **Catalog trust decay:** publish benchmark proof, review status, owners, and changelogs for every listed skill.
