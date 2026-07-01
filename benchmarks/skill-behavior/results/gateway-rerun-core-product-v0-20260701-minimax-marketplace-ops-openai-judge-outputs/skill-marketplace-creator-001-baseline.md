# Skill Marketplace Repository Design

## Anti-Spam Posture
- One skill = one capability contract; near-duplicates auto-merged via embedding similarity.
- No free-form prompt dumps — only versioned, signed, structured artifacts.
- Auto-quarantine on eval failure; manual unblock required.
- Reputation + rate limits raise the spammer effort floor above the reward floor.

## 1. Skill Quality Bar
| Criterion | Threshold |
|---|---|
| Determinism | ≥95% identical output across 3 runs |
| Latency p95 | ≤2× inline baseline |
| Token efficiency | ≤1.3× of inline baseline |
| Safety | Blocks PII exfil, injection, tool-escape |
| Doc coverage | Every param described; ≥2 runnable examples |
| Eval pass rate | ≥90% on harness suite |

Skills failing any threshold stay in `draft` and are not catalog-visible.

## 2. Contribution Review
1. **Pre-submit lint** — schema, signature, license, secret-scan.
2. **Automated eval** — functional + adversarial + regression + cost suites.
3. **Peer review** — 2 maintainers from rotated pool, 7-day SLA.
4. **Reputation gate** — new authors publish to `sandbox` only; 3 approved skills → `general`.
5. **Rate limits** — 5 submissions/author/week; bulk uploads flagged.
6. **Duplicate detection** — similarity >0.92 → merge or reject with reason.

## 3. Install Surface
```
skill install <name>@<version>
skill lock --update
skill audit <name> --provenance
```
- Semver-pinned; yanked versions remain resolvable but warn.
- Sandboxed runtime: no net/fs/shell by default; capabilities declared in manifest, granted per-session.
- Rollback is atomic; reasons appended to public ledger.

## 4. Catalog Metadata (manifest schema)
```yaml
name: web.search
version: 1.4.2
author: did:key:z6Mk...
signature: ed25519:...
license: Apache-2.0
capabilities: [network.http.read]
inputs:  { query: string, max: int<=20 }
outputs: { results: array }
dependencies: []
evals: evals/v1.json
hash: sha256:...
```
Catalog index rebuilds only on signed releases; unsigned entries are invisible.

## 5. Evals
- **Functional** — ≥30 input→expected-output pairs.
- **Adversarial** — injection, jailbreak, PII, hallucination triggers.
- **Regression** — pinned against 3 prior model versions.
- **Cost** — tokens, wall-clock, retries.
Results stored as `evals/<skill>-<sha>.json`, signed by CI; failing runs block release.

## 6. Examples
- `examples/basic.md` — minimal invocation.
- `examples/edge.md` — boundary inputs.
- `examples/anti-pattern.md` — rejected patterns and rationale.
Examples must execute against the published harness; broken examples block release.

## 7. Benchmark Proof
- Public leaderboard per category: pass-rate, p95 latency, cost per 1k calls.
- Reproducible: `skill bench <name> --seed=42 --model=gpt-x` re-runs in CI.
- Drop >5% on a new model version → `revalidation` flag and visibility penalty.
- Benchmark harness itself is a versioned skill (`bench.runner`) — fully auditable.

## 8. Roadmap Governance
| Decision | Vote | Veto |
|---|---|---|
| Spec change (manifest schema) | ⅔ maintainers | Security WG |
| Deprecation | Simple majority | Affected author |
| Emergency takedown | 2/2 Security WG | — |
| Promotion sandbox → general | 3 maintainers | — |

- Quarterly RFCs, 14-day public comment.
- WG seats rotate; conflicts of interest disclosed.
- All decisions recorded as ADRs in `governance/decisions/<id>.md`.

## Spam-Deterrence Budget Summary
Compute cost of eval gates + signed manifests + reputation tiers + duplicate detection + rate limits collectively make low-effort prompt-spam submissions economically unviable while keeping the path open for legitimate contributors.
