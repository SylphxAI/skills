# Sylphx Agent Skills (`SylphxAI/skills`)

Opinionated, scenario-driven Agent Skills and colocated reference methodologies for autonomous AI agents and human-agent teams across software engineering, system architecture, product design, commercial/partner negotiations, operations, marketing/growth, customer support, and clear communication.

## Core Design Philosophy: Opinionated Methodology vs. Organization State

1. **Skills Encode Chosen Methodology as a Swappable Stack (Not Neutral Option Lists, Intuition, or Organization State)**:
   - In every discipline—how we reason scientifically, how we price and monetize, how we design systems and capacity, how we deliberate as a team, which technology stack we build on, how we score risk, how we prioritize work, how we ship software, and how we write—there are competing schools of thought.
   - Instead of inventing ad-hoc rules, relying on subjective intuition, or piling on negative prohibitions ("do not do X"), we select proven, peer-reviewed or industry-validated methodologies calibrated to a small, self-funded, agent-native company, and record them in each standard's `Method sources` / `Methods table` registry (with an explicit replacement trigger so any method can be swapped when a better-evidenced paper or industry practice outperforms it):
     - **How We Think, Decide & Design (`self-challenge`)**: Strong Inference & Falsification (Platt 1964; Popper 1959), Analysis of Competing Hypotheses (Heuer 1999), Theory of Constraints & Queueing Physics (Goldratt 1984; Little 1961; Kingman 1961), Value-Based Market Pricing & Gross-Margin Maximization (`commercial.md` — Nagle & Müller; Ramanujam & Tacke 2016; Skok SaaS Metrics), Freemium Power-Law IAP Economics (`games.md` — Seufert 2014), Simple Concept / Deep Implementation, 10x/100x Scale, Scale-to-Zero (`architecture.md`), Opinionated Stack Selection (`stack.md`), and Quantitative `5×5` Risk Scoring (`risk.md` — ISO 31000; IEC 31010; FAIR).
     - **How We Deliberate (`swarm-fuse`)**: Dynamic Group Facilitation (`Topic × Participant Context`), Independent Delphi + Red-Team Challenge Angles, and Single-Writer Coordination.
     - **How We Prioritize, Build, Unblock & Ship (`author-item`, `deliver-and-verify`, `prove-it`, `unblock`, `refactor`)**: Cost of Delay Divided by Duration (`priority.md` — Reinertsen 2009 CD3; Graham 2015 Default Alive/Dead), Three-Stage Acceptance Test-Driven Development (ATDD), Work-in-progress limits and work item age, Release Scope Management, Upstream Contribution and Separation of Concerns (first-party client, zero backdoors), Complete Replacement + Systemic Corrective Action + Mistake-Proofing, and Primary-Source Verification.
     - **How We Communicate & Serve (`clear-writing`, `customer-support`, `ambassador`)**: `Audience × Purpose × Channel` calibration, Concrete `❌ Bad vs ✅ Good` side-by-side examples, Deterministic Support Case-State Machines, and In-Character Ambassador (`大使`) Companionship with Adversarial Turing Self-Testing.
   - **Organization State Lives Outside Skills**: Company-specific state (current headcount/size, active project portfolio, live server inventory, or specific rows in an accepted-risk register) belongs in the workspace repository or **Organization Knowledge**—never inside a skill.

2. **Three-Stage Acceptance Test-Driven Development (ATDD) for Every Outcome**:
   - **Stage 1 — Define Acceptance Test Cases First (`author-item` + `self-challenge`)**: Lock down observable positive and negative **Acceptance Test Cases** and pass the Category-Leader Benchmark, YAGNI (You Aren’t Gonna Need It), and Complete Migration tests before implementation starts.
   - **Stage 2 — Verify the Plan Passes the Test Cases (`self-challenge` + `swarm-fuse`)**: Verify that the proposed commercial, operational, growth, product, or technical plan satisfies every Stage 1 acceptance test case, carrying a same-session dated read of any external specification, law, or vendor API.
   - **Stage 3 — Execute and Verify at the Real Surface (`deliver-and-verify` + `prove-it`)**: Execute through one writer, complete caller migration and old-path deletion in the same delivery, and verify the delivered outcome at the real user, partner, customer, or operator surface.

3. **Role-Neutral Triggers & Colocated Reference Standards (Progressive Disclosure)**:
   - Skills trigger on the **observable task moment**, never on a static persona. Every deep domain standard lives in `skills/<name>/references/*.md` beside the skill that uses it, so agents load only the exact reference needed for the task at hand.

## Skills Catalog (13 Skills)

| Skill | Trigger Moment | Colocated Reference Standards (`references/`) |
| --- | --- | --- |
| [`author-item`](skills/author-item/SKILL.md) | Writing or revising a work outcome item or ticket before execution (Stage 1 ATDD, CD3 priority) | `work.md`, `priority.md`, `quality-signals.md` |
| [`self-challenge`](skills/self-challenge/SKILL.md) | Designing/comparing architectures or tech stacks, stress-testing plans/contracts/budgets/risks, questioning over-engineering, or checking root causes | `architecture.md`, `stack.md`, `commercial.md`, `growth.md`, `mechanics.md`, `mechanics-catalogue.md`, `games.md`, `product.md`, `experience.md`, `feedback.md`, `risk.md`, `conduct.md`, `agent-voice.md` |
| [`game-economy`](skills/game-economy/SKILL.md) | Choosing pack contents or prices, changing caps or growth lines, budgeting gifts, checking inflation, or diagnosing falling game sales | `economy-model.md`, `offers-gifts-and-experiments.md`, `sources.md` |
| [`deliver-and-verify`](skills/deliver-and-verify/SKILL.md) | Executing, finishing, merging, deploying, and verifying a change end-to-end (Limit Work in Progress, Release Scope Management, Upstream-First, Complete Replacement) | `parity.md`, `code.md`, `auth.md`, `security.md`, `integration.md`, `identifiers.md`, `performance.md`, `dx.md` |
| [`prove-it`](skills/prove-it/SKILL.md) | Reviewing a PR/diff, auditing contract/SLA evidence, or verifying a live status/readiness claim against primary sources | *(Uses Stage 1 acceptance criteria and live system queries)* |
| [`patrol`](skills/patrol/SKILL.md) | Checking other workers' output for a broken rule, a late finish time, spend against a cap or a contradiction | *(Reads and reports; the work's owner changes it)* |
| [`swarm-fuse`](skills/swarm-fuse/SKILL.md) | Facilitating multi-agent/group deliberation (`Topic × Participant Context`) when blocked, stalled 10+ minutes, or resolving cross-domain trade-offs | *(Coordinates with `self-challenge` and `deliver-and-verify`)* |
| [`unblock`](skills/unblock/SKILL.md) | Restoring progress when work hits a blocker, CI/build failure, runner/env error, `"done but still broken"` report, or upstream dependency defect | *(Coordinates with `swarm-fuse` and `self-challenge`)* |
| [`refactor`](skills/refactor/SKILL.md) | Splitting oversized files/modules/test suites, deleting dead code/flags, consolidating duplicate logic into one SSOT, or restructuring into vertical slices | `health.md` |
| [`clear-writing`](skills/clear-writing/SKILL.md) | Drafting or rewriting user-facing replies, release notes, technical docs, partner emails, articles, or landing-page copy (`Audience × Purpose × Channel`) | `work-communication.md`, `articles-and-copy.md`, `terminology.md` |
| [`author-skill`](skills/author-skill/SKILL.md) | Creating, refactoring, or auditing reusable `SKILL.md` files and their `references/` | `docs.md` |
| [`customer-support`](skills/customer-support/SKILL.md) | Handling official customer support tickets, billing/refund remedies, account recovery, privacy requests, and statutory disclosures | `product-facts.md` |
| [`ambassador`](skills/ambassador/SKILL.md) | Engaging users or players as an in-character brand or game ambassador (`大使`, such as `小亨`), playmate companion, or VIP relationship host | `behavioral-operations-and-retention.md` |

## Installation Across Agent Harnesses

### 1. Universal Skills CLI (`npx skills` — Claude Code, OpenCode, Codex, Cursor, Windsurf, Antigravity, Amp)

```bash
# Install all skills globally across detected coding agents
npx skills add SylphxAI/skills -g -y

# Or install into the current project workspace
npx skills add SylphxAI/skills -y

# Update all installed skills to the latest commit on main
npx skills update
```

### 2. Claude Code Native Plugin Marketplace

```bash
claude plugin marketplace add SylphxAI/skills
claude plugin install sylphx-skills@sylphx
```

To enable automatic background updates in Claude Code (disabled by default for third-party marketplaces):
- Run `/plugin` -> open the **Marketplaces** tab -> enable **Auto-update** for `sylphx`, or
- Set `"autoUpdate": true` on the `sylphx` entry under `extraKnownMarketplaces` in `.claude/settings.json`.

### 3. OpenCode / Codex / Antigravity Direct Git Clone & Symlink

```bash
git clone https://github.com/SylphxAI/skills.git ~/.local/share/sylphx-skills

# OpenCode / Codex / Universal (.agents/skills)
mkdir -p ~/.agents/skills && ln -sfn ~/.local/share/sylphx-skills/skills/* ~/.agents/skills/

# Claude Code (~/.claude/skills)
mkdir -p ~/.claude/skills && ln -sfn ~/.local/share/sylphx-skills/skills/* ~/.claude/skills/

# Antigravity (~/.gemini/antigravity-cli/skills)
mkdir -p ~/.gemini/antigravity-cli/skills && ln -sfn ~/.local/share/sylphx-skills/skills/* ~/.gemini/antigravity-cli/skills/
```

## Verification

Run the repository verification script to validate YAML frontmatter (`PyYAML`),
plugin manifests, relative Markdown links and anchors, direct reference coverage,
and every skill's positive and negative trigger contracts:

```bash
python3 scripts/verify-skills.py
python3 scripts/verify-terminology.py
python3 -B -m unittest discover -s scripts -p "test_*.py"
```

The existing `ci-ok` check runs the full verifier for pull requests, merge queue
entries, and pushes to `main`. It includes the regression tests; running unittest
separately gives named results when debugging.

### Trigger cases

[The trigger corpus](tests/skill-trigger-cases.json) contains at least three
positive prompts and three negative controls per skill. Every case quotes the
applicable clause from its current description. A negative case names the
neighbouring skill in that clause, or uses `null` for an explicit no-skill or
direct-work boundary. Skills may be combined for composite tasks; a negative
control tests the named skill against the primary task, not every possible
subtask.

The verifier discovers `skills/*/SKILL.md` rather than maintaining a second skill
list. A new skill without both case lists, an obsolete case, a wrong-polarity
clause, a missing route, or a duplicate/conflicting prompt fails CI. Metadata
checks reject malformed or duplicate YAML keys, non-string descriptions, invalid
names, descriptions over 1,024 characters, and main files of 500 lines or more.
Reference checks require each reference to be linked from its own `SKILL.md`.

These are **deterministic editorial and contract checks**, not a keyword router
or proof that a model loads the right skill. When changing a description, also
run a blind evaluation of positive and negative prompts with the affected model
and runtime when available. Keep expected answers and quoted clauses out of that
evaluation's input, and record prompts, model/runtime, per-case decisions, and
any confusion. A metadata-only model check is not an end-to-end automatic skill
loading test. See [skill authoring](skills/author-skill/SKILL.md) for that evidence
boundary.

## License

[MIT](LICENSE)
