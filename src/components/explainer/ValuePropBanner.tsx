import React, { useState, useEffect } from 'react';
import { MagicStar, ArrowRight, CloseCircle, InfoCircle } from 'iconsax-react';

interface ValuePropBannerProps {
  onOpenHowItWorks: () => void;
}

export const ValuePropBanner: React.FC<ValuePropBannerProps> = ({ onOpenHowItWorks }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('om_banner_dismissed') === 'true') {
        setIsDismissed(true);
      }
    } catch {}
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('om_banner_dismissed', 'true');
    } catch {}
  };

  if (isDismissed) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-900/10 via-brand-500/10 to-indigo-900/10 dark:from-[#111111] dark:via-[#161616] dark:to-[#111111] border-b border-brand-500/20 dark:border-[#222222] transition-all">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="size-6 sm:size-7 rounded-lg bg-brand-500/15 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
            <MagicStar size="16" className="size-3.5 sm:size-4 text-brand-500 animate-pulse-subtle" />
          </div>
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
              Trade on Real-World Events.
            </span>
            <span className="text-xs text-slate-600 dark:text-neutral-400 hidden md:inline truncate">
              Predict outcomes in Nigerian politics, global sports & finance. Buy shares and profit when you are right.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenHowItWorks}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-500/10 hover:bg-brand-500/20 transition-all"
          >
            <InfoCircle size="14" className="size-3.5" />
            <span>How it works</span>
            <ArrowRight size="13" className="size-3" />
          </button>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Dismiss banner"
          >
            <CloseCircle size="16" className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
