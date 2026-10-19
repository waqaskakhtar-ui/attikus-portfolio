import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Play, Compass, Award, Clapperboard } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const ApertureHero: React.FC = () => {
  const { openVideoModal } = useUI();
  const { playClick, playSubBoom } = useAudioSynthesizer();
  const [shutterOpen, setShutterOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const topShutterRef = useRef<HTMLDivElement>(null);
  const bottomShutterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Aperture Shutter Separation Sequence
      if (topShutterRef.current && bottomShutterRef.current) {
        playSubBoom();
        const tl = gsap.timeline({
          onComplete: () => setShutterOpen(true),
        });

        tl.to(topShutterRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
        }, 0)
        .to(bottomShutterRef.current, {
          yPercent: 100,
          duration: 1.2,
          ease: 'power4.inOut',
        }, 0);

        if (titleRef.current) {
          tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 50, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' },
            0.6
          );
        }
      } else {
        setShutterOpen(true);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [playSubBoom]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden"
    >
      {/* Split Aperture Shutters (Opening Animation) */}
      {!shutterOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between">
          <div
            ref={topShutterRef}
            className="w-full h-1/2 bg-black border-b border-gold-pure/30 flex items-end justify-center pb-6"
          >
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-gold-light uppercase">
              <span className="w-2 h-2 rounded-full bg-red-tally animate-pulse" />
              REC • CITADEL PRODUCTIONS
            </div>
          </div>
          <div
            ref={bottomShutterRef}
            className="w-full h-1/2 bg-black border-t border-gold-pure/30 flex items-start justify-center pt-6"
          >
            <div className="font-mono text-xs tracking-[0.3em] text-zinc-400">
              FRAME RATE 24.000 FPS • APERTURE OPEN
            </div>
          </div>
        </div>
      )}

      {/* Atmospheric Background Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-gold-pure/[0.04] via-transparent to-transparent pointer-events-none" />

      {/* Monolithic Editorial Content */}
      <div className="max-w-6xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
        {/* Viewfinder Metadata Banner */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 text-xs font-mono tracking-[0.2em] uppercase mb-8">
          <span className="flex items-center gap-1.5 text-red-tally font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-tally animate-ping" />
            STANDBY
          </span>
          <span className="text-white/20">|</span>
          <span className="text-zinc-300">COMBAT CAMERA VETERAN</span>
          <span className="text-white/20">|</span>
          <span className="text-gold-light">NASHVILLE, TN</span>
        </div>

        {/* Monumental Headline */}
        <h1
          ref={titleRef}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.06em] uppercase text-white leading-[1.05] max-w-5xl mb-6"
        >
          WHERE VISIONS <br />
          <span className="gold-gradient-text italic font-normal tracking-[0.04em]">
            BECOME LEGEND
          </span>
        </h1>

        {/* Directorial Philosophy Narrative */}
        <p className="max-w-2xl text-zinc-400 text-base sm:text-lg font-light leading-relaxed mb-10">
          Cinematic feature slates, commercial visual narratives, and high-fashion editorial portraiture. Directed and shot with combat-honed logistical precision and uncompromising anamorphic scope.
        </p>

        {/* Primary Action Suite */}
        <div className="flex flex-wrap items-center justify-center gap-5 mb-16">
          <button
            onClick={() => {
              playClick();
              openVideoModal('https://www.youtube.com/embed/dQw4w9WgXcQ');
            }}
            className="px-7 py-3.5 bg-gradient-to-r from-gold-light via-gold-pure to-gold-burnished text-black text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_25px_rgba(229,169,93,0.4)]"
          >
            <Play className="w-4 h-4 fill-black" />
            <span>WATCH 2026 REEL</span>
          </button>

          <a
            href="#feature-slates"
            onClick={() => playClick()}
            className="px-6 py-3.5 border border-white/20 text-white text-xs font-mono tracking-[0.15em] uppercase rounded-sm hover:border-gold-pure hover:text-gold-light transition-all flex items-center gap-2.5 bg-white/[0.02]"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE SLATES</span>
          </a>
        </div>

        {/* Provenance Key Metrics Bar (Anti-Boxy: Single Clean Slate Line) */}
        <div className="w-full max-w-4xl pt-8 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
          <div>
            <div className="font-serif text-2xl font-bold text-white tracking-wider">
              10+ <span className="text-gold-pure text-base font-normal">YRS</span>
            </div>
            <div className="font-mono text-[11px] text-zinc-300 uppercase tracking-widest mt-1">
              COMBAT CAMERA & CINEMA
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-white tracking-wider">
              2 <span className="text-gold-pure text-base font-normal">SLATES</span>
            </div>
            <div className="font-mono text-[11px] text-zinc-300 uppercase tracking-widest mt-1">
              FEATURE FILM PRODUCTIONS
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-white tracking-wider flex items-center gap-1.5">
              <span>NASHVILLE</span>
              <Award className="w-4 h-4 text-gold-pure" />
            </div>
            <div className="font-mono text-[11px] text-zinc-300 uppercase tracking-widest mt-1">
              FILM FESTIVAL HONORS
            </div>
          </div>
          <div>
            <div className="font-serif text-2xl font-bold text-white tracking-wider flex items-center gap-1.5">
              <span>CITADEL</span>
              <Clapperboard className="w-4 h-4 text-gold-pure" />
            </div>
            <div className="font-mono text-[11px] text-zinc-300 uppercase tracking-widest mt-1">
              FULL-SERVICE PRODUCTION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
