import React, { useState } from 'react';
import { Search, HelpCircle, Sun, Moon, Wallet, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenHowItWorks: () => void;
  onOpenDeposit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenHowItWorks,
  onOpenDeposit
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full  border-slate-200/80 dark:border-[#222222] bg-white dark:bg-black transition-colors">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-6 shrink-0">
          <a href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.webp"
              alt="OpinionMarket"
              className="size-8 sm:size-9 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
            />
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              OpinionMarket
            </span>
          </a>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between h-9 px-3.5 rounded-full border border-slate-200 dark:border-[#222222] bg-slate-100/70 dark:bg-[#101010] hover:border-brand-500/50 hover:bg-slate-100 dark:hover:bg-[#181818] text-xs sm:text-sm text-slate-500 dark:text-neutral-400 transition-all text-left group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="size-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
              <span>Search markets, elections, football...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center justify-center size-5 text-[10px] font-mono font-semibold rounded border border-slate-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-slate-500 dark:text-neutral-400">
              /
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#161616]"
            aria-label="Open search"
          >
            <Search className="size-4" />
          </button>

          <button
            onClick={onOpenHowItWorks}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-neutral-300 hover:text-brand-500 dark:hover:text-blue-400 transition-colors px-2 py-1.5 rounded-lg"
          >
            <HelpCircle className="size-4 text-brand-500" />
            <span>How it works</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161616] border border-transparent hover:border-slate-200 dark:hover:border-[#222222] transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="size-4 text-amber-400 animate-in spin-in-90 duration-300" />
            ) : (
              <Moon className="size-4 text-slate-600 animate-in spin-in-90 duration-300" />
            )}
          </button>

          <button
            onClick={onOpenDeposit}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-[#121212] dark:hover:bg-[#1A1A1A] text-slate-800 dark:text-white border border-slate-200 dark:border-[#222222] transition-all"
          >
            <Wallet className="size-3.5 text-brand-500" />
            <span>Deposit</span>
          </button>

          <button
            onClick={onOpenDeposit}
            className="hidden md:inline-flex text-xs font-semibold text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white px-2 py-1.5 transition-colors"
          >
            Log In
          </button>

          <button
            onClick={onOpenDeposit}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 shadow-sm hover:shadow-brand-glow transition-all active:scale-95"
          >
            Sign Up
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="lg:hidden p-2 rounded-xl text-slate-500 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#161616]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-[#222222] bg-white dark:bg-[#101010] px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
          <button
            onClick={() => {
              onOpenHowItWorks();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 py-2 text-sm font-medium text-slate-700 dark:text-neutral-200"
          >
            <HelpCircle className="size-4 text-brand-500" />
            <span>How it works</span>
          </button>
          <button
            onClick={() => {
              onOpenDeposit();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2 py-2 text-sm font-medium text-slate-700 dark:text-neutral-200"
          >
            <Wallet className="size-4 text-brand-500" />
            <span>Deposit Funds</span>
          </button>
        </div>
      )}
    </header>
  );
};
