import React, { useState, useMemo } from 'react';
import { Camera, Trophy, Sparkles, Filter, Eye, Calendar, MapPin } from 'lucide-react';
import FilterTabs from '../components/common/FilterTabs';
import GalleryGrid from '../components/gallery/GalleryGrid';
import GalleryLightbox from '../components/gallery/GalleryLightbox';
import galleryService from '../services/galleryService';
import galleryDataFallback, { galleryCategories, galleryData } from '../data/galleryData';

export default function GalleryPage() {
  const [galleryList, setGalleryList] = useState(galleryDataFallback);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  React.useEffect(() => {
    let isMounted = true;
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await galleryService.getGallery();
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setGalleryList(data);
        }
      } catch (err) {
        console.warn('API error in GalleryPage, using fallback:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchGallery();
    return () => { isMounted = false; };
  }, []);

  // Filtered gallery items
  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'ALL') return galleryList;
    return galleryList.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, galleryList]);

  const featuredPhotos = useMemo(() => {
    return galleryList.filter((p) => p.featured).slice(0, 3);
  }, [galleryList]);

  const handleOpenLightbox = (indexInFiltered) => {
    setActivePhotoIndex(indexInFiltered);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1));
  };

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-2">
            <Camera className="w-4 h-4 text-orange-500" />
            OFFICIAL CLUB MEDIA
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
            MEMORIES ON THE FIELD
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Capturing unforgettable match encounters, net sessions, celebrations, and silverware across Coimbatore.
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-[#0d1424] border border-slate-800 w-fit">
          Archived Media: <strong className="text-orange-400">{galleryList.length}</strong> photos
        </span>
      </div>

      {/* 1. FEATURED MEMORIES (Prompt Section 34) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="font-display text-2xl font-bold uppercase text-white tracking-wide">
            FEATURED MEMORIES & TROPHY MOMENTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPhotos.map((photo, i) => (
            <div
              key={photo.id}
              onClick={() => {
                const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
                handleOpenLightbox(idx >= 0 ? idx : 0);
              }}
              className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-slate-800 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={photo.url}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                onError={(e) => {
                  e.target.onerror = null;
                  if (photo.fallbackUrl && e.target.src !== photo.fallbackUrl) {
                    e.target.src = photo.fallbackUrl;
                  } else {
                    e.target.src = "https://media.cricheroes.in/team_logo/1786358460380_fCa1Oa8BMzeU.jpeg";
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a0f] via-[#070a0f]/40 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-orange-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow">
                  FEATURED
                </span>
              </div>

              <div className="absolute bottom-5 inset-x-5 space-y-1">
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                  {photo.category} • {photo.date}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white leading-tight group-hover:text-orange-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-300 truncate">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CATEGORY TABS (Prompt Section 31) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <FilterTabs
            tabs={galleryCategories}
            activeTab={selectedCategory}
            onTabChange={setSelectedCategory}
            size="md"
          />

          <span className="text-xs font-mono text-slate-400">
            Showing: <strong className="text-orange-400">{filteredPhotos.length}</strong> photos
          </span>
        </div>
      </div>

      {/* 3. GALLERY MASONRY / GRID (Prompt Section 32) */}
      <GalleryGrid
        photos={filteredPhotos}
        onPhotoClick={handleOpenLightbox}
      />

      {/* 4. FULL SCREEN LIGHTBOX (Prompt Section 33) */}
      <GalleryLightbox
        photos={filteredPhotos}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
