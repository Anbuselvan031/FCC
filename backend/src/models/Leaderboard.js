import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['batting', 'bowling', 'fielding'],
      index: true,
    },
    metric: {
      type: String,
      default: '',
      index: true,
    },
    rank: {
      type: Number,
      default: 0,
    },
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    cricHeroesPlayerId: {
      type: Number,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default: 'https://media.cricheroes.in/default/user_profile.png',
    },
    role: {
      type: String,
      default: '--',
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    stats: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    season: {
      type: String,
      default: 'All Time',
    },
    tournament: {
      type: String,
      default: 'All Tournaments',
    },
  },
  {
    timestamps: true,
  }
);

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;
