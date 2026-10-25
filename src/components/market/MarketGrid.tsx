import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, BookmarkCheck, SlidersHorizontal, ChevronDown, Check, RotateCcw } from 'lucide-react';
import type { Market, SortOption, TradeTicket } from '../../types/market';
import { BinaryMarketCard } from './BinaryMarketCard';
import { MultiOutcomeCard } from './MultiOutcomeCard';
import { MarketCardSkeleton } from './MarketCardSkeleton';
import { Pagination } from './Pagination';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'closing_soon', label: 'Closing Soon' },
  { value: 'volume_desc', label: 'Highest 24h Volume' },
  { value: 'popular', label: 'Most Active' },
  { value: 'newest', label: 'Newest' },
];

interface MarketGridProps {
  markets: Market[];
  isLoading: boolean;
  totalMarkets: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  sortBy: SortOption;
  bookmarkedOnly: boolean;
  bookmarkedIds: Set<string>;
  onSortChange: (sort: SortOption) => void;
  onToggleBookmarkedOnly: () => void;
  onToggleBookmark: (marketId: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onOpenTrade: (ticket: TradeTicket) => void;
}

export const MarketGrid: React.FC<MarketGridProps> = ({
  markets,
  isLoading,
  totalMarkets,
  currentPage,
  pageSize,
  totalPages,
  sortBy,
  bookmarkedOnly,
  bookmarkedIds,
  onSortChange,
  onToggleBookmarkedOnly,
  onToggleBookmark,
  onPageChange,
  onPageSizeChange,
  onOpenTrade,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label || 'Closing Soon';
  const hasActiveSectionFilter = sortBy !== 'closing_soon' || bookmarkedOnly;

  const handleClearSectionFilters = () => {
    if (sortBy !== 'closing_soon') {
      onSortChange('closing_soon');
    }
    if (bookmarkedOnly) {
      onToggleBookmarkedOnly();
    }
  };

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            All Markets
          </h2>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
            Real-time consensus probabilities and 24h market activity
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative inline-flex items-center" ref={sortRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen(prev => !prev)}
              className="inline-flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600/10 dark:bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/50 hover:border-blue-500 shadow-sm transition-all duration-200 select-none cursor-pointer"
              aria-label="Filter and Sort markets"
              aria-expanded={isSortOpen}
            >
              <SlidersHorizontal className="size-3.5 text-blue-500 dark:text-blue-400 shrink-0" />
              <span className="whitespace-nowrap transition-all duration-200">{currentSortLabel}</span>
              <ChevronDown className={`size-3.5 text-blue-500/70 transition-transform duration-200 shrink-0 ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#121212] shadow-xl z-30 py-1 overflow-hidden">
                {sortOptions.map((opt) => {
                  const isSelected = sortBy === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        onSortChange(opt.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${isSelected
                        ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-slate-700 dark:text-neutral-300 hover:bg-slate-50 dark:hover:bg-[#1C1C1C]'
                        }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="size-3.5 text-blue-500" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={onToggleBookmarkedOnly}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all ${bookmarkedOnly
              ? 'bg-brand-500 text-white border-brand-500 shadow-sm shadow-brand-glow'
              : 'bg-white dark:bg-[#121212] border-slate-200 dark:border-[#222222] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-[#333333]'
              }`}
            title="Show saved markets"
          >
            {bookmarkedOnly ? (
              <BookmarkCheck className="size-3.5" />
            ) : (
              <Bookmark className="size-3.5" />
            )}
            <span className="hidden sm:inline">Bookmarks</span>
          </button>

          {hasActiveSectionFilter && (
            <button
              type="button"
              onClick={handleClearSectionFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 dark:border-rose-500/30 transition-all cursor-pointer animate-in fade-in"
              title="Clear All Markets filters"
            >
              <RotateCcw className="size-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: pageSize }).map((_, i) => (
            <MarketCardSkeleton key={i} />
          ))}
        </div>
      ) : markets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-[#222222] p-12 text-center bg-white/40 dark:bg-[#0E0E0E]/40">
          <p className="text-base font-semibold text-slate-800 dark:text-neutral-200">
            No markets found
          </p>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Try adjusting your search or filters to see more markets.
          </p>
          {hasActiveSectionFilter && (
            <button
              onClick={handleClearSectionFilters}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-all inline-flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="size-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {markets.map((market) => {
            const isBookmarked = bookmarkedIds.has(market.id);
            if (market.type === 'binary') {
              return (
                <BinaryMarketCard
                  key={market.id}
                  market={market}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={onToggleBookmark}
                  onOpenTrade={onOpenTrade}
                />
              );
            }
            return (
              <MultiOutcomeCard
                key={market.id}
                market={market}
                isBookmarked={isBookmarked}
                onToggleBookmark={onToggleBookmark}
                onOpenTrade={onOpenTrade}
              />
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalMarkets}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </section>
  );
};
