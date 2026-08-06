# Animation loop QC (2D sprites)

Apply when producing anything that moves: walk/run/idle, attacks, FX, flags, fire.

## Prefer motion harvest when available

Image models invent mid-poses poorly. When the host has **image→video** plus
frame extract (ffmpeg or equivalent):

1. Base still — neutral pose, solid `#FF00FF` if chroma postprocess follows.
2. Short in-place motion clip, locked camera, one subject, one action.
3. Harvest frames → chroma/despill with skill scripts when using magenta keys.
4. Select one full period by motion landmarks (foot contacts, wing extremes).
5. Package ordered frames and/or uniform sheet; state intended fps.

When video tools are absent, keyframe with host image tools on the same key
color and apply the laws below. Prefer crisp multi-cell still sheets for
production heroes when denser harvest is unavailable.

## Motion laws

- Cycles loop: last frame flows into first.
- Alternating gaits spend half the period mirrored.
- Continuity: limbs, props, effects follow continuous paths—no teleport or
  duplicate silhouettes between adjacent frames.
- Physics reads in stills: airborne shows air; anticipation compresses;
  follow-through overshoots; FX stay anchored unless motion demands otherwise.
- Energy matches the ask: idle means nearly-identical frames.

## Flip test

Play frames in order and narrate the motion. Explicitly check last→first loop
closure. Any hedge in the narration is a failed frame—fix or re-select.
