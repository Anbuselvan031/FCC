import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronRight, Trophy, Flame } from 'lucide-react';
import teamData from '../../data/teamData';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'TEAM', path: '/team' },
  { name: 'PLAYERS', path: '/players' },
  { name: 'MATCHES', path: '/matches' },
  { name: 'LEADERBOARD', path: '/leaderboard' },
  { name: 'TEAM STATS', path: '/stats' },
  { name: 'GALLERY', path: '/gallery' },
  { name: 'ABOUT', path: '/about' },
  { name: 'CONTACT', action: 'open-admin-contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav bg-[#070a0f] py-3 shadow-xl shadow-black/60 border-b border-white/10'
          : 'bg-[#070a0f] md:bg-gradient-to-b md:from-[#070a0f]/95 md:via-[#070a0f]/70 md:to-transparent py-3 sm:py-4 border-b border-white/5 md:border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 group-hover:shadow-[0_0_18px_rgba(249,115,22,0.7)] group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
              <img
                src={teamData.logo}
                alt="Fahrenheit Cricket Club Logo"
                className="w-full h-full object-cover rounded-full bg-slate-900"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full rounded-full bg-slate-900 items-center justify-center text-orange-400 font-bold text-xs">
                FCC
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white uppercase group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                FAHRENHEIT <span className="text-orange-500">CC</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                COIMBATORE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.action) {
                return (
                  <button
                    key={link.name}
                    onClick={() => window.dispatchEvent(new CustomEvent(link.action))}
                    className="relative px-3.5 py-1.5 text-xs font-bold tracking-wider transition-all duration-200 rounded-md text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer"
                  >
                    {link.name}
                  </button>
                );
              }
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-xs font-bold tracking-wider transition-all duration-200 rounded-md ${
                    isActive
                      ? 'text-orange-400 bg-orange-500/10 shadow-[inset_0_0_12px_rgba(249,115,22,0.15)] border border-orange-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full shadow-[0_0_8px_#f97316]"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-admin-contact'))}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-200 bg-slate-900 border border-slate-700 hover:border-orange-500 hover:text-orange-400 hover:bg-slate-800 transition-all duration-200 focus:outline-none cursor-pointer shadow-sm"
              title="Touch to view Club Admin Contact Details (Phone, Mail, Instagram)"
            >
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              <span>ADMIN</span>
            </button>

            <Link
              to="/team"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 shadow-md shadow-orange-900/30 hover:shadow-orange-600/40 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none shine-sweep"
            >
              <Shield className="w-3.5 h-3.5" />
              VIEW TEAM
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-orange-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-72 sm:w-80 bg-[#090d16] border-l border-slate-800/80 p-6 z-50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out xl:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <img
                src={teamData.logo}
                alt="FCC Logo"
                className="w-9 h-9 rounded-full border border-orange-500/50"
              />
              <div>
                <h4 className="font-display text-lg font-bold text-white leading-none">FAHRENHEIT CC</h4>
                <p className="text-[10px] text-orange-400 font-semibold uppercase tracking-wider">COIMBATORE</p>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <div className="py-6 flex flex-col gap-1.5">
            {navLinks.map((link) => {
              if (link.action) {
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      window.dispatchEvent(new CustomEvent(link.action));
                    }}
                    className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-all text-slate-300 hover:bg-slate-800/40 hover:text-white text-left w-full cursor-pointer"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                );
              }
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-600/20 to-transparent text-orange-400 border-l-4 border-orange-500'
                      : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-600'}`} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Drawer Footer CTA */}
        <div className="pt-4 border-t border-slate-800 space-y-2.5">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-admin-contact'));
            }}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-500" />
              <span>ADMIN CONTACT (VICKY)</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">CALL / MAIL</span>
          </button>

          <Link
            to="/team"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-orange-600 to-amber-500 shadow-lg shadow-orange-950"
          >
            <Shield className="w-4 h-4" />
            EXPLORE SQUAD
          </Link>
          <p className="text-center text-[10px] text-slate-500 pt-1">
            Est. 24 August 2023 • Coimbatore
          </p>
        </div>
      </div>
    </header>
  );
}
