import mongoose from 'mongoose';

const playerPerformanceSchema = new mongoose.Schema(
  {
    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player',
    },
    cricHeroesPlayerId: Number,
    playerName: {
      type: String,
      required: true,
    },
    runs: { type: Number, default: null },
    balls: { type: Number, default: null },
    fours: { type: Number, default: null },
    sixes: { type: Number, default: null },
    strikeRate: { type: Number, default: null },
    overs: { type: String, default: null },
    maidens: { type: Number, default: null },
    runsConceded: { type: Number, default: null },
    wickets: { type: Number, default: null },
    economy: { type: Number, default: null },
    catches: { type: Number, default: null },
    runOuts: { type: Number, default: null },
  },
  { _id: false }
);

const matchSchema = new mongoose.Schema(
  {
    matchId: {
      type: Number,
      index: true,
    },
    opponent: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Match opponent is required'],
    },
    teamName: {
      type: String,
      default: 'Fahrenheit Cricket Club',
    },
    date: {
      type: String,
      required: [true, 'Match date is required'],
    },
    venue: {
      type: String,
      default: '',
    },
    tournament: {
      type: String,
      default: '',
    },
    matchType: {
      type: String,
      default: 'Limited Overs',
    },
    overs: {
      type: Number,
      default: 25,
    },
    status: {
      type: String,
      default: 'completed',
    },
    result: {
      type: String,
      default: '',
    },
    isWonByFCC: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    teamScore: {
      type: String,
      default: '',
    },
    opponentScore: {
      type: String,
      default: '',
    },
    winner: {
      type: String,
      default: '',
    },
    margin: {
      type: String,
      default: '',
    },
    toss: {
      type: String,
      default: '',
    },
    playerOfTheMatch: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    scorecard: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    playerPerformances: [playerPerformanceSchema],
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model('Match', matchSchema);

export default Match;
