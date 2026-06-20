// components/admin/GalleryManager.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addPhoto,
  getAllForAdmin,
  removePhoto,
  restorePhoto,
  updatePhoto,
} from "@/lib/galleryStore";

interface GalleryManagerProps {
  setSavedMsg: (msg: string) => void;
}

const CATEGORIES = [
  { id: "campus", label: "🏫 Campus", color: "amber" },
  { id: "academic", label: "📚 Academic", color: "blue" },
  { id: "lab", label: "🔬 Laboratory", color: "cyan" },
  { id: "hospital", label: "🏥 Hospital", color: "red" },
  { id: "opd", label: "🩺 OPD", color: "teal" },
  { id: "ipd", label: "🏨 IPD", color: "indigo" },
  { id: "panchakarma", label: "🌿 Panchakarma", color: "emerald" },
  { id: "surgery", label: "🔪 Surgery / OT", color: "rose" },
  { id: "sports", label: "⚽ Sports", color: "green" },
  { id: "cultural", label: "🎭 Cultural", color: "purple" },
  { id: "events", label: "🎉 Events", color: "pink" },
  { id: "activities", label: "🎯 Activities", color: "orange" },
  { id: "other", label: "📷 Other", color: "gray" },
];

// Keywords for each category to help with auto-categorization
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

export function GalleryManager({ setSavedMsg }: GalleryManagerProps) {
  const [items, setItems] = useState(() => getAllForAdmin());
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState<string>("other");
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const refresh = () => {
    setItems(getAllForAdmin());
  };

  const handleDeletePhoto = (photoId: string, photoCaption: string) => {
    if (confirm(`Delete "${photoCaption || 'this photo'}"? This cannot be undone.`)) {
      removePhoto(photoId);
      refresh();
      setSavedMsg("✓ Photo deleted successfully.");
      setTimeout(() => setSavedMsg(""), 2000);
    }
  };

  const handleRestorePhoto = (photoId: string) => {
    restorePhoto(photoId);
    refresh();
    setSavedMsg("✓ Photo restored successfully.");
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const onFile = (file: File) => {
    if (!file.type.startsWith("image/")) return alert("Please choose an image file.");
    if (file.size > 3 * 1024 * 1024) return alert("Image must be under 3MB.");
    
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const categoryLabel = CATEGORIES.find(c => c.id === category)?.label || "";
      const fullCaption = caption || file.name.replace(/\.[^.]+$/, "");
      
      addPhoto(
        reader.result as string, 
        fullCaption, 
        date, 
        place
      );
      setCaption("");
      setDate("");
      setPlace("");
      setCategory("other");
      refresh();
      setIsUploading(false);
      setSavedMsg(`✓ Photo uploaded successfully to ${categoryLabel} category.`);
      setTimeout(() => setSavedMsg(""), 2000);
    };
    reader.readAsDataURL(file);
  };

  const deleteAllPhotos = () => {
    const uploadedPhotos = items.filter(i => !i.isDefault);
    if (uploadedPhotos.length === 0) {
      alert("No uploaded photos to delete.");
      return;
    }
    if (!confirm(`Delete ALL ${uploadedPhotos.length} uploaded photos? This cannot be undone.`)) return;
    uploadedPhotos.forEach(({ photo }) => {
      removePhoto(photo.id);
    });
    refresh();
    setSavedMsg("✓ All uploaded photos deleted.");
    setTimeout(() => setSavedMsg(""), 2000);
  };

  const handleUpdatePhoto = (photoId: string, patch: { caption?: string; date?: string; place?: string }) => {
    updatePhoto(photoId, patch);
    refresh();
  };

  const saveAllChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedMsg("✓ All gallery changes saved successfully.");
      setTimeout(() => setSavedMsg(""), 2000);
    }, 500);
  };

  const getCategoryBadges = (caption: string) => {
    const badges: { icon: string; label: string; color: string }[] = [];
    const lower = caption.toLowerCase();
    
    // Check each category's keywords
    Object.entries(CATEGORY_KEYWORDS).forEach(([categoryId, keywords]) => {
      const matched = keywords.some(keyword => lower.includes(keyword));
      if (matched) {
        const cat = CATEGORIES.find(c => c.id === categoryId);
        if (cat) {
          badges.push({ 
            icon: cat.label.split(' ')[0], 
            label: cat.label.split(' ').slice(1).join(' '), 
            color: `bg-${cat.color}-500` 
          });
        }
      }
    });
    
    return badges;
  };

  // Filter items by search
  const filteredItems = items.filter(({ photo }) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      photo.caption?.toLowerCase().includes(search) ||
      photo.date?.toLowerCase().includes(search) ||
      photo.place?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Photo Gallery</h2>
          <p className="text-xs text-muted-foreground">Upload and manage photos with categories. Photos are saved automatically when edited.</p>
        </div>
        <div className="flex gap-2">
          {items.filter(i => !i.isDefault).length > 0 && (
            <Button size="sm" variant="destructive" onClick={deleteAllPhotos}>
              Delete All Uploaded
            </Button>
          )}
          <Button 
            onClick={saveAllChanges} 
            disabled={isSaving} 
            className="bg-green-600 hover:bg-green-700"
          >
            {isSaving ? "Saving..." : "💾 Save Changes"}
          </Button>
        </div>
      </div>

      {/* Upload Form */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6 p-4 bg-secondary/30 rounded-lg">
        <div>
          <Label className="text-xs">Caption</Label>
          <Input
            placeholder="Photo caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Date</Label>
          <Input
            placeholder="Date (optional)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Place</Label>
          <Input
            placeholder="Place (optional)"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Category</Label>
          <select
            className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="text-xs">Upload Image</Label>
          <Input
            type="file"
            accept="image/*"
            className="mt-1 cursor-pointer"
            disabled={isUploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.target.value = "";
            }}
          />
          {isUploading && (
            <p className="text-xs text-muted-foreground mt-1">Uploading...</p>
          )}
        </div>
      </div>

      {/* Category Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-muted-foreground self-center">Categories:</span>
          {CATEGORIES.map((cat) => {
            const count = items.filter(({ photo }) => {
              const badges = getCategoryBadges(photo.caption || "");
              return badges.some(b => b.label === cat.label.replace(/[^\w\s]/g, '').trim());
            }).length;
            return (
              <span key={cat.id} className={`text-xs px-2 py-1 rounded-full bg-${cat.color}-100 text-${cat.color}-700 dark:bg-${cat.color}-900/30 dark:text-${cat.color}-400`}>
                {cat.label} ({count})
              </span>
            );
          })}
        </div>
        <div>
          <Input
            placeholder="Search photos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs h-8 w-48"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredItems.map(({ photo, isDefault, hidden }) => {
          const badges = getCategoryBadges(photo.caption || "");
          return (
            <div
              key={photo.id}
              className={`group relative rounded-lg overflow-hidden border border-border bg-card transition-all hover:shadow-lg ${
                hidden ? "opacity-50" : ""
              }`}
            >
              {/* Image Container */}
              <div className="aspect-square overflow-hidden bg-secondary/20">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay with Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                  <p className="text-xs font-medium truncate">{photo.caption || "Untitled"}</p>
                  {photo.date && <p className="text-[10px] opacity-75">{photo.date}</p>}
                  {photo.place && <p className="text-[10px] opacity-75">📍 {photo.place}</p>}
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {badges.map((badge, idx) => (
                      <span key={idx} className={`text-[9px] px-1.5 py-0.5 ${badge.color} text-white rounded`}>
                        {badge.icon} {badge.label}
                      </span>
                    ))}
                    {isDefault && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/80 text-white rounded">Default</span>
                    )}
                    {hidden && (
                      <span className="text-[9px] px-1.5 py-0.5 bg-red-500/80 text-white rounded">Hidden</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-8 w-8 p-0 text-xs rounded-full"
                  onClick={() => handleDeletePhoto(photo.id, photo.caption)}
                  title="Delete photo"
                >
                  🗑️
                </Button>
              </div>

              {/* Restore Button for hidden photos */}
              {hidden && (
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 text-xs rounded-full bg-green-500 hover:bg-green-600 text-white border-0"
                    onClick={() => handleRestorePhoto(photo.id)}
                    title="Restore photo"
                  >
                    ↩️
                  </Button>
                </div>
              )}

              {/* Badge */}
              <div className="absolute top-2 left-2">
                {isDefault && !hidden && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/90 text-white rounded">Default</span>
                )}
                {hidden && (
                  <span className="text-[9px] px-1.5 py-0.5 bg-red-500/90 text-white rounded">Hidden</span>
                )}
              </div>

              {/* Category Badges on image */}
              {badges.length > 0 && (
                <div className="absolute bottom-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {badges.slice(0, 2).map((badge, idx) => (
                    <span key={idx} className={`text-[9px] px-1.5 py-0.5 ${badge.color} text-white rounded`}>
                      {badge.icon}
                    </span>
                  ))}
                  {badges.length > 2 && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-gray-700 text-white rounded">
                      +{badges.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Edit Fields */}
              <div className="p-2 border-t border-border bg-white dark:bg-gray-800">
                <Input
                  value={photo.caption}
                  onChange={(e) => handleUpdatePhoto(photo.id, { caption: e.target.value })}
                  placeholder="Caption"
                  className="text-xs h-7 mb-1"
                />
                <div className="flex gap-1">
                  <Input
                    value={photo.date ?? ""}
                    onChange={(e) => handleUpdatePhoto(photo.id, { date: e.target.value || undefined })}
                    placeholder="Date"
                    className="text-xs h-7 w-1/2"
                  />
                  <Input
                    value={photo.place ?? ""}
                    onChange={(e) => handleUpdatePhoto(photo.id, { place: e.target.value || undefined })}
                    placeholder="Place"
                    className="text-xs h-7 w-1/2"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">📷 No photos in gallery</p>
          <p className="text-sm">Use the upload form above to add photos</p>
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
        <span>Total Photos: {items.length}</span>
        <span>Default: {items.filter(i => i.isDefault).length} | Uploaded: {items.filter(i => !i.isDefault).length}</span>
        <span>Hidden: {items.filter(i => i.hidden).length}</span>
      </div>
    </div>
  );
}

export default GalleryManager;