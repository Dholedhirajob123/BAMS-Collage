// lib/departmentStore.ts
import { create } from "zustand";
import { getDepartments, getFacultyMembers, type Department, type FacultyMember } from "./apis";
import React from "react";

interface DepartmentData {
  department: Department | null;
  faculties: FacultyMember[];
  loading: boolean;
  error: string | null;
  hasLoaded: boolean;
}

interface DepartmentStore {
  data: Record<string, DepartmentData>;
  fetchDepartmentData: (slug: string) => Promise<void>;
  refetchDepartment: (slug: string) => Promise<void>;
}

export const useDepartmentStore = create<DepartmentStore>((set, get) => ({
  data: {},

  fetchDepartmentData: async (slug: string) => {
    console.log(`[store] fetchDepartmentData called for slug: ${slug}`);
    const existing = get().data[slug];
    if (existing && existing.hasLoaded) {
      console.log(`[store] Already loaded for ${slug}, skipping.`);
      return;
    }
    if (existing && existing.loading) {
      console.log(`[store] Already loading for ${slug}, skipping.`);
      return;
    }

    // Set loading state
    console.log(`[store] Setting loading state for ${slug}`);
    set((state) => ({
      data: {
        ...state.data,
        [slug]: {
          department: existing?.department ?? null,
          faculties: existing?.faculties ?? [],
          loading: true,
          error: null,
          hasLoaded: false,
        },
      },
    }));

    try {
      // Fetch both in parallel
      console.log(`[store] Fetching departments and faculties for ${slug}...`);
      const [departments, faculties] = await Promise.all([
        getDepartments(),
        getFacultyMembers(slug),
      ]);
      console.log(`[store] Received departments:`, departments);
      console.log(`[store] Received faculties for ${slug}:`, faculties);
      const department = departments.find((d) => d.slug === slug) ?? null;
      set((state) => ({
        data: {
          ...state.data,
          [slug]: {
            department,
            faculties,
            loading: false,
            error: null,
            hasLoaded: true,
          },
        },
      }));
      console.log(`[store] Successfully loaded ${slug}`);
    } catch (error: any) {
      console.error(`[store] Error loading ${slug}:`, error);
      set((state) => ({
        data: {
          ...state.data,
          [slug]: {
            ...state.data[slug],
            loading: false,
            error: error.message || "Failed to load department data",
            hasLoaded: true,
          },
        },
      }));
    }
  },

  refetchDepartment: async (slug: string) => {
    console.log(`[store] Refetching ${slug}`);
    // Reset the state for this slug
    set((state) => ({
      data: {
        ...state.data,
        [slug]: {
          department: state.data[slug]?.department ?? null,
          faculties: state.data[slug]?.faculties ?? [],
          loading: false,
          error: null,
          hasLoaded: false,
        },
      },
    }));
    await get().fetchDepartmentData(slug);
  },
}));

// ---- React hook ----
export const useDepartmentData = (slug: string) => {
  console.log(`[hook] useDepartmentData called with slug: "${slug}"`);
  const data = useDepartmentStore((state) => state.data[slug]);
  const fetch = useDepartmentStore((state) => state.fetchDepartmentData);
  const hasTriggered = React.useRef(false);

  // 🛠️ Reset the trigger when the slug changes
  React.useEffect(() => {
    hasTriggered.current = false;
    console.log(`[hook] Reset hasTriggered for new slug: "${slug}"`);
  }, [slug]);

  React.useEffect(() => {
    console.log(`[hook] useEffect for slug: "${slug}", hasTriggered: ${hasTriggered.current}`);
    if (!hasTriggered.current) {
      hasTriggered.current = true;
      console.log(`[hook] Triggering fetch for slug: "${slug}"`);
      fetch(slug);
    }
  }, [slug, fetch]);

  // If data doesn't exist yet, return a loading state
  if (!data) {
    console.log(`[hook] No data yet for ${slug}, returning default loading.`);
    return { department: null, faculties: [], loading: true, error: null, hasLoaded: false };
  }
  return data;
};