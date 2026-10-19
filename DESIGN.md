# Design System & UX Specification (DESIGN.md)

## Project: Citadel Productions & Attikus Ebenhack Portfolio
**Document Status:** Approved Design Source of Truth  
**Author:** Senior Product Designer & UX/UI Design Systems Architect  
**Version:** 2.0 (React + GSAP Overhaul)  
**Parent Document:** [PRD.md](file:///d:/LAB-S/attikus-portfolio/PRD.md)  

---

## 1. Visual Direction & Design Principles

### 1.1 Aesthetic Manifesto: Anti-AI Boxiness
Mainstream AI-generated web prototypes universally rely on predictable visual tropes: identical rounded rectangular cards (`border-radius: 16px`, `border: 1px solid rgba(255,255,255,0.1)`), uniform 3-column grids, formulaic pill tags, and static dark-mode gradients. 

For **Attikus Ebenhack**—a combat camera veteran, director, and cinematographer whose work deals in high-seas fantasy epics (*The Mutiny*), sci-fi noir (*Before The Glow*), and high-fashion editorial portraiture—this corporate SaaS aesthetic directly undermines his artistic authority.

The new visual direction is defined as **Cinematic Brutalist Editorial**:
- **Frameless Media Bleed:** Visuals are not imprisoned inside bordered cards; they bleed edge-to-edge or sit on asymmetrical editorial planes with varied aspect ratios (2.39:1 anamorphic widescreen, 1.85:1 theatrical, 4:5 editorial portrait).
- **Typography as Architecture:** Monumental serif display headers juxtaposed against ultra-crisp technical metadata typography reminiscent of director viewfinders and camera slates.
- **Atmospheric Depth:** Layers of authentic 35mm film grain, anamorphic optical flares, soft vignette curtains, and tactile cursor physics replace generic drop-shadowed boxes.
- **Pacing & Negative Space:** The page breathes like a masterfully edited film sequence. Deep void spaces allow large visual statements to resonate without visual clutter.

```
AI SAAS BOXY PATTERN (REJECTED)               CINEMATIC EDITORIAL PATTERN (APPROVED)
┌────────┐ ┌────────┐ ┌────────┐              ┌───────────────────────────────────────┐
│ Card 1 │ │ Card 2 │ │ Card 3 │              │ FULL-BLEED MONUMENTAL HERO            │
├────────┤ ├────────┤ ├────────┤              │ "WHERE VISIONS BECOME LEGEND"         │
│ Card 4 │ │ Card 5 │ │ Card 6 │              └───────────────────────────────────────┘
├────────┤ ├────────┤ ├────────┤                 ┌────────────────┐  ┌──────────────┐
│ Card 7 │ │ Card 8 │ │ Card 9 │                 │ ASYMMETRIC     │  │ TECHNICAL    │
└────────┘ └────────┘ └────────┘                 │ 2.39:1 FEATURE │  │ METADATA &   │
(Uniform, rigid, boilerplate cards)              │ KEYFRAME       │  │ LOGLINE STAG │
                                                 └────────────────┘  └──────────────┘
```

### 1.2 Core Design Principles
1. **The Director’s Viewfinder:** UI elements behave like physical cinema optics—aperture shutter wipes, anamorphic lens flares, and timecode overlays.
2. **Dynamic Asymmetry:** Break strict grid symmetry. Stagger content using 7/5 column splits, overlapping typography, and alternating image anchors.
3. **Tactile Feedback:** Every interaction has deliberate weight. Buttons do not just change color; they possess magnetic attraction, smooth inertial ease, and optional analog audio clicks.
4. **Content-First Immersion:** Controls remain whisper-quiet until summoned. When a reel or photo opens, the surrounding interface gracefully steps back into total darkness.

---

## 2. Color System & Surface Hierarchy

The palette is rooted in deep obsidian voids, calibrated with warm cinematic tungsten gold and cold anamorphic cyan flares.

### 2.1 Color Tokens

```
================================================================================
TOKEN NAME             HEX / VALUE                 USAGE & CONTRAST RATIO
================================================================================
--surface-void          #050507                    Root background; pure deep obsidian
--surface-subtle        #0b0b10                    Elevated background panels & overlays
--surface-glass         rgba(11, 11, 16, 0.72)     Backdrop-blur HUD & dynamic drawers
--border-hairline       rgba(255, 255, 255, 0.07)  Tactile separator lines (never thick boxes)
--border-gold-glow      rgba(229, 169, 93, 0.30)   Hover focus & lens accents

--gold-pure             #e5a95d                    Primary brand accent; laurels & key CTAs
--gold-light            #f7d299                    High-contrast text highlights & badges
--gold-burnished        #b87b32                    Subtle borders & active indicator states
--cyan-anamorphic       #38bdf8                    Lens flare highlights & tech specs
--red-tally             #ef4444                    Camera record indicator & live tally lights

--text-primary          #f9fafb (98% White)        Monumental headlines & primary titles (16.2:1)
--text-secondary        #a1a1aa (Zinc 400)         Editorial body copy & descriptions (7.4:1)
--text-muted            #71717a (Zinc 500)         Timecodes, technical specs & metadata (4.6:1)
================================================================================
```

### 2.2 Surface Elevation & Layering
- **Level 0 (The Deep Void):** `#050507` — The infinite canvas with a subtle 3% SVG fractal film grain overlay.
- **Level 1 (Editorial Planes):** Transparent to `#0b0b10` — Content containers defined by negative space and hairline dividers, never enclosed cards with heavy borders.
- **Level 2 (HUD & Floating Chrome):** `rgba(11, 11, 16, 0.85)` with `backdrop-filter: blur(20px)` — Fixed header, audio controls, and floating filters.
- **Level 3 (Cinematic Theater Overlays):** `#000000` at 95% opacity — Lights-down state for 4K video player and photo inspector.

---

## 3. Typography Hierarchy & Font System

A three-tiered typographic architecture pairing classical cinema titles, avant-garde display headings, clean editorial sans, and technical production metadata.

### 3.1 Font Families
- **Display / Hero Titles:** `Cinzel`, Georgia, serif (Weight: 600, 700, 900) — Dignified, timeless feature film authority.
- **Editorial Sub-Headings:** `Syne`, sans-serif (Weight: 700, 800) — Progressive, high-fashion impact.
- **Body & Narrative Prose:** `Plus Jakarta Sans`, system sans-serif (Weight: 300, 400, 500) — Flawless legibility across all screen sizes.
- **Technical Metadata & Slates:** `Space Mono`, monospace (Weight: 400, 700) — Arri camera readouts, timecodes, focal lengths, and aspect ratio stamps.

### 3.2 Scale & Fluid Ratios

| Role | Font Family | Size (Mobile $\to$ Desktop) | Line Height | Tracking | Transform |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Monolith** | `Cinzel` | `clamp(2.5rem, 7vw, 6.2rem)` | `1.05` | `+0.04em` | UPPERCASE |
| **Section Header** | `Cinzel` | `clamp(1.75rem, 4vw, 3.5rem)` | `1.15` | `+0.06em` | UPPERCASE |
| **Editorial Title** | `Syne` | `clamp(1.25rem, 2.5vw, 2.25rem)` | `1.20` | `+0.02em` | Title Case |
| **Body Narrative** | `Plus Jakarta Sans` | `clamp(1.0rem, 1.15vw, 1.15rem)`| `1.65` | `normal` | None |
| **Technical Metadata**| `Space Mono` | `clamp(0.72rem, 0.85vw, 0.82rem)`| `1.40` | `+0.12em` | UPPERCASE |
| **Navigation / CTA** | `Plus Jakarta Sans` | `0.85rem` (13.6px) | `1.00` | `+0.15em` | UPPERCASE |

---

## 4. Spacing, Editorial Grids & Layout Architecture

### 4.1 Layout System: Breaking the 3-Column Box Grid
Instead of the SaaS standard of identical 3-column cards, the interface employs a **Dynamic 12-Column Asymmetric Editorial Grid**:

```
[ Col 1-7 (Full-Bleed Widescreen Stills) ]   [ Col 8-12 (Offset Logline & Production Specs) ]
                                             ┌──────────────────────────────────────────────┐
                                             │ THE MUTINY                                   │
                                             │ Feature Film • In Post-Production            │
                                             │                                              │
                                             │ "An 1800s high-seas mutiny collapses into a │
                                             │ fight against cosmic sea horrors."           │
                                             │                                              │
                                             │ SPECS: ARRI LF • ATLAS ANAMORPHIC • 2.39:1   │
                                             │ [ EXPLORE DOSSIER ]                          │
                                             └──────────────────────────────────────────────┘
```

- **Row 1:** 7-column widescreen visual anchor on the left, 5-column editorial text block staggered on the right.
- **Row 2:** Inverted layout—5-column narrative & awards laurels on the left, 7-column visual anchor on the right.
- **Row 3 (Editorial Lookbook):** Variable aspect ratio rhythm: a tall 2:3 portrait, followed by two stacked 16:9 cinematic frames, breaking all symmetry.

### 4.2 Spacing Scale
- `space-xs`: $8\text{px}$ — Inline badge gaps & micro-separators.
- `space-sm`: $16\text{px}$ — Meta labels, button padding.
- `space-md`: $24\text{px}$ — Form element spacing, internal element separation.
- `space-lg`: $48\text{px}$ — Inter-paragraph & sub-block breathing room.
- `space-xl`: $96\text{px}$ — Standard section margins on mobile.
- `space-2xl`: $160\text{px} - 220\text{px}$ — Monolithic desktop section pacing to maintain cinematic scale.

---

## 5. Component Design System

### 5.1 HUD & Navigation Bar
- **Form:** Ultra-slim floating header bar with `rgba(5, 5, 7, 0.8)` background and `backdrop-filter: blur(24px)`.
- **Elements:**
  - Left: Citadel Productions Monogram + Director wordmark.
  - Center: Minimalist text links (`SLATES`, `ARCHIVE`, `EDITORIAL`, `BIO`, `BRIEF`) with hairline hover underline.
  - Right: Tactical audio sound toggle (Waveform icon) + "START PRODUCTION" gold accent button.
- **Behavior:** Slides up smoothly when scrolling down; glides back down with GSAP inertia when scrolling up.

### 5.2 Feature Slate Presentation (Anti-Boxy)
- **Structure:** Eliminates all bordered cards. Uses full-width horizontal pinning.
- **Background:** Subtle dark vignette with slow parallax zoom on the film's master keyframe.
- **Interactive Element:** Large magnetic play/dossier button that follows the cursor within a $60\text{px}$ proximity threshold.

### 5.3 Curated Visual Works Archive
- **Filter Switcher:** Minimalist horizontal text ticker with category counts (e.g., `ALL [14]`, `NARRATIVE [4]`, `COMMERCIAL [6]`, `EDITORIAL [4]`). Active state denoted by a refined gold hairline dot.
- **Archive Item:**
  - Edge-to-edge imagery with no perimeter borders.
  - Video scrub preview triggers silently on hover.
  - Metadata reveals smoothly beneath the image: Title in `Cinzel`, Client/Artist in `Plus Jakarta Sans`, and Tech Specs in `Space Mono`.

### 5.4 Production Brief Estimator
- **Form Design:** Abandon traditional boxed input fields. Uses an interactive, minimalist editorial questionnaire.
- **Step 1 (Scope):** Selectable tactile typography pills with subtle gold illumination on selection.
- **Step 2 (Timeline):** Interactive slider / timeline milestone selector.
- **Step 3 (Parameters):** Clean border-bottom input lines with floating labels and gold active focus states.
- **Real-Time Summary:** A live "Production Slate Output" preview updating dynamically as parameters are toggled.

### 5.5 Buttons & Interactive Triggers
- **Primary Action (Gold Film Slate CTA):** Solid gold gradient with black text, zero border-radius ($2\text{px}$ minimal softening), high-contrast hover expansion.
- **Secondary Action (Ghost Viewfinder CTA):** Pure transparent background with a $1\text{px}$ hairline border (`--border-hairline`), turning gold with optical glow on hover.
- **Text Link CTA:** Monospace arrow trigger (`VIEW DOSSIER →`) with animated line extension on hover.

---

## 6. Motion Design & GSAP Choreography

Animations are built on real-world optics and cinematic physics, completely replacing generic SaaS fade-ins.

### 6.1 Motion Tokens & Curves
- **Cinema Inertia Ease:** `cubic-bezier(0.16, 1, 0.3, 1)` — Immediate acceleration with a lavish, buttery deceleration.
- **Shutter Snap Ease:** `cubic-bezier(0.77, 0, 0.175, 1)` — Used for aperture opening and modal reveals.
- **Elastic Follower:** GSAP `quickTo` with `duration: 0.35` for magnetic cursor and parallax lag.

### 6.2 Key GSAP Sequences

#### Sequence 1: The Aperture Shutter Intro
1. Page loads behind a pure black screen with a dual horizontal shutter split (`top: 50%`, `bottom: 50%`).
2. Center camera clapper timecode animates: `00:00:00:01` $\to$ `00:00:00:24` (FPS frame rate tick).
3. The top and bottom shutters slide apart vertically with `ease: "power4.inOut"`, revealing the monolithic Hero headline with an anamorphic horizontal light flare sweep.

#### Sequence 2: Feature Slate Parallax & Scroll Pinning
1. As the user reaches the Feature Slates, the section pins smoothly via GSAP `ScrollTrigger`.
2. The keyframe image zooms from scale `1.15` to `1.0` while the background title layers shift at different speeds (3D parallax depth).
3. The technical specs and synopsis glide up with staggered `y: 40, opacity: 0` reveals.

#### Sequence 3: Split-Text Editorial Typography Reveals
- All major section headers utilize GSAP `SplitText` (or split lines). Lines slide up from an overflow hidden container with a $0.08\text{s}$ stagger between lines, giving an authentic editorial typesetting entrance.

#### Sequence 4: Magnetic Cursor & Spotlight Follower
- A custom $8\text{px}$ gold cursor dot with a smooth trailing $35\text{px}$ ambient spotlight follows the mouse.
- On hovering images or video triggers, the cursor scales up to $70\text{px}$ with a centered "PLAY" or "VIEW" label in `Space Mono`.

---

## 7. Responsive Adaptations

### 7.1 Mobile Experience (360px – 768px)
- **Grid Realignment:** Asymmetric 7/5 column splits collapse into single-column editorial spreads with full viewport-width visuals.
- **Gesture Control:** Horizontal film reels support native smooth touch swipe with momentum inertia.
- **Cursor Optimization:** Custom cursor follower is disabled on touch devices; hover states convert to active touch states.
- **Typography Adjustment:** Fluid `clamp()` calculations ensure monolithic titles fit without awkward line breaks.

### 7.2 Desktop & Ultrawide (1024px – 2560px)
- Max container bounds set to $1600\text{px}$ for content, while background visual textures and anamorphic light flares extend to full browser edges.

---

## 8. Accessibility & Quality Standards

- **Contrast Verification:** All body copy meets a minimum contrast of 4.5:1 against the deep obsidian background (`#a1a1aa` on `#050507` yields 7.4:1). Headlines meet 16.2:1.
- **Reduced Motion Support:** A global CSS and JS check on `window.matchMedia('(prefers-reduced-motion: reduce)')`. When detected:
  - Scroll pinning and parallax transforms are disabled.
  - Split-text animations instantly render in their final state.
  - Page transitions become clean instantaneous fades.
- **Screen Reader Support:** All interactive visual triggers (video reels, dossiers, modal lightboxes) possess descriptive `aria-label` attributes and keyboard focus rings.
- **Focus Rings:** Custom gold double-hairline focus rings (`outline: 2px solid #e5a95d; outline-offset: 3px`) for full keyboard navigation.

---

## 9. Page-Level Layout Guidance

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [00. HUD BAR]  CITADEL PRODUCTIONS        SLATES  ARCHIVE  BIO  BRIEF  [SOUND]│
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ [01. HERO APERTURE]                                                          │
│                      WHERE VISIONS BECOME LEGEND                             │
│       Combat Camera Veteran • Director & Cinematographer • Nashville, TN     │
│                     [ WATCH 2026 SHOWREEL ▶ ]                                │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ [02. FEATURE SLATES] (Pinned Horizontal Storytelling)                        │
│   ┌────────────────────────────────────────┐ ┌─────────────────────────────┐ │
│   │ 2.39:1 Anamorphic Key Visual           │ │ THE MUTINY                  │ │
│   │ "The Mutiny"                           │ │ 1800s Maritime Fantasy Epic │ │
│   │ Arri Alexa LF • Master Anamorphics     │ │ [ VIEW PROJECT DOSSIER ]    │ │
│   └────────────────────────────────────────┘ └─────────────────────────────┘ │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ [03. CURATED VISUAL ARCHIVE]                                                 │
│       ALL [14]  /  NARRATIVE [4]  /  COMMERCIAL [6]  /  EDITORIAL [4]        │
│                                                                              │
│   ┌───────────────────────────┐      ┌───────────────────────────┐           │
│   │ Commercial: Nike Campaign │      │ Fashion: Dark Romance     │           │
│   │ Aspect: 16:9              │      │ Aspect: 4:5 Tall Portrait │           │
│   └───────────────────────────┘      └───────────────────────────┘           │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ [04. THE DIRECTOR'S DOSSIER] (Editorial Magazine Spread)                     │
│   ┌───────────────────────────┐  "Stories forged in light and shadow.        │
│   │ Full-bleed portrait of    │   From tactical combat zones to cinematic    │
│   │ Attikus Ebenhack          │   sets, discipline dictates the image."      │
│   └───────────────────────────┘                                              │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ [05. PRODUCTION BRIEF ESTIMATOR]                                             │
│   Scope: [Feature Slate] [Commercial] [Music Video] [Editorial Photo]        │
│   Parameters: [Timeline Selector] [Delivery Specs]                           │
│   Direct Line: [name@agency.com]  [ TRANSMIT PRODUCTION BRIEF → ]            │
│                                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ [06. FOOTER] Citadel Productions LLC • Nashville, TN • Instagram • YouTube   │
└──────────────────────────────────────────────────────────────────────────────┘
```
