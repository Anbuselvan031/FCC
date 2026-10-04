import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  MapPin,
  Calendar,
  Users,
  Trophy,
  Award,
  Flame,
  Target,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Mail,
  PhoneCall,
  Instagram,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Activity,
  Compass
} from 'lucide-react';
import teamData from '../data/teamData';
import playersData from '../data/playersData';
import galleryData from '../data/galleryData';
import matchesData from '../data/matchesData';

export default function TeamPage() {
  const stats = teamData.statsSummary || {};
  const totalPlayersCount = playersData.length || stats.totalPlayers || 51;
  const recentPhotos = galleryData.slice(0, 4);

  // Compute Squad Composition Counts (high-level statistics only)
  const roleCounts = React.useMemo(() => {
    const counts = { all: playersData.length, batsmen: 0, allrounders: 0, bowlers: 0, keepers: 0 };
    playersData.forEach((p) => {
      const r = (p.role || '').toLowerCase();
      const pName = (p.name || '').toLowerCase();
      if (r.includes('keeper') || r.includes('wicket') || pName.includes('kiruthik')) counts.keepers++;
      else if (r.includes('all-rounder') || r.includes('all rounder')) counts.allrounders++;
      else if (r.includes('bowler')) counts.bowlers++;
      else counts.batsmen++;
    });
    return counts;
  }, []);

  // Leadership (Captain & Vice Captain only)
  const captain = playersData.find((p) => p.isCaptain) || playersData.find((p) => p.name.toLowerCase().includes('vicky'));
  const viceCaptain = playersData.find((p) => p.name.toLowerCase().includes('mouleeshvar'));

  return (
    <div className="pt-24 pb-20 space-y-16 sm:space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. TEAM PROFILE & BANNER */}
      <section className="relative rounded-3xl overflow-hidden bg-[#0a0f1d] border border-slate-800 shadow-2xl">
        {/* Cover Background */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={teamData.coverImage}
            alt="Fahrenheit Cricket Club Cover"
            className="w-full h-full object-cover filter brightness-[0.35] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/60 to-transparent" />
        </div>

        {/* Profile Info Overlay */}
        <div className="relative px-6 sm:px-10 pb-8 sm:pb-10 -mt-20 sm:-mt-24 z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
          {/* Team Logo Crest */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex-shrink-0 shadow-2xl shadow-orange-950">
            <img
              src={teamData.logo}
              alt="Fahrenheit Cricket Club Crest"
              className="w-full h-full object-cover rounded-full bg-slate-900 border-2 border-slate-900"
            />
          </div>

          {/* Title & Details */}
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-wider border border-orange-500/30">
              <Flame className="w-3.5 h-3.5" />
              OFFICIAL CLUB IDENTITY & TEAM PROFILE
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
              FAHRENHEIT <span className="text-orange-500">CRICKET CLUB</span>
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-sans">
              <span className="flex items-center gap-1.5 font-bold text-white">
                <MapPin className="w-4 h-4 text-orange-500" />
                Coimbatore, Tamil Nadu
              </span>
              <span className="flex items-center gap-1.5 font-bold text-white">
                <Calendar className="w-4 h-4 text-orange-500" />
                Established: 24 August 2023
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                Captain: <strong className="text-orange-400 font-bold">{teamData.captainName}</strong>
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                CricHeroes ID: <strong className="text-white font-mono">#{teamData.cricHeroesTeamId}</strong>
              </span>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/players"
              className="px-5 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-lg shadow-orange-950 transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>SQUAD DIRECTORY</span>
            </Link>
            <a
              href={teamData.socialLinks.cricheroes}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <span>CRICHEROES HUB</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. LEADERSHIP SPOTLIGHT (Captain & Vice-Captain Compact Cards) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-1">
              <Shield className="w-4 h-4 text-orange-500" />
              ON-FIELD LEADERSHIP
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
              CAPTAINS OF THE SHIP
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-sans max-w-md">
            Guiding Fahrenheit Cricket Club through tactical decisions, field placements, and leading from the front with bat and ball.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Captain: Vicky */}
          {captain && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1424] border border-amber-500/40 shadow-xl space-y-5 hover:border-amber-400 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    CLUB CAPTAIN & ADMINISTRATOR
                  </span>
                  <span className="font-mono text-sm font-black text-amber-400">
                    #{captain.jerseyNumber || '7'}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={captain.photo}
                    alt={captain.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500/50 bg-slate-900 shadow-md"
                  />
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                      {captain.name}
                    </h3>
                    <p className="text-xs text-amber-400 font-mono mt-0.5">
                      {captain.role || 'All-Rounder'} • {captain.bowlingStyle || 'Right-arm Off Break'}
                    </p>
                    <p className="text-xs text-slate-400 font-sans mt-1">
                      Founding captain leading through disciplined bowling spells and strategic batting in death overs.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-800 text-center font-mono">
                  <div className="p-3 rounded-xl bg-slate-900">
                    <span className="text-[10px] text-slate-400 uppercase block">WICKETS</span>
                    <span className="text-lg font-bold text-amber-400">340</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900">
                    <span className="text-[10px] text-slate-400 uppercase block">RUNS</span>
                    <span className="text-lg font-bold text-white">3,350</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900">
                    <span className="text-[10px] text-slate-400 uppercase block">MATCHES</span>
                    <span className="text-lg font-bold text-emerald-400">314</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/players/${captain.id}`}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30 transition-colors"
              >
                <span>View Captain Profile</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Vice-Captain: Mouleeshvar */}
          {viceCaptain && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1424] border border-orange-500/40 shadow-xl space-y-5 hover:border-orange-400 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    VICE-CAPTAIN & ORANGE CAP
                  </span>
                  <span className="font-mono text-sm font-black text-orange-400">
                    #{viceCaptain.jerseyNumber || '23'}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={viceCaptain.photo}
                    alt={viceCaptain.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-500/50 bg-slate-900 shadow-md"
                  />
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                      {viceCaptain.name}
                    </h3>
                    <p className="text-xs text-orange-400 font-mono mt-0.5">
                      All-Rounder • Top Run Scorer
                    </p>
                    <p className="text-xs text-slate-400 font-sans mt-1">
                      Premier run-machine and anchor batsman holding the club’s record for career centuries and fifty-plus scores.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-slate-800 text-center font-mono">
                  <div className="p-3 rounded-xl bg-slate-900">
                    <span className="text-[10px] text-slate-400 uppercase block">RUNS</span>
                    <span className="text-lg font-bold text-orange-400">7,314</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900">
                    <span className="text-[10px] text-slate-400 uppercase block">WICKETS</span>
                    <span className="text-lg font-bold text-white">110</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900">
                    <span className="text-[10px] text-slate-400 uppercase block">CATCHES</span>
                    <span className="text-lg font-bold text-emerald-400">103</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/players/${viceCaptain.id}`}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30 transition-colors"
              >
                <span>View Star Record</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 3. TEAM STATISTICS */}
      <section className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1424] border border-orange-500/30 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-500" />
              <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
                OFFICIAL TEAM RECORD CARD
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              CricHeroes Verified Platform Stats
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATCHES PLAYED</p>
              <p className="font-display text-2xl font-black text-white mt-1">
                {stats.totalMatches || 324}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CONFIRMED WINS</p>
              <p className="font-display text-2xl font-black text-emerald-400 mt-1">
                {stats.wins || 150}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATCH LOSSES</p>
              <p className="font-display text-2xl font-black text-rose-400 mt-1">
                {stats.losses || 164}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WIN PERCENTAGE</p>
              <p className="font-display text-2xl font-black text-orange-400 mt-1">
                {stats.winPercentage || 46.3}%
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOSS WON</p>
              <p className="font-display text-2xl font-black text-amber-400 mt-1">
                {stats.tossWon || 160}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL SQUAD</p>
              <p className="font-display text-2xl font-black text-cyan-400 mt-1">
                {totalPlayersCount}
              </p>
            </div>
          </div>
        </div>

        {/* Squad Composition Breakdown (Counts only, no player list) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800 hover:border-orange-500/40 transition-colors">
            <span className="text-xs font-mono uppercase text-orange-400 font-bold block mb-1">ALL-ROUNDERS</span>
            <p className="font-display text-3xl font-black text-white">{roleCounts.allrounders}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">Core team balance providing batting depth and crucial overs.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800 hover:border-amber-500/40 transition-colors">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold block mb-1">BATSMEN</span>
            <p className="font-display text-3xl font-black text-white">{roleCounts.batsmen}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">Top-order anchors and aggressive middle-order power hitters.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold block mb-1">BOWLERS</span>
            <p className="font-display text-3xl font-black text-white">{roleCounts.bowlers}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">New-ball seam attack, death-over specialists, and finger spinners.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800 hover:border-cyan-500/40 transition-colors">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold block mb-1">WICKET KEEPERS</span>
            <p className="font-display text-3xl font-black text-white">{roleCounts.keepers}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">Specialist glovemen responsible for over 200+ team dismissals.</p>
          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE & MATCHES SUMMARY */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            COMPETITIVE SUMMARY
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide mt-1">
            PERFORMANCE & TACTICAL ANALYSIS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-orange-400 block">TOSS & STRATEGY</span>
            <h3 className="font-display text-xl font-bold uppercase text-white">DEFENDING VS CHASING</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Out of 160 tosses won, FCC has elected to bat first 84 times (52.5%) and field first 76 times (47.5%), showcasing tactical adaptability to varying morning dew and pitch conditions.
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>Bat 1st: <strong>84 times</strong></span>
              <span>Bowl 1st: <strong>76 times</strong></span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-amber-400 block">FORMAT DOMINANCE</span>
            <h3 className="font-display text-xl font-bold uppercase text-white">LIMITED OVERS & T20</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Specialists in 20-over and 25-over competitive white-ball and leather ball cricket. The squad boasts a team scoring average of 152+ runs per innings on turf wickets.
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>Avg Score: <strong>152.4</strong></span>
              <span>Ball Type: <strong>Leather / Heavy Tennis</strong></span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold uppercase text-emerald-400 block">TEAM CONSISTENCY</span>
            <h3 className="font-display text-xl font-bold uppercase text-white">VICTORY CONVERSION</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              With 150 match victories across official tournaments and bilateral clashes, Fahrenheit Cricket Club ranks among the top competitive weekend squads in the Coimbatore district circuit.
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>Win Ratio: <strong>46.3%</strong></span>
              <span>Tied Matches: <strong>3</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ACHIEVEMENTS & TROPHY CABINET */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
            <Trophy className="w-4 h-4 text-amber-500" />
            SILVERWARE & HONORS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide mt-1">
            TROPHIES & CLUB MILESTONES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0d1424] to-[#121c33] border border-amber-500/40 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                CHAMPIONS • 2025
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-white mt-2">
                BUDDIES T/25 BLAST LEAGUE SEASON II
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
                Crown champions of the Buddies T/25 Blast tournament, defeating tough city opposition in high-pressure playoff matches.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0d1424] to-[#121c33] border border-orange-500/40 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                BILATERAL CROWN • 2026
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-white mt-2">
                ARROW OVAL BILATERAL ENCOUNTERS
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
                Consistently dominant record at Arrow Oval, securing series victories against top-tier rival Coimbatore cricket clubs.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0d1424] to-[#121c33] border border-cyan-500/40 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                HISTORIC MILESTONE
              </span>
              <h3 className="font-display text-xl font-bold uppercase text-white mt-2">
                300+ COMPETITIVE MATCHES RECORD
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
                Achieved the rare distinction of playing over 300 competitive encounters on CricHeroes within 3 years of establishment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOME GROUNDS & VENUES */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
            <Compass className="w-4 h-4 text-orange-500" />
            BATTLEGROUNDS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide mt-1">
            HOME GROUNDS & HOSTING VENUES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(teamData.homeVenues || []).slice(0, 3).map((venue, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800 hover:border-orange-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-mono font-bold uppercase border border-orange-500/20">
                  {venue.surface}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {venue.matchesPlayed}+ Matches
                </span>
              </div>

              <h3 className="font-display text-xl font-bold uppercase text-white">
                {venue.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                <span>{venue.location}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-sans pt-2 border-t border-slate-800">
                Regular training and official fixture venue featuring true bounce, fast outfield boundaries, and dedicated match pavilions.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TEAM HIGHLIGHTS, APPAREL & OFFICIAL CONTACT */}
      <section className="space-y-8">
        {/* Kit, Colors & Matchday Identity */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0d1424] border border-slate-800 shadow-2xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
              <Shield className="w-4 h-4 text-orange-500" />
              OFFICIAL TEAM IDENTITY & COLORS
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide mt-1">
              COLORS, KIT & MATCHDAY PROTOCOL
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold font-mono">
                01
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-white">PRIMARY COLORS</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Radiant Sunset Orange & Deep Obsidian Charcoal. Orange represents our fierce competitive fire; Charcoal symbolizes solid, grounded team unity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono">
                02
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-white">MATCHDAY APPAREL</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Breathable athletic performance dri-fit fabric custom-engineered for Coimbatore’s climate, embossed with the official Fahrenheit crest and player jersey numbers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono">
                03
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-white">MATCHDAY PROTOCOL</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Pre-match huddle, strict reporting time 45 minutes before toss, rigorous warmups, and coordinated team gear for every competitive fixture.
              </p>
            </div>
          </div>
        </div>

        {/* Team Highlights Gallery Strip */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
              TEAM MOMENTS & MEMORIES
            </h3>
            <Link
              to="/gallery"
              className="text-xs font-bold uppercase text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
            >
              <span>View Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recentPhotos.map((photo) => (
              <Link
                key={photo.id}
                to="/gallery"
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    if (photo.fallbackUrl && e.target.src !== photo.fallbackUrl) {
                      e.target.src = photo.fallbackUrl;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
                  <span className="text-xs font-bold text-white uppercase truncate group-hover:text-orange-400 transition-colors">
                    {photo.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{photo.location}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Connect with FCC & Club Administration */}
        <div id="admin-contact" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0d1424] to-[#070b14] border border-orange-500/30 shadow-2xl relative overflow-hidden shine-sweep scroll-mt-28">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  OFFICIAL CONTACT HUB
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
                  CONNECT WITH FCC
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl font-sans">
                  Official club desk for fixture bookings, tournament invites, squad recruitments, and media.
                </p>
              </div>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-admin-contact'))}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 text-xs text-slate-300 font-mono w-fit cursor-pointer transition-colors"
                title="Touch for Admin Contact Modal"
              >
                <Shield className="w-3.5 h-3.5 text-orange-500" />
                <span>Admin: <strong className="text-white">{teamData.contact.admin.name}</strong></span>
                <span className="text-[10px] text-orange-400 underline decoration-dotted ml-1">View Details</span>
              </button>
            </div>

            {/* 3 Contact Channels Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href={`mailto:${teamData.contact.email}`}
                className="p-6 rounded-2xl bg-[#090d16] border border-slate-800 hover:border-orange-500/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-slate-950 transition-all duration-300 mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                    OFFICIAL EMAIL
                  </span>
                  <h3 className="font-bold text-white text-base group-hover:text-orange-400 transition-colors break-all">
                    {teamData.contact.email}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Direct inquiries, match score sheets, and official communications.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-orange-400 group-hover:text-orange-300">
                  <span>Send Email</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a
                href={`tel:+91${teamData.contact.phone}`}
                className="p-6 rounded-2xl bg-[#090d16] border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 mb-4">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                    PHONE & WHATSAPP
                  </span>
                  <h3 className="font-mono text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {teamData.contact.phoneFormatted}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Call or WhatsApp for immediate match coordination and turf scheduling.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300">
                  <span>Call Now</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a
                href={teamData.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-6 rounded-2xl bg-[#090d16] border border-slate-800 hover:border-pink-500/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-slate-950 transition-all duration-300 mb-4">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                    INSTAGRAM HANDLE
                  </span>
                  <h3 className="font-bold text-white text-base group-hover:text-pink-400 transition-colors">
                    {teamData.contact.instagramHandle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Follow for match highlights, reels, POTM announcements, and BTS footage.
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-pink-400 group-hover:text-pink-300">
                  <span>Follow Profile</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </div>

            {/* Admin Details Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 flex-shrink-0 shadow-md">
                  <img
                    src={teamData.logo}
                    alt={teamData.name}
                    className="w-full h-full object-cover rounded-full bg-slate-900"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                    OFFICIAL CLUB ADMINISTRATOR
                  </span>
                  <h4 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                    {teamData.contact.admin.name}
                  </h4>
                  <p className="text-xs text-orange-400 font-mono">
                    {teamData.contact.admin.role} • Coimbatore
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:+91${teamData.contact.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+91 90039 10149</span>
                </a>
                <a
                  href={teamData.contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
