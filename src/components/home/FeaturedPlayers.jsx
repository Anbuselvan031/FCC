import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Shield, Award, Tag } from 'lucide-react';
import playersData from '../../data/playersData';

export default function FeaturedPlayers() {
  // Select top 4 standout verified players: Mouleeshvar, Kiruthik Vinayak, Vicky (c), Surendar
  const featuredIds = [14454703, 14454705, 21685780, 1204566];
  const featuredPlayers = featuredIds
    .map((id) => playersData.find((p) => p.id === id || p.cricHeroesId === id))
    .filter(Boolean);

  const defaultAvatar = "https://media.cricheroes.in/default/user_profile.png";

  return (
    <section className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-400 mb-2">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            STANDOUT PERFORMERS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            PLAYERS TO WATCH
          </h2>
        </div>

        <Link
          to="/players"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors group"
        >
          <span>View All {playersData.length} Squad Members</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredPlayers.map((player, idx) => {
          const stats = player.stats || {};
          return (
            <Link
              key={player.id}
              to={`/players/${player.id}`}
              style={{ animationDelay: `${idx * 100}ms` }}
              className="group relative rounded-2xl bg-[#0c1220] border border-slate-800 hover:border-orange-500/40 p-5 shadow-xl hover:shadow-[0_15px_35px_rgba(249,115,22,0.15)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between overflow-hidden shine-sweep animate-fade-in-up"
            >
              {/* Top Jersey Number / ID & Role Badge */}
              <div className="flex items-center justify-between z-10 min-h-[28px]">
                {player.jerseyNumber && player.jerseyNumber !== '--' ? (
                  <span className="font-display text-2xl font-black text-slate-500 group-hover:text-orange-400 transition-colors">
                    #{player.jerseyNumber}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-600 uppercase">
                    ID: #{player.cricHeroesId || player.id}
                  </span>
                )}

                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  {player.isCaptain && (
                    <span className="px-2 py-0.5 rounded bg-orange-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                      CAPTAIN
                    </span>
                  )}
                  {player.role && player.role !== '--' && (
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px] uppercase tracking-wider border border-slate-700">
                      {player.role}
                    </span>
                  )}
                </div>
              </div>

              {/* Player Image */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-b from-orange-500/30 to-transparent group-hover:from-orange-500/60 transition-all duration-300">
                  <img
                    src={player.photo || defaultAvatar}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-full bg-slate-900 filter brightness-95 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
              </div>

              {/* Player Name and CricHeroes Tags */}
              <div className="text-center z-10 mb-4 space-y-1.5">
                <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white group-hover:text-orange-400 transition-colors truncate">
                  {player.name}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-1">
                  {player.tags?.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3 Key Stats Box */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-center z-10 font-mono">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                    RUNS
                  </p>
                  <p className="font-display text-lg font-bold text-orange-400 mt-0.5">
                    {stats.runs !== undefined && stats.runs !== null && stats.runs !== '--' ? stats.runs.toLocaleString() : '--'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                    WKTS
                  </p>
                  <p className="font-display text-lg font-bold text-amber-400 mt-0.5">
                    {stats.wickets !== undefined && stats.wickets !== null && stats.wickets !== '--' ? stats.wickets : '--'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">
                    S/R
                  </p>
                  <p className="font-display text-lg font-bold text-emerald-400 mt-0.5">
                    {stats.strikeRate !== undefined && stats.strikeRate !== null && stats.strikeRate !== '--' ? stats.strikeRate : '--'}
                  </p>
                </div>
              </div>

              {/* Subtle hover prompt */}
              <div className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-orange-400 transition-colors flex items-center justify-center gap-1">
                <span>View Full Profile</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
