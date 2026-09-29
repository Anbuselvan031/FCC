import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Award,
  Calendar,
  MapPin,
  TrendingUp,
  Zap,
  Target,
  Trophy,
  Activity,
  Flame,
  Tag,
  Quote
} from 'lucide-react';
import StatCard from '../components/common/StatCard';
import playerService from '../services/playerService';
import playersDataFallback from '../data/playersData';

export default function PlayerDetailPage() {
  const { id } = useParams();
  const initialPlayer = playersDataFallback.find((p) => String(p.id) === String(id)) ||
                        playersDataFallback.find((p) => String(p.cricHeroesId) === String(id));
  const [player, setPlayer] = React.useState(initialPlayer);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    const fetchPlayer = async () => {
      setLoading(true);
      try {
        const data = await playerService.getPlayerById(id);
        if (isMounted && data) {
          setPlayer(data);
        }
      } catch (err) {
        console.warn('API error in PlayerDetailPage, using fallback:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchPlayer();
    return () => { isMounted = false; };
  }, [id]);

  if (!player) {
    return (
      <div className="pt-32 pb-24 text-center max-w-xl mx-auto px-4">
        <Shield className="w-16 h-16 text-orange-500/50 mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold uppercase text-white">Player Not Found</h1>
        <p className="text-xs text-slate-400 mt-2">
          The requested player profile could not be located in the Fahrenheit Cricket Club roster.
        </p>
        <Link
          to="/players"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-white bg-orange-600 hover:bg-orange-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Squad
        </Link>
      </div>
    );
  }

  const defaultAvatar = "https://media.cricheroes.in/default/user_profile.png";
  const stats = player.stats || {};
  const batting = player.batting || {};
  const bowling = player.bowling || {};
  const fielding = player.fielding || {};
  const recent = player.recentPerformances || [];
  const achievements = player.achievements || [];

  const formatStat = (val) => {
    if (val === undefined || val === null || val === '--') return '--';
    if (typeof val === 'number') return val.toLocaleString();
    return val;
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Back to Squad Action */}
      <div className="flex items-center justify-between">
        <Link
          to="/players"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Squad</span>
        </Link>

        <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
          {player.cricHeroesId ? `CricHeroes ID: #${player.cricHeroesId}` : 'FCC Official Squad'}
        </span>
      </div>

      {/* 1. PLAYER HEADER */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#10192e] to-[#0a0f1d] border border-slate-700/80 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Glowing backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Large Player Image */}
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl p-2 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 shadow-2xl shadow-orange-950/80">
              <img
                src={player.photo || defaultAvatar}
                alt={player.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl bg-slate-900 filter brightness-105"
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
              {player.jerseyNumber && player.jerseyNumber !== '--' && (
                <span className="absolute -top-3 -right-3 w-12 h-12 rounded-2xl bg-slate-950 border-2 border-orange-500 text-orange-400 flex items-center justify-center font-display font-black text-xl shadow-lg">
                  #{player.jerseyNumber}
                </span>
              )}
            </div>
          </div>

          {/* Player Info Details */}
          <div className="md:col-span-8 space-y-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {player.isCaptain && (
                <span className="px-3 py-1 rounded-lg bg-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm">
                  CLUB CAPTAIN
                </span>
              )}
              {player.isViceCaptain && (
                <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm">
                  VICE CAPTAIN
                </span>
              )}
              {player.isPro && (
                <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm">
                  PRO REGISTERED
                </span>
              )}
              {player.role && player.role !== '--' ? (
                <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs uppercase tracking-wider">
                  {player.role}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-slate-900 text-slate-500 border border-slate-800 text-xs uppercase tracking-wider">
                  Role: Not Available
                </span>
              )}
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              {player.name}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-sans">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">BATTING STYLE</span>
                <strong className="text-slate-300 font-semibold">{player.battingStyle || '--'}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">BOWLING STYLE</span>
                <strong className="text-slate-300 font-semibold">{player.bowlingStyle || '--'}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">{player.dob ? 'DATE OF BIRTH' : 'CLUB MEMBER SINCE'}</span>
                <strong className="text-slate-200 font-semibold">{player.dob || '24-Aug-2023'}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">LOCATION</span>
                <strong className="text-orange-400 font-semibold">{player.location || 'Coimbatore'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PLAYER STATEMENT / CRICHEROES BIO */}
      {player.playerStatement && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-[#0d1424] to-slate-900 border border-orange-500/30 shadow-xl space-y-3">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-orange-400" />
            <h3 className="font-display text-lg font-bold uppercase tracking-wider text-orange-400">
              CRICHEROES VERIFIED PLAYER INSIGHT
            </h3>
          </div>
          <div
            className="text-slate-300 text-sm font-sans leading-relaxed [&>b]:text-white [&>b]:font-bold"
            dangerouslySetInnerHTML={{ __html: player.playerStatement }}
          />
        </div>
      )}

      {/* 2. CRICHEROES TAGS SECTION */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1424] border border-orange-500/25 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-orange-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            CRICHEROES TAGS
          </h2>
        </div>
        <p className="text-xs text-slate-400 font-sans">
          Authentic player classifications assigned by the CricHeroes algorithm based on competitive playing style.
        </p>

        {player.tags && player.tags.length > 0 ? (
          <div className="flex flex-wrap gap-3 pt-2">
            {player.tags.map((tag) => (
              <div
                key={tag}
                className="px-4 py-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center gap-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="font-display text-base font-bold uppercase tracking-wider text-orange-300">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs font-mono">
            No specific CricHeroes tags assigned to this profile.
          </div>
        )}
      </div>

      {/* 3. BATTING INFORMATION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            BATTING INFORMATION
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">INNINGS</span>
            <p className="font-mono text-base sm:text-lg font-bold text-white mt-1">{formatStat(batting.innings)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">RUNS</span>
            <p className="font-mono text-base sm:text-lg font-bold text-orange-400 mt-1">{formatStat(batting.runs)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">HIGHEST SCORE</span>
            <p className="font-mono text-base sm:text-lg font-bold text-amber-400 mt-1">{formatStat(batting.highestScore)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">AVERAGE</span>
            <p className="font-mono text-base sm:text-lg font-bold text-slate-200 mt-1">{formatStat(batting.average)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">STRIKE RATE</span>
            <p className="font-mono text-base sm:text-lg font-bold text-emerald-400 mt-1">{formatStat(batting.strikeRate)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">50s</span>
            <p className="font-mono text-base sm:text-lg font-bold text-amber-400 mt-1">{formatStat(batting.fifties)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">100s</span>
            <p className="font-mono text-base sm:text-lg font-bold text-amber-400 mt-1">{formatStat(batting.centuries)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">4s / 6s</span>
            <p className="font-mono text-base sm:text-lg font-bold text-slate-300 mt-1">
              {formatStat(batting.fours)} / {formatStat(batting.sixes)}
            </p>
          </div>
        </div>
      </div>

      {/* 4. BOWLING INFORMATION */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            BOWLING INFORMATION
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">INNINGS</span>
            <p className="font-mono text-base sm:text-lg font-bold text-white mt-1">{formatStat(bowling.innings)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">WICKETS</span>
            <p className="font-mono text-base sm:text-lg font-bold text-amber-400 mt-1">{formatStat(bowling.wickets)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">OVERS</span>
            <p className="font-mono text-base sm:text-lg font-bold text-slate-200 mt-1">{formatStat(bowling.overs)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">ECONOMY</span>
            <p className="font-mono text-base sm:text-lg font-bold text-cyan-400 mt-1">{formatStat(bowling.economy)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">AVERAGE</span>
            <p className="font-mono text-base sm:text-lg font-bold text-slate-300 mt-1">{formatStat(bowling.average)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">STRIKE RATE</span>
            <p className="font-mono text-base sm:text-lg font-bold text-emerald-400 mt-1">{formatStat(bowling.strikeRate)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">MAIDENS</span>
            <p className="font-mono text-base sm:text-lg font-bold text-white mt-1">{formatStat(bowling.maidens)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">BEST BOWLING</span>
            <p className="font-mono text-base sm:text-lg font-bold text-emerald-400 mt-1 truncate">{formatStat(bowling.bestBowling)}</p>
          </div>
        </div>
      </div>

      {/* 5. FIELDING & CAREER OVERVIEW */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            FIELDING & OVERVIEW
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">MATCHES</span>
            <p className="font-mono text-xl font-bold text-white mt-1">{formatStat(fielding.matches || stats.matches)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">TOTAL DISMISSALS</span>
            <p className="font-mono text-xl font-bold text-emerald-400 mt-1">{formatStat(fielding.dismissals)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">CATCHES</span>
            <p className="font-mono text-xl font-bold text-slate-200 mt-1">{formatStat(fielding.catches)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">CAUGHT BEHIND</span>
            <p className="font-mono text-xl font-bold text-slate-300 mt-1">{formatStat(fielding.caughtBehind)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">RUN OUTS</span>
            <p className="font-mono text-xl font-bold text-amber-400 mt-1">{formatStat(fielding.runOuts)}</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">STUMPINGS</span>
            <p className="font-mono text-xl font-bold text-cyan-400 mt-1">{formatStat(fielding.stumpings)}</p>
          </div>
        </div>
      </div>

      {/* 6. RECENT PERFORMANCES */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-500" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            RECENT PERFORMANCES
          </h2>
        </div>

        {recent.length > 0 ? (
          <div className="rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[11px] tracking-wider bg-slate-950/60">
                    <th className="py-3.5 px-4 sm:px-6">MATCH</th>
                    <th className="py-3.5 px-4">DATE & VENUE</th>
                    <th className="py-3.5 px-4 text-right">RUNS</th>
                    <th className="py-3.5 px-4 text-right">BOWLING</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">RESULT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {recent.map((rec, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-white whitespace-nowrap">
                        vs {rec.opponent}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-xs whitespace-nowrap">
                        {rec.date} • {rec.venue}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-orange-400">
                        {rec.runs}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-amber-400 font-bold">
                        {rec.bowling || '--'}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-bold border ${rec.result === 'Won' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : rec.result === 'Lost' ? 'bg-rose-500/15 text-rose-400 border-rose-500/30' : 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                          {rec.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-[#0d1424] border border-slate-800 text-slate-400 text-xs sm:text-sm font-sans">
            Individual match scorecard logs are pending synchronization from CricHeroes match archive.
          </div>
        )}
      </div>

      {/* CAPTAINCY RECORD */}
      {player.captain && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
              CAPTAINCY RECORD
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">MATCHES LED</span>
              <p className="font-mono text-xl font-bold text-white mt-1">{player.captain.matches}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">TOSS WON</span>
              <p className="font-mono text-xl font-bold text-amber-400 mt-1">{player.captain.tossWon}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">WIN RATE</span>
              <p className="font-mono text-xl font-bold text-emerald-400 mt-1">{player.captain.winPercent}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0d1424] border border-slate-800">
              <span className="text-[10px] text-slate-400 font-bold uppercase">LOSS RATE</span>
              <p className="font-mono text-xl font-bold text-slate-400 mt-1">{player.captain.lossPercent}</p>
            </div>
          </div>
        </div>
      )}

      {/* 7. ACHIEVEMENTS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            ACHIEVEMENTS
          </h2>
        </div>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0d1424] border border-amber-500/30 shadow-lg flex items-center gap-4 hover:border-amber-400/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-white uppercase tracking-wide">
                    {ach}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    CricHeroes Verified Milestone
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-[#0d1424] border border-slate-800 text-slate-400 text-xs sm:text-sm font-sans">
            No specific tournament achievement badges recorded for this player yet.
          </div>
        )}
      </div>

      {/* 8. CRICHEROES BADGES */}
      {player.badges && player.badges.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
              CRICHEROES BADGES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {player.badges.map((b, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#0d1424] border border-slate-800 flex items-center gap-3 hover:border-slate-700 transition-colors">
                <img src={b.icon} alt={b.name} referrerPolicy="no-referrer" className="w-12 h-12 rounded-xl bg-slate-900 p-1 border border-slate-700 object-contain" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-base font-bold text-white uppercase truncate">{b.name}</h4>
                    {b.count > 1 && (
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        x{b.count}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 9. CRICHEROES AWARDS */}
      {player.awards && player.awards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-orange-400" />
            <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
              MATCH AWARDS & HONORS
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {player.awards.map((a, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#0d1424] border border-orange-500/20 flex items-center gap-3 hover:border-orange-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display text-base font-bold text-white uppercase truncate">{a.name}</h4>
                  <p className="text-[11px] text-orange-300">vs {a.opponent} • {a.date}</p>
                  {a.details && <p className="text-[10px] text-slate-400 truncate">{a.details}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="pt-6 border-t border-slate-800 text-center">
        <Link
          to="/players"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-display text-base font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-xl shadow-orange-950 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Complete Squad</span>
        </Link>
      </div>
    </div>
  );
}
