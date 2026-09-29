import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

// Route imports
import teamRoutes from './routes/teamRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Middleware imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables reliably from backend/.env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to MongoDB Atlas
connectDB();

const app = express();

// CORS configuration - support both development and production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev to ensure smooth frontend connection
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Health & Info Check
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fahrenheit Cricket Club REST API is running',
    version: '1.0.0',
    endpoints: {
      team: '/api/team',
      players: '/api/players',
      matches: '/api/matches',
      leaderboard: '/api/leaderboard',
      stats: '/api/stats',
      gallery: '/api/gallery',
      auth: '/api/auth',
    },
  });
});

app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const stateLabels = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.status(200).json({
    success: true,
    status: 'healthy',
    database: {
      status: stateLabels[dbState] || 'unknown',
      connected: dbState === 1,
      host: mongoose.connection.host || null,
      name: mongoose.connection.name || null,
    },
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/team', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/auth', authRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Fahrenheit Cricket Club Backend API running on port ${PORT}`);
  console.log(`📡 Base API URL: http://localhost:${PORT}/api`);
});

export default app;
