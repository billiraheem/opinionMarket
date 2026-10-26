import React from 'react';
import { Clock, Bookmark, ArchiveTick } from 'iconsax-react';
import type { Market, TradeTicket } from '../../types/market';
import { useCountdown } from '../../hooks/useCountdown';
import { MarketThumbnail } from './MarketThumbnail';

interface BinaryMarketCardProps {
  market: Market;
  isBookmarked: boolean;
  onToggleBookmark: (marketId: string) => void;
  onOpenTrade: (ticket: TradeTicket) => void;
}

export const BinaryMarketCard: React.FC<BinaryMarketCardProps> = ({
  market,
  isBookmarked,
  onToggleBookmark,
  onOpenTrade,
}) => {
  const countdown = useCountdown(market.closesAt);

  const yesOutcome = market.outcomes.find(o => o.name.toLowerCase().includes('yes')) || market.outcomes[0];
  const noOutcome = market.outcomes.find(o => o.name.toLowerCase().includes('no')) || market.outcomes[1];

  const yesProb = yesOutcome?.probability ?? 50;
  const noProb = noOutcome?.probability ?? 50;

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

      <div className="flex-1 flex flex-col justify-end my-3.5">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onOpenTrade({
              marketId: market.id,
              marketTitle: market.title,
              outcomeId: yesOutcome?.id || 'yes',
              outcomeName: 'Trade Yes',
              probability: yesProb,
              pricePerShare: yesProb * 10,
            })}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500 hover:text-white border border-emerald-500/25 dark:border-emerald-500/20 transition-all active:scale-[0.98] group/btn"
          >
            <span>Trade Yes</span>
            <span className="font-mono font-bold text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 group-hover/btn:text-white transition-colors">
              {yesProb}%
            </span>
          </button>

          <button
            onClick={() => onOpenTrade({
              marketId: market.id,
              marketTitle: market.title,
              outcomeId: noOutcome?.id || 'no',
              outcomeName: 'Trade No',
              probability: noProb,
              pricePerShare: noProb * 10,
            })}
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500 hover:text-white border border-rose-500/25 dark:border-rose-500/20 transition-all active:scale-[0.98] group/btn"
          >
            <span>Trade No</span>
            <span className="font-mono font-bold text-xs sm:text-sm text-rose-600 dark:text-rose-400 group-hover/btn:text-white transition-colors">
              {noProb}%
            </span>
          </button>
        </div>
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
