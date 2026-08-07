# Premium non-generic UI (portable craft)

**Why this exists:** App-builder stacks look “good” mostly because agents load a
**hard anti-slop + token-first** method before styling—not because Tailwind alone
is magic. Apply the same *discipline* on any stack. On Keel apps, implement
through **ThemePack / Widget / View / Paint** ([Keel `UI_KIT.md`](https://github.com/SylphxAI/keel/blob/main/docs/UI_KIT.md)),
not a second React/CSS product chrome.

## Quantified floors (cheap rules that prevent ugly)

| Floor | Rule |
| --- | --- |
| Palette | **≤ 3–5 colors** total: neutrals + one primary + at most one accent |
| Type | **≤ 2 families** (often one); body line-height ~1.4–1.6; tight large titles |
| Spacing | One **4/8-based** scale; no ad-hoc `13px` / magic gaps |
| Hierarchy | **One primary action** per decision plane |
| Contrast | Changing a surface color ⇒ set **fg** with it; body meets readable contrast |
| Touch | Tap targets **≥ 44px** when touch is in scope |
| Mobile | Design ~390px first when mobile/web is in scope; no horizontal overflow |

## Anti-slop (hard fails — fix before polish)

These are the main “AI generic” tells. **Ban** unless the brief explicitly
demands them:

- Emoji-as-icons; hand-drawn SVG charts; lorem/gray placeholder boxes in ship UI
- Purple/violet/magenta/gold “AI gradient” brand fills and aurora/mesh backgrounds
- Loud multi-stop gradients, rainbow borders, glassmorphism soup, neon glow stacks
- Identical radius on parent **and** padded child (breaks concentric nesting)
- Random bounce/easing on every control; motion without meaning
- Second visual language introduced mid-edit of an existing product
- Slogan hero text that could describe any product

**Instead:** monochrome or single-accent icons; real content; flat/near-flat
surfaces; one restrained accent for **primary actions and focus**; concentric
radii; short purposeful motion.

## Tokens first

1. Define **semantic roles** before hex: canvas, surface, elevated, fg, muted,
   border, primary, focus, danger/warn/success (status only on small badges).
2. **Neutrals first** — most area is background/text/border, not accent.
3. No raw hex / one-off arbitrary spacing in components once a token exists.
4. Borders prefer translucent mixes of fg so light/dark stay consistent.

### Concentric radius (mandatory when nesting)

```text
outerRadius ≈ innerRadius + padding   (on that axis)
```

Nested shells step **down** the radius scale. Pills (`9999px`) only for small
chips—not large cards.

## Motion (UI chrome)

- Micro ~80–150ms, UI ~200–350ms; prefer ease-out / smooth-out.
- Motion explains **state change** (open, select, error, success)—not decoration.
- Respect reduced-motion; never block input on animation.

## Keel implementation note

| Concern | Do |
| --- | --- |
| App/game chrome SSOT | Keel **View** + **ThemePack** / design tokens |
| Product type | `Widget` craft packs — not dual React shell |
| Proof | Rendered Paint/Dom evidence + title tests; `keel doctor` floors when engine-side |
| Forbidden | Title-local free-form CSS class SSOT without ThemePack; WebView-as-app ideal |

Stack-specific CSS variable snippets (Tailwind `@theme`, etc.) are **examples of
token discipline**, not Sylphx portfolio defaults.

## Verify

- Squint test: hierarchy readable in grayscale
- Side-by-side: no second visual language
- Real content lengths (not tidy lorem)
- Screenshot or host browser evidence for Build/Polish modes

## Deeper floors

- Type: [typography-floors.md](typography-floors.md)
- Surfaces: [surfaces-and-elevation.md](surfaces-and-elevation.md)
- Motion: [motion-craft-floors.md](motion-craft-floors.md)
- Game HUD: [game-overlay-and-hud.md](game-overlay-and-hud.md)

