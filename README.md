# Sylphx Agent Skills (`SylphxAI/skills`)

Universal, scenario-driven Agent Skills and colocated reference standards for autonomous AI agents and human-agent teams across software engineering, product design, commercial/partner negotiations, operations, marketing/growth, and customer support.

## Core Design Principles

1. **Three-Stage Acceptance Test-Driven Development (ATDD) for Every Task**:
   - **Stage 1 — Define Acceptance Test Cases First (`author-item` + `self-challenge`)**: Before proposing a plan or executing work, lock down observable positive and negative **Acceptance Test Cases** and evaluate the goal against the three universal standards:
     1. **Category-Leader Benchmark** (when designing or changing a product surface, commercial/growth mechanic, or platform capability, benchmark against the category leader and match or beat it in one step; skip for routine operational tasks or internal bug fixes with no category benchmark).
     2. **Zero-Unrequested-Mechanism Simplification** (no unrequested throttles, queues, approval rituals, or speculative abstractions).
     3. **One-Shot Direct Path** (complete replacement and cleanup in the same delivery).
   - **Stage 2 — Verify the Plan Passes the Test Cases (`self-challenge` + `swarm-fuse`)**: Verify that the proposed commercial, operational, growth, product, or technical plan satisfies every Stage 1 acceptance test case, and cite a same-session dated read whenever the plan depends on an external specification, protocol, law, or vendor API.
   - **Stage 3 — Execute and Verify at the Real Surface (`deliver-and-verify` + `prove-it`)**: Execute through one writer, clean up superseded paths, and verify the delivered outcome at the real user, partner, customer, or operator surface.
2. **Role-Neutral, Moment-Triggered Skills**:
   - Skills trigger on the **situation and moment**, never on a static job title or persona. Whether a single worker agent is executing a task or a multi-agent team is deliberating on a cross-domain decision, the exact same skills apply.
3. **Colocated Reference Standards (Progressive Disclosure)**:
   - There is no standalone `standards/` directory that agents must memorize up front. Every domain standard lives inside the `references/` folder of the skill that uses it when triggered, so agents load only the exact reference needed for the current task.

## Skills Catalog

| Skill | Trigger Moment | Colocated Reference Standards (`references/`) |
| --- | --- | --- |
| [`author-item`](skills/author-item/SKILL.md) | Writing or revising a work outcome item before execution (Stage 1 ATDD) | `work.md`, `priority.md`, `quality-signals.md` |
| [`self-challenge`](skills/self-challenge/SKILL.md) | Challenging Stage 1 acceptance criteria, Stage 2 plans/designs/root causes, Stage 3 completion claims, or any 30+ minute wait | `product.md`, `experience.md`, `growth.md`, `mechanics.md`, `mechanics-catalogue.md`, `commercial.md`, `games.md`, `feedback.md`, `conduct.md`, `agent-voice.md`, `risk.md`, `architecture.md`, `stack.md` |
| [`deliver-and-verify`](skills/deliver-and-verify/SKILL.md) | Executing an authorized outcome end-to-end through Stage 1, Stage 2, and Stage 3 verification | `code.md`, `auth.md`, `security.md`, `integration.md`, `identifiers.md`, `performance.md`, `dx.md` |
| [`prove-it`](skills/prove-it/SKILL.md) | Turning any claim into primary-source evidence or running a convergent one-pass review | *(Uses Stage 1 acceptance criteria and live system queries)* |
| [`swarm-fuse`](skills/swarm-fuse/SKILL.md) | Facilitating multi-angle group deliberation when a problem hits a wall, stalls 10+ minutes, or spans domains | *(Coordinates with `self-challenge` and `deliver-and-verify`)* |
| [`unblock`](skills/unblock/SKILL.md) | Restoring progress the moment work stops on a refusal, missing grant, red check, or external dependency | *(Coordinates with `swarm-fuse` and `self-challenge`)* |
| [`refactor`](skills/refactor/SKILL.md) | Running a behavior-preserving repository slim-down, dead-code deletion, or vertical-slice restructuring | `health.md` |
| [`author-skill`](skills/author-skill/SKILL.md) | Creating, refactoring, or auditing reusable `SKILL.md` files and their `references/` | `docs.md` |
| [`support-agent`](skills/support-agent/SKILL.md) | Answering customer or player support messages autonomously with deterministic state and priority rules | `product-facts.md` |

## Installation Across Agent Harnesses

### 1. Universal Skills CLI (`npx skills` — Claude Code, OpenCode, Codex, Cursor, Windsurf, Antigravity, Amp)

```bash
# Install all skills globally across detected agent harnesses
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
```

## License

[MIT](LICENSE)
