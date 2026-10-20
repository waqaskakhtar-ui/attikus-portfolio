import React, { useState } from 'react';
import { Play, ChevronDown, Award, Eye, Send, CheckCircle2, ShieldCheck, Target, ArrowUp, Instagram, Youtube, Mail, Film, ExternalLink, Check } from 'lucide-react';
import { FEATURED_SLATES, CURATED_WORKS } from '../../data/projects';
import { PHOTOGRAPHY_ARCHIVE } from '../../data/photography';
import { ProjectCategory } from '../../types/project';
import { ProjectType, EstimatedTimeline, BudgetTier, ProductionInquiry } from '../../types/inquiry';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

interface AntigravityScrollEngineProps {
  scrollProgress: number; // 0 to 1
}

export const AntigravityScrollEngine: React.FC<AntigravityScrollEngineProps> = ({ scrollProgress }) => {
  const { openVideoModal, openDossierModal, openPhotoModal } = useUI();
  const { playClick, playSubBoom } = useAudioSynthesizer();

  // Archive Filter State
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

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

  const filteredProjects = activeCategory === 'all'
    ? CURATED_WORKS
    : CURATED_WORKS.filter((p) => p.category === activeCategory);

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
  // fadeInStart -> fullStart -> fullEnd -> fadeOutEnd
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
      <div className="fixed inset-0 w-full h-full flex flex-col justify-between p-6 sm:p-12 pointer-events-none overflow-hidden">
        {/* =========================================================================
            TOP HUD READOUT (Frame counter & active chapter synchronized)
           ========================================================================= */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono tracking-[0.25em] text-zinc-300 uppercase pt-16 sm:pt-14 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
            <span className="text-white font-semibold hidden sm:inline">CITADEL PRODUCTIONS</span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-[#E5A95D]">
              {scrollProgress < 0.16
                ? '01 // THE AUTEUR GAZE'
                : scrollProgress < 0.32
                ? '02 // DIRECTORIAL DOSSIER'
                : scrollProgress < 0.50
                ? '03 // FEATURE SLATES'
                : scrollProgress < 0.68
                ? '04 // CURATED ARCHIVE'
                : scrollProgress < 0.82
                ? '05 // EDITORIAL NOIR'
                : scrollProgress < 0.94
                ? '06 // PIPELINE & INQUIRY'
                : '07 // OVERTURE & REPS'}
            </span>
          </div>

          <div className="text-right flex items-center gap-3">
            <span className="text-zinc-400">FRAME</span>
            <span className="text-white font-bold text-sm">
              {String(Math.min(80, Math.max(2, Math.round(scrollProgress * 78 + 2)))).padStart(2, '0')}
            </span>
            <span className="text-zinc-500">/ 80</span>
          </div>
        </div>

        {/* =========================================================================
            DYNAMIC ORCHESTRATED CHAPTERS (Synchronized with Frame Progress)
           ========================================================================= */}
        <div className="relative w-full max-w-7xl mx-auto my-auto h-full flex items-center justify-center">
          {/* -------------------------------------------------------------------
              CHAPTER 1: THE AUTEUR HERO (Frames 2 - 14 | Scroll 0.00 - 0.16)
              Opens on Frame 2 (close-up face). Typography lower-third & flanked.
             ------------------------------------------------------------------- */}
          {heroVis.visible && (
            <div
              style={{ opacity: heroVis.opacity, pointerEvents: heroVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-end pb-12 sm:pb-8 transition-opacity duration-300"
            >
              <div className="max-w-2xl bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-sm border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5A95D]/40 bg-[#E5A95D]/10 text-[10px] font-mono tracking-[0.25em] text-[#E5A95D] uppercase mb-3">
                  <span>ATTIKUS EBENHACK</span>
                  <span>•</span>
                  <span>COMBAT CAMERA VETERAN</span>
                </div>
                <h1 className="font-being font-black text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase text-white leading-[0.92] mb-4">
                  WHERE VISIONS <br />
                  <span className="italic font-light text-zinc-300">BECOME</span> <br />
                  LEGEND.
                </h1>
                <p className="font-sans font-light text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg mb-6">
                  Cinematic feature slates, commercial visual narratives, and high-fashion editorial portraiture. Directed with battlefield precision and uncompromising anamorphic scope.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => {
                      playClick();
                      playSubBoom();
                      openVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#F7D299] via-[#E5A95D] to-[#B87B32] text-black text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(229,169,93,0.4)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>WATCH 2026 REEL</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400">
                    <ChevronDown className="w-4 h-4 text-[#E5A95D] animate-bounce" />
                    <span>SCROLL TO WALK ↓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 2: DIRECTOR DOSSIER & ETHOS (Frames 15 - 27 | Scroll 0.16 - 0.32)
              As the camera pulls back revealing suit collar & braids. Flanked right.
             ------------------------------------------------------------------- */}
          {dossierVis.visible && (
            <div
              style={{ opacity: dossierVis.opacity, pointerEvents: dossierVis.pointerEvents }}
              className="absolute inset-0 flex items-center justify-end transition-opacity duration-300"
            >
              <div className="max-w-xl bg-black/60 backdrop-blur-md p-6 sm:p-10 rounded-sm border border-white/10 text-right shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <span className="block font-mono text-xs tracking-[0.35em] text-[#E5A95D] uppercase mb-2">
                  DIRECTORIAL PROVENANCE
                </span>
                <h2 className="font-being font-black text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] uppercase text-white leading-[0.95] mb-4">
                  STORIES FORGED IN <br />
                  <span className="italic font-light text-zinc-300">LIGHT & SHADOW</span>
                </h2>
                <p className="font-sans font-light text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  In combat reconnaissance, every shot has life-or-death consequences. On set, that operational rigor translates directly into fearless directorial command and disciplined visual storytelling.
                </p>

                {/* 3 Pillars */}
                <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-4 text-left">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#E5A95D] font-mono text-[10px] tracking-widest uppercase mb-1">
                      <Target className="w-3 h-3" /> PRECISION
                    </div>
                    <p className="text-zinc-400 text-[10px] leading-tight">Combat-proven logistical timing on set.</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[#E5A95D] font-mono text-[10px] tracking-widest uppercase mb-1">
                      <Award className="w-3 h-3" /> AUTEUR
                    </div>
                    <p className="text-zinc-400 text-[10px] leading-tight">Anamorphic vintage glass & natural light.</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[#E5A95D] font-mono text-[10px] tracking-widest uppercase mb-1">
                      <ShieldCheck className="w-3 h-3" /> COMMAND
                    </div>
                    <p className="text-zinc-400 text-[10px] leading-tight">Leading complex stunts and A-list talent.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 3: FLAGSHIP FEATURE SLATES (Frames 28 - 42 | Scroll 0.32 - 0.50)
              As the tailored black suit & maroon pocket square are revealed.
             ------------------------------------------------------------------- */}
          {slatesVis.visible && (
            <div
              style={{ opacity: slatesVis.opacity, pointerEvents: slatesVis.pointerEvents }}
              className="absolute inset-0 flex items-center justify-between transition-opacity duration-300"
            >
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {FEATURED_SLATES.map((slate) => (
                  <div
                    key={slate.id}
                    className="bg-black/60 backdrop-blur-md p-6 rounded-sm border border-white/10 hover:border-[#E5A95D]/50 transition-all flex flex-col justify-between group shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-[#E5A95D] tracking-widest uppercase mb-2">
                        <span>{slate.year} • {slate.role}</span>
                        <Film className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-extrabold uppercase text-white mb-2 group-hover:text-[#F7D299] transition-colors">
                        {slate.title}
                      </h3>
                      <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-3">
                        {slate.logline}
                      </p>

                      <div className="py-2.5 border-y border-white/10 mb-4 font-mono text-[11px] text-zinc-400 flex justify-between">
                        <span>CAMERA: {slate.technicalSpecs.camera}</span>
                        <span className="text-[#E5A95D]">{slate.technicalSpecs.aspectRatio}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          playClick();
                          openDossierModal(slate);
                        }}
                        className="px-4 py-2 bg-white/[0.06] border border-white/20 text-white text-xs font-mono tracking-widest uppercase rounded-sm hover:border-[#E5A95D] hover:text-[#E5A95D] transition-colors flex items-center gap-2"
                      >
                        <span>VIEW DOSSIER</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      {slate.media.videoUrl && (
                        <button
                          onClick={() => {
                            playClick();
                            openVideoModal(slate.media.videoUrl!);
                          }}
                          className="p-2 rounded-sm border border-white/20 text-[#E5A95D] hover:bg-[#E5A95D] hover:text-black transition-colors"
                          title="Watch Teaser"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 4: CURATED WORKS & COMMERCIALS (Frames 43 - 57 | Scroll 0.50 - 0.68)
              As the character walks forward with hands in suit pockets.
             ------------------------------------------------------------------- */}
          {archiveVis.visible && (
            <div
              style={{ opacity: archiveVis.opacity, pointerEvents: archiveVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-center transition-opacity duration-300"
            >
              <div className="w-full bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-sm border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs tracking-[0.3em] text-[#E5A95D] uppercase mb-1 block">
                      ARCHIVE PORTFOLIO
                    </span>
                    <h3 className="font-serif text-2xl sm:text-4xl font-extrabold uppercase text-white">
                      CURATED DIRECTED WORKS
                    </h3>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
                    {(['all', 'feature', 'commercial', 'music_video'] as ProjectCategory[]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          playClick();
                          setActiveCategory(cat);
                        }}
                        className={`px-3 py-1 rounded-sm uppercase tracking-wider text-[11px] transition-colors ${
                          activeCategory === cat
                            ? 'bg-[#E5A95D] text-black font-bold'
                            : 'bg-white/[0.04] text-zinc-300 hover:text-white border border-white/10'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-h-[38vh] overflow-y-auto pr-2">
                  {filteredProjects.slice(0, 3).map((project) => (
                    <div
                      key={project.id}
                      onClick={() => {
                        playClick();
                        if (project.media.videoUrl) openVideoModal(project.media.videoUrl);
                        else openDossierModal(project);
                      }}
                      className="group cursor-pointer bg-white/[0.02] border border-white/10 p-4 rounded-sm hover:border-[#E5A95D]/60 transition-colors"
                    >
                      <div className="aspect-[16/9] rounded-sm overflow-hidden mb-3 bg-zinc-950 relative">
                        <img
                          src={project.media.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                      <div className="font-mono text-[10px] text-[#E5A95D] uppercase tracking-wider mb-1">
                        {project.client || 'Citadel'} • {project.year}
                      </div>
                      <h4 className="font-serif text-base font-bold text-white uppercase group-hover:text-[#F7D299] transition-colors">
                        {project.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 5: EDITORIAL NOIR & PORTRAITURE (Frames 58 - 69 | Scroll 0.68 - 0.82)
              As the character advances with both legs & shoes in motion.
             ------------------------------------------------------------------- */}
          {photoVis.visible && (
            <div
              style={{ opacity: photoVis.opacity, pointerEvents: photoVis.pointerEvents }}
              className="absolute inset-0 flex items-center justify-between transition-opacity duration-300"
            >
              <div className="w-full bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-sm border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
                  <div>
                    <span className="font-mono text-xs tracking-[0.3em] text-[#E5A95D] uppercase block">
                      PHOTO BY ATTIKUS
                    </span>
                    <h3 className="font-serif text-2xl sm:text-4xl font-extrabold uppercase text-white">
                      EDITORIAL NOIR & PORTRAITURE
                    </h3>
                  </div>
                  <div className="font-mono text-xs text-zinc-400 uppercase hidden sm:block">
                    NASHVILLE FASHION & MUSIC ARTIST LOOKBOOK
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {PHOTOGRAPHY_ARCHIVE.map((photo) => (
                    <div
                      key={photo.id}
                      onClick={() => {
                        playClick();
                        openPhotoModal(photo);
                      }}
                      className="group cursor-pointer bg-white/[0.02] border border-white/10 rounded-sm overflow-hidden hover:border-[#E5A95D] transition-colors"
                    >
                      <div className="aspect-[4/5] overflow-hidden relative">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-90 transition-opacity" />
                        <div className="absolute bottom-2 left-2 right-2 text-left">
                          <div className="font-serif text-xs font-bold text-white uppercase truncate">
                            {photo.title}
                          </div>
                          <div className="font-mono text-[9px] text-[#E5A95D] uppercase truncate">
                            {photo.specs.camera}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 6: PIPELINE & PRODUCTION BRIEF (Frames 70 - 78 | Scroll 0.82 - 0.94)
              As the character arrives into his final commanding wide stance.
             ------------------------------------------------------------------- */}
          {briefVis.visible && (
            <div
              style={{ opacity: briefVis.opacity, pointerEvents: briefVis.pointerEvents }}
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            >
              <div className="w-full max-w-4xl bg-black/75 backdrop-blur-md p-6 sm:p-8 rounded-sm border border-white/15 max-h-[75vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                <div className="text-center mb-6">
                  <span className="font-mono text-xs tracking-[0.35em] text-[#E5A95D] uppercase block mb-1">
                    DIRECT REPRESENTATION DESK
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-extrabold uppercase text-white">
                    CALCULATE PRODUCTION BRIEF
                  </h3>
                </div>

                {briefStatus === 'success' ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="w-12 h-12 text-[#E5A95D] mx-auto mb-3" />
                    <h4 className="font-serif text-2xl font-bold uppercase text-white mb-2">
                      BRIEF DISPATCHED
                    </h4>
                    <p className="text-zinc-300 text-xs font-mono max-w-md mx-auto mb-4">
                      Your inquiry has been received at Citadel Productions desk. Direct response within 24 hours.
                    </p>
                    <button
                      onClick={() => setBriefStatus('idle')}
                      className="px-4 py-2 border border-white/20 text-xs font-mono tracking-widest uppercase text-white hover:border-[#E5A95D]"
                    >
                      NEW INQUIRY
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBriefSubmit} className="space-y-6 text-left">
                    {/* Project Type */}
                    <div>
                      <label className="block font-mono text-[11px] text-[#E5A95D] uppercase tracking-widest mb-2">
                        01. PROJECT TYPE
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
                            className={`p-2.5 text-[11px] font-mono tracking-wider uppercase border rounded-sm ${
                              projectType === t
                                ? 'border-[#E5A95D] bg-[#E5A95D]/15 text-[#E5A95D] font-bold'
                                : 'border-white/10 text-zinc-300 bg-white/[0.02]'
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
                        <label className="block font-mono text-[11px] text-[#E5A95D] uppercase tracking-widest mb-2">
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
                              className={`p-2 text-[10px] font-mono tracking-wider uppercase border rounded-sm ${
                                timeline === tl
                                  ? 'border-[#E5A95D] bg-[#E5A95D]/15 text-[#E5A95D] font-bold'
                                  : 'border-white/10 text-zinc-300 bg-white/[0.02]'
                              }`}
                            >
                              {tl.replace('_', ' ')}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] text-[#E5A95D] uppercase tracking-widest mb-2">
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
                              className={`p-2 text-[10px] font-mono tracking-wider uppercase border rounded-sm ${
                                budgetTier === bt
                                  ? 'border-[#E5A95D] bg-[#E5A95D]/15 text-[#E5A95D] font-bold'
                                  : 'border-white/10 text-zinc-300 bg-white/[0.02]'
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
                      <label className="block font-mono text-[11px] text-[#E5A95D] uppercase tracking-widest mb-2">
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
                              className={`p-2 text-left text-[10px] font-mono tracking-wide uppercase border rounded-sm flex items-center justify-between ${
                                isChecked
                                  ? 'border-[#E5A95D] bg-[#E5A95D]/10 text-white'
                                  : 'border-white/10 text-zinc-400 bg-white/[0.02]'
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                      <div>
                        <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
                          PRODUCER / CLIENT NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Elena Rostova"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#E5A95D] py-1.5 text-xs text-white placeholder-zinc-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
                          CONTACT EMAIL *
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="producer@agency.com"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#E5A95D] py-1.5 text-xs text-white placeholder-zinc-600 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
                          STUDIO / PRODUCTION ENTITY
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Anonymous Content"
                          className="w-full bg-transparent border-b border-white/20 focus:border-[#E5A95D] py-1.5 text-xs text-white placeholder-zinc-600 outline-none"
                        />
                      </div>
                    </div>

                    {/* Project Notes */}
                    <div>
                      <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
                        PROJECT SYNOPSIS & LOGISTICAL NOTES
                      </label>
                      <input
                        type="text"
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        placeholder="Logline, target shooting location, desired camera package..."
                        className="w-full bg-transparent border-b border-white/20 focus:border-[#E5A95D] py-1.5 text-xs text-white placeholder-zinc-600 outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                        CITADEL PRODUCTIONS LLC • NASHVILLE, TN
                      </span>
                      <button
                        type="submit"
                        disabled={briefStatus === 'submitting'}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#F7D299] via-[#E5A95D] to-[#B87B32] text-black text-xs font-bold font-mono tracking-widest uppercase rounded-sm hover:brightness-110 transition-all flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>TRANSMIT BRIEF</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------------
              CHAPTER 7: CITADEL OVERTURE & FOOTER (Frames 79 - 80 | Scroll 0.94 - 1.00)
              Natural, fluid arrival at the base of the site without clipping!
             ------------------------------------------------------------------- */}
          {footerVis.visible && (
            <div
              style={{ opacity: footerVis.opacity, pointerEvents: footerVis.pointerEvents }}
              className="absolute inset-0 flex flex-col justify-end pb-8 transition-opacity duration-300"
            >
              <div className="w-full max-w-5xl mx-auto bg-black/85 backdrop-blur-xl p-8 rounded-sm border border-white/15 text-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                <span className="font-mono text-xs tracking-[0.4em] text-[#E5A95D] uppercase mb-2 block">
                  JOURNEY COMPLETE
                </span>
                <h2 className="font-being font-black text-4xl sm:text-6xl uppercase text-white mb-2">
                  CITADEL PRODUCTIONS LLC
                </h2>
                <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-6">
                  ATTIKUS EBENHACK • STORIES FORGED IN LIGHT & SHADOW
                </p>

                {/* Social Channels */}
                <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-zinc-300 uppercase tracking-wider mb-6">
                  <a
                    href="https://instagram.com/photobyattikus"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#E5A95D] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E5A95D]" />
                    <span>@photobyattikus</span>
                  </a>
                  <a
                    href="https://instagram.com/citadelproductions.co"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#E5A95D] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E5A95D]" />
                    <span>@citadelproductions</span>
                  </a>
                  <a
                    href="https://youtube.com/@CitadelProductions"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#E5A95D] transition-colors"
                  >
                    <Youtube className="w-4 h-4 text-[#E5A95D]" />
                    <span>YouTube</span>
                  </a>
                  <a
                    href="mailto:attikus@citadelproductions.co"
                    className="flex items-center gap-1.5 hover:text-[#E5A95D] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#E5A95D]" />
                    <span>attikus@citadelproductions.co</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>© {new Date().getFullYear()} Attikus Ebenhack & Citadel Productions. All Rights Reserved.</span>
                  <button
                    onClick={() => {
                      playClick();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-2 sm:mt-0 flex items-center gap-1 text-[#E5A95D] hover:underline"
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
          <span className="tracking-[0.2em] uppercase">ANTIGRAVITY FRAME FRAMEWORK</span>
          <div className="w-36 sm:w-64 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-[#E5A95D] to-[#F7D299] transition-all duration-100"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <span className="tracking-widest text-[#E5A95D]">{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>
    </div>
  );
};
