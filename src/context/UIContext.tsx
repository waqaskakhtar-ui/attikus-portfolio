import React, { createContext, useContext, useState } from 'react';
import { Project, PhotographyItem } from '../types/project';

interface UIContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  activeVideo: string | null;
  openVideoModal: (url: string) => void;
  closeVideoModal: () => void;
  activePhoto: PhotographyItem | null;
  openPhotoModal: (photo: PhotographyItem) => void;
  closePhotoModal: () => void;
  activeDossier: Project | null;
  openDossierModal: (project: Project) => void;
  closeDossierModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotographyItem | null>(null);
  const [activeDossier, setActiveDossier] = useState<Project | null>(null);

  const toggleSound = () => setSoundEnabled((prev) => !prev);
  const openVideoModal = (url: string) => setActiveVideo(url);
  const closeVideoModal = () => setActiveVideo(null);
  const openPhotoModal = (photo: PhotographyItem) => setActivePhoto(photo);
  const closePhotoModal = () => setActivePhoto(null);
  const openDossierModal = (project: Project) => setActiveDossier(project);
  const closeDossierModal = () => setActiveDossier(null);

  return (
    <UIContext.Provider
      value={{
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        activeVideo,
        openVideoModal,
        closeVideoModal,
        activePhoto,
        openPhotoModal,
        closePhotoModal,
        activeDossier,
        openDossierModal,
        closeDossierModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
