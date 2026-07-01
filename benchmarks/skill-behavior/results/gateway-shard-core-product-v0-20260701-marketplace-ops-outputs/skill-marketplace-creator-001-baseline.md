# Public Skill Marketplace Repository for AI Agents

## 1. Repository Model

**Goal:** publish reusable, testable agent “skills” (tools/workflows/policies) rather than prompt snippets.

A skill is accepted only if it includes:

```text
skill/
  manifest.yaml
  README.md
  src/
  examples/
  evals/
  tests/
  benchmark/
  SECURITY.md
  LICENSE
```

A “skill” must provide at least one of:

- callable tool API
- workflow with typed inputs/outputs
- retrieval/index package
- planner/action policy
- domain-specific evaluator
- integration adapter

Pure prompt templates are **not accepted** unless bundled with executable logic, test cases, evals, and measurable behavior.

---

## 2. Skill Quality Bar

Each submitted skill must pass a minimum bar before catalog listing.

### Required

| Area | Requirement |
|---|---|
| Functionality | Skill runs from clean install using documented command |
| Interface | Typed input/output schema, versioned contract |
| Safety | Declares permissions, network/file/API access, data handling |
| Reliability | Unit tests plus at least one end-to-end example |
| Evaluation | Automated eval suite with pass/fail criteria |
| Reproducibility | Pin dependencies or provide lockfile/container |
| Documentation | Clear README, limitations, failure modes |
| Licensing | OSI-approved license or explicit marketplace-compatible license |
| Maintenance | Owner, issue policy, support window |
| Security | No secrets, no hidden network calls, dependency scan passes |

### Scoring

Skills receive a public score:

```text
Quality Score = 100 points

Correctness evals        25
Test coverage            15
Security posture         15
Documentation/examples   15
Reproducibility          10
API/schema quality       10
Maintenance signals      5
User feedback            5
```

Catalog tiers:

- **Experimental:** ≥60
- **Verified:** ≥75
- **Recommended:** ≥90 plus benchmark proof
- **Deprecated:** failing maintenance, security, or compatibility checks

---

## 3. Contribution Review Process

### Submission Gates

1. **Automated validation**
   - manifest schema check
   - dependency/license scan
   - malware/secret scan
   - install smoke test
   - eval runner execution
   - reproducibility check

2. **Human review**
   - confirms skill is not prompt spam
   - checks documentation clarity
   - validates permissions and safety disclosures
   - reviews benchmark claims
   - assesses duplicate/low-value submissions

3. **Maintainer decision**
   - approve
   - request changes
   - reject with reason
   - quarantine for security review

### Anti-Spam Rules

Rejected by default:

- prompt-only submissions
- trivial wrappers around existing skills with no added value
- SEO/catalog stuffing
- fake benchmark claims
- generated bulk submissions without real tests
- skills that require hidden proprietary services without disclosure
- duplicate packages with minor wording changes

Rate limits:

- new contributors: 3 pending submissions
- organizations: quota based on acceptance rate
- repeated spam: cooldown or ban

---

## 4. Install Surface

Skills should be installable through a standard CLI and API.

### CLI

```bash
agent-skill search postgres
agent-skill inspect org/postgres-query@1.2.0
agent-skill install org/postgres-query@1.2.0
agent-skill eval org/postgres-query
agent-skill remove org/postgres-query
```

### Manifest-Driven Install

```yaml
name: org/postgres-query
version: 1.2.0
runtime: python>=3.11
entrypoint: src/main.py:skill
permissions:
  network:
    allowed_hosts:
      - "*.example-db.com"
  filesystem:
    read: []
    write: ["./tmp"]
secrets:
  required:
    - POSTGRES_DSN
```

### Agent Runtime Contract

Each installed skill exposes:

```json
{
  "name": "org/postgres-query",
  "version": "1.2.0",
  "description": "Safely query Postgres using parameterized SQL.",
  "input_schema": {},
  "output_schema": {},
  "permissions": {},
  "eval_command": "agent-skill eval ."
}
```

Agents should see concise tool descriptions, schemas, examples, permissions, and failure modes — not long promotional prompt text.

---

## 5. Catalog Metadata

Required `manifest.yaml` fields:

```yaml
name: org/skill-name
version: 1.0.0
summary: One-line functional description
description: Longer description without marketing spam
author:
  name:
  contact:
license:
tags:
  - database
  - sql
category: data
runtime:
entrypoint:
input_schema:
output_schema:
permissions:
dependencies:
examples:
  - examples/basic.md
evals:
  command: agent-skill eval .
benchmarks:
  report: benchmark/report.md
  dataset:
  commit:
security:
  disclosure_policy: SECURITY.md
maintenance:
  status: active
  support_until:
  maintainers:
compatibility:
  agent_protocols:
  runtimes:
```

Catalog pages display:

- quality score
- install command
- verified permissions
- eval pass rate
- benchmark summary
- maintainer identity
- last release date
- open issues
- security advisories
- deprecation status

---

## 6. Evals

Every skill must include executable evals.

### Eval Types

Minimum:

- happy-path task
- invalid input case
- permission/safety case
- regression case

Recommended:

- adversarial input
- latency/cost measurement
- multi-agent use case
- real-world fixture test
- compatibility matrix

### Eval Output

```json
{
  "skill": "org/postgres-query",
  "version": "1.2.0",
  "commit": "abc123",
  "passed": 47,
  "failed": 1,
  "score": 0.98,
  "latency_p95_ms": 430,
  "cost_usd_per_1000": 0.12
}
```

Results are stored in the registry and tied to version, commit, dataset, and runner environment.

---

## 7. Examples

Each skill must include:

- minimal usage example
- realistic agent integration example
- failure example
- permission/secrets setup example
- expected input/output payloads

Example:

```bash
agent-skill run org/postgres-query \
  --input examples/select_users.json
```

Examples must be executable in CI where possible.

---

## 8. Benchmark Proof

Benchmark claims must be reproducible.

Required for “Recommended” tier:

```text
benchmark/
  report.md
  dataset_card.md
  runner.sh
  results.json
  environment.json
```

Benchmark report must include:

- dataset source and license
- baseline comparison
- exact skill version and commit
- metric definitions
- hardware/runtime environment
- confidence intervals or repeated runs
- known limitations

Unsupported claims like “best,” “state of the art,” or “10x better” are removed unless proven.

---

## 9. Roadmap Governance

### Governance Bodies

- **Core maintainers:** registry policy, infra, security response
- **Reviewers:** domain-specific submission review
- **Security team:** vulnerability triage and takedown
- **Community council:** roadmap prioritization and appeals

### Public Processes

- roadmap tracked in public issues/projects
- quarterly RFC cycle
- transparent acceptance criteria
- published reviewer guidelines
- appeal process for rejected/deprecated skills
- conflict-of-interest disclosures for reviewers
- signed releases for registry tooling

### Policy Changes

Major changes require:

1. RFC
2. public comment window
3. maintainer vote
4. migration plan
5. deprecation timeline

---

## 10. Core Decision

The marketplace optimizes for **installable, evaluated, permissioned capabilities**, not prompt collections. Catalog ranking is driven by reproducible quality signals, security posture, maintenance health, and benchmark evidence — not submission volume or marketing text.
