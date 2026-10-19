# Technical Architecture Specification (ARCHITECTURE.md)

## Project: Citadel Productions & Attikus Ebenhack Portfolio
**Document Status:** Approved Software Architecture Source of Truth  
**Author:** Senior Software Architect  
**Version:** 2.0 (React + GSAP Modernization)  
**Parent Documents:** [PRD.md](file:///d:/LAB-S/attikus-portfolio/PRD.md) | [DESIGN.md](file:///d:/LAB-S/attikus-portfolio/DESIGN.md)  

---

## 1. Executive Architecture Summary & Tech Stack Reasoning

The goal of this architecture is to deliver a 60fps, GPU-accelerated cinematic web experience that completely eliminates generic SaaS boxiness while remaining lightweight, zero-maintenance, and ultra-reliable.

### 1.1 Recommended Tech Stack

| Layer | Technology | Selection Rationale |
| :--- | :--- | :--- |
| **Framework** | **React 18+ (Vite SPA / Static Export)** | Instant sub-second HMR development, component reusability, optimal virtual DOM diffing for stateful UI (modals, interactive brief estimator, audio toggle), and zero server-side maintenance overhead. |
| **Animation Engine** | **GSAP (GreenSock) 3.12+** | Industry standard for award-winning editorial sites. Precise frame-by-frame timeline control, `ScrollTrigger` for pinned film slates, `SplitText`/split-line typography reveals, and hardware-accelerated transforms without CSS layout thrashing. |
| **Smooth Inertia** | **Lenis (or GSAP ScrollSmoother)** | Normalizes wheel tick deltas across macOS, Windows, and mobile devices, providing fluid trackpad/mousewheel inertia essential for cinematic pacing. |
| **Styling & Design System** | **Tailwind CSS + CSS Modules** | Utility-first architecture mapped directly to DESIGN.md design tokens (obsidian voids, tungsten gold, anamorphic cyan), with zero runtime style injection overhead. |
| **Language & Typing** | **TypeScript 5+** | End-to-end type safety for project models, technical camera metadata, media manifests, and brief form states. |
| **Audio Synthesis** | **Web Audio API (Native)** | Synthesizes subtle analog clicks and ambient cinema drone natively in the browser without third-party audio player bloat or audio file transfer latency. |
| **Hosting & CI/CD** | **Vercel + GitHub Actions** | Zero-config edge delivery, global CDN caching, instant automatic previews on Git push, and automated SSL. |

---

## 2. Frontend & Backend Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ CLIENT BROWSER (React 18 SPA + GSAP Engine)                                │
│                                                                             │
│  ┌───────────────────────┐  ┌───────────────────────┐  ┌──────────────────┐ │
│  │ HUD & Audio Engine    │  │ GSAP ScrollTrigger    │  │ Media Controller │ │
│  │ (Web Audio Synthesizer│  │ (Pinned Slates &      │  │ (4K Video Facade │ │
│  │  & Navigation Bar)    │  │  Asymmetric Parallax) │  │  & Photo Modal)  │ │
│  └───────────────────────┘  └───────────────────────┘  └──────────────────┘ │
│                                      │                                      │
│  ┌───────────────────────────────────▼───────────────────────────────────┐  │
│  │ Unified Local Data Repository (Typed Projects, Slates, Bio & Press)   │  │
│  └───────────────────────────────────┬───────────────────────────────────┘  │
│                                      │                                      │
│  ┌───────────────────────────────────▼───────────────────────────────────┐  │
│  │ Production Brief Estimator & Interactive Lead Engine                  │  │
│  └───────────────────────────────────┬───────────────────────────────────┘  │
└──────────────────────────────────────┼──────────────────────────────────────┘
                                       │ POST (Sanitized JSON payload)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ EDGE / SERVERLESS LAYER (Vercel Serverless Function or Form Dispatcher)      │
│                                                                             │
│  • Endpoint: `/api/inquire`                                                 │
│  • In-Memory Rate Limiting (Upstash / Cloudflare Turnstile / Honeypot)       │
│  • Payload Validation (Zod Schema)                                          │
│  • Dispatch to Citadel Productions Inbox via Resend / Web3Forms             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Decoupled Jamstack Model
- The frontend is compiled into ultra-lean static assets (HTML/CSS/JS) distributed globally across Vercel’s Edge Network.
- No continuous Node server process is required, resulting in near-zero attack surface, instantaneous TTFB (Time to First Byte), and zero hosting maintenance bills.
- Lead capture is delegated to a single edge function (`/api/inquire`), ensuring backend simplicity for MVP while supporting future API expansion.

---

## 3. Data Flow Architecture

The application operates on a strict **Unidirectional Reactive Data Flow**:

1. **Static Media Manifest (`data/projects.ts`):** All film slates, commercial campaigns, and photo archives are declared as typed immutable records. Changes to slates or awards require zero database queries; they are baked into the build for maximum speed.
2. **Global UI Context (`context/UIContext.tsx`):**
   - Sound Design State (`isMuted: boolean`, `volume: number`).
   - Active Video Modal State (`activeVideoUrl: string | null`, `aspectRatio: string`).
   - Active Lightbox Image (`activePhotoIndex: number | null`).
   - Scroll Progress & Active Section Tracker.
3. **Interactive Brief State (`hooks/useBriefEstimator.ts`):** Manages step progression, scope selection, deliverable toggles, client inputs, and validation feedback.

---

## 4. Folder & Directory Structure

```
d:/LAB-S/attikus-portfolio/
├── .github/
│   └── workflows/
│       └── pages.yml                # Optional fallback GitHub Pages deployer
├── public/
│   ├── favicon.ico                  # Minimalist Citadel monogram
│   ├── fonts/                       # Local font fallbacks (Cinzel, Syne, Space Mono)
│   ├── audio/                       # Minimal ambient tactile click audio buffers
│   └── images/
│       ├── attikus-portrait.jpg     # Master director portrait
│       ├── slates/                  # Key visuals for The Mutiny & Before The Glow
│       └── archive/                 # Commercial and photography media assets
├── src/
│   ├── assets/                      # SVGs, icons, film grain SVG filters
│   ├── components/
│   │   ├── common/                  # Atomic UI elements
│   │   │   ├── Button.tsx           # Magnetic gold slate button
│   │   │   ├── HairlineDivider.tsx  # Minimalist editorial divider
│   │   │   ├── TimecodePill.tsx     # Monospace camera slate readout
│   │   │   └── CustomCursor.tsx     # GSAP-powered inertial follower & spotlight
│   │   ├── layout/                  # Shell components
│   │   │   ├── NavigationHUD.tsx    # Floating blurred top bar with sound toggle
│   │   │   ├── FilmGrainOverlay.tsx # Fixed 35mm grain noise layer
│   │   │   └── Footer.tsx           # Citadel legal, social links, credits
│   │   ├── sections/                # Page-level editorial sequences
│   │   │   ├── ApertureHero.tsx     # Clapper shutter intro & monolithic title
│   │   │   ├── FeatureSlates.tsx    # Pinned horizontal reel for The Mutiny & BTG
│   │   │   ├── CuratedArchive.tsx   # Asymmetric commercial & narrative masonry
│   │   │   ├── PhotoLookbook.tsx    # Editorial Noir portrait gallery
│   │   │   ├── DirectorBio.tsx      # Combat camera veteran editorial spread
│   │   │   ├── Pipeline.tsx         # Concept-to-screen directorial timeline
│   │   │   └── BriefEstimator.tsx   # Interactive production brief inquiry builder
│   │   └── modals/
│   │       ├── VideoPlayerModal.tsx # Lights-down 4K cinematic video overlay
│   │       ├── ProjectDossier.tsx   # Deep-dive lookbook, specs & laurels drawer
│   │       └── LightboxModal.tsx    # High-res photo inspector with EXIF data
│   ├── context/
│   │   └── UIContext.tsx            # Global state for modals, audio & navigation
│   ├── data/
│   │   ├── projects.ts              # Typed master project manifest
│   │   ├── photography.ts           # Editorial photo lookbook records
│   │   └── bio.ts                   # Director provenance & credentials
│   ├── hooks/
│   │   ├── useAudioSynthesizer.ts   # Native Web Audio API procedural sound
│   │   ├── useGSAPScroll.ts         # ScrollTrigger initialization & cleanup
│   │   └── useBriefEstimator.ts     # Multi-step brief calculation & submission
│   ├── styles/
│   │   └── globals.css              # Tailwind base, typography & custom utilities
│   ├── types/
│   │   ├── project.ts               # Project, Slate, Media TypeScript interfaces
│   │   └── inquiry.ts               # Production inquiry validation schemas
│   ├── App.tsx                      # Root composition & smooth scroll wrapper
│   └── main.tsx                     # Vite entry point
├── api/                             # Serverless functions
│   └── inquire.ts                   # Vercel edge endpoint for brief submissions
├── index.html                       # HTML template with preloaded font hints
├── package.json                     # Dependencies manifest (React, GSAP, Tailwind)
├── tsconfig.json                    # Strict TypeScript configuration
├── vite.config.ts                   # Vite bundler configuration
├── PRD.md                           # Product Requirements Document
├── DESIGN.md                        # Visual Design & UX Specification
└── ARCHITECTURE.md                  # Software Architecture Specification
```

---

## 5. Database Interaction (MVP vs Phase 2)

### 5.1 MVP Approach: In-Memory Static Typed Datastore
- For the MVP release, all project data is held in strongly typed TypeScript manifests (`src/data/projects.ts`).
- **Benefits:**
  - Zero database latency ($0\text{ms}$ query time).
  - Eliminates cold starts and database connection pooling overhead.
  - Zero operational costs or credential leak risks.

### 5.2 Phase 2 Schema Blueprint (Supabase / PostgreSQL)
When Citadel Productions scales to dynamic client proofing and automated CMS updates, the data layer migrates to PostgreSQL via Supabase:
- `projects` table (UUID, slug, title, category, logline, specs, laurels, video_url, cover_image).
- `project_assets` table (foreign key to `projects`, image_url, aspect_ratio, sort_order).
- `production_inquiries` table (UUID, client_name, client_email, scope, budget_tier, notes, created_at).

---

## 6. Authentication, Security & Permissions

### 6.1 Client-Side Security Boundaries
- **No Client Secrets:** No private API keys or database service roles are ever shipped in client-side bundles.
- **Honeypot Anti-Spam:** The Production Brief Estimator incorporates an invisible honeypot field (`website_confirm_field`). Submissions containing values in this field are dropped immediately.
- **Content Security Policy (CSP):** Strict script, style, and media origins allowing only Vimeo, YouTube, Google Fonts, and self-hosted assets.

### 6.2 Edge Endpoint Protection (`/api/inquire`)
- **Validation:** Payloads validated using strict Zod schemas against injection or oversized payloads.
- **Rate Limiting:** IP-based sliding window rate limiter (maximum 5 submissions per IP per 10 minutes) to eliminate inbox spam.

---

## 7. Performance & Optimization Strategy

1. **Lazy Modal & Video Loading:** Heavy video iframes (Vimeo/YouTube) and secondary image galleries are strictly dynamically imported (`React.lazy()`) and only mounted when summoned.
2. **GSAP ScrollTrigger Lifecycle Management:**
   - All GSAP animations are initialized within `useGSAP()` or `useEffect()` hooks with explicit `ScrollTrigger.refresh()` and `.revert()` teardowns to prevent memory leaks during component unmounting.
3. **Asset Optimization:**
   - WebP image formats with `loading="lazy"` and explicit `width`/`height` attributes to prevent Cumulative Layout Shift (CLS).
   - High-priority Hero assets utilize `<link rel="preload">` in `index.html`.

---

## 8. Testing & Deployment Strategy

### 8.1 Automated Verification
- **Type Checking:** `tsc --noEmit` runs on every pull request to enforce 100% type safety.
- **Linting & Code Quality:** ESLint with strict React Hooks rules.
- **Performance Budget:** Automated Lighthouse CI testing ensuring desktop performance score $\ge 90$.

### 8.2 Production Deployment Pipeline
- Pushing to the `main` branch on GitHub (`https://github.com/waqaskakhtar-ui/attikus-portfolio`) automatically triggers Vercel CI/CD:
  1. `npm run build` runs `tsc` and `vite build`.
  2. Static output assets are pushed to Vercel Global Edge Network.
  3. Production domain is aliased: `https://attikus-portfolio-ten.vercel.app`.
