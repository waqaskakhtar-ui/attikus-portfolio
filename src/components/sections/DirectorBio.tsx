import React from 'react';
import { ShieldCheck, Target, Award, ExternalLink } from 'lucide-react';

export const DirectorBio: React.FC = () => {
  return (
    <section id="director-bio" className="py-28 px-6 relative border-t border-white/[0.06] bg-void">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* 5-Column Director Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-zinc-950 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <img
                src="/attikus-portrait.jpg"
                alt="Attikus Ebenhack — Director & Cinematographer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Viewfinder Border Accents */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <div className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                    ATTIKUS EBENHACK
                  </div>
                  <div className="font-mono text-[10px] text-gold-light tracking-widest uppercase">
                    FOUNDER & DIRECTOR • CITADEL PRODUCTIONS
                  </div>
                </div>
                <div className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest">
                  NASHVILLE, TN
                </div>
              </div>
            </div>
          </div>

          {/* 7-Column Editorial Bio & Ethos Spread */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-gold-pure uppercase mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              DIRECTORIAL DOSSIER & PROVENANCE
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-[0.06em] text-white leading-tight mb-6">
              STORIES FORGED IN <br />
              <span className="gold-gradient-text italic font-normal">LIGHT & SHADOW</span>
            </h2>

            <div className="space-y-5 text-zinc-300 text-base leading-relaxed font-light mb-8">
              <p>
                Attikus Ebenhack is a director, director of photography, and decorated military veteran whose eye was forged in the relentless environments of combat camera deployments. In high-consequence operations, there are no second takes, no resets, and no excuses. That battlefield discipline and operational calm translate directly onto cinematic film sets.
              </p>
              <p>
                Based in Nashville, TN, Attikus heads <strong className="text-white font-medium">Citadel Productions LLC</strong>, helming high-concept feature slates like the 1800s high-seas adventure epic <em className="text-gold-light">The Mutiny</em> and the atmospheric sci-fi mystery <em className="text-gold-light">Before The Glow</em>. His commercial and editorial photography spans high-fashion noir and music artist portraiture, recognized for surgical anamorphic framing and visceral emotional impact.
              </p>
            </div>

            {/* Directorial Principles Pillars (Anti-Boxy: Single Clean Slate Line) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] mb-8">
              <div>
                <div className="flex items-center gap-2 text-gold-light font-mono text-xs tracking-widest uppercase mb-1">
                  <Target className="w-3.5 h-3.5 text-gold-pure" />
                  PRECISION
                </div>
                <p className="text-zinc-300 text-xs font-light leading-relaxed">
                  Combat-proven logistical rigor ensures complex stunts and large crews execute with surgical timing.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gold-light font-mono text-xs tracking-widest uppercase mb-1">
                  <Award className="w-3.5 h-3.5 text-gold-pure" />
                  AUTEUR VISION
                </div>
                <p className="text-zinc-300 text-xs font-light leading-relaxed">
                  Every project is anchored in character-driven truth, utilizing practical effects and anamorphic glass.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-gold-light font-mono text-xs tracking-widest uppercase mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-pure" />
                  COLLABORATION
                </div>
                <p className="text-zinc-300 text-xs font-light leading-relaxed">
                  Partnering closely with studio financiers, festival programmers, and brand agencies from concept to master deliverable.
                </p>
              </div>
            </div>

            {/* Press Link */}
            <div>
              <a
                href="https://canvasrebel.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-gold-light tracking-widest uppercase transition-colors"
              >
                <span>READ CANVAS REBEL FEATURE ON ATTIKUS EBENHACK</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold-pure" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
