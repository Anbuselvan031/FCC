import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Award,
  ArrowLeft,
  Shield,
  Trophy,
  Activity,
  Layers,
  CheckCircle2,
  Share2
} from 'lucide-react';

export default function ScorecardView({ match }) {
  const [activeInningIndex, setActiveInningIndex] = useState(0);

  if (!match) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-white">Match Not Found</h2>
        <Link to="/matches" className="text-orange-400 mt-4 inline-block">Back to Match Center</Link>
      </div>
    );
  }

  const scorecard = match.scorecard;
  const innings = scorecard?.innings || [];
  const currentInning = innings[activeInningIndex] || innings[0];

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/matches"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Match Center</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700">
            ID: #{match.id}
          </span>
        </div>
      </div>

      {/* Match Banner Card */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#10182c] to-[#0a0f1d] border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Top tournament bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-black uppercase tracking-wider">
              {match.tournament}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {match.matchType} ({match.overs} Overs)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-400" />
              {match.date} • {match.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              {match.venue}, {match.city}
            </span>
          </div>
        </div>

        {/* Scores Showcase */}
        <div className="py-8 grid grid-cols-1 md:grid-cols-11 items-center gap-6 text-center md:text-left">
          {/* FCC */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-start gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-orange-600 to-amber-500 flex-shrink-0 shadow-lg shadow-orange-950">
              <img
                src={match.fcc.logo}
                alt={match.fcc.name}
                className="w-full h-full object-cover rounded-full bg-slate-900"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                {match.fcc.name}
              </h2>
              <p className="font-mono text-3xl sm:text-4xl font-black text-orange-400 mt-1">
                {match.fcc.score}
              </p>
            </div>
          </div>

          {/* VS Center */}
          <div className="md:col-span-1 flex flex-col items-center justify-center">
            <span className="font-display text-2xl sm:text-3xl font-black text-slate-600">
              VS
            </span>
          </div>

          {/* Opponent */}
          <div className="md:col-span-5 flex items-center justify-center md:justify-end gap-4 flex-row-reverse md:flex-row text-center md:text-right">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                {match.opponent.name}
              </h2>
              <p className="font-mono text-3xl sm:text-4xl font-black text-slate-300 mt-1">
                {match.opponent.score}
              </p>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-slate-800 border border-slate-700 flex-shrink-0 shadow-lg">
              <img
                src={match.opponent.logo}
                alt={match.opponent.name}
                className="w-full h-full object-cover rounded-full bg-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Result & Summary Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 ${
                match.isWonByFCC === true || match.status === 'WON'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : match.result?.toLowerCase().includes('abandon') || match.isWonByFCC === ''
                  ? 'bg-slate-700/40 text-slate-300 border border-slate-600'
                  : 'bg-red-500/20 text-red-400 border border-red-500/40'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>{match.result}</span>
            </div>
            {scorecard?.toss && (
              <span className="text-xs text-slate-400 hidden sm:inline-block">
                • {scorecard.toss}
              </span>
            )}
          </div>

          {match.playerOfTheMatch && (
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400 uppercase font-semibold">Player of Match:</span>
              <strong className="text-white">{match.playerOfTheMatch.name}</strong>
              <span className="text-amber-400/90 font-mono">({match.playerOfTheMatch.performance})</span>
            </div>
          )}
        </div>
      </div>

      {/* Innings Tabs */}
      {innings.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 w-fit">
            {innings.map((inn, idx) => (
              <button
                key={inn.teamName}
                onClick={() => setActiveInningIndex(idx)}
                className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                  activeInningIndex === idx
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {inn.teamName} ({inn.totalScore})
              </button>
            ))}
          </div>

          {/* Current Inning Scorecard */}
          {currentInning && (
            <div className="space-y-8">
              {/* Batting Card */}
              <div className="rounded-2xl bg-[#0d1424] border border-slate-800/80 shadow-xl overflow-hidden">
                <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                      BATTING SCORECARD — {currentInning.teamName}
                    </h3>
                  </div>
                  <div className="font-mono text-sm font-bold text-orange-400">
                    {currentInning.totalScore} ({currentInning.overs} Ov, RR: {currentInning.runRate})
                  </div>
                </div>

                {/* Batting Table - Responsive Horizontal Scroll */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-800/90 text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-slate-950/40">
                        <th className="py-3.5 px-4 sm:px-6">BATTER</th>
                        <th className="py-3.5 px-4">DISMISSAL</th>
                        <th className="py-3.5 px-4 text-right">R</th>
                        <th className="py-3.5 px-4 text-right">B</th>
                        <th className="py-3.5 px-4 text-right">4s</th>
                        <th className="py-3.5 px-4 text-right">6s</th>
                        <th className="py-3.5 px-4 sm:px-6 text-right">SR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 font-sans">
                      {currentInning.batting?.map((b, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-bold text-white whitespace-nowrap">
                            {b.player}
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
                            {b.dismissal}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-orange-400">
                            {b.runs}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                            {b.balls}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                            {b.fours}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                            {b.sixes}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-right font-mono text-emerald-400 font-semibold">
                            {b.strikeRate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Extras & Fall of Wickets Box */}
                <div className="p-4 sm:p-6 bg-slate-950/50 border-t border-slate-800/80 space-y-3 text-xs text-slate-400">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800/50">
                    <span className="font-bold text-slate-300 uppercase">EXTRAS</span>
                    <span className="font-mono text-slate-200">
                      <strong>{currentInning.extras?.total || 0}</strong> (b {currentInning.extras?.b || 0}, lb {currentInning.extras?.lb || 0}, w {currentInning.extras?.w || 0}, nb {currentInning.extras?.nb || 0})
                    </span>
                  </div>

                  {currentInning.fallOfWickets && (
                    <div>
                      <p className="font-bold text-slate-300 uppercase mb-1">FALL OF WICKETS</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] font-mono">
                        {currentInning.fallOfWickets.map((f, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            <strong className="text-orange-400">{f.score}</strong> ({f.player}, {f.over} ov)
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bowling Card */}
              <div className="rounded-2xl bg-[#0d1424] border border-slate-800/80 shadow-xl overflow-hidden">
                <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                      BOWLING ATTACK
                    </h3>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-800/90 text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-slate-950/40">
                        <th className="py-3.5 px-4 sm:px-6">BOWLER</th>
                        <th className="py-3.5 px-4 text-right">O</th>
                        <th className="py-3.5 px-4 text-right">M</th>
                        <th className="py-3.5 px-4 text-right">R</th>
                        <th className="py-3.5 px-4 text-right">W</th>
                        <th className="py-3.5 px-4 sm:px-6 text-right">ECON</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 font-sans">
                      {currentInning.bowling?.map((bw, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-bold text-white whitespace-nowrap">
                            {bw.bowler}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                            {bw.overs}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                            {bw.maidens}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                            {bw.runs}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400">
                            {bw.wickets}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-right font-mono text-cyan-400 font-semibold">
                            {bw.economy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl bg-[#0d1424] border border-slate-800 text-slate-400">
          <p className="font-display text-xl font-bold uppercase text-white mb-2">
            Detailed Scorecard Archive
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Full ball-by-ball innings sheets are actively maintained for featured championship matches. Recent fixture result: <strong>{match.result}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
