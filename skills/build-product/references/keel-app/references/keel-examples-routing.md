# Keel examples routing (“I want → bin”)

Authority: Keel tip [`EXAMPLES_CATALOG.md`](https://github.com/SylphxAI/keel/blob/main/docs/EXAMPLES_CATALOG.md)
and [`AGENT_PRODUCT_GUIDE.md`](https://github.com/SylphxAI/keel/blob/main/docs/AGENT_PRODUCT_GUIDE.md).
Re-fetch tip before claiming a bin name. Run from a Keel checkout:

```bash
cargo run -p keel-examples --bin <name>
```

## Day-1 product shape

| Need | Start bin |
| --- | --- |
| Minimal Title grammar | `hello-world` |
| External title install shape (`install_*` on GameBuild) | `hello-title-product` |
| Chrome + stage multi-commit (Paint/Dom/Terminal) | `hello-title-chrome` |
| Host/wasm session around Title | `hello-title-host-session` |
| Pure 2D rules, headless-friendly | `micro-2048` |

## Games / stage

| Need | Start bin |
| --- | --- |
| Playable3d + FrameDrawList | `hello-playable3d` |
| FPS-like HUD over 3D stage | `hello-fps-hud` |
| Two GameViews (main + minimap) | `hello-multi-gameview` |
| FX / anim / tween floors | `hello-fx-anim` |
| SoftDetour nav → Paint | `hello-nav-paint` |

## App / UI chrome

| Need | Start bin |
| --- | --- |
| Camera utility app + Port | `hello-camera-app` |
| Icons + stack z-order | `hello-svg-icons-order` |
| Dense dashboard document View | `hello-dashboard` |
| Nested intent/state tree | `hello-state-tree` |
| Native paint host (not WebView) | `hello-native-paint-host` |

## Pack / platform

| Need | Start bin |
| --- | --- |
| List + emit pack profiles | `hello-pack-profiles` |
| L2 platform Ports under Title | `hello-platform` |
| AR host-fed | `hello-ar-host` |
| XR host-fed soft | `hello-xr-host` |

## Sites / documents (when product is a site, not a stage game)

| Need | Start bin |
| --- | --- |
| Multipage site dogfood | `hello-site` |
| Responsive SEO | `hello-responsive-seo` |
| Document model | `hello-document` |

## AI combo

| Need | Start bin |
| --- | --- |
| Infer + Title chrome | `hello-infer-ui-combo` |

## Agent rule

Copy the **nearest example’s ownership boundaries**, then change content—do not
invent a parallel React/Three product root. If no example covers the need, extend
via Port + matrix residual rather than forking truth.
