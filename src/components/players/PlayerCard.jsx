import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Tag } from 'lucide-react';

export default function PlayerCard({ player, style, className = '' }) {
  const stats = player.stats || {};

  const formatStat = (val) => {
    if (val === undefined || val === null || val === '--') return '--';
    if (typeof val === 'number') return val.toLocaleString();
    return val;
  };

  const defaultAvatar = "https://media.cricheroes.in/default/user_profile.png";

  return (
    <Link
      to={`/players/${player.id}`}
      style={style}
      className={`group relative rounded-2xl bg-[#0d1424] border border-slate-800 hover:border-orange-500/50 p-5 shadow-xl hover:shadow-[0_15px_30px_rgba(249,115,22,0.18)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between overflow-hidden shine-sweep animate-fade-in-up ${className}`}
    >
      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/15 transition-all duration-500 pointer-events-none" />

      {/* Top Badges */}
      <div className="flex items-center justify-between z-10 min-h-[28px]">
        {player.jerseyNumber && player.jerseyNumber !== '--' ? (
          <span className="font-display text-2xl font-black text-slate-500 group-hover:text-orange-400 transition-colors">
            #{player.jerseyNumber}
          </span>
        ) : (
          <span className="text-[10px] font-mono text-slate-600 uppercase">
            {player.cricHeroesId ? `ID: ${player.cricHeroesId}` : 'FCC ROSTER'}
          </span>
        )}

        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {player.isCaptain && (
            <span className="px-2 py-0.5 rounded bg-orange-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-sm animate-flame">
              CAPTAIN
            </span>
          )}
          {player.isViceCaptain && (
            <span className="px-2 py-0.5 rounded bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-sm">
              VICE CAPTAIN
            </span>
          )}
          {player.role && player.role !== '--' ? (
            <span className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700 font-bold text-[10px] uppercase tracking-wider group-hover:border-orange-500/30 transition-colors">
              {player.role}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-500 border border-slate-800 text-[10px] uppercase tracking-wider">
              ROLE: --
            </span>
          )}
        </div>
      </div>

      {/* Player Profile Photo */}
      <div className="relative my-4 flex items-center justify-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-b from-orange-500/30 via-slate-800 to-transparent group-hover:from-orange-500/80 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all duration-500">
          <img
            src={player.photo || defaultAvatar}
            alt={player.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full bg-slate-900 filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
            onError={(e) => {
              e.target.src = defaultAvatar;
            }}
          />
          {player.isPro && (
            <span
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[10px] shadow animate-pulse"
              title="CricHeroes PRO Player"
            >
              ★
            </span>
          )}
        </div>
      </div>

      {/* Player Name and CricHeroes Tags */}
      <div className="text-center z-10 mb-3 space-y-2">
        <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white group-hover:text-orange-400 transition-colors truncate">
          {player.name}
        </h3>

        {/* CricHeroes Player Tags (Strictly distinct from role) */}
        {player.tags && player.tags.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-0.5">
            {player.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/25 text-[10px] font-semibold tracking-wide"
                title="CricHeroes Tag"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-[10px] text-slate-600 font-mono">
            Tags: --
          </div>
        )}
      </div>

      {/* Core Stats Overview (Runs, Wickets, Matches) */}
      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 text-center z-10">
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            MATCHES
          </p>
          <p className="font-display text-base sm:text-lg font-bold text-white mt-0.5 font-mono">
            {formatStat(stats.matches)}
          </p>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            RUNS
          </p>
          <p className="font-display text-base sm:text-lg font-bold text-orange-400 mt-0.5 font-mono">
            {formatStat(stats.runs)}
          </p>
        </div>
        <div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
            WICKETS
          </p>
          <p className="font-display text-base sm:text-lg font-bold text-amber-400 mt-0.5 font-mono">
            {formatStat(stats.wickets)}
          </p>
        </div>
      </div>

      {/* Card Action footer */}
      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-orange-400 transition-colors">
        <span>View Career Profile</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
