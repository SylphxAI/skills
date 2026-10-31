# Sylphx Agent Skills (`SylphxAI/skills`)

Opinionated, scenario-driven Agent Skills and colocated reference methodologies for autonomous AI agents and human-agent teams across software engineering, system architecture, product design, commercial/partner negotiations, operations, marketing/growth, customer support, and clear communication.

## Core Design Philosophy: Opinionated Methodology vs. Organization State

1. **Skills Encode Chosen Methodology as a Swappable Stack (Not Neutral Option Lists, Intuition, or Organization State)**:
   - In every discipline—how we reason scientifically, how we price and monetize, how we design systems and capacity, how we deliberate as a team, which technology stack we build on, how we score risk, how we prioritize work, how we ship software, and how we write—there are competing schools of thought.
   - Instead of inventing ad-hoc rules, relying on subjective intuition, or piling on negative prohibitions ("do not do X"), we select proven, peer-reviewed or industry-validated methodologies calibrated to a small, self-funded, agent-native company, and record them in each standard's `Method sources` / `Methods table` registry (with an explicit replacement trigger so any method can be swapped when a better-evidenced paper or industry practice outperforms it):
     - **How We Think, Decide & Design (`self-challenge`)**: Strong Inference & Falsification (Platt 1964; Popper 1959), Analysis of Competing Hypotheses (Heuer 1999), Theory of Constraints & Queueing Physics (Goldratt 1984; Little 1961; Kingman 1961), Value-Based Market Pricing & Gross-Margin Maximization (`commercial.md` — Nagle & Müller; Ramanujam & Tacke 2016; Skok SaaS Metrics), Freemium Power-Law IAP Economics (`games.md` — Seufert 2014), Simple Concept / Deep Implementation, 10x/100x Scale, Scale-to-Zero (`architecture.md`), Opinionated Stack Selection (`stack.md`), and Quantitative `5×5` Risk Scoring (`risk.md` — ISO 31000; IEC 31010; FAIR).
     - **How We Deliberate (`swarm-fuse`)**: Dynamic Group Facilitation (`Topic × Participant Context`), Independent Delphi + Red-Team Challenge Angles, and Single-Writer Coordination.
     - **How We Prioritize, Build, Unblock & Ship (`author-item`, `deliver-and-verify`, `prove-it`, `unblock`, `refactor`)**: Cost of Delay Divided by Duration (`priority.md` — Reinertsen 2009 CD3; Graham 2015 Default Alive/Dead), Three-Stage Acceptance Test-Driven Development (ATDD), Work-in-progress limits and work item age, Release Scope Management, Upstream Contribution and Separation of Concerns (first-party client, zero backdoors), Complete Replacement + Systemic Corrective Action + Mistake-Proofing, and Primary-Source Verification.
     - **How We Communicate & Serve (`clear-writing`, `customer-support`)**: `Audience × Purpose × Channel` calibration, Concrete `❌ Bad vs ✅ Good` side-by-side examples, and Deterministic Support Case-State Machines.
   - **Organization State Lives Outside Skills**: Company-specific state (current headcount/size, active project portfolio, live server inventory, or specific rows in an accepted-risk register) belongs in the workspace repository or **Organization Knowledge**—never inside a skill.

2. **Three-Stage Acceptance Test-Driven Development (ATDD) for Every Outcome**:
   - **Stage 1 — Define Acceptance Test Cases First (`author-item` + `self-challenge`)**: Lock down observable positive and negative **Acceptance Test Cases** and pass the Category-Leader Benchmark, YAGNI (You Aren’t Gonna Need It), and Complete Migration tests before implementation starts.
   - **Stage 2 — Verify the Plan Passes the Test Cases (`self-challenge` + `swarm-fuse`)**: Verify that the proposed commercial, operational, growth, product, or technical plan satisfies every Stage 1 acceptance test case, carrying a same-session dated read of any external specification, law, or vendor API.
   - **Stage 3 — Execute and Verify at the Real Surface (`deliver-and-verify` + `prove-it`)**: Execute through one writer, complete caller migration and old-path deletion in the same delivery, and verify the delivered outcome at the real user, partner, customer, or operator surface.

3. **Role-Neutral Triggers & Colocated Reference Standards (Progressive Disclosure)**:
   - Skills trigger on the **observable task moment**, never on a static persona. Every deep domain standard lives in `skills/<name>/references/*.md` beside the skill that uses it, so agents load only the exact reference needed for the task at hand.

## Skills Catalog (10 Skills)

| Skill | Trigger Moment | Colocated Reference Standards (`references/`) |
| --- | --- | --- |
| [`author-item`](skills/author-item/SKILL.md) | Writing or revising a work outcome item or ticket before execution (Stage 1 ATDD, CD3 priority) | `work.md`, `priority.md`, `quality-signals.md` |
| [`self-challenge`](skills/self-challenge/SKILL.md) | Designing/comparing architectures or tech stacks, stress-testing plans/contracts/budgets/risks, questioning over-engineering, or checking root causes | `architecture.md`, `stack.md`, `commercial.md`, `growth.md`, `mechanics.md`, `mechanics-catalogue.md`, `games.md`, `product.md`, `experience.md`, `feedback.md`, `risk.md`, `conduct.md`, `agent-voice.md` |
| [`deliver-and-verify`](skills/deliver-and-verify/SKILL.md) | Executing, finishing, merging, deploying, and verifying a change end-to-end (Limit Work in Progress, Release Scope Management, Upstream-First, Complete Replacement) | `parity.md`, `code.md`, `auth.md`, `security.md`, `integration.md`, `identifiers.md`, `performance.md`, `dx.md` |
| [`prove-it`](skills/prove-it/SKILL.md) | Reviewing a PR/diff, auditing contract/SLA evidence, or verifying a live status/readiness claim against primary sources | *(Uses Stage 1 acceptance criteria and live system queries)* |
| [`swarm-fuse`](skills/swarm-fuse/SKILL.md) | Facilitating multi-agent/group deliberation (`Topic × Participant Context`) when blocked, stalled 10+ minutes, or resolving cross-domain trade-offs | *(Coordinates with `self-challenge` and `deliver-and-verify`)* |
| [`unblock`](skills/unblock/SKILL.md) | Restoring progress when work hits a blocker, CI/build failure, runner/env error, `"done but still broken"` report, or upstream dependency defect | *(Coordinates with `swarm-fuse` and `self-challenge`)* |
| [`refactor`](skills/refactor/SKILL.md) | Splitting oversized files/modules/test suites, deleting dead code/flags, consolidating duplicate logic into one SSOT, or restructuring into vertical slices | `health.md` |
| [`clear-writing`](skills/clear-writing/SKILL.md) | Drafting or rewriting user-facing replies, release notes, technical docs, partner emails, articles, or landing-page copy (`Audience × Purpose × Channel`) | `work-communication.md`, `articles-and-copy.md`, `terminology.md` |
| [`author-skill`](skills/author-skill/SKILL.md) | Creating, refactoring, or auditing reusable `SKILL.md` files and their `references/` | `docs.md` |
| [`customer-support`](skills/customer-support/SKILL.md) | Replying to incoming customer or user support messages with deterministic state and priority rules | `product-facts.md` |

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

Run the repository verification script to validate all YAML frontmatters (`PyYAML`), plugin manifests, relative Markdown links, and reference coverage:

```bash
python3 scripts/verify-skills.py
python3 scripts/verify-terminology.py
python3 -m unittest discover -s scripts -p "test_*.py"
```

## License

[MIT](LICENSE)
