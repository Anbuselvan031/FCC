import React, { useState, useMemo } from 'react';
import { Trophy, Award, Filter, Flame } from 'lucide-react';
import FilterTabs from '../components/common/FilterTabs';
import LeaderboardPodium from '../components/leaderboard/LeaderboardPodium';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import leaderboardService from '../services/leaderboardService';
import leaderboardDataFallback from '../data/leaderboardData';

const mainCategoryTabs = [
  { id: 'batting', label: 'BATTING' },
  { id: 'bowling', label: 'BOWLING' },
  { id: 'fielding', label: 'FIELDING' },
];

const battingMetricFilters = [
  { id: 'runs', label: 'Top Run Scorers' },
  { id: 'highestScore', label: 'Highest Scores' },
  { id: 'strikeRate', label: 'Highest Strike Rates' },
  { id: 'average', label: 'Highest Averages' },
  { id: 'sixes', label: 'Most Sixes' },
  { id: 'fours', label: 'Most Fours' },
  { id: 'fifties', label: 'Most Fifties' },
  { id: 'centuries', label: 'Most Centuries' },
];

const bowlingMetricFilters = [
  { id: 'wickets', label: 'Most Wickets' },
  { id: 'economy', label: 'Best Economy' },
  { id: 'average', label: 'Best Bowling Avg' },
  { id: 'maidens', label: 'Most Maidens' },
  { id: 'strikeRate', label: 'Best Strike Rate' },
];

const fieldingMetricFilters = [
  { id: 'dismissals', label: 'Most Dismissals' },
  { id: 'catches', label: 'Most Catches' },
  { id: 'stumpings', label: 'Most Stumpings' },
  { id: 'runOuts', label: 'Most Run Outs' },
];

export default function LeaderboardPage() {
  const [data, setData] = useState(leaderboardDataFallback);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('batting');
  const [battingMetric, setBattingMetric] = useState('runs');
  const [bowlingMetric, setBowlingMetric] = useState('wickets');
  const [fieldingMetric, setFieldingMetric] = useState('dismissals');

  React.useEffect(() => {
    let isMounted = true;
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const res = await leaderboardService.getLeaderboard();
        if (isMounted && res) {
          setData(res);
        }
      } catch (err) {
        console.warn('API error in LeaderboardPage, using fallback:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLeaderboard();
    return () => { isMounted = false; };
  }, []);

  // Strictly authentic CricHeroes leaderboard with dynamic metric sorting
  const sortedPlayers = useMemo(() => {
    let list = [...(data[activeCategory] || [])];

    if (activeCategory === 'batting') {
      list.sort((a, b) => {
        if (battingMetric === 'runs') return (b.runs || 0) - (a.runs || 0);
        if (battingMetric === 'highestScore') return (b.highestScore || 0) - (a.highestScore || 0);
        if (battingMetric === 'average') return (b.average || 0) - (a.average || 0);
        if (battingMetric === 'strikeRate') return (b.strikeRate || 0) - (a.strikeRate || 0);
        if (battingMetric === 'sixes') return (b.sixes || 0) - (a.sixes || 0);
        if (battingMetric === 'fours') return (b.fours || 0) - (a.fours || 0);
        if (battingMetric === 'fifties') return (b.fifties || 0) - (a.fifties || 0);
        if (battingMetric === 'centuries') return (b.centuries || 0) - (a.centuries || 0);
        return 0;
      });
    } else if (activeCategory === 'bowling') {
      list.sort((a, b) => {
        if (bowlingMetric === 'wickets') return (b.wickets || 0) - (a.wickets || 0);
        if (bowlingMetric === 'economy') return (a.economy || 99) - (b.economy || 99);
        if (bowlingMetric === 'average') return (a.average || 99) - (b.average || 99);
        if (bowlingMetric === 'maidens') return (b.maidens || 0) - (a.maidens || 0);
        if (bowlingMetric === 'strikeRate') return (a.strikeRate || 99) - (b.strikeRate || 99);
        return 0;
      });
    } else if (activeCategory === 'fielding') {
      list.sort((a, b) => {
        if (fieldingMetric === 'dismissals') return (b.dismissals || 0) - (a.dismissals || 0);
        if (fieldingMetric === 'catches') return (b.catches || 0) - (a.catches || 0);
        if (fieldingMetric === 'stumpings') return (b.stumpings || 0) - (a.stumpings || 0);
        if (fieldingMetric === 'runOuts') return (b.runOuts || 0) - (a.runOuts || 0);
        return 0;
      });
    }

    // Re-assign ranks based on selected sort metric
    return list.map((p, index) => ({
      ...p,
      rank: index + 1
    }));
  }, [activeCategory, battingMetric, bowlingMetric, fieldingMetric]);

  const top3 = sortedPlayers.slice(0, 3);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-2">
            <Trophy className="w-4 h-4 text-orange-500" />
            STANDINGS & RANKINGS
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
            PLAYER LEADERBOARD
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Official club rankings for batting titans, strike bowlers, and safe hands from CricHeroes.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-[#0d1424] border border-slate-800">
          Source: <strong className="text-orange-400">CricHeroes Official Team Standings</strong>
        </div>
      </div>

      {/* Main Discipline Tabs: BAT, BOWL, FIELD */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <FilterTabs
            tabs={mainCategoryTabs}
            activeTab={activeCategory}
            onTabChange={setActiveCategory}
            size="md"
          />

          <span className="text-xs font-mono text-slate-400">
            Ranked Players: <strong className="text-orange-400">{sortedPlayers.length}</strong>
          </span>
        </div>

        {/* Sub-discipline metric pills */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Sort By Metric:
          </span>

          {activeCategory === 'batting' &&
            battingMetricFilters.map((m) => (
              <button
                key={m.id}
                onClick={() => setBattingMetric(m.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  battingMetric === m.id
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {m.label}
              </button>
            ))}

          {activeCategory === 'bowling' &&
            bowlingMetricFilters.map((m) => (
              <button
                key={m.id}
                onClick={() => setBowlingMetric(m.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  bowlingMetric === m.id
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {m.label}
              </button>
            ))}

          {activeCategory === 'fielding' &&
            fieldingMetricFilters.map((m) => (
              <button
                key={m.id}
                onClick={() => setFieldingMetric(m.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  fieldingMetric === m.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {m.label}
              </button>
            ))}
        </div>
      </div>

      {/* 1. TOP 3 PODIUM */}
      <LeaderboardPodium topPlayers={top3} category={activeCategory} />

      {/* 2. COMPLETE RANKINGS TABLE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
            COMPLETE RANKING STANDINGS
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Showing verified CricHeroes top {sortedPlayers.length}
          </span>
        </div>

        <LeaderboardTable players={sortedPlayers} category={activeCategory} />
      </div>
    </div>
  );
}
