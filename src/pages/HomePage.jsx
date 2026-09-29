import React from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Shield,
  Flame,
  Users,
  Calendar,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Camera,
  Award,
  MapPin,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import Hero from '../components/home/Hero';
import TeamOverviewStats from '../components/home/TeamOverviewStats';
import LatestMatchCard from '../components/home/LatestMatchCard';
import NextMatchCard from '../components/home/NextMatchCard';
import RecentForm from '../components/home/RecentForm';
import TeamJourney from '../components/home/TeamJourney';
import teamData from '../data/teamData';
import matchesData from '../data/matchesData';
import galleryData from '../data/galleryData';
import playersData from '../data/playersData';

export default function HomePage() {
  const latestMatch = matchesData.find((m) => m.type === 'completed');
  const nextMatch = matchesData.find((m) => m.type === 'upcoming');
  const recentPhotos = galleryData.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. LATEST & UPCOMING MATCHES (MATCH ACTION CENTER) */}
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
              <span className="text-orange-400 font-mono">{latestMatch?.date || '27 Sep 2026'}</span>
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
              <span className="text-amber-400 font-mono">{nextMatch?.date || '03 Oct 2026'}</span>
            </div>
            <NextMatchCard />
          </div>
        </div>

        {/* Recent Form Streak */}
        <div className="mt-8">
          <RecentForm />
        </div>
      </section>

      {/* 3. KEY TEAM STATISTICS */}
      <TeamOverviewStats />

      {/* 4. RECENT ACHIEVEMENTS & HISTORICAL MILESTONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Silverware Callout Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-600/20 via-[#0d1424] to-orange-600/20 border border-amber-500/40 p-6 sm:p-8 mb-12 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-lg shadow-amber-950">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                CHAMPIONS TROPHY • SEASON II
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                BUDDIES T/25 BLAST LEAGUE WINNERS
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
                Fahrenheit Cricket Club lifted the prestigious Season II Championship silverware with standout bowling and clutch batting performances.
              </p>
            </div>
          </div>

          <Link
            to="/gallery?photo=1025283"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 shadow-md shadow-orange-950 transition-all group"
          >
            <span>View Honors</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Timeline Journey */}
        <TeamJourney />
      </section>

      {/* 5. LATEST PHOTOS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-400 mb-2">
              <Camera className="w-3.5 h-3.5 text-orange-500" />
              OFFICIAL GALLERY
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              LATEST CLUB MOMENTS
            </h2>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors group"
          >
            <span>View Full Gallery ({galleryData.length} Photos)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentPhotos.map((photo) => (
            <Link
              key={photo.id}
              to={`/gallery?photo=${photo.id}`}
              className="group relative rounded-2xl bg-[#0d1424] border border-slate-800 hover:border-orange-500/50 shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    if (photo.fallbackUrl && e.target.src !== photo.fallbackUrl) {
                      e.target.src = photo.fallbackUrl;
                    }
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-orange-400 text-[10px] font-extrabold uppercase tracking-wider border border-white/10">
                    {photo.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-display text-base font-bold uppercase text-white tracking-wide group-hover:text-orange-400 transition-colors truncate">
                  {photo.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span className="truncate text-slate-300 font-sans">{photo.location}</span>
                  <span className="font-mono text-slate-500">{photo.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. SHORT "ABOUT THE CLUB" SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0d1424] border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
                <Shield className="w-4 h-4 text-orange-500" />
                ABOUT THE CLUB
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
                PASSION. PERFORMANCE. BROTHERHOOD.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Established on 24 August 2023 in Coimbatore, Tamil Nadu, Fahrenheit Cricket Club has grown into one of the region’s most competitive and disciplined cricket sides. Contesting over 320 fixtures across renowned grounds like Arrow Oval and Venpaa Sports Academy, the club stands for fierce cricketing intent and unwavering team brotherhood.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>324+ Competitive Clashes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>150 Confirmed Victories</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>CricHeroes ID #4978895</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Registered Active Squad</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-orange-400">TEAM IDENTITY</span>
                  <span className="text-[10px] text-slate-500 font-mono">COIMBATORE</span>
                </div>
                <h4 className="font-display text-lg font-bold uppercase text-white">THE FAHRENHEIT SPIRIT</h4>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Every player plays with fearless cricketing intent, backing teammates from the first delivery to the final ball of every over.
                </p>
                <div className="pt-2">
                  <Link
                    to="/team"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <span>Read Full Team Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VIEW PLAYERS CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-orange-600/20 via-[#11192e] to-amber-500/20 border border-orange-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
              <Users className="w-3.5 h-3.5 text-orange-400" />
              SQUAD DIRECTORY
            </div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
              MEET THE ENTIRE SQUAD
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Explore individual player statistics, batting averages, bowling economy rates, jersey numbers, and authentic match scorecards for all {playersData.length} registered cricketers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/players"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display text-base font-bold tracking-wider uppercase text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-xl shadow-orange-950 transition-all duration-200"
            >
              <Users className="w-4 h-4" />
              <span>VIEW ALL PLAYERS ({playersData.length})</span>
            </Link>
            <Link
              to="/team"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display text-base font-bold tracking-wider uppercase text-slate-200 bg-slate-900 border border-slate-700 hover:border-orange-500 hover:text-white transition-all duration-200"
            >
              <Shield className="w-4 h-4" />
              <span>TEAM PROFILE</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
