import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, MapPin, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import matchesData from '../../data/matchesData';

export default function LatestMatchCard() {
  // Get latest completed match (e.g., match vs Arrow CC or The Curse XI)
  const completedMatches = matchesData.filter((m) => m.type === 'completed');
  const latest = completedMatches.find(m => m.id === 26915432) || completedMatches[0];

  if (!latest) {
    return (
      <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
        No completed match available yet.
      </div>
    );
  }

  const isWin = latest.isWonByFCC;

  return (
    <div className="relative rounded-2xl bg-[#0d1424]/90 border border-slate-700/70 p-6 sm:p-8 shadow-2xl shadow-black/60 overflow-hidden group shine-sweep transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/50 hover:shadow-orange-500/10">
      {/* Dynamic top gradient bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          isWin
            ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500'
            : 'bg-gradient-to-r from-orange-500 to-amber-500'
        }`}
      />

      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30 text-xs font-extrabold uppercase tracking-wider">
            {latest.tournament}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {latest.overs} Overs Match
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            {latest.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            {latest.venue}
          </span>
        </div>
      </div>

      {/* Teams and Scores Showcase */}
      <div className="py-6 sm:py-8 flex items-center justify-between gap-3 sm:gap-5">
        {/* FCC (Home) */}
        <div className="flex-1 min-w-0 flex items-center gap-3 sm:gap-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex-shrink-0 shadow-lg shadow-orange-950/70 transition-transform duration-300 group-hover:scale-105">
            <img
              src={latest.fcc.logo}
              alt={latest.fcc.name}
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                HOME
              </span>
            </div>
            <h3
              className="font-display text-base sm:text-lg font-bold tracking-wide text-white uppercase truncate group-hover:text-orange-400 transition-colors leading-snug"
              title={latest.fcc.name}
            >
              {latest.fcc.name}
            </h3>
            <div className="font-mono text-2xl sm:text-3xl font-black text-orange-400 tracking-tight">
              {latest.fcc.score}
            </div>
          </div>
        </div>

        {/* VS / Badge Center */}
        <div className="flex-shrink-0 px-2 sm:px-4 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#080d18] border border-slate-700/80 flex items-center justify-center shadow-xl shadow-black/80 transition-all duration-300 group-hover:border-orange-500/60 group-hover:scale-110">
            <span className="font-display text-xs font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-300 tracking-wider">
              VS
            </span>
          </div>
        </div>

        {/* Opponent (Away) */}
        <div className="flex-1 min-w-0 flex items-center justify-end gap-3 sm:gap-4 text-right">
          <div className="min-w-0 flex-1 space-y-0.5">
            <div className="flex items-center justify-end gap-1.5 mb-1">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-extrabold uppercase tracking-wider">
                AWAY
              </span>
            </div>
            <h3
              className="font-display text-base sm:text-lg font-bold tracking-wide text-white uppercase truncate group-hover:text-slate-200 transition-colors leading-snug"
              title={latest.opponent.name}
            >
              {latest.opponent.name}
            </h3>
            <div className="font-mono text-2xl sm:text-3xl font-black text-slate-300 tracking-tight">
              {latest.opponent.score}
            </div>
          </div>
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 bg-slate-800 border border-slate-700 flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-105">
            <img
              src={latest.opponent.logo}
              alt={latest.opponent.name}
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Player of the Match Feature Banner */}
      {latest.playerOfTheMatch && (
        <div className="mb-5 px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px] flex-shrink-0">
              Player of the Match:
            </span>
            <strong className="text-white font-semibold truncate">
              {latest.playerOfTheMatch.name}
            </strong>
          </div>
          <span className="text-amber-400/90 font-mono text-[11px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 whitespace-nowrap">
            {latest.playerOfTheMatch.performance}
          </span>
        </div>
      )}

      {/* Result Banner & Action Button */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Result Badge */}
        <div
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start ${
            isWin
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-950'
              : 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-md shadow-red-950'
          }`}
        >
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>{latest.result}</span>
        </div>

        {/* Action Button */}
        <Link
          to={`/matches/${latest.id}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white bg-slate-800 hover:bg-orange-500 border border-slate-700 hover:border-orange-400 transition-all duration-200 shadow-md group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-500 group/btn"
        >
          <span>View Full Scorecard</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
}
