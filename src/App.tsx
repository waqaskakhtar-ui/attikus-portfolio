import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { UIProvider } from './context/UIContext';
import { FilmGrainOverlay } from './components/layout/FilmGrainOverlay';
import { NavigationHUD } from './components/layout/NavigationHUD';
import { CustomCursor } from './components/common/CustomCursor';
import { ApertureHero } from './components/sections/ApertureHero';
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

const PortfolioContent: React.FC = () => {
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
    <div className="relative min-h-screen bg-void text-zinc-100 selection:bg-gold-pure selection:text-black">
      {/* Film Grain & Atmosphere */}
      <FilmGrainOverlay />

      {/* Floating HUD */}
      <NavigationHUD />

      {/* Main Narrative Sequences */}
      <main>
        <ApertureHero />
        <FeatureSlates />
        <CuratedArchive />
        <PhotoLookbook />
        <DirectorBio />
        <Pipeline />
        <BriefEstimator />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cinema Modals & Lightbox Overlays */}
      <VideoPlayerModal />
      <ProjectDossier />
      <LightboxModal />

      {/* Magnetic Cursor */}
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
