# AI Agent Skill Registry (AASR)

To prevent prompt-spam and prompt-injection vulnerabilities, the AASR mandates that skills are executable tools (APIs, Wasm modules, Python sandboxes), not raw text prompts. Skills must have deterministic inputs/outputs.

### 1. Skill Quality Bar (Anti-Spam)
*   **Typed I/O:** Strict JSON schema validation for all inputs and outputs. 
*   **Statelessness:** Pure functions where possible. External state changes (e.g., writing to a DB) require explicit permission flags.
*   **Utility Threshold:** Skills must solve discrete, verifiable tasks. Generalized "system prompts" or persona injectors are rejected.

### 2. Catalog Metadata (`skill.toml`)
Every submission requires a standardized manifest:
```toml
[skill]
name = "pdf-data-extractor"
version = "1.2.0"
description = "Extracts structured data from PDF URLs."
author = "@dev_handle"

[schemas]
input = "src/schemas/input.json"
output = "src/schemas/output.json"

[permissions]
network = "read-only"
filesystem = "temp-only"
```

### 3. Evals & Benchmark Proof
Submissions must include automated tests and proof of execution.
*   **Artifacts:** `evals.jsonl` containing a minimum of 10 test cases (happy paths, edge cases, failure modes). 
*   **Benchmark Proof:** CI pipeline generates a `benchmark_report.json` upon PR creation.
    *   *Metric gates:* `p95_latency < 2000ms`, `eval_success_rate == 1.0`. PRs are blocked if metrics regress or fail.

### 4. Contribution Review
*   **Automated Gate:** CI validates schema, runs static analysis, builds the execution sandbox, and executes `evals.jsonl`.
*   **Human Review:** Requires 1 peer approval for logic additions; requires 2 core maintainer approvals for new permission escalations (e.g., network write).
*   **Auditability:** All commits must be GPG/Sigstore signed. Discussions and voting records are retained immutably via GitHub/GitLab audit logs.

### 5. Examples
*   Every PR must include an `examples/` directory.
*   Must contain `input.json` and `expected_output.json` for at least two distinct scenarios.
*   Provides immediate, verifiable context for human reviewers and automated agent testing.

### 6. Install Surface
*   **Interface:** Agent-native CLI and API. Install command: `aasr install @dev_handle/pdf-extractor`.
*   **Execution Security:** Installed skills run in isolated boundaries (e.g., WebAssembly or gVisor microVMs). The host agent passes data via standard RPC. The skill cannot read the agent's base system prompt or memory.

### 7. Roadmap & Governance
*   **Governance Model:** Benevolent Dictator for Life (BDFL) transitioning to an elected Steering Committee (5 seats) once 500 active skills are reached.
*   **Roadmap:**
    *   *Phase 1 (Current):* Core registry, Wasm sandboxing, CI/eval enforcement.
    *   *Phase 2:* Semantic agent discovery (enabling agents to search the registry via embeddings).
    *   *Phase 3:* Skill Dependency Graphs (composable DAGs allowing agents to chain multiple verified skills autonomously).
