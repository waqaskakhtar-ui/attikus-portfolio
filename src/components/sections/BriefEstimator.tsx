import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { ProjectType, EstimatedTimeline, BudgetTier, ProductionInquiry } from '../../types/inquiry';
import { useAudioSynthesizer } from '../../hooks/useAudioSynthesizer';

export const BriefEstimator: React.FC = () => {
  const { playClick, playSubBoom } = useAudioSynthesizer();
  const [projectType, setProjectType] = useState<ProjectType>('feature');
  const [timeline, setTimeline] = useState<EstimatedTimeline>('1-3_months');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('$50k-$100k');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Cinematography / DP Services',
    'Full Directorial Package'
  ]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [company, setCompany] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const availableDeliverables = [
    'Directing & Creative Treatment',
    'Cinematography / DP Services',
    '35mm / Anamorphic Package',
    'Color Grading & Film Emulation',
    'Post-Production & Offline Edit',
    'Editorial Photo Shoot'
  ];

  const toggleDeliverable = (item: string) => {
    playClick();
    setDeliverables((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    // Honeypot check
    if (honeypot) {
      setStatus('success');
      return;
    }

    if (!clientName || !clientEmail) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    playSubBoom();

    // Prepare inquiry payload
    const payload: ProductionInquiry = {
      clientName,
      clientEmail,
      companyOrArtist: company,
      projectType,
      estimatedTimeline: timeline,
      budgetTier,
      deliverables,
      projectNotes
    };

    console.log('Production Brief Dispatched:', payload);

    setTimeout(() => {
      setStatus('success');
    }, 800);
  };

  return (
    <section id="brief-estimator" className="py-28 px-6 relative border-t border-white/[0.06] bg-void">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-gold-pure uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            DIRECT REPRESENTATION & INQUIRIES
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black uppercase tracking-[0.06em] text-white mb-4">
            START YOUR PRODUCTION
          </h2>
          <p className="font-mono text-xs text-zinc-300 tracking-widest max-w-xl mx-auto uppercase">
            CALCULATE SCOPE & DELIVERABLES DIRECTLY WITH CITADEL PRODUCTIONS.
          </p>
        </div>

        {status === 'success' ? (
          <div className="py-20 px-8 text-center bg-white/[0.02] border border-gold-pure/30 rounded-sm">
            <CheckCircle2 className="w-14 h-14 text-gold-pure mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white mb-3">
              PRODUCTION BRIEF TRANSMITTED
            </h3>
            <p className="text-zinc-300 text-sm max-w-md mx-auto mb-6 font-light">
              Your inquiry has been received at Citadel Productions desk. Attikus Ebenhack or production management will respond within 24 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-2.5 bg-white/[0.05] border border-white/20 text-xs font-mono tracking-widest uppercase text-white hover:border-gold-pure transition-colors"
            >
              TRANSMIT ANOTHER BRIEF
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* 1. Project Type Selector (Tactile Minimalist Pills) */}
            <div>
              <label className="block font-mono text-xs text-gold-light uppercase tracking-widest mb-4">
                01. PROJECT TYPE
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'FEATURE FILM', value: 'feature' as ProjectType },
                  { label: 'COMMERCIAL', value: 'commercial' as ProjectType },
                  { label: 'MUSIC VIDEO', value: 'music_video' as ProjectType },
                  { label: 'EDITORIAL PHOTO', value: 'editorial_photo' as ProjectType }
                ].map((item) => {
                  const isSelected = projectType === item.value;
                  return (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => {
                        playClick();
                        setProjectType(item.value);
                      }}
                      className={`p-4 text-xs font-mono tracking-wider uppercase text-center border transition-all rounded-sm ${
                        isSelected
                          ? 'border-gold-pure bg-gold-pure/10 text-gold-light font-bold shadow-[0_0_15px_rgba(229,169,93,0.2)]'
                          : 'border-white/[0.08] text-zinc-300 hover:border-white/20 hover:text-white bg-white/[0.02]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Timeline & Budget Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block font-mono text-xs text-gold-light uppercase tracking-widest mb-4">
                  02. TARGET TIMELINE
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'IMMEDIATE (4 WEEKS)', value: 'immediate' as EstimatedTimeline },
                    { label: '1 - 3 MONTHS', value: '1-3_months' as EstimatedTimeline },
                    { label: 'NEXT QUARTER', value: 'quarter_out' as EstimatedTimeline },
                    { label: 'EXPLORATORY SLATE', value: 'exploratory' as EstimatedTimeline }
                  ].map((item) => {
                    const isSelected = timeline === item.value;
                    return (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => {
                          playClick();
                          setTimeline(item.value);
                        }}
                        className={`p-3 text-[11px] font-mono tracking-wider uppercase text-center border transition-all rounded-sm ${
                          isSelected
                            ? 'border-gold-pure bg-gold-pure/10 text-gold-light font-bold'
                            : 'border-white/[0.08] text-zinc-300 hover:border-white/20 hover:text-white bg-white/[0.02]'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-gold-light uppercase tracking-widest mb-4">
                  03. PRODUCTION BUDGET TIER
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['$10k-$25k', '$25k-$50k', '$50k-$100k', '$100k+'] as BudgetTier[]).map((tier) => {
                    const isSelected = budgetTier === tier;
                    return (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => {
                          playClick();
                          setBudgetTier(tier);
                        }}
                        className={`p-3 text-[11px] font-mono tracking-wider uppercase text-center border transition-all rounded-sm ${
                          isSelected
                            ? 'border-gold-pure bg-gold-pure/10 text-gold-light font-bold'
                            : 'border-white/[0.08] text-zinc-300 hover:border-white/20 hover:text-white bg-white/[0.02]'
                        }`}
                      >
                        {tier}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Deliverables Checklist */}
            <div>
              <label className="block font-mono text-xs text-gold-light uppercase tracking-widest mb-4">
                04. REQUIRED DELIVERABLES & SERVICES
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {availableDeliverables.map((item) => {
                  const isChecked = deliverables.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleDeliverable(item)}
                      className={`p-3 text-left font-mono text-xs tracking-wider flex items-center justify-between border transition-all rounded-sm ${
                        isChecked
                          ? 'border-gold-pure/60 bg-gold-pure/5 text-gold-light'
                          : 'border-white/[0.08] text-zinc-300 hover:border-white/20 bg-white/[0.02]'
                      }`}
                    >
                      <span>{item}</span>
                      <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center text-[10px] ${
                        isChecked ? 'border-gold-pure bg-gold-pure text-black font-bold' : 'border-white/30'
                      }`}>
                        {isChecked && '✓'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Client Contact Credentials (Clean Border-Bottom Inputs) */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <label className="block font-mono text-[11px] text-zinc-300 uppercase tracking-widest mb-2">
                  NAME / PRODUCER *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-transparent border-b border-white/20 focus:border-gold-pure py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-300 uppercase tracking-widest mb-2">
                  CONTACT EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="producer@studio.com"
                  className="w-full bg-transparent border-b border-white/20 focus:border-gold-pure py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors font-sans"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-zinc-300 uppercase tracking-widest mb-2">
                  STUDIO / AGENCY / ARTIST
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Anonymous Content"
                  className="w-full bg-transparent border-b border-white/20 focus:border-gold-pure py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors font-sans"
                />
              </div>
            </div>

            {/* Project Notes */}
            <div>
              <label className="block font-mono text-[11px] text-zinc-300 uppercase tracking-widest mb-2">
                PROJECT NOTES / LOGLINE / ATTACHED TALENT
              </label>
              <textarea
                rows={3}
                value={projectNotes}
                onChange={(e) => setProjectNotes(e.target.value)}
                placeholder="Provide a brief synopsis, shooting dates, or key creative references..."
                className="w-full bg-white/[0.02] border border-white/15 focus:border-gold-pure p-4 text-sm text-white placeholder-zinc-600 outline-none rounded-sm transition-colors font-sans"
              />
            </div>

            {/* Invisible Honeypot */}
            <input
              type="text"
              name="website_confirm_field"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Error Message */}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
                <AlertCircle className="w-4 h-4" />
                <span>Please complete your name and valid contact email address.</span>
              </div>
            )}

            {/* Submit Action */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-4">
              <div className="font-mono text-xs text-zinc-300 uppercase tracking-widest">
                DIRECT INQUIRY DESK • CITADEL PRODUCTIONS LLC
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-8 py-4 bg-gradient-to-r from-gold-light via-gold-pure to-gold-burnished text-black text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:brightness-110 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(229,169,93,0.3)] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'submitting' ? 'TRANSMITTING...' : 'TRANSMIT PRODUCTION BRIEF'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
