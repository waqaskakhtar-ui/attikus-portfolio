import React from 'react';
import { ArrowUp, Instagram, Youtube, Mail } from 'lucide-react';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const Footer: React.FC = () => {
  const { playClick } = useAudioSynthesizer();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-6 border-t border-white/[0.08] bg-black text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Brand Legal & Provenance */}
        <div>
          <div className="font-serif text-lg font-bold text-white tracking-[0.2em] uppercase mb-1">
            CITADEL PRODUCTIONS LLC
          </div>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            STORIES FORGED IN LIGHT & SHADOW • NASHVILLE, TN
          </p>
          <p className="font-mono text-[11px] text-zinc-600 mt-3">
            © {new Date().getFullYear()} Attikus Ebenhack & Citadel Productions LLC. All Rights Reserved.
          </p>
        </div>

        {/* Channels Suite */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-widest uppercase">
          <a
            href="https://instagram.com/photobyattikus"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-gold-light transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-gold-pure" />
            <span>@PHOTOBYATTIKUS</span>
          </a>
          <a
            href="https://instagram.com/citadelproductions.co"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-gold-light transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-gold-pure" />
            <span>@CITADELPRODUCTIONS</span>
          </a>
          <a
            href="https://youtube.com/@CitadelProductions"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-gold-light transition-colors"
          >
            <Youtube className="w-3.5 h-3.5 text-gold-pure" />
            <span>YOUTUBE</span>
          </a>
          <a
            href="mailto:attikus@citadelproductions.co"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-gold-light transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-gold-pure" />
            <span>CONTACT</span>
          </a>
        </div>

        {/* Scroll Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-gold-pure hover:border-gold-pure/40 transition-all flex items-center justify-center group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
