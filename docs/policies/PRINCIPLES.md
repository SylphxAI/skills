# Sylphx Principles — 深正簡 · 改觀快 · 穩安平

> 原則要少到記得住，用法要細到做得到。
> Principles few enough to remember; usage detailed enough to execute.

Universal doctrine for **all design, development, and business-model work** —
not only engineering. This file is the canonical full text. The compact
always-on floor lives in [`runtime/constitution.md`](../../runtime/constitution.md).
The engineering instantiation is the Quality North Star (`q-*`) under
[`build-product/references/engineering-standard`](../../skills/build-product/references/engineering-standard/README.md);
the commercial instantiation is
[`commercial-decision-standard`](../../skills/compose-product-portfolio/references/commercial-decision-standard/README.md).

This is doctrine, **not a parallel quality vocabulary**: the Quality North Star
remains the sole `q-*` vocabulary and this document maps onto it (see
[Relation to repo surfaces](#relation-to-repo-surfaces)).

## One line

**Think deeply, do the right thing, keep it simple; easy to change, clear to
see, fast to move; hard to kill, nothing leaks, the numbers add up.**

九個字 — nine characters, three groups:

- **深正簡** — how we think: Depth · Correctness · Simplicity
- **改觀快** — how we build: Evolvability · Observability · Performance & Velocity
- **穩安平** — how it runs and pays: Reliability · Security & Privacy · Economy

## The nine core principles

### 一、思維層 — 深 Depth (thinking)

- **Definition**: understand to first principles / root cause, not the surface.
- **Not**: gold-plating, over-engineering, analysis paralysis.
- **Test**: "Is this fix a root cause or a workaround?" "Can I explain the
  principle behind this design, or did I copy it?"
- **Rule**: **Depth is for thinking; Simplicity is for the artifact.** Deep
  thinking usually outputs a simple implementation — depth is never an excuse
  for over-engineering.

### 二、思維層 — 正 Correctness (thinking)

- **Definition**: right result **and** evidence. Includes consistency /
  integrity: nothing missing, nothing duplicated, no rewinds, no wrong data
  (train/serve must not leak).
- **Not**: zero bugs (impossible). The floor of correctness is **evidence
  discipline**, not perfection.
- **Test**: "Where is the evidence — source / CI / deploy / live?" "Can this
  result be reproduced?"
- **Rule**: a contract, CI, or 200 OK is not behavioral proof; issue the real
  action and verify the postcondition.

### 三、思維層 — 簡 Simplicity (thinking)

- **Definition**: **fewest concepts covering all capability** — integrate, do
  not delete.
- **Not**: fewer features, YAGNI misuse, cutting option value just to look
  clean.
- **Test**: "After simplifying, did any capability disappear?" If simplification
  requires deleting a feature, the basis has not been found yet.
- **Rule**: cutting is the lazy path; integration is design. Simplicity reduces
  **concept count**, not **feature count**.

### 四、工程層 — 改 Evolvability (building)

- **Definition**: changeable, redirectable, severable. Maintainability (stays
  unbroken) + Evolvability (evolves) + Operability (deploy / upgrade / runbook)
  live here.
- **Test**: "How many layers must I touch for the next requirement change?"
  "After cutting the dual path, who is the sole writer?"
- **Rule**: a hard cut removes false authority / dual paths, not capability —
  after the cut, not a single feature is lost.

### 五、工程層 — 觀 Observability (building)

- **Definition**: when something breaks, you can see it clearly — logs, metrics,
  traces, state. **Production is the floor.**
- **Test**: "Within 10 minutes, do I know where, when, and why?"
- **Rule**: a production system without observability is flying blind.

### 六、工程層 — 快 Performance & Velocity (building)

- **Definition**: system throughput / latency **and** delivery speed (idea to
  live). Scalability = still works when resources double.
- **Not**: speculative optimization.
- **Test**: "Does it still work at double load?" "How long until this change
  lands live?"
- **Rule**: performance requirements are explicit + measured, never guessed.

### 七、運行層 — 穩 Reliability (running)

- **Definition**: always right (reliability) + available when wanted
  (availability) + recovers from hits (resilience). Resilience includes small
  blast radius, graceful degradation, and self-healing.
- **Test**: "If one part dies, does the user see it? How long until it recovers?"

### 八、運行層 — 安 Security & Privacy (running)

- **Definition**: no leaked secrets, no unauthorized data access, least
  privilege. **A floor.**
- **Test**: "Is there a secret in the repo?" "Who can touch this?"
- **Rule**: security and privacy floors are never traded.

### 九、運行與經濟層 — 平 Economy (running & paying)

- **Definition**: cost is priced by **lifecycle / system entropy / human
  attention**, not by person-days / development effort. In an agent-native
  world, build cost has fallen and cost has moved to verification and entropy;
  entropy is compound interest — every added concept charges interest to every
  future agent and human.
- **Test**: "Which budget is saved? How is it measured? Which principle was
  traded?"
- **Rule**: any "cost saving" claim that cannot answer these three questions is
  incomplete.

## Decision rules

1. **Correctness and Security are floors** — never traded. The correctness
   floor is evidence discipline; the security floor is least privilege.
2. **Other conflicts**: name the traded principle, why, and when it returns.
   Never concede silently.
3. **When unsure, default to Simplicity**: fewer concepts = more option value.
4. **Layer the states**: source / CI / deploy / live are never conflated;
   evidence is per layer.
5. **Situational defaults**:
   - Experiment / new territory → fast + simple, correctness via evidence gates
   - Production systems → observability + reliability + security = floor
   - User-facing / money-touching → correctness + security first

## Audit checklist (expanded)

| Core | Covers |
| --- | --- |
| 深 Depth | Depth |
| 正 Correctness | Correctness, Testability, Consistency / Integrity, evidence |
| 簡 Simplicity | Simplicity, Readability, concept count |
| 改 Evolvability | Maintainability, Evolvability, Operability |
| 觀 Observability | Observability |
| 快 Performance | Performance, Scalability, delivery velocity |
| 穩 Reliability | Reliability, Availability, Resilience |
| 安 Security | Security, Privacy |
| 平 Economy | Cost (TCO / entropy / attention) |

## Working with agents

- **Simplicity** → demand integrative simplicity; "fewer features" is not an
  explanation.
- **Cost** → demand budget + measurement; an agent's default is human
  development cost — override it.
- **Done** → demand the layer: source / CI / deploy / live; no evidence is not
  done.
- **Depth** → demand the principle, not just the delivered artifact.

## 60-second pre-flight (every design / code task)

1. Are the floors touched (Correctness, Security)?
2. Which two principles conflict — has the tradeoff been stated?
3. Which layer does the evidence sit on?
4. Is there anything to integrate rather than delete?

## Relation to repo surfaces

| Surface | Role |
| --- | --- |
| `runtime/constitution.md` | Compact always-on floor of this doctrine (agent-installed) |
| `docs/policies/PRINCIPLES.md` | This file — canonical full text (human documentation) |
| `engineering-standard` (`q-*`) | Engineering instantiation under `build-product` |

Mapping to the Quality North Star (`q-*`):

| Principle | North Star IDs |
| --- | --- |
| 深 Depth | `q-depth` |
| 正 Correctness | `q-correctness` (+ evidence floors in the constitution) |
| 簡 Simplicity | `q-simplicity` |
| 改 Evolvability | `q-evolvability` (+ `q-maintainability`, `q-testability`) |
| 觀 Observability | `q-observability` |
| 快 Performance & Velocity | `q-performance`, `q-scalability` (+ delivery velocity in `delivery-standard`) |
| 穩 Reliability | `q-reliability`, `q-availability`, `q-resilience` |
| 安 Security & Privacy | `q-security` |
| 平 Economy | `q-economy` (lifecycle / entropy / attention cost) |

The commercial instantiation applies the same doctrine to business models,
pricing, packaging, and roadmap work via `commercial-decision-standard`
(Economy and Correctness floors bind there too).

## Appendix: original source wording (Cantonese)

The following is the source text this doctrine was adopted from, preserved
verbatim as provenance.

> # 開發與設計原則（PRINCIPLES）
>
> > 原則要少到記得住，用法要細到做得到。
>
> ## 一句講晒
>
> **諗得深、做啱嘢、留得簡；改得郁、睇得清、行得快；冧唔死、唔漏嘢、計啱數。**
>
> 九個字：**深正簡 · 改觀快 · 穩安平**
>
> ## 九條核心
>
> ### 一、思維層（點樣諗）
>
> **深（Depth）**
> - 定義：理解到第一原理／根因，唔停留喺表面。
> - 唔係：鍍金、過度設計、分析癱瘓。
> - 測試：「呢個 fix 係 root cause 定 workaround？」「呢個 design 我解釋得到原理，定係 copy 返嚟？」
> - 規則：**深係對思考，簡係對製品**。深度思考嘅 output 通常係簡單實現——深唔可以變成 over-engineering 嘅藉口。
>
> **正（Correctness）**
> - 定義：結果啱 + 有證據。包括一致性／完整性：唔漏、唔重、唔 rewind、唔用錯 data（train/serve 唔可以漏）。
> - 唔係：零 bug（唔可能）。正嘅 floor 係**證據紀律**，唔係完美。
> - 測試：「證據喺邊？係 source／CI／deploy／live 邊一層？」「呢個結果可唔可以重現？」
> - 規則：contract、CI、200 都唔係 behavioral proof；要發真 action，驗 postcondition。
>
> **簡（Simplicity）**
> - 定義：**最少概念覆蓋全部能力**——整合，而唔係剷。
> - 唔係：少功能、YAGNI 亂用、為簡而剷走 option value。
> - 測試：「簡化咗之後，有冇 capability 消失？」如果簡化要剷功能 = 未搵到個 basis。
> - 規則：剷係 lazy path，整合先係設計。簡係減 **concept count**，唔係減 **feature count**。
>
> ### 二、工程層（點樣做）
>
> **改（Evolvability）**
> - 定義：改得郁、轉得方向、斬得走。Maintainability（保持唔爛）+ Evolvability（演化）+ Operability（部署／升級／runbook）都喺呢度。
> - 測試：「下次改需求要掂幾多層？」「斬走 dual path 之後，邊個係 sole writer？」
> - 規則：hard cut 斬嘅係假 authority／dual path，唔係 capability——斬完功能一個都唔少。
>
> **觀（Observability）**
> - 定義：出事嗰陣睇得清——logs、metrics、traces、state。**Production = floor**。
> - 測試：「10 分鐘內知唔知邊度、幾時、點解？」
> - 規則：冇 observability 嘅 production system = 盲飛。
>
> **快（Performance & Velocity）**
> - 定義：系統吞吐／延遲 + 交付速度（idea 到 live 幾耐）。Scalability = 加一倍資源之後仲得唔得。
> - 唔係：speculative optimization。
> - 測試：「加一倍 load 仲得唔得？」「呢個改動幾耐 land 到 live？」
> - 規則：效能要求要 explicit + measured，唔好靠估。
>
> ### 三、運行同經濟層（出街之後）
>
> **穩（Reliability）**
> - 定義：一直啱（reliability）+ 想用用到（availability）+ 撞嘢識返（resilience）。Resilience 包括 blast radius 細、graceful degradation、self-heal。
> - 測試：「冧咗一 part，user 睇唔睇到？幾耐好返？」
>
> **安（Security & Privacy）**
> - 定義：secret 唔漏、資料唔俾人掂、least privilege。**Floor**。
> - 測試：「secret 有冇入 repo？」「邊個可以掂呢樣嘢？」
>
> **平（Economy）**
> - 定義：成本按 **lifecycle／系統熵／人類 attention** 計，唔按人日／開發 effort 計。Agent-native 世界 build cost 跌咗，成本搬咗去驗證同熵；熵係複利息——每加一個 concept，將來每個 agent + 人類都要俾 interest。
> - 測試：「慳邊個 budget？點量度？trade 咗邊條原則？」
> - 規則：任何「慳成本」claim 答唔到呢三條 = 未完成。
>
> ## 決策規則
>
> 1. **正、安 = floor**：唔可以 trade。正嘅 floor 係證據紀律；安嘅 floor 係 least privilege。
> 2. **其他撞車**：講出口 trade 咗邊條、點解、幾時返嚟。唔准默默讓步。
> 3. **唔肯定嗰陣，default 簡**：少啲概念 = 多啲 option。
> 4. **狀態要分層**：source／CI／deploy／live 唔可以混埋講。
> 5. **情境 default**：
>    - 實驗／新 territory → 快 + 簡，正用 evidence gate
>    - 生產系統 → 觀 + 穩 + 安 = floor
>    - 用戶面對／掂錢 → 正 + 安行先
>
> ## 展開 checklist（audit 用）
>
> | 核心 | 包住 |
> |---|---|
> | 深 | Depth |
> | 正 | Correctness、Testability、Consistency／Integrity、證據 |
> | 簡 | Simplicity、Readability、Concept count |
> | 改 | Maintainability、Evolvability、Operability |
> | 觀 | Observability |
> | 快 | Performance、Scalability、Delivery velocity |
> | 穩 | Reliability、Availability、Resilience |
> | 安 | Security、Privacy |
> | 平 | Cost（TCO／熵／attention）|
>
> ## 同 agents 一齊做嘢時
>
> - 講 **simplicity** → 要求整合式簡潔；「少功能」唔係解釋。
> - 講 **cost** → 要求 budget + 量度；agents 嘅 default 係人類開發成本，要 override。
> - 講 **done** → 要求講到 source／CI／deploy／live 邊層；冇 evidence 唔算。
> - 講 **深度** → 要求解釋到原理，唔係淨係交到貨。
>
> ## 每次設計／寫 code 用一次（60 秒）
>
> 1. Floors（正、安）有冇掂？
> 2. 邊兩條撞咗？trade-off 講咗出口未？
> 3. Evidence 係邊一層？
> 4. 有冇嘢可以整合而唔係剷？
