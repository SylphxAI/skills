# Standard terminology

Trigger: naming a concept, translating old internal shorthand, or reviewing skills and agent instructions.

Use these mappings when translating internal shorthand into clear prose. The
context column limits each mapping; preserve exact public symbols and legitimate
domain terms. Sources support the replacement concept or illustrate the method.
Plain-English descriptions make no claim to be formal classifications. Keep
current product names in the workspace's ownership record.

| Historical internal label | Use instead | Standard source | Context |
| --- | --- | --- | --- |
| residual | legacy code, remaining work | [AWS — Modernizing a legacy application](https://aws.amazon.com/blogs/migration-and-modernization/modernizing-and-scaling-a-tightly-coupled-legacy-net-application-on-aws/) | For unfinished migration work; not a statistical residual. |
| honesty, honest | accurate status | [Microsoft writing style guide — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | For reporting observed system status. Security denial on failure is a separate access-control concept, not a synonym for accuracy. |
| dual-oracle | differential test | [McKeeman — Differential Testing for Software](https://www.cs.tufts.edu/comp/150FP/archive/bill-mckeeman/DifferentailTesting.pdf) | Use in the internal sense named here; the replacement describes the actual component or action. |
| oracle (for a reference copy) | reference implementation | [McKeeman — Differential Testing for Software](https://www.cs.tufts.edu/comp/150FP/archive/bill-mckeeman/DifferentailTesting.pdf) | Only when comparing with another implementation; a test oracle is a legitimate testing term. |
| doorbell | wake-up webhook | [GitHub — About webhooks](https://docs.github.com/en/webhooks/about-webhooks) | Use in the internal sense named here; the replacement describes the actual component or action. |
| the pin, pin moved | pinned version or deployed version, according to the fact | [Google Cloud — Deployment verification](https://cloud.google.com/deploy/docs/verify-deployment) | Use in the internal sense named here; the replacement describes the actual component or action. |
| crossing, crosses release | deploy to production | [Google Cloud — Deployment verification](https://cloud.google.com/deploy/docs/verify-deployment) | Use in the internal sense named here; the replacement describes the actual component or action. |
| polaris | target architecture | [Microsoft — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | Plain-English description of the intended design. |
| fence (outside fencing tokens) | lock, pause | [PostgreSQL — Explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html) | For access locks or pauses; retain fencing token as a distributed-systems term. |
| ladder | order of preference | [Microsoft writing style guide — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | For a preference or recovery sequence; retain ranked ladder for game rankings. |
| settled path | no-op path, when no change is required | [MDN — Idempotent](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent) | Repeated intended effects can be idempotent without every call being a no-op. Name the actual behavior. |
| clean cut, hard cut | breaking change | [Semantic Versioning — Major version changes](https://semver.org/) | Use in the internal sense named here; the replacement describes the actual component or action. |
| mint, seat (for a runner slot) | create, runner slot | [GitHub — GitHub-hosted runners](https://docs.github.com/en/actions/concepts/runners/github-hosted-runners) | For runner provisioning only; retain pricing seats and cryptographic token terminology. |
| effect writer, owning write | handler that changes state | [Microsoft Azure — CQRS pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs) | Use in the internal sense named here; the replacement describes the actual component or action. |
| gap fill | backfill | [Google Cloud — Backfill historical data](https://cloud.google.com/datastream/docs/manage-backfill-for-the-objects-of-a-stream) | Use in the internal sense named here; the replacement describes the actual component or action. |
| universe | catalog | [Backstage — Software Catalog](https://backstage.io/docs/features/software-catalog/) | Use in the internal sense named here; the replacement describes the actual component or action. |
| seam | interface | [Microsoft — Interface design](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/interface) | Use in the internal sense named here; the replacement describes the actual component or action. |
| denominator | inventory | [NIST SP 800-53 — CM-8 System Component Inventory](https://raw.githubusercontent.com/usnistgov/oscal-content/main/nist.gov/SP800-53/rev5/json/NIST_SP-800-53_rev5_catalog.json) | For the set of components; retain the mathematical denominator. |
| evidence pack, proof-shaped | verification record, test environment | [Google Cloud — Deployment verification](https://cloud.google.com/deploy/docs/verify-deployment) | Use in the internal sense named here; the replacement describes the actual component or action. |
| dens, densed, dens tip, dens-live | the specific thing: deployed version, promote, migrate, legacy BaaS runtime | [Microsoft writing style guide — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | Use in the internal sense named here; the replacement describes the actual component or action. |
| readback | post-deploy check, production verification | [Google Cloud — Deployment verification](https://cloud.google.com/deploy/docs/verify-deployment) | Use in the internal sense named here; the replacement describes the actual component or action. |
| class S | critical incident (the large-harm thresholds in priority.md) | [Google SRE — Managing Incidents](https://sre.google/sre-book/managing-incidents/) | Use in the internal sense named here; the replacement describes the actual component or action. |
| stop-bleed | emergency mitigation | [Google SRE — Managing Incidents](https://sre.google/sre-book/managing-incidents/) | Use in the internal sense named here; the replacement describes the actual component or action. |
| desk | our dev machine | [Microsoft — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | Plain-English description of the shared development machine. |
| feeder | dispatcher | [Kubernetes — Scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/) | Use in the internal sense named here; the replacement describes the actual component or action. |
| lane | area, or queue where the industry word is queue | [Kanban Guides — The Kanban Guide](https://kanbanguides.org/english/) | Use in the internal sense named here; the replacement describes the actual component or action. |
| spawn gate | admission control | [Kubernetes — Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/) | Use in the internal sense named here; the replacement describes the actual component or action. |
| owner session | responsible agent | [Microsoft — Agent orchestration patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns) | Distinguish an agent from one execution session. |
| service master | orchestrator | [Microsoft — Orchestration patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns) | Use in the internal sense named here; the replacement describes the actual component or action. |
| harness | coding agent or agent runtime, according to the component | [Microsoft — Agent orchestration patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns) | Name the actual component; retain test harness for test infrastructure. |
| mailbox | inbox | [Microsoft Graph — Mail folders](https://learn.microsoft.com/en-us/graph/api/resources/mailfolder) | Use in the internal sense named here; the replacement describes the actual component or action. |
| dark scope | unpriced model tier | [Microsoft — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | Plain-English description: name the model tier and its price status. |
| fused verdict, fused decision | decision informed by independent reviews | [Independent views](../../swarm-fuse/SKILL.md) | The accountable owner decides from evidence and records dissent. |
| land, landing (a change) | merge and deploy, merge | [GitHub — Merging a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request) | For integrating a change; retain landing page for marketing. |
| D-a, D-c, D-d, D-e, B1, the R0-R3 risk codes | state the rule directly: done means verified at the real surface with an environment receipt; blocking defect; the change category, such as docs or configuration, internal code, money or credential path, real-user or data change | [Microsoft writing style guide — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | These private codes are not industry classifications. State the applicable rule or change category directly; do not assign a new severity scale. |
| Finish-First; Aging WIP Priority | Work-in-progress limits; work item age | [Kanban Guides — The Kanban Guide](https://kanbanguides.org/english/) | Prioritize existing work within the same priority class; retain incident pre-emption. |
| Scope Hammering; Launch Burn-down | Release scope management | [Delivery workflow](../../deliver-and-verify/SKILL.md) | Chosen method: keep launch scope finite and defer non-blocking enhancements. |
| Sibling Sweep; Yokoten | Systemic corrective action | [Google SRE — Postmortem culture](https://sre.google/sre-book/postmortem-culture/) | Apply the recurrence lesson to related affected components. This describes our chosen application. |
| Standing-Rule Guard; Mechanical Guard; Poka-Yoke | Mistake-proofing | [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html) | Defaults, constraints or checks can prevent a witnessed error. The source illustrates a mechanism, not a formal definition of mistake-proofing. |
| Upstream Purity; Customer Zero; customer-zero | Separation of concerns; first-party client | [Dijkstra — Separation of concerns](https://www.cs.utexas.edu/~EWD/transcriptions/EWD04xx/EWD447.html) | Keep downstream business rules and privileged bypasses out of shared layers. First-party client is a plain-English ownership description. |
| Responsibility Boundary & Zero Model-Constraining Gate | Separation of concerns between model and runtime | [Dijkstra — Separation of concerns](https://www.cs.utexas.edu/~EWD/transcriptions/EWD04xx/EWD447.html) | The model chooses its reasoning and tools; the runtime owns environment overhead. This is a local policy applying separation of concerns. |
| Zero-Unrequested-Mechanism Simplification; Zero Unrequested Mechanisms | YAGNI (You Aren’t Gonna Need It) | [Martin Fowler — YAGNI](https://martinfowler.com/bliki/Yagni.html) | Reject speculative mechanisms without a demonstrated requirement. |
| One-Shot Direct Path | Complete migration | [Microsoft writing style guide — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | Describe caller migration and deletion of the superseded implementation explicitly. |
| End-State Method B; Method A; Method B | Target architecture; interim design | [Microsoft — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | Plain-English descriptions: name the actual design and include migration cost. |
| Five-Step Evidence Path | Root-cause analysis | [Analysis method](../../self-challenge/SKILL.md#scenario-3-analysis-and-root-cause-claims) | Chosen sequence: separate observation, hypothesis, disconfirming test, scope and action. |
| Single-Writer Convergence | Single-writer coordination | [Microsoft writing style guide — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | One writer integrates independent contributions. |
| frontier methodology | chosen methodology | [Microsoft writing style guide — Word choice](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) | Name the selected method and evidence instead of claiming it is advanced. |

## Maintenance

Add a source and usage context whenever a mapping changes. Do not redefine a
standard term to mean an unrelated internal concept. Run the repository checks
before submitting a terminology change. Keep historical internal labels in this
lookup table; use the clear term in active guidance within the stated context.
Preserve legitimate domain terms and exact public identifiers.
