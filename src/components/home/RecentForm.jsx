import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import matchesData from '../../data/matchesData';

export default function RecentForm() {
  const completed = matchesData.filter(m => m.type === 'completed').slice(0, 8);

  const getBadge = (match) => {
    // 1. Abandoned / No Result
    const isAbandoned =
      match.status === 'ABANDONED' ||
      match.result?.toLowerCase().includes('abandon') ||
      match.winner === 'No Result' ||
      match.winner === '--' ||
      match.isWonByFCC === '';

    if (isAbandoned) {
      return {
        letter: 'NR',
        label: 'No Result / Abandoned',
        bg: 'bg-slate-700 text-slate-200',
        border: 'border-slate-500',
        glow: 'shadow-[0_0_10px_rgba(100,116,139,0.35)]'
      };
    }

    // 2. Win (FCC Won)
    const isWin =
      match.isWonByFCC === true ||
      match.status === 'WON' ||
      match.winner?.toLowerCase().includes('fahrenheit');

    if (isWin) {
      return {
        letter: 'W',
        label: 'Won',
        bg: 'bg-emerald-500 text-white',
        border: 'border-emerald-400',
        glow: 'shadow-[0_0_14px_rgba(16,185,129,0.55)]'
      };
    }

    // 3. Loss (FCC Lost)
    return {
      letter: 'L',
      label: 'Lost',
      bg: 'bg-red-500 text-white',
      border: 'border-red-400',
      glow: 'shadow-[0_0_14px_rgba(239,68,68,0.45)]'
    };
  };

  const getShortName = (match) => {
    if (match.opponent?.shortName) return match.opponent.shortName;
    const name = match.opponent?.name || '';
    if (name.toLowerCase().includes('curse xi')) return 'Curse XI';
    if (name.toLowerCase().includes('arrow')) return 'Arrow CC';
    if (name.toLowerCase().includes('white wings')) return 'White Wings';
    if (name.toLowerCase().includes('the whites')) return 'The Whites';
    if (name.toLowerCase().includes('fire moon')) return 'Fire Moon';
    if (name.toLowerCase().includes('anbu')) return 'Anbu CC';
    if (name.toLowerCase().includes('eagles')) return 'Eagles';
    if (name.toLowerCase().includes('prime 11s')) return 'Prime 11s';
    if (name.toLowerCase().includes('jp brothers')) return 'JP Bros';
    if (name.toLowerCase().includes('alpha')) return 'Alpha CC';
    if (name.toLowerCase().includes('blue sky')) return 'Blue Sky';
    if (name.toLowerCase().includes('pitch tales')) return 'PTCC';
    if (name.toLowerCase().includes('new ishan')) return 'New Ishan';
    if (name.toLowerCase().includes('mcc')) return 'MCC';
    if (name.toLowerCase().includes('zesty')) return 'Zesty';
    if (name.toLowerCase().includes('blazer')) return 'Blazer CC';
    if (name.toLowerCase().includes('hlp')) return 'HLP CC';
    return name.split(' ')[0] || name.substring(0, 6);
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0c1220] border border-slate-800/90 shadow-xl shine-sweep">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            RECENT FORM (LAST 8 MATCHES)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Form streak across tournament and bilateral games
          </p>
        </div>

        <Link
          to="/matches"
          className="text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 flex items-center gap-1 group/link"
        >
          <span>All Matches</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
        {completed.map((m, idx) => {
          const badge = getBadge(m);
          const shortName = getShortName(m);
          return (
            <Link
              key={m.id || idx}
              to={`/matches/${m.id}`}
              style={{ animationDelay: `${idx * 75}ms` }}
              className="flex flex-col items-center gap-1.5 group focus:outline-none animate-scale-in"
              title={`${m.fcc.name} vs ${m.opponent.name}: ${badge.label} (${m.fcc.score || '--'} vs ${m.opponent.score || '--'})`}
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-display font-black text-sm sm:text-base border-2 transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-1 ${badge.bg} ${badge.border} ${badge.glow}`}
              >
                {badge.letter}
              </div>
              <span className="text-[10px] text-slate-400 font-mono group-hover:text-orange-400 transition-colors truncate max-w-[60px] text-center">
                {shortName}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
