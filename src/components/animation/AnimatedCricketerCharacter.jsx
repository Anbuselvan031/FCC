import React from 'react';
import { Trophy } from 'lucide-react';

/**
 * Helper to determine a player's primary cricket discipline
 * (Batsman, Bowler, or Wicket Keeper)
 */
export function getPlayerDiscipline(player, fallbackRole = '') {
  const role = (player?.role || fallbackRole || '').toUpperCase();
  const name = (player?.name || '').toLowerCase();
  const stats = player?.stats || {};
  const runs = typeof stats.runs === 'number' ? stats.runs : parseInt(stats.runs) || 0;
  const wickets = typeof stats.wickets === 'number' ? stats.wickets : parseInt(stats.wickets) || 0;

  // 1. Explicit Wicket-Keeper check
  if (role.includes('WICKET') || role.includes('KEEPER')) {
    return 'keeper';
  }

  // 2. Explicit Pure Batter check
  if (role.includes('BATTER') || role.includes('BATSMAN')) {
    return 'batsman';
  }

  // 3. Explicit Pure Bowler check
  if (role.includes('BOWLER')) {
    return 'bowler';
  }

  // 4. Known players with '--' or special roles mapped to their true discipline
  // Bowlers (fast bowlers, spinners, bowling all-rounders)
  if (
    name.includes('selvam') ||
    name.includes('jeevesh') ||
    name.includes('dhamo') ||
    name.includes('caleb') ||
    name.includes('sibi') ||
    name.includes('nikhil') ||
    name.includes('saajan') ||
    name.includes('saravanan') ||
    name.includes('sivamani') ||
    name.includes('hariprasath') ||
    name.includes('mukhil') ||
    name.includes('lalith') ||
    name === 'vicky' ||
    name.includes('vicky')
  ) {
    return 'bowler';
  }

  // Batsmen (top order, middle order, batting all-rounders)
  if (
    name.includes('anbu') ||
    name.includes('moulee') ||
    name.includes('kiruthik') ||
    name.includes('guru') ||
    name.includes('sumesh') ||
    name.includes('jawahar') ||
    name.includes('gugan') ||
    name.includes('revanth') ||
    name.includes('arun') ||
    name.includes('sam') ||
    name.includes('kayal') ||
    name.includes('praveen') ||
    name.includes('raja') ||
    name.includes('yoga') ||
    name.includes('sena') ||
    name.includes('jayaseelan') ||
    name.includes('nitheesh') ||
    name.includes('guna')
  ) {
    return 'batsman';
  }

  // 5. Stat-based fallback for any unlisted players
  if (wickets >= 35 && wickets * 15 >= runs) {
    return 'bowler';
  }

  return 'batsman';
}

/**
 * AnimatedCricketerCharacter
 * Role-aware 3D cinematic action character component.
 * Ensures the 3D slide photo is 100% relevant to the selected athlete:
 * - Batsmen => 3D Batsman Crease Dive & Bat Slide photo (/animations/cricket_slide_crease.jpg)
 * - Bowlers => 3D Fast Bowler Delivery Stride photo (/animations/cricket_bowler_slide.jpg)
 * - Wicket Keepers => 3D Wicket Keeper Dive photo (/animations/cricket_fielder_slide.jpg)
 */
export default function AnimatedCricketerCharacter({
  player = null,
  role = 'batsman',
  isCaptain = false,
  playerName = 'FCC Athlete',
  direction = 'right',
  isSliding = false,
  className = '',
  onClick = null
}) {
  const isFlipped = direction === 'left';
  const name = player?.name || playerName;
  const captain = player?.isCaptain ?? isCaptain;

  // Strictly classify player into their discipline: batsman, bowler, or keeper
  const discipline = getPlayerDiscipline(player, role);

  // Return the photo and labels specifically tailored to their cricket discipline
  const getActionConfig = () => {
    // 1. BOWLER: 3D Delivery Stride Slide
    if (discipline === 'bowler') {
      return {
        image: '/animations/cricket_bowler_slide.jpg',
        title: 'Bowler 3D Delivery Stride Slide',
        subtitle: '145+ KMPH Delivery Stride & Follow-Through',
        tag: 'BOWLER 3D SLIDE',
        glowColor: 'shadow-[0_15px_50px_rgba(6,182,212,0.3)]',
        badgeColor: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/70',
        particleColor: 'bg-cyan-400'
      };
    }

    // 2. WICKET KEEPER: 3D Stumps Dive Slide
    if (discipline === 'keeper') {
      return {
        image: '/animations/cricket_fielder_slide.jpg',
        title: 'Wicket Keeper 3D Dive Slide',
        subtitle: 'Athletic Glove Dive & Stumps Catch',
        tag: 'WICKET KEEPER 3D SLIDE',
        glowColor: 'shadow-[0_15px_50px_rgba(139,92,246,0.3)]',
        badgeColor: 'text-violet-400 border-violet-500/50 bg-violet-950/70',
        particleColor: 'bg-violet-400'
      };
    }

    // 3. BATSMAN (Default & All Batting Athletes): 3D Crease Dive & Bat Slide
    return {
      image: '/animations/cricket_slide_crease.jpg',
      title: 'Batsman 3D Crease Dive & Bat Slide',
      subtitle: 'Sliding Bat Flat Over White Popping Crease',
      tag: 'BATSMAN 3D SLIDE',
      glowColor: 'shadow-[0_15px_50px_rgba(249,115,22,0.35)]',
      badgeColor: 'text-orange-400 border-orange-500/50 bg-orange-950/70',
      particleColor: 'bg-orange-400'
    };
  };

  const config = getActionConfig();

  return (
    <div
      onClick={onClick}
      className={`relative select-none w-full max-w-xl mx-auto rounded-3xl overflow-hidden group transition-all duration-300 ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* 1. CINEMATIC 3D STADIUM STAGE */}
      <div
        className={`relative aspect-[16/9] w-full rounded-3xl overflow-hidden border-2 border-orange-500/40 ${
          config.glowColor
        } bg-[#070b14]`}
      >
        {/* Main 3D Action Render with Dynamic Slide Physics */}
        <img
          src={config.image}
          alt={config.title}
          className={`w-full h-full object-cover filter contrast-105 brightness-100 transition-all duration-700 ease-out ${
            isSliding
              ? 'scale-110 translate-x-3 filter brightness-115'
              : 'group-hover:scale-105'
          }`}
          style={{
            transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        />

        {/* Dynamic Vignette & Stadium Ambient Floodlight Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d]/70 via-transparent to-[#0a0f1d]/70 pointer-events-none" />

        {/* 2. DYNAMIC POPPING CREASE LASER LINE */}
        <div className="absolute bottom-6 left-0 right-0 h-1 bg-white/80 shadow-[0_0_20px_#f97316] pointer-events-none">
          <div className="absolute -top-3.5 left-6 text-[9px] font-black uppercase tracking-widest text-orange-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-md border border-orange-500/50 shadow-md">
            WHITE POPPING CREASE
          </div>
        </div>

        {/* 3. SLIDE MOTION PARTICLES & TURF SKID (Triggered during slide) */}
        {isSliding && (
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Dynamic Speed Light Sweeps */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-transparent animate-pulse" />

            {/* Turf Dust Clouds */}
            <div className="absolute bottom-6 left-12 w-32 h-14 rounded-full bg-amber-500/35 blur-md animate-turf-dust" />
            <div className="absolute bottom-8 left-20 w-40 h-16 rounded-full bg-orange-600/40 blur-lg animate-turf-dust delay-75" />

            {/* Flying Grass Blades */}
            <div className="absolute bottom-10 left-16 w-2 h-4 bg-emerald-400 rounded-sm animate-grass-kick" />
            <div className="absolute bottom-12 left-28 w-1.5 h-5 bg-lime-400 rounded-sm animate-grass-kick delay-100" />
            <div className="absolute bottom-8 left-36 w-2 h-3 bg-emerald-500 rounded-sm animate-grass-kick delay-150" />
            <div className="absolute bottom-14 left-24 w-1.5 h-4 bg-amber-400 rounded-sm animate-grass-kick delay-75" />

            {/* Electric Friction Spark at Crease Contact */}
            <div className="absolute bottom-6 right-1/3 w-10 h-10 rounded-full bg-orange-400 blur-[2px] animate-ping opacity-90" />
            <div className="absolute bottom-5 right-1/3 w-4 h-4 rounded-full bg-white animate-pulse" />
          </div>
        )}

        {/* 4. OVERLAY ROLE ACTION BADGE */}
        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-xl ${
              config.badgeColor
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            {config.tag}
          </span>

          {captain && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
              <Trophy className="w-3 h-3" />
              CAPTAIN
            </span>
          )}
        </div>

        {/* 5. PLAYER FOCUS CALLOUT */}
        <div className="absolute bottom-3.5 right-3.5 z-10">
          <div className="flex items-center gap-2 bg-slate-950/85 px-3 py-1 rounded-xl border border-slate-700/80 backdrop-blur-md shadow-md">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Focus:</span>
            <span className="text-xs font-black text-white uppercase tracking-tight">
              {name}
            </span>
          </div>
        </div>
      </div>

      {/* Action Mode Title Bar */}
      <div className="mt-2.5 flex items-center justify-between text-xs px-2">
        <span className="font-display font-bold uppercase tracking-wide text-orange-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          {config.title}
        </span>
        <span className="text-slate-400 font-mono text-[11px]">
          {config.subtitle}
        </span>
      </div>
    </div>
  );
}
