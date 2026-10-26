import React, { useState, useEffect } from 'react';
import { CloseCircle, TickCircle, ArrowRight, Refresh2 } from 'iconsax-react';
import type { TradeTicket, OrderReceipt } from '../../types/market';
import { marketService } from '../../services/marketService';

interface QuickTradeModalProps {
  ticket: TradeTicket | null;
  onClose: () => void;
}

export const QuickTradeModal: React.FC<QuickTradeModalProps> = ({ ticket, onClose }) => {
  const [amount, setAmount] = useState<number>(5000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    setReceipt(null);
    setAmount(5000);
  }, [ticket]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (ticket) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [ticket, onClose]);

  if (!ticket) return null;

  const probDecimal = Math.max(ticket.probability, 1) / 100;
  const potentialPayout = Math.round(amount / probDecimal);
  const potentialProfit = Math.max(0, potentialPayout - amount);
  const returnPercentage = Math.round((potentialProfit / amount) * 100);

  const quickAmounts = [1000, 5000, 10000, 25000, 50000];

  const handleExecuteTrade = async () => {
    if (amount <= 0 || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await marketService.simulateOrder(ticket, amount);
      setReceipt(result);
    } catch (err) {
      console.error('Simulated order error', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isYes = ticket.outcomeName.toLowerCase().includes('yes');
  const isNo = ticket.outcomeName.toLowerCase().includes('no');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#101010] border border-slate-200 dark:border-[#222222] p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200 z-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1A1A] transition-colors"
          aria-label="Close modal"
        >
          <CloseCircle size="20" className="size-5" />
        </button>

        {!receipt ? (
          <div>
            <div className="pr-6 mb-4">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-brand-50 dark:bg-blue-600/15 text-brand-600 dark:text-blue-400 mb-2">
                Order Ticket
              </span>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-2">
                {ticket.marketTitle}
              </h3>
            </div>

            <div className={`flex items-center justify-between p-3.5 rounded-xl mb-5 border ${
              isYes 
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-emerald-800 dark:text-emerald-300' 
                : isNo
                ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 text-rose-800 dark:text-rose-300'
                : 'bg-blue-50 dark:bg-blue-600/15 border-blue-200 dark:border-blue-500/40 text-blue-800 dark:text-blue-300'
            }`}>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{ticket.outcomeName}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-neutral-400 block">Probability</span>
                <span className="text-base font-bold font-mono">{ticket.probability}%</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-slate-600 dark:text-neutral-300">
                  Investment Amount
                </label>
                <span className="text-xs text-slate-400">Balance: ₦250,000</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₦</span>
                <input
                  type="number"
                  min="500"
                  step="500"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#222222] bg-slate-50 dark:bg-[#161616] text-slate-900 dark:text-white font-semibold font-mono text-base focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                />
              </div>

              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar pb-1">
                {quickAmounts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setAmount(q)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all shrink-0 ${
                      amount === q
                        ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                        : 'border-slate-200 dark:border-[#222222] text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-[#1A1A1A]'
                    }`}
                  >
                    ₦{q.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#222222] space-y-2 mb-5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-neutral-400">Potential Payout</span>
                <span className="font-bold font-mono text-slate-900 dark:text-white">
                  ₦{potentialPayout.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-neutral-400">Potential Profit</span>
                <span className="font-bold font-mono text-market-yes">
                  +₦{potentialProfit.toLocaleString()} ({returnPercentage > 0 ? `+${returnPercentage}%` : '0%'})
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 dark:text-neutral-400">Est. Shares</span>
                <span className="font-mono text-slate-700 dark:text-neutral-300">
                  {Math.round(amount / (ticket.probability / 100 * 10))} shares
                </span>
              </div>
            </div>

            <button
              onClick={handleExecuteTrade}
              disabled={amount <= 0 || isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                isYes
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
                  : isNo
                  ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20'
                  : 'bg-brand-500 hover:bg-brand-600 shadow-brand-glow'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Refresh2 size="16" className="size-4 animate-spin" />
                  <span>Matching Market Order...</span>
                </>
              ) : (
                <>
                  <span>Confirm Trade (₦{amount.toLocaleString()})</span>
                  <ArrowRight size="16" className="size-4" />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="text-center py-4 animate-in fade-in zoom-in-95">
            <div className="size-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
              <TickCircle size="32" className="size-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
              Simulated Order Placed!
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mb-5">
              Order ID: <span className="font-mono text-brand-500 font-semibold">{receipt.orderId}</span>
            </p>

            <div className="text-left p-4 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#222222] space-y-2.5 mb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Market</span>
                <span className="font-medium text-slate-900 dark:text-white line-clamp-1 max-w-[200px]">
                  {receipt.marketTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Position</span>
                <span className="font-semibold text-brand-500">{receipt.outcomeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Invested</span>
                <span className="font-mono font-medium">₦{receipt.amountInvested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Potential Return</span>
                <span className="font-mono font-bold text-market-yes">
                  ₦{receipt.potentialPayout.toLocaleString()} (+{receipt.returnPercentage}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Executed At</span>
                <span className="text-slate-400">{receipt.timestamp}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl font-medium text-sm text-white bg-brand-500 hover:bg-brand-600 transition-all shadow-md"
            >
              Done & Return to Markets
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
