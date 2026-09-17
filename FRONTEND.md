# Fahrenheit Cricket Club — Frontend Documentation

Official frontend architecture, technical design, and integration guide for **FAHRENHEIT CRICKET CLUB** (Coimbatore, Est. 24 August 2023, CricHeroes Team ID: `4978895`).

---

## 1. Project Overview

The frontend is a high-performance, responsive single-page web application built with **React, Vite, and Tailwind CSS**. It provides club members, athletes, and fans with authentic, verified match analytics, squad rosters, leaderboards, team history, and an administrative management dashboard.

### Core Principles
- **Strict Data Accuracy**: 100% authentic CricHeroes records. No simulated statistics, fabricated player roles, or guessed playing styles.
- **Null Safety**: Unverified metrics display as `"--"` across all cards, badges, and leaderboards.
- **Decoupled Architecture**: Consumes the Node.js/Express REST backend via a dedicated service layer with resilient local fallbacks.
- **Responsive Sports UI**: Modern dark theme with orange/amber accents, fluid animations, and mobile-first responsiveness.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18 | Declarative UI component architecture |
| **Bundler & Dev Server** | Vite 5 | Fast HMR (Hot Module Replacement) and optimized production builds |
| **Routing** | React Router DOM v6 | Client-side routing with parameter handling |
| **Styling** | Tailwind CSS 3 | Utility-first responsive styling and custom design tokens |
| **Icons** | Lucide React | Clean, scalable cricket and UI iconography |
| **Data Fetching** | Fetch API + Service Layer | Decoupled REST communication with JWT authentication |
| **Package Manager** | pnpm | Fast, deterministic dependency management |

---

## 3. Directory Structure

```
c:/fcc/
├── index.html                   # HTML entrypoint
├── vite.config.js               # Vite build & plugin configuration
├── tailwind.config.js           # Design system tokens (colors, fonts, shadows)
├── postcss.config.js            # PostCSS plugin setup
├── package.json                 # Frontend dependencies & scripts
├── .env.development             # Development environment variables
├── .env.example                 # Template for environment configuration
│
├── src/
│   ├── main.jsx                 # Application entrypoint & DOM mounting
│   ├── App.jsx                  # Master route definitions & layout wrapper
│   ├── index.css                # Global styles, fonts, and Tailwind directives
│   │
│   ├── components/              # Modular UI components
│   │   ├── common/              # Reusable primitives (Navbar, Footer, SearchBar, FilterTabs, StatCard, ScrollToTop)
│   │   ├── home/                # Home page widgets (Hero, RecentForm, QuickStats, StandoutAthletes)
│   │   ├── team/                # Team overview cards, club timeline, and values
│   │   ├── players/             # Player cards, badges, and filter views
│   │   ├── matches/             # Match cards, innings scorecard view, and fixture lists
│   │   ├── leaderboard/         # Podium displays and ranking tables
│   │   ├── stats/               # Categorized club performance cards
│   │   └── gallery/             # Responsive grid, category filters, and image lightbox
│   │
│   ├── pages/                   # Route page views
│   │   ├── HomePage.jsx         # Hero banner, recent matches, standout athletes, quick club stats
│   │   ├── TeamPage.jsx         # Club history, identity, records overview, and verified links
│   │   ├── AboutPage.jsx        # Detailed club constitution, story, and values
│   │   ├── PlayersPage.jsx      # Full squad roster (53 players) with live search and role filters
│   │   ├── PlayerDetailPage.jsx # In-depth career profile, batting/bowling/fielding breakdowns, CricHeroes badges
│   │   ├── MatchesPage.jsx      # Fixtures list (completed, upcoming) and scorecard modal
│   │   ├── MatchDetailPage.jsx  # Ball-by-ball summaries and individual match performances
│   │   ├── LeaderboardPage.jsx  # Dynamic rankings for Batting, Bowling, and Fielding
│   │   ├── StatsPage.jsx        # All-time club statistics and record holders
│   │   ├── GalleryPage.jsx      # Authentic team moments with interactive lightbox
│   │   ├── NotFoundPage.jsx     # Custom 404 handler
│   │   └── admin/               # Administrative Management Portal
│   │       ├── AdminLoginPage.jsx      # JWT-protected login form
│   │       └── AdminDashboardPage.jsx  # Squad, match, stats, and gallery management
│   │
│   ├── services/                # Decoupled Backend API Client Layer
│   │   ├── api.js               # Base HTTP client with Bearer token injection
│   │   ├── authService.js       # Admin authentication & token persistence
│   │   ├── teamService.js       # Team overview and profile API
│   │   ├── playerService.js     # Player roster, search, and CRUD APIs
│   │   ├── matchService.js      # Match fixtures, scorecards, and results APIs
│   │   ├── leaderboardService.js# Batting, bowling, and fielding rankings APIs
│   │   ├── statsService.js      # Cumulative club statistics APIs
│   │   └── galleryService.js    # Club photo upload and retrieval APIs
│   │
│   └── data/                    # Verified fallback records & CricHeroes source datasets
│       ├── teamData.js          # Club profile & dynamic squad count
│       ├── players.js           # 53 verified squad members with full career records
│       ├── playersData.js       # Re-export module
│       ├── matches.js           # Fixtures and verified scorecards
│       ├── matchesData.js       # Re-export module
│       ├── leaderboard.js       # Verified CricHeroes leaderboard standings
│       ├── leaderboardData.js   # Re-export module
│       ├── stats.js             # Cumulative records and milestone holders
│       └── galleryData.js       # Verified team photos uploaded by members
```

---

## 4. Environment Configuration

The frontend dynamically detects the backend API location using Vite environment variables.

### Variables
| Variable | Description | Default | Example |
|---|---|---|---|
| `VITE_API_URL` | Base URL of the backend REST API | `http://localhost:5000/api` | `https://api.fahrenheitcc.com/api` |

### Files
- **`.env.development`**: Used during local development:
  ```env
  VITE_API_URL=http://localhost:5000/api
  ```
- **`.env.example`**: Template for production deployment:
  ```env
  VITE_API_URL=https://your-backend-domain.com/api
  ```

---

## 5. Service Layer & API Integration

All backend communication is centralized in `src/services/`. React components never invoke raw `fetch()` or `axios` calls directly.

### 1. Base API Client (`src/services/api.js`)
- Reads base URL from `import.meta.env.VITE_API_URL`.
- Automatically attaches `Authorization: Bearer <token>` from `localStorage.getItem('fcc_admin_token')`.
- Handles JSON serialization, HTTP status code checks, and descriptive error throwing.

### 2. Domain Services
- **`playerService`**:
  - `getPlayers(params)`: Fetch players with optional `?tag=...` or `?role=...` query.
  - `getPlayerById(id)`: Fetch individual player by CricHeroes ID or Mongo `_id`.
  - `searchPlayers(name)`: Live search query.
  - `createPlayer(data)`, `updatePlayer(id, data)`, `deletePlayer(id)`: Admin CRUD.
- **`teamService`**:
  - `getTeam()`: Fetch official club profile, vision, values, and summary stats.
  - `updateTeam(id, data)`: Admin profile updates.
- **`matchService`**:
  - `getMatches(status)`: Fetch all fixtures or filter by `?status=upcoming`/`completed`.
  - `getMatchById(id)`: Fetch full ball-by-ball scorecard.
  - `createMatch(data)`, `updateMatch(id, data)`, `deleteMatch(id)`: Admin operations.
- **`leaderboardService`**:
  - `getLeaderboard()`, `getBatting()`, `getBowling()`, `getFielding()`.
- **`statsService`**:
  - `getStats()`, `getBattingStats()`, `getBowlingStats()`, `getFieldingStats()`, `getMatchStats()`.
- **`galleryService`**:
  - `getGallery(category)`: Sourced club photos with category filter.
  - `createGalleryItem(data)`, `deleteGalleryItem(id)`: Admin image management.
- **`authService`**:
  - `login(credentials)`: Authenticates admin, stores JWT in `localStorage`.
  - `logout()`: Clears authentication tokens and redirects.
  - `isAuthenticated()`: Boolean check for protected routes.
  - `getCurrentUser()`: Returns parsed admin identity.

### 3. Graceful Fallback Architecture
If the backend API is starting up or temporarily offline during local development, every service method transparently falls back to local verified data (`src/data/`). Users and visitors never experience white screens, broken layouts, or infinite loaders.

---

## 6. Page Routing

All routes are registered in [`src/App.jsx`](file:///c:/fcc/src/App.jsx):

| Route Path | Component | Description | Access |
|---|---|---|---|
| `/` | `HomePage` | Hero banner, recent matches, standout performers, quick club stats | Public |
| `/team` | `TeamPage` | Club origin, records, Coimbatore home turf, verified squad button | Public |
| `/about` | `AboutPage` | Detailed club history, constitution, values, and brotherhood culture | Public |
| `/players` | `PlayersPage` | Complete registered squad (53 players) with live search and role filters | Public |
| `/players/:id` | `PlayerDetailPage` | Deep career profile, batting/bowling/fielding cards, and badges | Public |
| `/matches` | `MatchesPage` | Fixtures center (completed and upcoming matches) | Public |
| `/matches/:id` | `MatchDetailPage` | Complete fixture scorecard and individual performances | Public |
| `/leaderboard` | `LeaderboardPage` | Official CricHeroes top rankings with dynamic metric sorting | Public |
| `/stats` | `StatsPage` | Club records, team milestones, and historical leaderboards | Public |
| `/gallery` | `GalleryPage` | Filterable club moments, match photos, and celebrations | Public |
| `/admin/login` | `AdminLoginPage` | Secure admin login interface | Protected |
| `/admin` | `AdminDashboardPage` | Management dashboard for squad, matches, stats, and gallery | Admin Only |
| `*` | `NotFoundPage` | 404 page for nonexistent routes | Public |

---

## 7. CricHeroes Data Accuracy Rules

1. **No Simulated Numbers**:
   - Every career run, wicket, average, strike rate, and maiden over is sourced directly from CricHeroes match payloads.
   - If a player does not have a recorded metric on CricHeroes, the field is stored as `null` and rendered as `"--"`.
2. **Tags vs. Cricket Roles**:
   - CricHeroes tags (such as `Accumulator`, `Economist`, `Hard Hitter`, `Classicist`, `Wildcard`, `Aspirant`, `Steady Batter`) represent platform gamification tags and are rendered in dedicated amber pill badges.
   - Cricket playing roles (`Batsman`, `Bowler`, `All-Rounder`, `Wicket Keeper`) are strictly derived from official player metadata.
3. **Dynamic Squad Synchronization**:
   - Squad totals across buttons (`VIEW SQUAD (53)`), counters (`Showing 53 of 53`), and stats bars dynamically evaluate from `playersList.length` to eliminate count discrepancies.

---

## 8. Admin Management Portal

The admin portal is private and excluded from public navigation bars:

- **Login Route**: `/admin/login`
- **Dashboard Route**: `/admin`
- **Dashboard Tabs**:
  - **Overview**: System health, live backend API indicator, squad counter, and data rules.
  - **Players**: View all 53 squad members, register new players, and delete players.
  - **Matches**: View match history, record new completed fixtures, and delete fixtures.
  - **Team Stats**: Real-time summary of match records, batting milestones, and bowling figures.
  - **Gallery**: Photo gallery management and image upload.
- **Default Admin Account**:
  - **Email**: `admin@fahrenheitcc.com`
  - **Password**: `FCCAdmin@2026`

---

## 9. Development & Build Commands

All commands run from the root workspace directory (`c:\fcc`):

```bash
# Install frontend dependencies
pnpm install

# Start Vite development server (port 3000)
pnpm run dev

# Run production build (Vite bundling & minification)
pnpm run build

# Preview production build locally
pnpm run preview
```
