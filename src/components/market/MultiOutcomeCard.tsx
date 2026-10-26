import React, { useState } from 'react';
import { Clock, Bookmark, ArchiveTick, ArrowDown2, ArrowUp2 } from 'iconsax-react';
import type { Market, TradeTicket } from '../../types/market';
import { useCountdown } from '../../hooks/useCountdown';
import { MarketThumbnail } from './MarketThumbnail';

interface MultiOutcomeCardProps {
  market: Market;
  isBookmarked: boolean;
  onToggleBookmark: (marketId: string) => void;
  onOpenTrade: (ticket: TradeTicket) => void;
}

export const MultiOutcomeCard: React.FC<MultiOutcomeCardProps> = ({
  market,
  isBookmarked,
  onToggleBookmark,
  onOpenTrade,
}) => {
  const countdown = useCountdown(market.closesAt);
  const [isExpanded, setIsExpanded] = useState(false);

  const sortedOutcomes = [...market.outcomes].sort((a, b) => b.probability - a.probability);
  const visibleOutcomes = isExpanded ? sortedOutcomes : sortedOutcomes.slice(0, 2);
  const hiddenCount = Math.max(0, (market.totalOutcomesCount || sortedOutcomes.length) - 2);

  const outcomeColors = [
    { track: 'bg-indigo-500/10 dark:bg-indigo-500/15', fill: 'bg-indigo-500', text: 'text-indigo-600 dark:text-indigo-400' },
    { track: 'bg-teal-500/10 dark:bg-teal-500/15', fill: 'bg-teal-500', text: 'text-teal-600 dark:text-teal-400' },
    { track: 'bg-amber-500/10 dark:bg-amber-500/15', fill: 'bg-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    { track: 'bg-rose-500/10 dark:bg-rose-500/15', fill: 'bg-rose-500', text: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <div className="group h-full flex flex-col rounded-2xl border border-slate-200/90 dark:border-[#222222] bg-white dark:bg-[#0E0E0E] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/50 hover:shadow-card-hover-light dark:hover:shadow-card-hover-dark">
      <div>
        <div className="flex items-start gap-3 mb-2.5">
          <MarketThumbnail
            src={market.thumbnail}
            alt={market.title}
            category={market.category}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[11px] font-semibold text-brand-600 dark:text-blue-400 truncate">
                {market.categoryLabel}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 whitespace-nowrap shrink-0">
                ₦{(market.volumeNgn / 1000000).toFixed(1)}M Vol
              </span>
            </div>
            
            <div className="min-h-[4.25rem] flex items-start">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-3 leading-snug group-hover:text-brand-500 transition-colors">
                {market.title}
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end my-3">
        <div className="space-y-2">
          {visibleOutcomes.map((outcome, idx) => {
            const color = outcomeColors[idx % outcomeColors.length];
            return (
              <div 
                key={outcome.id}
                onClick={() => onOpenTrade({
                  marketId: market.id,
                  marketTitle: market.title,
                  outcomeId: outcome.id,
                  outcomeName: outcome.name,
                  probability: outcome.probability,
                  pricePerShare: outcome.probability * 10,
                })}
                className="group/row relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-[#222222] hover:border-brand-500/50 p-2 sm:p-2.5 transition-all bg-slate-50 dark:bg-[#141414] hover:bg-slate-100 dark:hover:bg-[#1C1C1C]"
              >
                <div 
                  className={`absolute inset-y-0 left-0 ${color.track} rounded-xl transition-all duration-300`}
                  style={{ width: `${Math.min(100, Math.max(outcome.probability, 5))}%` }}
                />
                
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${color.fill}`} />

                <div className="relative z-10 flex items-center justify-between gap-3 text-xs pl-2">
                  <div className="flex items-center gap-1.5 min-w-0 pr-2">
                    {outcome.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-slate-700 dark:text-neutral-300 shrink-0">
                        {outcome.badge}
                      </span>
                    )}
                    <span className="font-medium text-slate-800 dark:text-neutral-200 truncate group-hover/row:text-brand-500 transition-colors">
                      {outcome.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`font-mono font-bold text-xs sm:text-sm ${color.text}`}>
                      {outcome.probability}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {hiddenCount > 0 && (
          <button
            onClick={() => setIsExpanded(prev => !prev)}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-neutral-400 hover:text-brand-500 transition-colors mt-2"
          >
            <span>{isExpanded ? 'Show less' : `+${hiddenCount} more outcome${hiddenCount > 1 ? 's' : ''}`}</span>
            {isExpanded ? <ArrowUp2 size="12" className="size-3" /> : <ArrowDown2 size="12" className="size-3" />}
          </button>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-[#222222] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {market.isLive && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>LIVE</span>
            </span>
          )}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-neutral-400">
            <Clock size="13" className="size-3 text-slate-400" />
            <span className="font-mono font-medium">{countdown}</span>
          </div>
        </div>

        <button
          onClick={() => onToggleBookmark(market.id)}
          className="p-1 rounded-lg text-slate-400 hover:text-brand-500 transition-colors"
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark market'}
          aria-label="Bookmark"
        >
          {isBookmarked ? (
            <ArchiveTick size="16" className="size-4 text-brand-500" variant="Bold" />
          ) : (
            <Bookmark size="16" className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
};
