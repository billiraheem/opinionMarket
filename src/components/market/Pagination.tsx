import React from 'react';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200/80 dark:border-[#222222]">
      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-neutral-400">
        <span>
          Showing <span className="font-semibold text-slate-800 dark:text-neutral-200">{startItem}–{endItem}</span> of{' '}
          <span className="font-semibold text-slate-800 dark:text-neutral-200">{totalItems}</span> markets
        </span>

        <span className="text-slate-300 dark:text-neutral-700">|</span>

        <div className="flex items-center gap-1.5">
          <span>Per page:</span>
          {[8, 12, 16].map((size) => (
            <button
              key={size}
              onClick={() => onPageSizeChange(size)}
              className={`px-2 py-0.5 rounded font-mono text-xs transition-colors ${
                pageSize === size
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-bold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#111111] text-xs font-medium text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          aria-label="Previous page"
        >
          <ArrowLeft2 size="14" className="size-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`dots-${idx}`} className="px-2 text-xs text-slate-400 dark:text-neutral-500">
                  ...
                </span>
              );
            }
            const isCurrent = currentPage === p;
            return (
              <button
                key={`page-${p}`}
                onClick={() => onPageChange(p as number)}
                className={`size-8 rounded-xl text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-brand-500 text-white shadow-sm shadow-brand-glow'
                    : 'text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#1A1A1A] border border-transparent hover:border-slate-200 dark:hover:border-[#333333]'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#111111] text-xs font-medium text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-[#1A1A1A] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ArrowRight2 size="14" className="size-3.5" />
        </button>
      </div>
    </div>
  );
};
