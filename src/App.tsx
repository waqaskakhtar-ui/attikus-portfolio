import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { UIProvider } from './context/UIContext';
import { Preloader } from './components/common/Preloader';
import { FilmGrainOverlay } from './components/layout/FilmGrainOverlay';
import { NavigationHUD } from './components/layout/NavigationHUD';
import { CustomCursor } from './components/common/CustomCursor';
import { AntigravityFrameCanvas } from './components/framework/AntigravityFrameCanvas';
import { AntigravityScrollEngine } from './components/framework/AntigravityScrollEngine';
import { VideoPlayerModal } from './components/modals/VideoPlayerModal';
import { ProjectDossier } from './components/modals/ProjectDossier';
import { LightboxModal } from './components/modals/LightboxModal';
import { useFramePreloader } from './hooks/useFramePreloader';

const PortfolioContent: React.FC = () => {
  const { progress, isReady, images } = useFramePreloader();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Lenis Smooth Inertia Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    const updateScroll = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollH > 0) {
        const p = Math.max(0, Math.min(1, window.scrollY / scrollH));
        setScrollProgress(p);
      }
    };

    lenis.on('scroll', (e: { progress: number }) => {
      setScrollProgress(Math.max(0, Math.min(1, e.progress)));
    });

    window.addEventListener('scroll', updateScroll, { passive: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#380A0E] text-zinc-100 selection:bg-[#E5A95D] selection:text-black">
      {/* 1. Real Progress Preloader (Frame 1 Entry Experience) */}
      {!preloaderDone && (
        <Preloader
          progress={progress}
          isReady={isReady}
          onComplete={() => setPreloaderDone(true)}
        />
      )}

      {/* 35mm Subtle Film Grain */}
      <FilmGrainOverlay />

      {/* Floating HUD Navigation */}
      <NavigationHUD />

      {/* Sticky High-Performance Canvas Sequence (Frame 2 to 80) */}
      <AntigravityFrameCanvas images={images} scrollProgress={scrollProgress} />

      {/* Multi-Chapter Synchronized Content Engine */}
      <AntigravityScrollEngine scrollProgress={scrollProgress} />

      {/* Scroll Journey Track: Defines the physical scroll distance and anchor points */}
      <div className="relative w-full h-[850vh] pointer-events-none">
        <div id="hero-scroll" className="absolute top-0" />
        <div id="director-bio" className="absolute top-[22%]" />
        <div id="feature-slates" className="absolute top-[40%]" />
        <div id="curated-archive" className="absolute top-[58%]" />
        <div id="photo-lookbook" className="absolute top-[74%]" />
        <div id="brief-estimator" className="absolute top-[88%]" />
        <div id="footer-chapter" className="absolute top-[98%]" />
      </div>

      {/* Full-Screen Cinema Overlays */}
      <VideoPlayerModal />
      <ProjectDossier />
      <LightboxModal />

      {/* Tactile Magnetic Cursor */}
      <CustomCursor />
    </div>
  );
};

export function App() {
  return (
    <UIProvider>
      <PortfolioContent />
    </UIProvider>
  );
}

export default App;
