> **RETIRED SNAPSHOT (2026-08-08).** Not agent-install authority. Not binding SSOT.
> Live catalog removed `apply-instrument-family`. Active free-tool jobs use multi-provider skill recipes instead.

# Sylphx Instrument Family Law (clean-break)

**Status:** binding for Citra, Iris, Cue, Spine, Lookout, Locus  
**Authority:** this document + `schemas/instrument-evidence-envelope.schema.json` in `SylphxAI/skills`  
**Non-authority:** `SylphxAI/instruments` (retired hub), chat, transitional package names

## Line map

### Instruments (local-first evidence)

| Brand | Job | Canonical npm | Primary tools |
| --- | --- | --- | --- |
| **Citra** | PDF Agent Document Twin | `@sylphx/citra` | `read_pdf`, `search_pdf`, `pdf_evidence` |
| **Iris** | Image media twin | `@sylphx/iris` | `read_image`, `image_probe`, `crop_region` |
| **Cue** | Video timeline twin | `@sylphx/cue` | `read_video`, `video_evidence` |
| **Spine** | Architecture graph | `@sylphx/spine` | `architecture_index`, `status`, `overview`/`search`, `path`, `impact` (+ advanced) |
| **Lookout** | Local web search/fetch/extract | `@sylphx/lookout` | `web_search`, `web_fetch`, `web_extract` (+ advanced) |
| **Locus** | Local hybrid code search | `@sylphx/locus` | `codebase_search` family |

### Not Instruments

| Product | Category | Rule |
| --- | --- | --- |
| **Consultant** | Deliberation | Cloud panel/judge; not local evidence law |
| **Prism** | **Retired** | Host/skill composition only; no product MCP |
| **filesystem-mcp** | **Archived** | Host FS territory |
| **mcp-server-sdk** | **Archived** | Use official MCP SDKs |

## Architecture law

1. **Core owns semantics** (Rust preferred for media/arch/code hot paths).
2. **SDK is isomorphic** to MCP tools (same ops, same envelope).
3. **CLI is human/script surface** of the same core.
4. **MCP is a thin adapter** (stdio/HTTP transport + tool schema only).
5. **Host owns composition** (multi-server MCP, skills, routing). Products do not ship router MCPs.
6. **One product = one repo = one release train** (marketplace + stars).
7. **No dual engines** on a production tool path. Missing native → fail closed.
8. **Evidence rides on results** — envelope v1; never a tool named `evidence_first`.

## Brand identity law (hard cut)

- Canonical package = brand (`@sylphx/citra`, …).
- Canonical bin = brand (`citra`, …).
- Canonical MCP registry title = brand.
- Transitional `*-reader-mcp` / `coderag-mcp` IDs are **deprecated aliases only** during a fixed kill window, then removed from install CTAs, skills, and docs.
- Native packages follow brand when brand is sole (`@sylphx/citra-linux-x64-gnu`, …) or remain version-locked transitional natives only while aliases still publish — never two engine versions.

## Tool surface law

- Media products: **≤ 3 primary tools**. Follow-up ops live in evidence tools via `op` enums.
- Internal helpers (`hash_source`, `build_cache_key`, …) **must not** appear in `tools/list`.
- Advanced tools must be labeled advanced in TOOL_SURFACE + skill.
- Progressive disclosure preferred over mega-merge.

## Envelope law

Every tool result should be conformant to
`schemas/instrument-evidence-envelope.schema.json` (envelope_version `"1"`).

- `deterministic` locators beat `scored_non_locator` / `inferred` claims.
- Generative rewrite is never authority over locators.
- `gaps` and `warnings` are mandatory arrays (may be empty).

## Packaging law

- Production deps for native instruments: empty or packaging-only; engine is native binary.
- optionalDependencies pin **exact** product version for the matching platform.
- Platform select uses `process.platform`/`process.arch` **before** staged/debug fallbacks.
- Release complete only with: tip gate + registry readback + native install + doctor + primary tool behavioral proof.

## Forbidden forever

- Instruments monorepo / alias farm shipping product code
- Private sibling source imports for composition
- Prism-class sibling MCP spawner as a product
- Residual TypeScript engine as production authority after Rust sole-cut
- Filesystem MCP as a public Instruments flagship
- Collapsing Consultant into local-first Instruments marketing

## Prism retirement

Prism (`smart-reader-mcp`) is **not** an Instrument product.

- Sniff utility may live as a tiny host skill or optional SDK helper.
- Agents compose Citra/Iris/Cue via multi-server MCP + skill routing.
- Do not reinvest in Prism release trains, marketplace listings, or brand growth.


## Delivery honesty (do not collapse planes)

| Plane | Meaning |
| --- | --- |
| Source tip | Git `main` package identity + code |
| Candidate PR | Open change not yet on main |
| Registry | `npm view` published versions (may lag tip) |
| Live MCP host | Installed binary actually running |

Brand-sole on **source tip** does not imply brand-sole on **npm registry** until release publish + deprecate transitional.

As of the hard-cut implementation: Instruments source tips are brand-sole (`@sylphx/{citra,iris,cue,spine,lookout,locus}`) with Evidence Envelope v1 on tool results. Registry publish of those tip versions is a separate delivery terminal.
