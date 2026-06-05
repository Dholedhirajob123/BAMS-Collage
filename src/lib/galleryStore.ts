import { useEffect, useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";
import campus1 from "@/assets/campus-1.jpg";
import campus2 from "@/assets/campus-2.jpg";
import campus3 from "@/assets/campus-3.jpg";
import campus4 from "@/assets/campus-4.jpg";

export type Photo = { id: string; src: string; caption: string };

const DEFAULTS: Photo[] = [
  { id: "d1", src: g1, caption: "Digital Library" },
  { id: "d2", src: g2, caption: "Medicinal Herbal Garden" },
  { id: "d3", src: g3, caption: "Panchakarma Therapy Room" },
  { id: "d4", src: g4, caption: "Research Laboratory" },
  { id: "d5", src: g5, caption: "Cultural Festival" },
  { id: "d6", src: g6, caption: "Annual Sports Day" },
  { id: "d7", src: g7, caption: "220-Bed Hospital Ward" },
  { id: "d8", src: g8, caption: "Convocation Ceremony" },
  { id: "d9", src: campus1, caption: "College Building" },
  { id: "d10", src: campus2, caption: "Hospital Block" },
  { id: "d11", src: campus3, caption: "Teaching Pharmacy" },
  { id: "d12", src: campus4, caption: "Graduating Batch" },
];

const KEY = "ssam-gallery-v1";
type State = { removed: string[]; custom: Photo[] };

function load(): State {
  if (typeof window === "undefined") return { removed: [], custom: [] };
  try {
    return { removed: [], custom: [], ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { removed: [], custom: [] };
  }
}

function save(s: State) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("gallery-changed"));
}

export function getGallery(): Photo[] {
  const s = load();
  return [...DEFAULTS.filter((p) => !s.removed.includes(p.id)), ...s.custom];
}

export function getAllForAdmin(): { photo: Photo; isDefault: boolean; hidden: boolean }[] {
  const s = load();
  return [
    ...DEFAULTS.map((p) => ({ photo: p, isDefault: true, hidden: s.removed.includes(p.id) })),
    ...s.custom.map((p) => ({ photo: p, isDefault: false, hidden: false })),
  ];
}

export function removePhoto(id: string) {
  const s = load();
  if (DEFAULTS.find((p) => p.id === id)) {
    if (!s.removed.includes(id)) s.removed.push(id);
  } else {
    s.custom = s.custom.filter((p) => p.id !== id);
  }
  save(s);
}

export function restorePhoto(id: string) {
  const s = load();
  s.removed = s.removed.filter((x) => x !== id);
  save(s);
}

export function addPhoto(src: string, caption: string) {
  const s = load();
  s.custom.push({ id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, src, caption });
  save(s);
}

export function useGallery() {
  const [photos, setPhotos] = useState<Photo[]>(() => (typeof window === "undefined" ? DEFAULTS : getGallery()));
  useEffect(() => {
    const update = () => setPhotos(getGallery());
    update();
    window.addEventListener("gallery-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("gallery-changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return photos;
}
