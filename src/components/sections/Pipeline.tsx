import React from 'react';
import { Compass, FileText, Camera, Sliders, CheckCircle } from 'lucide-react';

export const Pipeline: React.FC = () => {
  const stages = [
    {
      num: '01',
      title: 'DEVELOPMENT & SLATE',
      desc: 'Screenwriting, treatment decks, visual tone reels, and budgetary package formulation.',
      icon: FileText
    },
    {
      num: '02',
      title: 'PRE-PRODUCTION',
      desc: 'Location scouting, lens testing on camera sensors, stunt choreography, and safety protocols.',
      icon: Compass
    },
    {
      num: '03',
      title: 'PRINCIPAL PHOTOGRAPHY',
      desc: 'Combat Camera-honed operational leadership directing large-scale crews and A-list talent.',
      icon: Camera
    },
    {
      num: '04',
      title: 'POST & COLOR FINISHING',
      desc: 'Offline editorial, 35mm film emulation, DaVinci Resolve color grading, and Dolby Atmos audio mixing.',
      icon: Sliders
    },
    {
      num: '05',
      title: 'THEATRICAL DELIVERY',
      desc: 'DCP theatrical mastering, festival deliverables, and global streaming agency distribution.',
      icon: CheckCircle
    }
  ];

  return (
    <section id="pipeline" className="py-28 px-6 relative border-t border-white/[0.06] bg-obsidian">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-gold-pure uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            DIRECTORIAL WORKFLOW
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-[0.06em] text-white mb-4">
            FROM CONCEPT TO SCREEN
          </h2>
          <p className="font-mono text-xs text-zinc-300 tracking-widest uppercase">
            A RIGOROUS, BATTLE-TESTED PRODUCTION PIPELINE BUILT FOR STUDIOS, AGENCIES & FESTIVALS.
          </p>
        </div>

        {/* Connected Milestone Timeline (Anti-Boxy: Elegant Horizontal Linear Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div key={stage.num} className="relative flex flex-col items-start group">
                {/* Stage Header Line */}
                <div className="flex items-center gap-3 mb-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-gold-pure group-hover:border-gold-pure group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(229,169,93,0.15)]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs text-gold-light/60 tracking-widest">
                    STAGE {stage.num}
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-2 group-hover:text-gold-light transition-colors">
                  {stage.title}
                </h3>

                {/* Stage Description */}
                <p className="text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
