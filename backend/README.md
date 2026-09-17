# Fahrenheit Cricket Club — Backend REST API

Official backend service for **FAHRENHEIT CRICKET CLUB** (Coimbatore, Est. 24 August 2023, CricHeroes Team ID: `4978895`).

Built with **Node.js, Express.js, MongoDB Atlas (Mongoose), JWT, and bcryptjs**.

---

## 1. Features
- **Strict Data Accuracy**: 100% verified CricHeroes statistics. Unverified metrics remain `null` (displayed as `"--"` on frontend).
- **Authentication**: JWT-based Admin authentication with hashed passwords via bcryptjs.
- **RESTful Endpoints**: Dedicated routes for Team, Players, Matches, Leaderboard, Team Stats, Gallery, and Auth.
- **Data Seeding**: One-command seed script to populate MongoDB Atlas with verified squad rosters and match records.
- **Security & Validation**: Protected admin routes, CORS configuration, centralized error handling, and input validation.

---

## 2. Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas Mongoose connection
│   ├── models/                   # Mongoose schemas
│   │   ├── Team.js
│   │   ├── Player.js
│   │   ├── Match.js
│   │   ├── Leaderboard.js
│   │   ├── TeamStats.js
│   │   ├── Gallery.js
│   │   └── Admin.js
│   ├── controllers/              # Request handlers
│   │   ├── teamController.js
│   │   ├── playerController.js
│   │   ├── matchController.js
│   │   ├── leaderboardController.js
│   │   ├── statsController.js
│   │   ├── galleryController.js
│   │   └── authController.js
│   ├── routes/                   # Route definitions
│   │   ├── teamRoutes.js
│   │   ├── playerRoutes.js
│   │   ├── matchRoutes.js
│   │   ├── leaderboardRoutes.js
│   │   ├── statsRoutes.js
│   │   ├── galleryRoutes.js
│   │   └── authRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js     # Bearer JWT verification
│   │   └── errorMiddleware.js    # 404 & centralized error handler
│   ├── utils/
│   │   └── generateToken.js      # JWT signing helper
│   ├── scripts/
│   │   ├── seed.js               # Database seeder
│   │   └── testEndpoints.js      # Automated endpoint tester
│   └── server.js                 # Express application entrypoint
├── .env                          # Secret environment variables (ignored by Git)
├── .env.example                  # Template configuration
├── .gitignore
├── package.json
└── README.md
```

---

## 3. Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm or npm
- MongoDB Atlas cluster or local MongoDB instance

### Installation
```bash
cd backend
pnpm install
```

### Environment Configuration
Copy `.env.example` to `.env` and fill in your connection values:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/fahrenheit_cricket?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:3000
```

### Database Seeding
To seed MongoDB with all verified Fahrenheit Cricket Club data (Team, 53 players, matches, leaderboard, team stats, gallery, default admin):
```bash
pnpm run seed
```

### Running the Server
```bash
# Production mode
pnpm start

# Development mode with hot-reload
pnpm run dev
```
The server will start at `http://localhost:5000/api`.

---

## 4. API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/team` | Get official team profile and overview |
| `GET` | `/api/players` | Get all registered squad players |
| `GET` | `/api/players?tag=Hard%20Hitter` | Filter players by CricHeroes tag |
| `GET` | `/api/players/search?name=Vicky` | Search players by name |
| `GET` | `/api/players/:id` | Get player by CricHeroes ID or MongoDB `_id` |
| `GET` | `/api/matches` | Get all matches |
| `GET` | `/api/matches?status=completed` | Get completed fixtures |
| `GET` | `/api/matches?status=upcoming` | Get upcoming matches |
| `GET` | `/api/matches/:id` | Get match scorecard & performances |
| `GET` | `/api/leaderboard` | Get complete rankings (batting, bowling, fielding) |
| `GET` | `/api/leaderboard/batting` | Get batting leaderboard |
| `GET` | `/api/leaderboard/bowling` | Get bowling leaderboard |
| `GET` | `/api/leaderboard/fielding` | Get fielding leaderboard |
| `GET` | `/api/stats` | Get team statistical records |
| `GET` | `/api/gallery` | Get gallery photos (supports `?category=Matches`) |

### Authentication & Admin Endpoints (Require `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Initial admin account setup |
| `POST` | `/api/auth/login` | Login and receive JWT token |
| `GET` | `/api/auth/me` | Get currently logged-in admin profile |
| `POST` | `/api/players` | Add new player to squad |
| `PUT` | `/api/players/:id` | Update player information & statistics |
| `DELETE` | `/api/players/:id` | Remove player from squad |
| `POST` | `/api/matches` | Add new match record |
| `PUT` | `/api/matches/:id` | Update match scorecard |
| `DELETE` | `/api/matches/:id` | Delete match record |
| `POST` | `/api/gallery` | Upload gallery image metadata |
| `DELETE` | `/api/gallery/:id` | Remove gallery photo |
| `PUT` | `/api/team/:id` | Update team profile details |
| `PUT` | `/api/stats/:id` | Update aggregate team statistics |

---

## 5. Default Admin Credentials (Seed)
- **Email**: `admin@fahrenheitcc.com`
- **Password**: `FCCAdmin@2026`

---

## 6. Testing the API
Run the automated endpoint test suite:
```bash
pnpm test
```
