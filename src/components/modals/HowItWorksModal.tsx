import React, { useState, useEffect } from 'react';
import { CloseCircle, ArrowRight, ArrowLeft, ShieldTick, TickCircle } from 'iconsax-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDeposit?: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentStep(s => Math.min(2, s + 1));
      if (e.key === 'ArrowLeft') setCurrentStep(s => Math.max(0, s - 1));
    };
    if (isOpen) {
      setCurrentStep(0);
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const steps = [
    {
      stepNumber: 1,
      title: "Pick a Real-World Market",
      subtitle: "Find events you understand and have insight on",
      description: "Browse verified categories across Nigerian politics, European football leagues, CBN inflation metrics, and entertainment. Choose a question with clear, publicly verifiable resolution terms.",
      preview: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
          <div className="p-2.5 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#141414] shadow-sm">
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">Politics</span>
            <p className="text-xs font-semibold text-slate-800 dark:text-neutral-200 mt-1 line-clamp-1">2027 Presidential Race</p>
            <span className="text-[10px] text-slate-400 dark:text-neutral-500 mt-0.5 block">₦61.8M Vol</span>
          </div>
          <div className="p-2.5 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#141414] shadow-sm">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Sports</span>
            <p className="text-xs font-semibold text-slate-800 dark:text-neutral-200 mt-1 line-clamp-1">El Clásico Match Winner</p>
            <span className="text-[10px] text-slate-400 dark:text-neutral-500 mt-0.5 block">₦92.4M Vol</span>
          </div>
          <div className="p-2.5 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#141414] shadow-sm">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Economy</span>
            <p className="text-xs font-semibold text-slate-800 dark:text-neutral-200 mt-1 line-clamp-1">Headline Inflation Q2</p>
            <span className="text-[10px] text-slate-400 dark:text-neutral-500 mt-0.5 block">₦5.6M Vol</span>
          </div>
        </div>
      )
    },
    {
      stepNumber: 2,
      title: "Trade 'Yes' or 'No' Shares",
      subtitle: "Probability equals live share price",
      description: "If an event has a 35% probability, 'Yes' shares trade at ₦350 each. Buy shares when you think the community consensus underestimates the outcome, or trade 'No' if you believe it won't happen.",
      preview: (
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#141414] shadow-sm">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-800 dark:text-neutral-200">Will Headline Inflation Drop Below 24%?</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">85% Consensus</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between"> */}
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Trade Yes</span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">₦850 / share</span>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400">Trade No</span>
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">₦150 / share</span>
            </div>
          </div>
        </div>
      )
    },
    {
      stepNumber: 3,
      title: "Collect Payouts on Resolution",
      subtitle: "Guaranteed ₦1,000 settlement per winning share",
      description: "When the event resolves, each correct share pays out ₦1,000. Your earnings are instantly credited to your portfolio and can be withdrawn directly to your Nigerian bank account or payment card.",
      preview: (
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#141414] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <TickCircle size="16" className="size-4" />
              Outcome Resolved: YES
            </span>
            <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">Settled at ₦1,000/share</span>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-[#222222] flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400">
            <span>Instant Bank Withdrawal:</span>
            <span className="font-semibold text-slate-700 dark:text-neutral-300">Paystack · Flutterwave · GTBank</span>
          </div>
        </div>
      )
    }
  ];

  const current = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#101010] border border-slate-200 dark:border-[#222222] p-6 sm:p-8 shadow-2xl transition-all animate-in zoom-in-95 duration-200 z-10">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1A1A] transition-colors"
          aria-label="Close modal"
        >
          <CloseCircle size="20" className="size-5" />
        </button>
        <div className="mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            How OpinionMarket Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-0.5">
            The premier platform to monetize your knowledge of real-world events.
          </p>
        </div>
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => setCurrentStep(idx)}
              className="flex-1 text-left group cursor-pointer"
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${currentStep === idx
                  ? 'bg-brand-500'
                  : currentStep > idx
                    ? 'bg-emerald-500'
                    : 'bg-slate-200 dark:bg-neutral-800'
                  }`}
              />
              <span className={`text-[11px] font-semibold mt-1.5 block transition-colors ${currentStep === idx
                ? 'text-brand-600 dark:text-blue-400'
                : 'text-slate-400 dark:text-neutral-500'
                }`}>
                Step {s.stepNumber}
              </span>
            </button>
          ))}
        </div>
        <div className="rounded-2xl p-1 sm:p-2 transition-all duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 dark:text-neutral-500">
              {current.subtitle}
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {current.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-5">
            {current.description}
          </p>
          <div className="pt-2">
            {current.preview}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <ShieldTick size="16" className="size-4 shrink-0" />
          <span>Transparent smart settlements · Secured with licensed Nigerian payment gateways.</span>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 pt-2">
          {currentStep > 0 ? (
            <button
              id="how-it-works-back-btn"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#222222] hover:bg-slate-100 dark:hover:bg-[#1A1A1A] transition-all flex items-center gap-1.5"
            >
              <ArrowLeft size="16" className="size-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 2 ? (
            <button
              id="how-it-works-next-btn"
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-md hover:shadow-brand-glow transition-all flex items-center gap-2 ml-auto"
            >
              <span>Next</span>
              <ArrowRight size="16" className="size-4" />
            </button>
          ) : (
            <button
              id="how-it-works-finish-btn"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-md hover:shadow-brand-glow transition-all flex items-center gap-2 ml-auto"
            >
              <span>Got It, Start Trading</span>
              <ArrowRight size="16" className="size-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
