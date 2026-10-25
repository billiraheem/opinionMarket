import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import type { Market } from '../../types/market';
import { mockMarkets } from '../../data/mockMarkets';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMarket: (market: Market) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectMarket }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '/' && !isOpen && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim().length === 0 
    ? mockMarkets.slice(0, 5) 
    : mockMarkets.filter(m => 
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.categoryLabel.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-[#0E0E0E] border border-slate-200 dark:border-[#222222] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-[#222222]">
          <Search className="size-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search markets by title, topic, or candidate..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="size-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block ml-3 px-2 py-0.5 text-[11px] font-mono font-medium rounded border border-slate-200 dark:border-[#222222] bg-slate-100 dark:bg-[#1A1A1A] text-slate-500 dark:text-neutral-400">
            ESC
          </kbd>
        </div>

        <div className="max-h-[380px] overflow-y-auto p-2">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
            {query.trim() ? `Search Results (${filtered.length})` : 'Popular & Trending Markets'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-10 text-center text-slate-400 dark:text-neutral-500 text-sm">
              No markets found matching "{query}".
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((market) => (
                <div
                  key={market.id}
                  onClick={() => {
                    onSelectMarket(market);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1A1A1A] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-4">
                    <img 
                      src={market.thumbnail} 
                      alt="" 
                      className="size-9 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-[#222222]" 
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-brand-500 transition-colors">
                        {market.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400 dark:text-neutral-400">
                        <span className="capitalize">{market.categoryLabel}</span>
                        <span>•</span>
                        <span>₦{(market.volumeNgn / 1000000).toFixed(1)}M Vol</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-neutral-300 border border-transparent dark:border-[#222222]">
                      {market.outcomes[0]?.probability}%
                    </span>
                    <ChevronRight className="size-4 text-slate-400 group-hover:text-brand-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
