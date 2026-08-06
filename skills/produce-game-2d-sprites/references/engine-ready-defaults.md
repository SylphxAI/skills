# Engine-ready defaults (2D game art)

Apply unless the brief explicitly overrides.

| Ask | Default deliverable |
| --- | --- |
| Character/creature/prop sprite | Isolated subject, flat keyable BG (`#FF00FF` on chroma pipelines), clean silhouette, no baked ground/scene shadow |
| Motion / animation | Frame sequence that loops cleanly; consistent feet/contact when grounded |
| Sprite sheet | Uniform cells, no divider lines, same scale/anchor across cells |
| Terrain / water / walls | Seamless tileability (verify 2×2); avoid landmark-only motifs |
| UI chrome / buttons | 9-slice friendly; no baked text (localize in UI) |
| Same character again | Edit-chain from prior base image |

## QC loop

1. Private checklist = stated props + applicable defaults.  
2. Generate / postprocess.  
3. Blind describe, then pass/fail checklist.  
4. One concrete re-expression retry; if same failure, compositional fix or flag.  
5. Deliver files + manifest + residual defects.
