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
      await loadAllPhotos(); // refresh
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
      await loadAllPhotos(); // refresh
      setCaption('');
      setSelectedFile(null);
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
      // Update local state
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
    <div className="border border-border rounded-md p-5 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-semibold text-lg mb-1">Photo Gallery</h2>
          <p className="text-xs text-muted-foreground">Upload and manage photos. Edits are saved automatically.</p>
        </div>
        <div className="flex gap-2">
          {photos.filter((p) => !isDefault(p)).length > 0 && (
            <Button size="sm" variant="destructive" onClick={deleteAllPhotos}>
              Delete All Uploaded
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={loadAllPhotos}
            disabled={loading}
          >
            {loading ? 'Loading...' : '↻ Refresh'}
          </Button>
        </div>
      </div>

      {/* Upload Form */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6 p-4 bg-secondary/30 rounded-lg">
        <div>
          <Label className="text-xs">Caption *</Label>
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
            type="date"
            value={date}
            disabled
            className="mt-1 bg-muted"
          />
          <p className="text-[10px] text-muted-foreground mt-0.5">Today's date (auto)</p>
        </div>
        <div>
          <Label className="text-xs">Category</Label>
          <select
            className="w-full mt-1 border border-border rounded-md p-2 bg-background text-sm"
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
          <Label className="text-xs">Choose Image</Label>
          <Input
            type="file"
            accept="image/*"
            className="mt-1 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setSelectedFile(file);
              e.target.value = '';
            }}
          />
          {selectedFile && (
            <p className="text-xs text-green-600 mt-1">Selected: {selectedFile.name}</p>
          )}
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleUpload}
            disabled={isUploading || !selectedFile}
            className="w-full"
          >
            {isUploading ? 'Uploading...' : '➕ Add Photo'}
          </Button>
        </div>
      </div>

      {/* Category Legend (clickable badges) */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-xs font-medium text-muted-foreground">Categories:</span>
        <span
          onClick={() => setSelectedCategoryId(null)}
          className={`text-xs px-2 py-1 rounded-full cursor-pointer transition ${
            selectedCategoryId === null
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary hover:bg-secondary/80'
          }`}
        >
          All ({photos.length})
        </span>
        {categories.map((cat) => {
          // Count photos in this category
          const count = photos.filter((p) => p.categoryId === cat.categoryId).length;
          const isActive = selectedCategoryId === cat.categoryId;
          return (
            <span
              key={cat.id}
              onClick={() => setSelectedCategoryId(isActive ? null : cat.categoryId)}
              className={`text-xs px-2 py-1 rounded-full cursor-pointer transition ${
                isActive
                  ? `bg-${cat.color || 'gray'}-600 text-white`
                  : `bg-${cat.color || 'gray'}-100 text-${cat.color || 'gray'}-700 dark:bg-${cat.color || 'gray'}-900/30 dark:text-${cat.color || 'gray'}-400`
              }`}
            >
              {cat.label} ({count})
            </span>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {loading && <div className="text-center py-12">Loading photos...</div>}

      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredPhotos.map((photo) => {
            const defaultPhoto = isDefault(photo);
            // Build full image URL: API_BASE_URL + src
            const imageUrl = photo.src ? `${API_BASE_URL}${photo.src}` : '';

            return (
              <div
                key={photo.id}
                className="group relative rounded-lg overflow-hidden border border-border bg-card transition-all hover:shadow-lg"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-muted-foreground text-xs">No image</span>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                    <p className="text-xs font-medium truncate">{photo.caption || 'Untitled'}</p>
                    {photo.date && <p className="text-[10px] opacity-75">{photo.date}</p>}
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {defaultPhoto && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/80 text-white rounded">Default</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0 text-xs rounded-full"
                    onClick={() => photo.id && handleDeletePhoto(photo.id, photo.caption)}
                    title="Delete photo"
                  >
                    🗑️
                  </Button>
                </div>

                {/* Edit fields */}
                <div className="p-2 border-t border-border bg-white dark:bg-gray-800">
                  <Input
                    value={photo.caption || ''}
                    onChange={(e) => photo.id && handleUpdate(photo.id, { caption: e.target.value })}
                    placeholder="Caption"
                    className="text-xs h-7 mb-1"
                  />
                  <Input
                    value={photo.date || ''}
                    onChange={(e) => photo.id && handleUpdate(photo.id, { date: e.target.value || undefined })}
                    placeholder="Date"
                    type="date"
                    className="text-xs h-7"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && filteredPhotos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">
            {photos.length === 0 ? '📷 No photos in gallery' : '🔍 No photos match the selected category'}
          </p>
          <p className="text-sm">
            {photos.length === 0
              ? 'Upload a photo using the form above.'
              : 'Try selecting a different category or view "All".'}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
        <span>Total Photos: {photos.length}</span>
        <span>
          Default: {photos.filter((p) => isDefault(p)).length} | Uploaded:{' '}
          {photos.filter((p) => !isDefault(p)).length}
        </span>
      </div>
    </div>
  );
}

export default GalleryManager;