# Fahrenheit Cricket Club — Backend Documentation

Official backend architecture, REST API reference, database design, and deployment guide for **FAHRENHEIT CRICKET CLUB** (Coimbatore, Est. 24 August 2023, CricHeroes Team ID: `4978895`).

---

## 1. Project Overview

The backend is a robust RESTful API service built with **Node.js, Express.js, and MongoDB Atlas (via Mongoose)**. It serves as the centralized, authoritative data layer for Fahrenheit Cricket Club, handling squad rosters, match scorecards, player performances, leaderboard rankings, cumulative team statistics, club photos, and secure administrative authentication.

### Core Principles
- **Strict Data Accuracy**: 100% authentic CricHeroes statistics. Never generate random or simulated cricket numbers.
- **Null Safety**: Unverified metrics are stored as `null` in MongoDB and rendered as `"--"` on the frontend.
- **Separation of Concerns**: Built using strict MVC (Model-View-Controller) architecture.
- **Relational Integrity**: Uses Mongoose ObjectId references (`ref: 'Player'`) in match scorecards and leaderboard rankings to prevent duplicate player entries.
- **Zero-Downtime Resilience**: Controllers detect MongoDB connection state and provide verified fallbacks during initial setup or maintenance.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js (v18+) | Server-side JavaScript execution (ES Modules) |
| **Framework** | Express.js 4 | HTTP routing, middleware pipeline, and REST API controllers |
| **Database** | MongoDB Atlas | Cloud-hosted NoSQL document database |
| **ODM** | Mongoose 8 | Schema modeling, validation, and relational population |
| **Authentication** | JSON Web Tokens (jsonwebtoken) | Stateless Bearer token authentication for admin operations |
| **Security** | bcryptjs | Salt generation and cryptographic password hashing (10 rounds) |
| **CORS** | cors | Cross-Origin Resource Sharing for frontend access |
| **Environment** | dotenv | Secure local environment variable management |
| **Dev Tools** | nodemon | Automatic server restarts on code changes |

---

## 3. Directory Structure

All backend code resides in the isolated [`backend/`](file:///c:/fcc/backend/) directory:

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas connection with retry logic & buffer control
│   │
│   ├── models/                   # 7 Mongoose Schemas
│   │   ├── Team.js               # Club profile, identity, vision, values, and social links
│   │   ├── Player.js             # 53 verified squad members, career stats, and badges
│   │   ├── Match.js              # Fixtures, scorecards, and player performance refs
│   │   ├── Leaderboard.js        # Batting, bowling, and fielding rankings
│   │   ├── TeamStats.js          # Cumulative match records and club milestones
│   │   ├── Gallery.js            # Club photo moments and categories
│   │   └── Admin.js              # Admin credentials with bcrypt pre-save hash hook
│   │
│   ├── controllers/              # Request handlers with standardized response formats
│   │   ├── teamController.js     # Team profile retrieval and updates
│   │   ├── playerController.js   # Player list, search, ID lookup, and CRUD
│   │   ├── matchController.js    # Fixtures, completed matches, scorecards, and CRUD
│   │   ├── leaderboardController.js # Batting, bowling, and fielding rankings
│   │   ├── statsController.js    # Club performance metrics and category breakdowns
│   │   ├── galleryController.js  # Gallery retrieval and image upload/delete
│   │   └── authController.js     # Admin registration, login, and profile check
│   │
│   ├── routes/                   # REST endpoint route definitions
│   │   ├── teamRoutes.js         # /api/team
│   │   ├── playerRoutes.js       # /api/players
│   │   ├── matchRoutes.js        # /api/matches
│   │   ├── leaderboardRoutes.js  # /api/leaderboard
│   │   ├── statsRoutes.js        # /api/stats
│   │   ├── galleryRoutes.js      # /api/gallery
│   │   └── authRoutes.js         # /api/auth
│   │
│   ├── middleware/               # Middleware pipeline
│   │   ├── authMiddleware.js     # Bearer token validation and admin verification
│   │   └── errorMiddleware.js    # 404 handler & centralized 500 JSON error formatter
│   │
│   ├── utils/                    # Helper utilities
│   │   └── generateToken.js      # Signs JWT with admin ID and 30-day expiration
│   │
│   ├── scripts/                  # Automation and test scripts
│   │   ├── seed.js               # Populates MongoDB Atlas with 53 players & club data
│   │   └── testEndpoints.js      # Automated endpoint tester (18/18 tests passing)
│   │
│   └── server.js                 # Express application entrypoint
│
├── .env                          # Local environment secrets (ignored by Git)
├── .env.example                  # Template configuration for deployment
├── .gitignore                    # Git ignore file for secrets and node_modules
├── package.json                  # Backend dependencies and scripts
└── README.md                     # Backend setup guide
```

---

## 4. Environment Configuration

Backend configuration is loaded via `backend/.env`.

### Variables
| Variable | Description | Required | Example |
|---|---|---|---|
| `PORT` | Server listening port | No (Default: 5000) | `5000` |
| `NODE_ENV` | Runtime environment | No (Default: development) | `development` / `production` |
| `MONGO_URI` | MongoDB connection string | Yes | `mongodb+srv://<user>:<pwd>@cluster0.mongodb.net/fahrenheit_cricket?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for signing tokens | Yes | `fcc_fahrenheit_cricket_club_secret_key_2026_jwt_auth` |
| `FRONTEND_URL` | Permitted CORS frontend origin | No (Default: localhost:3000) | `http://localhost:3000` |

### Sample `.env`
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://admin:FCCAdmin2026@cluster0.cricket.mongodb.net/fahrenheit_cricket?retryWrites=true&w=majority
JWT_SECRET=fcc_fahrenheit_cricket_club_secret_key_2026_jwt_auth
FRONTEND_URL=http://localhost:3000
```

---

## 5. Database Design & Mongoose Models

### 1. Team Model (`models/Team.js`)
Stores official Fahrenheit Cricket Club identity and history.
```javascript
{
  name: "Fahrenheit Cricket Club",
  location: "Coimbatore",
  establishedDate: "2023-08-24",
  cricheroesTeamId: "4978895",
  logo: "/logo.png",
  coverImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e...",
  description: "Fahrenheit Cricket Club is a premier competitive cricket team...",
  vision: "To compete at the highest standards of club cricket...",
  values: ["Passion", "Performance", "Brotherhood", "Integrity", "Discipline"],
  socialLinks: {
    cricheroes: "https://cricheroes.com/team-profile/4978895/fahrenheit-cricket-club",
    instagram: "",
    youtube: "",
    facebook: ""
  },
  statsSummary: { matchesPlayed: 319, won: 148, lost: 162, winRate: "47.7%" }
}
```

### 2. Player Model (`models/Player.js`)
Stores single source of truth for all registered players.
```javascript
{
  id: 21685780,                     // Numeric CricHeroes ID (unique)
  cricHeroesId: 21685780,
  name: "Vicky",
  photo: "https://media.cricheroes.in/user_profile/...",
  role: "All-Rounder",              // null if unverified
  battingStyle: "Right Handed Bat", // null if unverified
  bowlingStyle: "Right-arm Off Break", // null if unverified
  jerseyNumber: null,
  isCaptain: true,
  isAdmin: true,
  isPro: true,
  dob: "31-Jul-1995",
  location: "Coimbatore",
  tags: ["Accumulator", "Economist"], // CricHeroes tags preserved as array
  stats: {
    matches: 348,
    runs: 4142,
    wickets: 379,
    highestScore: "55*",
    strikeRate: 77.65,
    economy: 6.31,
    average: 11.77,
    bestBowling: "4 wkts",
    fifties: 1,
    centuries: 0,
    maidens: 32,
    catches: 85,
    dismissals: 104
  },
  batting: { innings: 348, runs: 4142, highestScore: "55*", average: 11.77, strikeRate: 77.65, fours: 315, sixes: 71, fifties: 1, centuries: 0 },
  bowling: { innings: 348, wickets: 379, overs: "1334.3", economy: 6.31, average: 22.18, strikeRate: 21.13, maidens: 32, bestBowling: "4 wkts" },
  fielding: { matches: 348, dismissals: 104, catches: 85, caughtBehind: 0, runOuts: 19, stumpings: 0 },
  achievements: ["Leading Club Captain", "379 Career Wickets"],
  badges: [{ name: "Accumulator", count: 42, icon: "..." }],
  isActive: true
}
```

### 3. Match Model (`models/Match.js`)
Stores fixtures, outcomes, and ball-by-ball performances referencing player records.
```javascript
{
  matchId: 101,
  opponent: "Green Valley CC",
  teamName: "Fahrenheit Cricket Club",
  date: "2026-03-08",
  venue: "Coimbatore Cricket Ground",
  tournament: "Coimbatore Club Championship",
  overs: 25,
  status: "completed",              // 'completed', 'upcoming', 'abandoned'
  result: "Fahrenheit Cricket Club won by 28 runs",
  isWonByFCC: true,
  teamScore: "182/6 (25.0 ov)",
  opponentScore: "154/9 (25.0 ov)",
  winner: "Fahrenheit Cricket Club",
  margin: "28 runs",
  toss: "Fahrenheit CC won the toss and elected to bat",
  playerOfTheMatch: "Vicky",
  playerPerformances: [
    {
      playerId: ObjectId("..."),    // References Player collection
      cricHeroesPlayerId: 21685780,
      playerName: "Vicky",
      runs: 48,
      balls: 32,
      fours: 5,
      sixes: 2,
      strikeRate: 150.0,
      overs: "4.0",
      maidens: 1,
      runsConceded: 18,
      wickets: 3,
      economy: 4.5
    }
  ]
}
```

### 4. Admin Model (`models/Admin.js`)
Stores authenticated administrative accounts.
```javascript
{
  username: "admin",
  email: "admin@fahrenheitcc.com",
  password: "$2a$10$e8wE5WpQ...",     // Hashed via bcrypt (10 rounds)
  role: "admin"
}
```

---

## 6. Complete API Reference

Standardized response envelope across all endpoints:
```json
// Success Response (HTTP 200 / 201)
{
  "success": true,
  "message": "Operation description",
  "count": 53,
  "data": ...
}

// Error Response (HTTP 400 / 401 / 404 / 500)
{
  "success": false,
  "message": "Error description"
}
```

### 1. Public Endpoints
| Method | Route | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/health` | System health check | None |
| `GET` | `/api/team` | Team profile and club details | None |
| `GET` | `/api/players` | Complete squad list | `?tag=Hard%20Hitter`, `?role=All-Rounder` |
| `GET` | `/api/players/search` | Search players by name | `?name=Vicky` |
| `GET` | `/api/players/:id` | Get player by CricHeroes ID or Mongo `_id` | Path `:id` |
| `GET` | `/api/matches` | All matches or filtered by status | `?status=completed`, `?status=upcoming` |
| `GET` | `/api/matches/:id` | Single match details and scorecard | Path `:id` |
| `GET` | `/api/leaderboard` | Full leaderboard (batting, bowling, fielding) | `?category=batting`, `?season=2026` |
| `GET` | `/api/leaderboard/batting` | Batting rankings | None |
| `GET` | `/api/leaderboard/bowling` | Bowling rankings | None |
| `GET` | `/api/leaderboard/fielding` | Fielding rankings | None |
| `GET` | `/api/stats` | Team stats & records | None |
| `GET` | `/api/stats/batting` | Batting records breakdown | None |
| `GET` | `/api/stats/bowling` | Bowling records breakdown | None |
| `GET` | `/api/stats/fielding` | Fielding records breakdown | None |
| `GET` | `/api/stats/matches` | Match performance record | None |
| `GET` | `/api/gallery` | Club photos | `?category=Matches`, `?category=Team` |

### 2. Authentication Endpoints
| Method | Route | Description | Request Body | Access |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Register new admin account | `{ username, email, password }` | Public |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT | `{ email, password }` | Public |
| `GET` | `/api/auth/me` | Current authenticated admin profile | None | Protected |

### 3. Protected Administrative Endpoints (Require `Authorization: Bearer <token>`)
| Method | Route | Description | Request Body |
|---|---|---|---|
| `PUT` | `/api/team/:id` | Update team profile information | Team object |
| `POST` | `/api/players` | Add new player to squad | Player object (validates non-negative stats) |
| `PUT` | `/api/players/:id` | Update player information | Partial player updates |
| `DELETE` | `/api/players/:id` | Delete player from roster | None |
| `POST` | `/api/matches` | Record new match fixture | Match object with scorecard |
| `PUT` | `/api/matches/:id` | Update match scorecard | Partial match updates |
| `DELETE` | `/api/matches/:id` | Delete match record | None |
| `POST` | `/api/leaderboard` | Add ranking entry | Leaderboard object |
| `PUT` | `/api/leaderboard/:id` | Update ranking entry | Partial ranking updates |
| `DELETE` | `/api/leaderboard/:id` | Delete ranking entry | None |
| `POST` | `/api/stats` | Create team stats | TeamStats object |
| `PUT` | `/api/stats/:id` | Update team stats | Partial stats updates |
| `POST` | `/api/gallery` | Upload photo item | `{ title, imageUrl, category }` |
| `DELETE` | `/api/gallery/:id` | Delete photo item | None |

---

## 7. Authentication & Security Pipeline

1. **Password Hashing**: Passwords undergo pre-save hashing using `bcryptjs` with salt round factor 10. Plain-text passwords are never stored in MongoDB.
2. **JWT Signing**: Tokens are signed using `HS256` algorithm with `JWT_SECRET` and expire in 30 days.
3. **Middleware Guard**: `authMiddleware.js` extracts the Bearer token from the `Authorization` header, verifies its cryptographic signature, queries the `Admin` model, and attaches the sanitized user object to `req.admin`. Invalid or absent tokens immediately return `401 Unauthorized`.
4. **Validation Guard**: Controllers reject negative values for `runs`, `wickets`, `catches`, `matches`, `sixes`, and `fours`.

---

## 8. Database Seeding (`pnpm run seed`)

The seed script (`backend/src/scripts/seed.js`) automatically seeds MongoDB Atlas with the verified Fahrenheit Cricket Club records:

```bash
cd backend
pnpm run seed
```

**Actions Performed**:
1. Connects to `MONGO_URI`.
2. Loads verified records from `src/data/` (Team profile, 53 players, matches, leaderboard, team stats, gallery photos).
3. Clears existing collections to prevent duplicates.
4. Inserts 53 players and maps numeric CricHeroes IDs to MongoDB `ObjectId`s.
5. Inserts matches with relational player performance references.
6. Inserts batting, bowling, and fielding leaderboard standings.
7. Inserts aggregate team performance statistics.
8. Creates the default admin account:
   - **Email**: `admin@fahrenheitcc.com`
   - **Password**: `FCCAdmin@2026`

---

## 9. Automated Testing (`pnpm test`)

The test suite (`backend/src/scripts/testEndpoints.js`) executes 18 automated integration tests:

```bash
cd backend
pnpm test
```

**Test Coverage**:
- Public endpoints (`/api/health`, `/api/team`, `/api/players`, `/api/matches`, `/api/leaderboard`, `/api/stats`, `/api/gallery`).
- Query filtering (`?tag=...`, `?status=completed`, `?name=Vicky`).
- Player ID lookups.
- Admin login with credentials and JWT retrieval.
- Authenticated profile verification (`GET /api/auth/me`).
- Unauthenticated rejection check (`HTTP 401` on protected routes).

---

## 10. Production Deployment

### 1. MongoDB Atlas Setup
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user with read/write access.
3. Whitelist your deployment server's IP address (or `0.0.0.0/0` for cloud platforms like Render/Railway).
4. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/fahrenheit_cricket?retryWrites=true&w=majority
   ```

### 2. Environment Variables on Host
Set the following environment variables in your hosting provider (e.g. Render, Railway, Vercel, AWS):
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/fahrenheit_cricket?retryWrites=true&w=majority
JWT_SECRET=your_production_secure_secret_key_2026
FRONTEND_URL=https://your-frontend-domain.com
```

### 3. Start Command
```bash
pnpm start
```
