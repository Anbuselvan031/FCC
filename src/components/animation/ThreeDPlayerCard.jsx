import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Flame,
  Zap,
  Trophy,
  Award,
  ArrowRight,
  ExternalLink,
  Target
} from 'lucide-react';

/**
 * ThreeDPlayerCard
 * Interactive 3D perspective card with physics-based gyroscope tilt,
 * multi-layer depth elevation, role-specific holographic aura, and specular sheen.
 */
export default function ThreeDPlayerCard({
  player,
  slideIndex = 1,
  totalPlayers = 53,
  slideDirection = 'right',
  isSliding = false
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const defaultAvatar = 'https://media.cricheroes.in/default/user_profile.png';
  const stats = player?.stats || {};
  const role = (player?.role || 'All-Rounder').toUpperCase();
  const isCaptain = player?.isCaptain;

  // Determine Role-Based 3D Styling Theme
  const getTheme = () => {
    if (isCaptain) {
      return {
        borderGlow: 'border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.35)]',
        badgeBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950',
        accentColor: 'text-amber-400',
        ringColor: 'from-amber-400 via-orange-500 to-yellow-300',
        icon: Trophy,
        label: 'OFFICIAL CAPTAIN'
      };
    }
    if (role.includes('BOWLER')) {
      return {
        borderGlow: 'border-cyan-500/50 shadow-[0_0_35px_rgba(6,182,212,0.25)]',
        badgeBg: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white',
        accentColor: 'text-cyan-400',
        ringColor: 'from-cyan-400 via-blue-500 to-sky-400',
        icon: Zap,
        label: 'FAST BOWLING UNIT'
      };
    }
    if (role.includes('BATSMAN')) {
      return {
        borderGlow: 'border-orange-500/60 shadow-[0_0_35px_rgba(249,115,22,0.35)]',
        badgeBg: 'bg-gradient-to-r from-orange-600 to-red-600 text-white',
        accentColor: 'text-orange-400',
        ringColor: 'from-orange-500 via-amber-400 to-red-500',
        icon: Flame,
        label: 'TOP ORDER BATSMAN'
      };
    }
    if (role.includes('WICKET')) {
      return {
        borderGlow: 'border-violet-500/50 shadow-[0_0_35px_rgba(139,92,246,0.25)]',
        badgeBg: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white',
        accentColor: 'text-violet-400',
        ringColor: 'from-violet-400 via-purple-500 to-indigo-400',
        icon: Target,
        label: 'WICKET KEEPER'
      };
    }
    return {
      borderGlow: 'border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.25)]',
      badgeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
      accentColor: 'text-emerald-400',
      ringColor: 'from-emerald-400 via-teal-500 to-orange-400',
      icon: Shield,
      label: 'DYNAMIC ALL-ROUNDER'
    };
  };

  const theme = getTheme();
  const ThemeIcon = theme.icon;

  // 3D Physics Mouse Move Handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -14;
    const rotY = ((x - centerX) / centerX) * 14;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className="relative w-full max-w-lg select-none py-2"
      style={{ perspective: '1200px' }}
    >
      {/* 3D TILT WRAPPER */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full rounded-3xl bg-gradient-to-br from-[#0e1628] via-[#090e1b] to-[#070b14] border-2 ${
          theme.borderGlow
        } p-6 transition-transform duration-200 ease-out will-change-transform ${
          isSliding
            ? slideDirection === 'right'
              ? 'animate-slide-right'
              : 'animate-slide-left'
            : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
            isHovered ? '1.02, 1.02, 1.02' : '1, 1, 1'
          })`,
        }}
      >
        {/* HOLOGRAPHIC SPECULAR GLARE LAYER */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 65%)`,
            transform: 'translateZ(10px)',
          }}
        />

        {/* LAYER 1: CARD TOP HEADER (translateZ: 45px) */}
        <div
          className="flex items-center justify-between pb-4 border-b border-slate-800/80"
          style={{ transform: 'translateZ(45px)' }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-mono text-3xl font-black ${theme.accentColor}`}>
              {player.jerseyNumber && player.jerseyNumber !== '--'
                ? `#${player.jerseyNumber}`
                : `#${player.cricHeroesId || player.id}`}
            </span>

            {isCaptain && (
              <span className="px-2.5 py-1 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md shadow-orange-950 flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                CAPTAIN
              </span>
            )}

            <span className={`px-2.5 py-1 rounded-md ${theme.badgeBg} font-black text-[10px] uppercase tracking-wider shadow-md`}>
              {player.role || 'PLAYER'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 text-[11px] font-mono text-slate-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>
              PLAYER <strong className="text-white">{slideIndex}</strong> / {totalPlayers}
            </span>
          </div>
        </div>

        {/* LAYER 2: 3D PLAYER MAIN DISPLAY (translateZ: 55px) */}
        <div
          className="flex flex-col sm:flex-row items-center gap-6 my-6"
          style={{ transform: 'translateZ(55px)' }}
        >
          {/* Avatar with 3D Elevation Ring */}
          <div className="relative flex-shrink-0">
            {/* 3D Floating Official Jersey Number Badge on Photo */}
            {player.jerseyNumber && player.jerseyNumber !== '--' && (
              <div
                className="absolute -top-3 -left-3 px-2.5 py-1 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-950/80 border-2 border-slate-950 flex items-center gap-0.5 z-20"
                style={{ transform: 'translateZ(35px)' }}
                title={`Official Jersey #${player.jerseyNumber}`}
              >
                <span className="text-[10px] font-black text-slate-950">#</span>
                <span className="font-mono text-sm font-black">{player.jerseyNumber}</span>
              </div>
            )}

            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-1 bg-gradient-to-tr ${theme.ringColor} shadow-2xl shadow-orange-950/60 transform hover:scale-105 transition-transform duration-300`}
            >
              <img
                src={player.photo || defaultAvatar}
                alt={player.name}
                className="w-full h-full object-cover rounded-xl bg-slate-900"
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
            </div>
            <div
              className="absolute -bottom-2.5 -right-2.5 p-1.5 rounded-full bg-slate-900 border-2 border-orange-500 shadow-lg"
              style={{ transform: 'translateZ(20px)' }}
            >
              <ThemeIcon className={`w-4 h-4 ${theme.accentColor}`} />
            </div>
          </div>

          {/* Name & CricHeroes Tags */}
          <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              <ThemeIcon className="w-3 h-3 text-orange-400" />
              {theme.label}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-white drop-shadow-md truncate" title={player.name}>
              {player.name}
            </h3>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
              {player.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-orange-500/15 text-orange-300 border border-orange-500/30 text-[10px] font-semibold"
                >
                  {tag}
                </span>
              ))}
              {player.battingStyle && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                  {player.battingStyle}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
              {player.playerStatement || 'Verified core athlete for Fahrenheit Cricket Club, Coimbatore.'}
            </p>
          </div>
        </div>

        {/* LAYER 3: 3D CAREER STATS GRID (translateZ: 35px) */}
        <div
          className="grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner"
          style={{ transform: 'translateZ(35px)' }}
        >
          <div className="text-center p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-orange-500/40 transition-colors">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MATCHES</p>
            <p className="text-lg font-black text-white font-mono">{stats.matches ?? '--'}</p>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-orange-500/40 transition-colors">
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">RUNS</p>
            <p className="text-lg font-black text-orange-400 font-mono">{stats.runs ?? '--'}</p>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-orange-500/40 transition-colors">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">WICKETS</p>
            <p className="text-lg font-black text-emerald-400 font-mono">{stats.wickets ?? '--'}</p>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-orange-500/40 transition-colors">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">HIGH SCORE</p>
            <p className="text-sm font-black text-white font-mono">{stats.highestScore ?? '--'}</p>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-orange-500/40 transition-colors">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">STRIKE RATE</p>
            <p className="text-sm font-black text-amber-400 font-mono">{stats.strikeRate ?? '--'}</p>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-orange-500/40 transition-colors">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AVERAGE</p>
            <p className="text-sm font-black text-white font-mono">{stats.average ?? '--'}</p>
          </div>
        </div>

        {/* LAYER 4: 3D ACTION BUTTONS (translateZ: 50px) */}
        <div
          className="mt-5 flex items-center gap-3"
          style={{ transform: 'translateZ(50px)' }}
        >
          <Link
            to={`/players/${player.id}`}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider text-center shadow-lg shadow-orange-950/60 transition-all flex items-center justify-center gap-2 group active:scale-95"
          >
            <span>View 3D Profile</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {player.cricHeroesId && (
            <a
              href={`https://cricheroes.com/player-profile/${player.cricHeroesId}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold uppercase transition-all flex items-center gap-1.5"
              title="Verified stats on CricHeroes"
            >
              <span>CricHeroes</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
