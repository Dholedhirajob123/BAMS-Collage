// components/pages/PhotoGallery.tsx
import { useState, useMemo } from "react";
import { useGallery } from "@/lib/galleryStore";

type Category = {
  label: string;
  icon: string;
  filter: (photo: any) => boolean;
};

// Keywords for each category
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  campus: ["campus", "garden", "building", "hostel", "herbal", "view", "infrastructure", "college"],
  academic: ["class", "lecture", "seminar", "workshop", "library", "study", "dissection", "conference", "academic"],
  lab: ["lab", "laboratory", "microscope", "experiment", "research", "practical", "specimen"],
  hospital: ["hospital", "clinic", "medical", "patient", "treatment", "doctor", "nurse"],
  opd: ["opd", "outpatient", "consultation", "checkup"],
  ipd: ["ipd", "inpatient", "ward", "admission", "bed", "room"],
  panchakarma: ["panchakarma", "detox", "therapy", "massage", "shirodhara"],
  surgery: ["surgery", "operation", "ot", "theatre", "surgical"],
  sports: ["sport", "cricket", "football", "athletic", "tournament", "match", "game", "competition"],
  cultural: ["cultural", "festival", "dance", "music", "traditional", "art", "folk", "celebration"],
  events: ["event", "inaugural", "convocation", "graduation", "ceremony", "guest", "visit", "annual", "function"],
  activities: ["activity", "nss", "camp", "awareness", "health", "blood donation", "free medical"],
};

export function PhotoGallery() {
  const GALLERY = useGallery();
  const [active, setActive] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Define categories with filter functions
  const categories: Record<string, Category> = {
    all: { 
      label: "All Photos", 
      icon: "📸",
      filter: () => true 
    },
    campus: { 
      label: "Campus", 
      icon: "🏫",
      filter: (photo) => CATEGORY_KEYWORDS.campus.some(k => photo.caption?.toLowerCase().includes(k))
    },
    academic: { 
      label: "Academic", 
      icon: "📚",
      filter: (photo) => CATEGORY_KEYWORDS.academic.some(k => photo.caption?.toLowerCase().includes(k))
    },
    lab: { 
      label: "Laboratory", 
      icon: "🔬",
      filter: (photo) => CATEGORY_KEYWORDS.lab.some(k => photo.caption?.toLowerCase().includes(k))
    },
    hospital: { 
      label: "Hospital", 
      icon: "🏥",
      filter: (photo) => CATEGORY_KEYWORDS.hospital.some(k => photo.caption?.toLowerCase().includes(k))
    },
    opd: { 
      label: "OPD", 
      icon: "🩺",
      filter: (photo) => CATEGORY_KEYWORDS.opd.some(k => photo.caption?.toLowerCase().includes(k))
    },
    ipd: { 
      label: "IPD", 
      icon: "🏨",
      filter: (photo) => CATEGORY_KEYWORDS.ipd.some(k => photo.caption?.toLowerCase().includes(k))
    },
    panchakarma: { 
      label: "Panchakarma", 
      icon: "🌿",
      filter: (photo) => CATEGORY_KEYWORDS.panchakarma.some(k => photo.caption?.toLowerCase().includes(k))
    },
    surgery: { 
      label: "Surgery / OT", 
      icon: "🔪",
      filter: (photo) => CATEGORY_KEYWORDS.surgery.some(k => photo.caption?.toLowerCase().includes(k))
    },
    sports: { 
      label: "Sports", 
      icon: "⚽",
      filter: (photo) => CATEGORY_KEYWORDS.sports.some(k => photo.caption?.toLowerCase().includes(k))
    },
    cultural: { 
      label: "Cultural", 
      icon: "🎭",
      filter: (photo) => CATEGORY_KEYWORDS.cultural.some(k => photo.caption?.toLowerCase().includes(k))
    },
    events: { 
      label: "Events", 
      icon: "🎉",
      filter: (photo) => CATEGORY_KEYWORDS.events.some(k => photo.caption?.toLowerCase().includes(k))
    },
    activities: { 
      label: "Activities", 
      icon: "🎯",
      filter: (photo) => CATEGORY_KEYWORDS.activities.some(k => photo.caption?.toLowerCase().includes(k))
    },
  };

  // Get current category
  const currentCategory = categories[activeCategory];

  // Filter photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return GALLERY;
    return GALLERY.filter(currentCategory?.filter || (() => true));
  }, [GALLERY, activeCategory, currentCategory]);

  // Get category badges for a photo
  const getCategoryBadges = (caption: string): { icon: string; label: string; color: string }[] => {
    const badges: { icon: string; label: string; color: string }[] = [];
    const lower = caption.toLowerCase();
    
    Object.entries(CATEGORY_KEYWORDS).forEach(([categoryId, keywords]) => {
      const matched = keywords.some(keyword => lower.includes(keyword));
      if (matched) {
        const cat = categories[categoryId];
        if (cat && categoryId !== "all") {
          const colors: Record<string, string> = {
            campus: "bg-amber-500",
            academic: "bg-blue-500",
            lab: "bg-cyan-500",
            hospital: "bg-red-500",
            opd: "bg-teal-500",
            ipd: "bg-indigo-500",
            panchakarma: "bg-emerald-500",
            surgery: "bg-rose-500",
            sports: "bg-green-500",
            cultural: "bg-purple-500",
            events: "bg-pink-500",
            activities: "bg-orange-500",
          };
          badges.push({ 
            icon: cat.icon, 
            label: cat.label, 
            color: colors[categoryId] || "bg-gray-500" 
          });
        }
      }
    });
    
    return badges;
  };

  // Get category count
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return GALLERY.length;
    const category = categories[categoryId];
    if (!category) return 0;
    return GALLERY.filter(category.filter).length;
  };

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
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-t-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeCategory === key
                ? "bg-brand text-white shadow-md"
                : "bg-secondary text-muted-foreground hover:bg-secondary/70"
            }`}
          >
            <span className="text-sm">{category.icon}</span>
            {category.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              activeCategory === key
                ? "bg-white/20 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-muted-foreground"
            }`}>
              {getCategoryCount(key)}
            </span>
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground italic">
            No photos in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredPhotos.map((g, i) => (
            <button
              key={g.id}
              onClick={() => {
                const fullIndex = GALLERY.findIndex(p => p.id === g.id);
                setActive(fullIndex !== -1 ? fullIndex : i);
              }}
              className="group relative overflow-hidden rounded-md border border-border bg-card animate-fade-in aspect-square"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white text-xs p-2 text-left translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                {g.caption}
                {g.date && (
                  <span className="block text-[10px] opacity-75">{g.date}</span>
                )}
                {g.place && (
                  <span className="block text-[10px] opacity-75">📍 {g.place}</span>
                )}
              </span>
              {/* Category Badges */}
              {g.caption && (
                <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap gap-0.5">
                  {getCategoryBadges(g.caption).slice(0, 2).map((badge, idx) => (
                    <span key={idx} className={`text-[8px] px-1 py-0.5 ${badge.color} text-white rounded`}>
                      {badge.icon}
                    </span>
                  ))}
                </div>
              )}
              <div className="absolute top-1 right-1 bg-brand/90 text-white text-[8px] px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                View
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {active !== null && GALLERY[active] && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={GALLERY[active].src}
                alt={GALLERY[active].caption}
                className="w-full rounded-lg max-h-[75vh] object-contain"
              />
              
              <button
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full text-white text-xl hover:bg-black/70"
              >
                ×
              </button>

              {/* Category Badges in Lightbox */}
              {GALLERY[active].caption && (
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {getCategoryBadges(GALLERY[active].caption).map((badge, idx) => (
                    <span key={idx} className={`text-[10px] px-2 py-1 ${badge.color} text-white rounded-full`}>
                      {badge.icon} {badge.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Caption and Navigation */}
            <div className="flex items-center justify-between text-white mt-3 bg-black/50 rounded-lg p-3">
              <button
                onClick={() => setActive((active - 1 + GALLERY.length) % GALLERY.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 text-sm flex items-center gap-1"
              >
                ‹ Prev
              </button>
              
              <div className="text-center max-w-[60%]">
                <p className="text-sm font-medium truncate">{GALLERY[active].caption}</p>
                {GALLERY[active].date && (
                  <p className="text-xs text-white/60">{GALLERY[active].date}</p>
                )}
                {GALLERY[active].place && (
                  <p className="text-xs text-white/60">📍 {GALLERY[active].place}</p>
                )}
              </div>
              
              <button
                onClick={() => setActive((active + 1) % GALLERY.length)}
                className="px-3 py-1 bg-white/10 rounded hover:bg-white/20 text-sm flex items-center gap-1"
              >
                Next ›
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-6 gap-2 mt-3">
              {GALLERY.slice(0, 6).map((g, idx) => (
                <button
                  key={g.id}
                  onClick={() => setActive(idx)}
                  className={`relative rounded-lg overflow-hidden transition-all ${
                    idx === active 
                      ? 'ring-2 ring-white ring-offset-2' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={g.src}
                    alt={g.caption}
                    className="aspect-square w-full object-cover"
                  />
                </button>
              ))}
            </div>
            
            <p className="text-white/50 text-xs text-center mt-2">
              {active + 1} of {GALLERY.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoGallery;