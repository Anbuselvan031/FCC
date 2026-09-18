import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Shield, Flame, Users, Calendar, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import Hero from '../components/home/Hero';
import TeamOverviewStats from '../components/home/TeamOverviewStats';
import LatestMatchCard from '../components/home/LatestMatchCard';
import NextMatchCard from '../components/home/NextMatchCard';
import RecentForm from '../components/home/RecentForm';
import FeaturedPlayers from '../components/home/FeaturedPlayers';
import SlidingPlayerShowcase from '../components/home/SlidingPlayerShowcase';
import TeamJourney from '../components/home/TeamJourney';
import teamData from '../data/teamData';

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. OVERVIEW ANIMATED STATS */}
      <TeamOverviewStats />

      {/* 3. MATCH SHOWCASE SECTION: Latest & Next Match Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-400 mb-2">
              <Trophy className="w-3.5 h-3.5 text-orange-500" />
              MATCH ACTION CENTER
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              CLASH OF THE TITANS
            </h2>
          </div>

          <Link
            to="/matches"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors group"
          >
            <span>Explore All Matches</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Latest Completed Match */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                LATEST RESULT
              </span>
              <span className="text-orange-400 font-mono">05 Sep 2026</span>
            </div>
            <LatestMatchCard />
          </div>

          {/* Upcoming Next Match */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                UPCOMING FIXTURE
              </span>
              <span className="text-amber-400 font-mono">19 Sep 2026</span>
            </div>
            <NextMatchCard />
          </div>
        </div>

        {/* Recent Form Streak */}
        <div className="mt-8">
          <RecentForm />
        </div>
      </section>

      {/* 4. DYNAMIC ANIMATED CRICKET SLIDER SHOWCASE */}
      <div id="sliding-team-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SlidingPlayerShowcase />
      </div>

      {/* 5. FEATURED PLAYERS (PLAYERS TO WATCH) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedPlayers />
      </div>

      {/* 6. TEAM JOURNEY & MILESTONES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TeamJourney />
      </div>

      {/* 6. CALL TO ACTION / CRICHEROES HUB BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-orange-600/20 via-[#11192e] to-amber-500/20 border border-orange-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              JOIN THE BROTHERHOOD
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
              PROUDLY REPRESENTING COIMBATORE CRICKET
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Experience the passion of Fahrenheit Cricket Club. Explore verified player stats, match ball-by-ball scorecards, and tournament standing directly on our digital platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/team"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display text-base font-bold tracking-wider uppercase text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-xl shadow-orange-950 transition-all duration-200"
            >
              <Shield className="w-4 h-4" />
              <span>TEAM PROFILE</span>
            </Link>
            <a
              href={teamData.socialLinks.cricheroes}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display text-base font-bold tracking-wider uppercase text-slate-200 bg-slate-900 border border-slate-700 hover:border-orange-500 hover:text-white transition-all duration-200"
            >
              <span>CRICHEROES HUB</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
