// lib/councilStore.ts
import { create } from "zustand";
import { getCouncilGroups, getCouncilMembers } from "./apis";
import React from "react";

export type CouncilKey = string; // dynamic keys from DB

export interface CouncilMember {
  id: number;
  name: string;
  designation: string;
  position: string;
  email: string;
  groupKey: string;
}

export interface CouncilGroup {
  id: number;
  groupKey: string;
  displayName: string;
}

interface CouncilGroupData {
  group: CouncilGroup | null;
  members: CouncilMember[];
  loading: boolean;
  error: string | null;
  hasLoaded: boolean;
}

interface CouncilStore {
  groups: CouncilGroup[];
  loadingGroups: boolean;
  errorGroups: string | null;
  hasFetchedGroups: boolean;
  data: Record<string, CouncilGroupData>;
  fetchGroups: () => Promise<void>;
  fetchCouncilData: (groupKey: string) => Promise<void>;
  refetchCouncil: (groupKey: string) => Promise<void>;
}

export const useCouncilStore = create<CouncilStore>((set, get) => ({
  groups: [],
  loadingGroups: false,
  errorGroups: null,
  hasFetchedGroups: false,

  data: {},

  fetchGroups: async () => {
    const state = get();
    if (state.loadingGroups || state.hasFetchedGroups) return;
    set({ loadingGroups: true, errorGroups: null });
    try {
      const groups = await getCouncilGroups();
      set({ groups, loadingGroups: false, hasFetchedGroups: true });
    } catch (error: any) {
      set({ loadingGroups: false, errorGroups: error.message, hasFetchedGroups: true });
    }
  },

  fetchCouncilData: async (groupKey: string) => {
    const existing = get().data[groupKey];
    if (existing && existing.hasLoaded) return;
    if (existing && existing.loading) return;

    // Ensure groups are loaded first (needed for display name)
    if (!get().hasFetchedGroups && !get().loadingGroups) {
      await get().fetchGroups();
    }

    set((state) => ({
      data: {
        ...state.data,
        [groupKey]: {
          group: state.data[groupKey]?.group ?? null,
          members: state.data[groupKey]?.members ?? [],
          loading: true,
          error: null,
          hasLoaded: false,
        },
      },
    }));

    try {
      const members = await getCouncilMembers(groupKey);
      const group = get().groups.find((g) => g.groupKey === groupKey) ?? null;
      set((state) => ({
        data: {
          ...state.data,
          [groupKey]: {
            group,
            members,
            loading: false,
            error: null,
            hasLoaded: true,
          },
        },
      }));
    } catch (error: any) {
      set((state) => ({
        data: {
          ...state.data,
          [groupKey]: {
            ...state.data[groupKey],
            loading: false,
            error: error.message || "Failed to load council members",
            hasLoaded: true,
          },
        },
      }));
    }
  },

  refetchCouncil: async (groupKey: string) => {
    set((state) => ({
      data: {
        ...state.data,
        [groupKey]: {
          group: state.data[groupKey]?.group ?? null,
          members: state.data[groupKey]?.members ?? [],
          loading: false,
          error: null,
          hasLoaded: false,
        },
      },
    }));
    await get().fetchCouncilData(groupKey);
  },
}));

// ---- React hooks ----
export const useCouncilData = (groupKey: string) => {
  const data = useCouncilStore((state) => state.data[groupKey]);
  const fetch = useCouncilStore((state) => state.fetchCouncilData);
  const hasTriggered = React.useRef(false);

  React.useEffect(() => {
    hasTriggered.current = false;
  }, [groupKey]);

  React.useEffect(() => {
    if (!hasTriggered.current) {
      hasTriggered.current = true;
      fetch(groupKey);
    }
  }, [groupKey, fetch]);

  // If data doesn't exist, return loading state
  if (!data) {
    return { group: null, members: [], loading: true, error: null, hasLoaded: false };
  }
  return data;
};

// Optional: get all groups for admin use
export const useCouncilGroups = () => {
  const groups = useCouncilStore((state) => state.groups);
  const loading = useCouncilStore((state) => state.loadingGroups);
  const error = useCouncilStore((state) => state.errorGroups);
  const hasFetched = useCouncilStore((state) => state.hasFetchedGroups);
  const fetch = useCouncilStore((state) => state.fetchGroups);
  const hasTriggered = React.useRef(false);

  React.useEffect(() => {
    if (!hasTriggered.current && !hasFetched && !loading) {
      hasTriggered.current = true;
      fetch();
    }
  }, [hasFetched, loading, fetch]);

  return { groups, loading, error };
};