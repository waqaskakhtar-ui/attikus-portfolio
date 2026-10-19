import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideo, closeVideoModal } = useUI();
  const { playClick } = useAudioSynthesizer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    };
    if (activeVideo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideo, closeVideoModal]);

  if (!activeVideo) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8">
      {/* Lights-Down Cinema Canvas */}
      <div className="relative w-full max-w-6xl aspect-[2.39/1] sm:aspect-[16/9] bg-black border border-white/10 rounded-sm overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">
        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            closeVideoModal();
          }}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 border border-white/20 text-white hover:text-gold-pure hover:border-gold-pure transition-colors"
          aria-label="Close Video Player"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Embed */}
        <iframe
          src={`${activeVideo}?autoplay=1&color=e5a95d`}
          title="Citadel Productions Cinema Player"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
