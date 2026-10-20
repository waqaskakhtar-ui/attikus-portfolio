import React, { useState } from 'react';
import { Play, ChevronDown, Award, Send, CheckCircle2, ShieldCheck, Target, ArrowUp, Instagram, Youtube, Mail, Film, ExternalLink, Check, ArrowRight, Sparkles } from 'lucide-react';
import { FEATURED_SLATES } from '../../data/projects';
import { PHOTOGRAPHY_ARCHIVE } from '../../data/photography';
import { ProjectType, EstimatedTimeline, BudgetTier, ProductionInquiry } from '../../types/inquiry';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

interface AntigravityScrollEngineProps {
  scrollProgress: number; // 0 to 1
}

export const AntigravityScrollEngine: React.FC<AntigravityScrollEngineProps> = ({ scrollProgress }) => {
  const { openVideoModal, openDossierModal, openPhotoModal } = useUI();
  const { playClick, playSubBoom } = useAudioSynthesizer();

  // Brief Estimator Form State
  const [projectType, setProjectType] = useState<ProjectType>('feature');
  const [timeline, setTimeline] = useState<EstimatedTimeline>('1-3_months');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('$50k-$100k');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Cinematography / DP Services',
    'Full Directorial Package'
  ]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [briefStatus, setBriefStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const toggleDeliverable = (item: string) => {
    playClick();
    setDeliverables((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!clientName || !clientEmail) return;

    setBriefStatus('submitting');
    playSubBoom();

    const payload: ProductionInquiry = {
      clientName,
      clientEmail,
      companyOrArtist: company,
      projectType,
      estimatedTimeline: timeline,
      budgetTier,
      deliverables,
      projectNotes
    };
    console.log('Brief Transmitted:', payload);

    setTimeout(() => {
      setBriefStatus('success');
    }, 600);
  };

  // Helper to calculate chapter opacity and visibility smoothly based on scroll windows
  const getChapterVisibility = (
    fadeInStart: number,
    fullStart: number,
    fullEnd: number,
    fadeOutEnd: number
  ) => {
    if (scrollProgress < fadeInStart || scrollProgress > fadeOutEnd) {
      return { opacity: 0, visible: false, pointerEvents: 'none' as const };
    }
    if (scrollProgress >= fullStart && scrollProgress <= fullEnd) {
      return { opacity: 1, visible: true, pointerEvents: 'auto' as const };
    }
    if (scrollProgress < fullStart) {
      const t = (scrollProgress - fadeInStart) / (fullStart - fadeInStart);
      return { opacity: t, visible: true, pointerEvents: t > 0.5 ? 'auto' as const : 'none' as const };
    }
    const t = 1 - (scrollProgress - fullEnd) / (fadeOutEnd - fullEnd);
    return { opacity: t, visible: true, pointerEvents: t > 0.5 ? 'auto' as const : 'none' as const };
  };

  // Chapters:
  // 1. Hero: 0.00 - 0.16
  const heroVis = getChapterVisibility(-0.05, 0.0, 0.12, 0.17);
  // 2. Director Dossier: 0.16 - 0.32
  const dossierVis = getChapterVisibility(0.14, 0.18, 0.28, 0.33);
  // 3. Feature Slates: 0.32 - 0.50
  const slatesVis = getChapterVisibility(0.30, 0.34, 0.46, 0.51);
  // 4. Curated Archive: 0.50 - 0.68
  const archiveVis = getChapterVisibility(0.48, 0.52, 0.64, 0.69);
  // 5. Editorial Noir: 0.68 - 0.82
  const photoVis = getChapterVisibility(0.66, 0.70, 0.80, 0.83);
  // 6. Pipeline & Brief: 0.82 - 0.94
  const briefVis = getChapterVisibility(0.81, 0.84, 0.92, 0.95);
  // 7. Footer Arrival: 0.94 - 1.00
  const footerVis = getChapterVisibility(0.93, 0.95, 1.0, 1.05);

  return (
    <div className="relative z-10 w-full min-h-full pointer-events-none">
      {/* Viewport Fixed Container for Orchestrated Storytelling */}
      <div className="fixed inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 pointer-events-none overflow-hidden">

        {/* =========================================================================
            DYNAMIC ORCHESTRATED CHAPTERS (No Frosted Glass Boxes • Wide Cinematic)
           ========================================================================= */}
        <div className="relative w-full max-w-7xl mx-auto my-auto h-full flex items-center justify-center">

          {/* -------------------------------------------------------------------
              CHAPTER 1: THE AUTEUR HERO (Frames 2 - 14 | Scroll 0.00 - 0.16)
              Opens cleanly on Frame 2. Wide, heroic, borderless typography.
             ------------------------------------------------------------------- */}
          {heroVis.visible && (
            <div
              style={{ opacity: heroVis.opacity, pointerEvents: heroVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-16 transition-opacity duration-300"
            >
              <div className="w-full max-w-5xl text-left">
                {/* Director Monogram Tag */}
                <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.35em] text-[#E5A95D] uppercase mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  <span>CITADEL PRODUCTIONS</span>
                  <span className="text-white/40">•</span>
                  <span>ATTIKUS EBENHACK</span>
                  <span className="text-white/40 hidden sm:inline">•</span>
                  <span className="hidden sm:inline text-zinc-300">DIR. REEL 2026</span>
                </div>

                {/* Wide Cinema Headline in The Being font */}
                <h1 className="font-being font-black text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-[-0.03em] uppercase text-white leading-[0.9] mb-6 drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
                  WHERE VISIONS <br />
                  <span className="italic font-light text-zinc-300">BECOME</span> LEGEND.
                </h1>

                {/* Wide Editorial Description */}
                <p className="font-sans font-light text-sm sm:text-base md:text-lg text-zinc-200 leading-relaxed max-w-3xl mb-8 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                  Cinematic feature slates, commercial visual narratives, and high-fashion editorial portraiture. Directed with battlefield precision and uncompromising anamorphic scope.
                </p>

                {/* Section Call to Actions */}
                <div className="flex flex-wrap items-center gap-5">
                  <button
                    onClick={() => {
                      playClick();
                      playSubBoom();
                      openVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ');
                    }}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#F7D299] via-[#E5A95D] to-[#B87B32] text-black text-xs sm:text-sm font-bold tracking-[0.2em] uppercase rounded-sm hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(229,169,93,0.5)] cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>WATCH 2026 REEL</span>
                  </button>

                  <button
                    onClick={() => {
                      playClick();
                      window.scrollTo({ top: window.innerHeight * 1.8, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 border border-white/30 text-white hover:border-[#E5A95D] hover:text-[#E5A95D] text-xs sm:text-sm font-mono tracking-[0.2em] uppercase rounded-sm transition-all flex items-center gap-2 cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                  >
                    <span>DIRECTOR DOSSIER</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400 ml-2 hidden md:flex">
                    <ChevronDown className="w-4 h-4 text-[#E5A95D] animate-bounce" />
                    <span>SCROLL TO WALK ↓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 2: DIRECTOR DOSSIER & ETHOS (Frames 15 - 27 | Scroll 0.16 - 0.32)
              Wide, unboxed layout with combat provenance and directorial pillars.
             ------------------------------------------------------------------- */}
          {dossierVis.visible && (
            <div
              style={{ opacity: dossierVis.opacity, pointerEvents: dossierVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-center text-left transition-opacity duration-300"
            >
              <div className="w-full max-w-5xl">
                <span className="block font-mono text-xs sm:text-sm tracking-[0.35em] text-[#E5A95D] uppercase mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  02 // DIRECTORIAL PROVENANCE
                </span>

                <h2 className="font-being font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] uppercase text-white leading-[0.92] mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  STORIES FORGED IN <br />
                  <span className="italic font-light text-zinc-300">LIGHT & SHADOW</span>
                </h2>

                <p className="font-sans font-light text-sm sm:text-base md:text-lg text-zinc-200 leading-relaxed max-w-3xl mb-8 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                  In combat reconnaissance, every frame has life-or-death consequences. On set, that operational rigor translates directly into fearless directorial command, disciplined spatial geography, and uncompromising visual storytelling.
                </p>

                {/* 3 Directorial Pillars (Clean borderless editorial layout) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mb-8 border-t border-white/20 pt-6">
                  <div>
                    <div className="flex items-center gap-2 text-[#E5A95D] font-mono text-xs tracking-widest uppercase mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      <Target className="w-3.5 h-3.5" /> PRECISION
                    </div>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      Combat-proven logistical timing and razor-sharp shot design under pressure.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[#E5A95D] font-mono text-xs tracking-widest uppercase mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      <Award className="w-3.5 h-3.5" /> AUTEUR GLASS
                    </div>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      Vintage anamorphic cinema glass and organic low-light mastery.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[#E5A95D] font-mono text-xs tracking-widest uppercase mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                      <ShieldCheck className="w-3.5 h-3.5" /> COMMAND
                    </div>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      Fearless command of large-scale stunt sets and A-list narrative talent.
                    </p>
                  </div>
                </div>

                {/* Section CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      playClick();
                      openDossierModal(FEATURED_SLATES[0]);
                    }}
                    className="px-6 py-3 bg-[#E5A95D] text-black text-xs font-bold font-mono tracking-widest uppercase rounded-sm hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,169,93,0.4)]"
                  >
                    <span>VIEW BIOGRAPHY & AWARDS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      playClick();
                      window.scrollTo({ top: window.innerHeight * 3.4, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 border border-white/30 text-zinc-200 hover:text-white text-xs font-mono tracking-widest uppercase rounded-sm hover:border-[#E5A95D] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>EXPLORE FEATURE SLATES ↓</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 3: FLAGSHIP FEATURE SLATES (Frames 28 - 42 | Scroll 0.32 - 0.50)
              Wide, open editorial presentation with direct dossier & teaser CTAs.
             ------------------------------------------------------------------- */}
          {slatesVis.visible && (
            <div
              style={{ opacity: slatesVis.opacity, pointerEvents: slatesVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-center text-left transition-opacity duration-300"
            >
              <div className="w-full max-w-6xl">
                <span className="block font-mono text-xs sm:text-sm tracking-[0.35em] text-[#E5A95D] uppercase mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  03 // FLAGSHIP FEATURE PRODUCTIONS
                </span>

                <h2 className="font-being font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] uppercase text-white leading-[0.92] mb-8 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  FEATURE SLATES
                </h2>

                {/* Open 2-Column Editorial Slates (No extra random images • Pure Cinema) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8">
                  {FEATURED_SLATES.map((slate) => (
                    <div key={slate.id} className="border-t border-white/20 pt-4">
                      <div className="flex items-center justify-between text-xs font-mono text-[#E5A95D] tracking-widest uppercase mb-2">
                        <span>{slate.year} • {slate.role}</span>
                        <Film className="w-4 h-4 text-[#E5A95D]" />
                      </div>

                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-white mb-3 drop-shadow-[0_3px_15px_rgba(0,0,0,0.95)]">
                        {slate.title}
                      </h3>

                      <p className="text-zinc-200 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                        {slate.logline}
                      </p>

                      <div className="py-2 border-y border-white/10 mb-5 font-mono text-xs text-zinc-400 flex justify-between">
                        <span>CAMERA: {slate.technicalSpecs.camera}</span>
                        <span className="text-[#E5A95D]">{slate.technicalSpecs.aspectRatio}</span>
                      </div>

                      {/* Slate CTAs */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            playClick();
                            openDossierModal(slate);
                          }}
                          className="px-5 py-2.5 bg-[#E5A95D] text-black text-xs font-mono font-bold tracking-widest uppercase rounded-sm hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(229,169,93,0.3)]"
                        >
                          <span>READ DOSSIER</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        {slate.media.videoUrl && (
                          <button
                            onClick={() => {
                              playClick();
                              openVideoModal(slate.media.videoUrl!);
                            }}
                            className="px-4 py-2.5 border border-white/30 text-[#E5A95D] hover:bg-[#E5A95D] hover:text-black transition-colors rounded-sm text-xs font-mono tracking-widest uppercase flex items-center gap-2 cursor-pointer"
                            title="Watch Teaser"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>WATCH TEASER</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 4: CURATED WORKS & COMMERCIALS (Frames 43 - 57 | Scroll 0.50 - 0.68)
              No extra random images! Pure editorial typography and archive CTA.
             ------------------------------------------------------------------- */}
          {archiveVis.visible && (
            <div
              style={{ opacity: archiveVis.opacity, pointerEvents: archiveVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-center text-left transition-opacity duration-300"
            >
              <div className="w-full max-w-5xl">
                <span className="block font-mono text-xs sm:text-sm tracking-[0.35em] text-[#E5A95D] uppercase mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  04 // COMMERCIAL & NARRATIVE ARCHIVE
                </span>

                <h2 className="font-being font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] uppercase text-white leading-[0.92] mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  COMMERCIAL COMMAND
                </h2>

                <p className="font-sans font-light text-sm sm:text-base md:text-lg text-zinc-200 leading-relaxed max-w-3xl mb-8 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                  High-stakes commercial campaigns and music narratives for global brands, luxury automotive, and chart-topping artists. Built on relentless visual pacing and anamorphic scale.
                </p>

                {/* Editorial Commission Index (Clean typographic rows) */}
                <div className="border-t border-white/20 pt-4 mb-8 space-y-3 max-w-3xl">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono py-2 border-b border-white/10">
                    <span className="text-white font-semibold">PORSCHE NORTH AMERICA — "APEX NOCTURNE"</span>
                    <span className="text-[#E5A95D]">COMMERCIAL • 2025</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono py-2 border-b border-white/10">
                    <span className="text-white font-semibold">SONY MUSIC / RCA — "VELVET MIRAGE"</span>
                    <span className="text-[#E5A95D]">MUSIC FILM • 2024</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono py-2 border-b border-white/10">
                    <span className="text-white font-semibold">NIKE COMBAT SPORTS — "THE BELL TOLLS"</span>
                    <span className="text-[#E5A95D]">BRAND FILM • 2024</span>
                  </div>
                </div>

                {/* Section CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      playClick();
                      playSubBoom();
                      openVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ');
                    }}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#F7D299] via-[#E5A95D] to-[#B87B32] text-black text-xs sm:text-sm font-bold font-mono tracking-widest uppercase rounded-sm hover:scale-105 transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_25px_rgba(229,169,93,0.4)]"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>LAUNCH COMMERCIAL REEL</span>
                  </button>

                  <button
                    onClick={() => {
                      playClick();
                      window.scrollTo({ top: window.innerHeight * 6.8, behavior: 'smooth' });
                    }}
                    className="px-6 py-3.5 border border-white/30 text-zinc-200 hover:text-white text-xs font-mono tracking-widest uppercase rounded-sm hover:border-[#E5A95D] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>REQUEST COMMISSION BRIEF →</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 5: EDITORIAL NOIR & LOOKBOOK (Frames 58 - 69 | Scroll 0.68 - 0.82)
              No extra photo cards! Pure high-fashion editorial showcase with gallery CTA.
             ------------------------------------------------------------------- */}
          {photoVis.visible && (
            <div
              style={{ opacity: photoVis.opacity, pointerEvents: photoVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-center text-left transition-opacity duration-300"
            >
              <div className="w-full max-w-5xl">
                <span className="block font-mono text-xs sm:text-sm tracking-[0.35em] text-[#E5A95D] uppercase mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  05 // HIGH-FASHION EDITORIAL NOIR
                </span>

                <h2 className="font-being font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] uppercase text-white leading-[0.92] mb-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  PHOTO BY ATTIKUS
                </h2>

                <p className="font-sans font-light text-sm sm:text-base md:text-lg text-zinc-200 leading-relaxed max-w-3xl mb-8 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                  Nashville's premier medium-format fashion and musician portraiture. 35mm film grain, Leica Noctilux bokeh, and sculptural shadows capturing true creative soul.
                </p>

                {/* Curated Lookbook Series Index */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mb-8 border-t border-white/20 pt-6">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white uppercase mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      THE VELVET SHADOWS
                    </h4>
                    <p className="text-zinc-400 text-xs font-mono leading-relaxed">
                      Medium-format black & white portraits of Nashville blues & country artists.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white uppercase mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      NOCTURNE MUSICIANS
                    </h4>
                    <p className="text-zinc-400 text-xs font-mono leading-relaxed">
                      Album artwork and press photography for platinum-selling recording artists.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white uppercase mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      AVANT-GARDE COUTURE
                    </h4>
                    <p className="text-zinc-400 text-xs font-mono leading-relaxed">
                      Architectural silhouettes and high-fashion editorial styling in natural light.
                    </p>
                  </div>
                </div>

                {/* Section CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      playClick();
                      openPhotoModal(PHOTOGRAPHY_ARCHIVE[0]);
                    }}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#F7D299] via-[#E5A95D] to-[#B87B32] text-black text-xs sm:text-sm font-bold font-mono tracking-widest uppercase rounded-sm hover:scale-105 transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_25px_rgba(229,169,93,0.4)]"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>OPEN EDITORIAL LOOKBOOK GALLERY</span>
                  </button>

                  <a
                    href="https://instagram.com/photobyattikus"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3.5 border border-white/30 text-zinc-200 hover:text-white text-xs font-mono tracking-widest uppercase rounded-sm hover:border-[#E5A95D] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Instagram className="w-4 h-4 text-[#E5A95D]" />
                    <span>@PHOTOBYATTIKUS</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 6: PIPELINE & PRODUCTION BRIEF (Frames 70 - 78 | Scroll 0.82 - 0.94)
              Clean, unboxed, minimalist interactive brief calculator.
             ------------------------------------------------------------------- */}
          {briefVis.visible && (
            <div
              style={{ opacity: briefVis.opacity, pointerEvents: briefVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-center text-left transition-opacity duration-300"
            >
              <div className="w-full max-w-4xl max-h-[80vh] overflow-y-auto pr-2">
                <span className="block font-mono text-xs sm:text-sm tracking-[0.35em] text-[#E5A95D] uppercase mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  06 // CITADEL REPRESENTATION DESK
                </span>

                <h2 className="font-being font-black text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] uppercase text-white leading-[0.95] mb-6 drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
                  CALCULATE PRODUCTION BRIEF
                </h2>

                {briefStatus === 'success' ? (
                  <div className="py-12 text-center border-t border-white/20">
                    <CheckCircle2 className="w-12 h-12 text-[#E5A95D] mx-auto mb-3" />
                    <h4 className="font-serif text-2xl font-bold uppercase text-white mb-2">
                      BRIEF DISPATCHED
                    </h4>
                    <p className="text-zinc-300 text-xs font-mono max-w-md mx-auto mb-4">
                      Your inquiry has been received at Citadel Productions desk. Direct response within 24 hours.
                    </p>
                    <button
                      onClick={() => setBriefStatus('idle')}
                      className="px-5 py-2 border border-white/30 text-xs font-mono tracking-widest uppercase text-white hover:border-[#E5A95D] cursor-pointer"
                    >
                      NEW INQUIRY
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBriefSubmit} className="space-y-6">
                    {/* Project Type */}
                    <div>
                      <label className="block font-mono text-xs text-[#E5A95D] uppercase tracking-widest mb-2">
                        01. COMMISSION TYPE
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(['feature', 'commercial', 'music_video', 'editorial_photo'] as ProjectType[]).map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => {
                              playClick();
                              setProjectType(t);
                            }}
                            className={`p-2.5 text-xs font-mono tracking-wider uppercase border rounded-sm cursor-pointer transition-colors ${
                              projectType === t
                                ? 'border-[#E5A95D] bg-[#E5A95D]/20 text-[#E5A95D] font-bold'
                                : 'border-white/20 text-zinc-300 hover:border-white/40'
                            }`}
                          >
                            {t.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timeline & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs text-[#E5A95D] uppercase tracking-widest mb-2">
                          02. TARGET TIMELINE
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(['immediate', '1-3_months', 'quarter_out', 'exploratory'] as EstimatedTimeline[]).map((tl) => (
                            <button
                              type="button"
                              key={tl}
                              onClick={() => {
                                playClick();
                                setTimeline(tl);
                              }}
                              className={`p-2 text-[11px] font-mono tracking-wider uppercase border rounded-sm cursor-pointer transition-colors ${
                                timeline === tl
                                  ? 'border-[#E5A95D] bg-[#E5A95D]/20 text-[#E5A95D] font-bold'
                                  : 'border-white/20 text-zinc-300 hover:border-white/40'
                              }`}
                            >
                              {tl.replace('_', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-[#E5A95D] uppercase tracking-widest mb-2">
                          03. BUDGET TIER
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {(['$10k-$25k', '$25k-$50k', '$50k-$100k', '$100k+'] as BudgetTier[]).map((bt) => (
                            <button
                              type="button"
                              key={bt}
                              onClick={() => {
                                playClick();
                                setBudgetTier(bt);
                              }}
                              className={`p-2 text-[11px] font-mono tracking-wider uppercase border rounded-sm cursor-pointer transition-colors ${
                                budgetTier === bt
                                  ? 'border-[#E5A95D] bg-[#E5A95D]/20 text-[#E5A95D] font-bold'
                                  : 'border-white/20 text-zinc-300 hover:border-white/40'
                              }`}
                            >
                              {bt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Scope Deliverables */}
                    <div>
                      <label className="block font-mono text-xs text-[#E5A95D] uppercase tracking-widest mb-2">
                        04. SCOPE DELIVERABLES
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          'Cinematography / DP Services',
                          'Full Directorial Package',
                          '35mm / Anamorphic Film Package',
                          'Color Grading & Mastering'
                        ].map((d) => {
                          const isChecked = deliverables.includes(d);
                          return (
                            <button
                              type="button"
                              key={d}
                              onClick={() => toggleDeliverable(d)}
                              className={`p-2 text-left text-[11px] font-mono tracking-wide uppercase border rounded-sm flex items-center justify-between cursor-pointer transition-colors ${
                                isChecked
                                  ? 'border-[#E5A95D] bg-[#E5A95D]/15 text-white'
                                  : 'border-white/20 text-zinc-400 hover:border-white/40'
                              }`}
                            >
                              <span>{d}</span>
                              {isChecked && <Check className="w-3.5 h-3.5 text-[#E5A95D]" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Contact Credentials */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/20">
                      <div>
                        <label className="block font-mono text-[10px] text-zinc-300 uppercase tracking-widest mb-1">
                          PRODUCER / CLIENT NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Elena Rostova"
                          className="w-full bg-transparent border-b border-white/30 focus:border-[#E5A95D] py-1.5 text-xs text-white placeholder-zinc-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-zinc-300 uppercase tracking-widest mb-1">
                          CONTACT EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="producer@agency.com"
                          className="w-full bg-transparent border-b border-white/30 focus:border-[#E5A95D] py-1.5 text-xs text-white placeholder-zinc-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-zinc-300 uppercase tracking-widest mb-1">
                          STUDIO / PRODUCTION ENTITY
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Anonymous Content"
                          className="w-full bg-transparent border-b border-white/30 focus:border-[#E5A95D] py-1.5 text-xs text-white placeholder-zinc-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Project Notes */}
                    <div>
                      <label className="block font-mono text-[10px] text-zinc-300 uppercase tracking-widest mb-1">
                        PROJECT SYNOPSIS & LOGISTICAL NOTES
                      </label>
                      <input
                        type="text"
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        placeholder="Logline, target shooting location, desired camera package..."
                        className="w-full bg-transparent border-b border-white/30 focus:border-[#E5A95D] py-1.5 text-xs text-white placeholder-zinc-500 outline-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between pt-3">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                        CITADEL PRODUCTIONS LLC • NASHVILLE, TN
                      </span>
                      <button
                        type="submit"
                        disabled={briefStatus === 'submitting'}
                        className="px-8 py-3 bg-gradient-to-r from-[#F7D299] via-[#E5A95D] to-[#B87B32] text-black text-xs font-bold font-mono tracking-widest uppercase rounded-sm hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,169,93,0.4)]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>TRANSMIT PRODUCTION BRIEF</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 7: CITADEL OVERTURE & FOOTER (Frames 79 - 80 | Scroll 0.94 - 1.00)
              Fluid arrival at the base of the site without abrupt jumps or clipping.
             ------------------------------------------------------------------- */}
          {footerVis.visible && (
            <div
              style={{ opacity: footerVis.opacity, pointerEvents: footerVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-end pb-8 sm:pb-12 text-center transition-opacity duration-300"
            >
              <div className="w-full max-w-5xl mx-auto">
                <span className="font-mono text-xs sm:text-sm tracking-[0.4em] text-[#E5A95D] uppercase mb-2 block drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  JOURNEY COMPLETE
                </span>

                <h2 className="font-being font-black text-4xl sm:text-6xl md:text-7xl uppercase text-white mb-3 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  CITADEL PRODUCTIONS LLC
                </h2>

                <p className="font-mono text-xs sm:text-sm text-zinc-300 uppercase tracking-widest mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                  ATTIKUS EBENHACK • STORIES FORGED IN LIGHT & SHADOW
                </p>

                {/* Direct Social & Inquiry Channels */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 font-mono text-xs sm:text-sm text-zinc-200 uppercase tracking-wider mb-8">
                  <a
                    href="https://instagram.com/photobyattikus"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-[#E5A95D] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E5A95D]" />
                    <span>@photobyattikus</span>
                  </a>
                  <a
                    href="https://instagram.com/citadelproductions.co"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-[#E5A95D] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E5A95D]" />
                    <span>@citadelproductions</span>
                  </a>
                  <a
                    href="https://youtube.com/@CitadelProductions"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-[#E5A95D] transition-colors"
                  >
                    <Youtube className="w-4 h-4 text-[#E5A95D]" />
                    <span>YouTube</span>
                  </a>
                  <a
                    href="mailto:attikus@citadelproductions.co"
                    className="flex items-center gap-2 hover:text-[#E5A95D] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#E5A95D]" />
                    <span>attikus@citadelproductions.co</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-400">
                  <span>© {new Date().getFullYear()} Attikus Ebenhack & Citadel Productions. All Rights Reserved.</span>
                  <button
                    onClick={() => {
                      playClick();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-3 sm:mt-0 flex items-center gap-1.5 text-[#E5A95D] hover:underline cursor-pointer"
                  >
                    <span>RETURN TO TOP</span>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* =========================================================================
            BOTTOM PROGRESS BAR & GAUGE (Continuous scroll progress 0% to 100%)
           ========================================================================= */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-zinc-400 pb-2 z-20">
          <span className="tracking-[0.25em] uppercase text-[10px] sm:text-xs">CITADEL // FRAME SCROLL</span>
          <div className="w-32 sm:w-64 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#E5A95D] to-[#F7D299] transition-all duration-100"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="tracking-widest text-[#E5A95D] font-bold text-xs">
            {String(Math.min(80, Math.max(2, Math.round(scrollProgress * 78 + 2)))).padStart(2, '0')} / 80
          </span>
        </div>

      </div>
    </div>
  );
};
