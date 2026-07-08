# Visual Asset Patterns

## Rule IDs

- `visual-asset-1` — Define the job of each asset before aesthetics (recognize, explain category, signal trust, decorate).
- `visual-asset-2` — Logos must survive 16px favicon and monochrome reproduction.
- `visual-asset-3` — Banners need safe areas for platform UI chrome and mobile crops.
- `visual-asset-4` — Prefer one strong metaphor over three competing ideas.
- `visual-asset-5` — Specify dark and light variants when the product uses both modes.
- `visual-asset-6` — Avoid text-heavy logos; wordmarks are separate from icon marks when possible.
- `visual-asset-7` — Match visual tone to buyer risk: playful for consumer, restrained for enterprise.
- `visual-asset-8` — Document negative prompts: clichés, off-brand colors, illegible gradients, AI slop motifs.
- `visual-asset-9` — Export vector or high-res PNG sources plus platform-specific crops.
- `visual-asset-10` — Review contrast, accessibility, and trademark similarity before publish.

## Surface decision table

| Asset | Common surfaces | Ratio | Critical constraint |
| --- | --- | --- | --- |
| Logo / wordmark | Site header, docs, deck | 1:1 or horizontal | Small-size legibility |
| Favicon | Browser tab, PWA | 1:1 | Recognizable at 16–32px |
| GitHub social banner | Repo profile | ~2:1 (1280×640 class) | Safe center for mobile crop |
| X / Twitter header | Profile | 3:1 | Keep key content center-left |
| LinkedIn banner | Company page | ~4:1 | Avoid text in far edges |
| App icon | iOS/Android stores | 1:1 | No thin lines; simple silhouette |
| README hero | GitHub README | 3:1 or 2:1 | Works in dark and light themes |

## Review checklist

- [ ] Readable at target minimum size
- [ ] Distinct from top competitors in category
- [ ] Works on dark and light backgrounds
- [ ] Crop-safe for platform banners
- [ ] Color contrast meets accessibility for any text overlays
- [ ] Export sizes documented
- [ ] Source files preserved for future edits
- [ ] No unintended cultural or trademark conflicts flagged

## State machine

`discover -> brief -> explore -> narrow -> finalize -> export -> publish`

Gate `finalize` on checklist pass and stakeholder approval for external-facing assets.