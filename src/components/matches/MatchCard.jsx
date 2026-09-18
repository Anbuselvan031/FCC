import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Award, ArrowRight, ShieldCheck, Timer } from 'lucide-react';
import CountdownTimer from '../common/CountdownTimer';

export default function MatchCard({ match }) {
  const isUpcoming = match.type === 'upcoming';
  const isCompleted = match.type === 'completed';
  const isWin = match.isWonByFCC;

  return (
    <div className="relative rounded-2xl bg-[#0d1424] border border-slate-800 hover:border-orange-500/40 p-5 sm:p-7 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:shadow-orange-500/10 transition-all duration-300 group overflow-hidden shine-sweep animate-fade-in-up">
      {/* Top Accent Stripe */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${
          isUpcoming
            ? 'bg-gradient-to-r from-amber-500 to-orange-500'
            : isWin
            ? 'bg-emerald-500'
            : match.result?.toLowerCase().includes('abandon') || match.isWonByFCC === ''
            ? 'bg-slate-600'
            : 'bg-red-500/80'
        }`}
      />

      {/* Match Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider ${
              isUpcoming
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : isWin
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : match.result?.toLowerCase().includes('abandon') || match.isWonByFCC === ''
                ? 'bg-slate-700/40 text-slate-300 border border-slate-600'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {isUpcoming && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            )}
            {match.result?.toLowerCase().includes('abandon') ? 'ABANDONED' : match.status}
          </span>
          <span className="text-xs text-slate-300 font-bold truncate max-w-[200px] sm:max-w-xs">
            {match.tournament}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            {match.date}
          </span>
          <span className="font-mono text-slate-500">
            {match.overs} Ov • {match.ballType}
          </span>
        </div>
      </div>

      {/* Teams & Scores Layout */}
      <div className="py-6 flex items-center justify-between gap-3 sm:gap-4">
        {/* FCC */}
        <div className="flex-1 min-w-0 flex items-center gap-3 sm:gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full p-0.5 bg-gradient-to-tr from-orange-600 to-amber-500 flex-shrink-0 shadow transition-transform duration-300 group-hover:scale-105">
            <img
              src={match.fcc.logo}
              alt={match.fcc.name}
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className="font-display text-base sm:text-lg font-bold uppercase text-white tracking-wide truncate group-hover:text-orange-400 transition-colors"
              title={match.fcc.name}
            >
              {match.fcc.name}
            </h4>
            <div className="font-mono text-xl sm:text-2xl font-black text-orange-400">
              {match.fcc.score || '--'}
            </div>
          </div>
        </div>

        {/* VS / Divider */}
        <div className="flex-shrink-0 px-2 flex items-center justify-center">
          <span className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 text-xs font-display font-bold flex items-center justify-center border border-slate-700 transition-transform duration-300 group-hover:rotate-12 group-hover:border-orange-500/40">
            VS
          </span>
        </div>

        {/* Opponent */}
        <div className="flex-1 min-w-0 flex items-center justify-end gap-3 sm:gap-3.5 text-right">
          <div className="min-w-0 flex-1">
            <h4
              className="font-display text-base sm:text-lg font-bold uppercase text-white tracking-wide truncate group-hover:text-slate-200 transition-colors"
              title={match.opponent.name}
            >
              {match.opponent.name}
            </h4>
            <div className="font-mono text-xl sm:text-2xl font-black text-slate-300">
              {match.opponent.score || '--'}
            </div>
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full p-0.5 bg-slate-800 border border-slate-700 flex-shrink-0 shadow transition-transform duration-300 group-hover:scale-105">
            <img
              src={match.opponent.logo}
              alt={match.opponent.name}
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Upcoming Countdown or Completed Summary */}
      {isUpcoming && (
        <div className="my-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Timer className="w-4 h-4 text-orange-400" />
            <span>Time to Toss:</span>
          </div>
          <CountdownTimer targetDate={match.dateTimeRaw} compact={true} />
        </div>
      )}

      {/* Footer Details & Action */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 w-full sm:w-auto">
          <span className="flex items-center gap-1 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            {match.venue}, {match.city}
          </span>
          {isCompleted && match.result && (
            <span
              className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide ${
                isWin
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : match.result?.toLowerCase().includes('abandon') || match.isWonByFCC === ''
                  ? 'bg-slate-700/40 text-slate-300 border border-slate-600'
                  : 'bg-red-500/15 text-red-400 border border-red-500/30'
              }`}
            >
              {match.result}
            </span>
          )}
        </div>

        {isCompleted ? (
          <Link
            to={`/matches/${match.id}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-800 hover:bg-orange-500 border border-slate-700 hover:border-orange-400 transition-all shadow-sm group/btn"
          >
            <span>View Scorecard</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <span className="text-xs text-orange-400 font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Starts {match.time}
          </span>
        )}
      </div>
    </div>
  );
}
