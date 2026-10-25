import React, { useRef } from 'react';
import {
  Flame,
  Trophy,
  Landmark,
  Film,
  Coins,
  Globe2,
  Cpu,
  ChevronRight,
  ChevronLeft,
  LayoutGrid
} from 'lucide-react';
import type { MarketCategory } from '../../types/market';

interface CategoryBarProps {
  activeCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
}

interface CategoryItem {
  id: MarketCategory;
  label: string;
  icon: React.ReactNode;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: CategoryItem[] = [
    { id: 'all', label: 'All Markets', icon: <LayoutGrid className="size-3.5" /> },
    { id: 'trending', label: 'Trending', icon: <Flame className="size-3.5" /> },
    { id: 'sports', label: 'Sports', icon: <Trophy className="size-3.5" /> },
    { id: 'politics', label: 'Politics', icon: <Landmark className="size-3.5" /> },
    { id: 'finance', label: 'Economy & Finance', icon: <Coins className="size-3.5" /> },
    { id: 'entertainment', label: 'Entertainment', icon: <Film className="size-3.5" /> },
    { id: 'world', label: 'World Events', icon: <Globe2 className="size-3.5" /> },
    { id: 'tech', label: 'Technology', icon: <Cpu className="size-3.5" /> },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full border-b border-slate-200/80 dark:border-[#222222] bg-white dark:bg-black transition-colors">
      <div className="mx-auto flex max-w-[1440px] items-center px-4 sm:px-6 relative">
        <button
          onClick={() => scroll('left')}
          className="hidden sm:flex shrink-0 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-[#161616] text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors mr-1"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5 scroll-smooth"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all select-none border ${isActive
                  ? 'bg-blue-600/15 text-blue-600 dark:text-blue-400 border-blue-500/50 shadow-sm font-semibold'
                  : 'border-transparent text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161616]'
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center shrink-0 ml-1">
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-[#161616] text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
