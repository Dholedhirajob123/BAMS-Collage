// lib/staffStore.ts
import { create } from "zustand";
import { getStaff } from "./apis";
import React from "react";

export type StaffGroupKey = "teaching" | "non-teaching" | "hospital";

export const STAFF_GROUPS: StaffGroupKey[] = ["teaching", "non-teaching", "hospital"];

export interface StaffMember {
  id: number;
  name: string;
  designation: string;
  groupKey: StaffGroupKey;
  teacherCode?: string;
  qualification?: string;
  experience?: string;
  registrationNumber?: string;
  dateOfJoining?: string;
  dob?: string;
  email?: string;
  mobile?: string;
  photo?: string;
  fatherName?: string;
  workingDepartment?: string;
  department?: string; // Added department field
  dateOfAppointment?: string;
  natureOfAppointment?: string;
  payScale?: string;
  education?: string;
  year?: string;
  [key: string]: any;
}

interface StaffStore {
  data: Record<StaffGroupKey, StaffMember[]>;
  loading: Record<StaffGroupKey, boolean>;
  error: Record<StaffGroupKey, string | null>;
  // Track ongoing fetch promises
  pendingFetches: Record<StaffGroupKey, Promise<void> | null>;
  // Track if data has been fetched at least once
  fetchedOnce: Record<StaffGroupKey, boolean>;
  fetchStaff: (groupKey: StaffGroupKey, force?: boolean) => Promise<void>;
  clearCache: (groupKey?: StaffGroupKey) => void;
}

const mapStaffFromApi = (item: any): StaffMember => ({
  id: item.id,
  name: item.name,
  designation: item.designation,
  groupKey: item.groupKey || item.group_key || "teaching",
  teacherCode: item.teacherCode ?? item.teacher_code ?? "",
  qualification: item.qualification ?? "",
  experience: item.experience ?? "",
  registrationNumber: item.registrationNumber ?? item.registration_number ?? "",
  dateOfJoining: item.dateOfJoining ?? item.date_of_joining ?? "",
  dob: item.dob ?? "",
  email: item.email ?? "",
  mobile: item.mobile ?? "",
  photo: item.photo ?? "",
  fatherName: item.fatherName ?? item.father_name ?? "",
  workingDepartment: item.workingDepartment ?? item.working_department ?? "",
  department: item.department ?? "", // Map department field
  dateOfAppointment: item.dateOfAppointment ?? item.date_of_appointment ?? "",
  natureOfAppointment: item.natureOfAppointment ?? item.nature_of_appointment ?? "",
  payScale: item.payScale ?? item.pay_scale ?? "",
  education: item.education ?? "",
  year: item.year ?? "",
  ...item,
});

export const useStaffStore = create<StaffStore>((set, get) => ({
  data: {
    teaching: [],
    "non-teaching": [],
    hospital: [],
  },
  loading: {
    teaching: false,
    "non-teaching": false,
    hospital: false,
  },
  error: {
    teaching: null,
    "non-teaching": null,
    hospital: null,
  },
  pendingFetches: {
    teaching: null,
    "non-teaching": null,
    hospital: null,
  },
  fetchedOnce: {
    teaching: false,
    "non-teaching": false,
    hospital: false,
  },

  fetchStaff: async (groupKey: StaffGroupKey, force: boolean = false) => {
    // If we already have data and not forcing refresh, return
    if (!force && get().data[groupKey].length > 0 && get().fetchedOnce[groupKey]) {
      return;
    }

    // If there's already a pending fetch for this group, return that promise
    const existingPromise = get().pendingFetches[groupKey];
    if (existingPromise) {
      return existingPromise;
    }

    // Create a new fetch promise
    const fetchPromise = (async () => {
      // Set loading state
      set((state) => ({
        loading: { ...state.loading, [groupKey]: true },
        error: { ...state.error, [groupKey]: null },
      }));

      try {
        console.log(`🔄 Fetching ${groupKey} staff...`); // Debug log
        const response = await getStaff(groupKey);
        const members = Array.isArray(response) ? response.map(mapStaffFromApi) : [];
        
        set((state) => ({
          data: { ...state.data, [groupKey]: members },
          loading: { ...state.loading, [groupKey]: false },
          fetchedOnce: { ...state.fetchedOnce, [groupKey]: true },
          pendingFetches: { ...state.pendingFetches, [groupKey]: null },
        }));
        
        console.log(`✅ ${groupKey} staff loaded: ${members.length} members`); // Debug log
      } catch (error: any) {
        console.error(`❌ Error fetching ${groupKey} staff:`, error);
        set((state) => ({
          loading: { ...state.loading, [groupKey]: false },
          error: { ...state.error, [groupKey]: error.message || "Failed to load staff" },
          pendingFetches: { ...state.pendingFetches, [groupKey]: null },
        }));
        throw error;
      }
    })();

    // Store the promise
    set((state) => ({
      pendingFetches: { ...state.pendingFetches, [groupKey]: fetchPromise },
    }));

    return fetchPromise;
  },

  clearCache: (groupKey?: StaffGroupKey) => {
    if (groupKey) {
      set((state) => ({
        data: { ...state.data, [groupKey]: [] },
        fetchedOnce: { ...state.fetchedOnce, [groupKey]: false },
        pendingFetches: { ...state.pendingFetches, [groupKey]: null },
      }));
    } else {
      set({
        data: {
          teaching: [],
          "non-teaching": [],
          hospital: [],
        },
        fetchedOnce: {
          teaching: false,
          "non-teaching": false,
          hospital: false,
        },
        pendingFetches: {
          teaching: null,
          "non-teaching": null,
          hospital: null,
        },
      });
    }
  },
}));

// ===== React Hooks =====

export const useStaff = (groupKey: StaffGroupKey) => {
  const data = useStaffStore((state) => state.data[groupKey]);
  const loading = useStaffStore((state) => state.loading[groupKey]);
  const fetchedOnce = useStaffStore((state) => state.fetchedOnce[groupKey]);
  const fetchStaff = useStaffStore((state) => state.fetchStaff);

  React.useEffect(() => {
    // Only fetch if data hasn't been fetched before and not currently loading
    if (!fetchedOnce && !loading) {
      fetchStaff(groupKey).catch(() => {
        // Error is handled in the store
      });
    }
  }, [groupKey, fetchedOnce, loading, fetchStaff]);

  return data;
};

export const useStaffStatus = (groupKey: StaffGroupKey) => {
  const loading = useStaffStore((state) => state.loading[groupKey]);
  const error = useStaffStore((state) => state.error[groupKey]);
  return { loading, error };
};

export const refetchStaff = (groupKey: StaffGroupKey) => {
  // Clear the fetched flag and data
  useStaffStore.getState().clearCache(groupKey);
  // Then fetch with force flag
  useStaffStore.getState().fetchStaff(groupKey, true);
};

// Optional: Global prefetch
export const prefetchAllStaff = async () => {
  const store = useStaffStore.getState();
  const groups: StaffGroupKey[] = ["teaching", "non-teaching", "hospital"];
  await Promise.all(groups.map((group) => store.fetchStaff(group)));
};