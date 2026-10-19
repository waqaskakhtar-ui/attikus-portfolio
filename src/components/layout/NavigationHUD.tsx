import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const NavigationHUD: React.FC = () => {
  const { soundEnabled, toggleSound } = useUI();
  const { playClick } = useAudioSynthesizer();

  const handleSoundClick = () => {
    toggleSound();
    playClick();
  };

  const handleNavClick = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-void/85 backdrop-blur-xl border-b border-white/[0.06] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Monogram Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="group flex flex-col items-start text-left cursor-pointer"
        >
          <span className="font-serif text-sm tracking-[0.25em] font-extrabold text-white group-hover:text-gold-light transition-colors">
            CITADEL PRODUCTIONS
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 uppercase">
            ATTIKUS EBENHACK • DIR
          </span>
        </a>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.2em] text-zinc-300 uppercase">
          <button
            onClick={() => handleNavClick('cinematic-character-scroll')}
            className="hover:text-gold-light transition-colors relative py-1 group text-gold-light/90"
          >
            AUTEUR
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-pure group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => handleNavClick('feature-slates')}
            className="hover:text-gold-light transition-colors relative py-1 group"
          >
            SLATES
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-pure group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => handleNavClick('curated-archive')}
            className="hover:text-gold-light transition-colors relative py-1 group"
          >
            ARCHIVE
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-pure group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => handleNavClick('photo-lookbook')}
            className="hover:text-gold-light transition-colors relative py-1 group"
          >
            EDITORIAL
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-pure group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => handleNavClick('director-bio')}
            className="hover:text-gold-light transition-colors relative py-1 group"
          >
            DIRECTOR
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-pure group-hover:w-full transition-all duration-300" />
          </button>
          <button
            onClick={() => handleNavClick('brief-estimator')}
            className="hover:text-gold-light transition-colors relative py-1 group text-gold-pure/90"
          >
            BRIEF
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-pure group-hover:w-full transition-all duration-300" />
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-4">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleSoundClick}
            className="p-2 rounded border border-white/[0.08] text-zinc-300 hover:text-gold-pure hover:border-gold-pure/40 transition-colors flex items-center gap-2 text-xs font-mono"
            title={soundEnabled ? 'Mute Audio Engine' : 'Enable Ambient Cinema Sound'}
            aria-label="Sound Toggle"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-gold-pure animate-pulse" />
                <span className="hidden sm:inline text-[10px] text-gold-light">AUDIO ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-zinc-500" />
                <span className="hidden sm:inline text-[10px] text-zinc-500">MUTE</span>
              </>
            )}
          </button>

          {/* Start Production CTA */}
          <button
            onClick={() => handleNavClick('brief-estimator')}
            className="relative px-4 py-2 bg-gradient-to-r from-gold-light via-gold-pure to-gold-burnished text-black text-xs font-semibold tracking-wider uppercase rounded-sm hover:brightness-110 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,169,93,0.3)]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>INQUIRE</span>
          </button>
        </div>
      </div>
    </header>
  );
};
