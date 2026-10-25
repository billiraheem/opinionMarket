import React, { useState } from 'react';
import { Trophy, Landmark, Coins, Film, Cpu, Globe2, HelpCircle } from 'lucide-react';
import type { MarketCategory } from '../../types/market';

interface MarketThumbnailProps {
  src?: string;
  alt?: string;
  category: MarketCategory;
}

export const MarketThumbnail: React.FC<MarketThumbnailProps> = ({ src, alt = '', category }) => {
  const [hasError, setHasError] = useState(false);

  const getCategoryDetails = () => {
    switch (category) {
      case 'sports':
        return { 
          icon: <Trophy className="size-5 text-blue-500 dark:text-blue-400" />, 
          bg: 'bg-blue-50 dark:bg-[#141414]' 
        };
      case 'politics':
        return { 
          icon: <Landmark className="size-5 text-purple-500 dark:text-purple-400" />, 
          bg: 'bg-purple-50 dark:bg-[#141414]' 
        };
      case 'finance':
        return { 
          icon: <Coins className="size-5 text-emerald-500 dark:text-emerald-400" />, 
          bg: 'bg-emerald-50 dark:bg-[#141414]' 
        };
      case 'entertainment':
        return { 
          icon: <Film className="size-5 text-rose-500 dark:text-rose-400" />, 
          bg: 'bg-rose-50 dark:bg-[#141414]' 
        };
      case 'tech':
        return { 
          icon: <Cpu className="size-5 text-indigo-500 dark:text-indigo-400" />, 
          bg: 'bg-indigo-50 dark:bg-[#141414]' 
        };
      case 'world':
        return { 
          icon: <Globe2 className="size-5 text-cyan-500 dark:text-cyan-400" />, 
          bg: 'bg-cyan-50 dark:bg-[#141414]' 
        };
      default:
        return { 
          icon: <HelpCircle className="size-5 text-slate-400 dark:text-neutral-400" />, 
          bg: 'bg-slate-100 dark:bg-[#141414]' 
        };
    }
  };

  const { icon, bg } = getCategoryDetails();

  return (
    <div className={`size-11 sm:size-12 shrink-0 aspect-square rounded-xl overflow-hidden border border-slate-200/80 dark:border-[#222222] flex items-center justify-center relative ${bg}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="size-full object-cover transition-transform group-hover:scale-105 duration-300"
          loading="lazy"
        />
      ) : (
        <div className="size-full flex items-center justify-center">
          {icon}
        </div>
      )}
    </div>
  );
};
