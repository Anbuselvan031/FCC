import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, X, ChevronUp, ChevronDown, Zap, Flame, Trophy, Play } from 'lucide-react';
import AnimatedCricketerCharacter from './AnimatedCricketerCharacter';
import { playTurfSlideSound, playBatCreaseTap, playCelebrationSting } from '../../utils/cricketAudio';
import playersData from '../../data/playersData';

export default function CricketMascotWidget() {
  const location = useLocation();

  // Strictly only render on the home page ('/')
  if (location.pathname !== '/') {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [screenSlideActive, setScreenSlideActive] = useState(false);
  const [slideMessage, setSlideMessage] = useState('Diving into the crease!');
  const [randomPlayer, setRandomPlayer] = useState(null);

  // Trigger full screen slide across bottom of window
  const triggerFullScreenSlide = (message = 'Sliding in for FCC!') => {
    if (screenSlideActive) return;
    setSlideMessage(message);
    setScreenSlideActive(true);

    playTurfSlideSound();
    setTimeout(() => {
      playBatCreaseTap();
    }, 500);

    // Pick a random player to show in the slide banner
    const pick = playersData[Math.floor(Math.random() * playersData.length)];
    setRandomPlayer(pick);

    setTimeout(() => {
      setScreenSlideActive(false);
    }, 2400);
  };

  const scrollToPitchShowcase = () => {
    const el = document.getElementById('sliding-team-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#sliding-team-showcase';
    }
  };

  return (
    <>
      {/* 1. FULL-WIDTH SLIDING CRICKETER BANNER (Across bottom of viewport) */}
      {screenSlideActive && (
        <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none overflow-hidden h-36 bg-gradient-to-t from-black/80 to-transparent">
          {/* Popping crease track */}
          <div className="absolute bottom-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_20px_#f97316]" />

          {/* Sliding character travelling across screen */}
          <div
            className="absolute bottom-4 flex items-center gap-4 transition-all duration-1000 ease-out animate-slide-right"
            style={{ left: '15%' }}
          >
            <AnimatedCricketerCharacter
              action="crease-dive"
              direction="right"
              size="lg"
              showParticles={true}
              showCrease={false}
            />

            {/* Quick Player Slide Banner */}
            {randomPlayer && (
              <div className="px-4 py-2.5 rounded-2xl bg-slate-900/95 border-2 border-orange-500 shadow-2xl flex items-center gap-3 backdrop-blur-md">
                <img
                  src={randomPlayer.photo || 'https://media.cricheroes.in/default/user_profile.png'}
                  alt={randomPlayer.name}
                  className="w-10 h-10 rounded-full object-cover border border-orange-400"
                />
                <div>
                  <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
                    {slideMessage}
                  </div>
                  <div className="font-display text-sm font-black text-white uppercase">
                    {randomPlayer.name} ({randomPlayer.role || 'Player'})
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. FLOATING CORNER MASCOT DOCK */}
      <aside 
        aria-label="FCC Cricket Mascot and Interactive Animation Controls"
        className="fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-auto select-none"
      >
        {/* Expanded Controls Card */}
        {isOpen && (
          <div className="mb-3 w-72 rounded-2xl bg-[#0d1424]/95 border border-orange-500/40 p-4 shadow-2xl backdrop-blur-xl animate-fade-in-up">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-display text-xs font-black uppercase text-white tracking-wide">
                  FCC ANIMATION MASCOT
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Minimize Mascot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-300 my-2 leading-relaxed">
              Interactive cricket character rigged with custom sliding animations!
            </p>

            <div className="space-y-2 mt-3">
              <button
                onClick={() => triggerFullScreenSlide('Man Sliding The Team Player!')}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-orange-950 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Slide The Team Player!</span>
              </button>

              <button
                onClick={scrollToPitchShowcase}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Trophy className="w-3.5 h-3.5 text-orange-400" />
                <span>Go to Pitch Showcase</span>
              </button>

              <button
                onClick={() => {
                  triggerFullScreenSlide('Safe inside the crease!');
                  playCelebrationSting();
                }}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Crease Dive Celebration</span>
              </button>
            </div>
          </div>
        )}

        {/* Mascot Avatar Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-3 p-2 rounded-2xl bg-gradient-to-br from-[#0e1628] via-[#0a0f1d] to-[#121c33] border-2 border-orange-500/60 hover:border-orange-400 shadow-2xl hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all transform hover:scale-105 active:scale-95"
          title="Click to interact with the Animated Cricket Character!"
        >
          {/* 3D Mascot Avatar Badge */}
          <div className="relative w-12 h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-orange-500 via-amber-400 to-orange-600 flex-shrink-0 shadow-lg shadow-orange-950">
            <img
              src="/animations/cricket_mascot_badge.jpg"
              alt="FCC Cricket Mascot"
              className="w-full h-full object-cover rounded-[10px] bg-slate-900 group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="hidden sm:flex flex-col text-left pr-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 flex items-center gap-1">
              <Flame className="w-3 h-3 text-orange-500 animate-pulse" />
              SLIDE CHARACTER
            </span>
            <span className="text-xs font-bold text-white">
              {isOpen ? 'Tap to close' : 'Slide Team Player'}
            </span>
          </div>

          {/* Glowing pulse indicator */}
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500" />
        </button>
      </aside>
    </>
  );
}
