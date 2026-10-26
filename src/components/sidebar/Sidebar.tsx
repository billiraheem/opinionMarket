import React from 'react';
import { Flash, TrendUp, TickCircle } from 'iconsax-react';
import type { SidebarData, TradeTicket } from '../../types/market';

interface SidebarProps {
  data: SidebarData | null;
  onOpenTrade: (ticket: TradeTicket) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ data, onOpenTrade }) => {
  if (!data) return null;

  return (
    <aside className="w-full lg:w-[320px] shrink-0 space-y-5">
      <div className="rounded-2xl border border-slate-200/90 dark:border-[#222222] bg-white dark:bg-[#0E0E0E] p-4 sm:p-5 shadow-card-light dark:shadow-card-dark transition-all">
        <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-slate-100 dark:border-[#222222]">
          <div className="size-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
            <Flash size="15" className="size-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Latest Markets
          </h3>
        </div>

        <div className="space-y-3">
          {data.latestMarkets.map((item) => (
            <div 
              key={item.id}
              className="flex items-start gap-2.5 group cursor-pointer"
            >
              <span className="size-1.5 rounded-full bg-slate-300 dark:bg-neutral-700 mt-2 shrink-0 group-hover:bg-brand-500 transition-colors" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-700 dark:text-neutral-300 font-medium line-clamp-2 leading-relaxed group-hover:text-brand-500 transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 dark:text-neutral-400">
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/90 dark:border-[#222222] bg-white dark:bg-[#0E0E0E] p-4 sm:p-5 shadow-card-light dark:shadow-card-dark transition-all">
        <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-slate-100 dark:border-[#222222]">
          <div className="size-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <TrendUp size="15" className="size-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Hot Topics
          </h3>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-[#222222]">
          {data.hotTopics.map((topic) => {
            const isGreen = topic.color === '#00C076';
            const isGold = topic.color === '#F59E0B';

            return (
              <div
                key={topic.id}
                onClick={() => onOpenTrade({
                  marketId: topic.id,
                  marketTitle: topic.title,
                  outcomeId: 'lead',
                  outcomeName: topic.leadingOutcome,
                  probability: topic.probability,
                  pricePerShare: topic.probability * 10,
                })}
                className="py-2.5 flex items-center justify-between gap-3 group cursor-pointer hover:bg-slate-50/50 dark:hover:bg-[#161616] -mx-2 px-2 rounded-lg transition-colors"
              >
                <span className="text-xs font-medium text-slate-700 dark:text-neutral-300 truncate group-hover:text-brand-500 transition-colors">
                  {topic.title}
                </span>

                <span 
                  className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono border whitespace-nowrap transition-transform group-hover:scale-105 ${
                    isGreen
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : isGold
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      : 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/30'
                  }`}
                >
                  {topic.leadingOutcome}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/90 dark:border-[#222222] bg-white dark:bg-[#0E0E0E] p-4 sm:p-5 shadow-card-light dark:shadow-card-dark transition-all">
        <div className="flex items-center gap-2 mb-3.5 pb-2.5 border-b border-slate-100 dark:border-[#222222]">
          <div className="size-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <TickCircle size="15" className="size-3.5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Recently Resolved
          </h3>
        </div>

        <div className="space-y-3">
          {data.recentlyResolved.map((resolved) => (
            <div 
              key={resolved.id}
              className="flex items-start gap-2.5 group cursor-pointer"
            >
              <span className="size-1.5 rounded-full bg-market-yes mt-2 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-700 dark:text-neutral-300 font-medium line-clamp-2 leading-relaxed">
                  {resolved.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px]">
                  <span className="font-semibold text-market-yes">
                    {resolved.winningOutcome}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-400 dark:text-neutral-400">{resolved.resolvedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
};
