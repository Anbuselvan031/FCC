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
      <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-11 items-center gap-6">
        {/* FCC */}
        <div className="md:col-span-5 flex items-center gap-4 sm:gap-5">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex-shrink-0 shadow-lg shadow-orange-950 transition-transform duration-300 group-hover:scale-105">
            <img
              src={latest.fcc.logo}
              alt={latest.fcc.name}
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white uppercase group-hover:text-orange-400 transition-colors">
                {latest.fcc.name}
              </h3>
              <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold">
                HOME
              </span>
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-orange-400 tracking-tight">
              {latest.fcc.score}
            </div>
          </div>
        </div>

        {/* VS / Badge Center */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <span className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-display font-bold text-slate-400 transition-transform duration-300 group-hover:rotate-12 group-hover:border-orange-500/40">
            VS
          </span>
        </div>

        {/* Opponent */}
        <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-4 sm:gap-5 flex-row-reverse md:flex-row text-left md:text-right">
          <div className="space-y-1">
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white uppercase group-hover:text-slate-200 transition-colors">
              {latest.opponent.name}
            </h3>
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-slate-300 tracking-tight">
              {latest.opponent.score}
            </div>
          </div>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-slate-800 border border-slate-700 flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-105">
            <img
              src={latest.opponent.logo}
              alt={latest.opponent.name}
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Result Banner & Player of the Match */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Result Badge */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-widest flex items-center gap-2 ${
              isWin
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-950'
                : 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-md shadow-red-950'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            {latest.result}
          </div>

          {/* Player of the Match Pill */}
          {latest.playerOfTheMatch && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">POM:</span>
              <strong className="text-white">{latest.playerOfTheMatch.name}</strong>
              <span className="text-amber-400/90 font-mono text-[11px]">({latest.playerOfTheMatch.performance})</span>
            </div>
          )}
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
