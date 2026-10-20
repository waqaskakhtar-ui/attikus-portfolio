import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Award, ChevronDown } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';
import { TOTAL_FRAMES } from '../../hooks/useFramePreloader';

interface CinematicHeroScrollProps {
  images: HTMLImageElement[];
}

export const CinematicHeroScroll: React.FC<CinematicHeroScrollProps> = ({ images }) => {
  const { openVideoModal } = useUI();
  const { playClick, playSubBoom } = useAudioSynthesizer();

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Draw frame on canvas with aspect-ratio preservation
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Fill canvas with exact deep wine-red tone of the frame background
    ctx.fillStyle = '#380A0E';
    ctx.fillRect(0, 0, width, height);

    // Frame natural aspect ratio is 1920 / 1080 = 16:9
    const imgRatio = 1920 / 1080;

    // Height-based fit ensures the character (from head to shoes) remains fully visible on all viewports
    const drawH = height;
    const drawW = height * imgRatio;
    const drawX = (width - drawW) / 2;
    const drawY = 0;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [images]);

  // Handle Canvas Resize with High-DPI support
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Draw initial frame (Frame 2) on mount
  useEffect(() => {
    if (images.length > 0 && images[0]?.complete) {
      drawFrame(0);
    }
  }, [images, drawFrame]);

  // Scroll Listener & Buttery Smooth Lerping Loop
  useEffect(() => {
    const checkReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);

      const targetIndex = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = targetIndex;

      if (checkReducedMotion) {
        currentFrameRef.current = targetIndex;
        drawFrame(Math.round(targetIndex));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 60-120fps Render Loop with linear interpolation
    const renderLoop = () => {
      if (!checkReducedMotion) {
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.01) {
          currentFrameRef.current += diff * 0.18;
          const frameToDraw = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current)));
          drawFrame(frameToDraw);
        }
      }
      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  const actLabel = scrollProgress < 0.25 ? 'ACT I • THE GAZE' : scrollProgress < 0.52 ? 'ACT II • THE CRAFT' : scrollProgress < 0.78 ? 'ACT III • THE STRIDE' : 'ACT IV • CITADEL';

  return (
    <section
      ref={sectionRef}
      id="hero-scroll"
      className="relative w-full h-[480vh] bg-[#380A0E] text-white selection:bg-[#E5A95D] selection:text-black"
    >
      {/* Pinned Sticky Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#3E0A0E] via-[#35080C] to-[#200406]">
        {/* Full-bleed Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Ambient Vignette & Cinema Letterbox Shading */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/60" />
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-[#050507] via-[#050507]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#160204] via-[#160204]/60 to-transparent pointer-events-none" />

        {/* =========================================================================
            LUXURY EDITORIAL TYPOGRAPHY OVERLAYS
            Repositioned and flanked so they NEVER obstruct the character's face/body
           ========================================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-6 sm:px-12 flex flex-col justify-between py-24 sm:py-28 pointer-events-none">
          {/* Top Bar: Editorial Film Clapper Metadata */}
          <div className="flex items-center justify-between text-xs font-mono tracking-[0.3em] uppercase text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-white font-semibold">CITADEL PRODUCTIONS</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="hidden sm:inline text-zinc-400">COMBAT CAMERA VETERAN</span>
            </div>
            <div className="text-right">
              <span className="text-[#E5A95D] font-bold">{actLabel}</span>
              <span className="mx-2 text-white/30">•</span>
              <span className="text-zinc-400">FRAME {Math.min(80, Math.max(2, Math.round(scrollProgress * 78 + 2)))}</span>
            </div>
          </div>

          {/* Dynamic Editorial Content Layers Based on Scroll Position */}
          <div className="relative w-full my-auto">
            {/* STAGE 1: CLOSE-UP FACE (Scroll 0% - 25%) */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                scrollProgress < 0.25
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-6 pointer-events-none hidden'
              }`}
            >
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5A95D]/30 bg-black/40 text-[10px] font-mono tracking-[0.25em] text-[#E5A95D] uppercase mb-4">
                  <span>ATTIKUS EBENHACK</span>
                  <span>•</span>
                  <span>DIRECTOR & CINEMATOGRAPHER</span>
                </div>
                <h1 className="font-being font-black text-5xl sm:text-7xl lg:text-8xl tracking-[-0.03em] uppercase text-white leading-[0.9] mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                  WHERE VISIONS <br />
                  <span className="italic font-light text-zinc-200">BECOME</span> <br />
                  LEGEND.
                </h1>
                <p className="font-sans font-light text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md drop-shadow-md mb-8">
                  Stories forged in light, shadow, and combat-honed operational rigor. Scroll down to enter the cinematic world.
                </p>

                {/* Primary Showreel Trigger */}
                <div className="pointer-events-auto flex items-center gap-4">
                  <button
                    onClick={() => {
                      playClick();
                      playSubBoom();
                      openVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ');
                    }}
                    className="px-6 py-3.5 bg-gradient-to-r from-[#F7D299] via-[#E5A95D] to-[#B87B32] text-black text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:scale-105 transition-all flex items-center gap-2.5 shadow-[0_0_30px_rgba(229,169,93,0.4)]"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>WATCH 2026 REEL</span>
                  </button>

                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-400">
                    <ChevronDown className="w-4 h-4 text-[#E5A95D] animate-bounce" />
                    <span>SCROLL TO WALK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* STAGE 2: UPPER BODY REVEAL (Scroll 25% - 52%) */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                scrollProgress >= 0.25 && scrollProgress < 0.52
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-6 pointer-events-none hidden'
              }`}
            >
              <div className="max-w-md sm:max-w-lg ml-auto text-right">
                <span className="block font-mono text-xs tracking-[0.35em] text-[#E5A95D] uppercase mb-3">
                  DIRECTORIAL RIGOR
                </span>
                <h2 className="font-being font-black text-4xl sm:text-6xl lg:text-7xl tracking-[-0.03em] uppercase text-white leading-[0.92] mb-5 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                  DISCIPLINE <br />
                  <span className="italic font-light text-zinc-300">COMMANDS</span> <br />
                  THE FRAME.
                </h2>
                <p className="font-sans font-light text-xs sm:text-sm text-zinc-300 leading-relaxed ml-auto max-w-sm mb-6 drop-shadow-md">
                  In tactical combat operations, there are no second takes. On cinematic soundstages, that surgical leadership executes ambitious vision.
                </p>

                {/* Key Provenance Badge */}
                <div className="inline-flex items-center gap-3 py-2 px-4 bg-black/50 border border-white/10 rounded-sm font-mono text-[11px] text-zinc-300">
                  <Award className="w-4 h-4 text-[#E5A95D]" />
                  <span>NASHVILLE FILM FESTIVAL SELECTIONS</span>
                </div>
              </div>
            </div>

            {/* STAGE 3: FULL BODY WALKING STRIDE (Scroll 52% - 78%) */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                scrollProgress >= 0.52 && scrollProgress < 0.78
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-6 pointer-events-none hidden'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Column Text (Flanking the walking character) */}
                <div className="md:col-span-5 text-left">
                  <span className="block font-mono text-xs tracking-[0.35em] text-[#E5A95D] uppercase mb-3">
                    FLAGSHIP PRODUCTIONS
                  </span>
                  <h2 className="font-being font-black text-4xl sm:text-6xl tracking-[-0.03em] uppercase text-white leading-[0.92] mb-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                    STEPPING <br />
                    <span className="italic font-light text-zinc-300">INTO THE</span> <br />
                    DEPTHS.
                  </h2>
                  <p className="font-sans font-light text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xs drop-shadow-md">
                    Helming original feature slates: the maritime epic <em className="text-[#E5A95D]">The Mutiny</em> and the sci-fi thriller <em className="text-[#E5A95D]">Before The Glow</em>.
                  </p>
                </div>

                <div className="hidden md:block md:col-span-2" />

                {/* Right Column Metrics (Flanking the walking character) */}
                <div className="md:col-span-5 text-right flex flex-col items-end">
                  <div className="space-y-4 max-w-xs font-mono text-xs text-zinc-300">
                    <div className="border-b border-white/10 pb-2">
                      <div className="text-[#E5A95D] text-lg font-serif font-bold">ARRI LF & RED 8K</div>
                      <div className="text-[10px] text-zinc-400 tracking-wider">ANAMORPHIC GLASS SENSORS</div>
                    </div>
                    <div className="border-b border-white/10 pb-2">
                      <div className="text-white text-lg font-serif font-bold">10+ YEARS</div>
                      <div className="text-[10px] text-zinc-400 tracking-wider">COMBAT CAMERA DIRECTING</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STAGE 4: COMMANDING STANCE & CITADEL OVERTURE (Scroll 78% - 100%) */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                scrollProgress >= 0.78
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-6 pointer-events-none hidden'
              }`}
            >
              <div className="w-full text-center flex flex-col items-center">
                <span className="font-mono text-xs tracking-[0.4em] text-[#E5A95D] uppercase mb-3">
                  CITADEL PRODUCTIONS LLC
                </span>
                <h2 className="font-being font-black text-6xl sm:text-8xl lg:text-9xl tracking-[-0.04em] uppercase text-white leading-[0.85] mb-5 drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
                  ATTIKUS <br />
                  <span className="italic font-light text-zinc-200">EBENHACK</span>
                </h2>
                <p className="font-mono text-xs sm:text-sm text-zinc-300 tracking-[0.25em] uppercase mb-8">
                  DIRECTOR • DIRECTOR OF PHOTOGRAPHY • NASHVILLE, TN
                </p>

                {/* Smooth Scroll Next Trigger */}
                <div className="pointer-events-auto">
                  <a
                    href="#feature-slates"
                    onClick={() => playClick()}
                    className="inline-flex items-center gap-2.5 px-6 py-3 border border-[#E5A95D]/40 bg-black/60 text-[#E5A95D] text-xs font-mono tracking-[0.25em] uppercase rounded-sm hover:bg-[#E5A95D] hover:text-black transition-all shadow-[0_0_20px_rgba(229,169,93,0.2)]"
                  >
                    <span>ENTER FEATURE SLATES</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Continuous Motion Gauge */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="tracking-[0.25em] uppercase">SCROLL CONTINUOUS MOTION</span>
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
    </section>
  );
};
