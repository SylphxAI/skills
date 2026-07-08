---
name: brand-visual-asset-brief
description: Create briefs for logos, favicons, social banners, README headers, and launch visuals that stay on-brand across GitHub, X, LinkedIn, product sites, and app stores. Use when planning a logo, banner, hero image, icon set, or visual refresh before image generation or designer handoff.
---

# Brand Visual Asset Brief

Use this skill to define visual direction before generating or commissioning brand assets.

## Workflow

1. Capture brand facts: name, category, audience, tone, constraints, and existing palette if any.
2. Read `references/visual-asset-patterns.md`.
3. Choose asset types needed: logo, favicon, social banner, README hero, app icon, or launch kit.
4. Define format targets per surface: aspect ratio, safe area, text overlay rules, and dark/light variants.
5. Write generation or design prompts with style, metaphor, and anti-patterns.
6. Produce a handoff brief with review criteria and export checklist.

## When not to use

- Do not use for generic advice the base model already handles without this skill's specific artifact contract.

## Guardrails

- Do not invent trademarked or competitor-identical styles.
- Do not assume a specific image API; briefs should work with any image tool or human designer.
- Keep logos readable at 16px favicon scale and banner-safe at crop edges.
- Separate "exploration moodboard" from "final production constraints."

## Output format

```text
Brand context:
Assets needed:

Brief per asset:
| Asset | Surface | Ratio | Must include | Must avoid | Style direction |
| --- | --- | --- | --- | --- | --- |

Prompt / direction block:
- Logo:
- Banner:
- Favicon/app icon:

Review checklist:
- <legibility, contrast, crop safety, dark mode>

Export list:
- <formats and sizes>
```
