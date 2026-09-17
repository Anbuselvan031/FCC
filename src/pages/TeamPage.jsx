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
  Landmark,
  Mail,
  PhoneCall,
  Instagram,
  MessageSquare
} from 'lucide-react';
import teamData from '../data/teamData';
import playersData from '../data/playersData';

export default function TeamPage() {
  const stats = teamData.statsSummary || {};
  const venues = teamData.homeVenues || [];
  const totalPlayersCount = playersData.length || stats.totalPlayers || 55;

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO PROFILE BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a0f1d] border border-slate-800 shadow-2xl">
        {/* Cover Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={teamData.coverImage}
            alt="Fahrenheit Cricket Club Cover"
            className="w-full h-full object-cover filter brightness-[0.4] contrast-110"
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
              OFFICIAL TEAM PROFILE
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
                Since: 24 August 2023
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                Captain: <strong className="text-orange-400 font-bold">{teamData.captainName}</strong>
              </span>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-admin-contact'))}
                className="flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors cursor-pointer bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-orange-500/50"
                title="Touch to view Vicky's Phone, Mail and Contact Details"
              >
                <Shield className="w-3.5 h-3.5 text-orange-500" />
                <span>Admin: <strong className="text-white font-bold">{teamData.contact.admin.name}</strong></span>
              </button>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/players"
              className="px-5 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-lg shadow-orange-950 transition-all"
            >
              VIEW SQUAD ({totalPlayersCount})
            </Link>
            <a
              href={teamData.socialLinks.cricheroes}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <span>CRICHEROES</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. TEAM INFORMATION CARD (Prompt Section 11) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1424] border border-orange-500/30 shadow-2xl">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-orange-500" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            OFFICIAL TEAM RECORD CARD
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TEAM NAME</p>
            <p className="font-display text-base sm:text-lg font-bold text-white mt-1 truncate">
              {teamData.name}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LOCATION</p>
            <p className="font-display text-base sm:text-lg font-bold text-orange-400 mt-1">
              {teamData.location}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ESTABLISHED</p>
            <p className="font-display text-base sm:text-lg font-bold text-white mt-1">
              {teamData.established}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">REGISTERED SQUAD</p>
            <p className="font-display text-2xl font-black text-amber-400 mt-1">
              {totalPlayersCount}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATCHES PLAYED</p>
            <p className="font-display text-2xl font-black text-white mt-1">
              {stats.totalMatches || '--'}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CONFIRMED WINS</p>
            <p className="font-display text-2xl font-black text-emerald-400 mt-1">
              {stats.wins || '--'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. ABOUT US & OUR STORY (Prompt Section 10) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* About Us Card */}
        <div className="p-8 rounded-3xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
            <Shield className="w-4 h-4" />
            ABOUT US
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
            THE FAHRENHEIT CRICKET BROTHERHOOD
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {teamData.about.intro}
          </p>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            Known affectionately as FCC across the Coimbatore district, our squad blends seasoned match winners with hungry young prospects, competing rigorously under the auspices of the CricHeroes league network.
          </p>
        </div>

        {/* Our Story Card */}
        <div className="p-8 rounded-3xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
            <Calendar className="w-4 h-4" />
            OUR STORY
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
            BUILT FROM GENUINE PASSION
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {teamData.about.story}
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-orange-400">
            <span>• 319 Verified Matches</span>
            <span>• {totalPlayersCount} Registered Athletes</span>
            <span>• 4 Championship Venues</span>
          </div>
        </div>
      </div>

      {/* 4. VISION & CORE VALUES */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-2">
            <Target className="w-4 h-4" />
            OUR CODE OF CONDUCT
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            VISION & CORE VALUES
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            The philosophical pillars that guide every delivery, boundary, and match-day strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamData.about.values.map((v, i) => (
            <div
              key={v.title}
              className="p-6 rounded-2xl bg-[#0c1220] border border-slate-800 hover:border-orange-500/40 shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="font-display text-xl font-bold uppercase text-white tracking-wide">
                {v.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. OFFICIAL GROUNDS & VENUES */}
      <div className="p-8 rounded-3xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
              <Landmark className="w-4 h-4" />
              HOME GROUNDS & PITCHES
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white mt-1">
              PROMINENT COIMBATORE VENUES
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Key match turf & outfields
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((v) => (
            <div
              key={v.name}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
            >
              <h4 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                {v.name}
              </h4>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                {v.location}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] font-mono border-t border-slate-800">
                <span className="text-slate-500">Surface:</span>
                <span className="text-slate-300 font-semibold">{v.surface}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Matches:</span>
                <span className="text-orange-400 font-bold">{v.matchesPlayed} games</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. CONNECT WITH FCC & CLUB ADMINISTRATION */}
      <div id="admin-contact" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0d1424] to-[#070b14] border border-orange-500/30 shadow-2xl relative overflow-hidden shine-sweep scroll-mt-28">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 space-y-8">
          {/* Section Header */}
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
            {/* 1. Email Card */}
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

            {/* 2. Phone / WhatsApp Card */}
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

            {/* 3. Instagram Card */}
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
    </div>
  );
}
