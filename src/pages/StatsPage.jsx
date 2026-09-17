import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Activity,
  Flame,
  Target,
  Shield,
  Award,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import TeamAnalyticsCharts from '../components/stats/TeamAnalyticsCharts';
import statsData from '../data/statsData';

export default function StatsPage() {
  const overall = statsData.overall || {};
  const batting = statsData.batting || {};
  const bowling = statsData.bowling || {};
  const fielding = statsData.fielding || {};

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-2">
            <Activity className="w-4 h-4 text-orange-500" />
            CLUB PERFORMANCE ANALYTICS
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
            TEAM STATISTICS
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Comprehensive statistical records and match metrics for Fahrenheit Cricket Club, strictly verified on CricHeroes.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-[#0d1424] border border-slate-800 w-fit">
          CricHeroes Team ID: <strong className="text-orange-400">#4978895</strong>
        </div>
      </div>

      {/* 1. TEAM / MATCH PERFORMANCE (Prompt: Separate into Batting, Bowling, Fielding, Team/Match Performance) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-orange-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            TEAM & MATCH PERFORMANCE
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          <StatCard
            title="Total Matches"
            value={overall.totalMatches}
            icon={Trophy}
            accentColor="orange"
            description="319 competitive fixtures"
          />
          <StatCard
            title="Won"
            value={overall.won}
            icon={Award}
            accentColor="emerald"
            description="Confirmed victories"
          />
          <StatCard
            title="Lost"
            value={overall.lost}
            icon={Shield}
            accentColor="crimson"
            description="Challenged encounters"
          />
          <StatCard
            title="Tied / Drawn"
            value={overall.tie !== undefined ? `${overall.tie} / ${overall.drawn}` : '--'}
            icon={Activity}
            accentColor="amber"
            description="Ties & Draws"
          />
          <StatCard
            title="No Result"
            value={overall.noResult}
            icon={Activity}
            accentColor="gold"
            description="Rain / Abandoned"
          />
          <StatCard
            title="Win %"
            value={overall.winPercentage}
            suffix="%"
            icon={TrendingUp}
            accentColor="cyan"
            description="CricHeroes Win Efficiency"
          />
          <StatCard
            title="Toss Won"
            value={overall.tossWon}
            icon={Flame}
            accentColor="orange"
            description={`Bat ${overall.batFirst} • Bowl ${overall.fieldFirst}`}
          />
        </div>
      </div>

      {/* 2. VISUAL TEAM ANALYTICS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            VISUAL TEAM ANALYTICS
          </h2>
        </div>

        <TeamAnalyticsCharts />
      </div>

      {/* 3. BATTING STATISTICS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            BATTING STATISTICS
          </h2>
        </div>

        {/* Batting Milestones Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">HIGHEST SCORE</span>
            <p className="font-mono text-sm sm:text-base font-black text-orange-400 mt-1">{batting.highestScore || '--'}</p>
            <span className="text-[9px] text-slate-500 font-mono">Verified Team Total</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">LOWEST SCORE</span>
            <p className="font-mono text-sm sm:text-base font-black text-slate-400 mt-1">{batting.lowestScore || '--'}</p>
            <span className="text-[9px] text-slate-500 font-mono">Verified Team Total</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">AVERAGE SCORE</span>
            <p className="font-mono text-sm sm:text-base font-black text-slate-400 mt-1">{batting.averageScore || '--'}</p>
            <span className="text-[9px] text-slate-500 font-mono">Runs / Innings</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL FOURS</span>
            <p className="font-mono text-sm sm:text-base font-black text-slate-400 mt-1">{batting.totalFours || '--'}</p>
            <span className="text-[9px] text-slate-500 font-mono">Boundaries</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL SIXES</span>
            <p className="font-mono text-sm sm:text-base font-black text-slate-400 mt-1">{batting.totalSixes || '--'}</p>
            <span className="text-[9px] text-slate-500 font-mono">Maximums</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL 50s</span>
            <p className="font-mono text-sm sm:text-base font-black text-slate-400 mt-1">{batting.totalFifties || '--'}</p>
            <span className="text-[9px] text-slate-500 font-mono">Half Centuries</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL 100s</span>
            <p className="font-mono text-sm sm:text-base font-black text-slate-400 mt-1">{batting.totalCenturies || '--'}</p>
            <span className="text-[9px] text-slate-500 font-mono">Centuries</span>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL RUNS</span>
            <p className="font-mono text-sm sm:text-base font-black text-orange-400 mt-1">{batting.totalRuns || '--'}</p>
            <span className="text-[9px] text-slate-500 font-mono">Team Cumulative</span>
          </div>
        </div>

        {/* Top Batters Table */}
        <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold uppercase text-white">TOP BATTERS LEADERBOARD</h3>
            <Link to="/leaderboard" className="text-xs font-bold uppercase text-orange-400 hover:text-orange-300 flex items-center gap-1">
              Full Standings <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-2.5 px-3">RANK</th>
                  <th className="py-2.5 px-4">BATTER</th>
                  <th className="py-2.5 px-4 text-right">RUNS</th>
                  <th className="py-2.5 px-4 text-right">AVG</th>
                  <th className="py-2.5 px-4 text-right">SR</th>
                  <th className="py-2.5 px-4 text-right">HS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {batting.topBatters?.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-mono font-bold text-slate-400">#{b.rank}</td>
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      <Link to={`/players/${b.id}`} className="hover:text-orange-400 transition-colors">
                        {b.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-orange-400">{b.runs?.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-300">{b.average}</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-400">{b.strikeRate}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-200">{b.highestScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. BOWLING STATISTICS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            BOWLING STATISTICS
          </h2>
        </div>

        {/* Bowling Milestones */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL WICKETS</span>
            <p className="font-mono text-xl font-black text-amber-400 mt-1">{bowling.totalWickets || '--'}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL OVERS</span>
            <p className="font-mono text-xl font-black text-slate-400 mt-1">{bowling.totalOvers || '--'}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">RUNS CONCEDED</span>
            <p className="font-mono text-xl font-black text-slate-400 mt-1">{bowling.runsConceded || '--'}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TEAM ECONOMY</span>
            <p className="font-mono text-xl font-black text-slate-400 mt-1">{bowling.teamEconomy || '--'}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">BEST BOWLING</span>
            <p className="font-mono text-base font-black text-slate-400 mt-1 truncate">{bowling.bestBowlingFigures || '--'}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL MAIDENS</span>
            <p className="font-mono text-xl font-black text-slate-400 mt-1">{bowling.totalMaidens || '--'}</p>
          </div>
        </div>

        {/* Top Bowlers Table */}
        <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold uppercase text-white">TOP BOWLERS LEADERBOARD</h3>
            <Link to="/leaderboard" className="text-xs font-bold uppercase text-amber-400 hover:text-amber-300 flex items-center gap-1">
              Full Standings <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px]">
                  <th className="py-2.5 px-3">RANK</th>
                  <th className="py-2.5 px-4">BOWLER</th>
                  <th className="py-2.5 px-4 text-right">WICKETS</th>
                  <th className="py-2.5 px-4 text-right">OVERS</th>
                  <th className="py-2.5 px-4 text-right">ECON</th>
                  <th className="py-2.5 px-4 text-right">AVG</th>
                  <th className="py-2.5 px-4 text-right">BEST</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {bowling.topBowlers?.map((bw) => (
                  <tr key={bw.id} className="hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-mono font-bold text-slate-400">#{bw.rank}</td>
                    <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                      <Link to={`/players/${bw.id}`} className="hover:text-amber-400 transition-colors">
                        {bw.name}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-amber-400">{bw.wickets}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-300">{bw.overs}</td>
                    <td className="py-3 px-4 text-right font-mono text-cyan-400">{bw.economy}</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-300">{bw.average}</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-400">{bw.bestBowling}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 5. FIELDING STATISTICS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            FIELDING STATISTICS
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL CATCHES</span>
            <p className="font-mono text-xl font-black text-slate-400 mt-1">{fielding.totalCatches || '--'}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL RUN OUTS</span>
            <p className="font-mono text-xl font-black text-slate-400 mt-1">{fielding.totalRunOuts || '--'}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL STUMPINGS</span>
            <p className="font-mono text-xl font-black text-slate-400 mt-1">{fielding.totalStumpings || '--'}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL DISMISSALS</span>
            <p className="font-mono text-xl font-black text-slate-400 mt-1">{fielding.totalDismissals || '--'}</p>
          </div>
        </div>

        {/* Top Fielders */}
        <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800">
          <h3 className="font-display text-lg font-bold uppercase text-white mb-4">GOLDEN GLOVES & SAFE HANDS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fielding.topFielders?.map((f) => (
              <div key={f.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-400">#{f.rank}</span>
                <h4 className="font-bold text-white truncate">{f.name}</h4>
                <p className="font-display text-xl font-bold text-emerald-400">{f.dismissals} Dismissals</p>
                <p className="text-[10px] text-slate-400">({f.catches} catches, {f.stumpings} stumpings)</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
