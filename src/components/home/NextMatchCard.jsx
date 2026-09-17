import React from 'react';
import { Calendar, Clock, MapPin, Trophy, Shield, ArrowRight } from 'lucide-react';
import CountdownTimer from '../common/CountdownTimer';
import matchesData from '../../data/matchesData';

export default function NextMatchCard() {
  const upcomingMatches = matchesData.filter((m) => m.type === 'upcoming');
  const nextMatch = upcomingMatches[0];

  if (!nextMatch) {
    return (
      <div className="p-8 text-center bg-[#0d1424]/60 rounded-2xl border border-slate-800 text-slate-400">
        <Shield className="w-10 h-10 text-orange-500/50 mx-auto mb-3" />
        <p className="font-display text-lg font-bold text-white uppercase">
          Upcoming Match Center
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Upcoming match details will appear here once fixtures are officially confirmed.
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-[#10182b] to-[#0a0f1c] border border-orange-500/20 p-6 sm:p-8 shadow-2xl shadow-black/80 overflow-hidden group shine-sweep transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-orange-500/10">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[100px] pointer-events-none" />

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30 text-xs font-extrabold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            NEXT FIXTURE
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {nextMatch.tournament}
          </span>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          {nextMatch.overs} Overs • {nextMatch.ballType}
        </span>
      </div>

      {/* Match Clashes Display */}
      <div className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-11 items-center gap-6 text-center">
        {/* FCC */}
        <div className="md:col-span-5 flex flex-col items-center gap-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-orange-600 to-amber-500 shadow-xl shadow-orange-950/60 transition-transform duration-300 group-hover:scale-105">
            <img
              src={nextMatch.fcc.logo}
              alt={nextMatch.fcc.name}
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>
          <div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide group-hover:text-orange-400 transition-colors">
              {nextMatch.fcc.name}
            </h4>
            <p className="text-[11px] text-orange-400 font-semibold tracking-wider uppercase">
              HOME SQUAD
            </p>
          </div>
        </div>

        {/* VS Center */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 transition-transform duration-300 group-hover:scale-110">
            VS
          </span>
        </div>

        {/* Opponent */}
        <div className="md:col-span-5 flex flex-col items-center gap-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-slate-800 border border-slate-700 shadow-lg transition-transform duration-300 group-hover:scale-105">
            <img
              src={nextMatch.opponent.logo}
              alt={nextMatch.opponent.name}
              className="w-full h-full object-cover rounded-full bg-slate-900"
            />
          </div>
          <div>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wide group-hover:text-slate-200 transition-colors">
              {nextMatch.opponent.name}
            </h4>
            <p className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
              CHALLENGERS
            </p>
          </div>
        </div>
      </div>

      {/* Countdown Timer Section */}
      <div className="my-4 py-4 px-3 rounded-2xl bg-[#080d18]/90 border border-slate-800/80">
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 font-sans">
          MATCH COUNTDOWN
        </p>
        <CountdownTimer targetDate={nextMatch.dateTimeRaw} />
      </div>

      {/* Venue & Timing Details */}
      <div className="pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Calendar className="w-4 h-4 text-orange-400" />
            {nextMatch.date}
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-4 h-4 text-orange-400" />
            {nextMatch.time}
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-4 h-4 text-orange-400" />
            {nextMatch.venue}
          </span>
        </div>

        <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-mono">
          Status: Confirmed
        </span>
      </div>
    </div>
  );
}
