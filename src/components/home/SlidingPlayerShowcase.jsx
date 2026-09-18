import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Shield,
  Trophy,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  Zap,
  Search,
  Users,
  Target
} from 'lucide-react';
import AnimatedCricketerCharacter from '../animation/AnimatedCricketerCharacter';
import ThreeDPlayerCard from '../animation/ThreeDPlayerCard';
import playersData from '../../data/playersData';
import {
  playTurfSlideSound,
  playBatCreaseTap,
  playCelebrationSting,
  setMuted,
  getMuted
} from '../../utils/cricketAudio';

export default function SlidingPlayerShowcase() {
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isSliding, setIsSliding] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(!getMuted());
  const [creaseFlashKey, setCreaseFlashKey] = useState(0);

  const autoPlayTimerRef = useRef(null);
  const thumbnailReelRef = useRef(null);
  const defaultAvatar = 'https://media.cricheroes.in/default/user_profile.png';

  // Filter squad based on role and search query
  const filteredSquad = useMemo(() => {
    return playersData.filter((player) => {
      const roleUpper = (player.role || '').toUpperCase();
      let matchesRole = true;

      if (selectedRole === 'BATSMEN') {
        matchesRole = roleUpper.includes('BATSMAN');
      } else if (selectedRole === 'BOWLERS') {
        matchesRole = roleUpper.includes('BOWLER');
      } else if (selectedRole === 'ALL-ROUNDERS') {
        matchesRole = roleUpper.includes('ALL-ROUNDER') || roleUpper.includes('ALL ROUNDER');
      } else if (selectedRole === 'WICKET KEEPERS') {
        matchesRole = roleUpper.includes('WICKET') || roleUpper.includes('KEEPER');
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        player.name.toLowerCase().includes(q) ||
        String(player.cricHeroesId || player.id).includes(q) ||
        (player.jerseyNumber && String(player.jerseyNumber).includes(q));

      return matchesRole && matchesSearch;
    });
  }, [selectedRole, searchQuery]);

  // Ensure index is within filtered squad bounds
  const safeIndex = Math.min(currentIndex, Math.max(0, filteredSquad.length - 1));
  const currentPlayer = filteredSquad[safeIndex] || playersData[0];

  // Role count summaries for filter tabs
  const roleCounts = useMemo(() => {
    const counts = { ALL: playersData.length, BATSMEN: 0, BOWLERS: 0, 'ALL-ROUNDERS': 0, 'WICKET KEEPERS': 0 };
    playersData.forEach((p) => {
      const r = (p.role || '').toUpperCase();
      if (r.includes('BATSMAN')) counts.BATSMEN++;
      else if (r.includes('BOWLER')) counts.BOWLERS++;
      else if (r.includes('WICKET') || r.includes('KEEPER')) counts['WICKET KEEPERS']++;
      else if (r.includes('ALL-ROUNDER') || r.includes('ALL ROUNDER')) counts['ALL-ROUNDERS']++;
    });
    return counts;
  }, []);

  // Sound toggle handler
  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    setMuted(!newState);
    if (newState) {
      playBatCreaseTap();
    }
  };

  // Trigger the 3D slide to next or previous player
  const triggerSlide = (direction = 'right', targetIdx = null) => {
    if (isSliding || filteredSquad.length === 0) return;
    setIsSliding(true);
    setSlideDirection(direction);
    setCreaseFlashKey((prev) => prev + 1);

    // Audio effects
    playTurfSlideSound();
    setTimeout(() => {
      playBatCreaseTap();
      if (currentPlayer?.isCaptain) {
        playCelebrationSting();
      }
    }, 400);

    // Update index
    if (targetIdx !== null) {
      setCurrentIndex(targetIdx);
    } else if (direction === 'right') {
      setCurrentIndex((prev) => (prev + 1) % filteredSquad.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + filteredSquad.length) % filteredSquad.length);
    }

    // Reset sliding state after animation duration
    setTimeout(() => {
      setIsSliding(false);
    }, 650);
  };

  // Auto-play timer
  useEffect(() => {
    if (isAutoPlaying && filteredSquad.length > 1) {
      autoPlayTimerRef.current = setInterval(() => {
        triggerSlide('right');
      }, 4200);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, safeIndex, filteredSquad.length]);

  // Auto-scroll active player thumbnail into center view
  useEffect(() => {
    if (thumbnailReelRef.current) {
      const selectedEl = thumbnailReelRef.current.children[safeIndex];
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [safeIndex]);

  return (
    <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#0a0f1d] via-[#070b14] to-[#0a0f1d] border border-orange-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-4 sm:p-8">
      {/* Background Stadium Glow & Ambient Floodlights */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] bg-orange-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[550px] h-[550px] bg-emerald-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* 1. SECTION HEADER */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 text-xs font-black uppercase tracking-wider border border-orange-500/30 mb-2">
            <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            53-PLAYER 3D ANIMATION SLIDE ARENA
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            INDIVIDUAL <span className="text-orange-500">3D PLAYER SLIDES</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-sans">
            Every single one of our 53 Fahrenheit Cricket Club athletes with their own dedicated 3D action slide, interactive gyroscope physics card, and verified CricHeroes career records.
          </p>
        </div>

        {/* Global Controls: Sound & Auto-Play */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              soundEnabled
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40 shadow-lg shadow-orange-950/40'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title={soundEnabled ? 'Mute Cricket Sound Effects' : 'Enable 3D Slide & Crease Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? '3D Sound ON' : 'Sound OFF'}</span>
          </button>

          {/* Auto-Slide Play/Pause */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              isAutoPlaying
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title={isAutoPlaying ? 'Pause 3D Auto Slide' : 'Start 3D Auto Sliding'}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden sm:inline">{isAutoPlaying ? '3D Auto Active' : 'Auto 3D Slide'}</span>
          </button>
        </div>
      </div>

      {/* 2. ROLE FILTER TABS & QUICK SEARCH BAR */}
      <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mt-6">
        {/* Role Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {['ALL', 'BATSMEN', 'BOWLERS', 'ALL-ROUNDERS', 'WICKET KEEPERS'].map((roleTab) => {
            const isSelected = selectedRole === roleTab;
            const count = roleCounts[roleTab] ?? 0;
            return (
              <button
                key={roleTab}
                onClick={() => {
                  setSelectedRole(roleTab);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-950 scale-105'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{roleTab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-slate-950 text-orange-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            placeholder="Search 53 players..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-orange-500 text-xs text-white placeholder-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. THE 3D CRICKET PITCH ARENA */}
      <div className="relative mt-6 rounded-3xl overflow-hidden border border-slate-800/80 bg-gradient-to-b from-[#090d16] to-[#060a12] p-4 sm:p-6 lg:p-8">
        {/* Dynamic Crease Laser Line */}
        <div
          key={creaseFlashKey}
          className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-transparent via-orange-500/40 to-transparent hidden lg:block animate-crease-flash pointer-events-none"
        />

        {/* Main Grid: Left Role 3D Action Stage, Right Interactive 3D Perspective Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* LEFT: ROLE-SPECIFIC 3D ACTION SLIDE STAGE */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div
              className={`w-full transition-transform duration-500 ${
                isSliding
                  ? slideDirection === 'right'
                    ? 'translate-x-3 scale-[1.02]'
                    : '-translate-x-3 scale-[1.02]'
                  : ''
              }`}
            >
              <AnimatedCricketerCharacter
                player={currentPlayer}
                role={currentPlayer.role}
                isCaptain={currentPlayer.isCaptain}
                playerName={currentPlayer.name}
                direction={slideDirection}
                isSliding={isSliding}
                className="shadow-2xl"
              />
            </div>

            {/* Slider Navigation Bar */}
            <div className="mt-5 w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Player <strong className="text-orange-400 font-bold">{safeIndex + 1}</strong> of{' '}
                  <strong>{filteredSquad.length}</strong>
                </span>
                <span className="h-3 w-px bg-slate-700 mx-1" />
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1 truncate max-w-[130px]">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {currentPlayer.name}
                </span>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => triggerSlide('left')}
                  disabled={isSliding || filteredSquad.length <= 1}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4 text-orange-400" />
                  <span>Prev 3D</span>
                </button>

                <button
                  onClick={() => triggerSlide('right')}
                  disabled={isSliding || filteredSquad.length <= 1}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-950 flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-40 group"
                >
                  <Flame className="w-3.5 h-3.5 text-slate-950 group-hover:scale-110 transition-transform" />
                  <span>Next 3D Slide!</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE 3D PERSPECTIVE CARD */}
          <div className="lg:col-span-6 flex justify-center">
            <ThreeDPlayerCard
              player={currentPlayer}
              slideIndex={safeIndex + 1}
              totalPlayers={filteredSquad.length}
              slideDirection={slideDirection}
              isSliding={isSliding}
            />
          </div>
        </div>

        {/* 4. SQUAD THUMBNAILS HORIZONTAL REEL (All 53 Players) */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 relative z-10">
          <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1.5 text-orange-400">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Jump to Any of 53 Players:
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Hover over card for 3D tilt
            </span>
          </div>

          <div
            ref={thumbnailReelRef}
            className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scroll-smooth"
          >
            {filteredSquad.map((player, idx) => {
              const isSelected = idx === safeIndex;
              return (
                <button
                  key={player.id}
                  onClick={() => triggerSlide('right', idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl flex-shrink-0 transition-all text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-slate-950 font-black shadow-lg shadow-orange-950 scale-105'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <img
                    src={player.photo || defaultAvatar}
                    alt={player.name}
                    className="w-6 h-6 rounded-full object-cover bg-slate-800"
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
                  />
                  <span className="text-xs font-bold whitespace-nowrap truncate max-w-[110px]">
                    {player.name}
                  </span>
                  {player.jerseyNumber && player.jerseyNumber !== '--' && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isSelected
                          ? 'bg-slate-950 text-orange-400'
                          : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      }`}
                    >
                      #{player.jerseyNumber}
                    </span>
                  )}
                  {player.isCaptain && (
                    <span
                      className={`text-[9px] px-1 rounded font-black ${
                        isSelected ? 'bg-slate-950 text-orange-400' : 'bg-orange-500 text-slate-950'
                      }`}
                    >
                      C
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
