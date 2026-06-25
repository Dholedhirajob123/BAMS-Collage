// components/pages/PhotoGallery.tsx
import { useState, useMemo } from "react";
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
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Filter photos by selected category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return photos;
    return photos.filter((p) => p.categoryId === activeCategory);
  }, [photos, activeCategory]);

  // Count photos per category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return photos.length;
    return photos.filter((p) => p.categoryId === categoryId).length;
  };

  if (isLoading) {
    return <div className="p-4 text-muted-foreground">Loading gallery...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
        <div>
          <h2 className="text-xl font-bold text-brand">Photo Gallery</h2>
          <p className="text-xs text-muted-foreground">
            Glimpses of campus life, academics, hospital, sports, cultural events and activities.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-border pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeCategory === "all"
              ? "bg-brand text-white shadow-md"
              : "bg-secondary text-muted-foreground hover:bg-secondary/70"
          }`}
        >
          <span className="text-sm">📸</span> All Photos
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white">
            {getCategoryCount("all")}
          </span>
        </button>
        {categories.map((cat) => {
          const def = CATEGORY_DEFS[cat.categoryId] || { label: cat.label, icon: "🖼️" };
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.categoryId)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeCategory === cat.categoryId
                  ? "bg-brand text-white shadow-md"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/70"
              }`}
            >
              <span className="text-sm">{def.icon}</span> {def.label}
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white">
                {getCategoryCount(cat.categoryId)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground italic">No photos in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-md border border-border bg-card animate-fade-in aspect-square cursor-pointer"
              style={{ animationDelay: `${idx * 60}ms` }}
              onClick={() => {
                const fullIndex = photos.findIndex((p) => p.id === photo.id);
                setActivePhotoIndex(fullIndex !== -1 ? fullIndex : idx);
              }}
            >
              <img
                src={photo.src}
                alt={photo.caption || "Gallery image"}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2 text-left translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                {photo.caption}
                {photo.date && (
                  <span className="block text-[10px] opacity-75">{photo.date}</span>
                )}
                {photo.place && (
                  <span className="block text-[10px] opacity-75">📍 {photo.place}</span>
                )}
              </span>
              {photo.categoryId && (
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[8px] px-1.5 py-0.5 bg-brand/80 text-white rounded">
                    {CATEGORY_DEFS[photo.categoryId]?.icon || "🏷️"}
                  </span>
                </div>
              )}
              <div className="absolute top-1 right-1 bg-brand/90 text-white text-[8px] px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {activePhotoIndex !== null && photos[activePhotoIndex] && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={photos[activePhotoIndex].src}
                alt={photos[activePhotoIndex].caption || "Gallery image"}
                className="w-full rounded-lg max-h-[75vh] object-contain"
              />
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full text-white text-xl hover:bg-black/70"
              >
                ×
              </button>
              {photos[activePhotoIndex].categoryId && (
                <div className="absolute top-2 left-2 bg-brand/80 text-white text-xs px-2 py-1 rounded-full">
                  {CATEGORY_DEFS[photos[activePhotoIndex].categoryId!]?.icon}{" "}
                  {CATEGORY_DEFS[photos[activePhotoIndex].categoryId!]?.label ||
                    photos[activePhotoIndex].categoryId}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between text-white mt-3 bg-black/50 rounded-lg p-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex(
                    (activePhotoIndex - 1 + photos.length) % photos.length
                  );
                }}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 text-sm flex items-center gap-1"
              >
                ‹ Prev
              </button>
              <div className="text-center max-w-[60%]">
                <p className="text-sm font-medium truncate">
                  {photos[activePhotoIndex].caption}
                </p>
                {photos[activePhotoIndex].date && (
                  <p className="text-xs text-white/60">{photos[activePhotoIndex].date}</p>
                )}
                {photos[activePhotoIndex].place && (
                  <p className="text-xs text-white/60">📍 {photos[activePhotoIndex].place}</p>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
                }}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 text-sm flex items-center gap-1"
              >
                Next ›
              </button>
            </div>
            <p className="text-white/50 text-xs text-center mt-2">
              {activePhotoIndex + 1} of {photos.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoGallery;