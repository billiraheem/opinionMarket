import React from 'react';

export const MarketCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/60 dark:border-[#222222] bg-white/50 dark:bg-[#0E0E0E] p-4 animate-pulse">
      <div>
        <div className="flex items-start gap-3 mb-3">
          <div className="size-11 rounded-xl bg-slate-200 dark:bg-[#1A1A1A] shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-[#1A1A1A] rounded-md w-full" />
            <div className="h-4 bg-slate-200 dark:bg-[#1A1A1A] rounded-md w-3/4" />
            <div className="h-3 bg-slate-200 dark:bg-[#1A1A1A] rounded-md w-1/3" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 my-4">
          <div className="h-9 bg-slate-100 dark:bg-[#161616] rounded-xl w-full" />
          <div className="h-9 bg-slate-100 dark:bg-[#161616] rounded-xl w-full" />
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-[#222222] flex items-center justify-between">
        <div className="h-4 bg-slate-200 dark:bg-[#1A1A1A] rounded-full w-20" />
        <div className="size-4 bg-slate-200 dark:bg-[#1A1A1A] rounded" />
      </div>
    </div>
  );
};
