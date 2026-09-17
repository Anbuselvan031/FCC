import React, { useState, useMemo } from 'react';
import { Trophy, Calendar, Filter, MapPin, Search } from 'lucide-react';
import MatchCard from '../components/matches/MatchCard';
import FilterTabs from '../components/common/FilterTabs';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';
import matchService from '../services/matchService';
import matchesDataFallback from '../data/matchesData';

const mainTabs = [
  { id: 'ALL', label: 'ALL MATCHES' },
  { id: 'UPCOMING', label: 'UPCOMING' },
  { id: 'LIVE', label: 'LIVE' },
  { id: 'COMPLETED', label: 'COMPLETED' },
];

export default function MatchesPage() {
  const [matchesList, setMatchesList] = useState(matchesDataFallback);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [matchTypeFilter, setMatchTypeFilter] = useState('ALL');

  React.useEffect(() => {
    let isMounted = true;
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const data = await matchService.getMatches();
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setMatchesList(data);
        }
      } catch (err) {
        console.warn('API error in MatchesPage, using fallback:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchMatches();
    return () => { isMounted = false; };
  }, []);

  const filteredMatches = useMemo(() => {
    return matchesList.filter((m) => {
      // Tab filter
      if (activeTab === 'UPCOMING' && m.type !== 'upcoming') return false;
      if (activeTab === 'COMPLETED' && m.type !== 'completed') return false;
      if (activeTab === 'LIVE') return false; // Currently no live match running

      // Match type filter
      if (matchTypeFilter !== 'ALL') {
        if (!m.matchType.toLowerCase().includes(matchTypeFilter.toLowerCase())) return false;
      }

      // Search query (opponent or venue or date)
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesQ =
          m.opponent.name.toLowerCase().includes(q) ||
          m.venue.toLowerCase().includes(q) ||
          m.tournament.toLowerCase().includes(q) ||
          m.date.toLowerCase().includes(q);
        if (!matchesQ) return false;
      }

      return true;
    });
  }, [activeTab, matchTypeFilter, searchQuery]);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-2">
            <Trophy className="w-4 h-4 text-orange-500" />
            FIXTURES & RESULTS
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
            MATCH CENTER
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Complete schedule, live updates, and official match scorecards for Fahrenheit Cricket Club.
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-[#0d1424] border border-slate-800 w-fit">
          Total Matches Recorded: <strong className="text-orange-400">{matchesList.length}</strong>
        </span>
      </div>

      {/* Tabs and Filters Bar */}
      <div className="space-y-4 p-5 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Main Status Tabs */}
          <FilterTabs
            tabs={mainTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            size="md"
          />

          {/* Search bar */}
          <div className="w-full lg:w-80">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search opponent, tournament, venue..."
            />
          </div>
        </div>

        {/* Sub Filters: Match Type */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase tracking-wider">Format:</span>
            <select
              value={matchTypeFilter}
              onChange={(e) => setMatchTypeFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 focus:outline-none focus:border-orange-500"
            >
              <option value="ALL">All Formats</option>
              <option value="Limited Overs">Limited Overs</option>
              <option value="20 Overs">T20 (20 Overs)</option>
              <option value="25 Overs">25 Overs</option>
            </select>
          </div>

          <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
            <span>Ball: Leather Ball</span>
            <span>•</span>
            <span>League: CricHeroes Official</span>
          </div>
        </div>
      </div>

      {/* Match Cards List */}
      {activeTab === 'LIVE' ? (
        <EmptyState
          title="No Live Matches Right Now"
          message="Fahrenheit Cricket Club is not currently playing a live match. Check the UPCOMING tab for the next confirmed fixture."
          actionText="View Upcoming Matches"
          onAction={() => setActiveTab('UPCOMING')}
        />
      ) : filteredMatches.length > 0 ? (
        <div className="space-y-6">
          {filteredMatches.map((match, idx) => (
            <div
              key={match.id}
              style={{ animationDelay: `${Math.min(idx * 75, 500)}ms` }}
              className="animate-fade-in-up"
            >
              <MatchCard match={match} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Matches Available"
          message={`No match fixtures match your current filter criteria.`}
          actionText="Clear Filters"
          onAction={() => {
            setActiveTab('ALL');
            setSearchQuery('');
            setMatchTypeFilter('ALL');
          }}
        />
      )}
    </div>
  );
}
