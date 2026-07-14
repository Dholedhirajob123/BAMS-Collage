// components/pages/PhotoGallery.tsx
import { useState, useMemo, useEffect, useRef } from "react";
import { useGallery } from "@/lib/galleryStore";

// Category display definitions
const CATEGORY_DEFS: Record<string, { label: string; icon: string }> = {
  campus: { label: "Campus", icon: "🏫" },
  academic: { label: "Academic", icon: "📚" },
  lab: { label: "Laboratory", icon: "🔬" },
  hospital: { label: "Hospital", icon: "🏥" },
  opd: { label: "OPD", icon: "🩺" },
  ipd: { label: "IPD", icon: "🏨" },
  panchakarma: { label: "Panchakarma", icon: "🌿" },
  surgery: { label: "Surgery / OT", icon: "🔪" },
  sports: { label: "Sports", icon: "⚽" },
  cultural: { label: "Cultural", icon: "🎭" },
  events: { label: "Events", icon: "🎉" },
  activities: { label: "Activities", icon: "🎯" },
};

export function PhotoGallery() {
  const { photos, categories, isLoading, error } = useGallery();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Filter photos by selected category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return photos;
    return photos.filter((p) => p.categoryId === activeCategory);
  }, [photos, activeCategory]);

  // Get the actual index in the full photos array
  const getFullIndex = (photoId: string) => {
    return photos.findIndex((p) => p.id === photoId);
  };

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhotoIndex]);

  // Navigation handlers with animation
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null || isAnimating) return;
    setIsAnimating(true);
    const newIndex = selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1;
    setSelectedPhotoIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex === null || isAnimating) return;
    setIsAnimating(true);
    const newIndex = selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1;
    setSelectedPhotoIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedPhotoIndex(null);
    } else if (e.key === 'ArrowLeft') {
      if (selectedPhotoIndex !== null && !isAnimating) {
        setIsAnimating(true);
        const newIndex = selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1;
        setSelectedPhotoIndex(newIndex);
        setTimeout(() => setIsAnimating(false), 300);
      }
    } else if (e.key === 'ArrowRight') {
      if (selectedPhotoIndex !== null && !isAnimating) {
        setIsAnimating(true);
        const newIndex = selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1;
        setSelectedPhotoIndex(newIndex);
        setTimeout(() => setIsAnimating(false), 300);
      }
    }
  };

  if (isLoading) {
    return <div className="p-4 text-black font-bold">Loading gallery...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600 font-bold">Error: {error}</div>;
  }

  const currentPhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  return (
    <div className="w-full space-y-6">
      {/* Header with Logo Colors */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-red-600 to-red-800 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-black">
            <span className="text-red-600">Photo</span> Gallery
          </h2>
          <p className="text-xs text-black font-bold">
            Glimpses of campus life, academics, hospital, sports, cultural events and activities.
          </p>
        </div>
      </div>

      {/* Category Tabs with Logo Colors */}
      <div className="flex flex-wrap gap-1 border-b-2 border-red-300 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeCategory === "all"
              ? "bg-red-600 text-white shadow-md"
              : "bg-gray-100 text-black hover:bg-red-50"
          }`}
        >
          <span className="text-sm">📸</span> All Photos
        </button>
        {categories.map((cat) => {
          const def = CATEGORY_DEFS[cat.categoryId] || { label: cat.label, icon: "🖼️" };
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.categoryId)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategory === cat.categoryId
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-gray-100 text-black hover:bg-red-50"
              }`}
            >
              <span className="text-sm">{def.icon}</span> {def.label}
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12 bg-red-50 rounded-lg border-2 border-red-300">
          <p className="text-sm text-black font-bold italic">No photos in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-md border-2 border-red-300 bg-white hover:border-red-600 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
              style={{ animationDelay: `${idx * 60}ms` }}
              onClick={() => setSelectedPhotoIndex(getFullIndex(photo.id))}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.caption || "Gallery image"}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Image Name/Caption at bottom */}
              <div className="p-2 bg-white border-t border-red-200">
                <p className="text-xs font-bold text-black truncate" title={photo.caption || "Untitled"}>
                  {photo.caption || "Untitled"}
                </p>
              </div>

              {/* Category badge on hover */}
              {photo.categoryId && (
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] px-1.5 py-0.5 bg-red-600 text-white font-bold rounded">
                    {CATEGORY_DEFS[photo.categoryId]?.icon || "🏷️"}
                  </span>
                </div>
              )}
              
              {/* View badge */}
              <div className="absolute top-1 right-1 bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal with Logo Colors */}
      {selectedPhotoIndex !== null && currentPhoto && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhotoIndex(null)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute -top-14 right-0 text-white hover:text-red-500 text-3xl font-bold transition-colors z-10 hover:scale-110 transform duration-200"
              aria-label="Close lightbox"
            >
              ✕
            </button>

            {/* Image Container with Zoom Animation */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-red-500/20">
              <div className={`transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.caption || "Gallery image"}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
              
              {/* Category Badge */}
              {currentPhoto.categoryId && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm bg-opacity-90">
                  {CATEGORY_DEFS[currentPhoto.categoryId]?.icon || "🏷️"} {CATEGORY_DEFS[currentPhoto.categoryId]?.label || currentPhoto.categoryId}
                </div>
              )}

              {/* Photo Counter - Top Right */}
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-bold border border-red-500/30">
                {selectedPhotoIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Photo Info */}
            <div className="text-white mt-6 text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-1">
                <span className="text-red-400">✦</span> {currentPhoto.caption}
              </h3>
              <div className="flex items-center justify-center gap-4 flex-wrap text-sm text-white/70">
                {currentPhoto.date && (
                  <span>📅 {currentPhoto.date}</span>
                )}
                {currentPhoto.place && (
                  <span>📍 {currentPhoto.place}</span>
                )}
              </div>
            </div>

            {/* Navigation Buttons - Enhanced with Logo Colors */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 sm:-ml-8 md:-ml-10 bg-red-600 hover:bg-red-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl transition-all hover:scale-110 hover:shadow-red-500/30 border-2 border-red-400/50"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 sm:-mr-8 md:-mr-10 bg-red-600 hover:bg-red-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-2xl transition-all hover:scale-110 hover:shadow-red-500/30 border-2 border-red-400/50"
              aria-label="Next photo"
            >
              ›
            </button>

            {/* Progress Dots with Logo Colors */}
            <div className="flex justify-center gap-2 mt-6 overflow-x-auto px-4 py-2 max-w-full">
              {photos.slice(0, 15).map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setSelectedPhotoIndex(idx);
                      setTimeout(() => setIsAnimating(false), 300);
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === selectedPhotoIndex
                      ? 'w-10 h-2.5 bg-red-500 shadow-lg shadow-red-500/50'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/60 hover:scale-125'
                  }`}
                  aria-label={`Go to photo ${idx + 1}`}
                />
              ))}
              {photos.length > 15 && (
                <span className="text-white/50 text-xs ml-2 flex items-center">
                  +{photos.length - 15} more
                </span>
              )}
            </div>

            {/* Scroll Indicator */}
            <div className="text-center mt-2">
              <p className="text-white/30 text-xs animate-pulse">
                ← Use arrow keys or click dots to navigate →
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoGallery;