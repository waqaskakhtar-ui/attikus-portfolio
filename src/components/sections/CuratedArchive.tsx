import React, { useState } from 'react';
import { Eye, Clapperboard, Filter } from 'lucide-react';
import { CURATED_WORKS } from '../../data/projects';
import { ProjectCategory, Project } from '../../types/project';
import { useUI } from '../../context/UIContext';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const CuratedArchive: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const { openVideoModal, openDossierModal } = useUI();
  const { playClick } = useAudioSynthesizer();

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'ALL WORKS', value: 'all' },
    { label: 'NARRATIVE', value: 'feature' },
    { label: 'COMMERCIAL', value: 'commercial' },
    { label: 'MUSIC VIDEO', value: 'music_video' },
    { label: 'EDITORIAL', value: 'editorial' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? CURATED_WORKS
    : CURATED_WORKS.filter((p) => p.category === activeCategory);

  const handleFilterClick = (cat: ProjectCategory) => {
    playClick();
    setActiveCategory(cat);
  };

  const handleProjectClick = (project: Project) => {
    playClick();
    if (project.media.videoUrl) {
      openVideoModal(project.media.videoUrl);
    } else {
      openDossierModal(project);
    }
  };

  return (
    <section id="curated-archive" className="py-28 px-6 relative border-t border-white/[0.06] bg-void">
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Minimal Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-gold-pure uppercase mb-3">
              <Clapperboard className="w-3.5 h-3.5" />
              CURATED ARCHIVE
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-[0.06em] text-white">
              DIRECTED WORKS
            </h2>
          </div>

          {/* Minimalist Filter Navigation */}
          <div className="flex items-center gap-2 flex-wrap font-mono text-xs tracking-wider">
            <span className="text-zinc-400 mr-2 flex items-center gap-1.5 hidden sm:inline-flex">
              <Filter className="w-3.5 h-3.5" /> FILTER:
            </span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  onClick={() => handleFilterClick(cat.value)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-widest transition-all rounded-sm ${
                    isActive
                      ? 'bg-gold-pure text-black font-bold shadow-[0_0_12px_rgba(229,169,93,0.3)]'
                      : 'text-zinc-400 hover:text-white bg-white/[0.03] border border-white/[0.06]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetrical Editorial Grid (Variable Spans & Heights - No Boxy Uniform Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {filteredProjects.map((project, idx) => {
            // Asymmetric column span calculations
            const isWide = idx % 3 === 0;
            const colSpanClass = isWide ? 'md:col-span-8' : 'md:col-span-4';
            const aspectClass = isWide ? 'aspect-[16/9]' : 'aspect-[4/3]';

            return (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className={`${colSpanClass} group cursor-pointer flex flex-col justify-between`}
              >
                {/* Frameless Media Frame */}
                <div className={`relative ${aspectClass} overflow-hidden rounded-sm bg-zinc-950 mb-4`}>
                  <img
                    src={project.media.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-cinema group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                  {/* Corner Camera Metadata Stamp */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                    {project.category}
                  </div>

                  {/* Hover Inspect Indicator */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-mono tracking-widest text-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye className="w-3.5 h-3.5" />
                    <span>VIEW DETAILS</span>
                  </div>
                </div>

                {/* Editorial Metadata Footer (Clean Typography, No Enclosing Box) */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-300 uppercase mb-1">
                    <span>{project.client || 'Citadel Productions'}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-white group-hover:text-gold-light transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm font-light mt-1 line-clamp-2">
                    {project.logline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
