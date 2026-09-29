import React from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Youtube,
  PhoneCall,
  Mail,
  Shield,
  MapPin,
  Calendar,
  ExternalLink,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import teamData from '../../data/teamData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#05070a] border-t border-slate-800/80 text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-orange-600/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-slate-800/60">
          {/* Col 1: Club Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 shadow-md shadow-orange-950">
                <img
                  src={teamData.logo}
                  alt="Fahrenheit Cricket Club Crest"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold tracking-wider text-white uppercase leading-tight">
                  FAHRENHEIT CRICKET CLUB
                </h3>
                <p className="text-xs text-orange-400 font-semibold tracking-wider uppercase">
                  Coimbatore
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              "Passion. Performance. Brotherhood." Official digital home of Coimbatore's premier cricket brotherhood, competing in elite limited-overs and tournament cricket.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                <span>Since <strong className="text-slate-200">24 August 2023</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-orange-500" />
                <span>Captain: <strong className="text-slate-200">Vicky</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              QUICK NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors flex items-center justify-between group">
                  <span>Home</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-orange-400 transition-colors flex items-center justify-between group">
                  <span>Team Profile</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/players" className="hover:text-orange-400 transition-colors flex items-center justify-between group">
                  <span>Our Squad ({teamData.statsSummary.totalPlayers} Players)</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/matches" className="hover:text-orange-400 transition-colors flex items-center justify-between group">
                  <span>Match Center</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-orange-400 transition-colors flex items-center justify-between group">
                  <span>Player Leaderboard</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </Link>
              </li>
              <li>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-admin-contact'))}
                  className="hover:text-orange-400 transition-colors flex items-center justify-between group w-full text-left cursor-pointer"
                >
                  <span>Direct Club Contact</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Statistics & Archives */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              CLUB ARCHIVES
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/stats" className="hover:text-orange-400 transition-colors flex items-center justify-between group">
                  <span>Team Analytics & Records</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-orange-400 transition-colors flex items-center justify-between group">
                  <span>Memories on the Field</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-400 transition-colors flex items-center justify-between group">
                  <span>Our Story & Values</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-orange-400 transition-colors" />
                </Link>
              </li>
              <li>
                <a
                  href={teamData.socialLinks.cricheroes}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-orange-400 transition-colors flex items-center justify-between group text-orange-400/90 font-medium"
                >
                  <span>CricHeroes Official Hub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              CONNECT WITH FCC
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official club desk for fixture bookings, player inquiries, and media.
            </p>

            {/* Direct Contact Details: Mail, Phone, Instagram */}
            <div className="space-y-2.5 text-xs pt-1">
              {/* Mail */}
              <a
                href={`mailto:${teamData.contact.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-orange-400 transition-colors group"
                title="Send official email to Fahrenheit Cricket Club"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-400 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 group-hover:scale-105 transition-all flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Email Us</span>
                  <span className="text-white group-hover:text-orange-400 truncate block font-medium">{teamData.contact.email}</span>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:+91${teamData.contact.phone}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors group"
                title="Call Fahrenheit Cricket Club Admin"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 group-hover:scale-105 transition-all flex-shrink-0">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Call / WhatsApp</span>
                  <span className="text-white group-hover:text-emerald-400 font-bold font-mono tracking-wide">{teamData.contact.phoneFormatted}</span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={teamData.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-pink-400 transition-colors group"
                title="Follow Fahrenheit Cricket Club on Instagram"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-pink-400 group-hover:border-pink-500/50 group-hover:bg-pink-500/10 group-hover:scale-105 transition-all flex-shrink-0">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Official Instagram</span>
                  <span className="text-white group-hover:text-pink-400 font-medium truncate block">{teamData.contact.instagramHandle}</span>
                </div>
              </a>
            </div>

            {/* Admin Details Interactive Button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-admin-contact'))}
              className="w-full text-left p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-800/80 text-[11px] space-y-1.5 transition-all group/admin cursor-pointer shadow-sm hover:shadow-orange-500/10 focus:outline-none"
              title="Touch to view Vicky's Phone, Mail, and Contact Details"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-400 uppercase tracking-wider font-mono text-[10px] group-hover/admin:text-orange-400 transition-colors whitespace-nowrap">
                  Club Admin Details
                </span>
                <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[9px] font-black uppercase tracking-wider group-hover/admin:bg-orange-500 group-hover/admin:text-slate-950 transition-colors whitespace-nowrap shrink-0">
                  TOUCH FOR CONTACT
                </span>
              </div>
              <p className="font-bold text-white flex items-center gap-1.5 group-hover/admin:text-orange-400 transition-colors">
                <Shield className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                <span className="whitespace-nowrap">{teamData.contact.admin.name}</span>
                <span className="text-[10px] text-slate-400 font-normal truncate">({teamData.contact.admin.role})</span>
              </p>
              <div className="pt-0.5 flex items-center justify-between gap-2 border-t border-slate-800/70 text-emerald-400 font-mono">
                <span className="text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5 shrink-0">
                  <PhoneCall className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="whitespace-nowrap tracking-wide">{teamData.contact.phoneFormatted}</span>
                </span>
                <span className="text-[10px] text-slate-400 group-hover/admin:text-orange-400 transition-colors flex items-center gap-1 whitespace-nowrap font-sans">
                  <span>View Details</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Professional Website Credits & Final Footer Structure */}
        <div className="pt-8 mt-2 border-t border-slate-800/80 flex flex-col items-center text-center space-y-4">
          {/* Main Brand Header */}
          <div className="space-y-1">
            <h4 className="font-display text-base sm:text-lg font-black tracking-widest text-white uppercase">
              FAHRENHEIT CRICKET CLUB
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-xs text-slate-400 font-sans">
              <Link to="/team" className="hover:text-orange-400 transition-colors">Team</Link>
              <span className="text-slate-600">•</span>
              <Link to="/players" className="hover:text-orange-400 transition-colors">Players</Link>
              <span className="text-slate-600">•</span>
              <Link to="/matches" className="hover:text-orange-400 transition-colors">Matches</Link>
              <span className="text-slate-600">•</span>
              <Link to="/stats" className="hover:text-orange-400 transition-colors">Stats</Link>
              <span className="text-slate-600">•</span>
              <Link to="/gallery" className="hover:text-orange-400 transition-colors">Photos</Link>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-admin-contact'))}
                className="hover:text-orange-400 transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Designer / Developer Credit Card (Image 1 Style) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#090d16]/95 border border-slate-800/90 max-w-lg w-full flex flex-col items-center gap-1.5 shadow-xl backdrop-blur-sm">
            <div className="text-xs sm:text-sm text-slate-300">
              Designed &amp; Developed by <strong className="text-white font-semibold">Lakshman</strong>
            </div>
            <div className="text-xs sm:text-sm text-orange-400 font-semibold tracking-wide">
              Freelance UI/UX Designer &amp; Frontend Developer
            </div>
            <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-slate-300 pt-0.5">
              <span>Have a project in mind?</span>
              <span className="text-slate-600">&rarr;</span>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-work-with-me'))}
                className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4 decoration-amber-500/50 hover:decoration-amber-300 transition-colors inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>Work With Me</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-300 pt-1 font-mono">
              <a
                href="mailto:lakshmanworkofficial@gmail.com"
                className="hover:text-orange-400 transition-colors flex items-center gap-1.5 truncate max-w-full"
                title="Email Lakshman"
              >
                <span>📧</span>
                <span className="truncate">lakshmanworkofficial@gmail.com</span>
              </a>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <a
                href="tel:7708231810"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                title="Call Lakshman"
              >
                <span>📱</span>
                <span>7708231810</span>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-[11px] text-slate-500 font-sans">
            © {currentYear} Fahrenheit Cricket Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
