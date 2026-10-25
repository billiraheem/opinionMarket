import type {
  Market,
  MarketQueryParams,
  PaginatedResult,
  SidebarData,
  TradeTicket,
  OrderReceipt
} from '../types/market';
import { mockMarkets, mockSidebarData } from '../data/mockMarkets';

const SIMULATED_LATENCY_MS = 250;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const marketService = {
  async getMarkets(params: MarketQueryParams): Promise<PaginatedResult<Market>> {
    await delay(SIMULATED_LATENCY_MS);

    let filtered = [...mockMarkets];

    // Filter by category
    if (params.category && params.category !== 'all') {
      if (params.category === 'trending') {
        filtered.sort((a, b) => b.volumeNgn - a.volumeNgn);
      } else {
        filtered = filtered.filter(m => m.category === params.category);
      }
    }

    // Filter by market type
    if (params.marketType && params.marketType !== 'all') {
      filtered = filtered.filter(m => m.type === params.marketType);
    }

    // Filter by search query
    if (params.search && params.search.trim().length > 0) {
      const q = params.search.toLowerCase().trim();
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.categoryLabel.toLowerCase().includes(q) ||
        m.outcomes.some(o => o.name.toLowerCase().includes(q))
      );
    }

    // Sorting
    switch (params.sortBy) {
      case 'volume_desc':
        filtered.sort((a, b) => b.volumeNgn - a.volumeNgn);
        break;
      case 'closing_soon':
        filtered.sort((a, b) => new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.outcomes[0]?.probability || 0) - (a.outcomes[0]?.probability || 0));
        break;
      case 'newest':
      default:
        // default by closing soonest or id
        filtered.sort((a, b) => new Date(a.closesAt).getTime() - new Date(b.closesAt).getTime());
        break;
    }

    const total = filtered.length;
    const page = Math.max(1, params.page || 1);
    const pageSize = Math.max(1, params.pageSize || 8);
    const totalPages = Math.ceil(total / pageSize) || 1;

    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

    return {
      data: paginatedData,
      total,
      page,
      pageSize,
      totalPages,
      hasMore: page < totalPages,
    };
  },

  async getFeaturedMarkets(): Promise<{ featured: Market[]; politics: Market[] }> {
    await delay(150);
    const featured = mockMarkets.filter(m => m.isFeatured).slice(0, 4);
    const politics = mockMarkets.filter(m => m.category === 'politics').slice(0, 4);
    return { featured, politics };
  },

  async getSidebarData(): Promise<SidebarData> {
    await delay(180);
    return mockSidebarData;
  },

  async simulateOrder(ticket: TradeTicket, amountNgn: number): Promise<OrderReceipt> {
    await delay(350);

    const probDecimal = Math.max(ticket.probability, 1) / 100;
    const potentialPayout = Math.round(amountNgn / probDecimal);
    const returnPercentage = Math.round(((potentialPayout - amountNgn) / amountNgn) * 100);

    return {
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
      marketTitle: ticket.marketTitle,
      outcomeName: ticket.outcomeName,
      amountInvested: amountNgn,
      sharesBought: Math.round(amountNgn / (ticket.probability / 100 * 10)),
      potentialPayout,
      returnPercentage,
      timestamp: new Date().toLocaleTimeString(),
    };
  }
};
