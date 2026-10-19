import React from 'react';
import { Camera, Maximize2 } from 'lucide-react';
import { PHOTOGRAPHY_ARCHIVE } from '../../data/photography';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const PhotoLookbook: React.FC = () => {
  const { openPhotoModal } = useUI();
  const { playClick } = useAudioSynthesizer();

  return (
    <section id="photo-lookbook" className="py-28 px-6 relative border-t border-white/[0.06] bg-obsidian">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-gold-pure uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              PHOTO BY ATTIKUS
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-[0.06em] text-white">
              EDITORIAL NOIR
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-300 tracking-wider max-w-md uppercase">
            HIGH-FASHION EDITORIAL, ARTIST PORTRAITURE & NOIR CHARACTER STUDIES BASED IN NASHVILLE.
          </p>
        </div>

        {/* Gallery Spread (Asymmetrical Variable Heights - Editorial Magazine Rhythm) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {PHOTOGRAPHY_ARCHIVE.map((photo, idx) => {
            // Alternating column span rhythm
            const isSpan7 = idx % 3 === 0;
            const colClass = isSpan7 ? 'md:col-span-7' : 'md:col-span-5';

            return (
              <div
                key={photo.id}
                onClick={() => {
                  playClick();
                  openPhotoModal(photo);
                }}
                className={`${colClass} group cursor-pointer relative overflow-hidden rounded-sm bg-zinc-950`}
              >
                <div className="relative overflow-hidden aspect-[4/5] sm:aspect-auto sm:max-h-[650px]">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-cinema group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-40 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Top Bar Series Badge */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                    {photo.series}
                  </div>

                  {/* Zoom Action Icon */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-4 h-4 text-gold-light" />
                  </div>

                  {/* Bottom Technical Slate Overlays */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-left">
                    <h4 className="font-serif text-lg font-bold text-white uppercase tracking-wider mb-1">
                      {photo.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-gold-light tracking-wider uppercase">
                      <span>{photo.specs.camera}</span>
                      <span>•</span>
                      <span>{photo.specs.lens}</span>
                      <span>•</span>
                      <span>{photo.specs.lighting}</span>
                    </div>
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
