import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { CategoryBar } from './components/layout/CategoryBar';
import { ValuePropBanner } from './components/explainer/ValuePropBanner';
import { FeaturedCarousel } from './components/carousel/FeaturedCarousel';
import { MarketGrid } from './components/market/MarketGrid';
import { Sidebar } from './components/sidebar/Sidebar';
import { Footer } from './components/layout/Footer';
import { QuickTradeModal } from './components/modals/QuickTradeModal';
import { HowItWorksModal } from './components/modals/HowItWorksModal';
import { SearchModal } from './components/modals/SearchModal';
import { useMarkets } from './hooks/useMarkets';
import { marketService } from './services/marketService';
import type { SidebarData, TradeTicket, Market } from './types/market';

export function OpinionMarketApp() {
  const {
    markets,
    featuredMarkets,
    isLoading,
    totalMarkets,
    totalPages,
    currentPage,
    pageSize,
    category,
    sortBy,
    bookmarkedOnly,
    bookmarkedIds,
    setCategory,
    setSortBy,
    toggleBookmarkedOnly,
    toggleBookmark,
    setPage,
    setPageSize,
  } = useMarkets();

  const [sidebarData, setSidebarData] = useState<SidebarData | null>(null);
  const [activeTradeTicket, setActiveTradeTicket] = useState<TradeTicket | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Fetch sidebar data
  useEffect(() => {
    marketService.getSidebarData().then(setSidebarData);
  }, []);

  // Keyboard shortcut '/' to trigger search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !isSearchOpen &&
        (e.target as HTMLElement).tagName !== 'INPUT' &&
        (e.target as HTMLElement).tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleSelectMarketFromSearch = (market: Market) => {
    setActiveTradeTicket({
      marketId: market.id,
      marketTitle: market.title,
      outcomeId: market.outcomes[0]?.id || '1',
      outcomeName: market.outcomes[0]?.name || 'Trade Yes',
      probability: market.outcomes[0]?.probability || 50,
      pricePerShare: (market.outcomes[0]?.probability || 50) * 10,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-black text-slate-900 dark:text-white transition-colors">

      {/* Sticky Navigation Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenDeposit={() => setIsHowItWorksOpen(true)}
      />
      <CategoryBar
        activeCategory={category}
        onSelectCategory={setCategory}
      />

      <ValuePropBanner
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      {/* Split View (Main Grid + Sticky Sidebar) */}
      <main className="flex-1 mx-auto w-full max-w-[1440px] px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">

          {/* Left Column */}
          <div className="w-full min-w-0 flex-1">
            {(category === 'all' || category === 'trending') && (
              <>
                <FeaturedCarousel
                  sectionTitle="Featured"
                  markets={featuredMarkets.featured}
                  onOpenTrade={setActiveTradeTicket}
                />

                <FeaturedCarousel
                  sectionTitle="Politics Spotlight"
                  markets={featuredMarkets.politics}
                  onOpenTrade={setActiveTradeTicket}
                />
              </>
            )}

            {/* Markets Grid Section */}
            <div id="markets-grid-section" className="pt-2">
              <MarketGrid
                markets={markets}
                isLoading={isLoading}
                totalMarkets={totalMarkets}
                currentPage={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
                sortBy={sortBy}
                bookmarkedOnly={bookmarkedOnly}
                bookmarkedIds={bookmarkedIds}
                onSortChange={setSortBy}
                onToggleBookmarkedOnly={toggleBookmarkedOnly}
                onToggleBookmark={toggleBookmark}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                onOpenTrade={setActiveTradeTicket}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden lg:block sticky top-20">
            <Sidebar
              data={sidebarData}
              onOpenTrade={setActiveTradeTicket}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals */}
      <QuickTradeModal
        ticket={activeTradeTicket}
        onClose={() => setActiveTradeTicket(null)}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectMarket={handleSelectMarketFromSearch}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <OpinionMarketApp />
    </ThemeProvider>
  );
}
