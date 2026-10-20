import React, { useEffect, useState } from 'react';
import { Film } from 'lucide-react';

interface PreloaderProps {
  progress: number;
  isReady: boolean;
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ progress, isReady, onComplete }) => {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (isReady && progress >= 100) {
      const fadeTimer = setTimeout(() => {
        setFading(true);
      }, 300);

      const hideTimer = setTimeout(() => {
        setHidden(true);
        onComplete();
      }, 900);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isReady, progress, onComplete]);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-gradient-to-b from-[#2A0508] via-[#1A0305] to-[#0A0102] transition-opacity duration-700 ease-cinema ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 35mm Subtle Grain */}
      <div className="film-grain" />

      {/* Center Preloader Console */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full">
        {/* Aperture / Reel Icon */}
        <div className="w-16 h-16 rounded-full border border-[#E5A95D]/30 flex items-center justify-center mb-8 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(229,169,93,0.15)]">
          <Film className="w-7 h-7 text-[#E5A95D] animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Monogram Brand */}
        <h1 className="font-serif text-lg sm:text-xl font-extrabold tracking-[0.3em] uppercase text-white mb-2">
          CITADEL PRODUCTIONS
        </h1>
        <p className="font-mono text-xs tracking-[0.35em] text-[#E5A95D] uppercase mb-10">
          ATTIKUS EBENHACK • AUTEUR EXPERIENCE
        </p>

        {/* Real Progress Bar */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-4 relative">
          <div
            className="h-full bg-gradient-to-r from-[#B87B32] via-[#E5A95D] to-[#F7D299] transition-all duration-200 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>

        {/* Live Loading Metrics */}
        <div className="w-full flex items-center justify-between font-mono text-[11px] text-zinc-400 tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            LOADING CINEMA FRAMES
          </span>
          <span className="text-white font-bold">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};
