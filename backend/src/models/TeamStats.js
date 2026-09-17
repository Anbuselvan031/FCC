import mongoose from 'mongoose';

const teamStatsSchema = new mongoose.Schema(
  {
    batting: {
      totalRuns: { type: mongoose.Schema.Types.Mixed, default: null },
      highestTeamScore: { type: mongoose.Schema.Types.Mixed, default: null },
      averageTeamScore: { type: mongoose.Schema.Types.Mixed, default: null },
      totalFours: { type: mongoose.Schema.Types.Mixed, default: null },
      totalSixes: { type: mongoose.Schema.Types.Mixed, default: null },
      topRunScorers: { type: [mongoose.Schema.Types.Mixed], default: [] },
      highestScores: { type: [mongoose.Schema.Types.Mixed], default: [] },
      bestBattingAverages: { type: [mongoose.Schema.Types.Mixed], default: [] },
      bestStrikeRates: { type: [mongoose.Schema.Types.Mixed], default: [] },
    },
    bowling: {
      totalWickets: { type: mongoose.Schema.Types.Mixed, default: null },
      bestBowling: { type: mongoose.Schema.Types.Mixed, default: null },
      totalMaidens: { type: mongoose.Schema.Types.Mixed, default: null },
      averageEconomy: { type: mongoose.Schema.Types.Mixed, default: null },
      topWicketTakers: { type: [mongoose.Schema.Types.Mixed], default: [] },
      bestBowlingAverages: { type: [mongoose.Schema.Types.Mixed], default: [] },
      bestEconomyRates: { type: [mongoose.Schema.Types.Mixed], default: [] },
      bestBowlingInnings: { type: [mongoose.Schema.Types.Mixed], default: [] },
    },
    fielding: {
      totalCatches: { type: mongoose.Schema.Types.Mixed, default: null },
      totalRunOuts: { type: mongoose.Schema.Types.Mixed, default: null },
      totalStumpings: { type: mongoose.Schema.Types.Mixed, default: null },
      topFielders: { type: [mongoose.Schema.Types.Mixed], default: [] },
    },
    matchPerformance: {
      matchesPlayed: { type: mongoose.Schema.Types.Mixed, default: 319 },
      wins: { type: mongoose.Schema.Types.Mixed, default: 148 },
      losses: { type: mongoose.Schema.Types.Mixed, default: 162 },
      ties: { type: mongoose.Schema.Types.Mixed, default: 3 },
      noResults: { type: mongoose.Schema.Types.Mixed, default: 4 },
      winRate: { type: mongoose.Schema.Types.Mixed, default: '47.7%' },
      tossWins: { type: mongoose.Schema.Types.Mixed, default: 159 },
      runsScoredByClub: { type: [mongoose.Schema.Types.Mixed], default: [] },
      wicketsByTopPlayers: { type: [mongoose.Schema.Types.Mixed], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

const TeamStats = mongoose.model('TeamStats', teamStatsSchema);

export default TeamStats;
