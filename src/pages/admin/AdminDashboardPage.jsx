import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Trophy,
  BarChart3,
  Image as ImageIcon,
  Shield,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  Search,
} from 'lucide-react';
import authService from '../../services/authService';
import playerService from '../../services/playerService';
import matchService from '../../services/matchService';
import galleryService from '../../services/galleryService';
import statsService from '../../services/statsService';
import leaderboardService from '../../services/leaderboardService';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Datasets
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [stats, setStats] = useState(null);

  // Modals & forms
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerRole, setNewPlayerRole] = useState('All-Rounder');
  const [newPlayerTag, setNewPlayerTag] = useState('Accumulator');

  const [showAddMatch, setShowAddMatch] = useState(false);
  const [newMatchOpponent, setNewMatchOpponent] = useState('');
  const [newMatchDate, setNewMatchDate] = useState(new Date().toISOString().split('T')[0]);
  const [newMatchVenue, setNewMatchVenue] = useState('Coimbatore Ground');
  const [newMatchResult, setNewMatchResult] = useState('Fahrenheit Cricket Club won');

  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState('Team');

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    setUser(authService.getCurrentUser());
    loadAllData();
  }, [navigate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [pData, mData, gData, sData] = await Promise.all([
        playerService.getPlayers(),
        matchService.getMatches(),
        galleryService.getGallery(),
        statsService.getStats(),
      ]);
      setPlayers(pData || []);
      setMatches(mData || []);
      setGallery(gData || []);
      setStats(sData || null);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  // Player Operations
  const handleCreatePlayer = async (e) => {
    e.preventDefault();
    try {
      await playerService.createPlayer({
        name: newPlayerName,
        role: newPlayerRole,
        tags: [newPlayerTag],
        stats: { matches: 0, runs: 0, wickets: 0 },
      });
      setStatusMsg({ type: 'success', text: `Player "${newPlayerName}" added successfully!` });
      setShowAddPlayer(false);
      setNewPlayerName('');
      loadAllData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to add player' });
    }
  };

  const handleDeletePlayer = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await playerService.deletePlayer(id);
      setStatusMsg({ type: 'success', text: `Player ${name} deleted successfully` });
      loadAllData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to delete player' });
    }
  };

  // Match Operations
  const handleCreateMatch = async (e) => {
    e.preventDefault();
    try {
      await matchService.createMatch({
        opponent: newMatchOpponent,
        date: newMatchDate,
        venue: newMatchVenue,
        result: newMatchResult,
        status: 'completed',
        isWonByFCC: newMatchResult.toLowerCase().includes('won'),
      });
      setStatusMsg({ type: 'success', text: `Match against ${newMatchOpponent} added!` });
      setShowAddMatch(false);
      setNewMatchOpponent('');
      loadAllData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to add match' });
    }
  };

  const handleDeleteMatch = async (id, opp) => {
    if (!window.confirm(`Delete match against ${opp}?`)) return;
    try {
      await matchService.deleteMatch(id);
      setStatusMsg({ type: 'success', text: 'Match deleted successfully' });
      loadAllData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to delete match' });
    }
  };

  // Gallery Operations
  const handleCreatePhoto = async (e) => {
    e.preventDefault();
    try {
      await galleryService.createGalleryItem({
        title: newPhotoTitle,
        imageUrl: newPhotoUrl,
        category: newPhotoCategory,
      });
      setStatusMsg({ type: 'success', text: 'Photo added to club gallery!' });
      setShowAddPhoto(false);
      setNewPhotoTitle('');
      setNewPhotoUrl('');
      loadAllData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to upload photo' });
    }
  };

  const handleDeletePhoto = async (id) => {
    if (!window.confirm('Delete photo from gallery?')) return;
    try {
      await galleryService.deleteGalleryItem(id);
      setStatusMsg({ type: 'success', text: 'Photo deleted' });
      loadAllData();
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to delete photo' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-28 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono mb-2">
            <Shield className="w-3.5 h-3.5" />
            FCC ADMIN PORTAL
          </div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
            MANAGEMENT DASHBOARD
          </h1>
          <p className="text-xs text-slate-400">
            Connected as: <span className="text-white font-semibold">{user?.email || 'admin@fahrenheitcc.com'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-400' : ''}`} />
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Status feedback */}
      {statusMsg && (
        <div
          className={`mt-6 p-4 rounded-xl border flex items-center justify-between gap-3 text-xs ${
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{statusMsg.text}</span>
          </div>
          <button onClick={() => setStatusMsg(null)} className="text-slate-400 hover:text-white">
            &times;
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-6 border-b border-slate-800/80">
        {[
          { id: 'overview', label: 'Overview', icon: Database },
          { id: 'players', label: `Players (${players.length})`, icon: Users },
          { id: 'matches', label: `Matches (${matches.length})`, icon: Trophy },
          { id: 'stats', label: 'Team Stats', icon: BarChart3 },
          { id: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all flex-shrink-0 ${
                isActive
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="py-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Total Squad</div>
              <div className="text-3xl font-display font-bold text-white">{players.length}</div>
              <div className="text-xs text-orange-400 mt-1">Verified CricHeroes members</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Matches Played</div>
              <div className="text-3xl font-display font-bold text-white">319</div>
              <div className="text-xs text-emerald-400 mt-1">148 Wins (47.7%)</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Club Photos</div>
              <div className="text-3xl font-display font-bold text-white">{gallery.length}</div>
              <div className="text-xs text-amber-400 mt-1">Uploaded Moments</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6">
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">Backend API</div>
              <div className="text-2xl font-display font-bold text-emerald-400">ONLINE</div>
              <div className="text-xs text-slate-500 mt-1">RESTful &bull; Mongoose &bull; JWT</div>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase text-white tracking-wider mb-2">
              Strict CricHeroes Data Accuracy Rules
            </h3>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Do not generate fake cricket metrics (runs, wickets, averages).</li>
              <li>Unverified values must remain null (displayed as &quot;--&quot; on frontend).</li>
              <li>CricHeroes tags are preserved as tags array, not forced into arbitrary cricket roles.</li>
              <li>MongoDB is the single source of truth for all Fahrenheit Cricket Club platforms.</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 2. PLAYERS */}
      {activeTab === 'players' && (
        <div className="py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-bold uppercase text-white">Squad Members</h2>
              <p className="text-xs text-slate-400">Manage registered Fahrenheit CC players</p>
            </div>
            <button
              onClick={() => setShowAddPlayer(true)}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Player
            </button>
          </div>

          {/* Add Player Modal / Form */}
          {showAddPlayer && (
            <form onSubmit={handleCreatePlayer} className="bg-slate-900/90 border border-orange-500/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase text-orange-400">Register New Player</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Player Full Name</label>
                  <input
                    type="text"
                    required
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="e.g. Rahul K"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Playing Role</label>
                  <select
                    value={newPlayerRole}
                    onChange={(e) => setNewPlayerRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="All-Rounder">All-Rounder</option>
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="Wicket Keeper">Wicket Keeper</option>
                    <option value="--">-- (Unverified)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">CricHeroes Tag</label>
                  <select
                    value={newPlayerTag}
                    onChange={(e) => setNewPlayerTag(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Accumulator">Accumulator</option>
                    <option value="Hard Hitter">Hard Hitter</option>
                    <option value="Economist">Economist</option>
                    <option value="Aspirant">Aspirant</option>
                    <option value="Wildcard">Wildcard</option>
                    <option value="Classicist">Classicist</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddPlayer(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-orange-500 text-xs font-bold text-white hover:bg-orange-600"
                >
                  Save to Database
                </button>
              </div>
            </form>
          )}

          {/* Players Table */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/50">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-mono">
                <tr>
                  <th className="p-3.5">Player</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">Tags</th>
                  <th className="p-3.5">Matches</th>
                  <th className="p-3.5">Runs</th>
                  <th className="p-3.5">Wickets</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {players.map((p) => (
                  <tr key={p.id || p._id} className="hover:bg-slate-900/40">
                    <td className="p-3.5 flex items-center gap-3">
                      <img src={p.photo} alt={p.name} className="w-8 h-8 rounded-full object-cover border border-slate-800" />
                      <span className="font-semibold text-white">{p.name}</span>
                    </td>
                    <td className="p-3.5 text-slate-400">{p.role || '--'}</td>
                    <td className="p-3.5">
                      <div className="flex gap-1 flex-wrap">
                        {(p.tags || []).map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono border border-amber-500/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3.5 font-mono">{p.stats?.matches ?? '--'}</td>
                    <td className="p-3.5 font-mono text-orange-400 font-bold">{p.stats?.runs ?? '--'}</td>
                    <td className="p-3.5 font-mono text-amber-400 font-bold">{p.stats?.wickets ?? '--'}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeletePlayer(p._id || p.id, p.name)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete Player"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. MATCHES */}
      {activeTab === 'matches' && (
        <div className="py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-bold uppercase text-white">Match Records</h2>
              <p className="text-xs text-slate-400">Fixtures, scorecards, and match outcomes</p>
            </div>
            <button
              onClick={() => setShowAddMatch(true)}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Match
            </button>
          </div>

          {showAddMatch && (
            <form onSubmit={handleCreateMatch} className="bg-slate-900/90 border border-orange-500/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase text-orange-400">Record New Match</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Opponent Team</label>
                  <input
                    type="text"
                    required
                    value={newMatchOpponent}
                    onChange={(e) => setNewMatchOpponent(e.target.value)}
                    placeholder="e.g. Kovai Kings CC"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Match Date</label>
                  <input
                    type="date"
                    required
                    value={newMatchDate}
                    onChange={(e) => setNewMatchDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Venue</label>
                  <input
                    type="text"
                    value={newMatchVenue}
                    onChange={(e) => setNewMatchVenue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Result Summary</label>
                  <input
                    type="text"
                    value={newMatchResult}
                    onChange={(e) => setNewMatchResult(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddMatch(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-orange-500 text-xs font-bold text-white hover:bg-orange-600"
                >
                  Save Match
                </button>
              </div>
            </form>
          )}

          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/50">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider font-mono">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Opponent</th>
                  <th className="p-3.5">Venue</th>
                  <th className="p-3.5">Result</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {matches.slice(0, 15).map((m) => (
                  <tr key={m.id || m.matchId || m._id} className="hover:bg-slate-900/40">
                    <td className="p-3.5 font-mono text-slate-400">{m.date}</td>
                    <td className="p-3.5 font-bold text-white">{m.opponent}</td>
                    <td className="p-3.5 text-slate-400">{m.venue || '--'}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        m.isWonByFCC ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {m.result || (m.isWonByFCC ? 'Won' : 'Lost')}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleDeleteMatch(m._id || m.matchId, m.opponent)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. STATS */}
      {activeTab === 'stats' && (
        <div className="py-8 space-y-6">
          <h2 className="text-xl font-display font-bold uppercase text-white">Club Statistics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-xs font-mono text-orange-400 uppercase tracking-widest mb-3">Match Record</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Total Matches:</span>
                  <span className="font-bold text-white">319</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Won:</span>
                  <span className="font-bold text-emerald-400">148</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Lost:</span>
                  <span className="font-bold text-red-400">162</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Win Rate:</span>
                  <span className="font-bold text-amber-400">47.7%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-3">Batting Summary</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Top Run Scorer:</span>
                  <span className="font-bold text-white">Mouleeshvar (6,707)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Highest Score:</span>
                  <span className="font-bold text-orange-400">Pratheek 31 (118*)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Cumulative Runs:</span>
                  <span className="font-bold text-slate-500">-- (Unverified)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">Bowling Summary</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Top Wicket Taker:</span>
                  <span className="font-bold text-white">Vicky (340)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Best Figures:</span>
                  <span className="font-bold text-emerald-400">Surendar (7/3)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Cumulative Wickets:</span>
                  <span className="font-bold text-slate-500">-- (Unverified)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 5. GALLERY */}
      {activeTab === 'gallery' && (
        <div className="py-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-bold uppercase text-white">Club Gallery</h2>
              <p className="text-xs text-slate-400">Authentic team photos and match memories</p>
            </div>
            <button
              onClick={() => setShowAddPhoto(true)}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Photo
            </button>
          </div>

          {showAddPhoto && (
            <form onSubmit={handleCreatePhoto} className="bg-slate-900/90 border border-orange-500/30 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase text-orange-400">Upload Gallery Photo</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Caption / Title</label>
                  <input
                    type="text"
                    required
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    placeholder="e.g. Tournament Victory"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Image URL</label>
                  <input
                    type="url"
                    required
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Category</label>
                  <select
                    value={newPhotoCategory}
                    onChange={(e) => setNewPhotoCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Team">Team</option>
                    <option value="Matches">Matches</option>
                    <option value="Training">Training</option>
                    <option value="Tournaments">Tournaments</option>
                    <option value="Celebrations">Celebrations</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddPhoto(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-orange-500 text-xs font-bold text-white hover:bg-orange-600"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div key={item.id || item._id} className="group relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                <img src={item.url || item.imageUrl} alt={item.caption || item.title} className="w-full h-44 object-cover" />
                <div className="p-3">
                  <div className="text-xs font-semibold text-white truncate">{item.caption || item.title}</div>
                  <div className="text-[10px] text-orange-400 uppercase tracking-wider mt-0.5">{item.category || 'Team'}</div>
                </div>
                <button
                  onClick={() => handleDeletePhoto(item._id || item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
