import React, { useState, useEffect, useCallback } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Market, TradeTicket } from '../../types/market';
import { useCountdown } from '../../hooks/useCountdown';

interface FeaturedCarouselProps {
  sectionTitle: string;
  markets: Market[];
  onOpenTrade: (ticket: TradeTicket) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  sectionTitle,
  markets,
  onOpenTrade
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = useCallback(() => {
    setProgress(0);
    setCurrentIndex(prev => (prev === 0 ? markets.length - 1 : prev - 1));
  }, [markets.length]);

  const handleNext = useCallback(() => {
    setProgress(0);
    setCurrentIndex(prev => (prev === markets.length - 1 ? 0 : prev + 1));
  }, [markets.length]);

  const handleSelect = useCallback((idx: number) => {
    setProgress(0);
    setCurrentIndex(idx);
  }, []);

  useEffect(() => {
    if (isPaused || markets.length <= 1) return;

    const interval = setInterval(() => {
      setProgress(prev => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [isPaused, markets.length]);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      setCurrentIndex(prev => (prev === markets.length - 1 ? 0 : prev + 1));
    }
  }, [progress, markets.length]);

  if (!markets || markets.length === 0) return null;

  const currentMarket = markets[currentIndex] || markets[0];

  return (
    <section
      className="w-full mb-6 sm:mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-dark-muted">
          {sectionTitle}
        </p>
      </div>

      <CarouselSlideCard
        market={currentMarket}
        onOpenTrade={onOpenTrade}
      />

      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          {markets.map((_, idx) => {
            const isActive = currentIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full relative overflow-hidden ${
                  isActive
                    ? 'w-10 bg-slate-200 dark:bg-neutral-800'
                    : 'w-2 bg-slate-300 dark:bg-neutral-800 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 bg-slate-900 dark:bg-white rounded-full transition-all duration-75"
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            className="size-7 rounded-full border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#111111] hover:bg-slate-100 dark:hover:bg-[#1A1A1A] text-slate-600 dark:text-neutral-300 flex items-center justify-center transition-colors shadow-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            onClick={handleNext}
            className="size-7 rounded-full border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#111111] hover:bg-slate-100 dark:hover:bg-[#1A1A1A] text-slate-600 dark:text-neutral-300 flex items-center justify-center transition-colors shadow-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

interface CarouselSlideCardProps {
  market: Market;
  onOpenTrade: (ticket: TradeTicket) => void;
}

const CarouselSlideCard: React.FC<CarouselSlideCardProps> = ({ market, onOpenTrade }) => {
  const countdown = useCountdown(market.closesAt);

  const outcomeColors = [
    { fill: 'bg-indigo-600', track: 'bg-indigo-500/15' },
    { fill: 'bg-sky-500', track: 'bg-sky-500/15' },
    { fill: 'bg-teal-500', track: 'bg-teal-500/15' },
    { fill: 'bg-rose-500', track: 'bg-rose-500/15' },
    { fill: 'bg-amber-500', track: 'bg-amber-500/15' },
    { fill: 'bg-lime-500', track: 'bg-lime-500/15' },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-[#222222] bg-white dark:bg-[#0E0E0E] shadow-card-light dark:shadow-card-dark transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px]">
        <div className="p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-500/10 text-brand-600 dark:text-blue-400 border border-brand-500/20">
                {market.categoryLabel}
              </span>
              {market.isLive && (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <span className="size-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>LIVE</span>
                </span>
              )}
              <span className="text-[11px] text-slate-400 dark:text-neutral-400 font-mono ml-auto">
                ₦{(market.volumeNgn / 1000000).toFixed(1)}M Vol
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2">
              {market.title}
            </h3>

            <div className="space-y-2.5 mb-4">
              {market.outcomes.slice(0, 3).map((outcome, idx) => {
                const palette = outcomeColors[idx % outcomeColors.length];
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
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-[#222222] hover:border-brand-500/40 p-2 sm:p-2.5 transition-all bg-slate-50/50 dark:bg-[#141414] hover:bg-slate-100 dark:hover:bg-[#1C1C1C]"
                  >
                    <div
                      className={`absolute inset-y-0 left-0 ${palette.track} rounded-xl transition-all duration-500`}
                      style={{ width: `${Math.min(100, Math.max(outcome.probability, 4))}%` }}
                    />

                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${palette.fill}`}
                    />

                    <div className="relative z-10 flex items-center justify-between text-xs sm:text-sm pl-2">
                      <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-neutral-100 truncate pr-2">
                        {outcome.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 text-slate-700 dark:text-neutral-300">
                            {outcome.badge}
                          </span>
                        )}
                        <span className="truncate">{outcome.name}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold font-mono text-slate-900 dark:text-white">
                          {outcome.probability}%
                        </span>
                        <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-500 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          Trade
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {market.totalOutcomesCount && market.totalOutcomesCount > 3 && (
              <p className="text-xs text-slate-500 dark:text-neutral-400 font-medium cursor-pointer hover:text-brand-500 transition-colors">
                +{market.totalOutcomesCount - 3} more outcomes
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#222222] flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-slate-400" />
              <span>Closes in</span>
              <span className="font-mono font-bold text-slate-800 dark:text-neutral-200">
                {countdown}
              </span>
            </div>
            <span className="text-[11px] font-medium text-brand-600 dark:text-blue-400 hover:underline cursor-pointer">
              View Rules & Stats
            </span>
          </div>
        </div>

        <div className="relative min-h-[220px] md:min-h-[280px] bg-slate-950 text-white p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200 dark:border-[#222222] overflow-hidden">
          {market.promoImage === 'MATCHDAY_BANNER' ? (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: "url('/FCBvsRMA.jpeg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/60 pointer-events-none" />
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 size-40 rounded-full bg-blue-600/30 blur-3xl pointer-events-none" />
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 size-40 rounded-full bg-amber-500/25 blur-3xl pointer-events-none" />
              <svg className="absolute inset-0 size-full opacity-10 pointer-events-none" viewBox="0 0 300 280" fill="none" stroke="currentColor">
                <rect x="15" y="15" width="270" height="250" rx="8" strokeWidth="1.5" />
                <circle cx="150" cy="140" r="45" strokeWidth="1.5" />
                <line x1="150" y1="15" x2="150" y2="265" strokeWidth="1.5" />
                <circle cx="150" cy="140" r="3" fill="currentColor" />
              </svg>

              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/70">
                    MATCHDAY DERBY
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    ● Live La Liga
                  </span>
                </div>

                <div className="my-auto py-3 text-center">
                  <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2">
                    <div className="flex flex-col items-center gap-1 group/team">
                      <div className="size-14 sm:size-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center shadow-lg transition-transform group-hover/team:scale-105">
                        <img
                          src="/logos/fcb.svg"
                          alt="FC Barcelona"
                          className="size-full object-contain drop-shadow"
                        />
                      </div>
                      <span className="text-xs font-bold text-white tracking-wide">Barcelona</span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-amber-400 drop-shadow">
                        VS
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/60 mt-0.5">
                        Camp Nou
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 group/team">
                      <div className="size-14 sm:size-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center shadow-lg transition-transform group-hover/team:scale-105">
                        <img
                          src="/logos/rma.svg"
                          alt="Real Madrid"
                          className="size-full object-contain drop-shadow"
                        />
                      </div>
                      <span className="text-xs font-bold text-white tracking-wide">Real Madrid</span>
                    </div>
                  </div>

                  <p className="text-[11px] font-medium text-slate-300">
                    El Clásico · Match Winner & Exact Score
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/60 pt-2 border-t border-white/10">
                  <span>opinionmarket.ng</span>
                  <span className="font-semibold text-white/80">18+ TRADE RESPONSIBLY</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: "url('/election.jpeg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/65 pointer-events-none" />
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 size-40 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none" />
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 size-40 rounded-full bg-sky-500/25 blur-3xl pointer-events-none" />
              <svg className="absolute inset-0 size-full opacity-10 pointer-events-none" viewBox="0 0 300 280" fill="none" stroke="currentColor">
                <pattern id="ballot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
                <rect width="300" height="280" fill="url(#ballot-pattern)" />
                <circle cx="150" cy="140" r="65" strokeWidth="1" strokeDasharray="4 4" />
              </svg>

              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-white/70">
                    2027 GENERAL ELECTIONS
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ● Decision 2027
                  </span>
                </div>

                <div className="my-auto py-3 text-center">
                  <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2">
                    <div className="flex flex-col items-center gap-1 group/party">
                      <div className="size-14 sm:size-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg transition-transform group-hover/party:scale-105 border border-emerald-500/30">
                        <img
                          src="/logos/pdp.png"
                          alt="PDP"
                          className="size-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold text-white tracking-wide">PDP</span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-sky-400 drop-shadow">
                        VS
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/60 mt-0.5">
                        Polling
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 group/party">
                      <div className="size-14 sm:size-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-lg transition-transform group-hover/party:scale-105 border border-sky-500/30">
                        <img
                          src="/logos/apc.png"
                          alt="APC"
                          className="size-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold text-white tracking-wide">APC</span>
                    </div>
                  </div>

                  <h4 className="text-xs font-semibold text-white/90 line-clamp-1 max-w-[240px] mx-auto">
                    {market.title}
                  </h4>
                  <p className="text-[10px] text-white/60 mt-0.5">
                    Real-time consensus probabilities
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/60 pt-2 border-t border-white/10">
                  <span className="font-semibold text-white/80">opinionmarket.ng</span>
                  <span>VERIFIED POLLING</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
