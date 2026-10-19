import React from 'react';

export const FilmGrainOverlay: React.FC = () => {
  return (
    <>
      {/* 35mm Physical Film Grain Texture */}
      <div className="film-grain" aria-hidden="true" />

      {/* Anamorphic Horizon Flare Beam in Hero */}
      <div className="anamorphic-beam top-[28%] left-0" aria-hidden="true" />
    </>
  );
};
