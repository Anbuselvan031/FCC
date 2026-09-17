import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Award, Flame, Zap } from 'lucide-react';

export default function LeaderboardPodium({ topPlayers = [], category = 'batting' }) {
  if (topPlayers.length < 3) return null;

  // Order for podium display: Rank 2 (Silver), Rank 1 (Gold), Rank 3 (Bronze)
  const silver = topPlayers[1];
  const gold = topPlayers[0];
  const bronze = topPlayers[2];

  const getPrimaryStat = (p) => {
    if (category === 'batting') return { label: 'RUNS', val: p.runs?.toLocaleString() };
    if (category === 'bowling') return { label: 'WICKETS', val: p.wickets };
    if (category === 'fielding') return { label: 'DISMISSALS', val: p.dismissals };
    return { label: 'POINTS', val: '--' };
  };

  const getSecondaryStat = (p) => {
    if (category === 'batting') return `Avg: ${p.average} • SR: ${p.strikeRate}`;
    if (category === 'bowling') return `Econ: ${p.economy} • Best: ${p.bestBowling}`;
    if (category === 'fielding') return `Catches: ${p.catches} • Stumpings: ${p.stumpings}`;
    return '';
  };

  const podiumSlots = [
    {
      player: silver,
      rank: 2,
      medal: '🥈',
      label: 'RANK 2',
      color: 'from-slate-400 to-slate-200',
      border: 'border-slate-400/40',
      height: 'h-40 sm:h-48',
      order: 'order-1',
      glow: 'shadow-[0_0_20px_rgba(203,213,225,0.2)]'
    },
    {
      player: gold,
      rank: 1,
      medal: '🥇',
      label: 'RANK 1',
      color: 'from-amber-400 via-yellow-300 to-orange-400',
      border: 'border-amber-400/60',
      height: 'h-48 sm:h-60',
      order: 'order-2',
      glow: 'shadow-[0_0_30px_rgba(251,191,36,0.35)]'
    },
    {
      player: bronze,
      rank: 3,
      medal: '🥉',
      label: 'RANK 3',
      color: 'from-amber-700 to-amber-500',
      border: 'border-amber-700/40',
      height: 'h-32 sm:h-40',
      order: 'order-3',
      glow: 'shadow-[0_0_20px_rgba(180,83,9,0.2)]'
    },
  ];

  return (
    <div className="py-8 sm:py-12">
      <div className="text-center mb-8">
        <span className="text-xs font-black uppercase tracking-widest text-orange-400 flex items-center justify-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          CHAMPIONSHIP PODIUM
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mt-1">
          TOP 3 {category.toUpperCase()} LEADERS
        </h3>
      </div>

      <div className="flex items-end justify-center gap-3 sm:gap-6 max-w-3xl mx-auto px-2">
        {podiumSlots.map((slot) => {
          const p = slot.player;
          if (!p) return null;
          const primary = getPrimaryStat(p);
          const secondary = getSecondaryStat(p);
          const delayClass = slot.rank === 1 ? 'delay-100' : slot.rank === 2 ? 'delay-200' : 'delay-300';

          return (
            <div
              key={slot.rank}
              className={`flex-1 flex flex-col items-center ${slot.order} group animate-fade-in-up ${delayClass}`}
            >
              {/* Player Avatar */}
              <Link
                to={`/players/${p.id}`}
                className="flex flex-col items-center relative -mb-4 z-20 focus:outline-none"
              >
                <div className="relative">
                  <div
                    className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr ${slot.color} ${slot.glow} transition-transform duration-300 group-hover:scale-110 ${
                      slot.rank === 1 ? 'animate-pulse-glow' : ''
                    }`}
                  >
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="w-full h-full object-cover rounded-full bg-slate-900"
                      onError={(e) => {
                        e.target.src = "https://media.cricheroes.in/default/user_profile.png";
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 text-xl sm:text-2xl drop-shadow-md transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block">
                    {slot.medal}
                  </span>
                </div>

                <h4 className="font-display text-base sm:text-xl font-bold uppercase tracking-wide text-white group-hover:text-orange-400 transition-colors mt-3 text-center truncate max-w-[110px] sm:max-w-[160px]">
                  {p.name}
                </h4>
              </Link>

              {/* Podium Column Base */}
              <div
                className={`w-full ${slot.height} rounded-t-2xl bg-gradient-to-b from-[#131d33] to-[#0a101f] border-t-2 border-x ${slot.border} p-3 sm:p-4 flex flex-col items-center justify-between text-center shadow-2xl relative overflow-hidden shine-sweep transition-all duration-300 group-hover:-translate-y-1.5`}
              >
                {/* Subtle sheen */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="pt-2">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400">
                    {primary.label}
                  </span>
                  <p className="font-display text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-orange-400">
                    {primary.val}
                  </p>
                  <p className="text-[9px] sm:text-[11px] text-slate-400 font-mono mt-0.5 truncate max-w-[110px] sm:max-w-none">
                    {secondary}
                  </p>
                </div>

                <div className="pb-1">
                  <span className="font-display text-lg sm:text-2xl font-black tracking-widest text-slate-600 group-hover:text-slate-400 transition-colors">
                    #{slot.rank}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
