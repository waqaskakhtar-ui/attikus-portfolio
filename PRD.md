# Product Requirements Document (PRD)

## Project: Citadel Productions & Attikus Ebenhack Portfolio
**Document Status:** Approved for Architecture & Design  
**Author:** Senior Product Manager & Software Architect  
**Target Release:** React + GSAP Modernization (v2.0)  
**Source of Truth:** Yes  

---

## 1. Executive Summary & Problem Definition

### 1.1 Problem Statement
The current portfolio prototype for Attikus Ebenhack (Combat Camera veteran, director, cinematographer) and Citadel Productions LLC suffers from a distinct "AI-generated / boxy SaaS" appearance. The interface relies on generic dark-mode glass cards, predictable 3-column grids, uniform borders, and template-like layout blocks. This aesthetic conflicts directly with the brand's identity: a high-end, gritty, auteur cinematic studio handling historical epics (*The Mutiny*), sci-fi thrillers (*Before The Glow*), and high-fashion editorial photography. 

The client explicitly requested:
> *"Clients say this feels AI generated... recreate the design using a React base and GSAP, installing GSAP across the design to eliminate the AI-boxy vibe."*

### 1.2 Value Proposition
A bespoke, award-winning cinematic web experience that feels like an interactive auteur film slate and high-fashion editorial lookbook. By leveraging React for state-driven UI and GSAP (ScrollTrigger, Flip, SplitText) for seamless motion choreographies, the site abandons boilerplate rectangular cards in favor of fluid editorial layouts, full-bleed media moments, layered parallax typography, and tactile cinematic feedback.

### 1.3 Target Audience & Personas
1. **Film Studio Executives & Festival Programmers:** Looking for visionary directing, large-scale cinematic scope (*The Mutiny*), festival acclaim (*Before The Glow*), and proven on-set leadership. Needs immediate access to pitch slates, lookbooks, and trailers.
2. **Brand Creative Directors & Agency Producers:** Seeking commercial narrative direction, automotive/lifestyle campaigns, and combat-honed logistical precision. Needs clear commercial reels and production capability breakdowns.
3. **Music Artists, Record Labels & Fashion Editors:** Seeking prestige portraiture and cover art (*Photo By Attikus*). Needs an immersive, non-boxy editorial gallery with high-fidelity zoom and series context.

---

## 2. Core User Journeys & User Stories

### 2.1 User Journeys

#### Journey 1: Studio Producer Pitch Evaluation
- **Entry:** Lands via custom link or film market QR code.
- **Experience:** Enters through an atmospheric cinematic reveal (shutter/lens aperture motion driven by GSAP). Scrolls into a pinned, full-bleed Feature Slate showcase with horizontal reel progression for *The Mutiny* and *Before The Glow*.
- **Action:** Triggers an interactive Project Dossier modal displaying lookbooks, loglines, specs (Arri Alexa LF, anamorphic glass, locations), and festival laurels.
- **Conversion:** Clicks "Request Pitch Deck / Inquire Rights" to initiate direct production contact.

#### Journey 2: Brand/Agency Commercial Reel Screening
- **Entry:** Arrives from an agency referral seeking a director for a high-intensity commercial.
- **Experience:** Navigates fluidly to "Curated Works" filtered by Commercial. The layout does not use identical boxed cards; instead, it uses an asymmetrical editorial stagger where hover states reveal video preview loops and technical DP credits.
- **Action:** Launches 4K Video Player overlay with cinema-grade custom controls.
- **Conversion:** Scrolls to the bespoke "Production Brief Estimator" to submit project parameters (scope, timeline, deliverable tiers).

#### Journey 3: Editorial & Fashion Photography Curator
- **Entry:** Arrives from Instagram (`@photobyattikus`) or editorial publication.
- **Experience:** Enters the "Editorial Noir" photographic exhibition. Images span varied aspect ratios (2:3 portrait, 16:9 cinematic, panoramic dual-page spread) with seamless cursor inertia.
- **Conversion:** Clicks direct portrait booking / editorial inquiry.

### 2.2 User Stories
- **US-01:** *As a film financier*, I want to explore project slates in an immersive horizontal reel with loglines and production metrics so that I can evaluate project viability without reading generic SaaS cards.
- **US-02:** *As a commercial agency producer*, I want to preview commercial directing samples with instant inline motion so that I can quickly assess visual tone and pacing.
- **US-03:** *As an editorial art director*, I want to browse photography in an asymmetrical, fluid gallery with high-resolution lightbox capabilities so that I can see color grading and skin texture.
- **US-04:** *As a prospective client*, I want an intuitive, multi-stage production brief builder that lets me define deliverables, timeline, and scope so that I can receive an accurate production response.
- **US-05:** *As a mobile visitor*, I want full touch gestures, smooth 60fps inertial scrolling, and responsive typography that feels native rather than compressed desktop cards.

---

## 3. Scope & Feature Requirements

### 3.1 In-Scope (MVP)

| Feature Area | Requirements | Non-Boxy Design Execution |
| :--- | :--- | :--- |
| **Aperture Entry & Hero** | Atmospheric brand reveal, bold typography, sound toggle (optional ambient cue), dynamic reel preview. | Full-bleed viewport, typography overlapping background footage, anamorphic flare streaks, zero boxed cards. |
| **Feature Slates** | Dedicated cinematic showcases for *The Mutiny* and *Before The Glow*. Includes synopsis, tech specs, cast/crew, laurels. | Pinned GSAP ScrollTrigger timeline, split-screen asymmetric layers, horizontal drag/scroll filmstrip. |
| **Curated Visual Works** | Filterable archive (All, Narrative, Commercial, Editorial/Fashion, Music). | Asymmetric masonry layout, fluid variable heights, video hover scrub, custom cursor follower. |
| **Director Bio & Ethos** | Combat Camera veteran background, Citadel Productions history, Nashville base. | Editorial magazine spread layout, quote typography integrated into full-bleed portraiture, military-to-cinema timeline. |
| **Process / Pipeline** | From Concept to Screen (Development, Pre-Pro, Production, Post, Delivery). | Connected timeline line, interactive stage milestones with GSAP stagger, no identical 01-05 boxes. |
| **Production Brief Estimator** | Interactive project builder for clients (Project Type, Production Scale, Timeline, Contact Info). | Minimalist typography-led form, step indicator with fluid slide transitions, real-time brief summary. |
| **Cinematic Video Modal** | Custom video player modal supporting Vimeo/YouTube embeds or native MP4. | Edge-to-edge cinema scope (2.39:1 aspect ratio), letterboxing, cinema lights-down background dimming. |
| **Photo Lightbox** | Full-screen photo inspector with EXIF / gear details (Camera, Lens, Lighting). | Clean minimalist UI overlay, gesture swiping, high-res progressive loading. |

### 3.2 Out-of-Scope (Future Releases)
- Automated payment processing / e-commerce deposits.
- Client proofing portal / private video watermarking (Phase 2).
- Full CMS backend (Contentful/Sanity) for MVP (MVP will use structured local JSON/TypeScript data models for maximum performance and instant deployment).
- User accounts / login system (unnecessary overhead for a director's portfolio).

---

## 4. Design Direction: Eliminating the "AI Boxy" Vibe

### 4.1 Anti-Patterns to Eliminate
1. **Repeated Uniform Cards:** Eliminating 3x3 grids of identical rounded rectangles with `border: 1px solid rgba(255,255,255,0.1)`.
2. **Formulaic Pill Badges:** Eliminating standard pill chips above every title.
3. **Generic SaaS Floating Boxes:** Eliminating boxed containers that enclose content unnecessarily.
4. **Static Linear Transitions:** Replacing CSS `transition: all 0.3s ease` with GSAP spring physics, inertial scrubbing, and choreographing multiple layers.

### 4.2 Prestige Editorial & Cinematic Design Rules
- **Asymmetric Editorial Layouts:** Utilize varied column spans (e.g., 7-column image vs 5-column offset typography), overlapping elements, and intentional whitespace.
- **Typography as Architecture:** Monumental serif headers (*Cinzel* or *Cormorant Garamond*), paired with modern brutalist/editorial sans (*Syne* / *Plus Jakarta Sans*) and technical camera metadata (*Space Mono*).
- **Cinematic Pacing:** Sections breathe with generous vertical pacing ($120\text{px}$ to $200\text{px}$ gap on desktop).
- **Film Elements:** Film grain overlay, anamorphic widescreen aspect ratios (2.39:1, 1.85:1), subtle lens flares, and timecode readouts.
- **Motion Polish with GSAP:**
  - `ScrollTrigger` for parallax image depth and pinned section transitions.
  - `SplitType` / `SplitText` for line-by-line editorial headline reveals.
  - Smooth magnetic cursor for interactive elements.
  - Smooth scroll inertia (Lenis or GSAP ScrollSmoother).

---

## 5. Non-Functional Requirements

### 5.1 Performance & Motion Budgets
- **Lighthouse Performance Score:** $\ge 90$ on desktop, $\ge 80$ on mobile.
- **Frame Rate:** Consistent 60fps (120fps on high-refresh displays) during GSAP scroll triggers and hover interactions.
- **Total Bundle Size:** $< 250\text{KB}$ initial JS (gzipped), with dynamic imports for heavy modal components.
- **Asset Optimization:** WebP/AVIF image formats with responsive `srcset` and progressive blur-up placeholders.

### 5.2 Responsive Breakpoints
- **Mobile:** $360\text{px} - 640\text{px}$ (single-column editorial, simplified motion, swipe gestures).
- **Tablet:** $641\text{px} - 1024\text{px}$ (adapted two-column editorial layouts).
- **Desktop:** $1025\text{px} - 1536\text{px}$ (full GSAP parallax, asymmetric layout).
- **Ultra-wide:** $1537\text{px}+$ (max container width $1600\text{px}$ with cinematic letterboxing).

### 5.3 Accessibility & Compatibility
- **WCAG 2.1 AA Compliance:** Minimum 4.5:1 contrast ratio for all body copy and primary controls.
- **Prefers-Reduced-Motion:** Respect system settings by disabling intensive parallax and instant-revealing text when `prefers-reduced-motion: reduce` is active.
- **Cross-Browser:** Evergreen browsers (Chrome, Safari, Firefox, Edge) with explicit Webkit prefix support for iOS Safari backdrops and transforms.

---

## 6. Page & Section Architecture

```
CITADEL PRODUCTIONS (Single-Page Fluid Architecture + Modals)
│
├── 00. Global Audio/Visual HUD
│   ├── Cinematic Grain Overlay
│   ├── Anamorphic Horizon Flare
│   ├── Minimal Navigation (Sticky with GSAP hide/reveal)
│   └── Sound Design Toggle (Mute/Unmute subtle tactile audio)
│
├── 01. Hero Aperture
│   ├── Monolithic Typography: "WHERE VISIONS BECOME LEGEND"
│   ├── Director Identity & Combat Camera Provenance
│   ├── Background Video Teaser / Dynamic Showreel Snippet
│   └── Quick Jump Nav & Reel Trigger
│
├── 02. Feature Slates (Flagship Works)
│   ├── "The Mutiny" (1800s Maritime Fantasy Epic)
│   │   └── Parallax Key Visual, Logline, Specs, Dossier Modal Trigger
│   └── "Before The Glow" (Sci-Fi Romantic Thriller)
│       └── Festival Laurels, Teaser Frame, Pitch Slate Trigger
│
├── 03. Curated Visual Archive (Commercial & Narrative)
│   ├── Fluid Category Switcher (Editorial Filter)
│   └── Asymmetrical Showcase Grid (Scrubbable Video/Stills)
│
├── 04. Photo By Attikus (Editorial Noir & Portraiture)
│   ├── High-Fashion & Nashville Music Artists Lookbook
│   └── Full-Screen Modal Lightbox with Lens/Lighting EXIF
│
├── 05. The Director's Dossier (Attikus Ebenhack Bio)
│   ├── Combat Camera Veteran to Feature Filmmaker Journey
│   ├── Directorial Philosophy & Citadel Productions Mandate
│   └── Press, Accolades & Industry Recognition
│
├── 06. The Pipeline (Concept to Screen)
│   └── Fluid 5-Stage Directorial Workflow (Interactive GSAP timeline)
│
├── 07. Production Brief & Contact Engine
│   ├── Interactive Scope Estimator (Narrative / Commercial / Photo)
│   └── Direct Representation / Booking Form
│
└── 08. Footer & Social Channels
    └── Citadel Productions LLC Legal, Reps, Instagram & YouTube links
```

---

## 7. Roles and Permissions

Given that this application is a premier cinematic studio portfolio and direct acquisition channel, the access architecture is streamlined for maximum security and zero friction:

| Role | Access Level | Permissions & Capabilities |
| :--- | :--- | :--- |
| **Public Visitor / Curator** | Read-Only | - Browse and scrub all public feature slates, commercial campaigns, and photo archives.<br>- Filter works by category.<br>- Open full-screen cinematic video players and high-resolution photo lightboxes.<br>- Interact with the Production Brief Estimator and submit inquiry data. |
| **Prospective Client / Partner** | Interactive / Submitter | - Submit direct project inquiry briefs and contact messages.<br>- Receive instantaneous on-screen transmission receipt and confirmation. |
| **Studio Owner / Administrator** (Attikus Ebenhack & Citadel Productions Management) | Full Content & Data Ownership | - Direct recipient of all incoming production brief inquiries and booking leads.<br>- Ownership of code repository, media asset CDN, and domain configuration.<br>- *(Phase 2 Scope)*: Password-protected access to private pitch decks and embargoed feature rough cuts via tokenized query parameters or private route. |

---

## 8. Data Requirements

### 7.1 Data Models (Static TypeScript Schemas for MVP)

#### Project Entity
```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'feature' | 'short' | 'commercial' | 'editorial' | 'music_video';
  year: number;
  client?: string;
  role: string; // e.g., "Director / DP"
  logline: string;
  synopsis?: string;
  technicalSpecs: {
    camera: string;      // e.g., "Arri Alexa Mini LF"
    lenses: string;      // e.g., "Atlas Orion Anamorphic"
    aspectRatio: string; // e.g., "2.39:1"
    runtime?: string;
  };
  laurels?: string[];
  media: {
    heroImage: string;
    thumbnail: string;
    videoUrl?: string;   // Vimeo / HLS / MP4
    galleryImages?: string[];
  };
  featured: boolean;
}
```

#### Production Brief Inquiry Entity
```typescript
interface ProductionInquiry {
  projectType: 'feature' | 'commercial' | 'music_video' | 'editorial_photo';
  estimatedTimeline: 'immediate' | '1-3_months' | 'quarter_out' | 'exploratory';
  budgetTier: '$10k-$25k' | '$25k-$50k' | '$50k-$100k' | '$100k+';
  deliverables: string[];
  clientName: string;
  clientEmail: string;
  companyOrArtist: string;
  projectNotes: string;
}
```

---

## 9. Integrations & External Services

| Service | Purpose | Integration Method |
| :--- | :--- | :--- |
| **GSAP & ScrollTrigger** | Core animations, parallax, scroll timeline, layout morphing. | NPM package (`gsap`), registered plugins. |
| **Lenis (or GSAP ScrollSmoother)** | Fluid inertia scrolling preventing abrupt browser wheel ticks. | React wrapper / hook. |
| **Vimeo Pro / YouTube API** | Streaming 4K trailers and commercial cuts without hosting bandwidth load. | Responsive iframe player with custom poster facade. |
| **Web Audio API** | Subtle analog tactile clicks and ambient cinema drone (user opt-in). | Custom React audio hook with zero external dependencies. |
| **Email / Form Dispatcher** | Delivery of production brief estimates to Attikus / Citadel inbox. | Formspree / Web3Forms or standard Serverless API route. |

---

## 10. States: Loading, Empty, and Error Handling

### 10.1 Loading States
- **Initial Load:** A 0.8s - 1.2s aperture shutter / cinema slate sequence with timecode counter and loading bar, smoothly uncurtaining into the Hero section.
- **Media Buffering:** Ambient shimmering dark-gold gradient skeleton placeholder matching the exact aspect ratio of the media asset.

### 10.2 Empty & Filter States
- **No Results Filter:** If a category filter yields no items, render a cinematic message: *"Vault archive currently offline. Direct inquiries to production desk."* with a quick-link button.

### 10.3 Error States
- **Video Playback Error:** Fallback to high-res poster frame with direct external watch link on Vimeo/YouTube.
- **Form Submission Failure:** Clear inline feedback with retry button and direct mailto link: `citadelproductions.co` / `photobyattikus`.

---

## 11. Assumptions & Decisions Requiring Client Approval

### 11.1 Key Assumptions
1. **Tech Stack Selection:** React 18+ (Vite) + Tailwind CSS + GSAP (with ScrollTrigger) provides the highest animation performance, fast build times, and zero template lock-in.
2. **Hosting:** GitHub Pages or Vercel/Netlify for instant static deployment.
3. **Data Source:** High-performance local TypeScript data repository for MVP, eliminating database maintenance costs while allowing easy future CMS migration.

### 11.2 Decisions Requiring Approval
- [ ] **Ambient Sound Design:** Confirm whether subtle ambient drone / tactile shutter audio is desired (default: muted, user must click to unmute).
- [ ] **Showreel Video Source:** Confirmation of Vimeo showcase URLs or raw MP4 CDN links for primary feature teasers.
- [ ] **Brief Estimator Pricing Display:** Confirm whether explicit dollar budget tiers should be public on the brief estimator or replaced with generic scope ranges (e.g., "Indie / Mid-tier / Studio").

---

## 12. MVP Scope, Out-of-Scope Items & Success Criteria

### 12.1 MVP Scope Summary
- React 18+ base with GSAP & ScrollTrigger integrated across all sections.
- Anti-boxy editorial layouts replacing repeated 3x3 uniform cards.
- Hero aperture opening sequence with film grain and responsive typography.
- Feature Slates for *The Mutiny* and *Before The Glow* with horizontal scroll / pinned storytelling.
- Curated visual works with fluid category filtering and asymmetric layouts.
- Attikus Ebenhack Combat Camera / Citadel bio spread.
- Interactive Production Brief Estimator.
- High-res photo and video overlay modals.

### 12.2 Out-of-Scope (Phase 2+)
- User account authentication / login portal.
- Payment gateway for online transactions.
- Heavy headless CMS infrastructure.

### 12.3 Success Criteria
1. **Aesthetic Approval:** The client verifies that the "AI-generated boxy card" look is completely replaced with an organic, prestige editorial cinematic style.
2. **Smooth Performance:** 60fps interaction on standard desktop hardware; smooth fluid scrolling across both trackpad and mobile touch.
3. **Brand Representation:** Accurate, dignified spotlight on Attikus Ebenhack’s Combat Camera military veteran background and Citadel Productions' high-caliber feature slate.
4. **Functional Lead Capture:** 100% reliable submission of production brief inquiries with proper client-side validation.
