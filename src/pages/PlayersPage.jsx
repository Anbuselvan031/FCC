import React, { useState, useEffect, useMemo } from 'react';
import { Users, Filter, ArrowUpDown, Shield, Search } from 'lucide-react';
import PlayerCard from '../components/players/PlayerCard';
import FilterTabs from '../components/common/FilterTabs';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';
import playerService from '../services/playerService';
import playersDataFallback from '../data/playersData';

const roleFilterTabs = [
  { id: 'ALL', label: 'ALL' },
  { id: 'BATSMAN', label: 'BATSMAN' },
  { id: 'BOWLER', label: 'BOWLER' },
  { id: 'ALL-ROUNDER', label: 'ALL-ROUNDER' },
  { id: 'WICKET KEEPER', label: 'WICKET KEEPER' }
];

export default function PlayersPage() {
  const [playersList, setPlayersList] = useState(playersDataFallback);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [sortBy, setSortBy] = useState('runs'); // 'runs', 'wickets', 'matches', 'name'

  useEffect(() => {
    let isMounted = true;
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const data = await playerService.getPlayers();
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setPlayersList(data);
        }
      } catch (err) {
        console.warn('API error in PlayersPage, using fallback:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchPlayers();
    return () => { isMounted = false; };
  }, []);

  // Filter & sort players
  const filteredPlayers = useMemo(() => {
    return playersList.filter((player) => {
      // Role filter
      const r = (player.role || '').toUpperCase();
      const pName = (player.name || '').toLowerCase();
      let matchesRole = true;

      if (selectedRole === 'ALL') {
        matchesRole = true;
      } else if (selectedRole === 'WICKET KEEPER') {
        matchesRole = r.includes('KEEPER') || r.includes('WICKET') || pName.includes('kiruthik');
      } else if (selectedRole === 'ALL-ROUNDER') {
        matchesRole = r.includes('ALL-ROUNDER') || r.includes('ALL ROUNDER') || r.includes('ALLROUNDER');
      } else if (selectedRole === 'BOWLER') {
        matchesRole = r.includes('BOWLER');
      } else if (selectedRole === 'BATSMAN') {
        matchesRole = (r.includes('BAT') || r.includes('BATSMAN') || r.includes('BATTER')) &&
          !r.includes('ALL-ROUNDER') && !r.includes('ALL ROUNDER') && !r.includes('KEEPER');
      }

      // Search query filter (support name, tags, role, and ID)
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        player.name.toLowerCase().includes(query) ||
        (player.cricHeroesId && String(player.cricHeroesId).includes(query)) ||
        (player.tags && player.tags.some(t => t.toLowerCase().includes(query))) ||
        (player.role && player.role.toLowerCase().includes(query));

      return matchesRole && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'runs') {
        const aRuns = typeof a.stats.runs === 'number' ? a.stats.runs : -1;
        const bRuns = typeof b.stats.runs === 'number' ? b.stats.runs : -1;
        return bRuns - aRuns;
      }
      if (sortBy === 'wickets') {
        const aW = typeof a.stats.wickets === 'number' ? a.stats.wickets : -1;
        const bW = typeof b.stats.wickets === 'number' ? b.stats.wickets : -1;
        return bW - aW;
      }
      if (sortBy === 'matches') {
        const aM = typeof a.stats.matches === 'number' ? a.stats.matches : -1;
        const bM = typeof b.stats.matches === 'number' ? b.stats.matches : -1;
        return bM - aM;
      }
      return 0;
    });
  }, [searchQuery, selectedRole, sortBy]);

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-2">
            <Users className="w-4 h-4 text-orange-500" />
            OFFICIAL ROSTER
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
            OUR SQUAD ({playersList.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl font-sans leading-relaxed">
            Every registered player of Fahrenheit Cricket Club, verified on CricHeroes with authentic match statistics and classifications.
          </p>
        </div>

        {/* Squad Quick Counters */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-[#0d1424] border border-slate-800 text-xs font-mono text-slate-300">
            Showing <strong className="text-orange-400 font-bold">{filteredPlayers.length}</strong> of {playersList.length}
          </span>
        </div>
      </div>

      {/* Search, Role Filters & Sorting Controls */}
      <div className="space-y-4 p-5 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search players by name, jersey number, style..."
              totalResults={filteredPlayers.length}
            />
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-orange-400" />
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-200 focus:outline-none focus:border-orange-500 transition-colors"
            >
              <option value="runs">Most Runs</option>
              <option value="wickets">Most Wickets</option>
              <option value="matches">Most Matches</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Role Filters Tabs */}
        <div className="pt-2 border-t border-slate-800/80">
          <FilterTabs
            tabs={roleFilterTabs}
            activeTab={selectedRole}
            onTabChange={setSelectedRole}
            size="sm"
          />
        </div>
      </div>

      {/* Players Grid / Empty State */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player, idx) => (
            <PlayerCard
              key={player.id}
              player={player}
              style={{ animationDelay: `${(idx % 12) * 50}ms` }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Players Found"
          message={`We couldn't find any squad members matching "${searchQuery}" under the ${selectedRole} filter.`}
          actionText="Reset All Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedRole('ALL');
          }}
        />
      )}
    </div>
  );
}
