import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      unique: true,
      index: true,
    },
    cricHeroesId: {
      type: mongoose.Schema.Types.Mixed,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Player name is required'],
      trim: true,
    },
    photo: {
      type: String,
      default: 'https://media.cricheroes.in/default/user_profile.png',
    },
    role: {
      type: String,
      default: null,
    },
    battingStyle: {
      type: String,
      default: null,
    },
    bowlingStyle: {
      type: String,
      default: null,
    },
    jerseyNumber: {
      type: String,
      default: null,
    },
    isCaptain: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isPro: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    playerStatement: {
      type: String,
      default: null,
    },
    // CricHeroes tags: Stored exactly as provided (e.g. 'Accumulator', 'Economist', 'Hard Hitter')
    // DO NOT convert into cricket roles
    tags: {
      type: [String],
      default: [],
    },
    stats: {
      matches: { type: mongoose.Schema.Types.Mixed, default: null },
      runs: { type: mongoose.Schema.Types.Mixed, default: null },
      wickets: { type: mongoose.Schema.Types.Mixed, default: null },
      highestScore: { type: mongoose.Schema.Types.Mixed, default: null },
      strikeRate: { type: mongoose.Schema.Types.Mixed, default: null },
      economy: { type: mongoose.Schema.Types.Mixed, default: null },
      average: { type: mongoose.Schema.Types.Mixed, default: null },
      bestBowling: { type: mongoose.Schema.Types.Mixed, default: null },
      fifties: { type: mongoose.Schema.Types.Mixed, default: null },
      centuries: { type: mongoose.Schema.Types.Mixed, default: null },
      fours: { type: mongoose.Schema.Types.Mixed, default: null },
      sixes: { type: mongoose.Schema.Types.Mixed, default: null },
      maidens: { type: mongoose.Schema.Types.Mixed, default: null },
      catches: { type: mongoose.Schema.Types.Mixed, default: null },
      dismissals: { type: mongoose.Schema.Types.Mixed, default: null },
    },
    batting: {
      innings: { type: mongoose.Schema.Types.Mixed, default: null },
      runs: { type: mongoose.Schema.Types.Mixed, default: null },
      highestScore: { type: mongoose.Schema.Types.Mixed, default: null },
      average: { type: mongoose.Schema.Types.Mixed, default: null },
      strikeRate: { type: mongoose.Schema.Types.Mixed, default: null },
      fours: { type: mongoose.Schema.Types.Mixed, default: null },
      sixes: { type: mongoose.Schema.Types.Mixed, default: null },
      fifties: { type: mongoose.Schema.Types.Mixed, default: null },
      centuries: { type: mongoose.Schema.Types.Mixed, default: null },
      ballsFaced: { type: mongoose.Schema.Types.Mixed, default: null },
    },
    bowling: {
      innings: { type: mongoose.Schema.Types.Mixed, default: null },
      wickets: { type: mongoose.Schema.Types.Mixed, default: null },
      overs: { type: mongoose.Schema.Types.Mixed, default: null },
      economy: { type: mongoose.Schema.Types.Mixed, default: null },
      average: { type: mongoose.Schema.Types.Mixed, default: null },
      strikeRate: { type: mongoose.Schema.Types.Mixed, default: null },
      maidens: { type: mongoose.Schema.Types.Mixed, default: null },
      bestBowling: { type: mongoose.Schema.Types.Mixed, default: null },
    },
    fielding: {
      matches: { type: mongoose.Schema.Types.Mixed, default: null },
      dismissals: { type: mongoose.Schema.Types.Mixed, default: null },
      catches: { type: mongoose.Schema.Types.Mixed, default: null },
      caughtBehind: { type: mongoose.Schema.Types.Mixed, default: null },
      runOuts: { type: mongoose.Schema.Types.Mixed, default: null },
      stumpings: { type: mongoose.Schema.Types.Mixed, default: null },
    },
    recentPerformances: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    achievements: {
      type: [String],
      default: [],
    },
    badges: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model('Player', playerSchema);

export default Player;
