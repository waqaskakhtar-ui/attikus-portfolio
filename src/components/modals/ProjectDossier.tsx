import React, { useEffect } from 'react';
import { X, Film, Play, Sparkles } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const ProjectDossier: React.FC = () => {
  const { activeDossier, closeDossierModal, openVideoModal } = useUI();
  const { playClick } = useAudioSynthesizer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDossierModal();
    };
    if (activeDossier) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeDossier, closeDossierModal]);

  if (!activeDossier) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/85 backdrop-blur-md">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={closeDossierModal} />

      {/* Slide-in Drawer */}
      <div className="relative w-full max-w-2xl h-full bg-void border-l border-white/10 p-8 sm:p-12 overflow-y-auto flex flex-col justify-between z-10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)]">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-8">
            <div className="font-mono text-xs text-gold-light tracking-[0.25em] uppercase flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-gold-pure" />
              PROJECT DOSSIER • {activeDossier.year}
            </div>
            <button
              onClick={() => {
                playClick();
                closeDossierModal();
              }}
              className="p-2 rounded-full border border-white/20 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Key Visual Frame */}
          <div className="relative aspect-[2.39/1] rounded-sm overflow-hidden mb-8 bg-zinc-950">
            <img
              src={activeDossier.media.heroImage}
              alt={activeDossier.title}
              className="w-full h-full object-cover"
            />
            {activeDossier.media.videoUrl && (
              <button
                onClick={() => {
                  playClick();
                  openVideoModal(activeDossier.media.videoUrl!);
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-black/60 border border-gold-pure/50 flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-gold-light fill-gold-light translate-x-0.5" />
                </div>
              </button>
            )}
          </div>

          {/* Title & Role */}
          <h2 className="font-serif text-3xl font-black uppercase tracking-wider text-white mb-2">
            {activeDossier.title}
          </h2>
          <div className="font-mono text-xs text-gold-pure tracking-widest uppercase mb-6">
            {activeDossier.role} • {activeDossier.client || 'Citadel Productions'}
          </div>

          {/* Synopsis */}
          <div className="space-y-4 text-zinc-300 text-sm font-light leading-relaxed mb-8">
            <p className="text-base text-white font-normal">{activeDossier.logline}</p>
            {activeDossier.synopsis && <p>{activeDossier.synopsis}</p>}
          </div>

          {/* Technical Viewfinder Specifications */}
          <div className="bg-white/[0.02] border border-white/[0.08] p-5 rounded-sm mb-8 space-y-2.5 font-mono text-xs">
            <div className="text-[10px] text-gold-pure tracking-[0.2em] uppercase mb-2">
              TECHNICAL PRODUCTION SPECIFICATIONS
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">CAMERA BODY:</span>
              <span className="text-white">{activeDossier.technicalSpecs.camera}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">ANAMORPHIC GLASS:</span>
              <span className="text-gold-light">{activeDossier.technicalSpecs.lenses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">ASPECT RATIO:</span>
              <span className="text-white">{activeDossier.technicalSpecs.aspectRatio}</span>
            </div>
            {activeDossier.technicalSpecs.runtime && (
              <div className="flex justify-between">
                <span className="text-zinc-500">RUNTIME:</span>
                <span className="text-white">{activeDossier.technicalSpecs.runtime}</span>
              </div>
            )}
            {activeDossier.technicalSpecs.colorGrade && (
              <div className="flex justify-between">
                <span className="text-zinc-500">COLOR SCIENCE:</span>
                <span className="text-white">{activeDossier.technicalSpecs.colorGrade}</span>
              </div>
            )}
          </div>

          {/* Laurels */}
          {activeDossier.laurels && (
            <div className="space-y-2 mb-8">
              <div className="font-mono text-[10px] text-zinc-500 tracking-[0.2em] uppercase">
                HONORS & FESTIVAL SELECTIONS
              </div>
              {activeDossier.laurels.map((laurel, idx) => (
                <div key={idx} className="flex items-center gap-2 font-mono text-xs text-gold-light">
                  <Sparkles className="w-3.5 h-3.5 text-gold-pure" />
                  <span>{laurel}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-white/[0.08]">
          <button
            onClick={() => {
              playClick();
              closeDossierModal();
              const el = document.getElementById('brief-estimator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-3.5 bg-gradient-to-r from-gold-light via-gold-pure to-gold-burnished text-black text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:brightness-110 transition-all text-center"
          >
            REQUEST SLATE PITCH DECK / INQUIRE RIGHTS
          </button>
        </div>
      </div>
    </div>
  );
};
