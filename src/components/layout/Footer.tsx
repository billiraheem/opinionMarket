import React from 'react';
import { CreditCard, WalletCards, Landmark, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-[#222222] bg-white dark:bg-black text-slate-600 dark:text-neutral-400 mt-16 transition-colors">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.webp"
                alt="OpinionMarket"
                className="size-8 object-contain"
              />
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                OpinionMarket
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-neutral-400">
              The premier event-driven prediction platform where your knowledge in politics, sports, and culture turns into measurable profit.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4" />
              <span>18+ Trade Responsibly</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#markets" className="hover:text-brand-500 transition-colors">Explore All Markets</a></li>
              <li><a href="#trending" className="hover:text-brand-500 transition-colors">Trending Topics</a></li>
              <li><a href="#politics" className="hover:text-brand-500 transition-colors">Nigerian Elections 2027</a></li>
              <li><a href="#sports" className="hover:text-brand-500 transition-colors">La Liga & Premier League</a></li>
              <li><a href="#finance" className="hover:text-brand-500 transition-colors">CBN Rates & Naira FX</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Help Center & FAQ</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Resolution Rules & Oracle</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Responsible Trading Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Payment Gateways
            </h4>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mb-3">
              Seamless deposits and instant bank withdrawals supported nationwide.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-semibold">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#222222] flex flex-col items-center gap-1">
                <CreditCard className="size-4 text-brand-500" />
                <span>Paystack</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#222222] flex flex-col items-center gap-1">
                <WalletCards className="size-4 text-emerald-500" />
                <span>Flutterwave</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-[#111111] border border-slate-200 dark:border-[#222222] flex flex-col items-center gap-1">
                <Landmark className="size-4 text-amber-500" />
                <span>GTBank</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/80 dark:border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} OpinionMarket Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Lagos, Nigeria</span>
            <span>•</span>
            <span>Built for the Modern Event Economy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
