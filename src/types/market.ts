export type MarketCategory = 'all' | 'trending' | 'sports' | 'politics' | 'entertainment' | 'finance' | 'world' | 'tech';

export type MarketType = 'binary' | 'multi';

export type SortOption = 'closing_soon' | 'volume_desc' | 'popular' | 'newest';

export interface Outcome {
  id: string;
  name: string;
  probability: number;
  color?: string;
  badge?: string;
}

export interface Market {
  id: string;
  title: string;
  slug: string;
  category: MarketCategory;
  categoryLabel: string;
  type: MarketType;
  thumbnail: string;
  volumeNgn: number;
  closesAt: string;
  isLive: boolean;
  isFeatured?: boolean;
  outcomes: Outcome[];
  totalOutcomesCount?: number;
  promoImage?: string;
  promoTag?: string;
  description?: string;
}

export interface MarketQueryParams {
  category?: MarketCategory;
  search?: string;
  sortBy?: SortOption;
  marketType?: 'all' | 'binary' | 'multi';
  bookmarkedOnly?: boolean;
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface SidebarData {
  latestMarkets: {
    id: string;
    title: string;
    category: string;
    timeAgo: string;
  }[];
  hotTopics: {
    id: string;
    title: string;
    leadingOutcome: string;
    probability: number;
    color: string;
    isYesNo?: boolean;
  }[];
  recentlyResolved: {
    id: string;
    title: string;
    winningOutcome: string;
    payoutRate: string;
    resolvedAt: string;
  }[];
}

export interface TradeTicket {
  marketId: string;
  marketTitle: string;
  outcomeId: string;
  outcomeName: string;
  probability: number;
  pricePerShare: number;
}

export interface OrderReceipt {
  orderId: string;
  marketTitle: string;
  outcomeName: string;
  amountInvested: number;
  sharesBought: number;
  potentialPayout: number;
  returnPercentage: number;
  timestamp: string;
}
