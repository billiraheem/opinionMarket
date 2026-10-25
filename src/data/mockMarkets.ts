import type { Market, SidebarData } from '../types/market';

const primeMarkets: Market[] = [
  // --- Sports ---
  {
    id: 'm-1',
    title: "Will Lamine Yamal Win The 2026 Ballon d'Or?",
    slug: 'lamine-yamal-ballon-dor-2026',
    category: 'sports',
    categoryLabel: 'Sports',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 34500000,
    closesAt: new Date(Date.now() + 2 * 3600 * 1000 + 56 * 60 * 1000 + 31 * 1000).toISOString(),
    isLive: true,
    isFeatured: false,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 30, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 70, color: '#F43F5E' },
    ],
  },
  {
    id: 'm-2',
    title: "Will Kylian Mbappé Score in the Next El Clásico?",
    slug: 'mbappe-score-el-clasico',
    category: 'sports',
    categoryLabel: 'Sports',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 42100000,
    closesAt: new Date(Date.now() + 3 * 3600 * 1000 + 12 * 60 * 1000 + 15 * 1000).toISOString(),
    isLive: true,
    isFeatured: false,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 37, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 63, color: '#F43F5E' },
    ],
  },
  {
    id: 'm-3',
    title: "Will Harry Kane Win a Major Trophy with Bayern in 2026?",
    slug: 'kane-win-trophy-bayern-2026',
    category: 'sports',
    categoryLabel: 'Sports',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 18900000,
    closesAt: new Date(Date.now() + 5 * 3600 * 1000 + 44 * 60 * 1000).toISOString(),
    isLive: true,
    isFeatured: false,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 55, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 45, color: '#F43F5E' },
    ],
  },
  {
    id: 'm-4',
    title: "Will Nigeria's Super Eagles Qualify for the 2026 FIFA World Cup Knockout Stage?",
    slug: 'super-eagles-world-cup-knockout',
    category: 'sports',
    categoryLabel: 'Sports',
    type: 'binary',
    thumbnail: 'https://invalid-image-for-fallback-testing.ng/broken.jpg',
    volumeNgn: 58000000,
    closesAt: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
    isLive: true,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 52, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 48, color: '#F43F5E' },
    ],
  },
  {
    id: 'm-13',
    title: "Barcelona vs Real Madrid: EXACT SCORE",
    slug: 'barcelona-real-madrid-exact-score',
    category: 'sports',
    categoryLabel: 'Sports',
    type: 'multi',
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 92400000,
    closesAt: new Date(Date.now() + 12 * 3600 * 1000 + 42 * 60 * 1000 + 22 * 1000).toISOString(),
    isLive: true,
    isFeatured: true,
    outcomes: [
      { id: 'o-none', name: 'Other / None', probability: 46, color: '#6366F1' },
      { id: 'o-bar2-rea1', name: 'Barcelona 2 - 1 Real Madrid', probability: 8, color: '#00C076' },
      { id: 'o-bar1-rea1', name: 'Barcelona 1 - 1 Real Madrid', probability: 7, color: '#F59E0B' },
      { id: 'o-bar0-rea1', name: 'Barcelona 0 - 1 Real Madrid', probability: 6, color: '#F43F5E' },
      { id: 'o-bar2-rea0', name: 'Barcelona 2 - 0 Real Madrid', probability: 5, color: '#14B8A6' },
    ],
    totalOutcomesCount: 11,
    promoTag: 'Live La Liga',
    promoImage: 'MATCHDAY_BANNER',
  },

  // --- Politics ---
  {
    id: 'm-14',
    title: "Taraba State Governorship Election 2027",
    slug: 'taraba-state-governorship-election-2027',
    category: 'politics',
    categoryLabel: 'Politics',
    type: 'multi',
    thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 61800000,
    closesAt: new Date(Date.now() + 100 * 86400 * 1000 + 14 * 3600 * 1000).toISOString(),
    isLive: true,
    isFeatured: true,
    outcomes: [
      { id: 'o-kefas', name: 'Agbu Kefas (PDP)', probability: 35, color: '#14B8A6', badge: 'PDP' },
      { id: 'o-bwacha', name: 'Emmanuel Bwacha (APC)', probability: 31, color: '#F43F5E', badge: 'APC' },
      { id: 'o-baido', name: 'Danladi Baido (NNPP)', probability: 19, color: '#F59E0B', badge: 'NNPP' },
      { id: 'o-others', name: 'Other Candidates', probability: 15, color: '#6366F1' },
    ],
    totalOutcomesCount: 5,
    promoTag: 'Live Politics',
    promoImage: 'ELECTION_TARABA',
  },
  {
    id: 'm-15',
    title: "Rivers State Governorship Election 2027",
    slug: 'rivers-state-governorship-election-2027',
    category: 'politics',
    categoryLabel: 'Politics',
    type: 'multi',
    thumbnail: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 77500000,
    closesAt: new Date(Date.now() + 142 * 86400 * 1000).toISOString(),
    isLive: true,
    isFeatured: true,
    outcomes: [
      { id: 'o-chinda', name: 'Kingsley Ogundu Chinda (APC)', probability: 33, color: '#6366F1', badge: 'APC' },
      { id: 'o-pidomson', name: 'Gabriel Pidomson (ADC)', probability: 31, color: '#0052FF', badge: 'ADC' },
      { id: 'o-ejekwu', name: 'Sam Ejekwu (PDP)', probability: 30, color: '#84CC16', badge: 'PDP' },
      { id: 'o-other', name: 'Other Candidates', probability: 6, color: '#F59E0B' },
    ],
    totalOutcomesCount: 4,
    promoTag: 'Rivers 2027',
    promoImage: 'ELECTION_RIVERS',
  },
  {
    id: 'm-16',
    title: "Who Will Win the 2027 Nigerian Presidential Election?",
    slug: 'nigeria-presidential-election-2027',
    category: 'politics',
    categoryLabel: 'Politics',
    type: 'multi',
    thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 245000000,
    closesAt: new Date(Date.now() + 380 * 86400 * 1000).toISOString(),
    isLive: true,
    isFeatured: true,
    outcomes: [
      { id: 'o-bat', name: 'Bola Ahmed Tinubu (APC)', probability: 39, color: '#F59E0B', badge: 'APC' },
      { id: 'o-po', name: 'Peter Obi (Labour Party)', probability: 34, color: '#00C076', badge: 'LP' },
      { id: 'o-atiku', name: 'Atiku Abubakar (PDP)', probability: 20, color: '#0052FF', badge: 'PDP' },
      { id: 'o-rmk', name: 'Rabiu Kwankwaso (NNPP)', probability: 7, color: '#F43F5E', badge: 'NNPP' },
    ],
    totalOutcomesCount: 4,
    promoTag: 'General Elections',
  },

  // --- Finance & Economy ---
  {
    id: 'm-5',
    title: "Will CBN Reduce the Monetary Policy Rate (MPR) in Next MPC Meeting?",
    slug: 'cbn-mpr-rate-cut-2026',
    category: 'finance',
    categoryLabel: 'Finance',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 67300000,
    closesAt: new Date(Date.now() + 8 * 3600 * 1000 + 15 * 60 * 1000).toISOString(),
    isLive: true,
    isFeatured: false,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 41, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 59, color: '#F43F5E' },
    ],
  },
  {
    id: 'm-6',
    title: "Will the Official Naira Exchange Rate Strengthen Below ₦1,350/$ in Q4?",
    slug: 'naira-exchange-rate-q4',
    category: 'finance',
    categoryLabel: 'Finance',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 112000000,
    closesAt: new Date(Date.now() + 14 * 3600 * 1000 + 30 * 60 * 1000).toISOString(),
    isLive: true,
    isFeatured: false,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 33, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 67, color: '#F43F5E' },
    ],
  },
  {
    id: 'm-7',
    title: "Will Dangote Refinery Fulfill 100% of Nigeria's Domestic Petrol Demand in 2026?",
    slug: 'dangote-refinery-full-domestic-supply',
    category: 'finance',
    categoryLabel: 'Finance',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 84500000,
    closesAt: new Date(Date.now() + 18 * 3600 * 1000 + 50 * 60 * 1000).toISOString(),
    isLive: true,
    isFeatured: false,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 68, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 32, color: '#F43F5E' },
    ],
  },

  // --- Entertainment ---
  {
    id: 'm-9',
    title: "Will Asake Win a Grammy Award at the 67th Annual Ceremony?",
    slug: 'asake-grammy-win-2026',
    category: 'entertainment',
    categoryLabel: 'Entertainment',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 45600000,
    closesAt: new Date(Date.now() + 6 * 3600 * 1000 + 10 * 60 * 1000).toISOString(),
    isLive: true,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 48, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 52, color: '#F43F5E' },
    ],
  },
  {
    id: 'm-12',
    title: "Will Burna Boy Headline another 80,000 Capacity Stadium in London in 2026?",
    slug: 'burna-boy-london-stadium-2026',
    category: 'entertainment',
    categoryLabel: 'Entertainment',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 38200000,
    closesAt: new Date(Date.now() + 36 * 3600 * 1000).toISOString(),
    isLive: true,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 82, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 18, color: '#F43F5E' },
    ],
  },

  // --- Technology ---
  {
    id: 'm-8',
    title: "Will Starlink Reach 250,000 Active Nigerian Subscriptions by Year-End?",
    slug: 'starlink-nigeria-subscribers-250k',
    category: 'tech',
    categoryLabel: 'Technology',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 29800000,
    closesAt: new Date(Date.now() + 22 * 3600 * 1000).toISOString(),
    isLive: true,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 75, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 25, color: '#F43F5E' },
    ],
  },
  {
    id: 'm-11',
    title: "Will OpenAI Release GPT-5 Before December 2026?",
    slug: 'openai-gpt5-release-2026',
    category: 'tech',
    categoryLabel: 'Technology',
    type: 'binary',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    volumeNgn: 73400000,
    closesAt: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
    isLive: true,
    outcomes: [
      { id: 'o-yes', name: 'Trade Yes', probability: 64, color: '#00C076' },
      { id: 'o-no', name: 'Trade No', probability: 36, color: '#F43F5E' },
    ],
  },
];

const topicBlueprints = [
  // Sports Blueprints
  {
    cat: 'sports' as const,
    label: 'Sports',
    templates: [
      "Will {teamA} Beat {teamB} in the Upcoming Derby?",
      "Will {player} Score 25+ League Goals this Season?",
      "Will {teamA} Win the Champions League Title?",
      "Will {player} Win the Golden Boot Award?",
      "Will {teamA} Finish in the Top 4 of the Premier League?",
      "Will {teamA} Advance Past the Round of 16 in the World Cup?",
    ],
    entities: {
      teamA: ['Arsenal', 'Manchester City', 'Real Madrid', 'Liverpool', 'Chelsea', 'Barcelona', 'Inter Milan', 'Bayern Munich', 'Super Eagles', 'Napoli', 'Bayer Leverkusen', 'PSG'],
      teamB: ['Tottenham', 'Manchester United', 'Atletico Madrid', 'Juventus', 'AC Milan', 'Borussia Dortmund', 'South Africa', 'Aston Villa', 'Newcastle', 'Sporting CP'],
      player: ['Erling Haaland', 'Bukayo Saka', 'Victor Osimhen', 'Vinicius Jr', 'Cole Palmer', 'Jude Bellingham', 'Rodri', 'Kylian Mbappé', 'Ademola Lookman', 'Mo Salah'],
    }
  },
  // Politics Blueprints
  {
    cat: 'politics' as const,
    label: 'Politics',
    templates: [
      "Will {candidate} Win the Governorship Race in {state} State?",
      "Will {party} Maintain Majority Seats in the Senate after 2027?",
      "Will {state} State House of Assembly Pass the New Local Govt Bill?",
      "Will {candidate} Announce a Formal Presidential Bid for 2027?",
      "Will {party} Secure More than 15 Governorship Seats in the 2027 Elections?",
      "Will Nigeria Hold State LG Elections Nationwide Without Postponement?",
    ],
    entities: {
      state: ['Lagos', 'Kano', 'Kaduna', 'Oyo', 'Enugu', 'Delta', 'Akwa Ibom', 'Ondo', 'Anambra', 'Edo', 'Plateau', 'Benue'],
      candidate: ['Seyi Makinde', 'Babajide Sanwo-Olu', 'Nasir El-Rufai', 'Peter Mbah', 'Dapo Abiodun', 'Alex Otti', 'Uba Sani', 'Siminalayi Fubara', 'Godwin Obaseki', 'Rabiu Kwankwaso'],
      party: ['APC', 'PDP', 'Labour Party', 'NNPP', 'ADC'],
    }
  },
  // Finance Blueprints
  {
    cat: 'finance' as const,
    label: 'Finance',
    templates: [
      "Will the Naira Close Below ₦{fxRate}/$ on the Official NAFEM Window?",
      "Will Nigeria's Headline Inflation Drop Below {inflation}% in Q{quarter}?",
      "Will Dangote Refinery Commence Euro-V Standard Fuel Export to {market}?",
      "Will CBN Issue New Digital Banking Guidelines for {fintechSegment}?",
      "Will Nigeria's Crude Oil Production Exceed {barrels}m Barrels per Day?",
      "Will the Debt Management Office (DMO) Oversubscribe the ₦{tBillAmount}B FGN Bond?",
    ],
    entities: {
      fxRate: ['1,300', '1,400', '1,450', '1,500', '1,550'],
      inflation: ['24', '22', '20', '18', '26'],
      quarter: ['1', '2', '3', '4'],
      market: ['West Africa', 'Europe', 'Southern Africa', 'South America'],
      fintechSegment: ['Neobanks', 'Payment Processors', 'Cross-Border Remittances', 'Crypto Settlement'],
      barrels: ['1.65', '1.75', '1.80', '1.90'],
      tBillAmount: ['500', '750', '1,000', '1,200'],
    }
  },
  // Entertainment Blueprints
  {
    cat: 'entertainment' as const,
    label: 'Entertainment',
    templates: [
      "Will {artist} Release a New Studio Album Before {timeframe}?",
      "Will {artist} Win the Artist of the Year Trophy at the Headies?",
      "Will the Nollywood Film '{movie}' Surpass ₦{boxOffice}M in Box Office Gross?",
      "Will {artist} Chart in the Top 10 of the Billboard Hot 100?",
      "Will {show} Announce an All-Stars Season for 2027?",
    ],
    entities: {
      artist: ['Wizkid', 'Davido', 'Burna Boy', 'Asake', 'Rema', 'Tems', 'Ayra Starr', 'Omah Lay', 'Fireboy DML', 'Tiwa Savage'],
      timeframe: ['August 2026', 'December 2026', 'Q1 2027', 'Summer 2026'],
      movie: ['A Tribe Called Judah 2', 'The Black Book II', 'King of Boys 3', 'Jagun Jagun 2', 'Wedding Party 3'],
      boxOffice: ['500', '800', '1,000', '1,500'],
      show: ['Big Brother Naija', 'The Voice Nigeria', 'Nigerian Idol'],
    }
  },
  // Technology Blueprints
  {
    cat: 'tech' as const,
    label: 'Technology',
    templates: [
      "Will {techCompany} Launch Its Dedicated Nigerian Datacenter in {city}?",
      "Will {startup} Raise a Series {series} Round of $25M+ in 2026?",
      "Will Active 5G Subscriptions in Nigeria Cross {millions} Million Users?",
      "Will {techCompany} Announce Direct Local Naira Billing Integration?",
      "Will the Nigerian Startup Act Tax Holidays Be Formally Implemented for {sector}?",
    ],
    entities: {
      techCompany: ['Google Cloud', 'Amazon AWS', 'Microsoft Azure', 'Starlink', 'Oracle'],
      city: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan'],
      startup: ['Moniepoint', 'Flutterwave', 'Opay', 'Kuda Bank', 'FairMoney', 'PiggyVest'],
      series: ['B', 'C', 'D'],
      millions: ['15', '20', '25', '30'],
      sector: ['AI Startups', 'Fintechs', 'CleanTech', 'EdTech'],
    }
  },
  // World Events Blueprints
  {
    cat: 'world' as const,
    label: 'World Events',
    templates: [
      "Will the US Federal Reserve Implement Another 25 bps Rate Cut Before {date}?",
      "Will Global Oil Prices (Brent) Settle Above ${oilPrice} per Barrel in Q{qtr}?",
      "Will the African Union Formulate a Common African Currency Protocol by {year}?",
      "Will the Eurozone Inflation Rate Fall to the 2.0% Target Before {date}?",
      "Will Gold Spot Prices Cross ${goldPrice}/oz on International Exchanges?",
    ],
    entities: {
      date: ['November 2026', 'December 2026', 'March 2027', 'June 2027'],
      oilPrice: ['80', '85', '90', '95'],
      qtr: ['1', '2', '3', '4'],
      year: ['2027', '2028', '2030'],
      goldPrice: ['2,750', '2,800', '3,000', '3,200'],
    }
  }
];

function generateExtensiveMarkets(): Market[] {
  const generated: Market[] = [...primeMarkets];
  let idCounter = 20;

  topicBlueprints.forEach((blueprint) => {
    const targetCount = 60;
    let created = 0;

    for (let t = 0; t < blueprint.templates.length; t++) {
      const template = blueprint.templates[t];

      // Combine variations
      for (let i = 0; i < 11; i++) {
        if (created >= targetCount) break;

        let title = template;
        const entities = blueprint.entities as unknown as Record<string, string[]>;

        Object.keys(entities).forEach((key) => {
          const list = entities[key];
          const choice = list[(i + t * 2) % list.length];
          title = title.replace(new RegExp(`\\{${key}\\}`, 'g'), choice);
        });

        // Generate probability
        const yesProb = Math.min(92, Math.max(8, 15 + ((idCounter * 7) % 72)));
        const noProb = 100 - yesProb;
        const vol = Math.round(5000000 + ((idCounter * 2341234) % 180000000));
        const hoursAhead = 1 + ((idCounter * 13) % 400);

        const market: Market = {
          id: `m-gen-${idCounter++}`,
          title,
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          category: blueprint.cat,
          categoryLabel: blueprint.label,
          type: 'binary',
          thumbnail: `https://images.unsplash.com/photo-${1500000000000 + (idCounter * 123456) % 100000000}?w=150&auto=format&fit=crop&q=80`,
          volumeNgn: vol,
          closesAt: new Date(Date.now() + hoursAhead * 3600 * 1000).toISOString(),
          isLive: (idCounter % 3 === 0),
          isFeatured: false,
          outcomes: [
            { id: `o-yes-${idCounter}`, name: 'Trade Yes', probability: yesProb, color: '#00C076' },
            { id: `o-no-${idCounter}`, name: 'Trade No', probability: noProb, color: '#F43F5E' },
          ],
        };

        generated.push(market);
        created++;
      }
    }
  });

  return generated;
}

export const mockMarkets: Market[] = generateExtensiveMarkets();

export const mockSidebarData: SidebarData = {
  latestMarkets: [
    {
      id: 'sm-1',
      title: 'Atalanta vs Frosinone Who Will Win. Serie A',
      category: 'Sports',
      timeAgo: '4m ago',
    },
    {
      id: 'sm-2',
      title: 'Celta Vigo vs Real Betis Who Will Win. LaLiga',
      category: 'Sports',
      timeAgo: '12m ago',
    },
    {
      id: 'sm-3',
      title: 'Arsenal vs Wolverhampton Wanderers Exact Score. EPL',
      category: 'Sports',
      timeAgo: '28m ago',
    },
    {
      id: 'sm-4',
      title: 'Ondo State Local Government Council Allocations Decision',
      category: 'Politics',
      timeAgo: '1h ago',
    },
    {
      id: 'sm-5',
      title: 'Nigeria OPEC+ Crude Production Quota Adjusted by +50k bpd',
      category: 'Economy',
      timeAgo: '2h ago',
    },
  ],
  hotTopics: [
    {
      id: 'ht-1',
      title: 'Who Will Win the 2027 Nigerian Presidential Election?',
      leadingOutcome: '39% Bola Ahmed Tinubu',
      probability: 39,
      color: '#F59E0B',
    },
    {
      id: 'ht-2',
      title: 'Will Kylian Mbappé Score in the Next El Clásico?',
      leadingOutcome: '37% Trade Yes',
      probability: 37,
      color: '#00C076',
      isYesNo: true,
    },
    {
      id: 'ht-3',
      title: "Will Lamine Yamal Win The 2026 Ballon d'Or?",
      leadingOutcome: '30% Trade Yes',
      probability: 30,
      color: '#00C076',
      isYesNo: true,
    },
    {
      id: 'ht-4',
      title: 'Will Harry Kane Win a Major Trophy with Bayern in 2026?',
      leadingOutcome: '55% Trade Yes',
      probability: 55,
      color: '#00C076',
      isYesNo: true,
    },
    {
      id: 'ht-5',
      title: 'Super Eagles Reach AFCON 2027 Final?',
      leadingOutcome: '50% Trade Yes',
      probability: 50,
      color: '#00C076',
      isYesNo: true,
    },
  ],
  recentlyResolved: [
    {
      id: 'rr-1',
      title: 'Lens vs Paris FC Who Will Win. Ligue 1',
      winningOutcome: 'Lens Won (2 - 0)',
      payoutRate: '₦1,000 per share paid',
      resolvedAt: 'Yesterday',
    },
    {
      id: 'rr-2',
      title: 'Lazio vs Parma Who Will Win. Serie A',
      winningOutcome: 'Lazio Won (3 - 1)',
      payoutRate: '₦1,000 per share paid',
      resolvedAt: '2 days ago',
    },
    {
      id: 'rr-3',
      title: 'Edo State Gubernatorial Tribunal Ruling Upheld',
      winningOutcome: 'Yes (Affirmed by Court of Appeal)',
      payoutRate: '₦1,000 per share paid',
      resolvedAt: '3 days ago',
    },
    {
      id: 'rr-4',
      title: 'US Federal Reserve Interest Rate Cut September 2026',
      winningOutcome: '25 bps Cut Executed',
      payoutRate: '₦1,000 per share paid',
      resolvedAt: '5 days ago',
    },
  ],
};
