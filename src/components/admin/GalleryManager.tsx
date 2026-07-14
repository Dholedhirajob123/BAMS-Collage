// components/admin/GalleryManager.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  getPhotos,
  getPhotosByCategory,
  uploadPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoCategories,
  PhotoCategory,
  Photo,
} from '@/lib/apis';
import { API_BASE_URL } from '@/lib/config';

interface GalleryManagerProps {
  setSavedMsg: (msg: string) => void;
}

// Helper to convert raw Base64 to a data URL
const getImageSrc = (src: string): string => {
  if (!src) return '';
  if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  if (src.startsWith('/9j/')) return `data:image/jpeg;base64,${src}`;
  if (src.startsWith('iVBORw0KGgo')) return `data:image/png;base64,${src}`;
  if (src.startsWith('R0lGODdh')) return `data:image/gif;base64,${src}`;
  if (src.startsWith('UklGR')) return `data:image/webp;base64,${src}`;
  return `data:image/jpeg;base64,${src}`;
};

export function GalleryManager({ setSavedMsg }: GalleryManagerProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<PhotoCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Set today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Load photos – either all or by category (client-side filtering)
  useEffect(() => {
    loadAllPhotos();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getPhotoCategories();
      setCategories(data);
      if (data.length > 0) setCategoryId(data[0].categoryId);
    } catch (err) {
      console.error('Failed to load categories:', err);
      setSavedMsg('❌ Failed to load categories.');
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  const loadAllPhotos = async () => {
    try {
      setLoading(true);
      const data = await getPhotos();
      setPhotos(data);
    } catch (err) {
      console.error(err);
      setSavedMsg('❌ Failed to load photos.');
      setTimeout(() => setSavedMsg(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoCategoryId = (photo: Photo): string | null => {
    return (
      (photo as any).categoryId ??
      (photo as any).category?.categoryId ??
      (photo as any).category?.id ??
      null
    );
  };

  // Client-side filter: if a category is selected, filter photos by categoryId
  const filteredPhotos = selectedCategoryId
    ? photos.filter((p) => getPhotoCategoryId(p) === selectedCategoryId)
    : photos;

  const handleDeletePhoto = async (id: number, captionText?: string) => {
    if (!confirm(`Delete "${captionText || 'this photo'}"?`)) return;
    try {
      await deletePhoto(id);
      await loadAllPhotos();
      setSavedMsg('✓ Photo deleted.');
      setTimeout(() => setSavedMsg(''), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to delete photo.');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please choose an image first.');
      return;
    }
    if (!caption.trim()) {
      alert('Please enter a caption.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('caption', caption.trim());
      formData.append('date', date);
      if (categoryId) formData.append('categoryId', categoryId);

      await uploadPhoto(formData);
      await loadAllPhotos();
      setCaption('');
      setSelectedFile(null);
      setShowUploadForm(false);
      setSavedMsg('✓ Photo uploaded successfully.');
      setTimeout(() => setSavedMsg(''), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to upload photo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async (id: number, patch: Partial<Photo>) => {
    try {
      await updatePhoto(id, patch);
      setPhotos(photos.map((p) => (p.id === id ? { ...p, ...patch } : p)));
      setSavedMsg('✓ Photo updated.');
      setTimeout(() => setSavedMsg(''), 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to update photo.');
    }
  };

  const deleteAllPhotos = async () => {
    const uploads = photos.filter((p) => !p.isDefault);
    if (uploads.length === 0) {
      alert('No uploaded photos to delete.');
      return;
    }
    if (!confirm(`Delete ALL ${uploads.length} uploaded photos?`)) return;
    try {
      for (const p of uploads) {
        if (p.id) await deletePhoto(p.id);
      }
      await loadAllPhotos();
      setSavedMsg('✓ All uploaded photos deleted.');
      setTimeout(() => setSavedMsg(''), 2000);
    } catch (err) {
      console.error(err);
      alert('Failed to delete all photos.');
    }
  };

  const isDefault = (p: Photo) => p.isDefault || false;

  return (
    <div className="border-2 border-red-300 rounded-xl p-3 sm:p-5 bg-white shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
        <div>
          <h2 className="font-bold text-base sm:text-lg text-black mb-0.5 sm:mb-1">Photo Gallery</h2>
          <p className="text-[10px] sm:text-xs text-black font-bold">Upload and manage photos. Edits are saved automatically.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {photos.filter((p) => !isDefault(p)).length > 0 && (
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={deleteAllPhotos} 
              className="flex-1 sm:flex-none text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
            >
              Delete All Uploaded
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={loadAllPhotos}
            disabled={loading}
            className="flex-1 sm:flex-none text-xs border-2 border-red-300 text-black font-bold hover:bg-red-50 rounded-full"
          >
            {loading ? 'Loading...' : '↻ Refresh'}
          </Button>
          <Button
            size="sm"
            variant="default"
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="flex-1 sm:flex-none text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
          >
            {showUploadForm ? '✕ Close' : '➕ Add Photo'}
          </Button>
        </div>
      </div>

      {/* Upload Form - Collapsible */}
      {showUploadForm && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6 p-3 sm:p-4 bg-red-50 rounded-xl border-2 border-red-200">
          <div>
            <Label className="text-xs text-black font-bold">Caption *</Label>
            <Input
              placeholder="Photo caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mt-1 text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
            />
          </div>
          <div>
            <Label className="text-xs text-black font-bold">Date</Label>
            <Input
              type="date"
              value={date}
              disabled
              className="mt-1 bg-gray-100 text-sm border-2 border-red-200 rounded-xl text-black font-bold"
            />
            <p className="text-[10px] text-black font-bold mt-0.5">Today's date (auto)</p>
          </div>
          <div>
            <Label className="text-xs text-black font-bold">Category</Label>
            <select
              className="w-full mt-1 border-2 border-red-200 rounded-xl p-2 bg-white text-sm text-black font-bold focus:ring-2 focus:ring-red-500 focus:border-red-500"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.categoryId}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-xs text-black font-bold">Choose Image</Label>
            <Input
              type="file"
              accept="image/*"
              className="mt-1 cursor-pointer text-sm border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setSelectedFile(file);
                e.target.value = '';
              }}
            />
            {selectedFile && (
              <p className="text-xs text-red-600 font-bold mt-1 truncate">✓ {selectedFile.name}</p>
            )}
          </div>
          <div className="flex items-end">
            <Button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl"
            >
              {isUploading ? 'Uploading...' : '📤 Upload Photo'}
            </Button>
          </div>
        </div>
      )}

      {/* Category Legend (clickable badges) */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        <span className="text-[10px] sm:text-xs font-bold text-black">Categories:</span>
        <span
          onClick={() => setSelectedCategoryId(null)}
          className={`text-[10px] sm:text-xs px-2 py-1 rounded-full cursor-pointer transition font-bold ${
            selectedCategoryId === null
              ? 'bg-red-600 text-white'
              : 'bg-red-50 text-black hover:bg-red-100 border-2 border-red-200'
          }`}
        >
          All ({photos.length})
        </span>
        {categories.map((cat) => {
          const count = photos.filter((p) => p.categoryId === cat.categoryId).length;
          const isActive = selectedCategoryId === cat.categoryId;
          return (
            <span
              key={cat.id}
              onClick={() => setSelectedCategoryId(isActive ? null : cat.categoryId)}
              className={`text-[10px] sm:text-xs px-2 py-1 rounded-full cursor-pointer transition font-bold ${
                isActive
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-black hover:bg-red-100 border-2 border-red-200'
              }`}
            >
              {cat.label} ({count})
            </span>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent" />
          <p className="mt-2 text-sm text-black font-bold">Loading photos...</p>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filteredPhotos.map((photo) => {
            const defaultPhoto = isDefault(photo);
            const imageUrl = getImageSrc(photo.src || '');

            return (
              <div
                key={photo.id}
                className="group relative rounded-xl overflow-hidden border-2 border-red-200 bg-white transition-all hover:shadow-xl hover:border-red-500"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-black font-bold text-[10px] sm:text-xs">No image</span>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                    <p className="text-[10px] sm:text-xs font-bold truncate">{photo.caption || 'Untitled'}</p>
                    {photo.date && <p className="text-[8px] sm:text-[10px] opacity-75 font-bold">{photo.date}</p>}
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {defaultPhoto && (
                        <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-red-600 text-white font-bold rounded">Default</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-xs rounded-full bg-red-600 hover:bg-red-700 text-white font-bold"
                    onClick={() => photo.id && handleDeletePhoto(photo.id, photo.caption)}
                    title="Delete photo"
                  >
                    🗑️
                  </Button>
                </div>

                {/* Edit fields */}
                <div className="p-1.5 sm:p-2 border-t-2 border-red-200 bg-white">
                  <Input
                    value={photo.caption || ''}
                    onChange={(e) => photo.id && handleUpdate(photo.id, { caption: e.target.value })}
                    placeholder="Caption"
                    className="text-[10px] sm:text-xs h-6 sm:h-7 mb-1 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  />
                  <Input
                    value={photo.date || ''}
                    onChange={(e) => photo.id && handleUpdate(photo.id, { date: e.target.value || undefined })}
                    placeholder="Date"
                    type="date"
                    className="text-[10px] sm:text-xs h-6 sm:h-7 border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black font-bold"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filteredPhotos.length === 0 && (
        <div className="text-center py-12 bg-red-50 rounded-xl border-2 border-red-200">
          <p className="text-base sm:text-lg text-black font-bold">
            {photos.length === 0 ? '📷 No photos in gallery' : '🔍 No photos match the selected category'}
          </p>
          <p className="text-xs sm:text-sm text-black font-bold">
            {photos.length === 0
              ? 'Upload a photo using the form above.'
              : 'Try selecting a different category or view "All".'}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 pt-3 border-t-2 border-red-200 text-[10px] sm:text-xs text-black font-bold flex flex-wrap justify-between gap-2">
        <span>Total Photos: <span className="text-red-600">{photos.length}</span></span>
        <span>
          Default: <span className="text-red-600">{photos.filter((p) => isDefault(p)).length}</span> | Uploaded:{' '}
          <span className="text-red-600">{photos.filter((p) => !isDefault(p)).length}</span>
        </span>
      </div>
    </div>
  );
}

export default GalleryManager;