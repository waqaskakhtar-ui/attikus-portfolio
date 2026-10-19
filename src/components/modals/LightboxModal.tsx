import React, { useEffect } from 'react';
import { X, Camera } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const LightboxModal: React.FC = () => {
  const { activePhoto, closePhotoModal } = useUI();
  const { playClick } = useAudioSynthesizer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePhotoModal();
    };
    if (activePhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activePhoto, closePhotoModal]);

  if (!activePhoto) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8">
      {/* Backdrop Dismiss */}
      <div className="absolute inset-0" onClick={closePhotoModal} />

      {/* Close Trigger */}
      <button
        onClick={() => {
          playClick();
          closePhotoModal();
        }}
        className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:text-gold-pure hover:border-gold-pure transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Master Image Frame */}
      <div className="relative max-w-5xl max-h-[85vh] z-10 flex flex-col items-center">
        <img
          src={activePhoto.imageUrl}
          alt={activePhoto.title}
          className="max-w-full max-h-[75vh] object-contain rounded-sm shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-white/10"
        />

        {/* Technical Slate Readout */}
        <div className="mt-4 text-center">
          <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
            {activePhoto.title}
          </h3>
          <div className="flex items-center justify-center gap-3 font-mono text-xs text-gold-light tracking-widest uppercase mt-1">
            <Camera className="w-3.5 h-3.5 text-gold-pure" />
            <span>{activePhoto.specs.camera}</span>
            <span>•</span>
            <span>{activePhoto.specs.lens}</span>
            <span>•</span>
            <span>{activePhoto.specs.lighting}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
