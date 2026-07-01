Recommended shape: Static catalog (Repository-first)

Repository layout:
```text
.
├── README.md
├── registry/
│   └── catalog.json                 # Catalog metadata: install paths, tags, versions
├── skills/
│   └── <skill-name>/
│       ├── SKILL.md                 # Concise method, routing, and metadata
│       ├── examples/                # Realistic prompts and expected outputs
│       ├── evals/                   # Trigger and outcome test cases
│       └── references/              # Original domain knowledge and workflows
├── docs/
│   ├── skill-quality-bar.md         # Expectations and anti-spam rules
│   ├── contribution-review.md       # PR checklist and review process
│   └── governance-roadmap.md        # Stage progression and maintainer rules
├── scripts/
│   └── validate-skills.py           # CI checks for schema, triggers, and evals
└── .github/
    └── workflows/
        └── validate.yml             # Automated quality gate execution
```

Quality gates:
- **Trigger Specificity (Anti-Spam):** Descriptions must use specific "Use when..." phrasing. Overbroad or generic triggers that hijack standard agent behavior are automatically rejected.
- **Originality Declaration:** Submissions must declare original synthesis. No lightly paraphrased third-party content or unattributed direct quotes.
- **Eval Coverage:** Must include at least one pass/fail trigger test and one outcome test in the `evals/` folder to prove reliable execution.
- **Benchmark Proof:** Submissions must link to or include benchmark proof (e.g., before/after agent outputs) in `examples/` demonstrating measurable utility without introducing prompt injection risks.
- **Schema Validity:** Folder names must match the `name` field (lowercase kebab-case). No TODOs, secrets, or unsafe shell commands.
- **Review Approval:** Automation may draft and validate, but a human curator must approve all PRs based on `docs/contribution-review.md`.

Launch plan:
1. **Bootstrap & Seed:** Stand up the repository, merge 3-5 high-quality flagship skills with complete `evals/` and `examples/`, and publish the `docs/skill-quality-bar.md`.
2. **Enforce CI Gates:** Implement `scripts/validate-skills.py` in GitHub Actions to block PRs that fail schema validation, lack originality declarations, or exhibit trigger overbreadth. 
3. **Establish Governance:** Publish `docs/governance-roadmap.md` detailing the transition from internal curation to verified external maintainers, defining exact criteria for catalog inclusion.
4. **Distribute & Promote:** Submit the repository to open skill directories, create job-specific "skill packs" (e.g., engineering, data), and showcase install commands via repository badges.

Risks:
- **Prompt Spam & Bloat:** Mitigated by strict CI-level trigger validation and a "curate before scaling" philosophy prioritizing excellence over directory size.
- **Unsafe Behaviors:** Mitigated by requiring tightly scoped scripts and mandatory human security review before any catalog publication.
- **Intellectual Property Issues:** Mitigated by enforcing a strict rights/originality declaration in the PR template before human review begins.
