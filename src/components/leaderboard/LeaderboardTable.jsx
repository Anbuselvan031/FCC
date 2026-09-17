import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function LeaderboardTable({ players = [], category = 'batting' }) {
  if (!players || players.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-[#0d1424] border border-slate-800 text-slate-400">
        No leaderboard data available for this selection.
      </div>
    );
  }

  const defaultAvatar = "https://media.cricheroes.in/default/user_profile.png";

  return (
    <div className="rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-slate-950/60">
              <th className="py-4 px-4 sm:px-6 text-center w-14">RANK</th>
              <th className="py-4 px-4">PLAYER</th>
              <th className="py-4 px-3 text-center">{category === 'batting' || category === 'bowling' ? 'INN' : 'MAT'}</th>
              {category === 'batting' && (
                <>
                  <th className="py-4 px-3 text-right font-black text-orange-400">RUNS</th>
                  <th className="py-4 px-3 text-right">AVG</th>
                  <th className="py-4 px-3 text-right">SR</th>
                  <th className="py-4 px-3 text-right">HS</th>
                  <th className="py-4 px-3 text-right">4s</th>
                  <th className="py-4 px-3 text-right">6s</th>
                  <th className="py-4 px-3 text-right">50s</th>
                  <th className="py-4 px-3 text-right">100s</th>
                </>
              )}
              {category === 'bowling' && (
                <>
                  <th className="py-4 px-3 text-center">OVERS</th>
                  <th className="py-4 px-3 text-right font-black text-amber-400">WKTS</th>
                  <th className="py-4 px-3 text-right">ECON</th>
                  <th className="py-4 px-3 text-right">AVG</th>
                  <th className="py-4 px-3 text-right">SR</th>
                  <th className="py-4 px-3 text-right">MAID</th>
                  <th className="py-4 px-3 text-right">BEST</th>
                </>
              )}
              {category === 'fielding' && (
                <>
                  <th className="py-4 px-3 text-right">CATCHES</th>
                  <th className="py-4 px-3 text-right">RUN OUTS</th>
                  <th className="py-4 px-3 text-right">STUMPINGS</th>
                  <th className="py-4 px-3 text-right font-black text-emerald-400">DISMISSALS</th>
                </>
              )}
              <th className="py-4 px-4 sm:px-6 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {players.map((p) => {
              const isTop3 = p.rank <= 3;
              const medal = p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : null;

              return (
                <tr
                  key={p.id}
                  className={`hover:bg-slate-800/60 hover:shadow-[inset_4px_0_0_#f97316] transition-all duration-200 group/row ${
                    isTop3 ? 'bg-slate-900/40' : ''
                  }`}
                >
                  {/* Rank */}
                  <td className="py-3.5 px-4 sm:px-6 text-center font-display font-bold text-base">
                    {medal ? (
                      <span className="text-lg inline-block group-hover/row:scale-110 transition-transform duration-200">{medal}</span>
                    ) : (
                      <span className="text-slate-500 font-mono text-xs group-hover/row:text-orange-400 transition-colors">#{p.rank}</span>
                    )}
                  </td>

                  {/* Player Name & Photo */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Link
                      to={`/players/${p.id}`}
                      className="flex items-center gap-3 group/link focus:outline-none"
                    >
                      <div className="w-9 h-9 rounded-full p-0.5 bg-slate-800 border border-slate-700 flex-shrink-0 group-hover/row:border-orange-500 group-hover/row:scale-105 transition-all duration-200">
                        <img
                          src={p.photo || defaultAvatar}
                          alt={p.name}
                          className="w-full h-full object-cover rounded-full bg-slate-900"
                          onError={(e) => {
                            e.target.src = defaultAvatar;
                          }}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-white group-hover/row:text-orange-400 transition-colors block text-xs sm:text-sm">
                          {p.name}
                        </span>
                        {p.role && p.role !== '--' && (
                          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                            {p.role}
                          </span>
                        )}
                      </div>
                    </Link>
                  </td>

                  {/* Matches or Innings */}
                  <td className="py-3.5 px-3 text-center font-mono text-slate-300">
                    {category === 'batting' || category === 'bowling' ? (p.innings ?? '--') : (p.matches ?? '--')}
                  </td>

                  {/* Batting Stats */}
                  {category === 'batting' && (
                    <>
                      <td className="py-3.5 px-3 text-right font-mono font-black text-orange-400 text-sm">
                        {p.runs?.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {p.average}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-emerald-400 font-semibold">
                        {p.strikeRate}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-200">
                        {p.highestScore}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {p.fours ?? '--'}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {p.sixes ?? '--'}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-amber-400">
                        {p.fifties ?? '--'}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-amber-400 font-bold">
                        {p.centuries ?? '--'}
                      </td>
                    </>
                  )}

                  {/* Bowling Stats */}
                  {category === 'bowling' && (
                    <>
                      <td className="py-3.5 px-3 text-center font-mono text-slate-300">
                        {p.overs}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-black text-amber-400 text-sm">
                        {p.wickets}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-cyan-400 font-semibold">
                        {p.economy}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {p.average}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {p.strikeRate}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {p.maidens ?? '--'}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-emerald-400 font-semibold">
                        {p.bestBowling ?? '--'}
                      </td>
                    </>
                  )}

                  {/* Fielding Stats */}
                  {category === 'fielding' && (
                    <>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {p.catches ?? '--'}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {p.runOuts ?? '--'}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono text-slate-300">
                        {p.stumpings ?? '--'}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono font-black text-emerald-400 text-sm">
                        {p.dismissals}
                      </td>
                    </>
                  )}

                  {/* Action Link */}
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                    <Link
                      to={`/players/${p.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <span>Profile</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
