# Coding Agent Rules & Engineering Standards (AGENTS.md)

## Project: Citadel Productions & Attikus Ebenhack Portfolio
**Document Status:** Strict Rules for AI Coding Agents & Engineers  
**Target:** React + GSAP Modernization (v2.0)  
**Parent Documents:** [PRD.md](file:///d:/LAB-S/attikus-portfolio/PRD.md) | [DESIGN.md](file:///d:/LAB-S/attikus-portfolio/DESIGN.md) | [ARCHITECTURE.md](file:///d:/LAB-S/attikus-portfolio/ARCHITECTURE.md) | [DATABASE.md](file:///d:/LAB-S/attikus-portfolio/DATABASE.md) | [API.md](file:///d:/LAB-S/attikus-portfolio/API.md)  

---

## 1. Core Prime Directives

1. **Anti-Boxy Aesthetic Rule:** Never revert to generic "AI SaaS" cards. Do not enclose content in repetitive rounded boxes with identical 1px borders. Follow the dynamic 12-column asymmetric editorial grid and frameless media presentation defined in [DESIGN.md](file:///d:/LAB-S/attikus-portfolio/DESIGN.md).
2. **Inspect Before Changing:** Always view and read existing code, dependencies, and configuration files before modifying them. Never make blind assumptions about existing exports or styles.
3. **Preserve Documentation & Comments:** Maintain existing documentation, docstrings, and comments across all files.
4. **Zero Secret Exposure:** Never commit, log, or hardcode private tokens, API keys, or database service secrets into client-side code.
5. **Atomic Focused Changes:** Avoid massive unnecessary rewrites. Implement only the requested feature or phase, verify that the application compiles and runs cleanly, and keep git diffs focused.

---

## 2. Code Quality & Naming Conventions

### 2.1 File & Directory Naming
- **React Components:** PascalCase (e.g., `FeatureSlates.tsx`, `CustomCursor.tsx`, `VideoPlayerModal.tsx`).
- **Hooks:** camelCase with `use` prefix (e.g., `useGSAPScroll.ts`, `useAudioSynthesizer.ts`).
- **Data & Utilities:** camelCase or kebab-case (e.g., `projects.ts`, `formatTimecode.ts`).
- **CSS / Asset Files:** kebab-case (e.g., `globals.css`, `film-grain.svg`).

### 2.2 TypeScript Standards
- **Strict Typing:** No `any`. Explicitly type all component props, function returns, and event handlers.
- **Interfaces over Types:** Use `interface` for entity data models and component props; use `type` for unions and tuples.
- **Shared Definitions:** Centralize shared domain models in `src/types/`.

---

## 3. Component Architecture & Reusability

1. **Single Responsibility:** Each component must represent a discrete editorial slice or atomic UI control.
2. **Compound Design:** Complex sections (e.g., `FeatureSlates`) should decompose into subcomponents (`SlateKeyframe.tsx`, `SlateSpecs.tsx`, `SlateLogline.tsx`).
3. **Dynamic Import for Overlays:** Modals (`VideoPlayerModal.tsx`, `LightboxModal.tsx`) must be code-split using `React.lazy()` and wrapped in `<Suspense>`.
4. **DRY Design Tokens:** Do not write ad-hoc hex codes in CSS. Always reference the approved CSS custom properties (`var(--surface-void)`, `var(--gold-pure)`, `var(--cyan-anamorphic)`).

---

## 4. GSAP & Motion Discipline

1. **Hardware Acceleration:** Only animate GPU-accelerated properties: `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`. Never animate `width`, `height`, `margin`, or `top`/`left`.
2. **ScrollTrigger Lifecycle Cleanliness:**
   - Always wrap GSAP triggers inside `useGSAP()` or clean up triggers in `useEffect` return statements:
     ```typescript
     useEffect(() => {
       const ctx = gsap.context(() => {
         // GSAP animations here
       }, containerRef);
       return () => ctx.revert(); // Essential: prevents memory leaks
     }, []);
     ```
3. **Respect Reduced Motion:** Always verify `window.matchMedia('(prefers-reduced-motion: reduce)')` before binding scroll scrubbing or multi-layer parallax.

---

## 5. Dependency Management

- **No Bloat:** Do not introduce heavy third-party UI libraries (e.g., Chakra, MUI, Bootstrap). The UI is custom crafted with Tailwind CSS and GSAP.
- **Exact Installs:** Always record installed packages in `package.json` with pinned or caret versions.

---

## 6. Error Handling & Resilience

1. **React Error Boundaries:** Wrap high-risk interactive widgets (video player facade, brief estimator) in error boundaries with graceful recovery UI.
2. **Media Loading Fallbacks:** All image elements must include `onError` fallbacks and dark ambient skeleton placeholders matching their exact aspect ratios.
3. **Client Form Submission:** Handle offline state, rate limiting (`429`), and network failure with non-blocking inline alerts and a direct mail fallback link.

---

## 7. Git & Commit Discipline

1. **Conventional Commits:** Prefix all commit messages with standard scopes:
   - `feat:` for new capabilities or sections.
   - `fix:` for bug fixes or animation corrections.
   - `docs:` for architectural and design documentation.
   - `style:` for styling and aesthetic polish.
   - `refactor:` for architectural improvements without behavioral changes.
2. **Runnable State Guarantee:** Never commit code that breaks the TypeScript compilation or Vite build pipeline. Always verify `npm run build` succeeds before pushing to `main`.
