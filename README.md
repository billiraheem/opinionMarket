# OpinionMarket Redesign and Architecture

I developed this application to transform the landing page experience of OpinionMarket into a modern, responsive, and high-performance prediction market platform. 

This document details what I have improved on the landing page, provides a direct comparison between my implementation and the current live website at https://www.opinionmarket.ng/, and explains the rationale behind my decision to not build a dedicated backend at this stage.

---

## 1. Direct Comparison: My Implementation vs. OpinionMarket

To elevate the platform to the visual and functional standards of world-class prediction markets such as Polymarket, I examined the current live website at https://www.opinionmarket.ng/ and addressed its design limitations and missing interactive capabilities.

| Feature / Area | Current Live Site (opinionmarket.ng) | My Redesigned Implementation |
| :--- | :--- | :--- |
| **Theme and Color Mode** | The live site is locked into a single dark mode that relies on dull navy and slate tones. There is no option for users who prefer light mode. | I built a dual-theme system where clean, high-contrast light mode is the primary default, and a sleek, pitch-black dark mode (#000000 base with #0E0E0E cards) is the secondary option. Users can toggle modes instantly without page reload. |
| **Hero Carousel & Slideshow** | The live site displays no visual cues indicating slide progression. | I created an automated slideshow carousel inspired by Polymarket. It includes video-style expanding progress bars that indicate the active slide, automatic pause when the user hovers over the carousel, manual slide navigation controls, and subtle micro-interactions. |
| **Category Navigation** | The live site provides a basic horizontal scroll bar with generic chevrons and minimal visual feedback. | I built an interactive CategoryBar containing curated Iconsax iconography for every market domain (All Markets, Trending, Sports, Politics, Economy, Entertainment, World Events, Technology). Active categories feature prominent accent pill states and smooth bidirectional scroll buttons. |
| **Market Card Row Alignment** | On the live site, placing a two-outcome binary card (Yes/No) adjacent to a multi-candidate election card causes vertical misalignment. Buttons align unevenly and leave awkward empty gaps at the bottom of the cards. | I restructured the card layout architecture using flexbox column layouts with flex-grow outcome wrappers and pinned metric footers. Binary and multi-outcome cards maintain identical heights and bottom alignments across every row. |

---

## 2. Why I Decided Not To Build A Backend

When planning the architecture for this project, I intentionally chose not to build a dedicated backend server. Below are the key engineering and product reasons behind this decision:

### Rapid User Experience and Interface Iteration
My primary goal was to solve the critical visual and usability issues present on the live OpinionMarket landing page. Developing a custom backend at this phase would have introduced database migrations, authentication servers, and API schema maintenance. That overhead would have diverted focus away from perfecting the design system, animations, card alignment, and responsive layouts.

### Deterministic Client State Simulation
By designing a simulated state layer, I was able to model end-to-end user journeys without requiring live banking rails or exchange accounts. Users can test bookmarking markets, placing simulated trades in Nigerian Naira, watching wallet balances update, and viewing probability shifts. This makes the project ideal for user testing and stakeholder demonstrations without server downtime or network flakiness.

### Modular Service Layer Ready for Future API Ingestion
I decoupled the data layer cleanly into dedicated service modules (such as the market service). All market definitions, category structures, and trade execution calculations are encapsulated behind clean service interfaces. When the time comes to connect this landing page to live microservices, WebSocket feeds, or smart contracts, the existing UI components will consume the new endpoints without requiring structural rewrites.

### Zero Operational Overhead and Attack Surface
Without an active backend infrastructure, this application requires no database servers, no API gateway maintenance, and zero server hosting expenses. It can be distributed globally across edge content delivery networks (CDNs) for maximum availability, while completely avoiding server-side vulnerabilities, session hijacking risks, or cold-start penalties.

---

## 3. Technology Stack

- **Framework**: React 19 with TypeScript
- **Bundler & Build Tool**: Vite
- **Styling**: Tailwind CSS with custom CSS design tokens
- **Iconography**: Iconsax React with custom SVG stroke inheritance
- **Typography**: Inter and JetBrains Mono

---

## 4. Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites
- Node.js (version 18 or higher)
- npm package manager

### Installation

Clone the repository and install the project dependencies:

```bash
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173/` to view the application.

### Production Build

To validate TypeScript compilation and generate the production bundle:

```bash
npm run build
```
