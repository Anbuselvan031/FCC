import React from 'react';
import { Eye, Calendar, Trophy, MapPin } from 'lucide-react';

export default function GalleryGrid({ photos = [], onPhotoClick }) {
  if (!photos || photos.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-[#0d1424] border border-slate-800 text-slate-400">
        No team photos uploaded in this category yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {photos.map((photo, index) => (
        <div
          key={photo.id || index}
          onClick={() => onPhotoClick(index)}
          style={{ animationDelay: `${(index % 8) * 60}ms` }}
          className="group relative rounded-2xl bg-[#0d1424] border border-slate-800 hover:border-orange-500/50 shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10 shine-sweep animate-fade-in-up"
        >
          {/* Photo Media */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
            <img
              src={photo.url}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-95 group-hover:brightness-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://media.cricheroes.in/team_logo/1786358460380_fCa1Oa8BMzeU.jpeg";
              }}
            />

            {/* Dark Overlay with Zoom Icon on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-lg shadow-orange-950 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-6 h-6" />
              </div>
            </div>

            {/* Top Category Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-orange-400 text-[10px] font-extrabold uppercase tracking-wider border border-white/10">
                {photo.category}
              </span>
            </div>
          </div>

          {/* Card Info Details */}
          <div className="p-4 space-y-1.5">
            <h4 className="font-display text-base font-bold uppercase text-white tracking-wide group-hover:text-orange-400 transition-colors truncate">
              {photo.title}
            </h4>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span className="truncate max-w-[140px] text-slate-300">
                {photo.match || photo.location || 'Coimbatore'}
              </span>
              <span className="font-mono text-slate-500">
                {photo.date || '--'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
