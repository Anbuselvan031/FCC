import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Sparkles } from 'lucide-react';
import teamData from '../../data/teamData';
import { playBatCreaseTap } from '../../utils/cricketAudio';

/**
 * InteractiveHeroLogo
 * Fahrenheit Cricket Club 3D Crest Component with Full Multi-Device Responsiveness.
 * 
 * - Normal state (Hero):
 *   Elevated 3D coin medallion with chamfered metallic borders, ambient pulsing halo,
 *   subtle convex gloss, and desktop 3D tilt tracking on hover.
 * 
 * - Lightbox Showcase Modal:
 *   Enlarged, centered 3D medallion with true multi-layer depth (deep cast shadow,
 *   metallic coin rim, recessed bed, elevated artwork, convex lens glare, and dynamic
 *   specular light reflection following mouse on desktop).
 *   On mobile devices: smooth, breathing CSS 3D floating perspective tilt, fully
 *   fluid across all screen sizes (320px up to 4K), single-tap touch response,
 *   accessible close button (X), ESC listener, outside-click close, and background scroll locking.
 */
export default function InteractiveHeroLogo({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 3D Tilt & Specular Light tracking for enlarged modal medallion
  const [modalTilt, setModalTilt] = useState({ x: 0, y: 0 });
  const [modalGlare, setModalGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const modalMedallionRef = useRef(null);

  // 3D Tilt tracking for resting hero button
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Multi-device responsive detection
  useEffect(() => {
    const checkDevice = () => {
      const mobile =
        typeof window !== 'undefined' &&
        (window.innerWidth <= 768 ||
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Modal open
  const handleOpen = () => {
    if (isOpen || isClosing) return; // Prevent double-triggering
    try {
      playBatCreaseTap();
    } catch (e) {
      // Audio fallback
    }
    setIsOpen(true);
    setModalTilt({ x: 0, y: 0 });
    setModalGlare({ x: 50, y: 50, opacity: 0 });
  };

  // Modal close
  const handleClose = () => {
    if (!isOpen || isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setModalTilt({ x: 0, y: 0 });
      setModalGlare({ x: 50, y: 50, opacity: 0 });
    }, 240);
  };

  // Keyboard accessibility: ESC key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isClosing]);

  // Prevent background page scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Modal 3D Mouse Movement Tracking (Desktop only)
  const handleModalMouseMove = (e) => {
    if (isMobile || !modalMedallionRef.current) return;
    const rect = modalMedallionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -16;
    const rotY = ((x - centerX) / centerX) * 16;

    setModalTilt({ x: rotX, y: rotY });
    setModalGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.45,
    });
  };

  const handleModalMouseLeave = () => {
    setModalTilt({ x: 0, y: 0 });
    setModalGlare({ x: 50, y: 50, opacity: 0 });
  };

  // Hero Trigger 3D Mouse Movement Tracking (Desktop only)
  const handleHeroMouseMove = (e) => {
    if (isMobile || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setHeroTilt({ x: rotX, y: rotY });
  };

  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  return (
    <>
      {/* 1. HERO LOGO TRIGGER BUTTON (3D Elevated Medallion) */}
      <button
        ref={heroRef}
        type="button"
        onClick={handleOpen}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        aria-label="View Fahrenheit Cricket Club logo in 3D"
        className={`relative mb-6 group cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 rounded-full transition-all duration-300 active:scale-95 touch-manipulation ${className}`}
        style={{
          perspective: '800px',
        }}
      >
        {/* Ambient Pulsing Glow Halo */}
        <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />

        {/* 3D Chamfered Coin Frame */}
        <div
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1.5 bg-gradient-to-br from-amber-400/90 via-orange-600 to-amber-700/80 border border-orange-400/80 shadow-[0_12px_28px_rgba(0,0,0,0.85),0_0_20px_rgba(249,115,22,0.5)] transition-transform duration-200 ease-out will-change-transform"
          style={{
            transformStyle: 'preserve-3d',
            transform:
              !isMobile && (heroTilt.x !== 0 || heroTilt.y !== 0)
                ? `rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg) scale3d(1.06, 1.06, 1.06)`
                : undefined,
          }}
        >
          {/* Inner Dark Rim Bed */}
          <div className="relative w-full h-full rounded-full p-1 bg-[#090d16] border border-orange-500/50 shadow-inner overflow-hidden flex items-center justify-center">
            {/* Convex Glare Sheen */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-transparent pointer-events-none" />

            {/* Crest Image */}
            <img
              src={teamData.logo}
              alt="Fahrenheit Cricket Club Crest"
              className="w-full h-full object-cover rounded-full filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]"
              draggable={false}
            />
          </div>
        </div>

        {/* Subtle desktop hover badge */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-950/95 border border-orange-500/40 text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 opacity-0 sm:group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-lg pointer-events-none flex items-center gap-1 scale-95 group-hover:scale-100">
          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
          <span>3D Crest</span>
        </div>
      </button>

      {/* 2. DEDICATED FULLSCREEN 3D LOGO SHOWCASE OVERLAY (MODAL / LIGHTBOX) */}
      {isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Fahrenheit Cricket Club Official Logo Showcase"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 select-none overflow-hidden"
          >
            {/* Dark Translucent Backdrop (Home page remains visible behind) */}
            <div
              onClick={handleClose}
              className={`absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer ${
                isClosing ? 'animate-logo-backdrop-out' : 'animate-logo-backdrop-in'
              }`}
              aria-hidden="true"
            />

            {/* Close Button (X) - 48px touch target with high-contrast borders */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close logo showcase"
              className={`fixed top-3 right-3 sm:top-6 sm:right-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0d1424] border-2 border-slate-700 hover:border-orange-500 active:border-orange-400 text-slate-200 hover:text-white flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.85)] backdrop-blur-lg transition-colors duration-200 cursor-pointer active:scale-90 touch-manipulation ${
                isClosing ? 'animate-logo-backdrop-out' : 'animate-logo-backdrop-in'
              }`}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 hover:rotate-90" />
            </button>

            {/* 3D Showcase Stage (Perspective Container) */}
            <div
              className={`relative z-10 flex flex-col items-center justify-center max-w-full ${
                isClosing ? 'animate-logo-scale-out' : 'animate-logo-scale-in'
              }`}
              style={{
                perspective: '1200px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Soft Ambient Radiant Orange Glow */}
              <div className="absolute w-64 h-64 sm:w-96 sm:h-96 md:w-[460px] md:h-[460px] rounded-full bg-gradient-radial from-orange-500/35 via-amber-600/15 to-transparent blur-3xl pointer-events-none" />

              {/* 3D Medallion Card with Physics Tilt & Floating Animation */}
              <div
                ref={modalMedallionRef}
                onMouseMove={handleModalMouseMove}
                onMouseLeave={handleModalMouseLeave}
                className={`relative w-56 h-56 min-[380px]:w-64 min-[380px]:h-64 sm:w-76 sm:h-76 md:w-88 md:h-88 lg:w-96 lg:h-96 max-w-[76vw] max-h-[76vw] rounded-full cursor-pointer transition-transform duration-150 ease-out will-change-transform ${
                  isMobile ? 'animate-logo-3d-float' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform:
                    !isMobile && (modalTilt.x !== 0 || modalTilt.y !== 0)
                      ? `rotateX(${modalTilt.x}deg) rotateY(${modalTilt.y}deg) scale3d(1.04, 1.04, 1.04) translateZ(30px)`
                      : isMobile
                      ? undefined
                      : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                }}
                title={isMobile ? undefined : 'Move cursor for 3D physics'}
              >
                {/* 3D Outer Cast Shadow (translateZ -25px) */}
                <div
                  className="absolute inset-0 rounded-full shadow-[0_30px_70px_rgba(0,0,0,0.95),0_10px_30px_rgba(0,0,0,0.85),0_0_50px_rgba(249,115,22,0.45)] pointer-events-none"
                  style={{ transform: 'translateZ(-25px)' }}
                />

                {/* 3D Glowing Ambient Halo Ring */}
                <div
                  className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-tr from-orange-600 via-amber-400 to-orange-500 opacity-85 blur-md pointer-events-none"
                  style={{ transform: 'translateZ(-10px)' }}
                />

                {/* 3D Metallic Beveled Outer Rim (Coin Edge) */}
                <div
                  className="relative w-full h-full rounded-full p-2.5 sm:p-3.5 bg-gradient-to-br from-amber-400 via-orange-600 to-amber-700 border-2 border-amber-300/80 shadow-[inset_0_2px_8px_rgba(255,255,255,0.4),0_0_40px_rgba(249,115,22,0.6)] overflow-hidden"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  {/* Recessed Dark Bed with Metallic Inner Border */}
                  <div className="relative w-full h-full rounded-full p-1.5 sm:p-2 bg-gradient-to-br from-[#1c2438] via-[#090d16] to-[#04060a] border border-orange-500/80 shadow-[inset_0_4px_16px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center">
                    {/* Fixed 3D Spherical Convex Lens Glare (Soft glass reflection) */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/30 pointer-events-none z-10"
                      style={{ transform: 'translateZ(20px)' }}
                    />

                    {/* Dynamic Specular Holographic Glare (Follows mouse on desktop) */}
                    {!isMobile && modalGlare.opacity > 0 && (
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none z-20 transition-opacity duration-150"
                        style={{
                          background: `radial-gradient(circle at ${modalGlare.x}% ${modalGlare.y}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`,
                          transform: 'translateZ(25px)',
                          opacity: modalGlare.opacity,
                        }}
                      />
                    )}

                    {/* Elevated Authentic Fahrenheit Cricket Club Crest Artwork */}
                    <img
                      src={teamData.logo}
                      alt="Fahrenheit Cricket Club Official Crest"
                      className="w-full h-full object-contain rounded-full filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] z-0"
                      style={{ transform: 'translateZ(18px)' }}
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {/* Sub-medallion 3D Interactive Cue (Desktop only) */}
              {!isMobile && (
                <div
                  className="mt-5 text-center pointer-events-none text-slate-400 text-xs font-mono tracking-wider flex items-center gap-1.5 opacity-70"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Interactive 3D Crest • Tilt to explore</span>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
