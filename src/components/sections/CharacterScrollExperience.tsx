import React, { useEffect, useRef, useState, useCallback } from 'react';

const FRAME_START = 2;
const FRAME_END = 80;
const TOTAL_FRAMES = FRAME_END - FRAME_START + 1; // 79 frames

const getFramePath = (index: number) => {
  const frameNum = index + FRAME_START;
  const padded = frameNum < 10 ? `0${frameNum}` : `${frameNum}`;
  return `/frame-image/${padded}.png`;
};

export const CharacterScrollExperience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Preload all 79 frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;

    // Load first frame immediately for instant first-paint
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      if (!isMounted) return;
      loaded++;
      setLoadedCount(1);
      drawFrame(0);
    };

    // Load all remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      images[i] = img;
      img.onload = () => {
        if (!isMounted) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= Math.floor(TOTAL_FRAMES * 0.4)) {
          setIsReady(true);
        }
      };
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Draw frame on canvas with aspect-ratio preservation
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = '#380A0E';
    ctx.fillRect(0, 0, width, height);

    // Frame natural aspect ratio is 1920 / 1080 = 16:9
    const imgRatio = 1920 / 1080;
    const canvasRatio = width / height;

    let drawW: number;
    let drawH: number;
    let drawX: number;
    let drawY: number;

    // Fit by height so the character (from head to shoes) remains fully visible on all screens
    if (canvasRatio > imgRatio) {
      // Very wide desktop: fit height, center horizontally
      drawH = height;
      drawW = height * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = 0;
    } else {
      // Standard desktop, tablet, and portrait mobile:
      // Fit height so the character's full vertical height (head to toe) is 100% visible
      drawH = height;
      drawW = height * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Handle Resize
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

  // Scroll Listener & Smooth Lerping Animation Loop
  useEffect(() => {
    const checkReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Calculate progress from 0 to 1
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

    // Smooth Frame Interpolation Render Loop (60-120fps)
    const renderLoop = () => {
      if (!checkReducedMotion) {
        // Butter-smooth lerp interpolation
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

  // Editorial Act Titles calculated from scroll progress
  // Stage 1: Close-up (0.00 - 0.28)
  // Stage 2: Upper Body (0.28 - 0.58)
  // Stage 3: Full Body Walking (0.58 - 0.86)
  // Stage 4: Grounded Stance (0.86 - 1.00)
  const actNumber = scrollProgress < 0.28 ? 'I' : scrollProgress < 0.58 ? 'II' : scrollProgress < 0.86 ? 'III' : 'IV';

  return (
    <section
      ref={sectionRef}
      id="cinematic-character-scroll"
      className="relative w-full h-[450vh] bg-[#32080C] text-white selection:bg-[#E5A95D] selection:text-black"
    >
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#3D0A0E] via-[#35080C] to-[#250406]">
        {/* Full-bleed Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />

        {/* Ambient Subtle Vignette & Shading to integrate with page */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black/50" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050507] via-[#050507]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050507] via-[#050507]/40 to-transparent pointer-events-none" />

        {/* =========================================================================
            LUXURY EDITORIAL TYPOGRAPHY OVERLAYS (Integrated directly, NO boxy cards)
            Uses "The Being" / Heavy Display styling with extreme weight contrast
           ========================================================================= */}
        <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-6 sm:px-12 flex flex-col justify-between py-24 sm:py-28 pointer-events-none">
          {/* Top Bar: Editorial Metadata Stamp */}
          <div className="flex items-center justify-between text-xs font-mono tracking-[0.3em] uppercase text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E5A95D] shadow-[0_0_8px_#E5A95D]" />
              <span>CITADEL AUTEUR SEQUENCE</span>
            </div>
            <div className="text-right">
              <span className="text-[#E5A95D]">ACT {actNumber}</span>
              <span className="mx-2 text-white/30">•</span>
              <span>SCENE {Math.min(80, Math.max(2, Math.round(scrollProgress * 78 + 2)))} / 80</span>
            </div>
          </div>

          {/* Dynamic Editorial Text Layers based on Scroll Depth */}
          <div className="relative w-full my-auto">
            {/* STAGE 1: THE CLOSE-UP (Scroll 0% - 28%) */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                scrollProgress < 0.28
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-8 pointer-events-none hidden'
              }`}
            >
              <div className="max-w-xl">
                <span className="block font-mono text-xs tracking-[0.35em] text-[#E5A95D] uppercase mb-3">
                  01 // THE DIRECTORIAL GAZE
                </span>
                <h2 className="font-being font-black text-5xl sm:text-7xl lg:text-8xl tracking-[-0.03em] uppercase text-white leading-[0.9] mb-6">
                  STORIES <br />
                  <span className="italic font-light text-zinc-300">BEGIN IN</span> <br />
                  THE EYES.
                </h2>
                <p className="font-sans font-light text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md">
                  In combat reconnaissance, every micro-expression signals consequence. On set, that relentless vision directs truth.
                </p>
              </div>
            </div>

            {/* STAGE 2: UPPER BODY STRIDE (Scroll 28% - 58%) */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                scrollProgress >= 0.28 && scrollProgress < 0.58
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-8 pointer-events-none hidden'
              }`}
            >
              <div className="max-w-xl ml-auto text-right">
                <span className="block font-mono text-xs tracking-[0.35em] text-[#E5A95D] uppercase mb-3">
                  02 // TAILORED DISCIPLINE
                </span>
                <h2 className="font-being font-black text-5xl sm:text-7xl lg:text-8xl tracking-[-0.03em] uppercase text-white leading-[0.9] mb-6">
                  DISCIPLINE <br />
                  <span className="italic font-light text-zinc-300">COMMANDS</span> <br />
                  THE FRAME.
                </h2>
                <p className="font-sans font-light text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md ml-auto">
                  Sharp tailoring meets unyielding focus. Directing maritime epics and festival cinema with surgical execution.
                </p>
              </div>
            </div>

            {/* STAGE 3: FULL BODY ADVANCE (Scroll 58% - 86%) */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                scrollProgress >= 0.58 && scrollProgress < 0.86
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-8 pointer-events-none hidden'
              }`}
            >
              <div className="max-w-xl">
                <span className="block font-mono text-xs tracking-[0.35em] text-[#E5A95D] uppercase mb-3">
                  03 // UNSTOPPABLE STRIDE
                </span>
                <h2 className="font-being font-black text-5xl sm:text-7xl lg:text-8xl tracking-[-0.03em] uppercase text-white leading-[0.9] mb-6">
                  STEPPING <br />
                  <span className="italic font-light text-zinc-300">FORWARD INTO</span> <br />
                  LEGEND.
                </h2>
                <p className="font-sans font-light text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md">
                  From tactical operations to the soundstage. Attikus Ebenhack leads Citadel Productions into new cinematic horizons.
                </p>
              </div>
            </div>

            {/* STAGE 4: COMMANDING STANCE (Scroll 86% - 100%) */}
            <div
              className={`transition-all duration-700 ease-out transform ${
                scrollProgress >= 0.86
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-8 pointer-events-none hidden'
              }`}
            >
              <div className="w-full text-center flex flex-col items-center">
                <span className="font-mono text-xs tracking-[0.4em] text-[#E5A95D] uppercase mb-3">
                  04 // CITADEL PRODUCTIONS
                </span>
                <h2 className="font-being font-black text-6xl sm:text-8xl lg:text-9xl tracking-[-0.04em] uppercase text-white leading-[0.85] mb-6">
                  ATTIKUS <br />
                  <span className="italic font-light text-zinc-300">EBENHACK</span>
                </h2>
                <p className="font-sans font-light text-sm sm:text-base text-zinc-300 tracking-widest uppercase mb-6">
                  DIRECTOR • DIRECTOR OF PHOTOGRAPHY • NASHVILLE, TN
                </p>
                <div className="font-mono text-[11px] tracking-[0.3em] text-[#E5A95D] animate-bounce">
                  SCROLL TO ENTER FEATURE SLATES ↓
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Timeline Gauge */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="tracking-[0.2em] uppercase">CONTINUOUS MOTION RUNTIME</span>
            {/* Scroll Progress Bar */}
            <div className="w-36 sm:w-64 h-[2px] bg-white/10 overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-[#E5A95D] to-[#F7D299] transition-all duration-100"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="tracking-widest">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>

        {/* Loading Indicator Overlay for Initial Buffer */}
        {!isReady && loadedCount < TOTAL_FRAMES && (
          <div className="absolute bottom-8 right-8 z-30 font-mono text-[11px] tracking-widest text-[#E5A95D] bg-black/60 backdrop-blur-md px-4 py-2 border border-[#E5A95D]/30 rounded-sm">
            BUFFERING FRAMES ({loadedCount}/{TOTAL_FRAMES})
          </div>
        )}
      </div>
    </section>
  );
};
