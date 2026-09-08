# Site Teardown — norda.framer.website

Source: raw published HTML + inline CSS (Framer build 40f5bc6, published 2026-07-30).
Everything below is extracted from the actual code, not guessed.

---

## 1. Tech Stack

| Layer | What it is |
|---|---|
| Builder | **Framer** (SSR + hydration, `data-framer-hydrate-v2`) |
| Animation engine | **Framer Motion** (`animator` runtime inlined in page: springs, appear animations, optimized WAAPI handoff) |
| Smooth scroll | **Lenis** — confirmed by `html.lenis`, `.lenis.lenis-smooth`, `.lenis-stopped`, `.lenis-scrolling iframe`, `[data-lenis-prevent]` in the CSS |
| Scroll effects | Framer scroll-linked transforms (`will-change: transform`, sticky containers, `--framer-viewport-height`) |
| Fonts | Google Fonts — **Albert Sans** (static 400/500/600/700/900 + a variable `wght` axis), **Fragment Mono** (inline code only), Inter (fallback/system) |
| Icons | Inline SVG + **Material Symbols Outlined** loaded per component (`fonts.googleapis.com/css2?family=Material+Symbols+Outlined`) |
| Scrollbar | Hidden globally: `::-webkit-scrollbar { display: none }` |
| Overscroll | `document.body.style.overscrollBehavior = "none"` (injected via body-start snippet) |

**To rebuild without Framer:** Lenis + GSAP ScrollTrigger (or Framer Motion in React) covers 100% of what this site does.

---

## 2. Design Tokens

### Colour (4 tokens only — it is a monochrome site)
```css
--white:  #FFFFFF;
--grey:   #777777;   /* placeholder text, footer secondary copy */
--black:  #000000;
--near:   #111111;
```
Body background flips per breakpoint: **black** on desktop (≥1200px) and mobile, **white** on tablet (810–1199px). Main content container is white; hero + footer are black.

> For Mapa: identical monochrome. Nothing to convert — the inspo palette *is* our palette.

### Radius
`border-radius: 0px` on everything structural. Only two exceptions: the newsletter submit button (`999px` pill on hover state) and the Framer promo badge (10px) — the badge gets deleted.

### Spacing
- Base unit **4px**, everything lands on multiples of 8.
- Section vertical padding: **192px** desktop → **144px** tablet → **96px** mobile.
- Page side padding: **64px** → **48px** → **24px**.
- Column inner padding: `0 32px` desktop → `0 24px` tablet/mobile.
- Big gaps: 192 / 128 / 64 / 48 / 40 / 32 / 24 / 16 / 12 / 8.

### Breakpoints
```
Desktop   min-width: 1200px        (design canvas 1200px)
Tablet    810px – 1199.98px        (design canvas 810px)
Mobile    max-width: 809.98px      (design canvas 390px)
```
Extra type-only breakpoint at **1599px** for the largest H1/H2 sizes.

---

## 3. Typography Scale (exact)

All Albert Sans. `--framer-font-open-type-features: "blwf" on, "cv09" on, "cv03" on, "cv04" on, "cv11" on` on H2/H3.

| Role | ≥1600px | 1200–1599 | 810–1199 | <810 | Weight | Tracking | Leading |
|---|---|---|---|---|---|---|---|
| **H1** `uT1xpcPhy` | 160px | 120px | 96px | 64px | 500 | −.07 → −.04em | **90%** |
| **H2** `eksQ5L6Vm` | 72px | 64px | 50px | 40px | 500 | −.06 → −.03em | **110%** |
| **H3** `TZWb1KLiy` | 40px | 36px | 32px | 28px | var `wght 550` | −.05 → −.02em | **130%** |
| **Body** `qbivKez2L` | 20px | 18px | 18px | 18px | var `wght 450` | 0 | **160%** |
| **Small** `OgleTEghL` | 14px | — | — | — | 400 | 0 | 160% |
| **Label** `vigkGM5N5` | 18px | — | — | — | **700** | 0 | 160% + `text-transform: uppercase` |

Paragraph spacing: body 24px, H3 40px, small/label 20px.

**The whole personality of this site is: huge tight-tracked display type at 90% leading, next to small uppercase 18px labels.** That contrast is the design.

---

## 4. Layout System

Not a CSS grid — **flex with ratio columns**, which produces an asymmetric editorial grid:

```
[ flex:1 spacer ]  [ flex:2 content ]  [ flex:1 spacer ]
```
- Spacer columns (`flex: 1 0 0; width: 1px; padding: 0 32px`) hold nothing but the decorative `+` marks.
- Content column (`flex: 2 0 0`) holds text, capped at `max-width: 640px` for paragraphs, 720px for forms, 960px for the two-column link lists.
- On tablet the left spacer keeps its `+` but padding shifts to `0 48px 0 24px`.
- On mobile the spacers are `display:none` (`.hidden-1sj1u73`) and content goes full-width with 24px padding.

### The `+` corner marks (signature detail)
12×12px inline SVG plus, drawn as two 2px bars. Placed:
- Section starts: `position:absolute; top:0; left:64px` inside the left spacer column.
- Image blocks: all four corners at `64px` inset (48px tablet, 24px mobile).
- Partner logo cards: 16×16px **corner brackets** (L-shaped, `border-bottom+left 2px`, rotated 0/90/180/−90) at `opacity: 0.05`.

SVG source:
```html
<svg viewBox="0 0 12 12">
  <path d="M 0 0 L 12 0 L 12 2 L 0 2 Z" transform="translate(0 5) rotate(90 6 1)" fill="currentColor"/>
  <path d="M 0 5 L 12 5 L 12 7 L 0 7 Z" fill="currentColor"/>
</svg>
```

---

## 5. Every Animation & Interaction

### 5.1 Smooth scroll — Lenis
Standard Lenis init. CSS contract:
```css
html.lenis { height: auto }
.lenis.lenis-smooth { scroll-behavior: auto !important }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain }
.lenis.lenis-stopped { overflow: hidden }
.lenis.lenis-scrolling iframe { pointer-events: none }
```
Plus `overscroll-behavior: none` on body and hidden scrollbars.

### 5.2 Page-load appear animations
Two distinct signatures, both in `__framer__appearAnimationsContent`:

**A — nav/UI slide-up (slow, cinematic):**
```js
initial: { opacity: 1, y: 30 }
animate: { opacity: 1, y: 0 }
transition: { duration: 1, ease: [0.44, 0, 0.56, 1], delay: 1.6 }   // logo/MENU
transition: { duration: 1, ease: [0.44, 0, 0.56, 1], delay: 3.0 }   // second MENU
```
`cubic-bezier(0.44, 0, 0.56, 1)` is the house easing — near-symmetrical, slow in/out.

**B — content fade-up (spring):**
```js
initial: { opacity: 0.001, y: 0 or 20 }
animate: { opacity: 1, y: 0 }
transition: { type: "spring", bounce: 0, duration: 0.4–0.6, delay: 0–1.2 }
```

### 5.3 Split-text character reveal (the hero move)
Headlines are split **per character, grouped per word** (`white-space: nowrap` wrapper per word so words never break). Each char:
```css
display: inline-block;
opacity: 0.001;
transform: translateY(60px);
```
then staggers to `opacity:1, translateY(0)` on scroll-into-view. Used on:
- The `Nordå — an architecture and design studio based in Stockholm.` H2
- The testimonial H3 in slide 1

**Only the desktop breakpoint gets split text.** Tablet/mobile render the same heading as plain text (`.ssr-variant hidden-1jzk6cd` serves an unsplit copy). Cheap perf win — copy that behaviour.

### 5.4 Link hover — letter roll-up
Every nav link, "About", "Read Article", "BACK TO TOP" uses the same component. Each letter is duplicated:
```html
<div style="position:relative; display:inline-block; overflow:visible; height:1.2em">
  <div style="height:100%; clip-path: inset(0 -Npx 0 -Npx)">
    <div style="position:relative">M</div>                          <!-- original -->
    <div style="position:absolute; top:100%; left:0">M</div>          <!-- clone below -->
  </div>
</div>
```
On hover the stack translates up by 100% so the clone takes the original's place, **staggered left-to-right per letter**. `clip-path: inset(0 -9px 0 -9px)` (18px font) / `-11px` (36px) / `-15px` (64px) — the negative horizontal inset lets descenders/overhang show while clipping vertically. `user-select: none`.

### 5.5 Nav — `mix-blend-mode: difference`
The logo (top-left) and MENU (top-right) are `position: fixed; top: 64px` with **`mix-blend-mode: difference`**. That's why they stay legible over both the white sections and the black hero without any JS colour-swapping. Copy this exactly — it is the cheapest, best trick on the page.

Menu overlay: full-screen `position:fixed; inset:0; background: rgba(0,0,0,0.9); z-index:10; user-select:none`.

### 5.6 Scroll-linked transforms
| Element | Effect |
|---|---|
| Counters (`Years / Projects / Awards / Clients`) | `translateY(-202px)` driven by scroll — a number *roll*. Font 120px desktop / 88px tablet, `font-feature-settings: 'zero' on, 'tnum' on` (tabular figures so digits don't jitter). Two stacked `<p>`: one invisible for width, one absolute for the animated value. |
| Video block | `scale: 0.66 → 1` on the container, `scale: 1.2 → 1` on the inner video — a double-scale parallax zoom out. Sticky, 100vh. |
| Big centre logo | `sticky top:0; height:100vh`, logo at 20% width, `translate(-50%,-50%)`, scroll-driven. |
| White overlay headline | Absolutely positioned over the sticky video, `height: 99%`, revealed as the video zooms. |
| Image reveals | CSS **mask wipe**: `mask: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 0%)` animating the stop from 0% → 100%. Left-to-right curtain. |
| Award rows | `opacity: 0 → 1`, `translateY(100px) → 0`, staggered per row. |
| Section marker divs | Empty `<section>` elements (`#counters-a`, `#video-reveal`, `#menu-show`, 10–20px wide, 50vh tall) used purely as **scroll trigger anchors**. Smart pattern — steal it. |

### 5.7 Accordion (Services / process, 5 items)
- Closed state: number `/ 01` in the left spacer, title H3, `+` icon 24px right-aligned.
- Open: body copy fades in (`opacity 0 → 1`), icon rotates. Icon is two bars in a 24px box; closed `rotate(-180deg)` + `rotate(-90deg)`, open `rotate(-360deg)` + `rotate(-180deg)` — i.e. **plus rotates 180° into a minus**.
- A duplicate hidden copy of the header (`opacity: 0`) sits in flow to reserve height so the row doesn't jump. Copy this — it is why the accordion is smooth.
- 1px `rgba(0,0,0,0.1)` divider at the bottom of every row.
- Row padding: 48px desktop / 40px tablet / 32px mobile.

### 5.8 Testimonials slideshow
`framer-slideshow-axis-x`, `--framer-dir-multiplier: -1`, `transform: translateX(calc(var(--framer-dir-multiplier) * (N% + Npx)))`. Desktop: quote left / image right. Mobile: image top / quote below, with 8px dot pagination (active `opacity:1`, rest `opacity:0.1`). Arrow buttons are 64px, `opacity:0` until hover.

### 5.9 Marquee ticker
Infinite horizontal ticker of `Nordå Architects ~ ` at H1 size, `will-change:auto`, `transform: translateX(-Npx)`, 200px tall, positioned at 27.14% of a 100vh section. Desktop + tablet only (`hidden-1sj1u73`).

### 5.10 Custom cursors
`data-framer-cursor="128ypj7"` etc. on sections and links — different cursor per context (default, link, drag on the slideshow, view on images). Supported by:
```css
.framer-cursor-none, .framer-cursor-none * { cursor: none !important }
.framer-pointer-events-none, .framer-pointer-events-none * { pointer-events: none !important }
```
So: **a real custom cursor element, native cursor hidden.** At minimum implement two states — default dot, and an expanded circle with a label on links/images.

### 5.11 Newsletter form (footer)
- Input `font-size: 64px` desktop / 50px tablet / 40px mobile. Bottom border only (`0 0 1px 0`), grey `#777`, focus → white.
- Padding `16px 48px 16px 0`, placeholder "Your email here" in `#777`.
- Submit is a 40–50px round button, arrow icon, background fades in on hover (`opacity 0 → 1`, `border-radius: 999px`).
- 10 honeypot inputs (`website`, `company`, `message`, …) with `transform: scale(0)`, `tabindex="-1"`, `autocomplete="one-time-code"`, `data-1p-ignore` — **copy this spam trap verbatim into our form backend.**

---

## 6. Page Structure (section order)

1. **Hero / intro** — 100vh, three stacked image containers (A/B/C) that slide up from `top:100%` to `top:0`, revealing a linked project image. Black bg.
2. **Menu-show trigger** — invisible 200px section.
3. **About intro** — H2 split-text + body paragraph.
4. **Counters** — 2×2 grid (Years / Projects / Awards / Clients), each with a 1px rule above and scroll-rolled numbers.
5. **Image block** — 80vh, mask-wipe reveal, `+` at all four corners.
6. **About text + "About" link** — body copy with inline bold links to team members, then the big underlined "About" link with a 52px circular arrow.
7. **Video + Awards** — sticky 100vh video with scroll zoom, big centre logo, white overlay headline, then the Awards list (8 rows: title / organisation / year).
8. **Services** — H1 "Services" + intro paragraph, image block, then the 5-step accordion.
9. **Our Partners** — H1 + intro, then 2 rows × 4 partner logo cards (220×147, corner brackets at 5% opacity).
10. **Closing text** — single centred body paragraph, max 640px.
11. **Featured article** — 50vh mask-wipe image, then title H2 + intro + "Read Article" link.
12. **Testimonials** — marquee ticker + slideshow.
13. **Footer** — black, giant logo watermark (sticky, `filter` will-change), newsletter, 2-column sitemap, socials, copyright.

---

## 7. Asset Inventory

| Asset | Notes |
|---|---|
| Wordmark SVG | 662×197, white, used as footer watermark at full container width |
| Logo mark SVG | 100×43 header version + 67×28 centre version (stroke-width 6, `fill: transparent`) |
| Hero images | 3872×2592 JPEGs, served via `srcset` at 512 / 1024 / 2048 / full |
| Video | `.mp4`, `loop muted playsinline preload="none"`, `object-fit: cover` |
| Partner logos | 600×400 JPEGs in 220×147 cards |
| Slideshow arrows | 64×64 PNGs |
| `+` marks & corner brackets | Inline SVG / CSS borders — no image files |

---

## 8. Build Plan (section by section, non-Framer)

**Foundation**
1. Lenis smooth scroll + hidden scrollbars + `overscroll-behavior: none`.
2. CSS custom properties for the 4 colours, the 6 type presets (with their 4 breakpoints), and the spacing scale.
3. Custom cursor element, two states, native cursor hidden.
4. `mix-blend-mode: difference` fixed header (logo left, MENU right, 64/48/24px inset).
5. Reusable `+` marker and corner-bracket components.

**Motion primitives (build once, reuse)**
6. `SplitText` — per-word wrapper, per-char span, `y:60px → 0`, stagger, desktop-only.
7. `FadeUp` — `opacity:.001 → 1`, `y:30 → 0`, spring `bounce:0`, `duration:.6`.
8. `MaskWipe` — animate the `linear-gradient(90deg,…)` mask stop 0% → 100%.
9. `LetterRoll` link — duplicated letters, hover translateY(-100%), stagger.
10. `Counter` — tabular-nums, scroll-driven roll.

**Sections** — build in the order of §6. Every section is: full-bleed wrapper → 192/144/96px vertical padding → `1fr 2fr 1fr` flex row → `+` mark in the left spacer.

**Do not copy:** the Framer badge (`#__framer-badge-container`), the "Get this template" promo buttons, `framer.link` / `templatoria.com` credits, the Framer analytics script.

---

## 9. What Maps Directly Onto Mapa Architects

| Norda section | Mapa equivalent | Source of content |
|---|---|---|
| Hero image stack | 3 hero projects | `images/site/bg/` or best project shots |
| Counters | **24** godina · **70+** projekata · **6** nagrada · **20+** klijenata | context.md |
| About H2 + body | Studio text | `research/pages/sr-mapa.txt` |
| Awards list (8 rows) | 6 real awards with year + giver | context.md |
| Services accordion (5) | 6 real services | `research/pages/sr-services.txt` |
| Our Partners (8 logos) | BMW, MINI, HONDA, Mazda, Delhaize/Maxi, Generali, IHG, Zumtobel, Delta, Univerzal Banka | context.md |
| Featured article | Latest project — Kuća sa dva krova | `research/INSTAGRAM.md` |
| Testimonials | ⚠️ **We have none.** Replace with press/publications (NIN, Novosti, DaNS, Gradnja, M kvadrat, Cord, Sfera podcast) |
| Newsletter | Replace with the contact/enquiry form (Skill 03) |

Palette needs **no conversion** — Norda is already black / white / grey, exactly Mapa's system. The one substitution is the typeface: Norda uses Albert Sans; Mapa's brand face is **Futura PT**, and the MAPA wordmark is geometric-square. Futura is the closer match to the logo, so the display face should be Futura PT (or a licensed-safe geometric alternative) at the Norda scale and tracking.
