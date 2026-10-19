import React from 'react';
import { Film, Play, Sparkles, ChevronRight } from 'lucide-react';
import { FEATURED_SLATES } from '../../data/projects';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const FeatureSlates: React.FC = () => {
  const { openVideoModal, openDossierModal } = useUI();
  const { playClick } = useAudioSynthesizer();

  return (
    <section id="feature-slates" className="py-28 px-6 relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-gold-pure uppercase mb-3">
              <Film className="w-3.5 h-3.5" />
              FLAGSHIP SLATES
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-[0.06em] text-white">
              FEATURE PRODUCTIONS
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-300 tracking-wider max-w-md uppercase">
            ORIGINAL NARRATIVE INTELLECTUAL PROPERTIES IN ACTIVE PRODUCTION & FESTIVAL CIRCUITS.
          </p>
        </div>

        {/* Feature Slates Stack (Asymmetrical Editorial Spreads) */}
        <div className="space-y-32">
          {FEATURED_SLATES.map((slate, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={slate.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* 7-Column Widescreen Anamorphic Visual Anchor */}
                <div
                  className={`lg:col-span-7 relative group cursor-pointer overflow-hidden rounded-sm ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  onClick={() => {
                    playClick();
                    if (slate.media.videoUrl) openVideoModal(slate.media.videoUrl);
                  }}
                >
                  <div className="relative aspect-[2.39/1] overflow-hidden bg-zinc-950">
                    <img
                      src={slate.media.heroImage}
                      alt={slate.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-cinema group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Viewfinder Overlay Lines */}
                    <div className="absolute inset-4 border border-white/10 pointer-events-none flex justify-between p-2">
                      <span className="font-mono text-[10px] tracking-widest text-gold-light/70 uppercase">
                        {slate.technicalSpecs.aspectRatio}
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                        {slate.technicalSpecs.camera}
                      </span>
                    </div>

                    {/* Play Center Hover Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/60 border border-gold-pure/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-gold-pure transition-all duration-300">
                        <Play className="w-6 h-6 text-gold-light fill-gold-light translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5-Column Editorial Slate Dossier */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Category & Status Line */}
                  <div className="flex items-center gap-3 font-mono text-xs text-gold-pure tracking-[0.2em] uppercase mb-3">
                    <span>{slate.year}</span>
                    <span>•</span>
                    <span>{slate.role}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-3xl sm:text-4xl font-extrabold uppercase tracking-wider text-white mb-4">
                    {slate.title}
                  </h3>

                  {/* Logline */}
                  <p className="text-zinc-300 text-base leading-relaxed font-light mb-6">
                    {slate.logline}
                  </p>

                  {/* Technical Viewfinder Readout (Anti-Boxy: Clean Horizontal Strip) */}
                  <div className="py-4 border-y border-white/[0.08] mb-6 space-y-2 text-xs font-mono text-zinc-300">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">CAMERA & GLASS:</span>
                      <span className="text-white font-medium">{slate.technicalSpecs.camera}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">ANAMORPHIC PRIMES:</span>
                      <span className="text-gold-light">{slate.technicalSpecs.lenses}</span>
                    </div>
                    {slate.technicalSpecs.locations && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">LOCATION:</span>
                        <span className="text-zinc-300">{slate.technicalSpecs.locations}</span>
                      </div>
                    )}
                  </div>

                  {/* Laurels / Accolades list */}
                  {slate.laurels && slate.laurels.length > 0 && (
                    <div className="space-y-1 mb-8">
                      {slate.laurels.slice(0, 2).map((laurel, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex items-center gap-2 text-xs font-mono text-gold-light tracking-wider"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-gold-pure shrink-0" />
                          <span>{laurel}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interactive Triggers */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        playClick();
                        openDossierModal(slate);
                      }}
                      className="px-5 py-2.5 bg-white/[0.04] border border-white/15 text-white text-xs font-mono tracking-widest uppercase rounded-sm hover:border-gold-pure hover:text-gold-light transition-all flex items-center gap-2 group"
                    >
                      <span>VIEW PROJECT DOSSIER</span>
                      <ChevronRight className="w-4 h-4 text-gold-pure group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
