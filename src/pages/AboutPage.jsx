import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Shield,
  Trophy,
  Calendar,
  MapPin,
  Target,
  Heart,
  Award,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  Landmark,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  PhoneCall,
  Mail,
  Zap
} from 'lucide-react';
import teamData from '../data/teamData';

export default function AboutPage() {
  const venues = teamData.homeVenues || [];
  const stats = teamData.statsSummary || {};

  const timelineMilestones = [
    {
      year: 'AUGUST 2023',
      title: 'The Founding & Official CricHeroes Accreditation',
      tag: 'INCEPTION',
      tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      description:
        'Fahrenheit Cricket Club was officially founded on 24 August 2023 in Coimbatore by Captain Vicky and a dedicated group of cricket enthusiasts. The club was officially registered on CricHeroes (Team ID: #4978895) with a commitment to 100% digital scorekeeping transparency.',
      metrics: 'Team ID: #4978895 • 15 Founding Members'
    },
    {
      year: 'LATE 2023',
      title: 'Baptism by Fire & Rapid Momentum',
      tag: 'EARLY SUCCESS',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      description:
        'Taking to Coimbatore’s premier turf and matting grounds, FCC established its identity as a fearless, high-octane unit. Clinched 25+ victories within the first four months, building a reputation for aggressive batting and athletic fielding.',
      metrics: '25+ Victories • Arrow Oval Debut'
    },
    {
      year: 'MID 2024',
      title: 'Century of Matches & Roster Expansion',
      tag: 'MILESTONE',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      description:
        'Crossed the milestone of 100 competitive fixtures. The club expanded its registered roster to over 35 athletes, bringing in promising young prospects alongside battle-hardened veterans to establish deep squad balance.',
      metrics: '100+ Matches • 35 Registered Players'
    },
    {
      year: 'OCTOBER 2024',
      title: 'Record-Breaking 232/5 Batting Masterclass',
      tag: 'CLUB RECORD',
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      description:
        'FCC set their all-time highest match total in club history, smashing 232/5 in 25 overs against Take-Off Hitters. The match showcased the peak of the Fahrenheit batting ethos — dominant boundary hitting and smart running.',
      metrics: 'Highest Score: 232/5 • 9.28 Run Rate'
    },
    {
      year: 'PRESENT (2026)',
      title: '324+ Matches & A Formidable Brotherhood',
      tag: 'ELITE STATUS',
      tagColor: 'text-orange-400 bg-orange-500/20 border-orange-500/40',
      description:
        'Today, Fahrenheit Cricket Club stands as one of Coimbatore’s premier independent cricket clubs. With 324 verified matches, 150 victories, over 71,270 runs scored, and a vibrant 54-player brotherhood, FCC continues to raise the temperature on the turf.',
      metrics: '324 Matches • 150 Wins • 71,270 Runs • 54 Players'
    }
  ];

  const coreValues = [
    {
      icon: Flame,
      title: 'Fiery Passion (The Fahrenheit Spirit)',
      subtitle: 'Never Backing Down',
      color: 'text-orange-400',
      border: 'hover:border-orange-500/50',
      bgIcon: 'bg-orange-500/10 border-orange-500/20',
      description:
        'We attack every over with relentless energy, positive intent, and unyielding fire. Whether defending a modest 120 or hunting down 220, we play with the intense heat that our name represents.'
    },
    {
      icon: Heart,
      title: 'Unbreakable Brotherhood',
      subtitle: 'Unity Beyond the Boundary',
      color: 'text-amber-400',
      border: 'hover:border-amber-500/50',
      bgIcon: 'bg-amber-500/10 border-amber-500/20',
      description:
        'We are more than eleven players on a team sheet; we are a family. Every teammate’s success is celebrated as a collective triumph, and during tough spells we rally together without exception.'
    },
    {
      icon: Target,
      title: 'Iron Discipline & Execution',
      subtitle: 'The Grind Behind the Glory',
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
      bgIcon: 'bg-emerald-500/10 border-emerald-500/20',
      description:
        'Discipline separates good teams from great ones. From punctual match arrivals to strategic field placements and clear execution of bowler plans, we hold ourselves to rigorous athletic standards.'
    },
    {
      icon: Award,
      title: 'Spirit of Cricket & Fair Play',
      subtitle: 'Fierce Yet Honorable',
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/50',
      bgIcon: 'bg-cyan-500/10 border-cyan-500/20',
      description:
        'We play hard, fair, and with uncompromising integrity. We honor the traditions of the gentleman’s game, showing absolute respect to match officials, umpires, opponents, and spectators.'
    }
  ];

  return (
    <div className="pt-24 pb-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO HERITAGE BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a0f1d] border border-orange-500/30 shadow-2xl p-8 sm:p-14">
        {/* Ambient lighting overlays */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black uppercase tracking-widest border border-orange-500/30">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            ESTABLISHED 24 AUGUST 2023 • COIMBATORE, TAMIL NADU
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-white uppercase tracking-tight leading-none">
            THE FAHRENHEIT <span className="text-orange-500">HERITAGE</span> & STORY
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Born out of raw passion for the sport, Fahrenheit Cricket Club (FCC) has grown from a handful of dedicated local cricketers into one of Coimbatore’s most resilient, unified, and competitive limited-overs cricket brotherhoods.
          </p>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">FIXTURES</span>
              <p className="font-mono text-2xl font-black text-orange-400 mt-0.5">{stats.totalMatches || 324}</p>
              <span className="text-[10px] text-slate-500">Verified matches</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">VICTORIES</span>
              <p className="font-mono text-2xl font-black text-emerald-400 mt-0.5">{stats.wins || 150}</p>
              <span className="text-[10px] text-slate-500">Confirmed wins</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TOTAL RUNS</span>
              <p className="font-mono text-2xl font-black text-white mt-0.5">71,270</p>
              <span className="text-[10px] text-slate-500">Squad cumulative</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">BROTHERHOOD</span>
              <p className="font-mono text-2xl font-black text-amber-400 mt-0.5">54</p>
              <span className="text-[10px] text-slate-500">Registered players</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE ORIGIN: WHY "FAHRENHEIT"? */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
            <Zap className="w-4 h-4 text-orange-500" />
            THE IDENTITY BEHIND THE CREST
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
            WHY <span className="text-orange-500">FAHRENHEIT</span>?
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            <p>
              In cricket, there are moments when the stakes rise, the pulse races, and the ambient temperature on the 22 yards seems to soar. We chose the name <strong className="text-orange-400">Fahrenheit</strong> because it captures that exact thermal intensity — the scorching fire of competition that burns within our players.
            </p>
            <p>
              Just as metals are tempered, shaped, and hardened under high temperatures, our squad was forged through pressure-cooker chases, tight final-over defenses, and hundreds of hours spent under the hot Coimbatore sun.
            </p>
            <p className="text-slate-400">
              When opponents face Fahrenheit Cricket Club, they know they aren’t just playing against eleven individuals; they are facing a unit that embraces high-pressure heat, turns up the tempo, and refuses to wilt until the final ball is bowled.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-orange-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> Relentless Intensity
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> Composure Under Pressure
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" /> Brotherhood In Battle
            </span>
          </div>
        </div>

        {/* Crest & Slogan Card */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-br from-[#11192e] to-[#0a0f1d] border border-orange-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-32 h-32 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 shadow-2xl shadow-orange-950">
            <img
              src={teamData.logo}
              alt="Fahrenheit Cricket Club Crest"
              className="w-full h-full object-cover rounded-full bg-slate-900 border-2 border-slate-900"
            />
          </div>

          <div>
            <h3 className="font-display text-2xl font-black uppercase text-white tracking-wider">
              {teamData.name}
            </h3>
            <p className="text-xs text-orange-400 font-mono mt-1">
              Coimbatore, Tamil Nadu • CricHeroes #4978895
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block mb-1">
              OFFICIAL CLUB MOTTO
            </span>
            <blockquote className="font-display text-xl font-bold uppercase text-white tracking-wide text-orange-400">
              "{teamData.slogan}"
            </blockquote>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Three guiding words stamped into our jerseys, discussed in team huddles, and reflected in every matchday performance across Tamil Nadu.
          </p>
        </div>
      </div>

      {/* 3. CHRONOLOGICAL MILESTONES TIMELINE */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
            <Calendar className="w-4 h-4 text-orange-500" />
            THE CHRONICLES OF FCC
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
            CLUB MILESTONES & JOURNEY
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A chronological timeline of how Fahrenheit Cricket Club made its mark in Coimbatore cricket.
          </p>
        </div>

        <div className="relative border-l-2 border-orange-500/30 ml-4 sm:ml-8 md:ml-32 space-y-10">
          {timelineMilestones.map((m, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-orange-500 group-hover:bg-orange-500 group-hover:scale-125 transition-all shadow-md shadow-orange-500/50" />

              <div className="p-6 sm:p-8 rounded-2xl bg-[#0d1424] border border-slate-800 group-hover:border-orange-500/40 transition-colors shadow-xl space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-black text-orange-400 tracking-wider">
                    {m.year}
                  </span>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${m.tagColor}`}>
                    {m.tag}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
                  {m.title}
                </h3>

                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {m.description}
                </p>

                <div className="pt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>{m.metrics}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. THE FAHRENHEIT CODE: VISION & CORE VALUES */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
            <Target className="w-4 h-4 text-orange-500" />
            OUR CODE OF CONDUCT
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight">
            THE 4 PILLARS OF OUR PHILOSOPHY
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            The core values that govern every team selection, net practice session, and match tactical meeting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className={`p-8 rounded-3xl bg-[#0d1424] border border-slate-800 ${v.border} transition-all duration-300 shadow-xl space-y-4 hover:-translate-y-1`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${v.bgIcon} flex items-center justify-center ${v.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                      {v.subtitle}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
                      {v.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. OFFICIAL GROUNDS & PITCH DIRECTORY */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0d1424] border border-slate-800 shadow-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-2">
              <Landmark className="w-4 h-4 text-orange-500" />
              HOME TURF & BATTLEGROUNDS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
              PROMINENT COIMBATORE VENUES
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl font-sans">
              The iconic grounds across the district where Fahrenheit Cricket Club has staged 300+ fierce limited-overs clashes.
            </p>
          </div>
          <span className="text-xs font-mono text-orange-400 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 w-fit">
            4 Main Grounds Recorded
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((v) => (
            <div
              key={v.name}
              className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-orange-500/40 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white tracking-wide">
                  {v.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>{v.location}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Surface:</span>
                  <span className="text-white font-bold">{v.surface}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Matches:</span>
                  <span className="text-orange-400 font-bold">{v.matchesPlayed} games</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. LEADERSHIP & GOVERNANCE */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0e1628] via-[#0d1424] to-[#0a0f1d] border border-orange-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400">
            <Shield className="w-4 h-4 text-orange-500" />
            CLUB LEADERSHIP & FOUNDER
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white">
            FOUNDED ON VISION & FAIR PLAY
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Under the leadership of Captain and Administrator <strong className="text-white">Vicky</strong>, Fahrenheit Cricket Club has maintained a strict philosophy of meritocracy, youth development, and transparency. Every player who dons the FCC jersey earns their place through grit, passion, and respect for the team code.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 transition-all shadow-lg shadow-orange-950"
            >
              <span>Explore The Full Squad</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/stats"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
            >
              <span>View Club Statistics</span>
            </Link>
          </div>
        </div>

        {/* Founder Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center w-full lg:w-80 space-y-4 shrink-0 shadow-xl">
          <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 shadow-md">
            <img
              src="https://media.cricheroes.in/user_profile/1763205566475_Jqj1tbMDV3z7.jpeg"
              alt="Captain Vicky"
              className="w-full h-full object-cover rounded-full bg-slate-800"
            />
          </div>
          <div>
            <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">
              FOUNDER & CAPTAIN
            </span>
            <h4 className="font-display text-2xl font-bold uppercase text-white mt-0.5">
              VICKY
            </h4>
            <p className="text-xs text-slate-400 font-sans mt-1">
              All-Rounder • 340 Wickets • 3,350 Runs
            </p>
          </div>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-admin-contact'))}
            className="w-full py-2 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Contact Club Admin
          </button>
        </div>
      </div>

      {/* 7. DIGITAL TRANSPARENCY & CRICHEROES HUB */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0d1424] border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            100% VERIFIED CRICKET DATA
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
            CRICHEROES VERIFIED TEAM ID #4978895
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
            Every boundary, wicket, catch, and match outcome for Fahrenheit Cricket Club is scored live and archived transparently on CricHeroes. Inspect our public records, match video replays, and scorecards directly.
          </p>
        </div>

        <a
          href={teamData.socialLinks.cricheroes}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-950 shrink-0"
        >
          <span>Open CricHeroes Hub</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* 8. WEBSITE CREDITS & FREELANCE SERVICES */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#090d16] border border-slate-800/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400 font-bold px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
            DIGITAL PLATFORM &amp; ENGINEERING
          </span>
          <h4 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
            Designed &amp; Developed by Lakshman
          </h4>
          <p className="text-xs text-slate-400 font-sans max-w-xl leading-relaxed">
            Freelance UI/UX Designer &amp; Frontend Developer specializing in modern, responsive web experiences, sports platforms, and custom brand websites.
          </p>
        </div>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-work-with-me'))}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 transition-all shadow-md shadow-orange-950 shrink-0 group cursor-pointer"
        >
          <span>Work With Me</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
