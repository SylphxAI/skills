# Game UI chrome, icons, and HUD art

For **game** HUD art, inventory icons, buttons, panels, and bars produced as
assets (not app product chrome implemented in code).

## Interaction states

- Generate **normal** first; hover/pressed are edits with an explicit freeze:
  same shape, size, ornament, frame thickness—change only state treatment.
- Hover: slight brighten or outer glow; pressed: darker + inset. Geometry must
  overlay-match.

## Icon sets

- One style contract before generating: stroke weight, fill treatment (all
  outline or all solid), palette family, padding, visual weight.
- Edit-chain icons 2..N from icon 1.
- Squint-test at ~32px; select set members that preserve the contract.

## Panels, bars, wordmarks

- Panels: blank/text-ready, 9-slice friendly (uniform edges, corner ornament).
- Bars: clear frame vs fill; fill works at any percentage.
- Wordmarks: read text back letter by letter; any wrong glyph = retry. Prefer
  code/type for critical branding text when models garble.

## Text rule

No baked lettering on buttons/icons/panels unless the brief demands it—engines
localize and models garble.
