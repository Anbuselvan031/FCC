import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Trophy, Flame, MapPin, Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import teamData from '../../data/teamData';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#070a0f]">
      {/* Background Image with Cinematic Cricket Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={teamData.heroImage}
          alt="Cricket Stadium Floodlights"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow filter brightness-[0.35] contrast-125"
        />
        {/* Gradients and radial glows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070a0f] via-[#070a0f]/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-radial from-orange-600/15 via-transparent to-transparent opacity-80" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        {/* Top Official Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-black/50 backdrop-blur-md animate-scale-in">
          <Flame className="w-4 h-4 text-orange-500 animate-flame" />
          <span>OFFICIAL DIGITAL HOME • COIMBATORE</span>
        </div>

        {/* Club Crest with glowing ring and floating animation */}
        <div className="relative mb-6 group cursor-pointer animate-float">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow"></div>
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-[#090d16] border-2 border-orange-500/60 shadow-2xl transition-transform duration-300 group-hover:scale-105">
            <img
              src={teamData.logo}
              alt="Fahrenheit Cricket Club Crest"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.9] sm:leading-[0.88] max-w-4xl animate-fade-in-up">
          FAHRENHEIT
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 hover:brightness-110 transition-all duration-300">
            CRICKET CLUB
          </span>
        </h1>

        {/* Slogan */}
        <p className="mt-4 sm:mt-5 text-base sm:text-xl md:text-2xl font-medium tracking-wide text-slate-200 font-sans animate-fade-in-up delay-100">
          "Passion. Performance. Brotherhood."
        </p>

        {/* Meta Pills: Location & Established */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300 animate-fade-in-up delay-150">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/40 backdrop-blur-sm transition-colors group cursor-default">
            <MapPin className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
            <span>Location: <strong className="text-white">Coimbatore</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/40 backdrop-blur-sm transition-colors group cursor-default">
            <Calendar className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
            <span>Established: <strong className="text-white">24 August 2023</strong></span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/40 backdrop-blur-sm transition-colors group cursor-default">
            <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>Matches: <strong className="text-white">319+ Clashes</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-fade-in-up delay-200">
          <Link
            to="/team"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-display text-lg font-bold tracking-wider uppercase text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-xl shadow-orange-950 hover:shadow-orange-600/40 transition-all duration-300 transform hover:-translate-y-1 shine-sweep"
          >
            <Shield className="w-5 h-5" />
            EXPLORE TEAM
          </Link>
          <Link
            to="/matches"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-display text-lg font-bold tracking-wider uppercase text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-orange-500/50 hover:text-white transition-all duration-300 backdrop-blur-md transform hover:-translate-y-1 shine-sweep"
          >
            <Trophy className="w-5 h-5 text-orange-400" />
            MATCH CENTER
          </Link>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors">
        <span className="text-[10px] uppercase font-bold tracking-widest">Scroll Down</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-orange-400" />
      </div>
    </section>
  );
}
