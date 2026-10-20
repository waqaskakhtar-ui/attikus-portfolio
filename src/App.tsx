import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { UIProvider } from './context/UIContext';
import { Preloader } from './components/common/Preloader';
import { FilmGrainOverlay } from './components/layout/FilmGrainOverlay';
import { NavigationHUD } from './components/layout/NavigationHUD';
import { CustomCursor } from './components/common/CustomCursor';
import { CinematicHeroScroll } from './components/sections/CinematicHeroScroll';
import { FeatureSlates } from './components/sections/FeatureSlates';
import { CuratedArchive } from './components/sections/CuratedArchive';
import { PhotoLookbook } from './components/sections/PhotoLookbook';
import { DirectorBio } from './components/sections/DirectorBio';
import { Pipeline } from './components/sections/Pipeline';
import { BriefEstimator } from './components/sections/BriefEstimator';
import { Footer } from './components/layout/Footer';
import { VideoPlayerModal } from './components/modals/VideoPlayerModal';
import { ProjectDossier } from './components/modals/ProjectDossier';
import { LightboxModal } from './components/modals/LightboxModal';
import { useFramePreloader } from './hooks/useFramePreloader';

const PortfolioContent: React.FC = () => {
  const { progress, isReady, images } = useFramePreloader();
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    // Lenis Smooth Inertia Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#160204] text-zinc-100 selection:bg-[#E5A95D] selection:text-black">
      {/* 1. Real Progress Preloader */}
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

      {/* Main Experience: Centered on the Scroll-Controlled Character Animation */}
      <main>
        {/* Rebuilt Hero: Frame 2 to Frame 80 Scroll Walking Experience */}
        <CinematicHeroScroll images={images} />

        {/* Flagship Feature Productions */}
        <FeatureSlates />

        {/* Curated Archive: Commercial & Narrative */}
        <CuratedArchive />

        {/* Photo By Attikus: High-Fashion Editorial Noir */}
        <PhotoLookbook />

        {/* The Director's Dossier & Provenance */}
        <DirectorBio />

        {/* Directorial Production Pipeline */}
        <Pipeline />

        {/* Production Brief Estimator & Lead Engine */}
        <BriefEstimator />
      </main>

      {/* Footer */}
      <Footer />

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
