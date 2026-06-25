// lib/galleryStore.ts
import { useEffect, useState, useCallback } from "react";
import {
  getPhotos,
  uploadPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoCategories,
  PhotoCategory,
} from "./apis";

export interface Photo {
  id?: number;
  src: string;          // will always be a full data URL after mapping
  caption?: string;
  date?: string;
  categoryId?: string;
  place?: string;
  isDefault?: boolean;
  hidden?: boolean;
  createdAt?: string;
}

export interface GalleryState {
  photos: Photo[];
  categories: PhotoCategory[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addPhoto: (file: File, data: Partial<Photo>) => Promise<void>;
  editPhoto: (id: number, data: Partial<Photo>) => Promise<void>;
  removePhoto: (id: number) => Promise<void>;
}

// Helper to convert raw Base64 to a data URL
function toDataUrl(base64: string): string {
  if (!base64) return "";
  if (base64.startsWith("data:")) return base64; // already a data URL
  // Detect PNG signature: iVBORw0KGgo
  if (base64.startsWith("iVBORw0KGgo")) {
    return `data:image/png;base64,${base64}`;
  }
  // Default to JPEG
  return `data:image/jpeg;base64,${base64}`;
}

export function useGallery(): GalleryState {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<PhotoCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [photosData, categoriesData] = await Promise.all([
        getPhotos(),
        getPhotoCategories(),
      ]);
      // Map photos to ensure src is a proper data URL
      const mappedPhotos = photosData.map((p: any) => ({
        ...p,
        src: toDataUrl(p.src),
      }));
      setPhotos(mappedPhotos);
      setCategories(categoriesData);
    } catch (err: any) {
      setError(err.message || "Failed to load gallery");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addPhoto = useCallback(
    async (file: File, data: Partial<Photo>) => {
      const formData = new FormData();
      formData.append("file", file);
      if (data.caption) formData.append("caption", data.caption);
      if (data.categoryId) formData.append("categoryId", data.categoryId);
      if (data.date) formData.append("date", data.date);
      if (data.place) formData.append("place", data.place);
      try {
        await uploadPhoto(formData);
        await fetchAll();
      } catch (err: any) {
        throw new Error(err.message || "Upload failed");
      }
    },
    [fetchAll]
  );

  const editPhoto = useCallback(
    async (id: number, data: Partial<Photo>) => {
      try {
        await updatePhoto(id, data);
        await fetchAll();
      } catch (err: any) {
        throw new Error(err.message || "Update failed");
      }
    },
    [fetchAll]
  );

  const removePhoto = useCallback(
    async (id: number) => {
      try {
        await deletePhoto(id);
        await fetchAll();
      } catch (err: any) {
        throw new Error(err.message || "Delete failed");
      }
    },
    [fetchAll]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    photos,
    categories,
    isLoading,
    error,
    refetch: fetchAll,
    addPhoto,
    editPhoto,
    removePhoto,
  };
}