// lib/departmentStore.ts
import { useEffect, useState } from "react";

export type FacultyMember = {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  photo?: string; // Added photo field
};

export type FacultyMemberInput = Omit<FacultyMember, "id"> & { id?: string };

const KEY = "ssam-dept-faculties-v1";

type Store = Record<string, FacultyMember[]>;

function ensureFacultyIds(slug: string, items: FacultyMemberInput[]) {
  return items.map((item, index) => ({
    ...item,
    id: item.id ?? `${slug}-${index}`,
    photo: item.photo || "",
  }));
}

function load(): Store {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as Store;
  } catch {
    return {};
  }
}

function save(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store));
  window.dispatchEvent(new Event("department-faculties-changed"));
}

export function getDepartmentFaculties(
  slug: string,
  defaults: FacultyMemberInput[],
): FacultyMember[] {
  const store = load();
  if (store[slug]) return ensureFacultyIds(slug, store[slug]);
  return ensureFacultyIds(slug, defaults);
}

export function setDepartmentFaculties(slug: string, faculties: FacultyMember[]): void {
  const store = load();
  store[slug] = ensureFacultyIds(slug, faculties);
  save(store);
}

export function resetDepartmentFaculties(slug: string) {
  const store = load();
  delete store[slug];
  save(store);
}

export function useDepartmentFaculties(slug: string, defaults: FacultyMemberInput[]) {
  const [faculties, setFaculties] = useState<FacultyMember[]>(() => getDepartmentFaculties(slug, defaults));

  useEffect(() => {
    const update = () => setFaculties(getDepartmentFaculties(slug, defaults));
    update();
    window.addEventListener("department-faculties-changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("department-faculties-changed", update);
      window.removeEventListener("storage", update);
    };
  }, [slug, defaults]);

  return faculties;
}

export function newFacultyId() {
  return `f-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}