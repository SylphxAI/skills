# Typography floors (portable)

Apply on product chrome, game HUD labels, and marketing-adjacent panels.
Stack-specific CSS/Tailwind snippets are **examples of discipline**, not portfolio defaults.
On Keel apps, prefer ThemePack type roles + View text widgets over dual CSS SSOT.

## Hierarchy floors

| Role | Guidance |
| --- | --- |
| Display / hero | 1 size step above section titles; weight 500–600; slightly tight tracking |
| Section title | Clear scan stop; snug leading (~1.1–1.25) |
| Body | Weight 400; leading ~1.4–1.6; max readable measure (~60–75ch when layout allows) |
| Label / meta | Smaller + muted; weight 500 for scannability |
| Stats / scores / money | Prefer **tabular nums** so digits do not reflow as values update |

≤ **three** effective text sizes on one chrome surface (excluding legal microcopy).

## Wrap and orphans

- Short titles/headings (≤ ~6 lines): prefer balanced line breaks when the host/CSS supports it.
- Body paragraphs: prefer “pretty” last-line orphan control when available.
- Code/pre: leave default wrapping.

## Dynamic numbers

Scores, timers, prices, dashboard cells: equal-width numerals (`tabular-nums` /
`font-variant-numeric: tabular-nums`) to prevent layout jitter.

## Smoothing / weight

If macOS text looks heavier than design intent, apply antialiased smoothing **once
at root**, not per widget inconsistently. Verify real typefaces; never assume
Inter-specific quirks are universal.

## Contrast and color

- Body text meets readable contrast on its surface.
- Muted text is for secondary labels only—not primary instructions.
- When surface color changes, set foreground with it.

## Game HUD note

Prefer short labels, high contrast, and tabular scores. Avoid long marketing
paragraphs in-play. Wordmarks/logos as **assets** go through art pipelines;
interactive chrome prefers vector/Widget text.
