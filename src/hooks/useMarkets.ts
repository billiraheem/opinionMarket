import { useState, useEffect, useCallback } from 'react';
import type { Market, MarketCategory, SortOption } from '../types/market';
import { marketService } from '../services/marketService';

export function useMarkets() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [featuredMarkets, setFeaturedMarkets] = useState<{ featured: Market[]; politics: Market[] }>({
    featured: [],
    politics: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategoryState] = useState<MarketCategory>('all');
  const [search, setSearchState] = useState('');
  const [sortBy, setSortByState] = useState<SortOption>('closing_soon');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalMarkets, setTotalMarkets] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('om_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  // Fetch Featured Carousels on mount
  useEffect(() => {
    let isMounted = true;
    marketService.getFeaturedMarkets().then(res => {
      if (isMounted) setFeaturedMarkets(res);
    });
    return () => { isMounted = false; };
  }, []);

  // Fetch paginated markets
  const fetchMarkets = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await marketService.getMarkets({
        category,
        search,
        sortBy,
        page: currentPage,
        pageSize,
      });

      let results = res.data;
      if (bookmarkedOnly) {
        results = results.filter(m => bookmarkedIds.has(m.id));
      }

      setMarkets(results);
      setTotalMarkets(bookmarkedOnly ? results.length : res.total);
      setTotalPages(bookmarkedOnly ? Math.ceil(results.length / pageSize) || 1 : res.totalPages);
    } catch (err) {
      console.error('Failed to fetch markets', err);
    } finally {
      setIsLoading(false);
    }
  }, [category, search, sortBy, currentPage, pageSize, bookmarkedOnly, bookmarkedIds]);

  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  const toggleBookmark = (marketId: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(marketId)) {
        next.delete(marketId);
      } else {
        next.add(marketId);
      }
      try {
        localStorage.setItem('om_bookmarks', JSON.stringify(Array.from(next)));
      } catch { }
      return next;
    });
  };

  const setCategory = (newCat: MarketCategory) => {
    setCategoryState(newCat);
    setCurrentPage(1);
  };

  const setSearch = (query: string) => {
    setSearchState(query);
    setCurrentPage(1);
  };

  const setSortBy = (sort: SortOption) => {
    setSortByState(sort);
    setCurrentPage(1);
  };

  const toggleBookmarkedOnly = () => {
    setBookmarkedOnly(prev => !prev);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll back to grid top
    const gridElem = document.getElementById('markets-grid-section');
    if (gridElem) {
      gridElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    markets,
    featuredMarkets,
    isLoading,
    totalMarkets,
    totalPages,
    currentPage,
    pageSize,
    category,
    search,
    sortBy,
    bookmarkedOnly,
    bookmarkedIds,
    setCategory,
    setSearch,
    setSortBy,
    toggleBookmarkedOnly,
    toggleBookmark,
    setPage: handlePageChange,
    setPageSize: handlePageSizeChange,
    refetch: fetchMarkets,
  };
}
