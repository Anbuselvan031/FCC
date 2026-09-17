import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Trophy } from 'lucide-react';

export default function GalleryLightbox({
  photos = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onPrev,
  onNext
}) {
  const currentPhoto = photos[currentIndex];
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !currentPhoto) return null;

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      onNext();
    } else if (diff < -50) {
      onPrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-6 select-none animate-in fade-in duration-200"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-mono text-orange-400">
            {currentIndex + 1} / {photos.length}
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline-block">
            {currentPhoto.category}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-slate-900/80 hover:bg-orange-600 border border-slate-700 text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev / Next Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-orange-600 border border-slate-700 text-white transition-colors"
        aria-label="Previous Photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-slate-900/80 hover:bg-orange-600 border border-slate-700 text-white transition-colors"
        aria-label="Next Photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image Container */}
      <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center justify-center p-2">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          className="max-w-full max-h-[72vh] object-contain rounded-xl shadow-2xl transition-transform"
        />

        {/* Photo Info Banner */}
        <div className="mt-3 text-center space-y-1">
          <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
            {currentPhoto.title}
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-400">
            {currentPhoto.match && (
              <span className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-orange-400" />
                {currentPhoto.match}
              </span>
            )}
            {currentPhoto.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                {currentPhoto.date}
              </span>
            )}
            {currentPhoto.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {currentPhoto.location}
              </span>
            )}
          </div>
          {currentPhoto.caption && (
            <p className="text-[11px] text-slate-500 max-w-lg mx-auto leading-relaxed">
              {currentPhoto.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
